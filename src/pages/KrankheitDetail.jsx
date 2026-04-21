// S5-BUILD-01: Trust, Hub-Klarheit, Ehrlichkeits-Fix, Defensive Guards (P7C-Freeze)
// Änderungen gegenüber Vorgänger:
//   0.1 Disclaimer auf jeder S5-Detailseite (letzer Block, immer)
//   0.2 "Verwandte Einträge" → zwei getrennte Blöcke [10] Laborwerte / [11] Supplements
//   0.3 Array.isArray-Guards für alle JSONB-Array-Felder (statt field || [])
//   0.4 Platzhalter-Kommentare [7] Sicherheitsblock + [12] S6-Block (intern, keine UI)
//   0.5 Intern-Fälle (F06/L72/M13/R74/Z87): quellenExtern-Filter + ehrlicher Hinweis

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getKrankheitBySlug, getLaborwerteNameMap, getSupplementeNameMap, getWirkstoffeByKrankheit } from '../lib/queries'
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
  const [standardMedikamente, setStandardMedikamente] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const data = await getKrankheitBySlug(slug)
        setK(data)
        // Array.isArray guards vor Übergabe an Name-Maps (P7C-Freeze 0.3)
        const codes = Array.isArray(data?.verwandte_laborwerte) ? data.verwandte_laborwerte : []
        const slugs = Array.isArray(data?.verwandte_supplements) ? data.verwandte_supplements : []
        const [lwMap, suppMap, medList] = await Promise.all([
          getLaborwerteNameMap(codes).catch(() => ({})),
          getSupplementeNameMap(slugs).catch(() => ({})),
          getWirkstoffeByKrankheit(data?.icd10_code).catch(() => []),
        ])
        setLaborwertNamen(lwMap)
        setSupplementNamen(suppMap)
        setStandardMedikamente(medList)
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

  // Defensive Array.isArray guards für alle JSONB-Array-Felder (P7C-Freeze 0.3)
  // Ersetzt bisheriges `k.field || []` — robust gegen non-Array / null / inkonsistente JSONB-Zustände
  const symptome        = Array.isArray(k.symptome)              ? k.symptome              : []
  const diagnostik      = Array.isArray(k.diagnostik)            ? k.diagnostik            : []
  const behandlung      = Array.isArray(k.behandlung)            ? k.behandlung            : []
  const weiterfuehrend  = Array.isArray(k.weiterfuehrend)        ? k.weiterfuehrend        : []
  const quellen         = Array.isArray(k.quellen)               ? k.quellen               : []
  const verwLaborwerte  = Array.isArray(k.verwandte_laborwerte)  ? k.verwandte_laborwerte  : []
  const verwSupplements = Array.isArray(k.verwandte_supplements) ? k.verwandte_supplements : []
  const synonyme        = Array.isArray(k.synonym_de)            ? k.synonym_de            : []
  // filter_tags: Guard vorhanden für künftige Logik (Fehldiagnose-Block, Stufe 1)
  // const filterTags   = Array.isArray(k.filter_tags)           ? k.filter_tags           : []

  // Nur Refs rendern, die tatsächlich in der DB existieren (= Klarname im Map vorhanden)
  const valLaborwerte  = verwLaborwerte.filter(code => laborwertNamen[code] !== undefined)
  const valSupplements = verwSupplements.filter(s   => supplementNamen[s]   !== undefined)

  // Intern-Fälle Quellen-Logik (P7C-Freeze 0.5)
  // quellenExtern: nur Einträge mit typ !== 'intern' — sichtbar im Quellenblock
  // nurInternQuellen: quellen vorhanden aber ausschließlich intern (F06/L72/M13/R74/Z87)
  const quellenExtern    = quellen.filter(q => q.typ !== 'intern')
  const nurInternQuellen = quellen.length > 0 && quellenExtern.length === 0

  return (
    <div className="krank-detail">
      <button className="krank-detail-back" onClick={() => navigate('/krankheiten')}>
        ← Alle Krankheiten
      </button>

      {/* [1] Header ──────────────────────────────────────────────────────────── */}
      <div className="krank-detail-header">
        <h1 className="krank-detail-title">{k.name_de}</h1>
        {synonyme.length > 0 && (
          <p className="krank-detail-synonym">Auch bekannt als: {synonyme.join(' · ')}</p>
        )}
        <div className="krank-detail-meta">
          {k.icd10_code  && <span className="krank-icd">{k.icd10_code}</span>}
          {k.kategorie   && <span className="krank-kat-tag">{k.kategorie}</span>}
          {k.haeufigkeit && <span className="krank-haeufigkeit">{k.haeufigkeit}</span>}
          {k.notfall_flag && <span className="krank-notfall-badge">⚡ Notfall-relevant</span>}
        </div>
      </div>

      {/* [2] Sprachebenen-Toggle ──────────────────────────────────────────────── */}
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

      {/* [3] Beschreibung ────────────────────────────────────────────────────── */}
      {beschreibung[ebene] && (
        <div className="krank-section">
          <p className="krank-section-title">Was ist das?</p>
          <p className="krank-section-text">{beschreibung[ebene]}</p>
        </div>
      )}

      {/* [4] Symptome & Warnsignale ──────────────────────────────────────────── */}
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

      {/* [5] Diagnostik ──────────────────────────────────────────────────────── */}
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

      {/* [6] Behandlung ──────────────────────────────────────────────────────── */}
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

      {/* [7] Prognose ────────────────────────────────────────────────────────── */}
      {k.prognose && (
        <div className="krank-section">
          <p className="krank-section-title">Prognose</p>
          <p className="krank-section-text">{k.prognose}</p>
        </div>
      )}

      {/* [8] Leben mit der Erkrankung ────────────────────────────────────────── */}
      {k.leben_mit && (
        <div className="krank-section">
          <p className="krank-section-title">Leben mit der Erkrankung</p>
          <p className="krank-section-text">{k.leben_mit}</p>
        </div>
      )}

      {/* [9] Geschlechtsspezifische Besonderheiten ───────────────────────────── */}
      {k.gender_kontext?.hinweis && (
        <div className="krank-section">
          <p className="krank-section-title">Geschlechtsspezifische Besonderheiten</p>
          <p className="krank-section-text">{k.gender_kontext.hinweis}</p>
        </div>
      )}

      {/* [Sicherheitsblock] — Spec-Gate offen; kein vorsicht-Feld im Schema → S5-BUILD-02 */}

      {/* [10] S1-Cross-Block "Relevante Laborwerte" (P7C-Freeze 0.2) ──────────── */}
      {/* Nur wenn valLaborwerte.length > 0 — kein Fallback-Text wenn leer */}
      {valLaborwerte.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Relevante Laborwerte</p>
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
          </div>
        </div>
      )}

      {/* [11] S2-Cross-Block "Evidenzbasierte Supplements" (P7C-Freeze 0.2) ───── */}
      {/* Nur wenn valSupplements.length > 0 — kein Fallback-Text wenn leer */}
      {valSupplements.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Evidenzbasierte Supplements</p>
          <div className="krank-links-grid">
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

      {/* [12] S6-Cross-Block "Standardmedikamente" */}
      {standardMedikamente.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Häufig eingesetzte Wirkstoffe</p>
          <p className="krank-section-subtext" style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
            Auf Basis offizieller Zulassungsdaten — keine Therapieempfehlung.
            Apotheke oder Arzt für individuelle Beratung.
          </p>
          <div className="krank-links-grid">
            {standardMedikamente.map(med => (
              <button
                key={med.slug}
                className="krank-link-chip"
                onClick={() => navigate(`/medikamente/${med.slug}`)}
              >
                💊 {med.name_de}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* [15] Weiterführende Informationen ──────────────────────────────────── */}
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

      {/* [16] Quellen — nur externe Quellen (typ !== 'intern') (P7C-Freeze 0.5) ── */}
      {quellenExtern.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Quellen</p>
          <ul className="krank-quellen-list">
            {quellenExtern.map((q, i) => (
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

      {/* [16b] Intern-Fälle: kein Quellenblock — ehrlicher Hinweis (P7C-Freeze 0.5) */}
      {/* Greift wenn quellen nur intern-Einträge enthält (F06/L72/M13/R74/Z87) */}
      {nurInternQuellen && (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, marginBottom: 0 }}>
          Zu diesem ICD-Code liegen keine externen Quellen vor.
        </p>
      )}

      {/* [18] Disclaimer — Pflicht auf jeder S5-Detailseite (P7C-Freeze 0.1) ──── */}
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 32, textAlign: 'center' }}>
        Diese Informationen ersetzen keine ärztliche Diagnose und keine medizinische Beratung. Bitte wende dich bei gesundheitlichen Beschwerden an eine Ärztin oder einen Arzt.
      </p>
    </div>
  )
}
