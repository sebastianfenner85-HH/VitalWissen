## S1 — Laborwert-Lexikon ✅
Kernidee:
- Laborwerte verständlich erklären
- internationaler Vergleich DE / USA / JP
- Zusammenhänge zwischen Werten als Killer-Feature

Scope:
- ca. 200 LOINC-Werte
- Blut, Urin, Stuhl, Speichel

3-Leitlinien-Vergleich:
- DE: DGKL
- USA: AACC
- JP: JSCC via PubMed

UI / Inhalt:
- Kachelansicht → Detailansicht
- Regler-System für 3 Leitlinien
- SI-Einheitenumrechnung
- Beschreibung laienhaft
- Zusammenhänge
- Ursachen hoch / niedrig
- Wann Arzt
- Standard-Panel-Hinweis
- Was tun → Verknüpfung zu S2

Ergänzungen:
- Trend-Analyse (S9)
- Medikamenteneinfluss bidirektional (S6)
- Notfall-Flag
- Zyklusabhängigkeit
- Kinderwerte per Toggle

DB-Schema:
laborwerte_referenzen(
  loinc_code PK,
  referenz_de_*, referenz_usa_*, referenz_jp_*,
  referenz_kinder JSONB,
  gender_context JSONB,
  zusammenhaenge JSONB,
  medikamenten_einfluss JSONB,
  notfall_flag BOOLEAN,
  schema_org JSONB,
  letzte_aktualisierung TIMESTAMP
)

Datenquellen:
- LOINC
- DGKL / BfArM
- AACC / Medscape
- JSCC via PubMed

Vernetzung:
- S2, S6, S9, S18

## S2 — Supplement-Kompass ✅
Kernidee:
- evidenzbasierte Supplement-Infos auf Deutsch
- kein Affiliate
- Fokus auf Wirkung, Dosierung, Form, Qualität

Scope:
- 150 Supplements
- MVP: Tier 1 + Tier 2, ca. 100 Einträge

3-Tier-System:
- Tier 1: NIH ODS API
- Tier 2: PubMed / Reviews / strukturierte Quellen
- Tier 3: Wikipedia-basiert, vorerst zurückgestellt

7 Punkte:
1. Wofür
2. Dosierung (BfR / NIH / EFSA)
3. Formen / Bioverfügbarkeit
4. Timing
5. Kombinationen / Antagonismen
6. Qualitätskriterien
7. Studien

Ergänzungen:
- Biomarker-Bezug zu S1
- Kinderdosierungen
- Zyklusbezug
- Verknüpfung zu S15

Datenquellen:
- NIH ODS API
- NIH DSLD
- PubMed
- Epistemonikos
- BfR
- EFSA

Vernetzung:
- S1, S3, S6, S15, S18

## S3 — Studienkompass ✅
Kernidee:
- PubMed-Studien auf Deutsch erklären
- Meta-Analysen priorisieren
- Schlagzeilen-Check als Killer-Feature

Scope:
- ca. 200–300 Studien im MVP

6 Punkte pro Studie:
1. Was wurde untersucht
2. Ergebnis
3. Studientyp-Ampel
4. Einschränkungen
5. Alltagsbezug
6. Originalquelle

Pflichtfeld:
- Frauenanteil
- Altersrange

Ergänzungen:
- Retraction-Check
- Interessenkonflikt-Flag
- Zitationsanzahl
- Replikationsstatus

Datenquellen:
- PubMed
- PMC
- Cochrane (Zugangsweg noch zu prüfen)
- Epistemonikos
- EuropePMC
- RetractionWatch
- OpenCitations

Vernetzung:
- S1, S2, S5, S6

## S4 — Arztbrief-Decoder ✅
Kernidee:
- Arztbriefe, Befunde, Entlassbriefe verständlich dekodieren
- starker USP
- Zero Retention

Input:
- PDF / Foto / Text

Output:
- Parallelansicht oder Fließtext
- Inline-Erklärungen
- Zusammenfassung
- Rückfragen nach Dekodierung
- Links zu ICD, Laborwerten, Medikamenten

Tech:
- Tesseract
- Google Vision API
- spaCy + german-medbert
- Claude API

DSGVO:
- Anonymisierung vor API-Call
- keine Speicherung als Standard
- Zero Retention

