import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLaborwertByCode } from '../lib/queries'
import EvidenzAmpel from '../components/EvidenzAmpel'
import './Laborwerte.css'

const LEITLINIEN = [
  { key: 'de', label: 'Deutschland (DGKL)', farbe: '#0B6E4F' },
  { key: 'usa', label: 'USA (AACC)', farbe: '#2563EB' },
  { key: 'jp', label: 'Japan (JSCC)', farbe: '#DC2626' },
]

export default function LaborwertDetail() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [lw, setLw] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [aktiveLeitlinie, setAktiveLeitlinie] = useState('de')
  const [zeigeKinder, setZeigeKinder] = useState(false)

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
      <div className="laborwerte-loading">
        <div className="spinner" />
        <p>Wird geladen…</p>
      </div>
    )
  }

  if (error || !lw) {
    return (
      <div className="laborwerte-error">
        <p>{error || 'Laborwert nicht gefunden.'}</p>
        <button onClick={() => navigate('/laborwerte')}>← Zurück zur Liste</button>
      </div>
    )
  }

  // Referenzbereich aus DB-Spalten je nach gewählter Leitlinie
  // DE hat geschlechtsspezifische Werte (m/w), USA+JP einheitlich
  const ref = {
    de: {
      min_m: lw.ref_de_min_m,
      max_m: lw.ref_de_max_m,
      min_w: lw.ref_de_min_w,
      max_w: lw.ref_de_max_w,
      min: lw.ref_de_min_m ?? lw.ref_de_min_w,
      max: lw.ref_de_max_m ?? lw.ref_de_max_w,
      einheit: lw.ref_de_einheit,
      quelle: lw.ref_de_quelle,
      geschlechtsspezifisch: lw.ref_de_min_m !== lw.ref_de_min_w && lw.ref_de_min_w != null,
    },
    usa: {
      min: lw.ref_usa_min,
      max: lw.ref_usa_max,
      einheit: lw.ref_usa_einheit,
      quelle: lw.ref_usa_quelle,
    },
    jp: {
      min: lw.ref_jp_min,
      max: lw.ref_jp_max,
      einheit: lw.ref_jp_einheit,
      quelle: lw.ref_jp_quelle,
    },
  }

  const aktivRef = zeigeKinder && lw.referenz_kinder
    ? lw.referenz_kinder
    : ref[aktiveLeitlinie]

  const genderCtx = lw.gender_context || {}
  const medEinfluss = lw.medikament_einfluss || []
  const zusammenhaenge = lw.zusammenhaenge || []

  return (
    <div className="laborwert-detail">
      <button className="laborwert-back-btn" onClick={() => navigate('/laborwerte')}>
        ← Alle Laborwerte
      </button>

      {lw.notfall_flag && (
        <div className="laborwert-notfall-banner">
          <strong>⚠ Notfallrelevant:</strong> Bei stark abweichenden Werten sofort ärztliche Hilfe
          suchen. Im Notfall: <strong>112</strong>
        </div>
      )}

      <div className="laborwert-detail-header">
        <h1>{lw.name_de}</h1>
        {lw.vollname_de && lw.vollname_de !== lw.name_de && (
          <p className="laborwert-vollname">{lw.vollname_de}</p>
        )}
        {lw.loinc_code && (
          <span className="laborwert-loinc">LOINC {lw.loinc_code}</span>
        )}
        {(lw.panel || lw.kategorie) && (
          <span className="laborwert-kategorie-badge">{lw.panel || lw.kategorie}</span>
        )}
      </div>

      {lw.beschreibung_laienhaft && (
        <p className="laborwert-beschreibung">{lw.beschreibung_laienhaft}</p>
      )}

      {/* Leitlinien-Regler */}
      <div className="laborwert-leitlinien-block">
        <div className="laborwert-leitlinien-tabs">
          {LEITLINIEN.map(l => (
            <button
              key={l.key}
              className={`laborwert-leitlinie-tab ${aktiveLeitlinie === l.key && !zeigeKinder ? 'active' : ''}`}
              style={aktiveLeitlinie === l.key && !zeigeKinder ? { borderColor: l.farbe, color: l.farbe } : {}}
              onClick={() => { setAktiveLeitlinie(l.key); setZeigeKinder(false) }}
            >
              {l.label}
            </button>
          ))}
          {lw.referenz_kinder && (
            <button
              className={`laborwert-leitlinie-tab ${zeigeKinder ? 'active' : ''}`}
              onClick={() => setZeigeKinder(true)}
            >
              Kinderwerte
            </button>
          )}
        </div>

        {aktivRef && (
          <div className="laborwert-referenz-box">
            {aktivRef.geschlechtsspezifisch ? (
              <div className="laborwert-referenz-gender">
                <div className="laborwert-referenz-wert">
                  <span className="laborwert-referenz-label">♂ Männer</span>
                  <span className="laborwert-referenz-value">
                    {aktivRef.min_m != null && aktivRef.max_m != null
                      ? `${aktivRef.min_m} – ${aktivRef.max_m}`
                      : aktivRef.max_m != null ? `< ${aktivRef.max_m}` : '—'}
                    {aktivRef.einheit && ` ${aktivRef.einheit}`}
                  </span>
                </div>
                <div className="laborwert-referenz-wert">
                  <span className="laborwert-referenz-label">♀ Frauen</span>
                  <span className="laborwert-referenz-value">
                    {aktivRef.min_w != null && aktivRef.max_w != null
                      ? `${aktivRef.min_w} – ${aktivRef.max_w}`
                      : aktivRef.max_w != null ? `< ${aktivRef.max_w}` : '—'}
                    {aktivRef.einheit && ` ${aktivRef.einheit}`}
                  </span>
                </div>
              </div>
            ) : (
              <div className="laborwert-referenz-wert">
                <span className="laborwert-referenz-label">Referenzbereich</span>
                <span className="laborwert-referenz-value">
                  {aktivRef.min != null && aktivRef.max != null
                    ? `${aktivRef.min} – ${aktivRef.max}`
                    : aktivRef.min != null ? `> ${aktivRef.min}`
                    : aktivRef.max != null ? `< ${aktivRef.max}` : '—'}
                  {aktivRef.einheit && ` ${aktivRef.einheit}`}
                </span>
              </div>
            )}
            {aktivRef.quelle && (
              <p className="laborwert-referenz-quelle">Quelle: {aktivRef.quelle}</p>
            )}
          </div>
        )}
      </div>

      {/* Gender-Kontext */}
      {(genderCtx.maennlich || genderCtx.weiblich) && (
        <div className="laborwert-gender-block">
          <h3>Geschlechtsspezifische Besonderheiten</h3>
          <div className="laborwert-gender-grid">
            {genderCtx.maennlich && (
              <div className="laborwert-gender-card">
                <strong>♂ Männer</strong>
                <p>{genderCtx.maennlich}</p>
              </div>
            )}
            {genderCtx.weiblich && (
              <div className="laborwert-gender-card">
                <strong>♀ Frauen</strong>
                <p>{genderCtx.weiblich}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ursachen */}
      {(lw.ursachen_hoch || lw.ursachen_niedrig) && (
        <div className="laborwert-ursachen-block">
          <h3>Mögliche Ursachen</h3>
          <div className="laborwert-ursachen-grid">
            {lw.ursachen_hoch && (
              <div className="laborwert-ursache-card laborwert-ursache-card--hoch">
                <strong>↑ Erhöht</strong>
                <p>{Array.isArray(lw.ursachen_hoch) ? lw.ursachen_hoch.join(', ') : lw.ursachen_hoch}</p>
              </div>
            )}
            {lw.ursachen_niedrig && (
              <div className="laborwert-ursache-card laborwert-ursache-card--niedrig">
                <strong>↓ Erniedrigt</strong>
                <p>{Array.isArray(lw.ursachen_niedrig) ? lw.ursachen_niedrig.join(', ') : lw.ursachen_niedrig}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wann Arzt */}
      {lw.wann_arzt && (
        <div className="laborwert-wann-arzt">
          <h3>Wann zum Arzt?</h3>
          <p>{lw.wann_arzt}</p>
        </div>
      )}

      {/* Zusammenhänge */}
      {zusammenhaenge.length > 0 && (
        <div className="laborwert-zusammenhaenge">
          <h3>Zusammenhänge mit anderen Werten</h3>
          <ul>
            {zusammenhaenge.map((z, i) => (
              <li key={i}>{typeof z === 'string' ? z : z.beschreibung}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Cross-Block: Supplements */}
      <div className="laborwert-cross-block">
        <h3>Supplements, die diesen Wert beeinflussen</h3>
        {lw.supplement_einfluss && lw.supplement_einfluss.length > 0 ? (
          <div className="laborwert-cross-items">
            {lw.supplement_einfluss.map((s, i) => (
              <span key={i} className="laborwert-cross-tag">{s}</span>
            ))}
          </div>
        ) : (
          <p className="laborwert-cross-empty">Daten werden ergänzt.</p>
        )}
      </div>

      {/* Cross-Block: Medikamente */}
      <div className="laborwert-cross-block">
        <h3>Medikamente, die diesen Wert beeinflussen</h3>
        {medEinfluss.length > 0 ? (
          <div className="laborwert-cross-items">
            {medEinfluss.map((m, i) => (
              <span key={i} className="laborwert-cross-tag">
                {typeof m === 'string' ? m : m.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="laborwert-cross-empty">Daten werden ergänzt.</p>
        )}
      </div>

      <div className="laborwert-disclaimer">
        Diese Informationen ersetzen keine ärztliche Diagnose oder Behandlung.
        Laborwerte müssen immer im klinischen Kontext bewertet werden.
      </div>
    </div>
  )
}
