# B4_DECISION_LOGIC_FREEZE — Ableitungslogik inkl. früher Studienlage + Integrationen

**Paketname:** B4_DECISION_LOGIC_FREEZE  
**Datum:** 24.04.2026  
**Typ:** Read-only Freeze — Kein Build. Kein Code. Kein DB-Write. Kein Commit. Kein Push. Kein Deploy.  
**Status:** ✅ Freeze-Dokument erstellt  
**Führende Quellen:** P7D_ARCHITECTURE_RESET_FREEZE.md · S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md · S8_BUILD_02/02b/02c/03_CLOSURE.md · VW_04_ENTSCHEIDUNGEN.md · AUDIT_CANON_CURRENT.md · ACTIVE_STRANDS_CURRENT.md

---

## 1. KURZURTEIL

**B4 „Nächste Schritte" ist der wichtigste Differenzierungshebel von VitalWissen.**

Jede Gesundheitsplattform erklärt. VitalWissen erklärt, vernetzt — und leitet dann zu einem konkreten nächsten Schritt. B4 ist das Scharnier zwischen Verstehen (B2) und Handeln.

**Was bereits gebaut ist:**
- B4-Block auf 5 Krankheitsseiten (S8-BUILD-01, 27 Optionen)
- K3-Einordnungsblock auf 20 Laborwertseiten (~57 Karten)
- B4-Actions-Block „Was kann ich konkret tun?" auf 5 MVP-Laborwerten (23 Karten)
- Bestehende Pflichtfelder: title, category (standard/supporting), evidence, whyShown, whatHelps, expectedEffect, cautions, monitoring

**Was mit diesem Freeze verbindlich spezifiziert wird:**
- Vollständiges Maßnahmen-Kategoriesystem (8 Typen inkl. `promising` und `experimental` klar getrennt)
- Evidenz-Reifegradmodell (6 Stufen) — unabhängig vom Maßnahmentyp
- Erweitertes Pflichtfeld-Schema (15 Felder statt 8)
- Sicherheits- und Risikoschema (3 Stufen + `requiresDoctorDiscussion`)
- UI-Regeln mit 7 Gruppen
- Vollständige No-Go-Liste (12 Punkte)
- 5 Beispiele mit konkreter Typ-/Evidenz-Zuordnung
- Google/Wearables-Anschlussfähigkeit
- Empfohlene Build-Reihenfolge (6 Pakete)

**Widerspruchsregel:** Dieses Dokument überschreibt die Pre-Spec `S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md` wo es präziser oder umfassender ist. Die Pre-Spec bleibt gültig für die 4-Stufen-Ausspiel-Logik und F1–F7-Pflichtstruktur (hier erweitert zu F1–F15, rückwärtskompatibel).

---

## 2. WARUM B4 ZENTRAL FÜR VITALWISSEN IST

### 2.1 Das Kernproblem

Menschen googeln Gesundheitsinformationen und ertrinken in inkonsistenten, kontextlosen, oft werbefinanzierten Ergebnissen. VitalWissen löst den ersten Teil dieses Problems durch B2: qualifizierte, verlinkte, strukturierte Inhalte.

Aber: Verstehen allein reicht nicht. Das eigentliche Ziel ist informiertes Handeln.

> *„Es gibt einen Moment, in dem man aufhört zu googeln und anfängt zu verstehen."*
> Dann braucht man den nächsten Satz: *„Und jetzt — was tue ich damit?"*

### 2.2 Was B4 leisten soll

B4 beantwortet 10 Nutzerfragen, die Menschen nach dem Verstehen stellen:

1. Was könnte mein Problem bedeuten?
2. Wie kann ich es weiter eingrenzen?
3. Welche Standardmaßnahmen gibt es?
4. Was kann ich selbst tun?
5. Welche unterstützenden Optionen gibt es?
6. Welche Optionen sind vielversprechend, aber noch unsicher?
7. Welche experimentellen Optionen gibt es?
8. Was sollte ich eher nicht tun?
9. Was sollte ich mit Arzt oder Apotheke besprechen?
10. Woran kann ich Wirkung oder Risiko kontrollieren?

### 2.3 Was B4 ausdrücklich nicht tut

- Keine Diagnose stellen
- Keine Therapieempfehlung
- Kein Arzt-Ersatz
- Keine Vollständigkeitsgarantie
- Keine Aussage über individuelle Verträglichkeit
- Keine implizite Botschaft „Arzt hat etwas übersehen"

### 2.4 Das Ziel-Versprechen (intern, nicht als Werbetext)

> „Diese Option existiert. So belastbar ist sie. Dafür könnte sie relevant sein. Darauf musst du achten. So kann man Wirkung oder Risiko beobachten."

---

## 3. NUTZER-JOURNEY

```
Problem / Befund / Symptom
        ↓
    B2 — Verstehen / Einordnen
  (S1 Laborwert / S5 Krankheit / S6 Wirkstoff / S18 Nährstoff)
        ↓
    B4 — Nächste Schritte
        ↓
┌──────────────────────────────────────┐
│  EINORDNUNG                          │
│  Was bedeutet dieser Wert/Befund?    │
│  In welchem Kontext bin ich?         │
└──────────────────────────────────────┘
        ↓
┌──────────────────────────────────────┐
│  MÖGLICHKEITEN                       │
│  Stufe 1: Standard (sofort sichtbar) │
│  Stufe 2: Ergänzend (aufklappbar)    │
│  Stufe 3: Weiteres (nach Intent)     │
│  Stufe 4: Nie automatisch            │
└──────────────────────────────────────┘
        ↓
┌──────────────────────────────────────┐
│  EVIDENZ- UND RISIKOBEWERTUNG        │
│  Typ: standard / supportive /        │
│       promising / experimental /     │
│       avoid / monitoring             │
│  Reife: established / supported /    │
│          promising / uncertain /     │
│          experimental / avoid        │
│  Sicherheit: low / medium / high     │
└──────────────────────────────────────┘
        ↓
┌──────────────────────────────────────┐
│  ENTSCHEIDUNGSHILFE                  │
│  Für wen relevant?                   │
│  Was könnte helfen?                  │
│  Was ist unsicher?                   │
│  Was beachten?                       │
│  Arzt/Apotheke besprechen?           │
│  Woran Wirkung messen?               │
└──────────────────────────────────────┘
```

### 3.1 Eingangsobjekte und Priorität

| Objekt | Kernobjekt | Tiefe | Phase |
|--------|------------|-------|-------|
| Krankheit / Diagnose | K1 | ★★★★ Primär | B/C — S8-BUILD-01 live (5 ICD) |
| Laborwert | K3 | ★★★ Hoch | B/C — K3-Map live (20 LW), B4-Actions live (5 LW) |
| Medikament / Wirkstoff | K5 | ★★★ Hoch | C — noch nicht gebaut |
| Dokument / Arztbrief | K9 | ★★★ Hoch | nach P7-06 |
| Nährstoff / Lebensmittel | K8 | ★★ Mittel | C |
| Supplement | K4 | ★★ Mittel | C |

---

## 4. MASSNAHMEN-KATEGORIEN

Für jede B4-Option wird **ein** `measureCategory`-Wert vergeben. Mischungen sind nicht zulässig.

### 4.1 Übersicht

| Kategorie | Kurzname | Stufengrenze |
|-----------|----------|--------------|
| `standard` | Standard / Leitlinie | Stufe 1–2 |
| `lifestyle` | Lebensstil / Eigenfürsorge | Stufe 2 |
| `supportive` | Unterstützend / ergänzend | Stufe 2–3 |
| `promising` | Vielversprechend, aber unsicher | Stufe 3 |
| `experimental` | Experimentell / Off-Label | Stufe 4 (nie automatisch) |
| `avoid` | Nicht empfehlenswert / eher vermeiden | Sonderbereich |
| `monitoring` | Kontrollparameter / Verlaufsmessung | Stufe 1–2 |
| `doctor_discussion` | Ärztliches Gespräch / Vorbereitung | Stufe 1–2 |

---

### 4.2 `standard`

**Bedeutung:** Mindestens eine aktuelle nationale Leitlinie (AWMF, NVL, DGK, DGE) empfiehlt diese Maßnahme explizit (Evidenzgrad A oder B). Breit akzeptierter klinischer Konsens.

**Erlaubte Aussagen:**
- „Laut [Leitlinie X, Jahr, Grad A]: ... gilt als Behandlungsstandard."
- „Diese Maßnahme wird in der nationalen Leitlinie als erste Wahl empfohlen."

**Verbotene Aussagen:**
- „Ist immer wirksam"
- „Garantiert hilft"
- Dosierungsempfehlungen ohne klaren Arzt-/Apothekenkontext

**Evidenzanforderung:** Mindestens Leitliniengrad B einer deutschen Fachgesellschaft oder NVL. Quelle muss verlinkbar und verifiziert sein.

**Risikostufe:** Typisch `low` — außer bei Medikamenten/rezeptpflichtigen Maßnahmen (`medium/high`).

