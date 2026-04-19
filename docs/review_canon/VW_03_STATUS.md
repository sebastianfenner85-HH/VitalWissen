# VW_03 — Sprint-Status VitalWissen

**Stand: 19.04.2026 — P7D-07a ✅ (S18 Slice 1 Verifikation + Doku-Sync). S18 Slice 1 live: `/ernaehrung` + 4 Ernährungsmuster, Commit `8867f79`, 13/13 Repo-Checks PASS, 20/20 DB-Checks PASS. S4/P7-04b weiter blockiert bis schriftliche Mistral-ZDR-Bestätigung vorliegt (B1 offen). Nächste zulässige Schritte: S18 Slice 2 (erfordert eigenständiges Spec-Paket zuerst) oder S6-Freeze (je eigenständiger Chat, nach expliziter Freigabe). P7D-03 (S3-Freeze) abgeschlossen — S3-Build ist Phase C.**

---

## Gesamtübersicht Säulen

| # | Säule | Status | Nächster Schritt |
|---|---|---|---|
| 1 | Laborwert-Lexikon | ✅ Live (60 Einträge) | P6b: Verknüpfungen zu Krankheiten |
| 2 | Supplement-Kompass | ✅ Live (51 Einträge) | P6b: Verknüpfungen zu Krankheiten |
| 3 | Studienkompass | ✅ Freeze abgeschlossen (P7D-03, 19.04.2026) — Scope, Kernobjekte K6, Phase-C-Grenze bindend definiert | Phase C: S3-Spec-Paket (Datenbankschema, Pipeline-Spec, UX-Spec) — eigenständiges Paket, erst nach expliziter Freigabe |
| 4 | Arztbrief-Decoder | 🟡 Beta: `/arztbrief` live (Text-Paste + PDF-Text-Layer + OCR via Tesseract.js + Anonymisierungs-Worker, alles client-seitig) | Tech: P7-04b (LLM-Proxy) — blockiert bis Mistral-ZDR-Bestätigung |
| 5 | Krankheits-Lexikon | ✅ Live (221 Einträge) | P6b-Rest: Liste B (26 Quellen manuell kurieren) |
| 6 | Medikamenten-Erklärer | ✅ Konzept fertig | Tech: DrugBank/OpenFDA anbinden |
| 7 | Community | ✅ Konzept fertig | Tech: Discourse oder Eigenentwicklung |
| 8 | Diagnose-Navigator | ✅ Konzept fertig | Tech: ClinicalTrials API + Spezialisten-DB |
| 9 | Health Data Hub | ✅ Konzept fertig | Tech: E2E-Verschlüsselung + OAuth + FHIR-R4-Planung |
| 10 | Datenschutz & Rechte | ✅ Konzept fertig | Content: rechtliche Inhalte ausarbeiten |
| 11 | Patienten-Steckbrief | ✅ Konzept fertig | UX: Formular + PDF-Export |
| 12 | Musterschreiben | ✅ Konzept fertig | Content: 20 Vorlagen ausarbeiten |
| 13 | Gesundheitsagenten & Crowd | ✅ Konzept fertig | Tech: Agent Phase 1, Crowd später |
| 14 | Influencer-Kompass | ✅ Konzept fertig | Content: Claims kuratieren + Review-Prozess |
| 15 | Wirksamkeit & Zeitachse | ✅ Konzept fertig | Tech: PubMed-Extraktion |
| 16 | App-Aggregator | ✅ Konzept fertig | Content: DiGA-Liste aufbauen |
| 17 | Arzt/Heilpraktiker-Matching | ✅ Konzept fertig | Tech: KBV-Aggregation |
| 18 | Ernährungskompass | 🟡 Slice 1 live: `/ernaehrung` (4 Ernährungsmuster, Commit `8867f79`) — Slice 1 = nur Ernährungsmuster. Reset/Freeze P7D-04 abgeschlossen. | S18 Slice 2 (Nährstoffe oder Lebensmittel) — eigenständiges Spec-Paket zuerst, dann Build-Freigabe |

