# README_AGENTS — VitalWissen Arbeitsordner

> **Gültig ab:** 2026-05-26 (VW-HYGIENE-04)
> **Paket-ID:** VW-HYGIENE-04
> **Status:** Operating Rules Freeze

---

## 1. Geltungsbereich

Diese Datei gilt für alle Agenten und KI-Systeme, die im VitalWissen-Arbeitsordner arbeiten:

- **ChatGPT** (OpenAI, Projektansicht)
- **Cowork** (Claude Desktop, lokaler Workspace-Zugriff)
- **Codex** (OpenAI, Code/Repo-Zugriff)

Vor jedem Paket sind `README_WORKSPACE.md` **und** diese Datei zu lesen.

---

## 2. Rollen

| Agent | Primäre Rolle |
|-------|--------------|
| **ChatGPT** | Controller, Reviewer, Prompt-Architekt. Plant Pakete, bewertet Ergebnisse, gibt Go/No-Go. Hat keinen direkten Dateisystem-Zugriff. Arbeitet mit dem ChatGPT-Spiegel (`10_CHATGPT_PROJECT_SOURCES_CURRENT/`). |
| **Cowork** | Workspace-/Docs-/Quellen-/Ops-Hygiene. Liest und schreibt Dateien im Arbeitsordner. Führt Closures, Freezes, Strukturarbeiten aus. Kein Repo-Code, kein eigenständiger Supabase/Netlify-Write. |
| **Codex** | Code-/Repo-/Test-/PR-Arbeit. Arbeitet ausschließlich aus einem frischen oder sicher sauberen Clone. Hat keine Workspace-Hygiene-Rolle. |

---

## 3. Cowork-Regeln

1. **Vor jedem Paket** `README_WORKSPACE.md` und `README_AGENTS.md` lesen.
2. **Keine stillen Nebeneffekte.** Jede Dateiänderung ist explizit zu dokumentieren.
3. **Kein Root-Write ohne Auftrag.** Neue Root-Dateien nur bei expliziter Freigabe oder Paketauftrag.
4. **Kein neuer Top-Level-Ordner** ohne explizite Freigabe durch Sebastian.
5. **Keine externen Writes** (Supabase, Netlify, GitHub) ohne explizite Freigabe im laufenden Auftrag.
6. **Abschluss immer dokumentieren:**
   - Lokaler Speicherstatus (welche Dateien geändert/erstellt)
   - Side Effects (Git / Supabase / Netlify / Secrets)
   - Go/No-Go für den nächsten Schritt
7. **Scope eng halten.** Nur tun, was der Paketauftrag erlaubt. Kein Scope-Creep.
8. **Beobachtung und Schlussfolgerung trennen.** Was direkt verifiziert wurde, von Annahmen unterscheiden.
9. **Keine Strategiedrift.** Führende Projektdokumente (`01_PROJECT_SOURCES_CURRENT/`) haben immer Vorrang vor Altständen.

---

## 4. Codex-Regeln

1. **Codex nur für Code/Repo/Test/PR.** Keine Workspace-Hygiene-Aufgaben.
2. **Codearbeit nur aus frischem oder sicher sauberem Clone.** Der lokale Clone `00_REPO/vitalwissen_repo_current` ist stale/dirty und darf nicht direkt committet werden.
3. **Immer dokumentieren:** Diff, Build/Test-Ergebnis, geänderte Dateien, Commit-Hash.
4. **Keine Supabase-/Netlify-Writes ohne Freigabe.** Auch nicht aus dem Repo-Code heraus.
5. **Kein Push auf `main`** ohne explizite Go-Freigabe im laufenden Auftrag.

---

## 5. Package-Regel

Jedes Paket braucht künftig folgende Mindeststruktur:

| Feld | Beschreibung |
|------|-------------|
| **Paket-ID** | Eindeutiger Bezeichner (z. B. `VW-HYGIENE-05`) |
| **Ziel** | Was soll erreicht werden? |
| **Erlaubte Pfade** | Welche Dateien/Ordner dürfen verändert werden? |
| **Verbotene Pfade** | Was darf explizit nicht angefasst werden? |
| **Verbotene Aktionen** | z. B. kein Commit, kein DB-Write |
| **Erwartete Outputs** | Welche Dateien entstehen? |
| **Preflight** | Was muss vor dem Start geprüft werden? |
| **Closure** | Was muss am Ende dokumentiert werden? |
| **Go/No-Go** | Freigabeentscheidung für den nächsten Schritt |

**Empfangsregel:** Pakete sollten eine ENDE-Zeile als Vollständigkeitsprüfung enthalten. Wenn die letzte Zeile nicht sichtbar ist: sofort stoppen, keine Dateien ändern, `BLOCKED_INCOMPLETE_TASK_PROMPT` melden.

---

## 6. Side-Effect-Regel

Am Ende jeden Pakets sind folgende Punkte **immer getrennt** zu dokumentieren:

| Punkt | Inhalt |
|-------|--------|
| **Lokale Dateiänderungen** | Welche Dateien erstellt/geändert/gelöscht? |
| **Git-Status** | Commit / Push / Branch / kein Git-Touch |
| **Supabase** | DB-Write ja/nein, welche Tabellen |
| **Netlify** | Deploy ja/nein |
| **Secrets** | Wurden Secrets gelesen/ausgegeben? |
| **Offene manuelle Aktionen** | Was muss Sebastian noch selbst tun? |

---

## 7. Token-Spar-Regel

- Kurze Guard-/Closure-Summaries bevorzugen.
- Keine langen Verzeichnisdumps — nur `tree -L 2` oder relevante Pfade.
- `PROJECT_STATE_CURRENT.yaml` aktuell halten, damit der Projektzustand nicht jedes Mal neu hergeleitet werden muss.
- Subagenten für parallele Recherche nutzen.
- Dateien direkt lesen statt über Shell, wenn der Pfad bekannt ist.

---

---

## 8. DATEN_FUER_CHATGPT — Agenten-Regeln (ab VW-HYGIENE-07B)

- Agenten dürfen `DATEN_FUER_CHATGPT/` nicht frei beschreiben.
- Schreiben nur mit explizitem Paketvertrag (PACKAGE_CONTRACT.yaml).
- Keine automatische Upload-Handlung — Sebastian lädt manuell hoch.
- Dateien dort sind Upload-Kopien, nicht führende Quellen.
- Bei Konflikt gilt Kanon / Root / Projektquellenstruktur, nicht `DATEN_FUER_CHATGPT/`.

---

---

## 9. ChatGPT-Bundle-Pflicht am Paketende (ab VW-HYGIENE-08A)

Am Ende jedes Pakets prüft Cowork die ChatGPT-Bundle-Relevanz:

1. **Relevante Dateien geändert?** (AUDIT_CANON_CURRENT.md, ACTIVE_STRANDS_CURRENT.md, PROJECT_STATE_CURRENT.yaml, README_WORKSPACE.md, README_AGENTS.md, GUARD_USAGE.md, PACKAGE_CONTRACT_TEMPLATE.yaml, CLAUDE_REDACTED_SHORT.md, VW_04_ENTSCHEIDUNGEN.md, P7D_ARCHITECTURE_RESET_FREEZE.md, AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md, VW_06_WEBSITE.md)
   - JA → Sync anwenden: `chatgpt_bundle_sync.py --package-id <ID> --report-dir <PFAD> --apply`
   - NEIN → guard_only: `chatgpt_bundle_guard.py` ausführen, Ergebnis in PACKAGE_CONTRACT dokumentieren

2. **PACKAGE_CONTRACT.yaml** enthält immer den Block `chatgpt_bundle` mit `sync_mode` und `sync_required`.

3. **Prompts dürfen kürzer sein** — PACKAGE_CONTRACT + Guards sind bindend. Cowork liest diese Dateien selbst und handelt nach den dort definierten Regeln.

