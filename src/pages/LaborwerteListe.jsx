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

  const kategorien = ['Alle', ...new Set(laborwerte.map(lw => lw.kategorie).filter(Boolean))]

  const gefiltert = laborwerte.filter(lw => {
    const matchKategorie = filterKategorie === 'Alle' || lw.kategorie === filterKategorie
    const matchSuche =
      !suche ||
      lw.name?.toLowerCase().includes(suche.toLowerCase()) ||
      lw.beschreibung?.toLowerCase().includes(suche.toLowerCase())
    return matchKategorie && matchSuche
  })

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
              {lw.notfall_flag && (
                <span className="laborwert-notfall-badge">⚠ Notfallrelevant</span>
              )}
              <h3 className="laborwert-card-name">{lw.name}</h3>
              {lw.kategorie && (
                <span className="laborwert-card-kategorie">{lw.kategorie}</span>
              )}
              {lw.beschreibung && (
                <p className="laborwert-card-beschreibung">{lw.beschreibung}</p>
              )}
              <span className="laborwert-card-link">Detailansicht →</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
