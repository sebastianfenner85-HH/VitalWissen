# SPEC — B4-BUILD-03
# Herkunft: 01_PROJECT_SOURCES_CURRENT/B4_BUILD_03_SPEC.md
# Kopierdatum: 2026-06-11
# Hinweis: Spec §1.1 enthält veraltete Karten-Counts für Ferritin/VitD/CRP.
#          Die verbindlichen Zielzahlen sind in CARD_COUNTS.yaml definiert
#          (direkt aus main@7ce4db4 verifiziert).
#
# Bindende Karten-Counts (aus CARD_COUNTS.yaml):
#   LDL  2089-1:  9 Karten (do_not_touch)
#   HbA1c 4548-4: 6 Karten (migrate)
#   Ferritin 2276-4: 6 Karten (migrate)
#   VitD 14635-7:  6 Karten (migrate)
#   CRP  1988-5:  6 Karten (migrate)
#
# §1.1 Spec-Tabelle (Ferritin: 5, VitD: 7, CRP: 7) = VERALTET, nicht verwenden.
# CARD_COUNTS.yaml hat Vorrang.

---

# B4-BUILD-03_SPEC — B4-Actions Rollout: Ferritin, HbA1c, Vitamin D, CRP

**Paket-ID:** B4-BUILD-03_SPEC  
**Datum:** 10.06.2026  
**Typ:** Spezifikation — Read-only. Kein Code. Kein DB-Write. Kein Commit. Kein Push. Kein Deploy.  
**Status:** ✅ Spec erstellt  
**Führende Quellen:**
- `B4_DECISION_LOGIC_FREEZE.md` (gepatcht 24.04.2026) — **bindend für alle Felder, Kategorien, No-Gos**
- `B4_BUILD_02_LDL_JOURNEY_CLOSURE.md` — Referenzimplementierung (15-Felder-Schema live)
- `B4_SAFETY_PATCH_CLOSURE.md` — bestätigt: HbA1c/Ferritin/VitD/CRP haben `safetyLevel` + `requiresDoctorDiscussion` nachgerüstet
- `S8_BUILD_03_CLOSURE.md` — Foundation B4ActionsBlock (5 MVP-LW, 8-Felder-Schema)
- `ACTIVE_STRANDS_CURRENT.md` — B4-BUILD-03 als nächster freigegebener Schritt bestätigt

**Workflow-Position:**  
Idee: Sebastian → Architektur: ChatGPT → **Spec: Cowork (dieses Dokument)** → Code: Codex → Review: Controller → Go: Sebastian

---

## §0 KURZURTEIL

B4-BUILD-03 bringt die vier verbleibenden MVP-Laborwerte (HbA1c, Ferritin, Vitamin D 25-OH, CRP) auf das vollständige 15-Felder-Schema gemäß B4-DECISION-LOGIC-FREEZE. Der LDL-Block (B4-BUILD-02, Commit `371f8f1`) ist die bindende Referenzimplementierung.

**Was B4-BUILD-02 gezeigt hat (Referenz):**
- Das 15-Felder-Schema ist UX-seitig vollständig umgesetzt (`renderKarte`, `B4_KATEGORIE`, `B4_EVIDENCE_MATURITY`)
- Alle 4 verbleibenden Laborwerte haben bereits den alten 8-Felder-Fallback — kein JSX-Umbau nötig, nur neues Schema in der Map
- Die LDL-Implementierung ist backward-kompatibel gebaut — neue Karten werden automatisch korrekt gerendert

**Was B4-BUILD-03 nicht ist:**
- Kein neues UX-Konzept
- Keine Datenbankänderung
- Kein Schema-Change
- Kein Redesign des B4ActionsBlock
- Kein Rollout auf neue Laborwerte jenseits der 4 (Kalium/Natrium → S8-BUILD-02d)
- Keine Krankheitsseiten-Erweiterung (→ eigenständiges Paket)

---

## §1 IST-STAND — Was bereits gebaut ist

### 1.1 Aktuell live in `laborwert_b4_actions_map.js`

| Laborwert | LOINC | Karten | Schema | `safetyLevel` | `requiresDoctorDiscussion` |
|-----------|-------|--------|--------|---------------|---------------------------|
| LDL-Cholesterin | `2089-1` | 8 high + 1 low = 9 | **15-Felder** (B4-BUILD-02) | ✅ korrekt | ✅ korrekt |
| HbA1c | `4548-4` | 4 Karten | 8-Felder + Safety-Patch | ✅ nachgerüstet | ✅ nachgerüstet |
| Ferritin | `2276-4` | 5 Karten | 8-Felder + Safety-Patch | ✅ nachgerüstet | ✅ nachgerüstet |
| Vitamin D 25-OH | `14635-7` | 7 Karten | 8-Felder + Safety-Patch | ✅ nachgerüstet | ✅ nachgerüstet |
| CRP | `1988-5` | 7 Karten | 8-Felder + Safety-Patch | ✅ nachgerüstet | ✅ nachgerüstet |

**Alle 4 Zielwerte haben `safetyLevel` und `requiresDoctorDiscussion` — das war der B4-SAFETY-PATCH (Commit `8f19256`). B4-BUILD-03 baut darauf auf.**

### 1.2 Was im alten 8-Felder-Schema fehlt

Das alte Schema (`title`, `category`, `evidence`, `whyShown`, `whatHelps`, `expectedEffect`, `cautions`, `monitoring`) hat keine:
- `measureCategory` (separates Feld statt altem `category`)
- `evidenceMaturity` + `evidenceType`
- `targetGroup`
- `whatCouldHelp` (Rename + Erweiterung)
- `expectedBenefit` (Rename + Präzisierung)
- `uncertaintyReason`
- `risksAndCautions` (Rename)
- `contraindicationsOrRedFlags`
- `doctorDiscussion`
- `notToConfuseWith`

Im gerenderten UI fehlen dadurch: evidenceMaturity-Badge, targetGroup-Zeile, uncertaintyReason, contraindicationsOrRedFlags, notToConfuseWith, doctorDiscussion-Formular. Das UX-Ziel dieses Pakets ist die vollständige Darstellung gemäß §8 B4-DECISION-LOGIC-FREEZE für alle 5 Laborwerte.

---

## §2 SCOPE

### 2.1 In-Scope

| # | Was | Datei |
|---|-----|-------|
| S1 | HbA1c-Karten von 8 auf 15 Felder migrieren | `src/lib/laborwert_b4_actions_map.js` |
| S2 | Ferritin-Karten von 8 auf 15 Felder migrieren | `src/lib/laborwert_b4_actions_map.js` |
| S3 | Vitamin-D-Karten von 8 auf 15 Felder migrieren | `src/lib/laborwert_b4_actions_map.js` |
| S4 | CRP-Karten von 8 auf 15 Felder migrieren | `src/lib/laborwert_b4_actions_map.js` |
| S5 | Backward-Kompatibilität zu LDL-Block sicherstellen | `src/lib/laborwert_b4_actions_map.js` |
| S6 | Kein JSX-Touch — LaborwertDetail.jsx rendert 15-Felder bereits korrekt (seit B4-BUILD-02) | keine Änderung |
| S7 | Kein CSS-Touch — alle `lw-b4a-*`-Klassen existieren bereits | keine Änderung |

### 2.2 Nicht-Scope (explizit)

| Ausgeschlossen | Begründung |
|----------------|-----------|
| LDL-Block anfassen | Bereits 15-Felder-Schema — nicht berühren |
| Kalium / Natrium | → S8-BUILD-02d (K3-Einordnungsblock, nicht B4-Actions) |
| Neue Laborwerte einführen | → zukünftige B4-BUILD-04+ Pakete |
| JSX-Änderungen in LaborwertDetail.jsx | B4-BUILD-02 hat `renderKarte` vollständig gebaut — unberührt lassen |
| CSS-Änderungen | Alle Klassen bereits live (`lw-b4a-*`) — keine neuen nötig |
| DB-Write | NEIN — Map ist statische JS-Datei |
| S5 / S6 / S18-Seiten | NEIN — nur Laborwertseiten |
| Krankheitsseiten-B4 | → eigenständiges B4-BUILD-06 Paket |
| Zielwert-Änderungen in S1 | → S1-BUILD-02 |
| Diagnose-Framing | → grundsätzlich verboten (B4-DECISION-LOGIC-FREEZE §9) |

---

## §3 KARTEN-SPEZIFIKATION: HbA1c (LOINC `4548-4`)

### 3.1 Kontext

HbA1c ist der wichtigste Langzeitblutzucker-Marker — zentral für Diabetesdiagnose (≥ 6,5 %, WHO) und Therapiemonitoring (DDG/AWMF). Zielwert individuell: 6,5–7,5 % je Risikoprofil (DDG 2022). B4-Karten erscheinen sowohl bei erhöhten Werten (Diabetesdiagnose/Verlauf) als auch bei erhöhtem Risiko (Prädiabetes 5,7–6,4 %).

