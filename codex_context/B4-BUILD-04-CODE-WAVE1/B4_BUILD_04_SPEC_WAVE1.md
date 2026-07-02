# B4-BUILD-04-SPEC-WAVE1 — Kartendetail-Spezifikation

Kein Code. Reine Spezifikation für ein späteres Codex-Paket (`B4-BUILD-04-CODE-WAVE1`), das ausschließlich `src/lib/laborwert_b4_actions_map.js` ändern darf.

**Grundlage:** Bestehendes 15-Felder-Schema, verifiziert direkt im Code (`00_REPO/vitalwissen_ship/src/pages/LaborwertDetail.jsx`, Funktion `B4ActionsBlock`, Zeilen 240–368) und im bestehenden LDL-Eintrag (`laborwert_b4_actions_map.js`, LOINC `2089-1`). Gültige `measureCategory`-Werte (aus `B4_KATEGORIE`, Zeilen 218–228): `standard`, `supporting`, `lifestyle`, `supportive`, `promising`, `experimental`, `avoid`, `monitoring`, `doctor_discussion`. Gültige `evidenceMaturity`-Werte (aus `B4_EVIDENCE_MATURITY`, Zeilen 230–237): `established`, `supported`, `promising`, `uncertain`, `experimental`, `avoid`.

**Quellenbasis:** Alle `whyShown`/`sourceRequirement`-Inhalte stützen sich auf bereits im Projekt vorhandenes, geprüftes Material — insbesondere `src/lib/laborwert_k3_map.js` (K3-Einträge je Laborwert, dort bereits mit Leitlinienquellen wie AWMF, KDIGO, DDG, ESC/EAS, WHO, EHA/DGHO belegt) sowie die bestehenden B4-Karten für LDL/HbA1c/Ferritin/VitD/CRP als stilistisches und inhaltliches Vorbild. Keine neuen externen Quellen wurden recherchiert oder erfunden.

**Zahlenwerte:** Diese Spezifikation enthält bewusst keine Referenzwerte, Zielwerte, klinischen Schwellen, funktionellen Bereiche oder Dosierungen — auch dort nicht, wo das lokale K3-Map-Material (z. B. HbA1c-Grenzwerte, Diabetes-Diagnosekriterien) solche Zahlen bereits nennt. Wo eine Messbedingung (z. B. Nüchternstatus, Wiederholungsintervall) aus dem lokalen K3-Material übernommen wurde, ist dies als Verfahrenshinweis und nicht als klinischer Grenzwert zu verstehen — im Text der jeweiligen Karte explizit gekennzeichnet.

---

## 1. Hämoglobin — LOINC `718-7`

### 1.1 Kurzprofil
Hämoglobin ist der zentrale Parameter des roten Blutbilds. Bestehender K3-Eintrag: high → Polyzythämie/reaktive Erhöhung; low → Anämie (verschiedene Ursachen), Eisenmangelanämie.

### 1.2 High/Low-Logik
Beide Richtungen sind medizinisch relevant und mit unterschiedlicher Handlungsdichte zu versehen. Low (Anämie-Richtung) hat die höhere Alltagsrelevanz und mehr sinnvolle Gesprächspunkte als High.

### 1.3 Geplante Kartenübersicht

| Richtung | # | Titel |
|---|---|---|
| high | 1 | Kontext und mögliche Auslöser ärztlich einordnen lassen |
| high | 2 | Verlaufskontrolle nach Ursachenabklärung |
| low | 1 | Eisenstatus und Ursache gemeinsam einordnen lassen |
| low | 2 | Warnzeichen als Grund für zeitnahe ärztliche Abklärung |
| low | 3 | Verlaufskontrolle nach Ursachenklärung |

### 1.4 Kartendetail-Spezifikation

**HIGH-1 — Kontext und mögliche Auslöser ärztlich einordnen lassen**
- `loincCode`: `718-7`
- `title`: „Kontext und mögliche Auslöser ärztlich einordnen lassen"
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Erhöhtes Hämoglobin kann reaktiv (z. B. durch Rauchen, Höhenaufenthalt, Schlafapnoe, COPD) oder eigenständig (Polycythaemia vera) bedingt sein — die Unterscheidung ist nur ärztlich möglich."
- `targetGroup`: „Alle Personen mit erhöhtem Hämoglobin-Wert"
- `whatCouldHelp`: „Besprich mit deiner Ärztin oder deinem Arzt: Rauchstatus, Schlafqualität/Schlafapnoe-Verdacht, kürzlicher Höhenaufenthalt und bekannte Lungen- oder Herzerkrankungen."
- `expectedBenefit`: „Einordnung, ob eine reaktive Ursache vorliegt oder eine weiterführende Abklärung sinnvoll ist."
- `uncertaintyReason`: null
- `risksAndCautions`: „Deutlich erhöhte Hämoglobin-Werte können mit einem erhöhten Thromboserisiko einhergehen."
- `contraindicationsOrRedFlags`: „Neu aufgetretene starke Kopfschmerzen, Sehstörungen oder Schwindel bei stark erhöhtem Wert sind ein Grund für zeitnahe ärztliche Abklärung."
- `monitoring`: „Wiederholungsmessung zur Bestätigung, ggf. ergänzt um Blutgasanalyse oder Sauerstoffsättigung je nach ärztlicher Einschätzung."
- `doctorDiscussion`: „„Kommt die Erhöhung von einer erkennbaren Ursache, oder braucht es weitere Abklärung?""
- `notToConfuseWith`: „Eine leichte, vorübergehende Erhöhung ist nicht automatisch mit Polycythaemia vera gleichzusetzen — diese ist selten."
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `guideline` — EHA/DGHO-Einordnung, identisch zur bestehenden K3-Map-Quelle für `718-7` high.

**HIGH-2 — Verlaufskontrolle nach Ursachenabklärung**
- `measureCategory`: `monitoring`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Nach Einordnung der Ursache hilft eine Verlaufskontrolle einzuschätzen, ob der Wert stabil, rückläufig oder weiter ansteigend ist."
- `targetGroup`: „Personen mit bereits ärztlich eingeordnetem, erhöhtem Hämoglobin"
- `whatCouldHelp`: „Frage nach einem sinnvollen Kontrollzeitpunkt für eine erneute Messung."
- `expectedBenefit`: „Einschätzung, ob sich der Wert im Verlauf verändert und ob weitere Schritte nötig sind."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Verlaufsmessung des Hämoglobin-Werts in ärztlich festgelegtem Abstand."
- `doctorDiscussion`: „„Wann sollte der Wert erneut kontrolliert werden?""
- `notToConfuseWith`: null
- `safetyLevel`: `low`
- `requiresDoctorDiscussion`: `false`
- `sourceRequirement`: `clinical_consensus` — allgemeine Monitoring-Praxis, keine spezifische Leitlinienquelle lokal verifiziert.

