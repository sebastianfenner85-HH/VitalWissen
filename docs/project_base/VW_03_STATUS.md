**Stand: 14.05.2026 — S3-BUILD-01: Block [15] "Was sagt die Forschung?" live (Commit `97f07e8`). 5 Pilot-Seiten (I10/E11/F32/E03/D50) mit kuratierten Studienkarten. Detailseite /studien/:slug live. 216 Nicht-Pilot-Seiten: Block absent. Kein DB-Write. Naechster Schritt: S3-BUILD-02 oder parallele Pakete (je eigenstaendiger Chat, je explizite Freigabe). → `01_PROJECT_SOURCES_CURRENT/S3_BUILD_01_CLOSURE.md`**

---

## Gesamtübersicht Säulen

| # | Säule | Status | Nächster Schritt |
|---|---|---|---|
| 1 | Laborwert-Lexikon | ✅ Live (60 Einträge) + **S1-BUILD-01 (24.04.2026):** Zielwert-Block V3 live (5 Pilot-Werte). 8 neue DB-Felder. ZT1–ZT4. Commit `4ea4290`. + **S1-BUILD-01b (24.04.2026):** LDL Microcopy. Commit `d430333`. + **S1-BUILD-01c (25.04.2026):** LDL Zielwert-Klarstellung. Commit `06c1176`. + **Q2-BUILD-02d (07.05.2026): LwQuellenBox** — Typ-Chip DATENBANK, Region-Flag, Name-Link, Jahr, Max-2-Expand, Leer-Guard. Block [4b] ersetzt. 2 Dateien, kein DB-Write. Commit `fab4374`. Schließt FULL_AUDIT_2026-05 Befund #3. | S1-BUILD-02 (Rollout alle 60 Werte, V2-Kontext — eigenständiger Chat) |
| 2 | Supplement-Kompass | ✅ Live (51 Einträge, wofuer_kurz + wofuer befüllt) + **Q2-BUILD-02c (06.05.2026):** supplements.quellen JSONB live, SuppQuellenBox auf SupplementDetail.jsx, 21 NIH-ODS-Quellen, PubMed-Key-Fix. Commit `2e1223d`. **Q2-BUILD-02c-P2A (06.05.2026):** 10 weitere NIH-ODS-Importlücken geschlossen (B-Vitamine + Mineralien + L-Carnitin). 31/51 Supplements mit quellen. | Q2-BUILD-02c-P2B (5× NCCIH: Melatonin/Echinacea/Ginkgo/Mariendistel/Rhodiola) — eigenständiger Chat |
| 3 | Studienkompass | ✅ **S3-BUILD-01 live (14.05.2026, Commit `97f07e8`):** Block [15] auf 5 Pilot-Krankheitsseiten (I10/E11/F32/E03/D50). 20/20 Studien approved/public. Studienkarten: Typ-Chip, Evidence-Badge Lvl 1-5, Hype-Flags, Show-All-Toggle. Detailseite /studien/:slug (StudienDetail.jsx). CSS s3-* (56 Klassen). Empty-State: Block absent bei 216 anderen Krankheiten. 5 Dateien, kein DB-Write. V1-V14 PASS. | S3-BUILD-02: Hub /studien (optional, eigenstaendiger Chat nach expliziter Freigabe) |
| 4 | Arztbrief-Decoder | ✅ **Beta Freeze** (P7-FINAL, 20.04.2026): Text-Paste + PDF-Text-Layer + OCR (Tesseract.js) + Anonymisierung (client-seitig) + KI-Dekodierung via Mistral-Proxy + Sichere Ausgabe/UX. Letzter Commit: `519f2d9`. P7-Strang formal geschlossen. | P7-06: weitere S4-Features — separates Spec-Paket + Freigabe zuerst |
| 5 | Krankheits-Lexikon | ✅ Live (221 Einträge) + **Q2-MAPPING-PATCH (07.05.2026):** `research`-Eintrag in `QUELLEN_TYP` ergänzt (violett-grau). Commit `27b3fb6`. | Cross-Block-Ausbau vollständig (S6-03, S18-Build-03). Weitere Crosslinks je eigenständiger Chat. |
| 6 | Medikamenten-Erklärer | ✅ **Q2-BUILD-02b abgeschlossen (06.05.2026):** MedQuellenBox-Komponente in Block 6 von MedikamentDetail.jsx live. Typ-Chip (regulatory=blau, database=slate, guideline=indigo, research=amber), Max-2-Expand, Roh-Enum entfernt, mobile-first (Tap-Targets ≥ 40px). + **Q2-MAPPING-PATCH (07.05.2026):** `patient_info`-Eintrag in `MED_QUELLEN_TYP` ergänzt (teal). Commit `27b3fb6`. | S6-07 — eigenständiger Chat |
| 7 | Community | ✅ Konzept fertig | Tech: Discourse oder Eigenentwicklung |
| 8 | Diagnose-Navigator / B4 | ✅ **B4-BUILD-02 abgeschlossen (25.04.2026):** LDL-Journey K3→B4 Brücke live. 8 high + 1 low Karte (15-Felder-Schema), backward-kompatibel mit HbA1c/Ferritin/VitD/CRP (8-Felder). Neue B4_KATEGORIE (9 Einträge), B4_EVIDENCE_MATURITY (6 Einträge), ~80 neue `lw-b4a-*`-CSS-Klassen. Live-Check 17/17 PASS. Commit `371f8f1`. Vorgänger: B4-FREEZE+PATCH-01, S1-BUILD-01b (Paket 1b), S8-BUILD-03 (5 LW, 23 Karten), S8-BUILD-02c (K3-Map 20 LW), S8-BUILD-01 (B4 auf 5 Krankheitsseiten). → `B4_BUILD_02_LDL_JOURNEY_CLOSURE.md` | S8-BUILD-02d (Kalium/Natrium K3-Map); B4-BUILD-03 (Rollout weitere LW) — je eigenständiger Chat |
| 9 | Health Data Hub | ✅ **S9-HEALTH-AVATAR-CONTEXT-FREEZE abgeschlossen (13.05.2026):** Strategie-Freeze Mein Gesundheitsavatar. 20 Sektionen, alle 19 ZK-Fragen beantwortet. Profiltypen P1–P6, Einwilligungsmodell, Datenhaltung (E2E AES-256 DE/EU), Update-Logik U1–U5, KI-Grenze (Klasse 3–5 opt-in, Klasse 4 blockiert), DSGVO Art. 9, Phasierung, 4 Build-Blocker, 12 No-Gos. KI-Prompt-Export = Phase-C-Feature ohne S9. Kein Code, kein DB-Write, kein Commit. → `S9_HEALTH_AVATAR_CONTEXT_FREEZE.md` | Phase-D-Vorbereitung: B1 AVV Supabase + B2 S9-DSE Rechtsanwalt + B3 Key-Mgmt-Spec + B4 FHIR-Lib → dann S9-Build |
| 10 | Datenschutz & Rechte | ✅ Konzept fertig | Content: rechtliche Inhalte ausarbeiten |
| 11 | Patienten-Steckbrief | ✅ Konzept fertig | UX: Formular + PDF-Export |
| 12 | Musterschreiben | ✅ Konzept fertig | Content: 20 Vorlagen ausarbeiten |
| 13 | Gesundheitsagenten & Crowd | ✅ Konzept fertig | Tech: Agent Phase 1, Crowd später |
| 14 | Influencer-Kompass | ✅ Konzept fertig | Content: Claims kuratieren + Review-Prozess |
| 15 | Wirksamkeit & Zeitachse | ✅ Konzept fertig | Tech: PubMed-Extraktion |
| 16 | App-Aggregator | ✅ Konzept fertig | Content: DiGA-Liste aufbauen |
| 17 | Arzt/Heilpraktiker-Matching | ✅ Konzept fertig | Tech: KBV-Aggregation |
| 18 | Ernährungskompass | 🟢 **S18-Build-05 abgeschlossen (23.04.2026):** Zusatzstoff-Kompass K8d live. Alle 4 Kernobjekte vollständig: K8a Nährstoffe (41), K8b Lebensmittel (24), K8c Ernährungsmuster (4), K8d Zusatzstoffe (35). Commit `9941a3f`. | S18-Querlinks oder Phase-C-Spec |