**Pflichthinweis (analog LDL — §6.2 B4-FREEZE):**  
HbA1c-Zielwerte sind individuell. 6,5 % ist die Diagnoseschwelle, nicht automatisch das Therapieziel. DDG 2022: Ziel 6,5–7,0 % für die meisten Typ-2-Patienten, aber individuell angepasst (Hypoglykämierisiko, Alter, Komorbiditäten).

### 3.2 Kartenset HbA1c (4 Karten → 6 Karten empfohlen)

---

**Karte H1-HBA1C: Ärztliche Einordnung und Zielwert-Besprechung**

```jsonc
{
  "loincCode": "4548-4",
  "title": "Zielwert und Behandlungskonzept einordnen lassen",
  "measureCategory": "doctor_discussion",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: HbA1c-Wert liegt im Diagnose- oder Therapie-Monitoring-Bereich — individuelle Zielwert-Besprechung laut DDG/AWMF Leitlinie empfohlen",
  "targetGroup": "Alle Personen mit HbA1c ≥ 5,7 % oder bekanntem Diabetes; besonders relevant wenn neu diagnostiziert oder Wert sich verändert",
  "whatCouldHelp": "Der richtige Zielwert hängt von Alter, Komorbiditäten, Hypoglykämierisiko und Lebensqualitäts-Präferenzen ab — gemeinsam festlegen laut DDG-Leitlinie 2022",
  "expectedBenefit": "Individuell passendes Therapieziel — vermeidet sowohl Über- als auch Untertherapie",
  "uncertaintyReason": null,
  "risksAndCautions": "HbA1c allein reicht nicht zur Diagnose bei Hämoglobin-Varianten oder Anämie — in diesen Fällen Blutzucker-Direktmessung nötig",
  "contraindicationsOrRedFlags": "HbA1c > 10 %: zeitnahe medizinische Vorstellung dringend empfohlen",
  "monitoring": "HbA1c alle 3 Monate bei Anpassung, alle 6 Monate bei stabiler Einstellung (DDG 2022)",
  "doctorDiscussion": "'Was ist mein individuelles HbA1c-Ziel?' / 'Wie verläuft mein Wert in den letzten Messungen?' / 'Brauche ich eine Therapieanpassung?'",
  "notToConfuseWith": "HbA1c ist kein Tagesblutezucker — er spiegelt den Durchschnittswert der letzten 2–3 Monate",
  "safetyLevel": "medium",
  "requiresDoctorDiscussion": true,
  "sourceRequirement": "DDG/AWMF Nationale Versorgungsleitlinie Typ-2-Diabetes 2022 — doi.org/10.6101/AZQ/000475"
}
```

---

**Karte H2-HBA1C: Regelmäßige körperliche Bewegung**

```jsonc
{
  "loincCode": "4548-4",
  "title": "Strukturierte körperliche Bewegung",
  "measureCategory": "lifestyle",
  "evidenceMaturity": "established",
  "evidenceType": "meta_analysis",
  "whyShown": "Gezeigt, weil: Körperliche Aktivität senkt HbA1c nachweislich — Standardmaßnahme der DDG/AWMF-Leitlinie",
  "targetGroup": "Menschen mit Typ-2-Diabetes oder Prädiabetes (HbA1c 5,7–6,4 %); besonders wirksam bei Übergewicht",
  "whatCouldHelp": "Mindestens 150 Minuten moderate Ausdauerbelastung pro Woche (z. B. Gehen, Radfahren, Schwimmen) plus 2× Krafttraining pro Woche — gemäß DDG/ADA-Empfehlung",
  "expectedBenefit": "HbA1c-Senkung um durchschnittlich 0,5–0,7 % in Meta-Analysen; messbar nach 12 Wochen bei konsequenter Umsetzung",
  "uncertaintyReason": null,
  "risksAndCautions": "Bei Insulintherapie: Hypoglykämierisiko nach Sport beachten — Blutzucker vor/nach Sport kontrollieren",
  "contraindicationsOrRedFlags": "Bekannte kardiovaskuläre Erkrankung oder Neuropathie: Belastungstest vor Sportbeginn empfohlen",
  "monitoring": "HbA1c + Nüchternblutzucker nach 3 Monaten regelmäßiger Aktivität; Blutdruck parallel kontrollieren",
  "doctorDiscussion": "'Welche Sportform ist bei meinem Status sicher?' / 'Muss ich bei Medikation etwas beachten?'",
  "notToConfuseWith": "Kein Ersatz für Medikation bei manifest erhöhtem HbA1c — wirkt additiv zur Pharmakotherapie",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "DDG NVL Typ-2-Diabetes 2022 + Cochrane Review Aerobic Exercise T2DM (Umpierre et al., JAMA 2011)"
}
```

---

**Karte H3-HBA1C: Ernährungsanpassung / kohlenhydratbewusste Kost**

```jsonc
{
  "loincCode": "4548-4",
  "title": "Kohlenhydratbewusste Ernährung",
  "measureCategory": "lifestyle",
  "evidenceMaturity": "supported",
  "evidenceType": "meta_analysis",
  "whyShown": "Gezeigt, weil: Ernährungsqualität und Kohlenhydratlast beeinflussen HbA1c direkt — mehrere Meta-Analysen mit konsistentem Effekt",
  "targetGroup": "Menschen mit Typ-2-Diabetes oder Prädiabetes; vor allem bei kohlenhydratreicher Ernährung im Alltag",
  "whatCouldHelp": "Reduktion schnell verfügbarer Kohlenhydrate (Weißbrot, Süßgetränke, Weißreis) und Ersatz durch ballaststoffreiche Alternativen; Mediterrane Kost zeigt in RCTs konsistente HbA1c-Reduktion",
  "expectedBenefit": "HbA1c-Senkung um 0,3–0,6 % bei konsequenter Ernährungsumstellung; Effekt nach 3–6 Monaten messbar",
  "uncertaintyReason": "Optimale Kohlenhydratmenge und -qualität wird in Leitlinien unterschiedlich bewertet — individuelle Ernährungsberatung empfohlen",
  "risksAndCautions": "Sehr niedrige Kohlenhydratzufuhr bei Insulintherapie: Hypoglykämierisiko — ärztliche Abstimmung nötig",
  "contraindicationsOrRedFlags": null,
  "monitoring": "HbA1c nach 3 Monaten; Gewichtsverlauf als indirekter Marker",
  "doctorDiscussion": "'Macht eine Ernährungsberatung in meinem Fall Sinn?' / 'Gibt es eine spezifische Diätempfehlung für meinen Wert?'",
  "notToConfuseWith": "Nicht verwechseln mit 'Diabetiker-Ernährung' als starrem Regelwerk — gemeint ist Gesamtqualität der Ernährung, nicht Verbotslisten",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "Schwingshackl et al. Cochrane 2018 (Mediterranean Diet T2DM) + DDG Ernährungsempfehlungen 2021"
}
```

---

**Karte H4-HBA1C: Blutzucker-Selbstkontrolle und Monitoring-Intervall**

```jsonc
{
  "loincCode": "4548-4",
  "title": "Blutzucker-Verlaufsmessung und HbA1c-Kontrolle",
  "measureCategory": "monitoring",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: HbA1c erfordert regelmäßige Kontrolle zur Therapiebewertung — Messintervall laut DDG/AWMF Leitlinie definiert",
  "targetGroup": "Alle Personen mit bekanntem Diabetes oder Prädiabetes",
  "whatCouldHelp": "HbA1c alle 3 Monate bei Therapieanpassung, alle 6 Monate bei stabiler Einstellung; Nüchternblutzucker ergänzend je nach Therapieform",
  "expectedBenefit": "Frühzeitige Erkennung von Therapieverlusten und Hypoglykämierisiken",
  "uncertaintyReason": null,
  "risksAndCautions": "CGM-Systeme können HbA1c nicht ersetzen — ergänzend, nicht alternativ",
  "contraindicationsOrRedFlags": null,
  "monitoring": "HbA1c + Nüchternblutzucker + ggf. Lipidprofil + Nierenwerte (eGFR) als Komorbiditäts-Screening",
  "doctorDiscussion": "'In welchem Abstand sollte ich meinen HbA1c kontrollieren lassen?' / 'Brauche ich zusätzliche Blutzuckerselbstmessung?'",
  "notToConfuseWith": "HbA1c misst Langzeitverlauf — Tagesmessungen (Glukometer, CGM) liefern andere Information",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "DDG NVL Typ-2-Diabetes 2022, Kapitel Monitoring"
}
```

---

**Karte H5-HBA1C: Gewichtsreduktion bei Übergewicht (neu)**

