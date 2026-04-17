import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "./Arztbrief.css";

// Worker lokal aus Build geladen — kein CDN, kein externer Request.
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

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
// Kein CDN, kein Drittanbieter-Request — alle Dateien laufen über die eigene App-Origin.
const TESSERACT_LOCAL = {
  workerPath: "/tesseract/worker.min.js",
  corePath: "/tesseract",      // Worker hängt z.B. /tesseract-core-simd-lstm.wasm.js an
  langPath: "/tessdata",       // Worker lädt /tessdata/deu.traineddata.gz + /tessdata/eng.traineddata.gz
  gzip: true,
};

/**
 * OCR einer PDF via pdfjs-Render → Canvas → Tesseract.js (WASM, same-origin).
 * Worker, WASM-Core und Sprachdaten kommen vollständig von der eigenen App-Origin.
 *
 * P7-02c-fix: Nach page.render() wird der Render-Canvas via createImageBitmap
 * in einen frischen ocrCanvas kopiert (weißer Hintergrund, kein aktiver pdfjs-
 * Renderkontext). Identisches Muster wie fix2 für Bilder — verhindert das
 * 0%-Hängen des WASM-Workers wenn der Canvas noch einen aktiven pdfjs-
 * Renderkontext trägt oder transparente (RGBA) Pixel enthält.
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

      // Render-Canvas: weißer Hintergrund vor pdfjs-Render verhindert
      // transparente Pixel bei PDFs ohne expliziten Seitenhintergrund.
      const renderCanvas = document.createElement("canvas");
      renderCanvas.width = viewport.width;
      renderCanvas.height = viewport.height;
      const ctx = renderCanvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;

      // Render-Canvas → ImageBitmap → frischer ocrCanvas (kein aktiver
      // pdfjs-Kontext, clean für WASM-Worker — identisch fix2-Muster).
      const imgBitmap = await createImageBitmap(renderCanvas);
      const ocrCanvas = document.createElement("canvas");
      ocrCanvas.width = imgBitmap.width;
      ocrCanvas.height = imgBitmap.height;
      ocrCanvas.getContext("2d").drawImage(imgBitmap, 0, 0);
      imgBitmap.close();

      const { data } = await worker.recognize(ocrCanvas);
      const pageText = (data.text || "").trim();
      if (pageText) full += (full ? "\n\n" : "") + pageText;
      // Fortschritt seitenbasiert
      onProgress(Math.round((p / n) * 100));
    }
    return full;
  } finally {
    await worker.terminate();
  }
}

/**
 * OCR eines Bild-Files (PNG/JPG/JPEG) via Tesseract.js (WASM, same-origin).
 * Das File-Objekt wird zunächst im Hauptthread via createImageBitmap → Canvas
 * konvertiert, bevor es an den Worker übergeben wird. Das verhindert Abstürze
 * (RuntimeError: Aborted) die auftreten wenn der Vite-gebundelte Worker ein
 * File-Objekt direkt zu verarbeiten versucht (URL.createObjectURL-Einschränkung
 * im Worker-Kontext).
 */
