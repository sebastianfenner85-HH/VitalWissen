# VitalWissen — Source-Mapping: Arbeitsordner → Review-Ablage

> Stand: 19.04.2026 | Paket: P7D-08

Diese Tabelle dokumentiert für jede relevante Quelldatei, ob und wie sie gespiegelt wurde.

---

## review_canon/ — Führende Kernquellen

| Arbeitsordner-Quelle | Ziel im Repo | Gespiegelt? | Roh oder redaktiert? | Begründung |
|----------------------|--------------|-------------|----------------------|------------|
| `CLAUDE.md` (Root, Cowork-Arbeitsordner) | `docs/review_canon/CLAUDE_PUBLIC.md` | ✅ Ja | **Redaktiert** | Enthält Credentials/Secrets/PAT/Passwort → vollständig entfernt |
| `01_PROJECT_SOURCES_CURRENT/P7D_ARCHITECTURE_RESET_FREEZE.md` | `docs/review_canon/P7D_ARCHITECTURE_RESET_FREEZE.md` | ✅ Ja | Roh (clean) | Führendes Architektur-Dokument, kein Secret-Fund |
| `01_PROJECT_SOURCES_CURRENT/VW_01_MASTER.md` | `docs/review_canon/VW_01_MASTER.md` | ✅ Ja | Roh (clean) | Vision/Strategie, kein Secret-Fund |
| `01_PROJECT_SOURCES_CURRENT/VW_02_QUERSCHNITT.md` | `docs/review_canon/VW_02_QUERSCHNITT.md` | ✅ Ja | Roh (clean) | Querschnittsthemen, kein Secret-Fund |
| `01_PROJECT_SOURCES_CURRENT/VW_03_STATUS.md` | `docs/review_canon/VW_03_STATUS.md` | ✅ Ja | Roh (clean) | Sprint-Status, kein Secret-Fund (Supabase-Projekt-ID öffentlich) |
| `01_PROJECT_SOURCES_CURRENT/VW_04_ENTSCHEIDUNGEN.md` | `docs/review_canon/VW_04_ENTSCHEIDUNGEN.md` | ✅ Ja | Roh (clean) | Grundsatzentscheidungen, kein Secret-Fund |
| `01_PROJECT_SOURCES_CURRENT/VW_05_SAEULEN.md` | `docs/review_canon/VW_05_SAEULEN.md` | ✅ Ja | Roh (clean) | Säulen-Spec, kein Secret-Fund |
| `01_PROJECT_SOURCES_CURRENT/VW_06_WEBSITE.md` | `docs/review_canon/VW_06_WEBSITE.md` | ✅ Ja | Roh (clean) | UX/Website-Konzept, kein Secret-Fund |
| `01_PROJECT_SOURCES_CURRENT/WEBSITE_PROJECT_MASTER_DOSSIER.md` | — NICHT gespiegelt — | ❌ Nein | — | Altstand (13.04.2026), nicht führend; enthält App-Passwort (Klartext); → `NOT_LEADING.md` |
| `01_PROJECT_SOURCES_CURRENT/WORKFLOW_README.md` | — NICHT gespiegelt — | ❌ Nein | — | **Security-Fund:** Supabase Service Key im Klartext; optional + unsicher → ausgeschlossen |

---

## review_packages/ — Package-/Spec-/Closure-Dokumente