---

## Tech-Fortschritt (Stand: 18.04.2026)

### P1 — ✅ Abgeschlossen
React + Vite Frontend-Grundstruktur, Design-System, S1 + S2 Seed-Seiten, Netlify-Konfiguration, Supabase-Schema angelegt.

### P2 — ✅ Abgeschlossen
GitHub Repo (public): sebastianfenner85-HH/VitalWissen. Netlify verbunden, Auto-Deploy aktiv. Supabase Projekt Frankfurt (ejyrzxmtosrouwstiyws). Env-Vars in Netlify gesetzt.

### P3 — ✅ Abgeschlossen
Supabase JS Client eingebunden. `src/lib/supabase.js` + `src/lib/queries.js`. Alle Seiten auf Supabase umgestellt.

### P4 — ✅ Abgeschlossen
50 Supplements in Supabase befüllt (Tier 1, NIH ODS Basisdaten). Evidenz-Ampel gepflegt.

### P5 — ✅ Abgeschlossen
60 Laborwerte in Supabase importiert. S1 + S2 vollständig befüllt und live.

### P5b — ✅ Abgeschlossen (10.04.2026)
Vollständiges Frontend-Audit. 8 Bugs gefixt. PasswordGate hinzugefügt.

### P6 — ✅ Abgeschlossen (12.04.2026)
S5 Krankheits-Lexikon: 221 Einträge live. ICD-10-basiert, Tag-Filter (19 Kategorien), Footer/Disclaimer, RLS. Commit: `47d4039..57a2036`.

### P6c — ✅ Abgeschlossen (14.04.2026)
Curated Verified Core 5: E11/E03/D50/I10/F32 — broken Refs bereinigt, Quellenanker verifiziert. Commit: `fce9b64`.

### P6d — ✅ Abgeschlossen (15.04.2026)
S5 Kreuzreferenz-Bereinigung: broken Chips gefiltert (Frontend), LOINC-Codes korrigiert, 4 Restfälle aufgelöst, `vitamin-k2` als eigener S2-Eintrag (id=51) angelegt. Commit: `ee0e67f`.
→ Führende Quelle für P6d-Endstand: `01_PROJECT_SOURCES_CURRENT/P6D_06_STATUS.md`

### P6b-02b — ✅ Abgeschlossen (15.04.2026)
S5 Quellen-Write: 184 Krankheiten mit AWMF+IQWiG Quellen befüllt (4 Batches). 195/221 echte Quellen. 26 Restbestand (Liste B) ohne echte Quelle. Kein Commit (nur DB).
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P6B_02B_QUELLEN_WRITE_STATUS.md`

### P6b-03a — ✅ Abgeschlossen (16.04.2026)
Crosslink-Rulebook: bindendes Regelwerk für verwandte_laborwerte + verwandte_supplements. 12 Blöcke, Validatoren V-01–V-08, Fallbacks F-01–F-06. Kein DB-Write.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P6B_03A_CROSSLINK_RULEBOOK.md`

### P6b-03b — ✅ Abgeschlossen (16.04.2026)
Crosslink-Matrix: 221er Dual-Matrix (klasse_lw + klasse_supp, je A/B/C) für alle S5-Einträge. Alle Kandidaten DB-verifiziert (60 LOINC, 51 Supps/43 valid). Dry-Run — kein Write. GO für P6b-03c.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P6B_03B_CROSSLINK_MATRIX_STATUS.md`

### P6b-03c — ✅ Abgeschlossen (16.04.2026)
Crosslink-Write: 147 A-Klasse-Einträge geschrieben (lw=123, supps=108). 5 Batches regulär + Interrupt-Integrity-Check + Resume-Finish (6 Delta + 17 Batch5b). Alle Integritätsmetriken grün (0 broken refs, 0 overlimit, 0 duplikate). P6c-Schutz durchgehend eingehalten. Kein Commit (nur DB).
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P6B_03C_CROSSLINK_WRITE_STATUS.md`

