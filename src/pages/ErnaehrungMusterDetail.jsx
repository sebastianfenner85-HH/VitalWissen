import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getErnaehrungsmusterBySlug, getKrankheitenNameMap } from '../lib/queries'
import './Ernaehrung.css'

export default function ErnaehrungMusterDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [muster, setMuster] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [krankheitNamen, setKrankheitNamen] = useState({})

  useEffect(() => {
    async function load() {
      try {
        const data = await getErnaehrungsmusterBySlug(slug)
        setMuster(data)

        const krankSlugs = data?.verwandte_krankheiten || []
        if (krankSlugs.length > 0) {
          const nameMap = await getKrankheitenNameMap(krankSlugs).catch(() => ({}))
          setKrankheitNamen(nameMap)
        }
      } catch (err) {
        console.error(err)
        setError('Ernährungsmuster nicht gefunden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="ern-detail-page">
        <div className="ern-loading">Wird geladen…</div>
      </div>
    )
  }

  if (error || !muster) {
    return (
      <div className="ern-detail-page">
        <div className="ern-error">
          <p style={{ marginBottom: 16 }}>{error || 'Ernährungsmuster nicht gefunden.'}</p>
          <button className="ern-detail-back" onClick={() => navigate('/ernaehrung')}>
            ← Zurück zur Übersicht
          </button>
        </div>
      </div>
    )
  }

  const grundprinzipien    = muster.grundprinzipien || []
  const typLM              = muster.typische_lebensmittel || []
  const quellen            = Array.isArray(muster.quellen) ? muster.quellen : []
  const verwKrankheiten    = muster.verwandte_krankheiten || []
  // Nur Krankheiten rendern, die tatsächlich in der DB bestätigt sind
  const valKrankheiten     = verwKrankheiten.filter(s => krankheitNamen[s] !== undefined)

  return (
    <div className="ern-detail-page">
      {/* Hero */}
      <div className="ern-detail-hero">
        <div className="ern-detail-hero-inner">
          <div className="ern-detail-nav">
            <button className="ern-detail-back" onClick={() => navigate('/ernaehrung')}>
              ← Ernährungskompass
            </button>
          </div>
          <div className="ern-detail-label">🥦 Ernährungsmuster</div>
          <h1 className="ern-detail-title">{muster.name_de}</h1>
          {muster.kurzbeschreibung && (
            <p className="ern-detail-intro">{muster.kurzbeschreibung}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="ern-detail-content">

        {/* Block 1: Was ist das? */}
        {muster.beschreibung && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">📖</span>
              Was ist das?
            </h2>
            <p className="ern-block-text">{muster.beschreibung}</p>
          </div>
        )}

        {/* Block 2: Grundprinzipien */}
        {grundprinzipien.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">📋</span>
              Grundprinzipien
            </h2>
            <ul className="ern-prinzip-list">
              {grundprinzipien.map((p, i) => (
                <li key={i} className="ern-prinzip-item">
                  <span className="ern-prinzip-dot" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Block 3: Für wen sinnvoll? */}
        {muster.geeignet_fuer && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">✅</span>
              Für wen besonders sinnvoll?
            </h2>
            <p className="ern-block-text">{muster.geeignet_fuer}</p>
          </div>
        )}

        {/* Block 4: Vorsicht */}
        {muster.vorsicht_bei && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">⚠️</span>
              Wobei ist Vorsicht nötig?
            </h2>
            <p className="ern-block-text">{muster.vorsicht_bei}</p>
          </div>
        )}

        {/* Block 5: Typische Lebensmittel */}
        {typLM.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">🛒</span>
              Typische Lebensmittel
            </h2>
            <div className="ern-lm-tags">
              {typLM.map((lm, i) => (
                <span key={i} className="ern-lm-tag">{lm}</span>
              ))}
            </div>
          </div>
        )}

        {/* Block 6: Alltagsumsetzung */}
        {muster.alltagsumsetzung && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">🗓️</span>
              Alltag und Umsetzung
            </h2>
            <p className="ern-block-text">{muster.alltagsumsetzung}</p>
          </div>
        )}

        {/* Block 7: Verwandte Erkrankungen (S5-Crosslink) */}
        <div className="ern-block">
          <h2 className="ern-block-title">
            <span className="ern-block-icon">🔗</span>
            Verwandte Erkrankungen
          </h2>
          {valKrankheiten.length > 0 ? (
            <div className="ern-chips">
              {valKrankheiten.map((s) => (
                <Link key={s} to={`/krankheiten/${s}`} className="ern-chip">
                  {krankheitNamen[s]}
                </Link>
              ))}
            </div>
          ) : (
            <p className="ern-no-crosslinks">
              Keine verknüpften Erkrankungen verfügbar.
            </p>
          )}
        </div>

        {/* Block 8: Quellen */}
        {quellen.length > 0 && (
          <div className="ern-block">
            <h2 className="ern-block-title">
              <span className="ern-block-icon">📚</span>
              Quellen
            </h2>
            <div className="ern-sources-list">
              {quellen.map((q, i) => (
                <div key={i} className="ern-source-item">
                  <span className="ern-source-typ">{q.typ || 'Quelle'}</span>
                  <a
                    href={q.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ern-source-link"
                  >
                    {q.titel}
                  </a>
                </div>
              ))}
            </div>
            <p className="ern-quellen-hinweis">
              VitalWissen verlinkt nur professionell anerkannte, verlinkbare Quellen.
              Keine KI-generierten Inhalte. Keine Werbung, kein Affiliate.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