**LOW-1 — Eisenstatus und Ursache gemeinsam einordnen lassen**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: Niedriges Hämoglobin ist das Hauptkennzeichen einer Anämie — die Ursache (u. a. Eisenmangel, Vitamin-B12-/Folsäuremangel, chronische Erkrankung, Blutverlust) lässt sich nur mit weiteren Werten eingrenzen."
- `targetGroup`: „Alle Personen mit erniedrigtem Hämoglobin-Wert"
- `whatCouldHelp`: „Bitte darum, dass Ferritin, Transferrinsättigung und MCV gemeinsam mit dem Hämoglobin-Wert betrachtet werden, falls noch nicht geschehen."
- `expectedBenefit`: „Bessere Eingrenzung, welche Anämie-Ursache im konkreten Fall wahrscheinlich ist."
- `uncertaintyReason`: null
- `risksAndCautions`: „Ein einzelner Hämoglobin-Wert reicht für eine Ursacheneingrenzung nicht aus."
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Ferritin, Transferrinsättigung, MCV, ggf. Vitamin B12 und Folsäure."
- `doctorDiscussion`: „„Welche Ursache kommt in meinem Fall am ehesten infrage?" / „Welche weiteren Werte sind sinnvoll?""
- `notToConfuseWith`: „Ein niedriges Hämoglobin allein erlaubt keine Aussage über die Art der Anämie."
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `guideline` — WHO/AWMF Anämie-Leitlinie, identisch zur bestehenden K3-Map-Quelle für `718-7` low.

**LOW-2 — Warnzeichen als Grund für zeitnahe ärztliche Abklärung**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Bestimmte Begleitsymptome bei niedrigem Hämoglobin sind ein Grund, die Abklärung nicht aufzuschieben."
- `targetGroup`: „Personen mit erniedrigtem Hämoglobin und Begleitsymptomen"
- `whatCouldHelp`: „Melde deiner Ärztin oder deinem Arzt zeitnah, wenn zusätzlich starke Müdigkeit, Atemnot bei geringer Belastung, Herzrasen, Schwindel oder sichtbares Blut im Stuhl oder Urin auftreten."
- `expectedBenefit`: „Schnellere Einordnung, ob eine dringlichere Abklärung notwendig ist."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: „Sichtbares Blut im Stuhl oder Urin, starke Atemnot oder Brustschmerzen sind ein Grund für zeitnahe ärztliche Abklärung — unabhängig von der Ursache."
- `monitoring`: null
- `doctorDiscussion`: „„Sollten meine Symptome zeitnah abgeklärt werden?""
- `notToConfuseWith`: „Dieser Hinweis beschreibt ein Symptombild, das abgeklärt werden sollte — er stellt keine Diagnose (z. B. Magen-Darm-Blutung) und keine Ursachenzuordnung dar."
- `safetyLevel`: `high`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus` — allgemeiner Red-Flag-Konsens, keine spezifische Leitlinienquelle lokal verifiziert.

**LOW-3 — Verlaufskontrolle nach Ursachenklärung**
- `measureCategory`: `monitoring`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Nach Einordnung der Ursache zeigt eine Verlaufskontrolle, ob eine Maßnahme wirkt."
- `targetGroup`: „Personen mit bereits ärztlich eingeordnetem, erniedrigtem Hämoglobin"
- `whatCouldHelp`: „Frage nach einem sinnvollen Kontrollzeitpunkt für eine erneute Messung."
- `expectedBenefit`: „Einschätzung, ob sich der Wert im Verlauf normalisiert."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Verlaufsmessung des Hämoglobin-Werts in ärztlich festgelegtem Abstand."
- `doctorDiscussion`: „„Wann sollte der Wert erneut kontrolliert werden?""
- `notToConfuseWith`: null
- `safetyLevel`: `low`
- `requiresDoctorDiscussion`: `false`
- `sourceRequirement`: `clinical_consensus`

### 1.5 Gestrichene/verbotene Kartenideen

| Idee | Grund | risk_type | could_revisit_later | needed_before_revisit |
|---|---|---|---|---|
| Eisensupplementierung mit Dosierungsempfehlung | Dosierung nicht zulässig | dosage | no | — |
| „Diagnose Blutarmut aus einem Wert" | Diagnose-Framing | diagnosis | no | — |
| Generische Ernährungstipps „eisenreich essen" als eigene Karte | Redundant zur bereits bestehenden Ferritin-B4-Karte „Eisenreiche Ernährungsgewohnheiten besprechen" (`2276-4`) — Füllkarte ohne Zusatznutzen | low_utility | no | — |

### 1.6 Safety-Prüfung (12 Fragen, Kurzform)
Keine Karte suggeriert eine Diagnose, empfiehlt Therapie oder nennt eine Dosierung/einen Grenzwert. LOW-2 grenzt sich explizit gegen eine GI-Blutungsdiagnose ab (`notToConfuseWith`). Red-Flag-Sprache in LOW-2 ist konkret, aber nicht alarmistisch (keine Notfall-Handlungsanweisung). `safetyLevel`/`requiresDoctorDiscussion` sind je Karte plausibel gesetzt (High-Risk nur bei LOW-2). Alle Karten sind für Laien verständlich formuliert, ohne zu vereinfachen.

### 1.7 Quellenbedarf
Siehe `B4_BUILD_04_SPEC_WAVE1_SOURCE_REQUIREMENTS.md`. Kurzfassung: 2 Karten `guideline` (direkt aus K3-Map übernommen), 3 Karten `clinical_consensus` (keine blockierende Anforderung).

### 1.8 Offene Punkte für ChatGPT/Sebastian
- Sollen HIGH-2 und LOW-3 (beide reine Monitoring-Karten mit identischer Struktur) zu einer gemeinsamen, richtungsneutralen Formulierung zusammengefasst werden, oder bleibt die Trennung nach high/low bestehen (aktuell: getrennt, da Schema dies vorsieht)?

### 1.9 Umsetzungsnotizen für Codex
5 Karten (high: 2, low: 3). Kein Konflikt mit bestehenden Einträgen (`718-7` ist noch nicht in `laborwert_b4_actions_map.js` vorhanden). `intro`-Text analog bestehendem Muster zu ergänzen (Codex-Aufgabe, nicht Teil dieser Spec — Vorschlag: „Der Hämoglobin-Wert wird immer im Zusammenhang mit weiteren Blutbildwerten bewertet. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Diagnose oder Therapieempfehlung.").

---

## 2. TSH — LOINC `3016-3`

### 2.1 Kurzprofil
TSH steuert die Schilddrüsenaktivität. K3-Eintrag: high → Hypothyreose/Hashimoto; low → Hyperthyreose/Morbus Basedow. Biotin-Interferenz bereits im bestehenden K3-Map-Eintrag (`3016-3` low, caution) dokumentiert.

### 2.2 High/Low-Logik
Beide Richtungen gleichwertig relevant. Biotin-Interferenz betrifft beide Richtungen (kann TSH je nach Testmethode sowohl fälschlich erhöhen als auch fälschlich erniedrigen) und wird daher bewusst in beiden Gruppen mit richtungsspezifischer Beschreibung geführt (keine Duplikat-Füllkarte, sondern zwei unterschiedlich kontextualisierte Karten zum selben zugrunde liegenden Phänomen).

### 2.3 Geplante Kartenübersicht

| Richtung | # | Titel |
|---|---|---|
| high | 1 | fT3/fT4 gemeinsam betrachten lassen |
| high | 2 | Biotin-Einnahme vor der Messung angeben |
| high | 3 | Arztgespräch bei neu auffälligem oder stark verändertem Wert |
| low | 1 | fT3/fT4 gemeinsam betrachten lassen (Hyperthyreose-Richtung) |
| low | 2 | Biotin-Einnahme kann Testergebnis verfälschen |
| low | 3 | Medikamenten-/Supplement-Kontext besprechen |

### 2.4 Kartendetail-Spezifikation

**HIGH-1 — fT3/fT4 gemeinsam betrachten lassen**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: Ein erhöhter TSH-Wert allein reicht für eine Einordnung nicht aus — fT3 und fT4 ergänzen das Bild."
- `targetGroup`: „Alle Personen mit erhöhtem TSH-Wert"
- `whatCouldHelp`: „Bitte darum, dass fT3 und fT4 bestimmt werden, falls dies noch nicht geschehen ist."
- `expectedBenefit`: „Vollständigere Einordnung der Schilddrüsenfunktion."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „fT3, fT4."
- `doctorDiscussion`: „„Sollten fT3 und fT4 mitbestimmt werden?""
- `notToConfuseWith`: „Ein erhöhter TSH-Wert ist keine automatische Diagnose einer Schilddrüsenunterfunktion oder von Hashimoto — beides erfordert weitere Abklärung."
- `safetyLevel`: `low`
- `requiresDoctorDiscussion`: `false`
- `sourceRequirement`: `guideline` — AWMF S2k Hypothyreose 2022, identisch zur K3-Map-Quelle `3016-3` high.

**HIGH-2 — Biotin-Einnahme vor der Messung angeben**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Hochdosiertes Biotin (z. B. aus Nahrungsergänzung für Haare, Haut, Nägel) kann TSH-Messergebnisse verfälschen — dies ist bereits als Einflussfaktor auf die Schilddrüsenwerte dokumentiert."
- `targetGroup`: „Personen, die Biotin-Präparate einnehmen und einen auffälligen TSH-Wert haben"
- `whatCouldHelp`: „Gib bei der Blutabnahme an, ob und in welcher Form du Biotin-Präparate einnimmst, und bespreche mit der Praxis, ob eine Wiederholungsmessung nach einer Einnahmepause sinnvoll ist."
- `expectedBenefit`: „Ausschluss einer messtechnischen Verfälschung, bevor weitere Schritte besprochen werden."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Wiederholungsmessung nach ärztlich/laborseitig abgestimmter Einnahmepause."
- `doctorDiscussion`: „„Kann meine Biotin-Einnahme das Ergebnis beeinflusst haben?""
- `notToConfuseWith`: „Eine biotinbedingte Verfälschung ist keine echte Schilddrüsenfunktionsstörung."
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus` — Biotin bereits im bestehenden lokalen K3-Map-Eintrag `3016-3` (low, caution) als Einflussfaktor genannt; keine zusätzliche externe Quelle recherchiert.