**UI-Darstellung:** Grüne Markierung / Badge „Standard". Sofort sichtbar (Stufe 1). Kein Accordion.

**Beispiel:** Statine bei klinisch indiziertem hohem LDL-Risiko (ESC/EAS-Leitlinie 2021).

---

### 4.3 `lifestyle`

**Bedeutung:** Lebensstilanpassungen mit guter Evidenzlage, die der Nutzer eigenständig beginnen kann. Kein direktes Interaktionspotenzial mit Medikamenten.

**Erlaubte Aussagen:**
- „Für Menschen mit [Kontext X] kann [Maßnahme Y] dazu beitragen, [Outcome Z] zu verbessern — typisch beobachtet nach [Zeitraum]."
- Konkrete Form, konkreter Kontext, messbarer Outcome, Zeithorizont.

**Verbotene Aussagen:**
- „Mach Sport" (nicht konkret genug)
- „Ernähre dich gesünder" (keine Spec)
- Kalorienempfehlungen ohne medizinischen Kontext

**Evidenzanforderung:** Mindestens eine hochwertige Meta-Analyse oder mehrere RCTs. Leitlinie muss zumindest Erwähnung als sinnvolle Begleitmaßnahme enthalten.

**Risikostufe:** Typisch `low`.

**UI-Darstellung:** Blau / Badge „Lebensstil". Stufe 2 (aufklappbar). Kein Accordion-Zwang wenn wenige Punkte.

**Beispiel:** Ballaststoffreiche Ernährung bei LDL-Cholesterin.

---

### 4.4 `supportive`

**Bedeutung:** Unterstützende Maßnahmen mit plausiblem Nutzen, die über Basis-Lebensstil hinausgehen. Supplements mit moderater Evidenz (mehrere RCTs oder Meta-Analysen) ohne aktives Interaktionspotenzial in der Standardzielgruppe.

**Erlaubte Aussagen:**
- „Hinweis auf mögliche unterstützende Rolle — [Kontext]. Evidenz: [Quellenangabe]. Nicht als Ersatz für ärztliche Behandlung."
- „Diese Maßnahme gilt als ergänzend, nicht als Alternative zur Standardtherapie."

**Verbotene Aussagen:**
- „Ersetzt Medikament X"
- „Genauso wirksam wie"
- Dosierungsangaben

**Evidenzanforderung:** Mindestens 2 RCTs oder 1 hochwertige Meta-Analyse. Sicherheitsprofil gut belegt. Kein relevantes Interaktionspotenzial in der beschriebenen Zielgruppe.

**Risikostufe:** `low` bis `medium`.

**UI-Darstellung:** Grau-Blau / Badge „Unterstützend". Stufe 2 (aufklappbar).

**Beispiel:** Flohsamenschalen bei LDL (mehrere RCTs zur LDL-Senkung um ~5–7%).

---

### 4.5 `promising`

**Bedeutung:** Plausible frühe Humanstudien oder konsistente kleine Studien, die eine Wirksamkeit andeuten — aber noch nicht ausreichend repliziert, noch kein Leitlinien-Bezug, potenziell noch widersprüchliche Daten.

**Wichtig: `promising` ≠ `experimental`**
- `promising`: Humanstudien vorhanden, Mechanismus bekannt, Richtung plausibel
- `experimental`: Tiermodelle, Phase-1-Daten, reine Mechanismus-Hypothesen

**Erlaubte Aussagen:**
- „Die bisherige Forschung deutet auf möglicherweise unterstützende Wirkung hin — die Evidenzlage ist noch nicht ausreichend für eine Empfehlung."
- „Mehrere Humanstudien zeigen [X] — aber noch kein klinischer Konsens."

**Verbotene Aussagen:**
- „Wirkt nachweislich"
- „Ist so gut wie belegt"
- „Klinisch bewiesen" ohne Quellennachweis

**Evidenzanforderung:** Mindestens 1 Humanstudie (RCT oder kontrollierte Studie), idealerweise mehrere. Mechanismus bekannt. Kein konsistenter Expertenkonsens gegen die Maßnahme.

**Risikostufe:** `medium`.

**UI-Darstellung:** Amber / Badge „Vielversprechend — noch unsicher". Nur in Stufe 3 (nach Intent). Expliziter Hinweis auf Evidenzlücke.

**Beispiel:** Kreatin bei Sarkopenie im Alter (kontextuell — `supportive` wenn gut belegt für diese Gruppe, `promising` wenn nur frühe Humanstudien).

---

### 4.6 `experimental`

**Bedeutung:** Sehr frühe Hypothese, Off-Label-Anwendung außerhalb jedes klinischen Konsenses, nur Phase-1/2-Daten oder Tiermodelle, reine Mechanismus-Spekulation.

**Erlaubte Aussagen:**
- Keine direkte Empfehlung möglich
- Nur: „Zu diesem Ansatz gibt es frühe Forschung — ausschließlich nach Rücksprache mit einem Spezialisten und nur im Rahmen klinischer Studien."
- Maximal: neutraler Verweis auf S3 (Studienkompass) nach explizitem Intent

**Verbotene Aussagen:**
- Jede Art von Empfehlungsformulierung
- Dosierungsangaben
- Wirkungsbehauptungen

**Evidenzanforderung:** Nicht anwendbar — experimentelle Optionen werden in B4 nicht direkt beschrieben, sondern maximal als Verweis auf S3 behandelt.

**Risikostufe:** `high`. `requiresDoctorDiscussion: true` ist immer Pflicht.

**UI-Darstellung:** Rot-Grau / Badge „Experimentell — nur nach ärztlicher Rücksprache". Stufe 4 — NIEMALS automatisch. In B4 maximal als Link: „Aktuelle Forschung im Studienkompass".

**Beispiel:** Lithium (niedrig dosiert) zur Demenzprävention — frühe Humanstudien existieren, kein klinischer Konsens, kein Leitlinien-Bezug, erhebliche Sicherheitsfragen.

---

### 4.7 `avoid`

**Bedeutung:** Häufig beworbene oder verbreitete Maßnahme, die für den konkreten Kontext nicht sinnvoll oder aktiv riskant ist. Wichtig für Desinformationskorrektur.

**Erlaubte Aussagen:**
- „Diese Option wird häufig in Bezug auf [Kontext] erwähnt — die Evidenzlage spricht jedoch nicht für einen Nutzen in diesem Kontext."
- „Vorsicht: [Maßnahme X] ist für [Kontext Y] nicht geeignet, da..."

**Verbotene Aussagen:**
- Pauschale Negativurteile ohne Kontext
- Angriff auf andere Therapieansätze

**Evidenzanforderung:** Klarer Quellennachweis (Studie oder Leitlinien-Aussage), warum diese Option im gegebenen Kontext nicht sinnvoll ist.

**Risikostufe:** Variiert.

**UI-Darstellung:** Eigener Bereich „Nicht verwechseln / eher vermeiden". Neutral, ohne Alarmismus.

**Beispiel:** Omega-3-Fettsäuren als LDL-Senker (wirkt auf Triglyzeride, nicht auf LDL).

---

### 4.8 `monitoring`

**Bedeutung:** Parameter zur Verlaufsbeobachtung, Wirkungskontrolle und Risiko-Früherkennung.

**Erlaubte Aussagen:**
- „Zur Einschätzung der Entwicklung empfiehlt die Leitlinie [Wert X] alle [Y Monate] zu kontrollieren."
- Konkrete Messgröße, konkreter Zeitraum, verlinkter Laborwert (S1).

**Evidenzanforderung:** Leitlinienbasiert oder gut etablierter klinischer Standard.

**UI-Darstellung:** Grau / Badge „Monitoring". Stufe 1–2.

---

### 4.9 `doctor_discussion`

**Bedeutung:** Konkrete Gesprächspunkte für den Arzt- oder Apothekenbesuch. Nicht als medizinischer Ratschlag, sondern als Vorbereitung.

**Erlaubte Aussagen:**
- Konkrete Fragen: „Was wäre ein realistisches Therapieziel für meinen Fall?"
- Was mitbringen: „Bisherige Messwerte, Medikamentenliste"

**Evidenzanforderung:** Keine medizinische Evidenzanforderung — handlungspraktisch formuliert.

**UI-Darstellung:** Teal / Badge „Gespräch vorbereiten". Stufe 1–2.

---

## 5. EVIDENZ-REIFEGRADMODELL

Das Evidenz-Reifegradmodell (`evidenceMaturity`) bewertet die Qualität und Konsistenz der zugrundeliegenden Belege — unabhängig vom Maßnahmentyp. Ein `lifestyle`-Eintrag kann `established` oder `uncertain` sein.

### 5.1 Übersicht

