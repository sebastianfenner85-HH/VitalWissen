import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PANELS, THEMEN, TIER, DISCLAIMER } from '../lib/checkup_builder_config'
import './CheckupBuilder.css'

const TIER_ORDER = [TIER.STANDARD, TIER.OPTIONAL, TIER.SPEZIAL, TIER.NUR_FACHPERSON, TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS]
const TIER_LABEL = { [TIER.STANDARD]: 'Standardwert', [TIER.OPTIONAL]: 'Optionaler Zusatzwert', [TIER.SPEZIAL]: 'Spezialwert', [TIER.NUR_FACHPERSON]: 'Nur nach fachlicher Einordnung', [TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS]: 'Nicht Teil des großen Blutbilds' }
const TIER_GROUP_TITLE = { [TIER.STANDARD]: 'Standardwerte', [TIER.OPTIONAL]: 'Optionale Zusatzwerte', [TIER.SPEZIAL]: 'Spezialwerte', [TIER.NUR_FACHPERSON]: 'Nur nach fachlicher Einordnung', [TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS]: 'Nicht Teil des großen Blutbilds' }

export default function CheckupBuilder() {
  const [selectedPanel, setSelectedPanel] = useState(null)
  const [selectedThemen, setSelectedThemen] = useState([])
  const [step, setStep] = useState(1)
  const hasSelection = selectedPanel !== null || selectedThemen.length > 0

  const ergebnisse = useMemo(() => {
    const seen = new Map()
    if (selectedPanel && PANELS[selectedPanel]) {
      for (const item of PANELS[selectedPanel].items) { const k = item.loinc || item.slug; if (!seen.has(k)) seen.set(k, {...item}) }
    }
    for (const thema of selectedThemen) {
      if (THEMEN[thema]) { for (const item of THEMEN[thema].items) { const k = item.loinc || item.slug; if (!seen.has(k)) seen.set(k, {...item}) } }
    }
    return Array.from(seen.values())
  }, [selectedPanel, selectedThemen])

  const grouped = useMemo(() => {
    const result = {}
    for (const tier of TIER_ORDER) { const items = ergebnisse.filter(i => i.tier === tier); if (items.length > 0) result[tier] = items }
    return result
  }, [ergebnisse])

  function toggleThema(key) { setSelectedThemen(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]) }
  function handleNeuStarten() { setSelectedPanel(null); setSelectedThemen([]); setStep(1); window.scrollTo({top:0,behavior:'smooth'}) }

  return (
    <div className="cb-page">
      <div className="cb-hero">
        <div className="container">
          <Link to="/laborwerte" className="cb-back-link">← Laborwerte</Link>
          <h1 className="cb-hero-title">Checkup vorbereiten</h1>
          <p className="cb-hero-subtitle">Wähle ein Basis-Panel und optionale Themenbereiche. Die Gesprächsliste hilft dir, das Gespräch mit einer Fachperson vorzubereiten — kein Diagnose-Instrument.</p>
        </div>
      </div>
      <div className="container cb-content">
        <section className="cb-section">
          <div className="cb-step-label">Schritt 1</div>
          <h2 className="cb-section-title">Basis-Panel auswählen</h2>
          <p className="cb-section-hint">Optional — du kannst auch nur Themen wählen.</p>
          <div className="cb-panel-grid">
            {Object.entries(PANELS).map(([key, panel]) => (
              <button key={key} className={`cb-panel-card${selectedPanel === key ? ' cb-panel-card--selected' : ''}`} onClick={() => setSelectedPanel(prev => prev === key ? null : key)} aria-pressed={selectedPanel === key}>
                <span className="cb-panel-name">{panel.label}</span>
                <span className="cb-panel-desc">{panel.beschreibung}</span>
                <span className="cb-panel-count">{panel.items.length} Werte</span>
              </button>
            ))}
          </div>
        </section>
        <section className="cb-section">
          <div className="cb-step-label">Schritt 2</div>
          <h2 className="cb-section-title">Themenbereiche hinzufügen</h2>
          <p className="cb-section-hint">Mehrfachauswahl möglich.</p>
          <div className="cb-thema-grid">
            {Object.entries(THEMEN).map(([key, thema]) => {
              const isSelected = selectedThemen.includes(key)
              return (
                <button key={key} className={`cb-thema-card${isSelected ? ' cb-thema-card--selected' : ''}`} onClick={() => toggleThema(key)} aria-pressed={isSelected}>
                  <span className="cb-thema-icon">{thema.icon}</span>
                  <span className="cb-thema-name">{thema.label}</span>
                  <span className="cb-thema-count">{thema.items.length} Werte</span>
                  <span className="cb-thema-check" aria-hidden="true">{isSelected ? '✓' : ''}</span>
                </button>
              )
            })}
          </div>
        </section>
        {step < 3 && (
          <div className="cb-cta-row">
            <button className="cb-btn-zusammenstellen" disabled={!hasSelection} onClick={() => setStep(3)}>Gesprächsliste zusammenstellen →</button>
            {!hasSelection && <p className="cb-cta-hint">Wähle mindestens ein Panel oder Thema.</p>}
          </div>
        )}
        {step === 3 && (
          <section className="cb-section cb-section--results" id="ergebnisse">
            <div className="cb-step-label">Schritt 3</div>
            <h2 className="cb-section-title">Gesprächsliste</h2>
            <p className="cb-results-meta">{ergebnisse.length} Werte{selectedPanel ? ` · Panel: ${PANELS[selectedPanel].label}` : ''}{selectedThemen.length > 0 ? ` · Themen: ${selectedThemen.map(k => THEMEN[k].label).join(', ')}` : ''}</p>
            <div className="cb-disclaimer">
              <div className="cb-disclaimer-icon">ℹ️</div>
              <div className="cb-disclaimer-text">
                <p>{DISCLAIMER.zeile1}</p>
                <p>{DISCLAIMER.zeile2}</p>
                <p>{DISCLAIMER.zeile3}</p>
              </div>
            </div>
            {TIER_ORDER.map(tier => {
              const items = grouped[tier]
              if (!items) return null
              return (
                <div key={tier} className="cb-tier-group">
                  <h3 className="cb-tier-title">{TIER_GROUP_TITLE[tier]}</h3>
                  <ul className="cb-item-list">
                    {items.map(item => (
                      <li key={item.loinc || item.slug} className="cb-item">
                        <div className="cb-item-main">
                          <Link to={`/laborwerte/${item.slug}`} className="cb-item-link">{item.name_de}</Link>
                          <span className={`cb-tier-badge cb-tier-badge--${tier.replace(/_/g, '-')}`}>{TIER_LABEL[tier]}</span>
                        </div>
                        {item.reasoning && <p className="cb-item-reasoning">{item.reasoning}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
            <div className="cb-results-footer">
              <button className="cb-btn-neu" onClick={handleNeuStarten}>← Neu starten</button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
