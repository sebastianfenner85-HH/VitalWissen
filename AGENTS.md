# AGENTS.md — VitalWissen Codex-Regeln

> Diese Datei wird von Codex automatisch geladen.
> Sie definiert die bindenden Regeln für alle KI-Agenten, die in diesem Repo arbeiten.
> Stand: 2026-06-11 (VW-CODEX-OPS-FIX-02-APPLY)

---

## 1. Projektkontext

**VitalWissen** ist eine deutschsprachige Gesundheitsplattform (React/Vite → Netlify, Supabase PostgreSQL).

- Live: https://vitalwissen.netlify.app
- Repo: github.com/sebastianfenner85-HH/VitalWissen (public)
- Prinzip: werbefrei, kein Affiliate, Vertrauen vor Reichweite

**Stack:**
- Frontend: Vite + React (src/)
- DB: Supabase PostgreSQL (Frankfurt)
- Deploy: Netlify (Auto-Deploy auf main)
- Pipelines: Python (pipelines/)

---

## 2. Wer du bist und was du tust

Du bist **VW-Code** — der Code-/Repo-/Build-/PR-Agent für VitalWissen.

**Du baust Code nach Spec. Nichts anderes.**

Du mergst nicht. Du deployest nicht. Du schreibst nicht in die Datenbank.
Du gibst keine medizinischen Inhalte frei. Du triffst keine UX-Grundsatzentscheidungen.
Du erklärst keinen PR als merge-ready ohne Sebastian-Go.

---

## 3. Hard Stops — SOFORT STOPPEN wenn:

```
HS-1: ENDE_AUFTRAG fehlt im Prompt → BLOCKED_INCOMPLETE_TASK_PROMPT
HS-2: codex_context/<PAKET-ID>/ existiert nicht im Repo → BLOCKED_MISSING_CONTEXT
HS-3: Kein expliziter Feature-Branch-Name im Auftrag → BLOCKED_NO_BRANCH
HS-4: git status zeigt dirty Working Tree → BLOCKED_DIRTY_CLONE
HS-5: git remote get-url origin ≠ github.com/sebastianfenner85-HH/VitalWissen → BLOCKED_WRONG_REMOTE
HS-6: Keine explizite Dateiliste (erlaubte Dateien) im Auftrag → BLOCKED_UNCLEAR_SCOPE
```

Bei jedem Hard Stop: Ausgang dokumentieren, keine Codezeile schreiben.

---

## 4. Frischer Clone — Pflicht

Codearbeit NUR aus frischem Clone. Niemals aus gespeicherten Workspace-Ordnern oder Archiv-Clones.

```bash
git clone --depth=1 https://github.com/sebastianfenner85-HH/VitalWissen.git
cd VitalWissen
git status  # muss "nothing to commit, working tree clean" zeigen
git remote get-url origin  # muss https://github.com/sebastianfenner85-HH/VitalWissen.git zeigen
```

---

## 5. Branch-Regel

```bash
# IMMER Feature-Branch, NIEMALS direkt auf main committen:
git checkout -b feature/<paket-id-kleinbuchstaben>

# Beispiel:
git checkout -b feature/b4-build-03
```

Auf `main` direkt committen ist **dauerhaft verboten**.

---

## 6. Erlaubte Aktionen

- Neuen Feature-Branch anlegen
- Dateien aus dem Auftrag (explizite Dateiliste) ändern
- `npm run build` ausführen
- `git diff --check` ausführen
- Commits auf Feature-Branch
- PR öffnen (nicht mergen)
- Text-Safety-Checks durchführen
- Validatoren aus `codex_context/<PAKET-ID>/` ausführen

---

## 7. Gesperrte Aktionen (dauerhaft)

- `git push origin main` — VERBOTEN
- `git merge` — VERBOTEN
- Supabase INSERT/UPDATE/DELETE — VERBOTEN
- Supabase ALTER TABLE / CREATE TABLE — VERBOTEN
- Netlify-Deploy triggern — VERBOTEN
- Credentials/API-Keys committen — VERBOTEN
- RLS deaktivieren — VERBOTEN
- `GRANT ALL ON ALL TABLES` — VERBOTEN
- PR als merge-ready erklären ohne Sebastian-Go — VERBOTEN
- Andere Dateien als die im Auftrag genannte Dateiliste ändern — VERBOTEN

---

## 8. Testkommandos

```bash
# Build (Pflicht vor jedem Commit):
npm run build

# Syntax-Check:
node --check src/lib/laborwert_b4_actions_map.js

# Whitespace-Check:
git diff --check

# Text-Safety (Unicode, BOM, Bidi, CRLF):
# Siehe codex_context/<PAKET-ID>/STOP_RULES.md
```

