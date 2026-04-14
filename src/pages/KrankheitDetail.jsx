import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getKrankheitBySlug, getLaborwerteNameMap, getSupplementeNameMap } from '../lib/queries'
import './Krankheiten.css'

const EBENEN = [
  { key: 'einfach',    label: 'Sehr einfach' },
  { key: 'laienhaft', label: 'Laienhaft'     },
  { key: 'fachlich',  label: 'Fachlich'      },
]

export default function KrankheitDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [k, setK] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ebene, setEbene] = useState('laienhaft')
  const [laborwertNamen, setLaborwertNamen] = useState({})
  const [supplementNamen, setSupplementNamen] = useState({})

  useEffect(() => {
    async function load() {
      try {
        const data = await getKrankheitBySlug(slug)
        setK(data)
        const codes = data?.verwandte_laborwerte || []
        const slugs = data?.verwandte_supplements || []
        const [lwMap, suppMap] = await Promise.all([
          getLaborwerteNameMap(codes).catch(() => ({})),
          getSupplementeNameMap(slugs).catch(() => ({})),
        ])
        setLaborwertNamen(lwMap)
        setSupplementNamen(suppMap)
      } catch (err) {
        console.error(err)
        setError('Krankheit nicht gefunden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Wird geladen…
      </div>
    )
  }

  if (error || !k) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: '#DC2626', marginBottom: 12 }}>{error || 'Krankheit nicht gefunden.'}</p>
        <button className="krank-detail-back" onClick={() => navigate('/krankheiten')}>← Zurück zur Liste</button>
      </div>
    )
  }

  // Beschreibung je Ebene
  const beschreibung = {
    einfach:   k.beschreibung_einfach,
    laienhaft: k.beschreibung_laienhaft,
    fachlich:  k.beschreibung_fachlich,
  }

  const symptome          = k.symptome || []
  const diagnostik        = k.diagnostik || []
  const behandlung        = k.behandlung || []
  const weiterfuehrend    = k.weiterfuehrend || []
  const quellen           = k.quellen || []
  const verwLaborwerte    = k.verwandte_laborwerte || []
  const verwSupplements   = k.verwandte_supplements || []
  const synonyme          = k.synonym_de || []

  // Nur Refs rendern, die tatsächlich in der DB existieren (= haben einen Klarnamen im Map)
  const valLaborwerte  = verwLaborwerte.filter(code => laborwertNamen[code] !== undefined)
  const valSupplements = verwSupplements.filter(s   => supplementNamen[s]   !== undefined)

  return (
    <div className="krank-detail">
      <button className="krank-detail-back" onClick={() => navigate('/krankheiten')}>
        ← Alle Krankheiten
      </button>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="krank-detail-header">
        <h1 className="krank-detail-title">{k.name_de}</h1>
        {synonyme.length > 0 && (
          <p className="krank-detail-synonym">Auch bekannt als: {synonyme.join(' · ')}</p>
        )}
        <div className="krank-detail-meta">
          {k.icd10_code && <span className="krank-icd">{k.icd10_code}</span>}
          {k.kategorie  && <span className="krank-kat-tag">{k.kategorie}</span>}
          {k.haeufigkeit && <span className="krank-haeufigkeit">{k.haeufigkeit}</span>}
          {k.notfall_flag && <span className="krank-notfall-badge">⚡ Notfall-relevant</span>}
        </div>
      </div>

      {/* ── Sprachebenen-Toggle ────────────────────────────────────── */}
      <div className="krank-ebene-tabs">
        {EBENEN.map(e => (
          <button
            key={e.key}
            className={`krank-ebene-btn ${ebene === e.key ? 'active' : ''}`}
            onClick={() => setEbene(e.key)}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* ── Beschreibung ───────────────────────────────────────────── */}
      {beschreibung[ebene] && (
        <div className="krank-section">
          <p className="krank-section-title">Was ist das?</p>
          <p className="krank-section-text">{beschreibung[ebene]}</p>
        </div>
      )}

      {/* ── Symptome ───────────────────────────────────────────────── */}
      {symptome.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Symptome & Warnsignale</p>
          <ul className="krank-symptom-list">
            {symptome.map((s, i) => (
              <li
                key={i}
                className={`krank-symptom-item ${s.warnsignal ? 'warnsignal' : ''}`}
              >
                <span>{s.name}{s.beschreibung ? ` — ${s.beschreibung}` : ''}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Diagnostik ─────────────────────────────────────────────── */}
      {diagnostik.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Wie wird es diagnostiziert?</p>
          <ul className="krank-json-list">
            {diagnostik.map((d, i) => (
              <li key={i} className="krank-json-item">
                {d.methode && <strong>{d.methode}</strong>}
                {d.beschreibung}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Behandlung ─────────────────────────────────────────────── */}
      {behandlung.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Behandlung</p>
          <ul className="krank-json-list">
            {behandlung.map((b, i) => (
              <li key={i} className="krank-json-item">
                {b.typ && <strong>{b.typ}</strong>}
                {b.beschreibung}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Prognose ───────────────────────────────────────────────── */}
      {k.prognose && (
        <div className="krank-section">
          <p className="krank-section-title">Prognose</p>
          <p className="krank-section-text">{k.prognose}</p>
        </div>
      )}

      {/* ── Leben mit der Erkrankung ────────────────────────────────── */}
      {k.leben_mit && (
        <div className="krank-section">
          <p className="krank-section-title">Leben mit der Erkrankung</p>
          <p className="krank-section-text">{k.leben_mit}</p>
        </div>
      )}

      {/* ── Geschlechtsspezifisches ────────────────────────────────── */}
      {k.gender_kontext?.hinweis && (
        <div className="krank-section">
          <p className="krank-section-title">Geschlechtsspezifische Besonderheiten</p>
          <p className="krank-section-text">{k.gender_kontext.hinweis}</p>
        </div>
      )}

      {/* ── Verknüpfungen ──────────────────────────────────────────── */}
      {(valLaborwerte.length > 0 || valSupplements.length > 0) && (
        <div className="krank-section">
          <p className="krank-section-title">Verwandte Einträge</p>
          <div className="krank-links-grid">
            {valLaborwerte.map(code => (
              <button
                key={code}
                className="krank-link-chip"
                onClick={() => navigate(`/laborwerte/${code}`)}
              >
                🔬 {laborwertNamen[code]}
              </button>
            ))}
            {valSupplements.map(s => (
              <button
                key={s}
                className="krank-link-chip"
                onClick={() => navigate(`/supplements/${s}`)}
              >
                💊 {supplementNamen[s]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Weiterführend ──────────────────────────────────────────── */}
      {weiterfuehrend.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Weiterführende Informationen</p>
          <div className="krank-links-grid">
            {weiterfuehrend.map((w, i) => (
              <a
                key={i}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="krank-link-chip"
              >
                ↗ {w.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Quellen ────────────────────────────────────────────────── */}
      {quellen.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Quellen</p>
          <ul className="krank-quellen-list">
            {quellen.map((q, i) => (
              <li key={i} className="krank-quelle-item">
                {q.url ? (
                  <a href={q.url} target="_blank" rel="noopener noreferrer">{q.name}</a>
                ) : (
                  q.name
                )}
                {q.typ && <span style={{ color: 'var(--text-muted)', fontSize: 12 }}> · {q.typ}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