---

## Tech-Fortschritt (Stand: 22.04.2026)

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

### P7-04c — ✅ Abgeschlossen (20.04.2026) — read-only (Mistral ZDR Entblockung + Pfad-Freeze)
Schriftliche Mistral-ZDR-Bestätigung in den Kanon eingearbeitet. B1 (ZDR-Nachweis) für Mistral-stateless-Pfad operativ aufgelöst: ZDR aktiviert, gilt für stateless APIs, Inputs + Outputs, OCR eingeschlossen, Scale Plan. Zulässiger technischer Pfad bindend eingefroren: nur stateless API (AI Studio), kein Le Chat, keine agents/batch/conversations/libraries, keine Labs models. Restunsicherheit: exakte Vertrags-/DPA-Klausel als sinnvoller Compliance-Nachtrag offen (kein Build-Stopper). Compliance-Pflicht sofort: Mail-Archivierung durch Sebastian. Kein Code, kein Commit, kein Push, kein DB-Write.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7_04C_MISTRAL_ZDR_UNBLOCK_AND_PATH_FREEZE.md`

### P7-04d — ✅ Abgeschlossen (20.04.2026)
S4 LLM-Proxy Performance-/Stabilitätshärtung: Hardening gegen 32.8s-Timeout-Risiko aus P7-04b ST-1-Befund.
Geänderte Dateien (exakt 2):
- `netlify/functions/llm-proxy.js`: mistral-large-latest → mistral-small-latest, max_tokens 2000→800, System-Prompt verschlankt (~150 Wörter, Mengenlimits 6/4/3 explizit), AbortController 22s auf Mistral-Fetch (sauberer 504 statt Netlify-Rand-Abbruch), MISTRAL_MODEL ENV-Override dokumentiert.
- `src/pages/Arztbrief.jsx`: Concurrent-Call-Guard (llmStatus === loading → early return), AbortController 26s Client-Timeout, Timeout-Fehlermeldung PII-frei, Pending-Request-Abort bei Retry/Reset.
Nicht geändert: netlify.toml, anonymizeWorker.js, CSS, andere Seiten. P7-03b-Sicherheitsgarantien unverändert intakt. Kein DB-Write, kein Scope-Sprung.
Commit: `8a4193a` (Parent: `5acef84`). Push: `origin/main`. Netlify Auto-Deploy ausgelöst.
V7 GELB: ST-1a/b/c nach Deploy ausstehend (Sebastian manuell). Ziel: < 20s je Lauf. Rollback: MISTRAL_MODEL=mistral-large-latest in Netlify ENV setzen (kein Code-Commit).
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7_04D_S4_PERFORMANCE_STABILITY_CLOSURE.md`

