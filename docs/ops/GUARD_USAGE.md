# GUARD_USAGE.md — VitalWissen Guard-Scripts Nutzungsanleitung

Stand: VW-HYGIENE-06D (2026-05-26)

---

## Welcher Guard wann

| Guard | Wann einsetzen |
|---|---|
| `workspace_guard.py` | Immer als erster Schritt — prüft Root-Struktur, ChatGPT-Ordner, Quarantäne |
| `secret_guard.py` | Immer — vor Export, nach Quellen-Arbeit, vor ChatGPT-Upload |
| `repo_guard.py` | Nur bei Code-/Repo-/Git-/Commit-/PR-Paketen |
| `deliverable_guard.py` | Am Ende jedes Pakets — prüft ob alle Required-Outputs vorhanden sind |

---

## Standard-Preflight

### Alle Pakete (Docs, Workspace, QA, Sources)

```bash
python3 06_QA_VALIDATION/workspace_guard.py
python3 06_QA_VALIDATION/secret_guard.py
```

### Zusätzlich für Code-/Repo-/Git-Pakete

```bash
python3 06_QA_VALIDATION/repo_guard.py
```

**Wichtig:** repo_guard FAIL wegen bekannt dirty `vitalwissen_repo_current` blockiert **nicht** reine Docs-/Workspace-/QA-Pakete ohne Git-Operationen. repo_guard FAIL blockiert aber alle Code-/Git-/Commit-/PR-Pakete.

---

## Standard-Closure (Abschluss jedes Pakets)

```bash
python3 06_QA_VALIDATION/deliverable_guard.py \
    --package-id <PAKET-ID> \
    --export-dir 09_AUDIT_EXPORTS/<PAKET-ORDNER> \
    --required datei1.md,datei2.md,datei3.md
python3 06_QA_VALIDATION/workspace_guard.py
python3 06_QA_VALIDATION/secret_guard.py
```

---

## Beispiele

### workspace_guard

```bash
python3 06_QA_VALIDATION/workspace_guard.py
python3 06_QA_VALIDATION/workspace_guard.py --workspace /pfad/zum/workspace
python3 06_QA_VALIDATION/workspace_guard.py --report /tmp/ws_report.md
```

### secret_guard

```bash
python3 06_QA_VALIDATION/secret_guard.py
python3 06_QA_VALIDATION/secret_guard.py --report /tmp/secret_report.md
```

Hinweis: secret_guard gibt keine Werte, keine Präfixe, keine Snippets aus.
Ausgabe pro Befund: Pfad, Zeilennummer, Befundtyp, Severity.

### repo_guard

```bash
python3 06_QA_VALIDATION/repo_guard.py
```

Hinweis: Nur lesende Git-Operationen. Remote-URLs werden nicht ausgegeben —
nur Repo-Name, Remote-Name, Host und Credential-in-URL: JA/NEIN.

### deliverable_guard

```bash
# Pflichtdateien prüfen (read-only)
python3 06_QA_VALIDATION/deliverable_guard.py \
    --package-id VW-HYGIENE-05 \
    --export-dir 09_AUDIT_EXPORTS/VW_HYGIENE_05 \
    --required VW_HYGIENE_05_GUARD_SCRIPTS_BUILD.md,GUARD_TEST_RESULTS.md,FILES_CHANGED.md

# Mit SHA256-Manifest (schreibt MANIFEST_SHA256.json in Exportordner)
python3 06_QA_VALIDATION/deliverable_guard.py \
    --package-id VW-HYGIENE-05 \
    --export-dir 09_AUDIT_EXPORTS/VW_HYGIENE_05 \
    --required VW_HYGIENE_05_GUARD_SCRIPTS_BUILD.md,GUARD_TEST_RESULTS.md,FILES_CHANGED.md \
    --write-manifest
```

---

## Exit Codes (alle Scripts)

| Code | Bedeutung |
|---|---|
| 0 | PASS |
| 1 | PASS_WITH_WARNINGS |
| 2 | FAIL / BLOCKED |

