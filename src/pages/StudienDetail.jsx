// StudienDetail.jsx — S3-Studienkompass Detailseite /studien/:slug
// S3-BUILD-01 (14.05.2026)
// CSS: s3-* in Krankheiten.css (kein eigenes CSS-File per Scope)
// Zeigt eine kuratierte Studie vollständig — alle 38 K6-Felder soweit befüllt

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getStudieBySlug } from '../lib/queries'
import './Krankheiten.css'

const STUDIENTYP_LABEL = {
  meta_analyse: 'Meta-Analyse',
  systematischer_review: 'Systemat. Review',
  rct: 'Randomisierte kontrollierte Studie',
  narrativer_review: 'Narrativer Review',
  kohortenstudie: 'Kohortenstudie',
  fall_kontroll: 'Fall-Kontroll-Studie',
  querschnittsstudie: 'Querschnittsstudie',
  fallstudie: 'Fallstudie',
  expertenkonsens: 'Expertenkonsens',
}

const EVIDENCE_LABEL = {
  1: 'Sehr gut untersucht',
  2: 'Gut untersucht',
  3: 'Mäßig gut untersucht',
  4: 'Begrenzt untersucht',
  5: 'Sehr begrenzte Datenlage',
}

export default function StudienDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [studie, setStudie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getStudieBySlug(slug)
      .then(data => {
        setStudie(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Studie nicht gefunden.')
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="krank-detail">
        <div className="krank-empty">Lade Studie…</div>
      </div>
    )
  }

  if (error || !studie) {
    return (
      <div className="krank-detail">
        <button className="krank-detail-back" onClick={() => navigate(-1)}>← Zurück</button>
        <div className="krank-empty">{error ?? 'Studie nicht gefunden.'}</div>
      </div>
    )
  }

  const quellenUrl = studie.url
    || (studie.doi ? `https://doi.org/${studie.doi}` : null)
    || (studie.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${studie.pmid}/` : null)

  const hasHypeFlags = studie.preprint_flag || studie.tierversuch_flag
    || studie.in_vitro_flag || studie.interessenkonflikt_flag || studie.hype_warnung

  return (
    <div className="krank-detail">
      <button className="krank-detail-back" onClick={() => navigate(-1)}>← Zurück</button>

      {/* Header */}
      <div className="krank-detail-header s3-detail-header">
        <div className="s3-detail-badges">
          <span className={`s3-typ-chip s3-typ-${studie.studientyp}`}>
            {STUDIENTYP_LABEL[studie.studientyp] ?? studie.studientyp}
          </span>
          {studie.evidence_level && (
            <span className={`s3-evidence-badge s3-lvl-${studie.evidence_level}`}>
              Evidenz-Level {studie.evidence_level} · {EVIDENCE_LABEL[studie.evidence_level]}
            </span>
          )}
        </div>
        <h1 className="krank-detail-title s3-detail-title">{studie.titel}</h1>
        <p className="krank-detail-synonym s3-detail-meta">
          {[studie.autoren, studie.zeitschrift, studie.publikationsjahr].filter(Boolean).join(' · ')}
          {studie.stichprobengroesse ? ` · n = ${studie.stichprobengroesse.toLocaleString('de-DE')}` : ''}
        </p>
      </div>

      {/* Hype-Flags */}
      {hasHypeFlags && (
        <div className="krank-section s3-flags-section">
          <p className="krank-section-title">Einordnungshinweise</p>
          <div className="s3-flags">
            {studie.preprint_flag && <span className="s3-flag s3-flag--preprint">⚠ Preprint — nicht peer-reviewed</span>}
            {studie.tierversuch_flag && <span className="s3-flag s3-flag--tier">🐭 Tierversuch — Übertragbarkeit unklar</span>}
            {studie.in_vitro_flag && <span className="s3-flag s3-flag--vitro">🧪 In-vitro — kein Menschenversuch</span>}
            {studie.interessenkonflikt_flag && <span className="s3-flag s3-flag--konflikt">⚠ Interessenkonflikt der Autoren</span>}
            {studie.hype_warnung && <p className="s3-hype-warnung">{studie.hype_warnung}</p>}
          </div>
        </div>
      )}

      {/* Was untersucht */}
      {studie.was_untersucht && (
        <div className="krank-section">
          <p className="krank-section-title">Was wurde untersucht?</p>
          <p className="krank-section-text">{studie.was_untersucht}</p>
        </div>
      )}

      {/* Ergebnis */}
      {studie.ergebnis && (
        <div className="krank-section">
          <p className="krank-section-title">Ergebnis</p>
          <p className="krank-section-text">{studie.ergebnis}</p>
        </div>
      )}

      {/* Einschränkungen */}
      {studie.einschraenkungen && (
        <div className="krank-section">
          <p className="krank-section-title">Einschränkungen</p>
          <p className="krank-section-text">{studie.einschraenkungen}</p>
        </div>
      )}

      {/* Alltagsbezug */}
      {studie.alltagsbezug && (
        <div className="krank-section">
          <p className="krank-section-title">Alltagsbezug</p>
          <p className="krank-section-text">{studie.alltagsbezug}</p>
        </div>
      )}

      {/* Quellenlink */}
      {quellenUrl && (
        <div className="krank-section">
          <p className="krank-section-title">Originalquelle</p>
          <div className="s3-detail-quelle">
            <a
              href={quellenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="krank-link-chip"
            >
              ↗ Originalarbeit öffnen
            </a>
            {studie.pmid && (
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${studie.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="krank-link-chip"
              >
                PubMed · PMID {studie.pmid}
              </a>
            )}
            {studie.doi && (
              <span className="s3-doi-text">DOI: {studie.doi}</span>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="krank-section s3-disclaimer-section">
        <p className="s3-disclaimer">
          Diese Studie ist eine Einzelarbeit aus einer kuratierten Auswahl. Kein Einzelergebnis
          sollte isoliert bewertet werden. Die Darstellung ersetzt keine ärztliche Beratung
          und ist keine Therapieempfehlung.
        </p>
      </div>
    </div>
  )
}