Ergänzungen:
- Handschrift
- mehrsprachige Briefe
- Notfall-Flag

Vernetzung:
- S1, S5, S6, S8, S11
- optional S9 in Phase 2

## S5 — Krankheits-Lexikon ✅
Kernidee:
- inhaltliches Herzstück
- Krankheiten nicht nur definieren, sondern verknüpfen

Scope:
- ca. 500 Einträge im MVP

Zwei Einstiege:
- Diagnose
- Symptom

3 Sprachebenen:
- Sehr Einfach
- Laienhaft
- Fachlich

7 Punkte:
1. Was ist das
2. Symptome / Warnsignale
3. Diagnostik
4. Behandlung
5. Prognose
6. Leben mit der Erkrankung
7. Weiterführend

Ergänzungen:
- Komorbiditäts-Mapping
- Patientenreise
- Genetik-Hinweis
- Kosten / Erstattung
- Notfall-Flag
- geschlechtsspezifische Besonderheiten

Phase 2:
- Pro-Layer / B2B

Automatisierung:
- ca. 60–70 % Schätzung
- Review-Prozess nötig

Datenquellen:
- AWMF
- MedlinePlus
- ICD-10-GM
- PubMed
- Orphanet
- RKI
- NIH Women's Health

Vernetzung:
- S1, S2, S3, S8, S11, S18

## S6 — Medikamenten-Erklärer ✅
Kernidee:
- wirkstoffbasiert
- ca. 500 Wirkstoffe
- Beipackzettel-Decoder + Interaktionslogik + Alternativen

Kernfunktionen:
1. Wirkstoff-Lexikon
2. Beipackzettel-Decoder
3. Interaktions-Checker

7 Punkte:
1. Was ist das
2. Einnahme
3. Nebenwirkungen
4. Medikament-Medikament-Interaktionen
5. Medikament-Supplement-Interaktionen
6. Generika / Alternativen
7. Quellen / Zulassung

Ergänzungen:
- Polypharmazie-Checker
- Nahrungsmittel-Interaktionen
- Geschlechts-/Zyklusaspekte
- Kinderdosierungen
- Kosten / Festbeträge
- EU/UK-Verfügbarkeitsmatrix
- Formulierungsalternativen

Datenquellen:
- DrugBank
- OpenFDA
- DailyMed
- EMA API
- SIDER
- STITCH
- PubChem
- FDA FAERS
- USDA FoodData Central

Vernetzung:
- S2, S3, S5, S18

## S7 — Community ✅
Kernidee:
- Diagnose-Gruppen
- Themen-Räume
- Q&A

Moderation:
- KI-Filter + Community + Redaktion

Intelligence Layer:
- KI liest passiv mit
- Reports zu Fehlermeldungen, Content-Gaps, Feature-Wünschen
- Qualitäts-Decay-Detection

Gender-/Zielgruppenräume:
- Frauengesundheit
- Männergesundheit
- Kindergesundheit / Eltern

Phase-Logik:
- MVP mit häufigen Erkrankungen
- später Vollausbau
- langfristig Anbindung an S13

Tech:
- Discourse oder Eigenentwicklung (offen)

Vernetzung:
- S1, S2, S5, S6, S13

## S8 — Diagnose-Navigator ✅
Kernidee:
- S5 erklärt
- S8 hilft bei den nächsten konkreten Schritten

6 Bereiche:
1. Behandlungsstandard
2. Alternativen
3. Aktuelle Forschung
4. Klinische Studien
5. Spezialisten
6. Zweitmeinung

Studien-Radar:
- PLZ + Diagnose
- aktuelle rekrutierende Studien
- täglicher Sync

Spezialisten-Ranking:
- Status: ARBEITSHYPOTHESE
- vorgeschlagene Gewichtung:
  - Fallzahl 30 %
  - Zertifizierungen 25 %
  - Forschungsaktivität 15 %
  - Kommunikation 15 %
  - Erreichbarkeit / Logistik 10 %
- harte Filter zuerst:
  - Sprache
  - Kasse
  - Gender-Präferenz
  - PLZ-Umkreis
- vor Implementierung validieren

Stufen:
- Lokal DE
- National DE
- EU / ERN / AT / CH
- International

Ergänzungen:
- Rehabilitation
- Kosten / Erstattung
- Musteranfragen über S12

DSGVO:
- Client-side
- kein Server-Log

