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
  const ref = {
    de: {
      min: lw.referenz_de_min,
      max: lw.referenz_de_max,
      einheit: lw.referenz_de_einheit,
      quelle: lw.referenz_de_quelle,
    },
    usa: {
      min: lw.referenz_usa_min,
      max: lw.referenz_usa_max,
      einheit: lw.referenz_usa_einheit,
      quelle: lw.referenz_usa_quelle,
    },
    jp: {
      min: lw.referenz_jp_min,
      max: lw.referenz_jp_max,
      einheit: lw.referenz_jp_einheit,
      quelle: lw.referenz_jp_quelle,
    },
  }

  const aktivRef = zeigeKinder && lw.referenz_kinder
    ? lw.referenz_kinder
    : ref[aktiveLeitlinie]

  const genderCtx = lw.gender_context || {}
  const medEinfluss = lw.medikamenten_einfluss || []
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
        <h1>{lw.name}</h1>
        {lw.loinc_code && (
          <span className="laborwert-loinc">LOINC {lw.loinc_code}</span>
        )}
        {lw.kategorie && <span className="laborwert-kategorie-badge">{lw.kategorie}</span>}
      </div>

      {lw.beschreibung && (
        <p className="laborwert-beschreibung">{lw.beschreibung}</p>
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
            <div className="laborwert-referenz-wert">
              <span className="laborwert-referenz-label">Referenzbereich</span>
              <span className="laborwert-referenz-value">
                {aktivRef.min !== undefined && aktivRef.max !== undefined
                  ? `${aktivRef.min} – ${aktivRef.max}`
                  : aktivRef.min !== undefined
                  ? `> ${aktivRef.min}`
                  : aktivRef.max !== undefined
                  ? `< ${aktivRef.max}`
                  : '—'}
                {aktivRef.einheit && ` ${aktivRef.einheit}`}
              </span>
            </div>
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
        {lw.supplement_bezug && lw.supplement_bezug.length > 0 ? (
          <div className="laborwert-cross-items">
            {lw.supplement_bezug.map((s, i) => (
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
