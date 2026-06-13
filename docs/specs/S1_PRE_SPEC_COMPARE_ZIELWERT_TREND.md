# S1 PRE-SPEC — Compare / Zielwert / Trend

**Paketname:** S1-PRE-SPEC — Vergleich, Zielwert-Logik, Verlaufsorientierung
**Typ:** Pre-Spec (read-only) — Kein Build. Kein DB-Write. Kein Commit. Kein Push. Kein Deploy.
**Datum:** 24.04.2026
**Status:** ✅ Pre-Spec abgeschlossen
**Führende Quellen:** P7D_ARCHITECTURE_RESET_FREEZE.md · VW_03_STATUS.md · VW_04_ENTSCHEIDUNGEN.md · VW_05_SAEULEN.md · Q2_TRUST_SOURCE_PRE_SPEC.md · S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md · AUDIT_CANON_CURRENT.md · ACTIVE_STRANDS_CURRENT.md · CLAUDE.md
**Direktverifiziert:** LaborwertDetail.jsx · queries.js (src/lib/) · 00_REPO/vitalwissen_repo_current

---

## P7D-EINORDNUNG

| Dimension | Einordnung |
|-----------|-----------|
| **Externer Produktbereich** | B2 — Verstehen / Einordnen (primär) |
| **Kernobjekt** | K3 — Laborwert |
| **Späterer Anschluss** | B4 — Nächste Schritte (über S8-BUILD-02) |
| **Interne Säule** | S1 — Laborwert-Lexikon |
| **Q2 Trust-Layer** | Quellenbox S1 = nächster Scope von Q2-BUILD-02b |
| **Q3 Visual-Layer** | Scanbare Blöcke, kein Fließtext, ikonische Anker |
| **Q6 Mobile-first** | Bindend — alle neuen Blöcke mobile-first, Tap-Targets ≥ 40px |
| **Q10 i18n-fähig** | Neue Felder i18n-fähig anlegen (Schlüssel, keine hartkodierten deutschen Labels) |
| **Kein S9-/Hub-Build** | NEIN — kein persönlicher Datenspeicher, kein Tracking |
| **Kein Newsroom / Watchlist** | NEIN — nicht Gegenstand dieser Spec |

---

## A — AUDIT-TABELLE

### A1. Ist-Stand S1 (direkt verifiziert)

| Bereich | Befund | Konsequenz |
|---------|--------|------------|
| **3-Länder-Vergleich** | ✅ vorhanden — DE/USA/JP Grid, DGKL/AACC/JSCC, geschlechtsspezifisch DE. Quellenname inline. | Basis solide. Quellenkontext fehlt (URL, Jahr, Warum-Text). |
| **Geschlechtsspezifische Referenz** | ✅ teilweise — DE (♂/♀ getrennt wenn verschieden). USA/JP-Felder vorhanden, aber nicht geschlechtsspezifisch differenziert. | Erweiterung USA/JP-Geschlecht technisch nötig wenn Daten verfügbar. |
| **Quellenbox Q2** | ❌ nicht vorhanden — Quellenname nur als String, kein URL, kein Jahr, kein "Warum?"-Text | Q2-BUILD-02b-Pflicht: S1 erhält standardisierte QuellenBox-Komponente |
| **Zielwerte** | ❌ nicht vorhanden — kein Konzept, kein DB-Feld | Größtes Mehrwert-Delta: ohne Zielwert-Logik bleibt S1 bei "normal/erhöht/erniedrigt" |
| **Altersabhängige Referenz** | ❌ nicht vorhanden — `referenz_kinder JSONB` in VW_05-Schema geplant, nicht in DB/Frontend | Nächster Build-Step nach dieser Spec |
| **Schwangerschafts-Referenz** | ❌ nicht vorhanden — kein Feld, kein UI-Element | Klinisch sehr relevant (TSH, Hb, HbA1c, Thrombozyten) |
| **Verlaufs-/Monitoring-Logik** | ❌ nicht vorhanden — kein `monitoring_intervall`, kein Normalisierungszeitraum, kein Verlaufskontext | Nötig für B4-Anschluss (S8-BUILD-02 K3) |
| **Quellenkonflikt-Anzeige** | ❌ nicht vorhanden — Abweichung DE/USA/JP nur als Zahlen sichtbar, kein Erklärungstext | `quellen_konflikt`-Logik (Q2-Spec §B4) für S1 relevant |
| **`letzte_aktualisierung`** | ❌ nicht sichtbar in UI — Feld in VW_05-Schema erwähnt, nicht direkt verifiziert in DB | Q2-BUILD-02b-Pflicht: Aktualitätsdatum zeigen |
| **Notfall-Flag** | ✅ vorhanden — roter Banner | Halten, für B4-Anschluss bereits nutzbar |
| **Wann zum Arzt** | ✅ vorhanden — Freitext | Halten, ist Stufe-1-Trigger für S8-BUILD-02 |
| **Supplement-/Medikamenten-Einfluss** | ✅ vorhanden — Chips | Halten. Crosslinks zu S2/S6 bereits live. |

### A2. Vergleichsebenen-Entscheidung

4 Vergleichsebenen — begründet, nicht blind übernommen:

| Ebene | Name | Vorhanden | Entscheidung |
|-------|------|-----------|--------------|
| **V1** | Referenzbereich (allgemein) | ✅ | Halten + Quellenkontext ergänzen |
| **V2** | Kontextbereich (Geschlecht/Alter/Schwangerschaft) | Teilweise | Ausbau: Alter + Schwangerschaft als neue Felder |
| **V3** | Zielwert | ❌ | Neu spezifizieren — größter Mehrwert-Schritt |
| **V4** | Verlaufsorientierung | ❌ | Neu spezifizieren — Orientierungswissen ohne Tracking |

Abgelehnt: "Optimaler Wert"-Konzept (keine klinische Basis, erzeugt Scheingenauigkeit).