Datenquellen:
- AWMF
- ClinicalTrials.gov
- EU Clinical Trials
- DRKS
- DKG
- ERN
- Orphanet
- IGeL-Monitor

Vernetzung:
- S5, S4, S6, S11, S12, S17

## S9 — Health Data Hub ✅
Kernidee:
- persönlicher Gesundheitsraum
- freiwillig, opt-in, nutzerkontrolliert
- Phase 2

Inhalte:
- Arztbriefe
- Laborbefunde
- Bildgebung
- Medikamentenpläne
- Impfpass
- Messwerte
- Wearables
- Ernährung / Lifestyle

Killer-Feature:
- Mail-Verknüpfung via OAuth
- Erkennung von Gesundheitsdokumenten
- automatische Zuordnung / Dekodierung / Verknüpfung

Familienkonten:
- Eltern für Kinder
- Erwachsene Kinder für Eltern mit Vollmacht
- Partner teilen selektiv

Sicherheit:
- E2E-Verschlüsselung
- aktuell mit AES-256 gedacht
- Serverstandort DE/EU
- Löschung / Export
- FHIR R4 als Planungsprinzip

Monetarisierung:
- AKTUELLER KONZEPTSTAND
- Basis kostenlos
- Premium ca. 4–8 €/Monat
- genaue Grenzen wie 50 Dokumente / 500 MB = Arbeitshypothese, nicht final

Vernetzung:
- S4, S1, S5, S8, S11

## S10 — Datenschutz & Rechte ✅
Kernidee:
- Patientenrechte verständlich und handlungsbereit aufbereiten

5 Blöcke:
1. Akteneinsicht (§630g BGB)
2. Patientenquittung (§305 SGB V)
3. ePA
4. PKV-Wechsel / Datenabruf
5. weitere Rechte / Zweitmeinung / Fehlerwege / Patientenverfügung

Wichtiger Hinweis:
- konkrete Fristen, Zeiträume und operative Rechtsdetails vor Veröffentlichung
  gegen aktuellen Gesetzestext prüfen
- rechtlicher Content braucht Review

Automatisierung:
- ca. 50–60 % Schätzung

Datenquellen:
- gesetze-im-internet.de
- BfDI
- BMG
- Patientenbeauftragter
- Verbraucherzentrale

Vernetzung:
- S11, S12

## S11 — Patienten-Steckbrief ✅
Kernidee:
- strukturierter Generator für Arzt- / Spezialistenbesuche

Output:
- PDF oder digital

Felder:
- Basisdaten
- aktuelle Situation
- Medikamente + Supplements + Allergien
- Vorerkrankungen / OPs
- Familienanamnese als Pflichtfeld
- aktuelle Laborwerte
- Lifestyle-Kontext
- offene Fragen

Vorausfüllung:
1. manuell
2. aus S4
3. aus S9 in Phase 2

DSGVO:
- client-side
- kein Server-Speicher als Standard

Vernetzung:
- S4, S12, S8

## S12 — Musterschreiben ✅
Kernidee:
- rechtssichere Vorlagen
- Vorausfüllung aus S11

Gruppen:
1. Arzt
2. Krankenkasse
3. ePA
4. Zweitmeinung
5. Beschwerden

Umfang:
- 20 Vorlagen

Aufbau jeder Vorlage:
- Rechtsgrundlage
- Wann nutzen
- Vorlage
- Ausfüllhilfe
- Was beilegen
- Wohin schicken
- Was danach passiert

Monitoring:
- Change Detection auf Gesetzesänderungen

Vernetzung:
- S11

## S13 — Gesundheitsagenten & Crowd ✅
Kernidee:
- wenn Lexika allein nicht reichen
- Struktur, Überblick, Begleitung, Vorbereitung

Teil A — Agent (Phase 1)
- neutrale KI
- keine Diagnosen
- keine Therapieempfehlungen
- schaut quer über Säulen
- auch psychische Gesundheit
- kann mit Claude API direkt starten
- kann bei Opt-in Kontext aus S9 nutzen

Teil B — Crowd (Phase 2)
- für schwere / unklare / seltene Fälle
- strukturierte Fallbeschreibung
- Anonymisierung + Moderation
- Experten- und Laien-Tier
- KI aggregiert Einschätzungen
- Report mit Verknüpfung zu S8

