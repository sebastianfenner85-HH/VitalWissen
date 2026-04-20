/**
 * P7-04d — Netlify Function: LLM-Proxy für VitalWissen S4 Arztbrief-Decoder
 * (Hardening-Update — Performance- und Stabilitätshärtung)
 *
 * Sicherheitsgarantien (bindend, P7-04a/E + P7-04c — unverändert):
 * - Empfängt den vom Client gesendeten String (regulärer UI-Pfad: nur anonymisierter Text via Hard-Guard)
 * - Serverseitig: Payload-Format + Schema validiert — inhaltliche Anonymisierung serverseitig nicht beweisbar
 * - API-Key liegt ausschließlich server-seitig (Netlify ENV — nie im Client-Bundle)
 * - Kein Logging von anonymizedText oder decodedText
 * - Keine Speicherung von Input oder Output (Zero-Retention)
 * - Kein stiller Fallback auf anderen Provider
 * - Fehlermeldungen enthalten keine PII
 *
 * Provider: Mistral stateless API
 * ZDR-Grundlage: schriftliche Support-Mail 20.04.2026, Scale Plan, Inputs + Outputs
 * Zulässiger Pfad: ausschließlich Mistral stateless API (kein Le Chat, keine stateful APIs,
 *                  keine Labs models — P7-04c/C.1)
 *
 * P7-04d Hardening-Änderungen:
 * - Modell: mistral-large-latest → mistral-small-latest (Primärhebel Latenz)
 * - max_tokens: 2000 → 800 (Sekundärhebel Latenz + Completion-Steuerung)
 * - System-Prompt: verschlankt, Mengenlimits explizit (Prompt-Token-Reduktion)
 * - AbortController: 22s server-seitiger Timeout auf Mistral-Fetch (verhindert
 *   unkontrolliertes Warten bis Netlify-Rand bei 30s)
 */

// ---------------------------------------------------------------------------
// Konstanten
// ---------------------------------------------------------------------------

const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

// P7-04d: mistral-small-latest statt mistral-large-latest
// Begründung: Aufgabe (strukturiertes JSON, 5 Felder, Laienerklärung) erfordert
// kein Flagship-Modell. mistral-small-latest ist mehrsprachig, JSON-mode-fähig
// und für Instruktionsfolgen ausgelegt. ZDR-Bestätigung gilt modellunabhängig
// für die stateless API (Scale Plan).
const DEFAULT_MODEL = "mistral-small-latest";

const MAX_TEXT_LENGTH = 50000;  // P7-04a/E.5: max 50.000 Zeichen

// P7-04d: Server-seitiger Abort-Timeout (ms) — verhindert Hängen bis Netlify-Rand
// Netlify Function Timeout: 30s → Mistral-Abort bei 22s → 8s Puffer für Overhead
const MISTRAL_TIMEOUT_MS = 22000;

// Erlaubte Request-Felder (Whitelist — P7-04a/E.1)
const ALLOWED_FIELDS = new Set(["anonymizedText", "requestId"]);

// Verbotene Payload-Patterns (data-URLs, base64, blob)
const FORBIDDEN_PATTERNS = [
  /^data:/i,
  /^blob:/i,
  /base64/i,
];