```jsonc
{
  "loincCode": "4548-4",
  "title": "Gewichtsreduktion bei Übergewicht",
  "measureCategory": "lifestyle",
  "evidenceMaturity": "established",
  "evidenceType": "meta_analysis",
  "whyShown": "Gezeigt, weil: Übergewicht ist zentraler Risikofaktor für erhöhten HbA1c — Gewichtsreduktion senkt HbA1c nachweislich bei Typ-2-Diabetes",
  "targetGroup": "Personen mit HbA1c-Erhöhung und gleichzeitigem BMI ≥ 25 — wirksamstes Lifestyle-Instrument in dieser Gruppe",
  "whatCouldHelp": "Moderates Kaloriendefizit (300–500 kcal/Tag) + strukturierte körperliche Aktivität. 5–10 % Gewichtsreduktion hat messbaren HbA1c-Effekt.",
  "expectedBenefit": "5 % Gewichtsverlust reduziert HbA1c um ~0,5–1,0 % in Meta-Analysen; größere Reduktion (≥10 %) kann zu Teilremission führen",
  "uncertaintyReason": "Langzeit-Gewichtserhalt nach intensiven Programmen schwierig — Rückfallrisiko in Studien hoch",
  "risksAndCautions": "Sehr niedrige Kalorienzufuhr (< 800 kcal/Tag) nur unter ärztlicher Aufsicht; bei Insulintherapie: Hypoglykämierisiko bei Gewichtsabnahme",
  "contraindicationsOrRedFlags": "Essstörungsanamnese — keine Kalorienreduktionsprogramme ohne psychologische Unterstützung",
  "monitoring": "Gewicht monatlich + HbA1c alle 3 Monate",
  "doctorDiscussion": "'Wie viel Gewichtsreduktion ist für meinen HbA1c realistisch?' / 'Gibt es ein strukturiertes Programm das ich nutzen kann?'",
  "notToConfuseWith": "Nicht verwechseln mit kurzfristiger Diät — Effekt hängt vom nachhaltigen Gewichtserhalt ab",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "Look AHEAD Trial (NEJM 2013) + ADA Standards of Medical Care 2024"
}
```

---

**Karte H6-HBA1C: Schlaf und zirkadiane Rhythmik (supporting — vielversprechend)**

```jsonc
{
  "loincCode": "4548-4",
  "title": "Schlafqualität und zirkadiane Rhythmik",
  "measureCategory": "promising",
  "evidenceMaturity": "promising",
  "evidenceType": "cohort_study",
  "whyShown": "Gezeigt, weil: Schlechter Schlaf ist mit erhöhtem HbA1c assoziiert — mehrere Kohortenstudien, mechanistisch plausibel (Kortisol/Insulinresistenz)",
  "targetGroup": "Personen mit bekannten Schlafproblemen und gleichzeitig erhöhtem HbA1c — keine isolierte Maßnahme, sondern im Kontext",
  "whatCouldHelp": "Regelmäßiger Schlafrhythmus (7–8h), Vermeidung von Blaulicht und schwerem Essen vor dem Schlafen; Schlafapnoe abklären lassen wenn Schnarchen/Tagesmüdigkeit",
  "expectedBenefit": "Verbesserter Schlaf kann Insulinsensitivität verbessern — Effektstärke auf HbA1c noch nicht ausreichend belegt",
  "uncertaintyReason": "Kausalität unklar — ob Schlafverbesserung direkt HbA1c senkt ist nicht durch RCTs belegt; könnte Confounder (Lebensstil) sein",
  "risksAndCautions": null,
  "contraindicationsOrRedFlags": null,
  "monitoring": "Subjektive Schlafqualität (Schlaftagebuch oder App); ggf. Polysomnographie bei Verdacht auf Schlafapnoe",
  "doctorDiscussion": "'Sollte ich auf Schlafapnoe untersucht werden?' / 'Kann schlechter Schlaf meinen HbA1c beeinflussen?'",
  "notToConfuseWith": "Nicht als Alternative zu Ernährung und Bewegung kommunizieren — ergänzender Ansatz im Gesamtkontext",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "Reutrakul & Van Cauter, Diabetes Care 2018 (Review) + NHANES Kohortendaten"
}
```

---

## §4 KARTEN-SPEZIFIKATION: Ferritin (LOINC `2276-4`)

### 4.1 Kontext

Ferritin ist der wichtigste Marker für Eisenspeicher. Erniedrigt (< 30 µg/L): Eisenmangel möglich, Ursachenklärung nötig vor Supplementierung. Erhöht (> 300 µg/L Männer, > 200 µg/L Frauen): Hämochromatose, chronische Entzündung, Fettleber möglich.

**Kritischer B4-Grundsatz für Ferritin:**  
Selbst-Supplementierung ohne Ursachenklärung ist das zentrale Risiko. Hämochromatose (genetischer Eisenüberschuss) wird durch unkontrollierte Eiseneinnahme massiv verschlimmert. Jede Ferritin-B4-Karte muss die Arzt-Pflicht klar kommunizieren.

### 4.2 Kartenset Ferritin (5 Karten → 6 Karten empfohlen)

---

**Karte H1-FERRITIN: Ursachenklärung vor Supplementierung**

```jsonc
{
  "loincCode": "2276-4",
  "title": "Ursache klären — vor jeder Supplementierung",
  "measureCategory": "doctor_discussion",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Ferritin unter 30 µg/L — Ursachenklärung ist laut AWMF-Leitlinie Eisenmangel (021-025) zwingend vor jeder Supplementierung",
  "targetGroup": "Alle Personen mit niedrigem Ferritin — unabhängig ob mit oder ohne Symptome",
  "whatCouldHelp": "Ursachen können sein: Ernährungsmangel, okkulter Blutverlust (GI-Trakt, Gynäkologie), Resorptionsproblem (Zöliakie, Gastritis), erhöhter Bedarf (Schwangerschaft, Leistungssport). Diagnose entscheidet über Therapieweg.",
  "expectedBenefit": "Gezielte Therapie verhindert Maskierung einer ernsthaften Grunderkrankung",
  "uncertaintyReason": null,
  "risksAndCautions": "Eisensupplementierung ohne Diagnose kann bei unerkannter Hämochromatose oder Polyzythämie gefährlich sein",
  "contraindicationsOrRedFlags": "Ferritin < 12 µg/L oder Hämoglobin erniedrigt oder schwere Symptome (Herzrasen, Kurzatmigkeit): zeitnahe ärztliche Vorstellung dringend",
  "monitoring": "Blutbild + Ferritin + Transferrinsättigung + CRP (Entzündungsausschluss) + ggf. Retikulozyten",
  "doctorDiscussion": "'Was könnte der Grund für meinen niedrigen Ferritin sein?' / 'Brauche ich eine GI-Abklärung?' / 'Orale Supplementierung oder Infusion?'",
  "notToConfuseWith": "Ferritin ist kein direktes Maß für Hämoglobin — Eisenmangel-Anämie ist ein Folgezustand, kein Synonym für niedrigen Ferritin",
  "safetyLevel": "medium",
  "requiresDoctorDiscussion": true,
  "sourceRequirement": "AWMF-Leitlinie Eisenmangel und Eisenmangelanämie 021-025 (2023)"
}
```

---

**Karte H2-FERRITIN: Eisenreiche Ernährung (ernährungsbedingter Mangel)**

```jsonc
{
  "loincCode": "2276-4",
  "title": "Eisenreiche Ernährung optimieren",
  "measureCategory": "lifestyle",
  "evidenceMaturity": "supported",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Ernährungsbedingte Eisenzufuhr ist erster Ansatz bei leichtem Ferritin-Mangel ohne Blutungsverdacht",
  "targetGroup": "Leichter Mangel (Ferritin 12–30 µg/L) ohne schwere Symptome, kein Blutungsverdacht, vegetarische/vegane Ernährung als mögliche Ursache",
  "whatCouldHelp": "Häm-Eisen (Fleisch, Fisch) hat 3-fach höhere Bioverfügbarkeit als Nicht-Häm-Eisen (Hülsenfrüchte, Spinat, Tofu). Vitamin-C-reiche Lebensmittel gleichzeitig erhöhen Nicht-Häm-Eisenaufnahme.",
  "expectedBenefit": "Ferritin-Anstieg um 10–20 µg/L bei konsequenter Anpassung nach 8–12 Wochen — nur bei ernährungsbedingtem Mangel",
  "uncertaintyReason": "Ernährungsanpassung allein reicht bei schwerem Mangel oder Resorptionsproblem nicht aus",
  "risksAndCautions": "Kaffee, schwarzer Tee, Kalzium und Polyphenole hemmen Eisenresorption — zeitversetzt konsumieren (mind. 1h Abstand)",
  "contraindicationsOrRedFlags": null,
  "monitoring": "Ferritin + Transferrinsättigung nach 3 Monaten konsequenter Ernährungsumstellung",
  "doctorDiscussion": "'Kann ich meinen Bedarf über Ernährung decken oder brauche ich Supplements?' / 'Wie hoch ist mein täglicher Eisenbedarf?'",
  "notToConfuseWith": "Spinat enthält zwar Eisen, aber auch Oxalat, das die Aufnahme hemmt — kein idealer Eisenlieferant",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "DGE-Empfehlungen Eisen 2021 + AWMF-Leitlinie Eisenmangel 021-025"
}
```

