import { useState, useRef, useEffect, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "./Arztbrief.css";

// Worker lokal aus Build geladen — kein CDN, kein externer Request.
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// ---------------------------------------------------------------------------
// P7-03b — ANONYMISIERUNGS-DEBOUNCE (ms)
// ---------------------------------------------------------------------------
const ANON_DEBOUNCE_MS = 600;

// ---------------------------------------------------------------------------
// Hilfsfunktionen — alle lokal, kein Netzwerk mit Nutzerdaten
// ---------------------------------------------------------------------------

const ACCEPTED_EXT = [".pdf", ".png", ".jpg", ".jpeg"];

function fileIsAccepted(file) {
  const name = (file.name || "").toLowerCase();
  return (
    file.type === "application/pdf" ||
    file.type === "image/png" ||
    file.type === "image/jpeg" ||
    ACCEPTED_EXT.some((ext) => name.endsWith(ext))
  );
}

function fileIsPdf(file) {
  return (
    file.type === "application/pdf" ||
    (file.name || "").toLowerCase().endsWith(".pdf")
  );
}

/** Extrahiert Text-Layer aus ArrayBuffer. Gibt { text, pdfDoc } zurück. */
async function extractTextLayer(arrayBuffer) {
  const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let full = "";
  for (let p = 1; p <= pdfDoc.numPages; p++) {
    const page = await pdfDoc.getPage(p);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((i) => ("str" in i ? i.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (pageText) full += (full ? "\n\n" : "") + pageText;
  }
  return { text: full.trim(), pdfDoc };
}

// Lokale Pfade für same-origin OCR-Assets (aus prebuild in public/ bereitgestellt).
const TESSERACT_LOCAL = {
  workerPath: "/tesseract/worker.min.js",
  corePath: "/tesseract",
  langPath: "/tessdata",
  gzip: true,
};

/**
 * OCR einer PDF via pdfjs-Render → Canvas → Tesseract.js (WASM, same-origin).
 * P7-02c-fix: renderCanvas+Whitefill→ImageBitmap→ocrCanvas.
 */
async function ocrPdfDoc(pdfDoc, onPhase, onProgress) {
  const { createWorker } = await import("tesseract.js");
  onPhase("preparing");
  const worker = await createWorker("deu+eng", 1, {
    ...TESSERACT_LOCAL,
    logger: (m) => {
      if (m.status === "recognizing text") {
        onPhase("running");
        onProgress(Math.round(m.progress * 100));
      }
    },
  });
  try {
    let full = "";
    const n = pdfDoc.numPages;
    for (let p = 1; p <= n; p++) {
      onPhase("running");
      const page = await pdfDoc.getPage(p);
      const viewport = page.getViewport({ scale: 2.0 });

      const renderCanvas = document.createElement("canvas");
      renderCanvas.width = viewport.width;
      renderCanvas.height = viewport.height;
      const ctx = renderCanvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;

      const imgBitmap = await createImageBitmap(renderCanvas);
      const ocrCanvas = document.createElement("canvas");
      ocrCanvas.width = imgBitmap.width;
      ocrCanvas.height = imgBitmap.height;
      ocrCanvas.getContext("2d").drawImage(imgBitmap, 0, 0);
      imgBitmap.close();

      const { data } = await worker.recognize(ocrCanvas);
      const pageText = (data.text || "").trim();
      if (pageText) full += (full ? "\n\n" : "") + pageText;
      onProgress(Math.round((p / n) * 100));
    }
    return full;
  } finally {
    await worker.terminate();
  }
}

/**
 * OCR eines Bild-Files via Tesseract.js (WASM, same-origin).
 * P7-02b-fix2: File → createImageBitmap → Canvas (im Hauptthread).
 */
async function ocrImageFile(file, onPhase, onProgress) {
  const { createWorker } = await import("tesseract.js");
  onPhase("preparing");

  const imgBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = imgBitmap.width;
  canvas.height = imgBitmap.height;
  canvas.getContext("2d").drawImage(imgBitmap, 0, 0);
  imgBitmap.close();

  const worker = await createWorker("deu+eng", 1, {
    ...TESSERACT_LOCAL,
    logger: (m) => {
      if (m.status === "recognizing text") {
        onPhase("running");
        onProgress(Math.round(m.progress * 100));
      }
    },
  });
  try {
    const { data } = await worker.recognize(canvas);
    return (data.text || "").trim();
  } finally {
    await worker.terminate();
  }
}

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

export default function Arztbrief() {
  // --- Paste-Eingabe (für Textarea-Steuerung; nie als "Rohtext" direkt angezeigt)
  const [pasteValue, setPasteValue] = useState("");

  // --- Quellen-State
  const [source, setSource] = useState("idle"); // idle | paste | pdf | ocr

  // --- Allgemeine Status-Meldungen
  const [status, setStatus] = useState(null); // { type: "error"|"warn", message }

  // --- Datei-Lade-State
  const [loading, setLoading] = useState(false);
  const [ocrPhase, setOcrPhase] = useState(null);    // null|"preparing"|"running"|"done"|"failed"
  const [ocrProgress, setOcrProgress] = useState(0);

  // --- P7-03b Anonymisierungs-State
  // anonStatus: null | "running" | "done" | "failed"
  // anonText: anonymisierter Text zur Anzeige (nie Rohtext)
  // anonReport: { totalReplacements, byCategory }
  const [anonStatus, setAnonStatus] = useState(null);
  const [anonText, setAnonText] = useState("");
  const [anonReport, setAnonReport] = useState(null);

  // --- P7-04b LLM-Dekodierung State
  // llmStatus: null | "loading" | "done" | "error"
  // llmResult: strukturierte JSON-Antwort vom Proxy
  // llmError: technische Fehlermeldung (keine PII)
  const [llmStatus, setLlmStatus] = useState(null);
  const [llmResult, setLlmResult] = useState(null);
  const [llmError, setLlmError] = useState(null);

  // --- Refs
  const fileRef = useRef(null);
  const workerRef = useRef(null);
  const debounceRef = useRef(null);

  // -------------------------------------------------------------------------
  // Worker: Lifecycle (einmalig beim Mount, Teardown beim Unmount)
  // -------------------------------------------------------------------------
  useEffect(() => {
    const w = new Worker(
      new URL("../workers/anonymizeWorker.js", import.meta.url),
    );

    w.onmessage = (evt) => {
      const { type, anonymizedText, report, message } = evt.data || {};
      if (type === "result") {
        setAnonText(anonymizedText);
        setAnonReport(report);
        setAnonStatus("done");
      } else {
        // type === "error" oder unbekannt → harter Stop, kein Bypass
        setAnonStatus("failed");
        setAnonText("");
        setAnonReport(null);
        setStatus({
          type: "error",
          message:
            message ||
            "Anonymisierung fehlgeschlagen. Kein Text wird angezeigt. Bitte Seite neu laden.",
        });
      }
    };

    w.onerror = (_err) => {
      // Keine PII in Fehlermeldung — technischer Hinweis ohne Inhalt
      setAnonStatus("failed");
      setAnonText("");
      setAnonReport(null);
      setStatus({
        type: "error",
        message:
          "Anonymisierungs-Worker nicht erreichbar. Kein Text wird angezeigt. Bitte Seite neu laden.",
      });
    };

    workerRef.current = w;
    return () => {
      w.terminate();
      workerRef.current = null;
    };
  }, []);

  // -------------------------------------------------------------------------
  // Anonymisierung triggern (zentrale Funktion)
  // Pflicht: Fehler → harter Stop, niemals Bypass mit Rohtext
  // -------------------------------------------------------------------------
  const triggerAnonymization = useCallback((rawText) => {
    if (!workerRef.current) {
      setAnonStatus("failed");
      setAnonText("");
      setStatus({
        type: "error",
        message:
          "Anonymisierungs-Worker nicht verfügbar. Bitte Seite neu laden.",
      });
      return;
    }
    setAnonStatus("running");
    setAnonText("");
    setAnonReport(null);
    workerRef.current.postMessage({ type: "anonymize", text: rawText });
  }, []);

  // -------------------------------------------------------------------------
  // Hilfsfunktionen
  // -------------------------------------------------------------------------

  function resetOcr() {
    setOcrPhase(null);
    setOcrProgress(0);
  }

  function resetAnon() {
    setAnonStatus(null);
    setAnonText("");
    setAnonReport(null);
  }

  function resetLlm() {
    setLlmStatus(null);
    setLlmResult(null);
    setLlmError(null);
  }

  // -------------------------------------------------------------------------
  // P7-04b — LLM-Proxy-Call
  // HARD GUARD: kein Call wenn anonStatus !== 'done' oder anonText leer
  // Kein Rohtext, kein File-Payload — ausschließlich anonText aus Worker-Ergebnis
  // -------------------------------------------------------------------------
  async function handleDecode() {
    // Sicherheits-Guard — kein Call bei nicht abgeschlossener Anonymisierung
    if (anonStatus !== "done" || !anonText || anonText.trim().length === 0) {
      return;
    }

    setLlmStatus("loading");
    setLlmResult(null);
    setLlmError(null);

    let resp;
    try {
      resp = await fetch("/.netlify/functions/llm-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Ausschließlich anonymisierter Text — kein Rohtext, keine Datei-Referenz
        body: JSON.stringify({ anonymizedText: anonText }),
      });
    } catch (_err) {
      setLlmStatus("error");
      setLlmError("Verbindung fehlgeschlagen. Bitte Internetverbindung prüfen und erneut versuchen.");
      return;
    }

    let data;
    try {
      data = await resp.json();
    } catch (_e) {
      setLlmStatus("error");
      setLlmError("Keine lesbare Antwort vom Analysedienst.");
      return;
    }

    if (!resp.ok || !data?.ok) {
      setLlmStatus("error");
      // Fehlermeldung aus Server-Response — enthält keine PII (Proxy-Garantie)
      setLlmError(data?.error || "Analysedienst nicht verfügbar. Bitte erneut versuchen.");
      return;
    }

    setLlmResult(data);
    setLlmStatus("done");
  }

  // -------------------------------------------------------------------------
  // Datei-Handler (PDF / Bild)
  // -------------------------------------------------------------------------
  async function handleFile(e) {
    setStatus(null);
    resetOcr();
    resetAnon();
    const file = e.target.files?.[0];
    if (!file) {
      setStatus({ type: "warn", message: "Keine Datei ausgewählt." });
      return;
    }

    if (!fileIsAccepted(file)) {
      setStatus({
        type: "error",
        message:
          "Nicht unterstütztes Dateiformat. Bitte wähle eine PDF-, PNG- oder JPG-Datei.",
      });
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setLoading(true);
    try {
      if (fileIsPdf(file)) {
        const buf = await file.arrayBuffer();
        const { text: layerText, pdfDoc } = await extractTextLayer(buf);

        if (layerText) {
          // Pfad A — Text-Layer vorhanden
          setSource("pdf");
          triggerAnonymization(layerText);
        } else {
          // Pfad B — kein Text-Layer → lokal OCR
          try {
            const ocrText = await ocrPdfDoc(pdfDoc, setOcrPhase, setOcrProgress);
            if (!ocrText) {
              setSource("ocr");
              resetOcr();
              setStatus({
                type: "warn",
                message:
                  "OCR hat keinen verwertbaren Text erkannt. Ist das Dokument gut lesbar und nicht zu klein gedruckt? Die Datei hat dein Gerät nicht verlassen.",
              });
            } else {
              setSource("ocr");
              setOcrPhase("done");
              triggerAnonymization(ocrText);
            }
          } catch (ocrErr) {
            console.error("OCR (PDF) failed", ocrErr);
            setSource("idle");
            setOcrPhase("failed");
            setStatus({
              type: "error",
              message:
                "Texterkennung (OCR) ist fehlgeschlagen. Bitte versuche es erneut. Die Datei hat dein Gerät nicht verlassen.",
            });
          }
        }
      } else {
        // Bilddatei (PNG/JPG/JPEG)
        try {
          const ocrText = await ocrImageFile(file, setOcrPhase, setOcrProgress);
          if (!ocrText) {
            setSource("ocr");
            resetOcr();
            setStatus({
              type: "warn",
              message:
                "OCR hat keinen verwertbaren Text erkannt. Ist das Bild scharf und gut ausgeleuchtet? Die Datei hat dein Gerät nicht verlassen.",
            });
          } else {
            setSource("ocr");
            setOcrPhase("done");
            triggerAnonymization(ocrText);
          }
        } catch (ocrErr) {
          console.error("OCR (image) failed", ocrErr);
          setSource("idle");
          setOcrPhase("failed");
          setStatus({
            type: "error",
            message:
              "Texterkennung (OCR) ist fehlgeschlagen. Bitte versuche es erneut. Die Datei hat dein Gerät nicht verlassen.",
          });
        }
      }
    } catch (err) {
      console.error("File processing failed", err);
      setSource("idle");
      resetOcr();
      setStatus({
        type: "error",
        message:
          "Die Datei konnte nicht gelesen werden. Ist sie passwortgeschützt oder beschädigt? Die Datei hat dein Gerät nicht verlassen.",
      });
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  // -------------------------------------------------------------------------
  // Text-Paste-Handler (debounced Anonymisierung)
  // -------------------------------------------------------------------------
  function handlePaste(e) {
    const value = e.target.value;
    setPasteValue(value);

    clearTimeout(debounceRef.current);
    resetAnon();

    if (!value) {
      setSource("idle");
      setStatus(null);
      return;
    }

    setSource("paste");
    setStatus(null);

    // Anonymisierung mit Debounce starten (nicht bei jedem Tastendruck)
    debounceRef.current = setTimeout(() => {
      triggerAnonymization(value);
    }, ANON_DEBOUNCE_MS);
  }

  // -------------------------------------------------------------------------
  // Reset
  // -------------------------------------------------------------------------
  function handleReset() {
    setPasteValue("");
    setSource("idle");
    setStatus(null);
    resetOcr();
    resetAnon();
    resetLlm();
    clearTimeout(debounceRef.current);
    if (fileRef.current) fileRef.current.value = "";
  }

  // -------------------------------------------------------------------------
  // Ableitungen
  // -------------------------------------------------------------------------
  const ocrRunning = ocrPhase === "preparing" || ocrPhase === "running";
  const hasContent = source !== "idle";
  const showAnonResult = anonStatus === "done" && anonText;
  const showAnonRunning = anonStatus === "running";
  const showAnonFailed = anonStatus === "failed";

  // Quell-Label für Meta-Zeile
  const sourceLabel =
    source === "pdf"
      ? "lokal aus PDF-Text-Layer extrahiert"
      : source === "ocr"
      ? "lokal per OCR erkannt (Browser)"
      : "eingefügter Text";

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="arztbrief-page">
      <div className="container">
        <header className="arztbrief-header">
          <span className="badge badge-primary">Beta · Erster Baustein</span>
          <h1>Arztbrief-Decoder</h1>
          <p className="arztbrief-sub">
            Arztbriefe, Befunde und Entlassbriefe verständlich machen —
            in dieser Vorversion: lokale Anonymisierung und KI-gestützte Erklärung (Beta).
          </p>
        </header>

        {/* ------------------------------------------------------------------ */}
        {/* Datenschutz-Banner — P7-03b: Anonymisierung aktiv                  */}
        {/* ------------------------------------------------------------------ */}
        <section className="arztbrief-banner" aria-label="Datenschutz-Status">
          <div className="arztbrief-banner-row">
            <span className="arztbrief-chip ok">Lokal im Browser</span>
            <span className="arztbrief-chip ok">Anonymisierung aktiv (lokal)</span>
            <span className="arztbrief-chip pending">KI-Dekodierung Beta (P7-04b)</span>
          </div>
          <p className="arztbrief-banner-text">
            Text-Upload, PDF-Extraktion, OCR und Anonymisierung laufen vollständig
            in deinem Browser — kein Netzwerkzugriff für diese Schritte.{" "}
            Erst nach explizitem Klick auf <strong>„Dekodieren"</strong> wird
            ausschließlich der anonymisierte Text an einen server-seitigen Analysedienst
            übermittelt (Mistral, Zero Data Retention, ZDR-Bestätigung 20.04.2026).
            Es werden kein Originaltext, keine Dateien und kein Rohinhalt übertragen.
            Standardmäßig keine Speicherung von Input oder Output durch den Analysedienst.
            Beim Neuladen der Seite ist der lokale Zustand zurückgesetzt.
          </p>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Eingabe-Karten                                                       */}
        {/* ------------------------------------------------------------------ */}
        <div className="arztbrief-grid">
          <section className="arztbrief-card">
            <h2>Text einfügen</h2>
            <p className="arztbrief-card-sub">
              Kopiere den Text aus deinem Arztbrief oder tippe ihn ab.
              Die Anonymisierung startet automatisch.
            </p>
            <textarea
              className="arztbrief-textarea"
              placeholder="Text hier einfügen …"
              value={pasteValue}
              onChange={handlePaste}
              rows={10}
            />
          </section>

          <section className="arztbrief-card">
            <h2>Dokument oder Bild hochladen</h2>
            <p className="arztbrief-card-sub">
              PDF (mit oder ohne Text-Layer), PNG oder JPG.
              Text-Extraktion, OCR und Anonymisierung laufen vollständig in deinem Browser.
            </p>
            <label className="arztbrief-upload">
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf,.pdf,image/png,.png,image/jpeg,.jpg,.jpeg"
                onChange={handleFile}
                disabled={loading || ocrRunning || anonStatus === "running"}
              />
              <span>
                {ocrRunning
                  ? ocrPhase === "preparing"
                    ? "OCR wird vorbereitet …"
                    : `OCR läuft … ${ocrProgress} %`
                  : anonStatus === "running"
                  ? "Anonymisierung läuft …"
                  : loading
                  ? "Lese Datei …"
                  : "Datei auswählen"}
              </span>
            </label>
          </section>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* OCR-Statusanzeige (P7-02b/P7-02c — unverändert)                    */}
        {/* ------------------------------------------------------------------ */}
        {ocrRunning && (
          <div className="arztbrief-ocr-status" role="status" aria-live="polite">
            <div className="arztbrief-ocr-label">
              {ocrPhase === "preparing"
                ? "Texterkennung (OCR) wird vorbereitet …"
                : `Texterkennung läuft … ${ocrProgress} %`}
            </div>
            <div className="arztbrief-ocr-bar">
              <div
                className={`arztbrief-ocr-bar-fill${ocrPhase === "preparing" ? " indeterminate" : ""}`}
                style={ocrPhase !== "preparing" ? { width: `${ocrProgress}%` } : undefined}
              />
            </div>
            <p className="arztbrief-ocr-hint">
              Die Texterkennung läuft vollständig in deinem Browser.
              Bei größeren Dokumenten kann das einige Sekunden dauern.
            </p>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* P7-03b — Anonymisierungs-Statusanzeige                              */}
        {/* ------------------------------------------------------------------ */}
        {showAnonRunning && (
          <div className="arztbrief-anon-status" role="status" aria-live="polite">
            <div className="arztbrief-anon-spinner" aria-hidden="true" />
            <span>Anonymisierung läuft (lokal im Browser) …</span>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Allgemeine Status-Meldungen                                          */}
        {/* ------------------------------------------------------------------ */}
        {status && (
          <div
            className={`arztbrief-alert ${status.type}`}
            role={status.type === "error" ? "alert" : "status"}
          >
            {status.message}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* P7-03b — Anonymisierungs-Ergebnis                                   */}
        {/* Zeigt AUSSCHLIESSLICH anonymisierten Text.                           */}
        {/* Bei Fehler: sichtbarer Stop-Hinweis, kein Rohtext.                  */}
        {/* ------------------------------------------------------------------ */}
        <section className="arztbrief-result" aria-label="Anonymisierter Text">
          <div className="arztbrief-result-head">
            <h2>Anonymisierter Text</h2>
            {(hasContent || showAnonFailed) && (
              <button className="arztbrief-reset" onClick={handleReset}>
                Zurücksetzen
              </button>
            )}
          </div>

          {showAnonFailed && !status && (
            <div className="arztbrief-alert error" role="alert">
              Anonymisierung fehlgeschlagen. Zur Sicherheit wird kein Text angezeigt.
              Bitte Seite neu laden.
            </div>
          )}

          {showAnonResult ? (
            <>
              <div className="arztbrief-anon-badge" aria-label="Hinweis zur Anonymisierung">
                Persönliche Daten wurden lokal ersetzt · Platzhalter z. B.{" "}
                <code>[NAME]</code>, <code>[ADRESSE]</code>, <code>[GEBURTSDATUM]</code>
              </div>
              <pre className="arztbrief-text">{anonText}</pre>
              <p className="arztbrief-meta">
                Anonymisierung: {anonReport?.totalReplacements ?? 0} Stellen ersetzt.
                {" · "}Quelle: {sourceLabel}.
                {" · "}Zeichen (nach Anonymisierung): {anonText.length.toLocaleString("de-DE")}
              </p>
              {anonReport?.totalReplacements === 0 && (
                <p className="arztbrief-anon-hint">
                  Keine erkennbaren Personendaten gefunden — bitte den Text selbst prüfen,
                  falls er Namen, Adressen oder andere persönliche Angaben enthält.
                </p>
              )}
            </>
          ) : !showAnonRunning && !showAnonFailed ? (
            <p className="arztbrief-empty">
              {ocrRunning
                ? "Texterkennung läuft …"
                : "Noch kein Text. Füge links Text ein oder lade rechts eine Datei hoch."}
            </p>
          ) : null}
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* P7-04b — LLM-Dekodierung Trigger + Ergebnis                         */}
        {/* Bedingung: nur wenn anonStatus === 'done' && anonText vorhanden       */}
        {/* Kein Call mit Rohtext, kein Call bei nicht fertiggestellter Anon     */}
        {/* ------------------------------------------------------------------ */}
        {showAnonResult && (
          <section className="arztbrief-decode-section" aria-label="KI-Dekodierung">
            <div className="arztbrief-decode-header">
              <h2>KI-Dekodierung</h2>
              <p className="arztbrief-decode-sub">
                Der anonymisierte Text wird an einen gesicherten Analysedienst gesendet.
                Kein Originaltext, keine Dateien — ausschließlich der anonymisierte Text.
              </p>
            </div>

            {llmStatus !== "done" && (
              <button
                className="arztbrief-decode-btn"
                onClick={handleDecode}
                disabled={llmStatus === "loading"}
                aria-busy={llmStatus === "loading"}
              >
                {llmStatus === "loading" ? (
                  <>
                    <span className="arztbrief-llm-spinner" aria-hidden="true" />
                    Analysiere …
                  </>
                ) : (
                  "Dekodieren"
                )}
              </button>
            )}

            {llmStatus === "loading" && (
              <div className="arztbrief-llm-loading" role="status" aria-live="polite">
                <span className="arztbrief-llm-spinner" aria-hidden="true" />
                <span>Anonymisierter Text wird analysiert … (Mistral, Zero-Retention)</span>
              </div>
            )}

            {llmStatus === "error" && llmError && (
              <div className="arztbrief-llm-error" role="alert">
                <strong>Analysefehler:</strong> {llmError}
                <button
                  className="arztbrief-decode-btn arztbrief-decode-btn--retry"
                  onClick={handleDecode}
                  style={{ marginTop: "12px", display: "block" }}
                >
                  Erneut versuchen
                </button>
              </div>
            )}

            {llmStatus === "done" && llmResult?.result && (
              <div className="arztbrief-llm-result">
                <div className="arztbrief-llm-result-header">
                  <span className="arztbrief-llm-result-badge">Analyse abgeschlossen</span>
                  <span className="arztbrief-llm-provider">
                    {llmResult.provider} · {llmResult.model}
                  </span>
                </div>

                {llmResult.result.worum_geht_es && (
                  <div className="arztbrief-llm-block">
                    <div className="arztbrief-llm-block-title">Worum geht es</div>
                    <p>{llmResult.result.worum_geht_es}</p>
                  </div>
                )}

                {llmResult.result.kurzfassung && (
                  <div className="arztbrief-llm-block">
                    <div className="arztbrief-llm-block-title">Kurzfassung</div>
                    <p>{llmResult.result.kurzfassung}</p>
                  </div>
                )}

                {llmResult.result.begriffe?.length > 0 && (
                  <div className="arztbrief-llm-block">
                    <div className="arztbrief-llm-block-title">Fachbegriffe erklärt</div>
                    <div className="arztbrief-llm-begriffe">
                      {llmResult.result.begriffe.map((b, i) => (
                        <div key={i} className="arztbrief-llm-begriffe-item">
                          <span className="arztbrief-llm-begriffe-term">{b.begriff}</span>
                          <span className="arztbrief-llm-begriffe-def">{b.erklaerung}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {llmResult.result.naechste_fragen?.length > 0 && (
                  <div className="arztbrief-llm-block">
                    <div className="arztbrief-llm-block-title">Mögliche Fragen an deinen Arzt</div>
                    <ul className="arztbrief-llm-list">
                      {llmResult.result.naechste_fragen.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {llmResult.result.warnhinweise?.length > 0 && (
                  <div className="arztbrief-llm-block">
                    <div className="arztbrief-llm-block-title">Hinweise zur Analyse</div>
                    <ul className="arztbrief-llm-list arztbrief-llm-warn-list">
                      {llmResult.result.warnhinweise.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="arztbrief-llm-block arztbrief-llm-disclaimer">
                  <p>
                    Diese Analyse dient ausschließlich zur Orientierung und ersetzt keine
                    ärztliche Beratung. VitalWissen stellt keine Diagnosen und gibt keine
                    Therapieempfehlungen.
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Ausblick / Hinweis                                                   */}
        {/* ------------------------------------------------------------------ */}
        <section className="arztbrief-next" aria-label="Ausblick">
          <h3>Was kommt als Nächstes</h3>
          <ol>
            <li>
              <strong>Anonymisierung</strong> persönlicher Daten — läuft jetzt lokal in deinem Browser. ✓
            </li>
            <li>
              <strong>KI-gestützte Dekodierung</strong> — implementiert (Beta, P7-04b).
              Nach „Dekodieren": anonymisierter Text → server-seitiger Proxy → Mistral (ZDR). ✓
            </li>
            <li>
              Parallelansicht mit Erklärungen und Verknüpfungen zu Laborwerten,
              Krankheiten, Medikamenten.
            </li>
          </ol>
          <p className="arztbrief-note">
            Sicherheit zuerst, Funktionen danach. Die Anonymisierung erkennt strukturierte
            Personendaten (Namen, Adressen, Geburtsdaten, Nummern). Freie Personenreferenzen
            im Fließtext können vereinzelt übersehen werden — bitte den Text im Zweifelsfall
            selbst prüfen.
          </p>
        </section>
      </div>
    </div>
  );
}