---

## repo_guard FAIL — wann blockiert es?

| Paket-Typ | repo_guard FAIL blockiert? |
|---|---|
| Docs-/Workspace-/QA-/Sources-Paket (kein Git) | **NEIN** — nur dokumentieren |
| Code-Build-Paket (Netlify, Frontend) | **JA** — kein Build aus dirty Clone |
| Git-Commit/PR/Push-Paket | **JA** — kein Commit aus dirty Clone |
| Supabase-Only-Paket (kein Git) | **NEIN** — nur dokumentieren |

Bekannter Dauerzustand: `vitalwissen_repo_current` ist dirty.
Code-Arbeit immer mit frischem Session-Clone in `/sessions/`.

---

## Wichtige Regeln

- **Keine langen Reports in Chats posten** — nur Summary (PASS/WARN/FAIL + Anzahl)
- secret_guard: gibt **keine Werte, keine Präfixe, keine Snippets** aus
- repo_guard: führt **keine schreibenden Git-Operationen** durch, gibt keine URLs aus
- deliverable_guard: schreibt **nur in den angegebenen Exportordner** (und nur mit `--write-manifest`)
- Alle Scripts: **keine pip installs**, nur Python-Standardbibliothek

---

## Hinweis zu WARN-Befunden im secret_guard

Der secret_guard liefert häufig WARN-Befunde für:
- `service_role` in Spec-/Doku-/SQL-Dateien → normal, kein Blocker
- JWT Header/Payload (2 Segmente) in Doku → normal
- Bearer Token in Doku-Beispielen → normal

WARN = prüfen ob Doku-/Template-Referenz oder echter Credential-Wert.
Echter vollständiger Credential-Wert → FAIL → Datei redigieren.

---

## workspace_guard Mirror-Mode (ab VW-HYGIENE-06D)

`workspace_guard.py` unterstützt ab Paket VW-HYGIENE-06D zwei Zustände für `10_CHATGPT_PROJECT_SOURCES_CURRENT/`:

**Zustand 1 — vorbereitete leere Struktur (vor Mirror-Build):**
- `README_UPLOAD_RULES.md` vorhanden
- `00_CORE_SET/` und `01_ACTIVE_STRANDS/` leer → OK
- `02_STATUS_AND_RULES/` und `03_BLOCKED_EVIDENCE_SUMMARIES/` leer oder fehlend → OK (WARN)

**Zustand 2 — befüllte Core-Mirror-Struktur (nach VW-HYGIENE-07):**
- Mirror-Unterordner dürfen kuratierte `.md`-, `.yaml`- oder `.yml`-Dateien enthalten
- **Jede Mirror-Datei muss einen MIRROR METADATA Header** innerhalb der ersten 12 Zeilen haben
- Für `.md`-Dateien: Header als HTML-Kommentar oder freier Text mit allen 7 Pflichtfeldern
- Für `.yaml`/`.yml`-Dateien: Header als `#`-Kommentar-Zeilen

**Pflichtfelder im Header:**
`MIRROR METADATA` · `Source path:` · `Generated/copied by package:` · `Upload status:` · `Canon status:` · `Known limitations:` · `Last review date:`

**Verboten im Mirror (→ FAIL):**
- v5-Rohdaten (Muster `vitalwissen_datenabzug`, `datenabzug`)
- QA-Rohdateien (`.zip`, `.json`, `.csv`, `.py`, `.sql`, `.html`, `.pdf`, Bilddateien)
- Rohe `CLAUDE.md` (Credential-Hinweise)
- Muster: `quality_gate_findings`, `quality_gate_raw_counts`, `url_inventory`, `DELETE_CANDIDATES`, `ZU_LOESCHEN`
- Dateien ohne MIRROR METADATA Header
- Unterordner innerhalb der Mirror-Unterordner