**HIGH-3 — Arztgespräch bei neu auffälligem oder stark verändertem Wert**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Ein neu aufgetretener oder deutlich veränderter TSH-Wert profitiert von zeitnaher ärztlicher Einordnung, unabhängig vom genauen Ausmaß."
- `targetGroup`: „Personen mit neu auffälligem oder im Vergleich zu Vorwerten stark verändertem TSH"
- `whatCouldHelp`: „Bringe frühere Messwerte mit, falls vorhanden, damit der Verlauf eingeordnet werden kann."
- `expectedBenefit`: „Bessere Einordnung, ob es sich um eine neue Entwicklung oder eine bekannte Konstellation handelt."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: „Begleitsymptome wie starker Gewichtsverlust, Herzrasen, ausgeprägte Erschöpfung oder Kälte-/Wärmeintoleranz sollten der Ärztin oder dem Arzt aktiv mitgeteilt werden."
- `monitoring`: null
- `doctorDiscussion`: „„Ist diese Veränderung im Vergleich zu meinen früheren Werten auffällig?""
- `notToConfuseWith`: null
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus`

**LOW-1 — fT3/fT4 gemeinsam betrachten lassen (Hyperthyreose-Richtung)**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: Ein erniedrigter TSH-Wert allein reicht für eine Einordnung nicht aus — fT3 und fT4 zeigen, ob tatsächlich eine Überfunktion vorliegt."
- `targetGroup`: „Alle Personen mit erniedrigtem TSH-Wert"
- `whatCouldHelp`: „Bitte darum, dass fT3 und fT4 bestimmt werden, falls dies noch nicht geschehen ist."
- `expectedBenefit`: „Vollständigere Einordnung der Schilddrüsenfunktion."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „fT3, fT4, ggf. TRAK bei Verdacht auf Morbus Basedow (nur ärztlich zu veranlassen)."
- `doctorDiscussion`: „„Sollten fT3 und fT4 mitbestimmt werden?""
- `notToConfuseWith`: „Ein erniedrigter TSH-Wert ist keine automatische Diagnose einer Schilddrüsenüberfunktion oder von Morbus Basedow."
- `safetyLevel`: `low`
- `requiresDoctorDiscussion`: `false`
- `sourceRequirement`: `guideline` — AWMF S2k Hyperthyreose 2020, identisch zur K3-Map-Quelle `3016-3` low.

**LOW-2 — Biotin-Einnahme kann Testergebnis verfälschen**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Hochdosiertes Biotin kann TSH-Werte verfälscht niedrig erscheinen lassen und dadurch ein Bild ähnlich einer Überfunktion erzeugen."
- `targetGroup`: „Personen, die Biotin-Präparate einnehmen und einen erniedrigten TSH-Wert haben"
- `whatCouldHelp`: „Gib bei der Blutabnahme an, ob und in welcher Form du Biotin-Präparate einnimmst, und bespreche mit der Praxis, ob eine Wiederholungsmessung nach einer Einnahmepause sinnvoll ist."
- `expectedBenefit`: „Ausschluss einer messtechnischen Verfälschung, bevor weitere Schritte besprochen werden."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Wiederholungsmessung nach ärztlich/laborseitig abgestimmter Einnahmepause."
- `doctorDiscussion`: „„Kann meine Biotin-Einnahme das Ergebnis beeinflusst haben?""
- `notToConfuseWith`: „Eine biotinbedingte Verfälschung ist keine echte Schilddrüsenüberfunktion."
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus` — identische lokale Grundlage wie HIGH-2.

