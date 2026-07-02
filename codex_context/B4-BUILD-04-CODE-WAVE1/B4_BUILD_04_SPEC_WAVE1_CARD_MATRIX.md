# B4-BUILD-04-SPEC-WAVE1 — Kartenmatrix (alle 26 Karten)

Pflichtregel erfüllt: Alle `keep`-Karten haben `contains_value_or_threshold=no`, `contains_dosage=no`, `contains_therapy_recommendation=no`, `contains_diagnosis_claim=no`. Keine Karte wurde `revise` oder `drop` — alle 26 spezifizierten Karten bestehen die Sicherheitsprüfung unverändert. Verworfene Ideen separat in `B4_BUILD_04_SPEC_WAVE1_DROPPED_CARDS.md`.

| laborwert_name | loinc_code | direction | card_title | measureCategory | evidenceMaturity | evidenceType | safetyLevel | requiresDoctorDiscussion | sourceRequirement | source_required_before_code | contains_value_or_threshold | contains_dosage | contains_therapy_recommendation | contains_diagnosis_claim | functional_hp_risk | therapy_risk | diagnosis_risk | status | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hämoglobin | 718-7 | high | Kontext und mögliche Auslöser ärztlich einordnen lassen | doctor_discussion | established | clinical_consensus | medium | true | guideline | no | no | no | no | no | low | low | low | keep | Quelle identisch zu K3-Map high |
| Hämoglobin | 718-7 | high | Verlaufskontrolle nach Ursachenabklärung | monitoring | established | clinical_consensus | low | false | clinical_consensus | no | no | no | no | no | low | low | low | keep | reine Monitoring-Karte |
| Hämoglobin | 718-7 | low | Eisenstatus und Ursache gemeinsam einordnen lassen | standard | established | guideline | medium | true | guideline | no | no | no | no | no | low | low | low | keep | Quelle identisch zu K3-Map low |
| Hämoglobin | 718-7 | low | Warnzeichen als Grund für zeitnahe ärztliche Abklärung | doctor_discussion | established | clinical_consensus | high | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | grenzt sich explizit gegen GI-Blutungsdiagnose ab |
| Hämoglobin | 718-7 | low | Verlaufskontrolle nach Ursachenklärung | monitoring | established | clinical_consensus | low | false | clinical_consensus | no | no | no | no | no | low | low | low | keep | reine Monitoring-Karte |
| TSH | 3016-3 | high | fT3/fT4 gemeinsam betrachten lassen | standard | established | guideline | low | false | guideline | no | no | no | no | no | low | low | low | keep | Quelle identisch zu K3-Map high |
| TSH | 3016-3 | high | Biotin-Einnahme vor der Messung angeben | doctor_discussion | established | clinical_consensus | medium | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | Interferenz-Hinweis, keine Diagnose |
| TSH | 3016-3 | high | Arztgespräch bei neu auffälligem oder stark verändertem Wert | doctor_discussion | established | clinical_consensus | medium | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | verlaufsorientiert |
| TSH | 3016-3 | low | fT3/fT4 gemeinsam betrachten lassen (Hyperthyreose) | standard | established | guideline | low | false | guideline | no | no | no | no | no | low | low | low | keep | Quelle identisch zu K3-Map low |
| TSH | 3016-3 | low | Biotin-Einnahme kann Testergebnis verfälschen | doctor_discussion | established | clinical_consensus | medium | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | bewusste Zweitverwendung Biotin-Thema (andere Richtung) |
| TSH | 3016-3 | low | Medikamenten-/Supplement-Kontext besprechen | doctor_discussion | established | clinical_consensus | high | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | Medikamenten-Eigenabsetzung explizit ausgeschlossen |
| Kreatinin | 2160-0 | high | Gemeinsam mit eGFR einordnen lassen | standard | established | guideline | medium | true | guideline | no | no | no | no | no | low | low | low | keep | Quelle identisch zu K3-Map high |
| Kreatinin | 2160-0 | high | Hydratation, Muskelmasse und Belastung als Kontext | lifestyle | supported | clinical_consensus | low | false | clinical_consensus | no | no | no | no | no | low | low | low | keep | direkt aus K3-Map-Text |
| Kreatinin | 2160-0 | high | Arztgespräch bei wiederholt auffälligen Werten | doctor_discussion | established | clinical_consensus | high | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | Medikamenten-Eigenabsetzung explizit ausgeschlossen |
| Kreatinin | 2160-0 | low | Muskelmasse und Ernährungsstatus als Kontext für die eGFR | supporting | supported | clinical_consensus | medium | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | direkt aus K3-Map-Text |
| eGFR | 62238-1 | low | Wiederholungsmessung und Verlauf | standard | established | guideline | medium | true | guideline | no | no | no | no | no | low | low | low | keep | keine CKD-Stadien genannt |
| eGFR | 62238-1 | low | Kreatinin und Urin-Albumin gemeinsam betrachten lassen | standard | established | guideline | medium | true | guideline | no | no | no | no | no | low | low | low | keep | Quelle identisch zu K3-Map low |
| eGFR | 62238-1 | low | Medikamente und Nierenbelastung nur ärztlich anpassen | doctor_discussion | established | clinical_consensus | high | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | Medikamenten-Eigenabsetzung explizit ausgeschlossen |
| Glukose nüchtern | 2345-7 | high | Nüchternstatus und Messkontext prüfen | standard | established | clinical_consensus | low | false | clinical_consensus | no | no | no | no | no | low | low | low | keep | 8h-Nahrungskarenz = Verfahrenshinweis aus K3-Map, kein Grenzwert |
| Glukose nüchtern | 2345-7 | high | HbA1c als Verlaufskontext einbeziehen | standard | established | guideline | low | false | guideline | no | no | no | no | no | low | low | low | keep | verweist auf bestehende HbA1c-B4-Karte |
| Glukose nüchtern | 2345-7 | high | Wiederholungsmessung und ärztliche Einordnung | doctor_discussion | established | guideline | medium | true | guideline | no | no | no | no | no | low | low | low | keep | explizite Diagnose-Abgrenzung in notToConfuseWith |
| Glukose nüchtern | 2345-7 | low | Sicherheitskontext bei niedrigen Werten | doctor_discussion | established | clinical_consensus | high | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | bewusst ohne Notfallprotokoll/Dosierung |
| Glukose nüchtern | 2345-7 | low | Ursache bei wiederholt niedrigen Werten klären lassen | standard | established | clinical_consensus | high | true | clinical_consensus | no | no | no | no | no | low | low | low | keep | Insulin-Eigenabsetzung explizit ausgeschlossen |
| HDL-Cholesterin | 2085-9 | low | Vollständiges Lipidprofil gemeinsam betrachten | standard | established | guideline | low | false | guideline | no | no | no | no | no | low | low | low | keep | Quelle identisch zu K3-Map low |
| HDL-Cholesterin | 2085-9 | low | Bewegung und Ernährung als allgemeiner Risikokontext | lifestyle | supported | clinical_consensus | low | false | clinical_consensus | no | no | no | no | no | low | low | low | keep | bewusst qualitativ, kein „HDL aktiv hochtherapieren" |
| HDL-Cholesterin | 2085-9 | low | Metabolisches Syndrom als Kontext ärztlich einordnen lassen | doctor_discussion | established | guideline | medium | true | guideline | no | no | no | no | no | low | low | low | keep | Quelle identisch zu K3-Map low |

## Kennzahlen

- Karten gesamt: 26 (high: 11, low: 15)
- `keep`: 26, `revise`: 0, `drop`: 0
- `safetyLevel=high`: 6 Karten
- `requiresDoctorDiscussion=true`: 18 Karten
- `sourceRequirement=guideline`: 11 Karten, `clinical_consensus`: 15 Karten, `SOURCE_REQUIRED`: 0 Karten
- `source_required_before_code=yes`: 0 Karten
