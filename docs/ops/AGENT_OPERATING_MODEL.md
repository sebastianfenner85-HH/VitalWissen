# VitalWissen Agent Operating Model

Status: active draft  
Owner: Sebastian final GO/NO-GO  
Source of truth: GitHub repository `sebastianfenner85-HH/VitalWissen`, branch `main`, folder `docs/`

## 1. Grundsatz

GitHub ist der verbindliche Ort der Wahrheit fuer VitalWissen-Arbeit.

Jede produktive Aenderung laeuft ueber:

```text
Issue -> Branch -> Draft PR -> Checks/Review -> Sebastian GO -> Merge
```

Kein Agent merged ohne explizites GO von Sebastian.

## 2. Rollen im Betrieb

### Sebastian

- gibt Ziel, Prioritaet und fachliche Entscheidung
- prueft Ergebnis auf PR-/Preview-Ebene
- gibt GO/NO-GO fuer Merge, Deploy-Folgen und externe Writes

### ChatGPT

- plant Arbeitspakete
- entscheidet den passenden Ausfuehrungsweg
- kann kleine bis mittlere Aenderungen direkt ueber GitHub Connector als Branch + Draft PR umsetzen
- prueft PR-Diffs, Checks und offene Risiken
- gibt keine Merge-Freigabe selbst

### Codex lokal

Einsetzen wenn:

- mehrere Code-Dateien betroffen sind
- Build/Test lokal noetig ist
- interaktive Fehlersuche noetig ist
- groessere Refactors oder UI-/Logikpakete anstehen

Pflicht:

- frischer Clone oder sauberer aktueller Branch
- `npm run build`, wenn Frontend betroffen
- keine Commits aus dirty/stale Arbeitskopien
- Draft PR statt Direktpush auf `main`

### Cowork

Einsetzen fuer:

- lokale Spiegelung und redundante Ablage
- Audit-Exports
- Workspace-/Quellen-/Statusdokumentation
- Browserchecks, Netlify-Preview, Supabase-/Dashboard-Pruefungen
- Abschlussdokumentation nach Paketen
- lokal ausfuehrbare Scripts fuer klar erlaubte GitHub-Docs-/Ops-Arbeit

Pflicht:

- GitHub nur bei explizit erlaubtem GH-Level im Paket
- vorhandene `gh auth` des Nutzers verwenden
- keinen GitHub PAT anfordern
- keine rohe `CLAUDE.md` lesen oder ausgeben, ausser Sebastian gibt eine redaktierte Version frei
- keine Produktcode-Aenderungen

Nicht einsetzen fuer:

- GitHub-CLI-Codearbeit ohne explizites GH-Level
- grosse Codeaenderungen in isolierter Sandbox

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
- Draft PR
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

- Exportordner, Statusnotiz oder Draft PR
- klare Closure
- keine stillen Nebeneffekte

### Route C: Codex lokal

Nutzen fuer:

- Codepakete mit Tests
- mehrere Dateien
- Build-/Runtime-Risiko
- komplexere UI-/Datenlogik

Output:

- lokaler Testnachweis
- Commit(s)
- Draft PR
- kurze Closure

## 4. Pflichtregeln

- Kein direkter Push auf `main`.
- Jeder Arbeitsstrang braucht Issue oder klar referenziertes Paket.
- Jeder Code-/Produkt-Change braucht Draft PR.
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
---

Aktualisiert durch VW-GITHUB-SOT-CLEANUP-01: Route A/B/C, Cowork-GitHub-Grenzen und GitHub `main` / `docs/` als kanonischer SOT klargestellt.
