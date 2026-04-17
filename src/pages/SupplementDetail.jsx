import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSupplementBySlug } from '../lib/queries'
import EvidenzAmpel from '../components/EvidenzAmpel'
import './Supplements.css'

// S2-BUILD-01: Dosierungsquellen — semantisch korrekte Labels laut P7B-Freeze.
// BfR/NIH/EFSA sind KEINE Therapiedosen. Alle drei sind Referenzwerte für die gesunde Bevölkerung.
// NIH-Wert ist RDA (Recommended Dietary Allowance) — kein therapeutischer Wert.
// BfR/EFSA sind für alle 51 Einträge noch leer (Pipeline befüllt nicht).
const DOSIERUNGS_QUELLEN = [
  { key: 'bfr',  label: 'BfR',  typ: 'D-A-CH-Referenzwert' },
  { key: 'nih',  label: 'NIH',  typ: 'Empfehlung (allg. Bevölkerung)' },
  { key: 'efsa', label: 'EFSA', typ: 'EU-Referenzwert' },
]

export default function SupplementDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [s, setS] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getSupplementBySlug(slug)
        setS(data)
      } catch (err) {
        console.error(err)
        setError('Supplement nicht gefunden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Wird geladen…
      </div>
    )
  }

  if (error || !s) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--red)', marginBottom: 12 }}>{error || 'Supplement nicht gefunden.'}</p>
        <button className="supp-detail-back" onClick={() => navigate('/supplements')}>← Zurück zur Liste</button>
      </div>
    )
  }

  // S2-BUILD-01: Defensive Array-Guards für alle JSONB-Felder.
  // Verhindert Laufzeitfehler bei null/non-Array JSONB-Rückgaben.
  const formen         = Array.isArray(s.formen)                   ? s.formen                   : []
  const synergien      = Array.isArray(s.synergien)                ? s.synergien                : []
  const antagonisten   = Array.isArray(s.antagonisten)             ? s.antagonisten             : []
  const qualitaet      = Array.isArray(s.qualitaet_kriterien)      ? s.qualitaet_kriterien      : []
  const studien        = Array.isArray(s.studien)                  ? s.studien                  : []
  const medInteraktion = Array.isArray(s.medikament_interaktionen) ? s.medikament_interaktionen : []
  const biomarker      = Array.isArray(s.beeinflusste_laborwerte)  ? s.beeinflusste_laborwerte  : []

  // S2-BUILD-01: Studien-Filter — nur Studien mit validem Titel exponieren (kein PMID-only).
  // Laut P7B-Freeze: "Studien: Nur bei Daten, nur mit validem Titel (nicht nur PMID)"
  // Grund: PMID ohne Titel/Kontext ist keine sinnvolle Nutzerinformation.
  const studienMitTitel = studien.filter(st =>
    typeof st === 'string'
      ? st.trim().length > 0
      : (st.titel && st.titel.trim().length > 0)
  )

  const dosierung = {
    bfr:  { wert: s.dosierung_bfr_wert,  einheit: s.dosierung_bfr_einheit,  hinweis: s.dosierung_bfr_hinweis  },
    nih:  { wert: s.dosierung_nih_wert,  einheit: s.dosierung_nih_einheit,  hinweis: s.dosierung_nih_hinweis  },
    efsa: { wert: s.dosierung_efsa_wert, einheit: s.dosierung_efsa_einheit, hinweis: s.dosierung_efsa_hinweis },
  }

  return (
    <div className="supp-detail">
      <button className="supp-detail-back" onClick={() => navigate('/supplements')}>
        ← Alle Supplements
      </button>

      {/* [1] Header — immer.
           Evidenzampel: nur wenn evidenz_ampel befüllt (kein leeres Badge). */}
      <div style={{ marginBottom: 32 }}>
        <h1 className="supp-detail-title">{s.name_de}</h1>
        {s.wissenschaftlich && s.wissenschaftlich !== s.name_de && (
          <p className="supp-detail-wissenschaftlich">{s.wissenschaftlich}</p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
          {s.kategorie && <span className="supp-kat-tag">{s.kategorie}</span>}
          {s.evidenz_ampel && <EvidenzAmpel level={s.evidenz_ampel} />}
        </div>
      </div>

      {/* [2] Wofür — nur bei Daten (s.wofuer Langtext befüllt).
           S2-BUILD-01: wofuer_kurz wird NICHT als Fallback genutzt.
           Begründung: Freeze-Blockvertrag definiert Bedingung als s.wofuer (Langtext).
           wofuer_kurz-Fallback auf Detailseite ist bewusst offen → S2-BUILD-02. */}
      {s.wofuer && (
        <div className="supp-section">
          <p className="supp-section-title">Wofür wird es eingenommen?</p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-light)' }}>{s.wofuer}</p>
        </div>
      )}

      {/* [3] Dosierungsblock — immer sichtbar, semantisch sauber laut P7B-Freeze.
           S2-BUILD-01: Labels kennzeichnen Quellenart (Referenzwert, nicht Therapiedosis).
           Drei Abschnitte per Freeze: [A] Referenzwerte, [B] UL, [C] Studien-Kontext (Stufe 1).
           NIH-Wert ist RDA — explizit als allgemeine Bevölkerungsempfehlung gekennzeichnet.
           BfR + EFSA aktuell leer für alle 51 Einträge — strukturell gezeigt, ehrlich leer. */}
      <div className="supp-section">
        <p className="supp-section-title">Dosierung</p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, marginTop: -8 }}>
          Referenzwerte für die gesunde Bevölkerung — keine Therapiedosen
        </p>

        {/* [3A] Referenzwerte-Grid */}
        <div className="dosierung-grid">
          {DOSIERUNGS_QUELLEN.map(q => {
            const d = dosierung[q.key]
            return (
              <div key={q.key} className="dosierung-item">
                <p className="dosierung-org">{q.label}</p>
                <p className="dosierung-hinweis" style={{ marginBottom: 6 }}>{q.typ}</p>
                {d?.wert ? (
                  <>
                    <p className="dosierung-wert">{d.wert}{d.einheit ? ` ${d.einheit}` : ''}</p>
                    {d.hinweis && <p className="dosierung-hinweis">{d.hinweis}</p>}
                  </>
                ) : (
                  <p className="dosierung-wert" style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 400 }}>
                    Kein Referenzwert verfügbar
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* [3B] Obere sichere Grenze (UL) — nur wenn dosierung_ul_wert vorhanden.
             S2-BUILD-01: Pflicht-Exponierung laut P7B-Freeze Stufe 0.2.
             DB-Feld dosierung_ul_wert ist via select('*') mitgeladen.
             UL ist eine Sicherheitsgrenze — nicht als Empfehlung kommunizieren. */}
        {s.dosierung_ul_wert && (
          <div className="dosierung-ul">
            <strong>⚠ Obere sichere Grenze (nicht dauerhaft überschreiten):</strong>{' '}
            {s.dosierung_ul_wert}{s.dosierung_ul_einheit ? ` ${s.dosierung_ul_einheit}` : ''} täglich (NIH/EFSA UL)
          </div>
        )}
      </div>

      {/* [4] Formen & Bioverfügbarkeit — nur bei Daten */}
      {formen.length > 0 && (
        <div className="supp-section">
          <p className="supp-section-title">Formen & Bioverfügbarkeit</p>
          <div className="formen-list">
            {formen.map((f, i) => {
              const name = typeof f === 'string' ? f : f.name
              const bv = typeof f === 'object' ? f.bioverfuegbarkeit : null
              const empfohlen = typeof f === 'object' ? f.empfohlen : null
              return (
                <div key={i} className={`form-item${empfohlen === true ? ' empfohlen' : empfohlen === false ? ' nicht-empfohlen' : ''}`}>
                  <div style={{ flex: 1 }}>
                    <p className="form-name">{name}</p>
                    {bv && <p className="form-hinweis">{bv}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* [5] Timing / Einnahme — nur bei Daten */}
      {s.timing && (
        <div className="supp-section">
          <p className="supp-section-title">Einnahme-Timing</p>
          <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>{s.timing}</p>
        </div>
      )}

      {/* [6] Synergien & Antagonisten — nur bei Daten */}
      {(synergien.length > 0 || antagonisten.length > 0) && (
        <div className="supp-section">
          <p className="supp-section-title">Kombinationen & Wechselwirkungen</p>
          <div className="kombi-grid">
            {synergien.length > 0 && (
              <div>
                <p className="kombi-label" style={{ color: 'var(--green)' }}>✓ Synergien</p>
                {synergien.map((k, i) => (
                  <div key={i} className="kombi-item">
                    <span className="kombi-item-name">{typeof k === 'string' ? k : k.name}</span>
                    {k.beschreibung && <span> — {k.beschreibung}</span>}
                  </div>
                ))}
              </div>
            )}
            {antagonisten.length > 0 && (
              <div>
                <p className="kombi-label" style={{ color: 'var(--red)' }}>✗ Antagonisten</p>
                {antagonisten.map((a, i) => (
                  <div key={i} className="kombi-item">
                    <span className="kombi-item-name">{typeof a === 'string' ? a : a.name}</span>
                    {a.beschreibung && <span> — {a.beschreibung}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* [7] Sicherheits-/Vorsichtsblock — Spec-Gate offen.
           Erfordert neues DB-Feld `vorsicht` (JSONB) + 4 Pflicht-Kontextfelder
           (Schwangerschaft, Niere/Leber, Schilddrüse, Gerinnung).
           Implementierung in S2-BUILD-02. Hier bewusst ausgelassen. */}

      {/* [8] Qualitätskriterien — nur bei Daten */}
      {qualitaet.length > 0 && (
        <div className="supp-section">
          <p className="supp-section-title">Qualitätskriterien</p>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {qualitaet.map((q, i) => (
              <li key={i} style={{ fontSize: 14, color: 'var(--text-light)' }}>
                {typeof q === 'string' ? q : q.kriterium}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* [9] Studien — nur wenn mindestens eine Studie mit validem Titel vorhanden.
           S2-BUILD-01: studienMitTitel-Filter aktiv (PMID-only → nicht gezeigt).
           Laut P7B-Freeze: PMIDs allein als Studien-Block sind No-Go (S2↔S3-Cross-Vertrag).
           Studien-Kontext für Dosierung (Abschnitt C des Dosierungsblocks) ist Stufe 1. */}
      {studienMitTitel.length > 0 && (
        <div className="supp-section">
          <p className="supp-section-title">Relevante Studien</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {studienMitTitel.map((st, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                <p style={{ fontSize: 14, color: 'var(--text-light)' }}>
                  {typeof st === 'string' ? st : st.titel}
                </p>
                {st.pubmed_id && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${st.pubmed_id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="supp-nih-link"
                    style={{ marginTop: 4 }}
                  >
                    PubMed → {st.pubmed_id}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* [10] S15-Zeitachsen-Block — nach S15-Build.
           Implementierung wenn S15 live. Hier bewusst ausgelassen. */}

      {/* [11] S1-Cross-Block "Relevante Laborwerte" — nur bei Daten.
           S2-BUILD-01: Fallback-Text entfernt. Block ausgeblendet wenn leer.
           Reihenfolge laut P7B-Freeze: Laborwerte (11) vor Medikamente (12).
           Für alle 51 aktuellen Einträge: Block unsichtbar (beeinflusste_laborwerte leer).
           Verlinkung zu S1-Detailseiten nach beeinflusste_laborwerte-Migration (Stufe 1). */}
      {biomarker.length > 0 && (
        <div className="supp-section">
          <p className="supp-section-title">Relevante Laborwerte</p>
          <div className="zusammenhaenge-chips">
            {biomarker.map((b, i) => (
              <span key={i} className="zusammenhaenge-chip">
                {typeof b === 'string' ? b : (b.name_de ?? b.name ?? '')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* [12] S6-Cross-Block "Medikamenten-Interaktionen" — nur bei Daten.
           S2-BUILD-01: Fallback-Text entfernt. Block ausgeblendet wenn leer.
           Reihenfolge laut P7B-Freeze: Medikamente (12) nach Laborwerte (11).
           Für alle 51 aktuellen Einträge: Block unsichtbar (medikament_interaktionen leer).
           Aktivierung nach S6-Build + medikament_interaktionen-Befüllung (Stufe 2). */}
      {medInteraktion.length > 0 && (
        <div className="supp-section">
          <p className="supp-section-title">Medikamenten-Interaktionen</p>
          <div className="interaktion-list">
            {medInteraktion.map((m, i) => {
              const schwere = typeof m === 'object' ? m.schwere : null
              const schwereClass = schwere === 'hoch' ? 'interaktion-hoch' : schwere === 'moderat' ? 'interaktion-moderat' : 'interaktion-niedrig'
              return (
                <div key={i} className={`interaktion-item ${schwereClass}`}>
                  <div style={{ flex: 1 }}>
                    <p className="interaktion-name">{typeof m === 'string' ? m : m.wirkstoff}</p>
                    {m.beschreibung && <p className="interaktion-hinweis">{m.beschreibung}</p>}
                  </div>
                  {schwere && (
                    <span className="interaktion-schwere-badge"
                      style={{ background: schwere === 'hoch' ? '#FECACA' : schwere === 'moderat' ? '#FDE68A' : 'var(--border)', color: 'var(--text)' }}>
                      {schwere}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* [13] Disclaimer — immer letzter Block */}
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 32, textAlign: 'center' }}>
        Diese Informationen ersetzen keine ärztliche Diagnose. Bitte spreche die Einnahme von Supplements mit einer Ärztin oder einem Arzt ab.
      </p>
    </div>
  )
}