### A3. Zielwert-Logik

**Referenzbereich ≠ Zielwert — Trennung ist nicht selbsterklärend, muss im UI sichtbar sein.**

| Begriff | Definition | Herkunft |
|---------|-----------|---------|
| **Referenzbereich** | Statistisch: wo liegen 95% der gesunden Allgemeinbevölkerung | Epidemiologische Querschnittstudie |
| **Zielwert** | Therapeutisch/präventiv: wo soll der Wert hin unter bestimmten Bedingungen | Klinische Leitlinie + Outcome-Studien |

Zielwerte sind fast immer kontextgebunden — sie existieren nicht für die "Allgemeinbevölkerung ohne Kontext". Jeder Zielwert braucht ein Pflicht-Kontextfeld.

4 Zielwert-Typen (bindend):

| Typ | Definition | Beispiel | Max. Ausspiel-Stufe UI |
|-----|-----------|---------|------------------------|
| **ZT1 — Primärpräventiv** | Für gesunde Personen zur Risikoreduktion | LDL-C < 116 mg/dl (ESC, primärpräventiv, Normalrisiko) | Aufklappbar |
| **ZT2 — Krankheitsspezifisch** | Bei bekannter Diagnose laut nationaler Leitlinie | HbA1c < 7,0% bei Diabetes Typ 2 (DDG-Leitlinie) | Aufklappbar, Diagnose-Pflichtfeld |
| **ZT3 — Risikogruppenspezifisch** | Für definierte Risikopopulation ohne Diagnose | LDL-C < 55 mg/dl bei sehr hohem CV-Risiko (ESC/EAS) | Nur nach Intent ("Zielwerte für Risikogruppen anzeigen") |
| **ZT4 — Therapiemonitoring** | Direktes Therapieziel, dosierungsrelevant | INR 2,0–3,0 unter Antikoagulation | Nur nach Intent, explizit "nur im Arztkontext" |

### A4. Verlaufslogik

**Was ohne S9/Datenspeicher möglich ist:**

| Verlaufselement | Möglich ohne S9 | Format |
|-----------------|-----------------|--------|
| Typischer Normalisierungszeitraum nach Maßnahme | ✅ | Leitlinienbasiert, generisch. Z.B. "HbA1c: typische Absenkung nach 3 Monaten sichtbar" |
| Monitoring-Intervall (wie oft messen) | ✅ | Leitlinienbasiert. Z.B. "HbA1c: vierteljährliche Kontrolle bei Diabetes mellitus Typ 2" |
| Woran man Verbesserung erkennt | ✅ | Messbare Parameter benennen, kein Diagnose-Bezug |
| Grafische Verlaufsdarstellung aus eigenen Werten | ❌ | Erfordert S9 (Phase D) |
| Individuelle Trendaussage | ❌ | Absolutes No-Go ohne Datenbasis |

### A5. Q2 Trust-Anschluss

| Q2-Anforderung | S1-Ist | Handlungsbedarf |
|---------------|--------|-----------------|
| Quellentyp sichtbar | ❌ — nur Name | Q2-BUILD-02b: Typ-Chips für DGKL (database), AACC (database), JSCC (database) |
| URL verlinkbar | ❌ | DB-Feld `ref_de_quelle_url` etc. nötig |
| Jahr der Quelle | ❌ | DB-Feld `ref_de_quelle_jahr` etc. nötig |
| "Warum diese Quelle?" | ❌ | Kurzer Erklärungstext im DB-Feld |
| Aktualitätsdatum | ❌ | `letzte_aktualisierung` sichtbar machen |
| Quellenkonflikt-Hinweis | ❌ | `quellen_konflikt` JSONB — wenn DE/USA/JP abweichen |

Quellentyp für Referenzbereichs-Quellen: `database` (LOINC, DGKL, AACC, JSCC sind strukturierte Datenbasen/Standards) — nicht `guideline` (Leitlinie ist klinische Behandlungsempfehlung, Referenzbereich ist epidemiologische Datenbasis).

Quellentyp für Zielwerte: `guideline` (ESC, DGK, DDG, AWMF — Behandlungsleitlinien).

### A6. S8-Anschluss

| S8-BUILD-02 Bedarf | S1-Vorarbeit |
|-------------------|-------------|
| Wann-Arzt-Trigger (Stufe 1 K3) | ✅ vorhanden via `notfall_flag` + `wann_arzt` |
| Monitoring-Plan (Stufe 2 K3) | ⚠ nötig: `monitoring_intervall`-Feld in S1-DB |
| Mögliche Einflussfaktoren (Stufe 2 K3) | ✅ teilweise via `ursachen_hoch/niedrig` + `supplement_einfluss` |
| Verweis auf S5 für relevante Diagnosen | ✅ Crosslinks S5↔S1 vorhanden |
| Verweis auf S2/S6 | ✅ Chips vorhanden |

**Grenzlinie B2 vs. B4:**
- S1 (B2): Referenzbereich erklären, Zielwert erläutern, Verlauf orientieren, Kontext zeigen
- S8/B4 (B4): "Was tun wenn mein Wert abweicht?" — Monitoring-Plan, Arzt-Hinweis, Gesprächsvorbereitung

S1 darf nicht in B4 kippen. Der B4-Block auf der Laborwert-Seite kommt mit S8-BUILD-02 — ist ein separater Block, nicht Teil der Referenz-/Zielwert-Logik.

---

## B — KERNENTSCHEIDUNGEN

### B1. Vergleichsmodell (bindend)

**Entscheidung: 4-Ebenen-Modell**

Begründung: Ein 1-dimensionales Referenzbereich-Modell ist bei vielen klinisch wichtigen Laborwerten medizinisch unzureichend. Das 4-Ebenen-Modell schöpft den Mehrwert von S1 vollständig aus ohne in Übergriffigkeit oder Scheingenauigkeit zu kippen.

