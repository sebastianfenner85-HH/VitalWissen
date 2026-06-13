import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLaborwerteListe } from '../lib/queries'
import './Laborwerte.css'

export default function LaborwerteListe() {
  const [laborwerte, setLaborwerte] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterKategorie, setFilterKategorie] = useState('Alle')
  const [suche, setSuche] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const data = await getLaborwerteListe()
        setLaborwerte(data)
      } catch (err) {
        console.error(err)
        setError('Laborwerte konnten nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const kategorien = ['Alle', ...new Set(laborwerte.map(lw => lw.panel || lw.kategorie).filter(Boolean))]

  const gefiltert = laborwerte.filter(lw => {
    const matchKategorie = filterKategorie === 'Alle' || lw.panel === filterKategorie || lw.kategorie === filterKategorie
    const matchSuche =
      !suche ||
      lw.name_de?.toLowerCase().includes(suche.toLowerCase()) ||
      lw.vollname_de?.toLowerCase().includes(suche.toLowerCase()) ||
      lw.beschreibung_laienhaft?.toLowerCase().includes(suche.toLowerCase())
    return matchKategorie && matchSuche
  })

  const formatRef = (lw) => {
    const min = lw.ref_de_min_m ?? lw.ref_de_min_w
    const max = lw.ref_de_max_m ?? lw.ref_de_max_w
    const einheit = lw.ref_de_einheit
    if (min != null && max != null) return `DE: ${min}–${max} ${einheit}`
    if (max != null) return `DE: <${max} ${einheit}`
    if (min != null) return `DE: >${min} ${einheit}`
    return null
  }

  if (loading) {
    return (
      <div className="lw-page">
        <div className="lw-state-center">
          Laborwerte werden geladen…
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="lw-page">
        <div className="lw-state-center">
          <p className="lw-error-msg">{error}</p>
          <button onClick={() => window.location.reload()}>Erneut versuchen</button>
        </div>
      </div>
    )
  }

  return (
    <div className="lw-page">
      {/* Header */}
      <div className="lw-header">
        <div className="container">
          <div className="lw-header-inner">
            <div>
              <h1 className="lw-title">Laborwert-Lexikon</h1>
              <p className="lw-subtitle">
                {laborwerte.length} Laborwerte erklärt — mit Referenzbereichen aus Deutschland, USA und Japan.
              </p>
            </div>
            <div className="lw-stats">
              <div className="stat">
                <span className="stat-n">{laborwerte.length}</span>
                <span className="stat-l">Laborwerte</span>
              </div>
              <div className="stat">
                <span className="stat-n">{laborwerte.filter(lw => lw.notfall_flag).length}</span>
                <span className="stat-l">Notfallrelevant</span>
              </div>
            </div>
          </div>

          {/* Filter-Zeile */}
          <div className="lw-filter-row">
            <div className="lw-search-box">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M14 14l3.5 3.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Laborwert suchen…"
                value={suche}
                onChange={e => setSuche(e.target.value)}
              />
            </div>
            <div className="panel-filter">
              {kategorien.map(k => (
                <button
                  key={k}
                  className={`panel-btn ${filterKategorie === k ? 'active' : ''}`}
                  onClick={() => setFilterKategorie(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="lw-grid-wrap container">
        <p className="lw-count">{gefiltert.length} Laborwerte</p>

        {gefiltert.length === 0 ? (
          <div className="lw-coming-soon">
            <p className="lw-empty-state-text">Keine Laborwerte gefunden.</p>
          </div>
        ) : (
          <div className="lw-grid">
            {gefiltert.map(lw => (
              <button
                key={lw.loinc_code}
                className="lw-card"
                onClick={() => navigate(`/laborwerte/${lw.loinc_code}`)}
              >
                {lw.notfall_flag && (
                  <span className="lw-notfall">⚠ Notfall</span>
                )}
                <div className="lw-card-top">
                  <span className="lw-loinc">{lw.loinc_code}</span>
                  {(lw.panel || lw.kategorie) && (
                    <span className="lw-panel-tag">{lw.panel || lw.kategorie}</span>
                  )}
                </div>
                <div className="lw-name">{lw.name_de}</div>
                {lw.vollname_de && lw.vollname_de !== lw.name_de && (
                  <div className="lw-vollname">{lw.vollname_de}</div>
                )}
                {lw.beschreibung_laienhaft && (
                  <div className="lw-desc">
                    {lw.beschreibung_laienhaft.substring(0, 120)}…
                  </div>
                )}
                <div className="lw-card-footer">
                  <span className="lw-ref-mini">{formatRef(lw) || ''}</span>
                  <span className="lw-arrow">→</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
