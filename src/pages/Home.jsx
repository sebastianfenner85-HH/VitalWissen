import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { sucheGlobal } from '../lib/queries'
import './Home.css'

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
              placeholder="Symptom, Diagnose, Laborwert, Supplement, Wirkstoff…"
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
                  <p className="home-search-empty-text">Kein direkter Treffer für „{query}"</p>
                  <div className="home-search-fallback-links">
                    <button onClick={() => handleFallbackNav('/krankheiten')}>Krankheiten durchsuchen →</button>
                    <button onClick={() => handleFallbackNav('/laborwerte')}>Laborwerte durchsuchen →</button>
                    <button onClick={() => handleFallbackNav('/supplements')}>Supplements durchsuchen →</button>
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

        <p className="home-notfall-hint">
          Notfall? Sofort <strong>112</strong> rufen — diese Plattform ersetzt keinen Arzt.
        </p>

        <div className="home-quick-links">
          <button className="home-quick-link" onClick={() => navigate('/krankheiten')}>
            🩺 Krankheiten
          </button>
          <button className="home-quick-link" onClick={() => navigate('/laborwerte')}>
            🔬 Laborwerte
          </button>
          <button className="home-quick-link" onClick={() => navigate('/supplements')}>
            💊 Supplements
          </button>
          <button className="home-quick-link" onClick={() => navigate('/medikamente')}>
            🧪 Medikamente
          </button>
          <button className="home-quick-link" onClick={() => navigate('/ernaehrung')}>
            🥦 Ernährung
          </button>
        </div>

        {/* Trust-Triad — TRUST_ENTRY_LAYER_01 */}
        <div className="home-trust-triad" role="list">
          <span className="home-trust-item" role="listitem">Werbefrei</span>
          <span className="home-trust-sep" aria-hidden="true">·</span>
          <span className="home-trust-item" role="listitem">Quellenbasiert</span>
          <span className="home-trust-sep" aria-hidden="true">·</span>
          <span className="home-trust-item" role="listitem">Ohne Registrierung</span>
        </div>
      </div>

      <div className="home-pillars">
        <div className="home-pillar-card" onClick={() => navigate('/krankheiten')}>
          <div className="home-pillar-icon">🩺</div>
          <h3>Krankheits-Lexikon</h3>
          <p>221 Erkrankungen in drei Sprachebenen erklärt — von sehr einfach bis fachlich. Mit Symptomen, Diagnostik und Behandlung.</p>
          <button className="home-pillar-btn" onClick={e => { e.stopPropagation(); navigate('/krankheiten') }}>Zu den Krankheiten →</button>
        </div>
        <div className="home-pillar-card" onClick={() => navigate('/laborwerte')}>
          <div className="home-pillar-icon">🔬</div>
          <h3>Laborwert-Lexikon</h3>
          <p>60 Laborwerte mit Referenzbereichen aus DE, USA und Japan im Vergleich. Ursachen verstehen, Zusammenhänge erkennen.</p>
          <button className="home-pillar-btn" onClick={e => { e.stopPropagation(); navigate('/laborwerte') }}>Zu den Laborwerten →</button>
        </div>
        <div className="home-pillar-card" onClick={() => navigate('/supplements')}>
          <div className="home-pillar-icon">💊</div>
          <h3>Supplement-Kompass</h3>
          <p>51 Supplements mit Evidenz-Ampel, Dosierung, Wirkform, Timing und Medikamenten-Interaktionen.</p>
          <button className="home-pillar-btn" onClick={e => { e.stopPropagation(); navigate('/supplements') }}>Zu den Supplements →</button>
        </div>
        <div className="home-pillar-card" onClick={() => navigate('/medikamente')}>
          <div className="home-pillar-icon">🧪</div>
          <h3>Medikamenten-Lexikon</h3>
          <p>50 Wirkstoffe mit Dosierung, Nebenwirkungen, Wechselwirkungen und Zulassungsinformationen — von EMA und BfArM.</p>
          <button className="home-pillar-btn" onClick={e => { e.stopPropagation(); navigate('/medikamente') }}>Zu den Medikamenten →</button>
        </div>
        <div className="home-pillar-card" onClick={() => navigate('/ernaehrung')}>
          <div className="home-pillar-icon">🥦</div>
          <h3>Ernährungskompass</h3>
          <p>Evidenzbasierte Ernährungsmuster — mediterrane Ernährung, DASH und mehr. Mit Bezug zu Erkrankungen.</p>
          <button className="home-pillar-btn" onClick={e => { e.stopPropagation(); navigate('/ernaehrung') }}>Zum Ernährungskompass →</button>
        </div>
        <div className="home-pillar-card home-pillar-card--beta" onClick={() => navigate('/arztbrief')}>
          <div className="home-pillar-icon">📄</div>
          <h3>Arztbrief-Decoder</h3>
          <p>Befunde, Entlassbriefe und Arztschreiben verständlich erklärt — vollständig lokal im Browser, datenschutzkonform.</p>
          <button className="home-pillar-btn" onClick={e => { e.stopPropagation(); navigate('/arztbrief') }}>Zum Arztbrief-Decoder →</button>
          <span className="home-pillar-badge home-pillar-badge--beta">Beta</span>
        </div>
      </div>
    </div>
  )
}