| Ebene | Name | Ausspiel | Datenbasis |
|-------|------|---------|------------|
| **V1** | Referenzbereich (3 Leitlinien + Geschlecht) | Sofort | Vorhanden, Quellenkontext ergänzen |
| **V2** | Kontextbereich (Alter, Schwangerschaft) | Aufklappbar wenn Daten vorhanden | Neue Felder nötig |
| **V3** | Zielwert (ZT1–ZT4) | Aufklappbar / nach Intent je Typ | Neue Felder nötig |
| **V4** | Verlaufsorientierung (Monitoring, Normalisierung) | Aufklappbar | Neue Felder nötig |

### B2. Zielwert-Typen (bindend)

4 Typen, strikt getrennt (§A3). Kein ZT ohne Kontextpflichtfeld. Kein "allgemeiner optimaler Zielwert".

### B3. Kontextlogik (bindend)

| Kontext | Phase | Begründung |
|---------|-------|-----------|
| Geschlecht | JETZT (Ausbau USA/JP) | Klinisch unerlässlich, DE bereits vorhanden |
| Alter (Kinder) | Nächster Build-Step | `referenz_kinder JSONB` in Spec geplant, Daten fehlen |
| Schwangerschaft | Nächster Build-Step | TSH, Hb, HbA1c eigene Referenzbereiche |
| Therapie-/Erkrankungskontext | = Zielwert-Logik (B2) — kein eigenes Kontextfeld | Trennung halten |
| Zyklusabhängigkeit | Phase C | Komplexe Datenbasis, nicht Phase-B-reif |

### B4. Trendlogik (bindend)

Erlaubt: generische Verlaufsorientierung mit Quellenangabe, Monitoring-Intervall, Normalisierungszeitraum.
Verboten: individuelle Trendaussagen, Bewertung eigener Werte, Prognosen.
Kein Datenspeicher. Kein S9-Ersatz.

### B5. UI-Logik (bindend)

| Element | Sichtbarkeit | Mobile-Pflicht |
|---------|-------------|----------------|
| V1 Referenz 3 Länder | Sofort | 1-Spalten-Stack unter 640px |
| Geschlechts-Toggle | Sofort wenn relevant | Tap ≥ 40px |
| V2 Alters-/Schwangerschafts-Kontext | Aufklappbar, Akkordeon | Tap ≥ 40px |
| V3 Zielwert (ZT1/ZT2) | Aufklappbar, klar beschriftet | Tap ≥ 40px |
| V3 Zielwert (ZT3/ZT4) | Nur nach Intent-Klick | Button prominent, kein versteckter Link |
| V4 Verlauf/Monitoring | Aufklappbar | Tap ≥ 40px |
| Quellenbox | Sofort (max. 2 Chips) | Q2-Standard |
| Quellenkonflikt | Inline wenn vorhanden | Informativ, kein Alarm |

**Produktform-Prüfung (alle 6 Fragen):**
1. Als Website sauber? ✅ — aufklappbare Akkordeons, keine Datenspeicherung
2. Mobil sauber? ✅ — 1-Spalten-Stack, Tap-Targets, keine Hover-Logik
3. Verbaut spätere native App? ❌ — mobile-first ist App-kompatibel
4. Desktop-first-Logik? ❌ — alle Blöcke funktionieren auf 375px
5. Website-only-Logik? ❌ — keine Desktop-spezifischen Interaktionen
6. Paket eng genug? ✅ — kein S9, kein Tracking, kein Diagnose-Tool

---

## C — VOLLSTÄNDIGE PRE-SPEC

### C1. Zweck des S1-Compare-Moduls

**Was das Modul leisten soll:**

S1 soll vom Nachschlagewerk für Normalbereiche zu einem echten Einordnungs-Werkzeug werden. Das bedeutet:

1. **Referenz verstehen**: Woher kommt dieser Bereich? Für wen gilt er? Welche Leitlinie?
2. **Zielwert kennen**: Was ist das Ziel — nicht nur die statistische Norm? Für welchen Kontext?
3. **Verlauf einordnen**: Was bedeutet es, wenn ein Wert "sich verbessert"? Wie schnell? Wie oft messen?
4. **Kontext sehen**: Macht Alter/Geschlecht/Schwangerschaft einen Unterschied bei diesem Wert?

**Was das Modul nicht leisten soll:**

- Diagnose aus Einzelwert ableiten
- Individuellen Verlauf speichern oder bewerten
- Therapieempfehlung aussprechen
- Aussagen über individuelle Verträglichkeit
- Zielwert als "den richtigen Wert für dich" präsentieren ohne Kontext

---

### C2. Abgrenzung

| Abgrenzung | S1-Compare-Modul | Anderer Bereich |
|-----------|-----------------|----------------|
| **vs. S8/B4** | S1 erklärt und ordnet ein (B2). Gibt kein "Was tun?" aus | B4 navigiert Handlungsoptionen (S8-BUILD-02, eigenständige Spec) |
| **vs. S9/Health Hub** | Kein persönlicher Datenspeicher, kein Verlauf aus eigenen Werten | S9 (Phase D) für persönliche Daten |
| **vs. Diagnose-Tool** | Keine Diagnoseaussage auf Basis eines Laborwerts — absolutes No-Go | Permanentes No-Go |
| **vs. Therapie-Empfehlung** | Zielwerte erklären, nicht empfehlen | Permanentes No-Go |
| **vs. S5** | S1 erklärt den Laborwert, S5 erklärt die Krankheit | Cross-Block bleibt: "Erkrankungen, bei denen dieser Wert relevant ist" |

---

### C3. Vergleichsebenen

#### V1 — Referenzbereich (Sofort sichtbar)

