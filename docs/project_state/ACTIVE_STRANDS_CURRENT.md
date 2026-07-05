# ACTIVE_STRANDS_CURRENT — Operative Strang-Übersicht VitalWissen

**Stand:** 05.07.2026 — **VW-GITHUB-SOT-CLOSEOUT-01** (verifizierte Baseline vor Closeout: `ce9de260`)
**Typ:** Meta-Datei — operative Schnellübersicht, kein Ersatz für Einzeldokumente
**Pflege:** Bei jedem neuen Paket prüfen und nachziehen

---

## 1. ZWECK

Diese Datei gibt den schnellen Überblick über alle aktiven und zuletzt bewegten Stränge: was ist der aktuelle Stand, was ist der nächste zulässige Schritt, welche Dokumente führen.

**Kein Ersatz** für Einzeldokumente. Wenn Details benötigt werden: immer das einschlägige finalisierte Dokument auf GitHub `main/docs` lesen. Historische Verweise auf lokale `01_PROJECT_SOURCES_CURRENT/*`-Dateien dokumentieren die damalige Provenienz; sie sind seit dem GitHub-SOT-Closeout keine parallele kanonische Quelle.

**Historische Workflow-Hinweise:** Ältere Einträge mit Direkt-Push-/`origin/main`-Abläufen dokumentieren frühere Praxis. Sie sind keine aktuelle Erlaubnis. Für neue Arbeit gilt ausschließlich der PR-only-Workflow im Governance-Abschnitt unten.

---

## 2. AKTIVE / ZULETZT RELEVANTE STRÄNGE

---

