# CHATGPT_HANDOFF — S1-CHECKUP-BUILDER-BASE-01-PREBUILD-PLAN

**Paket-ID:** S1-CHECKUP-BUILDER-BASE-01-PREBUILD-PLAN  
**Datum:** 2026-06-25  
**Erstellt von:** Cowork-Audit (Claude/Anthropic)  
**Geprüft auf Secrets:** JA (Phase B — PASS)  
**Zweck dieser Datei:** Allein ausreichende Übergabe an ChatGPT zur Paket-Beurteilung  
**Version:** 1.1 (Korrektur 2026-06-25: K1 Branch-Workflow, K2 Pfad-Einordnung, K3 Netlify Preview)

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
- Kein lab_panels/lab_panel_items DB-Schema angelegt (bewusste Entscheidung: statische Config statt DB)
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
| staging/panel_demo.md | Vollständige Panel-Daten (Großes Blutbild + Müdigkeit). LOINC-Korrektur nötig (s. Abschnitt 7, Befund 3). |
| staging/live_laborwerte_snapshot.csv | 90 LW live. Alle Builder-LOINC-Codes bestätigt. |
| PROJECT_STATE_CURRENT.yaml | local_repo_commit_allowed: false (Cowork-lokaler Clone). Codex arbeitet mit eigenem frischen Clone. |

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

1. 90 Laborwerte live — alle Builder-LOINC-Codes verifiziert (Panels + 4 Themen)
2. panel_demo.md direkt verwertbar — enthält Großes-Blutbild + Müdigkeit-Panel mit Sprachregeln
3. LOINC-Korrektur Retikulozyten: panel_demo.md hatte 17849-1 — Live-DB hat 31112-6. Config muss 31112-6 / Slug retikulozyten verwenden.
4. Route-Reihenfolge kritisch: /laborwerte/checkup-builder muss in App.jsx VOR /laborwerte/:code stehen — sonst 404.
5. Statische Config überlegen: Kein DB-Schema-Risiko, kein RLS-Risk, sofort deploybar.
6. Lokaler Arbeitsclone und Healthcheck — Cowork-Umgebungsgrenze: In der Cowork-Sandbox und via GitHub Web UI waren der lokale Mac-Pfad ~/VitalWissen_DEV/00_REPO/vitalwissen_ship und das Skript bash scripts/ops/vw_local_healthcheck.sh nicht direkt verifizierbar. Das bedeutet NICHT, dass diese Pfade oder Skripte auf Sebastians Mac fehlen. Der gültige lokale Arbeitsclone laut Übergabe bleibt: ~/VitalWissen_DEV/00_REPO/vitalwissen_ship. Der gültige lokale Pre-/Post-Check laut Übergabe bleibt: bash scripts/ops/vw_local_healthcheck.sh. Abweichende Cowork-Sicht ist eine Umgebungsgrenze — kein Repo- oder Projektbefund.
7. Healthcheck in Cowork-Sandbox: Das Node.js-Skript scripts/healthcheck-vitalwissen.mjs wurde gefunden und ausgeführt. Ergebnis: FAIL wegen fehlender ENV-Vars — erwartetes Verhalten in Cowork-Umgebung, kein Repo-Fehler.

---

## 8. Empfohlene Folgeentscheidung

GO für Codex-Build, sobald Sebastian den Codex-Prompt in CODEX_NEXT_PROMPT_DRAFT.md freigibt und den PAT einträgt.

Keine Spec-Lücken. Keine ungeklärten Architektur-Fragen. Alle LOINC-Codes verifiziert. Sicherheits- und Sprachregeln sind im Codex-Prompt bindend verankert.

---

## 9. Konkreter nächster Schritt

Codex-Auftrag starten (eigenständiger Chat):

1. Sebastian gibt CODEX_NEXT_PROMPT_DRAFT.md frei und trägt den PAT ein
2. Codex klont Repo frisch: git clone https://<PAT>@github.com/sebastianfenner85-HH/VitalWissen.git
3. Codex baut: CheckupBuilder.jsx + CheckupBuilder.css + checkup_builder_config.js + Route in App.jsx + CTA in LaborwerteListe.jsx
4. Codex prüft AC-1 bis AC-15

WICHTIG — Codex arbeitet ausschließlich über folgenden Workflow:
a) Feature-Branch erstellen (niemals direkt auf main arbeiten)
b) Commit auf Branch
c) Push auf Branch
d) Draft PR erstellen
e) Review durch ChatGPT/Sebastian
f) Merge erst nach explizitem Go von Sebastian oder ChatGPT

