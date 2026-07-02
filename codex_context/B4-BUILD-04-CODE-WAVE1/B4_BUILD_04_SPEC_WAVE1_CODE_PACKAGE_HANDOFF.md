# B4-BUILD-04-SPEC-WAVE1 — Codex-Handoff

Dieses Dokument bereitet das spätere Codex-Paket vor. Es enthält keinen Code.

## 1. Späterer Paketname
`B4-BUILD-04-CODE-WAVE1`

## 2. Erlaubte Datei
- `src/lib/laborwert_b4_actions_map.js` — ausschließlich Ergänzung um 6 neue Top-Level-Einträge (Schlüssel: LOINC-Codes unten). Keine Änderung bestehender Einträge (`2089-1`, `4548-4`, `2276-4`, `14635-7`, `1988-5`).

## 3. Verbotene Dateien
- Jede `.jsx`-Datei (insbesondere `LaborwertDetail.jsx` — `B4ActionsBlock` ist bereits vollständig generisch, LOINC-/Slug-Fallback-Lookup, kein Änderungsbedarf)
- Jede `.css`-Datei
- `queries.js`
- `database/schema.sql`
- jede andere Datei außerhalb von `src/lib/laborwert_b4_actions_map.js`

## 4. Voraussetzung
- Frischer Clone von `origin/main`
- HEAD mindestens `06afb4ec2fbfd882a39d85adaa3e6f35c5ac94b6` (PR #31, verifiziert in `B4-S1-ROLLUP-CORRECTION-01`)
- Lokaler Clone-Befund widerlegt niemals allein den GitHub-Stand — bei Abweichung: stale-Clone-Verdacht dokumentieren, nicht „Commit existiert nicht" behaupten.

## 5. Werte (6, alle mit vollständiger Spec in `B4_BUILD_04_SPEC_WAVE1.md`)

| Laborwert | LOINC | high | low |
|---|---|---|---|
| Hämoglobin | `718-7` | 2 Karten | 3 Karten |
| TSH | `3016-3` | 3 Karten | 3 Karten |
| Kreatinin | `2160-0` | 3 Karten | 1 Karte |
| eGFR | `62238-1` | 0 Karten (`high: []`) | 3 Karten |
| Glukose nüchtern | `2345-7` | 3 Karten | 2 Karten |
| HDL-Cholesterin | `2085-9` | 0 Karten (`high: []`) | 3 Karten |

26 Karten gesamt. Jede Karte mit vollständigem 15-Felder-Schema (`loincCode` implizit über Top-Level-Key, `title`, `measureCategory`, `evidenceMaturity`, `evidenceType`, `whyShown`, `targetGroup`, `whatCouldHelp`, `expectedBenefit`, `uncertaintyReason`, `risksAndCautions`, `contraindicationsOrRedFlags`, `monitoring`, `doctorDiscussion`, `notToConfuseWith`, `safetyLevel`, `requiresDoctorDiscussion`, `sourceRequirement`) — Wortlaut 1:1 aus `B4_BUILD_04_SPEC_WAVE1.md` zu übernehmen, nicht frei zu paraphrasieren.

Jeder der 6 neuen Top-Level-Einträge benötigt zusätzlich `title` (Blocktitel) und `intro` (Einleitungssatz) — Vorschläge dazu stehen am Ende jedes Laborwert-Abschnitts in `B4_BUILD_04_SPEC_WAVE1.md` unter „Umsetzungsnotizen für Codex", sind aber redaktionell im Codex-Paket final zu bestätigen, nicht Teil der medizinisch geprüften Feldinhalte.

## 6. Go-Bedingung
Codex darf nur nach explizitem ChatGPT/Sebastian-Go starten.

## 7. Merge-Bedingung
Kein Merge ohne Review-Go.

## 8. Cowork-Beschränkung
Cowork darf kein Codex-Go erteilen. Cowork vergibt für dieses Spec-Paket ausschließlich einen der folgenden Status: `CODE_READY_CANDIDATE`, `CODE_READY_WITH_BLOCKERS_REMOVED`, `NOT_CODE_READY` (siehe Closure-Dokument für das tatsächlich vergebene Urteil).