**Definition:** Statistisch ermittelter Bereich, in dem ca. 95% der gesunden Allgemeinbevölkerung liegen (±2 Standardabweichungen in einer normverteilten Grundgesamtheit).

**Inhalt:**
- Wert-Range (min–max) mit Einheit
- Quellenname + Quellentyp-Chip (`database` — DGKL/AACC/JSCC)
- Verlinkbare URL zur Quellinstitution
- Leitlinien-Jahr
- Geschlechtsspezifische Aufschlüsselung wo relevant (♂/♀)
- Kurzer "Warum diese Quelle?"-Text (1 Satz)

**Aufbau DE/USA/JP (bestehend, Quellenkontext ergänzen):**
- DE: DGKL (Deutsche Gesellschaft für Klinische Chemie und Laboratoriumsmedizin)
- USA: AACC (American Association for Clinical Chemistry)
- JP: JSCC (Japan Society of Clinical Chemistry) — noch nicht vollständig befüllt (VW_03 §S1)

**Quellenkonflikt-Anzeige (neu):**
Wenn DE-Referenz und USA-/JP-Referenz um mehr als 20% des Mittelwerts abweichen → informativer Hinweis: "Hinweis: Deutsche und internationale Referenzlabore setzen unterschiedliche Grenzen — [kurze Erklärung warum]." Kein Alarm, keine Negativkonnotation.

#### V2 — Kontextbereich (Aufklappbar)

**Definition:** Referenzbereiche, die für spezifische Populationsgruppen gelten und vom allgemeinen Referenzbereich abweichen.

**Teilbereich V2a — Alter:**
- Kinder-/Jugendlichenwerte (JSONB-Struktur: Altersklassen + Min/Max)
- Ältere Menschen (≥ 65 Jahre) wenn klinisch relevant
- Quelle: Leitlinie + Jahr (Pflicht)
- UI: Alters-Toggle oder Dropdown (mobile-first)

**Teilbereich V2b — Schwangerschaft:**
- 1. / 2. / 3. Trimester wenn klinisch relevant (TSH, Hb, Thrombozyten, HbA1c, Ferritin)
- Quelle: DGGG/AWMF-Leitlinie Mutterschaftsrichtlinien oder äquivalent
- UI: Schwangerschaft-Toggle (klar beschriftet, kein automatisches Einblenden)

**Nicht in V2:**
- Erkrankungs- oder Therapiekontext → das ist V3 (Zielwert)
- Zyklusphase → Phase C

#### V3 — Zielwert (Aufklappbar / nach Intent)

**Einleitung (Pflicht im UI):**
*„Referenzbereiche zeigen, wo die meisten gesunden Menschen liegen. Zielwerte zeigen, wo ein Wert hin soll — je nach Erkrankung, Risikoprofil oder Therapieziel. Zielwerte gelten nie allgemein, sondern immer für einen bestimmten Kontext."*

**4 Zielwert-Typen (§A3):**

| Typ | UI-Label | Ausspiel-Stufe | Pflichtfelder |
|-----|---------|----------------|---------------|
| ZT1 Primärpräventiv | „Empfehlung ohne Vorerkrankung" | Aufklappbar | Quelle + Jahr + Zielgruppe |
| ZT2 Krankheitsspezifisch | „Ziel bei [Diagnose-Name]" | Aufklappbar | Diagnose-ICD + Quelle + Jahr |
| ZT3 Risikogruppenspezifisch | „Ziel bei [Risikogruppe]" | Nur nach Intent | Risikogruppe definiert + Quelle + Jahr |
| ZT4 Therapiemonitoring | „Ziel unter [Therapiename]" | Nur nach Intent + Disclaimer | Therapiekontext + Quelle + Pflicht-Caveat |

**Pflicht-Caveat für alle Zielwerte:**
*„Zielwerte werden individuell mit deinem Arzt festgelegt. Dieser Wert gilt für den genannten Kontext — er ist keine persönliche Empfehlung."*

**Caveat-Varianten:**
- ZT1: „Gilt für den primärpräventiven Kontext ohne bekannte Vorerkrankung."
- ZT2: „Gilt bei [Diagnose] laut [Leitlinie, Jahr]. Dein Arzt kann abweichende Ziele festlegen."
- ZT3: „Gilt für Menschen mit [Risikogruppe]. Rücksprache mit Arzt erforderlich."
- ZT4: „Gilt nur unter aktiver [Therapie]. Selbst keine Dosisänderung vornehmen."

#### V4 — Verlaufsorientierung (Aufklappbar)

**Definition:** Allgemeines Orientierungswissen über typische Verlaufsmuster — kein individueller Tracker, kein S9-Ersatz.

**Inhalt:**

| Element | Beschreibung | Quelle-Pflicht |
|---------|-------------|----------------|
| **Monitoring-Intervall** | Wie oft wird dieser Wert typischerweise kontrolliert? (z.B. "HbA1c: vierteljährlich bei Diabetes") | Leitlinie + Jahr |
| **Normalisierungszeitraum** | Wie schnell reagiert dieser Wert auf Maßnahmen? (z.B. "Ferritin: nach Eisensubstitution sichtbar nach 4–8 Wochen") | Leitlinie oder PubMed (PMID-Pflicht) |
| **Woran Verbesserung erkennbar** | Welche messbaren Parameter zeigen eine positive Veränderung? (objektiv — kein Wohlbefinden-Proxy) | Aus Leitlinie oder verifizierten Reviews |
| **Wann erneut messen** | Empfohlener Zeitpunkt für Kontrollmessung nach Therapiebeginn | Leitlinie + Jahr |

**Verboten in V4:**
- "Dein Wert verbessert sich" — individuelle Aussage
- "Nach [X Wochen] bist du wieder normal" — Versprechen
- Prognosen auf Basis des aktuellen Werts

**UI-Hinweis (Pflicht):**
*„Diese Angaben gelten als allgemeiner Orientierungsrahmen. Dein individueller Verlauf wird von deinem Arzt eingeordnet."*

