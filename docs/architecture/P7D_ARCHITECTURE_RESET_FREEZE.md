# P7D — ARCHITECTURE RESET FREEZE

**Paketname:** P7D — Architecture Reset Freeze
**Untertitel:** Interne Säulen, externe Produktbereiche, Kernobjekte, Querschichten, Phasenlogik
**Datum:** 18.04.2026
**Status:** ✅ Freeze-Dokument erstellt — neue führende strategische Arbeitsgrundlage
**Kein DB-Write. Kein Commit. Kein Push. Kein Deploy.**

---

## Pflichtlektüre-Basis (Quellen dieses Dokuments)

Dieses Dokument synthetisiert folgende Quellen (Stand 18.04.2026):

| Quelle | Rolle |
|--------|-------|
| `VW_03_STATUS.md` | Führend für operativen Ist-Zustand, Sprint-Status |
| `VW_04_ENTSCHEIDUNGEN.md` | Führend für getroffene Grundsatzentscheidungen |
| `VW_05_SAEULEN.md` | Führend für Säulen-Scope und Datenlogik |
| `VW_06_WEBSITE.md` | Führend für Website-Konzept, Einstiegspfade, UX |
| `P6_FINAL_CLOSURE.md` | Führend für P6-Endstand (DB, Typen, Crosslinks) |
| `VITALWISSEN_STRATEGIE_REASSESSMENT_2026-04-18.md` | Delta-Quelle: neue strategische Erweiterungen |
| `CLAUDE.md` | Projektkontext, Tech-Stack, Verhaltensregeln |

Widerspruchsregel: Neuere operative Quellen (VW_03, P6_FINAL_CLOSURE) vor Altständen. Reassessment als Delta-Quelle für Strategie. Dieses Dokument **überschreibt** das Reassessment nicht — es überführt es in eine strukturierte, bindende Form.

---

## 1. PRODUKTKERN

### IST-ZUSTAND

VitalWissen ist eine deutschsprachige Gesundheitsplattform mit 18 internen Säulen. Drei davon sind live (S1, S2, S5). S4 ist konzeptionell definiert; P7 ist das nächste operative Ziel. Die Plattform ist werbefrei, quellenverifiziert, aggregierend. Internes Ordnungssystem = 18 Säulen. Externe Produktlogik = bisher nicht formal getrennt.

### ENTSCHEIDUNG — Nordstern-Formulierung

> **VitalWissen ist die verlässliche deutschsprachige Basis, die Gesundheitsinformation, Forschung und persönlichen Kontext verbindet — damit Menschen informiert handeln, statt nur zu googeln.**

### ENTSCHEIDUNG — Nüchterne Produktbeschreibung

VitalWissen ist eine evidenzbasierte Aggregations- und Verständnisplattform für Gesundheitsinformation. Sie erklärt, verknüpft und ordnet Befunde, Krankheiten, Laborwerte, Supplements, Medikamente, Ernährung und Forschung — in verständlicher Sprache, mit verlinkbaren Quellen, ohne Werbung und Affiliate. Ergänzt wird das durch Discovery (was ist neu?), Watchlists und einen späteren persönlichen Gesundheitsraum. VitalWissen ersetzt weder Arzt noch Apotheker — es befähigt, mit ihnen besser zu kommunizieren.

### ENTSCHEIDUNG — Kurzform für interne Nutzung

**Verlässlich aggregiert. Verständlich erklärt. Vernetzt navigiert.**

### ENTSCHEIDUNG — Bewusst nicht das Produktversprechen

| Nicht-Versprechen | Begründung |
|-------------------|------------|
| Diagnose stellen | Medizinrechtlich nicht zulässig, inhaltlich nicht seriös |
| Arzt ersetzen | Weder Ziel noch seriös möglich |
| Rezeptportal / Essenstagebuch | Nicht Kernlogik |
| Automatische Therapieempfehlung | Haftung + Evidenzlage |
| Radiologische Zweitdiagnostik | Zu riskant, zu früh |
| Personalisierbarer Shopping-Warenkorb | Erst nach Bewertungslogik, deutlich später |
| Vollpersonalisierung ohne klares Datenschutzmodell | Erst ab S9 mit optionalem Opt-in |

---

## 2. INTERNE SÄULEN vs. EXTERNE PRODUKTBEREICHE

### IST-ZUSTAND

18 Säulen sind das einzige Ordnungssystem. Intern sinnvoll. Extern für Nutzerführung zu fein, zu technisch, teilweise überschneidend.

### ENTSCHEIDUNG — Interne Ebene

**Die Säulen S1–S18 bleiben vollständig als interne Architektur erhalten.**

Ihre Funktion intern:
- Datenmodell und Datenbankstruktur
- Content-Pipeline und Automatisierungslogik
- Build-Reihenfolge und Sprint-Planung
- Quellen-Mapping und Evidenz-Ampel-Logik
- Verknüpfungslogik zwischen Inhalten (Crosslinks)

**Sie sind KEIN externes Navigationsmodell für Nutzer.**

### ENTSCHEIDUNG — Externe Produktbereiche (5)

