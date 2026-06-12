# Q2 — Trust- & Source-Layer Pre-Spec

**Paketname:** Q2 — Vertrauens- / Quellen-Layer
**Typ:** Pre-Spec (read-only) — Kein Build. Kein DB-Write. Kein Commit. Kein Push. Kein Deploy.
**Datum:** 24.04.2026
**Status:** ✅ Pre-Spec abgeschlossen
**Führende Quellen:** P7D_ARCHITECTURE_RESET_FREEZE.md · VW_04_ENTSCHEIDUNGEN.md · VW_05_SAEULEN.md · VW_06_WEBSITE.md · AUDIT_CANON_CURRENT.md · ACTIVE_STRANDS_CURRENT.md · VW_03_STATUS.md · P7D_03_S3_FREEZE.md · S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md · CLAUDE.md

---

## A — AUDIT-TABELLE

### A1. Quellenarten-Bestandsaufnahme je Säule / Kernobjekt (Ist-Stand 24.04.2026)

| Säule | Kernobjekt | Aktive Quellen (direkt verifiziert) | Quellentyp(en) | DB-Feld / Sichtbarkeit | Aktualitätsanker |
|-------|-----------|--------------------------------------|----------------|------------------------|-----------------|
| **S1** Laborwert-Lexikon | K3 | LOINC (Struktur), DGKL (DE), AACC/Medscape (USA), JSCC via PubMed (JP) | Strukturierte Datenbasis + Standard-of-Care | Nicht als Quellenbox sichtbar — kein dediziertes `quellen`-Feld in `laborwerte` | Institutionell: LOINC/DGKL gepflegt. JSCC-Extraktion technisch offen (VW_03) |
| **S2** Supplement-Kompass | K4 | NIH ODS API (Tier 1 primär), BfR, EFSA (Dosierung), PubMed Reviews | Regulatorisch (DE/EU) + Forschungseinordnung + Staatliche Datenbasis | Evidenz-Ampel als UI-Element vorhanden. Kein explizites `quellen`-Feld im DB-Schema (nicht direkt verifiziert) | NIH ODS/EFSA institutionell gepflegt; Review-Datum einzelner PubMed-Einträge nicht sichtbar |
| **S3** Studienkompass | K6 | PubMed E-utilities, PMC, Cochrane (Zugang offen), Epistemonikos, EuropePMC, RetractionWatch, OpenCitations | Forschungs-primär — Studien, Retraction, Zitation | Noch kein Build (Phase C). PMID/DOI als Pflichtfeld in S3-Freeze definiert | Publikationsdatum + Retraction-Check als Pflichtfelder (P7D-03 §9) |
| **S5** Krankheits-Lexikon | K1 | AWMF Leitlinien, ICD-10-GM (BfArM), IQWiG/Gesundheitsinformation.de, MedlinePlus, Orphanet, RKI | Standard-of-Care (DE) + Regulatorisch + Patientennahe Erklärung | `quellen` JSONB-Feld in `krankheiten`: `[{"typ":"awmf|iqwig|icd10|rki","name":"…","url":"…","beschreibung":"…"}]`. 216/221 echte Quellen. Darstellung im Frontend: Liste auf Detailseite. | Leitlinien-Review-Datum nicht explizit sichtbar. Quellen-Typ vorhanden aber kein „Warum"-Text |
| **S6** Medikamenten-Erklärer | K5 | EMA EPAR (verifiziert live: 2.679 Einträge, kein Auth), BfArM (37/50 Wirkstoffe), WHO ATC/DDD, OpenFDA | Regulatorisch-primär (EU/DE/International) | `quellen`-Feld nicht direkt verifiziert in `wirkstoffe`-Schema. Kein sichtbarer Quellen-Block im Frontend bisher | EMA EPAR: 2× täglich Update. BfArM: institutionell gepflegt |
| **S18** Ernährungskompass | K8 | NIH ODS (Nährstoffe, primär), EFSA DRVs, DGE Referenzwerte, USDA FoodData Central (Lebensmittel), PubMed (Muster), BfR, EU-Lebensmittelrecht (Zusatzstoffe, EFSA/EU-VO) | Regulatorisch + Staatliche Datenbasis + Forschungseinordnung | Tagesbedarf-Felder tragen Quellen-Label (NIH/DGE/EFSA) als JSONB-Subfelder. Keine einheitliche Quellenbox-Komponente | NIH ODS/EFSA/DGE institutionell gepflegt |
| **S8/B4** Ableitungslogik | K1/K3/K5/K9 | AWMF (Leitlinien für T1/T2), PubMed-IDs (F2 Evidenzart), ClinicalTrials.gov/DRKS (Studien-Radar, Stufe 3) | Standard-of-Care + Forschungs-primär | F2 (Evidenzart) + F3 (Etablierungsgrad) + F7 (Gesprächspunkte) pro Option als Pflichtfelder (S8-Pre-Spec). Noch keine globale Quellenbox in B4 | Leitlinien-Review-Datum als F2-Angabe |

---

### A2. Warum-Eignungs-Audit je Quellentyp

