// S18-Build-04: Lebensmittel-Kompass Abschnitt ergänzt (23.04.2026)
// S18-Build-05: Zusatzstoff-Kompass (K8d) ergänzt (23.04.2026)
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getErnaehrungsmusterListe, getNaehrstoffListe, getLebensmittelListe, getZusatzstoffListe } from '../lib/queries'
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

const LM_KATEGORIE_ICON = {
  'Gemüse':        '🥦',
  'Obst':          '🍎',
  'Hülsenfrüchte': '🫘',
  'Fisch':         '🐟',
  'Fleisch':       '🥩',
  'Getreide':      '🌾',
  'Nüsse/Samen':   '🥜',
  'Milchprodukte': '🥛',
  'Öle/Fette':     '🫒',
  'Sonstiges':     '🍳',
}

const LM_KATEGORIEN = ['Gemüse', 'Obst', 'Hülsenfrüchte', 'Fisch', 'Fleisch', 'Getreide', 'Nüsse/Samen', 'Milchprodukte', 'Öle/Fette', 'Sonstiges']

// Reihenfolge der Nährstoff-Kategorien
const KATEGORIE_ORDER = ['Vitamin', 'Mineralstoff', 'Makronährstoff', 'Pflanzenstoff']

// K8d — Zusatzstoffe
const ZS_KATEGORIE_ICON = {
  'Farbstoff':           '🎨',
  'Konservierungsstoff': '🛡️',
  'Antioxidationsmittel': '🔋',
  'Emulgator':           '🌀',
  'Süßungsmittel':       '🍬',
  'Geschmacksverstärker': '✨',
  'Sonstige':            '⚗️',
}
const ZS_KATEGORIE_ORDER = ['Farbstoff', 'Konservierungsstoff', 'Antioxidationsmittel', 'Emulgator', 'Süßungsmittel', 'Geschmacksverstärker', 'Sonstige']

