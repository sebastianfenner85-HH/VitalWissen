import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLaborwertByCode } from '../lib/queries'
import './Laborwerte.css'

// S1-BUILD-01: JP-Gating — JSCC-Daten noch nicht regulär exponiert.
// JP-Karte wird nur gerendert wenn ref_jp_min oder ref_jp_max für diesen Eintrag vorhanden.
// Sobald JSCC-Befüllung ≥40/60 Einträge erreicht (S1-BUILD-02+), kann dieses Gate entfallen.
const LEITLINIEN = [
  { key: 'de',  label: '🇩🇪 DE',    quelle: 'DGKL' },
  { key: 'usa', label: '🇺🇸 USA',   quelle: 'AACC' },
  { key: 'jp',  label: '🇯🇵 Japan', quelle: 'JSCC' },
]

function formatRef(min, max, einheit) {
  if (min != null && max != null) return `${min} – ${max} ${einheit ?? ''}`
  if (max != null) return `< ${max} ${einheit ?? ''}`
  if (min != null) return `> ${min} ${einheit ?? ''}`
  return '—'
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
    },
    usa: { min: lw.ref_usa_min, max: lw.ref_usa_max, einheit: lw.ref_usa_einheit, quelle: lw.ref_usa_quelle },
    jp:  { min: lw.ref_jp_min,  max: lw.ref_jp_max,  einheit: lw.ref_jp_einheit,  quelle: lw.ref_jp_quelle  },
  }

  // Defensive Array-Guards für alle JSONB-Felder
  const supplementEinfluss = Array.isArray(lw.supplement_einfluss) ? lw.supplement_einfluss : []
  const medEinfluss        = Array.isArray(lw.medikament_einfluss) ? lw.medikament_einfluss : []
  const ursachenHoch       = Array.isArray(lw.ursachen_hoch)    ? lw.ursachen_hoch    : (lw.ursachen_hoch    ? [lw.ursachen_hoch]    : [])
  const ursachenNiedrig    = Array.isArray(lw.ursachen_niedrig) ? lw.ursachen_niedrig : (lw.ursachen_niedrig ? [lw.ursachen_niedrig] : [])

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
           JP-Gate (S1-BUILD-01): JP-Karte nur rendern wenn Datenbasis vorhanden.
           DE + USA: zeigen "—" wenn leer (akzeptabel, reguläre Abdeckung erwartet).
           JP: nicht als Leerfeld exponieren — JSCC-Befüllung noch offen. */}
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
      </div>

      {/* [5] Ursachen — nur bei Daten */}
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

      {/* [6] Wann zum Arzt — nur bei Daten */}
      {lw.wann_arzt && (
        <div className="detail-section">
          <p className="detail-section-title">Wann zum Arzt?</p>
          <div className="wann-arzt-box">{lw.wann_arzt}</div>
        </div>
      )}

      {/* [7] S5-Cross-Block "Relevante Erkrankungen" — Spec-Gate offen (Kuratierungsregel).
           Implementierung in S1-BUILD-02. Hier bewusst ausgelassen. */}

      {/* [8] S2-Cross-Block "Supplement-Einfluss" — nur bei Daten.
           S1-BUILD-01: Fallback-Text entfernt. Block wird ausgeblendet wenn leer.
           Chips sind aktuell Text-only (kein Slug-Link). Verlinkung folgt in S1-BUILD-02
           nach supplement_einfluss-Slug-Migration. */}
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

      {/* [9] S6-Cross-Block "Medikamenten-Einfluss" — nur bei Daten + S6 live.
           S1-BUILD-01: Fallback-Text entfernt. Block wird ausgeblendet wenn leer.
           S6 ist aktuell nicht live → Block bleibt für alle Einträge unsichtbar.
           Aktivierung erfolgt in S1-BUILD-02 nach S6-Build + medikament_einfluss-Slug-Migration. */}
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

      {/* [10] Disclaimer — immer letzter Block */}
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 32, textAlign: 'center' }}>
        Diese Informationen ersetzen keine ärztliche Diagnose. Laborwerte müssen immer im klinischen Kontext bewertet werden.
      </p>
    </div>
  )
}