| Quellentyp | Quellen | Warum geeignet | Warum nicht allein ausreichend |
|-----------|---------|---------------|-------------------------------|
| **Standard-of-Care** | AWMF, NVL, DGK, DGE, BfArM-Zulassung | Goldstandard der medizinischen Versorgung in DE. Höchste gesellschaftliche Akzeptanz bei Ärzten, Krankenkassen, Patienten. Verlinkbar, transparent, periodisch geprüft. | Leitlinien können veraltet sein. Nicht alle Fragen sind leitliniengestützt. Patienten-Verständlichkeit gering. |
| **Regulatorisch-primär** | EMA EPAR, BfArM, FDA, EFSA, WHO ATC | Zulassung = behördliche Prüfung. Verlässlichster Aktualitätsanker (Zulassungsstatus tagesaktuell). Eindeutig verlinkbar (E28). Keine KI-Interpretation. | Nur für zugelassene Substanzen/Verfahren. Nicht für Forschungslage geeignet. Sprache für Laien ungeeignet. |
| **Strukturierte Datenbasis** | LOINC, ICD-10-GM, WHO ATC/DDD | Standardisiertes Vokabular, maschinenlesbar, international anerkannt, verlinkbar, stabil. Ermöglicht Cross-Objekt-Verlinkung. | Reine Klassifikation, kein erklärenden Inhalt. Ohne Kontextualisierung für Nutzer wertlos. |
| **Forschungs-primär** | PubMed, Cochrane, PMC, Epistemonikos | Höchste Evidenzgrundlage (RCTs, Meta-Analysen). Peer-reviewed. PMID/DOI = verlinkbar (E28). Transparent über Methodik. | Qualitätsstreuung (nicht jeder PubMed-Eintrag hochwertig). Studientyp-Hierarchie nötig (S3-Freeze). Laienverständlichkeit gering. Muss kontextualisiert werden. |
| **Patientennahe Erklärung** | IQWiG/Gesundheitsinformation.de, MedlinePlus, Orphanet | Kuratierte Laienaufbereitung durch staatliche/anerkannte Institutionen. Komplementiert Primärquellen. AWMF-unabhängige Prüfung. | Sekundärquelle. Fasst Primärquellen zusammen — kann abweichen wenn Leitlinie neuer als Aufbereitung. |
| **Epidemiologie/Prävalenz** | RKI Gesundheitsberichterstattung | Einzige verlässliche DE-Epidemiologie-Basis. Staatlich, verlinkbar. | Begrenzt auf DE, nicht klinisch-therapeutisch. Nicht Primärquelle für Behandlungslogik. |

---

### A3. Schwächen-Audit (Beobachtungen, nicht Schlussfolgerungen)

| Bereich | Befund | Schwere | Konsequenz |
|---------|--------|---------|------------|
| **Fehlende globale Vertrauensseite** | Kein `/vertrauen`, `/quellen` oder `/ueber-uns`-Äquivalent existiert. Nutzer können VitalWissens Quellenphilosophie, Kurations-Prinzip und Aktualisierungslogik nirgendwo nachlesen. | HOCH | Kerndefizit für Vertrauensaufbau. Direkt behebbar ohne DB-Schema-Änderung. |
| **Fehlende objekt-bezogene Quellenbox (S1, S6)** | S1 (`laborwerte`) hat kein `quellen`-Feld. S6 (`wirkstoffe`) nicht direkt verifiziert. S5 hat JSONB-Feld, aber kein standardisiertes Display-Komponente plattformweit. S2: nicht direkt verifiziert. | HOCH | Nutzer können Herkunft einzelner Aussagen nicht nachvollziehen. Verstößt gegen Q2-Architekturprinzip (P7D §4). |
| **Fehlende Aktualitätsanzeige** | Kein `last_reviewed`-Feld sichtbar auf Detailseiten. Nutzer sehen nicht, ob ein Eintrag 6 Monate oder 3 Jahre alt ist. Leitlinien-Review-Datum nicht aus AWMF extrahiert. | HOCH | Vertrauensschaden wenn Nutzer veraltete Information als aktuell wahrnehmen. |
| **Fehlende „Warum diese Quelle?"-Logik** | Quellen sind in S5 vorhanden (AWMF-Link), aber ohne Kontext: warum AWMF und nicht z.B. Wikipedia? Quellentyp-Kategorie nicht kommuniziert. | MITTEL | Nutzer mit niedrigem Gesundheitswissen können Quellenqualität nicht einordnen. |
| **Fehlende Primär-/Sekundärquellenunterscheidung** | Im DB-Schema ist `typ` vorhanden (awmf|iqwig|icd10|rki) aber kein `ebene`-Feld (primär/sekundär). Display behandelt alle Quellen gleich. | MITTEL | Irreführend: IQWiG-Aufbereitung ≠ AWMF-Leitlinie. Beides als gleichwertig darzustellen wäre falsch. |
| **Fehlende Konflikt-/Diskrepanz-Anzeige** | Wenn DE-Leitlinie und US-Guideline abweichen (z.B. S1 Referenzbereiche), gibt es keine Nutzer-seitige Hinweis-Logik. | MITTEL | Für S1 (3-Leitlinien-Regler) schon teilweise gelöst. Für S5 und S6 noch offen. |
| **Fehlende Review-/Redaktions-Status-Unterscheidung** | Kein Feld `redaktionell_geprueft` (boolean) oder `review_typ` (automatisch/manuell/leitlinienbasiert) in DB-Schema. | MITTEL | Nutzer und Reviewer können nicht unterscheiden ob ein Eintrag maschinell befüllt oder manuell kuratiert wurde. |
| **Fehlende i18n-fähige Quellen-Feldlogik** | Quellentyp-Strings in DB sind hartcodierte Deutsche Strings (`awmf`, `iqwig`, etc.). Verletzt Q10-Architekturprinzip (P7D §4). | NIEDRIG | Kein Build-Blocker heute. Aber bei Schema-Änderungen mitziehen. |
| **Fehlende mobile Quellen-UX** | Quellenbox auf S5-Detailseiten ist eine Plain-Link-Liste. Kein Chip-System, keine Typ-Markierung, keine Scanbarkeit. Desktop-only angemutetes UI. | NIEDRIG | Q6-Verletzung (Mobile-first, P7D §4). |

