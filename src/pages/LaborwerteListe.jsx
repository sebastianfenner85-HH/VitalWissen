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
      <div className="laborwerte-loading">
        <div className="spinner" />
        <p>Laborwerte werden geladen…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="laborwerte-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Erneut versuchen</button>
      </div>
    )
  }

  return (
    <div className="laborwerte-liste">
      <div className="laborwerte-header">
        <h1>Laborwert-Lexikon</h1>
        <p className="laborwerte-subline">
          Referenzbereiche im internationalen Vergleich — Deutschland, USA und Japan.
          Verständlich erklärt, evidenzbasiert.
        </p>
      </div>

      <div className="laborwerte-controls">
        <input
          className="laborwerte-suche"
          type="text"
          placeholder="Laborwert suchen…"
          value={suche}
          onChange={e => setSuche(e.target.value)}
        />
        <div className="laborwerte-filter">
          {kategorien.map(k => (
            <button
              key={k}
              className={`laborwerte-filter-btn ${filterKategorie === k ? 'active' : ''}`}
              onClick={() => setFilterKategorie(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {gefiltert.length === 0 ? (
        <p className="laborwerte-empty">Keine Laborwerte gefunden.</p>
      ) : (
        <div className="laborwerte-grid">
          {gefiltert.map(lw => (
            <button
              key={lw.loinc_code}
              className={`laborwert-card ${lw.notfall_flag ? 'laborwert-card--notfall' : ''}`}
              onClick={() => navigate(`/laborwerte/${lw.loinc_code}`)}
            >
              <div className="laborwert-card-meta">
                <span className="laborwert-card-loinc">{lw.loinc_code}</span>
                {(lw.panel || lw.kategorie) && (
                  <span className="laborwert-card-kategorie">{lw.panel || lw.kategorie}</span>
                )}
                {lw.notfall_flag && (
                  <span className="laborwert-notfall-badge">⚠ Notfallrelevant</span>
                )}
              </div>
              <h3 className="laborwert-card-name">{lw.name_de}</h3>
              {lw.vollname_de && lw.vollname_de !== lw.name_de && (
                <p className="laborwert-card-vollname">{lw.vollname_de}</p>
              )}
              {lw.beschreibung_laienhaft && (
                <p className="laborwert-card-beschreibung">{lw.beschreibung_laienhaft.substring(0, 120)}…</p>
              )}
              {formatRef(lw) && (
                <span className="laborwert-card-ref">{formatRef(lw)}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