---

**Karte H3-FERRITIN: Orale Eisensupplementierung (nach Diagnose)**

```jsonc
{
  "loincCode": "2276-4",
  "title": "Orale Eisensupplementierung (nach ärztlicher Diagnose)",
  "measureCategory": "standard",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Orale Eisentherapie ist Standardbehandlung bei ernährungsbedingtem oder leichtem Eisenmangel — nach Ausschluss von Kontraindikationen",
  "targetGroup": "Personen mit diagnostiziertem Eisenmangel (nicht nur Ferritin-Mangel), keine Hämochromatose, kein schwerer Blutverlust der sofortige Infusion erfordert",
  "whatCouldHelp": "Orales Eisenpräparat (Eisensulfat, Eisengluconat oder Eisenbisglycinat) — Form und Dosis legt der Arzt fest; bei bestimmten Präparaten geringere GI-Nebenwirkungen",
  "expectedBenefit": "Ferritin-Normalisierung nach 3–6 Monaten bei oraler Therapie; Hämoglobin-Anstieg nach 4–8 Wochen messbar",
  "uncertaintyReason": null,
  "risksAndCautions": "Häufige Nebenwirkungen: Übelkeit, Verstopfung, dunkler Stuhl. Nicht zusammen mit Kaffee, Tee, Milchprodukten, Antazida einnehmen.",
  "contraindicationsOrRedFlags": "Hämochromatose: absolute Kontraindikation. Chronisch entzündliche Erkrankungen (CED, RA): orale Therapie oft weniger wirksam — parenterale Alternative besprechen.",
  "monitoring": "Ferritin + Hämoglobin + Transferrinsättigung nach 4 Wochen und nach Abschluss der Therapie",
  "doctorDiscussion": "'Welches Eisenpräparat ist für mich am besten verträglich?' / 'Wie lange muss ich supplementieren?' / 'Wann ist eine Infusion besser?'",
  "notToConfuseWith": "Orales Eisen ist nicht für alle Ursachen ausreichend — bei starkem Blutverlust oder Resorptionsproblem ist intravenöses Eisen nötig",
  "safetyLevel": "medium",
  "requiresDoctorDiscussion": true,
  "sourceRequirement": "AWMF-Leitlinie Eisenmangel 021-025 (2023) + Cochrane Review Oral Iron Supplementation (2022)"
}
```

---

**Karte H4-FERRITIN: Erhöhter Ferritin-Wert — Abklärungsbedarf**

```jsonc
{
  "loincCode": "2276-4",
  "title": "Erhöhtes Ferritin: Ursachen abklären lassen",
  "measureCategory": "doctor_discussion",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Ferritin über 300 µg/L (Männer) / 200 µg/L (Frauen) kann auf Hämochromatose, akute Entzündung oder Fettlebererkrankung hinweisen",
  "targetGroup": "Personen mit deutlich erhöhtem Ferritin — besonders relevant bei gleichzeitig normalen oder niedrigen Transferrin-Werten",
  "whatCouldHelp": "Differenzierung: Ferritin als Akutphasenprotein (Entzündung) vs. Eisenüberladung (Hämochromatose) vs. Lebererkrankung. CRP + Transferrinsättigung + Leberwerte helfen einzuordnen.",
  "expectedBenefit": "Klärung ob Eisenüberladung, Entzündungsreaktion oder Leberproblem vorliegt — grundlegend unterschiedliche Therapien",
  "uncertaintyReason": null,
  "risksAndCautions": "Erhöhter Ferritin bei Hämochromatose und gleichzeitiger Eisensupplementierung: Organschäden (Leber, Herz, Pankreas) möglich",
  "contraindicationsOrRedFlags": "Ferritin > 1000 µg/L: zeitnahe Abklärung dringend erforderlich. Absolute Kontraindikation: kein Eisen supplementieren bei erhöhtem Ferritin ohne Diagnose.",
  "monitoring": "Transferrinsättigung + Leberwerte (GOT, GPT, GGT) + CRP + ggf. HFE-Gentest",
  "doctorDiscussion": "'Warum ist mein Ferritin erhöht?' / 'Sollte ich auf Hämochromatose getestet werden?' / 'Ist meine Leber betroffen?'",
  "notToConfuseWith": "Erhöhtes Ferritin bedeutet nicht automatisch zu viel Eisen — Entzündungen können Ferritin stark erhöhen ohne echte Eisenüberladung",
  "safetyLevel": "high",
  "requiresDoctorDiscussion": true,
  "sourceRequirement": "AWMF-Leitlinie Hämochromatose 040-017 + EASL-Guideline Genetic Liver Diseases 2022"
}
```

---

**Karte H5-FERRITIN: Intravenöse Eiseninfusion (bei Resorptionsproblem)**

```jsonc
{
  "loincCode": "2276-4",
  "title": "Intravenöse Eisengabe bei Resorptionsproblem",
  "measureCategory": "standard",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Bestimmte Patientengruppen sprechen auf orale Eisentherapie nicht ausreichend an — parenterale Therapie laut Leitlinie in diesen Fällen Standard",
  "targetGroup": "Personen mit CED (Morbus Crohn, Colitis ulcerosa), nach bariatrischer OP, schwangere Frauen mit schwerem Mangel, Dialysepatienten, Herzinsuffizienz-Patienten",
  "whatCouldHelp": "Intravenöse Eisenpräparate (z. B. Eisencarboxymaltose) umgehen Resorptionsproblem und korrigieren Ferritin schneller als orale Therapie",
  "expectedBenefit": "Ferritin-Normalisierung innerhalb von 2–4 Wochen bei i.v. Therapie — deutlich schneller als oral",
  "uncertaintyReason": null,
  "risksAndCautions": "Infusionsreaktionen möglich (selten aber ernst) — nur unter medizinischer Aufsicht; erstes Mal immer mit Überwachungszeit",
  "contraindicationsOrRedFlags": "Erste Trimester Schwangerschaft: i.v. Eisen nur bei absolutem Bedarf; bakterielle Infekte aktiv: kein i.v. Eisen",
  "monitoring": "Ferritin + Hämoglobin 4 Wochen nach Infusion",
  "doctorDiscussion": "'Ist eine Infusion in meinem Fall sinnvoller als Tabletten?' / 'Welches Präparat und welche Dosis ist geeignet?'",
  "notToConfuseWith": "i.v. Eisen ist keine Lifestyle-Maßnahme sondern medizinische Therapie — nicht selbst initiierbar",
  "safetyLevel": "high",
  "requiresDoctorDiscussion": true,
  "sourceRequirement": "AWMF-Leitlinie Eisenmangel 021-025 (2023) + ECCO-Guideline CED-Eisenmangel"
}
```

---

**Karte H6-FERRITIN: Ferritin-Monitoring nach Therapie (neu)**

```jsonc
{
  "loincCode": "2276-4",
  "title": "Verlaufskontrolle nach Eisentherapie",
  "measureCategory": "monitoring",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Ferritin und Hämoglobin müssen nach Therapiebeginn kontrolliert werden — Therapieerfolg und Überdosierungsrisiko prüfen",
  "targetGroup": "Alle Personen in Eisentherapie (oral oder i.v.)",
  "whatCouldHelp": "Blutbild + Ferritin + Transferrinsättigung: 4 Wochen nach Therapiebeginn; nach Abschluss nochmals zur Therapie-Validierung",
  "expectedBenefit": "Therapieerfolg sichern und Übertherapie (Ferritin > 300 µg/L) verhindern",
  "uncertaintyReason": null,
  "risksAndCautions": "Ferritin als Akutphasenprotein: bei Infekten kurzfristig erhöht — Kontrollmessung nicht während akuter Erkrankung",
  "contraindicationsOrRedFlags": null,
  "monitoring": "Ferritin + Hämoglobin + Transferrinsättigung: 4 Wochen nach Therapiebeginn, dann nach Abschluss",
  "doctorDiscussion": "'Wann sollte ich meinen Ferritin-Wert wieder kontrollieren?' / 'Wann kann ich die Supplementierung beenden?'",
  "notToConfuseWith": null,
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "AWMF-Leitlinie Eisenmangel 021-025 (2023)"
}
```

---

## §5 KARTEN-SPEZIFIKATION: Vitamin D 25-OH (LOINC `14635-7`)

### 5.1 Kontext

25-OH-Vitamin-D ist die Speicherform; aktive Form (1,25-OH) wird bei Bedarf gebildet. Grenzwerte: < 30 nmol/L schwerer Mangel, 30–50 nmol/L Mangel, 50–75 nmol/L suboptimal, > 75 nmol/L ausreichend (DGE/Endocrine Society). Öffentliche Diskussion um Nicht-Knochen-Effekte (Immunsystem, Krebs, Herz) ist intensiv — Evidenzlage dafür ist `uncertain`.