export default function ErnaehrungListe() {
  const [muster, setMuster] = useState([])
  const [naehrstoffe, setNaehrstoffe] = useState([])
  const [lebensmittel, setLebensmittel] = useState([])
  const [zusatzstoffe, setZusatzstoffe] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [aktiverLmFilter, setAktiverLmFilter] = useState('Alle')
  const [aktiverZsFilter, setAktiverZsFilter] = useState('Alle')
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const [musterData, naehrstoffData, lebensmittelData, zusatzstoffData] = await Promise.all([
          getErnaehrungsmusterListe(),
          getNaehrstoffListe(),
          getLebensmittelListe(),
          getZusatzstoffListe(),
        ])
        setMuster(musterData)
        setNaehrstoffe(naehrstoffData)
        setLebensmittel(lebensmittelData)
        setZusatzstoffe(zusatzstoffData)
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

  // Lebensmittel filtern
  const gefilterteLebensmittel = aktiverLmFilter === 'Alle'
    ? lebensmittel
    : lebensmittel.filter(lm => lm.oberkategorie === aktiverLmFilter)

  // Kategorien mit Einträgen für Filter-Chips
  const vorhandeneLmKategorien = LM_KATEGORIEN.filter(k =>
    lebensmittel.some(lm => lm.oberkategorie === k)
  )

  // Zusatzstoffe filtern und Kategorien ermitteln
  const gefilterteZusatzstoffe = aktiverZsFilter === 'Alle'
    ? zusatzstoffe
    : zusatzstoffe.filter(zs => zs.oberkategorie === aktiverZsFilter)

  const vorhandeneZsKategorien = ZS_KATEGORIE_ORDER.filter(k =>
    zusatzstoffe.some(zs => zs.oberkategorie === k)
  )

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
            Nährstoffe, Lebensmittel und Ernährungsmuster — evidenzbasiert und
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

      {/* Lebensmittel-Kompass (NEU — S18-Build-04) */}
      <div className="ern-lm-section-wrapper">
        <h2 className="ern-section-title">Lebensmittel-Kompass</h2>
        <p className="ern-section-sub">
          {lebensmittel.length} Lebensmittel und Lebensmittelgruppen — Nährwertprofile,
          gesundheitlicher Nutzen und Erkrankungs-Bezüge
        </p>

        {lebensmittel.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Noch keine Lebensmittel in der Datenbank.
          </p>
        ) : (
          <>
            {/* Kategorie-Filter */}
            <div className="ern-lm-filter-chips">
              <button
                className={`ern-lm-filter-chip${aktiverLmFilter === 'Alle' ? ' ern-lm-filter-chip--aktiv' : ''}`}
                onClick={() => setAktiverLmFilter('Alle')}
              >
                Alle ({lebensmittel.length})
              </button>
              {vorhandeneLmKategorien.map(k => {
                const count = lebensmittel.filter(lm => lm.oberkategorie === k).length
                return (
                  <button
                    key={k}
                    className={`ern-lm-filter-chip${aktiverLmFilter === k ? ' ern-lm-filter-chip--aktiv' : ''}`}
                    onClick={() => setAktiverLmFilter(k)}
                  >
                    {LM_KATEGORIE_ICON[k]} {k} ({count})
                  </button>
                )
              })}
            </div>

            {/* Lebensmittel-Karten-Grid */}
            <div className="ern-lm-grid">
              {gefilterteLebensmittel.map((lm) => (
                <div
                  key={lm.slug}
                  className="ern-lm-card"
                  onClick={() => navigate(`/ernaehrung/lebensmittel/${lm.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/ernaehrung/lebensmittel/${lm.slug}`)}
                >
                  <div className="ern-lm-card-icon">
                    {LM_KATEGORIE_ICON[lm.oberkategorie] || '🥗'}
                  </div>
                  <div className="ern-lm-card-name">{lm.name_de}</div>
                  <div className="ern-lm-card-kat">{lm.oberkategorie}</div>
                  <div className="ern-lm-card-desc">
                    {lm.kurzbeschreibung?.length > 80
                      ? lm.kurzbeschreibung.slice(0, 80) + '…'
                      : lm.kurzbeschreibung}
                  </div>
                  <div className="ern-lm-card-arrow">Mehr erfahren →</div>
                </div>
              ))}
            </div>
          </>
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

      {/* Zusatzstoff-Kompass (NEU — S18-Build-05) */}
      <div className="ern-zs-list-section">
        <h2 className="ern-section-title">Zusatzstoff-Kompass (E-Nummern)</h2>
        <p className="ern-section-sub">
          {zusatzstoffe.length} Zusatzstoffe — technische Funktion, Vorkommen und regulatorische Einordnung
        </p>

        {zusatzstoffe.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Noch keine Einträge in der Datenbank.
          </p>
        ) : (
          <>
            {/* Kategorie-Filter */}
            <div className="ern-zs-filter-chips">
              <button
                className={`ern-zs-filter-chip${aktiverZsFilter === 'Alle' ? ' ern-zs-filter-chip--aktiv' : ''}`}
                onClick={() => setAktiverZsFilter('Alle')}
              >
                Alle ({zusatzstoffe.length})
              </button>
              {vorhandeneZsKategorien.map(k => {
                const count = zusatzstoffe.filter(zs => zs.oberkategorie === k).length
                return (
                  <button
                    key={k}
                    className={`ern-zs-filter-chip${aktiverZsFilter === k ? ' ern-zs-filter-chip--aktiv' : ''}`}
                    onClick={() => setAktiverZsFilter(k)}
                  >
                    {ZS_KATEGORIE_ICON[k]} {k} ({count})
                  </button>
                )
              })}
            </div>

            {/* Karten-Grid */}
            <div className="ern-zs-grid">
              {gefilterteZusatzstoffe.map((zs) => (
                <div
                  key={zs.slug}
                  className="ern-zs-card"
                  onClick={() => navigate(`/ernaehrung/zusatzstoff/${zs.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/ernaehrung/zusatzstoff/${zs.slug}`)}
                >
                  <div className="ern-zs-card-enum">{zs.e_nummer}</div>
                  <div className="ern-zs-card-name">{zs.name_de}</div>
                  <div className="ern-zs-card-kat">
                    {ZS_KATEGORIE_ICON[zs.oberkategorie] || '⚗️'} {zs.oberkategorie}
                  </div>
                  <div className="ern-zs-card-desc">
                    {zs.funktion_im_lebensmittel?.length > 80
                      ? zs.funktion_im_lebensmittel.slice(0, 80) + '…'
                      : zs.funktion_im_lebensmittel}
                  </div>
                  <div className="ern-zs-card-arrow">Mehr erfahren →</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Scope-Hinweis */}
      <div className="ern-scope-note">
        <p>
          <strong>Hinweis:</strong> Der Ernährungskompass zeigt evidenzbasierte Nährstoff-Profile,
          Lebensmittelgruppen, Ernährungsmuster und Lebensmittelzusatzstoffe. Personalisierte
          Ernährungsempfehlungen sind nicht Gegenstand dieser Plattform. VitalWissen ersetzt keine ärztliche
          oder ernährungstherapeutische Beratung.
        </p>
      </div>
    </div>
  )
}