---

### C4. Zielwert-Logik (vollständig)

**Warum Zielwert ≠ Referenzbereich:**

Das ist nicht selbsterklärend und muss im UI sichtbar sein. Ein Nutzer mit erhöhtem LDL-C könnte:
- Im Referenzbereich liegen (statistisch normal)
- Trotzdem weit vom Zielwert entfernt sein (bei hohem CV-Risiko: LDL < 55 mg/dl)

Die Nicht-Erklärung dieser Differenz ist das größte Defizit von S1 im Ist-Stand.

**Pflichtstruktur je Zielwert-Eintrag:**

```
zielwert_typ:           ZT1 / ZT2 / ZT3 / ZT4
zielwert_label:         Kurzname für UI ("Ziel bei Diabetes Typ 2")
zielwert_min:           Numerisch (optional)
zielwert_max:           Numerisch (optional)
zielwert_einheit:       Einheit (String)
zielwert_richtung:      "< X" / "> X" / "X–Y" / "< X und > Y"
zielwert_kontext:       Kontext-Freitext (Pflicht, 1–2 Sätze)
zielwert_diagnose_icd:  ICD-Code (Pflicht für ZT2)
zielwert_quelle:        Quellentyp + Name + URL + Jahr
zielwert_caveat:        Pflicht-Caveat-Text
```

**Datenstruktur-Empfehlung:** JSONB-Array `zielwerte` auf der `laborwerte`-Tabelle (mehrere Zielwerte je Wert möglich — z.B. LDL hat ZT1 + ZT2 + ZT3).

---

### C5. Trend-/Verlaufslogik (vollständig)

**Was spezifiziert werden muss — jetzt:**

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `monitoring_intervall` | JSONB / Text | Wie oft kontrollieren — je Kontext (z.B. gesund vs. bei Therapie) |
| `normalisierungszeitraum` | JSONB / Text | Wann nach Maßnahme messbar — mit Quellenangabe |
| `verlauf_kontext` | Text (optional) | Allgemeiner Verlaufskontext (z.B. "TSH schwankt saisonal") |
| `monitoring_laborwerte` | Array / JSONB | Welche anderen Laborwerte sollen parallel kontrolliert werden? |

**Was für S9/Phase D bleibt:**
- Individuelle Verlaufskurve aus eigenen Messwerten
- Automatische Trend-Erkennung
- Push-Benachrichtigungen bei Verschlechterung
- Persistente Werte-Speicherung

**B4-Brücken-Feld (wichtig für S8-BUILD-02):**

```
b4_monitoring_plan:   JSONB — welche Werte wann — direkt kompatibel mit B4-F6-Feld aus S8-Pre-Spec
b4_wann_arzt_trigger: Text — ergänzt `wann_arzt` mit Trendbezug ("nach 3 Messungen unter Therapie noch erhöht")
```

---

### C6. Kontextlogik

**Altersabhängige Referenzbereiche:**

```
referenz_kinder: JSONB-Array [
  { alter_von: 0, alter_bis: 12, einheit: "Monate", min: X, max: Y, einheit_wert: "mg/dl", quelle: {...} },
  { alter_von: 1, alter_bis: 12, einheit: "Jahre", min: X, max: Y, einheit_wert: "mg/dl", quelle: {...} },
  { alter_von: 13, alter_bis: 18, einheit: "Jahre", min: X, max: Y, einheit_wert: "mg/dl", quelle: {...} }
]
referenz_aelter: JSONB (≥ 65 Jahre) — nur wenn Leitlinie explizit abweicht
```

**Schwangerschaftsbezogene Referenzbereiche:**

```
referenz_schwangerschaft: JSONB-Array [
  { trimester: 1, min: X, max: Y, einheit: "mU/l", quelle: {...} },
  { trimester: 2, min: X, max: Y, einheit: "mU/l", quelle: {...} },
  { trimester: 3, min: X, max: Y, einheit: "mU/l", quelle: {...} }
]
```

**UI-Logik Kontextauswahl:**
- Geschlecht: Schaltfläche sofort sichtbar wenn Werte geschlechtsspezifisch (bereits vorhanden DE, erweitern)
- Alter: "Andere Altersgruppe anzeigen?" — Dropdown mit Kategorien, nur wenn Daten vorhanden
- Schwangerschaft: "Schwangerschaftswerte anzeigen?" — Checkbox/Toggle, nur wenn Daten vorhanden
- **Keine erzwungene Kontextauswahl**: Nutzer wird nicht gezwungen, Kontext anzugeben. Allgemeiner Referenzbereich ist immer der Default.

---

### C7. Quellen- und Konfliktlogik (Q2-Anschluss)

**Q2-BUILD-02b-Scope für S1:**

| Aufgabe | Inhalt | Priorität |
|---------|--------|-----------|
| Quellenbox-Komponente S1 | QuellenBox-Komponente (wie S5 Q2-BUILD-02a) auf Referenzbereich-Block | HOCH — S1 hat kein quellen-JSONB-Feld, neues Feld nötig |
| Quellentyp für Referenzbereiche | `database` (DGKL/AACC/JSCC = strukturierte Datenbasen) | Klar |
| Quellentyp für Zielwerte | `guideline` (DGK/ESC/DDG/AWMF = Behandlungsleitlinien) | Klar |
| Quellentyp für Verlaufsangaben | `guideline` oder `research` (je nach Basis) | Im Einzelfall |
| URL-Felder | `ref_de_quelle_url`, `ref_usa_quelle_url`, `ref_jp_quelle_url` — neu | HOCH |
| Jahr-Felder | `ref_de_quelle_jahr`, etc. — neu | HOCH |
| `letzte_aktualisierung` | Bereits in VW_05-Schema geplant — Frontend-Anzeige aktivieren | MITTEL |
| `quellen_konflikt` JSONB | Wenn DE/USA/JP signifikant abweichen — informativer Hinweis-Text | MITTEL |

