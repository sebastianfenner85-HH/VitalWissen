import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getWirkstoffBySlug,
  getKrankheitenDetailMap,
  getSupplementeNameMap,
  getLebensmittelByWirkstoffSlug,
} from '../lib/queries'
import './Medikamente.css'


// ── Q2-BUILD-02b: S6 QuellenBox — Typ-Mapping + Komponente ──────────────────
const MED_QUELLEN_TYP = {
  ema:       { farbe: 'regulatory', label: 'Regulatorisch', icon: '🏛️' },
  bfarm:     { farbe: 'regulatory', label: 'Regulatorisch', icon: '🏛️' },
  openfda:   { farbe: 'database',   label: 'Datenbank',     icon: '🗄️' },
  who_atc:   { farbe: 'database',   label: 'Datenbank',     icon: '🗄️' },
  atc:       { farbe: 'database',   label: 'Datenbank',     icon: '🗄️' },
  guideline: { farbe: 'guideline',  label: 'Leitlinie',     icon: '📋' },
  regulatory:{ farbe: 'regulatory', label: 'Regulatorisch', icon: '🏛️' },
  database:  { farbe: 'database',   label: 'Datenbank',     icon: '🗄️' },
  research:    { farbe: 'research',    label: 'Forschung',          icon: '🔬' },
  patient_info:{ farbe: 'patient_info', label: 'Patienteninformation', icon: '📖' },
}

function getMedTypInfo(typ) {
  if (!typ) return { farbe: 'database', label: 'Datenbank', icon: '📄' }
  return MED_QUELLEN_TYP[typ.toLowerCase()] || { farbe: 'database', label: typ, icon: '📄' }
}