---

### A4. Q2-Systemzusammenhang (direkt verifiziert aus Pflichtlektüre)

| Relation | Beschreibung | Status |
|----------|-------------|--------|
| **Q2 → S3** | S3-Objekte (K6) tragen PMID/DOI als Pflichtfeld (P7D-03 §9). Studientyp-Ampel ist Evidenztyp-Anzeige. Q2 standardisiert wie Studienquellen plattformweit dargestellt werden. | Phase C — S3 noch nicht gebaut |
| **Q2 → S8/B4** | S8-Pre-Spec definiert F2 (Evidenzart) und F3 (Etablierungsgrad) als Pflichtfelder. Diese beiden Felder sind direkte Q2-Layer-Anker. Formulierungsregeln (§C10/C11) bauen auf Q2-Logik. | BUILD-01 live — Q2 untermauert |
| **Q2 → S1** | 3-Leitlinien-Regler (DGKL/AACC/JSCC) ist bereits prototypische Q2-Implementierung: Quellentyp explizit, Leitlinie benannt. Fehlt: „Warum"-Text, Aktualitätsdatum. | Live — unvollständig |
| **Q2 → S5** | `quellen`-JSONB-Feld vorhanden, 216/221 befüllt. Fehlt: einheitliche Quellenbox-Komponente, Typ-Kontext, Aktualitätsdatum. | Live — ausbaubar |
| **Q2 → S2** | Evidenz-Ampel vorhanden (Stufe: stark/moderat/schwach). Quellenbox (Studien-Block als 7. Punkt) vorhanden. Fehlt: Standardisierung, Aktualitätsdatum, „Warum BfR/NIH/EFSA". | Live — ausbaubar |
| **Q2 → S6** | Quellen-Feld (`quellen / zulassung` als 7. Block in VW_05) konzeptionell definiert. Build-Stand nicht direkt verifiziert. Regulatorische Primärquellen (EMA/BfArM) als stärkste Quellentypen. | Build in Phase B — Spec-Lücke |
| **Q2 → S18** | Tagesbedarf-Felder tragen NIH/DGE/EFSA-Subfelder. Kein einheitlicher Quellenbox-Standard. | Live — ausbaubar |

---

## B — KERNENTSCHEIDUNG

### B1. Wie viele Ebenen braucht Q2?

**Entscheidung: 3 Ebenen — global, objekt-bezogen, aussagen-bezogen.**

Begründung:

Eine einzige Quellenbox am Seitenende (wie Wikipedia) reicht nicht: Sie beantwortet nicht „woher kommt *diese spezifische Aussage*?" — und sie setzt Quellenkenntnis voraus.

Eine aussagen-bezogene Inline-Quellenangabe (wie wissenschaftliche Paper) reicht nicht für Laien: cognitive overload, nicht mobile-tauglich, erzeugt Vertrauens-Performance statt echte Transparenz.

Das 3-Ebenen-Modell ist das Minimum das drei verschiedene Nutzerbedürfnisse abdeckt:

| Ebene | Nutzerfrage | Wo | Wann |
|-------|------------|-----|------|
| **Global** | Wie arbeitet VitalWissen grundsätzlich? | Eigene Seite `/vertrauen` | Einmalig, auf Einladung |
| **Objekt-bezogen** | Woher stammt *dieser Eintrag*? | Quellenbox auf jeder Detailseite | Bei Detailseiten-Aufruf |
| **Aussagen-bezogen** | Woher kommt *diese konkrete Aussage*? | Inline-Anker / Info-Element | Bei spezifischen Claims |

---

### B2. Was ist global, was objekt-bezogen, was aussagen-bezogen?

**Entscheidung:**

| Inhalt | Ebene | Begründung |
|--------|-------|------------|
| Quellenphilosophie (warum diese Quellen, nicht andere) | Global | Gilt plattformweit, nicht je Eintrag |
| Kurations-Prinzip (wer prüft was, wie) | Global | Gilt plattformweit |
| Aktualisierungslogik (wie oft, wie signalisiert) | Global + Objekt | Global als Prinzip, Objekt als Datum |
| Vertrauens-Erklärung (werbefrei, kein Affiliate) | Global | E01, unveränderlich |
| Quellen-Hierarchie-Erklärung (Primär vs. Sekundär, Typ-Erklärung) | Global | Gilt für alle Säulen |
| Welche Quellen für *diesen Eintrag* | Objekt | Pro Detailseite |
| Quellentyp-Markierung (Leitlinie / Regulatorisch / Forschung) | Objekt | Pro Eintrag sichtbar |
| Letztes Review-Datum | Objekt | Pro Eintrag |
| Redaktions-Status (manuell/automatisch befüllt) | Objekt | Pro Eintrag |
| „Woher kommt dieser Referenzbereich?" | Aussagen | Inline auf S1-Regler |
| „Warum erscheint diese B4-Option?" | Aussagen | F1-Feld in S8/B4 |
| Studientyp-Einordnung | Aussagen | Inline auf S3-Karte |

---

