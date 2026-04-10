import "./EvidenzAmpel.css";

const CONFIG = {
  stark: { label: "Starke Evidenz", color: "green", desc: "Mehrere gut durchgeführte Studien belegen diesen Zusammenhang." },
  moderat: { label: "Moderate Evidenz", color: "yellow", desc: "Einige Studien zeigen positive Effekte, weitere Forschung nötig." },
  schwach: { label: "Schwache Evidenz", color: "orange", desc: "Nur wenige oder kleine Studien vorhanden, Ergebnisse inkonsistent." },
  widersprüchlich: { label: "Widersprüchliche Evidenz", color: "purple", desc: "Studien zeigen gegensätzliche Ergebnisse." },
  keine: { label: "Keine Evidenz", color: "gray", desc: "Keine aussagekräftigen Studien verfügbar." },
};

export default function EvidenzAmpel({ level, showDesc = false, size = "md", compact = false }) {
  const config = CONFIG[level] || CONFIG.keine;
  const resolvedSize = compact ? "sm" : size;

  return (
    <div className={`ampel ampel-${config.color} ampel-${resolvedSize}`}>
      <span className="ampel-dot" />
      <span className="ampel-label">{config.label}</span>
      {showDesc && <p className="ampel-desc">{config.desc}</p>}
    </div>
  );
}