**Quellenkonflikt-Logik:**

Ein `quellen_konflikt`-Eintrag ist nicht per se ein Problem — er ist ein Mehrwert. Beispiel TSH:
- DGKL (DE): 0,4–4,0 mU/l
- Kontroverse in der Fachwelt: manche Experten plädieren für engere Grenzen (0,4–2,5 mU/l)
- Das ist echter Q2-Mehrwert: erklären, warum die Werte unterschiedlich sind

```
quellen_konflikt: {
  vorhanden: true,
  beschreibung: "Deutsche und internationale Labore setzen unterschiedliche Obergrenzen für TSH. ..."
  quellen: [{ ... }]
}
```

---

### C8. UX-/Mobile-Logik

**Alle Prinzipien bindend (Q6 + Q3 + Q10):**

| Prinzip | Konkretion für S1 | Quelle |
|---------|-----------------|--------|
| Mobile-first | 1-Spalten-Stack für Referenzbereich unter 640px (statt 3-Spalten-Grid) | Q6, S18-Build-04a-Standard |
| Tap-Targets ≥ 40px | Alle Akkordeon-Header, Toggles, Quellen-Chips, Intent-Buttons | S18-Build-04a-Standard |
| Keine Hover-only-Interaktionen | Alle Funktionen ohne Hover erreichbar | Q6 |
| Scanbar | Jeder Block ≤ 5 sichtbare Informationseinheiten ohne Scroll | Q3 |
| Kein automatisches Zielwert-Ausspielen | ZT1/ZT2 aufklappbar, ZT3/ZT4 nur nach Intent | Anti-Übergriffigkeits-Prinzip |
| Leer-Zustand | Wenn keine Zielwert/Kontext/Verlaufsdaten → Block absent | Standard |
| i18n-fähige Schlüssel | Neue Felder neutral benennen (kein `zielwert_text_deutsch`) | Q10 |
| Quellenbox max. 2 Chips sichtbar | Q2-BUILD-02b-Standard übernehmen | Q2-Spec §C8 |

**Block-Reihenfolge auf S1-Detailseite (neu):**

```
[1] Header: Name, LOINC, Panel/Kategorie
[2] Beschreibung laienhaft
[3] Notfall-Banner (wenn notfall_flag)
[4] Referenzbereiche V1 (DE/USA/JP + Geschlecht)
    └─ Quellenbox (Q2-BUILD-02b)
    └─ Quellenkonflikt-Hinweis (wenn vorhanden)
[5] Kontextbereiche V2 (Akkordeon — Alter / Schwangerschaft)
[6] Zielwerte V3 (Akkordeon — ZT1/ZT2 direkt / ZT3/ZT4 nach Intent)
[7] Verlaufsorientierung V4 (Akkordeon)
[8] Ursachen hoch / niedrig (bestehend)
[9] Supplement-Einfluss Chips (bestehend)
[10] Medikamenten-Einfluss Chips (bestehend)
[11] Wann zum Arzt (bestehend)
[12] B4-Block "Nächste Schritte" (S8-BUILD-02 — separater Block)
[13] Disclaimer (bestehend)
```

**Mobile-Verhalten Referenzbereich-Grid:**
- Desktop: 3 Spalten (DE / USA / JP) — bestehend
- ≤ 640px: 1-Spalten-Stack (DE zuerst, USA, JP), kein horizontales Scrollen

---

### C9. Kommunikations-No-Gos

Verbindlich, keine Ausnahmen:

| Verboten | Begründung |
|----------|-----------|
| „Dein richtiger Wert ist X" | Kein individueller Kontext vorhanden |
| „Du solltest X anstreben" | Therapieempfehlung — absolutes No-Go |
| „Dieser Wert deutet auf [Diagnose] hin" | Diagnoseaussage — absolutes No-Go |
| „Optimaler Wert" ohne klinische Basis | Scheingenauigkeit, keine evidenzbasierte Kategorie |
| Referenzbereich und Zielwert gleichgestellt (ohne Erklärung) | Gefährlich irreführend für therapierelevante Werte |
| Trend als medizinische Aussage ohne Kontext | „Dein Wert sinkt" = nie ohne individuelle Datenbasis |
| Zielwert ohne Kontext-Pflichtfeld anzeigen | Falsche Anwendung durch Nutzer |
| „Laut Studien liegt der optimale Wert bei..." ohne PMID | E28-Verletzung |
| Zielwert für Therapiemonitoring ohne Arzt-Caveat | ZT4 ohne expliziten Disclaimer verboten |
| „Normal" für Wert außerhalb Referenzbereich aber in Zielwert | Begriffsvermischung, klinisch gefährlich |
| Präzision vortäuschen (4 Nachkommastellen) ohne Quellengrundlage | Scheingenauigkeit |
| Schwangerschaftswerte als Default anzeigen | Kontext muss explizit aktiviert werden |

---

### C10. Datenmodell-/Feldbedarf

**Bereits vorhanden (nicht ändern):**

| Feld | Typ | Status |
|------|-----|--------|
| `ref_de_min_m`, `ref_de_max_m`, `ref_de_min_w`, `ref_de_max_w` | numeric | ✅ vorhanden |
| `ref_de_einheit`, `ref_de_quelle` | text | ✅ vorhanden |
| `ref_usa_min`, `ref_usa_max`, `ref_usa_einheit`, `ref_usa_quelle` | numeric/text | ✅ vorhanden |
| `ref_jp_min`, `ref_jp_max`, `ref_jp_einheit`, `ref_jp_quelle` | numeric/text | ✅ vorhanden |
| `ursachen_hoch`, `ursachen_niedrig` | text[] | ✅ vorhanden |
| `supplement_einfluss`, `medikament_einfluss` | JSONB/text[] | ✅ vorhanden |
| `wann_arzt`, `notfall_flag` | text / boolean | ✅ vorhanden |
| `beschreibung_laienhaft`, `loinc_code`, `slug`, `name_de`, `vollname_de`, `kategorie`, `panel` | text | ✅ vorhanden |