| # | Externer Bereich | Nutzerjob | Interne Säulen dahinter |
|---|-----------------|-----------|------------------------|
| B1 | Finden / Entdecken | Relevante Inhalte finden — auch bevor man weiß, wonach man sucht | Globale Suche, Discovery-Layer, Update-Layer, Watchlists, Startseite |
| B2 | Verstehen / Einordnen | Befunde, Krankheiten, Supplements, Medikamente, Ernährung verstehen | S1, S2, S4, S5, S6, S18 |
| B3 | Forschung / Optionen / Zukunft | Sehen, was über Standardwissen hinaus an Forschung und Optionen existiert | S3, Teile S8, S15 als Modul |
| B4 | Nächste Schritte | Aus Wissen konkrete Anschlussschritte ableiten | S8, S10, S11, S12, später S17 |
| B5 | Mein Gesundheitsraum | Eigene Daten, Interessen und Dokumente ordnen | S9, Watchlists, spätere Integrationen |

### Tabelle 1 — Interne Säulen vs. externe Produktbereiche

| Säule | Interne Funktion | Externer Bereich | Phase |
|-------|-----------------|-----------------|-------|
| S1 Laborwert-Lexikon | Datenbasis Laborwerte, LOINC | B2 | Live |
| S2 Supplement-Kompass | Datenbasis Supplements, Evidenz-Ampel | B2 | Live |
| S3 Studienkompass | Daten-Pipeline PubMed, Studienstruktur | B3 | Phase C |
| S4 Arztbrief-Decoder | Verarbeitungs-Engine Dokumente, OCR/LLM | B2 | Phase B (in Arbeit) |
| S5 Krankheits-Lexikon | Primärer Content-Hub, ICD-10-Mapping | B2 (Anker) | Live |
| S6 Medikamenten-Erklärer | Datenbasis Wirkstoffe, Interaktionen | B2 | Phase B |
| S7 Community | Moderations-Engine, KI-Intelligence-Layer | Kein externer Bereich in Phase 1 | Phase E |
| S8 Diagnose-Navigator | Optionen-Logik, Studien-Radar, Spezialisten | B4 | Phase B/C |
| S9 Health Data Hub | Persönliche Datenschicht, E2E, FHIR | B5 | Phase D |
| S10 Datenschutz & Rechte | Content-Block Patientenrechte | B4 | Phase C |
| S11 Patienten-Steckbrief | Formulargenerator | B4 | Phase C |
| S12 Musterschreiben | Vorlagen-Engine | B4 | Phase C |
| S13 Gesundheitsagenten & Crowd | KI-Querschnitts-Agent, Crowd-Modell | Kein externer Bereich in Phase 1 | Phase E |
| S14 Influencer-Kompass | Claim-Datenbank, Evidenz-Check | B2 (optional) | Phase C/D |
| S15 Wirksamkeit & Zeitachse | Wirksamkeits-Modul, Zeitachsen-Logik | B3 als Modul | Phase C |
| S16 App-Aggregator | DiGA-Verzeichnis, Datenschutz-Checks | B4 (optional) | Phase C/D |
| S17 Arzt/Heilpraktiker-Matching | Matching-Engine, KBV-Aggregation | B4 (spät) | Phase E |
| S18 Ernährungskompass | Nährstoff-/Lebensmittel-Datenbasis | B2 | Phase B (Reset) |

---

## 3. KERNOBJEKTE

### IST-ZUSTAND

Keine formale Kernobjekt-Definiton existiert. Datenmodell orientiert sich an Säulenstruktur (laborwerte, supplements, krankheiten, etc.).

### ENTSCHEIDUNG — Kernobjekte der Plattform

Ein Kernobjekt ist eine eigenständige, verlinkbare, suchbare Einheit mit eigener Detailseite oder Funktion. Die Plattform wird mittel- bis langfristig um diese Objekte herum strukturiert.

### Tabelle 2 — Kernobjekte

| # | Objekt | Rolle | Warum Kernobjekt | Säulen | MVP-Phase |
|---|--------|-------|-----------------|--------|-----------|
| K1 | Krankheit / Diagnose | Primärer Anker der Plattform | Haupteinstieg, ICD-10-Basis, Hub für alle anderen Objekte | S5, S8 | Live |
| K2 | Symptom | Nutzer-Einstieg (sprechend, nicht kodiert) | Nutzer denken in Symptomen, nicht ICD-Codes | S5 | Live (als Einstieg in S5) |
| K3 | Laborwert | Objektbasierte Detailseite mit Referenzbereichen | Direkte Relevanz für Befund-Verständnis, LOINC-Standard | S1 | Live |
| K4 | Supplement / Wirkstoff | Evidenzbasierte Einheit ohne Affiliate-Bindung | Kern-USP von S2, Evidenz-Ampel | S2, S15 | Live |
| K5 | Medikament / Wirkstoff | Interaktions- und Beipackzettel-Logik | Sehr hohe Nutzernachfrage, Interaktionsprüfung | S6 | Phase B |
| K6 | Studie / Forschungseintrag | Verlinkbare, eingeordnete Forschungseinheit | Unterschied zu Newslogik: objekt-gebunden, nicht floating | S3 | Phase C |
| K7 | Maßnahme / Zeitachse | Wann wirkt was, woran messbar | Differenzierungsmerkmal: konkrete Kausalität statt Allgemeintipps | S15 | Phase C (Modul) |
| K8 | Lebensmittel / Nährstoff / Zusatzstoff | Nährwert-/Evidenz-Einheit | Ernährung als breiter strategischer Bereich; E-Nummern als USP | S18 | Phase B (Reset) |
| K9 | Dokument / Arztbrief / Befund | Eingabe-Einheit für S4 | Zero-Retention-Verarbeitungsobjekt, kein persistentes Kernobjekt | S4 | Phase B (in Arbeit) |
| K10 | Watchlist / Nutzerinteresse | Abonniertes Objekt mit Update-Logik | Discovery- und Retention-Hebel | S9, Discovery-Layer | Phase C |
| K11 | Persönlicher Gesundheitsdatensatz | Nutzerdaten-Container (opt-in) | Langfristiger Personalisierungs-Anker | S9 | Phase D |

