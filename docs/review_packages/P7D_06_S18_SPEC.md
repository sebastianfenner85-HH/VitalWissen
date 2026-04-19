# P7D-06 — S18-Spec: Ernährungskompass

**Paketname:** P7D-06 — S18-Spec (Ernährungskompass)  
**Untertitel:** Bindende, build-fähige Spezifikation für S18 nach Reset/Freeze (P7D-04/04a)  
**Datum:** 19.04.2026  
**Status:** ✅ Spec-Dokument erstellt — bindend für alle S18-Build-Pakete  
**Typ:** Read-only Spec — kein Build, kein Code, kein DB-Write, kein Commit, kein Push, kein Deploy.

---

## 0. PAKETABGRENZUNG

Dieses Paket ist die dritte Stufe des S18-Strangs:

| Stufe | Paket | Inhalt |
|-------|-------|--------|
| 1 | P7D-04 + P7D-04a | S18 Reset/Freeze: strategische Neueinrahmung, Kernaufgabe, Kernobjekte, Phase-Schnitt |
| 2 | P7D-04b | Doku-Sync: Reset/Freeze in CLAUDE.md + VW_03_STATUS gespiegelt |
| 3 | **P7D-06 (dieses Dokument)** | S18-Spec: Seitenstrukturen, DB-Schema-Entwurf, Crosslink-Mechanismen, Routenstruktur, Datenquellen, erster Build-Entwurf |
| 4 | S18-Build-01 (noch nicht freigegeben) | Erster Phase-B-Build — erst nach expliziter Build-Freigabe |

Dieses Dokument ist kein Build-Auftrag. Es schließt die verbleibenden Spec-Lücken aus dem Reset/Freeze (P7D-04 Abschnitt 11) verbindlich.

---

## 1. FÜHRENDE QUELLEN + WIDERSPRUCHSREGEL

| Quelle | Rolle | Priorität |
|--------|-------|-----------|
| `P7D_ARCHITECTURE_RESET_FREEZE.md` (18.04.2026) | Führendes Architektur-Freeze — Produktstruktur, Phasenlogik A–E, Kernobjekte K1–K11 | 1 (führend) |
| `P7D_S18_RESET_FREEZE.md` (19.04.2026, mit P7D-04a-Patch) | Führendes S18-Scope-Dokument — Kernaufgabe, Kernobjekte, Phase-Schnitt, Trennschärfe | 2 (führend für S18) |
| `VW_04_ENTSCHEIDUNGEN.md` | Grundsatzentscheidungen E01–E29 — bindend | 3 |
| `VW_03_STATUS.md` (19.04.2026) | Operativer Sprint-Status | 3 |
| `VW_05_SAEULEN.md` (März 2026) | Altstand — Nährstoff-7-Punkte-Struktur als Ausgangsbasis verwertbar | 4 (Ausgangsbefund, S18-Scope durch P7D überschrieben) |
| `VW_06_WEBSITE.md` (März 2026) | Altstand — UX-Konzept, S18-Seitentypen als Ausgangsbasis | 4 (Ausgangsbefund) |

**Widerspruchsregel:** P7D_S18_RESET_FREEZE.md (inkl. P7D-04a) führt vor VW_05_SAEULEN.md und VW_06_WEBSITE.md. Abweichungen werden in diesem Dokument explizit benannt. Keine implizite Rückdatierung von Altständen.

---

## 2. IST-ZUSTAND

### 2.1 Operativer Stand (direkt verifiziert, VW_03_STATUS.md 19.04.2026)

- S18 Reset/Freeze: ✅ abgeschlossen (P7D-04 + P7D-04a + P7D-04b, 19.04.2026)
- S18-Seitenstruktur für Lebensmittel / Muster / Zusatzstoffe: **nicht definiert** (war explizit als Lücke in P7D-04 §11 benannt)
- DB-Schema S18: **nicht vorhanden** (explizit offener Punkt aus P7D-04 §11)
- Routenstruktur / CSS-Prefix S18: **nicht definiert** (explizit offener Punkt aus P7D-04 §11)
- Crossblock-Inhalt S5↔S18: **nur Existenz entschieden, Inhalt offen** (P7D-04 §11)
- DGE-API-Verfügbarkeit: **nicht verifiziert** (offener Punkt)
- E-Nummer/Zusatzstoff Phase-B/C-Grenzlinie: **nicht exakt definiert** (offener Punkt)
- Automatisierungsgrad je Pipeline: **nur Gesamtschätzung** (aus VW_05_SAEULEN)
- Kein S18-Code im Repo, keine S18-Seiten live
- Kein S18-Datenbankschema angelegt

### 2.2 Was P7D-04 bereits verbindlich entschieden hat (hier nicht neu entschieden)

ENTSCHEIDUNG (aus P7D_S18_RESET_FREEZE.md, bindend):
- Kernaufgabe: „Ernährung verstehen, bewerten, anwenden"
- 4 Kernobjekte (K8-Sub-Objekte): Nährstoff, Lebensmittel, Ernährungsmuster, Zusatzstoff/E-Nummer
- Zusatzstoffe: Phase B (light/Basisseiten), Phase C (vollständig)
- S5↔S18: Phase B (NEUE PAKETENTSCHEIDUNG, vorgezogen von Phase 2 in VW_06)
- S18↔S6: Schnittstellenlogik / Spec-Ziel, keine aktive Phase-B-Endnutzer-Verbindung
- S15: Modul auf S18-Seiten, kein eigenständiger Hauptbereich
- No-Gos: Rezeptportal, Tracking, Kalorientracker, Affiliate, Supplement-Duplikation, Warenkorb

### 2.3 Was dieses Paket (P7D-06) verbindlich schließt

Dieses Dokument schließt die folgenden offenen Punkte aus P7D-04 §11 verbindlich:

| Offener Punkt (P7D-04) | Status in diesem Dokument |
|------------------------|--------------------------|
| Genaue Seitenstruktur — alle 4 Seitentypen | ✅ GESCHLOSSEN — Abschnitt 7 |
| Crossblock-Inhalt S5↔S18 (genaue Felder) | ✅ GESCHLOSSEN — Abschnitt 8 |
| Routenstruktur und CSS-Prefix | ✅ GESCHLOSSEN — Abschnitt 7 |
| Logisches DB-Schema S18 | ✅ GESCHLOSSEN — Abschnitt 7 |
| Automatisierungsgrad je Datenpipeline | ✅ GESCHLOSSEN — Abschnitt 9 |
| Zusatzstoff/E-Nummer Phase-B/C-Grenzlinie (exakt) | ✅ GESCHLOSSEN — Abschnitt 10 |
| Erster minimaler S18-Build (was, wie viele Einträge) | ✅ GESCHLOSSEN — Abschnitt 12 / Tabelle G |
| DGE-API-Verfügbarkeit | ❌ OFFEN — erfordert externe Verifikation |
| EFSA-Datenzugang und Automatisierungsgrad | ❌ OFFEN — erfordert externe Verifikation |
| Vegane / allergiebedingte Filter | ❌ OFFEN — bewusst Phase C |
| Kindernährstoffbedarf (Toggle) | ❌ OFFEN — bewusst Phase C |

