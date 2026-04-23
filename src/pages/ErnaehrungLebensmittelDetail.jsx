// S18-Build-04: Lebensmittel-Kompass (K8b) — Detailseite
// Datum: 23.04.2026
// Blöcke: [1] Was ist das | [2] Nährwertprofil | [3] Nutzen | [4] Risiken
//          [5] Wechselwirkungen | [6] Besonders relevant | [7] Erkrankungen | Disclaimer

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLebensmittelBySlug } from '../lib/queries'
import './Ernaehrung.css'

// Mapping bekannter Nährstoffnamen → interne Slugs (/ernaehrung/naehrstoff/:slug)
const NAEHRSTOFF_SLUG_MAP = {
  'Omega-3': 'omega-3-fettsaeuren',
  'Omega-3-Fettsäuren': 'omega-3-fettsaeuren',
  'Vitamin D': 'vitamin-d',
  'Vitamin C': 'vitamin-c',
  'Vitamin A': 'vitamin-a',
  'Vitamin E': 'vitamin-e',
  'Vitamin K': 'vitamin-k1',
  'Vitamin K1': 'vitamin-k1',
  'Vitamin B12': 'vitamin-b12',
  'Folat': 'folat',
  'Eisen': 'eisen',
  'Magnesium': 'magnesium',
  'Calcium': 'calcium',
  'Kalium': 'kalium',
  'Zink': 'zink',
  'Selen': 'selen',
  'Iod': 'iod',
  'Ballaststoffe': 'ballaststoffe',
  'Protein': 'protein',
  'Lycopin': 'lycopin',
  'Beta-Carotin': 'beta-carotin',
  'Quercetin': 'quercetin',
  'Sulforaphan': 'sulforaphan',
  'Anthocyane': 'anthocyane',
  'Lutein': 'lutein-zeaxanthin',
}

const NOVA_LABELS = {
  1: { label: 'Unverarbeitet', hint: 'NOVA 1 — naturbelassen oder minimal verarbeitet' },
  2: { label: 'Minimal verarbeitet', hint: 'NOVA 2 — Zutaten aus unverarbeiteten Lebensmitteln' },
  3: { label: 'Verarbeitet', hint: 'NOVA 3 — enthält Zusatzstoffe' },
  4: { label: 'Stark verarbeitet', hint: 'NOVA 4 — ultra-verarbeitet' },
}

const RELEVANZ_LABELS = {
  schwangerschaft: '🤰 Schwangerschaft',
  senioren: '👴 Senioren',
  sportler: '🏃 Sportler',
  vegan: '🌱 Vegan',
  kinder: '🧒 Kinder',
  frauen: '♀ Frauen',
  maenner: '♂ Männer',
}

const OBERKATEGORIE_ICON = {
  'Gemüse':        '🥦',
  'Obst':          '🍎',
  'Hülsenfrüchte': '🫘',
  'Fisch':         '🐟',
  'Fleisch':       '🥩',
  'Getreide':      '🌾',
  'Nüsse/Samen':   '🥜',
  'Milchprodukte': '🥛',
  'Öle/Fette':     '🫒',
  'Sonstiges':     '🍳',
}

export default function ErnaehrungLebensmittelDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [lm, setLm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getLebensmittelBySlug(slug)
        setLm(data)
      } catch (err) {
        console.error(err)
        setError('Lebensmittel nicht gefunden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="ern-lm-detail-page">
        <div className="ern-loading">Wird geladen…</div>
      </div>
    )
  }

  if (error || !lm) {
    return (
      <div className="ern-lm-detail-page" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: '#DC2626', marginBottom: 12 }}>{error || 'Lebensmittel nicht gefunden.'}</p>
        <button className="ern-lm-back-btn" onClick={() => navigate('/ernaehrung')}>← Zurück zum Ernährungskompass</button>
      </div>
    )
  }

  const nutzen = Array.isArray(lm.gesundheitlicher_nutzen) ? lm.gesundheitlicher_nutzen : []
  const risiken = Array.isArray(lm.risiken_vorsicht) ? lm.risiken_vorsicht : []
  const wechselwirkungen = Array.isArray(lm.wechselwirkungen) ? lm.wechselwirkungen : []
  const erkrankungen = Array.isArray(lm.erkrankungs_bezug) ? lm.erkrankungs_bezug : []
  const relevanz = Array.isArray(lm.besonders_relevant_fuer) ? lm.besonders_relevant_fuer : []
  const quellen = Array.isArray(lm.quellen) ? lm.quellen : []
  const naehr = lm.naehrwertprofil || {}
  const mikros = naehr.mikros || {}
  const nova = lm.nova_klasse ? NOVA_LABELS[lm.nova_klasse] : null

  return (
    <div className="ern-lm-detail-page">
      {/* Hero */}
      <div className="ern-lm-hero">
        <div className="ern-lm-hero-inner">
          <button className="ern-lm-back-btn" onClick={() => navigate('/ernaehrung')}>
            ← Ernährungskompass
          </button>
          <div className="ern-lm-hero-badges">
            <span className="ern-lm-kategorie-badge">
              {OBERKATEGORIE_ICON[lm.oberkategorie] || '🥗'} {lm.oberkategorie}
            </span>
            {nova && (
              <span className="ern-lm-nova-badge" title={nova.hint}>
                {nova.label}
              </span>
            )}
          </div>
          <h1 className="ern-lm-hero-title">{lm.name_de}</h1>
        </div>
      </div>

      <div className="ern-lm-content">

        {/* [1] Was ist das */}
        <section className="ern-lm-section">
          <p className="ern-lm-intro">{lm.kurzbeschreibung}</p>
        </section>

        {/* [2] Nährwertprofil */}
        <section className="ern-lm-section">
          <h2 className="ern-lm-section-title">Nährwertprofil pro 100 g</h2>
          <div className="ern-lm-makro-grid">
            {naehr.kalorien_kcal != null && (
              <div className="ern-lm-makro-item">
                <span className="ern-lm-makro-label">Kalorien</span>
                <span className="ern-lm-makro-value">{naehr.kalorien_kcal} kcal</span>
              </div>
            )}
            {naehr.protein_g != null && (
              <div className="ern-lm-makro-item">
                <span className="ern-lm-makro-label">Protein</span>
                <span className="ern-lm-makro-value">{naehr.protein_g} g</span>
              </div>
            )}
            {naehr.fett_g != null && (
              <div className="ern-lm-makro-item">
                <span className="ern-lm-makro-label">Fett</span>
                <span className="ern-lm-makro-value">{naehr.fett_g} g</span>
              </div>
            )}
            {naehr.kh_g != null && (
              <div className="ern-lm-makro-item">
                <span className="ern-lm-makro-label">Kohlenhydrate</span>
                <span className="ern-lm-makro-value">{naehr.kh_g} g</span>
              </div>
            )}
            {naehr.ballaststoffe_g != null && (
              <div className="ern-lm-makro-item">
                <span className="ern-lm-makro-label">Ballaststoffe</span>
                <span className="ern-lm-makro-value">{naehr.ballaststoffe_g} g</span>
              </div>
            )}
          </div>

          {Object.keys(mikros).length > 0 && (
            <>
              <p className="ern-lm-mikro-label">Relevante Mikronährstoffe</p>
              <div className="ern-lm-lm-tags">
                {Object.entries(mikros).map(([name, wert]) => {
                  const naehrSlug = NAEHRSTOFF_SLUG_MAP[name]
                  return naehrSlug ? (
                    <button
                      key={name}
                      className="ern-lm-mikro-chip ern-lm-mikro-chip--linked"
                      onClick={() => navigate(`/ernaehrung/naehrstoff/${naehrSlug}`)}
                      title={`Zum Nährstoff-Eintrag: ${name}`}
                    >
                      {name}: {wert}
                    </button>
                  ) : (
                    <span key={name} className="ern-lm-mikro-chip">
                      {name}: {wert}
                    </span>
                  )
                })}
              </div>
            </>
          )}
        </section>

        {/* [3] Gesundheitlicher Nutzen */}
        {nutzen.length > 0 && (
          <section className="ern-lm-section">
            <h2 className="ern-lm-section-title">Gesundheitlicher Nutzen</h2>
            <div className="ern-lm-nutzen-liste">
              {nutzen.map((n, i) => (
                <div key={i} className="ern-lm-nutzen-item">
                  <p className="ern-lm-nutzen-punkt">{n.punkt}</p>
                  {n.evidenz_kurz && (
                    <p className="ern-lm-nutzen-evidenz">{n.evidenz_kurz}</p>
                  )}
                  {n.quelle && (
                    <p className="ern-lm-nutzen-quelle">{n.quelle}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* [4] Gesundheitliche Risiken / Vorsicht */}
        {risiken.length > 0 && (
          <section className="ern-lm-section ern-lm-section--risiken">
            <h2 className="ern-lm-section-title">Gesundheitliche Risiken / Vorsicht</h2>
            <div className="ern-lm-risiken-liste">
              {risiken.map((r, i) => (
                <div key={i} className="ern-lm-risiko-item">
                  <p className="ern-lm-risiko-punkt">{r.punkt}</p>
                  {r.zielgruppe && (
                    <span className="ern-lm-risiko-zielgruppe">Betrifft: {r.zielgruppe}</span>
                  )}
                  {r.ab_menge && (
                    <span className="ern-lm-risiko-menge">Ab Menge: {r.ab_menge}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* [5] Wechselwirkungen mit Medikamenten */}
        {wechselwirkungen.length > 0 && (
          <section className="ern-lm-section ern-lm-section--wechselwirkungen">
            <h2 className="ern-lm-section-title">Wechselwirkungen mit Medikamenten</h2>
            <p className="ern-lm-ww-hinweis">
              Die folgenden Wechselwirkungen sind durch klinische Studien oder Fachinformationen dokumentiert.
              Bei Medikamenteneinnahme immer Rücksprache mit der behandelnden Ärztin oder dem Apotheker halten.
            </p>
            <div className="ern-lm-ww-liste">
              {wechselwirkungen.map((w, i) => (
                <div key={i} className="ern-lm-ww-item">
                  <div className="ern-lm-ww-item-top">
                    <button
                      className="ern-lm-ww-chip"
                      onClick={() => navigate(`/medikamente/${w.medikament_slug}`)}
                    >
                      💊 {w.medikament_name}
                    </button>
                  </div>
                  <p className="ern-lm-ww-art">{w.art}</p>
                  {w.quelle && (
                    <p className="ern-lm-ww-quelle">{w.quelle}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* [6] Für wen besonders relevant */}
        {(relevanz.length > 0) && (
          <section className="ern-lm-section">
            <h2 className="ern-lm-section-title">Für wen besonders relevant</h2>
            <div className="ern-lm-relevanz-chips">
              {relevanz.map(r => (
                <span key={r} className="ern-lm-relevanz-chip">
                  {RELEVANZ_LABELS[r] || r}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* [7] Verknüpfte Erkrankungen */}
        {erkrankungen.length > 0 && (
          <section className="ern-lm-section">
            <h2 className="ern-lm-section-title">Erkrankungen mit Bezug</h2>
            <p className="ern-lm-section-sub">
              Dieses Lebensmittel wird in klinischen Studien im Zusammenhang mit folgenden Erkrankungen untersucht.
            </p>
            <div className="ern-lm-erkrankungs-chips">
              {erkrankungen.map((e, i) => (
                <button
                  key={i}
                  className="ern-lm-erkrankungs-chip"
                  onClick={() => navigate(`/krankheiten/${e.slug || ''}`)}
                >
                  {e.name_de}
                  {e.relevanz_kurz && (
                    <span className="ern-lm-erkrankungs-chip-relevanz"> — {e.relevanz_kurz}</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Quellen */}
        {quellen.length > 0 && (
          <section className="ern-lm-section ern-lm-section--quellen">
            <h2 className="ern-lm-section-title">Quellen</h2>
            <div className="ern-lm-quellen-liste">
              {quellen.map((q, i) => (
                q.url ? (
                  <a
                    key={i}
                    href={q.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ern-lm-quelle-tag"
                  >
                    {q.name}
                  </a>
                ) : (
                  <span key={i} className="ern-lm-quelle-tag ern-lm-quelle-tag--nolink">
                    {q.name}
                  </span>
                )
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer — immer am Ende */}
        <div className="ern-disclaimer">
          <p>
            Diese Informationen ersetzen keine ärztliche oder ernährungsmedizinische Beratung.
            Bei Erkrankungen, Medikamenteneinnahme oder besonderen gesundheitlichen Situationen
            stets Rücksprache mit der behandelnden Ärztin oder dem Arzt halten.
          </p>
        </div>

      </div>
    </div>
  )
}