**Hinweis K9:** Dokument/Arztbrief ist ein Verarbeitungsobjekt (Zero Retention), kein persistentes Kernobjekt im Sinne einer Datenbank-Einheit. Sonderrolle.

**Hinweis K2:** Symptom ist derzeit nur als Freitext-Einstieg in S5 vorhanden — kein eigenständiges Kernobjekt-Schema. Für spätere Stufe bleibt offen, ob Symptome eigene Detailseiten bekommen.

---

## 4. QUERSCHICHTEN / PLATTFORM-LAYER

### IST-ZUSTAND

Keine formale Querschichten-Definition. Einige Querschichten sind implizit vorhanden (Vertrauens-/Quellen-Layer durch AWMF/IQWiG-Logik, CSS-Prefix-System als früher Visual-Layer-Ansatz).

### Warum Querschicht und keine Säule?

Querschichten sind technische oder konzeptuelle Layer, die **quer über alle Säulen wirken** — sie sind keine eigenständigen Wissensbereiche, sondern Plattforminfrastruktur. Sie durchziehen mehrere oder alle Inhalte gleichzeitig.

### Tabelle 3 — Querschichten / Plattform-Layer

| # | Querschicht | Was genau | Warum Querschicht | Relevanz | Abhängigkeiten |
|---|-------------|-----------|-------------------|----------|----------------|
| Q1 | Discovery / Suche / Einstiege | Globale Suche, thematische Einstiege, Routing nach Eingabetyp | Wirkt über alle Kernobjekte | **Früh** | Kernobjekte K1–K5 vorhanden |
| Q2 | Vertrauens- / Quellen-Layer | Quellenverankerung, Typ-Normalisierung, Evidenz-Ampel, Quellen-Transparenz | Durchzieht jeden Content-Eintrag | **Früh** (bereits im Ansatz live) | Alle Säulen |
| Q3 | Visual- / Piktogramm-Layer | Ikonische Marker, scanbare Karten, einfache visuelle Hierarchie, nicht nur Fließtext | Betrifft alle Inhaltsseiten und Navigationsebenen | **Mittel** | Kernobjekte, externe Bereiche |
| Q4 | Update- / Change-Layer | Objekt-gebundene Änderungsinformationen (Leitlinien, Studien, Zulassungen, Sicherheit) | Wirkt über alle Kernobjekte, kein eigener Inhaltsbereich | **Mittel** | K1–K8 als Anker, S3-Daten |
| Q5 | Watchlists / Glocke / Alerts | Nutzerseitiges Abonnement von Kernobjekten + Update-Benachrichtigungen | Verbindet Discovery-Layer mit Update-Layer | **Mittel** | Q4, K10 |
| Q6 | Mobile / App-Fähigkeit | Mobile-first als Architekturprinzip: scanbare UI, kurze Inhaltsblöcke, responsive Struktur | Betrifft alle externen Bereiche und alle Inhaltsseiten | **Früh als Prinzip**, Umsetzung mittel | Frontend-Architektur |
| Q7 | Personalisierungs-Layer | Kontext-Filter aus S9-Daten, eigene Laborwerte, gespeicherte Diagnosen | Wirkt über S1, S5, S6 (Phase 2) | **Spät** | S9 (Phase D), Opt-in |
| Q8 | Integrations-Layer | Interoperabilität mit anderen Apps, Wearables, Gesundheitsplattformen, FHIR R4 | Querschnittlich über alle persönlichen Daten | **Spät** | S9, Phase D |
| Q9 | BYO-AI-Kontext-Layer | Eigene KI-Konten/Tools mit VitalWissen-Kontext arbeiten lassen | Kein eigenes KI-Frontend nötig — VitalWissen als Wissensschicht | **Spät** | Q8, Phase D/E |
| Q10 | Mehrsprachigkeit / i18n | Trennung Daten/Sprache, Label-Schicht i18n-fähig, DE → EN → weitere Sprachen | Betrifft Frontend-Architektur und Datenmodell | **Architekturprinzip jetzt**, Umsetzung Phase D |

**Hinweis Q10:** Mehrsprachigkeit ist **kein Build-Auftrag für Phase 1**, aber die Datenstruktur (Tabellenspalten, Tags, Typen) soll nicht nur deutsch gedacht werden. Neue Felder und Typ-Systeme sollen i18n-fähig angelegt werden.

