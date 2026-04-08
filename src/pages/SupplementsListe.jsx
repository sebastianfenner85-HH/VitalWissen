import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SUPPLEMENTS, SUPPLEMENT_KATEGORIEN } from "../data/supplements";
import EvidenzAmpel from "../components/EvidenzAmpel";
import "./Supplements.css";

export default function SupplementsListe() {
  const [search, setSearch] = useState("");
  const [kat, setKat] = useState("Alle");
  const navigate = useNavigate();

  const filtered = SUPPLEMENTS.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.wissenschaftlich.toLowerCase().includes(search.toLowerCase()) ||
      s.wofuer.toLowerCase().includes(search.toLowerCase());
    const matchKat = kat === "Alle" || s.kategorie === kat;
    return matchSearch && matchKat;
  });

  return (
    <div className="supp-page">
      <div className="supp-header">
        <div className="container">
          <div className="supp-header-inner">
            <div>
              <h1 className="supp-title">Supplement-Kompass</h1>
              <p className="supp-subtitle">
                Evidenzbasiert. Wirkstoffbasiert. Ohne Affiliate-Interessen.
              </p>
            </div>
            <div className="supp-stats">
              <div className="stat">
                <span className="stat-n">150+</span>
                <span className="stat-l">Supplements</span>
              </div>
              <div className="stat">
                <span className="stat-n">3</span>
                <span className="stat-l">Dosierungs-quellen</span>
              </div>
            </div>
          </div>

          <div className="supp-filter-row">
            <div className="supp-search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Supplement suchen…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="kat-filter">
              {["Alle", ...SUPPLEMENT_KATEGORIEN].map((k) => (
                <button
                  key={k}
                  className={`kat-btn ${kat === k ? "active" : ""}`}
                  onClick={() => setKat(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container supp-grid-wrap">
        <p className="supp-count">{filtered.length} Supplements</p>
        <div className="supp-grid">
          {filtered.map((s) => (
            <button
              key={s.id}
              className="supp-card"
              onClick={() => navigate(`/supplements/${s.slug}`)}
            >
              <div className="supp-card-top">
                <span className="supp-kat-tag">{s.kategorie}</span>
                <EvidenzAmpel level={s.evidenz_ampel} size="sm" />
              </div>
              <h3 className="supp-name">{s.name}</h3>
              <p className="supp-wissenschaftlich">{s.wissenschaftlich}</p>
              <p className="supp-wofuer">{s.wofuer.substring(0, 90)}…</p>
              <div className="supp-card-footer">
                <div className="supp-dosierung-mini">
                  BfR: {s.dosierung.bfr.wert} {s.dosierung.bfr.einheit.split(" ")[0]}
                </div>
                <span className="supp-arrow">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