| Grad | Bezeichnung | **UI-Label (Klartextanzeige)** | Kurzdef |
|------|------------|-------------------------------|---------|
| `established` | Leitlinie / Standard-of-Care | **Etabliert** | Breiter klinischer Konsens, nationale Leitlinie |
| `supported` | Gut belegt | **Gut untersucht** | Mehrere RCTs oder Meta-Analysen, aber kein zwingender Standard |
| `promising` | Vielversprechend | **Vielversprechend** | Plausible frühe Humanstudien, noch nicht ausreichend repliziert |
| `uncertain` | Widersprüchlich | **Unsicher** | Gemischte, widersprüchliche oder methodisch schwache Evidenz |
| `experimental` | Sehr früh | **Experimentell** | Tiermodelle, Phase-1-Daten, Mechanismus-Hypothesen |
| `avoid` | Nicht sinnvoll | **Eher vermeiden** | Evidenz spricht gegen Nutzen in diesem Kontext |

---

### 5.2 `established`

**Mindestanforderung:** Nationale Leitlinie (AWMF S3, NVL, DGK, DGE) mit Evidenzgrad A oder B. Mehrere unabhängige RCTs. Breiter Expertenkonsens.

**Erlaubte Formulierungen:**
- „Laut [Leitlinie X, Jahr]: ..."
- „Klinisch etablierter Standard"

**Verbotene Formulierungen:** keine Einschränkungen nötig — nur immer mit Quellennachweis

**Notwendige Warnhinweise:** Kontexthinweis falls Zielgruppe eingeschränkt

**Ärztliche Rücksprache zwingend:** Nein (außer bei rezeptpflichtigen Maßnahmen)

---

### 5.3 `supported`

**Mindestanforderung:** Mindestens eine hochwertige Meta-Analyse oder mehrere konsistente RCTs. Leitlinie schweigt oder nennt als „kann erwogen werden". Kein aktiver Konsens dagegen.

**Erlaubte Formulierungen:**
- „Mehrere Studien deuten auf [Wirkung X] hin — Evidenzgrad: [beschreiben]."
- „Nicht als Standardtherapie empfohlen, aber gut belegt für [Kontext]."

**Verbotene Formulierungen:**
- „Genauso wirksam wie der Standard"

**Notwendige Warnhinweise:** Einordnung als „nicht Standard" immer erforderlich

**Ärztliche Rücksprache zwingend:** Empfohlen (nicht zwingend) außer bei Interaktionsrisiko

---

### 5.4 `promising`

**Mindestanforderung:** Mindestens 1 kontrollierte Humanstudie (nicht nur Tiermodell). Mechanismus biologisch plausibel. Keine aktive Gegenevidence.

**Erlaubte Formulierungen:**
- „Die bisherige Forschung ist ermutigend — reicht aber nicht für eine Empfehlung."
- „[X] Humanstudien zeigen [Effekt] — Replikation ausstehend."

**Verbotene Formulierungen:**
- „Wirkt nachweislich"
- „Klinisch bewiesen"

**Notwendige Warnhinweise:** Immer explizit: „Evidenzlage noch nicht ausreichend für eine Empfehlung."

**Ärztliche Rücksprache zwingend:** Empfohlen — besonders bei Interaktionspotenzial

---

### 5.5 `uncertain`

**Mindestanforderung:** Studien existieren, sind aber widersprüchlich oder methodisch schwach. Kein klarer Konsens für oder gegen.

**Erlaubte Formulierungen:**
- „Die Evidenz ist gemischt — einige Studien zeigen [X], andere finden keinen Effekt."
- „Derzeit kein klarer wissenschaftlicher Konsens."

**Verbotene Formulierungen:** Weder eindeutig positiv noch eindeutig negativ formulieren

**Notwendige Warnhinweise:** „Bitte mit Fachperson besprechen, bevor du dich darauf stützt."

**Ärztliche Rücksprache zwingend:** Ja, immer bei `uncertain`

---

### 5.6 `experimental`

**Mindestanforderung:** Nicht anwendbar — keine ausreichende Humanstudien-Basis vorhanden.

**Erlaubte Formulierungen:** Nur in B4 als Verweis auf S3 (kein direkter Inhalt)

**Verbotene Formulierungen:** Jede Wirkungsbehauptung

**Notwendige Warnhinweise:** Immer: „Nur im Rahmen klinischer Studien und nach ärztlicher Rücksprache."

**Ärztliche Rücksprache zwingend:** Immer

---

### 5.7 `avoid`

**Mindestanforderung:** Klare Belege (Studie oder Leitlinien-Aussage), dass die Maßnahme im konkreten Kontext keinen Nutzen oder aktive Risiken hat.

**Erlaubte Formulierungen:**
- „Für diesen Kontext nicht geeignet, da..."

**Verbotene Formulierungen:** Pauschale Negativurteile ohne Quellennachweis

**Notwendige Warnhinweise:** Kontext immer explizit nennen

---

### 5.8 Evidenztypen (`evidenceType`)

Pro Option wird der zugrundeliegende Evidenztyp dokumentiert:

| Wert | Beschreibung |
|------|-------------|
| `guideline` | Nationale oder internationale Leitlinie (AWMF, NVL, ESC, EAS, etc.) |
| `meta_analysis` | Systematische Review / Meta-Analyse |
| `rct` | Randomisiertes kontrolliertes Experiment |
| `cohort_study` | Kohortenstudie / Beobachtungsstudie |
| `mechanism` | Biochemischer Mechanismus (ohne Humanstudie) |
| `case_series` | Fallserie / unkontrollierte Beobachtung |
| `animal_in_vitro` | Tierversuch / In-vitro-Experiment |
| `expert_consensus` | Expertenkonsens ohne formale Leitlinie |

---

### 5.9 UI-Label-Pflicht (PATCH_01, bindend)

Das UI zeigt ausschließlich den **Klartext-Label**, nicht den technischen Enum-Wert. Mapping verbindlich:

| `evidenceMaturity` | UI-Label | Pflicht-Subtext |
|-------------------|----------|----------------|
| `established` | **Etabliert** | Leitlinie oder klinischer Standard |
| `supported` | **Gut untersucht** | Mehrere belastbare Studien — nicht immer Standard |
| `promising` | **Vielversprechend** | Erste positive Humanstudien — noch nicht ausreichend gesichert |
| `uncertain` | **Unsicher** | Studienlage gemischt oder methodisch schwach |
| `experimental` | **Experimentell** | Sehr frühe Forschung oder Off-Label-Kontext |
| `avoid` | **Eher vermeiden** | Für diesen Kontext nicht sinnvoll oder riskant |

**Pflicht-No-Gos:**
- `promising` darf nicht wie eine Empfehlung wirken → Badge immer mit Subtext „noch nicht ausreichend gesichert"
- `experimental` darf nie wie eine normale Option wirken → immer prominenter Warn-Kontext, nie allein ausspielbar
- Kein Ausspiel technischer Enum-Werte (`established`, `supported` etc.) im Nutzer-UI

---

## 6. PFLICHTFELDER JE OPTION

Das erweiterte Schema (15 Felder) für alle zukünftigen B4-Einträge. Rückwärtskompatibel mit der bestehenden 8-Felder-Struktur (`title`, `category`, `evidence`, `whyShown`, `whatHelps`, `expectedEffect`, `cautions`, `monitoring`).

```jsonc
{
  // Identifikation
  "title": "string — prägnanter Kurzname der Option",
  
  // Klassifikation
  "measureCategory": "standard | lifestyle | supportive | promising | experimental | avoid | monitoring | doctor_discussion",
  "evidenceMaturity": "established | supported | promising | uncertain | experimental | avoid",
  "evidenceType": "guideline | meta_analysis | rct | cohort_study | mechanism | case_series | animal_in_vitro | expert_consensus",
  
  // Kontext und Begründung
  "whyShown": "string — konkreter Auslöser aus dem Eingangsobjekt. Nie generisch.",
  "targetGroup": "string — für wen typischerweise relevant, für wen eher nicht",
  
  // Inhalt
  "whatCouldHelp": "string — der eigentliche Gesprächspunkt / die Maßnahme (vormals 'whatHelps')",
  "expectedBenefit": "string — konkreter Outcome, outcome-bezogen, nie diagnosestellend (vormals 'expectedEffect')",
  "uncertaintyReason": "string | null — warum ist die Evidenz nicht vollständig gesichert? (neu)",
  
  // Sicherheit
  "risksAndCautions": "string | null — konkrete Vorsichtshinweise (vormals 'cautions', erweitert)",
  "contraindicationsOrRedFlags": "string | null — absolute Gegenanzeigen und Warnsignale (neu)",
  
  // Verlauf
  "monitoring": "string | null — wann, wie und woran Wirkung oder Risiko messen",
  
  // Handlung
  "doctorDiscussion": "string | null — konkrete Fragen und Punkte für Arzt/Apotheke",
  "notToConfuseWith": "string | null — häufige Verwechslungen / Abgrenzungen (neu)",
  
  // Sicherheitsstatus
  "safetyLevel": "low | medium | high",
  "requiresDoctorDiscussion": true | false,
  
  // Quelle
  "sourceRequirement": "string — Mindestanforderung an Quellenangabe für diese Option"
}
```