**Hinweis Q6:** Mobile-first bedeutet: keine Desktop-only-UX-Entscheidungen, keine komplexen Hover-Interaktionen als einziger Weg, keine langen unstrukturierten Textwände. Das gilt **ab sofort** als Architekturprinzip für alle neuen Seiten/Komponenten.

---

## 5. KRITISCHE SÄULEN-TRENNSCHÄRFE: S3 / S5 / S8 / S15 / S17 / S18

### IST-ZUSTAND

Diese Säulen überschneiden sich ohne explizite Abgrenzung. S8 nimmt Teile von S3 auf. S15 könnte als eigenständige Säule oder als Modul in S2/S5/S18 erscheinen. S17 und S8 teilen Spezialisten-Logik.

### Tabelle 4 — Trennschärfe der kritischen Säulen

| Säule | Präzisierte Kernaufgabe | Ausdrücklich NICHT dazu | Einordnung | Aktiv aufzulösen |
|-------|------------------------|------------------------|------------|-----------------|
| **S3** Forschung / Studien | Echte Forschung auffindbar machen, von News/Hype trennen, Entwicklungsstand und Evidenz einordnen, damit Nutzer informierte Anschlussfragen ableiten können | Newsroom, Diagnosestellung, allgemeine Gesundheitstipps | Hauptbereich in B3, Phase C Build | S3 ≠ Update-Layer (Update-Layer ist Q4, S3 liefert die Studien-Objekte dafür) |
| **S5** Krankheits-Lexikon | Krankheit verstehen und verknüpfen — primärer Content-Hub, Standardkontext, drei Sprachebenen, Cross-Objekt-Verbindungen | Symptomchecker als Diagnose-Tool, Therapieempfehlung, News zu Krankheiten | Primärer Anker von B2, live | S5 ≠ S8: S5 erklärt, S8 navigiert zu nächsten Schritten |
| **S8** Diagnose-Navigator | Konkrete nächste Schritte und Optionen: Behandlungsstandard, Alternativen, aktuelle Studien, klinische Studien, Spezialisten, Zweitmeinung | Forschungsdatenbank (das ist S3), Bewertungsportal für Ärzte, Direktdiagnose | Hauptbereich in B4, Phase B/C | S8 ≠ S3: S8 = „was tue ich jetzt?", S3 = „was weiß die Forschung?"; S8 ≠ S17: S8 leitet zu Spezialisten ein, S17 führt konkretes Matching durch |
| **S15** Wirksamkeit & Zeitachse | Wann wirkt eine Maßnahme, wie lange bis messbar, woran messen, typische Fehler/Erwartungen | Eigenständige Hauptnavigation, Medikamenten-Wirksamkeit (bleibt S6) | **Modul** (nicht eigenständiger Hauptbereich), andockt an S2, S5, S18 | S15 erscheint als Funktionsblock auf S2-/S18-Detailseiten und im B3-Bereich — kein eigener Navigationspunkt in Phase C |
| **S17** Arzt/Heilpraktiker-Matching | Situationsbasiertes Matching nach Diagnose, Präferenzen, Versicherung, Ort — kein Arztverzeichnis, kein bezahltes Ranking | Bewertungsplattform, bezahltes Ranking, allgemeine Arztsuche | Spätphase (Phase E), rechtlich sehr vorsichtig | Klare rechtliche Prüfung vor jedem Build: Listing ohne Zustimmung, Haftung bei Empfehlung |
| **S18** Ernährungskompass | Ernährung verstehen, bewerten, anwenden: Grundlagen, Lebensmittelbewertung, Zusatzstoffe/E-Nummern, alltagstaugliche Heuristiken, krankheits- und laborwertbezogene Ernährung | Rezeptportal, Diät-Programm, Essenstagebuch, Kalorientracker | Aufgewerteter Hauptbereich in B2, Phase B Reset/Scope-Klärung | Vorher: Scope-Entscheidung ob E-Nummern / Zusatzstoffe Teil des MVP-Resets sind oder Phase C |

---

## 6. DISCOVERY- UND UPDATE-LOGIK ALS PRODUKTKERN

### IST-ZUSTAND

Keine Discovery- oder Update-Logik vorhanden. Startseite ist statisch. Keine Watchlist-Funktion. Kein Change-Layer.

### ENTSCHEIDUNG — „Finden / Entdecken" (B1) ist eigenständiger externer Produktbereich

Ja. B1 ist kein Feature, sondern ein eigener Bereich mit eigenständiger Logik. Begründung: Nutzer haben selten eine präzise Suchanfrage — sie brauchen Einstiegshilfen, Orientierung und Rückkopplungspunkte.

### ENTSCHEIDUNG — Update-/Change-Layer (Q4) ist objekt-gebunden, kein Newsroom

**Kerngrundsatz:** Jede Entwicklung muss an ein Kernobjekt (K1–K8) andocken.
**Nicht:** Floating News, Headline-Ticker, Positiv-News-Kuratierung.

**Entwicklungstypen, die hineingehören:**