**MedQA-Pflichtgrenze für Vitamin D:**  
Hochdosierte Selbst-Supplementierung ohne Kontrolle ist das zentrale Risiko. Vitamin D ist fettlöslich — Überversorgung führt zu Hyperkalzämie (Nierensteine, Herzrhythmusstörungen). Dieser Risikohinweis gehört auf jede Supplementierungs-Karte.

### 5.2 Kartenset Vitamin D (7 Karten → 6 Karten konsolidiert)

---

**Karte H1-VITD: Ärztliche Einordnung und Supplementierungs-Dosierung**

```jsonc
{
  "loincCode": "14635-7",
  "title": "Dosierung ärztlich einordnen lassen",
  "measureCategory": "doctor_discussion",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: 25-OH-Vitamin-D unter 50 nmol/L — dosierungsgerechte Supplementierung erfordert Ausgangswert-Kenntnis",
  "targetGroup": "Alle Personen mit nachgewiesenem Vitamin-D-Mangel (< 50 nmol/L)",
  "whatCouldHelp": "Korrekte Supplementierungsdosis hängt vom Ausgangswert ab: schwerer Mangel (< 30 nmol/L) benötigt höhere Initialdosen als milder Mangel; Erhaltungsdosis danach niedrig",
  "expectedBenefit": "Vermeidung von Unter- (wirkungslos) und Übertherapie (Hyperkalzämie-Risiko)",
  "uncertaintyReason": null,
  "risksAndCautions": "Vitamin D3 täglich oder wöchentlich besser als monatliche Bolusdosen in manchen Indikationen — arztspezifisch abklären",
  "contraindicationsOrRedFlags": "Sarkoidose, Williams-Syndrom, primärer Hyperparathyreoidismus: Vitamin-D-Supplementierung kontraindiziert ohne Facharzt",
  "monitoring": "25-OH-Vitamin-D nach 3 Monaten Supplementierung; Kalzium + Phosphat wenn Hochdosierung",
  "doctorDiscussion": "'Welche Dosis ist bei meinem Ausgangswert sinnvoll?' / 'Wie lange soll ich supplementieren?' / 'Brauche ich Kalzium zusätzlich?'",
  "notToConfuseWith": "Vitamin D2 (Ergocalciferol) ist in Studien weniger effektiv als D3 (Cholecalciferol) — D3 bevorzugt",
  "safetyLevel": "medium",
  "requiresDoctorDiscussion": true,
  "sourceRequirement": "Endocrine Society Clinical Practice Guideline Vitamin D 2024 + DGE-Stellungnahme Vitamin D"
}
```

---

**Karte H2-VITD: Sonnenlicht — natürliche Vitamin-D-Synthese**

```jsonc
{
  "loincCode": "14635-7",
  "title": "Sonnenlicht und UV-B-Exposition",
  "measureCategory": "lifestyle",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Über 90 % der körpereigenen Vitamin-D-Synthese erfolgt über UV-B-Bestrahlung der Haut",
  "targetGroup": "Alle Personen mit Vitamin-D-Mangel; besonders in Herbst/Winter (Oktober–April in Deutschland: keine ausreichende UV-B-Intensität)",
  "whatCouldHelp": "Sommer (April–September): 10–30 Min. direkte Sonneneinstrahlung auf Arme/Beine zwischen 11–15 Uhr ausreichend für Tagesbedarf. Winter: Sonnenlicht nicht ausreichend in Deutschland.",
  "expectedBenefit": "Ausreichende körpereigene Synthese im Sommer möglich — reduziert Supplementierungsbedarf",
  "uncertaintyReason": null,
  "risksAndCautions": "Sonnenbrennschutz ab SPF 15 reduziert Vitamin-D-Synthese um ~95 % — Abwägung mit Hautkrebs-Prävention notwendig",
  "contraindicationsOrRedFlags": "Dunkle Hautfarbe, hohes Alter, Adipositas: Syntheserate reduziert — Supplementierung auch im Sommer notwendig prüfen",
  "monitoring": "25-OH-Vitamin-D im Herbst kontrollieren (nach Sommerperiode: Spiegel in der Regel am höchsten)",
  "doctorDiscussion": "'Kann ich meinen Bedarf im Sommer über Sonne decken?'",
  "notToConfuseWith": "Solarium ist kein Vitamin-D-Ersatz — erhöht Hautkrebs-Risiko ohne sicheren Vitamin-D-Nutzen",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "RKI Vitamin D 2020 + DGE-Stellungnahme Vitamin D 2020"
}
```

---

**Karte H3-VITD: Vitamin D3-Supplementierung**

```jsonc
{
  "loincCode": "14635-7",
  "title": "Vitamin D3-Supplementierung",
  "measureCategory": "supportive",
  "evidenceMaturity": "supported",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Vitamin-D-Supplementierung bei nachgewiesenem Mangel ist laut Leitlinie indiziert — Dosis ausgangswert-abhängig",
  "targetGroup": "Personen mit nachgewiesenem 25-OH-Vitamin-D-Mangel (< 50 nmol/L); besonders relevant für ältere Erwachsene, dunkle Hautfarbe, begrenzte Sonnenexposition",
  "whatCouldHelp": "Vitamin D3 (Cholecalciferol) täglich — genaue Dosierung abhängig vom Ausgangswert (typisch: 1000–4000 IE/Tag). Kombination mit Kalzium bei Osteoporose-Risiko.",
  "expectedBenefit": "Normalisierung 25-OH-Vitamin-D-Spiegel nach 3 Monaten; nachgewiesener Effekt auf Knochen- und Muskelgesundheit, Sturzprävention bei Älteren",
  "uncertaintyReason": "Nicht-Knochen-Effekte (Immunsystem, Krebs, Herzerkrankungen, Depression) werden intensiv diskutiert — aktuelle Meta-Analysen zeigen keine konsistente Reduktion von Krebsinzidenz oder kardiovaskulärem Risiko",
  "risksAndCautions": "Vitamin D ist fettlöslich: Überversorgung möglich. Hochdosierung (> 4000 IE/Tag dauerhaft) nur unter Kontrolle. Zeichen der Toxizität: Übelkeit, Schwäche, Kalziumsteine.",
  "contraindicationsOrRedFlags": "Sarkoidose, Hyperkalzämie, schwere Nierenerkrankung: kontraindiziert ohne Facharzt",
  "monitoring": "25-OH-Vitamin-D nach 3 Monaten; bei Hochdosis: Kalzium + Phosphat",
  "doctorDiscussion": "'Welche Dosis ist für mich richtig?' / 'Brauche ich auch Kalzium?'",
  "notToConfuseWith": "Vitamin D aus Nahrungsmitteln allein (Fisch, Eier) reicht selten für Mangel-Korrektur — Supplementierung ergänzend",
  "safetyLevel": "medium",
  "requiresDoctorDiscussion": true,
  "sourceRequirement": "Endocrine Society Guideline Vitamin D 2024 + DGE-Stellungnahme Vitamin D 2020"
}
```

---

**Karte H4-VITD: Kalzium-Zufuhr (bei Knochen-Indikation)**

```jsonc
{
  "loincCode": "14635-7",
  "title": "Kalzium-Zufuhr bei Knochen-Indikation",
  "measureCategory": "supportive",
  "evidenceMaturity": "supported",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Vitamin D ohne ausreichend Kalzium kann Knochen-Wirkung nicht vollständig entfalten — kombinierte Indikation bei Osteoporose-Risiko",
  "targetGroup": "Personen mit Vitamin-D-Mangel und gleichzeitigem Osteoporose-Risiko (Postmenopause, > 70 Jahre, Steroid-Langzeittherapie)",
  "whatCouldHelp": "1000–1200 mg Kalzium täglich bevorzugt über Ernährung (Milchprodukte, Hülsenfrüchte, Brokkoli); Supplementierung wenn Ernährungszufuhr nicht ausreicht",
  "expectedBenefit": "Kombiniert mit Vitamin D: Sturzrate und Frakturrisiko bei Älteren reduziert (NNT ~67 für Hüftfrakturen)",
  "uncertaintyReason": "Kalziumsupplementierung ohne Mangel-Indikation umstritten wegen möglichem Kardiovaskulärem Risiko — nur bei nachgewiesenem Bedarf",
  "risksAndCautions": "Kalzium-Supplementierung > 1000 mg/Tag kann Nierensteine begünstigen; kardiovaskuläres Risiko in Beobachtungsstudien erhöht (RCT-Daten gemischt)",
  "contraindicationsOrRedFlags": "Hyperkalzämie, Kalziumsteine in der Anamnese: Supplementierung kontraindiziert",
  "monitoring": "Kalzium im Serum + Parathormon (PTH) + Kreatinin bei Supplementierung",
  "doctorDiscussion": "'Brauche ich Kalzium zusätzlich zu Vitamin D?' / 'Habe ich Osteoporose-Risiko?'",
  "notToConfuseWith": "Kalzium-Supplementierung allein ohne Vitamin D hat schwächeren Effekt auf Knochen — Kombination leitlinienbasiert",
  "safetyLevel": "medium",
  "requiresDoctorDiscussion": true,
  "sourceRequirement": "DVO-Leitlinie Osteoporose 2023 + Cochrane Review Calcium + Vitamin D 2022"
}
```

