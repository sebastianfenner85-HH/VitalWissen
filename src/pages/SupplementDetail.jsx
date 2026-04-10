import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSupplementBySlug } from '../lib/queries'
import EvidenzAmpel from '../components/EvidenzAmpel'
import './Supplements.css'

const DOSIERUNGS_QUELLEN = [
  { key: 'bfr', org: 'BfR (Deutschland)' },
  { key: 'nih', org: 'NIH (USA)' },
  { key: 'efsa', org: 'EFSA (EU)' },
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

  const dosierung = {
    bfr:  { wert: s.dosierung_bfr_wert,  einheit: s.dosierung_bfr_einheit,  hinweis: s.dosierung_bfr_hinweis  },
    nih:  { wert: s.dosierung_nih_wert,  einheit: s.dosierung_nih_einheit,  hinweis: s.dosierung_nih_hinweis  },
    efsa: { wert: s.dosierung_efsa_wert, einheit: s.dosierung_efsa_einheit, hinweis: s.dosierung_efsa_hinweis },
  }

  const formen          = s.formen || []
  const synergien       = s.synergien || []
  const antagonisten    = s.antagonisten || []
  const qualitaet       = s.qualitaet_kriterien || []
  const studien         = s.studien || []
  const medInteraktion  = s.medikament_interaktionen || []
  const biomarker       = s.beeinflusste_laborwerte || []

  return (
    <div className="supp-detail">
      <button className="supp-detail-back" onClick={() => navigate('/supplements')}>
        ← Alle Supplements
      </button>

      {/* Header */}
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

      {/* Wofür */}
      {s.wofuer && (
        <div className="supp-section">
          <p className="supp-section-title">Wofür wird es eingenommen?</p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-light)' }}>{s.wofuer}</p>
        </div>
      )}

      {/* Dosierung — 3-Spalten */}
      <div className="supp-section">
        <p className="supp-section-title">Dosierung im Vergleich</p>
        <div className="dosierung-grid">
          {DOSIERUNGS_QUELLEN.map(q => {
            const d = dosierung[q.key]
            return (
              <div key={q.key} className="dosierung-item">
                <p className="dosierung-org">{q.org}</p>
                {d?.wert ? (
                  <>
                    <p className="dosierung-wert">{d.wert}{d.einheit ? ` ${d.einheit}` : ''}</p>
                    {d.hinweis && <p className="dosierung-hinweis">{d.hinweis}</p>}
                  </>
                ) : (
                  <p className="dosierung-wert" style={{ color: 'var(--text-muted)', fontSize: 14 }}>—</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Formen & Bioverfügbarkeit */}
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

      {/* Timing */}
      {s.timing && (
        <div className="supp-section">
          <p className="supp-section-title">Einnahme-Timing</p>
          <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>{s.timing}</p>
        </div>
      )}

      {/* Synergien & Antagonisten */}
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

      {/* Qualitätskriterien */}
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

      {/* Studien */}
      {studien.length > 0 && (
        <div className="supp-section">
          <p className="supp-section-title">Relevante Studien</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {studien.map((st, i) => (
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

      {/* Medikamenten-Interaktionen */}
      <div className="supp-section">
        <p className="supp-section-title">Medikamenten-Interaktionen</p>
        {medInteraktion.length > 0 ? (
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
        ) : (
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Daten werden ergänzt.</p>
        )}
      </div>

      {/* Relevante Laborwerte */}
      <div className="supp-section">
        <p className="supp-section-title">Relevante Laborwerte</p>
        {biomarker.length > 0 ? (
          <div className="zusammenhaenge-chips">
            {biomarker.map((b, i) => (
              <span key={i} className="zusammenhaenge-chip">
                {typeof b === 'string' ? b : b.name}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Daten werden ergänzt.</p>
        )}
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 32, textAlign: 'center' }}>
        Diese Informationen ersetzen keine ärztliche Diagnose. Bitte spreche die Einnahme von Supplements mit einer Ärztin oder einem Arzt ab.
      </p>
    </div>
  )
}