| Arbeitsordner-Quelle | Ziel im Repo | Gespiegelt? | Roh oder redaktiert? | Begründung |
|----------------------|--------------|-------------|----------------------|------------|
| `P6_FINAL_CLOSURE.md` | `docs/review_packages/P6_FINAL_CLOSURE.md` | ✅ Ja | Roh (clean) | P6-Abschluss, kein Secret-Fund |
| `P7_01_S4_ARCHITECTURE_SPEC.md` | `docs/review_packages/P7_01_S4_ARCHITECTURE_SPEC.md` | ✅ Ja | Roh (clean) | S4-Architektur-Spec |
| `P7_02_CLOSURE.md` | `docs/review_packages/P7_02_CLOSURE.md` | ✅ Ja | Roh (clean) | S4 Text-Paste + PDF-Layer |
| `P7_02B_CLOSURE.md` | `docs/review_packages/P7_02B_CLOSURE.md` | ✅ Ja | Roh (clean) | S4 OCR |
| `P7_02C_CLOSURE.md` | `docs/review_packages/P7_02C_CLOSURE.md` | ✅ Ja | Roh (clean) | S4 OCR-Fix |
| `P7_03A_S4_ANONYMIZATION_BOUNDARY_SPEC.md` | `docs/review_packages/P7_03A_S4_ANONYMIZATION_BOUNDARY_SPEC.md` | ✅ Ja | Roh (clean) | S4 Anonymisierungs-Boundary |
| `P7_03B_S4_ANONYMIZATION_BUILD_CLOSURE.md` | `docs/review_packages/P7_03B_S4_ANONYMIZATION_BUILD_CLOSURE.md` | ✅ Ja | Roh (clean) | S4 Worker-Build |
| `P7_04A_S4_LLM_PROXY_RELEASE_SPEC.md` | `docs/review_packages/P7_04A_S4_LLM_PROXY_RELEASE_SPEC.md` | ✅ Ja | Roh (clean) | LLM-Proxy-Freigabe-Spec (blockiert) |
| `P7D_01_DISCOVERY_BASIS_SPEC.md` | `docs/review_packages/P7D_01_DISCOVERY_BASIS_SPEC.md` | ✅ Ja | Roh (clean) | Discovery-Basis-Spec |
| `P7D_02_DISCOVERY_BASIS_BUILD_CLOSURE.md` | `docs/review_packages/P7D_02_DISCOVERY_BASIS_BUILD_CLOSURE.md` | ✅ Ja | Roh (clean) | Discovery-Basis-Build |
| `P7D_02B_UI_POLISH_CLOSURE.md` | `docs/review_packages/P7D_02B_UI_POLISH_CLOSURE.md` | ✅ Ja | Roh (clean) | UI-Polish |
| `P7D_03_S3_FREEZE.md` | `docs/review_packages/P7D_03_S3_FREEZE.md` | ✅ Ja | Roh (clean) | S3-Studienkompass-Freeze |
| `P7D_S18_RESET_FREEZE.md` | `docs/review_packages/P7D_S18_RESET_FREEZE.md` | ✅ Ja | Roh (clean) | S18-Freeze |
| `P7D_04B_S18_DOC_SYNC_CLOSURE.md` | `docs/review_packages/P7D_04B_S18_DOC_SYNC_CLOSURE.md` | ✅ Ja | Roh (clean) | S18 Doc-Sync |
| `P7D_05A_CANON_REPAIR_CLOSURE.md` | `docs/review_packages/P7D_05A_CANON_REPAIR_CLOSURE.md` | ✅ Ja | Roh (clean) | Kanon-Reparatur |
| `P7D_06_S18_SPEC.md` | `docs/review_packages/P7D_06_S18_SPEC.md` | ✅ Ja | Roh (clean) | Vollständige S18-Spec (574 Zeilen) |
| `P7D_07_S18_SLICE1_CLOSURE.md` | `docs/review_packages/P7D_07_S18_SLICE1_CLOSURE.md` | ✅ Ja | Roh (clean) | S18 Slice 1 Build-Closure |
| `P7D_07A_S18_SLICE1_VERIFICATION_AND_DOC_SYNC.md` | `docs/review_packages/P7D_07A_S18_SLICE1_VERIFICATION_AND_DOC_SYNC.md` | ✅ Ja | Roh (clean) | Slice 1 Verifikation |
| `P7D_07B_S18_DOC_RECONCILIATION.md` | `docs/review_packages/P7D_07B_S18_DOC_RECONCILIATION.md` | ✅ Ja | Roh (clean) | Doc-Reconciliation |
| `P7_02_UEBERTRAG.md` | — NICHT gespiegelt — | ❌ Nein | — | Enthält App-Passwort (Klartext); nicht in Pflicht-Spiegelungsliste |
| `P7A_S1_ARCHITECTURE_IA_FREEZE.md` | — NICHT gespiegelt — | ❌ Nein | — | Nicht in Pflicht-Spiegelungsliste; für heutigen Stand nicht prioritär |
| `P7B_S2_ARCHITECTURE_IA_FREEZE.md` | — NICHT gespiegelt — | ❌ Nein | — | Nicht in Pflicht-Spiegelungsliste |
| `P7C_S5_QUALITY_HUB_FREEZE.md` | — NICHT gespiegelt — | ❌ Nein | — | Nicht in Pflicht-Spiegelungsliste |
| `S1_BUILD_01_STATUS.md` | — NICHT gespiegelt — | ❌ Nein | — | Build-Zwischenstand, nicht für externen Review relevant |
| `S2_BUILD_01_STATUS.md` | — NICHT gespiegelt — | ❌ Nein | — | Build-Zwischenstand |
| `S5_BUILD_01_STATUS.md` | — NICHT gespiegelt — | ❌ Nein | — | Build-Zwischenstand |
| `VITALWISSEN_STRATEGIE_REASSESSMENT_2026-04-18.md` | — NICHT gespiegelt — | ❌ Nein | — | Delta-/Historienquelle, nicht führend → `NOT_LEADING.md` |
| `P6B_*` (alle) | — NICHT gespiegelt — | ❌ Nein | — | Operative Crosslink-/Quellen-Schreibprotokolle; nicht für externen Review relevant |
| `P6D_06_STATUS.md` | — NICHT gespiegelt — | ❌ Nein | — | Komfortkopie (P6d); nicht in Pflicht-Spiegelungsliste |

