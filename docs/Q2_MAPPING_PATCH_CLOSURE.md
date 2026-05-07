# Q2-MAPPING-PATCH — Quellen-Typen Frontend-Mapping Closure

**Paketname:** Q2-MAPPING-PATCH — Quellentyp-Mapping-Lücken geschlossen  
**Typ:** Build-Closure (Frontend-Patch)  
**Datum:** 07.05.2026  
**Status:** ✅ BUILD GRÜN — Q2-MAPPING-PATCH abgeschlossen  
**Commit:** `27b3fb6`  
**Führende Basis:** `Q2_BUILD_02A_S5_QUELLENBOX_CLOSURE.md` · `Q2_BUILD_02B_S6_QUELLENBOX_CLOSURE.md` · `Q2_TRUST_SOURCE_PRE_SPEC.md`

---

## A. Ergebnisstatus

**BUILD GRÜN — Q2-MAPPING-PATCH abgeschlossen**

- S5 `QUELLEN_TYP` um `research` ergänzt → `krank-quellen-typchip--research` (violett-grau, UI-REFRESH-02)
- S6 `MED_QUELLEN_TYP` um `patient_info` ergänzt → `med-quellenbox-typchip--patient_info` (teal)
- Kein CSS-Touch nötig — beide Farb-Modifier existierten bereits (Krankheiten.css Z.960, Medikamente.css Z.845)
- Kein DB-Write, kein Schema-Change, kein queries.js-Touch
- Scope exakt 2 Dateien (3 Insertions, 1 Deletion)

---

## B. Audit vor Build

| Prüfpunkt | Befund | Go/No-Go |
|-----------|--------|----------|
| HEAD = origin/main | `fab4374` = `fab43749cfcc068ab25ff36bbdd0f66731fc359f` ✅ | GO |
| HEAD enthält `fab4374` oder neuer | JA ✅ | GO |
| Working tree clean | JA (git status --short: kein Output) ✅ | GO |
| Stale Clone | NEIN — frischer Session-Clone `/tmp/repo_q2mapping_patch` ✅ | GO |
| S5 QUELLEN_TYP: `research`-Eintrag vorhanden? | NEIN → Fallback `database` → **Lücke bestätigt** | GO (patchen) |
| S6 MED_QUELLEN_TYP: `patient_info`-Eintrag vorhanden? | NEIN → Fallback `database` → **Lücke bestätigt** | GO (patchen) |
| CSS-Modifier `krank-quellen-typchip--research` vorhanden? | JA — Krankheiten.css Z.960 (UI-REFRESH-02, violett-grau `#EEE9FF/#6B5CA5`) ✅ | GO (kein CSS-Touch nötig) |
| CSS-Modifier `med-quellenbox-typchip--patient_info` vorhanden? | JA — Medikamente.css Z.845 ✅ | GO (kein CSS-Touch nötig) |
| Verbotene Dateien: Supplements/Laborwerte/CSS/queries.js | Keine berührt ✅ | GO |

---

## C. Geänderte Dateien

| Datei | Änderung | Zeilen |
|-------|----------|--------|
| `src/pages/KrankheitDetail.jsx` | `QUELLEN_TYP` um `'research': { q2: 'research', label: 'Forschung', icon: '🔬' }` ergänzt | +1 |
| `src/pages/MedikamentDetail.jsx` | `MED_QUELLEN_TYP` um `patient_info: { farbe: 'patient_info', label: 'Patienteninformation', icon: '📖' }` ergänzt | +3 / -1 |

**Keine Änderungen an:** Krankheiten.css, Medikamente.css, queries.js, App.jsx, Nav.jsx, SupplementDetail.jsx, LaborwertDetail.jsx, Supplements.css, Laborwerte.css, Supabase-Schema.

---

## D. Vollständige Map-Zustände nach Patch

### S5 — QUELLEN_TYP (KrankheitDetail.jsx)

