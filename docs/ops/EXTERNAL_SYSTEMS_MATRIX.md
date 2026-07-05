# EXTERNAL_SYSTEMS_MATRIX.md
# VitalWissen — Externe Systeme: Erlaubnisstufen, Pakettypen, Guards, Closure
# Stand: VW-GITHUB-SOT-CLOSEOUT-01 (2026-07-05)
# Gültig für: Cowork, Codex, ChatGPT

---

## 1. Zweck

Diese Matrix definiert **wann und wie** GitHub, Supabase und Netlify in einem VitalWissen-Paket berührt werden dürfen.

**Ziel:** Weniger Prompt-Länge, mehr operative Sicherheit.
- Künftige Paket-Prompts müssen externe Systeme nur noch als `external_systems`-Block im PACKAGE_CONTRACT.yaml deklarieren.
- Der Standardwert ist immer `GH0 / SB0 / NF0` (keine Berührung).
- Jede Abweichung braucht explizite Begründung, Actor-Benennung und Closure-Nachweis.

**Gültig für:**
- **Cowork** (Claude Desktop, lokaler Workspace-Zugriff)
- **Codex** (OpenAI, Code/Repo-Zugriff)
- **ChatGPT** (Paketplanung, kein Dateisystem-Zugriff)

---

## 2. Systemrollen

### GitHub
- **Rolle:** Code-Quelle / Repository / PR-/Commit-Ort
- **Schreibzugriffe** nur in explizit deklarierten Code-/Repo-Paketen
- **Bevorzugter Actor:** Codex (für Branches, Commits, PRs — niemals Direkt-Push auf `main`, niemals Merge)
- **Codearbeit** mit modusgerechtem Preflight nach Root-`AGENTS.md`: Codex Cloud über verifizierten Workspace/HEAD, lokal über frischen oder sicher sauberen Clone/Worktree — **niemals** aus `00_REPO/vitalwissen_repo_current` (stale/dirty)
- **Cowork** darf GitHub nur lesen (GH1/GH2), nie committen oder pushen

### Supabase
- **Rolle:** Datenbank / RLS / Content-/Schema-Writes
- **Kein Write** ohne explizite DB-Paketfreigabe
- **Read-only** nur wenn im Paket erlaubt (SB1)
- **Writes** erfordern: Tabellenliste, SQL/Mutation, Scope (WHERE/Limit), Rückgabekontrolle, RLS-/Count-/SELECT-Verifikation
- **Schema-Migrations** (SB3) erfordern Migrations-/Rollback-Plan + RLS-Plan

### Netlify
- **Rolle:** Hosting / Deploy-Verifikation
- **Standard:** Auto-Deploy nach geprüftem PR-Merge auf `main` (kein manueller Eingriff nötig)
- **Kein manueller Deploy** ohne ausdrückliche Freigabe
- **Live-Smoke-Test** (NF3) nur bei Frontend-/Routing-/UX-Paketen oder explizitem Deploy-Check
- **ENV-Var-Änderungen** (NF5) immer explizit freigeben

---

## 3. Pakettypen-Matrix