### P6b-Rest — ✅ Abgeschlossen (16.04.2026)
Quellen-Rest-Write: 21/26 Rest-ICDs mit echten Quellen versorgt (3 Batches: AWMF-only, AWMF+IQWiG, IQWiG-only). E61 upgraded (magnesium.html verifiziert), M13/L72/R74 gestoppt (keine passenden Quellen gefunden). 5 Fälle dauerhaft intern: F06 (ICD-Restkategorie), Z87 (Anamnesecode), M13/L72/R74 (keine IQWiG/AWMF-Abdeckung). Exact-Match-Validator: allExact=true für alle 26 ICDs. Kein Commit (nur DB).
→ Führende Quellen: `01_PROJECT_SOURCES_CURRENT/P6B_REST_01_QUELLEN_KURATION_MATRIX.md`, `01_PROJECT_SOURCES_CURRENT/P6B_REST_02_QUELLEN_WRITE_STATUS.md`, `01_PROJECT_SOURCES_CURRENT/P6B_REST_03_FINAL_CLOSURE.md`

### P6-Final-01 — ✅ Abgeschlossen (16.04.2026)
Typ-Normalisierung: 8 Non-Standard-Typen aus P6c-Altdaten bereinigt (3 Batches). `Patienteninfo` (6×: J44, J45, K58, M05, M81, N18) → `Patienteninformation`; `Uebersicht` (1×: E11/MedlinePlus) → `Patienteninformation`; `Internationale Leitlinie` (1×: I10/ESC) → `Leitlinie`. Post-Write-Validator: nonstandard_typen=0, alle anderen Metriken unverändert. P6 vollständig geschlossen. Kein Commit (nur DB).
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P6_FINAL_CLOSURE.md`

### P7-01 — ✅ Abgeschlossen (16.04.2026)
S4-Architektur- und Sicherheits-Spezifikation (read-only, kein Code/Deploy/DB). Inklusive P7-01a-Patch: E07/E08-Engschnitt (eigener Anonymisierungs-Worker = offen; Cloud-OCR = E07+E08-Konflikt, kein freigegebener Pfad); dedizierte S4-Seite als empfohlene Arbeitshypothese für P7-02 (keine VW_06-Entscheidung); Schlussfreigabe präzisiert.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7_01_S4_ARCHITECTURE_SPEC.md`

### P7-02 — ✅ Abgeschlossen (16.04.2026)
S4-Minimal-Arbeitsfläche `/arztbrief` live: lokaler Text-Paste + lokale PDF-Text-Layer-Extraktion via `pdfjs-dist` (Vite-native `?url`-Worker-Import). Statusbanner (E07/E08-Hinweis), Fallbacks F1–F4, Reset, arztbrief-* CSS-Prefix, Nav-Eintrag als `beta`. Kein OCR, keine Anonymisierung, kein LLM, kein externer Rohdatenabfluss, keine Supabase-Änderung, kein Storage. Commit: `0a3961d`. Push erfolgreich, Netlify Auto-Deploy.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7_02_CLOSURE.md`

### P7-02b — ✅ Abgeschlossen (17.04.2026)
Client-seitige OCR via Tesseract.js (Scan-PDF + PNG/JPG/JPEG), vollständig same-origin. SC-3–SC-6 live bestanden. Commits: `ac3f40c` + `1f1e4a3` + `dfb6676`. SC-2 Completion-Restfehler → in P7-02c behoben.

### P7-02c — ✅ Abgeschlossen (17.04.2026)
Scan-PDF-OCR Completion-Fix: renderCanvas+Whitefill→ImageBitmap-Pfad in `ocrPdfDoc`. SC-1 + SC-2 live bestanden. Commit: `f757630`.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7_02C_CLOSURE.md`

