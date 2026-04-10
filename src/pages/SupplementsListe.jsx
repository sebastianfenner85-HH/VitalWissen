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

  const gruppen = ['Alle', ...new Set(supplements.map(s => s.kategorie).filter(Boolean))]

  const gefiltert = supplements.filter(s => {
    const matchGruppe = filterGruppe === 'Alle' || s.kategorie === filterGruppe
    const matchSuche =
      !suche ||
      s.name_de?.toLowerCase().includes(suche.toLowerCase()) ||
      s.wofuer_kurz?.toLowerCase().includes(suche.toLowerCase())
    return matchGruppe && matchSuche
  })

  if (loading) {
    return (
      <div className="supp-page">
        <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Supplements werden geladen…
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="supp-page">
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <p style={{ color: '#DC2626', marginBottom: 12 }}>{error}</p>
          <button onClick={() => window.location.reload()}>Erneut versuchen</button>
        </div>
      </div>
    )
  }

  return (
    <div className="supp-page">
      {/* Header */}
      <div className="supp-header">
        <div className="container">
          <div className="supp-header-inner">
            <div>
              <h1 className="supp-title">Supplement-Kompass</h1>
              <p className="supp-subtitle">
                Evidenzbasierte Informationen zu Dosierung, Wirkform, Timing und
                Wechselwirkungen. Kein Affiliate, keine gesponserten Inhalte.
              </p>
            </div>
          </div>

          {/* Filter-Zeile */}
          <div className="supp-filter-row">
            <div className="supp-search-box">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M14 14l3.5 3.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Supplement suchen…"
                value={suche}
                onChange={e => setSuche(e.target.value)}
              />
            </div>
            <div className="kat-filter">
              {gruppen.map(g => (
                <button
                  key={g}
                  className={`kat-btn ${filterGruppe === g ? 'active' : ''}`}
                  onClick={() => setFilterGruppe(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="supp-grid-wrap container">
        <p className="supp-count">{gefiltert.length} Supplements</p>

        {gefiltert.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Keine Supplements gefunden.</p>
        ) : (
          <div className="supp-grid">
            {gefiltert.map(s => (
              <button
                key={s.slug}
                className="supp-card"
                onClick={() => navigate(`/supplements/${s.slug}`)}
              >
                <div className="supp-card-top">
                  <div className="supp-name">{s.name_de}</div>
                  {s.kategorie && (
                    <span className="supp-kat-tag">{s.kategorie}</span>
                  )}
                </div>
                {s.wofuer_kurz && (
                  <div className="supp-wofuer">{s.wofuer_kurz}</div>
                )}
                <div className="supp-card-footer">
                  {s.evidenz_ampel
                    ? <EvidenzAmpel level={s.evidenz_ampel} compact />
                    : <span />
                  }
                  <span className="supp-arrow">→</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