### 6.1 Pflicht-Vollständigkeitsregel

**Fehlt eines der Felder 1–12: Option wird nicht ausgespielt.** Ausnahmen nur für explizit mit `null` gekennzeichnete optionale Felder.

`targetGroup`, `uncertaintyReason`, `contraindicationsOrRedFlags`, `notToConfuseWith` können `null` sein — müssen aber bewusst als `null` gesetzt werden (kein weggelassenes Feld).

---

### 6.2 Kontextpflicht-Regel (PATCH_01, bindend)

Jeder Zielwert und jede B4-Maßnahme muss — im UI sichtbar — drei Fragen beantworten. Diese Pflicht gilt unabhängig von `measureCategory` und `evidenceMaturity`.

**Die drei Pflichtantworten:**

| # | Frage | Beantwortet durch |
|---|-------|------------------|
| 1 | Für wen gilt das? | `targetGroup` |
| 2 | Warum wird es angezeigt? | `whyShown` (sichtbar — siehe §8.5) |
| 3 | Was bedeutet es nicht? | `notToConfuseWith` und/oder `contraindicationsOrRedFlags` |

**Pflichtlogik für Zielwerte:**
- Dieser Zielwert gilt für eine konkrete, benannte Gruppe — kein allgemeiner Optimalwert.
- Er gilt nicht automatisch für alle Nutzer — Ausschlüsse müssen sichtbar sein.
- Je nach individuellem Risiko können strengere oder weniger strenge Zielwerte gelten.
- Der niedrigere Zielwert bei höherem Risiko ist eine Einordnung, keine Empfehlung.

**Pflichtlogik für B4-Maßnahmen:**
- „Gezeigt, weil: [konkreter Trigger — Wert, Diagnose, Symptom, Kontext]" — nie generisch
- „Relevant vor allem für: [Zielgruppe / Kontext]" — aus `targetGroup`
- „Nicht gemeint ist: [häufige Verwechslung / Abgrenzung]" — aus `notToConfuseWith`

**LDL-Pflichtbeispiel (Referenzfall für alle Zielwert-Einträge):**
- 116 mg/dL (ZT1) gilt nur bei niedrigem kardiovaskulärem Risiko — kein universeller Optimalwert
- Mittleres Risiko: < 100 mg/dL | Hohes Risiko: < 70 mg/dL | Sehr hohes Risiko: < 55 mg/dL (ESC/EAS 2021)
- LDL-Zielwerte müssen im UI immer mit dem zugehörigen Risikokontext gezeigt werden
- Fehlendes Risikokontext-Feld → Zielwert wird nicht ausgespielt

**Konsequenz:** Fehlt eine der drei Pflichtantworten im UI → Option wird nicht ausgespielt. (Analog zu §6.1 Vollständigkeitsregel.)

---

## 7. SICHERHEITS- UND RISIKOLOGIK

### 7.1 Sicherheitsstatus (`safetyLevel`)

| Wert | Vergabe-Kriterium | UI-Warnung | Ärztliche Rücksprache |
|------|-------------------|-----------|----------------------|
| `low` | Breites Sicherheitsprofil, kein Interaktionspotenzial, nicht rezeptpflichtig, keine kritische Zielgruppe | Kein spezifischer Warnhinweis | Empfohlen (generell) |
| `medium` | Relevantes Interaktionspotenzial ODER Zielgruppeneinschränkung ODER Off-Label-Kontext | Hinweis: „Sprich das mit Arzt/Apotheke durch" | Empfohlen (konkret mit Begründung) |
| `high` | Mehrere Risikofaktoren gleichzeitig ODER rezeptpflichtig ODER Schwangerschaft/Stillzeit ODER Nieren-/Leberfunktion relevant ODER Herzrhythmus-/Blutungsrisiko ODER hochdosiert ODER experimentell | Prominenter Warn-Block: „Ärztliche Rücksprache notwendig" | Zwingend (`requiresDoctorDiscussion: true`) |

### 7.2 `requiresDoctorDiscussion`

Muss `true` sein bei (keine Ausnahmen):

- Verschreibungspflichtige Medikamente
- Off-Label-Kontext
- Bekanntes Wechselwirkungsrisiko (Medikament ↔ Supplement, Medikament ↔ Lebensmittel)
- Schwangerschaft oder Stillzeit als möglicher Kontext
- Nieren- oder Lebererkrankung als möglicher Kontext
- Blutungsrisiko
- Elektrolyt- oder Herzrhythmusrisiko
- Hochdosierte Supplements (außerhalb physiologischer Bereiche)
- `experimental` als `measureCategory`
- `evidenceMaturity: uncertain` bei gleichzeitig relevantem Risiko

### 7.3 UI-Konsequenz nach Sicherheitsstatus

| Stufe | Hinweis-Typ | Platzierung |
|-------|-------------|-------------|
| `low` | Kein spezifischer Block | — |
| `medium` | Info-Box: „Hinweis zur Sicherheit" | Innerhalb der Option |
| `high` | Warn-Block mit Farbmarkierung (rot/orange) | Oben in der Option, vor inhaltlichem Text |

---

## 8. UI-REGELN

### 8.1 Ausspiel-Reihenfolge (bindend)

Die sieben UI-Gruppen erscheinen in dieser Reihenfolge:

| # | Gruppe | `measureCategory` | Stufe |
|---|--------|------------------|-------|
| 1 | „Standard & Abklärung" | `standard`, `monitoring`, `doctor_discussion` | Stufe 1 — sofort sichtbar |
| 2 | „Was du selbst beeinflussen kannst" | `lifestyle` | Stufe 2 — Accordion |
| 3 | „Unterstützende Optionen" | `supportive` | Stufe 2 — Accordion |
| 4 | „Vielversprechend — noch unsicher" | `promising` | Stufe 3 — nach Intent-Klick |
| 5 | „Experimentell / nur nach Rücksprache" | `experimental` | Stufe 4 — nie automatisch; nur als S3-Link |
| 6 | „Nicht verwechseln / eher vermeiden" | `avoid` | Sonderbereich am Ende |
| 7 | „Monitoring & Gesprächsvorbereitung" | `monitoring`, `doctor_discussion` (Detailinfos) | Stufe 2 |

### 8.2 Pflicht-UI-Elemente je Option

Nutzer muss sofort erkennen können:
1. **Wie etabliert ist das?** → `evidenceMaturity`-Badge
2. **Wie sicher ist das?** → `safetyLevel`-Indikator
3. **Was könnte es bringen?** → `whatCouldHelp` in 1–2 Sätzen
4. **Was ist unsicher?** → `uncertaintyReason` wenn vorhanden
5. **Muss ich das ärztlich besprechen?** → `requiresDoctorDiscussion`-Callout

### 8.3 Mobile-first Pflichtregeln (Q6)

- Tap-Targets mindestens 40px Höhe (dokumentierter Standard seit S18-Build-04a)
- Kein Inhalt nur über Hover erreichbar
- Maximale Fließtextlänge pro Option: 3 Sätze — Detailinfo in aufklappbarem Bereich
- Accordion-Blöcke öffnen sich mit einem Tap
- Kein horizontales Scrollen auf 375px Viewport

### 8.4 Scanbarkeit

- Schlüsselinfo (was, für wen, Zeithorizont) in den ersten 2 Zeilen erkennbar
- Kein Block länger als ~5 sichtbare Punkte ohne Accordion
- Jede Option ist eigenständig konsumierbar (kein Kontext aus Nachbarblock nötig)

### 8.5 `whyShown` — Sichtbares Pflicht-UI-Element (PATCH_01, verschärft)

`whyShown` darf nicht nur als Meta-Feld, Tooltip oder versteckte Zusatzinformation existieren.

**Verbindliche Platzierung:**
- Sichtbar in jeder B4-Karte — nicht hinter Accordion, nicht nur als Icon
- Position: oberer Kartenteil, direkt unter Titel oder Badge-Zeile
- Format: **„Gezeigt, weil: [konkreter Trigger]"**
- Der Trigger muss sich auf einen spezifischen Wert, ein Symptom, eine Diagnose oder ein Problem beziehen

**No-Gos für `whyShown`:**
- Nicht nur Accordion-Inhalt (unsichtbar ohne Klick)
- Nicht nur Icon-Tooltip (nicht barrierefrei, nicht mobile-tauglich)
- Kein generischer Trigger wie „passt zum Thema" oder „relevant für dich"
- Kein Trigger ohne direkten Bezug zum Eingangsobjekt (Laborwert, Diagnose, Symptom)

**Erlaubte Trigger-Formen:**
- „Weil LDL erhöht und Risikoeinschätzung laut ESC/EAS empfohlen"
- „Weil dieser Wert bei [ICD-Code] häufig abweicht"
- „Weil diese Maßnahme in der Leitlinie für [Kontext] erwähnt wird"
- „Weil diese Option häufig in diesem Kontext diskutiert wird — Einordnung folgt"

### 8.6 Stufen-Transparenz

