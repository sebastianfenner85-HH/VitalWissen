# README_WORKSPACE — VitalWissen Arbeitsordner

> **Gültig ab:** 2026-05-26 (VW-HYGIENE-04)
> **Paket-ID:** VW-HYGIENE-04
> **Status:** Operating Rules Freeze

---

## 1. Zweck dieses Ordners

Dies ist der **lokale VitalWissen-Arbeitsordner** auf Sebastians Rechner.

Er ist **nicht** das GitHub-Repository.
Er ist **nicht** automatisch eine ChatGPT-Projektquelle.
Er ist **nicht** automatisch eine Deployment-Quelle.

Änderungen hier führen nicht automatisch zu einem Git-Commit, einem Netlify-Deploy oder einem Supabase-Write. Solche Aktionen brauchen immer eine explizite Freigabe.

---

## 2. Root-Vertrag

Der Root dieses Arbeitsordners darf ausschließlich folgende Einträge enthalten:

### Erlaubte Root-Dateien
- `CLAUDE.md`
- `AUDIT_CANON_CURRENT.md`
- `ACTIVE_STRANDS_CURRENT.md`
- `README_WORKSPACE.md` ← diese Datei
- `README_AGENTS.md`
- `PROJECT_STATE_CURRENT.yaml`

### Erlaubte Root-Ordner
- `00_REPO/`
- `01_PROJECT_SOURCES_CURRENT/`
- `02_PROJECT_SOURCES_ARCHIVE/`
- `03_LEGACY/`
- `04_OPS_SQL/`
- `05_EVIDENCE_EXPORTS/`
- `06_QA_VALIDATION/`
- `07_TEST_FIXTURES/`
- `07_AGENT_SYSTEM/`
- `08_DELIVERABLES/`
- `09_AUDIT_EXPORTS/`
- `10_CHATGPT_PROJECT_SOURCES_CURRENT/`
- `DATEN_FUER_CHATGPT/`

### Tolerierte System-Artefakte
- `.DS_Store` (macOS, nicht entfernen)

### Verboten
- Kein neuer Root-Ordner ohne explizite Freigabe durch Sebastian.
- Keine neue Root-Datei ohne explizite Freigabe oder Paketauftrag.
- Keine temporären Dateien, keine Zwischenergebnisse, keine Session-Dumps im Root.
- Exporte immer unter `09_AUDIT_EXPORTS/<PACKAGE_ID>/` ablegen — nie direkt im Root.

---

## 3. Ordnerrollen

| Ordner | Rolle |
|--------|-------|
| `00_REPO/` | Lokale Git-Clones. `vitalwissen_repo_current` ist der kanonische Clone, aber stale/dirty — Commits immer aus frischem Session-Clone. Kein Auto-Commit aus diesem Pfad. |
| `01_PROJECT_SOURCES_CURRENT/` | **Führende Projektquellen.** Specs, Freezes, Closures, Status-Dokumente. Einzige Wahrheitsquelle für Architektur- und Sprint-Entscheidungen. |
| `02_PROJECT_SOURCES_ARCHIVE/` | Abgelöste Quellen und historische Session-Logs. Nur Referenz, nicht führend. |
| `03_LEGACY/` | Altmaterial (z. B. altes Supabase-Anbindungspaket P3). Nur als historische Referenz. |
| `04_OPS_SQL/` | SQL- und Ops-Dateien, einmalig genutzte Migrations-Skripte. |
| `05_EVIDENCE_EXPORTS/` | Datenabzüge, Evidence Packs, Review-Artefakte (z. B. v5-Export). |
| `06_QA_VALIDATION/` | Validatoren, Guard-Scripts, Package-Contract-Template, External Systems Matrix. |
| `07_TEST_FIXTURES/` | Testmaterial und Fixtures. |
| `07_AGENT_SYSTEM/` | **VitalWissen Agent System (Phase A).** 7 Agenten-Prompts, Routing-Matrix, Autonomie-Level, Entscheidungsmatrix. Angelegt durch VW-AGENT-PHASE-B1_REGISTRY (2026-06-10). |
| `08_DELIVERABLES/` | Fertige Outputs und Deliverables. |
| `09_AUDIT_EXPORTS/` | Audit-/Closure-/Hygiene-Exporte und Quarantäne. Exporte immer hier ablegen. |
| `10_CHATGPT_PROJECT_SOURCES_CURRENT/` | Vorbereiteter, nicht-kanonischer ChatGPT-Upload-Spiegel. Kein Kanon, kein Auto-Upload. |

---