**Neu hinzuzufügen (nicht bauen, nur spezifizieren):**

| Feld | Typ | Priorität | Zweck |
|------|-----|-----------|-------|
| `ref_de_quelle_url` | text (URL) | HOCH | Q2-Quellenbox S1 |
| `ref_de_quelle_jahr` | integer | HOCH | Q2-Aktualitätsanker |
| `ref_usa_quelle_url` | text (URL) | HOCH | Q2-Quellenbox |
| `ref_usa_quelle_jahr` | integer | HOCH | Q2-Aktualitätsanker |
| `ref_jp_quelle_url` | text (URL) | MITTEL | Q2-Quellenbox (JP noch nicht vollständig) |
| `ref_jp_quelle_jahr` | integer | MITTEL | Q2-Aktualitätsanker |
| `letzte_aktualisierung` | TIMESTAMP | HOCH | Q2-Pflichtfeld alle Tabellen |
| `quellen_konflikt` | JSONB / NULL | MITTEL | Konfliktanzeige wenn DE/INT abweicht |
| `referenz_kinder` | JSONB | MITTEL | V2a Altersbereiche |
| `referenz_schwangerschaft` | JSONB | MITTEL | V2b Schwangerschaftsbereiche |
| `zielwerte` | JSONB Array | HOCH | V3 — Kern des S1-Mehrwerts |
| `monitoring_intervall` | JSONB / text | MITTEL | V4 + B4-Anschluss (S8-BUILD-02) |
| `normalisierungszeitraum` | JSONB / text | MITTEL | V4 Verlaufsorientierung |
| `verlauf_kontext` | text (optional) | NIEDRIG | V4 allgemeiner Kontext |
| `b4_monitoring_plan` | JSONB | MITTEL | S8-BUILD-02 Vorbereitung, F6-kompatibel |
| `b4_wann_arzt_trigger` | text | NIEDRIG | S8-BUILD-02 Ergänzung zu `wann_arzt` |

**Schema-Anforderungen (Q10-kompatibel):**
- Keine hartkodierten deutschen Labels als Feldnamen
- JSONB-Strukturen i18n-fähig (Schlüssel neutral, Werte sprachlich trennbar)
- Neue Felder RLS-neutral (bestehende RLS-Policy greift)

---

### C11. Erster sinnvoller Build-Schritt

**Paket:** S1-BUILD-01 — Zielwert-Logik und Quellenkontext

**Scope:**
1. DB-Schema: `zielwerte` JSONB + `ref_*_quelle_url` + `ref_*_quelle_jahr` + `letzte_aktualisierung` auf `laborwerte`-Tabelle
2. Seed-Daten: 5–10 klinisch hochrelevante Laborwerte mit Zielwerten befüllen (LDL-C, HbA1c, TSH, Kreatinin, Ferritin — je mit ZT1/ZT2/ZT3 wo belegt)
3. Frontend: V3-Block (Zielwert) auf `LaborwertDetail.jsx` — Akkordeon mit Pflicht-Caveat
4. Frontend: Quellenkontext für Referenzbereich (URL + Jahr neben Quellenname)
5. Q2-Anschluss: QuellenBox-Komponente für S1 (= Q2-BUILD-02b-Scope)

**Nicht in Scope S1-BUILD-01:**
- V2 Alters-/Schwangerschaftsbereiche (separates Paket — Datenbeschaffung aufwändig)
- V4 Verlaufsorientierung (separates Paket — Daten nötig)
- S8-BUILD-02 (eigenständige Spec + eigenständiger Chat)
- Vollständige Befüllung aller 60 Laborwerte mit Zielwerten (Stufenweise)

**Warum diese Reihenfolge:**
1. Zielwert-Logik ist der größte qualitative Sprung von S1 — höchster Mehrwert, direkt umsetzbar ohne Bildausgabe-Änderung
2. Quellenkontext (URL + Jahr) ist Q2-Pflicht und ohne Schema-Risiko
3. V2 und V4 brauchen aufwändige Datenbeschaffung — nicht als erstes

**Validator für S1-BUILD-01:**
- [ ] `zielwerte` JSONB-Array vorhanden und mindestens 5 Laborwerte befüllt
- [ ] ZT1–ZT4 sauber getrennt und beschriftet
- [ ] Pflicht-Caveat bei jedem Zielwert sichtbar
- [ ] "Zielwert ≠ Referenzbereich"-Erklärung im UI
- [ ] URL-Links bei DE/USA/JP-Quellen
- [ ] Quellenbox Q2-Standard (Typ-Chip + URL + Jahr)
- [ ] Mobile-first: keine horizontalen Scrollbars auf 375px
- [ ] Akkordeon-Block leer → Block absent
- [ ] ZT3/ZT4 nur nach Intent-Klick sichtbar
- [ ] V1 Bestehend intakt (keine Regression)

**Neuer Chat erforderlich:** JA — eigenständiges Build-Paket mit expliziter Freigabe.

---

### C12. Anschluss an S8-BUILD-02

**Chronologie:**
```
S1-PRE-SPEC (diese Datei) ✅
    → S1-BUILD-01 (Zielwert + Quellenkontext) — eigenständiger Chat
        → S8-BUILD-02 (B4 Laborwert-Seiten, K3) — eigenständige Spec zuerst
```

**Was S1 für S8-BUILD-02 bereitstellen muss:**

