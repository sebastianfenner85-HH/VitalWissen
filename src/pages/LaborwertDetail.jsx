import { useParams, useNavigate } from "react-router-dom";
import { LABORWERTE } from "../data/laborwerte";
import "./Laborwerte.css";

const LEITLINIEN = [
  { key: "de", flag: "🇩🇪", label: "DGKL (Deutschland)" },
  { key: "usa", flag: "🇺🇸", label: "AACC (USA)" },
  { key: "jp", flag: "🇯🇵", label: "JSCC (Japan)" },
];

export default function LaborwertDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const lw = LABORWERTE.find((l) => l.slug === slug);

  if (!lw) {
    return (
      <div className="lw-detail">
        <p>Laborwert nicht gefunden.</p>
        <button onClick={() => navigate("/laborwerte")}>Zurück zur Übersicht</button>
      </div>
    );
  }

  const refs = { de: lw.ref_de, usa: lw.ref_usa, jp: lw.ref_jp };

  // Calculate how much the ranges differ
  const ranges = LEITLINIEN.map((l) => refs[l.key]);
  const minValues = ranges.map((r) => r?.min).filter(Boolean);
  const maxValues = ranges.map((r) => r?.max).filter(Boolean);
  const rangesDiffer = Math.max(...maxValues) - Math.min(...maxValues) > 0.5;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="lw-detail">
        <button className="lw-detail-back" onClick={() => navigate("/laborwerte")}>
          ← Zurück zu Laborwerte
        </button>

        <div className="lw-detail-header">
          <div className="lw-detail-meta">
            <span className="lw-loinc">LOINC {lw.loinc}</span>
            <span className="lw-panel-tag">{lw.panel}</span>
            {lw.zyklusabhaengig && (
              <span className="badge badge-yellow">🔄 Zyklusabhängig</span>
            )}
          </div>
          <h1 className="lw-detail-title">{lw.name}</h1>
          <p className="lw-detail-vollname">{lw.vollname}</p>

          {lw.notfall_flag && (
            <div className="notfall-banner">
              <span>⚠️</span>
              <span><strong>Notfallrelevant:</strong> {lw.notfall_beschreibung}</span>
            </div>
          )}
        </div>

        {/* Beschreibung */}
        <div className="detail-section">
          <p className="detail-section-title">Was ist das?</p>
          <p className="beschreibung-text">{lw.beschreibung_laienhaft}</p>
        </div>

        {/* Referenzbereiche */}
        <div className="detail-section">
          <p className="detail-section-title">Referenzbereiche — 3 Leitlinien im Vergleich</p>
          <div className="referenz-grid">
            {LEITLINIEN.map((l) => {
              const ref = refs[l.key];
              if (!ref) return null;
              return (
                <div key={l.key} className="referenz-item">
                  <span className="referenz-flag">{l.flag}</span>
                  <div className="referenz-quelle">{l.label}</div>
                  <div className="referenz-wert">{ref.min} – {ref.max}</div>
                  <div className="referenz-einheit">{ref.einheit}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>{ref.quelle}</div>
                </div>
              );
            })}
          </div>
          {rangesDiffer && (
            <div className="referenz-diff">
              💡 Die Referenzbereiche unterscheiden sich zwischen den Leitlinien — das ist normal. Dein Labor gibt den verwendeten Bereich auf dem Befund an.
            </div>
          )}
          {lw.gender_context && (
            <div style={{ marginTop: "16px", padding: "14px", background: "var(--surface-2)", borderRadius: "var(--radius-sm)" }}>
              <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>🚻 Geschlechtsspezifische Unterschiede</p>
              {Object.entries(lw.gender_context).map(([key, val]) => (
                <p key={key} style={{ fontSize: "13px", color: "var(--text-light)", marginBottom: "4px" }}>
                  <strong>{key === "maennlich" ? "♂ Männer" : key === "weiblich" ? "♀ Frauen" : "Postmenopause"}:</strong>{" "}
                  {val.min}–{val.max} — {val.hinweis}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Ursachen */}
        <div className="detail-section">
          <p className="detail-section-title">Ursachen</p>
          <div className="ursachen-grid">
            <div>
              <div className="ursachen-label" style={{ color: "#DC2626" }}>↑ Zu hoch</div>
              <ul className="ursachen-list ursachen-hoch">
                {lw.ursachen_hoch.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
            <div>
              <div className="ursachen-label" style={{ color: "#2563EB" }}>↓ Zu niedrig</div>
              <ul className="ursachen-list ursachen-niedrig">
                {lw.ursachen_niedrig.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Wann zum Arzt */}
        <div className="detail-section">
          <p className="detail-section-title">Wann zum Arzt?</p>
          <div className="wann-arzt-box">{lw.wann_arzt}</div>
        </div>

        {/* Zusammenhänge */}
        {lw.zusammenhaenge?.length > 0 && (
          <div className="detail-section">
            <p className="detail-section-title">Zusammenhänge mit anderen Werten</p>
            <div className="zusammenhaenge-chips">
              {lw.zusammenhaenge.map((z) => (
                <span key={z} className="zusammenhaenge-chip">{z}</span>
              ))}
            </div>
          </div>
        )}

        {/* Einflüsse */}
        {(lw.supplement_einfluss?.length > 0 || lw.medikament_einfluss?.length > 0) && (
          <div className="detail-section">
            <p className="detail-section-title">Was beeinflusst diesen Wert?</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {lw.supplement_einfluss?.length > 0 && (
                <div>
                  <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", color: "var(--primary)" }}>💊 Supplements</p>
                  {lw.supplement_einfluss.map((s) => (
                    <span key={s} className="zusammenhaenge-chip" style={{ display: "inline-block", margin: "3px" }}>{s}</span>
                  ))}
                </div>
              )}
              {lw.medikament_einfluss?.length > 0 && (
                <div>
                  <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", color: "#7C3AED" }}>💉 Medikamente</p>
                  {lw.medikament_einfluss.map((m) => (
                    <span key={m} className="zusammenhaenge-chip" style={{ display: "inline-block", margin: "3px" }}>{m}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fachlicher Hintergrund */}
        {lw.beschreibung_fachlich && (
          <div className="detail-section" style={{ background: "var(--surface-2)" }}>
            <p className="detail-section-title">Fachlicher Hintergrund</p>
            <p className="beschreibung-text" style={{ fontSize: "14px" }}>{lw.beschreibung_fachlich}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div style={{ padding: "20px", background: "var(--surface-2)", borderRadius: "var(--radius)", fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.6", marginTop: "8px" }}>
          <strong>Hinweis:</strong> Diese Informationen dienen der Aufklärung und ersetzen keine ärztliche Beratung. Laborwerte müssen immer im klinischen Kontext interpretiert werden. Bei Fragen zu deinen Befunden wende dich an deinen Arzt. Im Notfall: <strong>112</strong>.
        </div>
      </div>
    </div>
  );
}