Incentivierung:
- offen
- Reputation / Qualitäts-Score denkbar
- CME-/Kammer-Kooperation nur Phase-3-Idee

Vernetzung:
- S5, S7, S8, S11

## S14 — Influencer-Kompass ✅
Kernidee:
- Claim-zentriert, nicht Personen-zentriert
- Gesundheitsbehauptungen aus Social Media / Podcasts mit Evidenz-Ampel einordnen
- keine Personen-Bewertung, keine Personen-Namen in der DB
- USP: kein deutschsprachiges Tool verbindet Health-Claims systematisch
  mit strukturierter Evidenzbasis

Scope:
- 150–200 Claims im MVP (kuratiert, häufig geteilt)
- Fokus: Supplements, Ernährung, Lifestyle
- kein automatisches Social-Media-Monitoring im MVP

7 Punkte pro Eintrag:
1. Die Behauptung (wortgetreue Formulierung)
2. Evidenz-Ampel (Stark / Moderat / Schwach / Widersprüchlich / Keine)
3. Was die Forschung sagt (laienhaft, 2–3 Sätze)
4. Häufige Missverständnisse
5. Einschränkungen (Zielgruppe, Vorerkrankung)
6. Quellen (PubMed-IDs, Cochrane, BfR/EFSA)
7. Verwandte Claims

Evidenz-Ampel:
- identische Logik wie S2
- Ampel bezieht sich auf den spezifischen Claim, nicht den Wirkstoff generell

Einstiegswege:
- Suche via semantischer Suche (pgvector)
- Browse nach Themencluster (Supplements, Diäten, Bewegung, Schlaf, Detox)
- Trend-Radar: 10 aktuell meistgesuchte Claims (manuell kuratiert im MVP)

Automatisierung:
- ca. 50–60 % Schätzung
- Ampel-Vergabe: manueller Review zwingend (Fehler sind öffentlich sichtbar)
- Quellen-Linking zu S2/S3: ca. 80 % (gleiche DB-Logik)

Rechtlicher Rahmen:
- keine Personennamen in der Datenbank
- Disclaimer: Aussagen werden bewertet, nicht Personen
- hoher Review-Standard vor Veröffentlichung

Datenquellen:
- PubMed E-utilities
- Cochrane (Zugangsweg wie S3 prüfen)
- BfR / EFSA
- S2- und S3-Datenbasis (intern, Wiederverwendung)
- OpenFDA / EMA

Offene Punkte:
- Claim-Eingabe durch Nutzer (moderierter Vorschlag denkbar, aber heikel)
- Social-Media-Monitoring Phase 2 (technisch und rechtlich klären)
- Aktualisierungsrhythmus Trend-Radar
- Cochrane-Zugang (identisches Problem wie S3)

Vernetzung:
- S2, S3 (primär)
- S7 (Community meldet Claims)
- S5 (Mythos-Block auf Krankheitsseiten, Phase 2)
- S18 (Ernährungs-Claims verlinken zu S18)

## S15 — Wirksamkeit & Zeitachse ✅
Kernidee:
- welche Maßnahme bringt was, wann, woran messbar
- Fokus auf konkrete Kausalität statt allgemeine Ratschläge
- Zeitdimension als zentrales Differenzierungsmerkmal

Scope:
- 80–120 Einträge im MVP
- Fokus: Supplements, Ernährungsumstellungen, Bewegungsinterventionen, Schlafhygiene
- keine Medikamente (Haftung, Komplexität — bleibt S6)

Eintrags-Struktur (pro Maßnahme):
1. Die Maßnahme (konkret und präzise formuliert)
2. Für wen relevant (Zielgruppe, Voraussetzungen, Kontraindikationen)
3. Zeitachse in drei Phasen:
   - Kurzfristig (Tage–2 Wochen)
   - Mittelfristig (2–8 Wochen)
   - Langfristig (3–12 Monate)
4. Woran messbar (subjektiv + objektiv / Biomarker → S1)
5. Evidenzgrad (gleiche Ampel-Logik wie S2/S14)
6. Typische Fehler (warum es oft nicht wirkt)
7. Quellen (PubMed-IDs)

Killer-Feature:
- visuelle Zeitleiste pro Maßnahme
- zeigt frühe / Haupt- / Langzeiteffekte scanbar und motivierend

