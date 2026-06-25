# CHATGPT_HANDOFF — S1-CHECKUP-BUILDER-BASE-01-PREBUILD-PLAN

**Paket-ID:** S1-CHECKUP-BUILDER-BASE-01-PREBUILD-PLAN  
**Datum:** 2026-06-25  
**Erstellt von:** Cowork-Audit (Claude/Anthropic)  
**Geprüft auf Secrets:** JA (Phase B — PASS)  
**Zweck dieser Datei:** Allein ausreichende Übergabe an ChatGPT zur Paket-Beurteilung

---

## 1. Paket-ID

| Feld | Wert |
|------|------|
| Paket | S1-CHECKUP-BUILDER-BASE-01-PREBUILD-PLAN |
| Repo | github.com/sebastianfenner85-HH/VitalWissen |
| Plattform | VitalWissen (Vite + React → Netlify, Supabase) |
| Phase | Prebuild-Plan / Read-only |
| Folgepaket | S1-CHECKUP-BUILDER-BASE-01 (Codex-Build — noch nicht ausgeführt) |

---

## 2. Kurzurteil

**PASS**

Alle 8 Akzeptanzkriterien (A1–A8) erfüllt. Kein Code geändert. Kein DB-Write. Kein Commit. Plan ist konkret genug für Codex. Sicherheits- und Sprachgrenzen explizit dokumentiert.

---

## 3. Was wurde gemacht?

- Repo read-only analysiert: Routen, Nav, S1-Seiten, queries.js, k3-Map, b4-Map
- DB-Snapshot verifiziert: 90 Laborwerte live (2026-06-25, Supabase REST anon)
- Vorarbeit staging/panel_demo.md ausgewertet: Panel-Daten direkt als Config-Basis nutzbar
- Alle LOINC-Codes für Builder (Panels + 4 Themen) im Live-Snapshot verifiziert
- Architekturentscheidung: statische Config-Datei statt DB-Tabellen (kein Schema-Risiko)
- 4 Pflicht-Ausgabedateien erstellt (Plan, Files Reviewed, Codex-Prompt-Entwurf, Ops-Closure)

---

## 4. Was wurde NICHT gemacht?

- Kein Code geschrieben (keine JSX, kein CSS, keine Config-Datei)
- Kein DB-Write / kein Supabase-Schema-Change
- Kein Commit / kein Push / kein Deploy
- Kein Nav-Entry für Checkup-Builder gesetzt
- Kein lab_panels/lab_panel_items DB-Schema angelegt (bewusste Entscheidung: statische Config)
- Kein ACTIVE_STRANDS_CURRENT.md / AUDIT_CANON_CURRENT.md Update (kein Doppelpflege-Trigger)

---

## 5. Gelesene Hauptdateien

| Datei | Befund |
|-------|--------|
| src/App.jsx | 17 Routen. /laborwerte/checkup-builder fehlt. Route muss VOR :code stehen. |
| src/components/Nav.jsx | 6 Links. Kein Sub-Nav nötig für Builder. |
| src/pages/LaborwerteListe.jsx | Entry-Point für CTA-Link. Header ab Zeile 127. |
| src/lib/queries.js | getLaborwerteListe(): 14 Felder. Kein neuer Query nötig. |
| src/lib/laborwert_k3_map.js | Muster für Config-Datei-Header (Sprach-No-Gos). |
| src/lib/laborwert_b4_actions_map.js | 15-Felder-Schema. Sprachregeln-Kommentarblock = Vorlage. |
| staging/panel_demo.md | Vollständige Panel-Daten. LOINC-Korrektur: 17849-1 → 31112-6 (Retikulozyten). |
| staging/live_laborwerte_snapshot.csv | 90 LW live. Alle Builder-LOINC-Codes bestätigt. |
| PROJECT_STATE_CURRENT.yaml | local_repo_commit_allowed: false. Codex braucht frischen Clone. |

---

## 6. Erstellte / geänderte Dateien

Alle in 09_AUDIT_EXPORTS/S1_CHECKUP_BUILDER_BASE_01_PREBUILD_PLAN/:

| Datei | Inhalt |
|-------|--------|
| S1_CHECKUP_BUILDER_BASE_01_PREBUILD_PLAN.md | Vollständiger Plan: Ist-Befund, Architektur, Route, LOINC-Daten, 8 Risiken, 15 AC |
| FILES_REVIEWED.md | Alle gelesenen Dateien mit Befund |
| CODEX_NEXT_PROMPT_DRAFT.md | Fertiger Codex-Prompt (nicht ausgeführt) |
| FILES_CHANGED.md | Ops-Closure: alle Side Effects NEIN |
| CHATGPT_HANDOFF.md | Diese Datei |

Geändert: keine Produktionsdatei.

---

## 7. Wichtigste Befunde

