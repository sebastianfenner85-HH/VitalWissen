import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLaborwertByCode } from '../lib/queries'
import { LABORWERT_K3_MAP } from '../lib/laborwert_k3_map'
import './Laborwerte.css'

// S1-BUILD-01: JP-Gating — JSCC-Daten noch nicht regulär exponiert.
// JP-Karte wird nur gerendert wenn ref_jp_min oder ref_jp_max für diesen Eintrag vorhanden.
const LEITLINIEN = [
  { key: 'de',  label: '🇩🇪 DE',    quelle: 'DGKL' },
  { key: 'usa', label: '🇺🇸 USA',   quelle: 'AACC' },
  { key: 'jp',  label: '🇯🇵 Japan', quelle: 'JSCC' },
]

// Q2 Quellentyp-Labels
const QUELLEN_TYP_LABEL = {
  guideline:    'Leitlinie',
  regulatory:   'Behörde',
  database:     'Datenbank',
  research:     'Studie',
  patient_info: 'Patienteninfo',
}

// ZT-Typ Metadaten
const ZT_META = {
  ZT1: { label: 'Primärprävention',   cssKey: 'zt1' },
  ZT2: { label: 'Therapieziel',       cssKey: 'zt2' },
  ZT3: { label: 'Risikogruppe',       cssKey: 'zt3' },
  ZT4: { label: 'Therapiemonitoring', cssKey: 'zt4' },
}

// K3-Einordnung Typ-Labels + CSS-Schlüssel
const EINORDNUNG_TYP = {
  standard:   { label: 'Leitlinienwissen',    cssKey: 'standard' },
  supporting: { label: 'Ergänzender Hinweis', cssKey: 'supporting' },
  uncertain:  { label: 'Explorativ',          cssKey: 'uncertain' },
}

function formatRef(min, max, einheit) {
  if (min != null && max != null) return `${min} – ${max} ${einheit ?? ''}`
  if (max != null) return `< ${max} ${einheit ?? ''}`
  if (min != null) return `> ${min} ${einheit ?? ''}`
  return '—'
}

