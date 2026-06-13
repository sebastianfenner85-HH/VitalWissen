Status: Aktueller Konzeptstand
Letzte Aktualisierung: März 2026

---

## Grundprinzip

S5 Krankheits-Lexikon ist der primäre Content-Hub.
Alle anderen Content-Säulen (S1, S2, S6) sind über
eingebettete Cross-Säulen-Blöcke mit S5 verbunden.
S9 ist keine Inhaltsseite, sondern eine
Personalisierungs-Datenschicht (Phase 2, nicht im MVP).

---

## Einstiegspfade

Universale Suchleiste auf Startseite — Routing je Eingabetyp:
- Symptom (Freitext) → S5 Trefferliste → S5 Detailseite
- Diagnose (ICD-Code oder Freitext) → S5 Detailseite direkt
- Laborwert → S1 Detailseite
- Supplement → S2 Detailseite
- Wirkstoff / Medikament → S6 Detailseite
- Nährstoff / Lebensmittel → S18 Detailseite
- Gesundheitsclaim (z.B. aus Social Media) → S14 Detailseite

---

## S5 — Detailseiten-Aufbau

7 inhaltliche Blöcke:
1. Was ist das
2. Symptome / Warnsignale
3. Diagnostik
4. Behandlung
5. Prognose
6. Leben mit der Erkrankung
7. Weiterführend

3 eingebettete Cross-Säulen-Blöcke (fest auf jeder Diagnose-Seite):
- Block "Laborwerte überwachen" → S1 Detailseite(n)
- Block "Evidenzbasierte Supplements" → S2 Detailseite(n)
- Block "Standardmedikamente" → S6 Detailseite(n)

Geplanter 4. Cross-Block (Phase 2):
- Block "Ernährung bei dieser Erkrankung" → S18 Detailseite(n)

Weitere Merkmale:
- Notfall-Flag aktiv und prominent (kein Footer-Hinweis)
- 3 Sprachebenen: Sehr Einfach · Laienhaft · Fachlich
- Komorbiditäts-Mapping (Phase 2)

OFFEN: Review-Prozess für 30–40 % manuellen Anteil nicht definiert
OFFEN: Filterlogik S5 → S2 (welche Supplements gehören
       zu welchem ICD-Code) nicht definiert
OFFEN: Filterlogik S5 → S18 (welche Ernährungsempfehlungen
       gehören zu welchem ICD-Code) nicht definiert

---

## S1 — Detailseiten-Aufbau

Inhalt:
- Referenzbereiche DE / USA / JP als Regler-System
- SI-Einheitenumrechnung
- Ursachen hoch / niedrig
- Wann-Arzt-Flag
- Kinderwerte per Toggle
- Zyklusabhängigkeit

2 eingebettete Cross-Säulen-Blöcke:
- Block "Supplements, die diesen Wert beeinflussen" → S2
- Block "Medikamente, die diesen Wert beeinflussen" → S6

OFFEN: JSCC-Extraktion technisch ungeklärt

---

## S2 — Detailseiten-Aufbau

Inhalt (7 Punkte):
1. Wofür
2. Dosierung (3 Regler: BfR / NIH / EFSA)
3. Formen & Bioverfügbarkeit
4. Timing
5. Kombinationen / Antagonismen
6. Qualitätskriterien
7. Studien

Plus: Evidenz-Ampel

2 eingebettete Cross-Säulen-Blöcke:
- Block "Biomarker" (welche Laborwerte verändert
  dieses Supplement) → S1
- Block "Medikamenten-Interaktionen" → S6

---

## S6 — Detailseiten-Aufbau

Kernfunktionen: Wirkstoff-Lexikon · Beipackzettel-Decoder ·
Interaktions-Checker

Inhalt (7 Punkte):
1. Was ist das
2. Einnahme
3. Nebenwirkungen
4. Medikament–Medikament-Interaktionen
5. Medikament–Supplement-Interaktionen
6. Generika / Alternativen
7. Quellen / Zulassung