1. **90 Laborwerte live** — alle Builder-LOINC-Codes verifiziert (Panels + 4 Themen)
2. **panel_demo.md direkt verwertbar** — enthält Großes-Blutbild + Müdigkeit-Panel mit Sprachregeln
3. **LOINC-Korrektur Retikulozyten:** panel_demo.md hatte 17849-1 — Live-DB hat 31112-6. Config muss 31112-6 verwenden.
4. **Route-Reihenfolge kritisch:** /laborwerte/checkup-builder muss in App.jsx VOR /laborwerte/:code stehen — sonst 404.
5. **Statische Config überlegen:** Kein DB-Schema-Risiko, kein RLS-Risk, sofort deploybar.
6. **Codex-Repo-Pfad:** ~/VitalWissen_DEV/00_REPO/vitalwissen_ship existiert nicht. git clone Ansatz im Prompt.
7. **Healthcheck:** scripts/ops/vw_local_healthcheck.sh existiert nicht — korrektes Skript: scripts/healthcheck-vitalwissen.mjs.

---

## 8. Empfohlene Folgeentscheidung

**GO für Codex-Build**, sobald Sebastian den Codex-Prompt in CODEX_NEXT_PROMPT_DRAFT.md freigibt und den PAT einträgt.

---

## 9. Konkreter nächster Schritt

Codex-Auftrag starten (eigenständiger Chat):

1. Sebastian gibt CODEX_NEXT_PROMPT_DRAFT.md frei
2. PAT in den git clone-Befehl einsetzen
3. Codex baut: CheckupBuilder.jsx + CheckupBuilder.css + checkup_builder_config.js + Route + CTA
4. Codex prüft AC-1 bis AC-15, committet, pusht auf main
5. Netlify Auto-Deploy + Closure-Bericht

---

## 10. Risiken / offene Punkte

| # | Risiko | Schwere | Status |
|---|--------|---------|--------|
| R1 | Route vor :code — React-Router-Reihenfolge | MITTEL | Im Codex-Prompt explizit benannt |
| R2 | Retikulozyten LOINC 17849-1 vs. 31112-6 | MITTEL | Korrigiert in Plan + Codex-Prompt |
| R3 | Deduplikation TSH (Müdigkeit + Schilddrüse) | NIEDRIG | LOINC-basierte Dedup im Builder vorgesehen |
| R4 | Codex-Repo-Pfad unklar | NIEDRIG | git clone Ansatz im Prompt — PAT fehlt noch |
| R5 | Sprachregeln-Verstöße durch Codex | HOCH | Bindender Sprach-No-Go-Block im Config-Header + Prompt |

---

## 11. Side Effects

| System | Status |
|--------|--------|
| Git | Keine Commits im Produktions-Branch. Nur Dateien in 09_AUDIT_EXPORTS/. |
| GitHub | Kein Push auf main. GitHub-Test: separater Branch, nur 1 Markdown-Datei. |
| Supabase | KEIN DB-Write. KEIN Schema-Change. Nur anon-read (Snapshot via REST). |
| Netlify | KEIN Deploy. KEIN Produktionscode geändert. |
| Secrets | NICHT ausgegeben. Keine Credentials in dieser Datei. |

---

## 12. Prüfnachweise

Healthcheck: scripts/healthcheck-vitalwissen.mjs — FAIL (Supabase ENV-Vars fehlen in Sandbox). Erwartetes Verhalten, kein Repo-Fehler.

git status (Session-Start): M .github/workflows/supabase-keepalive.yml + 4 Untracked pipelines/. Kein Produktionscode dirty.

Secret-Guard: PASS — 0 Befunde, 0 Warnings (secret_guard.py, 2026-06-25 18:43:18)

---

## 13. Review-Abschnitt für ChatGPT

**Was muss ChatGPT prüfen?**
- Ist die Architekturentscheidung (statische Config vs. DB-Tabellen) sinnvoll?
- Sind die 15 Akzeptanzkriterien ausreichend und medizinisch-sicher formuliert?
- Sind die Sprachregeln (No-Gos + erlaubte Formulierungen) vollständig?
- Fehlt eine kritische Datei oder ein Risiko in der Plan-Dokumentation?

**Welche Datei reicht dafür?**
Diese Datei (CHATGPT_HANDOFF.md) allein reicht für eine Grundbeurteilung.

**Welche Dateien sind nur bei Streitfall nötig?**

| Datei | Wann nötig |
|-------|-----------|
| S1_CHECKUP_BUILDER_BASE_01_PREBUILD_PLAN.md | LOINC-Codes, Panel-Daten, AC-Details |
| CODEX_NEXT_PROMPT_DRAFT.md | Wenn ChatGPT den Codex-Prompt reviewen soll |
| FILES_REVIEWED.md | Wenn ChatGPT den Audit-Scope prüfen will |
| staging/panel_demo.md | Wenn ChatGPT die Ausgangs-Panel-Daten prüfen will |

---

*Erstellt: 2026-06-25 | Secret-geprüft: PASS | Kein Code, kein DB-Write, kein Commit, kein Produktions-Deploy*