---

## review_audits/ — Audit-Dokumente

| Arbeitsordner-Quelle | Ziel im Repo | Gespiegelt? | Roh oder redaktiert? | Begründung |
|----------------------|--------------|-------------|----------------------|------------|
| `P7D_05_PHASE_B_FULL_AUDIT.md` | `docs/review_audits/P7D_05_PHASE_B_FULL_AUDIT.md` | ✅ Ja | Roh (clean) | Phase-B-Vollaudit mit bleibendem Wert |

---

## Nicht gespiegelte Verzeichnisse (pauschal)

| Verzeichnis | Gespiegelt? | Begründung |
|-------------|-------------|------------|
| `00_REPO/` | ❌ Nein | Git-Clones — nicht für externen Review relevant |
| `02_PROJECT_SOURCES_ARCHIVE/` | ❌ Nein | Historische Session-Logs — nicht führend |
| `03_LEGACY/` | ❌ Nein | Veraltete Pakete |
| `04_OPS_SQL/` | ❌ Nein | Einmalige SQL-Operationen |
| Test-/OCR-/Handout-Dateien | ❌ Nein | Nicht relevant für externen Review |

---

## Security-Befunde (P7D-08)

| Datei | Befund | Maßnahme |
|-------|--------|----------|
| `CLAUDE.md` (Cowork-Root) | Supabase Anon Key, Secret Key, DB-URL mit PW, GitHub PAT, App-Passwort | → `CLAUDE_PUBLIC.md` (vollständig redaktiert) |
| `WORKFLOW_README.md` | Supabase Service Key im Klartext | → NICHT gespiegelt (optional + unsicher) |
| `WEBSITE_PROJECT_MASTER_DOSSIER.md` | App-Passwort | → NICHT gespiegelt (bereits aus anderen Gründen ausgeschlossen) |
| `P7_02_UEBERTRAG.md` | App-Passwort | → NICHT gespiegelt (nicht in Pflichtliste) |
| Alle anderen Kandidaten | CLEAN — kein Secret-Fund | → Roh gespiegelt |

*Hinweis: Secret-Werte werden in dieser Dokumentation nicht wiederholt.*
