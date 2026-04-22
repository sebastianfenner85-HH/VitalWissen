import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getErnaehrungsmusterListe, getNaehrstoffListe } from '../lib/queries'
import './Ernaehrung.css'

const MUSTER_ICONS = {
  'mediterrane-ernaehrung':       '🫒',
  'dash':                          '💊',
  'ballaststoffreiche-ernaehrung': '🌾',
  'eiweissbetonte-ernaehrung':    '🥩',
}

const KATEGORIE_ICON = {
  'Vitamin':        '🧬',
  'Mineralstoff':   '⚗️',
  'Makronährstoff': '🌾',
  'Pflanzenstoff':  '🌿',
}

// Reihenfolge der Kategorien
const KATEGORIE_ORDER = ['Vitamin', 'Mineralstoff', 'Makronährstoff', 'Pflanzenstoff']

export default function ErnaehrungListe() {
  const [muster, setMuster] = useState([])
  const [naehrstoffe, setNaehrstoffe] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const [musterData, naehrstoffData] = await Promise.all([
          getErnaehrungsmusterListe(),
          getNaehrstoffListe(),
        ])
        setMuster(musterData)
        setNaehrstoffe(naehrstoffData)
      } catch (err) {
        console.error(err)
        setError('Inhalte konnten nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Nährstoffe nach Kategorie gruppieren
  const naehrstoffeByKategorie = KATEGORIE_ORDER.reduce((acc, kat) => {
    acc[kat] = naehrstoffe.filter(n => n.kategorie === kat)
    return acc
  }, {})

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
            Nährstoffe, Ernährungsmuster und ihre Wirkung — evidenzbasiert und
            verständlich erklärt.
          </p>
        </div>
      </div>

      {/* Nährstoff-Lexikon */}
      <div className="ern-naehrstoff-section">
        <h2 className="ern-section-title">Nährstoff-Lexikon</h2>
        <p className="ern-section-sub">
          {naehrstoffe.length} Nährstoffe — Tagesbedarf, Quellen, Mangel-Symptome und Erkrankungs-Bezüge
        </p>

        {naehrstoffe.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Noch keine Nährstoffe in der Datenbank.
          </p>
        ) : (
          <div className="ern-naehrstoff-kategorien">
            {KATEGORIE_ORDER.filter(kat => naehrstoffeByKategorie[kat].length > 0).map(kat => (
              <div key={kat}>
                <h3 className="ern-naehrstoff-gruppe-title">
                  <span>{KATEGORIE_ICON[kat]}</span>
                  {kat}e
                </h3>
                <div className="ern-naehrstoff-grid">
                  {naehrstoffeByKategorie[kat].map((n) => (
                    <div
                      key={n.slug}
                      className="ern-naehrstoff-card"
                      onClick={() => navigate(`/ernaehrung/naehrstoff/${n.slug}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && navigate(`/ernaehrung/naehrstoff/${n.slug}`)}
                    >
                      <div className="ern-naehrstoff-card-name">{n.name_de}</div>
                      <div className="ern-naehrstoff-card-desc">{n.kurzbeschreibung}</div>
                      <div className="ern-naehrstoff-card-arrow">Mehr erfahren →</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ernährungsmuster */}
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
          <strong>Hinweis:</strong> Der Ernährungskompass zeigt evidenzbasierte Nährstoff-Profile und
          ausgewählte Ernährungsmuster. Lebensmittel, Zusatzstoffe und personalisierte Empfehlungen
          werden in späteren Ausbaustufen ergänzt. VitalWissen ersetzt keine ärztliche oder
          ernährungstherapeutische Beratung.
        </p>
      </div>
    </div>
  )
}