| Pakettyp | GitHub | Supabase | Netlify | Required Actor | Required Guards | Required Closure Evidence | ChatGPT Bundle Action |
|---|---|---|---|---|---|---|---|
| `docs_workspace` | GH0 | SB0 | NF0 | Cowork | workspace, secret | FILES_CHANGED, OPS_CLOSURE | guard_only oder apply je nach Dateiänderung |
| `mirror_chatgpt_bundle` | GH0 | SB0 | NF0 | Cowork | workspace, secret, bundle_guard, bundle_sync | CHATGPT_BUNDLE_SYNC_REPORT, FILES_CHANGED, OPS_CLOSURE | apply |
| `source_research_readonly` | GH0 | SB0 | NF0 | Cowork | workspace, secret | FILES_CHANGED, OPS_CLOSURE | guard_only oder apply |
| `db_readonly_audit` | GH0 | SB1 | NF0 | Cowork / Sebastian | workspace, secret | DB_READ_SCOPE, OPS_CLOSURE | guard_only |
| `db_content_write` | GH0 | SB2 | NF0 | Cowork / Sebastian | workspace, secret | DB_WRITE_SCOPE + Rows + RLS-Check, OPS_CLOSURE | guard_only oder apply |
| `db_schema_write` | GH0 | SB3 | NF0 | Sebastian + Cowork | workspace, secret | MIGRATION_PLAN, DB_SCHEMA_WRITE_SCOPE, RLS-Plan, OPS_CLOSURE | guard_only |
| `frontend_code_build` | GH3–GH4 | SB0 | NF0 | Codex | workspace, secret, repo | COMMIT_HASH, PR_URL, BUILD_TEST_RESULT, OPS_CLOSURE | apply |
| `repo_only_maintenance` | GH1–GH4 | SB0 | NF0 | Codex / ChatGPT | workspace, secret, repo | COMMIT_HASH oder READ_EVIDENCE, FILES_CHANGED, PR_URL falls GH4, OPS_CLOSURE | guard_only |
| `deploy_verification` | GH2 | SB0 | NF2–NF3 | Cowork / ChatGPT / Sebastian | workspace, secret | MERGED_PR_OR_COMMIT, DEPLOY_HASH, LIVE_ROUTES, SMOKE_RESULT, OPS_CLOSURE | guard_only |
| `emergency_hotfix` | GH3–GH5 (Sebastian-Merge-Go Pflicht; Codex max GH4) | SB0 | NF0–NF3 | Sebastian + Codex | workspace, secret, repo | COMMIT_HASH, PR_URL, MERGE_HASH, HOTFIX_SCOPE, OPS_CLOSURE | apply |

---

## 4. Erlaubnisstufen

### 4.1 GitHub — GH0 bis GH5 (PR-only-Modell, ab VW-GITHUB-SOT-CLOSEOUT-01)

Normaler GitHub-Produktionsweg: **kein Direktpush auf `main`.** Produktive Änderungen laufen über Feature-Branch → PR → Required Checks → Review → Sebastian-GO → Merge.

| Stufe | Name | Erlaubt | Nicht erlaubt |
|---|---|---|---|
| **GH0** | none | keine GitHub-Berührung | — |
| **GH1** | local_status_read_only | lokaler `git status`/`git log`, lokale Read-only-Repo-Info | Remote-Write, Commit, Branch-Änderung |
| **GH2** | remote_read_only | Repository/Dateien/PRs/Branches/Commits/Checks/Workflows lesen | jede GitHub-Write-Aktion |
| **GH3** | feature_branch_write | nicht geschützten Feature-Branch erstellen, erlaubte Dateien dort schreiben, Commits auf Feature-Branch | direkter `main`-Write, Merge, PR-Lifecycle-Aktionen (ausser zusätzlich GH4 erlaubt) |
| **GH4** | pr_lifecycle_write | PR erstellen, PR-Metadaten aktualisieren, Draft/Ready verwalten, PR schliessen, freigegebenen nicht mehr benötigten Feature-Branch entfernen (nur wenn Tool dies unterstützt) | Merge, direkter `main`-Write, Admin-Bypass |
| **GH5** | approved_pr_merge | **nur** Merge eines bereits geprüften PRs, wenn: (1) explizites Sebastian-Merge-Go, (2) PR inhaltlich geprüft, (3) Required Checks grün, (4) kein offener Blocker, (5) Tool unterstützt Merge | normaler Direktpush auf `main`, Codex-Merge, Cowork-Merge, automatischer Admin-Bypass |

**Emergency Bypass:** kein Teil von GH0–GH5. Eigener Ausnahmefall — nur Sebastian, nur akut, ausdrücklich begründet, separat dokumentiert. Niemals Standardworkflow oder normale Alternative zu roten Required Checks.

**Actor-Grenzen:**