### GITHUB-GOVERNANCE-MIGRATION — SOT-Closeout (VW-GITHUB-SOT-CLOSEOUT-01)
**Status:** ✅ **Kernmigration technisch bestätigt und live bewiesen — formaler Docs-/Governance-Abschluss mit diesem Paket**
**Letzter Stand:** Branch Protection auf `main` aktiv (live verifiziert). Required Check `Build and safety gates` gebunden. ROT→GRÜN-Enforcement-Nachweis vollständig: PR #35 (historischer Fehlversuch — Check schlug nicht rot an, `STOP_CHECK_DID_NOT_TURN_RED`) → PR #36 (CI-Diff-Check-Root-Cause-Fix) → PR #37 (erfolgreicher Nachweis: ROT-Blockade Phase A + GRÜN-Freigabe Phase B des normalen Mergewegs). PR #37 selbst **nicht gemerged**, Testbranch gelöscht, `main` durch PR #37 unverändert — **nicht erneut testen**. Codex Cloud als primärer Codex-Ausführungsweg für Produktcode operativ bestätigt (insbesondere PR #31, #33 und #36). PR-only-Governance im geprüften Migrations-/Governance-Workflow eingehalten; kein Direktpush auf `main` in diesem verifizierten Workflow.
**Closeout-Baseline main HEAD:** `ce9de2607c43ec38a022162e730a815a8875d766` (Merge PR #36) — verifizierte GitHub-Baseline unmittelbar vor diesem Closeout-PR. **Kein** dauerhaft aktueller `main`-HEAD nach Merge — für den jeweils aktuellen Stand immer live gegen GitHub prüfen.
**SOT-Sync-Regel (neu, bindend ab diesem Paket):** Statusrelevante Arbeit darf künftig nicht mehr wochenlang ausschliesslich lokal fortgeschrieben werden, ohne GitHub `docs/project_state/*` nachzuziehen. Vor jedem fachlich nicht zusammenhängenden Folgepaket ist ein GitHub-SOT-Sync erforderlich (Doku-Sync im selben PR oder unmittelbar folgender, klar verlinkter Docs-Sync-PR). Kein Aufbau zweier paralleler Wahrheiten.
**Bekannte Drift, mit diesem Paket geschlossen:** `docs/project_state/*` + `docs/project_base/VW_03_STATUS.md` waren seit PR #11 (13.06.2026) inhaltlich eingefroren, während der lokale Cowork-Workspace weiter fortgeschrieben wurde (Detail: `VW-GITHUB-SOT-CURRENT-STATE-CONSOLIDATION-01`, `SOT_DRIFT_REPORT.md` — lokale Evidence, nicht auf GitHub). Dieser Closeout-PR patcht genau die 7 dafür vorgesehenen Dateien, keine Vollresynchronisation des gesamten lokalen Standes.
**DB-Write:** NEIN
**Letzte führende Dokumente:**
- Audit-Evidence (lokal, nicht kanonisch): `09_AUDIT_EXPORTS/VW_GITHUB_SOT_CURRENT_STATE_CONSOLIDATION_01/` — Nachweisgrundlage des Migrationsurteils
- GitHub-Kanon nach Merge: diese Datei und die übrigen finalisierten Closeout-Dokumente auf `main/docs`

**Nächste zulässige Schritte:** PR #8 schliessen + Branch-Cleanup (separat, kein PR nötig, siehe lokale `CLEANUP_CANDIDATES.md`), danach S1-BUILD-02-Reconciliation (siehe Zeile unten in §5).
**Strang formal geschlossen:** JA, mit Merge dieses PRs — Governance-Migration technisch bereits vollständig bewiesen, unabhängig vom Merge-Zeitpunkt.

---

### PRODUKT-STAND — Nicht direkt in diesem Docs-Paket bearbeitet, hier nur referenziert
**Status:** Live-belegter Stand aus `VW-GITHUB-SOT-CURRENT-STATE-CONSOLIDATION-01` (04.07.2026), **nicht direkt verifiziert** durch dieses Docs-Paket selbst — Quelle ist GitHub-PR-Historie, nicht lokale Ordnersichtung.
- **B4-BUILD-03:** ✅ abgeschlossen (PR #31, gemerged)
- **B4-BUILD-04 Wave 1:** ✅ abgeschlossen (PR #32 Codex-Context + PR #33 Code, 6 B4-Lab-Action-Einträge, gemerged)
- **Nächste B4-Welle:** offen, **nicht spezifiziert** — kein Altauftrag gefunden, echtes neues Backlog-Item
- **S1 Checkup Builder:** ✅ abgeschlossen und live (PR #27–#29, bestätigt unter `/laborwerte/checkup-builder`)
- **S1-BUILD-02-Reconciliation:** offen — lokaler Ordner `09_AUDIT_EXPORTS/S1_BUILD_02_USA_BACKFILL_BT2_ROLLOUT_30_01/` (rein Supabase-seitiger BT2/USA-Backfill-Rollout, kein GitHub-Code-PR) muss gegen den ursprünglichen S1-BUILD-02-Scope abgeglichen werden, bevor ein neuer S1-BUILD-02-Auftrag gestartet wird
- **`UX_SCAN_01`:** unklar — Codex-Context-Ordner + Branch `codex/ux-scan-01-context` vorhanden, kein erkennbares Folge-Produktergebnis gefunden
- **UI-REFRESH-04:** offen, seit UI-REFRESH-03 (24.04.2026) nicht fortgeführt — **nicht automatisch NOW**, kein Blocker
- **S3-BUILD-02:** optional/offen — Studienkompass-Hub `/studien`, kein Altauftrag, kein Hinweis auf Überholung durch neue Architekturentscheidung

---

### SUPABASE-KEEPALIVE — GitHub Actions Keepalive
**Status:** ✅ **VOLLSTÄNDIG ABGESCHLOSSEN (14.05.2026)**
**Letzter Stand:** `.github/workflows/supabase-keepalive.yml` via GitHub Web UI angelegt (Commit `2e8cad9`, „ops: add Supabase keepalive workflow (3x/week Mo/Mi/Fr, read-only anon)"). Secret `SUPABASE_ANON_KEY` gesetzt. Run #1 PASS: HTTP Status 200, „Keepalive erfolgreich — Supabase aktiv" (15s total, keepalive-Job 3s). Endpoint: `/rest/v1/laborwerte?select=loinc_code&limit=1`. Läuft automatisch Mo/Mi/Fr 08:00 UTC.
**DB-Write:** NEIN
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/S3_DB_WRITE_PLUS_KEEPALIVE_CLOSURE.md`** — **führend** (14.05.2026, vollständig)

**Strang formal geschlossen:** JA — kein weiterer Handlungsbedarf

---

### S3-APPROVAL-REVIEW-01 — ✅ ABGESCHLOSSEN (14.05.2026) → S3_APPROVAL_REVIEW_01_CLOSURE.md
**Status:** ✅ VOLLSTÄNDIG. 20 Rows approved/public. V14/14 PASS. Kein Code.

---

### S3-BUILD-01 — ✅ ABGESCHLOSSEN (14.05.2026, Commit `97f07e8`)

**Status:** ✅ VOLLSTÄNDIG. Block [15] auf 5 Pilot-Seiten live. StudienDetail.jsx. CSS s3-*. Netlify Auto-Deploy.
**Letzter Stand:** 20 Rows reviewed (14-Punkte-Prüfung je Row). 2 Repairs: Slug-Korrektur (haider-2013 → pena-rosas-2015) + studientyp/level-Fix (Camaschella: narrativer_review, level 4). Alle 20 Rows auf `curation_status = approved` / `visibility = public` gesetzt. anon SELECT = 20 Rows (HTTP 200). 14/14 Validatoren PASS. Kein Code, kein Commit, kein Deploy.
**DB-Write:** JA — 3 UPDATE-Statements in `studien`
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/S3_APPROVAL_REVIEW_01_CLOSURE.md`** — **führend** (14.05.2026)

**Nächste zulässige Schritte:** S3-BUILD-02 (Studien-Hub `/studien`, optional), S1-BUILD-02-Reconciliation, nächste B4-Welle neu spezifizieren, S8-BUILD-02d oder Q2-BUILD-02c-P2B — je eigenständiger Auftrag und explizite Freigabe.
**Strang formal geschlossen:** JA

---

### Q2-MAPPING-PATCH — Quellentyp-Mapping-Lücken
**Status:** ✅ **abgeschlossen (07.05.2026), Commit `27b3fb6`**
**Letzter Stand:** 2 JSX-Dateien, 0 CSS, 0 DB-Write. S5 `QUELLEN_TYP` in `KrankheitDetail.jsx` um `'research': { q2: 'research', label: 'Forschung', icon: '🔬' }` ergänzt — CSS-Modifier `krank-quellen-typchip--research` existierte bereits (Krankheiten.css Z.960, UI-REFRESH-02, violett-grau). S6 `MED_QUELLEN_TYP` in `MedikamentDetail.jsx` um `patient_info: { farbe: 'patient_info', label: 'Patienteninformation', icon: '📖' }` ergänzt — CSS-Modifier `med-quellenbox-typchip--patient_info` existierte bereits (Medikamente.css Z.845, teal). Exakt 3 Insertions, 1 Deletion. Option C (S2 Typ-Normalisierung) ausdrücklich nicht Scope.
**Letzter Commit:** `4e4990f` (Doku-Sync) / `27b3fb6` (Code) — auf `origin/main` (`fab4374..27b3fb6..4e4990f`)
**DB-Write:** NEIN
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/Q2_MAPPING_PATCH_CLOSURE.md`** — **führend** (07.05.2026)
- `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02A_S5_QUELLENBOX_CLOSURE.md` — S5-Basis
- `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02B_S6_QUELLENBOX_CLOSURE.md` — S6-Basis

**Nächste zulässige Schritte:** Q2-BUILD-02c-P2B, S8-BUILD-02d, UI-REFRESH-04, S1-BUILD-02-Reconciliation oder Spezifikation der nächsten B4-Welle (je eigenständiger Auftrag).
**Strang formal geschlossen:** JA

---

### UI-REFRESH-01 — CSS-only Brand/UX First Refresh
**Status:** ✅ **abgeschlossen (24.04.2026), Commit `54447ba`**
**Letzter Stand:** 7 CSS-Dateien, 0 JSX, 0 DB-Write. global.css: Instrument Serif aus h1/h2/h3-Pauschalregel entfernt (DM Sans ist jetzt default für alle Headings). Home.css: Eyebrow-Badge entfernt, Hero-Gradient auf #f5f9f7→var(--bg) abgemildert, Padding −24/−16px, Headline clamp 24–36px. Nav.css: Nav-Tagline ausgeblendet (Logo-Mark unberührt). Laborwerte.css + Supplements.css: Header-Gradienten entfernt, Listing-H1 = DM Sans 600, Detail-H1 = Instrument Serif explizit gesichert. Krankheiten.css: krank-title DM Sans 600 (kein Serif auf Listenseiten), krank-section-title lesbar (13px 600 var(--text), kein uppercase). Ernaehrung.css: ern-lm-hero Gradient entfernt.
**Letzter Commit:** `54447ba` (UI-REFRESH-01, 24.04.2026) — auf `origin/main`
**DB-Write:** NEIN
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/UI_REFRESH_01_CLOSURE.md`** — **führend** (24.04.2026)
- `01_PROJECT_SOURCES_CURRENT/BRAND_UX_REFRESH_SPEC.md` — Spec-Grundlage (bindend für alle weiteren Design-Entscheidungen)

**Strang formal geschlossen:** JA — UI-REFRESH-02 = Folgepaket

---

### UI-REFRESH-03 — Hierarchie & System-Klarheit
**Status:** ✅ **abgeschlossen (24.04.2026), Commit `f038e34`**
**Letzter Stand:** 3 CSS-Dateien, 0 JSX, 0 DB-Write. Ernaehrung.css: 5 Hero-/Detail-Header auf `var(--bg)` beruhigt (ern-hero, ern-detail-hero, ern-naehrstoff-hero, ern-zs-header), 3 Eyebrow-Badges `display:none` (ern-hero-label, ern-detail-label, ern-naehrstoff-label), 6 Serif-Elemente → DM Sans 600 (ern-hero-title, ern-section-title, ern-card-name, ern-block-title, ern-naehrstoff-gruppe-title, ern-zs-block-title), ern-zs-filter-chip--aktiv: primary-50 → solid primary (konsistenter Aktiv-Zustand). Detail-H1-Serif erhalten (ern-detail-title, ern-naehrstoff-title, ern-lm-hero-title, ern-zs-name). Medikamente.css: med-title Listing-H1 Serif → DM Sans 600 (deferriert aus REFRESH-01), med-section-title Serif 22px → DM Sans 600 16px, med-detail-name Serif erhalten. Laborwerte.css: detail-section-title uppercase/letter-spacing/text-muted bereinigt (analog supp-section-title REFRESH-02 + krank-section-title REFRESH-01). 22/22 Verifikations-Checks PASS.
**Letzter Commit:** `f038e34` (UI-REFRESH-03, 24.04.2026) — auf `origin/main`
**DB-Write:** NEIN
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/UI_REFRESH_03_CLOSURE.md`** — **führend** (24.04.2026)
- `01_PROJECT_SOURCES_CURRENT/BRAND_UX_REFRESH_SPEC.md` — Spec-Grundlage (bindend)

**Nächster zulässiger Schritt:** UI-REFRESH-04 (Detailseiten-Hierarchie Primär/Sekundär-Container, `var(--surface-2)` Sekundärblöcke — CSS + ggf. minimales JSX, eigenständiger Chat) — oder: Q2-BUILD-02b, S1-BUILD-02, S8-BUILD-02
**Strang formal geschlossen:** JA

---

### UI-REFRESH-02 — Chip-/Badge-Normalisierung
**Status:** ✅ **abgeschlossen (24.04.2026), Commit `f4600f0`**
**Letzter Stand:** 6 CSS-Dateien, 0 JSX, 0 DB-Write. 14 Crosslink-Chip-Klassen auf Typ-1-Standard: `background: var(--surface-2)`, `border: 1px solid var(--border)`, `color: var(--text-light)`; hover: primary-border/color/primary-50. Q2-research-Farbe: amber → violett-grau (#EEE9FF/#6B5CA5) in Krankheiten.css + Laborwerte.css. supp-section-title + krank-ern-sublabel: uppercase/letter-spacing entfernt. soon-tag: amber (accent-light/dark) → neutral (surface-2/text-muted). Kein Signal-Badge berührt. Spezialentscheid: `.ern-lm-ww-chip` bleibt blau (Signal überwiegt Crosslink-Aspekt). 0 Scope-Abweichungen.
**Letzter Commit:** `f4600f0` (UI-REFRESH-02, 24.04.2026) — auf `origin/main`
**DB-Write:** NEIN
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/UI_REFRESH_02_CLOSURE.md`** — **führend** (24.04.2026)
- `01_PROJECT_SOURCES_CURRENT/UI_REFRESH_01_CLOSURE.md` — Vorgänger
- `01_PROJECT_SOURCES_CURRENT/BRAND_UX_REFRESH_SPEC.md` — Spec-Grundlage (bindend)

**Nächster zulässiger Schritt:** UI-REFRESH-03 ✅ abgeschlossen (Commit `f038e34`)
**Offene Risiken:** NEIN
**Strang formal geschlossen:** JA

---

### BRAND-UX-REFRESH-SPEC — Design-Governance
**Status:** ✅ **Spec abgeschlossen (24.04.2026). UI-REFRESH-01 ✅ UI-REFRESH-02 ✅ UI-REFRESH-03 ✅ alle abgeschlossen.**
**Letzter Stand:** Alle drei Priority-Builds abgeschlossen. UI-REFRESH-04 = nächstes Paket (Detailseiten-Hierarchie: `var(--surface-2)`, Legacy-Tap-Targets krank-ebene-btn/panel-btn ≥40px).
**Letzter Commit:** `f038e34` (UI-REFRESH-03, 24.04.2026)
**DB-Write:** NEIN
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/BRAND_UX_REFRESH_SPEC.md`** — **führend für alle Design-Entscheidungen** (bindend für alle Pakete)
- `01_PROJECT_SOURCES_CURRENT/UI_REFRESH_03_CLOSURE.md` — letzter Build (24.04.2026)

**Strang formal geschlossen:** JA (Spec + UI-REFRESH-01+02+03); UI-REFRESH-04 = nächstes Paket

---

### S1 — Laborwert-Lexikon (Compare/Zielwert/Trend)
**Status:** ✅ **Q2-BUILD-02d abgeschlossen (07.05.2026)** — LwQuellenBox live
**Letzter Stand (Q2-BUILD-02d):** `LwQuellenBox`-Inline-Komponente in `LaborwertDetail.jsx` (vor `export default`). Datenquelle: `quellenKontext` aus `ref_de/usa/jp_quelle_url/_jahr`. Typ: database (DGKL/AACC/JSCC per S1-PRE-SPEC). Chip DATENBANK (slate), Region-Flag, Name-Link, Jahr. Max-2-Expand. Leer-Guard: 55 nicht-pilot LW → kein Block. Block [4b] vollständig ersetzt. 8 neue `lw-quellenbox-*` CSS-Klassen + Mobile-Breakpoint (Q6 ✅). Kein DB-Write, kein Schema-Change, kein queries.js-Touch. Schließt FULL_AUDIT_2026-05 Befund #3.
**Vorgänger (S1-BUILD-01c, 25.04.2026):** LDL Zielwert-Klarstellung. Commit `06c1176`.
**Letzter Commit:** `fab4374` (Q2-BUILD-02d, 07.05.2026) — auf `origin/main`
**DB-Write:** NEIN
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02D_S1_QUELLENBOX_CLOSURE.md`** — **führend** (07.05.2026)
- `01_PROJECT_SOURCES_CURRENT/S1_BUILD_01C_LDL_ZIELWERT_KLARSTELLUNG_CLOSURE.md` — Vorgänger
- `01_PROJECT_SOURCES_CURRENT/S1_BUILD_01B_LDL_MICROCOPY_CLOSURE.md` — Paket 1b
- `01_PROJECT_SOURCES_CURRENT/S1_BUILD_01_CLOSURE.md` — Zielwert-Block Foundation
- `01_PROJECT_SOURCES_CURRENT/S1_PRE_SPEC_COMPARE_ZIELWERT_TREND.md` — Spec-Grundlage

**Nächster zulässiger Schritt:** S1-BUILD-02 (Rollout auf alle 60 Werte, V2-Kontext Alter/Schwangerschaft, S1↔S5/S6-Crosslinks — nach expliziter Freigabe, eigenständiger Chat)
**Offene Risiken:** JSCC-Extraktion (JP-Referenzbereiche V2-Datenlücke) — Phase C, kein Build-Blocker
**Strang formal geschlossen:** NEIN — S1-BUILD-02+ ausstehend

---

### S6 — Medikamenten-Erklärer / Q2-BUILD-02b
**Status:** ✅ **Q2-BUILD-02b abgeschlossen (06.05.2026)**
**Letzter Stand:** MedQuellenBox-Komponente live in Block 6 von `MedikamentDetail.jsx`. `MED_QUELLEN_TYP`-Konstante + `getMedTypInfo()`-Helper + Inline-Komponente vor `export default`. Typ-Mapping: ema/bfarm→regulatory, openfda/atc/who_atc→database, guideline→guideline, research→research, Fallback→database. Max 2 sichtbar + „+ N weitere"-Button. Roh-Enum (`toUpperCase()`) vollständig entfernt. Leer-Guard: `if (!quellen || quellen.length === 0) return null`. Zulassungsinfos + Disclaimer-Blöcke textuell und funktional unverändert. S2 deferred (`supplements.quellen`-Feld nicht vorhanden). `med-quellenbox-*` CSS (132 Zeilen, 5 Farbvarianten, Mobile-Breakpoint 600px). 2 Dateien (MedikamentDetail.jsx +79/-16, Medikamente.css +132). Kein DB-Write, kein Schema-Change, kein queries.js-Touch, kein S5/S2-Touch.
**Letzter Commit:** `c4b70d7` (Q2-BUILD-02b, 06.05.2026) — auf `origin/main`
**DB-Write:** NEIN
**Letzte führende Dokumente:**
- **`Q2_BUILD_02B_S6_QUELLENBOX_CLOSURE.md`** — **führend** (06.05.2026)
- `S6_06_LM_HINWEISBLOCK_CLOSURE.md` — Vorgänger S6-06 (23.04.2026)
- `S6_05_GLOBAL_SEARCH_INTEGRATION_CLOSURE.md` — Globalsuche-Integration
- `S6_04_FILTER_UI_CLOSURE.md` — Filter-UI-Abschluss
- `S6_03_S5_TO_S6_CROSSLINK_CLOSURE.md` — Cross-Block-Abschluss
- `S6_02_CONTENT_IMPORT_CLOSURE.md` — Content-Import-Abschluss
- `S6_01_FOUNDATION_BUILD_CLOSURE.md` — Foundation Build
- `S6_SPEC_CLOSURE.md` — Spec-Grundlage
- `S6_FREEZE_CLOSURE.md` — Scope-Grundlage

**Nächster zulässiger Schritt:** S6-07 oder nächstes Säulenpaket — eigenständiger Chat
**Offene Risiken:** supp_interaktionen nur 19/50 Wirkstoffe befüllt (Slice-2-Task, kein Blocker)
**Strang formal geschlossen:** NEIN — S6-07+ ausstehend

---

### P7 / S4 — Arztbrief-Decoder
**Status:** ✅ Beta Freeze — P7-Strang formal geschlossen (20.04.2026)
**Letzter Stand:** Text-Paste + PDF-Text-Layer + OCR (Tesseract.js) + Client-seitige Anonymisierung (10-Block, ~18 Regex) + LLM-Dekodierung via Mistral-Proxy (stateless, ZDR bestätigt) + Sichere Ausgabe/UX (5-Felder, Schritt-Indikator, Trust-Frame).
**Letzter Commit:** `519f2d9` (P7-05, 20.04.2026) — auf `origin/main`
**DB-Write:** NEIN (P7 berührt Supabase nicht)
**Sicherheitsarchitektur eingefroren:** Client-Anon → Proxy → Mistral stateless. Kein Bypass. Verbotene Pfade: Cloud-OCR.
**Letzte führende Dokumente:**
- `P7_FINAL_FREEZE_CLOSURE.md` — Gesamt-Closure P7
- `P7_05_S4_SAFE_OUTPUT_UX_CLOSURE.md` — letztes Build-Paket
- `P7_04B_LLM_PROXY_BUILD_CLOSURE.md` — Proxy-Build
- `P7_03B_S4_ANONYMIZATION_BUILD_CLOSURE.md` — Anon-Worker
- `P7_04C_MISTRAL_ZDR_UNBLOCK_AND_PATH_FREEZE.md` — ZDR + Pfad-Freeze

**Nächster zulässiger Schritt:** P7-06 — separates Spec-Paket + explizite Freigabe zuerst
**Offene Risiken / Ausstehend:**
- ST-1a/b/c (P7-04d Performance < 20s) — Sebastian manuell, kein Blocker
- ST-P705-4 (P7-05 UX) — Sebastian manuell, kein Blocker
- Mistral DPA-Vertragsklausel — sinnvoller Compliance-Nachtrag, kein Build-Stopper
**Strang formal geschlossen:** JA — P7-Strang; zukünftige S4-Arbeit = P7-06 als neuer Strang

---

### S18 — Ernährungskompass
**Status:** ✅ Alle 4 Kernobjekte vollständig. ✅ **S18-Build-05 abgeschlossen (23.04.2026): Zusatzstoff-Kompass K8d live.**
**Letzter Stand:** `zusatzstoffe`-Tabelle (35 Rows, 7 Kategorien, RLS, 3 Indizes). Route `/ernaehrung/zusatzstoff/:slug`. 7-Block-Detailseite. Kategorie-Filter + Count-Badges. Leitplanken eingehalten: kein Alarmismus, keine Verharmlosung, kein Traffic-Light, mobile-first (V11 ✅). Crosslink-Entscheidung: keine Chip-Crosslinks in Build-05 (kein FK-Lookup möglich). 5 Dateien. V1–V12 alle GRÜN.
**Letzter Commit:** `9941a3f` (S18-Build-05, 23.04.2026) — auf `origin/main`
**DB-Write:** JA (35 Rows, Dashboard-JWT, 5 Batches)
**Letzte führende Dokumente:**
- **`S18_BUILD05_ZUSATZSTOFFE_CLOSURE.md`** — **führend** (23.04.2026)
- `S18_BUILD04_LEBENSMITTEL_CLOSURE.md` — inkl. Anhang S18-Build-04a
- `S18_BUILD_03_S5_TO_S18_CROSSLINK_CLOSURE.md` — S5→S18 Rücklinks
- `S18_BUILD_02_NAEHRSTOFFE_CLOSURE.md` — Nährstoff-Lexikon

**Nächster zulässiger Schritt:** S18-Querlinks (Zusatzstoffe→S5/S6, eigenständige Spec+Chat) oder S6-06 — eigenständiger Chat
**Offene Risiken:** NEIN (V1–V12 GRÜN, Q6 bestätigt)
**Strang formal geschlossen:** JA — alle 4 S18-Kernobjekte abgeschlossen; zukünftige Erweiterungen = neue Pakete

---

### P7D / Discovery / Architektur-Reset
**Status:** ✅ Architektur-Reset-Freeze abgeschlossen (18.04.2026). Discovery-Basis-Build live (19.04.2026).
**Letzter Stand:**
- Architecture Reset Freeze (P7D-01): führendes Strategiedokument, K1–K11 Kernobjekte, Q1–Q10 Querschichten, 5 externe Produktbereiche, Phasenlogik A–E
- Discovery-Basis-Build (P7D-02): Suche/Nav/Home verbessert, Commit `a32e877`
- UI-Polish S5 (P7D-02b): Commit `dea4c36`
- S3-Freeze (P7D-03): Studienkompass scope-scharf
- S18-Freeze+Reset (P7D-04/04a): S18 neu gefasst
- Phase-B-Vollaudit (P7D-05): Kanon-Reparatur abgeschlossen
**Letzte führende Dokumente:**
- `P7D_ARCHITECTURE_RESET_FREEZE.md` — **primäres Architektur-Dokument**
- `P7D_03_S3_FREEZE.md` — S3-Scope
- `P7D_S18_RESET_FREEZE.md` — S18-Scope

**Nächster zulässiger Schritt:** ✅ S3-CURATION-QUEUE-01-WRITE abgeschlossen (14.05.2026). 20 Rows in `studien` geschrieben (curation_status=review, visibility=draft, retraction_status=nicht_retracted, retraction_checked_at=2026-05-14). 9-Checkpoint Post-Write-Validation PASS. → **S3-BUILD-01** (erst nach expliziter Freigabe Sebastian: review→approved + draft→public für ≥20 Einträge + eigenständiger Chat).
**Strang formal geschlossen:** P7D-Strang JA (Phase-B-Architektur abgeschlossen)

---

### S5 — Krankheits-Lexikon (Crosslinks / Quellen)
**Status:** ✅ Live und abgeschlossen (P6b-Rest, 16.04.2026)
**Letzter Stand:** 221 Einträge. 216/221 echte Quellen. verwandte_laborwerte: 123, verwandte_supplements: 108. 5 dauerhaft intern (F06/L72/M13/R74/Z87). 0 Non-Standard-Typen.
**Letzte führende Dokumente:** `P6_FINAL_CLOSURE.md`, `P6B_REST_03_FINAL_CLOSURE.md`
**Nächster zulässiger Schritt:** Cross-Block-Ausbau vollständig (S6-03, S18-Build-03). Nächste S5-relevante Erweiterung: über zukünftige Säulen-Crosslinks (S18-Build-04, S6-06, etc.) — je eigenständiger Chat.
**Strang formal geschlossen:** JA (P6b abgeschlossen) — aber S5 erhält künftig Cross-Block-Updates

---

### S8 / B4 — Entscheidungslogik + B4 Actions (Laborwert-/Krankheitsseiten)
**Status:** ✅ **B4-BUILD-03 und B4-BUILD-04 Wave 1 abgeschlossen** — PR #31 (B4-BUILD-03) sowie PR #32/#33 (Wave-1-Kontext + Code) gemerged.
**Letzter belegter Stand:** B4-BUILD-03 migrierte die zuvor spezifizierten HbA1c/Ferritin/VitD/CRP-Actions. B4-BUILD-04 Wave 1 ergänzte sechs weitere Laborwerte. Der Abschluss ist über GitHub-PR-Historie belegt; die Karteninhalte wurden in diesem Docs-Closeout nicht erneut fachlich geprüft.
**Vorgänger:** B4-BUILD-03_SPEC (10.06.2026), B4-SAFETY-PATCH (07.05.2026), B4-BUILD-02 LDL-Journey (25.04.2026).
**DB-Write:** NEIN
**Belegquellen:**
- GitHub PR #31 — B4-BUILD-03
- GitHub PR #32 — Codex-Kontext für B4-BUILD-04 Wave 1
- GitHub PR #33 — B4-BUILD-04 Wave-1-Code
- `01_PROJECT_SOURCES_CURRENT/B4_BUILD_03_SPEC.md` — historische Spec-Grundlage
- `01_PROJECT_SOURCES_CURRENT/B4_DECISION_LOGIC_FREEZE.md` — bindende Entscheidungslogik

**Nächster zulässiger Schritt:** **nächste B4-Welle neu spezifizieren** — kein belastbarer Altauftrag für Wave 2 gefunden; nicht aus alten Chats rekonstruieren.
**Strang formal geschlossen:** JA für B4-BUILD-03 und B4-BUILD-04 Wave 1; neue Welle ist ein eigener zukünftiger Strang.

---

### Q2 — Vertrauens-/Quellen-Layer (Querschicht)
**Status:** ✅ **Q2-BUILD-02c abgeschlossen (06.05.2026)** ✅ **Q2-BUILD-02c-P2A abgeschlossen (06.05.2026)**
**Letzter Stand (Q2-BUILD-02d):** S1 LwQuellenBox live. `LwQuellenBox`-Inline-Komponente in `LaborwertDetail.jsx`. Typ: database. Region-Flag + Name-Link + Jahr. Max-2-Expand. Leer-Guard. 2 Dateien, kein DB-Write. Commit `fab4374`. Schließt FULL_AUDIT_2026-05 Befund #3.
**Vorgänger (Q2-BUILD-02c-P2A, 06.05.2026):** 10 NIH-ODS-Importlücken geschlossen. DB: 31/51 Supplements mit quellen.
**Vorgänger (Q2-BUILD-02c, 06.05.2026):** S2 QuellenBox live. DB-Write: JA. Commit `2e1223d`.
**Letzter Commit:** `fab4374` (Q2-BUILD-02d, 07.05.2026) — auf `origin/main`
**DB-Write:** NEIN (Q2-BUILD-02d); JA (Q2-BUILD-02c: ALTER TABLE + 31 UPDATE-Rows gesamt)
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02D_S1_QUELLENBOX_CLOSURE.md`** — **führend** (07.05.2026)
- `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02C_P2A_NIH_ODS_TOP10_CLOSURE.md` — P2A-Vorgänger
- `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02C_S2_QUELLENBOX_CLOSURE.md` — Q2-BUILD-02c-Vorgänger
- `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02B_S6_QUELLENBOX_CLOSURE.md` — S6-Vorgänger
- `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02A_S5_QUELLENBOX_CLOSURE.md` — S5-Vorgänger
- `01_PROJECT_SOURCES_CURRENT/Q2_TRUST_SOURCE_PRE_SPEC.md` — Pre-Spec-Grundlage

**Nächster zulässiger Schritt:** Q2-BUILD-02c-P2B (5× NCCIH: Melatonin/Echinacea/Ginkgo/Mariendistel/Rhodiola, eigenständiger Chat) oder Q2-BUILD-03 (`review_typ`/`quellen_konflikt`-Schema)
**Offene Risiken:** 20 Supplements ohne quellen (10 P3 = kein E28-Link; 5 P2-Kandidaten; 5 NCCIH). feedback@vitalwissen.de → reale Adresse (kein Build-Blocker).
**Strang formal geschlossen:** NEIN — Q2-BUILD-03 ausstehend

---

---

### S9 — Health Data Hub / Mein Gesundheitsavatar
**Status:** ✅ **S9-HEALTH-AVATAR-CONTEXT-FREEZE abgeschlossen (13.05.2026)**
**Letzter Stand:** Read-only Strategie-Freeze. 20 Sektionen. Alle 19 ZK-Fragen beantwortet. Profiltypen P1–P6 (Eigenprofil, Kind, Eltern/Betreute/Partner, Temporär), Einwilligungsmodell LB-0–LB-3 mit Consent-Flow + Widerruf-Token, Datenhaltungsmodell (server E2E AES-256 DE/EU für P1–P5, sessionStorage für P6), Update-Typen U1–U5 (Leitlinie/Zielwert/Studie/Zulassung/Interaktion) mit Avatar-Relevanz-Check + Priorisierungsmatrix, KI-Grenze (Klasse 3–5 nur opt-in pro Session, Klasse 4 = strukturell blockiert), S4-Isolation (kein automatischer Avatar-Write), Q4/Q5 Phase-C-Anschluss, Q7 opt-in client-seitig, Q9 Phase-D/E API-Anbindung, DSGVO Art. 9 Rechtsgrundlagen, Phasierung, 4 Blocker (B1 AVV Supabase, B2 S9-DSE Rechtsanwalt, B3 Key-Management-Spec, B4 FHIR-Bibliothek), 12 No-Gos.
KI-Prompt-Export (Modus 3a) = Phase-C-Feature ohne S9 spezifiziert.
**Kein Code. Kein DB-Write. Kein Commit. Kein Deploy.**
**Letzte führende Dokumente:**
- **`01_PROJECT_SOURCES_CURRENT/S9_HEALTH_AVATAR_CONTEXT_FREEZE.md`** — **führend** (13.05.2026)
- `01_PROJECT_SOURCES_CURRENT/AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md` — Basis-Strategie

**Nächste zulässige Schritte (in dieser Reihenfolge):**
1. **S3 Live-Verifikation + Retraction-Check + DB-Write** — eigenständiger Chat, explizite Freigabe von Sebastian (unmittelbar nächster Schritt — Curation-Matrix ist bereit)
2. Phase-C-Pakete: Q5 Basis-Watchlists, Q4 Update-Layer, KI-Prompt-Export (je eigenständiger Chat)
3. Phase-D-Vorbereitung: B1–B4 schließen (AVV, DSE, Key-Mgmt, FHIR)
4. S9-Build: erst wenn B1–B4 alle geschlossen
**Strang formal geschlossen:** JA (Freeze only) — Build = neuer Strang

---

## 3. HEUTE / ZULETZT BEWEGTE PAKETE (14.05.2026)

**S3-CURATION-QUEUE-01-WRITE — 20 Rows in `studien` geschrieben (14.05.2026 — aktuelles Paket):**
- DB-Write: JA (20 Rows, Dashboard-JWT, 5 Batches × 4 Einträge). Schema-Change: NEIN. Code: NEIN. Commit: NEIN. Deploy: NEIN.
- Output: `01_PROJECT_SOURCES_CURRENT/S3_CURATION_QUEUE_01_LIVE_VERIFY_REPAIR_CLOSURE.md`
- Alle 20 Rows: `curation_status='review'`, `visibility='draft'`, `retraction_status='nicht_retracted'`, `retraction_checked_at='2026-05-14'`. Alle PMIDs/DOIs live-verifiziert. Retraction-Status geprüft.
- Enum-Substitutionen dokumentiert: `candidate`→`review`, `private`→`draft`, `not_retracted`→`nicht_retracted` (tatsächliche DB-Enum-Werte differ vom Curation-Spec).
- RLS-Verifikation: anon key → 0 Rows ✅ (korrekt — nur `approved`+`public` sichtbar).
- 9-Checkpoint Post-Write-Validation: alle PASS. Closure-Dokument Phase F vollständig.

**S3-CURATION-QUEUE-01 — 20 K6-Kandidaten kuratiert (13.05.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN. Code: NEIN. Commit: NEIN. Deploy: NEIN.
- Output: `01_PROJECT_SOURCES_CURRENT/S3_CURATION_QUEUE_01_CLOSURE.md`
- 20 Kandidaten: 5 Cluster × 4 (I10/E11/F32/E03/D50). Alle Pflichtfelder befüllt. Hype-Guardrails PASS. 2 `hype_warnung`-Einträge (F32-04, E03-04).

**S9-HEALTH-AVATAR-CONTEXT-FREEZE — Strategie-Freeze Mein Gesundheitsavatar (13.05.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN. Code: NEIN. Commit: NEIN. Deploy: NEIN.
- Output: `01_PROJECT_SOURCES_CURRENT/S9_HEALTH_AVATAR_CONTEXT_FREEZE.md` (20 Sektionen, alle 19 ZK-Fragen geschlossen)

**S3-SCHEMA-MIGRATION-APPLY — `studien`-Tabelle live (13.05.2026 — Vorgänger-Paket):**
- DB-Write: JA (Schema-Only: CREATE TYPE ×3, CREATE TABLE, 14 Indexes, CREATE FUNCTION, CREATE TRIGGER, CREATE POLICY). Kein Content-Write, kein Commit, kein Deploy.
- SQL: `sql/s3_k6_research_entries_preflight.sql` (393 Z., in 6 Sektionen angewendet). Alle Sektionen → `[]` (Supabase SQL API Erfolg).
- ENUMs erstellt: `studientyp_enum` (7 Werte), `curation_status_enum` (5 Werte), `retraction_status_enum` (3 Werte).
- Tabelle `studien`: 46 Felder. 16 Indexes (14 explizit + 2 auto für PK + UNIQUE slug). Trigger `studien_update_timestamp`. RLS aktiv, Policy `anon_read_approved_public` (SELECT-only, anon, USING(`visibility='public' AND curation_status='approved'`)).
- Gate-K.4-Constraint `approved_requires_not_retracted`: direkt in `pg_constraint` verifiziert ✅.
- D1-Validator (RLS-SELECT): HTTP 200, 0 Rows ✅. D2 (RLS-INSERT): HTTP 401 + code 42501 ✅. D3 (Indexes): 16 total ✅. D4 (Constraint): `pg_constraint` hit ✅.
- Alle 8 bestehenden Tabellen unverändert nach Apply ✅.
- 13/13 Akzeptanzkriterien PASS ✅.
- Output: `01_PROJECT_SOURCES_CURRENT/S3_SCHEMA_MIGRATION_APPLY_CLOSURE.md`

**Q2-BUILD-02d — S1 LwQuellenBox Rollout (07.05.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN. queries.js: NEIN. S2/S5/S6: NEIN.
- Code: `src/pages/LaborwertDetail.jsx` (LwQuellenBox-Komponente inline + Block [4b] ersetzt). `src/pages/Laborwerte.css` (+~35 Zeilen `lw-quellenbox-*` + Mobile-Breakpoint).
- Commit: `fab4374`. Push: `origin/main` (`8f19256..fab4374`). Netlify Auto-Deploy ausgelöst.
- Live-Checks: V1 HbA1c (3 Quellen, max-2, Expand) ✅, V2 Expand-Button ✅, V3 Leer-Guard GPT/1742-6 ✅.
- Schließt: FULL_AUDIT_2026-05 Befund #3 (S1 ohne QuellenBox) — alle 3 Befunde des Vollaudits nun geschlossen.

**B4-SAFETY-PATCH — safetyLevel + requiresDoctorDiscussion für HbA1c/Ferritin/VitD/CRP (07.05.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN. JSX: NEIN. CSS: NEIN.
- Code: `src/lib/laborwert_b4_actions_map.js` (1 Datei, 36 Insertions, 0 Deletions) — 4 LOINC-Blöcke (4548-4/2276-4/14635-7/1988-5), 18 Karten. LDL-Block (2089-1) unberührt.
- Commit: `8f19256`. Push: `origin/main` (`846ce99..8f19256`). Netlify Auto-Deploy ausgelöst.
- Schließt: FULL_AUDIT_2026-05 Befund #2 (KRITISCH-MED). Entsperrt: B4-BUILD-03.

**Q2-BUILD-02c-P2A NIH-ODS Top-10 Quellenlücken (06.05.2026 — Vorgänger-Paket):**
- DB-Write: JA — UPDATE 10 Rows (nih_ods_link + quellen für B1/B2/B3/B5/Biotin/Kalium/Chrom/Kupfer/Mangan/L-Carnitin), Dashboard-JWT. Schema-Change: NEIN (quellen JSONB bereits vorhanden). Code: NEIN. Commit: NEIN. Deploy: NEIN.
- Preflight: 6/6 Hard-Stop-Prüfungen PASS. typ-Entscheidung: "NIH ODS" (Klartext, konsistent mit bestehenden 21 Einträgen). RETURNING: 10 Rows, alle quellen_count=1, alle url_check=nih_ods_link.
- V1–V8 alle ✅. DB: 31/51 supplements mit quellen.
- Output: `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02C_P2A_NIH_ODS_TOP10_CLOSURE.md`

**Q2-BUILD-02c S2 QuellenBox (06.05.2026 — Vorgänger-Paket):**
- DB-Write: JA (ALTER TABLE supplements ADD COLUMN quellen JSONB DEFAULT '[]' + UPDATE 21 Rows via NIH-ODS-Bootstrap, Dashboard-JWT). Schema-Change: JA. queries.js: NEIN (select('*') holt quellen automatisch). S5/S6: NEIN.
- Code: `src/pages/SupplementDetail.jsx` (+57/-2: Q2_TYP_INFO + SuppQuellenBox-Komponente + Block [10b] Quellengrundlage + PubMed-Key-Fix pmid/pubmed_id). `src/pages/Supplements.css` (+133: supp-quellenbox-* CSS, 5 Farbvarianten, Mobile-Breakpoint 600px, Tap-Targets ≥ 44px). `database/schema.sql` (+3: quellen JSONB DEFAULT '[]' im supplements-Block). Build: 126 Module, 0 Fehler.
- Commit: `2e1223d`. Push: `origin/main` (`c4b70d7..2e1223d`). Netlify Auto-Deploy ausgelöst.
- V1–V6 alle ✅.

**B4-DECISION-LOGIC-FREEZE-PATCH-01 Schärfungs-Patches auf B4-Freeze (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN. Code: NEIN. Commit: NEIN. Deploy: NEIN.
- Output: `01_PROJECT_SOURCES_CURRENT/B4_DECISION_LOGIC_FREEZE.md` (in-place gepatcht, 5 Patches auf §5/§6/§8/§10/§12 + OPS §F)
- Patches: §6.2 Kontextpflicht-Regel (3 Pflichtantworten), §8.5 whyShown-Pflicht-Sichtbarkeit, §5.1+§5.9 UI-Label evidenceMaturity, §10.1 LDL risikobasiert ESC/EAS 2021, §12 Paket 1b eingefügt
- Phase A: Audit (B4_DECISION_LOGIC_FREEZE.md + S1-PRE-SPEC gelesen) ✅. Phase B: 5 Patches + §F OPS ✅. Phase C: Doppelpflege CLAUDE.md + VW_03_STATUS.md + AUDIT_CANON_CURRENT.md + ACTIVE_STRANDS_CURRENT.md ✅.

**B4-DECISION-LOGIC-FREEZE Vollständige B4-Entscheidungslogik (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN. Code: NEIN. Commit: NEIN. Deploy: NEIN.
- Output: `01_PROJECT_SOURCES_CURRENT/B4_DECISION_LOGIC_FREEZE.md` (Freeze, read-only, 13 Sektionen)
- Inhalt: 8 Maßnahmenkategorien, 6 Evidenz-Reifegrade, 15-Feld-Pflichtschema, Sicherheitslogik, 7 UI-Gruppen-Reihenfolge, 12 No-Gos, 5 Lehrbeispiele, 6-Paket-Build-Roadmap
- Phase A: Audit (9+ Quelldokumente gelesen) ✅. Phase B: Freeze erstellt ✅. Phase C: Doppelpflege CLAUDE.md + VW_03_STATUS.md + AUDIT_CANON_CURRENT.md + ACTIVE_STRANDS_CURRENT.md ✅.

**S8-BUILD-03 B4 Actions Block „Was kann ich konkret tun?" (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN.
- Code: `src/lib/laborwert_b4_actions_map.js` (NEU, 421 Z. — 5 LOINC-Einträge, 23 Karten), `LaborwertDetail.jsx` (+89 Z. — B4ActionsBlock + Import + Block [12b]), `Laborwerte.css` (+212 Z. — `lw-b4a-*` CSS-Block, 20 Klassen)
- Commit: `7ca9751`. Push: `origin/main`. Netlify Auto-Deploy ausgelöst.
- 12/12 Validatoren PASS.

**S8-BUILD-02c K3/B4 Einordnung-Rollout 15 weitere Laborwerte (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN. JSX: NEIN. CSS: NEIN.
- Code: `src/lib/laborwert_k3_map.js` (+478 Z. — 15 neue LOINC-Keys, ~57 Karten gesamt, 20 LW). Build 0 Fehler (125 Module).
- Commit: `f5625d7`. Push: `origin/main`. Netlify Auto-Deploy ausgelöst.
- 10/10 Validatoren PASS. Kalium + Natrium → S8-BUILD-02d.

**S8-BUILD-02b Slug-Fallback + CSS-Cleanup (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN.
- Code: `LaborwertDetail.jsx` (Slug-Fallback: `loincCode || slug || null`, slug-Prop), `Laborwerte.css` (`border-top` → `margin-top: 8px`).
- Commit: `9fc9272`. Push: `origin/main`. Netlify Auto-Deploy ausgelöst.

**S8-BUILD-02-FIX EinordnungBlock Position-Fix (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN.
- Code: `LaborwertDetail.jsx` (+1 Z. — EinordnungBlock-Position vor Ursachen). LOINC-Codes Bilirubin (1975-2) + CRP (1988-5) DB-verifiziert.
- Commit: `8167ac1`. Push: `origin/main`. Netlify Auto-Deploy ausgelöst.

**S8-BUILD-02 Einordnung des Wertes — B4/K3 (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN.
- Code: `src/lib/laborwert_k3_map.js` (NEU, 5 LOINC-Einträge, 17 Karten), `LaborwertDetail.jsx` (+110 Z. — EinordnungBlock + Import), `Laborwerte.css` (+65 Z. — `lw-einordnung-*`)
- Commit: `b7f6d91`. Push: `origin/main`.

**UI-REFRESH-02 Chip-/Badge-Normalisierung (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. JSX: NEIN. Schema: NEIN.
- Code: 6 CSS-Dateien: Krankheiten.css (5 Crosslink-Chips + research-Farbe + ern-sublabel), Supplements.css (zusammenhaenge-chip + supp-section-title), Laborwerte.css (lw-quelle-typ-research → violett-grau), Medikamente.css (med-crosslink-chip--lm + med-indikation-chip), Ernaehrung.css (ern-chip, ern-naehrstoff-chip, ern-lm-erkrankungs-chip, ern-lm-mikro-chip--linked, ern-lm-kategorie-badge), Nav.css (soon-tag).
- Commit: `f4600f0`. Push: `origin/main`. Netlify Auto-Deploy ausgelöst.
- Phase A: Audit aller CSS-Dateien aus HEAD `54447ba` ✅. Phase B+C: Python-Skript, 18 Ersetzungen, 0 Scope-Abweichungen ✅. Phase D: Closure + Commit + Push ✅.

**BRAND-UX-REFRESH-SPEC Design-Governance (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Code: NEIN. Commit: NEIN. Deploy: NEIN.
- Output: `01_PROJECT_SOURCES_CURRENT/BRAND_UX_REFRESH_SPEC.md` (Spec, read-only). Audit 8 Befunde, 5 Kernentscheidungen (B1–B5), 11 CSS-Spec-Blöcke, 12 No-Gos.
- Phase A: CSS-Audit live (global.css + Nav.css + Home.css + Footer.css + Krankheiten.css + Laborwerte.css + Supplements.css) + Kanon-Dokumente gelesen ✅. Phase B: Spec erstellt ✅. Phase C: Doppelpflege ✅.

**S1-BUILD-01 Zielwert-Block V3 + Quellenkontext (24.04.2026 — Vorgänger-Paket):**
- DB-Write: JA — ALTER TABLE laborwerte (8 Felder) + UPDATE 5 Pilot-Werte (Dashboard-JWT, 5 Batches)
- Code: `LaborwertDetail.jsx` (+173 / -20 Z. — ZielwertBlock-Komponente + Quellenkontext + ref-Erweiterung), `Laborwerte.css` (+263 Z. — lw-zt-* + lw-quellenkontext-* + Mobile-fix)
- Commit: `4ea4290`. Push: `origin/main`. Netlify Auto-Deploy ausgelöst.
- Phase A: Pilot-Werte verifikation (6 in DB, eGFR direkt vorhanden), Schema-Audit, UI-Audit, ZT-Typ-Entscheidung ✅. Phase B: ALTER TABLE + 5 UPDATEs + Frontend + CSS-Audit 29/29+6/6 + Commit + Push ✅. Phase C: S1_BUILD_01_CLOSURE.md + Doppelpflege ✅.

**S1-PRE-SPEC Compare/Zielwert/Trend (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN. Code: NEIN. Commit: NEIN. Deploy: NEIN.
- Output: `01_PROJECT_SOURCES_CURRENT/S1_PRE_SPEC_COMPARE_ZIELWERT_TREND.md` (Pre-Spec, read-only)

**Q2-BUILD-02a S5 Quellenbox-Komponente (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN.
- Code: `KrankheitDetail.jsx` (QuellenBox Inline-Komponente + TYP_MAP + Block [16] Ersatz), `Krankheiten.css` (+129 Z. — krank-quellenbox-* + 5 Chip-Farb-Modifier + Mobile-Breakpoint)
- Commit: `6a9fde7`. Push: `origin/main`. Netlify Auto-Deploy AN.
- Phase A: quellen-JSONB-Audit + CSS-Farben-Verifikation + Repo-Clone frisch ✅. Phase B: QuellenBox + TYP_MAP + CSS + Build grün + CSS-Audit ✅. Phase C: Closure + V1–V12 + Doppelpflege ✅.

**Q2-BUILD-01 Globale Vertrauensseite (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN.
- Code: `Vertrauen.jsx` (NEU, 316 Z.), `Vertrauen.css` (NEU, q2-*), `App.jsx` (+2 Z.), `Footer.jsx` (+2 Z.), `Footer.css` (+14 Z.)
- Commit: `e3b5617`. Push: `origin/main`. Netlify Auto-Deploy AN.
- Phase A: Repo-Audit + Entscheidung Footer-Link ✅. Phase B: 7 Blöcke + 5 Quellentypen + CSS-Audit + Build grün ✅. Phase C: Closure + V1–V12 + Doppelpflege ✅.

**Q2-PRE-SPEC Vertrauens-/Quellen-Layer (24.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Code: NEIN. Commit: NEIN. Deploy: NEIN.
- Output: `01_PROJECT_SOURCES_CURRENT/Q2_TRUST_SOURCE_PRE_SPEC.md` (Pre-Spec, read-only)

**S8-BUILD-01 B4 Nächste-Schritte-Block (23.04.2026 — Vorgänger-Paket):**
- DB-Write: JA — ALTER TABLE + 5 UPDATEs `naechste_schritte` JSONB (Dashboard-JWT + SQL-API)
- Code: `KrankheitDetail.jsx` (+140 Z. — B4OptionCard + Block [14] + State), `Krankheiten.css` (+274 Z. — 30 `b4-*` Klassen)
- Commit: `bcda9bf`. Push `origin/main`. Netlify Auto-Deploy AN.
- Phase A: Audit ✅. Phase B: DB-Schema + 5 Krankheiten + CSS-Audit + V1–V12 PASS ✅. Phase C: Closure + Doppelpflege ✅.

**S6-06 Lebensmittel-Hinweisblock (23.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Schema-Change: NEIN.
- Code: `queries.js` (+20 Z.), `MedikamentDetail.jsx` (+28 Z.), `Medikamente.css` (+19 Z.)
- Commit: `8bf2145`. Push `origin/main`. Netlify Auto-Deploy AN.
- Phase A: Audit ✅. Phase B: Build + CSS-Audit + V1–V12 ✅. Phase C: Closure + Doppelpflege ✅.

**S18-Build-05 Zusatzstoff-Kompass K8d (23.04.2026 — Vorgänger-Paket):**
- DB-Write: JA — `zusatzstoffe` 35 Rows (Migration + 5 Batches, Dashboard-JWT)
- Code: `ErnaehrungZusatzstoffDetail.jsx` (NEU), `ErnaehrungListe.jsx`, `Ernaehrung.css`, `App.jsx`, `queries.js` (2 Funktionen)
- Commit: `9941a3f`. Push `origin/main`. Netlify Auto-Deploy AN.
- Phase A: Audit ✅. Phase B: DB-Migration + 5 Batches + CSS-Audit 42/42 + V1–V12 ✅. Phase C: Closure + Doppelpflege ✅.

**S18-Build-04a Mobile-first Verification + Minimal Polish (23.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN
- Code: `Ernaehrung.css` (4 Zeilen im Mobile-Breakpoint — tap-target fixes)
- Commit: `13f7b8b`. Push `origin/main`. Netlify Auto-Deploy AN.

**S18-Build-04 Lebensmittel-Kompass K8b (23.04.2026 — Vorgänger-Paket):**
- DB-Write: JA — `lebensmittel` 24 Rows (3 Batches, jsonb_to_recordset, Dashboard-JWT)
- Code: `ErnaehrungLebensmittelDetail.jsx` (NEU), `ErnaehrungListe.jsx`, `Ernaehrung.css`, `App.jsx`, `queries.js` (4 Funktionen), `KrankheitDetail.jsx` (Block [13] + LM-Chips), `Krankheiten.css`
- Commit: `84c8fdb`. V1–V11 bestanden.

**S6-05 Globalsuche-Integration (22.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Code: `queries.js` + `Home.jsx`. Commit: `5c8f537`.
- `S6_05_GLOBAL_SEARCH_INTEGRATION_CLOSURE.md` erstellt.

**S18-BUILD-03 S5→S18 Cross-Block (22.04.2026 — Vorgänger-Paket):**
- DB-Write: NEIN. Code: `queries.js` + `KrankheitDetail.jsx` + `Krankheiten.css`. Commit: `ac130b0`.
- `S18_BUILD_03_S5_TO_S18_CROSSLINK_CLOSURE.md` erstellt.

---

## 4. OPS / PERSISTENZLAGE (historische Basis 13.05.2026; GitHub-Baseline aktualisiert 04.07.2026)

| Dimension | Status |
|-----------|--------|
| GitHub-Baseline vor Closeout | `ce9de2607c43ec38a022162e730a815a8875d766` — Merge PR #36 (04.07.2026); kein dauerhaft aktueller HEAD nach Merge dieses Closeout-PRs |
| Netlify | Auto-Publishing AN — letzter Build-Deploy `main@fab4374` — kein neues Deploy heute |
| Supabase DB | **`studien` 20** (S3-CURATION-QUEUE-01-WRITE, 14.05.2026 — curation_status=review, visibility=draft), `zusatzstoffe` 35, `lebensmittel` 24, `wirkstoffe` 50, `krankheiten` 221 (+`naechste_schritte` JSONB: 5 befüllt), **`laborwerte` 60 (+8 Felder, 5 mit `zielwerte`)**, **`supplements` 51 (+`quellen` JSONB: 31/51 mit NIH-ODS-Quellen)**, `ernaehrungsmuster` 4, `naehrstoffe` 41 |
| MISTRAL_API_KEY | in Netlify gesetzt (Production, S4-Proxy aktiv) |
| DB-Write heute (S3-CURATION-QUEUE-01-WRITE) | JA — 20 Content-Rows in `studien`, Dashboard-JWT, 5 Batches × 4, dokumentiert in `S3_CURATION_QUEUE_01_LIVE_VERIFY_REPAIR_CLOSURE.md` |
| Offener Side Effect | NEIN |
| Uncommitted Changes | NEIN |

**Dokumentierte Ausnahmen (DB-Writes ohne Commit):**
S18-Build-04: `lebensmittel` 24 Rows via Dashboard-JWT + Chrome MCP (3 Batches), kein eigener DB-Commit — dokumentiert in `S18_BUILD04_LEBENSMITTEL_CLOSURE.md`.
S6-04: `wirkstoffe.filter_tags` 4 Rows via Dashboard-JWT — dokumentiert in `S6_04_FILTER_UI_CLOSURE.md`.
S18-Build-02b: `naehrstoffe` 9 Pflanzenstoffe JSONB-Normalisierung — dokumentiert in `S18_BUILD_02B_SCHEMA_NORMALIZATION_CLOSURE.md`.
S18-Build-02: `naehrstoffe` 41 Rows — dokumentiert in `S18_BUILD_02_NAEHRSTOFFE_CLOSURE.md`.
S6-02: 50 wirkstoffe — dokumentiert in `S6_02_CONTENT_IMPORT_CLOSURE.md`.
VW-AUDIT-18A: `supplements.kategorie` Encoding-Fix — dokumentiert in `VW_AUDIT_18A_DEMO_READINESS_FIX_CLOSURE.md`.
S2-02A: `supplements.wofuer` (21 Rows) — dokumentiert in `S2_02A_DEMO_READINESS_CONTENT_REPAIR_CLOSURE.md`.
Alle Supabase-Writes in diesem Projekt via Dashboard-JWT (RLS verhindert anon-Write).

---

## 5. NÄCHSTE ZULÄSSIGE SCHRITTE

Nur echte, aktuell freigegebene nächste Schritte (keine Ideenliste):

| Schritt | Paketname | Voraussetzung | Prio |
|---------|-----------|---------------|------|
| Q2 Quellenbox S2 P2B — NCCIH | **Q2-BUILD-02c-P2B** | Q2-BUILD-02c-P2A ✅ abgeschlossen (06.05.2026) — 5× NCCIH: Melatonin/Echinacea/Ginkgo/Mariendistel/Rhodiola, DB-only, eigenständiger Chat | NIEDRIG |
| Brand/UX Refresh Detailseiten-Hierarchie | **UI-REFRESH-04** | UI-REFRESH-03 ✅ abgeschlossen (24.04.2026) — Detailseiten Primär/Sekundär-Container `var(--surface-2)`, eigenständiger Chat | MITTEL |
| S1 Zielwert-Rollout + V2-Kontext | **S1-BUILD-02** | S1-BUILD-01 ✅ abgeschlossen (24.04.2026) — Rollout auf alle 60 Werte, V2-Kontext Alter/Schwangerschaft, S1↔S5/S6-Crosslinks, eigenständiger Chat | MITTEL |
| S6 weiterer Ausbau | **S6-07** | Eigenständiger Chat — S6-06 + Q2-BUILD-02b + Q2-BUILD-02d abgeschlossen ✅ | MITTEL |
| S18 Querlinks / neues Paket | **S18-nächstes** | Eigenständiger Chat — alle 4 Kernobjekte abgeschlossen ✅ | MITTEL |
| Nächste B4-Welle (unspezifiziert) | **B4-BUILD-WAVE-2-SPEC** | B4-BUILD-03 ✅ + B4-BUILD-04 Wave 1 ✅ beide abgeschlossen (PR #31, #32, #33) — kein Altauftrag für Wave 2 gefunden, neu zu planen, eigenständiger Chat | MITTEL |
| S8 B4/K3 Rollout Kalium/Natrium | **S8-BUILD-02d** | S8-BUILD-02c ✅ abgeschlossen — Kalium (2823-3) + Natrium (2951-2) in K3-Map ergänzen, eigenständiger Chat | NIEDRIG |
| S4 weitere Features | **P7-06** | Separates Spec-Paket + explizite Freigabe zuerst | NIEDRIG |
| S3-Content-Freigabe | **S3-APPROVAL-REVIEW-01** | ✅ abgeschlossen (14.05.2026) — 20/20 Rows approved/public, 14/14 Validatoren PASS | — (erledigt) |
| S3 BUILD | **S3-BUILD-01** | ✅ abgeschlossen (14.05.2026, Commit `97f07e8`) — Block [15] live auf 5 Pilot-Seiten | — (erledigt) |
| S3-BUILD-02 (optionaler Studien-Hub `/studien`) | **S3-BUILD-02** | S3-BUILD-01 ✅ abgeschlossen und live (14.05.2026, Commit `97f07e8`) — optional, kein Altauftrag, nicht dringend, eigenständiger Chat nach expliziter Freigabe | NIEDRIG |
| PR #8 schliessen + Branch-Cleanup | **PR8-AND-BRANCH-CLEANUP** | Kein Code-Risiko, jederzeit trivial erledigbar — Sebastian oder ChatGPT (kleine GitHub-Aktion), separat, kein PR nötig | HOCH |
| `UX_SCAN_01`-Status klären | **UX-SCAN-01-KLAERUNG** | Sebastian-Entscheidung (abgeschlossen / ruhend / verwaist), danach ggf. Cowork-Archivierung | NIEDRIG |

**S6-07-Kandidaten (nicht beauftragt):** S2→S6 Cross-Block (Supplement-Chips auf SupplementDetail.jsx), S6-Filter-Erweiterungen, S1→S6 Cross-Block (Laborwerte → Wirkstoffe — aufwändiges LOINC-Mapping).

---

## 6. PFLEGE-REGEL

**Standardannahme: Diese Datei muss bei jedem Paket mitgepflegt werden.**

Was bei jedem Paket-Abschluss zu prüfen ist:
1. Strang-Status in §2 aktualisieren (letzter Stand, Commit, DB-Write)
2. §3 (Heute bewegte Pakete) auf neues Paket setzen
3. §4 (Ops-Lage) auf aktuellen Stand bringen
4. §5 (Nächste Schritte) bereinigen — abgeschlossene Schritte entfernen, neue ergänzen
5. Gleichzeitig `AUDIT_CANON_CURRENT.md` nachziehen (mindestens §3 DB-Stand + §7 Hauptstränge)

Nur wenn ausnahmsweise nicht nötig: explizit begründen.

---

*Erstellt: 21.04.2026 — Kanon-Doppelpflege-Paket*
*Aktualisiert: 22.04.2026 — S18-Build-02b: Schema-Hardening abgeschlossen. Commit `c60f47a`.*
*Aktualisiert: 22.04.2026 — S6-04: Filter-UI abgeschlossen. Commit `3a003ca`.*
*Aktualisiert: 22.04.2026 — S18-Build-03: S5→S18 Cross-Block „Ernährung im Kontext" abgeschlossen. Kein DB-Write. S5↔S18 Bidirektionalität vollständig. Commit `ac130b0`. S18-Build-04 + S6-05 als nächste Schritte. `S18_BUILD_03_S5_TO_S18_CROSSLINK_CLOSURE.md` erstellt.*
*Aktualisiert: 22.04.2026 — S6-05: Globalsuche-Integration abgeschlossen. Commit `5c8f537`. S6-Strang + §3/§4/§5 nachgezogen.*
*Aktualisiert: 22.04.2026 — Reconciliation-Audit: Header (S18-Build-03→S6-05), S5-Strang Nächster-Schritt stale bereinigt (S6-03+S18-Build-03 erledigt), S18-Strang K8c→K8d korrigiert.*
*Aktualisiert: 23.04.2026 — S18-Build-04: Lebensmittel-Kompass K8b abgeschlossen. DB-Write: 24 Rows `lebensmittel`. Commit `84c8fdb`. S18-Strang + §3/§4/§5 nachgezogen.*
*Aktualisiert: 23.04.2026 — S18-Build-04a: Mobile-Audit (Q6) + Tap-Target-Fix. 4 CSS-Zeilen im Mobile-Breakpoint. Commit `13f7b8b`. Kein DB-Write. §2 S18-Strang + §3 + §4 Ops nachgezogen.*
*Aktualisiert: 23.04.2026 — S18-Build-05: Zusatzstoff-Kompass K8d abgeschlossen. DB-Write: 35 Rows `zusatzstoffe`. Commit `9941a3f`. S18-Strang + §3/§4/§5 nachgezogen.*
*Aktualisiert: 23.04.2026 — S6-06: S6↔K8b Minimalmodus abgeschlossen. Kein DB-Write. 3 Dateien. Commit `8bf2145`. S6-Strang + §3/§4/§5 nachgezogen. Doppelpflege Phase C vollständig.*
*Aktualisiert: 23.04.2026 — S8-PRE-SPEC B4-Ableitungslogik abgeschlossen (read-only). Pre-Spec `S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md` erstellt. 4-Stufen-Ausspiel-Logik + 12 Spec-Blöcke + Kommunikations-No-Gos + erster Build-Schritt (S8-BUILD-01: Krankheits-Ableitungen) definiert. Kein DB-Write, kein Commit, kein Deploy. §5 Nächste Schritte um S8-BUILD-01 ergänzt.*
*Aktualisiert: 23.04.2026 — S8-BUILD-01: B4 Nächste-Schritte-Block live. DB-Write JA (ALTER TABLE + 5 UPDATEs `naechste_schritte` JSONB). Code: 2 Dateien. Commit `bcda9bf`. §3 (aktuelles Paket) + §4 Ops + §5 Nächste Schritte (S8-BUILD-01 → S8-BUILD-02) nachgezogen. Doppelpflege Phase C vollständig.*
*Aktualisiert: 24.04.2026 — Q2-PRE-SPEC: Vertrauens-/Quellen-Layer Pre-Spec abgeschlossen (read-only). 3-Ebenen-Modell (global/objekt/aussage) bindend eingefroren. Quellenarten-Matrix S1/S2/S3/S5/S6/S18/S8. 5 Quellentypen (i18n-Schlüssel). 12 No-Gos. Q2-BUILD-01 spezifiziert. Kein DB-Write, kein Commit, kein Deploy. §2 Q2-Strang + §3 aktuelles Paket + §4 Ops + §5 Nächste Schritte (Q2-BUILD-01 HOCH ergänzt) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — Q2-BUILD-01: Globale Vertrauensseite `/vertrauen` live. 7 Pflichtblöcke, 5 Quellentypen, CSS `q2-*`, Footer-Link. 5 Dateien. Commit `e3b5617`. DB-Write: NEIN. §2 Q2-Strang + §3 aktuelles Paket + §4 Ops + §5 Nächste Schritte (Q2-BUILD-02 HOCH) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — Q2-BUILD-02a: S5 Quellenbox-Komponente live. QuellenBox (Inline) + TYP_MAP ersetzt Plain-Link-Liste Block [16]. Typ-Chip + Name-Link + beschreibung wenn vorhanden. Max-2-Expand. 2 Dateien. Commit `6a9fde7`. DB-Write: NEIN. §2 Q2-Strang + §3 aktuelles Paket + §4 Ops + §5 Nächste Schritte (Q2-BUILD-02b) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — S1-PRE-SPEC: S1 Compare-/Zielwert-/Trend Pre-Spec abgeschlossen (read-only). 4-Ebenen-Vergleichsmodell, 4 Zielwert-Typen, 16 DB-Felder spezifiziert, 12 No-Gos, S8-BUILD-02-Anschluss K3→B4 vorbereitet. Kein Code, kein DB-Write, kein Commit. §2 S1-Strang neu + §3 aktuelles Paket + §5 S1-BUILD-01 HOCH + S8-BUILD-02-Voraussetzung nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — S1-BUILD-01: Zielwert-Block V3 + Quellenkontext live. ALTER TABLE + 5 UPDATEs `zielwerte` JSONB via Dashboard-JWT. ZielwertBlock-Komponente (ZT1/ZT2 direkt, ZT3/ZT4 Intent-Gate, ZT4 Arzt-Disclaimer). Quellenkontext-Zeile + Mobile-fix. CSS-Audit 29/29+6/6 ✅. Commit `4ea4290`. §2 S1-Strang + §3 aktuelles Paket + §4 Ops + §5 S1-BUILD-02 ergänzt. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — BRAND-UX-REFRESH-SPEC: Bindendes Design-Governance-Dokument abgeschlossen (read-only). Audit 8 Befunde, 5 Kernentscheidungen (B1–B5), 11 CSS-Spec-Blöcke (C1–C11), 12 No-Gos. Nächster Schritt: UI-REFRESH-01 (CSS-only, 5–7 Dateien, 1 Commit, eigenständiger Chat). Kein DB-Write, kein Commit, kein Deploy. §2 BRAND-UX-REFRESH-SPEC-Strang neu + §3 aktuelles Paket auf Spec umgesetzt + §5 UI-REFRESH-01 HOCH ergänzt. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — UI-REFRESH-02 ✅ Chip-/Badge-Normalisierung abgeschlossen. 6 CSS-Dateien, 0 JSX, 0 DB-Write. 14 Crosslink-Chips → Typ-1, Q2-research amber → violett-grau, uppercase-Bereinigungen, soon-tag neutral. Commit `f4600f0`. Push `origin/main`. §2 UI-REFRESH-02-Strang neu + §3 aktuelles Paket + §4 Ops (HEAD `f4600f0`) + §5 UI-REFRESH-01 → UI-REFRESH-03 nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — S8-BUILD-02: Einordnung des Wertes (B4/K3) live. 3 Dateien. Kein DB-Write. Commit `b7f6d91`. §2 S8-Strang neu + §3 aktuelles Paket + §4 Ops (HEAD `b7f6d91`) + §5 S8-BUILD-02 → S8-BUILD-02b/S8-BUILD-03 nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — B4-DECISION-LOGIC-FREEZE ✅ Vollständige B4-Entscheidungslogik eingefroren (read-only). 8 Maßnahmenkategorien, 6 Evidenz-Reifegrade, 15-Feld-Pflichtschema, Sicherheitslogik, 12 No-Gos, 5 Lehrbeispiele, 6-Paket-Roadmap. Kein DB-Write, kein Commit. §2 S8-Strang aktualisiert (neues Führdokument B4_DECISION_LOGIC_FREEZE.md) + §3 aktuelles Paket + §5 B4-BUILD-02 HOCH ergänzt. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — B4-DECISION-LOGIC-FREEZE-PATCH-01 ✅ 5 Schärfungs-Patches auf `B4_DECISION_LOGIC_FREEZE.md` (read-only, kein Code, kein Commit, kein DB-Write). §6.2 Kontextpflicht-Regel, §8.5 whyShown-Pflichtfeld, §5.1+§5.9 UI-Label evidenceMaturity, §10.1 LDL risikobasiert (ESC/EAS 2021), §12 Paket 1b S1-BUILD-01b eingefügt. §2 S8-Strang (PATCH-01 + Nächster Schritt S1-BUILD-01b) + §3 aktuelles Paket → Vorgänger, PATCH-01 als aktuell gesetzt. Doppelpflege vollständig.*
*Aktualisiert: 24.04.2026 — S1-BUILD-01b ✅ LDL Zielwert-Microcopy live. loincCode-Prop an ZielwertBlock, LDL-Hinweis gated auf LOINC `2089-1`, ESC/EAS-Risikokontext, lw-zt-hinweis wiederverwendet. 1 Datei, kein DB-Write. Commit `d430333`. Paket 1b abgeschlossen — Voraussetzung für B4-BUILD-02 erfüllt. §2 S1-Strang (S1-BUILD-01b als aktuell) + §3 aktuelles Paket + §4 Ops (HEAD `d430333`) + §5 (S1-BUILD-01b entfernt, B4-BUILD-02 als unblockiert markiert). Doppelpflege vollständig.*
*Aktualisiert: 06.05.2026 — Q2-BUILD-02b ✅ S6 QuellenBox Rollout abgeschlossen. MedQuellenBox-Komponente in MedikamentDetail.jsx Block 6. Typ-Mapping ema/bfarm→regulatory, openfda/atc/who_atc→database. 2 Dateien. Kein DB-Write. Commit `c4b70d7`. §2 S6-/Q2-Strang aktualisiert + §3 aktuelles Paket + §4 Ops (HEAD `c4b70d7`) + §5 (Q2-BUILD-02b → Q2-BUILD-02c, B4-BUILD-02 → B4-BUILD-03) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 06.05.2026 — Q2-BUILD-02c ✅ S2 QuellenBox abgeschlossen. DB-Write: JA (ALTER TABLE + 21 UPDATE-Rows). 3 Dateien (SupplementDetail.jsx + Supplements.css + schema.sql). SuppQuellenBox + PubMed-Key-Fix + schema.sql sync. Commit `2e1223d`. Push origin/main. §2 Q2-Strang + S2-Strang + §3 aktuelles Paket + §4 Ops + §5 Nächste Schritte (Q2-BUILD-02c → Q2-BUILD-02c-P2) nachgezogen. Doppelpflege vollständig.*
*Verifikations-Patch: 06.05.2026 — §4 Ops: Git HEAD + Netlify-Deploy auf `2e1223d` korrigiert. Supabase-Resume als Ops-Side-Effect dokumentiert. Live-Smoke bestätigt.*
*Closure-Patch: 06.05.2026 — §4 Ops: Git HEAD auf `5fba660` (docs-only) aktualisiert. Doku-Fix-Commit `5fba660` gepusht: Q2_BUILD_02C_S2_QUELLENBOX_CLOSURE.md (Section I nachgetragen) + AUDIT_CANON_CURRENT.md (Q2-Sektion + Nächster Schritt) + ACTIVE_STRANDS_CURRENT.md (Git HEAD + Netlify-Zeile). Kein Netlify-Build erwartet. Alle 5 Doppelpflege-Dateien vollständig.*
*Aktualisiert: 06.05.2026 — Q2-BUILD-02c-P2A ✅ 10 NIH-ODS-Importlücken geschlossen. DB-Write: UPDATE 10 Rows (nih_ods_link + quellen), Dashboard-JWT. Kein Code, kein Commit, kein Deploy. V1–V8 PASS. DB: 31/51 supplements mit quellen. §2 Q2-Strang + §3 aktuelles Paket + §4 Ops + §5 (P2 → P2B NCCIH) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 06.05.2026 — VITALWISSEN_FULL_SYSTEM_AUDIT_2026-05 ✅ Vollaudit abgeschlossen (read-only, Phasen A–G). 20+ Live-Seiten getestet, DB vollständig abgefragt (10 Tabellen, RLS auf allen aktiv), Source/Evidence/Medical-Safety/UX/Brand/Architektur geprüft. Gesamtverdikt: GRÜN — plattform operativ und technisch sauber. 3 Aktionspunkte: (1) Repo-Clone veraltet (ee0e67f), (2) B4-actions-map HbA1c/Ferritin/VitD/CRP ohne requiresDoctorDiscussion+safetyLevel → B4-SAFETY-PATCH vor B4-BUILD-03, (3) S1 ohne QuellenBox → Q2-BUILD-02d. §2 S8/B4-Strang (B4-SAFETY-PATCH-Hinweis) + BRAND-UX-REFRESH (UI-REFRESH-03 ✅) aktualisiert. Kein DB-Write, kein Commit. Report: `01_PROJECT_SOURCES_CURRENT/VITALWISSEN_FULL_SYSTEM_AUDIT_2026_05.md`.*
*Aktualisiert: 07.05.2026 — B4-SAFETY-PATCH ✅ safetyLevel + requiresDoctorDiscussion für 18 Karten (HbA1c/Ferritin/VitD/CRP) nachgerüstet. 1 Datei, 36 Insertions, 0 Deletions. Kein JSX, kein CSS, kein DB-Write. Commit `8f19256`. Push `origin/main` (`846ce99..8f19256`). Netlify Auto-Deploy ausgelöst. Schließt FULL_AUDIT_2026-05 Befund #2 (KRITISCH-MED). B4-BUILD-03 entsperrt. §2 S8/B4-Strang + §3 aktuelles Paket + §4 Ops (HEAD `8f19256`) + §5 (B4-BUILD-03 NIEDRIG → MITTEL, Voraussetzung geupdated) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 07.05.2026 — Q2-BUILD-02d ✅ S1 LwQuellenBox Rollout abgeschlossen. LwQuellenBox-Inline-Komponente in LaborwertDetail.jsx. Typ: database (DGKL/AACC/JSCC). Region-Flag + Name-Link + Jahr. Max-2-Expand. Leer-Guard. Mobile Q6. Block [4b] ersetzt. 2 Dateien, kein DB-Write. Commit `fab4374`. Push `origin/main` (`8f19256..fab4374`). Netlify Auto-Deploy ausgelöst. Schließt FULL_AUDIT_2026-05 Befund #3 — alle 3 Vollaudit-Befunde geschlossen. §2 S1-Strang + Q2-Strang + §3 aktuelles Paket + §4 Ops (HEAD `fab4374`) + §5 (Q2-BUILD-02d entfernt) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 07.05.2026 — S3-K6-SCHEMA-SPEC ✅ Bindende Schema-Spezifikation Kernobjekt K6 abgeschlossen und abgenommen. 38 Felder, API-Quellen OpenAlex/PubMed/Crossref, Curation-Workflow K.1 (manuell, KI-TLDR VERBOTEN), Hype-Guardrails, RLS E29-konform. P.0 Pflicht-Spec-Sequenz (4 Pakete vor S3-BUILD-01). Keine Build-Freigabe. Kein Code, kein DB-Write, kein Commit. §2 P7D-Strang (Nächster Schritt: S3-MVP-SLICE-SPEC) + §5 (S3-Spec → S3-MVP-SLICE-SPEC) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 07.05.2026 — S3-MVP-SLICE-SPEC ✅ MVP-Slice-Spezifikation Studienkompass abgeschlossen. Option C (Krankheiten-only/K1): 5 ICD-Cluster (I10/E11/F32/E03/D50), 20 K6-Einträge, Modus 1 (Cross-Block [15] auf S5-Seiten). ICD = interne Objektanker. Originalabstract C.1 NEIN. CSS-Prefix `s3-*`. Keine Build-Freigabe. Kein Code, kein DB-Write, kein Commit. §2 P7D-Strang (Nächster Schritt: S3-PIPELINE-SPEC) + §5 (S3-MVP-SLICE-SPEC → S3-PIPELINE-SPEC) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 07.05.2026 — S3-MVP-SLICE-SPEC Customer-Value-Patch ✅. H0 ergänzt (Produktversprechen C.1, Coverage-Regel, Findability-Tabelle, Empty-State-Regel, UX-Claim). MVP-Entscheidung unverändert. S3-PIPELINE-SPEC bleibt nächster Schritt — muss ICD→MeSH-Mapping und Coverage-/Empty-State-Logik berücksichtigen. §2 P7D-Strang + §5 bestätigt unverändert. Doppelpflege vollständig.*
*Aktualisiert: 07.05.2026 — S3-PIPELINE-SPEC ✅ Vollständige Pipeline-Spec Studienkompass C.1 abgeschlossen (Sections A–S). ICD→MeSH-Mapping (5 Cluster, Primary/Secondary/Tertiary), zweistufige Suchstrategie (Quick-Pass + Deep-Pass), Quellen-Prioritätskette (OpenAlex→PubMed→Crossref→EuropePMC→DOI.org; Cochrane/Semantic Scholar ROT), Pipeline-Phasen P0–P8 (vollständig manuell C.1), Curation-Queue-Format, Gates K.1–K.4, Coverage-/Findability-/Empty-State-Regeln, API-/Rate-/Secrets-Regeln, K6-Feldmapping J.1–J.5, 15 Validatoren PASS. Kein Code, kein DB-Write, kein Commit, kein Deploy. §2 P7D-Strang (Nächster Schritt: S3-UX-SPEC) + §5 (S3-PIPELINE-SPEC → S3-UX-SPEC) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 07.05.2026 — S3-UX-SPEC ✅ P.0-Spec-Sequenz Studienkompass C.1 **3/4 Pakete** abgeschlossen. 21 Sections (A–S): Block [15] auf S5-Detailseiten (max 3 Karten + Expand, absent bei 216 Nicht-C.1-Krankheiten), 11-Block-Detailseite `/studien/:slug`, Studientyp-Ampel Level 1–5, Hype-Guardrails als Chips, Q2-Quellentyp `research` (violett-grau), 2 neue query-Funktionen, 20 Acceptance-Criteria, 15 Validatoren, 6 Hard-Stops. KI-VERBOTEN (E03/E28), Abstract-VERBOTEN in C.1. Kein Code, kein DB-Write, kein Commit, kein Deploy. §2 P7D-Strang (Nächster Schritt: S3-SCHEMA-MIGRATION-PREFLIGHT — kein Apply) + §5 (S3-UX-SPEC → S3-SCHEMA-MIGRATION-PREFLIGHT) nachgezogen. Side-Effect-Klärung: Doppelpflege-Writes nachträglich akzeptierbar, falsche „S3-BUILD-01 als nächster Schritt"-Angaben in allen 5 Dateien korrigiert (07.05.2026, Abnahmecheck).*
*Aktualisiert: 13.05.2026 — S3-SCHEMA-MIGRATION-PREFLIGHT ✅ P.0-Sequenz vollständig (4/4). SQL-Entwurf `sql/s3_k6_research_entries_preflight.sql` erstellt (kein Apply). 3 ENUMs + 46-Feld-Tabelle + 15 Indexes + Trigger + RLS E29 + Gate-K.4-Constraint. 10/10 Validatoren PASS. Kein Commit, kein DB-Write, kein Deploy. §2 P7D-Strang (Nächster Schritt: SQL Apply → Curation-Queue → S3-BUILD-01) + §5 Nächste Schritte (PREFLIGHT entfernt, SQL-Apply + S3-BUILD-01 ergänzt) nachgezogen. Doppelpflege vollständig.*
*Aktualisiert: 13.05.2026 — AI-INTEGRATION-AND-PERSONAL-CONTEXT-FREEZE ✅ KI-/Google-Integrations-Strategie verbindlich eingefroren. VitalWissen = Trust-, Kontext- und Handlungsschicht. Google/Gemini = Benchmark + Kanal + optionale Integrationsschicht (nicht Kernbesitz). 3 Modi (Schnellantwort / Tiefen-Trustansicht / Persönlicher Kontext), 5 Google-/Gemini-Pfade eingeordnet (AI-Readable Website jetzt / KI-Prompt-Export Phase C / Gemini API Phase D / Google Health API Phase D–E / BYO-AI Q9 Phase D–E), Datenklassifikation 1–5 (Klassen 3–5 strukturell kein externer KI-Abfluss). Q2/Q4/Q5/Q9/S3/S6/S8/S9/S18 Strangauswirkungen beschrieben. 7/7 Akzeptanzkriterien PASS. Kein Code, kein DB-Write, kein Commit, kein Deploy. §2 P7D-Strang (neues Freeze-Dokument) + §5 Nächste Schritte nachgezogen. Doppelpflege vollständig. Führend: `01_PROJECT_SOURCES_CURRENT/AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md`*
*Aktualisiert: 14.05.2026 — S3-CURATION-QUEUE-01-WRITE ✅ 20 Rows in `studien` geschrieben (review/draft/nicht_retracted). DB-Write: JA (5 Batches × 4, Dashboard-JWT). 9-Checkpoint-Validation PASS. Enum-Substitutionen dokumentiert (candidate→review, private→draft, not_retracted→nicht_retracted). Kein Code, kein Commit, kein Deploy. §2 P7D-Strang (Nächster Schritt: S3-BUILD-01 nach Freigabe) + §3 aktuelles Paket + §4 Ops (studien 0→20) + §5 (CURATION-QUEUE → S3-CURATION-QUEUE-01-WRITE mit neuem Status) nachgezogen. Doppelpflege vollständig.*
*Nächste Pflicht-Aktualisierung: bei jedem SOT-relevanten Paketabschluss; vor einem fachlich nicht zusammenhängenden Folgepaket muss der GitHub-SOT-Sync erfolgt sein.*

*Aktualisiert: 14.05.2026 — S3-BUILD-01 abgeschlossen. Block [15] "Was sagt die Forschung?" auf 5 Pilot-Krankheitsseiten live. Commit 97f07e8. Git HEAD = 97f07e8. Naechste Schritte: S3-BUILD-02, B4-BUILD-03, S8-BUILD-02d (je eigenstaendiger Chat). → S3_BUILD_01_CLOSURE.md*

*Aktualisiert: 2026-07-04 (Baseline-Datum Closeout-Audit) — VW-GITHUB-SOT-CLOSEOUT-01: GitHub-Governance-Migration formal dokumentiert (Branch Protection, Required Check, PR #35→#36→#37, SOT-Sync-Regel neu eingeführt). §2 neuer Top-Strang "GITHUB-GOVERNANCE-MIGRATION" + "PRODUKT-STAND"-Referenzblock ergänzt. §5 S3-/B4-Zeilen aktualisiert (S3-BUILD-01 + S3-APPROVAL-REVIEW-01 als erledigt markiert, S3-BUILD-02 als optional/offen, nächste B4-Welle als unspezifiziert, PR-#8-Cleanup + UX_SCAN_01-Klärung ergänzt). Kein Produktcode, kein DB-Write, kein Deploy. Quelle: `09_AUDIT_EXPORTS/VW_GITHUB_SOT_CURRENT_STATE_CONSOLIDATION_01/` (lokale Evidence).*
