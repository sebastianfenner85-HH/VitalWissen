# VitalWissen Agent Operating Model

Status: active
Owner: Sebastian final GO/NO-GO
Repository canon: GitHub repository `sebastianfenner85-HH/VitalWissen`, branch `main`
Finalized project/governance docs canon: `main/docs/`

## 1. Grundsatz

GitHub ist der verbindliche Ort der Wahrheit fuer VitalWissen-Arbeit.

Kanonischer Repository-Zustand: `GitHub branch main`. Kanonische finalisierte Projekt-/Governance-Dokumentation: `GitHub main/docs`. Der lokale Cowork-Workspace ist Staging/Audit/Evidence/Mirror -- kein paralleler Source of Truth. Bei Konflikt gilt Live-GitHub als technische Basis; aktuelleres lokales Material ist zusaetzliche Evidence und wird nur gezielt integriert, nie blind uebernommen.

Jede produktive Aenderung laeuft ueber:

```text
Paket/Issue -> Feature-Branch -> PR -> Required Checks -> Review -> Sebastian GO -> Merge
```

Draft-PR nur solange die Arbeit noch nicht review-ready ist; kein pauschaler Draft-Zwang für fertige PRs.

Kein Agent merged ohne explizites GO von Sebastian.

## 2. Rollen im Betrieb

### Sebastian

- gibt Ziel, Prioritaet und fachliche Entscheidung
- prueft Ergebnis auf PR-/Preview-Ebene
- gibt GO/NO-GO fuer Merge, Deploy-Folgen und externe Writes

### ChatGPT

- plant Arbeitspakete
- entscheidet den passenden Ausfuehrungsweg
- kann kleine bis mittlere, klar begrenzte Aenderungen ueber den GitHub Connector als Branch + PR umsetzen; Draft nur solange nicht review-ready
- prueft PR-Diffs, Checks und offene Risiken
- gibt keine Merge-Freigabe selbst; Merge nur nach explizitem Sebastian-Go
- keine Branch-Protection-Aenderung oder Admin-Bypass als Routineaktion

### Codex Cloud