### B3. Quellenarten-Matrix — bindend für alle Säulen

**Entscheidung: 5 Quellentypen, klar definiert, i18n-fähige Schlüssel.**

| Schlüssel | Bezeichnung (DE) | Beschreibung | Beispiele | Piktogramm-Idee |
|-----------|-----------------|-------------|-----------|----------------|
| `guideline` | Leitlinie / Standard-of-Care | Nationale oder internationale Behandlungsleitlinie, peer-reviewed und periodisch aktualisiert | AWMF, NVL, DGK, DGE, ESC | 📋 |
| `regulatory` | Regulatorisch / Zulassung | Behördliche Zulassungsentscheidung oder -dokumentation. Höchster Aktualitätsanker. | EMA EPAR, BfArM, FDA, EFSA DRVs, WHO ATC | 🏛️ |
| `database` | Strukturierte Datenbasis | Klassifikationssystem oder systematisch gepflegte Referenzdatenbank | LOINC, ICD-10-GM, NIH ODS, USDA FoodData Central | 🗄️ |
| `research` | Forschungsquelle | Peer-reviewed Primärliteratur (Studie, Review, Meta-Analyse) mit PMID/DOI | PubMed, Cochrane, PMC, Epistemonikos | 🔬 |
| `patient_info` | Patienteninformation | Kuratierte Laienaufbereitung durch anerkannte staatliche oder wissenschaftliche Institution | IQWiG/Gesundheitsinformation.de, MedlinePlus, Orphanet | 📖 |

**Ausdrücklich ausgeschlossen:**
- KI-generierte Inhalte ohne Primärquelle (E28, absolut)
- Preprints ohne Peer-Review-Status gleichgestellt (S3-Freeze §11)
- Studien ohne PMID/DOI (E28: muss verlinkbar sein)
- Wikipedia (nicht verlinkbar als Primärquelle — sekundäre Nutzung intern zur Orientierung erlaubt)
- Hersteller-/Industrie-Quellen ohne unabhängige Verifikation

---

### B4. Aktualitäts- / Review- / Konflikt-Status

**Entscheidung: 3 Status-Dimensionen je Eintrag.**

| Dimension | Feld | Werte | Sichtbarkeit |
|-----------|------|-------|--------------|
| **Inhaltsdatum** | `letzte_aktualisierung` | Timestamp (bereits in `laborwerte`-Schema vorhanden) | Nutzer: „Zuletzt aktualisiert: [Monat Jahr]" |
| **Review-Typ** | `review_typ` | `auto` / `manuell` / `leitlinienbasiert` | Nutzer: Icon/Badge. Intern: für Qualitätskontrolle. |
| **Quellen-Konflikt** | `quellen_konflikt` | `false` / `{beschreibung: "…"}` | Nutzer: expliziter Hinweis wenn DE-Standard von Int. abweicht |

**Aktualitäts-Warnschwelle (Arbeitshypothese, nicht Build-Auftrag):** Einträge älter als 24 Monate ohne `review_typ: leitlinienbasiert` oder `manuell` sollen einen internen Review-Flag erhalten. Sichtbarkeit für Nutzer nur wenn Leitlinien-Update bekannt.

---

### B5. „Warum wird mir das gezeigt?" — allgemeine Nutzbarkeit außerhalb S8

**Entscheidung: Q2 implementiert eine globale „Warum-dieser-Inhalt?"-Logik, die S8/B4 nutzt, aber nicht besitzt.**

S8/B4 hat das F1-Feld: „Gezeigt weil: [konkreter Trigger]". Das ist der B4-spezifische Anwendungsfall. Aber dieselbe Logik gilt breit:

| Kontext | „Warum wird mir das gezeigt?" |
|---------|-------------------------------|
| S5 Quellen-Box | „Diese Quelle: weil [Quellentyp] für [Krankheitstyp] der maßgebliche Standard in Deutschland ist." |
| S2 Evidenz-Ampel | „Evidenz: [stark] — basierend auf [n] Meta-Analysen zu [Wirkstoff]." |
| S1 Referenzbereich | „Referenzbereich laut [Leitlinie X, Jahr] — gilt für [Geschlecht, Altersgruppe]." |
| S6 Quellenbox | „Zulassungsinformation: EMA EPAR — EU-weit gültige Zulassung, zuletzt aktualisiert [Datum]." |
| B4-Option | „Gezeigt weil: bei [Diagnose] laut AWMF-Leitlinie [Name] empfohlen." (F1, S8-Pre-Spec) |

Diese Logik ist keine eigenständige Säule und kein eigener Navpunkt. Sie ist eine **Querschicht-Konvention** die bei jedem neuen Build zu implementieren ist.

---

## C — VOLLSTÄNDIGE Q2 PRE-SPEC

---

### C1. Zweck des Trust-/Source-Layers (Q2)

Q2 beantwortet drei Nutzerfragen die VitalWissen ohne Q2 nicht zuverlässig beantworten kann:

1. **Woher kommen diese Informationen?** — Quellenherkunft pro Eintrag und pro Aussage sichtbar machen.
2. **Warum genau diese Quellen?** — Quellentyp und Eignung erklären, nicht nur verlinken.
3. **Wie aktuell ist das?** — Review-Datum, Aktualitätsanker und Konflikt-Status sichtbar machen.

