import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLaborwertByCode } from '../lib/queries'
import { LABORWERT_K3_MAP } from '../lib/laborwert_k3_map'
import { LABORWERT_B4_ACTIONS_MAP } from '../lib/laborwert_b4_actions_map'
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
function ZielwertBlock({ zielwerte, loincCode }) {
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

      {loincCode === '2089-1' && (
        <div className="lw-zt-hinweis">
          <span className="lw-zt-hinweis-icon">📌</span>
          <span>
            LDL sollte möglichst niedrig sein. Welche Zielwerte gelten, hängt vom individuellen Herz-Kreislauf-Risiko ab — und wird ärztlich festgelegt. Die Werte unten gelten für unterschiedliche Risikogruppen (ESC/EAS-Leitlinien 2021).
          </span>
        </div>
      )}
      {loincCode === '2089-1' && (
        <p className="lw-zt-ldl-risk-note">
          Bei bestehendem Herz-Kreislauf-Risiko oder Vorerkrankungen gelten deutlich niedrigere Zielwerte (&lt;70 mg/dL oder &lt;55 mg/dL).
        </p>
      )}

      {zt12.map((z, i) => renderItem(z, `zt12-${i}`))}

      {loincCode === '2089-1' && zt12.length > 0 && (
        <p className="lw-zt-ldl-normalrisiko-note">
          Dieser Wert gilt nur für Personen mit niedrigem Risiko und ist kein allgemeiner Optimalwert.
        </p>
      )}

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

const B4_KATEGORIE = {
  standard:          { label: 'Gesprächspunkt',      cssKey: 'standard' },
  supporting:        { label: 'Ergänzend',            cssKey: 'supporting' },
  lifestyle:         { label: 'Lebensstil',           cssKey: 'lifestyle' },
  supportive:        { label: 'Unterstützend',        cssKey: 'supportive' },
  promising:         { label: 'Vielversprechend',     cssKey: 'promising' },
  experimental:      { label: 'Experimentell',        cssKey: 'experimental' },
  avoid:             { label: 'Eher vermeiden',       cssKey: 'avoid' },
  monitoring:        { label: 'Monitoring',           cssKey: 'monitoring' },
  doctor_discussion: { label: 'Gespräch vorbereiten', cssKey: 'doctor' },
}

const B4_EVIDENCE_MATURITY = {
  established:  'Etabliert',
  supported:    'Gut untersucht',
  promising:    'Vielversprechend',
  uncertain:    'Unsicher',
  experimental: 'Experimentell',
  avoid:        'Eher vermeiden',
}

// [12b] Was kann ich konkret tun? — Komponente (S8-BUILD-03, erweitert B4-BUILD-02)
function B4ActionsBlock({ loincCode, slug }) {
  const data =
    (loincCode && LABORWERT_B4_ACTIONS_MAP[loincCode]) ||
    (slug && LABORWERT_B4_ACTIONS_MAP[slug]) ||
    null
  if (!data) return null

  const { title, intro, high = [], low = [] } = data
  if (high.length === 0 && low.length === 0) return null

  const renderKarte = (karte, idx) => {
    const measureCat = karte.measureCategory || karte.category || 'supporting'
    const kat = B4_KATEGORIE[measureCat] ?? B4_KATEGORIE.supporting
    const actionText = karte.whatCouldHelp || karte.whatHelps
    const effectText = karte.expectedBenefit || karte.expectedEffect
    const cautionsText = karte.risksAndCautions || karte.cautions
    const evidenceLabel = karte.evidenceMaturity
      ? B4_EVIDENCE_MATURITY[karte.evidenceMaturity]
      : null
    const isAvoid = measureCat === 'avoid'
    const isHighSafety = karte.safetyLevel === 'high'
    const needsDoctor = karte.requiresDoctorDiscussion === true

    return (
      <div key={idx} className={`lw-b4a-karte${isAvoid ? ' lw-b4a-karte--avoid' : ''}`}>
        <div className="lw-b4a-karte-kopf">
          <span className={`lw-b4a-badge lw-b4a-badge--${kat.cssKey}`}>{kat.label}</span>
          {evidenceLabel && (
            <span className="lw-b4a-badge lw-b4a-badge--evidence">{evidenceLabel}</span>
          )}
          <span className="lw-b4a-karte-titel">{karte.title}</span>
        </div>
        {karte.whyShown && (
          <p className="lw-b4a-kontext">{karte.whyShown}</p>
        )}
        {karte.targetGroup && (
          <p className="lw-b4a-zielgruppe">Relevant für: {karte.targetGroup}</p>
        )}
        {isHighSafety && (
          <div className="lw-b4a-warn-block">
            <span>⚠️</span>
            <span>Ärztliche Rücksprache vor jeder Entscheidung notwendig.</span>
          </div>
        )}
        {actionText && !isAvoid && (
          <div className="lw-b4a-action">
            <span className="lw-b4a-action-label">Was besprechen?</span>
            <p className="lw-b4a-action-text">{actionText}</p>
          </div>
        )}
        {isAvoid && actionText && (
          <p className="lw-b4a-avoid-text">{actionText}</p>
        )}
        {effectText && (
          <p className="lw-b4a-effekt">{effectText}</p>
        )}
        {karte.uncertaintyReason && (
          <div className="lw-b4a-uncertainty">
            <span className="lw-b4a-uncertainty-label">Evidenzlücke: </span>
            <span>{karte.uncertaintyReason}</span>
          </div>
        )}
        {cautionsText && (
          <div className="lw-b4a-caution">
            <span className="lw-b4a-caution-icon">ⓘ</span>
            <span>{cautionsText}</span>
          </div>
        )}
        {karte.contraindicationsOrRedFlags && (
          <div className="lw-b4a-contraindication">
            <span>⚠</span>
            <span>{karte.contraindicationsOrRedFlags}</span>
          </div>
        )}
        {karte.notToConfuseWith && (
          <div className="lw-b4a-abgrenzung">
            <span className="lw-b4a-abgrenzung-label">Nicht verwechseln: </span>
            <span>{karte.notToConfuseWith}</span>
          </div>
        )}
        {karte.monitoring && (
          <div className="lw-b4a-monitoring">
            <span className="lw-b4a-monitoring-label">Monitoring:</span>
            <span className="lw-b4a-monitoring-text"> {karte.monitoring}</span>
          </div>
        )}
        {karte.doctorDiscussion && (
          <div className="lw-b4a-doktor">
            <span className="lw-b4a-doktor-label">Gesprächsfragen: </span>
            <span>{karte.doctorDiscussion}</span>
          </div>
        )}
        {needsDoctor && !isHighSafety && (
          <div className="lw-b4a-arzt-callout">Ärztliche Rücksprache empfohlen</div>
        )}
        <p className="lw-b4a-evidenz">
          {evidenceLabel ? `${evidenceLabel} · ` : ''}
          {karte.sourceRequirement || karte.evidence || ''}
        </p>
      </div>
    )
  }

  return (
    <div className="detail-section lw-b4a-block">
      <p className="detail-section-title">{title}</p>
      <div className="lw-b4a-hinweis">
        <span className="lw-b4a-hinweis-icon">💬</span>
        <span>{intro}</span>
      </div>
      {high.length > 0 && (
        <div className="lw-b4a-gruppe">
          <p className="lw-b4a-gruppe-titel">↑ Bei erhöhtem Wert</p>
          {high.map(renderKarte)}
        </div>
      )}
      {low.length > 0 && (
        <div className="lw-b4a-gruppe">
          <p className="lw-b4a-gruppe-titel">↓ Bei erniedrigtem Wert</p>
          {low.map(renderKarte)}
        </div>
      )}
      <p className="lw-b4a-footer">
        Diese Hinweise sind keine Therapieempfehlung und ersetzen keine ärztliche Beratung.
        Entscheidungen über diagnostische und therapeutische Maßnahmen liegen bei Ihrer Ärztin oder Ihrem Arzt.
      </p>
    </div>
  )
}

// [4b] Q2-BUILD-02d: LwQuellenBox
function LwQuellenBox({ quellen }) {
  const [showAll, setShowAll] = useState(false)

  if (!quellen || quellen.length === 0) return null
  const filtered = quellen.filter(q => q.quelle_url)
  if (filtered.length === 0) return null

  const visible = showAll ? filtered : filtered.slice(0, 2)
  const hiddenCount = filtered.length - 2

  return (
    <div className="lw-quellenbox">
      <span className="lw-quellenbox-label">Quellen Referenzbereiche:</span>
      <p className="lw-quellenbox-caveat">
        Quellenbasis für Referenzbereiche und Einordnung. Die Links führen zu den Fachgesellschaften — noch nicht wertspezifisch vertieft.
      </p>
      <div className="lw-quellenbox-rows">
        {visible.map(q => (
          <div key={q.key} className="lw-quellenbox-row">
            <span className="lw-quelle-typ-chip lw-quelle-typ-database">Fachquelle</span>
            <span className="lw-quellenbox-region">{q.label}</span>
            <a
              href={q.quelle_url}
              target="_blank"
              rel="noopener noreferrer"
              className="lw-quellenbox-link"
            >
              {q.quelle || q.label}
            </a>
          </div>
        ))}
      </div>
      {!showAll && hiddenCount > 0 && (
        <button className="lw-quellenbox-more" onClick={() => setShowAll(true)}>
          + {hiddenCount} weitere anzeigen
        </button>
      )}
    </div>
  )
}

// [3b] TRUST_ENTRY_LAYER_01: Datenstand / Quellbasis
// Leitet Quellinfos aus vorhandenen DB-Feldern ab. Kein DB-Write, kein Schema-Change.
// Zeigt "Datenstand" nur wenn letzte_aktualisierung gesetzt. Andernfalls Quellbasis.
// Rendert nichts wenn weder Datum noch Quellen vorhanden.
function LwTrustMeta({ lw }) {
  const formatDatum = (iso) => {
    try {
      const parts = iso.split('-')
      const year  = parts[0]
      const month = parseInt(parts[1], 10)
      const monate = ['Januar','Februar','März','April','Mai','Juni',
                      'Juli','August','September','Oktober','November','Dezember']
      return `${monate[month - 1]} ${year}`
    } catch { return iso }
  }

  const quellen = []
  if (lw.ref_de_quelle)  quellen.push(lw.ref_de_quelle)
  if (lw.ref_usa_quelle) quellen.push(lw.ref_usa_quelle)

  const hatDatum  = !!lw.letzte_aktualisierung
  const hatQuelle = quellen.length > 0

  if (!hatDatum && !hatQuelle) return null

  return (
    <div className="lw-trust-meta">
      {hatDatum && (
        <span className="lw-trust-meta-item">
          Datenstand: {formatDatum(lw.letzte_aktualisierung)}
        </span>
      )}
      {hatDatum && hatQuelle && (
        <span className="lw-trust-meta-sep" aria-hidden="true">·</span>
      )}
      {hatQuelle && (
        <span className="lw-trust-meta-item">
          Referenzbasis: {quellen.join(' · ')}
        </span>
      )}
    </div>
  )
}

// [0] UX_VISIBLE_PROGRESS_01: Abschnitt-Schnellnavigation
// Nur Abschnitte mit tatsächlich vorhandenen Daten. Kein medizinischer Inhalt.
function LwSectionNav({ sections }) {
  if (!sections || sections.length === 0) return null
  const scroll = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <nav className="lw-section-nav" aria-label="Abschnitte">
      <span className="lw-section-nav-label">Abschnitte:</span>
      <div className="lw-section-nav-chips">
        {sections.map(s => (
          <button key={s.id} className="lw-section-nav-chip" onClick={() => scroll(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
    </nav>
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
    return <div className="lw-state-center">Wird geladen…</div>
  }

  if (error || !lw) {
    return (
      <div className="lw-state-center">
        <p className="lw-error-msg">{error || 'Laborwert nicht gefunden.'}</p>
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

  const supplementEinfluss = Array.isArray(lw.supplement_einfluss) ? lw.supplement_einfluss : []
  const medEinfluss        = Array.isArray(lw.medikament_einfluss) ? lw.medikament_einfluss : []
  const ursachenHoch       = Array.isArray(lw.ursachen_hoch)    ? lw.ursachen_hoch    : (lw.ursachen_hoch    ? [lw.ursachen_hoch]    : [])
  const ursachenNiedrig    = Array.isArray(lw.ursachen_niedrig) ? lw.ursachen_niedrig : (lw.ursachen_niedrig ? [lw.ursachen_niedrig] : [])
  const zielwerte          = Array.isArray(lw.zielwerte) ? lw.zielwerte : []

  const quellenKontext = LEITLINIEN
    .map(l => ({ ...l, ...ref[l.key] }))
    .filter(l => l.quelle_url)

  // UX_VISIBLE_PROGRESS_01: Abschnitte — nur bei vorhandenen Daten
  const hasK3      = !!(LABORWERT_K3_MAP[lw.loinc_code] || LABORWERT_K3_MAP[lw.slug])
  const hasB4      = !!(LABORWERT_B4_ACTIONS_MAP[lw.loinc_code] || LABORWERT_B4_ACTIONS_MAP[lw.slug])
  const hasUrsa    = ursachenHoch.length > 0 || ursachenNiedrig.length > 0
  const hasSuppMed = supplementEinfluss.length > 0 || medEinfluss.length > 0

  const sections = [
    { id: 'sec-referenz',   label: 'Referenzwerte' },
    ...(zielwerte.length > 0 ? [{ id: 'sec-zielwerte',   label: 'Zielwerte' }]       : []),
    ...(hasK3               ? [{ id: 'sec-einordnung',  label: 'Einordnung' }]        : []),
    ...(hasB4               ? [{ id: 'sec-massnahmen',  label: 'Maßnahmen' }]         : []),
    ...(hasUrsa             ? [{ id: 'sec-ursachen',    label: 'Ursachen' }]          : []),
    ...(lw.wann_arzt        ? [{ id: 'sec-arzt',        label: 'Arzt aufsuchen' }]    : []),
    ...(hasSuppMed          ? [{ id: 'sec-einfluss',    label: 'Einflussfaktoren' }]  : []),
  ]

  return (
    <div className="lw-detail">
      <button className="lw-detail-back" onClick={() => navigate('/laborwerte')}>
        ← Alle Laborwerte
      </button>

      {/* [1] Notfall-Banner */}
      {lw.notfall_flag && (
        <div className="notfall-banner">
          <strong>⚠ Notfallrelevant:</strong>&nbsp;Bei stark abweichenden Werten sofort ärztliche Hilfe
          suchen. Notfall: <strong>112</strong>
        </div>
      )}

      {/* [2] Header */}
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

      {/* [3] Beschreibung */}
      {lw.beschreibung_laienhaft && (
        <p className="beschreibung-text">{lw.beschreibung_laienhaft}</p>
      )}

      {/* [3b] Datenstand / Quellbasis — TRUST_ENTRY_LAYER_01 */}
      <LwTrustMeta lw={lw} />

      {/* [0] Abschnitt-Schnellnavigation — UX_VISIBLE_PROGRESS_01 */}
      <LwSectionNav sections={sections} />

      {/* [4] Referenzbereiche */}
      <div id="sec-referenz" className="lw-section-anchor detail-section">
        <p className="detail-section-title">Referenzbereiche im Vergleich</p>
        <div className="referenz-grid">
          {LEITLINIEN.map(l => {
            const r = ref[l.key]
            const hatDaten = r.min != null || r.max != null || r.max_m != null || r.max_w != null
            if (l.key === 'jp' && !hatDaten) return null
            return (
              <div key={l.key} className="referenz-item">
                <span className="referenz-flag">{l.label}</span>
                <p className="referenz-quelle">{l.quelle}</p>
                {hatDaten ? (
                  <>
                    {r.geschlechtsspezifisch ? (
                      <>
                        <p className="referenz-wert referenz-wert--geschlecht">
                          ♂ {formatRef(r.min_m, r.max_m, r.einheit)}
                        </p>
                        <p className="referenz-wert referenz-wert--geschlecht referenz-wert--geschlecht-w">
                          ♀ {formatRef(r.min_w, r.max_w, r.einheit)}
                        </p>
                      </>
                    ) : (
                      <p className="referenz-wert">{formatRef(r.min, r.max, r.einheit)}</p>
                    )}
                    {r.quelle && <p className="referenz-einheit">{r.quelle}</p>}
                  </>
                ) : (
                  <p className="referenz-wert referenz-wert--nodata">—</p>
                )}
              </div>
            )
          })}
        </div>
        <LwQuellenBox quellen={quellenKontext} />
      </div>

      {/* [6] Zielwert-Block */}
      {zielwerte.length > 0 && (
        <div id="sec-zielwerte" className="lw-section-anchor">
          <ZielwertBlock zielwerte={zielwerte} loincCode={lw.loinc_code} />
        </div>
      )}

      {/* [12] Einordnung */}
      <div id="sec-einordnung" className="lw-section-anchor">
        <EinordnungBlock loincCode={lw.loinc_code} slug={lw.slug} />
      </div>

      {/* [12b] B4 Actions */}
      <div id="sec-massnahmen" className="lw-section-anchor">
        <B4ActionsBlock loincCode={lw.loinc_code} slug={lw.slug} />
      </div>

      {/* [8] Ursachen */}
      {(ursachenHoch.length > 0 || ursachenNiedrig.length > 0) && (
        <div id="sec-ursachen" className="lw-section-anchor detail-section">
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

      {/* [11] Wann zum Arzt */}
      {lw.wann_arzt && (
        <div id="sec-arzt" className="lw-section-anchor detail-section">
          <p className="detail-section-title">Wann zum Arzt?</p>
          <div className="wann-arzt-box">{lw.wann_arzt}</div>
        </div>
      )}

      {/* [9+10] Einflussfaktoren */}
      {(supplementEinfluss.length > 0 || medEinfluss.length > 0) && (
        <div id="sec-einfluss" className="lw-section-anchor">
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
        </div>
      )}

      {/* [13] Disclaimer */}
      <p className="lw-disclaimer">
        Diese Informationen ersetzen keine ärztliche Diagnose. Laborwerte müssen immer im klinischen Kontext bewertet werden.
      </p>
    </div>
  )
}