**Primaerer Ausfuehrungsweg fuer Produktcode** (operativ bestaetigt insbesondere durch PR #31, #33 und #36).

Einsetzen wenn:

- Produktcode, Build, Tests, mehrere Dateien betroffen sind
- ein klar abgegrenztes Paket ueber ein GitHub-natives Codex-Cloud-Environment abgearbeitet werden kann

Pflicht:

- modusgerechter Preflight nach Root-`AGENTS.md`: verifizierter `/workspace/VitalWissen`-Checkout, erwarteter HEAD, saubere Arbeitskopie, eindeutige erlaubte Dateiliste und klares PR-Ziel
- kein agent-seitiges `git clone`, `git remote add` oder `git push` im Cloud-Modus
- Feature-Branch/Commit(s)/PR ueber den bereitgestellten Cloud-/GitHub-Workflow -- niemals Merge, niemals direkter `main`-Push
- Draft PR solange nicht review-ready, sonst normaler PR
- `npm run build`, wenn Frontend betroffen

### Codex lokal (Sekundaermodus)

Einsetzen nur wenn Codex Cloud nicht ausreicht, z. B. wenn:

- interaktive lokale Fehlersuche noetig ist
- eine spezielle lokale Toolchain oder ein lokaler Dienst benoetigt wird
- ein echter lokaler Worktree-Bedarf besteht

Pflicht:

- frischer Clone oder sauberer aktueller Branch
- `npm run build`, wenn Frontend betroffen
- keine Commits aus dirty/stale Arbeitskopien
- PR statt Direktpush auf `main`; Draft nur solange nicht review-ready

### Cowork

Einsetzen fuer:

- lokale Spiegelung und redundante Ablage
- Audit-Exports
- Workspace-/Quellen-/Statusdokumentation
- Browserchecks, Netlify-Preview, Supabase-/Dashboard-Pruefungen
- Abschlussdokumentation nach Paketen
- lokal ausfuehrbare Scripts fuer klar erlaubte GitHub-Docs-/Ops-Arbeit

Pflicht:

- GitHub maximal GH2 (remote read-only); keine GitHub-Write-/PR-Rolle
- vorhandene `gh auth` des Nutzers verwenden
- keinen GitHub PAT anfordern
- keine rohe `CLAUDE.md` lesen oder ausgeben, ausser Sebastian gibt eine redaktierte Version frei
- keine Produktcode-Aenderungen

Nicht einsetzen fuer:

- GitHub-CLI-Codearbeit ohne explizites GH-Level
- grosse Codeaenderungen in isolierter Sandbox
- normaler Produktcode-/PR-Agent (das bleibt Codex)

**Hinweis (SOT-Praxis):** Der lokale Cowork-Workspace kann neuere Arbeits- und Audit-Evidence enthalten, bleibt aber nicht-kanonisch. Der SOT-Sync-Prozess verhindert, dass diese Evidence ueber laengere Zeit vom GitHub-Kanon entkoppelt bleibt.

## 3. Routing-Regel

### Route A: ChatGPT GitHub Connector

Nutzen fuer:

- Dokumentation
- Templates
- kleine Daten-/Mapping-Aenderungen
- kleine UI-/Textkorrekturen
- klar begrenzte Dateien

Output:

- Branch
- Commit(s)
- PR (Draft nur solange nicht review-ready)
- kurze Closure im Chat

### Route B: Cowork lokale Scripts / Browser / Ops

Nutzen fuer:

- lokale Sicherung
- Projekt-/Auditdokumente
- Live-/Browserpruefung
- externe Systemchecks
- Statusspiegelung nach PR/Package
- GitHub-Docs-/Ops-Arbeit nur bei explizitem GH-Level, bevorzugt als vom Nutzer ausfuehrbares Script

Output:

- Exportordner oder Statusnotiz
- klare Closure
- keine stillen Nebeneffekte

### Route C: Codex Cloud primaer / Codex lokal sekundaer

Nutzen fuer:

- Codepakete mit Tests
- mehrere Dateien
- Build-/Runtime-Risiko
- komplexere UI-/Datenlogik

Standard: Codex Cloud. Codex lokal nur bei echtem lokalem Worktree-/Toolchain-Bedarf.

Output:

- Test-/Buildnachweis
- Commit(s)
- PR (Draft nur solange nicht review-ready)
- kurze Closure

## 4. Pflichtregeln

- Kein direkter Push auf `main`.
- Jeder Arbeitsstrang braucht Issue oder klar referenziertes Paket.
- Jeder Code-/Produkt-Change braucht einen PR; Draft nur solange nicht review-ready.
- Kein Merge ohne Sebastian GO.
- Medizinische Inhalte bleiben strikt geprueft: Standard, Supportiv, Experimentell trennen.
- Supabase-/Netlify-Writes nur mit explizitem Scope.
- Secrets, Tokens und Credentials werden nie ausgegeben.

## 5. Minimaler PR-Abschluss

Jeder PR muss enthalten:

- Ziel
- geaenderte Dateien
- Tests/Checks
- Risiko
- offene Punkte
- ob Cowork-Spiegelung noetig ist

## 6. Operating Decision

Dieses Modell ersetzt nicht die bestehenden Agenten, sondern ordnet sie operativ.

GitHub bleibt Wahrheit. Lokale Kopien und Audit-Artefakte sind Spiegel, nicht Primaerquelle.

## 7. SOT-Sync-Regel (ab VW-GITHUB-SOT-CLOSEOUT-01)

Jedes SOT-relevante Paket (schliesst/eroeffnet einen Produktstrang oder aendert Prioritaet, Architektur, Governance, Agentenbetrieb oder Build-/Rollout-Status wesentlich) braucht vor einem fachlich nicht zusammenhaengenden Folgepaket einen GitHub-SOT-Sync: entweder im selben geeigneten PR oder als unmittelbar folgender, klar verlinkter Docs-Sync-PR. Nicht erlaubt: mehrwoechiger rein lokaler Fortschritt ohne GitHub-Sync, zwei parallele Wahrheiten oder stilles Arbeiten mit veraltetem GitHub-Kanon.

---

Aktualisiert durch VW-GITHUB-SOT-CLEANUP-01: Route A/B/C, Cowork-GitHub-Grenzen und GitHub `main` / `docs/` als kanonischer SOT klargestellt.
Aktualisiert durch VW-GITHUB-SOT-CLOSEOUT-01: Codex Cloud als eigener, primaerer Rollenblock ergaenzt (vorher nur Codex lokal dokumentiert); Codex lokal als Sekundaermodus praezisiert; Source-of-Truth-Absatz um kanonischen Repository-Zustand + Konfliktregel ergaenzt; ChatGPT-Spielraum fuer kleine GitHub-Aktionen benannt; SOT-Sync-Regel (§7) neu -- 2026-07-05.
