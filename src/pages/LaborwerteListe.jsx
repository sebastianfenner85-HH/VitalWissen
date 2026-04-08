import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LABORWERTE, PANELS } from "../data/laborwerte";
import "./Laborwerte.css";

export default function LaborwerteListe() {
  const [search, setSearch] = useState("");
  const [panel, setPanel] = useState("Alle");
  const navigate = useNavigate();

  const filtered = LABORWERTE.filter((l) => {
    const matchSearch =
      !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.vollname.toLowerCase().includes(search.toLowerCase());
    const matchPanel = panel === "Alle" || l.panel === panel;
    return matchSearch && matchPanel;
  });

  return (
    <div className="lw-page">
      <div className="lw-header">
        <div className="container">
          <div className="lw-header-inner">
            <div>
              <h1 className="lw-title">Laborwert-Lexikon</h1>
              <p className="lw-subtitle">
                200+ Laborwerte erklärt — mit Referenzbereichen aus Deutschland, USA und Japan.
              </p>
            </div>
            <div className="lw-stats">
              <div className="stat">
                <span className="stat-n">200+</span>
                <span className="stat-l">Laborwerte</span>
              </div>
              <div className="stat">
                <span className="stat-n">3</span>
                <span className="stat-l">Leitlinien</span>
              </div>
            </div>
          </div>

          <div className="lw-filter-row">
            <div className="lw-search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Laborwert suchen…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="panel-filter">
              {["Alle", ...PANELS].map((p) => (
                <button
                  key={p}
                  className={`panel-btn ${panel === p ? "active" : ""}`}
                  onClick={() => setPanel(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container lw-grid-wrap">
        <p className="lw-count">{filtered.length} Laborwerte</p>
        <div className="lw-grid">
          {filtered.map((lw) => (
            <button
              key={lw.id}
              className="lw-card"
              onClick={() => navigate(`/laborwerte/${lw.slug}`)}
            >
              {lw.notfall_flag && (
                <span className="lw-notfall">⚠ Notfallrelevant</span>
              )}
              <div className="lw-card-top">
                <span className="lw-loinc">{lw.loinc}</span>
                <span className="lw-panel-tag">{lw.panel}</span>
              </div>
              <h3 className="lw-name">{lw.name}</h3>
              <p className="lw-vollname">{lw.vollname}</p>
              <p className="lw-desc">{lw.beschreibung_laienhaft?.substring(0, 100)}…</p>
              <div className="lw-card-footer">
                <div className="lw-ref-mini">
                  <span>DE: {lw.ref_de.min}–{lw.ref_de.max} {lw.ref_de.einheit}</span>
                </div>
                <span className="lw-arrow">→</span>
              </div>
            </button>
          ))}
        </div>

        <div className="lw-coming-soon">
          <div className="coming-soon-inner">
            <span className="coming-soon-icon">🔬</span>
            <h3>Weitere Laborwerte kommen</h3>
            <p>Momentan sind {LABORWERTE.length} Werte live. Das vollständige Lexikon mit 200+ LOINC-Werten wird schrittweise aufgebaut.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
