# CHATGPT_HANDOFF — S1-CHECKUP-BUILDER-CODEX-CONTEXT-BOOTSTRAP-01

**Paket-ID:** S1-CHECKUP-BUILDER-CODEX-CONTEXT-BOOTSTRAP-01
**Datum:** 2026-06-25
**Erstellt von:** Cowork (Claude/Anthropic)
**Zweck:** Allein ausreichende Übergabe an ChatGPT zur Prüfung des Bootstrap-Pakets

---

## 1. Paket-ID

| Feld | Wert |
|------|------|
| Paket | S1-CHECKUP-BUILDER-CODEX-CONTEXT-BOOTSTRAP-01 |
| Typ | Docs/Kontext — kein Produktcode |
| Repo | github.com/sebastianfenner85-HH/VitalWissen |
| Branch | `codex-context/s1-checkup-builder-base-01` |
| Folgepaket | S1-CHECKUP-BUILDER-BASE-01 (Codex-Produkt-Build — noch nicht ausgeführt) |

---

## 2. Was wurde erstellt?

Fünf neue Dateien im Repo (ausschließlich Docs/Kontext):

| Datei | Zweck |
|-------|-------|
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/README.md` | Paket-Überblick, Hinweise für Codex (Remote, Branch, Tabu) |
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/CODEX_NEXT_PROMPT.md` | Vollständiger Codex-Arbeitsauftrag (inkl. SCHRITT 0 Remote-Check) |
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/ACCEPTANCE_CRITERIA.md` | AC A1–A18 mit Prüfmethode |
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/SAFETY_AND_SCOPE.md` | Verboten/Erlaubt-Scope |
| `docs/review_handoffs/S1_CHECKUP_BUILDER_CODEX_CONTEXT_BOOTSTRAP_01/CHATGPT_HANDOFF.md` | Diese Datei |

---

## 3. Warum war der Bootstrap nötig?

Codex wurde beim vorherigen Anlauf (S1-CHECKUP-BUILDER-BASE-01) mit zwei Blockern beendet:

| Blocker-Code | Ursache |
|-------------|--------|
| `BLOCKED_MISSING_CONTEXT` | `codex_context/S1-CHECKUP-BUILDER-BASE-01/` fehlte im Repo |
| `BLOCKED_WRONG_REMOTE` | `git remote get-url origin` → `No such remote 'origin'` |

Codex hat korrekt blockiert — kein Produktcode wurde geändert, kein Commit, kein PR.

Dieser Bootstrap-Commit:
- Legt den Kontext-Ordner mit Prompt, AC, Safety an
- Enthält in `CODEX_NEXT_PROMPT.md` eine SCHRITT-0-Remote-Check-Regel (origin prüfen/setzen)
- Löst beide Blocker für den nächsten Codex-Start

---

## 4. Geänderte Dateien

| Datei | Aktion | Typ |
|-------|--------|-----|
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/README.md` | CREATE | Docs |
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/CODEX_NEXT_PROMPT.md` | CREATE | Docs |
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/ACCEPTANCE_CRITERIA.md` | CREATE | Docs |
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/SAFETY_AND_SCOPE.md` | CREATE | Docs |
| `docs/review_handoffs/S1_CHECKUP_BUILDER_CODEX_CONTEXT_BOOTSTRAP_01/CHATGPT_HANDOFF.md` | CREATE | Docs |

Produktionsdateien geändert: **KEINE**
`src/` unverändert: **JA**

---

## 5. GitHub/PR-Status

| Feld | Wert |
|------|------|
| Branch | `codex-context/s1-checkup-builder-base-01` |
| Commit-Message | `docs: add Codex context for S1 checkup builder` |
| PR-Titel | `Docs: Codex context for S1 checkup builder` |
| PR-Status | Draft (kein Auto-Merge) |
| `main` | Unverändert |

---

## 6. Supabase

**NEIN** — kein DB-Write, kein Schema-Change, kein Supabase-Zugriff in diesem Paket.

---

## 7. Netlify Production Deploy

**NEIN** — kein manueller Deploy, kein Netlify CLI.

---

## 8. Automatische Netlify Preview

**Möglich/unbekannt** — GitHub PRs können automatisch eine Netlify Deploy Preview auslösen.
Das wäre kein Production Deploy. Ergebnis im PR sichtbar, falls ausgelöst.

---

## 9. Secrets

**NEIN** — keine Credentials, keine PATs, keine Tokens in Dateien, Commit oder PR.

---

## 10. Was ChatGPT prüfen soll

### Inhalt der Kontext-Dateien

1. **CODEX_NEXT_PROMPT.md:** Ist SCHRITT 0 (Remote-Check) ausreichend formuliert?
   Kann Codex damit den `origin`-Blocker selbst auflösen?

2. **ACCEPTANCE_CRITERIA.md:** Sind A1–A18 vollständig und ausreichend für den Build?
   Fehlt ein sicherheitsrelevantes Kriterium?

3. **SAFETY_AND_SCOPE.md:** Sind Verboten/Erlaubt-Listen lückenlos für dieses Paket?

4. **Sprach-No-Gos:** Sind alle medizinischen Sicherheitsgrenzen korrekt formuliert?

5. **Branch/PR/Go-Workflow:** Ist die Regel für Codex klar genug, um main-Push zu verhindern?

### Vollständigkeit

- Sind alle 5 Pflichtdateien korrekt?
- Fehlt ein Kontext-Element, das Codex für den Build braucht?
- Gibt es Widersprüche zwischen CODEX_NEXT_PROMPT.md, ACCEPTANCE_CRITERIA.md und SAFETY_AND_SCOPE.md?

---

## 11. Ob Codex danach erneut gestartet werden kann

**JA, sobald dieser PR gemergt ist.**

Voraussetzungen:
1. Dieser PR ist gemergt (Sebastian/ChatGPT-Go)
2. Branch `codex-context/s1-checkup-builder-base-01` ist in `main`
3. `codex_context/S1-CHECKUP-BUILDER-BASE-01/` ist im Repo verfügbar
4. Codex-Secrets (PAT) sind in Codex-Umgebung gesetzt

Dann kann Codex starten mit:
- `CODEX_NEXT_PROMPT.md` aus diesem Ordner als Prompt
- SCHRITT 0 löst den Remote-Blocker auf
- `BLOCKED_MISSING_CONTEXT` entfällt (Ordner vorhanden)
- Codex baut `CheckupBuilder.jsx` + `CheckupBuilder.css` + `checkup_builder_config.js` + Route + CTA

---

*Erstellt: 2026-06-25 | Kein Produktcode, kein DB-Write, kein Production Deploy*