**Was Q2 leistet:**
- Vertrauen durch Transparenz — nicht durch Selbstlob
- Unterscheidbarkeit: Primärquelle vs. Sekundärquelle vs. Kuratierung
- Einheitliche Quellenbox-Konvention quer über alle Säulen
- Mobile-taugliche, scanbare Quellenanzeige
- Globale Vertrauensseite als Plattform-Anker
- Infrastruktur für „Warum?"-Logik als Querschnitt

**Was Q2 nicht leistet:**
- Kein Fact-Checking-Service (nicht VitalWissens Aufgabe gegenüber Dritten)
- Keine KI-Quellenprüfung in Echtzeit (E28, absolut)
- Keine vollautomatische Leitlinien-Tracking-Pipeline (Phase C/D)
- Keine Qualitätsbewertung von Ärzten oder externen Quellen

---

### C2. Abgrenzung zu S3, S8, S1

| Abgrenzung | Q2 | Anderer Bereich |
|-----------|-----|----------------|
| **Q2 vs. S3** | Q2 definiert wie Quellen dargestellt werden. S3 erstellt Forschungsobjekte (K6) als eigene Kernobjekte. | S3 ist Inhalt-Produzent. Q2 ist Darstellungs-Konvention. S3-Objekte implementieren Q2-Standard (PMID/DOI, Studientyp-Ampel). |
| **Q2 vs. S8/B4** | Q2 definiert F2+F3+F1-Konvention plattformweit. S8/B4 nutzt diese Konvention für Ableitungsoptionen. | S8 ist Ausgabelogik. Q2 ist Quelleninfrastruktur. S8-Build-01 hat Q2-Elemente bereits implementiert (F1/F2/F3). |
| **Q2 vs. S1** | S1-Regler (DGKL/AACC/JSCC) ist prototypische Q2-Implementierung. | S1 ist Inhalt. Q2 standardisiert wie S1-Quellenangaben aussehen und erweitert sie um „Warum"-Kontext und Aktualitätsdatum. |
| **Q2 vs. E28** | E28 ist Grundsatzentscheidung (was erlaubt ist). Q2 ist Umsetzungsebene (wie es kommuniziert wird). | E28 ist Verbot/Gebot. Q2 ist Darstellungs- und Architekturkonvention die E28 operativ umsetzt. |

---

### C3. Globale Vertrauensseite — Inhalte und Pflichtblöcke

**Route:** `/vertrauen` (alternativ: `/quellen` oder `/ueber-uns/quellen` — Entscheidung im Build-Paket)

**Zielgruppe:** Skeptische Erstnutzer, Fachpersonen die VitalWissen einschätzen wollen, Nutzer nach einer spezifischen Quellenangabe

**Pflichtblöcke (7):**

| Block | Titel | Inhalt | Format |
|-------|-------|--------|--------|
| **V1** | Was VitalWissen ist — und was nicht | Aggregation, Übersetzung, Vernetzung — kein eigenes medizinisches Wissen (E03). Nicht: Diagnose, Therapieempfehlung, Arzt-Ersatz. | 3–4 Sätze, keine Aufzählungen |
| **V2** | Unsere Quellenphilosophie | Warum nur verlinkbare, professionell anerkannte Quellen (E28). Warum kein Affiliate, keine Werbung (E01). Warum keine KI-generierten Quellen. Konsequenz für Nutzer. | 3–5 Sätze |
| **V3** | Quellentypen erklärt | 5 Quellentypen (Leitlinie / Regulatorisch / Datenbasis / Forschung / Patienteninfo) mit Erklärung je ca. 2 Sätze + Beispiel. Chip-Darstellung wie auf Detailseiten. | Chip-Karten (scanbar, mobile-first) |
| **V4** | Quellenhierarchie | Welcher Quellentyp hat welche Aussagekraft? Primär vs. Sekundär erklärt. Wann gilt Leitlinie, wann gilt Forschungsstand? | Einfache visuelle Hierarchie (kein Fließtext) |
| **V5** | Wie wir Inhalte aktualisieren | Wann wird ein Eintrag aktualisiert? Was passiert wenn eine Leitlinie veraltet? Wer prüft — manuell oder automatisch? Transparenz über `review_typ`. | 3–4 Sätze |
| **V6** | Was wir bewusst nicht tun | No-Gos: Therapieempfehlung, Diagnose, Affiliate, KI-Quellen, Herstellerquellen. Kurz und direkt. | Maximal 6 Punkte, kurz |
| **V7** | Feedback / Fehler melden | Wie können Nutzer falsche oder veraltete Informationen melden? (Mechanismus: E-Mail oder Formular — Build-Entscheidung) | 1–2 Sätze + Link/Button |

**Mobile-Anforderungen:** Alle Blöcke scanbar ohne Scrollen auslösen. V3 (Chip-Karten) muss auf 375px darstellbar sein. Tap-Targets ≥ 40px.

---

### C4. Objektbezogene Quellenbox — Pflichtfelder

**Geltungsbereich:** Alle Kernobjekt-Detailseiten (K1–K8 soweit vorhanden)

**Pflichtfelder je Quellenbox-Eintrag:**

| Feld | Typ | Beschreibung | Beispiel |
|------|-----|-------------|---------|
| `typ` | Enum | Quellentyp (guideline / regulatory / database / research / patient_info) | `guideline` |
| `name` | String | Kurzname der Quelle | „AWMF S3-Leitlinie Arterielle Hypertonie" |
| `url` | URL | Direkt verlinkbar, geprüft (E28) | `https://www.awmf.org/…` |
| `beschreibung` | String (optional) | „Warum diese Quelle?"-Text, 1 Satz | „Nationale Behandlungsleitlinie für Bluthochdruck in Deutschland, zuletzt überarbeitet 2023." |
| `jahr` | Integer (optional) | Jahr der Veröffentlichung/letzten Revision | `2023` |
| `ebene` | Enum | Primär / Sekundär | `primär` |