| Typ | Beispiel | Andocken an |
|-----|---------|-------------|
| Leitlinien-Update | neue AWMF-Leitlinie zu ICD-Code X | K1 (Krankheit) |
| Neue Studie | Meta-Analyse zu Supplement Y | K4 (Supplement) |
| Zulassung | neue Medikamentenzulassung EMA | K5 (Medikament) |
| Sicherheitsupdate | Rückruf oder Sicherheitshinweis | K5, K4 |
| Versorgungsschritt | Erstattungsentscheidung GKV | K1, K5 |
| Forschungsfortschritt | Phase-3-Ergebnis | K6 (Studie), K1 |

**Nicht:** Good-News-Logik, politische Gesundheitsnachrichten ohne Objektbezug, Selbsthilfetipps.

### ENTSCHEIDUNG — Startseite braucht langfristig einen „Wichtige Entwicklungen"-Bereich

**ARBEITSHYPOTHESE** (noch nicht phasiert): Startseite zeigt später einen objektgebundenen „Wichtige Entwicklungen"-Feed statt statischem Content. Nicht als Nachrichtenportal. Erst wenn Update-Layer (Q4) und Kernobjekte ausreichend befüllt sind. Keine vorschnelle Freigabe.

---

## 7. INTEGRATIONEN, APP, WEARABLES, BYO-AI

### IST-ZUSTAND

Keine Integrationen. Keine native App. Keine Wearable-Anbindung. Keine BYO-AI-Logik. React-Webapp responsive, aber noch nicht mobile-first optimiert.

### ENTSCHEIDUNG — Was früh als Architekturprinzip gilt (aber nicht gebaut wird)

| Prinzip | Bedeutung | Phase |
|---------|-----------|-------|
| Mobile-first | Alle neuen Seiten scanbar, kurze Blöcke, keine Hover-only-UX | **Jetzt — Architekturprinzip** |
| FHIR R4 mitdenken | Datenstrukturen nicht gegen FHIR bauen | **Jetzt — Planungsprinzip** (E09) |
| i18n-fähige Datenstruktur | Keine hartkodierten deutschen Labels in Datenbankfeldern | **Jetzt — Architekturprinzip** |
| Keine eigene KI-Monokultur | S4/S13 nutzen externe APIs, kein eigenes Modelltraining | **Jetzt — festgelegt** (E06) |

### ENTSCHEIDUNG — Was Phase D ist (Build, nicht jetzt)

- S9 Health Data Hub (E2E, AES-256, FHIR R4)
- Mail/OAuth-Integration (Dokumentenerkennung)
- Wearables/Tracker-Anbindung
- App-Interoperabilität (FHIR, externe Gesundheitsplattformen)
- BYO-AI: eigene KI-Konten mit VitalWissen-Kontext arbeiten lassen

### ENTSCHEIDUNG — Einordnung BYO-AI

**ENTSCHEIDUNG:** BYO-AI ist **Integrationslayer** (Q9), keine eigene Säule.
VitalWissen wird als Wissens- und Kontextschicht positioniert — externe KI-Tools (ChatGPT, Claude, Gemini etc.) können darauf zugreifen. Nicht: eigene „große VitalWissen-KI" als Pflicht-Feature.

### BEWUSST SPÄTER — Nicht in Phase 1

- Native App (iOS/Android)
- Wearable-API-Integration
- direkte Händler-/Marktplatz-Integration
- BYO-AI-Frontend

---

## 8. BILDANALYSE / BILDGEBUNG

### IST-ZUSTAND

S4 hat Foto/Scan-Input via Tesseract.js (P7-02b abgeschlossen). Das bezieht sich auf **Texterkennung aus Dokumenten** — nicht auf medizinische Bildauswertung.

### ENTSCHEIDUNG — Zwei Ebenen strikt trennen

#### Ebene A — Später plausibel (Phase D/E, vorsichtig)

| Funktion | Einordnung |
|----------|------------|
| Foto-basierte Verlaufskontrolle sichtbarer Veränderungen (Haut, Wunden, Schwellungen) | Patientendokumentation, Weitergabe an Fachpersonal |
| Strukturierte Bildweitergabe an Arzt/Spezialist | S11-Erweiterung |
| Visuelle Dokumentation als Teil von S4/S9 | Keine Interpretation, nur Speicherung |

#### Ebene B — Bewusst nicht tun (auch langfristig vorsichtig)

| Funktion | Begründung |
|----------|------------|
| Radiologische Zweitdiagnostik (MRT, CT, Röntgen) | Medizinrechtlich sehr riskant, inhaltlich nicht seriös ohne klinischen Kontext |
| „Arzt hat etwas übersehen" als Produktversprechen | Haftung, Vertrauensverlust bei Falschaussagen |
| Breite MRT/CT-Interpretation | Nicht Phase 1, nicht Phase 2 |

### ENTSCHEIDUNG — Einordnung

**Bildanalyse ist spätere Querschicht (Phase D/E)**, andockend an S4 (Dokumentenraum), S9 (persönlicher Raum), S11 (Steckbrief). Kein eigenständiger Hauptbereich. Kein MVP-Thema.

---

## 9. VISUELLE EINFACHHEIT / PIKTOGRAMM-LOGIK

### IST-ZUSTAND

