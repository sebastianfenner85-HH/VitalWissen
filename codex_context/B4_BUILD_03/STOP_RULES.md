# STOP_RULES — B4-BUILD-03

## Hard Stops (sofort stoppen, keine Codezeile schreiben)

| # | Bedingung | Fehlercode |
|---|-----------|-----------|
| HS-1 | `ENDE_AUFTRAG` fehlt in `codex_context/B4_BUILD_03/HANDOFF.md` | BLOCKED_INCOMPLETE_TASK_PROMPT |
| HS-2 | `codex_context/B4_BUILD_03/` fehlt im Repo | BLOCKED_MISSING_CONTEXT |
| HS-3 | Branch ist nicht `feature/b4-build-03` | BLOCKED_WRONG_BRANCH |
| HS-4 | Working Tree vor Start dirty (git status nicht clean) | BLOCKED_DIRTY_CLONE |
| HS-5 | Remote URL ≠ `github.com/sebastianfenner85-HH/VitalWissen` | BLOCKED_WRONG_REMOTE |
| HS-6 | Erlaubte Dateiliste fehlt in HANDOFF.md | BLOCKED_UNCLEAR_SCOPE |
| HS-7 | Mehr als `src/lib/laborwert_b4_actions_map.js` geändert | SCOPE_VIOLATION |
| HS-8 | Kartenanzahl je LOINC entspricht nicht exakt CARD_COUNTS.yaml | CARD_COUNT_MISMATCH |
| HS-9 | `npm run build` FAIL | BUILD_FAIL |
| HS-10 | Text-Safety FAIL (U+2028/2029, BOM, CRLF) | TEXT_SAFETY_FAIL |

Bei Hard Stop: Ausgang mit Fehlercode dokumentieren, keinen Commit erstellen.

---

## Validatoren (alle PASS vor Commit)

| # | Validator | Prüfmethode | Erwartung |
|---|-----------|------------|-----------|
| V1 | Kontext vorhanden | `ls codex_context/B4_BUILD_03/` | HANDOFF.md, STOP_RULES.md, SPEC.md, CARD_COUNTS.yaml vorhanden |
| V2 | Branch korrekt | `git branch --show-current` | `feature/b4-build-03` |
| V3 | Scope exakt eine Datei | `git diff --name-only HEAD` | Nur `src/lib/laborwert_b4_actions_map.js` |
| V4 | LDL unverändert 9 Karten | `safetyLevel` count für `2089-1` | 9 |
| V5 | HbA1c 6 Karten | `safetyLevel` count für `4548-4` | 6 |
| V6 | Ferritin 6 Karten | `safetyLevel` count für `2276-4` | 6 |
| V7 | Vitamin D 6 Karten | `safetyLevel` count für `14635-7` | 6 |
| V8 | CRP 6 Karten | `safetyLevel` count für `1988-5` | 6 |
| V9 | Alle neuen Karten 15-Felder-Schema | Alle 14 Pflichtfelder vorhanden | PASS |
| V10 | RedFlags → medium+doctorDiscussion | `contraindicationsOrRedFlags` ≠ null → safetyLevel medium/high + requiresDoctorDiscussion true | PASS |
| V11 | node/build/diff PASS | `node --check` + `npm run build` + `git diff --check` | PASS alle drei |
| V12 | Text-Safety PASS | U+2028/2029, BOM, CRLF nicht vorhanden | PASS |

---

## Karten-Zähl-Methode

```bash
# Zähle safetyLevel-Vorkommen je LOINC-Block (jede Karte hat genau eines):
python3 - <<'PYEOF'
import re
with open('src/lib/laborwert_b4_actions_map.js', 'r') as f:
    content = f.read()

loincs = {'2089-1': 'LDL', '4548-4': 'HbA1c', '2276-4': 'Ferritin', '14635-7': 'VitD', '1988-5': 'CRP'}
positions = {}
for loinc in loincs:
    m = re.search(r"'" + re.escape(loinc) + r"':", content)
    if m:
        positions[loinc] = m.start()

sorted_pos = sorted(positions.values())
for i, (loinc, start) in enumerate(sorted(positions.items(), key=lambda x: x[1])):
    end = sorted_pos[i+1] if i+1 < len(sorted_pos) else len(content)
    block = content[start:end]
    count = len(re.findall(r'safetyLevel', block))
    print(f"{loinc} ({loincs[loinc]}): {count}")
PYEOF
```

---

## Text-Safety-Checks

```bash
FILE="src/lib/laborwert_b4_actions_map.js"

# U+2028 / U+2029:
python3 -c "
content = open('$FILE', 'rb').read()
print('FAIL: U+2028/2029' if b'\xe2\x80\xa8' in content or b'\xe2\x80\xa9' in content else 'PASS')
"

# BOM:
python3 -c "
content = open('$FILE', 'rb').read()
print('FAIL: BOM' if content.startswith(b'\xef\xbb\xbf') else 'PASS')
"

# CRLF:
python3 -c "
content = open('$FILE', 'rb').read()
print('FAIL: CRLF' if b'\r\n' in content else 'PASS')
"

# Bidi-Override (U+202A–U+202E, U+2066–U+2069):
python3 -c "
content = open('$FILE', 'r', encoding='utf-8').read()
bidi = [c for c in content if '‪' <= c <= '‮' or '⁦' <= c <= '⁩']
print('FAIL: Bidi-Override gefunden' if bidi else 'PASS')
"
```

---

## Abschluss-Report-Format (Pflicht)

```
ABSCHLUSS-REPORT B4-BUILD-03:
Geänderte Dateien: src/lib/laborwert_b4_actions_map.js (+X/-Y Zeilen)
node --check: PASS / FAIL
npm run build: PASS / FAIL
git diff --check: PASS / FAIL
Text-Safety U+2028/2029: PASS / FAIL
Text-Safety BOM: PASS / FAIL
Text-Safety CRLF: PASS / FAIL
Text-Safety Bidi: PASS / FAIL
Karten LDL 2089-1: 9 (V4)
Karten HbA1c 4548-4: 6 (V5)
Karten Ferritin 2276-4: 6 (V6)
Karten Vitamin D 14635-7: 6 (V7)
Karten CRP 1988-5: 6 (V8)
V1–V12: PASS / FAIL je Validator
Branch: feature/b4-build-03
Commit-Hash: <Hash>
PR-Link: <URL>
DB-Writes: NEIN
Deploy: NEIN
Push auf main: NEIN
Merge: NEIN
```
