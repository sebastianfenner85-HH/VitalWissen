import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getNaehrstoffBySlug } from '../lib/queries'
import './Ernaehrung.css'

const KATEGORIE_ICON = {
  'Vitamin':        '🧬',
  'Mineralstoff':   '⚗️',
  'Makronährstoff': '🌾',
  'Pflanzenstoff':  '🌿',
}

export default function ErnaehrungNaehrstoffDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [naehrstoff, setNaehrstoff] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getNaehrstoffBySlug(slug)
        setNaehrstoff(data)
      } catch (err) {
        console.error(err)
        setError('Nährstoff konnte nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="ern-naehrstoff-detail-page">
        <div className="ern-loading">Wird geladen…</div>
      </div>
    )
  }

  if (error || !naehrstoff) {
    return (
      <div className="ern-naehrstoff-detail-page">
        <div className="ern-error">{error || 'Nährstoff nicht gefunden.'}</div>
      </div>
    )
  }

  const icon = KATEGORIE_ICON[naehrstoff.kategorie] || '🔬'

  // Crosslink-Daten aus JSONB
  const erkrankungen = naehrstoff.erkrankungs_bezug?.liste ?? []
  const quellenListe = naehrstoff.quellen?.liste ?? []
  const besteQuellenListe = naehrstoff.beste_quellen?.liste ?? []
  const mangelSymptome = naehrstoff.mangel_symptome?.liste ?? []

  return (
    <div className="ern-naehrstoff-detail-page">

      {/* Hero */}
      <div className="ern-naehrstoff-hero">
        <div className="ern-naehrstoff-hero-inner">
          <div className="ern-naehrstoff-nav">
            <button className="ern-detail-back" onClick={() => navigate('/ernaehrung')}>
              ← Ernährungskompass
            </button>
          </div>
          <div className="ern-naehrstoff-label">
            {icon} {naehrstoff.kategorie}
          </div>
          <h1 className="ern-naehrstoff-title">{naehrstoff.name_de}</h1>
          <p className="ern-naehrstoff-intro">{naehrstoff.kurzbeschreibung}</p>
        </div>
      </div>

      {/* Content */}
      <div className="ern-naehrstoff-content">

        {/* [1] Tagesbedarf */}
        {(naehrstoff.tagesbedarf_nih || naehrstoff.tagesbedarf_dge || naehrstoff.tagesbedarf_efsa) && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">📊</span>
              Tagesbedarf
            </h2>
            <div className="ern-naehrstoff-bedarf-grid">
              {naehrstoff.tagesbedarf_nih?.de && (
                <div className="ern-naehrstoff-bedarf-item">
                  <div className="ern-naehrstoff-bedarf-label">NIH (USA)</div>
                  <div className="ern-naehrstoff-bedarf-value">{naehrstoff.tagesbedarf_nih.de}</div>
                </div>
              )}
              {naehrstoff.tagesbedarf_dge?.de && (
                <div className="ern-naehrstoff-bedarf-item">
                  <div className="ern-naehrstoff-bedarf-label">DGE (Deutschland)</div>
                  <div className="ern-naehrstoff-bedarf-value">{naehrstoff.tagesbedarf_dge.de}</div>
                </div>
              )}
              {naehrstoff.tagesbedarf_efsa?.de && (
                <div className="ern-naehrstoff-bedarf-item">
                  <div className="ern-naehrstoff-bedarf-label">EFSA (Europa)</div>
                  <div className="ern-naehrstoff-bedarf-value">{naehrstoff.tagesbedarf_efsa.de}</div>
                </div>
              )}
            </div>
            {naehrstoff.upper_limit?.de && (
              <p className="ern-block-text" style={{marginTop: '12px'}}>
                <strong>Tolerable Upper Intake Level (UL):</strong> {naehrstoff.upper_limit.de}
              </p>
            )}
          </div>
        )}

        {/* [2] Beste Quellen */}
        {besteQuellenListe.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">🥦</span>
              Beste Lebensmittelquellen
            </h2>
            <div className="ern-naehrstoff-quellen-liste">
              {besteQuellenListe.map((q, i) => (
                <span key={i} className="ern-naehrstoff-quelle-tag">{q}</span>
              ))}
            </div>
          </div>
        )}

        {/* [3] Mangel */}
        {mangelSymptome.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">⚠️</span>
              Mangel — Symptome &amp; Risikogruppen
            </h2>
            <ul className="ern-prinzip-list">
              {mangelSymptome.map((s, i) => (
                <li key={i} className="ern-prinzip-item">
                  <span className="ern-prinzip-dot" />
                  {s}
                </li>
              ))}
            </ul>
            {naehrstoff.mangel_risikogruppen && naehrstoff.mangel_risikogruppen.length > 0 && (
              <div style={{marginTop: '14px'}}>
                <p className="ern-block-text" style={{marginBottom: '8px'}}><strong>Risikogruppen:</strong></p>
                <div className="ern-lm-tags">
                  {naehrstoff.mangel_risikogruppen.map((r, i) => (
                    <span key={i} className="ern-lm-tag">{r}</span>
                  ))}
                </div>
              </div>
            )}
            {naehrstoff.mangel_laborwert && (
              <div style={{marginTop: '14px'}}>
                <p className="ern-block-text" style={{marginBottom: '8px'}}><strong>Labortest zur Diagnose:</strong></p>
                <Link
                  to={`/laborwerte/${naehrstoff.mangel_laborwert}`}
                  className="ern-naehrstoff-chip"
                >
                  🔬 Laborwert ansehen →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* [4] Überschuss */}
        {(naehrstoff.ueberschuss_ab || naehrstoff.ueberschuss_hinweis) && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">🚨</span>
              Überschuss &amp; Toxizität
            </h2>
            {naehrstoff.ueberschuss_ab && (
              <p className="ern-block-text" style={{marginBottom: '8px'}}>
                <strong>Risiko ab:</strong> {naehrstoff.ueberschuss_ab}
              </p>
            )}
            {naehrstoff.ueberschuss_hinweis && (
              <p className="ern-block-text">{naehrstoff.ueberschuss_hinweis}</p>
            )}
          </div>
        )}

        {/* [5] Erkrankungs-Bezug → S5 */}
        {erkrankungen.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">🏥</span>
              Erkrankungen mit Bezug
            </h2>
            <div className="ern-naehrstoff-crosslinks">
              {erkrankungen.map((e) => (
                <Link
                  key={e.slug}
                  to={`/krankheiten/${e.slug}`}
                  className="ern-naehrstoff-chip"
                >
                  {e.name_de} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* [6] Supplement-Alternative → S2 */}
        {naehrstoff.supplement_alternative && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">💊</span>
              Supplement-Alternative
            </h2>
            <p className="ern-block-text" style={{marginBottom: '12px'}}>
              Dieser Nährstoff ist auch als Supplement verfügbar — für Risikogruppen oder bei nachgewiesenem Mangel.
            </p>
            <div className="ern-naehrstoff-crosslinks">
              <Link
                to={`/supplements/${naehrstoff.supplement_alternative}`}
                className="ern-naehrstoff-chip"
              >
                💊 Supplement-Profil →
              </Link>
            </div>
          </div>
        )}

        {/* [7] Quellen */}
        {quellenListe.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">📚</span>
              Quellen
            </h2>
            <div className="ern-sources-list">
              {quellenListe.map((q, i) => (
                <div key={i} className="ern-source-item">
                  <span className="ern-source-typ">{q.typ}</span>
                  {q.url ? (
                    <a
                      href={q.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ern-source-link"
                    >
                      {q.url}
                    </a>
                  ) : (
                    <span className="ern-source-link">{q.titel || q.text || 'Quelle'}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="ern-quellen-hinweis">
              Alle Informationen basieren auf aktuellen wissenschaftlichen Quellen (NIH ODS, DGE, EFSA). Angaben ohne Gewähr auf Vollständigkeit. Letzte Aktualisierung: {naehrstoff.letzte_aktualisierung ? new Date(naehrstoff.letzte_aktualisierung).toLocaleDateString('de-DE') : '2026'}.
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="ern-disclaimer">
          <p>
            <strong>Hinweis:</strong> Diese Informationen dienen der allgemeinen Aufklärung und ersetzen keine individuelle medizinische oder ernährungstherapeutische Beratung. Bei Verdacht auf einen Nährstoffmangel oder bei der Einnahme von Supplementen sollte immer Rücksprache mit einem Arzt oder Ernährungsberater gehalten werden.
          </p>
        </div>

      </div>
    </div>
  )
}