| S8-Bedarf (K3) | S1-Vorarbeit | Zeitpunkt |
|----------------|-------------|-----------|
| Wann-Arzt-Trigger (Stufe 1) | ✅ `wann_arzt` + `notfall_flag` — vorhanden | Sofort nutzbar |
| Monitoring-Plan (Stufe 2, F6) | ⚠ `b4_monitoring_plan` JSONB nötig | S1-BUILD-01 |
| Mögliche Einflussfaktoren (Stufe 2) | ✅ `ursachen_hoch/niedrig` + Einfluss-Chips | Vorhanden |
| Verweis auf S5-Diagnosen (Stufe 2) | ✅ Cross-Block S5↔S1 vorhanden | Vorhanden |
| Zielwert-Kontext für B4-Formulierung (F1) | ⚠ `zielwerte` JSONB nötig | S1-BUILD-01 |
| Normalisierungszeitraum für B4-F6 | ⚠ `normalisierungszeitraum` nötig | S1-BUILD-01 oder S1-BUILD-02 |

**Grenzlinie B2 vs. B4 im UI:**
- S1 (B2): V1–V4-Blöcke erklären und einordnen
- S8/B4: Block [12] auf Laborwert-Seite — separates UI-Segment "Was tun?" — eigenständiger B4-Block, nicht Teil der V1–V4-Logik
- Die Blöcke dürfen nicht visuell verschmelzen — klare Trennung: "Einordnen" vs. "Handeln"

---

## D — KOMMUNIKATIONS-NO-GOs (Kurzliste)

1. „Dein richtiger Wert ist X" — kein individueller Kontext
2. „Du solltest X anstreben" — Therapieempfehlung verboten
3. „Dieser Wert deutet auf [Diagnose] hin" — Diagnoseaussage verboten
4. „Optimaler Wert" ohne klinische Leitliniengrundlage — Scheingenauigkeit
5. Referenzbereich und Zielwert gleichgestellt ohne Erklärung
6. Trend ohne individuelle Datenbasis als persönliche Aussage
7. Zielwert ohne Kontext-Pflichtfeld
8. ZT4 Therapiemonitoring ohne Arzt-Caveat
9. „Laut Studien" ohne PMID / DOI (E28)
10. Schwangerschaftswerte als Default — Kontext muss aktiviert werden
11. 4-stellige Nachkomma-Präzision ohne Quellengrundlage
12. „Aktuell" ohne Datum

---

## E — ERSTER SINNVOLLER BUILD-SCHRITT

**Paket:** S1-BUILD-01 — Zielwert-Logik + Quellenkontext
**Scope:** DB-Schema `zielwerte` JSONB + URL/Jahr-Felder + `letzte_aktualisierung` → Seed 5–10 Laborwerte → V3-Block Frontend → Quellenkontext-Anzeige → Q2-Quellenbox-Anschluss
**Voraussetzungen:** Diese Pre-Spec als Pflichtlektüre. Q2-PRE-SPEC und Q2-BUILD-02a als Q2-Grundlage.
**Validator:** 12 Punkte (§C11)
**Neuer Chat:** JA — eigenständiges Paket, explizite Freigabe erforderlich.

---

## OPS CLOSURE

### Inhaltlich

S1-PRE-SPEC Compare/Zielwert/Trend vollständig abgeschlossen. Alle 12 Pflichtblöcke spezifiziert. P7D-Einordnung explizit (B2, K3, Q2/Q3/Q6/Q10). Audit-Tabelle 13 Befunde. Kernentscheidungen B1–B5 begründet. 4-Ebenen-Vergleichsmodell. 4 Zielwert-Typen. Kontextlogik Geschlecht/Alter/Schwangerschaft. Verlaufslogik ohne S9. Q2-Anschluss (Q2-BUILD-02b-Scope für S1). 12 Kommunikations-No-Gos. Datenmodell-Feldbedarf vollständig. S8-BUILD-02-Anschluss explizit vorbereitet. Neuer Chat und Freigabe für Build.

Keine Strategiedrift gegenüber P7D_ARCHITECTURE_RESET_FREEZE.md, Q2_TRUST_SOURCE_PRE_SPEC.md, S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md, VW_04_ENTSCHEIDUNGEN.md (E03/E28/Q6/Q10). Beobachtung und Schlussfolgerung getrennt. Nicht direkt verifizierte Punkte (JSCC-Extraktion technisch offen, `letzte_aktualisierung`-Feld in DB nicht direkt verifiziert) explizit markiert.

### Technisch angewendet

- **DB-Write:** NEIN
- **Commit:** NEIN
- **Push:** NEIN
- **Deploy:** NEIN
- **Offener Side Effect:** NEIN
- **Neue Datei:** `01_PROJECT_SOURCES_CURRENT/S1_PRE_SPEC_COMPARE_ZIELWERT_TREND.md` ✅

### Operativ abgesichert

Nächste freigegebene Schritte (je eigenständiger Chat, je explizite Freigabe):
1. **S1-BUILD-01** — Zielwert-Logik + Quellenkontext (kein Build ohne explizite Freigabe)
2. **Q2-BUILD-02b** — S2/S6-Quellenfeld-Audit + Quellenbox-Rollout (parallel möglich)
3. **S8-BUILD-02-Spec** — nach S1-BUILD-01, eigenständige Spec für K3-B4-Logik

Doppelpflege: CLAUDE.md + VW_03_STATUS.md + AUDIT_CANON_CURRENT.md + ACTIVE_STRANDS_CURRENT.md folgen direkt.

---

*Erstellt: 24.04.2026 — S1-PRE-SPEC Compare/Zielwert/Trend abgeschlossen.*
*Führende Basis: P7D_ARCHITECTURE_RESET_FREEZE.md (18.04.2026) + Q2_TRUST_SOURCE_PRE_SPEC.md (24.04.2026) + S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md (23.04.2026).*
*Nächster zulässiger Build-Schritt: S1-BUILD-01 (eigenständiger Chat, explizite Freigabe erforderlich).*