### P7-04b — ✅ Abgeschlossen (20.04.2026)
Minimaler server-seitiger LLM-Proxy für S4 Arztbrief-Decoder. Provider: Mistral stateless API (ZDR schriftlich bestätigt 20.04.2026, Scale Plan).
Geänderte Dateien (exakt 4):
- `netlify/functions/llm-proxy.js` (NEU, 229 Zeilen): Whitelist-Validierung (7 Schichten), Mistral-Call, strukturiertes JSON-Output, kein Payload-Logging, alle Fehlerpfade PII-frei
- `netlify.toml` (+6 Zeilen): `[functions]` esbuild-Bundler + 30s Timeout für llm-proxy
- `src/pages/Arztbrief.jsx` (+190 Zeilen): 3 LLM-States, `handleDecode()` mit Hard-Guard, Trigger-Button, Display-Blöcke (worum_geht_es / kurzfassung / begriffe / naechste_fragen / warnhinweise)
- `src/pages/Arztbrief.css` (+240 Zeilen): arztbrief-decode-* + arztbrief-llm-* CSS-Klassen
Nicht geändert: App.jsx, anonymizeWorker.js, queries.js, Supabase-Schema, andere Seiten. P7-03b-Sicherheitsgarantien unverändert intakt.
Trust-Patch (20.04.2026, Commit `5acef84`): UI-Banner-Text auf realen Datenfluss korrigiert (kein falscher „nichts an Server"-Claim mehr). Proxy-Header-Kommentar präzisiert (Format-Validierung, nicht inhaltliche Anonymisierungsprüfung). Garantien-Trennung Client/Server/Offene Grenze dokumentiert.
V1–V10: alle GRÜN. Build: grün (exitCode 0, 116 Module). Commits: `2297951` (Build) + `5acef84` (Patch). Push: `origin/main`. DB-Write: NEIN.
ENV-Konfiguration (20.04.2026): MISTRAL_API_KEY in Netlify gesetzt (Secret, Production, key `vitalwissen-proxy`), Redeploy `main@5acef84` abgeschlossen (16s, 1 Function deployed).
ST-1 live bestanden (20.04.2026): Text-Paste → anonymisiert (4 Stellen) → Proxy-Call → alle 5 Felder korrekt (kurzfassung, begriffe ×9, worum_geht_es, naechste_fragen ×4, warnhinweise ×4). Provider: mistral-large-latest.
ST-2/ST-3: empfohlen (Sebastian manuell), kein Blocker — Proxy-Endpoint durch ST-1 verifiziert.
Status: ✅ Operativ geschlossen 20.04.2026.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/P7_04B_LLM_PROXY_BUILD_CLOSURE.md`

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

### S6-F6 — ✅ Abgeschlossen (21.04.2026) — read-only (EMA/EPAR-Verifikation)
EMA/EPAR als Slice-1-Primärbaustein live verifiziert (Chrome MCP). JSON-API (`medicines_json-report_en.json`): 2.679 Einträge, kein Auth, 2×/Tag Update. Feldabdeckung: `atc_code_human`, `international_non_proprietary_name_common_name`, `medicine_status`, `european_commission_decision_date`, `medicine_url` direkt in JSON. Einnahme/NW-Felder nur via EPAR-Seite (Freitext) + SmPC-PDF (DE). 30-Substanz-Test: 19/30 (63%) direkt via EMA — 11 nicht gefunden = nat. Generika (atorvastatin, lisinopril, ramipril, bisoprolol, metoprolol, levothyroxin, amoxicillin, sertraline, escitalopram, gabapentin, warfarin) → strukturell korrekt, BfArM planmäßig adressiert. ePI FHIR: nicht sicher operational (503). F6-Blocker: ✅ geschlossen. Kein Code, kein Commit, kein DB-Write.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/F6_EMA_EPAR_VERIFICATION_CLOSURE.md`

### S6-F7 — ✅ Abgeschlossen (21.04.2026) — read-only (Kandidatenliste 50 Wirkstoffe)
50 INN-Wirkstoffe für S6 Slice 1 definiert. 6 Bereiche: Herz-Kreislauf (13), Stoffwechsel (8), Schmerz/Entzündung (8), Psyche/Neurologie (9), Atemwege (8), Gastro/Uro (4). Primärpfade: 14 EMA/EPAR (28%) + 36 BfArM/national (72%). 2 DE-spezifische Wirkstoffe: Phenprocoumon (Marcumar) + Metamizol (Novaminsulfon). 10 Reservesubstanzen. Ausschlusslogik: Onkologika, Biologika, Kombinationspräparate, TDM-Substanzen (Digoxin, Amiodaroin, Phenytoin, Lithium) etc. Q1–Q6 alle JA. F7-Blocker: ✅ geschlossen. Build-Freigabeampel S6: ✅ GRÜN. Kein Code, kein Commit, kein DB-Write.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/S6_F7_CANDIDATE_LIST_CLOSURE.md`

### S1-PRE-SPEC — ✅ Abgeschlossen (24.04.2026) — read-only (Compare / Zielwert / Trend Pre-Spec)
S1 Compare-/Zielwert-/Trend Pre-Spec: vollständige Spec in 5 Phasen (A Audit, B Kernentscheidungen, C Pre-Spec 12 Blöcke, D 12 Kommunikations-No-Gos, E erster Build-Schritt). P7D-Klassifikation: B2 (Verstehen/Einordnen) / K3 (Laborwert).
**Kernentscheidungen:** 4-Ebenen-Vergleichsmodell (V1 Referenz / V2 Kontext: Alter+Schwangerschaft / V3 Zielwert / V4 Verlaufsorientierung). 4 Zielwert-Typen (ZT1 primärpräventiv / ZT2 krankheitsspezifisch / ZT3 risikogruppenspezifisch / ZT4 therapiemonitoring). Referenzbereich ≠ Zielwert als Kerndistinktion bindend. Quellentyp-Auflösung: DGKL/AACC/JSCC = `database`, DGK/ESC/DDG/AWMF = `guideline`.
**DB-Felder (16 neue spezifiziert):** `zielwerte` JSONB-Array (4 Typen, je: typ/wert/einheit/quelle/kontext/caveat), `ref_de_quelle_url`, `ref_de_quelle_jahr`, `ref_usa_quelle_url`, `ref_usa_quelle_jahr`, `ref_jp_quelle_url`, `ref_jp_quelle_jahr`, `letzte_aktualisierung`, `quellen_konflikt` JSONB, `referenz_kinder` JSONB, `referenz_schwangerschaft` JSONB, `monitoring_intervall` JSONB, `normalisierungszeitraum` JSONB, `b4_monitoring_plan` JSONB, `b4_wann_arzt_trigger` text, UI-Block [5] Quellenkontext + Quellenbox.
**S8-BUILD-02-Anschluss:** `monitoring_intervall` + `b4_monitoring_plan` als Pflichtbrückenfelder K3→B4 spezifiziert. Chronologie: S1-BUILD-01 → Q2-BUILD-02b S1 → S8-BUILD-02.
Kein Code, kein DB-Write, kein Commit, kein Deploy.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/S1_PRE_SPEC_COMPARE_ZIELWERT_TREND.md`

### BRAND-UX-REFRESH-SPEC — ✅ Abgeschlossen (24.04.2026) — read-only (Brand/UX Refresh Spec)
Bindendes Design-Governance-Dokument. Ausgangslage: kein formales UX/Design-Regelwerk bisher vorhanden. Audit 8 Befunde: Hero-Marketing-Ton, Serif-Blanket-Regel (globales h1/h2/h3 → `Instrument Serif`), Nav-Tagline-Kursiv (persistentes Redaktionssignal), Farbakkumulation (14+ Chip-Hintergrundfarben über Builds angesammelt), Chip-Semantik-Chaos (S1/S2 grün + S5→S6 indigo + S18-Nährstoffe amber + S18-Muster teal + S18-LM orange + B4 grün/indigo + Q2 5-Farben = kein System), Blockhierarchie fehlt (alle Blöcke gleiches Gewicht), Header-Gradienten inkonsistent (Home grün, S1 grün, S2 amber-getönt, S5 kein Gradient), Mobile-Gap.
5 bindende Kernentscheidungen: B1 Hero→Werkzeug-Einstieg (Gradient reduziert #f5f9f7→var(--bg), Headline clamp 24–36px, Eyebrow badge entfernt, Nav-Tagline entfernt), B2 Instrument Serif auf 3 Kontexte begrenzt (`.home-headline` + Detail-Seiten-H1 + Logo-Mark — kein Umbenennen der Fonts, nur Scope-Freeze), B3 4-Schicht-Farbsystem (Layer 1=Primary Struktur / Layer 2=Accent S2-only / Layer 3=Signal funktional / Layer 4=Q2 isoliert in QuellenBox; Q2-research amber→violet-gray `#7C6FC4`), B4 3 Chip-Typen (Type 1=neutral Inhalt: surface-2 bg + border-dark border + text; Type 2=Signal; Type 3=Q2 Quellentypen isoliert in QuellenBox — per-Säule Hintergrundfarben eliminiert), B5 primäre vs. sekundäre Blocks (Primär 1–6 white bg; Sekundär ab 7+ surface-2 bg; Blocktitel DM Sans 14px 600 var(--text) kein uppercase; visuelle Trennlinie zwischen den Bereichen; Mobile 44px Tap-Targets).
11 CSS-Spec-Blöcke (C1–C11): Typografie-Ruleset, Farbsystem-Ruleset, Crosslink-/Badge-Ruleset, Detailseiten-UX-Ruleset, Brand-No-Gos (12), Migration-Prioritäten (3), erster Schritt.
Kein Code, kein DB-Write, kein Commit, kein Deploy.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/BRAND_UX_REFRESH_SPEC.md`

### Q2-PRE-SPEC — ✅ Abgeschlossen (24.04.2026) — read-only (Vertrauens-/Quellen-Layer Pre-Spec)
Q2 Trust-&-Source-Layer Pre-Spec: vollständige Spec in 5 Phasen (A Quellenarten-Audit je Säule, B Kernentscheidung Trust-Layer, C Pre-Spec 10 Blöcke, D 12 No-Gos, E erster Build-Schritt). Ergebnis: 3-Ebenen-Modell bindend eingefroren — global (statische Vertrauensseite `/vertrauen`, CSS `q2-*`), objekt-bezogen (Quellenbox-Komponente `<QuellenBox>` auf allen Detailseiten), aussagen-bezogen (Inline-Quellenanker `[Q]` für E28-kritische Aussagen). 5 Quellentypen mit i18n-Schlüsseln: `guideline`, `regulatory`, `database`, `research`, `patient_info`. Quellenarten-Matrix für S1 (LOINC/DGKL), S2 (NIH ODS/EFSA), S3 (PubMed/Cochrane — PMID/DOI-Pflicht), S5 (AWMF/IQWiG/ICD-10-GM — `quellen` JSONB), S6 (EMA/BfArM/WHO ATC), S18 (NIH ODS/EFSA/DGE), S8/B4 (F1-Feld als Q2-Konvention-Vorläufer). 8 Schwächen-Befunde (3 HOCH: kein Quellentyp-Standard, kein Aktualitäts-Status, S3-PMID/DOI fehlt in DB; 3 MITTEL; 2 NIEDRIG). 12 No-Gos. Kein Code, kein Commit, kein DB-Write, kein Deploy.
→ Führende Quelle: `01_PROJECT_SOURCES_CURRENT/Q2_TRUST_SOURCE_PRE_SPEC.md`

---

## DB-Stand (24.04.2026)

| Tabelle | Einträge | Notizen |
|---------|----------|---------|
| `laborwerte` | 60 | 12 mit Notfall-Flag |
| `supplements` | 51 | Tier 1; inkl. vitamin-k2 (P6d); `wofuer` 51/51 befüllt (S2-02A); `kategorie` 7 distinct (VW-AUDIT-18A); **`quellen` JSONB live — 31/51 mit NIH-ODS-Quellen befüllt (Q2-BUILD-02c: 21 + P2A: 10)**, 20 noch leer |
| `krankheiten` | 221 | alle filter_tags ✅; **216/221 echte quellen** ✅ (5 dauerhaft intern: F06/L72/M13/R74/Z87); **0 Non-Standard-Typen** ✅; verwandte_laborwerte: 123 befüllt; verwandte_supplements: 108 befüllt |
| `ernaehrungsmuster` | 4 | RLS aktiv, Public-Read-Policy; K8c; Slice 1 (P7D-07) |
| `naehrstoffe` | 41 | K8a; RLS aktiv, anon read; 4 Kategorien (14 Vitamine, 12 Mineralstoffe, 6 Makronährstoffe, 9 Pflanzenstoffe); angelegt S18-Build-02 (22.04.2026) |
| **`lebensmittel`** | **24** | **K8b; RLS aktiv, anon read; 3 Indizes; 10 Kategorien; 1 Eintrag mit wechselwirkungen (grapefruit); angelegt S18-Build-04 (23.04.2026)** |
| **`zusatzstoffe`** | **35** | **K8d; RLS aktiv, anon read; 3 Indizes; 7 Kategorien; ~12 Einträge mit hinweise_vorsicht; angelegt S18-Build-05 (23.04.2026)** |
| `wirkstoffe` | 50 | K5; RLS aktiv, anon read; 9 Indizes; 7 distinct filter_tags (50/50 befüllt); angelegt S6-01 (21.04.2026) |
| `supplement_laborwert` | 0 | Verknüpfung noch nicht befüllt |
| `aenderungslog` | 0 | — |

---

## Nächste Schritte

### P7 — ✅ S4 Arztbrief-Decoder: Beta Freeze (20.04.2026)

P7-Strang formal geschlossen. Führende Referenz: `P7_FINAL_FREEZE_CLOSURE.md`

**Letzter Commit:** `519f2d9` (P7-05, Sichere Ausgabe/UX) — alle Commits auf `origin/main`.

Phasenlogik vollständig abgearbeitet:
- **P7-01** ✅ Architektur- und Sicherheits-Spec
- **P7-02/02b/02c** ✅ Lokaler Input (Text-Paste + PDF-Text-Layer + OCR via Tesseract.js)
- **P7-03** ✅ Client-seitiger Anonymisierungs-Worker (10-Block, 8/8 PASS)
- **P7-04a/c** ✅ LLM-Proxy-Spec + Mistral ZDR Entblockung (read-only)
- **P7-04b** ✅ LLM-Proxy live (Netlify Function, Mistral stateless, ST-1 bestanden)
- **P7-04d** ✅ Performance-/Stabilitätshärtung (mistral-small-latest, 22s+26s AbortController)
- **P7-04e** ✅ Input-Wechsel / Re-Analyse State-Fix
- **P7-05** ✅ Sichere Ausgabe / UX (Schritt-Indikator, Trust-Frame, CTA)
- **P7-FINAL** ✅ Beta Freeze & Closure — Strang formal geschlossen

**Offene manuelle Tests (kein Blocker):**
- ST-1a/b/c (P7-04d): Sebastian nach Deploy, Ziel < 20s. Rollback: `MISTRAL_MODEL` ENV-Var in Netlify.
- ST-P705-4 (P7-05): Sebastian manuell nach Deploy.

**Nächste zulässige Schritte (parallel wartend, Stand 07.05.2026):**
- **Q2-BUILD-02c-P2B:** 5× NCCIH-Supplements (Melatonin/Echinacea/Ginkgo/Mariendistel/Rhodiola) — eigenständiger Chat.
- **Q2-BUILD-03:** `review_typ` + `quellen_konflikt` als Schema-Felder — eigenständiger Chat.
- **S1-BUILD-02:** Rollout Zielwert-Block auf alle 60 Laborwerte, V2-Kontext Alter/Schwangerschaft, S1↔S5/S6-Crosslinks — eigenständiger Chat.
- **S6-07:** Nächster S6-Ausbau — eigenständiger Chat.
- **S8-BUILD-02d:** Kalium + Natrium K3-Map — eigenständiger Chat.
- **B4-BUILD-03:** Rollout B4-Actions weitere Laborwerte — eigenständiger Chat (B4-SAFETY-PATCH ✅ abgeschlossen, Blocker aufgelöst).
- **UI-REFRESH-04:** Detailseiten-Hierarchie `var(--surface-2)`, Legacy-Tap-Targets krank-ebene-btn/panel-btn ≥40px — eigenständiger Chat.
- **P7-06:** Weitere S4-Features — separates Spec-Paket + Freigabe zuerst.
- **S3-Spec-Paket:** Phase C — eigenständiger Folgeauftrag, erst nach expliziter Freigabe.

**Erledigt (07.05.2026):**
- Q2-BUILD-02d: ✅ S1 LwQuellenBox live. `LwQuellenBox`-Inline-Komponente in LaborwertDetail.jsx. Typ: database. Region-Flag + Name-Link + Jahr. Max-2-Expand. Leer-Guard. 2 Dateien, kein DB-Write. Commit `fab4374`. Schließt FULL_AUDIT_2026-05 Befund #3. → `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02D_S1_QUELLENBOX_CLOSURE.md`
- B4-SAFETY-PATCH: ✅ safetyLevel + requiresDoctorDiscussion für 18 Karten (HbA1c/Ferritin/VitD/CRP) nachgerüstet. 1 Datei, 36 Insertions, 0 Deletions. Kein JSX, kein CSS, kein DB-Write. Commit `8f19256`. Schließt FULL_AUDIT_2026-05 Befund #2 (KRITISCH-MED). → `01_PROJECT_SOURCES_CURRENT/B4_SAFETY_PATCH_CLOSURE.md`

**Erledigt (06.05.2026):**
- Q2-BUILD-02b: ✅ S6 MedQuellenBox-Komponente live. MedikamentDetail.jsx Block 6. Typ-Mapping: ema/bfarm→regulatory, openfda/atc/who→database, guideline→guideline. Commit `c4b70d7`. DB-Write: NEIN. → `Q2_BUILD_02B_S6_QUELLENBOX_CLOSURE.md`
- Q2-BUILD-02c: ✅ S2 SuppQuellenBox. supplements.quellen JSONB (ALTER TABLE). 21 NIH-ODS-Einträge. PubMed-Key-Fix. Commit `2e1223d`. DB-Write: JA. → `Q2_BUILD_02C_S2_QUELLENBOX_CLOSURE.md`
- Q2-BUILD-02c-P2A: ✅ 10 NIH-ODS-Quellenlücken geschlossen (B-Vitamine/Mineralien/L-Carnitin). 31/51 mit quellen. Kein Code, kein Commit. DB-Write: JA. → `Q2_BUILD_02C_P2A_NIH_ODS_TOP10_CLOSURE.md`

**Erledigt (25.04.2026):**
- B4-BUILD-02: ✅ LDL-Journey K3→B4 Brücke live. LOINC `2089-1`. 8 high + 1 low Karten. 15-Felder-Schema. Live-Check 17/17 PASS. Commit `371f8f1`. DB-Write: NEIN. → `B4_BUILD_02_LDL_JOURNEY_CLOSURE.md`
- S1-BUILD-01c: ✅ LDL Zielwert-Klarstellung. 2 sichtbare Texte gated auf LOINC `2089-1`. 2 CSS-Klassen. Commit `06c1176`. → `S1_BUILD_01C_LDL_ZIELWERT_KLARSTELLUNG_CLOSURE.md`

**Erledigt (24.04.2026):**
- UI-REFRESH-01: ✅ CSS-only Brand/UX First Refresh. 7 CSS-Dateien. Commit `54447ba`. → `UI_REFRESH_01_CLOSURE.md`
- UI-REFRESH-02: ✅ Chip-/Badge-Normalisierung. 6 CSS-Dateien. 14 Crosslink-Chips → Typ-1, Q2-research amber → violett-grau. Commit `f4600f0`. → `UI_REFRESH_02_CLOSURE.md`
- UI-REFRESH-03: ✅ Hierarchie & System-Klarheit. 3 CSS-Dateien. Ernaehrung/Medikamente/Laborwerte section-titles bereinigt. 22/22 Checks. Commit `f038e34`. → `UI_REFRESH_03_CLOSURE.md`
- S8-BUILD-02 bis S8-BUILD-03: ✅ EinordnungBlock + Rollout 20 LW + B4ActionsBlock MVP (5 LW). → Closures S8-BUILD-02b/02c/03
- B4-DECISION-LOGIC-FREEZE + PATCH-01: ✅ Vollspec eingefroren. 15-Felder-Schema bindend. → `B4_DECISION_LOGIC_FREEZE.md`
- S1-BUILD-01b: ✅ LDL Microcopy. Commit `d430333`. → `S1_BUILD_01B_LDL_MICROCOPY_CLOSURE.md`
- Q2-BUILD-02a: ✅ S5 Quellenbox-Komponente live. Typ-Chip + Max-2-Expand. Commit `6a9fde7`. → `Q2_BUILD_02A_S5_QUELLENBOX_CLOSURE.md`
- Q2-BUILD-01: ✅ Globale Vertrauensseite `/vertrauen`. 7 Blöcke. Commit `e3b5617`. → `Q2_BUILD_01_CLOSURE.md`
- S6-06: ✅ LM-Hinweisblock auf MedikamentDetail (Grapefruit↔Simvastatin). Commit `8bf2145`. → `S6_06_LM_HINWEISBLOCK_CLOSURE.md`

**Erledigt (23.04.2026):**
- S18-Build-04: ✅ Lebensmittel-Kompass K8b live (24 Einträge, 7 Dateien, Block [13] LM-Chips). Commit `84c8fdb`.
- S18-Build-04a: ✅ Mobile-Audit (Q6) + 4 Tap-Target-Fixes (Ernaehrung.css). Kein DB-Write. Commit `13f7b8b`.
- S18-Build-05: ✅ Zusatzstoff-Kompass K8d live (35 Einträge, 7 Kategorien, 5 Dateien). V1–V12 ✅. Commit `9941a3f`. DB-Write: JA.

**Erledigt (22.04.2026):**
- S6-01 bis S6-05: ✅ Wirkstoff-Lexikon komplett (Foundation, Content, Cross-Blocks, Filter-UI, Globalsuche)
- S18-Build-02 bis S18-Build-03: ✅ Nährstoff-Lexikon + Schema-Hardening + S5↔S18 Bidirektionalität
- VW-AUDIT-18A: ✅ Demo-Readiness Fixes (Home, Disclaimer, Kategorie-Fix)
- S2-02A: ✅ supplements.wofuer 51/51 befüllt

---

## Empfohlene Baureihenfolge

S1/S2 → S5 → S4 → S3 → S6 → S10/11/12 → S7 → S8 → S9

---

## Offene Punkte MVP-Core (S1/S2/S5)

### S1
- JSCC-Extraktion (internationale Referenzbereiche) noch technisch offen
- ~~Verknüpfungen zu S5 (P6b)~~ ✅ erledigt (P6b-03c, 16.04.2026)

### S2
- Tier 3 bewusst zurückgestellt
- Evidenz-Ampel braucht manuellen Review vor erweiterter Veröffentlichung
- ~~Verknüpfungen zu S5 (P6b)~~ ✅ erledigt (P6b-03c, 16.04.2026)

### S5
- ~~Quellenverankerung (AWMF/IQWiG) pro Krankheit: P6b~~ ✅ erledigt (P6b-02b, 15.04.2026; 216/221 echte Quellen)
- Filterlogik S5 → S2 (eigenständige gefilterte Supplementliste von S5 aus) — noch nicht implementiert

---

**VITALWISSEN_FULL_SYSTEM_AUDIT_2026-05 (06.05.2026):** Vollaudit nach Build-/Strategiephase. Gesamtverdikt: ✅ GRÜN — Plattform produktiv und technisch sauber. 3 Aktionspunkte: (1) Lokaler Repo-Clone veraltet (ee0e67f → frischer Clone nötig), (2) B4-actions-map für HbA1c/Ferritin/VitD/CRP fehlen Pflicht-Sicherheitsfelder (B4-SAFETY-PATCH vor B4-BUILD-03), (3) S1 ohne QuellenBox (Q2-BUILD-02d). Keine Blocker für laufenden Betrieb. Report: `01_PROJECT_SOURCES_CURRENT/VITALWISSEN_FULL_SYSTEM_AUDIT_2026_05.md`. Read-only, kein DB-Write, kein Commit.

---

*Historischer Vorstand (pre-P4): `02_PROJECT_SOURCES_ARCHIVE/VW_03_STATUS_pre_sync_2026-04-15.md`*

*Zuletzt aktualisiert: 19.04.2026 — P7D-07b Dokument-Reconciliation: P7D-07/07a-Irrtum zu `P7D_06_S18_SPEC.md` korrigiert (Datei existiert). DB-Belege (4 Rows, RLS, anon SELECT Policy) direkt via Live-SQL verifiziert. Dokumentkette bereinigt.*

*Zuletzt aktualisiert: 20.04.2026 — P7-04b ✅ Operativ geschlossen. MISTRAL_API_KEY in Netlify gesetzt, ST-1 live bestanden (Text-Paste → Proxy → alle 5 Felder korrekt). P7-04 live. Nächste Schritte: ST-2/ST-3 empfohlen, S18 Slice 2, S6-Freeze, P7-05.*

*Zuletzt aktualisiert: 20.04.2026 — P7-04d ✅ S4 LLM-Proxy Performance-/Stabilitätshärtung. Commit `8a4193a`. 5 Hebel: Modell (large→small), max_tokens (2000→800), System-Prompt (~150W), AbortController (22s+26s), Concurrent-Guard. ST-1a/b/c ausstehend (Sebastian nach Deploy, Ziel < 20s). V7 GELB bis bestätigt.*

*Zuletzt aktualisiert: 20.04.2026 — P7-04e ✅ S4 Input-Wechsel / Re-Analyse State-Fix. `resetForNewInput()` eingeführt und in `handleFile()` + `handlePaste()` eingehängt. Commit `40c3f5f` (1 Datei: Arztbrief.jsx). Alle A1–A10 erfüllt. P7-03-/P7-04-Sicherheitsgrenzen unverändert. Build grün. Nächste Schritte: ST-1a/b/c (P7-04d), S18 Slice 2, S6-Freeze, P7-05.*

*Zuletzt aktualisiert: 20.04.2026 — P7-05 ✅ S4 Sichere Ausgabe / UX. Schritt-Indikator (4 Schritte), Hero-Block „Worum geht es", Trust-Frame prominent, Fragen/Warnhinweise visuell getrennt, Timestamp + Eingabekontext im Result-Header, „Neuen Arztbrief analysieren"-CTA, Anon-Badge-Caveat, leeres Ergebnis robust, veraltete „Was kommt als Nächstes"-Sektion entfernt. Commit `519f2d9` (2 Dateien: Arztbrief.jsx + Arztbrief.css). V1–V10 GRÜN. P7-03/P7-04-Sicherheitsgrenzen unverändert intakt. Nächste Schritte: ST-P705-4 (Sebastian nach Deploy), S18 Slice 2, S6-Freeze (je eigenständiger Chat).*

*Zuletzt aktualisiert: 20.04.2026 — P7-04c ✅ Mistral ZDR Entblockung + Pfad-Freeze: B1 für Mistral-stateless-Pfad aufgelöst (schriftliche Support-Mail eingetroffen). P7-04b jetzt zulässig (eigenständiger Chat, Mistral stateless API, Netlify Function). Zulässiger Pfad bindend eingefroren: nur stateless API / AI Studio — kein Le Chat, keine stateful APIs (agents/batch/conversations/libraries), keine Labs models. Compliance-Pflicht sofort: Support-Mail als PDF archivieren (Sebastian). Exakte DPA-Vertragsklausel: sinnvoller Nachtrag, kein Build-Stopper.*

*Zuletzt aktualisiert: 20.04.2026 — P7-FINAL ✅ S4 Beta Freeze & Closure. P7-Strang formal geschlossen (P7-01 bis P7-05). Letzter Commit: `519f2d9`. Sicherheitsarchitektur eingefroren. Alle Commits auf `origin/main`. MISTRAL_API_KEY aktiv. Kein DB-Write, kein offener Side Effect. Nächste Schritte: ST-P705-4 + ST-1a/b/c (Sebastian manuell), dann S18 Slice 2, S6-Spec-Paket oder P7-06 (je eigenständiger Chat). → `P7_FINAL_FREEZE_CLOSURE.md`*

*Zuletzt aktualisiert: 20.04.2026 — S6-FREEZE ✅ Medikamenten-Erklärer Scope-Freeze. K5-Kernobjekt, Slice 1 (Wirkstoff-Lexikon, 50–100 Wirkstoffe), Datenmodell + Crosslinks S1/S2/S5, 8 Risiken (2 Blocker: DrugBank-Lizenz + Disclaimer-Standard), IST/NICHT-IST klar getrennt. Kein Code, kein DB-Write. Nächster zulässiger Schritt: S6-Spec-Paket (eigenständiger Chat). → `S6_FREEZE_CLOSURE.md`*

*Zuletzt aktualisiert: 20.04.2026 — S6-SPEC ✅ Spec-Paket abgeschlossen. DrugBank NEIN für Slice 1. Kanonische Quellenkombination: WHO ATC/DDD + EMA EPAR + OpenFDA + BfArM-Web. Disclaimer-Standard (Standardblöcke für UI), Datenmodell (26 Felder, Slice 1/2 getrennt), UX-Seitenlogik (Routes, Blocks, Cross-Links), Build-Freigabeampel GELB — offen: F6 EMA API Verifikation + F7 Kandidatenliste 50 Wirkstoffe. CSS-Prefix S6: `med-*`. Kein Code, kein DB-Write. Nächste Schritte: EMA API Browser-Verifikation + dann S6-Build-Paket (eigenständiger Chat). → `S6_SPEC_CLOSURE.md`*

*Zuletzt aktualisiert: 21.04.2026 — F6 ✅ GRÜN — EMA/EPAR-Verifikation abgeschlossen. JSON-API live (2.679 Einträge, kein Auth, 2×/Tag Update). ATC/INN/Status/URL direkt in JSON. SmPC via EPAR-Seite (Freitext) + SmPC-PDF (DE) zugänglich. 30-Substanz-Test: 19/30 gefunden (63%) — 11 nicht gefunden = nationale Generika (BfArM planmäßig). ePI FHIR Pilot: nicht sicher operational (503). F6 als Blocker geschlossen. → `F6_EMA_EPAR_VERIFICATION_CLOSURE.md`*

*Zuletzt aktualisiert: 21.04.2026 — F7 ✅ GRÜN — Kandidatenliste 50 Wirkstoffe abgeschlossen. 6 Bereiche, 50 INN-Wirkstoffe, 14 EMA/EPAR (28%) + 36 BfArM/national (72%), 10 Reservesubstanzen. Alle S6-Blocker (F6+F7) geschlossen. Build-Freigabeampel S6: ✅ GRÜN. Kein Code, kein DB-Write, kein Commit. Nächster Schritt: S6-Build-Paket (eigenständiger Chat). → `S6_F7_CANDIDATE_LIST_CLOSURE.md`*

*Zuletzt aktualisiert: 21.04.2026 — Doppelpflege-Standard eingeführt. `AUDIT_CANON_CURRENT.md` + `ACTIVE_STRANDS_CURRENT.md` als Pflicht-Zusatzebene neu erstellt. Doppelpflege-Standard in CLAUDE.md bindend verankert. DB-Stand: wirkstoffe 50/50, alle anderen Tabellen unverändert. Git: `22470ad`. Kein Code, kein DB-Write, kein Commit, kein Deploy.*

*Zuletzt aktualisiert: 22.04.2026 — VW-AUDIT-18A ✅ Demo-Readiness Fixes. Home.jsx: Medikamente + Ernährung in Quick-Links + Pillar-Cards. ErnaehrungMusterDetail: In-Page-Disclaimer. supplements.kategorie Encoding-Fix (7 distinct). Commit `8445cac`. → `VW_AUDIT_18A_DEMO_READINESS_FIX_CLOSURE.md`*

*Zuletzt aktualisiert: 22.04.2026 — S2-02A ✅ supplements.wofuer 51/51 befüllt (21 Einträge via Dashboard-JWT). Kein Commit. → `S2_02A_DEMO_READINESS_CONTENT_REPAIR_CLOSURE.md`*

*Zuletzt aktualisiert: 22.04.2026 — S6-03 ✅ S5→S6 Cross-Block live. 36/221 Krankheiten mit Wirkstoff-Chips. Bidirektionalität S5↔S6 vollständig. Commit `45dcca4`. → `S6_03_S5_TO_S6_CROSSLINK_CLOSURE.md`*

*Zuletzt aktualisiert: 22.04.2026 — S18-Build-02 + S18-Build-02b ✅ Nährstoff-Lexikon (41 Einträge, 4 Kategorien, 7-Block-Detailseite) + Schema-Hardening. Commits `f210596` + `54e8b59` + `c60f47a`. DB: naehrstoffe 41 Rows, RLS. → `S18_BUILD_02_NAEHRSTOFFE_CLOSURE.md` + `S18_BUILD_02B_SCHEMA_NORMALIZATION_CLOSURE.md`*

*Zuletzt aktualisiert: 22.04.2026 — S6-04 ✅ Filter-UI MedikamenteListe. Psyche-Bug behoben, Gastro-Uro-Chip, Count-Badge. Commit `3a003ca`. → `S6_04_FILTER_UI_CLOSURE.md`*

*Zuletzt aktualisiert: 22.04.2026 — S18-Build-03 ✅ S5→S18 Cross-Block „Ernährung im Kontext" live. S5↔S18 Bidirektionalität vollständig. Commit `ac130b0`. → `S18_BUILD_03_S5_TO_S18_CROSSLINK_CLOSURE.md`*

*Zuletzt aktualisiert: 22.04.2026 — S6-05 ✅ Globalsuche-Integration Wirkstoffe. Commit `5c8f537`. Letzter Commit auf origin/main (22.04.2026). → `S6_05_GLOBAL_SEARCH_INTEGRATION_CLOSURE.md`*

*Zuletzt aktualisiert: 23.04.2026 — S6-06 ✅ S6↔K8b Minimalmodus abgeschlossen. Cross-Block „Lebensmittel mit Hinweisen" auf MedikamentDetail.jsx. JSONB-Containment Reverse-Lookup. 2 Wirkstoffe mit LM-Treffern. Kein DB-Write, kein Schema-Change. 3 Dateien. Commit `8bf2145`. V1–V12 ✅. → `S6_06_LM_HINWEISBLOCK_CLOSURE.md`*

*Zuletzt aktualisiert: 23.04.2026 — S8-PRE-SPEC ✅ B4-Ableitungslogik Pre-Spec abgeschlossen. 4-Stufen-Ausspiel-Logik (S1 sofort / S2 aufklappbar / S3 nach Intent / S4 niemals). 12 Spec-Blöcke, Kommunikations-No-Gos, Trennmodell S/E/X, Risikoklassen RK-A–D, Objektvarianten K1/K3/K5/K9/K8. Kein DB-Write, kein Commit, kein Deploy. Nächster Schritt: S8-BUILD-01 (Krankheits-Ableitungen, eigenständiger Chat). → `S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md`*

*Zuletzt aktualisiert: 23.04.2026 — S8-BUILD-01 ✅ B4 Nächste-Schritte-Block live. 5 kuratierte Krankheitsdetailseiten (I10/E11/F32/E03/D50). 27 Optionen mit F1–F7 vollständig. 4-Stufen-Ausspiel-Logik live. CSS `b4-*` (30 Klassen). DB: `naechste_schritte` JSONB. 216 Krankheiten: Block absent. V1–V12 PASS. Commit `bcda9bf`. → `S8_BUILD_01_CLOSURE.md`*

*Zuletzt aktualisiert: 22.04.2026 — Reconciliation-Audit: DB-Stand nachgezogen (naehrstoffe+wirkstoffe ergänzt), Nächste-Schritte-Sektion bereinigt (S6-01–S6-05 + S18-Build-02/03 als erledigt markiert), Gesamtübersicht S1/S2/S5 Nächster-Schritt stale-Einträge korrigiert, Offene-Punkte-MVP-Core bereinigt, Tech-Fortschritt-Stand-Datum korrigiert.*

*Zuletzt aktualisiert: 23.04.2026 — S18-Build-04 ✅ Lebensmittel-Kompass K8b live. `lebensmittel`-Tabelle (24 Rows, 10 Kategorien, RLS, 3 Indizes). 7 Frontend-Dateien. Block [13] um orange `krank-lm-chip` erweitert. S18→S6 Minimalmodus (grapefruit/simvastatin+amlodipin). V1–V11 ✅. Commit `84c8fdb`. DB-Write: JA. → `S18_BUILD04_LEBENSMITTEL_CLOSURE.md`*

*Zuletzt aktualisiert: 23.04.2026 — S18-Build-04a ✅ Mobile-first Verification + Minimal Polish. 8-Punkte Audit (Q6). 4 Tap-Target-Fixes im Mobile-Breakpoint. 1 Datei. Kein DB-Write. Commit `13f7b8b`. → `S18_BUILD04_LEBENSMITTEL_CLOSURE.md` (Anhang)*

*Zuletzt aktualisiert: 23.04.2026 — S18-Build-05 ✅ Zusatzstoff-Kompass K8d abgeschlossen. `zusatzstoffe`-Tabelle (35 Rows, 7 Kategorien, RLS, 3 Indizes). 7-Block-Detailseite `ErnaehrungZusatzstoffDetail.jsx`. Kategorie-Filter. Crosslink-Entscheidung: keine Chip-Crosslinks in Build-05. DB-Write: JA. 5 Dateien. Commit `9941a3f`. V1–V12 ✅. S18 alle 4 Kernobjekte vollständig (K8a/K8b/K8c/K8d). → `S18_BUILD05_ZUSATZSTOFFE_CLOSURE.md`*

*Zuletzt aktualisiert: 06.05.2026 — Q2-BUILD-02c ✅ S2 QuellenBox abgeschlossen. supplements.quellen JSONB (ALTER TABLE), NIH-ODS-Bootstrap (21/51 Supplements), SuppQuellenBox-Komponente, PubMed-Key-Fix, schema.sql sync. Commit `2e1223d`. Push origin/main. Netlify Auto-Deploy. DB-Write: JA. → `Q2_BUILD_02C_S2_QUELLENBOX_CLOSURE.md`*

*Zuletzt aktualisiert: 06.05.2026 — Q2-BUILD-02c-P2A ✅ S2 NIH-ODS Top-10 Quellenlücken geschlossen. nih_ods_link + quellen für B1/B2/B3/B5/Biotin/Kalium/Chrom/Kupfer/Mangan/L-Carnitin. DB: 31/51 mit quellen. Kein Code, kein Commit, kein Deploy. V1–V8 ✅. → `Q2_BUILD_02C_P2A_NIH_ODS_TOP10_CLOSURE.md`*

*Zuletzt aktualisiert: 07.05.2026 — Q2-BUILD-02d ✅ S1 LwQuellenBox abgeschlossen. `LwQuellenBox`-Inline-Komponente in `LaborwertDetail.jsx`. Typ: database (DGKL/AACC/JSCC per S1-PRE-SPEC). Region-Flag + Name-Link + Jahr. Max-2-Expand. Leer-Guard. Mobile Q6 ✅. Block [4b] ersetzt. 2 Dateien, kein DB-Write, kein Schema-Change, kein queries.js-Touch. Live-Check V1/V2/V3 ✅. Schließt FULL_AUDIT_2026-05 Befund #3 (alle 3 Befunde nun geschlossen). Commit `fab4374`. Push origin/main. Netlify Auto-Deploy. → `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02D_S1_QUELLENBOX_CLOSURE.md`*

*Zuletzt aktualisiert: 24.04.2026 — BRAND-UX-REFRESH-SPEC ✅ Bindendes Brand/UX-Governance-Dokument abgeschlossen. Audit 8 Befunde (Hero-Marketing-Ton, Serif-Blanket, Nav-Tagline-Kursiv, Farbakkumulation, Chip-Semantik-Chaos, Blockhierarchie fehlt, Header-Gradienten inkonsistent, Mobile-Gap). 5 bindende Kernentscheidungen (B1–B5). 11 CSS-Spec-Blöcke (C1–C11) + 12 No-Gos. Nächster Schritt: UI-REFRESH-01 (CSS-only, 5–7 Dateien, 1 Commit, eigenständiger Chat). Kein Code, kein DB-Write, kein Commit, kein Deploy. → `01_PROJECT_SOURCES_CURRENT/BRAND_UX_REFRESH_SPEC.md`*

*Zuletzt aktualisiert: 07.05.2026 — S3-K6-SCHEMA-SPEC ✅ Bindende Schema-Spezifikation Kernobjekt K6 abgeschlossen und abgenommen. 38 Felder (A–T Abschnitte). API-Quellen: OpenAlex + PubMed + Crossref (Cochrane/Semantic Scholar ROT). Curation-Workflow K.1 (vollständig manuell, KI-TLDR verboten, Originalabstract-Verbot). Hype-Guardrails (tierversuch_flag, in_vitro_flag, preprint_flag, retraction_status DEFAULT 'unbekannt' + retraction_checked_at). RLS E29-konform (studien_objekt_links via EXISTS-Subquery, kein USING(true)). P.0 Pflicht-Spec-Sequenz: 4 Pakete (S3-MVP-SLICE-SPEC → S3-PIPELINE-SPEC → S3-UX-SPEC → S3-SCHEMA-MIGRATION-PREFLIGHT) vor S3-BUILD-01. Keine Build-Freigabe. Kein Code, kein DB-Write, kein Commit, kein Deploy. Nächster Schritt: S3-MVP-SLICE-SPEC (eigenständiger Chat, explizite Phase-C-Freigabe erforderlich). → `01_PROJECT_SOURCES_CURRENT/S3_K6_SCHEMA_SPEC.md`*

*Zuletzt aktualisiert: 13.05.2026 — S3-CURATION-QUEUE-01 ✅ 20 K6-Kandidaten kuratiert (5 Cluster × 4). DB-Write NEIN (Bedingungen 2/6/7 nicht erfüllt — Sandbox ohne Internet). Curation-Matrix fertig, Closure-Dokument erstellt. Nächste Schritte: PMID/DOI-Live-Verifikation + Retraction-Check + DB-Write-Freigabe → DB-Write → S3-BUILD-01. → `S3_CURATION_QUEUE_01_CLOSURE.md`*

*Zuletzt aktualisiert: 13.05.2026 — AI-INTEGRATION-AND-PERSONAL-CONTEXT-FREEZE ✅ KI-/Google-Integrations-Strategie eingefroren. VitalWissen ist Trust-, Kontext- und Handlungsschicht — kein Antwort-Bot. Google/Gemini als Benchmark + Kanal + optionale Integrationsschicht (nicht Kernbesitz). 3 Modi (Schnellantwort / Tiefen-Trustansicht / Persönlicher Kontext). 5 Google-/Gemini-Pfade eingeordnet (AI-Readable Website als Architekturprinzip ✅; KI-Prompt-Export Phase C; Gemini API Phase D; Google Health API Phase D/E; BYO-AI Q9 Phase D/E). Datenklassifikation 1–5 (Klassen 3–5 = externe KI NEIN). Q2/Q4/Q5/Q9/S3/S6/S8/S9/S18 eingeordnet. 7/7 Akzeptanzkriterien PASS. Read-only, kein Code, kein DB-Write, kein Commit, kein Deploy. → `01_PROJECT_SOURCES_CURRENT/AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md`*

*Zuletzt aktualisiert: 14.05.2026 — S3-BUILD-01 abgeschlossen. Block [15] "Was sagt die Forschung?" live auf 5 Pilot-Krankheitsseiten (I10/E11/F32/E03/D50). Commit 97f07e8. Naechste Schritte: S3-BUILD-02, B4-BUILD-03, S8-BUILD-02d (je eigenstaendiger Chat). → S3_BUILD_01_CLOSURE.md*
