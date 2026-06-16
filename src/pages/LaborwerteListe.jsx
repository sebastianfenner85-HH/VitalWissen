import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLaborwerteListe } from '../lib/queries'
import { LABORWERT_K3_MAP } from '../lib/laborwert_k3_map'
import { LABORWERT_B4_ACTIONS_MAP } from '../lib/laborwert_b4_actions_map'
import './Laborwerte.css'

export default function LaborwerteListe() {
  const [laborwerte, setLaborwerte] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterKategorie, setFilterKategorie] = useState('Alle')
  const [filterStatus, setFilterStatus] = useState('Alle')
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

  const kategorien = ['Alle', ...new Set(laborwerte.map(lw => lw.panel || lw.kategorie).filter(Boolean))]
  const statusFilter = ['Alle', 'Referenz vorhanden', 'Referenz in Prüfung', 'Zielwerte', 'Einordnung', 'Maßnahmen', 'Notfall']

  const normalizeText = value => String(value ?? '').toLowerCase()

  const hasDeReferenceValues = lw =>
    lw.ref_de_min_m != null || lw.ref_de_max_m != null ||
    lw.ref_de_min_w != null || lw.ref_de_max_w != null

  const hasUsaReferenceValues = lw =>
    lw.ref_usa_min != null || lw.ref_usa_max != null

  const hasJpReferenceValues = lw =>
    lw.ref_jp_min != null || lw.ref_jp_max != null

  const hasAnyReferenceValues = lw =>
    hasDeReferenceValues(lw) || hasUsaReferenceValues(lw) || hasJpReferenceValues(lw)

  const hasZielwerte = lw =>
    Array.isArray(lw.zielwerte) && lw.zielwerte.length > 0

  const hasEinordnung = lw =>
    !!(LABORWERT_K3_MAP[lw.loinc_code] || LABORWERT_K3_MAP[lw.slug])

  const hasMassnahmen = lw =>
    !!(LABORWERT_B4_ACTIONS_MAP[lw.loinc_code] || LABORWERT_B4_ACTIONS_MAP[lw.slug])

  const matchStatusFilter = lw => {
    if (filterStatus === 'Alle') return true
    if (filterStatus === 'Referenz vorhanden') return hasAnyReferenceValues(lw)
    if (filterStatus === 'Referenz in Prüfung') return !hasAnyReferenceValues(lw)
    if (filterStatus === 'Zielwerte') return hasZielwerte(lw)
    if (filterStatus === 'Einordnung') return hasEinordnung(lw)
    if (filterStatus === 'Maßnahmen') return hasMassnahmen(lw)
    if (filterStatus === 'Notfall') return !!lw.notfall_flag
    return true
  }

  const gefiltert = laborwerte.filter(lw => {
    const query = suche.trim().toLowerCase()
    const matchKategorie =
      filterKategorie === 'Alle' ||
      lw.panel === filterKategorie ||
      lw.kategorie === filterKategorie

    const searchable = [
      lw.name_de,
      lw.vollname_de,
      lw.beschreibung_laienhaft,
      lw.loinc_code,
      lw.slug,
      lw.panel,
      lw.kategorie,
    ].map(normalizeText).join(' ')

    const matchSuche = !query || searchable.includes(query)

    return matchKategorie && matchStatusFilter(lw) && matchSuche
  })

  const formatRef = (lw) => {
    const min = lw.ref_de_min_m ?? lw.ref_de_min_w
    const max = lw.ref_de_max_m ?? lw.ref_de_max_w
    const einheit = lw.ref_de_einheit ? ` ${lw.ref_de_einheit}` : ''
    if (min != null && max != null) return `DE: ${min}–${max}${einheit}`
    if (max != null) return `DE: <${max}${einheit}`
    if (min != null) return `DE: >${min}${einheit}`
    if (hasAnyReferenceValues(lw)) return 'Referenz vorhanden'
    return 'Referenz in Prüfung'
  }

  if (loading) {
    return (
      <div className="lw-page">
        <div className="lw-state-center">
          Laborwerte werden geladen…
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="lw-page">
        <div className="lw-state-center">
          <p className="lw-error-msg">{error}</p>
          <button onClick={() => window.location.reload()}>Erneut versuchen</button>
        </div>
      </div>
    )
  }

  return (
    <div className="lw-page">
      {/* Header */}
      <div className="lw-header">
        <div className="container">
          <div className="lw-header-inner">
            <div>
              <h1 className="lw-title">Laborwert-Lexikon</h1>
              <p className="lw-subtitle">
                {laborwerte.length} Laborwerte verständlich erklärt — mit Referenzstatus, Zielwerten und Einordnung, soweit bereits quellengeprüft eingepflegt.
              </p>
            </div>
            <div className="lw-stats">
              <div className="stat">
                <span className="stat-n">{laborwerte.length}</span>
                <span className="stat-l">Laborwerte</span>
              </div>
              <div className="stat">
                <span className="stat-n">{laborwerte.filter(lw => lw.notfall_flag).length}</span>
                <span className="stat-l">Notfallrelevant</span>
              </div>
            </div>
          </div>

          {/* Filter-Zeile */}
          <div className="lw-filter-row">
            <div className="lw-search-box">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M14 14l3.5 3.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Laborwert suchen…"
                value={suche}
                onChange={e => setSuche(e.target.value)}
              />
            </div>
            <div className="panel-filter" aria-label="Kategorie-Filter">
              {kategorien.map(k => (
                <button
                  key={k}
                  className={`panel-btn ${filterKategorie === k ? 'active' : ''}`}
                  onClick={() => setFilterKategorie(k)}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className="lw-status-filter" aria-label="Status-Filter">
              {statusFilter.map(status => (
                <button
                  key={status}
                  className={`lw-filter-status-btn ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="lw-grid-wrap container">
        <p className="lw-count">{gefiltert.length} Laborwerte</p>

        {gefiltert.length === 0 ? (
          <div className="lw-coming-soon">
            <p className="lw-empty-state-text">Keine Laborwerte gefunden.</p>
          </div>
        ) : (
          <div className="lw-grid">
            {gefiltert.map(lw => (
              <button
                key={lw.slug || lw.loinc_code}
                className="lw-card"
                onClick={() => navigate(`/laborwerte/${lw.slug || lw.loinc_code}`)}
              >
                {lw.notfall_flag && (
                  <span className="lw-notfall">⚠ Notfall</span>
                )}
                <div className="lw-card-top">
                  <span className="lw-loinc">{lw.loinc_code}</span>
                  {(lw.panel || lw.kategorie) && (
                    <span className="lw-panel-tag">{lw.panel || lw.kategorie}</span>
                  )}
                </div>
                <div className="lw-name">{lw.name_de}</div>
                {lw.vollname_de && lw.vollname_de !== lw.name_de && (
                  <div className="lw-vollname">{lw.vollname_de}</div>
                )}
                {lw.beschreibung_laienhaft && (
                  <div className="lw-desc">
                    {lw.beschreibung_laienhaft.substring(0, 120)}…
                  </div>
                )}

                <div className="lw-card-status-row" aria-label="Datenstatus">
                  <span className={`lw-card-status-chip ${hasAnyReferenceValues(lw) ? 'lw-card-status-chip--reference-ok' : 'lw-card-status-chip--reference-pending'}`}>
                    {hasAnyReferenceValues(lw) ? 'Referenz vorhanden' : 'Referenz in Prüfung'}
                  </span>
                  {hasZielwerte(lw) && (
                    <span className="lw-card-status-chip lw-card-status-chip--target">Zielwerte</span>
                  )}
                  {hasEinordnung(lw) && (
                    <span className="lw-card-status-chip lw-card-status-chip--context">Einordnung</span>
                  )}
                  {hasMassnahmen(lw) && (
                    <span className="lw-card-status-chip lw-card-status-chip--actions">Maßnahmen</span>
                  )}
                </div>

                <div className="lw-card-footer">
                  <span className="lw-ref-mini">{formatRef(lw) || ''}</span>
                  <span className="lw-arrow">→</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