2 eingebettete Cross-Säulen-Blöcke:
- Block "Laborwerte, die dieser Wirkstoff beeinflusst" → S1
- Block "Supplement-Interaktionen" → S2

OFFEN: DrugBank Free-Tier Umfang zu prüfen

---

## S18 — Detailseiten-Aufbau (Aktueller Konzeptstand)

Drei Einstiegsebenen mit eigenen Detailseiten:
- Nährstoff-Detailseite (z.B. Magnesium, Vitamin D)
- Lebensmittel-Detailseite (z.B. Hülsenfrüchte, Lachs)
- Ernährungsmuster-Detailseite (z.B. DASH, Mediterran)

2 eingebettete Cross-Säulen-Blöcke:
- Block "Relevante Laborwerte" → S1
- Block "Erkrankungen mit Ernährungsbezug" → S5

OFFEN: genaue Seitenstruktur und Cross-Block-Logik für S18 noch nicht
       vollständig spezifiziert

---

## Cross-Säulen-Verbindungen (S1 / S2 / S6)

Alle drei Verbindungen sind bidirektional.
Gleiche Datenbasis, zwei Leseperspektiven je Verbindung.

| Verbindung | Mechanismus | Block-Position |
|---|---|---|
| S1 ↔ S2 | Biomarker-Block | je 1 Block auf S1- und S2-Detailseite |
| S2 ↔ S6 | Supplement-Medikament-Interaktion | je 1 Block auf S2- und S6-Detailseite |
| S1 ↔ S6 | Medikamenten-Einfluss auf Laborwerte | je 1 Block auf S1- und S6-Detailseite |

S2 ↔ S6 ist das stärkste Cross-Feature:
beide Einstiegspunkte (Supplement und Wirkstoff)
führen zur gleichen Interaktionsinformation.

Weitere bidirektionale Verbindungen (Phase 2 / S18):
- S5 ↔ S18: Ernährungs-Block auf Diagnoseseiten

---

## S9 — Rolle im Website-Kontext

Phase 2. Keine Inhaltsseite im MVP.
Opt-in Datenschicht, die bestehende Seiten personalisiert.

Personalisierungswirkung je Säule (Phase 2):
- S1: eigene Laborwerte als Verlaufskurve auf Detailseite
- S6: persönliche Medikamentenliste als Vorausfüllung
  im Interaktions-Checker
- S5: gespeicherte Diagnosen als Kontext-Filter

OFFEN: UX der Personalisierung für S1 und S6 nicht spezifiziert
OFFEN: Freemium-Grenzen und OAuth-Integration nicht finalisiert

---

## S4 — Aktueller Arbeitsflächen-Stand (Nachtrag 16.04.2026)

Seit P7-02 existiert unter `/arztbrief` eine **lokale Beta-/Arbeitsfläche** für S4 Arztbrief-Decoder:

- Funktionsumfang heute: lokaler Text-Paste + lokale PDF-Text-Layer-Extraktion, vollständig clientseitig (E07/E08).
- **Noch nicht enthalten:** OCR für Scan/Foto (P7-02b), Anonymisierung (P7-03), LLM-Dekodierung (P7-04), sichere Ausgabe/UX (P7-05).
- Diese Seite ist **keine finale S4-UX-Entscheidung**. Einstiegspfade der Universalsuche auf der Startseite sind davon **nicht** berührt — eine strukturelle S4-Einbindung in die Website-UX ist weiterhin offen und Gegenstand eines späteren Pakets (P7-05).
- Bindend bleibt: `P7_01_S4_ARCHITECTURE_SPEC.md` (inkl. P7-01a-Patch).

---

## Abgrenzung zu anderen Projektdateien

- Technische Implementierung → VW_02_QUERSCHNITT
- Säulen-Scope, Datenquellen, Automatisierungsgrad → VW_05_SAEULEN
- Entscheidungen und Konzeptstand je Feature → VW_04_ENTSCHEIDUNGEN
- Säulen-Status und offene Punkte je Säule → VW_03_STATUS
- Übergreifende Vision und Positionierung → VW_01_MASTER