**Display-Anforderungen:**
- Chip-Darstellung pro Quelle: Icon (Typ) + Kurzname + Jahr (wenn vorhanden)
- Expandierbar: Klick/Tap öffnet „Warum diese Quelle?"-Text + vollständigen Linktitel
- Stufe auf Mobile: max. 2 Chips sichtbar, Rest hinter „Alle Quellen zeigen" (kein Scroll-Block)
- Quellenbox-Abschnitt auf Detailseite: Position am Ende vor Disclaimer, aber nicht im Footer-Graubereich versenken
- Leer-Zustand: wenn keine Quellen vorhanden → Block absent (kein leerer Container)

**Pflicht-Konvention:** Jeder Kernobjekt-Eintrag der in die Produktion geht, muss mindestens eine Quelle mit `typ`, `name`, `url` tragen. Kein Entry ohne Quelle — kein Eintrag ist besser als ein Eintrag ohne Quellenverankerung.

---

### C5. Aussagenbezogene Nachvollziehbarkeit — Pflichtlogik

**Geltungsbereich:** Alle Felder die spezifische Referenzwerte, Dosierungen, Grenzwerte oder Handlungsempfehlungen enthalten.

**Pflichtlogik: 3 Anwendungsfälle**

#### A — Referenzwert / Grenzwert (S1-Analogie)
Wenn ein Eintrag einen konkreten Referenzbereich oder Grenzwert trägt, muss der Wert mindestens tragen:
- Quelltyp + Quellenname (inline)
- Für wen gilt dieser Wert (Altersgruppe, Geschlecht, Zustand)
- Leitlinien-Jahr oder Datenbasis-Version

Beispiel-Muster: `„8,6–10,2 mg/dl (Laut DGKL-Leitlinie, 2022 — gilt für Erwachsene ohne Vorerkrankung)"`

#### B — Dosierungsangabe (S2/S18-Analogie)
Wenn ein Eintrag eine Tagesbedarfs- oder Dosierungsangabe trägt, muss sie tragen:
- Quellorganisation (BfR / NIH / EFSA / DGE)
- Zielgruppe (Erwachsene / Schwangere / Kinder)
- Angabe ob Empfehlung oder Obergrenze (Upper Limit)

Beispiel-Muster: `„400 µg/Tag (Empfehlung: DGE, für Erwachsene) — Obergrenze: 1.000 µg/Tag (EFSA 2022)"`

#### C — Handlungsempfehlung / B4-Option (S8-Analogie)
Jede Handlungsempfehlung (B4-Option) trägt verpflichtend F1 (Warum) + F2 (Evidenzart) + F3 (Etablierungsgrad) aus der S8-Pre-Spec. Diese Felder sind Q2-Aussagen-Ebene in B4-Form.

**Was nie zulässig ist:**
- Aussage ohne Quellenankern in einem der drei obigen Kontexte
- „Laut Studien…" ohne PMID oder DOI (E28)
- „Es wird empfohlen…" ohne Leitlinienangabe

---

### C6. Quellenarten-Matrix je Säule / Kernobjekt (bindend)

| Säule | K-Obj. | Primärquellen (unverzichtbar) | Sekundärquellen (ergänzend) | Ausgeschlossen |
|-------|--------|-------------------------------|-----------------------------|---------------|
| S1 Laborwerte | K3 | LOINC, DGKL (DE), AACC (USA), JSCC (JP via PubMed) | Medscape (Kontextualisierung) | Herstellerangaben ohne Leitlinien-Basis |
| S2 Supplements | K4 | NIH ODS API, BfR (DE Dosierung), EFSA (EU Dosierung) | PubMed Reviews, Epistemonikos | Wikipedia als Primärquelle, Hersteller |
| S3 Studienkompass | K6 | PubMed (PMID/DOI Pflicht), Cochrane, PMC | Epistemonikos, EuropePMC, OpenCitations | Preprints ohne explizites Preprint-Flag, KI-generiert |
| S5 Krankheiten | K1 | AWMF Leitlinien, ICD-10-GM (BfArM) | IQWiG, MedlinePlus, Orphanet, RKI | Meinungsartikel, Hersteller |
| S6 Medikamente | K5 | EMA EPAR, BfArM, WHO ATC/DDD | OpenFDA (ergänzend) | DrugBank Slice 1 (Lizenzrisiko), Pharmaunternehmen direkt |
| S18 Ernährung | K8 | NIH ODS (Nährstoffe), EFSA DRVs, DGE, USDA FoodData Central | BfR, PubMed Reviews (Muster), EU-VO (Zusatzstoffe) | Ernährungsratgeber ohne Quellenverankerung |
| S8/B4 | K1/K3/K5/K9 | AWMF/NVL (Typ S), PubMed-IDs (Typ E), ClinicalTrials.gov/DRKS (Studien-Radar) | EMA EPAR (für S6-Kontext in B4) | Typ X: niemals automatisch (S8-Pre-Spec §C6) |

---

### C7. Aktualitäts- / Review- / Konflikt-Status (Spec)

**Schema-Anforderungen (für alle Kernobjekt-Tabellen zukünftig):**