**Erlaubte Sonderfälle:**
- `CLAUDE_REDACTED_SHORT.md` → erlaubt (mit korrektem Header)
- `README_*`-Dateien als `.md` → erlaubt (mit Header)
- `02_STATUS_AND_RULES/` und `03_BLOCKED_EVIDENCE_SUMMARIES/` → erlaubte Unterordner, aber nur mit kuratierten `.md`/`.yaml`-Dateien mit Header

---

---

## chatgpt_bundle_guard.py (ab VW-HYGIENE-08A, aktualisiert VW-HYGIENE-09B)

**Zweck:** Prüft das `DATEN_FUER_CHATGPT/` Upload-Bundle vollständig auf Korrektheit.
Read-only, keine Dateiänderungen. Python-Standardbibliothek only.

**Was geprüft wird:**
- Exakt 12 Pflichtdateien in `DATEN_FUER_CHATGPT/` (keine Zusatzdateien außer `.DS_Store`)
- MIRROR METADATA Header in den ersten 12 Zeilen jeder Datei
- Header enthält: `DRAFT_NOT_UPLOADED`, `NOT_CANON`, `Generated/copied by package`
- Hash-Gleichheit: Mirror-Datei (in `10_CHATGPT_PROJECT_SOURCES_CURRENT`) vs. Upload-Datei — Hash nur über Body (ohne Header-Block)
- `04_PROJECT_STATE_CURRENT.yaml`: enthält `upload_ready: true`, `upload_folder: DATEN_FUER_CHATGPT`, `upload_folder_file_count: 12`, kein doppelter `upload_ready`-Key
- Verbotene Dateinamen/Erweiterungen in `DATEN_FUER_CHATGPT/`

**Nutzung:**
```bash
python3 06_QA_VALIDATION/chatgpt_bundle_guard.py
```

**Exit-Codes:** 0=PASS, 1=PASS_WITH_WARNINGS, 2=FAIL

---

## chatgpt_bundle_sync.py (ab VW-HYGIENE-08A, aktualisiert VW-HYGIENE-09B)

**Zweck:** Synchronisiert 12 Quelldateien → Mirror (`10_CHATGPT_PROJECT_SOURCES_CURRENT`) → Upload (`DATEN_FUER_CHATGPT`).
Standard: Dry-run (keine Dateiänderungen). Mit `--apply` werden Dateien geschrieben.

**CLI:**
```bash
# Dry-run (prüft was geändert werden würde, schreibt nichts)
python3 06_QA_VALIDATION/chatgpt_bundle_sync.py --package-id VW-HYGIENE-09B

# Apply (schreibt Dateien, --report-dir Pflicht)
python3 06_QA_VALIDATION/chatgpt_bundle_sync.py \
    --package-id VW-HYGIENE-09B \
    --report-dir 09_AUDIT_EXPORTS/VW_HYGIENE_09B \
    --apply
```

**Pflichtparameter:**
- `--package-id` immer Pflicht
- `--report-dir` Pflicht bei `--apply`

**Hard Stops (Exit 2):**
- `--package-id` fehlt
- `--apply` ohne `--report-dir`
- CLAUDE.md als Quelle
- Zusatzdateien in `DATEN_FUER_CHATGPT/`
- Unerwartete Mirror-Dateien in `10_CHATGPT_PROJECT_SOURCES_CURRENT/`
- Nach Apply: Hash Mirror→DATEN nicht 12/12 identisch

**Nach `--apply`:** Ruft automatisch `chatgpt_bundle_guard.py` auf und schreibt Report nach `{report-dir}/CHATGPT_BUNDLE_SYNC_REPORT.md`.

**Exit-Codes:** 0=PASS, 1=PASS_WITH_WARNINGS, 2=FAIL

---

## Bundle-Sync Standardregel (ab VW-HYGIENE-08A, aktualisiert VW-HYGIENE-09B)

Nach jedem Paket prüfen, ob das ChatGPT-Bundle betroffen ist:

