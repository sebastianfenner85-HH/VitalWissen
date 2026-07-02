# B4-BUILD-04-SPEC-WAVE1 — MedQA-Bericht

Kein `PASS_WITH_WARNINGS` verwendet — je Laborwert eine eindeutige Entscheidung: **PASS** (medizinisch tragfähig) oder Karte geändert/gestrichen. Alle 26 finalen Karten haben die 12-Fragen-Prüfung unverändert bestanden.

## Hämoglobin (`718-7`)
- Diagnose-Risiko: keine Karte suggeriert eine Diagnose. LOW-2 grenzt sich explizit gegen eine GI-Blutungsdiagnose ab (`notToConfuseWith`).
- Therapie-Risiko: keine Therapieempfehlung, nur Gesprächspunkte.
- Grenzwert-/Zielwert-Risiko: keine Zahlenwerte in den Karten.
- Dosierungsrisiko: keine Dosierung (Eisensupplementierungs-Idee gestrichen).
- Funktionell/HP-Vermischungsrisiko: nicht vorhanden.
- Red-Flag-Sprache: LOW-2 konkret, aber nicht alarmistisch — kein Notfall-Handlungsprotokoll.
- `requiresDoctorDiscussion`-Plausibilität: plausibel (true bei allen Karten außer den 2 reinen Monitoring-Karten).
- Gestrichene Karten: 3 (siehe Dropped-Cards-Report).
- Karten mit `SOURCE_REQUIRED_BEFORE_CODE`: 0.
- **Finale MedQA-Entscheidung: PASS**

## TSH (`3016-3`)
- Diagnose-Risiko: Hashimoto/Basedow explizit ausgeschlossen (`notToConfuseWith` in H1/L1).
- Therapie-Risiko: keine Levothyroxin-Dosierung; L3 verweist nur auf ärztliches Gespräch.
- Grenzwert-/Zielwert-Risiko: keine Zahlenwerte.
- Dosierungsrisiko: keine Dosierung, auch kein festes Biotin-Pause-Zeitfenster (bewusst offengelassen, siehe offener Punkt in Hauptspec).
- Funktionell/HP-Vermischungsrisiko: nicht vorhanden.
- Red-Flag-Sprache: angemessen (Medikamenten-Eigenabsetzung explizit ausgeschlossen in L3).
- `requiresDoctorDiscussion`-Plausibilität: plausibel.
- Gestrichene Karten: 3.
- Karten mit `SOURCE_REQUIRED_BEFORE_CODE`: 0.
- **Finale MedQA-Entscheidung: PASS**

## Kreatinin (`2160-0`)
- Diagnose-Risiko: keine Nierenkrankheitsdiagnose aus Einzelwert.
- Therapie-Risiko: keine Therapieempfehlung.
- Grenzwert-/Zielwert-Risiko: keine Zahlenwerte.
- Dosierungsrisiko: keine.
- Funktionell/HP-Vermischungsrisiko: nicht vorhanden.
- Red-Flag-Sprache: HIGH-3 verhältnismäßig (Medikamenten-Eigenabsetzung ausgeschlossen, kein Alarmismus).
- `requiresDoctorDiscussion`-Plausibilität: plausibel (asymmetrisch high/low korrekt begründet).
- Gestrichene Karten: 2.
- Karten mit `SOURCE_REQUIRED_BEFORE_CODE`: 0.
- **Finale MedQA-Entscheidung: PASS**

## eGFR (`62238-1`)
- Diagnose-Risiko: keine CKD-Stadien, keine CKD-Diagnose (explizit geprüft und ausgeschlossen).
- Therapie-Risiko: keine.
- Grenzwert-/Zielwert-Risiko: keine Zahlenwerte; Wiederholungsintervall-Hinweis als Verfahrensangabe klassifiziert, nicht als Grenzwert.
- Dosierungsrisiko: keine (Medikamenten-Eigenabsetzung in LOW-3 ausdrücklich ausgeschlossen).
- Funktionell/HP-Vermischungsrisiko: nicht vorhanden.
- Red-Flag-Sprache: angemessen.
- `requiresDoctorDiscussion`-Plausibilität: plausibel, `high: []` korrekt leer (kein künstliches Befüllen).
- Gestrichene Karten: 3 (davon 1 explizit „kein künstliches High-Befüllen").
- Karten mit `SOURCE_REQUIRED_BEFORE_CODE`: 0.
- **Finale MedQA-Entscheidung: PASS**

## Glukose nüchtern (`2345-7`)
- Diagnose-Risiko: keine Diabetesdiagnose aus Einzelwert (explizit in HIGH-3 `notToConfuseWith` ausgeschlossen).
- Therapie-Risiko: keine konkreten Ernährungsvorschriften (Pflicht-Nichtziel eingehalten).
- Grenzwert-/Zielwert-Risiko: keine Zahlenwerte — Diabetes-Grenzwerte aus K3-Map bewusst nicht übernommen.
- Dosierungsrisiko: keine (Notfallprotokoll mit Traubenzucker-Dosierung explizit gestrichen).
- Funktionell/HP-Vermischungsrisiko: nicht vorhanden.
- Red-Flag-Sprache: LOW-1 als Sicherheitshinweis formuliert, kein übertriebenes Notfallprotokoll — erfüllt Pflichtvorgabe „keine Notfallanleitung übertreiben".
- `requiresDoctorDiscussion`-Plausibilität: plausibel, beide Low-Karten korrekt `high` safetyLevel.
- Gestrichene Karten: 3.
- Karten mit `SOURCE_REQUIRED_BEFORE_CODE`: 0.
- **Finale MedQA-Entscheidung: PASS**

## HDL-Cholesterin (`2085-9`)
- Diagnose-Risiko: kein metabolisches Syndrom aus Einzelwert diagnostiziert (LOW-3 `notToConfuseWith`).
- Therapie-Risiko: kein „HDL aktiv hochtherapieren"-Framing (explizit geprüft und vermieden), keine Nikotinsäure-/Fibrat-Empfehlung.
- Grenzwert-/Zielwert-Risiko: keine Zahlenwerte, keine erfundene Effektgröße (LOW-2 bewusst qualitativ).
- Dosierungsrisiko: keine.
- Funktionell/HP-Vermischungsrisiko: nicht vorhanden.
- Red-Flag-Sprache: nicht erforderlich (kein akutes Risiko bei niedrigem HDL als Einzelwert).
- `requiresDoctorDiscussion`-Plausibilität: plausibel, `high: []` korrekt leer.
- Gestrichene Karten: 3.
- Karten mit `SOURCE_REQUIRED_BEFORE_CODE`: 0.
- **Finale MedQA-Entscheidung: PASS**

## Gesamtverdikt MedQA
**PASS** für alle 6 Laborwerte / 26 Karten. Keine Karte erfordert Überarbeitung, keine Karte wurde als `NOT_CODE_READY` eingestuft. 0 Karten mit `SOURCE_REQUIRED_BEFORE_CODE`.
