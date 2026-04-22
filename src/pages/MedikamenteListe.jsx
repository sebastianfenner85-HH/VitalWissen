import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWirkstoffeListe } from '../lib/queries'
import './Medikamente.css'

// Schnellfilter-Tags passend zu filter_tags in der DB
const TAG_FILTER = [
  { key: null,                label: 'Alle' },
  { key: 'Herz-Kreislauf',    label: '❤️ Herz-Kreislauf' },
  { key: 'Schmerzmittel',     label: '💊 Schmerzmittel' },
  { key: 'Psyche-Neurologie', label: '🧠 Psyche / Neurologie' },
  { key: 'Stoffwechsel',      label: '🔬 Stoffwechsel' },
  { key: 'Atemwege',          label: '🫁 Atemwege' },
  { key: 'Gastro-Uro',        label: '🩺 Magen & Harnwege' },
  { key: 'OTC',               label: '🏪 Rezeptfrei' },
]

export default function MedikamenteListe() {
  const [wirkstoffe, setWirkstoffe] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [filterTag, setFilterTag]   = useState(null)
  const [suche, setSuche]           = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const data = await getWirkstoffeListe()
        setWirkstoffe(data)
      } catch (err) {
        console.error(err)
        setError('Wirkstoffe konnten nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Anzahl je Tag (aus allen geladenen Daten — für Count-Badge)
  const tagCounts = {}
  wirkstoffe.forEach(w => {
    if (Array.isArray(w.filter_tags)) {
      w.filter_tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1 })
    }
  })

  // Suche: name_de + synonyme[] + wirkstoffklasse + atc_code
  const gefiltert = wirkstoffe.filter(w => {
    const matchTag = !filterTag || (Array.isArray(w.filter_tags) && w.filter_tags.includes(filterTag))
    const q = suche.toLowerCase().trim()
    const matchSuche =
      !q ||
      w.name_de?.toLowerCase().includes(q) ||
      w.wirkstoffklasse?.toLowerCase().includes(q) ||
      w.atc_code?.toLowerCase().includes(q) ||
      w.synonyme?.some(s => s.toLowerCase().includes(q))
    return matchTag && matchSuche
  })

  if (loading) {
    return (
      <div className="med-page">
        <div className="med-loading">Wirkstoffe werden geladen…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="med-page">
        <div className="med-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Erneut versuchen</button>
        </div>
      </div>
    )
  }

  return (
    <div className="med-page">
      {/* Header */}
      <div className="med-header">
        <div className="container">
          <div className="med-header-inner">
            <div>
              <h1 className="med-title">Medikamenten-Lexikon</h1>
              <p className="med-subtitle">
                Wirkstoffe verständlich erklärt — Einnahme, Nebenwirkungen, Generika
                und Wechselwirkungen. Auf Basis offizieller Zulassungsdaten (EMA / BfArM).
              </p>
            </div>
          </div>

          {/* Disclaimer-Hinweis im Header */}
          <div className="med-header-disclaimer">
            Diese Informationen ersetzen keine ärztliche oder apothekerliche Beratung.
          </div>

          {/* Suchfeld */}
          <div className="med-filter-row">
            <div className="med-search-box">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M14 14l3.5 3.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Wirkstoff oder Handelsname suchen…"
                value={suche}
                onChange={e => setSuche(e.target.value)}
              />
            </div>
          </div>

          {/* Tag-Schnellfilter */}
          <div className="med-tag-filter">
            {TAG_FILTER.map(t => (
              <button
                key={t.key ?? 'alle'}
                className={`med-tag-btn ${filterTag === t.key ? 'active' : ''}`}
                onClick={() => setFilterTag(t.key)}
              >
                {t.label}
                <span className="med-tag-count">
                  {t.key === null ? wirkstoffe.length : (tagCounts[t.key] ?? 0)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inhaltsbereich */}
      <div className="med-grid-wrap container">
        {wirkstoffe.length === 0 ? (
          // Leerzustand: Tabelle leer (noch kein Import)
          <div className="med-empty-state">
            <div className="med-empty-icon">💊</div>
            <h2 className="med-empty-title">Wirkstoffe folgen in Kürze</h2>
            <p className="med-empty-text">
              Das Wirkstoff-Lexikon wird gerade mit Inhalten befüllt.
              Bald findest du hier Erklärungen zu den häufigsten Medikamenten in Deutschland —
              von Ibuprofen bis Metformin.
            </p>
          </div>
        ) : (
          <>
            <p className="med-count">{gefiltert.length} Einträge</p>

            {gefiltert.length === 0 ? (
              <div className="med-no-results">Kein Wirkstoff gefunden — Suche anpassen.</div>
            ) : (
              <div className="med-grid">
                {gefiltert.map(w => (
                  <button
                    key={w.slug}
                    className="med-card"
                    onClick={() => navigate(`/medikamente/${w.slug}`)}
                  >
                    <div className="med-card-top">
                      <div className="med-card-name">{w.name_de}</div>
                      {w.otc_status && (
                        <span className="med-otc-badge">OTC</span>
                      )}
                    </div>
                    <div className="med-card-klasse">{w.wirkstoffklasse}</div>
                    {w.indikationen?.length > 0 && (
                      <div className="med-card-indikationen">
                        {w.indikationen.slice(0, 3).join(' · ')}
                      </div>
                    )}
                    <div className="med-card-footer">
                      <span className="med-atc-code">{w.atc_code}</span>
                      <span className="med-arrow">→</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
