import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSupplementsListe } from '../lib/queries'
import EvidenzAmpel from '../components/EvidenzAmpel'
import './Supplements.css'

export default function SupplementsListe() {
  const [supplements, setSupplements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterGruppe, setFilterGruppe] = useState('Alle')
  const [suche, setSuche] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const data = await getSupplementsListe()
        setSupplements(data)
      } catch (err) {
        console.error(err)
        setError('Supplements konnten nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const gruppen = ['Alle', ...new Set(supplements.map(s => s.gruppe).filter(Boolean))]

  const gefiltert = supplements.filter(s => {
    const matchGruppe = filterGruppe === 'Alle' || s.gruppe === filterGruppe
    const matchSuche =
      !suche ||
      s.name?.toLowerCase().includes(suche.toLowerCase()) ||
      s.kurzbeschreibung?.toLowerCase().includes(suche.toLowerCase())
    return matchGruppe && matchSuche
  })

  if (loading) {
    return (
      <div className="supplements-loading">
        <div className="spinner" />
        <p>Supplements werden geladen…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="supplements-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Erneut versuchen</button>
      </div>
    )
  }

  return (
    <div className="supplements-liste">
      <div className="supplements-header">
        <h1>Supplement-Kompass</h1>
        <p className="supplements-subline">
          Evidenzbasierte Informationen zu Dosierung, Wirkform, Timing und
          Wechselwirkungen. Kein Affiliate, keine gesponserten Inhalte.
        </p>
      </div>

      <div className="supplements-controls">
        <input
          className="supplements-suche"
          type="text"
          placeholder="Supplement suchen…"
          value={suche}
          onChange={e => setSuche(e.target.value)}
        />
        <div className="supplements-filter">
          {gruppen.map(g => (
            <button
              key={g}
              className={`supplements-filter-btn ${filterGruppe === g ? 'active' : ''}`}
              onClick={() => setFilterGruppe(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {gefiltert.length === 0 ? (
        <p className="supplements-empty">Keine Supplements gefunden.</p>
      ) : (
        <div className="supplements-grid">
          {gefiltert.map(s => (
            <button
              key={s.slug}
              className="supplement-card"
              onClick={() => navigate(`/supplements/${s.slug}`)}
            >
              <h3 className="supplement-card-name">{s.name}</h3>
              {s.gruppe && (
                <span className="supplement-card-gruppe">{s.gruppe}</span>
              )}
              {s.kurzbeschreibung && (
                <p className="supplement-card-beschreibung">{s.kurzbeschreibung}</p>
              )}
              {s.evidenz_ampel && (
                <div className="supplement-card-ampel">
                  <EvidenzAmpel level={s.evidenz_ampel} compact />
                </div>
              )}
              <span className="supplement-card-link">Detailansicht →</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