| Feld | Typ | Beschreibung | Priorität |
|------|-----|-------------|-----------|
| `letzte_aktualisierung` | TIMESTAMP | Datum des letzten inhaltlichen Updates | SOFORT — Standard für alle neuen Säulen |
| `review_typ` | Enum: `auto` / `manuell` / `leitlinienbasiert` | Wie wurde der Eintrag zuletzt geprüft? | MITTEL — bei nächstem Schema-Change je Tabelle |
| `quellen_konflikt` | JSONB / NULL | NULL = kein Konflikt. Befüllt = Hinweis mit Beschreibung | MITTEL — bei bekannten DE/INT-Abweichungen |
| `naechster_review` | DATE (optional) | Geplantes nächstes Review-Datum (intern) | NIEDRIG — Phase C |

**Display-Logik für Nutzer:**
- `letzte_aktualisierung`: Immer sichtbar als „Zuletzt aktualisiert: [Monat Jahr]" — nicht verstecken, nicht im Footer
- `review_typ: manuell / leitlinienbasiert`: Grünes Badge „Redaktionell geprüft" (nicht als Gütesiegel — als Information)
- `review_typ: auto`: Kein Badge, kein Hinweis — Standard (Schweigen = automatisch)
- `quellen_konflikt`: Expliziter Infoblock „Hinweis: [DE-Standard / Int. Guideline weichen ab]" — kein Alarm, keine Negativkonnotation

---

### C8. UX-Logik mobil / scanbar / app-fähig

**Pflichtprinzipien (alle bindend, kein Nachverhandeln):**

| Prinzip | Konkret | Quelle |
|---------|---------|--------|
| Mobile-first | Quellenbox auf 375px-Viewport nutzbar ohne horizontales Scrollen | Q6 (P7D §4) |
| Tap-Targets ≥ 40px | Alle Quellen-Chips, Expand-Buttons, Info-Icons müssen ≥ 40px Tap-Höhe haben | S18-Build-04a Standard |
| Scanbar | Max. 2 Quellen-Chips sichtbar ohne Expand. Der Rest hinter „Alle Quellen zeigen" | Q6, Q3 |
| Keine Textwände | „Warum diese Quelle?" max. 1 Satz. Langversion nur auf Tap. | Q3 |
| Info-Icon Muster | „Warum wird mir das gezeigt?" → Info-Icon → aufklappbar (kein dauerhafter Text) | S8-Pre-Spec §C9 |
| i18n-fähige Schlüssel | `typ`-Enum als neutraler Schlüssel (`guideline`, nicht `leitlinie`) | Q10 (P7D §4) |
| Chip-Farben pro Typ | Konsistentes Farbsystem quer über alle Säulen — kein Willkür-Grün | Q3 |
| Leer-Zustand | Quellenbox bei 0 Quellen vollständig absent — kein leerer Container | Standard-Praxis |
| Keine Desktop-only-Hover-Logik | Alle Quellen-Infos auch ohne Hover erreichbar | Q6 |

**Vorschlag Chip-Farbsystem (nicht bindend — Build-Entscheidung):**

| Typ | Farbe | Begründung |
|-----|-------|-----------|
| `guideline` | Blau (indigo) | Bereits etabliert für S6 (med-*-Chips indigo) |
| `regulatory` | Dunkelblau/Marine | Behördlich = seriöse Autorität |
| `database` | Grau-Blau | Neutral, strukturell |
| `research` | Bernstein / Amber | Bereits für Nährstoff-Chips in S18 |
| `patient_info` | Teal | Bereits für Ernährungsmuster in S18 |

Hinweis: Farben sind Arbeitshypothese. Entscheidung im Build-Paket gegen bestehende CSS-Konventionen abgleichen.

---

### C9. Kommunikations-No-Gos

Verbindliche Negativ-Formulierungen — keine Ausnahmen:

| Verboten | Grund |
|----------|-------|
| „Laut unserer Redaktion" (ohne Quellennachweis) | Suggeriert eigene medizinische Expertise — E03-Verletzung |
| „KI-gestützt zusammengefasst" als Quellenangabe | KI ist keine Quelle — E28-Verletzung |
| „Wissenschaftlich belegt" ohne PMID/DOI | Nicht verifizierbare Behauptung |
| „Aktuell" ohne Datum | Aktualitätsbehauptung ohne Anker |
| „Alle Quellen geprüft" | Scheinvollständigkeit — E03 |
| Quelle verlinken ohne Typ-Kontext | Nutzer kann AWMF nicht von Wikipedia unterscheiden |
| Primär- und Sekundärquelle gleichgestellt | Irreführend über Evidenzstärke |
| „Laut Studien zeigen…" (Plural, kein Link) | E28: muss verlinkbar und konkret sein |
| „Experten empfehlen" ohne Leitlinienquelle | Autorität ohne Nachweis |
| Quellen im Footer verstecken | Sichtbarkeit ist Pflicht, nicht Option |
| Fehlendes Datum = implizit aktuell | Silence ≠ Aktualität |
| Quellen-Box nur für umstrittene Einträge | Quellenbox ist Standard, keine Verteidigungsreaktion |

---

### C10. Erster sinnvoller Build-Schritt

