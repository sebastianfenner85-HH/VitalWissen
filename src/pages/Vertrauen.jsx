import { Link } from "react-router-dom";
import "./Vertrauen.css";

const QUELLENTYPEN = [
  {
    key: "guideline",
    icon: "📋",
    label: "Leitlinie / Standard-of-Care",
    beschreibung:
      "Nationale oder internationale Behandlungsleitlinien, die von Fachgesellschaften erstellt und periodisch überprüft werden. In Deutschland gelten sie als medizinischer Goldstandard.",
    ebene: "Primärquelle",
    beispiele: ["AWMF", "DGK", "DGE", "NVL"],
    saeule: "Verwendet in: Krankheiten (S5), Ableitungslogik (B4)",
  },
  {
    key: "regulatory",
    icon: "🏛️",
    label: "Regulatorisch / Zulassung",
    beschreibung:
      "Behördliche Zulassungsentscheidungen und -dokumentationen. Der verlässlichste Aktualitätsanker — Zulassungsstatus wird laufend gepflegt.",
    ebene: "Primärquelle",
    beispiele: ["EMA EPAR", "BfArM", "FDA", "EFSA", "WHO ATC"],
    saeule: "Verwendet in: Medikamente (S6), Supplements (S2)",
  },
  {
    key: "database",
    icon: "🗄️",
    label: "Strukturierte Datenbasis",
    beschreibung:
      "Standardisierte Klassifikationssysteme und systematisch gepflegte Referenzdatenbanken. International anerkannt, maschinenlesbar, stabil.",
    ebene: "Primärquelle",
    beispiele: ["LOINC", "ICD-10-GM", "NIH ODS", "USDA FoodData"],
    saeule: "Verwendet in: Laborwerte (S1), Ernährung (S18), Krankheiten (S5)",
  },
  {
    key: "research",
    icon: "🔬",
    label: "Forschungsquelle",
    beschreibung:
      "Peer-reviewte Primärliteratur — Studien, Reviews, Meta-Analysen. Nur mit PMID oder DOI: ohne verlinkbaren Nachweis wird keine Forschungsangabe übernommen.",
    ebene: "Primärquelle",
    beispiele: ["PubMed", "Cochrane", "PMC", "Epistemonikos"],
    saeule: "Verwendet in: Supplements (S2), Studienkompass (S3)",
  },
  {
    key: "patient_info",
    icon: "📖",
    label: "Patienteninformation",
    beschreibung:
      "Kuratierte Laienaufbereitung durch staatliche oder wissenschaftlich anerkannte Institutionen. Sekundärquellen — sie fassen Primärquellen zusammen, ersetzen sie nicht.",
    ebene: "Sekundärquelle",
    beispiele: ["IQWiG", "MedlinePlus", "Orphanet"],
    saeule: "Verwendet in: Krankheiten (S5) ergänzend",
  },
];

const NICHT_TUN = [
  "Diagnosen stellen oder Diagnosen nahelegen",
  "Therapieempfehlungen für konkrete Situationen geben",
  "Hersteller- oder Industriequellen ohne unabhängige Verifikation verwenden",
  "Wikipedia als Primärquelle verwenden",
  "KI-generierte Texte als Quellenersatz darstellen",
  "Affiliate-Links, Werbung oder Sponsoring einbinden",
];