**LOW-3 — Medikamenten-/Supplement-Kontext besprechen**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Ein erniedrigter TSH-Wert kann bei bestehender Schilddrüsenhormon-Einnahme auf eine zu hohe Dosierung hinweisen — dies ist nur ärztlich zu beurteilen."
- `targetGroup`: „Personen, die Schilddrüsenhormone einnehmen und einen erniedrigten TSH-Wert haben"
- `whatCouldHelp`: „Besprich Dosierung und Einnahmezeitpunkt deiner Schilddrüsenmedikation mit deiner Ärztin oder deinem Arzt — ändere die Dosierung nicht eigenständig."
- `expectedBenefit`: „Einordnung, ob eine Dosisanpassung sinnvoll ist."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: „Medikamente zur Schilddrüsenbehandlung nicht eigenständig absetzen oder in der Dosis verändern."
- `monitoring`: „TSH-Kontrolle nach ärztlich festgelegtem Intervall bei Dosisänderung."
- `doctorDiscussion`: „„Ist meine aktuelle Dosierung noch passend?""
- `notToConfuseWith`: null
- `safetyLevel`: `high`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus`

### 2.5 Gestrichene/verbotene Kartenideen

| Idee | Grund | risk_type | could_revisit_later | needed_before_revisit |
|---|---|---|---|---|
| Levothyroxin-Dosisanpassung als Karte | Dosierung nicht zulässig | dosage | no | — |
| „Diagnose Hashimoto/Basedow nur aus TSH" | Diagnose-Framing, Leitlinie erfordert weitere Werte/Antikörper | diagnosis | no | — |
| Referenzbereich-Tabelle je Trimester (Schwangerschaft) | Referenzwerte/Kontextreferenzen nicht Teil dieses Pakets, keine S1-Schwangerschaftsreferenz im Schema vorhanden | threshold/source | yes | S1-Arbeit (Schema-Erweiterung Schwangerschaftsreferenzen) |

### 2.6 Safety-Prüfung (Kurzform)
Keine Diagnose (Hashimoto/Basedow explizit ausgeschlossen), keine Dosierung, keine Grenzwerte. Biotin-Karten korrekt als Interferenz-Hinweis, nicht als Diagnose formuliert. LOW-3 mit `safetyLevel: high` wegen Medikamentenbezug korrekt hoch angesetzt.

### 2.7 Quellenbedarf
2 Karten `guideline` (AWMF, direkt aus K3-Map), 4 Karten `clinical_consensus` (davon 2 Biotin-Karten mit lokaler K3-Grundlage). Keine Karte `SOURCE_REQUIRED_BEFORE_CODE`.

### 2.8 Offene Punkte für ChatGPT/Sebastian
- Soll ein festes Zeitfenster für die „Biotin-Einnahmepause vor Wiederholungsmessung" genannt werden? Diese Spec nennt bewusst keine konkrete Stundenzahl (keine lokal verifizierte Quelle vorhanden) — falls gewünscht, ist dies ein `SOURCE_REQUIRED_LATER`-Punkt für ein Folgepaket.

### 2.9 Umsetzungsnotizen für Codex
6 Karten (high: 3, low: 3). `3016-3` ist noch nicht in `laborwert_b4_actions_map.js` vorhanden.

---

## 3. Kreatinin — LOINC `2160-0`

### 3.1 Kurzprofil
Kreatinin ist ein muskelabhängiger Nierenfunktionsmarker, immer im Zusammenhang mit eGFR zu betrachten. K3-Eintrag: high → eingeschränkte Nierenfunktion, Dehydratation, hohe Muskelmasse/Belastung; low → geringe Muskelmasse.

### 3.2 High/Low-Logik
High hat deutlich mehr sinnvolle, unterscheidbare Gesprächspunkte als Low — asymmetrische Kartenzahl (high 3, low 1) bewusst gewählt statt symmetrischer Auffüllung.

### 3.3 Geplante Kartenübersicht

| Richtung | # | Titel |
|---|---|---|
| high | 1 | Gemeinsam mit eGFR einordnen lassen |
| high | 2 | Hydratation, Muskelmasse und Belastung als Kontext |
| high | 3 | Arztgespräch bei wiederholt auffälligen Werten |
| low | 1 | Muskelmasse und Ernährungsstatus als Kontext für die eGFR |

### 3.4 Kartendetail-Spezifikation

**HIGH-1 — Gemeinsam mit eGFR einordnen lassen**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: Kreatinin ist ein relativ unempfindlicher Marker — die Nierenfunktion kann bereits eingeschränkt sein, bevor Kreatinin auffällig wird. Die eGFR liefert eine genauere Einschätzung."
- `targetGroup`: „Alle Personen mit erhöhtem Kreatinin"
- `whatCouldHelp`: „Betrachte den Kreatinin-Wert gemeinsam mit der eGFR (siehe eGFR-Seite) und bitte bei einem Erstbefund um eine Wiederholungsmessung."
- `expectedBenefit`: „Genauere Einschätzung der Nierenfunktion als durch Kreatinin allein."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „eGFR, Wiederholungsmessung des Kreatinin-Werts."
- `doctorDiscussion`: „„Wie ordnet sich mein Kreatinin-Wert im Zusammenhang mit der eGFR ein?""
- `notToConfuseWith`: „Ein einzelner erhöhter Kreatinin-Wert ist keine Diagnose einer Nierenerkrankung."
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `guideline` — KDIGO 2024/NVL Nierenerkrankungen, identisch zur K3-Map-Quelle `2160-0` high.

**HIGH-2 — Hydratation, Muskelmasse und Belastung als Kontext**
- `measureCategory`: `lifestyle`
- `evidenceMaturity`: `supported`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Flüssigkeitsmangel sowie hohe Muskelmasse oder sehr intensive körperliche Belastung können Kreatinin erhöhen, ohne dass eine Nierenerkrankung vorliegt."
- `targetGroup`: „Personen mit erhöhtem Kreatinin ohne bekannte Nierenerkrankung, insbesondere nach intensiver körperlicher Belastung oder bei geringer Trinkmenge vor der Messung"
- `whatCouldHelp`: „Besprich Trinkmenge und Zeitpunkt intensiver körperlicher Belastung vor der Blutabnahme — ggf. ist eine Wiederholungsmessung unter Standardbedingungen sinnvoll."
- `expectedBenefit`: „Einordnung, ob ein vorübergehender, nicht-renaler Effekt vorliegt."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Wiederholungsmessung unter Standardbedingungen (ausreichend hydriert, ohne vorherige intensive Belastung)."
- `doctorDiscussion`: „„Könnten Trinkmenge oder Training das Ergebnis beeinflusst haben?""
- `notToConfuseWith`: „Dies ersetzt keine ärztliche Abklärung bei wiederholt oder deutlich erhöhten Werten."
- `safetyLevel`: `low`
- `requiresDoctorDiscussion`: `false`
- `sourceRequirement`: `clinical_consensus` — direkt aus K3-Map-Eintrag `2160-0` high übernommen.

**HIGH-3 — Arztgespräch bei wiederholt auffälligen Werten**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Wiederholt erhöhte Kreatinin-Werte sollten ärztlich abgeklärt werden — insbesondere im Zusammenhang mit Medikamenten, die die Nierenfunktion beeinflussen können."
- `targetGroup`: „Personen mit wiederholt oder deutlich erhöhtem Kreatinin"
- `whatCouldHelp`: „Bringe frühere Messwerte mit und liste alle aktuell eingenommenen Medikamente (inkl. rezeptfreier Schmerzmittel) auf."
- `expectedBenefit`: „Vollständigere Grundlage für die ärztliche Einordnung."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: „Medikamente, die die Nierenfunktion beeinflussen können (z. B. bestimmte Schmerzmittel oder Blutdruckmedikamente), nicht eigenständig absetzen oder in der Dosis verändern — nur nach ärztlicher Rücksprache."
- `monitoring`: „Kreatinin und eGFR im ärztlich festgelegten Intervall."
- `doctorDiscussion`: „„Sollte eine meiner Medikationen im Zusammenhang mit diesem Wert überprüft werden?""
- `notToConfuseWith`: null
- `safetyLevel`: `high`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus`