- Nutzer muss erkennbar sein, dass es weitere Optionen gibt — ohne Aufdringlichkeit
- Button für Stufe 3: „Weitere Optionen & aktuelle Forschung"
- Stufe 3 öffnet sich in eigenem visuell getrenntem Bereich

### 8.7 CSS-Konventionen

- Bestehend: `b4-*` (S8-BUILD-01, Krankheitsseiten)
- Bestehend: `lw-einordnung-*` (K3-Map, Laborwertseiten)
- Bestehend: `lw-b4a-*` (B4-Actions, Laborwertseiten)
- Neu (K5/Wirkstoffseiten): `med-b4-*` (analog zu `med-*` S6-Prefix)
- Neu (globaler B4-Layer wenn nötig): `b4g-*`

---

## 9. NO-GOS

Strikt. Keine Ausnahmen. Auch nicht bei hohem Evidenzgrad.

| # | No-Go | Begründung |
|---|-------|------------|
| 1 | Diagnose aus Einzelwert oder Symptom stellen | Medizinrechtlich nicht zulässig, inhaltlich nicht seriös |
| 2 | Therapieanweisung formulieren | Automatische Therapieempfehlung = dauerhaftes No-Go (E03, P7D §13) |
| 3 | Dosierungsberatung ohne sichere medizinische Quelle und klaren Arzt-/Apothekenkontext | Haftungs- und Sicherheitsrisiko |
| 4 | Produktwerbung / Markenempfehlungen | E01/E02 — kein Affiliate, wirkstoffbasiert |
| 5 | Affiliate-Logik jeglicher Art | E01 — Vertrauen ist Kernasset |
| 6 | Gleichstellung von Standard und Experiment | Täuschung über Evidenzlage |
| 7 | Experimentelle Option als Alternative zur Standardtherapie darstellen | Sicherheitsrisiko für Nutzer |
| 8 | Heilversprechen | Irreführend, haftungsrelevant |
| 9 | „Nimm X" / „Nehmen Sie X" | Direkte Einnahmeempfehlung ohne individuelle Kenntnis |
| 10 | Risiko-Verharmlosung | Sicherheitsrisiko |
| 11 | Versteckte Priorisierung nach Lifestyle/Supplement-Wunschdenken | Verzerrung der Evidenzlage |
| 12 | „Dein Arzt hat X übersehen" oder implizite Arzt-Bashing-Formulierungen | Haftung, Vertrauensschaden, dauerhaftes No-Go |

**Weitere sprachliche No-Gos (vollständige Liste aus Pre-Spec C10):**
- „Das wird helfen" / „Das hilft"
- „Eindeutig wirksam" (ohne belastbaren Quellennachweis)
- „Ungefährlich" / „Sicher" (ohne Kontext)
- „Du hast [Diagnose]"
- „Statt Medikament X kannst du Y nehmen"
- „Das braucht kein Arzt"
- „Klinisch bewiesen" (ohne verlinkbare Quelle)
- „Für alle geeignet"
- „Schnell wirksam" (ohne Zeitangabe + Evidenzquelle)

---

## 10. BEISPIELE

### 10.1 LDL-Cholesterin (Laborwert K3 — erhöht)

**Kontext:** LDL-Wert erhöht (z.B. 4,2 mmol/L, keine bekannte KHK).

**Pflichthinweis zur Zielwert-Kommunikation (PATCH_01, bindend für alle LDL-B4-Karten):**

LDL-Zielwerte sind risikobasiert — kein universeller Optimalwert, sondern Behandlungsziele je nach individuellem Herz-Kreislauf-Risiko:

| Risikogruppe | LDL-Zielwert | Quelle |
|---|---|---|
| Niedriges Risiko | < 116 mg/dL (< 3,0 mmol/L) | ESC/EAS 2021 |
| Mittleres Risiko | < 100 mg/dL (< 2,6 mmol/L) | ESC/EAS 2021 |
| Hohes Risiko | < 70 mg/dL (< 1,8 mmol/L) | ESC/EAS 2021 |
| Sehr hohes Risiko (KHK, Diabetes+Organschaden) | < 55 mg/dL (< 1,4 mmol/L) | ESC/EAS 2021 |

Biologisch ist niedrigeres LDL grundsätzlich günstiger — klinische Zielwerte werden aber nach individuellem Risiko gesetzt, nicht nach absolutem Minimum. **116 mg/dL darf niemals als universeller Optimalwert kommuniziert werden.**

**Konsequenz für alle B4-LDL-Karten:** `whyShown` und `targetGroup` müssen den spezifischen Risikokontext benennen. LDL-Karten ohne Risikogruppen-Bezug → nicht ausspielen.

---

**Option A — Statin (falls klinisch indiziert)**

```
measureCategory:     standard
evidenceMaturity:    established
evidenceType:        guideline
whyShown:            "LDL >3,0 mmol/L bei mittlerem Risiko laut ESC/EAS-Leitlinie 2021"
targetGroup:         "Menschen mit erhöhtem kardiovaskulärem Risiko — Risikoeinschätzung nur ärztlich möglich"
whatCouldHelp:       "Statine sind die Klasse 1 A-Empfehlung der ESC/EAS-Leitlinie zur LDL-Senkung"
expectedBenefit:     "LDL-Reduktion 30–50% je nach Präparat und Dosis; kardiovaskuläres Risiko langfristig gesenkt"
uncertaintyReason:   null
risksAndCautions:    "Muskelbeschwerden möglich (Myopathie-Check); Leberwerte initial kontrollieren"
contraindicationsOrRedFlags: "Schwangerschaft, schwere Lebererkrankung"
monitoring:          "LDL + CK + Leberwerte nach 4–8 Wochen; langfristig jährlich"
doctorDiscussion:    "'Was wäre ein realistisches LDL-Ziel für mein Risikoprofil?' / 'Welches Statin ist für mich geeignet?'"
notToConfuseWith:    "Statine sind kein Ersatz für Lebensstiländerungen — sie wirken additiv"
safetyLevel:         high
requiresDoctorDiscussion: true
sourceRequirement:   "ESC/EAS 2021 Dyslipidämie-Leitlinie — verlinkbar via doi.org/10.1093/eurheartj/ehab685"
```

---

**Option B — Ballaststoffreiche Ernährung**

```
measureCategory:     lifestyle
evidenceMaturity:    supported
evidenceType:        meta_analysis
whyShown:            "Ballaststoffe binden Gallensäuren im Darm und senken so die LDL-Aufnahme"
targetGroup:         "Menschen mit mäßig erhöhtem LDL und geringem bis mittlerem Risiko"
whatCouldHelp:       "Mindestens 25–30g Ballaststoffe täglich (WHO-Empfehlung): Hülsenfrüchte, Hafer, Flohsamenschalen"
expectedBenefit:     "LDL-Senkung um durchschnittlich ~5–8%; messbar nach 6–12 Wochen regelmäßiger Anwendung"
uncertaintyReason:   null
risksAndCautions:    "Langsam steigern; bei Reizdarm vorsichtig beginnen"
contraindicationsOrRedFlags: null
monitoring:          "LDL-Kontrolle nach 3 Monaten konsequenter Ernährungsumstellung"
doctorDiscussion:    "'Welche Ernährungsanpassungen macht in meinem Fall Sinn?'"
notToConfuseWith:    "Nicht verwechseln mit fettarmer Ernährung — Effekte auf LDL sind unterschiedlich stark"
safetyLevel:         low
requiresDoctorDiscussion: false
sourceRequirement:   "Cochrane Review Soluble Dietary Fibre 2016 + EFSA-Stellungnahme Ballaststoffe"
```

---

**Option C — Omega-3 als LDL-Senker (Avoid-Beispiel)**

```
measureCategory:     avoid
evidenceMaturity:    avoid
evidenceType:        meta_analysis
whyShown:            "Häufig in diesem Kontext empfohlen — Evidenz spricht nicht für LDL-Senkung"
whatCouldHelp:       "Nicht geeignet für LDL-Senkung"
expectedBenefit:     "Kein relevanter LDL-senkender Effekt belegt (Triglyzeride: ja; LDL: nein)"
uncertaintyReason:   null
risksAndCautions:    "Hochdosiert: Blutungsrisiko und möglicher LDL-Anstieg durch erhöhte LDL-Partikelgröße"
contraindicationsOrRedFlags: null
monitoring:          null
doctorDiscussion:    null
notToConfuseWith:    "Omega-3 hat belegte Effekte auf Triglyzeride und kardiovaskuläres Gesamtrisiko — aber nicht auf LDL"
safetyLevel:         low
requiresDoctorDiscussion: false
sourceRequirement:   "REDUCE-IT Trial + ESC/EAS 2021 §6 Omega-3-Kommentar"
```

---

### 10.2 Ferritin (Laborwert K3 — erniedrigt / Eisenmangel)

**Kontext:** Ferritin unter 30 µg/L, Erschöpfung, kein akuter Blutverlust bekannt.

---

**Option A — Ärztliche Abklärung**

