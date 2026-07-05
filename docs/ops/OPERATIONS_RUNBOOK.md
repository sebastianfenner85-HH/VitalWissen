# VitalWissen Operations Runbook

Status: verbindlich
Gültig für: VitalWissen Repo-Arbeit, Docs-/Governance-Arbeit, Code-/Build-Pakete
Repository-Kanon: GitHub `main`
Docs-Kanon: `main/docs`

---

## 1. Grundprinzip

GitHub `main` ist der verbindliche Repository-Kanon für VitalWissen.

`main/docs` ist die finalisierte Projekt- und Governance-Dokumentation. Lokale Arbeitsstände, Exporte, Audits oder Chat-Kontexte sind Hilfsmittel, aber keine parallele Source of Truth.

Der normale Workflow lautet:

```text
Paket/Issue → Feature-Branch → PR → Required Checks → Review → Sebastian-Go → Merge
```

Verbindliche Regeln:

- Kein Direktpush auf `main`.
- Kein Merge ohne explizites Sebastian-Go.
- Keine Nebenänderungen außerhalb des freigegebenen Scopes.
- Jede Änderung muss nachvollziehbar validiert und im PR dokumentiert sein.

---

## 2. Rollen

- **Sebastian:** finales Go/No-Go, Prioritäten, Merge-Go.
- **ChatGPT:** Planung, Review, PR-/CI-Prüfung, kleine GitHub-Routineaktionen, sofern explizit beauftragt und vom Connector unterstützt.
- **Codex Cloud:** Code- und Docs-Änderungen, Build, Tests, Branch, Commit und PR-Erstellung innerhalb des erlaubten Scopes.
- **Cowork:** Recherche, Audit, Evidence, lokale Workspace-/Ops-Aufgaben und GitHub read-only.

---

## 3. Standardablauf vor jeder Arbeit

Vor jeder produktiven Arbeit ist der lokale Stand gegen GitHub `main` zu synchronisieren:

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
git status --short
git rev-parse --short HEAD
```

Sofort stoppen, wenn:

- der Worktree nicht clean ist,
- der Pull nicht fast-forward möglich ist,
- ein falscher Branch aktiv ist,
- der Scope unklar ist.

Dann keinen Code, keine Docs und keine Konfiguration ändern, bis der Stop-Grund geklärt ist.

---

## 4. Vor PR-Erstellung

Vor jedem Commit und vor PR-Erstellung sind mindestens diese Checks Pflicht:

```bash
git status --short
git diff --name-only
git diff --check
npm run build
```

Erwartung:

- Es sind nur erlaubte Dateien geändert.
- `git diff --check` ist PASS.
- `npm run build` ist PASS.

Wenn ein Check fehlschlägt, darf kein PR als review-ready ausgegeben werden. Die Ursache ist zu dokumentieren und innerhalb des erlaubten Scopes zu beheben. Wenn dafür eine zweite Datei oder ein neuer Scope nötig wäre: stoppen.

---

## 5. PR-Regeln

Jeder PR muss klar und prüfbar enthalten:

- Ziel,
- Scope,
- geänderte Dateien,
- explizit: „Nicht geändert“,
- Validierung,
- Review-Hinweis: kein Merge ohne Sebastian-Go.

Der PR darf keine falschen Validierungsbehauptungen enthalten. Wenn ein Check nicht lief oder wegen Umgebungslimitierung fehlschlug, muss dies als Warnung oder Blocker dokumentiert werden.

---

## 6. Vor Merge

Vor jedem Merge gilt:

- CI ist grün.
- Der Diff wurde geprüft.
- Es gibt keine unerwarteten Dateien.
- Bei Docs-only-PRs ist kein Produktcode geändert.
- Es gibt keine DB-, Deploy-, CI- oder Branch-Protection-Nebeneffekte.
- Explizites Sebastian-Go liegt vor.

Ohne explizites Sebastian-Go ist jeder Merge zu stoppen.

---

## 7. Nach Merge

Nach einem Merge ist lokal auf den neuen GitHub-Kanon zu aktualisieren:

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
git status --short
git rev-parse --short HEAD
```

Danach prüfen:

- Ist Branch-/PR-Cleanup nötig?
- Sind SOT-Dokumente aktualisiert?
- Ist der nächste fachliche Schritt klar?

Wenn SOT-relevante Inhalte verändert wurden, muss der aktualisierte Stand in `main/docs` nachvollziehbar sein, bevor fachlich unabhängige Folgepakete starten.

---

## 8. Hard Stops

Mindestens diese Stop-Codes sind verbindlich zu verwenden:

- `BLOCKED_DIRTY_WORKTREE` — Worktree ist nicht clean.
- `BLOCKED_NON_FAST_FORWARD` — Pull oder Update ist nicht fast-forward möglich.
- `BLOCKED_WRONG_BRANCH` — Arbeit erfolgt auf falschem Branch.
- `BLOCKED_SCOPE_UNCLEAR` — erlaubter Scope oder Ziel ist unklar.
- `BLOCKED_UNEXPECTED_FILES_CHANGED` — es wurden unerwartete Dateien geändert.
- `BLOCKED_DIFF_CHECK_FAIL` — `git diff --check` ist rot.
- `BLOCKED_BUILD_FAIL` — Build ist rot.
- `BLOCKED_CI_FAIL` — GitHub CI ist rot.
- `BLOCKED_NO_SEBASTIAN_GO` — Merge-Go fehlt.
- `BLOCKED_EXTERNAL_SIDE_EFFECT` — unerlaubte DB-, Deploy-, CI-, Branch-Protection- oder sonstige externe Nebenwirkung.

Bei jedem Hard Stop gilt: keine weiteren Änderungen, Ursache dokumentieren, nächsten sicheren Schritt benennen.

---

## 9. Recovery-Regeln

Bei einem roten PR gilt:

1. Ursache zuerst eindeutig klären.
2. Roten PR nicht blind reparieren.
3. Wenn Scope, Vertrauen oder Historie beschädigt sind: neuen Clean-PR erstellen.
4. Alten PR erst schließen, wenn er eindeutig superseded ist.
5. Ursache im neuen PR und im Abschlussbericht dokumentieren.

Ein Clean-PR darf nur den verstandenen Fehler beheben und keine fachlichen Nebenänderungen einführen.

---

## 10. Branch-Cleanup-Regel

Branches dürfen nur gelöscht werden, wenn eindeutig gilt:

- Der zugehörige PR ist gemergt oder geschlossen.
- Der Branch wird nicht mehr gebraucht.
- Kein offener Arbeitsstrang hängt daran.

Unklare Branches werden nicht gelöscht. Wenn kein sicherer Delete-Mechanismus verfügbar ist, werden nur Cleanup-Kandidaten dokumentiert.