| Actor | Maximalstufe | Hinweis |
|---|---|---|
| Cowork | GH2 | remote read-only, kein GitHub-Write |
| Codex | GH4 | niemals Merge |
| ChatGPT | GH2 Standard | GH3/GH4 nur für kleine, klar begrenzte Connector-Aufgaben; GH5 nur nach explizitem Sebastian-Merge-Go |
| Sebastian | bis GH5 | Emergency Bypass nur Sebastian |

---

### 4.2 Supabase — SB0 bis SB5

| Stufe | Name | Erlaubt wenn | Verboten wenn | Vorbedingungen | Nachweise |
|---|---|---|---|---|---|
| **SB0** | none | immer (Standard) | — | — | "Supabase: not_touched" in OPS_CLOSURE |
| **SB1** | read_only_select | Audit, Review, Verifikation | kein Write, kein Schema-Touch | Tabelle(n) im Contract benannt | Tabellen + Query-Typ in Closure |
| **SB2** | content_write_existing_schema | Content-Import, DB-Patch, Seed | kein ALTER TABLE, kein Schema-Change | Tabellenliste + Operation + WHERE/Scope im Contract, Sebastian Go | Rows affected, RLS-Check, anon/public visibility check in Closure |
| **SB3** | schema_migration | Schema-Migration mit Migrations-/Rollback-Plan | kein Rollback-Plan, kein RLS-Plan vorhanden | Migrations-SQL gereviewed, RLS-Plan + Rollback-Plan vorhanden, Sebastian Go | Migration-Statements, RLS-Policies, Row Count nach Migration in Closure |
| **SB4** | secrets_env_management | Netlify-ENV, Supabase-Secrets Verwaltung | Secret-Ausgabe in Logs | Secrets nur boolesch prüfen (existiert/fehlt), kein Wert ausgeben | Existenz-/Status-Check (boolean), kein Wert in Closure |
| **SB5** | destructive_or_bulk_operation | Bulk-Delete, Truncate, DROP explizit freigegeben | ohne expliziten schriftlichen Go von Sebastian | Backup/Snapshot-Plan vorhanden, Sebastian schriftliches Go | Operation + Scope + Row-Count-Vorher/Nachher + Backup-Status in Closure |

### 4.3 Netlify — NF0 bis NF5

| Stufe | Name | Erlaubt wenn | Verboten wenn | Vorbedingungen | Nachweise |
|---|---|---|---|---|---|
| **NF0** | none | immer (Standard) | — | — | "Netlify: not_touched" in OPS_CLOSURE |
| **NF1** | deploy_status_read | Deployment-Status prüfen (Read-only) | kein Trigger, kein Redeploy | Netlify-Zugang vorhanden | Deploy-Status + letzter Deploy-Hash in Closure |
| **NF2** | auto_deploy_verify_after_merge | Nach geprüftem PR-Merge auf `main`: Auto-Deploy-Status verifizieren | kein manueller Trigger | GH5 abgeschlossen (PR gemergt), Auto-Publishing AN | Deploy-Hash, Deploy-Source-Branch, Deploy-Timestamp in Closure |
| **NF3** | live_smoke_test | Nach Deploy: UI/Routes live prüfen | ohne vorherigen Deploy | NF2 abgeschlossen oder expliziter Deploy-Bezug | Geprüfte Routes, Console-Errors, Smoke-Ergebnis in Closure |
| **NF4** | manual_deploy_or_redeploy | Manueller Deploy explizit freigegeben | ohne explizite Freigabe | Sebastian Go, Deploy-Begründung im Contract | Trigger-Methode, Deploy-Hash, Timestamp, Smoke-Ergebnis in Closure |
| **NF5** | env_var_change | ENV-Var setzen/ändern explizit freigegeben | Secret-Werte in Logs/Closures ausgeben | Variable(n) im Contract benannt (nur Name, kein Wert), Sebastian Go | Variablen-Name(n) + Existenz-Check (boolean), kein Wert in Closure |

---

## 5. Default-Regeln

