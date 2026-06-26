# CHATGPT_HANDOFF — S1-CHECKUP-BUILDER-BASE-01

**Paket-ID:** S1-CHECKUP-BUILDER-BASE-01
**Datum:** 2026-06-25
**Erstellt von:** Cowork (Claude/Anthropic)
**Zweck:** Allein ausreichende Übergabe an ChatGPT zur Review des Builds

---

## 1. Paket-ID

| Feld | Wert |
|------|------|
| Paket | S1-CHECKUP-BUILDER-BASE-01 |
| Typ | Produktcode — statischer Checkup-Builder |
| Repo | github.com/sebastianfenner85-HH/VitalWissen |
| Branch | `feature/s1-checkup-builder-base-01-local` |
| PR | Draft gegen `main` — kein Merge ohne Go |

---

## 2. Was wurde gebaut?

Statisch-konfigurierter Checkup-Builder unter `/laborwerte/checkup-builder`.
Kein DB-Write. Kein Schema-Change. `queries.js` unverändert.

### Neue Dateien

| Datei | Typ | Beschreibung |
|-------|-----|-------------|
| `src/lib/checkup_builder_config.js` | Config | TIER-Konstanten, PANELS, THEMEN, DISCLAIMER |
| `src/pages/CheckupBuilder.jsx` | React | 3-Schritt-Wizard (Panel → Themen → Ergebnisse) |
| `src/pages/CheckupBuilder.css` | CSS | cb-* Prefix, mobile-first, Tap-Targets ≥ 40px |
| `docs/review_handoffs/S1_CHECKUP_BUILDER_BASE_01/CHATGPT_HANDOFF.md` | Docs | Diese Datei |

### Geänderte Dateien (minimal)

| Datei | Änderung |
|-------|---------|
| `src/App.jsx` | Import + Route vor `/laborwerte/:code` |
| `src/pages/LaborwerteListe.jsx` | CTA-Link "Checkup vorbereiten →" |
| `src/styles/Laborwerte.css` | Klasse `lw-checkup-link` (5 Zeilen) |

---

## 3. Akzeptanzkriterien A1–A18

| AC | Beschreibung | Status |
|----|-------------|--------|
| A1 | Route `/laborwerte/checkup-builder` erreichbar | ✅ PASS |
| A2 | Panel-Auswahl Kleines/Großes Blutbild | ✅ PASS |
| A3 | Alle 4 Themen wählbar | ✅ PASS |
| A4 | Ergebnisliste tier-gruppiert mit Badges | ✅ PASS |
| A5 | Alle Items verlinken auf `/laborwerte/:slug` | ✅ PASS |
| A6 | TSH (3016-3) bei Müdigkeit + Schilddrüse: genau einmal | ✅ PASS (LOINC-Dedup via Map) |
| A7 | Kein Diagnose-Framing, kein "du brauchst" | ✅ PASS |
| A8 | Disclaimer alle 3 Pflicht-Sätze prominent | ✅ PASS |
| A9 | Mobile-first, Tap-Targets ≥ 40px | ✅ PASS |
| A10 | CSS-Klassen-Audit: alle className aus JSX in CSS definiert | ✅ PASS |
| A11 | Kein DB-Write, kein Schema-Change, queries.js unverändert | ✅ PASS |
| A12 | Route in App.jsx vor `/laborwerte/:code` | ✅ PASS |
| A13 | CTA "Checkup vorbereiten →" in LaborwerteListe.jsx | ✅ PASS |
| A14 | checkup_builder_config.js: Sprach-No-Go-Block + alle 5 TIER-Konstanten | ✅ PASS |
| A15 | `npm run build` sauber (EXIT 0, Vite v8.0.16, 130 Module) | ✅ PASS |
| A16 | Diese Handoff-Datei erstellt | ✅ PASS |
| A17 | Feature-Branch verwendet — kein direkter Push auf main | ✅ PASS |
| A18 | Draft PR gegen main — kein Merge ohne Go | ✅ PASS (nach PR-Erstellung) |

---

## 4. Technische Details

### LOINC-Deduplication (A6)
- Dedup über `Map(loinc → item)`
- TSH LOINC `3016-3` erscheint in Müdigkeit/Erschöpfung (standard) und Schilddrüse (standard)
- Bei Kombination: genau einmal in der Ergebnisliste