Automatisierung:
- Basis-Extraktion aus Papers: ~80 %
- Zeitachsen-Strukturierung: ~70 %
- Biomarker-Verknüpfung zu S1: ~85 %
- Visualisierung: automatisch aus Daten (frontend-seitig)
- Gesamt: ~75–80 %

Datenquellen:
- PubMed E-utilities
- Cochrane (Zugangsweg prüfen)
- NIH ODS
- EFSA / BfR
- S2-Datenbasis (intern, Wiederverwendung)

Offene Punkte:
- Granularität der Zeitachse: wie viele Phasen sinnvoll
- Disclaimer-Logik für hohe individuelle Variabilität definieren
- Abgrenzung zu S2 in der UX klar halten (S15 = Wann, S2 = Was/Wie)
- S18-Anbindung abhängig von S18-Scope

Vernetzung:
- S2 (Supplement-Detailseite verlinkt zu S15 und zurück)
- S1 (Biomarker als Messindikator)
- S5 (Krankheitsseite: empfohlene Maßnahmen mit Zeitachse)
- S18 (Ernährungsmaßnahmen mit Zeitachse)

## S16 — App-Aggregator ✅
Kernidee:
- kuratierter Wegweiser zu seriösen Gesundheits-Apps
- kein Nachbau von Bestehendem
- Schwerpunkt auf DiGA, datenschutzkonformen und klinisch validierten Apps

Scope:
- 80–120 kuratierte Apps im MVP
- Kategorien: Symptomchecker, Chronische Erkrankungen, Mentale Gesundheit,
  Frauen-/Zyklusgesundheit, Blutdruck/Herz, Ernährung, Schlaf, Hautscreening
- DiGA-Liste vollständig abgedeckt (aktuell ~50 zugelassene DiGA)
- kein eigenes Bewertungssystem im MVP

Eintrags-Struktur (pro App):
1. Was macht die App (ein Satz, laienhaft)
2. Kategorie
3. Qualitäts-Badge:
   - DiGA — offiziell zugelassen, erstattungsfähig
   - Klinisch validiert — Studie vorhanden
   - Datenschutz-geprüft — DSGVO-konform, kein Datenverkauf
   - Eingeschränkt — Mängel bekannt
4. Datenschutz-Kurzcheck (wo liegen Daten, was wird weitergegeben)
5. Kosten (kostenlos / Freemium / Abo / auf Rezept)
6. Für wen geeignet (Zielgruppe, iOS/Android)
7. Verwandte Apps / Alternativen
8. Verknüpfung → S5 / S8

Killer-Feature:
- DiGA als Anker: vollständige BfArM-Liste mit Laien-Erklärung
- wer zahlt (GKV/PKV), wie kommt man ran (Rezept)
- welche Diagnose → welche DiGA → direkter Link zu S5

Automatisierung:
- DiGA-Basisdaten aus BfArM: ~90 %
- App-Basisdaten (Name, Kategorie, Kosten): ~80 %
- Datenschutz-Check: ~30 % (manuell, nicht automatisierbar)
- Qualitäts-Badge-Vergabe: ~50 %
- ICD-Verknüpfung zu S5: ~75 %
- Gesamt: ~65–70 %

Datenquellen:
- BfArM DiGA-Verzeichnis
- Google Play / App Store (öffentliche Basisdaten)
- Datenschutzerklärungen der Apps (manuell)
- MiData / AppChecker (prüfen)
- IGeL-Monitor

Offene Punkte:
- Aktualisierungsrhythmus klären (DiGA monatlich, App-Updates schwerer zu tracken)
- Haftungsfrage bei empfohlenen Apps — Disclaimer-Standard definieren
- Community-Empfehlungen: moderierter Vorschlagsprozess definieren
- MiData / AppChecker als externe Datenschutz-Quelle prüfen

Vernetzung:
- S5 (Krankheitsseite: empfohlene Apps je Diagnose)
- S8 (Diagnose-Navigator: digitale Begleittools)
- S7 (Community empfiehlt Apps, moderiert kuratiert)

## S17 — Arzt/Heilpraktiker-Matching ✅
Kernidee:
- kein Arztverzeichnis, sondern situationsbasiertes Matching
- wer passt zu meiner Diagnose, meinen Präferenzen, meinem Kommunikationsstil,
  meiner Versicherung, meinem Ort
