import { useParams, useNavigate } from "react-router-dom";
import { SUPPLEMENTS } from "../data/supplements";
import EvidenzAmpel from "../components/EvidenzAmpel";
import "./Supplements.css";

const SCHWERE_CONFIG = {
  hoch: { cls: "interaktion-hoch", badgeCls: "interaktion-schwere-badge", label: "HOCH", color: "#DC2626" },
  moderat: { cls: "interaktion-moderat", badgeCls: "interaktion-schwere-badge", label: "MODERAT", color: "#D97706" },
  niedrig: { cls: "interaktion-niedrig", badgeCls: "interaktion-schwere-badge", label: "GERING", color: "#6B7280" },
};

const BIOVERFU_CLS = (b) => {
  if (b.startsWith("Sehr")) return "form-bioverfu-high";
  if (b.startsWith("Hoch")) return "form-bioverfu-high";
  if (b.startsWith("Moderat")) return "form-bioverfu-mid";
  return "form-bioverfu-low";
};

export default function SupplementDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const s = SUPPLEMENTS.find((s) => s.slug === slug);

  if (!s) {
    return (
      <div className="supp-detail">
        <p>Supplement nicht gefunden.</p>
        <button onClick={() => navigate("/supplements")}>Zurück zur Übersicht</button>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="supp-detail">
        <button className="supp-detail-back" onClick={() => navigate("/supplements")}>
          ← Zurück zu Supplements
        </button>

        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span className="supp-kat-tag">{s.kategorie}</span>
            <EvidenzAmpel level={s.evidenz_ampel} showDesc />
          </div>
          <h1 className="supp-detail-title">{s.name}</h1>
          <p className="supp-detail-wissenschaftlich">{s.wissenschaftlich}</p>
        </div>

        {/* Wofür */}
        <div className="supp-section">
          <p className="supp-section-title">Wofür</p>
          <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--text-light)" }}>{s.wofuer}</p>
        </div>

        {/* Dosierung */}
        <div className="supp-section">
          <p className="supp-section-title">Dosierung — 3 Quellen im Vergleich</p>
          <div className="dosierung-grid">
            {[
              { org: "BfR (Deutschland)", key: "bfr" },
              { org: "NIH (USA)", key: "nih" },
              { org: "EFSA (Europa)", key: "efsa" },
            ].map(({ org, key }) => (
              <div key={key} className="dosierung-item">
                <div className="dosierung-org">{org}</div>
                <div className="dosierung-wert">{s.dosierung[key].wert}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>{s.dosierung[key].einheit}</div>
                <div className="dosierung-hinweis">{s.dosierung[key].hinweis}</div>
              </div>
            ))}
          </div>
          {s.dosierung.ul && (
            <div className="dosierung-ul">
              ⚠ <strong>Obere Grenze (UL):</strong> {s.dosierung.ul.wert} {s.dosierung.ul.einheit} — {s.dosierung.ul.hinweis}
            </div>
          )}
        </div>

        {/* Formen */}
        <div className="supp-section">
          <p className="supp-section-title">Formen & Bioverfügbarkeit</p>
          <div className="formen-list">
            {s.formen.map((f) => (
              <div
                key={f.name}
                className={`form-item ${f.empfohlen === true ? "empfohlen" : f.empfohlen === false ? "nicht-empfohlen" : ""}`}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span className="form-name">{f.name}</span>
                    <span className={`form-bioverfu ${BIOVERFU_CLS(f.bioverfu)}`}>{f.bioverfu}</span>
                  </div>
                  <p className="form-hinweis">{f.hinweis}</p>
                </div>
                {f.empfohlen === true && <span style={{ color: "var(--green)", fontSize: "18px" }}>✓</span>}
                {f.empfohlen === false && <span style={{ color: "#DC2626", fontSize: "18px" }}>✗</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Timing */}
        <div className="supp-section">
          <p className="supp-section-title">Einnahmezeitpunkt</p>
          <div style={{ background: "var(--primary-50)", padding: "14px 18px", borderRadius: "var(--radius-sm)", fontSize: "15px", color: "var(--primary-dark)", lineHeight: "1.6" }}>
            ⏰ {s.timing}
          </div>
        </div>

        {/* Kombinationen */}
        <div className="supp-section">
          <p className="supp-section-title">Kombinationen & Antagonismen</p>
          <div className="kombi-grid">
            <div>
              <p className="kombi-label" style={{ color: "var(--green)" }}>✓ Synergien</p>
              {s.kombinationen.synergien.map((k) => (
                <div key={k.name} className="kombi-item">
                  <span className="kombi-item-name">{k.name}</span>
                  {k.hinweis}
                </div>
              ))}
            </div>
            <div>
              <p className="kombi-label" style={{ color: "#DC2626" }}>⚠ Antagonisten</p>
              {s.kombinationen.antagonisten.length > 0 ? s.kombinationen.antagonisten.map((k) => (
                <div key={k.name} className="kombi-item">
                  <span className="kombi-item-name">{k.name}</span>
                  {k.hinweis}
                </div>
              )) : <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Keine bekannten Antagonisten</p>}
            </div>
          </div>
        </div>

        {/* Qualität */}
        <div className="supp-section">
          <p className="supp-section-title">Qualitätskriterien</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
            {s.qualitaet.kriterien.map((k) => (
              <span key={k} className="badge badge-primary">✓ {k}</span>
            ))}
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.6" }}>
            <strong>Worauf achten:</strong> {s.qualitaet.worauf_achten}
          </p>
        </div>

        {/* Interaktionen */}
        {s.interaktionen?.length > 0 && (
          <div className="supp-section">
            <p className="supp-section-title">Medikamenten-Interaktionen</p>
            <div className="interaktion-list">
              {s.interaktionen.map((i) => {
                const cfg = SCHWERE_CONFIG[i.schwere] || SCHWERE_CONFIG.niedrig;
                return (
                  <div key={i.name} className={`interaktion-item ${cfg.cls}`}>
                    <div style={{ flex: 1 }}>
                      <div className="interaktion-name">{i.name}</div>
                      <div className="interaktion-hinweis">{i.hinweis}</div>
                    </div>
                    <span className={cfg.badgeCls} style={{ background: "rgba(255,255,255,0.7)", color: cfg.color }}>
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "12px" }}>
              Immer den behandelnden Arzt oder Apotheker informieren, welche Supplements du einnimmst.
            </p>
          </div>
        )}

        {/* Relevante Laborwerte */}
        {s.laborwerte?.length > 0 && (
          <div className="supp-section">
            <p className="supp-section-title">Relevante Laborwerte</p>
            <div className="zusammenhaenge-chips" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {s.laborwerte.map((l) => (
                <span key={l} className="zusammenhaenge-chip"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "999px",
                    padding: "5px 14px",
                    fontSize: "13px",
                    color: "var(--text-light)"
                  }}>
                  🔬 {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Studien */}
        {s.studien?.length > 0 && (
          <div className="supp-section" style={{ background: "var(--surface-2)" }}>
            <p className="supp-section-title">Wichtige Studien</p>
            {s.studien.map((st) => (
              <div key={st.pmid} style={{ padding: "12px", background: "white", borderRadius: "var(--radius-sm)", marginBottom: "8px", fontSize: "14px" }}>
                <p style={{ fontWeight: "600", marginBottom: "4px" }}>{st.titel}</p>
                <p style={{ color: "var(--text-light)", fontSize: "13px" }}>{st.ergebnis}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "4px" }}>
                  {st.quelle} ·{" "}
                  <a href={`https://pubmed.ncbi.nlm.nih.gov/${st.pmid}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                    PubMed {st.pmid}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* NIH ODS Link */}
        <div className="supp-section" style={{ background: "var(--primary-50)", border: "1px solid var(--primary-100)" }}>
          <p className="supp-section-title" style={{ color: "var(--primary)" }}>Primärquelle</p>
          <a href={s.nih_ods_link} target="_blank" rel="noopener noreferrer" className="supp-nih-link">
            📚 NIH Office of Dietary Supplements — Vollständige Fachinformation (englisch)
          </a>
        </div>

        {/* Disclaimer */}
        <div style={{ padding: "20px", background: "var(--surface-2)", borderRadius: "var(--radius)", fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.6", marginTop: "8px" }}>
          <strong>Hinweis:</strong> Diese Informationen dienen der Aufklärung und ersetzen keine ärztliche Beratung. Supplements können Medikamente beeinflussen. Informiere deinen Arzt und Apotheker. Dosierungsangaben gelten für gesunde Erwachsene — bei Erkrankungen gelten andere Empfehlungen. Im Notfall: <strong>112</strong>.
        </div>
      </div>
    </div>
  );
}