export default function Vertrauen() {
  return (
    <div className="q2-page">
      <div className="container">

        {/* ── Seitenheader ── */}
        <div className="q2-header">
          <Link to="/" className="q2-back">← Startseite</Link>
          <h1 className="q2-title">Quellen & Vertrauen</h1>
          <p className="q2-subtitle">
            Woher kommen unsere Informationen — und warum genau diese?
          </p>
        </div>

        {/* ── V1: Was VitalWissen ist ── */}
        <section className="q2-section">
          <h2 className="q2-section-title">Was VitalWissen ist — und was nicht</h2>
          <div className="q2-prose">
            <p>
              VitalWissen fasst medizinisches Wissen zusammen, übersetzt es verständlich
              und vernetzt es mit verwandten Inhalten. Das ist alles.
            </p>
            <p>
              Wir stellen keine Diagnosen, geben keine Therapieempfehlungen und ersetzen
              keinen Arztbesuch. Jeder Eintrag beruht auf externen, professionell
              anerkannten Quellen — nicht auf eigenem medizinischen Urteil.
            </p>
          </div>
          <div className="q2-ist-nicht-grid">
            <div className="q2-ist-card q2-ist-card--ist">
              <span className="q2-ist-label">VitalWissen ist</span>
              <ul className="q2-ist-list">
                <li>Aggregation aus anerkannten Quellen</li>
                <li>Verständliche Übersetzung für Laien</li>
                <li>Vernetzung verwandter Inhalte</li>
                <li>Transparenz über Quellen und Herkunft</li>
              </ul>
            </div>
            <div className="q2-ist-card q2-ist-card--nicht">
              <span className="q2-ist-label">VitalWissen ist nicht</span>
              <ul className="q2-ist-list">
                <li>Diagnose oder Diagnose-Hilfe</li>
                <li>Therapieempfehlung</li>
                <li>Arzt- oder Facharztbesuch-Ersatz</li>
                <li>Eigenes medizinisches Wissen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── V2: Quellenphilosophie ── */}
        <section className="q2-section">
          <h2 className="q2-section-title">Unsere Quellenphilosophie</h2>
          <div className="q2-prose">
            <p>
              Jede Information auf VitalWissen muss auf eine verlinkbare, öffentlich
              zugängliche Quelle zurückführbar sein. Keine Ausnahmen. Quellen ohne
              PMID, DOI oder direkte Behörden-URL werden nicht übernommen.
            </p>
            <p>
              Wir nutzen ausschließlich behördliche Zulassungsquellen, anerkannte
              Leitlinien, staatliche Datenbanken oder peer-reviewte Forschung.
              KI-generierte Texte sind keine Quellen — sie können Fehler reproduzieren,
              ohne es kenntlich zu machen.
            </p>
            <p>
              VitalWissen ist vollständig werbefrei, hat keine Affiliate-Links und kein
              Sponsoring. Keine Quelle wird wegen finanzieller Interessen gewählt.
            </p>
          </div>
        </section>

        {/* ── V3: Quellentypen ── */}
        <section className="q2-section">
          <h2 className="q2-section-title">Quellentypen erklärt</h2>
          <p className="q2-section-lead">
            Fünf Quellentypen bilden die Grundlage aller Inhalte auf VitalWissen.
          </p>
          <div className="q2-typen-grid">
            {QUELLENTYPEN.map((typ) => (
              <div key={typ.key} className={`q2-typ-card q2-typ-card--${typ.key}`}>
                <div className="q2-typ-top">
                  <span className="q2-typ-icon">{typ.icon}</span>
                  <div>
                    <span className={`q2-typ-badge q2-typ-badge--${typ.key}`}>
                      {typ.label}
                    </span>
                    <span className={`q2-typ-ebene q2-typ-ebene--${typ.ebene === "Primärquelle" ? "primaer" : "sekundaer"}`}>
                      {typ.ebene}
                    </span>
                  </div>
                </div>
                <p className="q2-typ-beschreibung">{typ.beschreibung}</p>
                <div className="q2-typ-beispiele">
                  {typ.beispiele.map((b) => (
                    <span key={b} className={`q2-beispiel-chip q2-beispiel-chip--${typ.key}`}>
                      {b}
                    </span>
                  ))}
                </div>
                <p className="q2-typ-saeule">{typ.saeule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── V4: Quellenhierarchie ── */}
        <section className="q2-section">
          <h2 className="q2-section-title">Quellenhierarchie</h2>
          <p className="q2-section-lead">
            Nicht alle Quellen haben die gleiche Aussagekraft. Primärquellen belegen
            direkt — Sekundärquellen fassen zusammen.
          </p>
          <div className="q2-hierarchie">
            <div className="q2-hierarchie-level q2-hierarchie-level--1">
              <span className="q2-hierarchie-rank">1</span>
              <div className="q2-hierarchie-content">
                <span className="q2-hierarchie-name">Leitlinie &amp; Zulassung</span>
                <span className="q2-hierarchie-desc">
                  Höchste gesellschaftliche Akzeptanz. Periodisch durch Fachgesellschaften
                  oder Behörden geprüft. Grundlage für klinische Entscheidungen.
                </span>
                <div className="q2-hierarchie-chips">
                  <span className="q2-beispiel-chip q2-beispiel-chip--guideline">AWMF</span>
                  <span className="q2-beispiel-chip q2-beispiel-chip--regulatory">EMA EPAR</span>
                  <span className="q2-beispiel-chip q2-beispiel-chip--regulatory">BfArM</span>
                </div>
              </div>
              <span className="q2-hierarchie-tag">Primärquelle</span>
            </div>

            <div className="q2-hierarchie-level q2-hierarchie-level--2">
              <span className="q2-hierarchie-rank">2</span>
              <div className="q2-hierarchie-content">
                <span className="q2-hierarchie-name">Strukturierte Datenbasis</span>
                <span className="q2-hierarchie-desc">
                  Standardisierte Klassifikation. Maschinenlesbar, international
                  anerkannt, stabil gepflegt. Keine inhaltliche Wertung, nur Struktur.
                </span>
                <div className="q2-hierarchie-chips">
                  <span className="q2-beispiel-chip q2-beispiel-chip--database">LOINC</span>
                  <span className="q2-beispiel-chip q2-beispiel-chip--database">ICD-10-GM</span>
                  <span className="q2-beispiel-chip q2-beispiel-chip--database">NIH ODS</span>
                </div>
              </div>
              <span className="q2-hierarchie-tag">Primärquelle</span>
            </div>

            <div className="q2-hierarchie-level q2-hierarchie-level--3">
              <span className="q2-hierarchie-rank">3</span>
              <div className="q2-hierarchie-content">
                <span className="q2-hierarchie-name">Peer-reviewte Forschung</span>
                <span className="q2-hierarchie-desc">
                  Höchste Evidenzgrundlage für neue Erkenntnisse. Nur mit PMID oder
                  DOI verwendbar. Meta-Analysen und systematische Reviews bevorzugt.
                </span>
                <div className="q2-hierarchie-chips">
                  <span className="q2-beispiel-chip q2-beispiel-chip--research">PubMed</span>
                  <span className="q2-beispiel-chip q2-beispiel-chip--research">Cochrane</span>
                </div>
              </div>
              <span className="q2-hierarchie-tag">Primärquelle</span>
            </div>

            <div className="q2-hierarchie-level q2-hierarchie-level--4">
              <span className="q2-hierarchie-rank">4</span>
              <div className="q2-hierarchie-content">
                <span className="q2-hierarchie-name">Kuratierte Patienteninformation</span>
                <span className="q2-hierarchie-desc">
                  Aufbereitung durch staatlich anerkannte Institutionen. Fasst
                  Primärquellen zusammen — ergänzend, nicht gleichwertig zu Leitlinien.
                </span>
                <div className="q2-hierarchie-chips">
                  <span className="q2-beispiel-chip q2-beispiel-chip--patient_info">IQWiG</span>
                  <span className="q2-beispiel-chip q2-beispiel-chip--patient_info">MedlinePlus</span>
                  <span className="q2-beispiel-chip q2-beispiel-chip--patient_info">Orphanet</span>
                </div>
              </div>
              <span className="q2-hierarchie-tag q2-hierarchie-tag--sekundaer">Sekundärquelle</span>
            </div>
          </div>

          <div className="q2-hinweis-box">
            <span className="q2-hinweis-icon">ℹ️</span>
            <p>
              <strong>Wann gilt Leitlinie, wann gilt Forschungsstand?</strong> Bei
              Widersprüchen zwischen Leitlinie und einzelner Studie gilt die Leitlinie.
              Leitlinien basieren auf einer Gesamtbewertung der verfügbaren Evidenz —
              eine einzelne Studie reicht nicht, um sie zu widerlegen.
            </p>
          </div>
        </section>

        {/* ── V5: Aktualisierung ── */}
        <section className="q2-section">
          <h2 className="q2-section-title">Wie wir Inhalte aktualisieren</h2>
          <div className="q2-prose">
            <p>
              Einträge werden aktualisiert, wenn sich die zugrundeliegende Leitlinie,
              Zulassung oder Datenbasis ändert. Das Datum der letzten Aktualisierung
              ist auf jeder Detailseite angegeben.
            </p>
            <p>
              Es gibt zwei Arten von Einträgen: automatisch befüllte aus strukturierten
              Datenbanken (z. B. NIH ODS, ICD-10-GM) und manuell geprüfte auf Basis
              von AWMF-Leitlinien oder EMA-Zulassungsdokumenten. Beide Typen werden
              beim nächsten bekannten Leitlinien-Update nachgezogen.
            </p>
            <p>
              Kein Eintrag wird als „aktuell" bezeichnet ohne ein Datum. Kein Datum
              bedeutet nicht, dass die Information veraltet ist — aber es bedeutet,
              dass wir noch keine Zeitstempelung vorgenommen haben.
            </p>
          </div>
        </section>

        {/* ── V6: Was wir nicht tun ── */}
        <section className="q2-section">
          <h2 className="q2-section-title">Was wir bewusst nicht tun</h2>
          <ul className="q2-nicht-liste">
            {NICHT_TUN.map((item, i) => (
              <li key={i} className="q2-nicht-item">
                <span className="q2-nicht-icon">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── V7: Feedback ── */}
        <section className="q2-section q2-section--last">
          <h2 className="q2-section-title">Fehler gefunden?</h2>
          <div className="q2-feedback-box">
            <p className="q2-feedback-text">
              Wenn du einen inhaltlichen Fehler oder eine veraltete Information
              findest, schreib uns. Wir prüfen jeden Hinweis und ziehen den
              betreffenden Eintrag nach.
            </p>
            <a
              href="mailto:feedback@vitalwissen.de"
              className="q2-feedback-btn"
            >
              Fehler melden →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
