/**
 * P7-04b — Netlify Function: LLM-Proxy für VitalWissen S4 Arztbrief-Decoder
 *
 * Sicherheitsgarantien (bindend, P7-04a/E + P7-04c):
 * - Empfängt AUSSCHLIESSLICH anonymisierten Text (kein Rohtext, kein File-Payload)
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
 */

// ---------------------------------------------------------------------------
// Konstanten
// ---------------------------------------------------------------------------

const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";
const DEFAULT_MODEL = "mistral-large-latest";
const MAX_TEXT_LENGTH = 50000;  // P7-04a/E.5: max 50.000 Zeichen

// Erlaubte Request-Felder (Whitelist — P7-04a/E.1)
const ALLOWED_FIELDS = new Set(["anonymizedText", "requestId"]);

// Verbotene Payload-Patterns (data-URLs, base64, blob)
const FORBIDDEN_PATTERNS = [
  /^data:/i,
  /^blob:/i,
  /base64/i,
];

// ---------------------------------------------------------------------------
// System-Instruction (server-seitig fest — P7-04b-Auftrag)
// Erzwingt: Laien-Erklärung, kein Diagnostizieren, kein Therapie-Rat,
//           strukturiertes JSON-Output, keine Halluzinationen
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `Du bist ein medizinischer Laien-Erklärer für die Plattform VitalWissen. Deine einzige Aufgabe ist es, anonymisierten deutschen Arztbrief-Text für Laien verständlich zu erklären.

BINDENDE REGELN:
- Kein Diagnostizieren. Keine Diagnose-Aussagen oder -Bestätigungen.
- Keine Therapieanweisungen, keine Behandlungsempfehlungen.
- Keine Notfall-Einschätzungen (weder Über- noch Untereskalation).
- Unbekannte oder nicht eindeutig interpretierbare Stellen: explizit als unklar markieren.
- Sachlich, knapp, nicht dramatisierend.
- Nur den vorliegenden anonymisierten Text interpretieren.
- Keine Quellen, Studien oder Literatur erfinden oder halluzinieren.
- Keine zusätzlichen Patientendaten oder Informationen erfinden.
- Platzhalter wie [NAME], [ADRESSE], [GEBURTSDATUM] etc. im Text sind Anonymisierungen — sie als solche benennen, nicht spekulieren was dahinter steht.

AUSGABE:
Gib deine Antwort AUSSCHLIESSLICH als valides JSON in exakt diesem Schema zurück. Kein Text außerhalb des JSON. Kein Markdown. Keine Codeblöcke.

{
  "kurzfassung": "Sachliche Kurzfassung in 2-3 Sätzen auf Laiensprache.",
  "begriffe": [
    { "begriff": "Fachbegriff aus dem Text", "erklaerung": "Kurze Erklärung für Laien" }
  ],
  "worum_geht_es": "Worum geht es in diesem Dokument? (1 Satz)",
  "naechste_fragen": ["Sinnvolle Frage an den Arzt"],
  "warnhinweise": ["Hinweis auf Einschränkungen oder Grenzen dieser Analyse"]
}`;

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

  const model = process.env.MISTRAL_MODEL || DEFAULT_MODEL;

  // --- Mistral stateless API aufrufen
  // SICHERHEITS-INVARIANTE: Kein Logging von anonymizedText hier oder danach.
  let mistralResp;
  try {
    mistralResp = await fetch(MISTRAL_API_URL, {
      method: "POST",
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
        max_tokens: 2000,
      }),
    });
  } catch (_fetchErr) {
    // Kein PII, kein API-Key in Fehlermeldung
    return { statusCode: 502, body: JSON.stringify({ ok: false, error: "Verbindung zum Analysedienst fehlgeschlagen. Bitte erneut versuchen." }), headers };
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