// ---------------------------------------------------------------------------
// System-Instruction (server-seitig fest — P7-04d Hardening)
// P7-04d: verschlankt von ~290 auf ~150 Wörter, Mengenlimits explizit gesetzt.
// Fachlicher Kern bleibt vollständig erhalten (alle 5 Pflichtfelder, gleiche
// Sicherheitsregeln, gleiche Qualitätsanforderungen).
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `Du bist ein medizinischer Laien-Erklärer für VitalWissen. Erkläre anonymisierten deutschen Arztbrief-Text für medizinische Laien verständlich.

BINDENDE REGELN:
- Kein Diagnostizieren, keine Therapieanweisungen, keine Notfall-Einschätzungen.
- Unklare oder nicht eindeutig interpretierbare Stellen explizit als unklar markieren.
- Platzhalter wie [NAME], [ADRESSE], [GEBURTSDATUM] im Text sind Anonymisierungen — benennen, nicht spekulieren.
- Sachlich, knapp, keine erfundenen Informationen, Quellen oder Studien.
- Nur den vorliegenden Text interpretieren — nichts Zusätzliches erfinden.

AUSGABE: Ausschließlich valides JSON ohne Text außerhalb des JSON-Objekts. Kein Markdown, keine Codeblöcke.

{
  "worum_geht_es": "1 kurzer Satz zum Dokument",
  "kurzfassung": "Max. 2 Sätze Zusammenfassung in einfacher Sprache",
  "begriffe": [{ "begriff": "Fachbegriff", "erklaerung": "1 Satz Erklärung für Laien" }],
  "naechste_fragen": ["Konkrete Frage an den Arzt"],
  "warnhinweise": ["Hinweis auf Grenzen dieser Analyse"]
}

Mengenlimits: begriffe max. 6 Einträge · naechste_fragen max. 4 Einträge · warnhinweise max. 3 Einträge.`;

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export const handler = async (event, _context) => {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store, no-cache" };

  // --- Nur POST erlaubt
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: "Method not allowed" }), headers };
  }

  // --- Content-Type muss application/json enthalten
  const contentType = (event.headers?.["content-type"] || "").toLowerCase();
  if (!contentType.includes("application/json")) {
    return { statusCode: 415, body: JSON.stringify({ ok: false, error: "Content-Type must be application/json" }), headers };
  }

  // --- Body parsen (kein Logging des Body-Inhalts)
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (_e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Ungültiges JSON im Request-Body" }), headers };
  }

  // --- Body muss ein Objekt sein (kein Array, kein Primitiv)
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Request-Body muss ein JSON-Objekt sein" }), headers };
  }

  // --- Whitelist-Check: keine unerlaubten Felder (P7-04a/E.1)
  const extraFields = Object.keys(body).filter((k) => !ALLOWED_FIELDS.has(k));
  if (extraFields.length > 0) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Unerlaubte Felder im Request" }), headers };
  }

  const { anonymizedText, requestId } = body;

  // --- anonymizedText: Typ-Prüfung
  if (typeof anonymizedText !== "string") {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "anonymizedText muss ein String sein" }), headers };
  }

  // --- anonymizedText: darf nicht leer sein
  if (anonymizedText.trim().length === 0) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "anonymizedText darf nicht leer sein" }), headers };
  }

  // --- anonymizedText: Längen-Obergrenze (P7-04a/E.5)
  if (anonymizedText.length > MAX_TEXT_LENGTH) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: `anonymizedText überschreitet die maximale Länge von ${MAX_TEXT_LENGTH} Zeichen` }),
      headers,
    };
  }

  // --- Verbotene Payload-Patterns (data-URLs, base64, blob)
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(anonymizedText)) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Unzulässiges Payload-Format erkannt" }), headers };
    }
  }

  // --- requestId: optional, falls vorhanden muss es ein kurzer String sein
  if (requestId !== undefined && (typeof requestId !== "string" || requestId.length > 64)) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "requestId muss ein String ≤ 64 Zeichen sein" }), headers };
  }

  // --- API-Key abrufen — ausschließlich server-seitig, kein Logging des Werts
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    // Kein Key-Inhalt in Response oder Log
    return { statusCode: 503, body: JSON.stringify({ ok: false, error: "Dienst vorübergehend nicht verfügbar" }), headers };
  }

  // P7-04d: MISTRAL_MODEL ENV-Override behält Priorität (erlaubt Rollback auf large ohne Code-Änderung)
  const model = process.env.MISTRAL_MODEL || DEFAULT_MODEL;

  // ---------------------------------------------------------------------------
  // P7-04d: AbortController — server-seitiger Mistral-Timeout
  // Verhindert unkontrolliertes Warten bis zum Netlify-Function-Rand (30s).
  // Abort bei 22s → sauberer HTTP 504 statt ungraceful Netlify-Timeout.
  // AbortController: nativ in Node.js 18+ (Netlify Functions Standard-Runtime).
  // ---------------------------------------------------------------------------
  const mistralAbortCtrl = new AbortController();
  const mistralTimeoutId = setTimeout(() => mistralAbortCtrl.abort(), MISTRAL_TIMEOUT_MS);

  // --- Mistral stateless API aufrufen
  // SICHERHEITS-INVARIANTE: Kein Logging von anonymizedText hier oder danach.
  let mistralResp;
  try {
    mistralResp = await fetch(MISTRAL_API_URL, {
      method: "POST",
      signal: mistralAbortCtrl.signal,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: anonymizedText },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 800,  // P7-04d: 2000 → 800 (reicht für 5-Feld-Schema sicher aus)
      }),
    });
  } catch (_fetchErr) {
    clearTimeout(mistralTimeoutId);
    // P7-04d: AbortError = Timeout-Fall → 504 statt 502
    if (_fetchErr.name === "AbortError") {
      return {
        statusCode: 504,
        body: JSON.stringify({ ok: false, error: "Analysedienst hat nicht rechtzeitig geantwortet. Bitte erneut versuchen." }),
        headers,
      };
    }
    // Kein PII, kein API-Key in Fehlermeldung
    return { statusCode: 502, body: JSON.stringify({ ok: false, error: "Verbindung zum Analysedienst fehlgeschlagen. Bitte erneut versuchen." }), headers };
  } finally {
    clearTimeout(mistralTimeoutId);
  }

  if (!mistralResp.ok) {
    // HTTP-Status-Code ohne Payload-Inhalt
    return {
      statusCode: 502,
      body: JSON.stringify({ ok: false, error: `Analysedienst nicht verfügbar (HTTP ${mistralResp.status}). Bitte erneut versuchen.` }),
      headers,
    };
  }

  // --- Mistral-Antwort parsen
  let mistralData;
  try {
    mistralData = await mistralResp.json();
  } catch (_e) {
    return { statusCode: 502, body: JSON.stringify({ ok: false, error: "Analysedienst hat keine lesbare Antwort zurückgegeben." }), headers };
  }

  const rawContent = mistralData?.choices?.[0]?.message?.content;
  if (!rawContent || typeof rawContent !== "string") {
    return { statusCode: 502, body: JSON.stringify({ ok: false, error: "Analysedienst hat kein verwertbares Ergebnis zurückgegeben." }), headers };
  }

  // --- JSON aus Mistral-Content parsen
  // Kein Freitext-Durchschleusen bei Parse-Fehler — sauberer Server-Fehler stattdessen
  let result;
  try {
    result = JSON.parse(rawContent);
  } catch (_e) {
    return { statusCode: 502, body: JSON.stringify({ ok: false, error: "Analysedienst hat kein strukturiertes Ergebnis zurückgegeben. Bitte erneut versuchen." }), headers };
  }

  // --- Pflichtfelder im Schema prüfen (defensive check)
  const requiredFields = ["kurzfassung", "begriffe", "worum_geht_es", "naechste_fragen", "warnhinweise"];
  const missingFields = requiredFields.filter((f) => !(f in result));
  if (missingFields.length > 0) {
    return { statusCode: 502, body: JSON.stringify({ ok: false, error: "Analyseergebnis unvollständig. Bitte erneut versuchen." }), headers };
  }

  // --- Erfolgsantwort — kein Echo von anonymizedText, kein Nutzer-Bezug
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      ok: true,
      provider: "mistral",
      model,
      requestId: typeof requestId === "string" ? requestId : null,
      result: {
        kurzfassung: String(result.kurzfassung || ""),
        begriffe: Array.isArray(result.begriffe) ? result.begriffe : [],
        worum_geht_es: String(result.worum_geht_es || ""),
        naechste_fragen: Array.isArray(result.naechste_fragen) ? result.naechste_fragen : [],
        warnhinweise: Array.isArray(result.warnhinweise) ? result.warnhinweise : [],
      },
    }),
  };
};