### P7-03 (= P7-03b) — ✅ Abgeschlossen (18.04.2026)
Client-seitiger Anonymisierungs-Worker (`src/workers/anonymizeWorker.js`): Browser Web Worker, 10-Block-Regelwerk (~18 Regex-Regeln), alle 4 Eingabepfade anonymisiert vor Anzeige. 8/8 Test-Audit PASS, kein PII-Leak. Hard-Stop bei Worker-Fehler, kein Bypass. E07/E08-konform. Commit: `07576d0`. Netlify Auto-Deploy ausgelöst.
Hinweis: CLAUDE.md-Update im P7-03b-Strang war ein OOS-Doku-Nachzug ohne technischen Schaden — P7-04 dadurch ausdrücklich NICHT freigegeben.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7_03B_S4_ANONYMIZATION_BUILD_CLOSURE.md`

### P7-04a — ✅ Abgeschlossen (18.04.2026) — read-only
LLM-Proxy-/Provider-Freigabe-Spec erstellt (`P7_04A_S4_LLM_PROXY_RELEASE_SPEC.md`). Kein Code, kein Commit, kein Deploy. Ergebnis: P7-04 freigabefähig unter exakt benannten Bedingungen — aktuell weiter blockiert.
Anbieter-Lage (nutzerseitig berichtet / nicht durch Cowork direkt verifiziert):
- Anthropic: 30-Tage-Retention aktiv, ZDR kein Self-Service-Toggle, nur Enterprise → Pfad geparkt
- Mistral: Scale-Plan aktiviert, Kostenlimit 10 €/Monat gesetzt, keine Trainingsdatennutzung (Scale-Plan-Standard laut Nutzerbeobachtung), ZDR-Ticket an Mistral-Support eingereicht — Antwort ausstehend. API-Key bewusst noch NICHT erstellt.
B1 bleibt OFFEN. B3 wird erst nach B1 bearbeitet.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7_04A_S4_LLM_PROXY_RELEASE_SPEC.md`

### P7D-01 — ✅ Abgeschlossen (18.04.2026) — read-only
Architecture Reset Freeze: neues führendes strategisches Dokument erstellt. Produktstruktur (interne Säulen vs. externe Produktbereiche), Phasenlogik A–E, Kernobjekte K1–K11, Querschichten Q1–Q10, Säulen-Trennschärfe, No-Gos, Discovery-/Update-Logik. Kein Code, kein Commit, kein DB-Write, kein Deploy.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7D_ARCHITECTURE_RESET_FREEZE.md`

### P7D-02 — ✅ Abgeschlossen (19.04.2026)
Discovery-Basis-Build: Suche/Discovery in Phase B verbessert. Änderungen an Nav-Komponente, Queries und Home-Seite.
Commit: `a32e877336cb34e566ca5c64470379aa9258e039` (Parent: `07576d0`).
Geänderte Dateien (exakt 5):
- `src/components/Nav.css`
- `src/components/Nav.jsx`
- `src/lib/queries.js`
- `src/pages/Home.css`
- `src/pages/Home.jsx`
Kein S4-Dateipfad geändert. Kein Watchlist-Build. Kein Q4-/Q5-Build. Push auf `main` erfolgt. DB-Write: keiner (abgeleitet, kein DB-Log verifiziert). Netlify Auto-Deploy: ausgelöst durch Push (nicht direkt verifiziert).
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7D_02_DISCOVERY_BASIS_BUILD_CLOSURE.md`