function MedQuellenBox({ quellen }) {
  const [showAll, setShowAll] = useState(false)
  if (!quellen || quellen.length === 0) return null
  const sichtbar = showAll ? quellen : quellen.slice(0, 2)
  const restAnzahl = quellen.length - 2
  return (
    <div className="med-quellenbox">
      {sichtbar.map((q, i) => {
        const info = getMedTypInfo(q.typ)
        return (
          <div key={i} className="med-quellenbox-row">
            <span className={`med-quellenbox-typchip med-quellenbox-typchip--${info.farbe}`}>
              {info.icon} {info.label}
            </span>
            <div className="med-quellenbox-main">
              {q.url ? (
                <a
                  href={q.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="med-quellenbox-link"
                >
                  {q.name}
                </a>
              ) : (
                <span className="med-quellenbox-name">{q.name}</span>
              )}
              {q.beschreibung && (
                <p className="med-quellenbox-desc">{q.beschreibung}</p>
              )}
            </div>
          </div>
        )
      })}
      {!showAll && restAnzahl > 0 && (
        <button className="med-quellenbox-more" onClick={() => setShowAll(true)}>
          + {restAnzahl} weitere anzeigen
        </button>
      )}
    </div>
  )
}

export default function MedikamentDetail() {
  const { slug } = useParams()
  const navigate  = useNavigate()

  const [w, setW]                         = useState(null)
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(null)
  const [krankheitMap, setKrankheitMap]   = useState({})
  const [suppNamen, setSuppNamen]         = useState({})
  const [lmHinweise, setLmHinweise]       = useState([])

  useEffect(() => {
    async function load() {
      try {
        const data = await getWirkstoffBySlug(slug)
        setW(data)

        // Cross-Link-Maps parallel laden — Fehler dürfen Cross-Blocks nicht brechen
        const [kwMap, snMap, lmData] = await Promise.all([
          getKrankheitenDetailMap(data?.verwandte_krankheiten || []).catch(() => ({})),
          getSupplementeNameMap(data?.verwandte_supplements || []).catch(() => ({})),
          getLebensmittelByWirkstoffSlug(slug).catch(() => []),
        ])
        setKrankheitMap(kwMap)
        setSuppNamen(snMap)
        setLmHinweise(lmData)
      } catch (err) {
        console.error(err)
        setError('Wirkstoff nicht gefunden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="med-detail-page">
        <div className="med-loading">Wird geladen…</div>
      </div>
    )
  }

  if (error || !w) {
    return (
      <div className="med-detail-page">
        <div className="med-error">
          <p>{error || 'Wirkstoff nicht gefunden.'}</p>
          <button className="med-back-btn" onClick={() => navigate('/medikamente')}>
            ← Zurück zur Übersicht
          </button>
        </div>
      </div>
    )
  }

  // Felder auslesen (mit sicheren Defaults)
  const einnahme             = w.einnahme || {}
  const nw                   = w.nebenwirkungen || {}
  const suppInteraktionen    = Array.isArray(w.supp_interaktionen) ? w.supp_interaktionen : []
  const kontraindikationen   = w.kontraindikationen || []
  const generika             = w.generika_alternativen || []
  const quellen              = w.quellen || []
  const indikationen         = w.indikationen || []

  // Cross-Link-Listen: nur DB-verifizierte Refs anzeigen
  const valKrankheiten = (w.verwandte_krankheiten || []).filter(code => krankheitMap[code])
  const valSupps       = (w.verwandte_supplements || []).filter(s => suppNamen[s])

  return (
    <div className="med-detail-page">

      {/* Zurück-Link */}
      <button className="med-back-btn" onClick={() => navigate('/medikamente')}>
        ← Alle Wirkstoffe
      </button>

      {/* ── Hero / Titel ─────────────────────────────────────────────────── */}
      <div className="med-detail-hero">
        <div className="med-detail-hero-top">
          <h1 className="med-detail-name">{w.name_de}</h1>
          <div className="med-detail-badges">
            {w.otc_status && <span className="med-badge med-badge-otc">Rezeptfrei (OTC)</span>}
            {!w.otc_status && <span className="med-badge med-badge-rx">Verschreibungspflichtig</span>}
          </div>
        </div>
        <div className="med-detail-meta">
          <span className="med-detail-klasse">{w.wirkstoffklasse}</span>
          {w.atc_code && <span className="med-detail-atc">ATC: {w.atc_code}</span>}
          {w.zulassung_eu_status && (
            <span className="med-detail-status">EU: {w.zulassung_eu_status}</span>
          )}
        </div>
        {indikationen.length > 0 && (
          <div className="med-detail-indikationen">
            {indikationen.map((ind, i) => (
              <span key={i} className="med-indikation-chip">{ind}</span>
            ))}
          </div>
        )}
      </div>

      <div className="med-detail-body container">

        {/* ── Block 1: Was ist das ───────────────────────────────────────── */}
        {w.was_ist_das && (
          <div className="med-section">
            <h2 className="med-section-title">Was ist das?</h2>
            <p className="med-section-text">{w.was_ist_das}</p>
          </div>
        )}

        {/* ── Block 2: Einnahme ──────────────────────────────────────────── */}
        {(einnahme.allgemein || einnahme.timing || einnahme.besonderheiten) && (
          <div className="med-section">
            <h2 className="med-section-title">Einnahme</h2>
            {einnahme.allgemein && (
              <p className="med-section-text">{einnahme.allgemein}</p>
            )}
            {einnahme.timing && (
              <div className="med-einnahme-item">
                <strong>Zeitpunkt:</strong> {einnahme.timing}
              </div>
            )}
            {einnahme.besonderheiten && (
              <div className="med-einnahme-item">
                <strong>Besonderheiten:</strong> {einnahme.besonderheiten}
              </div>
            )}
            <div className="med-einnahme-hinweis">
              Zur genauen Dosierung bitte Arzt oder Apotheke befragen.
            </div>
          </div>
        )}

        {/* ── Block 3: Nebenwirkungen ────────────────────────────────────── */}
        {(nw.haeufig?.length > 0 || nw.gelegentlich?.length > 0 || nw.selten?.length > 0) && (
          <div className="med-section">
            <h2 className="med-section-title">Nebenwirkungen</h2>
            <p className="med-section-subtext">
              Angaben laut Fachinformation. Nebenwirkungen treten nicht bei allen Personen auf.
            </p>

            {nw.haeufig?.length > 0 && (
              <div className="med-nw-gruppe">
                <span className="med-nw-label med-nw-haeufig">Häufig</span>
                <span className="med-nw-freq">(betrifft ≥1 von 100 Personen)</span>
                <ul className="med-nw-list">
                  {nw.haeufig.map((nwItem, i) => (
                    <li key={i}>{nwItem}</li>
                  ))}
                </ul>
              </div>
            )}

            {nw.gelegentlich?.length > 0 && (
              <div className="med-nw-gruppe">
                <span className="med-nw-label med-nw-gelegentlich">Gelegentlich</span>
                <span className="med-nw-freq">(betrifft 1–10 von 1.000 Personen)</span>
                <ul className="med-nw-list">
                  {nw.gelegentlich.map((nwItem, i) => (
                    <li key={i}>{nwItem}</li>
                  ))}
                </ul>
              </div>
            )}

            {nw.selten?.length > 0 && (
              <div className="med-nw-gruppe">
                <span className="med-nw-label med-nw-selten">Selten</span>
                <span className="med-nw-freq">(betrifft weniger als 1 von 1.000 Personen)</span>
                <ul className="med-nw-list">
                  {nw.selten.map((nwItem, i) => (
                    <li key={i}>{nwItem}</li>
                  ))}
                </ul>
              </div>
            )}

            {kontraindikationen.length > 0 && (
              <div className="med-nw-kontra">
                <strong>Nicht einnehmen bei:</strong>
                <ul className="med-nw-list">
                  {kontraindikationen.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── Block 4: Wechselwirkungen ──────────────────────────────────── */}
        <div className="med-section">
          <h2 className="med-section-title">Wechselwirkungen</h2>

          {/* Interaktions-Disclaimer — Pflichtblock gemäß S6-SPEC §3f */}
          <div className="med-interaktion-disclaimer">
            <strong>⚠️ Diese Wechselwirkungshinweise sind nicht abschließend.</strong>
            <br />
            Die folgenden Hinweise basieren auf verfügbaren Fachinformationen.
            Eine vollständige Prüfung aller möglichen Wechselwirkungen — insbesondere bei
            mehreren gleichzeitig eingenommenen Medikamenten — ist nur durch Arzt oder Apotheke möglich.
          </div>

          {/* Supplement-Wechselwirkungen (statisch, Slice 1) */}
          {suppInteraktionen.length > 0 && (
            <div className="med-interaktion-gruppe">
              <p className="med-interaktion-typ">Mit Nahrungsergänzungsmitteln:</p>
              {suppInteraktionen.map((si, i) => (
                <div key={i} className="med-interaktion-item">
                  <span className="med-interaktion-partner">{si.supplement}</span>
                  <span className="med-interaktion-hinweis">{si.hinweis}</span>
                  {si.quelle && (
                    <span className="med-interaktion-quelle">Quelle: {si.quelle}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Med-Med-Hinweis (generisch, Slice 1) */}
          <div className="med-interaktion-med-hinweis">
            <strong>Medikament-Medikament-Wechselwirkungen:</strong>{' '}
            {w.med_interaktionen_hinweis ||
              'Bei gleichzeitiger Einnahme mehrerer Medikamente bitte Apotheke oder Arzt befragen.'}
          </div>
        </div>

        {/* ── Block 5: Generika / Alternativen ──────────────────────────── */}
        {generika.length > 0 && (
          <div className="med-section">
            <h2 className="med-section-title">Generika und wirkstoffgleiche Alternativen</h2>
            <p className="med-section-subtext">
              Alle aufgeführten Präparate enthalten denselben Wirkstoff ({w.name_de}).
              Apotheke berät zu verfügbaren Produkten.
            </p>
            <div className="med-generika-liste">
              {generika.map((g, i) => (
                <span key={i} className="med-generika-chip">{g}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── Block 6: Zulassung / Quellen ──────────────────────────────── */}
        <div className="med-section">
          <h2 className="med-section-title">Zulassung und Quellen</h2>
          <div className="med-zulassung-info">
            <div className="med-zulassung-item">
              <span className="med-zulassung-label">Status in Deutschland:</span>
              <span className="med-zulassung-wert">{w.zulassung_de}</span>
            </div>
            {w.zulassung_eu_status && (
              <div className="med-zulassung-item">
                <span className="med-zulassung-label">EU-Zulassungsstatus:</span>
                <span className="med-zulassung-wert">{w.zulassung_eu_status}</span>
              </div>
            )}
            {w.daten_stand && (
              <div className="med-zulassung-item">
                <span className="med-zulassung-label">Informationsstand:</span>
                <span className="med-zulassung-wert">
                  {new Date(w.daten_stand).toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
                </span>
              </div>
            )}
          </div>

          <MedQuellenBox quellen={quellen} />
        </div>

        {/* ── Cross-Block: Zugehörige Krankheiten (S6 → S5) ─────────────── */}
        {valKrankheiten.length > 0 && (
          <div className="med-section">
            <h2 className="med-section-title">Bei diesen Erkrankungen eingesetzt</h2>
            <div className="med-crosslink-grid">
              {valKrankheiten.map(code => (
                <button
                  key={code}
                  className="med-crosslink-chip"
                  onClick={() => navigate(`/krankheiten/${krankheitMap[code].slug}`)}
                >
                  🏥 {krankheitMap[code].name_de}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Cross-Block: Supplement-Interaktionen (S6 → S2) ───────────── */}
        {valSupps.length > 0 && (
          <div className="med-section">
            <h2 className="med-section-title">Supplement-Interaktionen</h2>
            <p className="med-section-subtext">
              Supplements, mit denen Wechselwirkungen bekannt sind:
            </p>
            <div className="med-crosslink-grid">
              {valSupps.map(s => (
                <button
                  key={s}
                  className="med-crosslink-chip"
                  onClick={() => navigate(`/supplements/${s}`)}
                >
                  💊 {suppNamen[s]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Cross-Block: Lebensmittel mit Hinweisen (S6 → K8b, S6-06) ── */}
        {lmHinweise.length > 0 && (
          <div className="med-section">
            <h2 className="med-section-title">Lebensmittel mit Hinweisen</h2>
            <p className="med-section-subtext">
              Zu folgenden Lebensmitteln gibt es dokumentierte Hinweise bei Einnahme dieses
              Wirkstoffs. Diese Angaben sind nicht abschließend — bitte Apotheke befragen.
            </p>
            <div className="med-crosslink-grid">
              {lmHinweise.map(lm => (
                <button
                  key={lm.slug}
                  className="med-crosslink-chip med-crosslink-chip--lm"
                  onClick={() => navigate(`/ernaehrung/lebensmittel/${lm.slug}`)}
                >
                  🥗 {lm.name_de}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer-Disclaimer (Pflichtblock gemäß S6-SPEC §3c + §3e) ──── */}
        <div className="med-footer-disclaimer">
          <strong>Hinweis zur Nutzung dieser Information</strong>
          <p>
            Die Angaben auf dieser Seite stammen aus offiziellen Zulassungsdokumenten
            (EMA, BfArM) und dienen ausschließlich der allgemeinen Information.
            Sie ersetzen keine individuelle Beratung durch Arzt oder Apotheke.
          </p>
          <p>
            <strong>Wechselwirkungen und Nebenwirkungen</strong> sind individuell verschieden.
            Die hier genannten Hinweise sind nicht vollständig und berücksichtigen keine
            persönlichen Vorerkrankungen, weitere Medikamente oder Lebensumstände.
          </p>
          <p>
            <strong>Bei Fragen zu Ihrem Medikament:</strong> Apotheke oder Arzt fragen. &nbsp;
            <strong>Bei unerwünschten Symptomen:</strong> Arzt aufsuchen oder ärztliche
            Rufnummer <a href="tel:116117">116 117</a> anrufen.
          </p>
          {w.daten_stand && (
            <p className="med-footer-stand">
              Informationsstand:{' '}
              {new Date(w.daten_stand).toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })} —
              Zulassungsinformationen können sich ändern.
            </p>
          )}
        </div>

      </div>
    </div>
  )
}