---

## 3. BINDENDE KERNAUFGABE VON S18

### Tabelle A — S18: Kernaufgabe / Nicht-Aufgabe

| Dimension | Bindende Festlegung |
|-----------|---------------------|
| **Kernaufgabe** | Ernährungswissen verlässlich und alltagstauglich zugänglich machen: Was enthalten Lebensmittel, was bewirken Nährstoffe und Ernährungsmuster, was steckt hinter Zusatzstoffen — eingeordnet, evidenzbasiert, verknüpft mit Krankheiten und Laborwerten. |
| **Nutzerjob primär** | Verstehen und einordnen (B2) |
| **Einheit** | Eigenständige, verlinkbare, suchbare Objekte (K8-Sub-Objekte) mit eigener Detailseite |
| **Quellen-Prinzip** | Nur verlinkbare, professionell anerkannte Quellen (E28). Keine KI-generierten Quellen. |
| **Geschäftsmodell-Prinzip** | Vollständig werbefrei, kein Affiliate, kein Produktverkauf (E01) |
| **Nicht-Aufgabe** | Ernährungs-Coaching, Tracking, Rezeptportal, personalisierte Empfehlung (vor Phase D), Kalorienlogik, Diätprogramm |
| **Differenzierungsmerkmal** | Bidirektionale Verknüpfung mit S5 (Krankheiten) und S1 (Laborwerte) — Ernährung nicht isoliert, sondern im Gesundheitskontext |

---

## 4. S18 — AUSDRÜCKLICH NICHT

Folgendes gehört nicht zu S18 und darf in keinem S18-Build-Paket eingebaut, spec-seitig angedeutet oder als Roadmap-Versprechen formuliert werden:

| Ausgeschlossen | Klassifikation | Begründung |
|---------------|---------------|------------|
| Rezeptportal oder Rezeptsammlung | Dauerhaftes No-Go | Kein Informationsprodukt im VitalWissen-Sinn; E03 |
| Ernährungstagebuch / Mahlzeitentracking | Kein S18-Thema | Nutzerdaten-Tracking → erst S9 Phase D |
| Kalorientracker | Kein S18-Thema | Keine S18-Kernkompetenz |
| Abnehm-Coaching / Diät-Programm | Kein S18-Thema | Nicht Produktversprechen; medizinrechtlich heikel |
| Produktverkauf / Affiliate-Links | Dauerhaftes No-Go | E01 — unverhandelbar |
| Händler-Integration / Warenkorb | Phase E | Erst nach vollständiger Bewertungslogik |
| Supplement-Duplikation aus S2 | Dauerhaftes NEIN | S18 zeigt Nahrungsquellen, S2 erklärt das Präparat |
| Influencer-Ernährungslogik / Health-Hacks | S14-Thema | S14 bewertet Claims; S18 ist systematische Datenbank |
| Personalisierte Ernährungsempfehlung (vor S9) | Vor Phase D NEIN | Erst mit S9 Phase D |
| Vollständige Toxikologie-Daten für E-Nummern | Phase C | Phase B = sachliche Einordnung; Tiefe kommt Phase C |
| Kindernährstoffbedarf als primärer Seitentyp | Phase C | Toggle analog S1 kommt später |
| Vegane / allergiebedingte Filter | Phase C | Scope-Anforderungen noch nicht definiert |
| S15 Zeitachsen-Modul auf S18-Seiten | Phase C | S15 ist Modul, erst wenn S15 gebaut ist |
| S14 Claim-Links auf S18-Seiten | Phase C | Erst wenn S14 existiert |
| Aktive S18↔S6-Endnutzer-Verbindung | Nicht vor S6-Build | S6 existiert noch nicht; Spec-Ziel vormerken, nicht behaupten |
| Build-Freigabe durch dieses Dokument | Kein Build-Auftrag | Spec schafft Grundlage; Freigabe ist expliziter separater Schritt |

---

## 5. KERNOBJEKTE VON S18

### Tabelle B — Kernobjekte in S18

| Objekt | Architektur-Typ | Kernobjekt-ID | Eigene Detailseite | DB-Tabelle (Entwurf) | Phase | Anzahl Phase-B-Ziel |
|--------|----------------|--------------|-------------------|---------------------|-------|---------------------|
| **Nährstoff** (Vitamine, Mineralstoffe, Makronährstoffe, sekundäre Pflanzenstoffe) | K8-Sub-Objekt — primär | K8a | ✅ JA | `naehrstoffe` | B | ~40–60 Kerneinträge |
| **Lebensmittel / Lebensmittelgruppe** | K8-Sub-Objekt — primär | K8b | ✅ JA | `lebensmittel` | B | ~20–30 häufige Gruppen |
| **Ernährungsmuster** | K8-Sub-Objekt — primär | K8c | ✅ JA | `ernaehrungsmuster` | B | ~5–8 Kernmuster |
| **Zusatzstoff / E-Nummer** | K8-Sub-Objekt — primär | K8d | ✅ JA (Phase-B-light) | `zusatzstoffe` | B (light) | ~80–120 häufige E-Nummern Phase B |
| **Alltagsheuristik / Bewertungsregel** | Content-Modul | — | ❌ NEIN | — (als JSONB-Block in anderen Tabellen) | B | Als Inhaltsmodul, kein Seitentyp |
| **Krankheitsspezifische Ernährungsempfehlung** | Crosslink-Modul | — | ❌ NEIN | Über `erkrankungs_bezug`-Feld in S18-Tabellen | B | Als Block auf S18-Seiten |
| **Laborwertbezogene Ernährungsempfehlung** | Crosslink-Modul | — | ❌ NEIN | Über `biomarker_bezug`-Feld in `naehrstoffe` | B | Als Block auf Nährstoff-Seiten |

**Entscheidung zu Alltagsheuristiken:** Heuristiken (z.B. „Protein-zu-kcal-Logik", „Fetttypen im Überblick") sind kein eigenständiger Seitentyp und keine eigene DB-Entität. Sie erscheinen als `heuristiken JSONB`-Block innerhalb von Lebensmittel- und Ernährungsmuster-Einträgen sowie als separater Übersichts-Content-Block auf der S18-Einstiegsseite.

---

## 6. SEITENTYPEN / OBJEKTLOGIK

### Tabelle C — Seitentyp / Zielnutzen / Kerninhalte / Phase

