import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PANELS, THEMEN, TIER, DISCLAIMER } from '../lib/checkup_builder_config'
import './CheckupBuilder.css'

const RESULT_GROUPS = {
  blood_count: {
    title: 'Im gewählten Blutbild enthalten',
    note: 'Diese Werte gehören zum ausgewählten Blutbild-Panel.',
  },
  not_blood_count: {
    title: 'Nicht Teil des großen Blutbilds',
    note: 'Diese Werte sind nicht automatisch im großen Blutbild enthalten und können je nach Situation als Gesprächspunkt dienen.',
  },
  topic: {
    title: 'Zusätzlich ausgewählte Themenwerte',
    note: 'Diese Werte stammen aus den ausgewählten Themenbereichen und dienen nur der Gesprächsvorbereitung.',
  },
  specialist: {
    title: 'Nur nach fachlicher Einordnung',
    note: 'Diese Werte sollten nur bei gezielter Fragestellung fachlich eingeordnet werden.',
  },
}

const RESULT_GROUP_ORDER = ['blood_count', 'not_blood_count', 'topic', 'specialist']

const TIER_LABEL = {
  [TIER.STANDARD]: 'Standardwert',
  [TIER.OPTIONAL]: 'Optionaler Zusatzwert',
  [TIER.SPEZIAL]: 'Spezialwert',
  [TIER.NUR_FACHPERSON]: 'Nur nach fachlicher Einordnung',
  [TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS]: 'Nicht Teil des großen Blutbilds',
}

function getResultGroup(item) {
  if (item.contextGroup === 'blood_count' || item.isPartOfBloodCount) return 'blood_count'
  if (item.contextGroup === 'specialist' || item.tier === TIER.NUR_FACHPERSON) return 'specialist'
  if (item.tier === TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS) return 'not_blood_count'
  return 'topic'
}

function buildGespraechslisteText({ selectedPanel, selectedThemen, groupedItems }) {
  const panelLabel = selectedPanel ? PANELS[selectedPanel]?.label : 'Kein Blutbild ausgewählt'
  const themaLabels = selectedThemen.length > 0
    ? selectedThemen.map(key => THEMEN[key]?.label).filter(Boolean).join(', ')
    : 'Keine Themen ausgewählt'

  const lines = [
    'Gesprächsliste – VitalWissen Checkup',
    `Erstellt: ${new Date().toLocaleDateString('de-DE')}`,
    `Blutbild: ${panelLabel}`,
    `Themen: ${themaLabels}`,
    '',
  ]

  for (const group of groupedItems) {
    if (group.items.length === 0) continue
    lines.push(`== ${group.title} ==`)
    for (const item of group.items) {
      lines.push(`• ${item.name_de}`)
    }
    lines.push('')
  }

  lines.push('---')
  lines.push('Diese Liste ist zur Gesprächsvorbereitung gedacht und ersetzt keine medizinische Beratung.')
  lines.push(DISCLAIMER.zeile1)
  lines.push(DISCLAIMER.zeile2)
  lines.push(DISCLAIMER.zeile3)
  lines.push('Quelle: vitalwissen.netlify.app')

  return lines.join('\\n')
}