- Schulmedizin und seriöse Alternativmedizin gleichberechtigt,
  mit klarer Transparenz über Evidenzlage
- kein bezahltes Ranking

Scope:
- Schulmedizin: Hausärzte + häufige Fachrichtungen
  (Kardiologie, Neurologie, Gynäkologie, Psychiatrie, Orthopädie)
- Alternativmedizin: Heilpraktiker, Osteopathie, Physiotherapie
  (nur seriös kuratierte Einträge)
- Geografischer Fokus: DACH
- MVP: Aggregation aus bestehenden Quellen, kein eigener Datenbestand

Matching-Logik:
Schritt 1 — Harte Filter (Pflicht):
- Kassentyp (GKV / PKV / Selbstzahler)
- PLZ-Umkreis
- Fachrichtung / Themengebiet
- Sprache

Schritt 2 — Weiche Präferenzen (optional):
- Kommunikationsstil: erklärt viel / direkt und knapp / empathisch
- Geschlecht der behandelnden Person
- Altersgruppe der behandelnden Person (jung / erfahren / keine Präferenz)
- Erfahrung mit spezifischer Diagnose
- Barrierefreiheit
- Telemedizin möglich

Schritt 3 — Exzellenz-Layer (optional, aktivierbar bei schweren Erkrankungen):
- Publikationen / Paper (PubMed-Autorschaft)
- Lehrstuhl / Universitätsklinik-Anbindung
- Vorstandspositionen in Fachgesellschaften
- Zertifizierungen (DKG, DGK etc.)
- Leitlinien-Beteiligung (AWMF-Autorenschaft)

Hinweis: Exzellenz-Layer ist optionaler Modus, nicht Standard-Ansicht.
Label: "Für komplexe Erkrankungen" oder "Experten-Modus".

Heilpraktiker-Integration:
- weder pauschal ablehnen noch unkritisch empfehlen
- Evidenz-Hinweis zur Methode (Link zu S14 / S2)
- Zertifizierungen / Verbandszugehörigkeit
- Disclaimer: Methode hat [starke / eingeschränkte / keine] wissenschaftliche Evidenz
- nicht gelistet: Anbieter ohne nachweisbare Ausbildung,
  Anbieter mit aktiven Beschwerden, pseudomedizinische Hochrisiko-Methoden

Eintrags-Struktur (pro Anbieter):
1. Name + Fachrichtung
2. Typ (Arzt / Facharzt / Heilpraktiker / Physiotherapeut etc.)
3. Matching-Score (wie gut passt er zu den gesetzten Filtern)
4. Praxis-Infos (Adresse, Telemedizin, Wartezeit wenn bekannt)
5. Kasseninfo (GKV / PKV / Selbstzahler)
6. Kommunikationsstil (aus Bewertungen aggregiert)
7. Evidenz-Hinweis (nur bei Alternativmedizin)
8. Quellen / Bewertungen (aggregiert, keine eigene Bewertungsplattform)

Automatisierung:
- Basis-Datenaggregation (KBV etc.): ~85 %
- Fachrichtungs-/ICD-Mapping: ~75 %
- Kommunikationsstil-Extraktion: ~50 %
- Heilpraktiker-Kuration: ~40 % (manueller Review zwingend)
- Evidenz-Hinweis-Verlinkung: ~80 %
- Exzellenz-Layer (PubMed-Autorschaft, AWMF): ~70 %
- Gesamt: ~70–75 %

Datenquellen:
- KBV / KV-Arztsuche
- Bundesärztekammer
- Heilpraktiker-Verbände (VDH, BDH)
- Google Maps API
- PubMed Autor-API (Exzellenz-Layer)
- AWMF-Datenbank (Leitlinien-Autorenschaft)
- Universitätsklinik-Websites (Scraping, Exzellenz-Layer)

Offene Punkte:
- Rechtliche Prüfung: Darf VitalWissen Ärzte ohne Zustimmung listen
- Bewertungslogik: eigene Bewertungen aufbauen oder nur aggregieren
- Kommunikationsstil-Daten: woher in Phase 1 ohne eigene Nutzerbasis
- Aktualisierungsfrequenz: Arztdaten ändern sich häufig
- Abgrenzung S8 in der UX klar machen