**LOW-1 — Muskelmasse und Ernährungsstatus als Kontext für die eGFR**
- `measureCategory`: `supporting`
- `evidenceMaturity`: `supported`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Bei geringer Muskelmasse werden niedrigere Kreatinin-Werte festgestellt — dies kann dazu führen, dass eine eingeschränkte Nierenfunktion durch die eGFR-Berechnung unterschätzt wird."
- `targetGroup`: „Personen mit erniedrigtem Kreatinin und geringer Muskelmasse (z. B. höheres Alter, längerer Krankenhausaufenthalt, Mangelernährung)"
- `whatCouldHelp`: „Besprich mit deiner Ärztin oder deinem Arzt, ob die eGFR-Berechnung in deinem Fall zuverlässig ist oder ob ergänzende Marker sinnvoll sind."
- `expectedBenefit`: „Vermeidung einer Fehleinschätzung der Nierenfunktion bei geringer Muskelmasse."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Ggf. ergänzende Marker wie Cystatin C (nur nach ärztlicher Einschätzung)."
- `doctorDiscussion`: „„Ist meine eGFR bei meiner Muskelmasse zuverlässig einschätzbar?""
- `notToConfuseWith`: null
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus` — direkt aus K3-Map-Eintrag `2160-0` low übernommen.

### 3.5 Gestrichene/verbotene Kartenideen

| Idee | Grund | risk_type | could_revisit_later | needed_before_revisit |
|---|---|---|---|---|
| „Diagnose Nierenerkrankung aus Kreatinin allein" | Diagnose-Framing, Pflicht-Nichtziel | diagnosis | no | — |
| Zweite Low-Karte „Ernährungstipps bei geringer Muskelmasse" | Zielzahl war nur 1 Karte für low; zweite Karte hätte low_utility-Charakter ohne klaren neuen Zweck | low_utility | no | — |

### 3.6 Safety-Prüfung (Kurzform)
Keine Diagnose, keine Dosierung, keine Grenzwerte. HIGH-3 grenzt Medikamenten-Eigenabsetzung explizit aus. `safetyLevel` konsistent mit Risikoprofil (höchste Stufe bei Medikamentenbezug).

### 3.7 Quellenbedarf
1 Karte `guideline`, 3 Karten `clinical_consensus` (alle direkt aus K3-Map-Text abgeleitet). Keine Karte `SOURCE_REQUIRED_BEFORE_CODE`.

### 3.8 Offene Punkte für ChatGPT/Sebastian
Keine offenen medizinischen Punkte. Eine redaktionelle Frage: Soll HIGH-1 und die künftige eGFR-Spec (Abschnitt 4) wechselseitig aufeinander verlinken (im Text „siehe eGFR-Seite")? Das ist bereits so formuliert — bei Umsetzung im Codex-Paket zu bestätigen, dass keine technische Verlinkung (nur Textverweis) gemeint ist, da Cross-Card-Links kein Bestandteil des bestehenden Schemas sind.

### 3.9 Umsetzungsnotizen für Codex
4 Karten (high: 3, low: 1). `2160-0` ist noch nicht in `laborwert_b4_actions_map.js` vorhanden.

---

## 4. eGFR — LOINC `62238-1`

### 4.1 Kurzprofil
eGFR schätzt die Nierenfilterleistung. Nur die niedrige Richtung ist klinisch relevant — high wird bewusst mit 0 Karten geführt (kein künstliches Befüllen).

### 4.2 High/Low-Logik
`high: []` (leeres Array, analog zum bestehenden Muster bei CRP `low: []` in der Live-Datei). Low: 3 Karten.

### 4.3 Geplante Kartenübersicht

| Richtung | # | Titel |
|---|---|---|
| high | — | keine Karten (bewusst leer) |
| low | 1 | Wiederholungsmessung und Verlauf |
| low | 2 | Kreatinin und Urin-Albumin gemeinsam betrachten lassen |
| low | 3 | Medikamente und Nierenbelastung nur ärztlich anpassen |

### 4.4 Kartendetail-Spezifikation

**LOW-1 — Wiederholungsmessung und Verlauf**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: Ein einzelner eGFR-Wert erlaubt keine verlässliche Einordnung — eine Wiederholungsmessung zeigt, ob es sich um eine vorübergehende oder anhaltende Veränderung handelt."
- `targetGroup`: „Alle Personen mit erniedrigter eGFR"
- `whatCouldHelp`: „Bitte um eine Wiederholungsmessung im ärztlich empfohlenen Abstand, um vorübergehende von anhaltenden Veränderungen zu unterscheiden."
- `expectedBenefit`: „Verlässlichere Einordnung, ob eine anhaltende Veränderung vorliegt."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Wiederholungsmessung im ärztlich festgelegten Abstand — nach Leitlinie sind für eine Einordnung als anhaltend in der Regel mehrere Messungen im Verlauf notwendig."
- `doctorDiscussion`: „„Wann sollte die eGFR erneut kontrolliert werden?""
- `notToConfuseWith`: „Dieser Hinweis beschreibt keine Krankheitsstadien — eine Stadieneinteilung erfolgt ausschließlich ärztlich."
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `guideline` — KDIGO 2024/NVL CKD, identisch zur K3-Map-Quelle `62238-1` low. Der Hinweis auf ein mehrfaches Messintervall ist eine Verfahrensangabe (keine Referenzwert-/Grenzwertnennung) und stammt direkt aus dem bereits lokal vorhandenen K3-Map-Cautiontext.

**LOW-2 — Kreatinin und Urin-Albumin gemeinsam betrachten lassen**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: Die eGFR sollte immer im Zusammenhang mit weiteren Befunden betrachtet werden, nicht isoliert."
- `targetGroup`: „Alle Personen mit erniedrigter eGFR"
- `whatCouldHelp`: „Frage nach Kreatinin und Urin-Albumin (Albumin-Kreatinin-Ratio), falls diese noch nicht bestimmt wurden."
- `expectedBenefit`: „Vollständigere Einordnung der Nierenfunktion."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Kreatinin, Urin-Albumin-Kreatinin-Ratio."
- `doctorDiscussion`: „„Sollte zusätzlich eine Urin-Untersuchung erfolgen?""
- `notToConfuseWith`: null
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `guideline` — identisch zu LOW-1.

**LOW-3 — Medikamente und Nierenbelastung nur ärztlich anpassen**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Manche Medikamente können die Nierenfunktion beeinflussen oder müssen bei eingeschränkter eGFR in der Dosierung angepasst werden — dies ist ausschließlich ärztlich zu beurteilen."
- `targetGroup`: „Personen mit erniedrigter eGFR, die regelmäßig Medikamente einnehmen"
- `whatCouldHelp`: „Liste alle aktuell eingenommenen Medikamente (inkl. rezeptfreier Schmerzmittel) auf und besprich sie mit deiner Ärztin oder deinem Arzt."
- `expectedBenefit`: „Vermeidung einer zusätzlichen Belastung der Nierenfunktion durch nicht angepasste Medikation."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: „Medikamente mit möglicher Nierenwirkung nicht eigenständig absetzen oder in der Dosierung verändern — nur nach ärztlicher Rücksprache."
- `monitoring`: „eGFR-Kontrolle bei Medikamentenanpassung im ärztlich festgelegten Intervall."
- `doctorDiscussion`: „„Muss eine meiner Medikationen wegen der eGFR angepasst werden?""
- `notToConfuseWith`: null
- `safetyLevel`: `high`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus`