| Seitentyp | Route | CSS-Prefix | Zielnutzen | 7-Punkte-Struktur | Phase |
|-----------|-------|------------|-----------|-------------------|-------|
| **S18 Übersichtsseite** | `/ernaehrung` | `ernaehrung-*` | Einstieg, Orientierung, 4 Objekttypen zugänglich machen | — (keine 7-Punkte, Übersichtslogik) | B |
| **Nährstoff-Detailseite** | `/ernaehrung/naehrstoff/:slug` | `ernaehrung-naehrstoff-*` | Nährstoff verstehen, Tagesbedarf einordnen, Mangel/Überschuss erkennen | Siehe §6.1 | B |
| **Lebensmittel-Detailseite** | `/ernaehrung/lebensmittel/:slug` | `ernaehrung-lebensmittel-*` | Lebensmittel einordnen, Nutzen/Risiken verstehen | Siehe §6.2 | B |
| **Ernährungsmuster-Detailseite** | `/ernaehrung/muster/:slug` | `ernaehrung-muster-*` | Muster verstehen, Evidenzlage einordnen, Alltagstauglichkeit beurteilen | Siehe §6.3 | B |
| **Zusatzstoff/E-Nummer-Detailseite** | `/ernaehrung/zusatzstoff/:slug` | `ernaehrung-zusatzstoff-*` | E-Nummer sachlich einordnen, Zulassungsstatus kennen | Siehe §6.4 | B (light) |

**Naming-Konvention:** Slug ist lowercase-kebab (`magnesium`, `huelsenfruechte`, `dash-diaet`, `e250-natriumnitrit`). E-Nummern-Slugs enthalten die Nummer und den Kurzname.

### §6.1 Nährstoff-Detailseite — 7 Punkte

(Bestätigt aus VW_05_SAEULEN.md, ergänzt)

1. **Was ist das** — laienhaft, 2–3 Sätze; Kategorie (Vitamin / Mineral / Makronährstoff / Pflanzenstoff)
2. **Tagesbedarf** — DGE / EFSA / NIH als Regler-System (analog S1/S2); Geschlecht / Alter / Schwangerschaft/Stillzeit wenn relevant
3. **Beste Quellen** — Top 5–7 Lebensmittel mit Mengenangabe pro 100 g; Link zu S18-Lebensmittelseite wenn vorhanden
4. **Mangel** — Symptome, Risikogruppen, assoziierten Laborwert → S1-Link
5. **Überschuss** — ab wann problematisch, Upper Limit (UL); Risikogruppen
6. **Erkrankungs-Bezug** — 2–4 Querverweise zu S5-Krankheiten mit Kurztext; bidirektionaler Crosslink
7. **Supplement-Alternative** → S2-Link; nur wenn relevant (nicht bei Makronährstoffen)