```
measureCategory:     doctor_discussion
evidenceMaturity:    established
whyShown:            "Ferritin <30 µg/L mit Symptomen erfordert Ursachenklärung vor Supplementierung"
targetGroup:         "Alle Personen mit niedrigem Ferritin und Symptomen"
whatCouldHelp:       "Zuerst Ursache klären: Blutungsquelle, Resorptionsproblem, Ernährungsmangel"
expectedBenefit:     "Gezielte Therapie statt symptomatischer Supplementierung ohne Diagnose"
risksAndCautions:    "Eisensupplementierung ohne Diagnose kann bei Hämochromatose gefährlich sein"
contraindicationsOrRedFlags: "Ferritin <12 µg/L oder schwere Symptome → zeitnahe ärztliche Vorstellung"
monitoring:          "Blutbild + Ferritin + Transferrinsättigung + ggf. CRP (Entzündungsausschluss)"
doctorDiscussion:    "'Was könnte der Grund für meinen niedrigen Ferritin-Wert sein?' / 'Brauche ich eine Eiseninfusion oder reicht orale Supplementierung?'"
safetyLevel:         medium
requiresDoctorDiscussion: true
```

---

**Option B — Nahrungsreiche Eisenquellen**

```
measureCategory:     lifestyle
evidenceMaturity:    supported
whyShown:            "Ernährungsbedingte Eisenzufuhr ist erster Ansatz bei leichtem Mangel ohne Symptome"
targetGroup:         "Leichter Mangel ohne schwere Symptome, kein Blutungsverdacht"
whatCouldHelp:       "Häm-Eisen (Fleisch) hat beste Bioverfügbarkeit; Nicht-Häm-Eisen (Hülsenfrüchte, Spinat) plus Vitamin C verbessert Aufnahme"
expectedBenefit:     "Ferritin-Anstieg messbar nach 8–12 Wochen konsequenter Ernährungsanpassung"
risksAndCautions:    "Kaffee/Tee/Kalzium hemmen Eisenresorption — zeitversetzt konsumieren"
monitoring:          "Ferritin-Kontrolle nach 3 Monaten"
doctorDiscussion:    "'Kann ich meinen Bedarf über die Ernährung decken oder brauche ich Supplements?'"
safetyLevel:         low
requiresDoctorDiscussion: false
```

---

### 10.3 Vitamin D (Laborwert K3 — Mangel)

**Kontext:** 25-OH-Vitamin-D unter 30 nmol/L (schwerer Mangel), keine Ursache geklärt.

---

**Option A — Vitamin D3-Supplementierung**

```
measureCategory:     supportive
evidenceMaturity:    supported
evidenceType:        guideline
whyShown:            "25-OH-Vitamin-D <30 nmol/L gilt als schwerer Mangel (DGE, Endocrine Society)"
targetGroup:         "Menschen mit bestätigtem schwerem Vitamin-D-Mangel, keine schwere Nierenerkrankung"
whatCouldHelp:       "Vitamin D3 (Cholecalciferol) ist die empfohlene Supplementierungsform laut DGE/Endocrine Society"
expectedBenefit:     "Werte-Anstieg messbar nach 6–8 Wochen; Knochengesundheit, Immunfunktion"
uncertaintyReason:   "Optimaler Zielspiegel für Nicht-Knochen-Effekte (Immunsystem, Krebs etc.) noch wissenschaftlich diskutiert"
risksAndCautions:    "Hochdosiert ohne Kontrolle: Hyperkalzämie möglich; immer Blutspiegel-kontrolliert"
contraindicationsOrRedFlags: "Sarkoidose, Hyperkalzämie, schwere Nierenerkrankung → ärztliche Freigabe zwingend"
monitoring:          "25-OH-Vitamin-D nach 3 Monaten; Kalzium + Phosphat wenn hochdosiert"
doctorDiscussion:    "'Welche Dosierung ist für meinen Ausgangswert sinnvoll?' / 'Wann sollte ich meinen Wert nachkontrollieren?'"
notToConfuseWith:    "Vitamin D2 (Ergocalciferol) ist in Studien weniger effektiv als D3"
safetyLevel:         medium
requiresDoctorDiscussion: true
```

---

### 10.4 Lithium zur Demenzprävention (unsicheres Beispiel — `experimental`)

**Kontext:** Person informiert sich präventiv über Demenzrisiko, stößt auf Berichte über Lithium.

---

**Interne Klassifikation:**

```
measureCategory:     experimental
evidenceMaturity:    experimental
evidenceType:        rct (wenige, klein), cohort_study (widersprüchlich)
whyShown:            "Häufig in Recherchen zum Thema Demenzprävention auftauchende Substanz"
targetGroup:         null — keine gesicherte Zielgruppe für präventive Anwendung
whatCouldHelp:       null — nicht als B4-Option ausspielbar
expectedBenefit:     null
uncertaintyReason:   "Frühe, kleine, teils widersprüchliche Humanstudien. Kein klinischer Konsens. Therapeutisches Fenster eng. Erhebliche Toxizitätsrisiken bei falscher Dosierung. Kein Leitlinien-Bezug für Prävention."
risksAndCautions:    "Lithium hat engen therapeutischen Bereich. Toxizitätsrisiko bei geringer Überdosierung. Nieren- und Schilddrüsenfunktion betroffen."
contraindicationsOrRedFlags: "NICHT ohne psychiatrische/neurologische Fachbegleitung. Nicht selbst dosieren."
monitoring:          null
doctorDiscussion:    null
notToConfuseWith:    "Therapeutisches Lithium (psychiatrisch) ist kein Demenz-Präventionsmittel. Natürliches Lithium im Trinkwasser ist eine separate Forschungsfrage."
safetyLevel:         high
requiresDoctorDiscussion: true
sourceRequirement:   "Verweis auf S3 (Studienkompass) für Forschungsstand — keine B4-Option"
```

**UI-Behandlung:** Kein direktes Ausspiel als B4-Option. Falls überhaupt erwähnt: nur unter „Zur Forschung — im Studienkompass" mit rotem Warn-Block und S3-Link. Kein Inhalt zu Wirkung oder Dosierung in B4.

---

### 10.5 Kreatin bei älteren Menschen mit Sarkopenie-Risiko (`supportive` → `promising` je Kontext)

**Kontext:** Person 60+, erste Zeichen von Muskelabbau, aktiv sportlich.

---

**Klassifikation je Evidenzlage:**

**Wenn für Muskelkraft-Erhalt im Kontext Widerstandstraining:**
```
measureCategory:     supportive
evidenceMaturity:    supported
evidenceType:        meta_analysis
whyShown:            "Mehrere Meta-Analysen zeigen Zusatznutzen von Kreatin + Widerstandstraining bei >60-Jährigen"
targetGroup:         "Ältere Erwachsene (>60) die aktiv Widerstandstraining betreiben"
whatCouldHelp:       "Kreatin-Monohydrat (3–5g/Tag) zusätzlich zu Widerstandstraining"
expectedBenefit:     "Muskelkraft und Muskelmasse-Erhalt; Funktionszustand (Alltagsmobilität) verbessert"
uncertaintyReason:   "Langzeit-Effekte jenseits 1 Jahr noch weniger gut belegt"
risksAndCautions:    "Flüssigkeitszufuhr wichtig; bei Nierenerkrankung ärztliche Rücksprache erforderlich"
contraindicationsOrRedFlags: "Eingeschränkte Nierenfunktion — Kreatin-Clearance prüfen"
monitoring:          "Kreatinin im Blut kann unter Kreatin-Supplementierung erhöht erscheinen (Artefakt informieren)"
doctorDiscussion:    "'Ist Kreatin bei meiner Nierenfunktion unbedenklich?'"
notToConfuseWith:    "Kreatin ist kein Hormon und kein Steroid. Wirkung nur in Kombination mit Training."
safetyLevel:         medium
requiresDoctorDiscussion: false  // außer bei Nierenproblematik
```

**Wenn für kognitive Funktion oder Energiestoffwechsel (ohne Trainingskontext):**
```
measureCategory:     promising
evidenceMaturity:    promising
// Begründung: Humanstudien vorhanden, aber inkonsistenter Effekt ohne Trainingskontext
```

**Lernpunkt:** Gleiche Substanz, unterschiedliche Einordnung je nach Indikationskontext und Evidenzlage in diesem Kontext. Das Schema erzwingt präzise Spezifikation.

---

## 11. GOOGLE / WEARABLES / SCHNITTSTELLEN-ANSCHLUSSFÄHIGKEIT

### 11.1 Architekturprinzip (bindend für alle B4-Builds)

B4 wird als **statische Kontent-Logik** gebaut, die **datentechnisch anschlussfähig** bleibt für spätere Kontextdaten. Kein Bruch zwischen heutiger Implementierung und zukünftiger Personalisierung.