Kein formales Visual-Layer-Konzept. Design-System vorhanden (CSS-Prefixe), aber keine Piktogramm-Logik.

### ENTSCHEIDUNG — Visual-/Piktogramm-Layer (Q3) ist Produktlogik, keine Dekoration

Begründung aus Reassessment: Medizinische Inhalte sind komplex. Reine Fließtext-Logik ist für Menschen in Stress oder mit niedrigem Gesundheitswissen-Level schwer konsumierbar.

**Was das bedeutet:**

| Prinzip | Konsequenz |
|---------|-----------|
| Scanbare Blöcke | Inhalt in modulare, von oben nach unten lesbare Einheiten aufteilen |
| Ikonische Anker | Piktogramme als visuelle Orientierungspunkte auf Detailseiten |
| Einfach-Schicht neben Text | Dritte Sprachebene (Sehr Einfach) in S5 soll auch visuell vereinfacht sein |
| Klare visuelle Hierarchie | Nicht: viel Text mit wenig Struktur; Ja: wenige, klare, gewichtete Blöcke |

**Was das NICHT bedeutet:**
Eigene separate App-Oberfläche. Animationen als Ablenkung. Grafiken ohne Informationswert.

**ENTSCHEIDUNG:** Q3 wird als Designanforderung für alle neuen Seiten ab Phase B verbindlich mitgedacht. Kein eigenständiger Sprint, sondern Querschnittsanforderung.

---

## 10. MEHRSPRACHIGKEIT UND RENAMING

### ENTSCHEIDUNG — Mehrsprachigkeit: Architekturprinzip jetzt, Build-Auftrag Phase D

| Bereich | Maßnahme | Zeitpunkt |
|---------|----------|-----------|
| Datenbankfelder | Keine neuen hartkodierten deutschen Label-Felder; strukturell trennbar | Jetzt — Planungsprinzip |
| Tag- und Typ-Systeme | Nicht nur deutsche Strings, Schlüssel als neutrale IDs | Ab nächstem Schema-Change |
| Frontend-Labels | i18n-Vorbereitung (Schlüssel statt Strings, wo möglich) | Phase B/C |
| Operativer i18n-Build | DE → EN → weitere Sprachen | Phase D |

### ENTSCHEIDUNG — „VitalWissen" ist Arbeitsname

**ARBEITSHYPOTHESE:** Für öffentlichen Launch ist ein sprachübergreifend nutzbarer, kurzer, international anschlussfähiger Name zu entwickeln.
**Jetzt relevant:** nicht operativ branden. Domains/Social Media unter Arbeitstitel bleiben, aber keine Investition in langfristiges Brand-Building unter „VitalWissen".
**Nicht entscheidungsreif:** finales Naming.

---

## 11. PHASENLOGIK NEU

### ENTSCHEIDUNG — Neue klare Reihenfolge

#### Phase A — Architektur-/Strategie-Freeze (ABGESCHLOSSEN MIT DIESEM DOKUMENT)

- ✅ Produktkern definiert
- ✅ Interne Säulen vs. externe Produktbereiche getrennt
- ✅ Kernobjekte definiert
- ✅ Querschichten klassifiziert
- ✅ Kritische Säulen-Trennschärfe fixiert
- ✅ Phasenlogik neu festgezogen
- ✅ No-Gos definiert

#### Phase B — Kernplattform stabilisieren (direkt folgend)

Reihenfolge innerhalb Phase B:

1. **S4 / P7 weiter** (bereits in Arbeit, nächste Freigabe-Stufe: P7-02b OCR, P7-03 Anonymisierung, P7-04 LLM — je nach E07/E08-Engschnitt-Freigabe)
2. **Discovery-Basis** — Such-/Routing-Qualität verbessern, Startseite nicht nur statisch, erste "Was ist neu?"-Logik spezifizieren (kein Build ohne Spec)
3. **S3-Freeze** — Forschungs-/Navigator-Logik auf Basis neuer Trennschärfe schärfen, PubMed-Pipeline spezifizieren
4. **S18-Reset/Freeze** — Scope-Entscheidung (Grundlagen + Lebensmittel + E-Nummern + Alltagslogik), dann Build
5. **S6 Build** — Wirkstoff-Lexikon (DrugBank/OpenFDA anbinden)

#### Phase C — Forschung / Optionen / Maßnahmen

1. S3 Build
2. S15 als Modul (andockt an S2, S5, S18 — kein eigenständiger Navpunkt)
3. S8 präzisieren und bauen (Optionen-Logik, Studien-Radar, Spezialisten)
4. Erste Watchlists/Update-Layer (Q4+Q5)
5. S10, S11, S12 (Rechte, Steckbrief, Musterschreiben)
6. S16 App-Aggregator (DiGA-Liste als Anker)
7. S14 Influencer-Kompass

#### Phase D — Integrationen / persönlicher Raum

1. S9 Health Data Hub (E2E, Freemium)
2. Mail/OAuth-Integration
3. Wearables/Tracker
4. App-Interoperabilität (FHIR)
5. BYO-AI-Anbindung (Q9)
6. i18n operativ (DE → EN)
7. Verlaufshilfe Bildanalyse (vorsichtig, nur Dokumentation)

#### Phase E — Spätere Erweiterungen