| DB-Wert | Q2-Typ | Label | Icon | CSS-Modifier |
|---------|--------|-------|------|-------------|
| `awmf` | `guideline` | Leitlinie | 📋 | `--guideline` (indigo) |
| `Leitlinie` | `guideline` | Leitlinie | 📋 | `--guideline` |
| `iqwig` | `patient_info` | Patienteninfo | 📖 | `--patient_info` (teal) |
| `Patienteninformation` | `patient_info` | Patienteninfo | 📖 | `--patient_info` |
| `icd10` | `database` | Datenbasis | 🗄️ | `--database` (slate) |
| `rki` | `regulatory` | Regulatorisch | 🏛️ | `--regulatory` (blau) |
| **`research`** | **`research`** | **Forschung** | **🔬** | **`--research` (violett-grau)** ← NEU |
| unbekannt | `database` (Fallback) | `typ`-Rohwert | 📄 | `--database` |

### S6 — MED_QUELLEN_TYP (MedikamentDetail.jsx)

| DB-Wert | Farbe-Typ | Label | Icon | CSS-Modifier |
|---------|-----------|-------|------|-------------|
| `ema` | `regulatory` | Regulatorisch | 🏛️ | `--regulatory` |
| `bfarm` | `regulatory` | Regulatorisch | 🏛️ | `--regulatory` |
| `openfda` | `database` | Datenbank | 🗄️ | `--database` |
| `who_atc` | `database` | Datenbank | 🗄️ | `--database` |
| `atc` | `database` | Datenbank | 🗄️ | `--database` |
| `guideline` | `guideline` | Leitlinie | 📋 | `--guideline` |
| `regulatory` | `regulatory` | Regulatorisch | 🏛️ | `--regulatory` |
| `database` | `database` | Datenbank | 🗄️ | `--database` |
| `research` | `research` | Forschung | 🔬 | `--research` |
| **`patient_info`** | **`patient_info`** | **Patienteninformation** | **📖** | **`--patient_info` (teal)** ← NEU |
| unbekannt | `database` (Fallback) | `typ`-Rohwert | 📄 | `--database` |

**Hinweis:** `getMedTypInfo()` verwendet `typ.toLowerCase()` als Lookup-Key — `patient_info` wird korrekt gemappt.

---

## E. Validatoren

| # | Validator | Status | Beleg |
|---|-----------|--------|-------|
| V1 | Nur erlaubte Dateien geändert | ✅ PASS | `git diff --stat`: exakt `KrankheitDetail.jsx` (+1) + `MedikamentDetail.jsx` (+3/-1) |
| V2 | Build grün | ✅ PASS | `vite build` → 0 Fehler, Bundle `index-Qq1C75Kf.js` |
| V3 | CSS-Modifier research vorhanden (S5) | ✅ PASS | Krankheiten.css Z.960 — `background: #EEE9FF; color: #6B5CA5` (UI-REFRESH-02) |
| V4 | CSS-Modifier patient_info vorhanden (S6) | ✅ PASS | Medikamente.css Z.845 — `background: #ECFEFF; color: #0E7490` |
| V5 | Kein DB-Write | ✅ PASS | Kein Supabase-Write, kein SQL, keine Migration |
| V6 | Kein CSS-Touch | ✅ PASS | `git diff --stat` zeigt 0 CSS-Dateien |
| V7 | Verbotene Dateien unberührt | ✅ PASS | SupplementDetail.jsx, LaborwertDetail.jsx, Supplements.css, Laborwerte.css, Krankheiten.css, Medikamente.css, queries.js — alle kein `git diff`-Output |
| V8 | HEAD sauber vor Commit | ✅ PASS | HEAD = `fab4374` = origin/main, working tree clean |

---

## F. Nicht-Scope bestätigt