### P7D-02b — ✅ Abgeschlossen (19.04.2026)
UI-Polish Krankheits-Lexikon: kleines Frontend-Polish-Paket. Hero-/Filter-/Badge-Beruhigung auf S5-Seite.
Commit: `dea4c36` (Parent: `a32e877`).
Geänderte Dateien (exakt 2):
- `src/components/Nav.css`
- `src/pages/Krankheiten.css`
Kein Feature-Ausbau. Kein S4-Touch. Kein Watchlist-Build. Push auf `main` erfolgt. DB-Write: keiner. Netlify Auto-Deploy: ausgelöst durch Push (nicht direkt verifiziert).
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7D_02B_UI_POLISH_CLOSURE.md`

### P7D-03 — ✅ Abgeschlossen (19.04.2026) — read-only
S3-Freeze: Studienkompass scope-scharf gefasst. Kernaufgabe: Forschungsergebnisse als eigenständige verlinkbare Objekte (K6) auffindbar, eingeordnet und verständlich machen. Nicht-Scope: kein Newsroom, kein Q4, kein S8-Aktionsbereich, kein S15-Zeitachsen-Bereich, kein S14-Claim-Bereich. Kernobjekte: Primärstudie, Review, Meta-Analyse (alle K6-Subtypen). 7 Datenquellen (PubMed, PMC, Cochrane, Epistemonikos, EuropePMC, RetractionWatch, OpenCitations). Phase-C-Grenze definiert. Einstiegspfade (Modus 1 kontextuell von S5/S2/S1 empfohlen vor Modus 2 eigenständig). Kein Code, kein Build-Auftrag, kein API-Test, kein DB-Schema, kein Commit, kein Push.
**Hinweis:** Der in P7D-03 §14 genannte Arbeitstitel „S3-Spec (Arbeitstitel: P7D-04)" für den Folgeauftrag ist nicht mehr gültig. Das tatsächliche P7D-04 wurde als S18-Reset/Freeze vergeben. Der S3-Spec-Folgeauftrag erhält beim Commissioning einen neuen Paketnamen.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7D_03_S3_FREEZE.md`

### P7D-04 — ✅ Abgeschlossen (19.04.2026) — read-only
S18 Reset/Freeze: S18 strategisch neu gefasst. Kernaufgabe: „Ernährung verstehen, bewerten, anwenden". 4 Kernobjekte (Nährstoff, Lebensmittel, Ernährungsmuster, Zusatzstoff/E-Nummer) als K8-Sub-Objekte definiert. Zusatzstoffe/E-Nummern: Phase B (light/Basisseiten), Phase C (vollständig). S5↔S18-Crosslink: **NEUE PAKETENTSCHEIDUNG** — auf Phase B vorgezogen (Altstand VW_06: Phase 2, bleibt dort unverändert). S18↔S6: nur Schnittstellenlogik/Spec-Ziel — **keine aktive Phase-B-Endnutzer-Verbindung** (S6 existiert noch nicht). Phase-B-Startumfang definiert. Kein Code, kein Commit, kein DB-Write, kein Deploy. Kein Build-Auftrag.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7D_S18_RESET_FREEZE.md`

### P7D-04a — ✅ Abgeschlossen (19.04.2026) — read-only (Clarification Patch)
S18 Clarification Patch: Pakettrennung von P7D-03/S3 operativ nachgezogen (Abschnitt 0 eingefügt). S5↔S18 als explizite neue Paketentscheidung markiert — keine Behauptung, dass Phase-B-Einordnung schon vorher Kanon war. S18↔S6 auf Schnittstellenlogik begrenzt, S18 ≠ S6 in Trennschärfe-Tabelle ergänzt. Validatoren auf 16 erweitert (alle PASS). Kein Code, kein Commit, kein DB-Write, kein Deploy.
→ Führende Quelle: Patch auf `01_PROJECT_SOURCES_CURRENT/P7D_S18_RESET_FREEZE.md`

