import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "./Arztbrief.css";

// Worker wird lokal aus dem eigenen Build geladen (Vite ?url-Import).
// Keine CDN, kein externer Request.
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export default function Arztbrief() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("idle"); // idle | paste | pdf
  const [status, setStatus] = useState(null); // { type: "error" | "warn", message }
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  async function handlePdf(e) {
    setStatus(null);
    const file = e.target.files?.[0];
    if (!file) {
      setStatus({ type: "warn", message: "Keine Datei ausgewählt." });
      return;
    }
    const nameLower = (file.name || "").toLowerCase();
    const isPdf =
      file.type === "application/pdf" || nameLower.endsWith(".pdf");
    if (!isPdf) {
      setStatus({
        type: "error",
        message:
          "Das ist keine PDF-Datei. Bitte wähle eine Datei mit der Endung .pdf.",
      });
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setLoading(true);
    try {
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      let full = "";
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((i) => ("str" in i ? i.str : ""))
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        if (pageText) {
          full += (full ? "\n\n" : "") + pageText;
        }
      }
      if (!full.trim()) {
        setText("");
        setSource("pdf");
        setStatus({
          type: "warn",
          message:
            "Text-Layer nicht erkannt. OCR für Foto- und Scan-PDFs ist in dieser Vorversion noch nicht aktiv. Nichts wurde versendet.",
        });
      } else {
        setText(full);
        setSource("pdf");
      }
    } catch (err) {
      console.error("PDF extraction failed", err);
      setStatus({
        type: "error",
        message:
          "Die PDF konnte nicht gelesen werden. Ist sie passwortgeschützt oder beschädigt? Die Datei hat dein Gerät nicht verlassen.",
      });
      setText("");
      setSource("idle");
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
  }

  function handleReset() {
    setText("");
    setSource("idle");
    setStatus(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="arztbrief-page">
      <div className="container">
        <header className="arztbrief-header">
          <span className="badge badge-primary">Beta · Erster Baustein</span>
          <h1>Arztbrief-Decoder</h1>
          <p className="arztbrief-sub">
            Arztbriefe, Befunde und Entlassbriefe verständlich machen —
            in dieser Vorversion zunächst ausschließlich als lokale Textvorschau.
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
            <h2>PDF mit Text-Layer hochladen</h2>
            <p className="arztbrief-card-sub">
              Nur für digitale Druck-PDFs (kein Scan, kein Foto, keine Handschrift).
              Die Text-Extraktion läuft vollständig in deinem Browser.
            </p>
            <label className="arztbrief-upload">
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handlePdf}
                disabled={loading}
              />
              <span>{loading ? "Lese PDF …" : "PDF auswählen"}</span>
            </label>
          </section>
        </div>

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
            {text && (
              <button className="arztbrief-reset" onClick={handleReset}>
                Zurücksetzen
              </button>
            )}
          </div>
          {text ? (
            <pre className="arztbrief-text">{text}</pre>
          ) : (
            <p className="arztbrief-empty">
              Noch kein Text. Füge links Text ein oder lade rechts eine PDF hoch.
            </p>
          )}
          {text && (
            <p className="arztbrief-meta">
              {source === "pdf"
                ? "Quelle: lokal aus PDF extrahiert."
                : "Quelle: eingefügter Text."}
              {" · "}
              Zeichen: {text.length.toLocaleString("de-DE")}
            </p>
          )}
        </section>

        <section className="arztbrief-next" aria-label="Ausblick">
          <h3>Was kommt als Nächstes</h3>
          <ol>
            <li>OCR für Foto- und Scan-PDFs — weiterhin lokal im Browser.</li>
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