| Datei geändert | Aktion |
|---|---|
| `AUDIT_CANON_CURRENT.md` | sync_required: true → apply |
| `ACTIVE_STRANDS_CURRENT.md` | sync_required: true → apply |
| `PROJECT_STATE_CURRENT.yaml` | sync_required: true → apply |
| `README_WORKSPACE.md` | sync_required: true → apply |
| `README_AGENTS.md` | sync_required: true → apply |
| `06_QA_VALIDATION/GUARD_USAGE.md` | sync_required: true → apply |
| `06_QA_VALIDATION/PACKAGE_CONTRACT_TEMPLATE.yaml` | sync_required: true → apply |
| `10_CHATGPT_PROJECT_SOURCES_CURRENT/00_CORE_SET/CLAUDE_REDACTED_SHORT.md` | sync_required: true → apply |
| `01_PROJECT_SOURCES_CURRENT/VW_04_ENTSCHEIDUNGEN.md` | sync_required: true → apply |
| `01_PROJECT_SOURCES_CURRENT/P7D_ARCHITECTURE_RESET_FREEZE.md` | sync_required: true → apply |
| `01_PROJECT_SOURCES_CURRENT/AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md` | sync_required: true → apply |
| `01_PROJECT_SOURCES_CURRENT/VW_06_WEBSITE.md` | sync_required: true → apply |
| Keine der obigen Dateien geändert | guard_only dokumentieren |

**Workflow:**
1. Dry-run: `chatgpt_bundle_sync.py --package-id <ID>`
2. Bei PASS/PASS_WITH_WARNINGS und Freigabe: `--apply` mit `--report-dir`
3. Ergebnis in `PACKAGE_CONTRACT.yaml` unter `chatgpt_bundle.sync_mode` dokumentieren

**Kein automatischer ChatGPT-Upload.** Sebastian lädt die 12 Dateien aus `DATEN_FUER_CHATGPT/` manuell in ChatGPT-Projektquellen hoch.

---

## workspace_guard DATEN_FUER_CHATGPT-Validierung (ab VW-HYGIENE-07B, aktualisiert VW-HYGIENE-09B)

`workspace_guard.py` validiert ab VW-HYGIENE-07B zusätzlich den Upload-Bundle-Ordner `DATEN_FUER_CHATGPT/`.

**Zustand 1 — Ordner leer:**
- WARN: `DATEN_FUER_CHATGPT_EMPTY` — kein Blocker

**Zustand 2 — exakt 12 Upload-Dateien (ab VW-HYGIENE-09B):**
- Alle 12 Dateien mit MIRROR METADATA Header (innerhalb erster 12 Zeilen) → PASS
- `Upload status: DRAFT_NOT_UPLOADED` Pflicht (nicht nur `DRAFT`)

**Verboten im Upload-Bundle (→ FAIL):**
- Unterordner
- ZIP, JSON, CSV, PY, SQL, HTML, PDF, Bilder
- Rohe `CLAUDE.md`
- v5-/Evidence-/QA-Rohdaten (Substring-Muster: `v5`, `raw`, `datenabzug`, `evidence`, `quality_gate`, `archive`, `ZU_LOESCHEN`, `DELETE_CANDIDATES`)
- Audit-/Closure-Dateien: `README_UPLOAD_RULES.md`, `PACKAGE_CONTRACT.yaml`, `GUARD_RESULTS.md`, `FILES_CHANGED.md`, `OPS_CLOSURE.md` etc.

**Erlaubte Dateien (exakt diese 12 ab VW-HYGIENE-09B):**
`01_AUDIT_CANON_CURRENT.md` · `02_CLAUDE_REDACTED_SHORT.md` · `03_ACTIVE_STRANDS_CURRENT.md` · `04_PROJECT_STATE_CURRENT.yaml` · `05_README_WORKSPACE.md` · `06_README_AGENTS.md` · `07_GUARD_USAGE.md` · `08_PACKAGE_CONTRACT_TEMPLATE.yaml` · `09_VW_04_ENTSCHEIDUNGEN.md` · `10_P7D_ARCHITECTURE_RESET_FREEZE.md` · `11_AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md` · `12_VW_06_WEBSITE.md`

