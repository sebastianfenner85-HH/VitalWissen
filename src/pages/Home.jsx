import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { sucheGlobal } from '../lib/queries'
import './Home.css'

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ laborwerte: [], supplements: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const debounceRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setResults({ laborwerte: [], supplements: [] })
      setShowResults(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await sucheGlobal(query)
        setResults(data)
        setShowResults(true)
      } catch (err) {
        console.error(err)
        setError('Suche momentan nicht verfügbar.')
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  const hasResults =
    results.laborwerte.length > 0 || results.supplements.length > 0

  function handleSelect(type, id) {
    setShowResults(false)
    setQuery('')
    if (type === 'laborwert') navigate(`/laborwerte/${id}`)
    if (type === 'supplement') navigate(`/supplements/${id}`)
  }

  return (
    <div className="home">
      <div className="home-hero">
        <p className="home-eyebrow">Evidenzbasierte Gesundheitsinformation</p>
        <h1 className="home-headline">
          Es gibt einen Moment, in dem man aufhört zu googeln
          <span className="home-headline-accent"> und anfängt zu verstehen.</span>
        </h1>
        <p className="home-subline">
          Laborwerte einordnen. Supplements verstehen. Studien lesen. Arztbriefe
          entschlüsseln — ohne Werbung, ohne Affiliate.
        </p>

        <div className="home-search-wrapper" ref={wrapperRef}>
          <div className="home-search-bar">
            <svg className="home-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="home-search-input"
              type="text"
              placeholder="Laborwert, Supplement, Symptom, Wirkstoff…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => hasResults && setShowResults(true)}
              autoComplete="off"
              spellCheck={false}
            />
            {loading && <span className="home-search-spinner" />}
          </div>

          {showResults && (
            <div className="home-search-results">
              {error && <p className="home-search-error">{error}</p>}

              {!error && !hasResults && (
                <p className="home-search-empty">Keine Treffer für „{query}"</p>
              )}

              {results.laborwerte.length > 0 && (
                <div className="home-search-group">
                  <p className="home-search-group-label">Laborwerte</p>
                  {results.laborwerte.map(lw => (
                    <button
                      key={lw.loinc_code}
                      className="home-search-item"
                      onClick={() => handleSelect('laborwert', lw.loinc_code)}
                    >
                      <span className="home-search-item-name">{lw.name}</span>
                      {lw.kategorie && (
                        <span className="home-search-item-meta">{lw.kategorie}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {results.supplements.length > 0 && (
                <div className="home-search-group">
                  <p className="home-search-group-label">Supplements</p>
                  {results.supplements.map(s => (
                    <button
                      key={s.slug}
                      className="home-search-item"
                      onClick={() => handleSelect('supplement', s.slug)}
                    >
                      <span className="home-search-item-name">{s.name}</span>
                      {s.gruppe && (
                        <span className="home-search-item-meta">{s.gruppe}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="home-quick-links">
          <button className="home-quick-link" onClick={() => navigate('/laborwerte')}>
            🔬 Laborwerte
          </button>
          <button className="home-quick-link" onClick={() => navigate('/supplements')}>
            💊 Supplements
          </button>
        </div>
      </div>

      <div className="home-pillars">
        <div className="home-pillar-card">
          <div className="home-pillar-icon">🔬</div>
          <h3>Laborwert-Lexikon</h3>
          <p>Referenzbereiche aus DE, USA und Japan im Vergleich. Ursachen verstehen, Zusammenhänge erkennen.</p>
          <button className="home-pillar-btn" onClick={() => navigate('/laborwerte')}>Zu den Laborwerten →</button>
        </div>
        <div className="home-pillar-card">
          <div className="home-pillar-icon">💊</div>
          <h3>Supplement-Kompass</h3>
          <p>Evidenzbasierte Informationen zu Dosierung, Wirkform, Timing und Medikamenten-Interaktionen.</p>
          <button className="home-pillar-btn" onClick={() => navigate('/supplements')}>Zu den Supplements →</button>
        </div>
        <div className="home-pillar-card home-pillar-card--coming">
          <div className="home-pillar-icon">📄</div>
          <h3>Arztbrief-Decoder</h3>
          <p>Befunde, Entlassbriefe und Arztschreiben verständlich erklärt — datenschutzkonform.</p>
          <span className="home-pillar-badge">In Entwicklung</span>
        </div>
      </div>
    </div>
  )
}