**Heuristik-Modul:** als optionaler 8. Block auf langen Nährstoff-Seiten (z.B. „Wann reicht Ernährung, wann brauche ich ein Supplement?") — kein Pflichtblock in Phase B.

### §6.2 Lebensmittel-Detailseite — 7 Punkte

(Neu definiert in diesem Spec)

1. **Was ist das** — laienhaft, Lebensmittelgruppe, 2–3 Sätze; Oberkategorie
2. **Nährwertprofil** — Makronährstoffe (Protein/Fett/KH) + relevante Mikronährstoffe pro 100 g; Energiedichte; Verarbeitungsgrad-Hinweis (unverarbeitet / minimal verarbeitet / stark verarbeitet — NOVA-Orientierung)
3. **Gesundheitlicher Nutzen** — 2–3 evidenzbasierte Kernpunkte; Evidenz-Kurzbewertung (keine eigene Ampel-Kategorie in Phase B, nur Quellenhinweis)
4. **Gesundheitliche Risiken / Vorsicht** — für wen, ab welchen Mengen, bekannte Kontraindikationen
5. **Wechselwirkungen** — bekannte Medikamenten-/Nährstoff-Interaktionen (z.B. Grapefruit ↔ Statine); Phase B: nur gut dokumentierte Fälle; S6-Link als Spec-Ziel vorgemerkt (nicht aktiv bis S6 gebaut)
6. **Für wen besonders relevant** — Schwangerschaft, Stillzeit, Senioren, Sportler, Veganer — nur wenn inhaltlich begründbar
7. **Verknüpfte Erkrankungen** → S5-Links: 2–4 relevante ICD-Einträge mit Kurztext

**Heuristik-Modul:** Als optionaler Content-Block: „Was man über [Lebensmittelgruppe] wirklich wissen muss" — 3–5 alltagstaugliche Einordnungspunkte.

### §6.3 Ernährungsmuster-Detailseite — 7 Punkte

(Neu definiert in diesem Spec)

1. **Was ist das** — Definition, Herkunft, Kernprinzip in 2–3 Sätzen
2. **Kernprinzipien** — 3–5 Grundregeln des Musters; was typischerweise gegessen / gemieden wird
3. **Evidenz-Ampel + Anwendungsbereich** — Evidenz-Ampel (gleiche Logik S2/S14); für welche Erkrankungen / Ziele Evidenz existiert; kurze Einordnung der Studienlage
4. **Typische Lebensmittel** — 5–8 charakteristische Lebensmittel mit Kurzkommentar; Links zu S18-Lebensmittelseiten wenn vorhanden
5. **Für wen geeignet / für wen nicht** — Zielgruppen, Vorerkrankungen die profitieren / Kontraindikationen
6. **Alltagstauglichkeit** — praktische Einordnung (Aufwand, häufige Fehler, realistische Erwartung); kein Coaching-Ton
7. **Verknüpfte Erkrankungen** → S5-Links: 2–4 relevante ICD-Einträge; bidirektionaler Crosslink

### §6.4 Zusatzstoff/E-Nummer-Detailseite — 7 Punkte (Phase B light)

(Neu definiert in diesem Spec)

1. **Was ist das** — Name, E-Nummer, Oberkategorie (Farbstoff / Konservierungsmittel / Emulgator / Stabilisator / Süßungsmittel / Antioxidans / etc.)
2. **Wozu wird es eingesetzt** — Funktion im Lebensmittel (2–3 Sätze); typische Lebensmittelarten
3. **Zulassungsstatus EU** — zugelassen ja/nein; ggf. Bedingungen oder Verwendungsgrenzen; Verweis auf EU-Verordnung (Nr. 1333/2008) wenn relevant
4. **Sachliche Gesundheitseinordnung** — was sagt EFSA (2–3 Sätze); kein Alarmismus, kein Entwarnen ohne Quelle; Phase-C-Hinweis wenn tiefere Daten fehlen
5. **In welchen Lebensmitteln häufig** — 3–5 konkrete Lebensmittelbeispiele
6. **Quellen** — EFSA-Link wenn vorhanden; sonst Verweis auf EU-Zulassungsdatenbank
7. **Phase-C-Hinweis** — Platzhalter: „Vollständige Bewertungstiefe (ADI-Wert, Toxikologie-Daten) folgt in Phase C"

**Datentiefe Phase B vs. Phase C:**
- Phase B: Punkte 1–6 gefüllt, Punkt 7 als Platzhalter; ~80–120 häufige E-Nummern
- Phase C: Alle 7 Punkte vollständig + ADI-Wert + Toxikologie-Kurzfassung (EFSA-Opinion) + vollständige EU-Zusatzstoffdatenbank (~300+ Einträge) + Interaktionen mit Medikamenten/Nährstoffen

---

## 7. LOGISCHES DATENBANKSCHEMA S18

**Status:** ENTSCHEIDUNG (Spec-Entwurf). SQL-Implementierung ist Phase-B-Build-Aufgabe, kein Write in diesem Paket.

### §7.1 Tabelle `naehrstoffe`

```
naehrstoffe (
  slug            TEXT PRIMARY KEY,          -- z.B. "magnesium", "vitamin-d"
  name_de         TEXT NOT NULL,
  kategorie       TEXT,                      -- "Vitamin" | "Mineral" | "Makronährstoff" | "Pflanzenstoff"
  kurzbeschreibung TEXT,
  tagesbedarf_dge  JSONB,                    -- {maenner_adult: "400 mg", frauen_adult: "310 mg", schwanger: "...", ...}
  tagesbedarf_efsa JSONB,                    -- analoges Format
  tagesbedarf_nih  JSONB,                    -- analoges Format
  upper_limit      JSONB,                    -- {wert: "...", einheit: "...", hinweis: "..."}
  beste_quellen    JSONB,                    -- [{lebensmittel: "...", menge_pro_100g: "...", slug: "..."}]
  mangel_symptome  JSONB,                    -- [{symptom: "...", schwere: "leicht|mittel|schwer"}]
  mangel_risikogruppen TEXT[],
  mangel_laborwert  TEXT,                    -- loinc_code → S1-Crosslink
  ueberschuss_ab   TEXT,
  ueberschuss_hinweis TEXT,
  erkrankungs_bezug JSONB,                   -- [{icd_code: "...", name_de: "...", relevanz_kurz: "..."}] → S5
  supplement_alternative TEXT,               -- slug in supplements-Tabelle → S2
  biomarker_bezug JSONB,                     -- [{loinc_code: "...", name_de: "...", richtung: "erhoehend|senkend|regulierend"}] → S1
  heuristik_modul JSONB,                     -- optionaler Block: [{titel: "...", text: "..."}]
  quellen         JSONB,                     -- [{typ: "nih|dge|efsa|pubmed", name: "...", url: "..."}]
  letzte_aktualisierung TIMESTAMP
)
```

### §7.2 Tabelle `lebensmittel`

```
lebensmittel (
  slug            TEXT PRIMARY KEY,          -- z.B. "huelsenfruechte", "lachs"
  name_de         TEXT NOT NULL,
  oberkategorie   TEXT,                      -- "Gemüse" | "Obst" | "Hülsenfrüchte" | "Fleisch" | "Fisch" | "Getreide" | ...
  nova_klasse     INTEGER,                   -- 1=unverarbeitet, 2=minimal, 3=verarbeitet, 4=stark verarbeitet
  kurzbeschreibung TEXT,
  naehrwertprofil  JSONB,                    -- {kalorien_kcal: x, protein_g: x, fett_g: x, kh_g: x, ballaststoffe_g: x, mikros: {...}}
  gesundheitlicher_nutzen JSONB,             -- [{punkt: "...", evidenz_kurz: "...", quelle: "..."}]
  risiken_vorsicht JSONB,                    -- [{punkt: "...", zielgruppe: "...", ab_menge: "..."}]
  wechselwirkungen JSONB,                    -- [{medikament_wirkstoff: "...", art: "...", quelle: "..."}] → S6 Spec-Ziel
  besonders_relevant_fuer TEXT[],            -- ["schwangerschaft", "senioren", "sportler", "vegan"]
  erkrankungs_bezug JSONB,                   -- [{icd_code: "...", name_de: "...", relevanz_kurz: "..."}] → S5
  heuristik_modul JSONB,                     -- optionaler Inhaltsblock
  quellen         JSONB,
  letzte_aktualisierung TIMESTAMP
)
```

### §7.3 Tabelle `ernaehrungsmuster`

```
ernaehrungsmuster (
  slug            TEXT PRIMARY KEY,          -- z.B. "mediterrane-ernaehrung", "dash-diaet"
  name_de         TEXT NOT NULL,
  kurzbeschreibung TEXT,
  kernprinzipien  JSONB,                     -- [{regel: "..."}]
  typische_lebensmittel JSONB,               -- [{name_de: "...", slug: "...", kommentar: "..."}]
  gemiedene_lebensmittel JSONB,              -- [{name_de: "...", grund: "..."}]
  evidenz_ampel   TEXT,                      -- "stark" | "moderat" | "schwach" | "widersprüchlich"
  evidenz_anwendung JSONB,                   -- [{erkrankung_icd: "...", name_de: "...", evidenz_kurz: "..."}]
  fuer_wen_geeignet JSONB,                   -- [{gruppe: "...", begründung: "..."}]
  nicht_geeignet_fuer JSONB,                 -- [{gruppe: "...", begründung: "..."}]
  alltagstauglichkeit TEXT,                  -- freier Text, pragmatische Einordnung
  erkrankungs_bezug JSONB,                   -- [{icd_code: "...", name_de: "...", relevanz_kurz: "..."}] → S5
  quellen         JSONB,
  letzte_aktualisierung TIMESTAMP
)
```

### §7.4 Tabelle `zusatzstoffe`

```
zusatzstoffe (
  slug            TEXT PRIMARY KEY,          -- z.B. "e250-natriumnitrit"
  e_nummer        TEXT NOT NULL,             -- "E250"
  name_de         TEXT NOT NULL,             -- "Natriumnitrit"
  oberkategorie   TEXT,                      -- "Konservierungsmittel" | "Farbstoff" | "Emulgator" | ...
  funktion_im_lebensmittel TEXT,
  zulassung_eu    BOOLEAN,
  zulassungsbedingungen TEXT,                -- Kurztext zu Verwendungsgrenzen
  efsa_einordnung TEXT,                      -- sachliche Kurzfassung EFSA-Bewertung (Phase B)
  adi_wert        TEXT,                      -- Phase C — Platzhalter in Phase B: NULL
  haeufige_lebensmittel JSONB,               -- [{name: "...", kategorie: "..."}]
  quellen         JSONB,                     -- [{typ: "efsa|eu-recht", name: "...", url: "..."}]
  phase_b_vollstaendig BOOLEAN DEFAULT false, -- false = Phase-C-Hinweis zeigen
  letzte_aktualisierung TIMESTAMP
)
```

### §7.5 Neue Spalte in bestehender Tabelle `krankheiten`

Für den S5↔S18-Crosslink wird eine neue Spalte benötigt:

```
-- Neue Spalte in krankheiten:
ernaehrungs_crosslinks JSONB
-- Format: [{typ: "naehrstoff"|"lebensmittel"|"muster", slug: "...", name_de: "...", relevanz_kurz: "..."}]
-- Beispiel für ICD E11 (Diabetes Typ 2):
-- [{typ: "muster", slug: "low-carb", name_de: "Low-Carb", relevanz_kurz: "Kann Blutzuckerschwankungen reduzieren"},
--  {typ: "naehrstoff", slug: "magnesium", name_de: "Magnesium", relevanz_kurz: "Oft bei T2D erniedrigt"}]
```

**Hinweis:** Diese Spalte existiert noch nicht. DB-Write und Migration sind Phase-B-Build-Aufgabe.

---

## 8. CROSSLINK-LOGIK ZU S1 / S2 / S5 / S6

### Tabelle E — Crosslinks: Zielbereich / Status / Spec-only / Later-build

| Crosslink | Richtung | Mechanismus | Status | Phase-B-Zustand |
|-----------|---------|------------|--------|-----------------|
| **S18 ↔ S1** (Nährstoff/Laborwert) | bidirektional | Auf Nährstoff-Detailseite: Block „Relevanter Laborwert" via `mangel_laborwert` + `biomarker_bezug`. Auf S1-Seite: bestehender `zusammenhaenge`-Block kann S18-Nährstoff-Link aufnehmen. | ENTSCHEIDUNG: Phase B | Phase B: S18-seitig vollständig spezifiziert. S1-seitiger Block via existierendem `zusammenhaenge`-JSONB — kein S1-Schema-Change nötig. |
| **S18 ↔ S2** (Nährstoff/Supplement) | bidirektional | Auf Nährstoff-Seite: Block „Supplement-Alternative" via `supplement_alternative`-Feld (slug-Referenz). Auf S2-Seite: bestehende Crosslinks — kein S2-Schema-Change nötig. | ENTSCHEIDUNG: Phase B | Phase B: S18-seitig vollständig spezifiziert. S2-seitig: `zusammenhaenge`-Block kann S18-Link aufnehmen ohne Schema-Change. |
| **S18 ↔ S5** (Ernährung/Krankheit) | bidirektional | **S18 → S5:** `erkrankungs_bezug`-JSONB in `naehrstoffe`, `lebensmittel`, `ernaehrungsmuster`. **S5 → S18:** neue Spalte `ernaehrungs_crosslinks` in `krankheiten`-Tabelle (neue Spalte nötig). Block auf S5-Seite: „Ernährung bei dieser Erkrankung" mit 2–4 S18-Objekten. | ENTSCHEIDUNG: Phase B (NEUE PAKETENTSCHEIDUNG aus P7D-04) | Phase B: vollständig spec-seitig definiert (Abschnitt 7.5). DB-Write: Migration `krankheiten` + neue Spalte + Befüllung = Phase-B-Build-Aufgabe. S5-seitiger Block: Frontend-Build-Aufgabe. |
| **S18 → S6** (Lebensmittel/Medikament-Interaktion) | S18 → S6 (eingehend, S6 existiert nicht) | Auf Lebensmittel-Seite: `wechselwirkungen`-JSONB enthält bekannte Fälle als plain text + zukünftigen S6-Slug-Verweis. Kein aktiver Link bis S6 existiert. | **SPEC-ZIEL / Schnittstellenlogik** — keine aktive Phase-B-Endnutzer-Verbindung | Phase B: `wechselwirkungen`-Feld als Datenspeicher verwenden, kein sichtbarer Link auf Lebensmittel-Seite bis S6 live ist. Block „Medikamenten-Interaktionen" = Phase-B-Platzhalter mit Hinweis „Vollständige Interaktionsdaten folgen mit S6 Medikamenten-Erklärer". |
| **S14 → S18** (Claim/Objekt) | eingehend (S14 nicht gebaut) | S14-Claims verlinken zu S18-Nährstoff-/Lebensmittelseiten | **Spec-Ziel Phase C** | Phase B: S18 bereitet keine S14-Empfangsstruktur vor. |
| **S15 → S18** (Zeitachsen-Modul) | eingehend (S15 nicht gebaut) | S15-Einträge andocken an S18-Ernährungsmuster-Seiten | **Spec-Ziel Phase C** | Phase B: S18 bereitet keine S15-Empfangsstruktur vor. |

### §8.1 Crossblock-Inhalt: „Ernährung bei dieser Erkrankung" auf S5-Seite

ENTSCHEIDUNG (in P7D-04 als Existenz entschieden, hier Inhalt definiert):

- **Block-Titel:** „Ernährung bei dieser Erkrankung"
- **Platzierung:** auf S5-Detailseite, nach Block 4 (Behandlung), vor Block 5 (Prognose)
- **Inhalt:** 2–4 S18-Objekte, priorisiert: Ernährungsmuster > Nährstoff > Lebensmittel
- **Kartenformat:** Objektname + Typ-Badge (Muster / Nährstoff / Lebensmittel) + Relevanz-Kurztext (1 Satz) + Link zur S18-Detailseite
- **Datenquelle:** `ernaehrungs_crosslinks`-JSONB in `krankheiten`-Tabelle (neue Spalte, §7.5)
- **Fallback:** Block nicht anzeigen wenn `ernaehrungs_crosslinks` leer oder NULL (kein leerer Block)
- **Filterlogik:** ICD-Code → welche Ernährungsempfehlungen passen: ca. 60–70 % automatisierbar (PubMed-Mapping); ~30–40 % manueller Review empfohlen
- **Phase-B-Befüllungsziel:** 50–80 S5-Einträge mit ernaehrungs_crosslinks (Fokus: häufige Erkrankungen)

### §8.2 Crossblock-Inhalt: „Erkrankungs-Bezug" auf S18-Seite

- **Block-Titel:** „Relevante Erkrankungen" (auf Nährstoff- und Muster-Seiten) / „Ernährung und Erkrankungen" (auf Lebensmittel-Seiten)
- **Inhalt:** 2–4 S5-ICD-Einträge mit Kurztext; Link zur S5-Detailseite
- **Datenquelle:** `erkrankungs_bezug`-JSONB in den S18-Tabellen

---

## 9. DATENQUELLEN UND IHRE ROLLE

### Tabelle F — Datenquelle / Nutzen / Risiko / Phase

| Datenquelle | Nutzen für S18 | Risiko / offene Frage | Automatisierungsgrad | Phase |
|-------------|---------------|----------------------|---------------------|-------|
| **DGE Referenzwerte** (Nährstoffe) | Tagesbedarf DE-Referenz für `tagesbedarf_dge` | DGE-API-Verfügbarkeit unklar — **nicht direkt verifiziert**; Fallback: manuelle Eingabe aus DGE-Tabellen | ~80 % (wenn API verfügbar), ~30 % manuell | B |
| **EFSA Dietary Reference Values** | EU-Referenzwerte; E-Nummern-Bewertungen; ADI-Werte | Zugangsweg prüfen (analog Cochrane-Problem S3); strukturiertes Datenformat unklar | ~70 % (wenn Bulk-Download), ~40 % manuell | B/C |
| **NIH ODS (Office of Dietary Supplements)** | Nährstoff-Basisdaten; schon für S2 genutzt; Pipeline existent | Bereits bekannt aus S2 (Tier 1); beste Datenverfügbarkeit | ~85 % | B |
| **USDA FoodData Central** | Nährwertdaten für Lebensmittel; kostenloses API; sehr gute Abdeckung | Englische Einträge → DE-Übersetzung nötig; Lebensmittelgruppen-Mapping nötig | ~90 % (Nährwertdaten), ~50 % (DE-Übersetzung/Mapping) | B |
| **PubMed E-utilities** | Evidenz für Ernährungsmuster, Nährstoff-Studien, Crosslinks S5↔S18 | Bekannt aus S2/S3; Halluzinationsgefahr bei LLM-Extraktion (E28 beachten) | ~65 % (Muster-Evidenz), ~70 % (Crosslink-Mapping) | B |
| **EU-Lebensmittelzusatzstoff-Datenbank** (EUR-Lex/EFSA) | E-Nummern-Zulassungsstatus, Verwendungsregeln | Keine strukturierte API bekannt; Scraping oder manuelle Kuratierung | ~60 % | B |
| **Cochrane Reviews** | Starke Evidenz für Ernährungsmuster | Zugangsweg wie in S3 ungeklärt — **nicht direkt verifiziert** | ~60 % wenn zugänglich | C |
| **BfR** (Bundesinstitut für Risikobewertung) | Lebensmittelsicherheit, Zusatzstoff-Bewertungen DE | Gute Verfügbarkeit; DE-Quellen; strukturiert | ~70 % | B |

**Gesamtautomatisierungsschätzung Phase B:**
- Nährstoff-Basisdaten: ~80–85 % (NIH ODS)
- Lebensmittel-Nährwertdaten: ~85–90 % (USDA)
- Ernährungsmuster-Evidenz: ~60–65 % (PubMed)
- E-Nummern Phase B light: ~55–65 % (EFSA/EU-DB)
- Crosslinks S5↔S18: ~60–70 % (PubMed-Mapping + manuelle Kuration)
- **Gesamt Phase B: ~70–75 %** — manueller Review-Anteil ca. 25–30 % verbleibt

---

## 10. PHASE-BUILD-GRENZE / PHASE-C-GRENZE

### Phase-B-Startumfang (bindend)

Phase B von S18 ist inhaltlich rund, wenn folgende Elemente vorhanden sind:

| Element | Mindestumfang Phase B | Begründung |
|---------|-----------------------|------------|
| Nährstoff-Lexikon | ~40–60 Kern-Nährstoffe (Vitamine, Mineralstoffe, wichtigste Makros, häufige Pflanzenstoffe) | Vollständige Abdeckung Phase B; NIH-ODS-Pipeline vorhanden |
| Lebensmittel-Kompass | ~20–30 häufige Lebensmittelgruppen | Breite > Tiefe in Phase B; USDA-Pipeline leistungsfähig |
| Ernährungsmuster | 5–8 Kernmuster (Mediterran, DASH, Low-Carb, Intervallfasten, Vollwerternährung, plant-based, ketogen) | Alle mit Evidenz-Ampel und S5-Crosslinks |
| Zusatzstoffe Phase B light | ~80–120 häufige E-Nummern (Farbstoffe, Konservierungsmittel, Emulgatoren) | Sachliche Einordnung; ADI-Tiefe folgt Phase C |
| Crosslinks S1↔S18 | Bei allen Nährstoffen wo `mangel_laborwert` bekannt | Bidirektional; bestehende S1-Daten nutzbar |
| Crosslinks S2↔S18 | Bei relevanten Nährstoffen | `supplement_alternative`-Feld; bestehende S2-Daten (51 Einträge) nutzbar |
| Crosslinks S5↔S18 | 50–80 S5-Einträge mit `ernaehrungs_crosslinks` | Fokus auf häufige Erkrankungen; bidirektionaler Block |
| S18 Übersichtsseite | 1 Seite | Einstieg, Suchintegration |

**Phase-C-Elemente (nicht in Phase B):**
- Zusatzstoffe vollständig (~300+ E-Nummern) + ADI-Werte + Toxikologie
- S15-Zeitachsen-Modul auf S18-Seiten
- S14-Claim-Links auf S18-Seiten
- Kindernährstoffbedarf (Toggle)
- Vegane / allergiebedingte Filter
- Produktvergleich

---

## 11. NICHT-SCOPE (REDUNDANZSICHERUNG)

Folgende Punkte wurden im Paket-Auftrag als harte No-Gos definiert und werden hier nochmals explizit bestätigt:

- Kein Build, kein Code, kein SQL, keine API-Implementierung
- Kein Scraper, kein DGE-/USDA-Connector
- Kein S6-Build, kein S4-Touch, kein S18-Build
- Keine Rezeptplattform, kein Food-Tracking, kein Kalorientracker, kein Warenkorb
- Keine Affiliate-Logik, keine Händler-Anbindung
- Keine stillen Scope-Erweiterungen außerhalb K8 (kein S14, S15, S16 in Phase B)
- Keine implizite aktive S18↔S6-Live-Behauptung
- Kein DB-Schema-Write (nur logischer Entwurf als Text)

---

## 12. EMPFOHLENER FOLGEAUFTRAG

### Tabelle G — Was in den ersten S18-Build gehört / was bewusst noch nicht

| Element | Erster S18-Build (S18-Build-01) | Bewusst nicht in S18-Build-01 | Begründung |
|---------|--------------------------------|-------------------------------|------------|
| DB-Tabellen anlegen | ✅ Alle 4 Tabellen (naehrstoffe, lebensmittel, ernaehrungsmuster, zusatzstoffe) + neue Spalte `ernaehrungs_crosslinks` in `krankheiten` | — | Voraussetzung für alles andere |
| Routing einrichten | ✅ `/ernaehrung`, `/ernaehrung/naehrstoff/:slug`, etc. + Nav-Eintrag | — | Voraussetzung |
| CSS-Prefix etablieren | ✅ `ernaehrung-*`-Präfix, eigene CSS-Datei | — | Voraussetzung |
| S18 Übersichtsseite | ✅ | — | Einstieg |
| Nährstoff-Detailseiten | ✅ 40–60 Kern-Nährstoffe | Kindernährstoffbedarf-Toggle | Kernpfad |
| Lebensmittel-Detailseiten | ✅ 20–30 häufige Gruppen | Wechselwirkungen-Block aktiv (erst wenn S6) | Kernpfad |
| Ernährungsmuster-Seiten | ✅ 5–8 Kernmuster mit Evidenz-Ampel | S15-Modul | Kernpfad |
| Zusatzstoffe Phase B light | ✅ ~80–120 E-Nummern, sachliche Einordnung | Toxikologie-Daten, ADI-Wert | Phase B: sachlich |
| Crosslinks S1↔S18 | ✅ Nährstoff-Seiten mit Laborwert-Links | — | Kernfeature |
| Crosslinks S2↔S18 | ✅ Nährstoff-Seiten mit Supplement-Links | — | Kernfeature |
| Crosslinks S5↔S18 | ✅ 50–80 S5-Einträge, Block auf S5-Seiten | Vollständige 221-Einträge-Befüllung | Kernfeature |
| Suchintegration | ✅ S18-Objekte in globale Suche | — | Voraussetzung Auffindbarkeit |
| Wechselwirkungen-Block sichtbar (S6) | ❌ | — | S6 existiert nicht |
| S14-Claim-Links | ❌ | — | Phase C |
| S15-Modul | ❌ | — | Phase C |
| Personalisierung | ❌ | — | Phase D |

### Minimaler sauberer erster S18-Build in einem Satz

> Ein inhaltlich runder S18-Phase-B-Build enthält: 4 DB-Tabellen + Routing + Nährstoff-Lexikon (40–60) + Lebensmittel-Kompass (20–30) + Ernährungsmuster (5–8) + Zusatzstoffe Phase B light (80–120) + Crosslinks S1/S2/S5 bidirektional + S18-Übersichtsseite + Suchintegration — ohne S6-Verbindung, ohne S15-Modul, ohne Personalisierung.

### Empfohlener Folgeauftrag

**Paketname:** S18-Build-01 (Paketname bei Commissioning final zu vergeben)  
**Typ:** Phase-B-Build-Paket  
**Bedingung:** Explizite Freigabe durch Sebastian; eigenständiger Chat  
**Nicht-Ziel des Folgeauftrags:** S4-Touch, S6-Build, Watchlists, Q4, Q5, Personalisierung  
**Eingangsdokument:** Dieses Spec-Dokument (P7D_06_S18_SPEC.md) als bindende Grundlage

---

## 13. EXPLIZITE ANTWORTEN AUF PFLICHTFRAGEN

| Pflichtfrage | Antwort |
|-------------|---------|
| **1. Minimal sinnvolle Kernobjekte?** | Nährstoff (K8a), Lebensmittel (K8b), Ernährungsmuster (K8c), Zusatzstoff/E-Nummer (K8d) — alle 4 sind Phase B. Heuristiken, krankheits- und laborwertbezogene Empfehlungen sind Module/Crosslinks, keine eigenständigen Kernobjekte. |
| **2. Eigene Seiten für alle 4 Objekttypen?** | JA — alle 4 brauchen eigene Detailseiten. Ohne E-Nummern-Seiten fehlt ein differenzierendes Alleinstellungsmerkmal; ohne Lebensmittel fehlt die Bewertungsebene; ohne Muster fehlt die Alltagsanwendung. |
| **3. Kleinster sauberer erster Build?** | Definiert in §12 und Tabelle G: 4 Tabellen + Routing + ~40–60 Nährstoffe + ~20–30 Lebensmittelgruppen + 5–8 Muster + ~80–120 E-Nummern (light) + S1/S2/S5-Crosslinks + Suchintegration. |
| **4. Was würde S18 unnötig aufblasen?** | Rezeptportal, Ernährungstagebuch, Kalorienlogik, Kindertoggle (Phase C), Allergie-Filter (Phase C), S15-Modul (Phase C), Produktvergleich/Warenkorb. |
| **5. Wie trennt sich S18 von S2?** | S18 zeigt Nährstoffe aus Lebensmittelquellen (Magnesium aus Kürbiskernen). S2 zeigt Magnesium-Präparate (Dosierung, Form, Bioverfügbarkeit). Crosslink bidirektional, aber kein Content-Overlap. |
| **6. Wie trennt sich S18 von S5?** | S5 erklärt Krankheiten (was ist Bluthochdruck, wie wird diagnostiziert, wie behandelt). S18 erklärt die Ernährungslogik (DASH-Diät, Natriumreduktion, Kalium). Der S5-Block „Ernährung bei dieser Erkrankung" ist Verweis auf S18, kein S18-Content auf S5-Seiten. |
| **7. Wie trennt sich S18 von S6?** | S6 erklärt Wirkstoffe, Beipackzettel, Medikament-Medikament-Interaktionen. S18 dokumentiert Lebensmittel-Medikament-Interaktionen aus Ernährungsperspektive (z.B. Grapefruit). S18↔S6 ist Schnittstellenlogik (spec-seitig vorgemerkt), keine aktive User-Verbindung solange S6 nicht gebaut ist. |
| **8. Was ist jetzt spec-only?** | S18↔S6-Link (auf Lebensmittel-Seiten nur Platzhalter); S15-Modul; S14-Claim-Links; ADI-/Toxikologie-Daten für E-Nummern; Kindernährstoffbedarf; Allergie-/Veganfilter; `ernaehrungs_crosslinks`-Spalte in `krankheiten` (Struktur definiert, Befüllung ist Build-Aufgabe). |
| **9. Welche offenen Punkte aus Reset/Freeze werden hier geschlossen?** | Seitenstrukturen alle 4 Typen ✅; logisches DB-Schema ✅; Crossblock-Inhalt S5↔S18 ✅; Routenstruktur/CSS ✅; Automatisierungsgrad ✅; E-Nummern Phase-B/C-Grenzlinie ✅. |
| **10. Was bleibt für späteres Paket offen?** | DGE-API-Verfügbarkeit (externe Verifikation vor Pipeline-Bau); EFSA-Datenzugang (externe Verifikation); vegane/Allergie-Filter (Phase C); Kindernährstoffbedarf-Toggle (Phase C); Produktvergleich (Phase E); Wechselwirkungsblock aktiv (erst wenn S6 live). |

---

## 14. VALIDATOR

| # | Validator-Frage | Ergebnis |
|---|----------------|----------|
| 1 | Nur 1 neue Datei geschrieben? | ✅ Nur `01_PROJECT_SOURCES_CURRENT/P7D_06_S18_SPEC.md` |
| 2 | Kein Code / kein Repo-Write / kein DB-Write? | ✅ Kein SQL ausgeführt, kein src/-Write, kein DB-Call |
| 3 | S18 sauber von S2 getrennt? | ✅ Tabelle D (§15), §13 Frage 5: Nahrungsquelle vs. Präparat — kein Duplikat |
| 4 | S18 sauber von S5 getrennt? | ✅ Tabelle D (§15), §13 Frage 6: S18 erklärt Ernährung, S5 erklärt Krankheit — bidirektionaler Crosslink, kein Content-Overlap |
| 5 | S18 sauber von S6 getrennt? | ✅ Tabelle D (§15), §13 Frage 7: S18↔S6 nur Spec-Ziel, keine aktive User-Verbindung; Platzhalter auf Lebensmittel-Seiten |
| 6 | S14/S15/S16 nicht hineingezogen? | ✅ Alle drei explizit auf Phase C verwiesen; kein Phase-B-Build-Element enthält S14/S15/S16 |
| 7 | Erste S18-Build-Einheit klar benannt? | ✅ Tabelle G + §12: 4 Tabellen + Routing + Inhalte + Crosslinks — konkret und vollständig |
| 8 | Keine aktive S18↔S6-Live-Behauptung? | ✅ §8 Tabelle E + §6.2 §7.2: Wechselwirkungen als Platzhalter, kein aktiver Link, expliziter Hinweis |
| 9 | Keine neue Strategie außerhalb P7D eingeführt? | ✅ Alle Entscheidungen innerhalb P7D_ARCHITECTURE_RESET_FREEZE + P7D_S18_RESET_FREEZE-Rahmen |
| 10 | Ops-/Persistenzstatus sauber? | ✅ Abschnitt 15 vollständig |
| 11 | Abschluss ohne implizite Build-Ausführung formuliert? | ✅ Kein Build-Auftrag, kein implizites „jetzt bauen" |

**Alle 11 Validatoren: ✅ PASS.**

---

## 15. TRENNSCHÄRFE-ÜBERSICHT

### Tabelle D — S18 vs. S2 / S5 / S6 / S14 / S15 / S16

| Grenze | S18 | Andere Säule | Überlappung | Auflösung |
|--------|-----|-------------|------------|-----------|
| **S18 ≠ S2** | Nährstoff aus Lebensmittelquellen; Lebensmittelbewertung; Ernährungsmuster | S2 = Supplement als isolierter Wirkstoff (Dosierung, Form, Bioverfügbarkeit, Qualitätskriterien) | Magnesium: S18 = aus Kürbiskernen; S2 = Magnesiumpräparat | Crosslink bidirektional. S18 erklärt die Nahrungsquelle, S2 erklärt das Präparat. Kein Duplikat auf beiden Seiten. |
| **S18 ≠ S5** | Ernährung erklärt (Nährstoffe, Lebensmittel, Muster) | S5 = Krankheit erklärt (Diagnose, Symptome, Behandlung, Prognose) | Ernährung bei Erkrankung | Crosslink bidirektional. S5-Block „Ernährung bei dieser Erkrankung" ist Verweis auf S18, kein S18-Content auf S5-Seiten. Kein Content-Overlap. |
| **S18 ≠ S6** | Lebensmittel-Medikament-Interaktionen aus Ernährungsperspektive (Grapefruit) | S6 = Medikament-Lebensmittel-Interaktion aus Wirkstoffperspektive (Beipackzettel, Interaktionsdatenbank) | Grapefruit ↔ Statine | S18-seitig: Platzhalter-JSONB, kein aktiver Block. Erst aktive User-Verbindung wenn S6 live. Kein Eindruck dass diese Verbindung in Phase B endnutzerseitig verfügbar ist. |
| **S18 ≠ S14** | Systematische Wissensdatenbank (Nährstoffe, Lebensmittel, Muster) | S14 = Claim-Datenbank (spezifische Behauptungen aus Social Media mit Evidenz-Ampel) | Ernährungs-Claims (z.B. „Kokosöl ist gesund") | S14 bewertet den spezifischen Claim, verlinkt dann zu S18 (Lebensmittel: Kokosöl). S18 liefert die strukturierte Wissensbasis. Claim ≠ Lebensmittel-Objekt. |
| **S18 ≠ S15** | Ernährungswissen, Bewertung, Alltagsanwendung | S15 = Zeitachse (wann wirkt Ernährungsumstellung X, woran messbar, in drei Phasen) | Ernährungsumstellungen mit Zeitachse | S15 ist Modul auf S18-Muster-Seiten (Phase C), kein eigenständiger Hauptbereich. S15-Inhalte erscheinen als Funktionsblock, nicht als Navigation. |
| **S18 ≠ S16** | Ernährungs-Wissensdatenbank | S16 = App-Aggregator (DiGA, Ernährungs-Apps mit Datenschutz-Check) | Ernährungs-Apps tauchen in S16 auf | S16 aggregiert Apps; S18 liefert inhaltliches Hintergrundwissen. App ≠ Nährstoff/Lebensmittel-Objekt. |

---

## 16. OPS CLOSURE

### A — Geänderte Dateien

| Datei | Aktion |
|-------|--------|
| `01_PROJECT_SOURCES_CURRENT/P7D_06_S18_SPEC.md` | ✅ NEU ERSTELLT |
| Alle anderen Dateien | ✅ UNVERÄNDERT |

### B — Inhaltlich entschieden (Abschluss dieser Spec)

1. **Seitenstrukturen** für alle 4 S18-Seitentypen verbindlich definiert (§6.1–§6.4)
2. **Logisches DB-Schema** für alle 4 S18-Tabellen + neue `krankheiten`-Spalte definiert (§7)
3. **Crossblock-Inhalt S5↔S18** vollständig spezifiziert: Block-Titel, Platzierung, Kartenformat, Datenquelle, Fallback, Befüllungsziel (§8.1–§8.2)
4. **Routenstruktur** `/ernaehrung/...` und **CSS-Prefix** `ernaehrung-*` festgelegt (§6)
5. **E-Nummern Phase-B/C-Grenzlinie** exakt: Phase B = ~80–120 häufige Einträge, sachliche Einordnung ohne ADI; Phase C = ~300+ vollständig mit Toxikologie (§6.4 + §10)
6. **Automatisierungsgrade** je Pipeline konsolidiert: Gesamt ~70–75 % Phase B (§9, Tabelle F)
7. **Erster minimaler S18-Build** vollständig definiert: 4 Tabellen + 7 Inhaltsgruppen + 3 Crosslinks + Übersicht + Suche (§12, Tabelle G)
8. **Offene Punkte aus P7D-04 §11** vollständig abgearbeitet: 6 von 10 verbindlich geschlossen, 4 bewusst offen gelassen (§2.3)

### C — Nicht getan / bewusst offen gelassen

| Offen | Warum |
|-------|-------|
| DGE-API-Verfügbarkeit | Externe Verifikation nötig vor Pipeline-Bau; nicht aus Dokumenten entscheidbar |
| EFSA-Datenzugang | Analog DGE; Zugangsweg muss vor Pipeline geprüft werden |
| Vegane / allergiebedingte Filter | Phase C; genaue Anforderungen noch nicht definiert |
| Kindernährstoffbedarf (Toggle) | Phase C; analog S1-Toggle |
| S6-Wechselwirkungsblock aktiv | Erst wenn S6 existiert |
| Produktvergleich / Warenkorb | Phase E — dauerhaftes No-Go für Phase B |
| Build-Freigabe | Expliziter separater Schritt — nicht durch diese Spec erteilt |

### D — Validator-Ergebnis

Alle 11 Validatoren: **✅ PASS** (→ Abschnitt 14)

### E — Ops-Status

| Parameter | Status |
|-----------|--------|
| **Lokale Speicherung** | ✅ `01_PROJECT_SOURCES_CURRENT/P7D_06_S18_SPEC.md` neu erstellt |
| **git status** | Keine git-Operation ausgeführt |
| **Commit-Status** | Kein Commit |
| **Push-Status** | Kein Push |
| **DB-Writes** | Keine — logisches Schema ist Spezifikationstext, kein DB-Call |
| **Deploy** | Kein Deploy |
| **Offener Side Effect** | Keiner |

---

**P7D-06 S18-Spec ist damit als read-only Architektur-/Scope-Paket abgeschlossen; kein Build, keine aktive S18↔S6-Behauptung, keine Strategiedrift.**

---

*Erstellt: 19.04.2026 — P7D-06 S18-Spec abgeschlossen.*  
*Führende Grundlage: P7D_ARCHITECTURE_RESET_FREEZE.md + P7D_S18_RESET_FREEZE.md (inkl. P7D-04a-Patch).*  
*Nächster zulässiger Schritt für S18: S18-Build-01 — erst nach expliziter Build-Freigabe durch Sebastian, eigenständiger Chat.*