1. S7 Community (erst nach Nutzerbasis)
2. S13 Crowd (nach Community-Basis)
3. S17 Arzt/Heilpraktiker-Matching (nach rechtlicher Klärung)
4. Produkt-/Warenkorb-Logik auf Marken-/Händlerebene
5. Fortgeschrittene Bildanalyse (falls rechtlich/fachlich vertretbar)
6. Renaming / internationales Branding

### Tabelle 5 — Phase-1 / Phase-2 / später

| Bereich | Phase A | Phase B | Phase C | Phase D | Phase E |
|---------|---------|---------|---------|---------|---------|
| S1, S2, S5 | Live ✅ | Vertiefung | — | — | — |
| S4 Arztbrief | Konzept fertig / P7 in Arbeit | P7-Stufen | — | S9-Anbindung | — |
| S3 Forschung | Freeze | Spec | Build | — | — |
| S6 Medikamente | — | Build | — | — | — |
| S18 Ernährung | Reset-Spec | Build | — | Personalisierung | — |
| S8 Navigator | — | Präzisierung | Build | — | — |
| S15 Zeitachse | — | — | Modul | — | — |
| S10/11/12 | — | — | Build | — | — |
| S14, S16 | — | — | Optional | — | — |
| Watchlists/Q4/Q5 | — | Spec | Build | — | — |
| Discovery/Suche | Vorhanden | Verbessern | Ausbau | — | — |
| S9 Health Hub | — | — | — | Build | — |
| Integrationen/BYO-AI | Prinzip | Prinzip | — | Build | — |
| S7, S13 | — | — | — | — | Build |
| S17 Matching | — | — | — | — | Build |
| Warenkorb/Marktplatz | — | — | — | — | Build |
| Bildanalyse (diag.) | NEIN | NEIN | NEIN | Verlauf nur | Vorsichtig |

---

## 12. KONSEQUENZEN FÜR CLAUDE / COWORK / QUELLENSYSTEM

### IST-ZUSTAND

`CLAUDE.md` verweist für Strategiefragen auf `VW_03_STATUS.md` und `VW_05_SAEULEN.md`. Das Reassessment-Dokument existiert seit 18.04.2026 als Delta-Quelle.

### ENTSCHEIDUNG — Rolle der Dokumente

| Dokument | Neue Rolle | Priorität |
|----------|-----------|-----------|
| `P7D_ARCHITECTURE_RESET_FREEZE.md` (dieses Dokument) | **Führende strategische Quelle** für Produktstruktur, Phasenlogik, Kernobjekte, Querschichten | 1 |
| `VW_04_ENTSCHEIDUNGEN.md` | Führend für getroffene Grundsatzentscheidungen (E01–E29) | 2 |
| `VW_03_STATUS.md` | Führend für operativen Sprint-Status | 2 |
| `VW_05_SAEULEN.md` | Führend für Säulen-Scope und Datenlogik | 3 |
| `VW_06_WEBSITE.md` | Führend für UX-/Website-Logik | 3 |
| `VITALWISSEN_STRATEGIE_REASSESSMENT_2026-04-18.md` | Historische Delta-Quelle; durch dieses Dokument operativ überführt | 4 |

### ENTSCHEIDUNG — Reicht das Reassessment als Delta-Quelle allein?

**Nein.** Das Reassessment ist ein Werkzeug-Dokument des Entwicklungsprozesses, nicht ein Freeze. Es enthält Arbeitshypothesen, Risiko-Abwägungen und Meinungen — keine bindenden Entscheidungen. **Dieses Dokument (P7D_ARCHITECTURE_RESET_FREEZE.md) überführt das Reassessment in bindende Struktur.**

### EMPFEHLUNG — Nachzug in CLAUDE.md (KEIN EDIT IN DIESEM PAKET)

Folgende Änderung sollte in einem separaten Nachfolgepakte in `CLAUDE.md` ergänzt werden:

1. Im Abschnitt "Führende Projektdokumente" den Eintrag für `P7D_ARCHITECTURE_RESET_FREEZE.md` hinzufügen mit Beschreibung: "Führendes Architektur-Freeze-Dokument (Produktstruktur, Phasenlogik, Kernobjekte, Querschichten)"
2. Für Strategiefragen: `P7D_ARCHITECTURE_RESET_FREEZE.md` als erste Lese-Empfehlung vor `VW_05_SAEULEN.md`

### ENTSCHEIDUNG — Künftige Lese-Reihenfolge für Strategiefragen

1. `P7D_ARCHITECTURE_RESET_FREEZE.md` ← neu führend
2. `VW_04_ENTSCHEIDUNGEN.md`
3. `VW_03_STATUS.md`
4. `VW_05_SAEULEN.md`
5. `VW_06_WEBSITE.md`

---

## 13. BEWUSST NICHT TUN

### Tabelle 6 — No-Gos (dauerhaft oder für Phase 1)