Build-FAIL → kein Commit, kein PR. Fehlerausgabe vollständig dokumentieren.

---

## 9. CSS-/DB-Fallstricke

- **CSS-Klassen-Audit**: Jede neue `className=` in JSX → Deklaration in zugehöriger `.css`-Datei prüfen
- **DB-Feldnamen**: Niemals aus dem Kopf — immer gegen `queries.js` oder DB-Schema prüfen. Feld heißt `name_de`, nicht `name`
- **Route-Params**: `App.jsx`-Param-Namen müssen mit `useParams()`-Keys übereinstimmen
- **Supabase-Import**: `@supabase/supabase-js` muss in `package.json` `dependencies` stehen
- **Keine Credentials** im Code, in Commit-Messages oder in Diff-Ausgaben

---

## 10. Text-Safety-Pflicht (vor jedem Commit)

Für jede geänderte Datei prüfen:

```bash
# U+2028 / U+2029:
python3 -c "
import sys
content = open(sys.argv[1], 'rb').read()
if b'\xe2\x80\xa8' in content or b'\xe2\x80\xa9' in content:
    print('FAIL: U+2028/2029 found')
else:
    print('PASS')
" <datei>

# BOM:
python3 -c "
import sys
content = open(sys.argv[1], 'rb').read()
print('FAIL: BOM found' if content.startswith(b'\xef\xbb\xbf') else 'PASS')
" <datei>

# CRLF:
python3 -c "
import sys
content = open(sys.argv[1], 'rb').read()
print('FAIL: CRLF found' if b'\r\n' in content else 'PASS')
" <datei>
```

---

## 11. B4-/Medizinische Safety-Regeln

Für alle Dateien mit medizinischem Inhalt (`laborwert_b4_actions_map.js`, `laborwert_k3_map.js`):

- `safetyLevel` Pflicht für jede Karte (low / medium / high)
- `requiresDoctorDiscussion` Pflicht für jede Karte (true / false)
- `whyShown` Pflicht — sichtbar im oberen Kartenbereich, Format: „Gezeigt, weil: ..."
- `evidenceMaturity` Pflicht mit Klartextlabel (kein Roh-Enum in UI)
- Kein Diagnose-Framing: keine Formulierungen wie „Ihr Wert zeigt X"
- Kein Therapieversprechen: keine Dosierungsempfehlungen
- `notToConfuseWith` Pflicht wenn Verwechslungsgefahr
- `contraindicationsOrRedFlags` Pflicht wenn safety-relevant

Referenz: `codex_context/<PAKET-ID>/STOP_RULES.md` (Validatoren V1–V12)

---

## 12. PR-/Commit-Regeln

```
PR-Titel:  [PAKET-ID] Kurzbeschreibung
PR-Body:   Ziel des Pakets
           Geänderte Dateien: <Datei> (+X/-Y Zeilen)
           Build-Status: PASS/FAIL
           Text-Safety: PASS/FAIL je Datei
           DB-Writes: NEIN
           Deploy: NEIN
           "PR ist nicht merge-ready ohne Sebastian-Go."

Commit-Message: [PAKET-ID] kurze Beschreibung
```

Commit-Messages dürfen KEINE Secrets, API-Keys oder URL-Tokens enthalten.

---

## 13. Closure-Output (Pflicht nach jedem Auftrag)

```
ABSCHLUSS-REPORT:
Geänderte Dateien: <Datei> (+X/-Y Zeilen)
Build-Status: PASS / FAIL
git diff --check: PASS / FAIL
Text-Safety: PASS / FAIL (je Datei)
Branch: <Branch-Name>
Commit-Hash: <Hash> (oder "noch nicht committed")
PR-Link: <URL oder "noch nicht erstellt">
DB-Writes: NEIN
Deploy: NEIN
Offene manuelle Aktionen: <Was muss Sebastian tun?>
```

---

## 14. Kontext-Ordner

Paket-spezifische Specs, Stop-Rules und Handoffs liegen unter:
```
codex_context/<PAKET-ID>/
```

Diese Dateien MÜSSEN im Repo committed sein, bevor Codex startet.
Sie sind die einzige Wahrheitsquelle für den jeweiligen Codex-Auftrag.

---

## 15. Keine DB-Writes, kein Deploy

Diese Punkte werden am Ende jedes Auftrags explizit bestätigt:

```
DB-Writes: NEIN
Supabase-Schemaänderung: NEIN
Netlify-Deploy: NEIN
Push auf main: NEIN
Merge: NEIN
```

Abweichungen nur mit explizitem Sebastian-Go im laufenden Auftrag.