1. **Standard ist GH0 / SB0 / NF0** — kein externes System wird berührt.
2. **Jede Abweichung** muss im `PACKAGE_CONTRACT.yaml` unter `external_systems` stehen.
3. **GitHub, Supabase und Netlify dürfen nie implizit** aus dem Pakettyp abgeleitet werden — immer explizit deklarieren.
4. **Kein Secret-Wert** darf ausgegeben werden — Credential-/Env-Checks nur als boolesche Existenz-/Statusangabe.
5. **Codepakete:** modusgerechter Preflight nach Root-`AGENTS.md` ist Pflicht. Codex Cloud prüft Workspace/HEAD/Scope/sauberen Status; lokale Modi arbeiten aus frischem oder sicher sauberem Clone/Worktree. `00_REPO/vitalwissen_repo_current` darf nicht direkt committet werden.
6. **DB-Writes:** Tabellen, Operation, WHERE/Scope, Rückgabeprüfung, RLS-Verifikation sind Pflicht im Closure.
7. **Netlify:** Nur nach geprüftem PR-Merge auf `main` oder bei explizitem Deploy-Check relevant — nicht bei reinen Docs-/Workspace-/Mirror-Paketen.
8. **Reine Docs-/Workspace-/Mirror-Pakete:** keine externen Systeme berühren; im Closure nur "not_touched" dokumentieren.
9. **repo_guard:** Nur wenn tatsächlich ein lokaler Git-Clone/Worktree benutzt wird oder das Paket dies ausdrücklich verlangt. Nicht allein wegen GH2-Connector-/API-Read-only-Zugriffen und nicht für reine Docs-/Workspace-/QA-/Sources-Pakete ohne lokalen Repo-Touch.
10. **Bei Konflikt gilt die strengere Regel.**

---

## 6. Minimaler Prompt-Rahmen für externe Systeme

Ab VW-OPS-01 brauchen Paket-Prompts für externe Systeme nur noch diesen Block:

```yaml
external_systems:
  github:
    level: "GH0"      # GH0–GH5
    actor: "none"     # none | Cowork | Codex | ChatGPT | Sebastian
    allowed: false
    scope: ""
    required_evidence: []
  supabase:
    level: "SB0"      # SB0–SB5
    actor: "none"
    allowed: false
    tables: []
    operation: ""
    required_evidence: []
  netlify:
    level: "NF0"      # NF0–NF5
    actor: "none"
    allowed: false
    scope: ""
    required_evidence: []
  notes: ""
```

**Bei Standard (GH0/SB0/NF0):** Keine weiteren Erklärungen im Prompt nötig.

**Bei Abweichung:** Stufe begründen + Actor nennen + erlaubte Aktion nennen + Nachweise nennen.

**Beispiel frontend_code_build:**
```yaml
external_systems:
  github:
    level: "GH4"
    actor: "Codex"
    allowed: true
    scope: "Create PR after S3-BUILD-02 code changes (no merge)"
    required_evidence: ["commit_hash", "pr_url", "diff_summary"]
  supabase:
    level: "SB0"
    actor: "none"
    allowed: false
  netlify:
    level: "NF0"
    actor: "none"
    allowed: false
  notes: "Modusgerechter Preflight nach AGENTS.md. Merge und Deploy-Verifikation sind nachgelagerte, separat freigegebene Schritte."
```

---

## 7. Closure-Nachweis je System

Jedes Paket dokumentiert am Ende für jedes externe System:

### GitHub-Closure
```yaml
github_closure:
  status: "not_touched"  # not_touched | read_only | branch_commit | pr_created | pr_updated | pr_closed | pr_merged
  workspace_mode: "none" # none | cloud_checkout | fresh_clone | clean_worktree
  commit_hash: ""        # falls vorhanden
  pr_url: ""             # falls vorhanden
  merge_hash: ""         # nur nach Sebastian-Merge-Go (GH5)
  notes: ""
```

### Supabase-Closure
```yaml
supabase_closure:
  status: "not_touched"  # not_touched | read_only | write
  tables: []
  operation: ""
  rows_affected: 0
  rls_check: ""          # z.B. "anon SELECT = 20 Rows"
  visibility_check: ""   # z.B. "public rows sichtbar: JA"
  notes: ""
```