---

## External Systems Matrix (ab VW-OPS-01)

Die vollständige Regelmatrix für GitHub, Supabase und Netlify steht in:
**`06_QA_VALIDATION/EXTERNAL_SYSTEMS_MATRIX.md`**

**Wann EXTERNAL_SYSTEMS_MATRIX.md zu lesen:**
- Vor jedem Paket, das GitHub, Supabase oder Netlify berührt
- Bei Unsicherheit welche Stufe (GH/SB/NF) ein Paket braucht
- Beim Ausfüllen des `external_systems`-Blocks im PACKAGE_CONTRACT.yaml

**Guard-Nutzung nach Stufe:**

| Stufe | repo_guard nötig? |
|---|---|
| GH0 (Standard, keine Git-Berührung) | NEIN |
| GH1–GH2 (read-only) | NEIN |
| GH3+ (Commit, Push, PR) | JA — muss PASS oder PASS_WITH_WARNINGS sein; bei FAIL: BLOCKED |

**Weitere Stufen-Regeln:**

- **GH3+:** frischer/sauberer Clone ist Pflicht. `vitalwissen_repo_current` darf nicht committet werden. BLOCKED_STALE_DIRTY_CLONE.
- **SB1+:** Supabase-Scope (Tabellen, Operation) muss im Contract stehen.
- **SB2+:** Post-Write-Validierungen (Rows affected, RLS-Check, Count) müssen im Closure dokumentiert werden.
- **NF2+:** Deploy-/Live-Smoke-Nachweise (Deploy-Hash, Routes, Smoke-Ergebnis) müssen im Closure dokumentiert werden.
- **Reine Docs-/Workspace-/Mirror-Pakete:** `external_systems: GH0/SB0/NF0`, repo_guard nicht nötig, Closure nur "not_touched".

---

## Supabase-Schema-/DB-Pakete: GRANT + RLS + Policy gemeinsam prüfen (ab VW-OPS-SUPABASE-GRANTS-01)

Für alle Pakete, die neue Supabase-public-Tabellen anlegen oder Schema-Migrationen durchführen:

**Pflichtprüfung vor Migration-Apply:**

| Punkt | Prüfung |
|-------|---------|
| GRANT | Ist `GRANT SELECT ON TABLE public.<tabellenname> TO anon` vorhanden? |
| GRANT | Ist `GRANT SELECT ON TABLE public.<tabellenname> TO authenticated` vorhanden? |
| RLS | Ist `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` vorhanden? |
| Policy | Ist `CREATE POLICY` vorhanden? |
| Kein Bulk-GRANT | Enthält das SQL kein `GRANT ALL ON ALL TABLES`? |
| PACKAGE_CONTRACT | Ist `supabase_grants.explicit_data_api_grants_checked: true` gesetzt? |

**Wichtig:** GRANT und RLS sind getrennte Schichten.
- GRANT = Tabelle über Data API erreichbar
- RLS = Zeilenkontrolle

Ohne GRANT: Tabelle gibt 403 Forbidden — RLS-Policies laufen nicht.
Ohne RLS: Alle Zeilen sichtbar trotz GRANT.

**Pflichtlektüre:** `01_PROJECT_SOURCES_CURRENT/SUPABASE_DATA_API_GRANTS_FREEZE.md`

**Templates:**
- `04_OPS_SQL/supabase_public_read_table_template.sql` — öffentliche Content-Tabellen
- `04_OPS_SQL/supabase_private_table_template.sql` — interne/private Tabellen

**Audit-Skript (read-only, Manuel-Ausführung durch Sebastian):**
- `04_OPS_SQL/supabase_data_api_grants_audit.sql`

*Ergänzt durch VW-OPS-01 — External Systems Matrix — 2026-05-26*
*Ergänzt durch VW-OPS-SUPABASE-GRANTS-01 — GRANT+RLS+Policy Pflichtprüfung — 2026-05-28*