---

**Karte H5-VITD: Nicht-Knochen-Effekte — was belegt ist und was nicht**

```jsonc
{
  "loincCode": "14635-7",
  "title": "Immunsystem, Krebs, Herzerkrankung: was die Forschung zeigt",
  "measureCategory": "promising",
  "evidenceMaturity": "uncertain",
  "evidenceType": "meta_analysis",
  "whyShown": "Gezeigt, weil: Vitamin D wird häufig für viele Wirkungen beworben — einige davon sind gut belegt, andere nicht",
  "targetGroup": "Personen die Vitamin D primär wegen Immunschutz, Krebsprävention oder Herzgesundheit supplementieren",
  "whatCouldHelp": "Was belegt ist: Knochen, Muskelgesundheit, Sturzprävention bei Älteren. Was nicht konsistent belegt ist: Krebsincidenz, kardiovaskuläre Ereignisse, Infektionsprävention, Depression.",
  "expectedBenefit": "Für Knochen-/Muskelgesundheit: klarer Nutzen. Für Nicht-Knochen-Effekte: keine konsistente Wirkung in großen RCTs (VITAL-Studie, D-HEALTH).",
  "uncertaintyReason": "Große RCTs (VITAL 2019, D-HEALTH 2022) zeigen keinen konsistenten Effekt von Vitamin-D-Supplementierung auf Krebsinzidenz, kardiovaskuläre Ereignisse oder Gesamtmortalität bei Personen ohne definiertem Mangel",
  "risksAndCautions": null,
  "contraindicationsOrRedFlags": null,
  "monitoring": null,
  "doctorDiscussion": "'Sollte ich Vitamin D primär wegen [Immunsystem / Krebs] nehmen?'",
  "notToConfuseWith": "Assoziation (niedrige Vitamin-D-Spiegel bei Erkrankten) ≠ Kausalität (Supplementierung schützt). Vitamin-D-Mangel kann Begleitzustand sein, nicht Ursache.",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "VITAL Study (Manson et al., NEJM 2019) + D-HEALTH Trial (Scragg et al., Lancet Diabetes Endocrinol 2022)"
}
```

---

**Karte H6-VITD: Monitoring nach Supplementierung**

```jsonc
{
  "loincCode": "14635-7",
  "title": "Verlaufskontrolle 25-OH-Vitamin-D",
  "measureCategory": "monitoring",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Vitamin D ist fettlöslich — Verlaufskontrolle verhindert Über- und Untertherapie",
  "targetGroup": "Alle Personen in Vitamin-D-Supplementierung",
  "whatCouldHelp": "25-OH-Vitamin-D-Kontrolle nach 3 Monaten Supplementierung; Zielwert > 50 nmol/L (75 nmol/L bei Osteoporose-Indikation)",
  "expectedBenefit": "Sicherstellen dass Zielwert erreicht und Toxizitätswerte (> 250 nmol/L) nicht überschritten werden",
  "uncertaintyReason": null,
  "risksAndCautions": "Aktive Form (1,25-OH) ist für Monitoring ungeeignet — immer 25-OH-Vitamin-D messen",
  "contraindicationsOrRedFlags": null,
  "monitoring": "25-OH-Vitamin-D nach 3 Monaten; Kalzium + Phosphat bei Hochdosierung",
  "doctorDiscussion": "'Wann muss ich meinen Wert kontrollieren lassen?' / 'Bin ich im Zielbereich?'",
  "notToConfuseWith": "1,25-OH-Vitamin-D (aktive Form) ist ein anderer Laborwert — für Supplementierungs-Monitoring nicht geeignet",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "Endocrine Society Guideline Vitamin D 2024"
}
```

---

## §6 KARTEN-SPEZIFIKATION: CRP (LOINC `1988-5`)

### 6.1 Kontext

CRP (C-reaktives Protein) ist ein unspezifischer Entzündungsmarker. Erhöht bei akuten Infektionen, aber auch bei chronischen Entzündungen, Übergewicht, Autoimmunerkrankungen. CRP allein stellt keine Diagnose.

**MedQA-Pflichtgrenze für CRP:**  
CRP ist der Laborwert mit dem höchsten Diagnose-Framing-Risiko. Jede B4-Karte muss klar kommunizieren: CRP ist Einordnungshilfe, kein Diagnose-Marker. Die häufigste Nutzer-Fehlannahme: „Erhöhter CRP = Entzündungskrankheit X." Das ist falsch — hoher CRP kann hundert Ursachen haben.

### 6.2 Kartenset CRP (7 Karten → 6 Karten konsolidiert)

---

**Karte H1-CRP: Ursachenklärung — CRP allein ist kein Befund**

```jsonc
{
  "loincCode": "1988-5",
  "title": "CRP einordnen — Ursache klären",
  "measureCategory": "doctor_discussion",
  "evidenceMaturity": "established",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Erhöhter CRP-Wert ist kein Diagnose-Marker sondern Hinweis auf Entzündungsprozess — Ursache muss klinisch eingeordnet werden",
  "targetGroup": "Alle Personen mit erhöhtem CRP (> 5 mg/L) — unabhängig ob leicht oder stark erhöht",
  "whatCouldHelp": "Kontextualisierung: akute Infektion (häufigste Ursache, CRP > 100 mg/L typisch bei bakteriell), chronische Entzündung (CRP 10–50 mg/L), metabolisches Syndrom (CRP 2–10 mg/L — hsCRP), Autoimmunerkrankung. Klinisches Bild entscheidend.",
  "expectedBenefit": "Gezielte Diagnostik statt blinder Therapie",
  "uncertaintyReason": null,
  "risksAndCautions": null,
  "contraindicationsOrRedFlags": "CRP > 100 mg/L: zeitnahe medizinische Abklärung, mögliche bakterielle Infektion. CRP > 300 mg/L: notfallmäßige Abklärung.",
  "monitoring": "Verlaufs-CRP (24–72h) bei akuter Infektion zur Therapiebewertung; hsCRP bei kardiovaskulärem Risiko-Screening",
  "doctorDiscussion": "'Warum ist mein CRP erhöht?' / 'Brauche ich eine Infektionssuche?' / 'Was bedeutet das für mein kardiovaskuläres Risiko?'",
  "notToConfuseWith": "CRP misst Entzündung — nicht welche Erkrankung vorliegt. Hohes CRP bedeutet nicht automatisch Autoimmunerkrankung oder Krebs.",
  "safetyLevel": "medium",
  "requiresDoctorDiscussion": true,
  "sourceRequirement": "AWMF-Leitlinie Sepsis-Diagnostik + ESC-Guideline Cardiovascular Risk (hsCRP)"
}
```

---

**Karte H2-CRP: Chronische Entzündung — Lebensstil-Einflussfaktoren**

```jsonc
{
  "loincCode": "1988-5",
  "title": "Chronische low-grade-Entzündung: Lebensstil-Ansätze",
  "measureCategory": "lifestyle",
  "evidenceMaturity": "supported",
  "evidenceType": "meta_analysis",
  "whyShown": "Gezeigt, weil: Leicht chronisch erhöhter CRP (2–10 mg/L) ohne akuten Infekt ist häufig mit Übergewicht, Bewegungsmangel und Ernährungsqualität assoziiert",
  "targetGroup": "Personen mit persistierend leicht erhöhtem CRP (2–10 mg/L), kein akuter Infekt, keine bekannte Autoimmunerkrankung",
  "whatCouldHelp": "Kombiniert wirksam: Anti-inflammatorische Ernährung (Mittelmeer-Muster), regelmäßige moderate Bewegung, Gewichtsreduktion bei Übergewicht, Rauchstopp",
  "expectedBenefit": "hsCRP-Senkung um 20–40 % bei konsequenten Lebensstilmaßnahmen über 3–6 Monate in Interventionsstudien",
  "uncertaintyReason": "Unklar ob CRP-Senkung direkt kardiovaskuläres Outcome verbessert oder nur Marker ist",
  "risksAndCautions": null,
  "contraindicationsOrRedFlags": null,
  "monitoring": "hsCRP (hochsensitives CRP) nach 3–6 Monaten Lebensstilintervention",
  "doctorDiscussion": "'Ist mein erhöhter CRP auf Lebensstil zurückzuführen?' / 'Sollte ich ein kardiovaskuläres Risiko-Screening machen?'",
  "notToConfuseWith": "Leicht erhöhtes CRP ohne Symptome ist ein Risikosignal, keine Erkrankung. Anti-inflammatorische Maßnahmen ergänzen, ersetzen nicht medizinische Abklärung.",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "Ridker et al. NEJM 2008 (JUPITER Trial) + Cochrane Review Mediterranean Diet Inflammation 2022"
}
```

---

**Karte H3-CRP: Anti-inflammatorische Ernährung**

