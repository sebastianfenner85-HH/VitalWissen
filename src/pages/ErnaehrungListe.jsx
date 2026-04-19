import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getErnaehrungsmusterListe } from '../lib/queries'
import './Ernaehrung.css'

const MUSTER_ICONS = {
  'mediterrane-ernaehrung':       '🫒',
  'dash':                          '💊',
  'ballaststoffreiche-ernaehrung': '🌾',
  'eiweissbetonte-ernaehrung':    '🥩',
}

export default function ErnaehrungListe() {
  const [muster, setMuster] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const data = await getErnaehrungsmusterListe()
        setMuster(data)
      } catch (err) {
        console.error(err)
        setError('Ernährungsmuster konnten nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="ern-page">
        <div className="ern-loading">Wird geladen…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ern-page">
        <div className="ern-error">{error}</div>
      </div>
    )
  }

  return (
    <div className="ern-page">
      {/* Hero */}
      <div className="ern-hero">
        <div className="ern-hero-inner">
          <div className="ern-hero-label">🥦 S18 Ernährungskompass</div>
          <h1 className="ern-hero-title">Ernährung verstehen</h1>
          <p className="ern-hero-sub">
            Ernährungsmuster strukturiert und evidenzbasiert — was steckt dahinter,
            für wen ist was sinnvoll, und wie setzt man es im Alltag um.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="ern-grid-section">
        <h2 className="ern-section-title">Ernährungsmuster</h2>
        <p className="ern-section-sub">
          {muster.length} Muster im Überblick — mit Querverweisen auf verwandte Erkrankungen
        </p>

        {muster.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Noch keine Muster in der Datenbank.
          </p>
        ) : (
          <div className="ern-grid">
            {muster.map((m) => (
              <div
                key={m.slug}
                className="ern-card"
                onClick={() => navigate(`/ernaehrung/muster/${m.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/ernaehrung/muster/${m.slug}`)}
              >
                <div className="ern-card-icon">
                  {MUSTER_ICONS[m.slug] || '🥗'}
                </div>
                <div className="ern-card-name">{m.name_de}</div>
                <div className="ern-card-desc">{m.kurzbeschreibung}</div>
                <div className="ern-card-arrow">Mehr erfahren →</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scope-Hinweis */}
      <div className="ern-scope-note">
        <p>
          <strong>Hinweis:</strong> Dieser Bereich zeigt aktuell ausgewählte Ernährungsmuster
          mit evidenzbasierter Einordnung. Nährstoffe, Lebensmittel und Zusatzstoffe
          werden in späteren Ausbaustufen ergänzt. VitalWissen ersetzt keine ärztliche oder
          ernährungstherapeutische Beratung.
        </p>
      </div>
    </div>
  )
}
