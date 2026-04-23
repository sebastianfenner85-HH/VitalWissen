// S5-BUILD-01: Trust, Hub-Klarheit, Ehrlichkeits-Fix, Defensive Guards (P7C-Freeze)
// Änderungen gegenüber Vorgänger:
//   0.1 Disclaimer auf jeder S5-Detailseite (letzer Block, immer)
//   0.2 "Verwandte Einträge" → zwei getrennte Blöcke [10] Laborwerte / [11] Supplements
//   0.3 Array.isArray-Guards für alle JSONB-Array-Felder (statt field || [])
//   0.4 Platzhalter-Kommentare [7] Sicherheitsblock + [12] S6-Block (intern, keine UI)
//   0.5 Intern-Fälle (F06/L72/M13/R74/Z87): quellenExtern-Filter + ehrlicher Hinweis
// S6-03: S5→S6 Cross-Block „Häufig eingesetzte Wirkstoffe" (S6-03, 22.04.2026)
//   1.0 [12] S6-Block mit getWirkstoffeByKrankheit — nur DB-verifizierte Treffer, ausblenden wenn leer
// S18-Build-03: S5→S18 Cross-Block „Ernährung im Kontext" (S18-Build-03, 22.04.2026)
//   2.0 [13] S18-Block mit getNaehrstoffeByIcdCode + getMusterByKrankheitSlug — ausblenden wenn beide leer
// S18-Build-04: Lebensmittel-Chips in Block [13] ergänzt (23.04.2026)
//   3.0 [13] Lebensmittel-Chips via getLebensmittelByIcdCode — orange, Slot 3 in Block [13]
// S8-BUILD-01: B4 „Nächste Schritte" (23.04.2026)
//   4.0 [14] B4-Block mit Stufe-1/2/3-Logik aus naechste_schritte JSONB — nur für 5 First-Slice-Krankheiten

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getKrankheitBySlug, getLaborwerteNameMap, getSupplementeNameMap, getWirkstoffeByKrankheit, getNaehrstoffeByIcdCode, getMusterByKrankheitSlug, getLebensmittelByIcdCode } from '../lib/queries'
import './Krankheiten.css'

const EBENEN = [
  { key: 'einfach',    label: 'Sehr einfach' },
  { key: 'laienhaft', label: 'Laienhaft'     },
  { key: 'fachlich',  label: 'Fachlich'      },
]

