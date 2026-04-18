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
            in dieser Vorversion zunächst als lokale Textvorschau mit Anonymisierung.
          </p>
        </header>

        {/* ------------------------------------------------------------------ */}
        {/* Datenschutz-Banner — P7-03b: Anonymisierung aktiv                  */}
        {/* ------------------------------------------------------------------ */}
        <section className="arztbrief-banner" aria-label="Datenschutz-Status">
          <div className="arztbrief-banner-row">
            <span className="arztbrief-chip ok">Lokal im Browser</span>
            <span className="arztbrief-chip ok">Anonymisierung aktiv (lokal)</span>
            <span className="arztbrief-chip pending">Noch keine KI-Dekodierung</span>
          </div>
          <p className="arztbrief-banner-text">
            Dein Text verlässt dein Gerät in dieser Vorversion <strong>nicht</strong>.
            Texterkennung und Anonymisierung laufen vollständig in deinem Browser.
            Es wird nichts gespeichert, nichts an einen Server, eine Datenbank
            oder einen KI-Dienst geschickt. Beim Neuladen der Seite ist alles wieder leer.
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
        {/* Ausblick / Hinweis                                                   */}
        {/* ------------------------------------------------------------------ */}
        <section className="arztbrief-next" aria-label="Ausblick">
          <h3>Was kommt als Nächstes</h3>
          <ol>
            <li>
              <strong>Anonymisierung</strong> persönlicher Daten — läuft jetzt lokal in deinem Browser. ✓
            </li>
            <li>KI-gestützte Dekodierung mit Zero-Retention-Vertrag.</li>
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