**Paket:** Q2-BUILD-01 — Globale Vertrauensseite
**Scope:** Neue React-Seite `/vertrauen`. 7 Pflichtblöcke (V1–V7). Chip-Darstellung der 5 Quellentypen. CSS-Prefix `q2-*`. Kein DB-Schema-Change. Kein Quellenbox-Umbau bestehender Seiten.
**Warum zuerst:** (1) Kein Schema-Change, kein Risiko für bestehende Seiten. (2) Liefert sofort den Plattform-Anker für alle späteren Quellenbox-Implementierungen. (3) Nutzbar als Linkziel aus Disclaimern und Quellenboxen auf anderen Seiten. (4) Einfacher Validator.

**Nicht in Scope Q2-BUILD-01:**
- Umbau bestehender S5/S2/S6-Quellenboxen
- `review_typ`-Feld in DB-Schema
- Inline-Quellenanker auf Detailseiten
- Chip-Refactor auf Bestandsseiten

**Q2-BUILD-02 (danach, eigenständig):** Einheitliche Quellenbox-Komponente — standardisierte Darstellung der `quellen`-JSONB-Felder auf S5, S2 (wenn Feld vorhanden), S1 (neues Feld), S6 (wenn Feld vorhanden). Pflichtfeld `letzte_aktualisierung` in `schema_changes` für S1 + S6.

**Q2-BUILD-03 (danach, eigenständig):** `review_typ` + `quellen_konflikt` als optionale Felder in DB-Schema je Kernobjekt-Tabelle.

**Neuer Chat erforderlich:** JA — jedes BUILD-Paket ist eigenständiges Paket mit expliziter Freigabe.

---

## D — KOMMUNIKATIONS-NO-GOs (Kurzliste)

1. „Laut unserer Redaktion" ohne Quellennachweis
2. „KI-gestützt" als Quellenangabe
3. „Wissenschaftlich belegt" ohne PMID/DOI
4. „Aktuell" ohne Datum
5. Quellen ohne verlinkbare URL
6. Primär- und Sekundärquelle gleichgestellt (AWMF = IQWiG in der Anzeige)
7. „Laut Studien" ohne konkreten Link
8. Quellenbox nur für umstrittene Einträge — nicht als Standard
9. Quellen im Footer verstecken
10. Fehlendes Datum = implizit aktuell

---

## E — ERSTER SINNVOLLER BUILD-SCHRITT

**Paket:** Q2-BUILD-01 — Globale Vertrauensseite `/vertrauen`
**Scope:** Neue React-Seite. 7 Pflichtblöcke V1–V7. 5 Quellentyp-Chips. CSS-Prefix `q2-*`. Nav-Eintrag (Position: Footer oder /ueber-uns-Unterseite — Build-Entscheidung). Kein DB-Write, kein Schema-Change.
**Voraussetzung:** Diese Pre-Spec als Pflichtlektüre. Keine abweichende Quellentyp-Logik.
**Validator:** V1–V7 alle implementiert. Chip-Darstellung mobil ≤ 375px. Tap-Targets ≥ 40px. Kein Hover-only-Element. Route `/vertrauen` funktioniert. Nav-Link sichtbar.
**Neuer Chat:** JA — eigenständiges Paket, explizite Freigabe erforderlich.

---

## OPS CLOSURE

### Inhaltlich

Q2 Trust- & Source-Layer Pre-Spec vollständig abgeschlossen. 3-Ebenen-Modell (global/objekt/aussagen) begründet. 5 Quellentypen definiert (i18n-fähige Schlüssel). Quellenarten-Matrix je Säule bindend. Aktualitäts-/Review-/Konflikt-Status spezifiziert. 7-Block-Spec für globale Vertrauensseite. Objektbezogene Quellenbox mit Pflichtfeldern. Aussagenbezogene Nachvollziehbarkeit für 3 Anwendungsfälle. UX-Logik mobil/scanbar/app-fähig. 12 Kommunikations-No-Gos. 3 Build-Pakete sequenziert.

Keine Strategiedrift gegenüber E01/E03/E28/Q2/Q6/Q10 (P7D §4, VW_04). Beobachtung und Schlussfolgerung getrennt. Nicht direkt verifizierte Punkte (S2-Quellenfeld, S6-Quellenfeld) explizit markiert.

### Technisch angewendet

- **DB-Write:** NEIN
- **Commit:** NEIN
- **Push:** NEIN
- **Deploy:** NEIN
- **Offener Side Effect:** NEIN
- **Neue Datei:** `01_PROJECT_SOURCES_CURRENT/Q2_TRUST_SOURCE_PRE_SPEC.md` ✅

### Operativ abgesichert

Nächste freigegebene Schritte (je eigenständiger Chat, je explizite Freigabe):
1. **Q2-BUILD-01** — Globale Vertrauensseite (kein DB-Write, geringstes Risiko, sofort möglich)
2. **Q2-BUILD-02** — Einheitliche Quellenbox-Komponente (nach BUILD-01, DB-Schema-prüfend)
3. **Q2-BUILD-03** — Schema-Felder `review_typ` + `quellen_konflikt` (nach BUILD-02)

Doppelpflege-Standard wird direkt nach dieser Datei ausgeführt: CLAUDE.md + VW_03_STATUS.md + AUDIT_CANON_CURRENT.md + ACTIVE_STRANDS_CURRENT.md.

---

*Erstellt: 24.04.2026 — Q2 Trust- & Source-Layer Pre-Spec abgeschlossen.*
*Führende Basis: P7D_ARCHITECTURE_RESET_FREEZE.md (18.04.2026) + VW_04_ENTSCHEIDUNGEN.md (E28).*
*Nächster zulässiger Build-Schritt: Q2-BUILD-01 (eigenständiger Chat, explizite Freigabe erforderlich).*
