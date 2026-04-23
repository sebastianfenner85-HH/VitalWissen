// S18-Build-05: Zusatzstoff-Kompass (K8d) — Detailseite
// Datum: 23.04.2026
// Blöcke: [1] Was ist das | [2] Technische Funktion | [3] Typische Vorkommen
//          [4] Regulatorische Einordnung | [5] Wissenschaftliche Einordnung
//          [6] Häufige Missverständnisse (konditionell) | [7] Hinweise (konditionell)
//          + Quellen + Disclaimer

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getZusatzstoffBySlug } from '../lib/queries'
import './Ernaehrung.css'

const KATEGORIE_ICON = {
  'Farbstoff':          '🎨',
  'Konservierungsstoff': '🛡️',
  'Antioxidationsmittel': '🔋',
  'Emulgator':          '🌀',
  'Süßungsmittel':      '🍬',
  'Geschmacksverstärker': '✨',
  'Sonstige':           '⚗️',
}

export default function ErnaehrungZusatzstoffDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [zusatzstoff, setZusatzstoff] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getZusatzstoffBySlug(slug)
        setZusatzstoff(data)
      } catch (err) {
        console.error(err)
        setError('Zusatzstoff nicht gefunden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="ern-page">
        <div className="ern-loading">Wird geladen…</div>
      </div>
    )
  }

  if (error || !zusatzstoff) {
    return (
      <div className="ern-page">
        <div className="ern-error">{error || 'Zusatzstoff nicht gefunden.'}</div>
        <button className="ern-zs-back-btn" onClick={() => navigate('/ernaehrung')}>
          ← Zurück zur Übersicht
        </button>
      </div>
    )
  }

  const zs = zusatzstoff
  const reg = zs.regulatorische_einordnung || {}
  const quellen = Array.isArray(zs.quellen) ? zs.quellen : []
  const synonyme = Array.isArray(zs.name_synonyme) ? zs.name_synonyme : []
  const vorkommen = Array.isArray(zs.typische_vorkommen) ? zs.typische_vorkommen : []

  return (
    <div className="ern-page">
      {/* ── Header ── */}
      <div className="ern-zs-header">
        <div className="ern-zs-header-inner">
          <button
            className="ern-zs-back-btn"
            onClick={() => navigate('/ernaehrung')}
          >
            ← Zurück
          </button>
          <div className="ern-zs-badges">
            <span className="ern-zs-e-badge">{zs.e_nummer}</span>
            <span className="ern-zs-kat-badge">
              {KATEGORIE_ICON[zs.oberkategorie] || '⚗️'} {zs.oberkategorie}
            </span>
          </div>
          <h1 className="ern-zs-name">{zs.name_de}</h1>
          {synonyme.length > 0 && (
            <div className="ern-zs-synonyme">
              {synonyme.map((s) => (
                <span key={s} className="ern-zs-synonym-chip">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Inhaltsbereich ── */}
      <div className="ern-zs-section">
        <div className="ern-zs-section-inner">

          {/* Block 1 — Was ist das */}
          <div className="ern-zs-block">
            <h2 className="ern-zs-block-title">Was ist das?</h2>
            <p className="ern-zs-block-text">{zs.funktion_im_lebensmittel}</p>
          </div>

          {/* Block 2 — Typische Vorkommen */}
          {vorkommen.length > 0 && (
            <div className="ern-zs-block">
              <h2 className="ern-zs-block-title">Typische Vorkommen</h2>
              <div className="ern-zs-vorkommen-chips">
                {vorkommen.map((v) => (
                  <span key={v} className="ern-zs-vorkommen-chip">{v}</span>
                ))}
              </div>
            </div>
          )}

          {/* Block 3 — Regulatorische Einordnung */}
          <div className="ern-zs-block">
            <h2 className="ern-zs-block-title">Regulatorische Einordnung</h2>
            <div className="ern-zs-regulierung-grid">
              {reg.eu_status && (
                <div className="ern-zs-regulierung-item">
                  <div className="ern-zs-regulierung-label">EU-Status</div>
                  <div className="ern-zs-regulierung-value">{reg.eu_status}</div>
                </div>
              )}
              {reg.eu_verordnung && (
                <div className="ern-zs-regulierung-item">
                  <div className="ern-zs-regulierung-label">Rechtsgrundlage</div>
                  <div className="ern-zs-regulierung-value">{reg.eu_verordnung}</div>
                </div>
              )}
              {reg.adi_wert && (
                <div className="ern-zs-regulierung-item">
                  <div className="ern-zs-regulierung-label">ADI-Wert</div>
                  <div className="ern-zs-regulierung-value">
                    {reg.adi_wert}
                    {reg.adi_quelle && (
                      <span className="ern-zs-regulierung-source"> ({reg.adi_quelle})</span>
                    )}
                  </div>
                </div>
              )}
              {!reg.adi_wert && (
                <div className="ern-zs-regulierung-item">
                  <div className="ern-zs-regulierung-label">ADI-Wert</div>
                  <div className="ern-zs-regulierung-value">Kein spezifischer ADI festgelegt</div>
                </div>
              )}
              {reg.efsa_letzte_bewertung && (
                <div className="ern-zs-regulierung-item">
                  <div className="ern-zs-regulierung-label">EFSA-Bewertung</div>
                  <div className="ern-zs-regulierung-value">{reg.efsa_letzte_bewertung}</div>
                </div>
              )}
            </div>
          </div>

          {/* Block 4 — Wissenschaftliche Einordnung */}
          <div className="ern-zs-block">
            <h2 className="ern-zs-block-title">Wissenschaftliche Einordnung</h2>
            <p className="ern-zs-block-text">{zs.wissenschaftliche_einordnung}</p>
          </div>

          {/* Block 5 — Häufige Missverständnisse (konditionell) */}
          {zs.haeufige_missverstaendnisse && (
            <div className="ern-zs-block">
              <h2 className="ern-zs-block-title">Häufige Missverständnisse</h2>
              <p className="ern-zs-block-text">{zs.haeufige_missverstaendnisse}</p>
            </div>
          )}

          {/* Block 6 — Hinweise & Vorsicht (konditionell — kein Alarm-Framing) */}
          {zs.hinweise_vorsicht && (
            <div className="ern-zs-hinweis-block">
              <div className="ern-zs-hinweis-icon">ℹ️</div>
              <div>
                <div className="ern-zs-hinweis-title">Hinweis</div>
                <p className="ern-zs-hinweis-text">{zs.hinweise_vorsicht}</p>
              </div>
            </div>
          )}

          {/* Quellen */}
          {quellen.length > 0 && (
            <div className="ern-zs-block ern-zs-quellen-block">
              <h2 className="ern-zs-block-title">Quellen</h2>
              <ul className="ern-zs-quellen-liste">
                {quellen.map((q, i) => (
                  <li key={i} className="ern-zs-quelle">
                    <span className="ern-zs-quelle-org">{q.organisation}:</span>{' '}
                    {q.url ? (
                      <a
                        href={q.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ern-zs-quelle-link"
                      >
                        {q.titel}
                      </a>
                    ) : (
                      <span>{q.titel}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div className="ern-zs-disclaimer">
            <p>
              <strong>Hinweis:</strong> Die Informationen auf dieser Seite dienen der sachlichen
              Einordnung von Lebensmittelzusatzstoffen auf Basis offizieller EU- und EFSA-Quellen.
              Sie ersetzen keine individuelle Ernährungsberatung oder medizinische Einschätzung.
              Regulatorische Zulassung bedeutet nicht, dass ein Stoff für alle Personengruppen
              gleichermaßen geeignet ist. Stand der Angaben: {new Date(zs.letzte_aktualisierung || Date.now()).getFullYear()}.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
