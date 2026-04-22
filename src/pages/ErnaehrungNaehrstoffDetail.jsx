import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getNaehrstoffBySlug, getKrankheitenDetailMap } from '../lib/queries'
import './Ernaehrung.css'

const KATEGORIE_ICON = {
  'Vitamin':        '🧬',
  'Mineralstoff':   '⚗️',
  'Makronährstoff': '🌾',
  'Pflanzenstoff':  '🌿',
}

// ─── Normalisierungs-Helfer ──────────────────────────────────────────────────

const BEDARF_KEY_LABELS = {
  maenner_adult:   'Männer (Erwachsen)',
  frauen_adult:    'Frauen (Erwachsen)',
  ab_70_jahre:     'Ab 70 Jahre',
  schwangerschaft: 'Schwangerschaft',
  stillzeit:       'Stillzeit',
  kinder:          'Kinder',
  saeuglinge:      'Säuglinge',
  jugendliche:     'Jugendliche',
  erwachsene:      'Erwachsene',
  hinweis:         'Hinweis',
  alle:            'Allgemein',
  empfehlung:      'Empfehlung',
  de:              'Empfehlung',
}

// Tagesbedarf: {maenner_adult:..., frauen_adult:...} ODER {de:..., einheit:...} → [{label, value}]
function normTagesbedarf(data) {
  if (!data) return []
  if (typeof data === 'string') return [{ label: 'Empfehlung', value: data }]
  return Object.entries(data)
    .filter(([k]) => k !== 'einheit')
    .map(([k, v]) => ({ label: BEDARF_KEY_LABELS[k] || k, value: String(v) }))
}

// Beste Quellen: Array<{lebensmittel, menge_pro_100g}> ODER {liste:[...]} ODER Array<string>
function normQuellen(data) {
  if (!data) return []
  if (Array.isArray(data)) {
    return data.map(item =>
      typeof item === 'string' ? item
      : item.lebensmittel
        ? `${item.lebensmittel}${item.menge_pro_100g ? ` (${item.menge_pro_100g}/100 g)` : ''}`
        : JSON.stringify(item)
    )
  }
  if (data.liste) return data.liste
  return []
}

// Mangel-Symptome: Array<{symptom, schwere}> ODER {liste:[...]} ODER Array<string>
function normSymptome(data) {
  if (!data) return []
  if (Array.isArray(data)) {
    return data.map(item =>
      typeof item === 'string' ? item
      : item.symptom
        ? `${item.symptom}${item.schwere ? ` (${item.schwere})` : ''}`
        : JSON.stringify(item)
    )
  }
  if (data.liste) return data.liste
  return []
}

// Erkrankungs-Bezug: Array<{name_de, icd_code, relevanz_kurz}> ODER {liste:[...]} ODER null
function normErkrankungen(data) {
  if (!data) return []
  if (Array.isArray(data)) {
    return data.map(item =>
      typeof item === 'string'
        ? { name: item, icd_code: null, relevanz: null }
        : { name: item.name_de || item.name || '', icd_code: item.icd_code || null, relevanz: item.relevanz_kurz || null }
    )
  }
  if (data.liste) {
    return data.liste.map(item =>
      typeof item === 'string'
        ? { name: item, icd_code: null, relevanz: null }
        : { name: item.name_de || item.name || '', icd_code: item.icd_code || null, relevanz: null }
    )
  }
  return []
}

// ─── Komponente ─────────────────────────────────────────────────────────────

export default function ErnaehrungNaehrstoffDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [naehrstoff, setNaehrstoff] = useState(null)
  const [krankheitMap, setKrankheitMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getNaehrstoffBySlug(slug)
        setNaehrstoff(data)

        // Slugs für Erkrankungs-Bezug nachladen (ICD-Code → {name_de, slug})
        const erkList = normErkrankungen(data?.erkrankungs_bezug)
        const icdCodes = erkList.map(e => e.icd_code).filter(Boolean)
        if (icdCodes.length > 0) {
          const kmap = await getKrankheitenDetailMap(icdCodes)
          setKrankheitMap(kmap)
        }
      } catch (err) {
        console.error(err)
        setError('Nährstoff konnte nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="ern-naehrstoff-detail-page">
        <div className="ern-loading">Wird geladen…</div>
      </div>
    )
  }

  if (error || !naehrstoff) {
    return (
      <div className="ern-naehrstoff-detail-page">
        <div className="ern-error">{error || 'Nährstoff nicht gefunden.'}</div>
      </div>
    )
  }

  const icon = KATEGORIE_ICON[naehrstoff.kategorie] || '🔬'

  // Normalisierte Daten
  const bedarfNih    = normTagesbedarf(naehrstoff.tagesbedarf_nih)
  const bedarfDge    = normTagesbedarf(naehrstoff.tagesbedarf_dge)
  const bedarfEfsa   = normTagesbedarf(naehrstoff.tagesbedarf_efsa)
  const quellenListe = normQuellen(naehrstoff.beste_quellen)
  const symptomListe = normSymptome(naehrstoff.mangel_symptome)
  const erkList      = normErkrankungen(naehrstoff.erkrankungs_bezug)
  const quellenBelege = Array.isArray(naehrstoff.quellen)
    ? naehrstoff.quellen
    : naehrstoff.quellen?.liste ?? []

  const hasAnyBedarf = bedarfNih.length > 0 || bedarfDge.length > 0 || bedarfEfsa.length > 0

  return (
    <div className="ern-naehrstoff-detail-page">

      {/* Hero */}
      <div className="ern-naehrstoff-hero">
        <div className="ern-naehrstoff-hero-inner">
          <div className="ern-naehrstoff-nav">
            <button className="ern-detail-back" onClick={() => navigate('/ernaehrung')}>
              ← Ernährungskompass
            </button>
          </div>
          <div className="ern-naehrstoff-label">
            {icon} {naehrstoff.kategorie}
          </div>
          <h1 className="ern-naehrstoff-title">{naehrstoff.name_de}</h1>
          <p className="ern-naehrstoff-intro">{naehrstoff.kurzbeschreibung}</p>
        </div>
      </div>

      {/* Content */}
      <div className="ern-naehrstoff-content">

        {/* [1] Tagesbedarf */}
        {hasAnyBedarf && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">📊</span>
              Tagesbedarf
            </h2>

            {bedarfNih.length > 0 && (
              <div style={{ marginBottom: bedarfDge.length > 0 || bedarfEfsa.length > 0 ? '16px' : 0 }}>
                <p className="ern-naehrstoff-bedarf-label" style={{ marginBottom: '8px' }}>NIH (USA)</p>
                <div className="ern-naehrstoff-bedarf-grid">
                  {bedarfNih.map((item, i) => (
                    <div key={i} className="ern-naehrstoff-bedarf-item">
                      <div className="ern-naehrstoff-bedarf-label">{item.label}</div>
                      <div className="ern-naehrstoff-bedarf-value">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bedarfDge.length > 0 && (
              <div style={{ marginBottom: bedarfEfsa.length > 0 ? '16px' : 0 }}>
                <p className="ern-naehrstoff-bedarf-label" style={{ marginBottom: '8px' }}>DGE (Deutschland)</p>
                <div className="ern-naehrstoff-bedarf-grid">
                  {bedarfDge.map((item, i) => (
                    <div key={i} className="ern-naehrstoff-bedarf-item">
                      <div className="ern-naehrstoff-bedarf-label">{item.label}</div>
                      <div className="ern-naehrstoff-bedarf-value">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bedarfEfsa.length > 0 && (
              <div>
                <p className="ern-naehrstoff-bedarf-label" style={{ marginBottom: '8px' }}>EFSA (Europa)</p>
                <div className="ern-naehrstoff-bedarf-grid">
                  {bedarfEfsa.map((item, i) => (
                    <div key={i} className="ern-naehrstoff-bedarf-item">
                      <div className="ern-naehrstoff-bedarf-label">{item.label}</div>
                      <div className="ern-naehrstoff-bedarf-value">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {naehrstoff.upper_limit && (
              <p className="ern-block-text" style={{ marginTop: '14px' }}>
                <strong>Tolerable Upper Intake Level (UL):</strong>{' '}
                {typeof naehrstoff.upper_limit === 'string'
                  ? naehrstoff.upper_limit
                  : naehrstoff.upper_limit.de || naehrstoff.upper_limit.wert || JSON.stringify(naehrstoff.upper_limit)}
              </p>
            )}
          </div>
        )}

        {/* [2] Beste Quellen */}
        {quellenListe.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">🥦</span>
              Beste Lebensmittelquellen
            </h2>
            <div className="ern-naehrstoff-quellen-liste">
              {quellenListe.map((q, i) => (
                <span key={i} className="ern-naehrstoff-quelle-tag">{q}</span>
              ))}
            </div>
          </div>
        )}

        {/* [3] Mangel */}
        {symptomListe.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">⚠️</span>
              Mangel — Symptome &amp; Risikogruppen
            </h2>
            <ul className="ern-prinzip-list">
              {symptomListe.map((s, i) => (
                <li key={i} className="ern-prinzip-item">
                  <span className="ern-prinzip-dot" />
                  {s}
                </li>
              ))}
            </ul>
            {naehrstoff.mangel_risikogruppen && naehrstoff.mangel_risikogruppen.length > 0 && (
              <div style={{ marginTop: '14px' }}>
                <p className="ern-block-text" style={{ marginBottom: '8px' }}><strong>Risikogruppen:</strong></p>
                <div className="ern-lm-tags">
                  {naehrstoff.mangel_risikogruppen.map((r, i) => (
                    <span key={i} className="ern-lm-tag">{r}</span>
                  ))}
                </div>
              </div>
            )}
            {naehrstoff.mangel_laborwert && (
              <div style={{ marginTop: '14px' }}>
                <p className="ern-block-text" style={{ marginBottom: '8px' }}><strong>Labortest zur Diagnose:</strong></p>
                <Link to={`/laborwerte/${naehrstoff.mangel_laborwert}`} className="ern-naehrstoff-chip">
                  🔬 Laborwert ansehen →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* [4] Überschuss */}
        {(naehrstoff.ueberschuss_ab || naehrstoff.ueberschuss_hinweis) && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">🚨</span>
              Überschuss &amp; Toxizität
            </h2>
            {naehrstoff.ueberschuss_ab && (
              <p className="ern-block-text" style={{ marginBottom: '8px' }}>
                <strong>Risiko ab:</strong> {naehrstoff.ueberschuss_ab}
              </p>
            )}
            {naehrstoff.ueberschuss_hinweis && (
              <p className="ern-block-text">{naehrstoff.ueberschuss_hinweis}</p>
            )}
          </div>
        )}

        {/* [5] Erkrankungs-Bezug → S5 */}
        {erkList.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">🏥</span>
              Erkrankungen mit Bezug
            </h2>
            <div className="ern-naehrstoff-crosslinks">
              {erkList.map((e, i) => {
                const krankheit = e.icd_code ? krankheitMap[e.icd_code] : null
                const slug = krankheit?.slug
                return slug ? (
                  <Link key={i} to={`/krankheiten/${slug}`} className="ern-naehrstoff-chip">
                    {e.name || krankheit.name_de} →
                  </Link>
                ) : (
                  <span key={i} className="ern-lm-tag">{e.name}</span>
                )
              })}
            </div>
            {erkList.some(e => e.relevanz) && (
              <div style={{ marginTop: '12px' }}>
                {erkList.filter(e => e.relevanz).map((e, i) => (
                  <p key={i} className="ern-block-text" style={{ marginBottom: '6px', fontSize: '13px' }}>
                    <strong>{e.name}:</strong> {e.relevanz}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* [6] Supplement-Alternative → S2 */}
        {naehrstoff.supplement_alternative && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">💊</span>
              Supplement-Alternative
            </h2>
            <p className="ern-block-text" style={{ marginBottom: '12px' }}>
              Dieser Nährstoff ist auch als Supplement verfügbar — für Risikogruppen oder bei nachgewiesenem Mangel.
            </p>
            <div className="ern-naehrstoff-crosslinks">
              <Link to={`/supplements/${naehrstoff.supplement_alternative}`} className="ern-naehrstoff-chip">
                💊 Supplement-Profil →
              </Link>
            </div>
          </div>
        )}

        {/* [7] Quellen */}
        {quellenBelege.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">📚</span>
              Quellen
            </h2>
            <div className="ern-sources-list">
              {quellenBelege.map((q, i) => (
                <div key={i} className="ern-source-item">
                  <span className="ern-source-typ">{q.typ || q.type || 'Quelle'}</span>
                  {q.url ? (
                    <a href={q.url} target="_blank" rel="noopener noreferrer" className="ern-source-link">
                      {q.name || q.titel || q.url}
                    </a>
                  ) : (
                    <span className="ern-source-link">{q.name || q.titel || q.text || 'Quelle'}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="ern-quellen-hinweis">
              Alle Informationen basieren auf aktuellen wissenschaftlichen Quellen (NIH ODS, DGE, EFSA). Angaben ohne Gewähr auf Vollständigkeit. Letzte Aktualisierung:{' '}
              {naehrstoff.letzte_aktualisierung
                ? new Date(naehrstoff.letzte_aktualisierung).toLocaleDateString('de-DE')
                : '2026'}.
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="ern-disclaimer">
          <p>
            <strong>Hinweis:</strong> Diese Informationen dienen der allgemeinen Aufklärung und ersetzen keine individuelle medizinische oder ernährungstherapeutische Beratung. Bei Verdacht auf einen Nährstoffmangel oder bei der Einnahme von Supplementen sollte immer Rücksprache mit einem Arzt oder Ernährungsberater gehalten werden.
          </p>
        </div>

      </div>
    </div>
  )
}