```jsonc
{
  "loincCode": "1988-5",
  "title": "Anti-inflammatorische Ernährung (Mittelmeer-Muster)",
  "measureCategory": "lifestyle",
  "evidenceMaturity": "supported",
  "evidenceType": "meta_analysis",
  "whyShown": "Gezeigt, weil: Ernährungsqualität beeinflusst hsCRP nachweislich — Mittelmeer-Ernährung am besten belegt",
  "targetGroup": "Personen mit chronisch erhöhtem hsCRP (> 2 mg/L) ohne akuten Infekt; besonders relevant bei kardiovaskulärem Risikoprofil",
  "whatCouldHelp": "Mittelmeer-Muster: Olivenöl, Fisch (2× wöchentlich), Hülsenfrüchte, Nüsse, Gemüse, Vollkorn. Reduktion: rotes/verarbeitetes Fleisch, Zuckerzusätze, Transfette.",
  "expectedBenefit": "hsCRP-Senkung um 20–30 % bei konsequenter Mittelmeer-Ernährung in mehreren RCTs; kardiovaskuläres Risiko parallel gesenkt",
  "uncertaintyReason": null,
  "risksAndCautions": null,
  "contraindicationsOrRedFlags": null,
  "monitoring": "hsCRP nach 3 Monaten; Lipidprofil + Glukose parallel sinnvoll",
  "doctorDiscussion": "'Welche Ernährungsumstellung würde in meinem Fall am meisten bringen?'",
  "notToConfuseWith": "Anti-inflammatorische Ernährung ist kein Ersatz für Antibiotika oder Immunsuppressiva bei echter Entzündungserkrankung",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "PREDIMED Study (Estruch et al. NEJM 2013) + Meta-Analyse Mediterranean Diet hsCRP (Schwingshackl 2017)"
}
```

---

**Karte H4-CRP: Bewegung und CRP**

```jsonc
{
  "loincCode": "1988-5",
  "title": "Regelmäßige moderate körperliche Aktivität",
  "measureCategory": "lifestyle",
  "evidenceMaturity": "supported",
  "evidenceType": "meta_analysis",
  "whyShown": "Gezeigt, weil: Moderate Bewegung senkt hsCRP nachweislich — Mechanismus über Zytokin-Regulation und Adipositas-Reduktion",
  "targetGroup": "Personen mit chronisch erhöhtem hsCRP und Bewegungsmangel oder Übergewicht",
  "whatCouldHelp": "150 Minuten moderate Ausdauerbelastung pro Woche (Gehen, Schwimmen, Radfahren) — zu intensive Belastung kann CRP kurzfristig erhöhen (Übertraining-Effekt)",
  "expectedBenefit": "hsCRP-Senkung um 0,5–1,5 mg/L bei regelmäßiger moderater Bewegung nach 12 Wochen",
  "uncertaintyReason": "Effekt größer wenn gleichzeitig Gewichtsverlust eintritt — isolierter Bewegungseffekt auf CRP geringer als kombinierter Effekt",
  "risksAndCautions": "Sehr intensive Belastung (z. B. Marathon, extreme HIIT) erhöht CRP kurzfristig — kein Zeichen einer Erkrankung",
  "contraindicationsOrRedFlags": null,
  "monitoring": "hsCRP nach 12 Wochen regelmäßiger Aktivität",
  "doctorDiscussion": "'Gibt es einen Belastungstest den ich machen sollte bevor ich intensiver trainiere?'",
  "notToConfuseWith": "Akuter Muskelkater oder Übertraining erhöhen CRP kurzfristig — nicht mit chronischer Entzündung verwechseln",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "Fedewa et al. Sports Med 2017 (Meta-Analyse Exercise CRP) + AHA Physical Activity Guidelines 2018"
}
```

---

**Karte H5-CRP: CRP als kardiovaskulärer Risikomarker (hsCRP)**

```jsonc
{
  "loincCode": "1988-5",
  "title": "hsCRP als kardiovaskulärer Risikomarker einordnen",
  "measureCategory": "monitoring",
  "evidenceMaturity": "supported",
  "evidenceType": "guideline",
  "whyShown": "Gezeigt, weil: Hochsensitives CRP (hsCRP) ist ein eigenständiger kardiovaskulärer Risikomarker — ESC-Leitlinie nennt hsCRP als ergänzenden Risikofaktor",
  "targetGroup": "Personen mit hsCRP 2–10 mg/L und kardiovaskulärem Risikoprofil (Lipide, Blutdruck, Diabetes, Rauchen)",
  "whatCouldHelp": "hsCRP > 3 mg/L ist laut ESC-SCORE2 ein Modifier für höheres kardiovaskuläres Risiko — kann Behandlungsintensivierung begründen (z. B. Statin-Indikation nach JUPITER-Studie)",
  "expectedBenefit": "Genauere Risikoklassifizierung als alleiniges Lipidprofil — ermöglicht gezieltere Prävention",
  "uncertaintyReason": "hsCRP als eigenständiger Kausal-Faktor vs. Entzündungsmarker wird weiter diskutiert. ESC-Leitlinie empfiehlt hsCRP als optionalen Modifier, nicht als Primärmarker.",
  "risksAndCautions": "hsCRP im Rahmen akuter Infektion nicht für kardiovaskuläres Screening verwenden — Wert erst nach Genesung messen",
  "contraindicationsOrRedFlags": null,
  "monitoring": "hsCRP im infektfreien Intervall messen; 2-fach Messung für Baseline-Einordnung empfohlen",
  "doctorDiscussion": "'Sollte mein hsCRP-Wert in meine kardiovaskuläre Risikoeinschätzung einfließen?' / 'Verändert das meinen Behandlungsplan?'",
  "notToConfuseWith": "Standard-CRP und hsCRP sind dasselbe Protein — hsCRP ist eine sensitivere Messmethode für den Niedrigbereich (< 10 mg/L)",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "ESC Guideline Cardiovascular Prevention 2021 (§hsCRP) + JUPITER Trial Ridker 2008"
}
```

---

**Karte H6-CRP: Rauchstopp**

```jsonc
{
  "loincCode": "1988-5",
  "title": "Rauchstopp",
  "measureCategory": "lifestyle",
  "evidenceMaturity": "established",
  "evidenceType": "meta_analysis",
  "whyShown": "Gezeigt, weil: Rauchen erhöht CRP chronisch — Rauchstopp ist die Einzelmaßnahme mit dem stärksten Effekt auf chronische low-grade-Entzündung",
  "targetGroup": "Rauchende Personen mit erhöhtem hsCRP",
  "whatCouldHelp": "Rauchstopp reduziert hsCRP um 30–50 % innerhalb von 3–6 Monaten; kombiniert mit Nikotinersatz- oder Verhaltenstherapie höchste Erfolgsrate",
  "expectedBenefit": "Direkte Reduktion pro-inflammatorischer Zytokine; kardiovaskuläres Risiko langfristig stark gesenkt",
  "uncertaintyReason": null,
  "risksAndCautions": "Nikotinersatztherapie (Pflaster, Kaugummi) ist sicherer als Rauchen — nicht gegenläufiger Effekt",
  "contraindicationsOrRedFlags": null,
  "monitoring": "hsCRP nach 6 Monaten Rauchfreiheit; Lungenfunktion langfristig",
  "doctorDiscussion": "'Gibt es Unterstützungsangebote für einen Rauchstopp?' / 'Welche Nikotinersatz-Option passt zu mir?'",
  "notToConfuseWith": "E-Zigaretten sind nicht rauchfrei im klassischen Sinne — Entzündungseffekte noch nicht ausreichend erforscht",
  "safetyLevel": "low",
  "requiresDoctorDiscussion": false,
  "sourceRequirement": "Barnoya & Glantz, Circulation 2005 + Cochrane Review Smoking Cessation 2023"
}
```

---

## §7 TECHNISCHE IMPLEMENTIERUNGS-HINWEISE

### 7.1 Datei-Scope

**Einzige zu ändernde Datei:** `src/lib/laborwert_b4_actions_map.js`

- Alle 4 Laborwert-Blöcke (HbA1c/Ferritin/VitD/CRP) auf 15-Felder-Schema migrieren
- Altes 8-Felder-Format der einzelnen Karten durch neues 15-Felder-Schema ersetzen
- Karten-Anzahl je Laborwert anpassen (s. §3–§6)
- LDL-Block (`2089-1`) vollständig unberührt lassen

### 7.2 Backward-Kompatibilität

**Keine JSX-Änderungen nötig.** `LaborwertDetail.jsx` rendert das 15-Felder-Schema seit B4-BUILD-02 korrekt. Die renderKarte-Funktion handhabt:
- `measureCategory` → `B4_KATEGORIE`-Lookup
- `evidenceMaturity` → `B4_EVIDENCE_MATURITY`-Lookup mit Klartextlabel
- `whyShown` → sichtbar unter Titel/Badge
- `targetGroup` → `lw-b4a-zielgruppe`-Klasse
- `safetyLevel: 'high'` → `lw-b4a-warn-block`
- `uncertaintyReason` → `lw-b4a-uncertainty`
- `contraindicationsOrRedFlags` → `lw-b4a-contraindication`
- `notToConfuseWith` → `lw-b4a-abgrenzung`
- `doctorDiscussion` → `lw-b4a-doktor`
- `requiresDoctorDiscussion: true` → `lw-b4a-arzt-callout`