## 4. Quarantäne-Regel

Der Ordner `09_AUDIT_EXPORTS/ZU_LOESCHEN_MANUELL_2026-05-25` enthält vorgemerktes Löschmaterial aus VW-HYGIENE-03E.

**Regeln:**
- Nicht automatisch löschen.
- Erst nach abgeschlossenen Guard-Scripts (VW-HYGIENE-05) oder nach manueller Prüfung durch Sebastian entfernen.
- Kein Agent darf diesen Ordner ohne explizite Freigabe löschen oder verschieben.

---

## 5. ChatGPT-Spiegel-Regel

`10_CHATGPT_PROJECT_SOURCES_CURRENT/` ist **kein Kanon** und kein automatischer Upload-Ordner.

**Verboten ohne eigenes Spiegel-Paket:**
- Keine Datenabzüge aus anderen Ordnern kopieren.
- Keine rohe `CLAUDE.md` (enthält Credentials-Hinweise und Strukturinformationen).
- Keine Secrets oder Credential-Fragmente.
- Keine Audit-ZIPs.
- Kein Upload nach ChatGPT ohne vorherigen Secret-Scan.

**Erlaubt:**
- Strukturordner und `README_UPLOAD_RULES.md` verwalten.
- Neuen Spiegel-Stand nur nach explizitem Spiegel-Paket aufbauen.

---

---

## 6. DATEN_FUER_CHATGPT — Upload-Bundle

`DATEN_FUER_CHATGPT/` ist ein freigegebener optionaler Top-Level-Ordner (ab VW-HYGIENE-07B).

**Zweck:** Manuelles Upload-Bundle für ChatGPT-Projektquellen. Sebastian lädt exakt die 12 Dateien aus diesem Ordner in ChatGPT-Projektquellen hoch (ab VW-HYGIENE-09B, vorher 8).

**Regeln:**
- Nicht Kanon. Ersetzt nicht `10_CHATGPT_PROJECT_SOURCES_CURRENT/`.
- Darf nur durch dedizierte Hygiene-/Mirror-Pakete erzeugt oder aktualisiert werden.
- Inhalt muss exakt durch `workspace_guard.py` validierbar sein.
- Keine ZIPs, keine Rohdaten, keine Audit-/Closure-Dateien, keine rohe `CLAUDE.md`.
- Alle Dateien flach (keine Unterordner), mit MIRROR METADATA Header und `Upload status: DRAFT_NOT_UPLOADED`.

---

---

## 7. DATEN_FUER_CHATGPT — Sync-Framework (ab VW-HYGIENE-08A)

`DATEN_FUER_CHATGPT/` wird ausschließlich über `chatgpt_bundle_sync.py` erzeugt und aktualisiert.

**Regeln:**
- Manuelle Änderungen an Dateien in `DATEN_FUER_CHATGPT/` sind verboten.
- Aktualisierung nur durch: `python3 06_QA_VALIDATION/chatgpt_bundle_sync.py --package-id <ID> --report-dir <PFAD> --apply`
- Upload nach ChatGPT bleibt immer manuell durch Sebastian.
- Nach jedem Paket, das relevante Quelldateien ändert (siehe GUARD_USAGE.md §Bundle-Sync Standardregel), muss der Sync ausgeführt und in `PACKAGE_CONTRACT.yaml` dokumentiert werden.
- Wenn keine relevanten Dateien geändert wurden: `chatgpt_bundle.sync_mode: guard_only` im Contract dokumentieren.

**Erlaubte Root-Ordner (aktualisiert):**
`DATEN_FUER_CHATGPT/` ist ein freigegebener Top-Level-Ordner (ab VW-HYGIENE-07B). Er ist in `workspace.allowed_root_folders` erfasst.

---

*Erstellt durch VW-HYGIENE-04 — Operating Rules Freeze — 2026-05-26*
*Aktualisiert durch VW-HYGIENE-07B — DATEN_FUER_CHATGPT Upload-Bundle — 2026-05-26*
*Aktualisiert durch VW-HYGIENE-08A — chatgpt_bundle_sync Framework — 2026-05-26*
*Aktualisiert durch VW-HYGIENE-08B — Bundle-Framework-Konsistenz-Patch — 2026-05-26*
*Aktualisiert durch VW-OPS-01 — 06_QA_VALIDATION-Rollenbeschreibung aktualisiert — 2026-05-26*
*Aktualisiert durch VW-HYGIENE-09B — DATEN_FUER_CHATGPT 8→12 Dateien, 4 neue Core-Quellen — 2026-05-26*