### Netlify-Closure
```yaml
netlify_closure:
  status: "not_touched"  # not_touched | deploy_read | deploy_verified | manual_deploy
  deploy_source: ""
  deploy_hash: ""
  live_routes_checked: []
  smoke_result: ""       # z.B. "PASS" oder "n/a"
  notes: ""
```

---

## 8. Hard Stops

| Code | Auslöser |
|---|---|
| `BLOCKED_GITHUB_WRITE_NOT_AUTHORIZED` | GH3+ ohne explizite Freigabe im Contract |
| `BLOCKED_STALE_DIRTY_CLONE` | Commit-Versuch aus stale/dirty Clone (inkl. `vitalwissen_repo_current`) |
| `BLOCKED_SUPABASE_SCOPE_UNCLEAR` | SB2+ ohne vollständige Tabellenliste im Contract |
| `BLOCKED_SUPABASE_NO_POSTWRITE_VALIDATION` | SB2+ ohne Rückgabe-/Count-/RLS-Check im Closure |
| `BLOCKED_SCHEMA_WRITE_UNSAFE` | SB3 ohne Migrations-/Rollback-/RLS-Plan |
| `BLOCKED_NETLIFY_SCOPE_UNCLEAR` | NF2+ ohne gemergten PR/Commit oder expliziten Deploy-Bezug |
| `BLOCKED_SECRET_OUTPUT` | Secret-Wert (kein boolescher Check) würde ausgegeben |
| `BLOCKED_EXTERNAL_SIDE_EFFECT_NOT_DECLARED` | Externe Aktion nicht im Contract deklariert |
| `BLOCKED_MISSING_BUNDLE_SYNC_FRAMEWORK` | `chatgpt_bundle_guard.py` oder `chatgpt_bundle_sync.py` fehlt |
| `BLOCKED_REPO_GUARD_FAIL` | repo_guard FAIL bei Code-/Git-/Commit-/PR-Paket |
| `BLOCKED_COWORK_GITHUB_WRITE` | Cowork würde GH3+ oder eine andere GitHub-Write-Aktion ausführen |
| `BLOCKED_CODEX_MERGE` | Codex würde einen PR mergen oder GH5 beanspruchen |
| `BLOCKED_GH5_NO_SEBASTIAN_GO` | Merge ohne explizites Sebastian-Merge-Go |
| `BLOCKED_REQUIRED_CHECK_NOT_GREEN` | Normaler GH5-Merge bei rotem, fehlendem oder noch laufendem Required Check |
| `BLOCKED_DIRECT_MAIN_WRITE` | Normaler Workflow würde direkt auf `main` schreiben oder pushen |
| `BLOCKED_NORMAL_ADMIN_BYPASS` | Admin-/Emergency-Bypass würde als normaler GH0–GH5-Workflow benutzt |

---

## Referenzen

- PACKAGE_CONTRACT_TEMPLATE.yaml: `docs/ops/PACKAGE_CONTRACT_TEMPLATE.yaml`
- GUARD_USAGE.md: `docs/ops/GUARD_USAGE.md`
- README_AGENTS.md: `docs/project_state/README_AGENTS.md`
- PROJECT_STATE_CURRENT.yaml: `docs/project_state/PROJECT_STATE_CURRENT.yaml`
- Codex-Ausführungsregeln: `AGENTS.md`

---

*Erstellt durch VW-OPS-01 — External Systems Matrix — 2026-05-26*

*Aktualisiert durch VW-GITHUB-SOT-CLOSEOUT-01 — GH0–GH5 auf PR-only-Modell umgestellt (GH3 feature_branch_write, GH4 pr_lifecycle_write, GH5 approved_pr_merge); altes Direkt-main-Modell entfernt. Emergency-Bypass als eigener Sebastian-only-Ausnahmefall, Actor-Grenzen, modusgerechter Codex-Preflight, getrennte Build-/Merge-/Deploy-Verifikation und erweiterte Hard Stops ergänzt. — 2026-07-05*
