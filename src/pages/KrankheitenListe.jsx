import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getKrankheitenListe } from '../lib/queries'
import './Krankheiten.css'

export default function KrankheitenListe() {
  const [krankheiten, setKrankheiten] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterKat, setFilterKat] = useState('Alle')
  const [suche, setSuche] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const data = await getKrankheitenListe()
        setKrankheiten(data)
      } catch (err) {
        console.error(err)
        setError('Krankheiten konnten nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const kategorien = ['Alle', ...new Set(krankheiten.map(k => k.kategorie).filter(Boolean))]

  const gefiltert = krankheiten.filter(k => {
    const matchKat = filterKat === 'Alle' || k.kategorie === filterKat
    const matchSuche =
      !suche ||
      k.name_de?.toLowerCase().includes(suche.toLowerCase()) ||
      k.beschreibung_laienhaft?.toLowerCase().includes(suche.toLowerCase()) ||
      k.icd10_code?.toLowerCase().includes(suche.toLowerCase()) ||
      k.synonym_de?.some(s => s.toLowerCase().includes(suche.toLowerCase()))
    return matchKat && matchSuche
  })

  if (loading) {
    return (
      <div className="krank-page">
        <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Krankheiten werden geladen…
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="krank-page">
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <p style={{ color: '#DC2626', marginBottom: 12 }}>{error}</p>
          <button onClick={() => window.location.reload()}>Erneut versuchen</button>
        </div>
      </div>
    )
  }

  return (
    <div className="krank-page">
      {/* Header */}
      <div className="krank-header">
        <div className="container">
          <div className="krank-header-inner">
            <div>
              <h1 className="krank-title">Krankheits-Lexikon</h1>
              <p className="krank-subtitle">
                Erkrankungen verständlich erklärt — von sehr einfach bis fachlich.
                Mit Symptomen, Diagnostik, Behandlung und Verknüpfungen zu Laborwerten und Supplements.
              </p>
            </div>
          </div>

          {/* Filter-Zeile */}
          <div className="krank-filter-row">
            <div className="krank-search-box">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M14 14l3.5 3.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Krankheit oder ICD-Code suchen…"
                value={suche}
                onChange={e => setSuche(e.target.value)}
              />
            </div>
            <div className="krank-kat-filter">
              {kategorien.map(k => (
                <button
                  key={k}
                  className={`krank-kat-btn ${filterKat === k ? 'active' : ''}`}
                  onClick={() => setFilterKat(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="krank-grid-wrap container">
        <p className="krank-count">{gefiltert.length} Einträge</p>

        {gefiltert.length === 0 ? (
          <div className="krank-empty">Keine Einträge gefunden.</div>
        ) : (
          <div className="krank-grid">
            {gefiltert.map(k => (
              <button
                key={k.slug}
                className="krank-card"
                onClick={() => navigate(`/krankheiten/${k.slug}`)}
              >
                <div className="krank-card-top">
                  <div className="krank-name">{k.name_de}</div>
                  {k.icd10_code && (
                    <span className="krank-icd">{k.icd10_code}</span>
                  )}
                </div>
                {k.beschreibung_laienhaft && (
                  <div className="krank-beschreibung">{k.beschreibung_laienhaft}</div>
                )}
                <div className="krank-card-footer">
                  {k.kategorie && (
                    <span className="krank-kat-tag">{k.kategorie}</span>
                  )}
                  {k.notfall_flag && (
                    <span className="krank-notfall-badge">⚡ Notfall</span>
                  )}
                  <span className="krank-arrow">→</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
