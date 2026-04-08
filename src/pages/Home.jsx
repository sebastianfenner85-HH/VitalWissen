import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LABORWERTE } from "../data/laborwerte";
import { SUPPLEMENTS } from "../data/supplements";
import "./Home.css";

const BEISPIELSUCHEN = [
  "TSH", "Vitamin D", "Ferritin", "Magnesium", "Omega-3", "HbA1c", "CRP"
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (q) => {
    const term = q.toLowerCase().trim();
    setQuery(q);
    if (!term) { setResults([]); return; }

    const lw = LABORWERTE.filter(
      (l) => l.name.toLowerCase().includes(term) || l.vollname.toLowerCase().includes(term) || l.panel?.toLowerCase().includes(term)
    ).map((l) => ({ ...l, typ: "laborwert" }));

    const supp = SUPPLEMENTS.filter(
      (s) => s.name.toLowerCase().includes(term) || s.wissenschaftlich.toLowerCase().includes(term) || s.kategorie.toLowerCase().includes(term)
    ).map((s) => ({ ...s, typ: "supplement" }));

    setResults([...lw, ...supp].slice(0, 6));
  };

  const handleSelect = (item) => {
    if (item.typ === "laborwert") navigate(`/laborwerte/${item.slug}`);
    else navigate(`/supplements/${item.slug}`);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner container">
          <div className="hero-badge">Beta · Kostenlos · Werbefrei</div>
          <h1 className="hero-title">
            Es gibt einen Moment, in dem man<br />
            <em>aufhört zu googeln</em><br />
            und anfängt zu verstehen.
          </h1>
          <p className="hero-subtitle">
            Evidenzbasierte Gesundheitsinformation auf Deutsch. Laborwerte, Supplements, 
            Medikamente und Arztbriefe — verstehen, nicht raten.
          </p>

          <div className="search-wrap">
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="search-input"
                type="text"
                placeholder="Laborwert, Supplement, Medikament oder Diagnose suchen…"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
              {query && (
                <button className="search-clear" onClick={() => { setQuery(""); setResults([]); }}>✕</button>
              )}
            </div>

            {results.length > 0 && (
              <div className="search-results">
                {results.map((item) => (
                  <button key={`${item.typ}-${item.id}`} className="result-item" onClick={() => handleSelect(item)}>
                    <span className={`result-type result-type-${item.typ === "laborwert" ? "blue" : "green"}`}>
                      {item.typ === "laborwert" ? "Laborwert" : "Supplement"}
                    </span>
                    <span className="result-name">{item.name}</span>
                    <span className="result-sub">{item.typ === "laborwert" ? item.vollname : item.wissenschaftlich}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="beispiel-wrap">
            <span className="beispiel-label">Zum Beispiel:</span>
            {BEISPIELSUCHEN.map((b) => (
              <button key={b} className="beispiel-tag" onClick={() => handleSearch(b)}>
                {b}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="features-grid">
          {[
            {
              icon: "🔬",
              title: "Laborwert-Lexikon",
              desc: "200+ Laborwerte mit Referenzbereichen aus Deutschland, USA und Japan. Regler-System für internationalen Vergleich.",
              to: "/laborwerte",
              ready: true,
            },
            {
              icon: "💊",
              title: "Supplement-Kompass",
              desc: "Evidenzbasierte Infos zu 150+ Supplements. Dosierung, Formen, Interaktionen — ohne Affiliate-Interessen.",
              to: "/supplements",
              ready: true,
            },
            {
              icon: "📄",
              title: "Arztbrief-Decoder",
              desc: "Befunde und Entlassbriefe verständlich gemacht. Medizinisches Kauderwelsch auf Deutsch erklärt.",
              to: "/arztbrief",
              ready: false,
            },
            {
              icon: "🏥",
              title: "Krankheits-Lexikon",
              desc: "500+ Erkrankungen erklärt — auf drei Sprachebenen. Vom Symptom zur Diagnose zur Behandlung.",
              to: "/krankheiten",
              ready: false,
            },
            {
              icon: "💉",
              title: "Medikamenten-Erklärer",
              desc: "500+ Wirkstoffe erklärt. Beipackzettel-Decoder, Interaktionscheck — auch mit Supplements.",
              to: "/medikamente",
              ready: false,
            },
            {
              icon: "🧭",
              title: "Diagnose-Navigator",
              desc: "Was als nächstes? Behandlungsstandards, Spezialisten-Suche, klinische Studien nach PLZ.",
              to: "/navigator",
              ready: false,
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`feature-card ${f.ready ? "feature-card-ready" : "feature-card-soon"}`}
              onClick={() => f.ready && navigate(f.to)}
            >
              <span className="feature-icon">{f.icon}</span>
              <div>
                <h3 className="feature-title">
                  {f.title}
                  {!f.ready && <span className="feature-soon">Bald</span>}
                </h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="trust-section container">
        <div className="trust-inner">
          <div className="trust-item">
            <span className="trust-icon">🚫</span>
            <span>Keine Werbung</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">🚫</span>
            <span>Kein Affiliate</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">📚</span>
            <span>Quellentransparent</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span>Datenschutz-first</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">🇩🇪</span>
            <span>Server in Deutschland</span>
          </div>
        </div>
        <p className="trust-disclaimer">
          VitalWissen ersetzt keine ärztliche Beratung. Bei Notfällen: <strong>112</strong> anrufen.
        </p>
      </section>
    </div>
  );
}
