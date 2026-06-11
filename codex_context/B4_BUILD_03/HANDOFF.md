# HANDOFF — B4-BUILD-03

## Paket-ID
B4-BUILD-03

## Aufgabe
Migriere die vier verbleibenden MVP-Laborwerte (HbA1c, Ferritin, Vitamin D 25-OH, CRP)
von ihrem aktuellen 8-Felder-Schema (+ Safety-Patch) auf das vollständige 15-Felder-Schema
gemäß B4-DECISION-LOGIC-FREEZE. Der LDL-Block (LOINC `2089-1`) bleibt vollständig unberührt
und dient als Referenzimplementierung. Kein JSX, kein CSS, keine DB-Änderungen — einzige
Zieldatei ist `src/lib/laborwert_b4_actions_map.js`.

## Erlaubte Dateien (nur diese)
- `src/lib/laborwert_b4_actions_map.js`

## Verbotene Aktionen
- Keine anderen Dateien ändern (kein JSX, kein CSS, keine anderen JS-Dateien)
- Kein `Home.jsx`, kein `Home.css`
- Keine DB-Writes / Supabase
- Kein Netlify-Deploy
- Kein Commit auf `main`
- Kein Merge
- Keine medizinischen Inhalte neu erfinden — nur Spec umsetzen

## Branch
`feature/b4-build-03`

## Vorgänger-Commit (main HEAD zum Zeitpunkt der Kontext-Erstellung)
`7ce4db4745acdc2d48b715587f2d638ef30bf9e1`

## Spec-Grundlage
`codex_context/B4_BUILD_03/SPEC.md`

## Erwartete Outputs
- Geänderte Datei: `src/lib/laborwert_b4_actions_map.js`
- Alle 4 Ziel-Laborwerte auf 15-Felder-Schema migriert
- Karten-Anzahl exakt wie in `codex_context/B4_BUILD_03/CARD_COUNTS.yaml` definiert:
  - LDL `2089-1`: 9 Karten (unverändert)
  - HbA1c `4548-4`: 6 Karten
  - Ferritin `2276-4`: 6 Karten
  - Vitamin D `14635-7`: 6 Karten
  - CRP `1988-5`: 6 Karten
- Build: PASS (`npm run build`)
- Syntax: PASS (`node --check src/lib/laborwert_b4_actions_map.js`)
- Validatoren V1–V12 aus `STOP_RULES.md` alle PASS

## 15-Felder-Schema (Pflicht je Karte)
Jede neue Karte muss alle 15 Felder enthalten:
```
loincCode, title, measureCategory, evidenceMaturity, evidenceType,
whyShown, targetGroup, whatCouldHelp, expectedBenefit, uncertaintyReason,
risksAndCautions, contraindicationsOrRedFlags, monitoring,
doctorDiscussion, notToConfuseWith, safetyLevel, requiresDoctorDiscussion
```
Hinweis: `loincCode` ist kein separates Feld im alten Schema, wird aber bei 15-Felder-Karten
benötigt (für Konsistenz). Obligatorische Felder laut Freeze: die 15 oben genannten.

## Safety-Regeln (nicht verhandelbar)
- Jede Karte mit `contraindicationsOrRedFlags` muss mindestens `safetyLevel: 'medium'` haben
- Jede Karte mit `contraindicationsOrRedFlags` muss `requiresDoctorDiscussion: true` haben
- Explizit:
  - Psyllium (Flohsamenschalen): `safetyLevel: 'medium'`, `requiresDoctorDiscussion: true`
  - Pflanzensterole/-stanole: `requiresDoctorDiscussion: true`
- `whyShown` muss das Format „Gezeigt, weil: ..." verwenden (§8.5 B4-DECISION-LOGIC-FREEZE)
- Kein Diagnose-Framing, keine Dosierungsempfehlung

## Abschluss-Pflichten (vor Commit ausführen)
1. `node --check src/lib/laborwert_b4_actions_map.js` → PASS
2. `npm run build` → PASS
3. `git diff --check` → keine Whitespace-Fehler
4. Text-Safety-Check (U+2028/U+2029, BOM, CRLF) → PASS
5. Kartenanzahl je LOINC verifizieren (s. CARD_COUNTS.yaml)
6. Vollständiger Diff prüfen: nur `src/lib/laborwert_b4_actions_map.js` geändert

## Abschluss-Report-Format
```
ABSCHLUSS-REPORT B4-BUILD-03:
Geänderte Dateien: src/lib/laborwert_b4_actions_map.js (+X/-Y Zeilen)
node --check: PASS / FAIL
npm run build: PASS / FAIL
git diff --check: PASS / FAIL
Text-Safety: PASS / FAIL
Karten LDL 2089-1: 9 (unverändert)
Karten HbA1c 4548-4: 6
Karten Ferritin 2276-4: 6
Karten Vitamin D 14635-7: 6
Karten CRP 1988-5: 6
Branch: feature/b4-build-03
Commit-Hash: <Hash>
PR-Link: <URL>
DB-Writes: NEIN
Deploy: NEIN
```

## ENDE_AUFTRAG
