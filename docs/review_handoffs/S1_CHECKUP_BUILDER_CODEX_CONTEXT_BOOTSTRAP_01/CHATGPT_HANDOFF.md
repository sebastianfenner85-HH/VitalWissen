# ChatGPT Handoff — S1-CHECKUP-BUILDER-CODEX-CONTEXT-BOOTSTRAP-01

**Paket-ID:** S1-CHECKUP-BUILDER-CODEX-CONTEXT-BOOTSTRAP-01
**Datum:** 2026-06-25
**Erstellt von:** Claude (Cowork-Modus)
**Zweck:** Review durch ChatGPT vor Merge in main

---

## 1. Was wurde gebaut

Kein Produktcode. Nur Codex-Kontext-Dateien.

Dieser PR fügt einen Kontext-Ordner ins Repo ein, damit Codex den S1-Checkup-Builder bauen kann.
Bisher scheiterte Codex an zwei Blockern:
- `BLOCKED_MISSING_CONTEXT`: `codex_context/S1-CHECKUP-BUILDER-BASE-01/` fehlte im Repo
- `BLOCKED_WRONG_REMOTE`: Codex fand kein `origin` remote

---

## 2. Neue Dateien (alle Docs/Context, kein Produktcode)

| Datei | Zweck |
|-------|-------|
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/README.md` | Überblick + kritische Hinweise für Codex |
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/CODEX_NEXT_PROMPT.md` | Vollständiger Codex-Arbeitsauftrag |
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/ACCEPTANCE_CRITERIA.md` | AC A1–A18 |
| `codex_context/S1-CHECKUP-BUILDER-BASE-01/SAFETY_AND_SCOPE.md` | Verboten/Erlaubt-Scope |
| `docs/review_handoffs/S1_CHECKUP_BUILDER_CODEX_CONTEXT_BOOTSTRAP_01/CHATGPT_HANDOFF.md` | Diese Datei |

---

## 3. Geänderte Dateien

**Keine** — dieser PR ändert keine bestehenden Dateien.

---

## 4. Produktcode

**NEIN** — kein `src/`-Touch, kein `App.jsx`, kein `CheckupBuilder.jsx`, kein `queries.js`.

---

## 5. Commit-History (PR #27)

Commit: `docs: add Codex context for S1 checkup builder`
Commit: `docs: tighten S1 checkup Codex context before build` (K1/K2/K3-Patch)

Branch: `codex-context/s1-checkup-builder-base-01`
PR: Draft — kein Merge ohne Sebastian/ChatGPT-Go

---

## 6. DB / Supabase

**NEIN** — kein DB-Write, kein Schema-Change, kein Supabase-Zugriff in diesem Paket.

---

## 7. Netlify Production Deploy

**NEIN** — kein manueller Deploy, kein Netlify CLI.

---

## 8. Automatische Netlify Preview

**Möglich/unbekannt** — Ein PR kann automatisch eine Netlify Deploy Preview auslösen.
Diese Preview ist kein Production Deploy.
Kein manueller Netlify Deploy. Kein Netlify Production Deploy ohne Merge/main und ohne explizites Go.
Production Deploy erfolgt erst nach freigegebenem Merge auf main via Netlify Auto-Publishing.

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

4. **Kategorien:** Sind alle 5 TIER-Werte korrekt (STANDARD, OPTIONAL, SPEZIAL, NUR_FACHPERSON, NICHT_TEIL_DES_GROSSEN_BLUTBILDS)?
   `nicht_teil_des_grossen_blutbilds` = Werte außerhalb großes Blutbild, in thematischen Listen erlaubt, kein Diagnose-Framing.

5. **Sprach-No-Gos:** Sind alle medizinischen Sicherheitsgrenzen korrekt formuliert?

6. **Branch/PR/Go-Workflow:** Ist die Regel für Codex klar genug, um main-Push zu verhindern?

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
4. Codex-Auth ist in Codex-Umgebung konfiguriert (GitHub-App/gh auth/Credential Helper)

Dann kann Codex starten mit:
- `CODEX_NEXT_PROMPT.md` aus diesem Ordner als Prompt
- SCHRITT 0 löst den Remote-Blocker auf
- `BLOCKED_MISSING_CONTEXT` entfällt (Ordner vorhanden)
- Codex baut `CheckupBuilder.jsx` + `CheckupBuilder.css` + `checkup_builder_config.js` + Route + CTA

---

*Erstellt: 2026-06-25 | Kein Produktcode, kein DB-Write, kein Production Deploy*