4. **Kein automatischer ChatGPT-Upload.** Sebastian lädt die 12 Dateien aus `DATEN_FUER_CHATGPT/` manuell hoch (ab VW-HYGIENE-09B). Cowork führt diese Handlung niemals eigenständig aus.

---

## 10. External Systems Matrix

Für GitHub, Supabase und Netlify gilt **`06_QA_VALIDATION/EXTERNAL_SYSTEMS_MATRIX.md`** als bindendes Regelwerk.

**Kernregeln:**
- Standard ist **GH0 / SB0 / NF0** — kein externes System wird berührt.
- Jede Abweichung muss im `PACKAGE_CONTRACT.yaml` unter `external_systems` dokumentiert sein.
- Cowork darf externe Systeme nicht anfassen, außer das Paket erlaubt es ausdrücklich.
- **Codex** ist bevorzugter Akteur für Code-/Repo-/PR-Arbeit (GH3+).
- Supabase-/Netlify-Writes brauchen immer explizite Freigabe (SB2+ / NF4+).
- Closure muss GitHub, Supabase und Netlify getrennt dokumentieren.
- `repo_guard.py` nur bei GH1+ oder Code-/Repo-Paketen — nicht für reine Docs-/Workspace-/Mirror-Pakete.

Stufen: **GH0–GH5** (GitHub) · **SB0–SB5** (Supabase) · **NF0–NF5** (Netlify) — vollständige Definitionen in `06_QA_VALIDATION/EXTERNAL_SYSTEMS_MATRIX.md`.

---

---

## 11. Supabase Data API Grants — Agentenregel (ab VW-OPS-SUPABASE-GRANTS-01)

**Keine neue Supabase-public-Tabelle ohne explizite GRANT-Entscheidung.**

Diese Regel gilt ab sofort für alle Pakete mit DB-Schema-Berührung:

1. **Jede neue `public`-Tabelle** muss explizite `GRANT SELECT TO anon` und `GRANT SELECT TO authenticated` enthalten (bei öffentlichen Content-Tabellen) — oder eine explizite dokumentierte Entscheidung, warum kein anon-GRANT gesetzt wird (interne/private Tabellen).

2. **Keine Bulk-GRANTs** (`GRANT ALL ON ALL TABLES`): verboten. Immer nur minimale, tabellenspezifische GRANTs.

3. **Reihenfolge in jeder Migration:** CREATE TABLE → GRANT → ENABLE RLS → CREATE POLICY → Smoke-Test.

4. **PACKAGE_CONTRACT.yaml** muss `supabase_grants.explicit_data_api_grants_checked: true` enthalten, bevor ein DB-Migrations-Paket als abgeschlossen gilt.

5. **S9-Tabellen** (persönliche Gesundheitsdaten): kein anon-GRANT, eigene Architektur-Spec lesen bevor gebaut wird.

**Pflichtlektüre vor jedem DB-Build:** `01_PROJECT_SOURCES_CURRENT/SUPABASE_DATA_API_GRANTS_FREEZE.md`

**Hintergrund:** Supabase entfernt ab 30.10.2026 automatische Default-Privileges für neue Tabellen in bestehenden Projekten. Ohne expliziten GRANT sind neue Tabellen für die Data API unsichtbar (403).

---

*Erstellt durch VW-HYGIENE-04 — Operating Rules Freeze — 2026-05-26*
*Aktualisiert durch VW-HYGIENE-07B — DATEN_FUER_CHATGPT Upload-Bundle — 2026-05-26*
*Aktualisiert durch VW-HYGIENE-08A — chatgpt_bundle_sync Framework + Bundle-Pflicht — 2026-05-26*
*Aktualisiert durch VW-OPS-01 — External Systems Matrix Verweis ergänzt — 2026-05-26*
*Aktualisiert durch VW-HYGIENE-09B — Bundle-Pflicht auf 12 Dateien erweitert, 4 neue Trigger-Dateien — 2026-05-26*
*Aktualisiert durch VW-OPS-SUPABASE-GRANTS-01 — Supabase Data API Grants Agentenregel — 2026-05-28*