| Was | Warum nicht | Klassifikation |
|-----|-------------|----------------|
| Radiologische Zweitdiagnostik (MRT/CT/Röntgen) | Medizinrechtlich hochriskant, nicht seriös ohne klinischen Kontext | **Dauerhaftes No-Go (bis fundamentale Klärung)** |
| „Arzt hat etwas übersehen" als Produktversprechen | Haftung, Vertrauensverlust | **Dauerhaftes No-Go** |
| Automatische Therapieempfehlungen | Medizinrechtlich, inhaltlich nicht vertretbar | **Dauerhaftes No-Go** |
| KI-generierte Quellen ohne Verifikation | E28-Entscheidung: nur verlinkbare, professionell anerkannte Quellen | **Dauerhaftes No-Go** |
| Bezahltes Ranking in S17 | Vertrauenskern gefährdet | **Dauerhaftes No-Go** |
| Eigenes Modelltraining Phase 1 | E06-Entscheidung | **Phase-1-No-Go** |
| Cloud-OCR für Arztbriefe (ohne Zero-Retention-Nachweis) | E07/E08-Entscheidung | **Bis E07/E08-Engschnitt freigegeben** |
| Große Community ohne Moderationsmodell | Haftung, Qualitätsrisiko | **Phase-E-Bedingung** |
| Produkt-/Warenkorb-Logik mit konkreten Händlern | Erst nach Bewertungslogik, nicht vor Phase E | **Phase-E** |
| Good-News-Logik / einseitiger Positiv-Feed | Vertrauensschaden, falsche Erwartung | **Dauerhaftes No-Go als Alleinlogik** |
| Vollpersonalisierung ohne Opt-in und klares Datenschutzmodell | E07, E08, E10, E11 | **Vor S9-Build** |
| Schnelles Umbenennen/Rebranding | Arbeitsname bleibt, Naming-Track erst Phase D/E | **Noch nicht entscheidungsreif** |

---

## 14. VALIDATOR

Abschluss-Check gegen die 12 Pflicht-Punkte:

| # | Validator-Frage | Ergebnis |
|---|----------------|----------|
| 1 | Ist-Zustand und neue Richtung sauber getrennt? | ✅ Jeder Abschnitt enthält explizites IST-ZUSTAND-Feld |
| 2 | Interne Säulen vs. externe Produktbereiche klar entschieden? | ✅ Tabelle 1 vollständig (18 Säulen → 5 externe Bereiche) |
| 3 | Kernobjekte vollständig und sinnvoll definiert? | ✅ Tabelle 2: 11 Objekte, Rolle/Phase/Sonderrolle dokumentiert |
| 4 | Querschichten sauber klassifiziert? | ✅ Tabelle 3: 10 Querschichten mit Relevanz und Abhängigkeiten |
| 5 | S3/S5/S8/S15/S17/S18 trennscharf genug? | ✅ Tabelle 4: je Kernaufgabe, Nicht-Scope, Einordnung, Überschneidungen |
| 6 | Discovery-/Update-Layer als Plattformschicht (nicht Newsroom)? | ✅ Abschnitt 6: objekt-gebunden, Entwicklungstypen-Tabelle |
| 7 | App / Integrationen / BYO-AI sauber eingeordnet? | ✅ Abschnitt 7: Prinzip jetzt / Build Phase D getrennt |
| 8 | Bildanalyse vorsichtig und korrekt begrenzt? | ✅ Abschnitt 8: zwei Ebenen, radiologische Diagnostik = No-Go |
| 9 | Visuelle Einfachheit als Produktlogik (nicht Dekoration)? | ✅ Abschnitt 9: Q3 als Querschicht, Designanforderung ab Phase B |
| 10 | Klare Phasenreihenfolge A–E? | ✅ Abschnitt 11 + Tabelle 5 |
| 11 | Klare No-Gos? | ✅ Tabelle 6 mit Klassifikation |
| 12 | Keine Writes/Commits/Pushes/Deploys ausgelöst? | ✅ Nur Datei-Write dieses Dokuments, kein DB/Commit/Push/Deploy |

---

## 15. OPS CLOSURE

### Inhaltlich

Dieses Dokument wurde als neue führende strategische Arbeitsgrundlage erstellt. Es überführt das Reassessment-Dokument vom 18.04.2026 in eine bindende Freeze-Struktur mit 7 Pflichttabellen, klaren Entscheidungen, expliziten No-Gos und einer Phasenlogik A–E. Alle 12 Validator-Punkte grün. Keine Strategiedrift gegenüber bestehenden Entscheidungen E01–E29.

### Technisch angewendet

- **Neue Datei:** `01_PROJECT_SOURCES_CURRENT/P7D_ARCHITECTURE_RESET_FREEZE.md` ✅ erstellt
- **DB-Write:** keiner
- **Commit:** keiner
- **Push:** keiner
- **Deploy:** keins
- **Offener Side Effect:** keiner

### Operativ abgesichert

- Nächster freigegebener Schritt: **CLAUDE.md-Nachzug** (P7D in Führende-Dokumente-Tabelle eintragen) — separates Paket
- Nächster freigegebener Build-Schritt: **P7 / S4 weiter** (Phase B, bestehende Freigaben gelten)
- Dieses Dokument ist **kein Build-Auftrag** und enthält **keine operative Freigabe**.

---

*Erstellt: 18.04.2026 — P7D Architecture Reset Freeze abgeschlossen.*
*Führende strategische Quelle ab diesem Datum: dieses Dokument.*