Kein direkter Push auf main.
Kein Merge ohne explizites Sebastian/ChatGPT-Go.

Nach freigegebenem Merge: Netlify Auto-Deploy + Closure-Bericht.

---

## 10. Risiken / offene Punkte

| # | Risiko | Schwere | Status |
|---|--------|---------|--------|
| R1 | Route /laborwerte/checkup-builder vor :code — React-Router-Reihenfolge | MITTEL | Im Codex-Prompt explizit benannt |
| R2 | Retikulozyten LOINC 17849-1 vs. 31112-6 | MITTEL | Korrigiert in Plan + Codex-Prompt |
| R3 | Deduplikation TSH (Müdigkeit + Schilddrüse) | NIEDRIG | LOINC-basierte Dedup im Builder vorgesehen |
| R4 | Codex arbeitet direkt auf main statt Branch/PR | HOCH | Explizites Verbot im Codex-Prompt: nur Branch/PR/Go-Workflow |
| R5 | Sprachregeln-Verstöße durch Codex | HOCH | Bindender Sprach-No-Go-Block im Config-Header + Prompt |

---

## 11. Side Effects

| System | Status |
|--------|--------|
| Git | Keine Commits im Produktions-Branch main. Nur Dateien in 09_AUDIT_EXPORTS/. |
| GitHub | Kein Push auf main. Handoff-Test: Branch handoff/s1-checkup-builder-base-01-prebuild-plan, nur 1 Markdown-Datei. |
| Supabase | KEIN DB-Write. KEIN Schema-Change. Nur anon-read (Snapshot via REST). |
| Netlify | Kein manueller Netlify Deploy. Kein Netlify Production Deploy. Eine automatische Netlify Deploy Preview kann durch einen GitHub PR ausgelöst werden — diese ist kein Production Deploy und im Handoff-Test akzeptabel. Künftig ist diese automatische Preview als erwartbarer PR-Side-Effect zu dokumentieren. |
| Secrets | NICHT ausgegeben. Keine Credentials in dieser Datei. |

---

## 12. Prüfnachweise

Healthcheck (Cowork-Sandbox):
  Script: scripts/healthcheck-vitalwissen.mjs (Node.js, in Cowork-Sandbox gefunden)
  Ergebnis: FAIL — Supabase ENV-Vars fehlen in Sandbox. Erwartetes Verhalten, kein Repo-Fehler.
  Lokaler Mac-Healthcheck (bash scripts/ops/vw_local_healthcheck.sh): aus Sandbox nicht verifizierbar — gilt laut Übergabe als Standard-Pre-/Post-Check.

git status (Session-Start, Cowork-lokaler Clone):
  M  .github/workflows/supabase-keepalive.yml
  ?? pipelines/apply_readiness_guard.py + 3 weitere
  Kein Produktionscode dirty.

Secret-Guard: PASS — 0 Befunde, 0 Warnings (secret_guard.py, 2026-06-25)

---

## 13. Review-Abschnitt für ChatGPT

Was muss ChatGPT prüfen?
- Ist die Architekturentscheidung (statische Config vs. DB-Tabellen) sinnvoll?
- Sind die 15 Akzeptanzkriterien ausreichend und medizinisch-sicher formuliert?
- Sind die Sprachregeln (No-Gos + erlaubte Formulierungen) vollständig?
- Ist der Branch/PR/Go-Workflow in Abschnitt 9 klar genug für Codex?
- Fehlt eine kritische Datei oder ein Risiko?

Welche Datei reicht dafür?
Diese Datei (CHATGPT_HANDOFF.md) allein reicht für eine Grundbeurteilung.

Welche Dateien sind nur bei Streitfall nötig?

| Datei | Wann nötig |
|-------|-----------|
| S1_CHECKUP_BUILDER_BASE_01_PREBUILD_PLAN.md | LOINC-Codes, Panel-Daten, AC-Details |
| CODEX_NEXT_PROMPT_DRAFT.md | Wenn ChatGPT den Codex-Prompt reviewen soll |
| FILES_REVIEWED.md | Wenn ChatGPT den Audit-Scope prüfen will |
| staging/panel_demo.md | Wenn ChatGPT die Ausgangs-Panel-Daten prüfen will |

---

*Erstellt: 2026-06-25 | Version 1.1 (Korrekturen K1–K3) | Secret-geprüft: PASS | Kein Code, kein DB-Write, kein Push auf main, kein Produktions-Deploy*