async function ocrImageFile(file, onPhase, onProgress) {
  const { createWorker } = await import("tesseract.js");
  onPhase("preparing");

  // File → ImageBitmap → Canvas (im Hauptthread, bevor Worker startet)
  const imgBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = imgBitmap.width;
  canvas.height = imgBitmap.height;
  canvas.getContext("2d").drawImage(imgBitmap, 0, 0);
  imgBitmap.close(); // Speicher freigeben

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
  const [text, setText] = useState("");
  const [source, setSource] = useState("idle"); // idle | paste | pdf | ocr
  const [status, setStatus] = useState(null);   // { type: "error"|"warn", message }
  const [loading, setLoading] = useState(false);
  const [ocrPhase, setOcrPhase] = useState(null);    // null|"preparing"|"running"|"done"|"failed"
  const [ocrProgress, setOcrProgress] = useState(0); // 0–100
  const fileRef = useRef(null);

  function resetOcr() {
    setOcrPhase(null);
    setOcrProgress(0);
  }

  async function handleFile(e) {
    setStatus(null);
    resetOcr();
    const file = e.target.files?.[0];
    if (!file) {
      setStatus({ type: "warn", message: "Keine Datei ausgewählt." });
      return;
    }

    // F1 — nicht unterstütztes Format
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
          // Pfad A — Text-Layer vorhanden (unveränderter P7-02-Pfad)
          setText(layerText);
          setSource("pdf");
        } else {
          // Pfad B — kein Text-Layer → lokal OCR
          try {
            const ocrText = await ocrPdfDoc(pdfDoc, setOcrPhase, setOcrProgress);
            if (!ocrText) {
              // F3 — OCR leer
              setText("");
              setSource("ocr");
              resetOcr();
              setStatus({
                type: "warn",
                message:
                  "OCR hat keinen verwertbaren Text erkannt. Ist das Dokument gut lesbar und nicht zu klein gedruckt? Die Datei hat dein Gerät nicht verlassen.",
              });
            } else {
              setText(ocrText);
              setSource("ocr");
              setOcrPhase("done");
            }
          } catch (ocrErr) {
            // F2 — OCR technisch fehlgeschlagen
            console.error("OCR (PDF) failed", ocrErr);
            setText("");
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
        // Bild-Datei (PNG/JPG/JPEG) → lokal OCR
        try {
          const ocrText = await ocrImageFile(file, setOcrPhase, setOcrProgress);
          if (!ocrText) {
            // F3 — OCR leer
            setText("");
            setSource("ocr");
            resetOcr();
            setStatus({
              type: "warn",
              message:
                "OCR hat keinen verwertbaren Text erkannt. Ist das Bild scharf und gut ausgeleuchtet? Die Datei hat dein Gerät nicht verlassen.",
            });
          } else {
            setText(ocrText);
            setSource("ocr");
            setOcrPhase("done");
          }
        } catch (ocrErr) {
          // F2 — OCR technisch fehlgeschlagen
          console.error("OCR (image) failed", ocrErr);
          setText("");
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
      // Generischer Datei-Fehler (beschädigt, passwortgeschützt …)
      console.error("File processing failed", err);
      setText("");
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

  function handlePaste(e) {
    const value = e.target.value;
    setText(value);
    setSource(value ? "paste" : "idle");
    setStatus(null);
    resetOcr();
  }

  function handleReset() {
    setText("");
    setSource("idle");
    setStatus(null);
    resetOcr();
    if (fileRef.current) fileRef.current.value = "";
  }

  const ocrRunning = ocrPhase === "preparing" || ocrPhase === "running";

  return (
    <div className="arztbrief-page">
      <div className="container">
        <header className="arztbrief-header">
          <span className="badge badge-primary">Beta · Erster Baustein</span>
          <h1>Arztbrief-Decoder</h1>
          <p className="arztbrief-sub">
            Arztbriefe, Befunde und Entlassbriefe verständlich machen —
            in dieser Vorversion zunächst als lokale Textvorschau.
          </p>
        </header>

        <section className="arztbrief-banner" aria-label="Datenschutz-Status">
          <div className="arztbrief-banner-row">
            <span className="arztbrief-chip ok">Lokal im Browser</span>
            <span className="arztbrief-chip pending">Noch keine Anonymisierung</span>
            <span className="arztbrief-chip pending">Noch keine KI-Dekodierung</span>
          </div>
          <p className="arztbrief-banner-text">
            Dein Text verlässt dein Gerät in dieser Vorversion <strong>nicht</strong>.
            Es wird nichts gespeichert, nichts an einen Server, eine Datenbank
            oder einen KI-Dienst geschickt. Auch beim Neuladen der Seite ist
            alles wieder leer.
          </p>
        </section>

        <div className="arztbrief-grid">
          <section className="arztbrief-card">
            <h2>Text einfügen</h2>
            <p className="arztbrief-card-sub">
              Kopiere den Text aus deinem Arztbrief oder tippe ihn ab.
            </p>
            <textarea
              className="arztbrief-textarea"
              placeholder="Text hier einfügen …"
              value={source === "paste" ? text : ""}
              onChange={handlePaste}
              rows={10}
            />
          </section>

          <section className="arztbrief-card">
            <h2>Dokument oder Bild hochladen</h2>
            <p className="arztbrief-card-sub">
              PDF (mit oder ohne Text-Layer), PNG oder JPG.
              Text-Extraktion und OCR laufen vollständig in deinem Browser.
            </p>
            <label className="arztbrief-upload">
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf,.pdf,image/png,.png,image/jpeg,.jpg,.jpeg"
                onChange={handleFile}
                disabled={loading || ocrRunning}
              />
              <span>
                {ocrRunning
                  ? ocrPhase === "preparing"
                    ? "OCR wird vorbereitet …"
                    : `OCR läuft … ${ocrProgress} %`
                  : loading
                  ? "Lese Datei …"
                  : "Datei auswählen"}
              </span>
            </label>
          </section>
        </div>

        {/* F4 — OCR-Statusanzeige (verhindert stilles Warten) */}
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

        {status && (
          <div
            className={`arztbrief-alert ${status.type}`}
            role={status.type === "error" ? "alert" : "status"}
          >
            {status.message}
          </div>
        )}

        <section className="arztbrief-result" aria-label="Vorschau">
          <div className="arztbrief-result-head">
            <h2>Vorschau</h2>
            {(text || ocrPhase === "failed") && (
              <button className="arztbrief-reset" onClick={handleReset}>
                Zurücksetzen
              </button>
            )}
          </div>
          {text ? (
            <pre className="arztbrief-text">{text}</pre>
          ) : (
            <p className="arztbrief-empty">
              {ocrRunning
                ? "Texterkennung läuft …"
                : "Noch kein Text. Füge links Text ein oder lade rechts eine Datei hoch."}
            </p>
          )}
          {text && (
            <p className="arztbrief-meta">
              {source === "pdf"
                ? "Quelle: lokal aus PDF-Text-Layer extrahiert."
                : source === "ocr"
                ? "Quelle: lokal per OCR erkannt (Texterkennung im Browser)."
                : "Quelle: eingefügter Text."}
              {" · "}
              Zeichen: {text.length.toLocaleString("de-DE")}
            </p>
          )}
        </section>

        <section className="arztbrief-next" aria-label="Ausblick">
          <h3>Was kommt als Nächstes</h3>
          <ol>
            <li>Anonymisierung persönlicher Daten — bevor irgendetwas das Gerät verlässt.</li>
            <li>KI-gestützte Dekodierung mit Zero-Retention-Vertrag.</li>
            <li>Parallelansicht mit Erklärungen und Verknüpfungen zu Laborwerten, Krankheiten, Medikamenten.</li>
          </ol>
          <p className="arztbrief-note">
            Diese Vorversion ist bewusst minimal. Sicherheit zuerst, Funktionen danach.
          </p>
        </section>
      </div>
    </div>
  );
}
