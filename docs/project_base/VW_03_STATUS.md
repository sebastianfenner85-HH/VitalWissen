# VW_03_STATUS — Operativer Projektstatus VitalWissen

**Stand:** 05.07.2026 — `VW-GITHUB-SOT-CLOSEOUT-01`  
**Status:** Migration technisch verifiziert; Docs-/Governance-Closeout mit diesem PR  
**Verifizierte Baseline vor Closeout:** `ce9de2607c43ec38a022162e730a815a8875d766` (Merge PR #36)  
**Nächster empfohlener Klärungsschritt:** `S1-BUILD-02-RECONCILIATION-01`

> Diese Datei ist der aktuelle operative Status, kein Append-only-Archiv.
> Historische Detailstände bleiben über Git-Historie, Paket-Closures und fachliche Freeze-/Spec-Dokumente nachvollziehbar.
> Die vor diesem Closeout gültige Statusfassung bleibt vollständig in der Git-Historie der Baseline `ce9de260...` erhalten.

---

## 1. Kanon und Betriebsmodell

Der kanonische Repository-Zustand ist **GitHub `main`**.

Innerhalb des Repository-Kanons gilt:

- `main/docs/` — finalisierte Projekt-, Status-, Architektur-, Spec- und Governance-Dokumentation
- `main/AGENTS.md` — bindende Codex-Ausführungsregeln
- `main/.github/workflows/` — bindende CI-Konfiguration
- Produktcode auf `main` — kanonischer Produktcode

Der lokale VitalWissen-Workspace ist Staging-, Arbeits-, Audit-, Evidence- und Mirror-Schicht. Er ist **kein paralleler Source of Truth**.

Normaler produktiver Workflow:

`Paket/Issue → Feature-Branch → PR → Required Checks → Review → Sebastian GO → Merge`

Kein direkter Push auf `main`. Kein Merge durch Codex. Cowork bleibt bei GitHub maximal read-only.

---

## 2. Migration / GitHub-Governance

### Gesamturteil

**MIGRATION_ACCEPTED_WITH_CLOSEOUT_PATCH** aus dem Audit
`VW-GITHUB-SOT-CURRENT-STATE-CONSOLIDATION-01`.

Der technische Kern ist bereits bewiesen:

- Branch Protection auf `main`: aktiv
- Required Check: `Build and safety gates`
- Codex Cloud: operativ
- Codex PR-Write-Pfad: operativ
- PR-only-Workflow: operativ
- ROT→GRÜN-Enforcement: live bewiesen

### Enforcement-Historie

| PR | Rolle | Ergebnis |
|---|---|---|
| #35 | historischer erster Enforcement-Test | STOP — Trigger wurde vom damaligen Check nicht rot |
| #36 | CI-Diff-Check-Fix | PASS — `git diff --check` prüft den relevanten PR-/Push-Range |
| #37 | finaler Enforcement-Test | PASS — ROT blockiert normalen Mergeweg; Repair macht Check GRÜN und Mergeweg wieder frei |

PR #37 wurde **nicht gemerged**. Der Testbranch wurde gelöscht. `main` blieb durch den Test unverändert.

### Closeout-Baseline

`ce9de2607c43ec38a022162e730a815a8875d766`

Dieser SHA ist die **verifizierte Baseline vor dem Closeout-PR**, nicht ein dauerhaft aktueller `main`-HEAD. Den aktuellen HEAD immer live gegen GitHub prüfen.

---

## 3. Agentenmodell

| Actor | Führende Rolle | GitHub-Grenze |
|---|---|---|
| Sebastian | Ziel, Priorität, fachliche Entscheidung, externe Write-Gos, Merge-Go | bis GH5; Emergency Bypass nur Sebastian |
| ChatGPT | Planung, Paketdesign, Routing, Review, Diff-/CI-Prüfung; kleine klar begrenzte Connector-Aufgaben | GH2 Standard; GH3/GH4 eng begrenzt; GH5 nur nach explizitem Sebastian-Go |
| Codex Cloud | primärer Code-/Build-/Test-/Branch-/Commit-/PR-Agent | max. GH4; nie Merge |
| Codex lokal | sekundär bei echtem lokalem Worktree-/Toolchain-Bedarf | max. GH4; nie Merge |
| Cowork | Workspace, Audits, Evidence, Recherche, Browserchecks, externe Ops nach Contract | max. GH2; kein GitHub-Write |

Bindende Details:

- Codex: Root-`AGENTS.md`
- allgemeiner Agentenbetrieb: `docs/project_state/README_AGENTS.md`
- Betriebsmodell: `docs/ops/AGENT_OPERATING_MODEL.md`
- externe Systeme: `docs/ops/EXTERNAL_SYSTEMS_MATRIX.md`

---

## 4. SOT-Sync-Regel

Jedes **SOT-relevante** Paket muss vor einem fachlich nicht zusammenhängenden Folgepaket einen GitHub-SOT-Sync erhalten.

SOT-relevant ist ein Paket insbesondere, wenn es:

- einen Produktstrang öffnet oder schließt
- Priorität, Architektur oder Governance wesentlich ändert
- den Agentenbetrieb ändert
- einen Build-/Rollout-Status wesentlich verändert

Erlaubt:

1. Statusänderung im selben geeigneten PR dokumentieren, oder
2. unmittelbar folgender, klar verlinkter Docs-/SOT-Sync-PR.

Nicht erlaubt:

- mehrere Wochen rein lokaler Fortschritt ohne GitHub-Status-Sync
- zwei parallele Wahrheiten
- Weiterarbeit mit wissentlich veraltetem GitHub-Kanon

---

## 5. Aktueller Produktstand

### S1 — Laborwert-Lexikon

**Status:** live.

Belegt abgeschlossen:

- S1-BUILD-01 — Zielwert-Block V3
- S1-BUILD-01b — LDL-Microcopy
- S1-BUILD-01c — LDL-Zielwert-Klarstellung
- Q2-BUILD-02d — LwQuellenBox
- S1 Checkup Builder — PR #27 bis #29; live unter `/laborwerte/checkup-builder`

**Offen:** `S1-BUILD-02-RECONCILIATION-01`.

Ziel der Reconciliation:

- lokalen DB-Rollout `S1_BUILD_02_USA_BACKFILL_BT2_ROLLOUT_30_01` gegen den ursprünglichen S1-BUILD-02-Scope abgleichen
- verhindern, dass bereits erledigte Arbeit doppelt gestartet wird
- erst danach einen verbleibenden S1-BUILD-02-Rest neu spezifizieren

### S2 — Supplement-Kompass

**Status:** live.

Belegt abgeschlossen:

- Q2-BUILD-02c — QuellenBox / `quellen`-Struktur
- Q2-BUILD-02c-P2A — weitere NIH-ODS-Lücken geschlossen

**Offen, niedrig priorisiert:** Q2-BUILD-02c-P2B.

### S3 — Studienkompass

**Status:** S3-BUILD-01 live.

Belegt:

- 20 kuratierte Studien
- Pilot-Block auf fünf Krankheitsseiten
- Studien-Detailroute
- PR-/Commit-Stand aus bestehendem Kanon

**Optional offen:** S3-BUILD-02 — Studien-Hub `/studien`.

Kein dringender Blocker.

### S4 — Arztbrief-Decoder

**Status:** Beta Freeze.

P7-Strang formal geschlossen. Weitere Arbeit nur als neues, separates Spec-Paket (`P7-06`).

### S5 — Krankheits-Lexikon

**Status:** live.

221 Einträge im historischen DB-Stand. Quellen- und Crosslink-Basis abgeschlossen.

### S6 — Medikamenten-Erklärer

**Status:** live.

Belegt abgeschlossen:

- QuellenBox
- Quellentyp-Mapping
- bestehende S5/S18-Crosslinks

**Optional offen:** S6-07.

### S8 / B4 — Nächste Schritte

**Status:** aktueller Ausbau weit über den alten Stand hinaus.

Belegt abgeschlossen:

- B4-BUILD-02 — LDL-Journey
- B4-BUILD-03 — PR #31
- B4-BUILD-04 Wave 1 — PR #32/#33

**Offen:** nächste B4-Welle ist **nicht spezifiziert**.

Sie darf nicht aus alten Chats oder Erinnerungen rekonstruiert werden. Neues Paketdesign auf Basis des realen Repo-Stands.

### S9 — Health Data Hub / Gesundheitsavatar

**Status:** Strategie-Freeze abgeschlossen.

Build erst nach den dokumentierten Datenschutz-/Key-Management-/FHIR-Voraussetzungen.

### S18 — Ernährungskompass

**Status:** vier Kernobjekte abgeschlossen:

- Ernährungsmuster
- Nährstoffe
- Lebensmittel
- Zusatzstoffe

Weitere Arbeit nur als neuer Erweiterungsstrang.

### UX / Brand

Belegt abgeschlossen:

- UI-REFRESH-01
- UI-REFRESH-02
- UI-REFRESH-03

**Offen:** UI-REFRESH-04.

Nicht automatisch NOW und kein Migrationsblocker.

### UX_SCAN_01

**Status:** unklar.

Codex-Kontext vorhanden; kein eindeutiges Folge-Produktergebnis gefunden. Vor Wiederaufnahme erst Status klären.

---

## 6. Priorisierte nächste Schritte

### NOW

1. **PR #8 Cleanup**
   - Test-PR niemals mergen
   - schließen
   - zugehörigen Branch danach entfernen, soweit der ausführende Actor/das Tool dies unterstützt

2. **S1-BUILD-02-RECONCILIATION-01**
   - realen DB-/GitHub-/Closure-Stand abgleichen
   - Ergebnis: completed / Restpaket / superseded

3. **Lokalen Arbeitsstand nach dem Closeout neu ausrichten**
   - lokalen `vitalwissen_ship` vor weiterer lokaler Repo-Arbeit auf aktuellen `main` bringen oder frisch klonen
   - kein Arbeiten aus stale/dirty Klon

### NEXT

- nächste B4-Welle spezifizieren
- `UX_SCAN_01` klären
- UI-REFRESH-04
- S3-BUILD-02 optional

### LATER

- S6-07
- weitere S18-Crosslinks
- S9-Phase-D-Vorbereitung
- übrige belegte Backlog-Pakete nach Prioritätsentscheidung

---

## 7. Live-/Ops-Status

### GitHub

- Repository: `sebastianfenner85-HH/VitalWissen`
- Default Branch: `main`
- Verifizierte Closeout-Baseline: `ce9de260...`
- Branch Protection + Required Check: live bewiesen

### Netlify

Auto-Publishing ist im bisherigen Kanon aktiv.

Live-Smoke aus dem Abschlussaudit bestätigte:

- Startseite
- Laborwerte-Liste
- Checkup Builder unter `/laborwerte/checkup-builder`
- Vertrauen-Seite

Eine Laborwert-Detailseite wurde in diesem Audit nicht abschließend bestätigt.

### Supabase

**Supabase Read-Health wurde im Abschlussaudit nicht erneut verifiziert.**

Kein aktuelles PASS und kein aktuelles FAIL ableiten.

Historische DB-Zahlen in älteren Dokumenten bleiben historische Stände, bis sie gezielt erneut geprüft werden.

---

## 8. Harte Grenzen / No-Gos

Unverändert bindend:

- keine Diagnose oder Therapieempfehlung
- keine KI-generierten Quellen ohne Verifikation
- kein direkter Push auf `main`
- kein Merge durch Codex
- kein GitHub-Write durch Cowork
- keine Supabase-Writes ohne expliziten Scope und Go
- keine Netlify-Writes/Deploy-Trigger ohne expliziten Scope und Go
- keine Secrets/Tokens/Credentials ausgeben
- keine unklaren Branches blind löschen
- keine alte Chat-Aufgabe blind als offen wiederbeleben

---

## 9. Historie und Detailnachweise

Diese Datei enthält bewusst nur den **aktuellen operativen Stand**.

Historische Detailstände bleiben erhalten über:

- Git-Historie dieser Datei
- Paket-Closures
- Freeze-/Spec-Dokumente in `main/docs`
- konkrete PRs und Commits
- lokale Audit-/Evidence-Pakete als nicht-kanonische Nachweise

Wichtige Baseline für die vor diesem Closeout gültige Langfassung:

`ce9de2607c43ec38a022162e730a815a8875d766`

Die Reduktion der append-only Historie in dieser Datei ist **absichtlich**: `VW_03_STATUS.md` soll wieder Statusdatei sein, nicht Archiv. Es geht keine Git-Historie verloren.

---

## 10. Pflege

Bei jedem SOT-relevanten Paket:

1. einschlägiges Detaildokument aktualisieren
2. `VW_03_STATUS.md` aktualisieren
3. `AUDIT_CANON_CURRENT.md` und `ACTIVE_STRANDS_CURRENT.md` auf Drift prüfen
4. GitHub-SOT-Sync vor einem fachlich nicht zusammenhängenden Folgepaket abschließen

---

*Aktualisiert durch `VW-GITHUB-SOT-CLOSEOUT-01` — 05.07.2026.*