Vernetzung:
- S8 (Spezialisten für komplexe Fälle → S8 übernimmt)
- S14 (Methoden-Evidenz bei Heilpraktikern)
- S5 (Krankheitsseite: passende Fachrichtung)
- S11 (Patienten-Steckbrief: Arztbesuch vorbereiten)

## S18 — Ernährungskompass ✅
Kernidee:
- evidenzbasierte Ernährungs-Wissensdatenbank
- kein Rezeptportal, kein Diät-Guide
- Fokus auf Nährstoffe, Lebensmittel, Ernährungsmuster und deren Wirkung
  auf Gesundheit, Biomarker und Erkrankungen

Scope:
- drei Ebenen: Nährstoff-Lexikon / Lebensmittel-Kompass / Ernährungsmuster
- MVP: Nährstoff-Lexikon vollständig + häufige Lebensmittelgruppen +
  wichtigste Ernährungsmuster
- keine Rezepte im MVP

Drei Ebenen:

Ebene 1 — Nährstoff-Lexikon:
- Vitamine, Mineralstoffe, Makronährstoffe, sekundäre Pflanzenstoffe
- Tagesbedarf (DGE / EFSA / NIH als Regler, analog S2)
- Mangel / Überschuss / Upper Limit
- beste Nahrungsquellen
- Biomarker-Verknüpfung → S1
- Supplement-Alternative → S2

Ebene 2 — Lebensmittel-Kompass:
- Nährwertprofil
- gesundheitlicher Nutzen / Risiken (evidenzbasiert)
- Wechselwirkungen mit Medikamenten → S6
- Für wen besonders relevant (Schwangerschaft, Senioren, Kinder)

Ebene 3 — Ernährungsmuster:
- Mediterrane Ernährung, DASH, Low-Carb, Intervallfasten etc.
- Evidenz-Ampel (gleiche Logik wie S2/S14)
- für welche Erkrankungen relevant → S5
- praktische Prinzipien (kein Rezept)

Eintrags-Struktur Nährstoff (7 Punkte):
1. Was ist das (laienhaft)
2. Tagesbedarf (DGE / EFSA / NIH als Regler)
3. Beste Quellen (Top 5 Lebensmittel mit Mengenangabe)
4. Mangel (Symptome, Risikogruppen, Laborwert → S1)
5. Überschuss (ab wann problematisch, Upper Limit)
6. Erkrankungs-Bezug → S5
7. Supplement-Alternative → S2

Killer-Feature:
- Diagnose-Ernährungs-Verknüpfung bidirektional mit S5
- Beispiele: Bluthochdruck → DASH / Natriumreduktion / Kalium
            Hypothyreose → Jod / Selen / goitrogene Lebensmittel
            Eisenmangel → Häm-Eisen vs. Non-Häm-Eisen / Vitamin-C-Kombination

Automatisierung:
- Nährstoff-Basisdaten (DGE/EFSA/NIH): ~85 %
- Lebensmittel-Nährwertdaten (USDA): ~90 %
- Ernährungsmuster-Evidenz aus PubMed: ~65 %
- Diagnose-Ernährungs-Mapping: ~70 %
- Medikament-Lebensmittel-Interaktionen: ~60 % (Wiederverwendung S6)
- Gesamt: ~75–80 %

Datenquellen:
- DGE API / Referenzwerte
- EFSA DRVs
- NIH ODS
- USDA FoodData Central
- PubMed E-utilities
- Cochrane (Zugangsweg prüfen)
- BfR

Offene Punkte:
- DGE API: Verfügbarkeit und Nutzungsbedingungen prüfen
- Rezept-Feature: bewusst ausgeschlossen im MVP, Phase 2 möglich
- Personalisierung via S9-Daten: Phase 2
- Vegane / allergiebedingte Filter: Scope-Entscheidung für MVP
- Kindernährstoffbedarf: explizit einbauen oder Toggle wie S1

Vernetzung:
- S1 (Nährstoff beeinflusst Laborwert — bidirektional)
- S2 (Supplement als Alternative zu Nährstoff aus Nahrung — bidirektional)
- S5 (Ernährung bei Erkrankung — bidirektional)
- S6 (Lebensmittel-Medikament-Interaktionen)
- S14 (Ernährungs-Claims verlinken zu S18)
- S15 (Wirksamkeit & Zeitachse: wann wirkt Ernährungsumstellung)