### 7.3 Migration-Hinweis für Codex

Das alte Schema verwendet Fallbacks in `renderKarte`:
```
category        → fallback für measureCategory
whatHelps       → fallback für whatCouldHelp  
expectedEffect  → fallback für expectedBenefit
cautions        → fallback für risksAndCautions
```

Nach Migration fallen alle Fallbacks durch — neue Felder direkt belegen. Die alten Felder können entfernt werden.

### 7.4 Karten-Mapping (alt → neu)

| Laborwert | Alte Karten-IDs | Neue Karten | Delta |
|-----------|----------------|-------------|-------|
| HbA1c (`4548-4`) | 4 (S8-BUILD-03, 8-Felder) | 6 Karten (15-Felder) | +2 |
| Ferritin (`2276-4`) | 5 (S8-BUILD-03, 8-Felder) | 6 Karten (15-Felder) | +1 |
| Vitamin D (`14635-7`) | 7 (S8-BUILD-03, 8-Felder) | 6 Karten (15-Felder) | −1 (konsolidiert) |
| CRP (`1988-5`) | 7 (S8-BUILD-03, 8-Felder) | 6 Karten (15-Felder) | −1 (konsolidiert) |
| **Gesamt** | **23 Karten** | **24 Karten** | **+1** |

---

## §8 VALIDATOREN

Vor dem Commit muss Codex alle Punkte prüfen:

| # | Validator | Prüfmethode |
|---|-----------|------------|
| V1 | Alle 24 Karten (4 Laborwerte × 6) vorhanden | Karten-Count je `loincCode` |
| V2 | Kein Pflichtfeld `null` wo nicht explizit erlaubt | Schema-Vollständigkeit |
| V3 | `requiresDoctorDiscussion: true` wo `safetyLevel: 'high' oder 'medium'` | Konsistenz-Check |
| V4 | `whyShown` enthält „Gezeigt, weil:" Prefix auf allen Karten | String-Prüfung |
| V5 | `evidenceMaturity` ist Enum-Wert aus `B4_EVIDENCE_MATURITY` | Enum-Validierung |
| V6 | `measureCategory` ist Enum-Wert aus `B4_KATEGORIE` | Enum-Validierung |
| V7 | LDL-Block unberührt (9 Karten, LOINC `2089-1`) | Diff |
| V8 | Kein JSX, kein CSS, keine anderen Dateien geändert | Diff |
| V9 | Kein DB-Write, kein Deploy-Trigger | Diff |
| V10 | `notToConfuseWith` bei Karten mit `measureCategory: 'avoid'` oder `'experimental'` immer befüllt | Prüfung |
| V11 | Keine Diagnoseformulierungen in `whatCouldHelp` oder `expectedBenefit` | Text-Review |
| V12 | `contraindicationsOrRedFlags` bei `safetyLevel: 'high'` immer befüllt | Konsistenz |

---

## §9 NO-GOS (spezifisch für dieses Paket)

Ergänzend zu den universellen No-Gos in B4-DECISION-LOGIC-FREEZE §9:

| # | No-Go | Spezifisch für |
|---|-------|---------------|
| NG1 | „Ferritin niedrig → Eisen nehmen" ohne Diagnose-Kontext | Ferritin-Karten |
| NG2 | Vitamin D als Immunschutz, Krebsschutz oder Herzschutz bewerben | Vitamin-D-Karten |
| NG3 | HbA1c-Zielwert ohne Risikogruppen-Kontext nennen | HbA1c-Karten |
| NG4 | CRP als Diagnose-Marker für spezifische Erkrankung framen | CRP-Karten |
| NG5 | Hochdosierte Vitamin-D-Supplementierung ohne Kontroll-Hinweis empfehlen | Vitamin-D-Karten |
| NG6 | Eisensupplementierung als Energiebooster ohne Bluttest-Voraussetzung bewerben | Ferritin-Karten |

---

## §10 UX-ANFORDERUNGEN (Auftrag)

### 10.1 Leitprinzip

**„Oben schnell verständlich, unten sichtbar belastbar."**

Die ersten 2–3 Zeilen jeder Karte müssen ohne Scrollen die Kernaussage kommunizieren:
1. Was wird angezeigt und warum (→ `whyShown`)
2. Für wen ist das relevant (→ `targetGroup`)
3. Wie zuverlässig ist das (→ `evidenceMaturity`-Badge)

Erst darunter: Details, Warnhinweise, Monitoring, Gesprächsfragen.

### 10.2 Mobile First (Q6-Standard, verbindlich)

- Tap-Targets ≥ 40px (dokumentierter Standard seit S18-Build-04a)
- Kein Inhalt über Hover erreichbar
- Max. 3 sichtbare Sätze im Fließtext — Rest in aufklappbarem Bereich
- Kein horizontales Scrollen bei 375px Viewport
- `lw-b4a-warn-block` bei `safetyLevel: 'high'`: volle Breite, ausreichend Padding

### 10.3 Sichtbarkeits-Hierarchie je Karte

```
┌─────────────────────────────────────┐
│ [Badge: Kategorie]  [Badge: Evidenz] │ ← immer sichtbar
│ Titel                                │ ← immer sichtbar
│ Gezeigt, weil: [Trigger]             │ ← immer sichtbar (§8.5 Freeze)
│ Relevant für: [Zielgruppe]           │ ← immer sichtbar (§6.2 Freeze)
├─────────────────────────────────────┤
│ Was könnte helfen / Gesprächspunkt   │ ← sichtbar
│ Erwarteter Nutzen                    │ ← sichtbar
├─────────────────────────────────────┤
│ [bei high: Warn-Block]               │ ← bei safetyLevel='high' prominent
│ Vorsicht / Risiken                   │ ← aufklappbar wenn lang
│ Nicht verwechseln mit                │ ← aufklappbar
│ Evidenzlücke                         │ ← aufklappbar (amber)
├─────────────────────────────────────┤
│ Monitoring                           │ ← aufklappbar
│ Gesprächsfragen für Arzt             │ ← aufklappbar
└─────────────────────────────────────┘
```

---

## §11 MEDQA-ANFORDERUNGEN

Für alle 4 Laborwerte gelten folgende Kommunikationspflichten:

| Anforderung | Formulierungs-Regel |
|-------------|-------------------|
| Keine Diagnose aus Laborwert | Nicht: „Dein HbA1c zeigt Diabetes" — Nur: „Dieser Wert liegt im Diagnose-Bereich laut WHO-Kriterien" |
| Keine Therapieanweisung | Nicht: „Nimm Eisen" — Nur: „Orale Eisentherapie nach ärztlicher Diagnose ist Leitlinienstandard" |
| Unsicherheiten sichtbar | `uncertaintyReason` bei allen Karten mit `evidenceMaturity ≠ 'established'` befüllt |
| Etablierungsgrad transparent | `evidenceMaturity`-Badge als Klartext-Label immer sichtbar |

---

## §12 OPS CLOSURE

| Dimension | Status |
|-----------|--------|
| Lokaler Speicherstatus | Workspace-Datei erstellt (`01_PROJECT_SOURCES_CURRENT/B4_BUILD_03_SPEC.md`) |
| git status | Kein Commit (Spec-only) |
| Commit-Status | NEIN |
| Push-Status | NEIN |
| DB-Writes | NEIN |
| Deploy | NEIN |
| Offener Side Effect | NEIN |

### Nächste zulässige Schritte

1. **Code: Codex** — `laborwert_b4_actions_map.js` migrieren nach dieser Spec
2. **Review: Controller** — 12 Validatoren aus §8 prüfen
3. **Go: Sebastian** — explizite Freigabe vor Commit/Push

### Doppelpflege

Nach Freigabe des Build-Closures sind zu aktualisieren:
1. `CLAUDE.md` (Sprint-Tabelle + Datenbank-Status)
2. `01_PROJECT_SOURCES_CURRENT/VW_03_STATUS.md`
3. `AUDIT_CANON_CURRENT.md`
4. `ACTIVE_STRANDS_CURRENT.md`

---

*Erstellt: 10.06.2026 — B4-BUILD-03_SPEC. Spec-only. Kein Build. Kein Code. Kein DB-Write. Kein Commit. Kein Push. Kein Deploy.*  
*Workflow-Position: Spec (Cowork) abgeschlossen. Nächster Schritt: Code (Codex).*  
*Führende Basisdokumente: `B4_DECISION_LOGIC_FREEZE.md` (gepatcht 24.04.2026) · `B4_BUILD_02_LDL_JOURNEY_CLOSURE.md` (25.04.2026)*