### P7D-05 — ✅ Abgeschlossen (19.04.2026) — read-only (Phase-B-Vollaudit)
Phase-B-Vollaudit: Kanon, Workspace, Paketkette und Drift-Risiken vollständig geprüft. Befunde: P7D-03-Spiegelungslücke (HOCH — P7D-03 fehlte in CLAUDE.md + VW_03), WEBSITE_PROJECT_MASTER_DOSSIER-Drift (MITTEL — als Altstand entschärft), Workspace-Clone stale (NIEDRIG). Keine Strategiedrift, kein Build-Auftrag. Kein Code, kein Commit, kein DB-Write, kein Deploy.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7D_05_PHASE_B_FULL_AUDIT.md`

### P7D-05a — ✅ Abgeschlossen (19.04.2026) — read-only (Kanon-Reparatur)
Kanon-Reparatur: P7D-03 (S3-Freeze) in CLAUDE.md und VW_03_STATUS.md nachgespiegelt. WEBSITE_PROJECT_MASTER_DOSSIER-Rolle als Altstand entschärft (nicht führend). Label-Kollision in P7D_03 §14 (Arbeitstitel „P7D-04" für S3-Spec-Folgeauftrag) gepatcht — nicht mehr gültig. Kein Code, kein Commit, kein DB-Write, kein Deploy.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7D_05A_CANON_REPAIR_CLOSURE.md`

### P7D-07 — ✅ Abgeschlossen (19.04.2026)
S18 Build Slice 1: Ernährungsmuster live. Neue Supabase-Tabelle `ernaehrungsmuster` (12 Felder, RLS aktiv, Public-Read-Policy), 4 Seed-Einträge (mediterrane-ernaehrung, dash, ballaststoffreiche-ernaehrung, eiweissbetonte-ernaehrung). Neue Seiten: `/ernaehrung` (Übersicht, 4 Muster-Karten) + `/ernaehrung/muster/:slug` (Detail, 8 Inhaltsblöcke). S5-Crosslinks via DB-verifizierten Slugs. CSS-Prefix `ern-*`, 42 Klassen, 100% Deckung, mobile-first. Nav-Eintrag ohne `soon`/`beta`. Kein S4-/S6-/S2-Touch, kein Scope-Sprung. `P7D_06_S18_SPEC.md` existiert (vollständige S18-Spec) — wurde im Build nicht gelesen (Irrtum in Closure, korrigiert in P7D-07b). Baugrundlage: P7D_ARCHITECTURE_RESET_FREEZE.md + P7D_S18_RESET_FREEZE.md + Paketauftrag. Commit: `8867f79` (Parent: `dea4c36`). Push auf `main`. Netlify Auto-Deploy ausgelöst.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7D_07_S18_SLICE1_CLOSURE.md`

### P7D-07a — ✅ Abgeschlossen (19.04.2026) — read-only (Verifikation + Doku-Sync)
S18 Slice 1 Verifikation + Doku-Sync: Repo-Verifikation (13/13 PASS: Commit `8867f79` vorhanden, 6 Dateien korrekt, kein S4/S6-Touch). DB-Verifikation (20/20 PASS: Tabelle `ernaehrungsmuster` angelegt, 4 Einträge vollständig, alle Felder befüllt, RLS aktiv, Public-Read-Policy). Spec-Situation irrtümlich als „P7D_06_S18_SPEC.md nie erstellt" dokumentiert — Irrtum in P7D-07b korrigiert (Datei existiert). CLAUDE.md und VW_03_STATUS.md nachgezogen. Kein Build, kein Commit, kein Push, kein DB-Write.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7D_07A_S18_SLICE1_VERIFICATION_AND_DOC_SYNC.md`

---

## DB-Stand (19.04.2026)

| Tabelle | Einträge | Notizen |
|---------|----------|---------|
| `laborwerte` | 60 | 12 mit Notfall-Flag |
| `supplements` | 51 | Tier 1; inkl. vitamin-k2 (P6d) |
| `krankheiten` | 221 | alle filter_tags ✅; **216/221 echte quellen** ✅ (5 dauerhaft intern: F06/L72/M13/R74/Z87); **0 Non-Standard-Typen** ✅; verwandte_laborwerte: 123 befüllt; verwandte_supplements: 108 befüllt |
| `ernaehrungsmuster` | 4 | RLS aktiv, Public-Read-Policy; Slice 1 (mediterrane-ernaehrung, dash, ballaststoffreiche-ernaehrung, eiweissbetonte-ernaehrung) — angelegt P7D-07 |
| `supplement_laborwert` | 0 | Verknüpfung noch nicht befüllt |
| `aenderungslog` | 0 | — |