| Punkt | Status |
|-------|--------|
| DB-Write | NEIN |
| Schema-Change | NEIN |
| CSS-Änderungen | NEIN — Modifier existierten bereits |
| S2 `supplements.quellen[*].typ`-Normalisierung (Option C) | NEIN — explizit ausgeschlossen, eigener späterer Chat |
| S1 / LaborwertDetail.jsx | NEIN — unberührt |
| Shared-Component-Refactor | NEIN |
| Neue Q2-Typen (NCCIH o.ä.) | NEIN |
| Künstliche Testdaten | NEIN |
| queries.js | NEIN — unberührt |
| Echte `research`-/`patient_info`-Live-Datensätze in DB | **Nicht geprüft** — keine bekannten Einträge mit diesen Typen in `krankheiten.quellen` oder `wirkstoffe.quellen`. Mapping wurde per Code + Build + Regression-Checks verifiziert (CSS-Modifier existierten bereits). Kein DB-Write, keine künstlichen Testdaten. |

---

## G. Ops / Persistenz

| Ebene | Status |
|-------|--------|
| Lokal gespeichert | JA — Session-Clone `/tmp/repo_q2mapping_patch` |
| git status | Clean nach Commit |
| Commit | ✅ `27b3fb6` — „Q2-MAPPING-PATCH: add research to S5 QUELLEN_TYP, patient_info to S6 MED_QUELLEN_TYP — latente Mapping-Lücken geschlossen, kein CSS-Touch nötig" |
| Push | ✅ `origin/main` — `fab4374..27b3fb6` |
| Supabase-Write | NEIN |
| DB-Schema-Change | NEIN |
| Netlify Auto-Deploy | 🟡 AN — Deploy nach Push automatisch ausgelöst |
| Offener Side Effect | NEIN |

---

## H. Offene Punkte (nicht in Scope dieses Pakets)

| Punkt | Status |
|-------|--------|
| S2 `typ: "NIH ODS"` — Normalisierung | Eigenes Paket (Option C aus Preflight) — ausdrücklich nicht Scope. Erst wenn `supplements.quellen[*].typ` vereinheitlicht werden soll. |
| NCCIH-Typentscheidung | Eigener Chat — wenn NCCIH-Quellen (Melatonin/Echinacea/Ginkgo/Mariendistel/Rhodiola) importiert werden → Typ `research` oder `database`? Entscheidung dann treffen. |
| `research`-/`patient_info`-Datensätze in DB | Keine bekannten Live-Einträge geprüft — nicht nötig für Mapping-Patch. Mapping wirkt sobald DB-Einträge mit diesen Typen angelegt werden. |
| docs/ repo-Sync (B4-SAFETY-PATCH + Q2-BUILD-02d) | **Backlog** — `docs/AUDIT_CANON_CURRENT.md` und `docs/ACTIVE_STRANDS_CURRENT.md` im Repo standen noch auf Q2-BUILD-02c. Werden im Doku-Commit dieses Pakets auf aktuellen Stand gebracht. |

## I. Nächste zulässige Schritte

- **S3/B3 PRE-SPEC** — Sinnvoller nächster Schritt: Q2-Typ-Mappings für S1/S2/S5/S6 konsolidiert, Quellenlogik ausreichend stabil als Basis für Studienkompass-Spec
- **Q2-BUILD-02c-P2B** — 5× NCCIH: Melatonin/Echinacea/Ginkgo/Mariendistel/Rhodiola (DB-only, eigenständiger Chat)
- **B4-BUILD-03** — B4 Actions Rollout weitere Laborwerte (eigenständiger Chat)
- **S8-BUILD-02d** — Kalium/Natrium K3-Map (eigenständiger Chat)
- **UI-REFRESH-04** — Detailseiten Primär/Sekundär-Container (eigenständiger Chat)
- **S1-BUILD-02** — Rollout Zielwert alle 60 Werte (eigenständiger Chat)

---

*Erstellt: 07.05.2026 — Q2-MAPPING-PATCH abgeschlossen.*  
*Commit: `27b3fb6`. Push: `origin/main` (`fab4374..27b3fb6`). DB-Write: NEIN. Schema-Change: NEIN. CSS-Touch: NEIN. Netlify: Auto-Deploy.*