// [6] Zielwert-Block V3 — Komponente (S1-BUILD-01)
function ZielwertBlock({ zielwerte }) {
  const [intentOpen, setIntentOpen] = useState(false)
  const [openItems, setOpenItems] = useState({})

  const zt12 = zielwerte.filter(z => z.zielwert_typ === 'ZT1' || z.zielwert_typ === 'ZT2')
  const zt34 = zielwerte.filter(z => z.zielwert_typ === 'ZT3' || z.zielwert_typ === 'ZT4')

  const toggleItem = (key) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))

  const renderItem = (z, key) => {
    const meta = ZT_META[z.zielwert_typ] ?? { label: z.zielwert_typ, cssKey: 'zt1' }
    const isOpen = !!openItems[key]

    return (
      <div key={key} className={`lw-zt-item${z.zielwert_typ === 'ZT4' ? ' lw-zt-item--zt4' : ''}`}>
        <button
          className="lw-zt-item-header"
          onClick={() => toggleItem(key)}
          aria-expanded={isOpen}
        >
          <span className={`lw-zt-badge lw-zt-badge--${meta.cssKey}`}>{meta.label}</span>
          <span className="lw-zt-item-label">{z.zielwert_label}</span>
          <span className="lw-zt-item-wert">{z.zielwert_wert}</span>
          <span className={`lw-zt-chevron${isOpen ? ' lw-zt-chevron--open' : ''}`}>▾</span>
        </button>
        {isOpen && (
          <div className="lw-zt-item-body">
            {z.zielwert_typ === 'ZT4' && (
              <p className="lw-zt-arzt-hinweis">
                Dieser Wert dient der ärztlichen Therapiekontrolle. Änderungen an Ihrer Medikation dürfen nur in Absprache mit Ihrer Ärztin oder Ihrem Arzt erfolgen.
              </p>
            )}
            {z.zielwert_kontext && (
              <p className="lw-zt-kontext">{z.zielwert_kontext}</p>
            )}
            {z.zielwert_caveat && (
              <p className="lw-zt-caveat">⚠ {z.zielwert_caveat}</p>
            )}
            {z.zielwert_quelle && (
              <p className="lw-zt-quelle-zeile">
                <span className="lw-quelle-typ-chip lw-quelle-typ-guideline">
                  {QUELLEN_TYP_LABEL[z.zielwert_quelle.typ] ?? z.zielwert_quelle.typ}
                </span>
                {z.zielwert_quelle.url ? (
                  <a href={z.zielwert_quelle.url} target="_blank" rel="noopener noreferrer" className="lw-zt-quelle-link">
                    {z.zielwert_quelle.name}
                  </a>
                ) : (
                  <span>{z.zielwert_quelle.name}</span>
                )}
                {z.zielwert_quelle.jahr && (
                  <span className="lw-zt-quelle-jahr"> ({z.zielwert_quelle.jahr})</span>
                )}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="detail-section lw-zielwert-block">
      <p className="detail-section-title">Zielwerte &amp; Therapieziele</p>

      {/* Differenzierungs-Hinweis: Referenzbereich ≠ Zielwert */}
      <div className="lw-zt-hinweis">
        <span className="lw-zt-hinweis-icon">ℹ</span>
        <span>Referenzbereiche beschreiben, was bei gesunden Menschen üblich ist. Zielwerte sind Behandlungsziele — sie werden ärztlich individuell festgelegt.</span>
      </div>

      {/* ZT1 + ZT2: direkt sichtbar, aufklappbar */}
      {zt12.map((z, i) => renderItem(z, `zt12-${i}`))}

      {/* ZT3 + ZT4: hinter Intent-Button */}
      {zt34.length > 0 && (
        <div className="lw-zt-intent-section">
          <button
            className="lw-zt-intent-btn"
            onClick={() => setIntentOpen(prev => !prev)}
          >
            {intentOpen ? '▾' : '▸'}&nbsp;Zielwerte für spezifische Risikogruppen oder Therapien
          </button>
          {intentOpen && zt34.map((z, i) => renderItem(z, `zt34-${i}`))}
        </div>
      )}
    </div>
  )
}

// [12] Einordnung des Wertes — Komponente (S8-BUILD-02, K3)
// Strikt nach K3-Regeln: keine Diagnose, kein Personalisierungsframing.
// "wird beobachtet bei" / "kann auftreten bei" — nie "bedeutet X" oder "du hast".
function EinordnungBlock({ loincCode, slug }) {
  const eintraege =
    (loincCode && LABORWERT_K3_MAP[loincCode]) ||
    (slug && LABORWERT_K3_MAP[slug]) ||
    null
  if (!eintraege) return null

  const { high = [], low = [] } = eintraege
  if (high.length === 0 && low.length === 0) return null

  const renderKarte = (eintrag, idx) => {
    const typ = EINORDNUNG_TYP[eintrag.type] ?? EINORDNUNG_TYP.uncertain
    return (
      <div key={idx} className="lw-einordnung-karte">
        <div className="lw-einordnung-karte-kopf">
          <span className={`lw-einordnung-badge lw-einordnung-badge--${typ.cssKey}`}>
            {typ.label}
          </span>
          <span className="lw-einordnung-titel">{eintrag.title}</span>
        </div>
        <p className="lw-einordnung-beschreibung">{eintrag.description}</p>
        {eintrag.caution && (
          <div className="lw-einordnung-vorsicht">
            <span className="lw-einordnung-vorsicht-icon">ⓘ</span>
            <span>{eintrag.caution}</span>
          </div>
        )}
        <p className="lw-einordnung-evidenz">{eintrag.evidence}</p>
      </div>
    )
  }

  return (
    <div className="detail-section lw-einordnung-block">
      <p className="detail-section-title">Einordnung des Wertes</p>

      <div className="lw-einordnung-hinweis">
        <span>Dieser Abschnitt zeigt, in welchen medizinischen Zusammenhängen dieser Wert verändert sein kann — keine Diagnose, keine Bewertung Ihres persönlichen Befunds.</span>
      </div>

      {high.length > 0 && (
        <div className="lw-einordnung-gruppe">
          <p className="lw-einordnung-gruppe-titel">↑ Mögliche Zusammenhänge bei erhöhtem Wert</p>
          {high.map(renderKarte)}
        </div>
      )}

      {low.length > 0 && (
        <div className="lw-einordnung-gruppe">
          <p className="lw-einordnung-gruppe-titel">↓ Mögliche Zusammenhänge bei erniedrigtem Wert</p>
          {low.map(renderKarte)}
        </div>
      )}

      <p className="lw-einordnung-footer">
        Laborwerte müssen immer im klinischen Gesamtkontext bewertet werden. Diese Übersicht ersetzt keine ärztliche Einordnung.
      </p>
    </div>
  )
}

export default function LaborwertDetail() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [lw, setLw] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getLaborwertByCode(code)
        setLw(data)
      } catch (err) {
        console.error(err)
        setError('Laborwert nicht gefunden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [code])

  if (loading) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Wird geladen…
      </div>
    )
  }

  if (error || !lw) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--red)', marginBottom: 12 }}>{error || 'Laborwert nicht gefunden.'}</p>
        <button className="lw-detail-back" onClick={() => navigate('/laborwerte')}>← Zurück zur Liste</button>
      </div>
    )
  }

  const ref = {
    de: {
      geschlechtsspezifisch: lw.ref_de_min_w != null && lw.ref_de_min_m !== lw.ref_de_min_w,
      min_m: lw.ref_de_min_m, max_m: lw.ref_de_max_m,
      min_w: lw.ref_de_min_w, max_w: lw.ref_de_max_w,
      min: lw.ref_de_min_m ?? lw.ref_de_min_w,
      max: lw.ref_de_max_m ?? lw.ref_de_max_w,
      einheit: lw.ref_de_einheit, quelle: lw.ref_de_quelle,
      quelle_url: lw.ref_de_quelle_url, quelle_jahr: lw.ref_de_quelle_jahr,
    },
    usa: {
      min: lw.ref_usa_min, max: lw.ref_usa_max,
      einheit: lw.ref_usa_einheit, quelle: lw.ref_usa_quelle,
      quelle_url: lw.ref_usa_quelle_url, quelle_jahr: lw.ref_usa_quelle_jahr,
    },
    jp: {
      min: lw.ref_jp_min, max: lw.ref_jp_max,
      einheit: lw.ref_jp_einheit, quelle: lw.ref_jp_quelle,
      quelle_url: lw.ref_jp_quelle_url, quelle_jahr: lw.ref_jp_quelle_jahr,
    },
  }

  // Defensive Array-Guards für alle JSONB-Felder
  const supplementEinfluss = Array.isArray(lw.supplement_einfluss) ? lw.supplement_einfluss : []
  const medEinfluss        = Array.isArray(lw.medikament_einfluss) ? lw.medikament_einfluss : []
  const ursachenHoch       = Array.isArray(lw.ursachen_hoch)    ? lw.ursachen_hoch    : (lw.ursachen_hoch    ? [lw.ursachen_hoch]    : [])
  const ursachenNiedrig    = Array.isArray(lw.ursachen_niedrig) ? lw.ursachen_niedrig : (lw.ursachen_niedrig ? [lw.ursachen_niedrig] : [])
  const zielwerte          = Array.isArray(lw.zielwerte) ? lw.zielwerte : []

  // Quellenkontext: alle Länder die eine URL haben
  const quellenKontext = LEITLINIEN
    .map(l => ({ ...l, ...ref[l.key] }))
    .filter(l => l.quelle_url)

  return (
    <div className="lw-detail">
      <button className="lw-detail-back" onClick={() => navigate('/laborwerte')}>
        ← Alle Laborwerte
      </button>

      {/* [1] Notfall-Banner — immer wenn flag, ganz oben */}
      {lw.notfall_flag && (
        <div className="notfall-banner">
          <strong>⚠ Notfallrelevant:</strong>&nbsp;Bei stark abweichenden Werten sofort ärztliche Hilfe
          suchen. Notfall: <strong>112</strong>
        </div>
      )}

      {/* [2] Header — immer */}
      <div className="lw-detail-header">
        <h1 className="lw-detail-title">{lw.name_de}</h1>
        {lw.vollname_de && lw.vollname_de !== lw.name_de && (
          <p className="lw-detail-vollname">{lw.vollname_de}</p>
        )}
        <div className="lw-detail-meta">
          {lw.loinc_code && <span className="lw-loinc">LOINC {lw.loinc_code}</span>}
          {(lw.panel || lw.kategorie) && (
            <span className="lw-panel-tag">{lw.panel || lw.kategorie}</span>
          )}
        </div>
      </div>

      {/* [3] Beschreibung laienhaft — nur bei Daten */}
      {lw.beschreibung_laienhaft && (
        <p className="beschreibung-text" style={{ marginBottom: 24 }}>{lw.beschreibung_laienhaft}</p>
      )}

      {/* [4] Referenzbereiche — immer sichtbar.
           JP-Gate (S1-BUILD-01): JP-Karte nur rendern wenn Datenbasis vorhanden. */}
      <div className="detail-section">
        <p className="detail-section-title">Referenzbereiche im Vergleich</p>
        <div className="referenz-grid">
          {LEITLINIEN.map(l => {
            const r = ref[l.key]
            const hatDaten = r.min != null || r.max != null || r.max_m != null || r.max_w != null

            // JP-Gate: JP-Karte ausblenden wenn keine Daten vorhanden
            if (l.key === 'jp' && !hatDaten) return null

            return (
              <div key={l.key} className="referenz-item">
                <span className="referenz-flag">{l.label}</span>
                <p className="referenz-quelle">{l.quelle}</p>
                {hatDaten ? (
                  <>
                    {r.geschlechtsspezifisch ? (
                      <>
                        <p className="referenz-wert" style={{ fontSize: 14 }}>
                          ♂ {formatRef(r.min_m, r.max_m, r.einheit)}
                        </p>
                        <p className="referenz-wert" style={{ fontSize: 14, marginTop: 4 }}>
                          ♀ {formatRef(r.min_w, r.max_w, r.einheit)}
                        </p>
                      </>
                    ) : (
                      <p className="referenz-wert">{formatRef(r.min, r.max, r.einheit)}</p>
                    )}
                    {r.quelle && <p className="referenz-einheit">{r.quelle}</p>}
                  </>
                ) : (
                  <p className="referenz-wert" style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</p>
                )}
              </div>
            )
          })}
        </div>

        {/* [4b] Quellenkontext — nur wenn URL-Daten vorhanden (5 Pilot-Werte) */}
        {quellenKontext.length > 0 && (
          <div className="lw-quellenkontext">
            <span className="lw-quellenkontext-label">Quellen Referenzbereiche:</span>
            {quellenKontext.map(l => (
              <a
                key={l.key}
                href={l.quelle_url}
                target="_blank"
                rel="noopener noreferrer"
                className="lw-quellenkontext-link"
              >
                <span className="lw-quelle-typ-chip lw-quelle-typ-database">Datenbank</span>
                {l.label} {l.quelle && `· ${l.quelle}`}{l.quelle_jahr && ` (${l.quelle_jahr})`}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* [6] Zielwert-Block V3 — nur wenn zielwerte JSONB befüllt */}
      {zielwerte.length > 0 && <ZielwertBlock zielwerte={zielwerte} />}

      {/* [12] Einordnung des Wertes — B4/K3 Block (S8-BUILD-02)
           Position: zwischen Zielwerte und Mögliche Ursachen.
           Nur bei kuratierten Laborwerten (LOINC in LABORWERT_K3_MAP).
           No-data → Block vollständig absent. */}
      <EinordnungBlock loincCode={lw.loinc_code} slug={lw.slug} />

      {/* [8] Ursachen — nur bei Daten */}
      {(ursachenHoch.length > 0 || ursachenNiedrig.length > 0) && (
        <div className="detail-section">
          <p className="detail-section-title">Mögliche Ursachen</p>
          <div className="ursachen-grid">
            {ursachenHoch.length > 0 && (
              <div>
                <p className="ursachen-label">↑ Erhöht</p>
                <ul className="ursachen-list ursachen-hoch">
                  {ursachenHoch.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>
            )}
            {ursachenNiedrig.length > 0 && (
              <div>
                <p className="ursachen-label">↓ Erniedrigt</p>
                <ul className="ursachen-list ursachen-niedrig">
                  {ursachenNiedrig.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* [11] Wann zum Arzt — nur bei Daten */}
      {lw.wann_arzt && (
        <div className="detail-section">
          <p className="detail-section-title">Wann zum Arzt?</p>
          <div className="wann-arzt-box">{lw.wann_arzt}</div>
        </div>
      )}

      {/* [9] S2-Cross-Block "Supplement-Einfluss" — nur bei Daten */}
      {supplementEinfluss.length > 0 && (
        <div className="detail-section">
          <p className="detail-section-title">Supplements, die diesen Wert beeinflussen</p>
          <div className="zusammenhaenge-chips">
            {supplementEinfluss.map((s, i) => (
              <span key={i} className="zusammenhaenge-chip">
                {typeof s === 'string' ? s : (s.name ?? s.name_de ?? '')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* [10] S6-Cross-Block "Medikamenten-Einfluss" — nur bei Daten */}
      {medEinfluss.length > 0 && (
        <div className="detail-section">
          <p className="detail-section-title">Medikamente, die diesen Wert beeinflussen</p>
          <div className="zusammenhaenge-chips">
            {medEinfluss.map((m, i) => (
              <span key={i} className="zusammenhaenge-chip">
                {typeof m === 'string' ? m : (m.name ?? m.name_de ?? '')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* [13] Disclaimer — immer letzter Block */}
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 32, textAlign: 'center' }}>
        Diese Informationen ersetzen keine ärztliche Diagnose. Laborwerte müssen immer im klinischen Kontext bewertet werden.
      </p>
    </div>
  )
}