### 4.5 Gestrichene/verbotene Kartenideen

| Idee | Grund | risk_type | could_revisit_later | needed_before_revisit |
|---|---|---|---|---|
| CKD-Stadien-Übersichtskarte (G1–G5) | Explizit verboten laut Pflichtthemen — Diagnose-/Stadien-Framing | diagnosis/threshold | no | — |
| „High"-Karte „Sehr gute Nierenfunktion" | Künstliches Befüllen der leeren High-Richtung, kein Nutzerzweck | low_utility | no | — |
| Diagnose „chronische Nierenerkrankung" als Karte | Explizit verboten laut Pflichtthemen | diagnosis | no | — |

### 4.6 Safety-Prüfung (Kurzform)
`high: []` korrekt leer belassen. Keine CKD-Stadien, keine Diagnose. Alle 3 Karten mit `requiresDoctorDiscussion: true`, LOW-3 mit `safetyLevel: high` wegen Medikamentenbezug.

### 4.7 Quellenbedarf
2 Karten `guideline`, 1 Karte `clinical_consensus`. Keine Karte `SOURCE_REQUIRED_BEFORE_CODE`.

### 4.8 Offene Punkte für ChatGPT/Sebastian
Keine offenen medizinischen Punkte.

### 4.9 Umsetzungsnotizen für Codex
3 Karten, alle `low`. `high: []` explizit im Code zu setzen (analog `low: []` bei CRP in der bestehenden Datei). `62238-1` ist noch nicht in `laborwert_b4_actions_map.js` vorhanden.

---

## 5. Glukose nüchtern — LOINC `2345-7`

### 5.1 Kurzprofil
Nüchternglukose ist stark messkontextabhängig (Nahrungskarenz). K3-Eintrag: high → gestörter Nüchternblutzucker/Prädiabetes, Diabetes, Stress/Medikamente; low → Hypoglykämie.

### 5.2 High/Low-Logik
High: 3 Karten (Messkontext, Verlaufskontext HbA1c, ärztliche Einordnung). Low: 2 Karten (Sicherheitskontext, Ursachenklärung bei Wiederholung).

### 5.3 Geplante Kartenübersicht

| Richtung | # | Titel |
|---|---|---|
| high | 1 | Nüchternstatus und Messkontext prüfen |
| high | 2 | HbA1c als Verlaufskontext einbeziehen |
| high | 3 | Wiederholungsmessung und ärztliche Einordnung |
| low | 1 | Sicherheitskontext bei niedrigen Werten |
| low | 2 | Ursache bei wiederholt niedrigen Werten klären lassen |

### 5.4 Kartendetail-Spezifikation

**HIGH-1 — Nüchternstatus und Messkontext prüfen**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Eine valide Nüchternglukose-Messung setzt eine ausreichende Nahrungskarenz voraus — akute Erkrankung, Stress oder bestimmte Medikamente können den Wert zusätzlich vorübergehend beeinflussen."
- `targetGroup`: „Alle Personen mit erhöhter Nüchternglukose"
- `whatCouldHelp`: „Prüfe und besprich mit deiner Ärztin oder deinem Arzt, ob die Messung unter Nüchternbedingungen erfolgte und ob eine akute Erkrankung, Stress oder Medikamente (z. B. Kortisonpräparate) den Wert beeinflusst haben könnten."
- `expectedBenefit`: „Einordnung, ob der Wert repräsentativ ist oder eine Wiederholung unter Standardbedingungen sinnvoll ist."
- `uncertaintyReason`: null
- `risksAndCautions`: „Eine unzureichende Nahrungskarenz vor der Messung ist eine häufige Ursache für einen einmalig auffälligen Wert."
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Wiederholungsmessung unter gesicherten Nüchternbedingungen."
- `doctorDiscussion`: „„Wurde die Messung unter Nüchternbedingungen durchgeführt?""
- `notToConfuseWith`: „Ein einzelner erhöhter Wert ist keine Diabetesdiagnose."
- `safetyLevel`: `low`
- `requiresDoctorDiscussion`: `false`
- `sourceRequirement`: `clinical_consensus` — direkt aus K3-Map-Eintrag `2345-7` high übernommen (Verfahrenshinweis, kein Grenzwert).

**HIGH-2 — HbA1c als Verlaufskontext einbeziehen**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: HbA1c spiegelt den Blutzuckerverlauf der letzten Monate wider und ergänzt den punktuellen Nüchternwert."
- `targetGroup`: „Alle Personen mit erhöhter Nüchternglukose, sofern noch kein aktueller HbA1c vorliegt"
- `whatCouldHelp`: „Bitte darum, dass HbA1c bestimmt oder — falls bereits vorhanden — gemeinsam mit dem Nüchternwert betrachtet wird."
- `expectedBenefit`: „Einordnung, ob es sich um eine einmalige Auffälligkeit oder einen länger bestehenden Trend handelt."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „HbA1c."
- `doctorDiscussion`: „„Was zeigt mein HbA1c im Vergleich zum Nüchternwert?""
- `notToConfuseWith`: null
- `safetyLevel`: `low`
- `requiresDoctorDiscussion`: `false`
- `sourceRequirement`: `guideline` — DDG/ADA, identisch zur bestehenden HbA1c-B4-Karte-Argumentation (LOINC `4548-4`).