**Technische Anforderung heute:** Alle B4-Optionen tragen ein `targetGroup`-Feld. Dieses Feld ist darauf ausgelegt, später durch Kontextdaten (Alter, Vorerkrankungen, Laborwerte, Aktivitätslevel) gefiltert oder gewichtet zu werden — ohne Restrukturierung des gesamten Schemas.

### 11.2 Spätere Integrationsquellen (konzeptionell, kein MVP)

Als S9-/B4-Kontextquellen für spätere Phasen konzeptionell vorgesehen:

| Quelle | Art | Anschlussfähigkeit | Phase |
|--------|-----|-------------------|-------|
| Google Health API / Fitbit-Daten | Aktivität, Schlaf, Herzrate | S9/Q8 | Phase D |
| Health Connect (Android) | Aggregator-Layer für Wearables | S9/Q8 | Phase D |
| Apple Health | Aktivität, Herzrate, HRV, BZ | S9/Q8 | Phase D |
| CGM-Systeme (Continuous Glucose) | Glukoseverlauf (nutzerautorisiert) | S9/Q8 | Phase D |
| Manuelle Laborwert-Eingaben | Selbst eingegebene Werte | S9 | Phase C/D |
| Arztbriefe / S4-Kontext | Dekodierte Befunde | S4→B4 nach P7-06 | Phase B/C |
| Medikationsplan | Aktuell eingenommene Medikamente | S9 | Phase D |
| Ernährungstagebuch | Makro-/Mikronährstoffeingaben | S18/S9 | Phase D |

### 11.3 Rolle dieser Daten — Pflichtgrenzen

Diese Daten dürfen **nur als Kontextsignale** genutzt werden, niemals als Diagnosegrundlage.

**Erlaubt:**
- Schlafdaten können helfen, Müdigkeit in einen besseren Kontext einzuordnen.
- Aktivitätsdaten können HbA1c-/LDL-/Blutdruck-Kontext ergänzen.
- Ruhepuls-Verlauf kann bei Entzündung/Belastung ein Zusatzsignal sein.
- Gewichtstrend kann metabolische Risiken einordnen helfen.
- CGM-Daten können Glukoseverläufe kontextualisieren — aber nicht allein bewerten.

**Nicht erlaubt:**
- „Dein Fitbit zeigt Krankheit X"
- „Dein Ruhepuls bedeutet Entzündung"
- „Deine Schlafdaten beweisen Ursache Y"
- Automatische Therapieempfehlung auf Basis von Wearable-Daten

### 11.4 Google als Beobachtungsquelle (Q4-Anschluss)

Google Health, Health Connect, Fitbit und Google Cloud Healthcare API sollen als technische Entwicklungen in den Update-Layer (Q4) integriert werden. Beobachtungsparameter:

- Neue verfügbare Schnittstellen und Datentypen
- Regulatorische Änderungen (DSGVO, MDR)
- Datenschutz- und Sicherheitsrisiken neuer Integrationen
- Relevante KI-/Health-Produktentwicklungen von Google/Samsung/Apple

### 11.5 Was heute gilt (MVP-Grenze)

| Dimension | Status |
|-----------|--------|
| API-Integration | NEIN |
| OAuth-Login | NEIN |
| Wearable-Anbindung | NEIN |
| Google Health | NEIN |
| Persönliche Datenspeicherung | NEIN |
| B4 personalisiert nach Nutzerdaten | NEIN |

**Einzig heute gültig:** Architektur-Anschlussfähigkeit durch `targetGroup`-Feld und Schema-Design.

---

## 12. EMPFOHLENE BUILD-REIHENFOLGE

### Paket 1 — S1 Zielwert-Logik LDL-Cholesterin prüfen und korrigieren (Voraussetzung)

**Ziel:** S1-BUILD-01 hat LDL-Cholesterin mit ZT1 (primärpräventiv) und ZT3×2 (risikogruppenspezifisch) befüllt. Vor einem umfassenden LDL-B4-Build sicherstellen, dass die Zielwertlogik korrekt ist und nicht mit B4-Optionen konfliktiert.

**Risiko:** Gering — nur Verifikation und ggf. Korrektur des bestehenden DB-Eintrags.

**Notwendige Quellenlage:** ESC/EAS-Leitlinie 2021, DDG/AWMF NVL Diabetes (für ZT2/HbA1c).

**Build oder Spec nötig:** Build — aber sehr kleiner Scope (1 DB-Update).

---

### Paket 1b — S1-BUILD-01b: LDL Zielwert-Microcopy-Fix (PATCH_01, vor B4-BUILD-02)

**Ziel:** Den bestehenden Zielwert-Block auf der LDL-Seite (live seit S1-BUILD-01) um den Risikokontext-Satz erweitern, damit 116 mg/dL nicht als universeller Optimalwert gelesen werden kann.

**Scope (eng):**
- Kontextsatz unter ZT1-Eintrag: „Gilt für niedriges CV-Risiko. Bei höherem Risiko gelten strengere Ziele (< 70 mg/dL oder < 55 mg/dL laut ESC/EAS 2021)."
- Wenn möglich: Text in bestehendem `zielwerte`-JSONB-Feld (`zielwert_kontext` / `zielwert_caveat`) — kein neues DB-Feld nötig
- Kein Frontend-Umbau, kein Schema-Change

**Nicht-Scope:**
- Keine B4-Logik ändern
- Keine neue Strategie
- Keine Datenmodell-Erweiterung

**Risiko:** Sehr gering — nur Textergänzung im bestehenden JSONB-Feld.

**Notwendige Quellenlage:** ESC/EAS-Leitlinie 2021 (bereits referenziert).

**Build oder Spec nötig:** Kein separater Spec-Sprint — Mini-Build, direkt ausführbar auf Basis dieses Freeze-Dokuments.

**Voraussetzung für B4-BUILD-02:** JA — LDL-Zielwert-Block muss korrekt eingeordnet sein, bevor B4-LDL-Karten ausgespielt werden.

---

### Paket 2 — B4-BUILD-02: LDL-Cholesterin Journey (K3 — vollständig)

**Voraussetzung:** Paket 1b (S1-BUILD-01b, LDL Zielwert-Microcopy-Fix) abgeschlossen. Zielwert-Block LDL ist korrekt eingeordnet.

**Ziel:** Vollständiger B4-Block für erhöhtes LDL-Cholesterin mit dem neuen 15-Felder-Schema. 5–7 Optionen (standard bis avoid). Erster Anwendungsfall des B4-Freeze-Schemas.

**Risiko:** Gering bis mittel — LDL ist gut belegt, Leitlinien klar (ESC/EAS 2021). Hauptrisiko: Statin-Formulierungen in Richtung Therapieempfehlung abdriften.

**Notwendige Quellenlage:** ESC/EAS 2021, AWMF-Leitlinie Hyperlipidämie, Cochrane-Ballaststoff-Review, REDUCE-IT-Trial (Omega-3-Avoid).

**Build oder Spec nötig:** Build — auf Basis dieses Freeze-Dokuments direkt möglich. Kein separater Spec-Sprint.

**Hinweis:** Gleichzeitig: B4-Actions-Map für LDL erweitern (aktuell nur `category: standard/supporting` — Upgrade auf 15 Felder).

---

### Paket 3 — B4-BUILD-03: Ferritin / Eisenmangel-Logik (K3 — vollständig)

**Ziel:** Vollständiger B4-Block für niedrige Ferritin-Werte. 4–6 Optionen. Besonders wichtig: Avoid-Kategorie für Selbst-Supplementierung ohne Diagnose.

**Risiko:** Mittel — Eisenmangel ist häufig symptomatisch, Nutzer wollen schnelle Antworten. Hämochromatose-Gegenindikation muss klar kommuniziert werden.

**Notwendige Quellenlage:** AWMF-Leitlinie Eisenmangel (021-025), DGE-Empfehlungen, Cochrane Eisen-Supplementierung.

**Build oder Spec nötig:** Build — direkt auf Basis des Freeze-Schemas.

---

### Paket 4 — B4-BUILD-04: Vitamin D (K3 — vollständig)

**Ziel:** B4-Block für niedrige 25-OH-Vitamin-D-Werte. 4–5 Optionen inkl. `uncertain`-Einordnung für Nicht-Knochen-Effekte.

**Risiko:** Mittel — Vitamin D ist intensiv öffentlich diskutiert. Viele falsche Behauptungen im Umlauf. `avoid`-Einordnung für hochdosierte Selbst-Supplementierung ohne Kontrolle wichtig.

**Notwendige Quellenlage:** DGE-Stellungnahme Vitamin D, Endocrine Society Guidelines, AWMF Vitamin D (sofern vorhanden), Cochrane (kognitive/Krebs-Effekte: `uncertain`).

**Build oder Spec nötig:** Build — direkt auf Basis des Freeze-Schemas.

---

### Paket 5 — B4-BUILD-05: CRP / Entzündung (K3)

**Ziel:** B4-Block für erhöhten CRP-Wert. Besonderheit: CRP ist kein Diagnose-Marker, sondern ein Entzündungs-Indikator. B4 muss strikt auf Einordnung und Ursachensuche fokussiert bleiben.

