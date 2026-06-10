import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sucheGlobal } from '../lib/queries'
import './Home.css'

const SEARCH_EXAMPLES = ['HbA1c', 'LDL', 'Vitamin D', 'Bluthochdruck', 'Metformin', 'Magnesium', 'Grapefruit', 'Mediterrane Ernährung']

const ENTRY_CARDS = [
  { icon: '🔬', title: 'Laborwert verstehen', text: 'Bezeichnungen, Einheiten und vorhandene Einordnungen verständlich nachlesen.', to: '/laborwerte', action: 'Laborwerte öffnen' },
  { icon: '🩺', title: 'Krankheit einordnen', text: 'Vorhandene Themenartikel in mehreren Sprachebenen entdecken.', to: '/krankheiten', action: 'Krankheiten öffnen' },
  { icon: '💊', title: 'Supplement prüfen', text: 'Quellenbasierte Profile und vorhandene Evidenzhinweise ansehen.', to: '/supplements', action: 'Supplements öffnen' },
  { icon: '🧪', title: 'Wirkstoff nachschlagen', text: 'Vorhandene Wirkstoffprofile und Fachinformationen finden.', to: '/medikamente', action: 'Wirkstoffe öffnen' },
  { icon: '🥦', title: 'Ernährung entdecken', text: 'Lebensmittel, Nährstoffe und Ernährungsmuster erkunden.', to: '/ernaehrung', action: 'Ernährung öffnen' },
  { icon: '📚', title: 'Studien & Forschung', text: 'Forschungsbezüge in vorhandenen Themenartikeln ansehen.', to: '/krankheiten', action: 'Themen mit Studien öffnen' },
  { icon: '📄', title: 'Arztbrief erklären lassen', text: 'Medizinische Begriffe im Arztbrief verständlicher machen.', to: '/arztbrief', action: 'Decoder Beta öffnen', badge: 'Beta' },
  { icon: '✓', title: 'Vertrauen & Quellen', text: 'Erfahren, wie VitalWissen Quellen auswählt und Inhalte einordnet.', to: '/vertrauen', action: 'Transparenz ansehen' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ laborwerte: [], supplements: [], krankheiten: [], wirkstoffe: [] })
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
      setResults({ laborwerte: [], supplements: [], krankheiten: [], wirkstoffe: [] })
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
    results.laborwerte.length > 0 || results.supplements.length > 0 || results.krankheiten.length > 0 || results.wirkstoffe.length > 0

  function handleSelect(type, id) {
    setShowResults(false)
    setQuery('')
    if (type === 'laborwert')  navigate(`/laborwerte/${id}`)
    if (type === 'supplement') navigate(`/supplements/${id}`)
    if (type === 'krankheit')  navigate(`/krankheiten/${id}`)
    if (type === 'wirkstoff')  navigate(`/medikamente/${id}`)
  }

  function handleFallbackNav(path) {
    setShowResults(false)
    setQuery('')
    navigate(path)
  }

  function handleExampleSearch(example) {
    setQuery(example)
    setShowResults(false)
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
          Krankheiten einordnen. Laborwerte verstehen. Supplements bewerten.
          Arztbriefe entschlüsseln — ohne Werbung, ohne Affiliate.
        </p>

        <div className="home-search-wrapper" ref={wrapperRef}>
          <div className="home-search-bar">
            <svg className="home-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="home-search-input"
              type="text"
              placeholder="Laborwert, Diagnose, Supplement oder Wirkstoff suchen…"
              aria-label="VitalWissen durchsuchen"
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
                <div className="home-search-empty">
                  <p className="home-search-empty-title">Noch kein direkter Treffer.</p>
                  <p className="home-search-empty-text">
                    Versuche einen Laborwert, eine Diagnose, einen Wirkstoff oder ein Lebensmittel.
                  </p>
                  <div className="home-search-empty-examples" aria-label="Andere Suchbeispiele">
                    {SEARCH_EXAMPLES.slice(0, 6).map(example => (
                      <button key={example} onClick={() => handleExampleSearch(example)}>{example}</button>
                    ))}
                  </div>
                  <div className="home-search-fallback-links">
                    <button onClick={() => handleFallbackNav('/laborwerte')}>Laborwerte ansehen</button>
                    <button onClick={() => handleFallbackNav('/krankheiten')}>Krankheiten ansehen</button>
                  </div>
                </div>
              )}

              {results.krankheiten.length > 0 && (
                <div className="home-search-group">
                  <p className="home-search-group-label">Krankheiten &amp; Diagnosen</p>
                  {results.krankheiten.map(k => (
                    <button
                      key={k.slug}
                      className="home-search-item"
                      onClick={() => handleSelect('krankheit', k.slug)}
                    >
                      <span className="home-search-item-name">
                        {k.name_de}
                        {k.notfall_flag && <span className="home-search-notfall" title="Akute Notfall-Relevanz">!</span>}
                      </span>
                      {k.icd10_code && (
                        <span className="home-search-item-meta">{k.icd10_code}</span>
                      )}
                    </button>
                  ))}
                </div>
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
                      <span className="home-search-item-name">
                        {lw.name_de}
                        {lw.notfall_flag && <span className="home-search-notfall" title="Kritischer Laborwert">!</span>}
                      </span>
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
                      <span className="home-search-item-name">{s.name_de}</span>
                      {s.kategorie && (
                        <span className="home-search-item-meta">{s.kategorie}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {results.wirkstoffe.length > 0 && (
                <div className="home-search-group">
                  <p className="home-search-group-label">Medikamente / Wirkstoffe</p>
                  {results.wirkstoffe.map(w => (
                    <button
                      key={w.slug}
                      className="home-search-item"
                      onClick={() => handleSelect('wirkstoff', w.slug)}
                    >
                      <span className="home-search-item-name">{w.name_de}</span>
                      {w.wirkstoffklasse && (
                        <span className="home-search-item-meta">{w.wirkstoffklasse}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="home-search-help" aria-label="Suchbeispiele">
          <span>Zum Beispiel:</span>
          <div className="home-search-examples">
            {SEARCH_EXAMPLES.map(example => (
              <button key={example} onClick={() => handleExampleSearch(example)}>{example}</button>
            ))}
          </div>
        </div>

        <p className="home-notfall-hint">
          Notfall? Sofort <strong>112</strong> rufen — VitalWissen ersetzt keinen Arzt.
        </p>
      </div>

      <section className="home-discovery" aria-labelledby="home-discovery-title">
        <div className="home-section-heading">
          <p className="home-section-kicker">Themen &amp; Werkzeuge</p>
          <h2 id="home-discovery-title">Direkt einsteigen</h2>
          <p>Wähle einen Bereich und finde schneller zu den vorhandenen Inhalten.</p>
        </div>
        <div className="home-entry-grid">
          {ENTRY_CARDS.map(card => (
            <Link className="home-entry-card" to={card.to} key={card.title}>
              <div className="home-entry-card-top">
                <span className="home-entry-icon" aria-hidden="true">{card.icon}</span>
                {card.badge && <span className="home-entry-badge">{card.badge}</span>}
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="home-entry-action">{card.action} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-trust" aria-label="VitalWissen Grundsätze">
        <div className="home-trust-copy">
          <span className="home-trust-mark" aria-hidden="true">✓</span>
          <div>
            <h2>Wissen mit sichtbaren Quellen</h2>
            <p>Werbefrei · Keine Affiliate-Links · Quellen sichtbar · Ersetzt keinen Arzt</p>
          </div>
        </div>
        <Link to="/vertrauen">So arbeitet VitalWissen <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  )
}