**HIGH-3 — Wiederholungsmessung und ärztliche Einordnung**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: Eine einzelne Messung reicht laut Leitlinie nicht für eine Diagnosestellung — mehrere Messungen und die ärztliche Gesamtbeurteilung sind notwendig."
- `targetGroup`: „Alle Personen mit wiederholt oder deutlich erhöhter Nüchternglukose"
- `whatCouldHelp`: „Besprich mit deiner Ärztin oder deinem Arzt, ob eine Wiederholungsmessung oder weitere Diagnostik sinnvoll ist."
- `expectedBenefit`: „Verlässlichere Einordnung als durch eine Einzelmessung."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Wiederholungsmessung im ärztlich festgelegten Abstand."
- `doctorDiscussion`: „„Sind weitere Messungen oder Tests notwendig, um den Befund einzuordnen?""
- `notToConfuseWith`: „Diese Karte stellt keine Diabetesdiagnose dar — die Diagnosestellung liegt ausschließlich bei Ärztin oder Arzt."
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `guideline` — DDG/ADA, identisch zur K3-Map-Quelle `2345-7` high.

**LOW-1 — Sicherheitskontext bei niedrigen Werten**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Sehr niedrige Nüchternglukose-Werte können auf eine Unterzuckerung hinweisen, die abgeklärt werden sollte."
- `targetGroup`: „Personen mit erniedrigter Nüchternglukose"
- `whatCouldHelp`: „Melde deiner Ärztin oder deinem Arzt, wenn zusätzlich Symptome wie Zittern, Schweißausbruch, Schwindel oder Konzentrationsstörungen auftreten oder aufgetreten sind."
- `expectedBenefit`: „Schnellere Einordnung, ob eine zeitnahe Abklärung notwendig ist."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: „Symptome wie Zittern, Schweißausbruch, Schwindel oder Bewusstseinsstörungen sind ein Grund für zeitnahe ärztliche Abklärung."
- `monitoring`: null
- `doctorDiscussion`: „„Sollten meine Symptome zeitnah abgeklärt werden?""
- `notToConfuseWith`: null
- `safetyLevel`: `high`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus` — direkt aus K3-Map-Eintrag `2345-7` low übernommen; bewusst ohne detailliertes Notfallprotokoll formuliert.

**LOW-2 — Ursache bei wiederholt niedrigen Werten klären lassen**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Wiederholt niedrige Werte können verschiedene Ursachen haben — von einer bestehenden Diabetestherapie bis zu anderen Erkrankungen — und sollten ärztlich eingeordnet werden."
- `targetGroup`: „Personen mit wiederholt erniedrigter Nüchternglukose"
- `whatCouldHelp`: „Besprich mit deiner Ärztin oder deinem Arzt mögliche Ursachen, insbesondere falls du eine Diabetestherapie erhältst."
- `expectedBenefit`: „Einordnung der Ursache und ggf. Anpassung einer bestehenden Therapie."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: „Diabetes-Medikamente (insbesondere Insulin) nicht eigenständig absetzen oder in der Dosis verändern."
- `monitoring`: „Verlaufsmessungen der Nüchternglukose."
- `doctorDiscussion`: „„Sollte meine Therapie im Zusammenhang mit diesem Wert überprüft werden?""
- `notToConfuseWith`: null
- `safetyLevel`: `high`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `clinical_consensus`

### 5.5 Gestrichene/verbotene Kartenideen

| Idee | Grund | risk_type | could_revisit_later | needed_before_revisit |
|---|---|---|---|---|
| Diabetes-Diagnosekriterien-Karte mit Grenzwerten | Grenzwerte explizit nicht zulässig in diesem Paket | threshold | yes | S1-Arbeit/eigene Grenzwert-Freigabe |
| Konkrete Ernährungsvorschriften (z. B. Kohlenhydratmenge) | Explizit verboten laut Pflichtthemen | therapy | no | — |
| Notfallprotokoll bei Hypoglykämie mit Traubenzucker-Dosierung | Dosierung und Notfallanleitung explizit nicht zulässig | dosage | no | — |

### 5.6 Safety-Prüfung (Kurzform)
Keine Diabetesdiagnose aus Einzelwert, keine Ernährungsvorschriften, kein übertriebenes Notfallprotokoll — LOW-1 verweist auf ärztliche Abklärung statt konkreter Selbsthilfemaßnahmen. `safetyLevel high` bei beiden Low-Karten korrekt gesetzt.

### 5.7 Quellenbedarf
2 Karten `guideline`, 3 Karten `clinical_consensus`. Keine Karte `SOURCE_REQUIRED_BEFORE_CODE`.

### 5.8 Offene Punkte für ChatGPT/Sebastian
Keine offenen medizinischen Punkte.

### 5.9 Umsetzungsnotizen für Codex
5 Karten (high: 3, low: 2). `2345-7` ist noch nicht in `laborwert_b4_actions_map.js` vorhanden.

---

## 6. HDL-Cholesterin — LOINC `2085-9`

### 6.1 Kurzprofil
HDL nur im Kontext des vollständigen Lipidprofils sinnvoll interpretierbar. K3-Eintrag: low → kardiovaskuläres Risiko im Kontext, metabolisches Syndrom. High wird bewusst nicht befüllt.

### 6.2 High/Low-Logik
`high: []` (analog eGFR). Low: 3 Karten.

### 6.3 Geplante Kartenübersicht

| Richtung | # | Titel |
|---|---|---|
| high | — | keine Karten (bewusst leer) |
| low | 1 | Vollständiges Lipidprofil gemeinsam betrachten |
| low | 2 | Bewegung und Ernährung als allgemeiner Risikokontext |
| low | 3 | Metabolisches Syndrom als Kontext ärztlich einordnen lassen |

### 6.4 Kartendetail-Spezifikation

**LOW-1 — Vollständiges Lipidprofil gemeinsam betrachten**
- `measureCategory`: `standard`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: HDL allein ist kein ausreichender Risikoprädiktor — die Einordnung erfordert das vollständige Lipidprofil."
- `targetGroup`: „Alle Personen mit erniedrigtem HDL"
- `whatCouldHelp`: „Bitte darum, dass LDL, Triglyzeride und Gesamtcholesterin gemeinsam mit dem HDL-Wert betrachtet werden, falls dies noch nicht geschehen ist."
- `expectedBenefit`: „Vollständigere Einordnung des kardiovaskulären Risikoprofils."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „LDL, Triglyzeride, Gesamtcholesterin, Non-HDL-Cholesterin."
- `doctorDiscussion`: „„Wie ordnet sich mein HDL-Wert im Zusammenhang mit dem übrigen Lipidprofil ein?""
- `notToConfuseWith`: „Ein niedriges HDL allein ist keine Diagnose eines erhöhten Herz-Kreislauf-Risikos."
- `safetyLevel`: `low`
- `requiresDoctorDiscussion`: `false`
- `sourceRequirement`: `guideline` — ESC/EAS 2019/DGK, identisch zur K3-Map-Quelle `2085-9` low.

**LOW-2 — Bewegung und Ernährung als allgemeiner Risikokontext**
- `measureCategory`: `lifestyle`
- `evidenceMaturity`: `supported`
- `evidenceType`: `clinical_consensus`
- `whyShown`: „Gezeigt, weil: Körperliche Aktivität und Ernährungsmuster gehören zu den am besten belegten Einflussfaktoren auf das kardiovaskuläre Risikoprofil, zu dem HDL als ein Baustein gehört."
- `targetGroup`: „Personen mit erniedrigtem HDL, die ihr allgemeines kardiovaskuläres Risikoprofil verbessern möchten"
- `whatCouldHelp`: „Regelmäßige körperliche Aktivität und eine Ernährung mit einem höheren Anteil ungesättigter Fette können im Rahmen des allgemeinen Risikomanagements besprochen werden — mit Ärztin/Arzt oder Ernährungsberatung."
- `expectedBenefit`: „Kein isoliertes Versprechen zur direkten Anhebung des HDL-Werts — wirkt im Rahmen des allgemeinen kardiovaskulären Risikoprofils."
- `uncertaintyReason`: „Kein aktiver Leitlinienstandard, der eine gezielte ‚HDL-Anhebung' als eigenständiges Therapieziel empfiehlt — Lebensstilmaßnahmen wirken auf das Gesamtrisikoprofil, nicht spezifisch und gezielt auf HDL."
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Verlaufskontrolle des vollständigen Lipidprofils."
- `doctorDiscussion`: „„Welche Lebensstilaspekte sind in meinem Fall am relevantesten?""
- `notToConfuseWith`: „Nicht zu verwechseln mit einem gezielten ‚HDL-Therapieziel' — HDL wird nicht aktiv hochtherapiert, sondern im Rahmen des Gesamtrisikos betrachtet."
- `safetyLevel`: `low`
- `requiresDoctorDiscussion`: `false`
- `sourceRequirement`: `clinical_consensus` — bewusst ohne quantitative Effektangabe, da keine lokal verifizierte Meta-Analyse für HDL-spezifische Effektgrößen vorliegt (Unterschied zur bestehenden LDL-Ballaststoff-Karte, die eine konkrete, verifizierte Quelle zitiert).

**LOW-3 — Metabolisches Syndrom als Kontext ärztlich einordnen lassen**
- `measureCategory`: `doctor_discussion`
- `evidenceMaturity`: `established`
- `evidenceType`: `guideline`
- `whyShown`: „Gezeigt, weil: Niedriges HDL gehört zu den Kriterien des metabolischen Syndroms — zusammen mit erhöhten Triglyzeriden, Bauchumfang, Blutdruck und Nüchternblutzucker."
- `targetGroup`: „Personen mit erniedrigtem HDL und weiteren möglichen Risikofaktoren (Übergewicht, wenig Bewegung, erhöhter Blutdruck)"
- `whatCouldHelp`: „Besprich mit deiner Ärztin oder deinem Arzt, ob eine Betrachtung im Rahmen des metabolischen Syndroms sinnvoll ist — insbesondere wenn weitere Risikofaktoren bekannt sind."
- `expectedBenefit`: „Einordnung, ob mehrere Risikofaktoren zusammen vorliegen und gemeinsam angegangen werden sollten."
- `uncertaintyReason`: null
- `risksAndCautions`: null
- `contraindicationsOrRedFlags`: null
- `monitoring`: „Bauchumfang, Blutdruck, Nüchternblutzucker/HbA1c, Triglyzeride."
- `doctorDiscussion`: „„Liegen bei mir weitere Kriterien eines metabolischen Syndroms vor?""
- `notToConfuseWith`: „Ein niedriges HDL allein ist keine Diagnose eines metabolischen Syndroms — dafür müssen mehrere Kriterien gemeinsam erfüllt sein."
- `safetyLevel`: `medium`
- `requiresDoctorDiscussion`: `true`
- `sourceRequirement`: `guideline` — IDF/AHA-Kriterien, DDG, identisch zur K3-Map-Quelle `2085-9` low.

### 6.5 Gestrichene/verbotene Kartenideen

| Idee | Grund | risk_type | could_revisit_later | needed_before_revisit |
|---|---|---|---|---|
| Karte für „hohes HDL" | Explizit verboten laut Pflichtthemen — HDL-High ist medizinisch nicht als eigenständiges Handlungsfeld zu behandeln | not_applicable | no | — |
| Nikotinsäure-/Fibrat-Empfehlung zur „aktiven HDL-Erhöhung" | Explizit verbotenes Framing „HDL aktiv hochtherapieren"; zudem Therapieempfehlung | therapy | no | — |
| Quantifizierte HDL-Steigerung durch Bewegung (z. B. „+X mg/dl") | Keine lokal verifizierte Quelle für eine konkrete Effektgröße — Erfindungsrisiko | threshold/source | yes | Quelle (Meta-Analyse) verifizieren |

### 6.6 Safety-Prüfung (Kurzform)
Keine High-Karte (explizit gefordert), kein „HDL aktiv hochtherapieren"-Framing, keine Therapieempfehlung, keine erfundene Effektgröße (LOW-2 bewusst qualitativ statt quantitativ). Alle Karten kontextualisieren HDL im Gesamtlipidprofil statt isolierter Interpretation.

### 6.7 Quellenbedarf
2 Karten `guideline`, 1 Karte `clinical_consensus`. Keine Karte `SOURCE_REQUIRED_BEFORE_CODE`.

### 6.8 Offene Punkte für ChatGPT/Sebastian
Keine offenen medizinischen Punkte.

### 6.9 Umsetzungsnotizen für Codex
3 Karten, alle `low`. `high: []` explizit zu setzen. `2085-9` ist noch nicht in `laborwert_b4_actions_map.js` vorhanden.

---

## Gesamtzusammenfassung

| Laborwert | LOINC | high | low | total |
|---|---|---|---|---|
| Hämoglobin | `718-7` | 2 | 3 | 5 |
| TSH | `3016-3` | 3 | 3 | 6 |
| Kreatinin | `2160-0` | 3 | 1 | 4 |
| eGFR | `62238-1` | 0 | 3 | 3 |
| Glukose nüchtern | `2345-7` | 3 | 2 | 5 |
| HDL-Cholesterin | `2085-9` | 0 | 3 | 3 |
| **Summe** | | **11** | **15** | **26** |