---

## Nächste Schritte

### P7 — 🟡 S4 Arztbrief-Decoder (in Arbeit, teilweise live)

Verbindliche Phasenlogik (aus `P7_01_S4_ARCHITECTURE_SPEC.md`):

- **P7-01** ✅ Architektur- und Sicherheits-Spec (inkl. P7-01a-Patch)
- **P7-02** ✅ lokaler Input (Text-Paste + lokale PDF-Text-Layer-Extraktion, `/arztbrief` live)
- **P7-02b** ✅ client-seitige OCR via Tesseract.js (Scan-PDF + Bilder) — live
- **P7-02c** ✅ Scan-PDF-OCR Completion-Fix — live
- **P7-03** ✅ Anonymisierungs-Worker — client-seitig, alle 4 Eingabepfade, 8/8 PASS
- **P7-04a** ✅ LLM-Proxy-/Provider-Freigabe-Spec — read-only abgeschlossen
- **P7-04b** 🔒 Proxy-Build — blockiert bis B1 geschlossen (ZDR-Nachweis ausstehend)
- **P7-04** 🔒 LLM-Dekodierung — blockiert (B1: Mistral-ZDR-Ticket eingereicht, Antwort ausstehend; B3: Proxy nicht gebaut)
- **P7-05** 🔒 sichere Ausgabe / UX — blockiert (B4: S4-UX in VW_06 nicht verifiziert)

**Nächste zulässige Schritte (parallel wartend):**
- **S4/P7-04b:** Warten auf schriftliche Mistral-ZDR-Bestätigung (B1). Nach Eingang: Prüfung ob B1 wirklich geschlossen, dann neuer Chat für P7-04b (Proxy-Build).
- **S18 Slice 2:** S18 Slice 1 (Ernährungsmuster) ist live und verifiziert (P7D-07/07a ✅). Slice 2 (Nährstoffe oder Lebensmittel) erfordert zuerst ein eigenständiges Spec-Paket (Datenbankschema, Seitenstruktur, Pipeline-Spec) — dann Build-Freigabe in separatem Chat.
- **S6-Freeze:** Konzept fertig, Freeze-Paket noch ausstehend — eigenständiger Chat, nach expliziter Freigabe.
- **Watchlists/Q4/Q5:** bleiben Phase-C-Spec-only — kein vorgezogener Build.
- **S3-Freeze:** ✅ abgeschlossen (P7D-03). S3-Build ist Phase C. S3-Spec-Paket ist eigenständiger zukünftiger Folgeauftrag.

---

## Empfohlene Baureihenfolge

S1/S2 → S5 → S4 → S3 → S6 → S10/11/12 → S7 → S8 → S9

---

## Offene Punkte MVP-Core (S1/S2/S5)

### S1
- JSCC-Extraktion (internationale Referenzbereiche) noch technisch offen
- Verknüpfungen zu S5 (P6b)

### S2
- Tier 3 bewusst zurückgestellt
- Evidenz-Ampel braucht manuellen Review vor erweiterter Veröffentlichung
- Verknüpfungen zu S5 (P6b)

### S5
- Quellenverankerung (AWMF/IQWiG) pro Krankheit: P6b
- Filterlogik S5 → S2 noch nicht implementiert

---

*Historischer Vorstand (pre-P4): `02_PROJECT_SOURCES_ARCHIVE/VW_03_STATUS_pre_sync_2026-04-15.md`*

*Zuletzt aktualisiert: 19.04.2026 — P7D-07b Dokument-Reconciliation: P7D-07/07a-Irrtum zu `P7D_06_S18_SPEC.md` korrigiert (Datei existiert). DB-Belege (4 Rows, RLS, anon SELECT Policy) direkt via Live-SQL verifiziert. Dokumentkette bereinigt.*