**Risiko:** Hoch — erhöhter CRP ist diagnostisch vieldeutig. Diagnose-Framing sehr naheliegend. Strenger `doctor_discussion`-Fokus nötig.

**Notwendige Quellenlage:** AWMF-Leitlinien zu chronischen Entzündungen, S1-Inhalte zu CRP (bestehend).

**Build oder Spec nötig:** Kurzer Spec-Sprint empfohlen (CRP-spezifische Kommunikations-No-Gos definieren), dann Build.

---

### Paket 6 — Krankheitsspezifische Journeys (K1 — Rollout)

**Ziel:** B4-Blöcke für weitere Krankheitsseiten jenseits der 5 bestehenden (I10/E11/F32/E03/D50). Priorität: Arthrose, Hypertonie-Komplikationen, Hypothyreose, Dyslipidämie.

**Risiko:** Mittel — je Krankheit unterschiedlich. Arthrose: Schmerz-Kontext sensibel. Demenz: kein kurativer Standard, experimentell viel diskutiert.

**Notwendige Quellenlage:** AWMF-Leitlinien je Diagnose. Leitlinien müssen vor jedem Eintrag verifiziert sein.

**Build oder Spec nötig:** Build — das bestehende `naechste_schritte` JSONB-Schema in `krankheiten` auf das neue 15-Felder-Schema migrieren. Dann Rollout.

---

### Nachrang — Nicht in Phase B/C

- K5-B4-Blöcke (Wirkstoffseiten S6): Phase C, separater Chat
- K9-B4 (nach S4-Dekodierung): erst nach P7-06-Freigabe
- Personalisierte B4-Ausgabe via S9-Daten: Phase D
- Studien-Radar (ClinicalTrials-Integration): Phase C mit S3-Build

---

## 13. OFFENE FRAGEN

| # | Frage | Priorität | Wer entscheidet |
|---|-------|-----------|----------------|
| O1 | Migration des bestehenden `naechste_schritte` JSONB-Schemas (8 Felder) auf das neue 15-Felder-Schema — rückwärtskompatibel oder Neuschreibung? | HOCH — vor B4-BUILD-06 | Technisch klären |
| O2 | `laborwert_b4_actions_map.js` und `laborwert_k3_map.js` — wann auf DB-Schema migrieren (skalierbar bei 60 LW + wachsendem Inhalt)? | MITTEL — ab ~30 LW sinnvoll | Architekturentscheidung |
| O3 | Studien-Radar (ClinicalTrials.gov / DRKS): welche technische Lösung — API-Pull vs. manuelle Kuratierung? | MITTEL — Phase C-Voraussetzung | Sebastian + Tech-Entscheidung |
| O4 | Quellenbox (Q2) für B4-Optionen: analoges System wie S5-Quellenbox oder separates B4-Quellenformat? | MITTEL — Q2-BUILD-03-Entscheidung | Q2-Strang |
| O5 | Monitoring-Intervall in Feldern: strukturiertes Feld (Zeitangabe in Tagen) vs. Freitext? | NIEDRIG — bei DB-Migration klären | Technisch klären |
| O6 | `notToConfuseWith` — eigenes UI-Element oder Teil des Haupttexts? | NIEDRIG — UI-REFRESH-Strang | Design-Entscheidung |
| O7 | B4-Optionen für Krankheitsseiten: JSONB auf `krankheiten`-Tabelle (wie jetzt) oder eigene `b4_optionen`-Tabelle mit FK auf krankheiten.id? | HOCH — skalierungskritisch | Vor B4-BUILD-06 klären |
| O8 | `promising`-Optionen: eigene visuelle Abgrenzung oder Teil des Stufe-3-Blocks? | NIEDRIG — UI-Entscheidung | Design-Strang |
| O9 | Wearable-Anschlussfähigkeit: wann wird `targetGroup` zu einem strukturierten Feld mit Filterlogik? | NIEDRIG — Phase D | Nach S9-Spec |
| O10 | Demarkation `supportive` vs. `promising` in der Praxis: wer verifiziert, ob eine Studie „ausreichend" für `supportive` ist? Internes Review-Protokoll nötig? | MITTEL — Qualitätssicherung | Interne Regel festlegen |

---

## OPS CLOSURE

### A — Erstellte Datei

`01_PROJECT_SOURCES_CURRENT/B4_DECISION_LOGIC_FREEZE.md` — Freeze-Dokument, read-only.

### B — Wichtigste Entscheidungen

1. **8 Maßnahmentypen** verbindlich definiert — `promising` und `experimental` strikt getrennt
2. **6 Evidenz-Reifegrade** unabhängig vom Maßnahmentyp — `evidenceMaturity` als eigenständiges Feld
3. **15 Pflichtfelder** je Option — erweitertes Schema, rückwärtskompatibel mit bestehendem 8-Felder-Schema
4. **3 Sicherheitsstufen** + `requiresDoctorDiscussion` — explizit für jede Option zu vergeben
5. **Lithium/Demenz** als `experimental` — niemals automatisch in B4 ausgespielt, maximal S3-Verweis
6. **Kreatin/Alter** je nach Kontext `supportive` oder `promising` — Schema erzwingt Präzision
7. **Google/Wearables** konzeptionell anschlussfähig durch `targetGroup`-Feld — kein MVP-Build
8. **Build-Reihenfolge** 6 Pakete — LDL-Verifikation → LDL-B4 → Ferritin → Vitamin D → CRP → Krankheits-Rollout

### C — Offene Fragen

Tabelle in §13 — 10 offene Fragen, davon 2 hoch-priorisiert (O1: Schema-Migration, O7: DB-Architektur).

### D — Empfohlener nächster Build

**Paket 2 — B4-BUILD-02: LDL-Cholesterin Journey (K3)**

Direkt auf Basis dieses Freeze-Dokuments baubar. Niedrigstes Risiko, höchste Ausgangsevidenz, vorbereitete B4-Actions-Map (23 Karten LDL vorhanden). Gleichzeitig: Upgrade bestehender Karten auf 15-Felder-Schema.

**Voraussetzung:** Paket 1 (LDL Zielwert-Verifikation) als Mini-Check vorab.

Eigenständiger Chat. Explizite Freigabe erforderlich.

### E — Ops Closure

| Dimension | Status |
|-----------|--------|
| Lokaler Speicherstatus | Workspace-Datei erstellt |
| git status | Kein Commit (Read-only-Freeze) |
| Commit-Status | NEIN |
| Push-Status | NEIN |
| DB-Writes | NEIN |
| Deploy | NEIN |
| Offener Side Effect | NEIN |

Doppelpflege folgt in: CLAUDE.md · VW_03_STATUS.md · AUDIT_CANON_CURRENT.md · ACTIVE_STRANDS_CURRENT.md

---

### F — PATCH_01 (24.04.2026, read-only)

**B4_DECISION_LOGIC_FREEZE_PATCH_01** angewandt — kein Build, kein Code, kein DB-Write, kein Commit:

| Abschnitt | Änderung |
|-----------|---------|
| §5.1 Übersicht-Tabelle | UI-Label-Spalte ergänzt (6 Klartextlabels: Etabliert / Gut untersucht / Vielversprechend / Unsicher / Experimentell / Eher vermeiden) |
| §5.9 (neu) | UI-Label-Pflicht: Verbindliches Label-Mapping mit Pflicht-Subtext + No-Gos für `promising` und `experimental` |
| §6.2 (neu) | Kontextpflicht-Regel: 3 Pflichtantworten (für wen / warum / was nicht), LDL-Pflichtbeispiel, Konsequenz bei Verletzung |
| §8.5 | `whyShown` verschärft: sichtbar in oberen Kartenteil (kein Accordion-only, kein Icon-only), No-Gos explizit, erlaubte Trigger-Formen |
| §10.1 | LDL-Risikokontext-Pflichthinweis: 4-Stufen-Tabelle (116/100/70/55 mg/dL), 116 mg/dL kein universeller Optimalwert, Konsequenz für alle LDL-Karten |
| §12 | Paket 1b (S1-BUILD-01b LDL Microcopy-Fix) als neue Pflicht-Vorstufe vor Paket 2 (B4-BUILD-02) eingefügt; Paket 2 erhält explizite Voraussetzung |

---

*Erstellt: 24.04.2026 — B4_DECISION_LOGIC_FREEZE. Kein Build, kein Code, kein DB-Write, kein Commit, kein Push, kein Deploy.*  
*Gepatcht: 24.04.2026 — B4_DECISION_LOGIC_FREEZE_PATCH_01. §5.1/§5.9 UI-Klartextlabels, §6.2 Kontextpflicht, §8.5 whyShown verschärft, §10.1 LDL-Risikokontext, §12 Paket 1b eingefügt. Read-only, kein Build, kein Code, kein DB-Write, kein Commit.*  
*Führendes Vorgänger-Dokument: `S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md` (23.04.2026) — durch dieses Dokument erweitert und präzisiert.*