// ── B4 Option-Karte ─────────────────────────────────────────────────────────
// Gezeigt wenn: naechste_schritte Feld vorhanden + stufe-Filter passend
// Keine Therapieempfehlung, keine Diagnosestellung, kein Arzt-Ersatz (S8-PRE-SPEC §C10)
function B4OptionCard({ option }) {
  const typLabel = option.typ === 'S' ? 'Standard' : option.typ === 'E' ? 'Ergänzend' : 'Explorativ'
  const typClass = option.typ === 'S' ? 'b4-typ-badge--s' : option.typ === 'E' ? 'b4-typ-badge--e' : 'b4-typ-badge--x'
  const optClass = option.typ === 'S' ? 'b4-option--s' : option.typ === 'E' ? 'b4-option--e' : 'b4-option--x'

  return (
    <div className={`b4-option ${optClass}`}>
      <div className="b4-option-top">
        <span className="b4-option-titel">{option.titel}</span>
        <span className={`b4-typ-badge ${typClass}`}>{typLabel}</span>
      </div>

      {option.nutzen && (
        <p className="b4-option-nutzen">{option.nutzen}</p>
      )}

      {option.vorsicht && (
        <p className="b4-option-vorsicht">⚠ {option.vorsicht}</p>
      )}

      {option.monitoring && (
        <p className="b4-option-monitoring">⏱ {option.monitoring}</p>
      )}

      {Array.isArray(option.fragen) && option.fragen.length > 0 && (
        <div className="b4-option-fragen">
          <span className="b4-fragen-label">Besprechen:</span>
          <ul className="b4-fragen-list">
            {option.fragen.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="b4-option-footer">
        <span className="b4-option-trigger">Gezeigt weil: {option.trigger}</span>
        {option.quelle_url ? (
          <a
            href={option.quelle_url}
            target="_blank"
            rel="noopener noreferrer"
            className="b4-option-quelle"
          >
            {option.quelle} ↗
          </a>
        ) : option.quelle ? (
          <span className="b4-option-quelle">{option.quelle}</span>
        ) : null}
      </div>
    </div>
  )
}

// ── Hauptkomponente ──────────────────────────────────────────────────────────
export default function KrankheitDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [k, setK] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ebene, setEbene] = useState('laienhaft')
  const [laborwertNamen, setLaborwertNamen] = useState({})
  const [supplementNamen, setSupplementNamen] = useState({})
  const [wirkstoffe, setWirkstoffe] = useState([])
  const [naehrstoffeS18, setNaehrstoffeS18] = useState([])
  const [musterS18, setMusterS18] = useState([])
  const [lebensmittelS18, setLebensmittelS18] = useState([])
  // B4 State: Accordion (Stufe 2) + Intent-Signal (Stufe 3)
  const [b4Offen, setB4Offen] = useState(false)
  const [b4Erweitert, setB4Erweitert] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await getKrankheitBySlug(slug)
        setK(data)
        // Array.isArray guards vor Übergabe an Name-Maps (P7C-Freeze 0.3)
        const codes = Array.isArray(data?.verwandte_laborwerte) ? data.verwandte_laborwerte : []
        const slugs = Array.isArray(data?.verwandte_supplements) ? data.verwandte_supplements : []
        const [lwMap, suppMap, wList, naehrList, musterList, lmList] = await Promise.all([
          getLaborwerteNameMap(codes).catch(() => ({})),
          getSupplementeNameMap(slugs).catch(() => ({})),
          getWirkstoffeByKrankheit(data?.icd10_code).catch(() => []),
          getNaehrstoffeByIcdCode(data?.icd10_code).catch(() => []),
          getMusterByKrankheitSlug(slug).catch(() => []),
          getLebensmittelByIcdCode(data?.icd10_code).catch(() => []),
        ])
        setLaborwertNamen(lwMap)
        setSupplementNamen(suppMap)
        setWirkstoffe(wList)
        setNaehrstoffeS18(naehrList)
        setMusterS18(musterList)
        setLebensmittelS18(lmList)
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
  // B4: naechste_schritte JSONB-Array (S8-BUILD-01)
  // Guard: leeres Array wenn Feld fehlt (Krankheiten ohne B4-Daten → Block absent)
  const naechsteSchritte = Array.isArray(k.naechste_schritte) ? k.naechste_schritte : []

  // Stufe-Filter (Pre-Spec bindend — S8-PRE-SPEC §C6)
  const b4S1 = naechsteSchritte.filter(o => o.stufe === 1)
  const b4S2 = naechsteSchritte.filter(o => o.stufe === 2)
  const b4S3 = naechsteSchritte.filter(o => o.stufe === 3)

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

      {/* [12] S6-Cross-Block "Häufig eingesetzte Wirkstoffe" (S6-03, 22.04.2026) ─── */}
      {/* Nur wenn DB-Treffer vorhanden — ausblenden wenn leer */}
      {wirkstoffe.length > 0 && (
        <div className="krank-section">
          <p className="krank-section-title">Häufig eingesetzte Wirkstoffe</p>
          <div className="krank-links-grid">
            {wirkstoffe.map(w => (
              <button
                key={w.slug}
                className="krank-med-chip"
                onClick={() => navigate(`/medikamente/${w.slug}`)}
              >
                {w.name_de}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* [13] S18-Cross-Block "Ernährung im Kontext" (S18-Build-03 + Build-04) ─── */}
      {/* Nährstoffe via ICD-Code (erkrankungs_bezug @> [{icd_code}]) — max 5      */}
      {/* Muster via Krankheits-Slug (verwandte_krankheiten @> [slug]) — max 3     */}
      {/* Lebensmittel via ICD-Code (erkrankungs_bezug @> [{icd_code}]) — max 5   */}
      {/* Block absent wenn alle drei Listen leer — kein Empty-State, kein Dummy   */}
      {(naehrstoffeS18.length > 0 || musterS18.length > 0 || lebensmittelS18.length > 0) && (
        <div className="krank-section">
          <p className="krank-section-title">Ernährung im Kontext</p>
          {naehrstoffeS18.length > 0 && (
            <div className="krank-ern-subgroup">
              <p className="krank-ern-sublabel">Relevante Nährstoffe</p>
              <div className="krank-links-grid">
                {naehrstoffeS18.map(n => (
                  <button
                    key={n.slug}
                    className="krank-ern-chip"
                    onClick={() => navigate(`/ernaehrung/naehrstoff/${n.slug}`)}
                  >
                    {n.name_de}
                  </button>
                ))}
              </div>
            </div>
          )}
          {lebensmittelS18.length > 0 && (
            <div className="krank-ern-subgroup">
              <p className="krank-ern-sublabel">Lebensmittel</p>
              <div className="krank-links-grid">
                {lebensmittelS18.map(lm => (
                  <button
                    key={lm.slug}
                    className="krank-lm-chip"
                    onClick={() => navigate(`/ernaehrung/lebensmittel/${lm.slug}`)}
                  >
                    {lm.name_de}
                  </button>
                ))}
              </div>
            </div>
          )}
          {musterS18.length > 0 && (
            <div className="krank-ern-subgroup">
              <p className="krank-ern-sublabel">Ernährungsmuster</p>
              <div className="krank-links-grid">
                {musterS18.map(m => (
                  <button
                    key={m.slug}
                    className="krank-muster-chip"
                    onClick={() => navigate(`/ernaehrung/muster/${m.slug}`)}
                  >
                    {m.name_de}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* [14] B4-Block "Nächste Schritte" — S8-BUILD-01 (23.04.2026) ─────────── */}
      {/* Nur wenn naechste_schritte JSONB befüllt — block absent wenn leer       */}
      {/* First Slice: 5 Krankheiten (I10/E11/F32/E03/D50) — alle anderen absent  */}
      {/* Keine Therapieempfehlung, kein Arzt-Ersatz (S8-PRE-SPEC §C10)           */}
      {naechsteSchritte.length > 0 && (
        <div className="krank-section b4-block">
          {/* B4 Header */}
          <p className="krank-section-title">Nächste Schritte</p>
          <p className="b4-subtitle">
            Praktische Handlungsoptionen — was du besprechen, vorbereiten oder einleiten kannst.
          </p>

          {/* Stufe 1: sofort sichtbar — Standard + Notfall (RK-A, Pre-Spec §C6 S1) */}
          {b4S1.length > 0 && (
            <div className="b4-stufe1">
              {b4S1.map(o => (
                <B4OptionCard key={o.id} option={o} />
              ))}
            </div>
          )}

          {/* Stufe 2: Accordion — Ergänzend etabliert (RK-B, Pre-Spec §C6 S2) */}
          {b4S2.length > 0 && (
            <div className="b4-accordion-wrap">
              <button
                className="b4-accordion-btn"
                onClick={() => setB4Offen(v => !v)}
                aria-expanded={b4Offen}
              >
                <span>{b4Offen ? '▲' : '▼'} Unterstützende Maßnahmen &amp; Monitoring</span>
                <span className="b4-accordion-count">{b4S2.length} Optionen</span>
              </button>
              {b4Offen && (
                <div className="b4-stufe2">
                  {b4S2.map(o => (
                    <B4OptionCard key={o.id} option={o} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Stufe 3: nach Intent-Signal (Pre-Spec §C6 S3) */}
          {b4S3.length > 0 && !b4Erweitert && (
            <button
              className="b4-intent-btn"
              onClick={() => setB4Erweitert(true)}
            >
              Weitere Optionen &amp; aktuelle Forschung anzeigen →
            </button>
          )}
          {b4S3.length > 0 && b4Erweitert && (
            <div className="b4-stufe3">
              <p className="b4-stufe3-label">Optionen &amp; Forschung — mit Einordnung</p>
              {b4S3.map(o => (
                <B4OptionCard key={o.id} option={o} />
              ))}
            </div>
          )}

          {/* Trust Note — Pflicht laut Pre-Spec §C1 */}
          <p className="b4-trust-note">
            Diese Optionen ersetzen keine individuelle ärztliche Beratung. Sie helfen dabei, Gespräche vorzubereiten und Handlungsoptionen einzuordnen — die Entscheidung liegt bei dir und deiner Ärztin oder deinem Arzt.
          </p>
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