export default function CheckupBuilder() {
  const [selectedPanel, setSelectedPanel] = useState(null)
  const [selectedThemen, setSelectedThemen] = useState([])
  const [step, setStep] = useState(1)
  const [copyState, setCopyState] = useState('idle')
  const hasSelection = selectedPanel !== null || selectedThemen.length > 0
  const selectedPanelData = selectedPanel ? PANELS[selectedPanel] : null

  const ergebnisse = useMemo(() => {
    const seen = new Map()

    if (selectedPanel && PANELS[selectedPanel]) {
      for (const item of PANELS[selectedPanel].items) {
        const key = item.loinc || item.slug
        if (!seen.has(key)) seen.set(key, { ...item })
      }
    }

    for (const thema of selectedThemen) {
      if (THEMEN[thema]) {
        for (const item of THEMEN[thema].items) {
          const key = item.loinc || item.slug
          if (!seen.has(key)) seen.set(key, { ...item })
        }
      }
    }

    return Array.from(seen.values())
  }, [selectedPanel, selectedThemen])

  const groupedItems = useMemo(() => {
    const groups = RESULT_GROUP_ORDER.map(key => ({ key, ...RESULT_GROUPS[key], items: [] }))

    for (const item of ergebnisse) {
      const groupKey = getResultGroup(item)
      const group = groups.find(entry => entry.key === groupKey)
      if (group) group.items.push(item)
    }

    return groups
  }, [ergebnisse])

  const gespraechslisteText = useMemo(() => buildGespraechslisteText({
    selectedPanel,
    selectedThemen,
    groupedItems,
  }), [selectedPanel, selectedThemen, groupedItems])

  function toggleThema(key) {
    setSelectedThemen(prev => prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key])
    setCopyState('idle')
  }

  function handlePanelClick(key) {
    setSelectedPanel(prev => prev === key ? null : key)
    setCopyState('idle')
  }

  function handleNeuStarten() {
    setSelectedPanel(null)
    setSelectedThemen([])
    setStep(1)
    setCopyState('idle')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(gespraechslisteText)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = gespraechslisteText
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopyState('copied')
    } catch (error) {
      console.error(error)
      setCopyState('failed')
    }
  }

  function handlePrint() {
    window.print()
  }

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
          <p className="cb-section-hint">Optional — du kannst auch nur Themen wählen. Kleines und großes Blutbild sind keine vollständigen Gesundheitschecks.</p>

          <div className="cb-panel-grid">
            {Object.entries(PANELS).map(([key, panel]) => (
              <button
                key={key}
                className={`cb-panel-card${selectedPanel === key ? ' cb-panel-card--selected' : ''}`}
                onClick={() => handlePanelClick(key)}
                aria-pressed={selectedPanel === key}
              >
                <span className="cb-panel-name">{panel.label}</span>
                <span className="cb-panel-desc">{panel.beschreibung}</span>
                <span className="cb-panel-count">{panel.items.length} Werte</span>
              </button>
            ))}
          </div>

          {selectedPanelData && (
            <div className="cb-panel-explanation" aria-live="polite">
              <div className="cb-panel-erklaerung">
                <strong>Was dieses Blutbild zeigt:</strong>
                <p>{selectedPanelData.erklaerung}</p>
              </div>
              <div className="cb-panel-nicht-enthalten">
                <strong>Wichtig zur Einordnung:</strong>
                <p>{selectedPanelData.nichtEnthalten}</p>
              </div>
            </div>
          )}
        </section>

        <section className="cb-section">
          <div className="cb-step-label">Schritt 2</div>
          <h2 className="cb-section-title">Themenbereiche hinzufügen</h2>
          <p className="cb-section-hint">Mehrfachauswahl möglich. Themenwerte sind Gesprächspunkte und nicht automatisch Bestandteil eines Blutbilds.</p>

          <div className="cb-thema-grid">
            {Object.entries(THEMEN).map(([key, thema]) => {
              const isSelected = selectedThemen.includes(key)
              return (
                <button
                  key={key}
                  className={`cb-thema-card${isSelected ? ' cb-thema-card--selected' : ''}`}
                  onClick={() => toggleThema(key)}
                  aria-pressed={isSelected}
                >
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
            {hasSelection ? (
              <button className="cb-btn-zusammenstellen" onClick={() => setStep(3)}>Gesprächsliste zusammenstellen →</button>
            ) : (
              <div className="cb-empty-state">
                <p className="cb-empty-state-text">Wähle ein Blutbild oder einen Themenbereich, um eine Gesprächsliste vorzubereiten.</p>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <section className="cb-section cb-section--results" id="ergebnisse">
            <div className="cb-step-label">Schritt 3</div>
            <h2 className="cb-section-title">Gesprächsliste für die Fachperson</h2>
            <p className="cb-results-meta">
              {ergebnisse.length} Werte
              {selectedPanel ? ` · Panel: ${PANELS[selectedPanel].label}` : ''}
              {selectedThemen.length > 0 ? ` · Themen: ${selectedThemen.map(key => THEMEN[key].label).join(', ')}` : ''}
            </p>

            <div className="cb-disclaimer">
              <div className="cb-disclaimer-icon">ℹ️</div>
              <div className="cb-disclaimer-text">
                <p>{DISCLAIMER.zeile1}</p>
                <p>{DISCLAIMER.zeile2}</p>
                <p>{DISCLAIMER.zeile3}</p>
              </div>
            </div>

            {groupedItems.map(group => {
              if (group.items.length === 0) return null
              return (
                <div key={group.key} className={`cb-result-group cb-result-group--${group.key}`}>
                  <h3 className="cb-result-group-title">{group.title}</h3>
                  <p className="cb-result-group-note">{group.note}</p>
                  <ul className="cb-item-list">
                    {group.items.map(item => (
                      <li key={item.loinc || item.slug} className="cb-item">
                        <div className="cb-item-main">
                          <Link to={`/laborwerte/${item.slug}`} className="cb-item-link">{item.name_de}</Link>
                          <span className={`cb-tier-badge cb-tier-badge--${item.tier.replace(/_/g, '-')}`}>{TIER_LABEL[item.tier]}</span>
                        </div>
                        {item.reasoning && <p className="cb-item-reasoning">{item.reasoning}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            <div className="cb-gespraechsliste">
              <div className="cb-gespraechsliste-head">
                <div>
                  <h3 className="cb-gespraechsliste-title">Kopierbare Gesprächsliste</h3>
                  <p className="cb-gespraechsliste-hint">Diese Liste ist zur Gesprächsvorbereitung gedacht und ersetzt keine medizinische Beratung.</p>
                </div>
                <div className="cb-gespraechsliste-actions">
                  <button className="cb-btn-copy" type="button" onClick={handleCopy}>Liste kopieren</button>
                  <button className="cb-btn-print" type="button" onClick={handlePrint}>Drucken / als PDF speichern</button>
                </div>
              </div>
              {copyState === 'copied' && <p className="cb-copy-status">Liste kopiert.</p>}
              {copyState === 'failed' && <p className="cb-copy-status cb-copy-status--error">Kopieren nicht möglich. Du kannst den Text manuell markieren.</p>}
              <textarea className="cb-gespraechsliste-text" value={gespraechslisteText} readOnly aria-label="Gesprächsliste für die Fachperson" />
            </div>

            <div className="cb-results-footer">
              <button className="cb-btn-neu" onClick={handleNeuStarten}>← Neu starten</button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