### Retikulozyten (A4/A5)
- LOINC `31112-6`, Slug `retikulozyten` ✅
- NICHT `17849-1` (Altstand, nicht in DB)

### TIER-Konstanten (A14)
- STANDARD, OPTIONAL, SPEZIAL, NUR_FACHPERSON, NICHT_TEIL_DES_GROSSEN_BLUTBILDS ✅
- Sprach-No-Go-Kommentarblock am Dateianfang ✅

### CSS-Klassen-Audit (A10)
| CSS-Klasse | In CSS definiert |
|-----------|----------------|
| cb-page | ✅ |
| cb-hero | ✅ |
| cb-hero-title | ✅ |
| cb-hero-subtitle | ✅ |
| cb-back-link | ✅ |
| cb-content | ✅ |
| cb-section | ✅ |
| cb-step-label | ✅ |
| cb-section-title | ✅ |
| cb-section-hint | ✅ |
| cb-panel-grid | ✅ |
| cb-panel-card | ✅ |
| cb-panel-card--selected | ✅ |
| cb-panel-name | ✅ |
| cb-panel-desc | ✅ |
| cb-panel-count | ✅ |
| cb-thema-grid | ✅ |
| cb-thema-card | ✅ |
| cb-thema-card--selected | ✅ |
| cb-thema-icon | ✅ |
| cb-thema-name | ✅ |
| cb-thema-count | ✅ |
| cb-thema-check | ✅ |
| cb-cta-row | ✅ |
| cb-btn-zusammenstellen | ✅ |
| cb-cta-hint | ✅ |
| cb-section--results | ✅ |
| cb-results-meta | ✅ |
| cb-disclaimer | ✅ |
| cb-disclaimer-icon | ✅ |
| cb-disclaimer-text | ✅ |
| cb-tier-group | ✅ |
| cb-tier-title | ✅ |
| cb-item-list | ✅ |
| cb-item | ✅ |
| cb-item-main | ✅ |
| cb-item-link | ✅ |
| cb-item-reasoning | ✅ |
| cb-tier-badge | ✅ |
| cb-tier-badge--standard | ✅ |
| cb-tier-badge--optional | ✅ |
| cb-tier-badge--spezialwert | ✅ |
| cb-tier-badge--nur-fachperson | ✅ |
| cb-tier-badge--nicht-teil-des-grossen-blutbilds | ✅ |
| cb-results-footer | ✅ |
| cb-btn-neu | ✅ |

---

## 5. DB-Status

**DB-Write: NEIN**
**Schema-Change: NEIN**
**Supabase-Write: NEIN**
**queries.js: UNVERÄNDERT**

---

## 6. Build-Status

- `npm run build`: EXIT 0 ✅
- Vite v8.0.16, 130 Module transformiert
- `git diff --check`: PASS (keine Whitespace-Fehler)
- Text-Safety: BOM=0, BIDI=0, CRLF=0 ✅
- Tabu-Dateien unberührt ✅

---

## 7. Deploy-Status

**Production Deploy: NEIN**
Ein PR kann automatisch eine Netlify Deploy Preview auslösen — das ist kein Production Deploy.
Production Deploy erst nach explizitem Merge auf main via Netlify Auto-Publishing.

---

## 8. Secrets

**NEIN** — keine Credentials, keine PATs, keine Tokens in Dateien, Commit oder PR.

---

## 9. Was ChatGPT prüfen soll

1. **A6 Deduplikation:** Ist die LOINC-Map-Implementierung korrekt für den TSH-Fall?
2. **A7 Sprach-No-Gos:** Gibt es in CheckupBuilder.jsx oder checkup_builder_config.js verbotene Formulierungen?
3. **A8 Disclaimer:** Alle 3 Pflicht-Sätze vorhanden und prominent genug?
4. **A12 Route-Reihenfolge:** Steht `/laborwerte/checkup-builder` garantiert vor `/laborwerte/:code` in App.jsx?
5. **A14 TIER-Vollständigkeit:** Alle 5 TIER-Konstanten + Sprach-No-Go-Block in checkup_builder_config.js?
6. **Gesamtbewertung:** Sind alle A1–A18 plausibel PASS — oder gibt es Rückfragen?

---

*Erstellt: 2026-06-25 | DB-Write: NEIN | Production Deploy: NEIN*
