import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSupplementBySlug } from '../lib/queries'
import EvidenzAmpel from '../components/EvidenzAmpel'
import './Supplements.css'

const DOSIERUNGS_QUELLEN = [
  { key: 'bfr', label: 'BfR (Deutschland)', farbe: '#0B6E4F' },
  { key: 'nih', label: 'NIH (USA)', farbe: '#2563EB' },
  { key: 'efsa', label: 'EFSA (EU)', farbe: '#7C3AED' },
]

export default function SupplementDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [s, setS] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [aktiveQuelle, setAktiveQuelle] = useState('bfr')

  useEffect(() => {
    async function load() {
      try {
        const data = await getSupplementBySlug(slug)
        setS(data)
      } catch (err) {
        console.error(err)
        setError('Supplement nicht gefunden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="supplements-loading">
        <div className="spinner" />
        <p>Wird geladen…</p>
      </div>
    )
  }

  if (error || !s) {
    return (
      <div className="supplements-error">
        <p>{error || 'Supplement nicht gefunden.'}</p>
        <button onClick={() => navigate('/supplements')}>← Zurück zur Liste</button>
      </div>
    )
  }

  // Dosierungsdaten je Quelle
  const dosierung = {
    bfr: { wert: s.dosierung_bfr_wert, einheit: s.dosierung_bfr_einheit, hinweis: s.dosierung_bfr_hinweis },
    nih: { wert: s.dosierung_nih_wert, einheit: s.dosierung_nih_einheit, hinweis: s.dosierung_nih_hinweis },
    efsa: { wert: s.dosierung_efsa_wert, einheit: s.dosierung_efsa_einheit, hinweis: s.dosierung_efsa_hinweis },
  }
  const aktivDosierung = dosierung[aktiveQuelle]

  const formen = s.formen || []
  const kombinationen = s.synergien || []
  const antagonisten = s.antagonisten || []
  const qualitaet = s.qualitaet_kriterien || []
  const studien = s.studien || []
  const medInteraktionen = s.medikament_interaktionen || []
  const biomarker = s.beeinflusste_laborwerte || []

  return (
    <div className="supplement-detail">
      <button className="supplement-back-btn" onClick={() => navigate('/supplements')}>
        ← Alle Supplements
      </button>

      <div className="supplement-detail-header">
        <h1>{s.name_de}</h1>
        {s.wissenschaftlich && s.wissenschaftlich !== s.name_de && (
          <p className="supplement-wissenschaftlich">{s.wissenschaftlich}</p>
        )}
        {s.kategorie && <span className="supplement-gruppe-badge">{s.kategorie}</span>}
        {s.evidenz_ampel && (
          <div className="supplement-detail-ampel">
            <EvidenzAmpel level={s.evidenz_ampel} />
          </div>
        )}
      </div>

      {/* 1. Wofür */}
      {s.wofuer && (
        <div className="supplement-section">
          <h2>Wofür wird es eingenommen?</h2>
          <p>{s.wofuer}</p>
        </div>
      )}

      {/* 2. Dosierung — Regler */}
      <div className="supplement-section">
        <h2>Dosierung im Vergleich</h2>
        <div className="supplement-dosierung-tabs">
          {DOSIERUNGS_QUELLEN.map(q => (
            <button
              key={q.key}
              className={`supplement-dosierung-tab ${aktiveQuelle === q.key ? 'active' : ''}`}
              style={aktiveQuelle === q.key ? { borderColor: q.farbe, color: q.farbe } : {}}
              onClick={() => setAktiveQuelle(q.key)}
            >
              {q.label}
            </button>
          ))}
        </div>
        {aktivDosierung?.wert ? (
          <div className="supplement-dosierung-box">
            <span className="supplement-dosierung-wert">
              {aktivDosierung.wert}
              {aktivDosierung.einheit ? ` ${aktivDosierung.einheit}` : ''}
            </span>
            {aktivDosierung.hinweis && (
              <p className="supplement-dosierung-hinweis">{aktivDosierung.hinweis}</p>
            )}
          </div>
        ) : (
          <p className="supplement-dosierung-leer">Keine Daten für diese Quelle vorhanden.</p>
        )}
      </div>

      {/* 3. Formen & Bioverfügbarkeit */}
      {formen.length > 0 && (
        <div className="supplement-section">
          <h2>Formen & Bioverfügbarkeit</h2>
          <div className="supplement-formen-grid">
            {formen.map((f, i) => (
              <div key={i} className="supplement-form-card">
                <strong>{typeof f === 'string' ? f : f.name}</strong>
                {f.bioverfuegbarkeit && <p>{f.bioverfuegbarkeit}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Timing */}
      {s.timing && (
        <div className="supplement-section">
          <h2>Einnahme-Timing</h2>
          <p>{s.timing}</p>
        </div>
      )}

      {/* 5. Kombinationen & Antagonisten */}
      {(kombinationen.length > 0 || antagonisten.length > 0) && (
        <div className="supplement-section">
          <h2>Kombinationen & Wechselwirkungen</h2>
          <div className="supplement-kombi-grid">
            {kombinationen.length > 0 && (
              <div className="supplement-kombi-card supplement-kombi-card--positiv">
                <strong>✓ Synergien</strong>
                <ul>
                  {kombinationen.map((k, i) => (
                    <li key={i}>{typeof k === 'string' ? k : k.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {antagonisten.length > 0 && (
              <div className="supplement-kombi-card supplement-kombi-card--negativ">
                <strong>✗ Antagonisten</strong>
                <ul>
                  {antagonisten.map((a, i) => (
                    <li key={i}>{typeof a === 'string' ? a : a.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Qualitätskriterien */}
      {qualitaet.length > 0 && (
        <div className="supplement-section">
          <h2>Qualitätskriterien</h2>
          <ul className="supplement-qualitaet-list">
            {qualitaet.map((q, i) => (
              <li key={i}>{typeof q === 'string' ? q : q.kriterium}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 7. Studien */}
      {studien.length > 0 && (
        <div className="supplement-section">
          <h2>Relevante Studien</h2>
          <div className="supplement-studien-list">
            {studien.map((st, i) => (
              <div key={i} className="supplement-studie-item">
                <p>{typeof st === 'string' ? st : st.titel}</p>
                {st.pubmed_id && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${st.pubmed_id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="supplement-studie-link"
                  >
                    PubMed → {st.pubmed_id}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cross-Block: Biomarker */}
      <div className="supplement-cross-block">
        <h3>Relevante Laborwerte</h3>
        {biomarker.length > 0 ? (
          <div className="supplement-cross-items">
            {biomarker.map((b, i) => (
              <span key={i} className="supplement-cross-tag">
                {typeof b === 'string' ? b : b.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="supplement-cross-empty">Daten werden ergänzt.</p>
        )}
      </div>

      {/* Cross-Block: Medikamenten-Interaktionen */}
      <div className="supplement-cross-block">
        <h3>Medikamenten-Interaktionen</h3>
        {medInteraktionen.length > 0 ? (
          <div className="supplement-cross-items">
            {medInteraktionen.map((m, i) => (
              <div key={i} className="supplement-interaktion-item">
                <strong>{typeof m === 'string' ? m : m.wirkstoff}</strong>
                {m.beschreibung && <p>{m.beschreibung}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="supplement-cross-empty">Daten werden ergänzt.</p>
        )}
      </div>

      <div className="supplement-disclaimer">
        Diese Informationen ersetzen keine ärztliche Diagnose oder Behandlung.
        Bitte spreche die Einnahme von Supplements mit einer Ärztin oder einem Arzt ab.
      </div>
    </div>
  )
}
