# P7D-03 — S3-Freeze: Studienkompass

**Paketname:** P7D-03 — S3-Freeze (Studienkompass)  
**Datum:** 19.04.2026  
**Status:** ✅ Freeze-Dokument erstellt — bindende Scope- und Architektur-Spec für S3  
**Typ:** Read-only Freeze-/Spec-Paket — kein Build, kein Code, kein DB-Write, kein Commit, kein Push, kein Deploy.

---

## 1. Paketname / Zweck / Status

Dieses Dokument ist die **bindende Freeze-Spezifikation für S3 Studienkompass** in VitalWissen.

Es legt fest, was S3 ist, was S3 ausdrücklich nicht ist, welche Kernobjekte zu S3 gehören, wie S3 von allen angrenzenden Bereichen abzugrenzen ist — und was Phase C Build ist, aber jetzt noch nicht begonnen werden darf.

**Wofür dieses Dokument genutzt wird:**
- Als bindende Entscheidungsgrundlage für alle späteren S3-Pakete
- Als Abgrenzungsdokument bei Grenzfragen zu B1 Discovery, Q4 Update-Layer, S5, S8, S15, S14, S6
- Als Phasenwächter: Was kommt nicht vor Phase C

**Was dieses Dokument ausdrücklich nicht tut:**
- Kein Build-Auftrag
- Kein Implementierungsstart
- Keine PubMed-Pipeline
- Keine Datenbank-Modellierung (über reine Kernobjekt-Benennung hinaus)
- Keine Freigabe für auch nur eine Zeile S3-Code

---

## 2. Führende Quellen + Widerspruchsregel

| Priorität | Quelle | Rolle |
|-----------|--------|-------|
| 1 | `P7D_ARCHITECTURE_RESET_FREEZE.md` (18.04.2026) | Führend: Produktstruktur, Phasenlogik, Kernobjekte, Querschichten, Trennschärfe-Entscheidungen |
| 2 | `VW_04_ENTSCHEIDUNGEN.md` | Führend: Grundsatzentscheidungen E01–E29, insbes. E03/E04/E28 |
| 2 | `VW_03_STATUS.md` | Führend: operativer Ist-Zustand S3 |
| 3 | `VW_05_SAEULEN.md` | Führend: S3-Säulen-Scope, Datenquellen, 6-Punkte-Struktur |
| 3 | `VW_06_WEBSITE.md` | Führend: Discovery-Routing, Einstiegspfade, Website-Konzept |
| 4 | `P7D_01_DISCOVERY_BASIS_SPEC.md` | Führend für Abgrenzung S3 vs. Discovery/Q1 |
| 4 | `P7D_02_DISCOVERY_BASIS_BUILD_CLOSURE.md` | Bestätigt: S3-Einstieg auf Startseite = Phase C |

**Widerspruchsregel:**
- `P7D_ARCHITECTURE_RESET_FREEZE.md` hat Vorrang vor allen anderen Quellen bei Strategie-, Phasen- und Strukturfragen.
- Bei Widersprüchen zwischen `VW_05_SAEULEN.md` (älterer Detailstand) und dem Freeze-Dokument gilt das Freeze-Dokument.
- Ältere Audit-Stände, Master-Dossiers und historische Session-Logs sind nicht führend.

---

## 3. IST-ZUSTAND

### 3a — Aktueller S3-Status (19.04.2026)

**IST-ZUSTAND:** S3 ist konzeptionell definiert, aber noch nicht gebaut.

| Dimension | Stand |
|-----------|-------|
| Konzept-Status | ✅ Konzept fertig (VW_03: „Konzept fertig") |
| Code / Seite im Frontend | ❌ Nicht vorhanden — keine `/studien`-Route, keine Listenseite, keine Detailseite |
| DB-Tabelle | ❌ Nicht vorhanden — keine `studien`-Tabelle in Supabase |
| PubMed-Pipeline | ❌ Nicht gebaut |
| Retraction-Watch-Connector | ❌ Nicht gebaut |
| Crosslinks von S1/S2/S5 auf S3 | ❌ Nicht vorhanden |
| Discovery-Routing zu S3 | ❌ Kein Routing — P7D_01 hat S3-Einstieg ausdrücklich als Phase C markiert |
| Externe Produktbereich-Zuordnung | B3 (Forschung / Optionen / Zukunft) — festgelegt in P7D_ARCHITECTURE_RESET_FREEZE.md |
| Kernobjekt | K6 (Studie/Forschungseintrag) — definiert in P7D_ARCHITECTURE_RESET_FREEZE.md |
| Phase-Einordnung | Phase C Build — festgelegt in P7D_ARCHITECTURE_RESET_FREEZE.md (Tabelle 1 + Tabelle 5) |

### 3b — Vorhandene angrenzende Systeme

| System | Stand | Relevanz für S3 |
|--------|-------|----------------|
| S5 Krankheits-Lexikon (221 Einträge) | Live ✅ | Späteres Andock-Ziel für S3-Objekte |
| S1 Laborwert-Lexikon (60 Einträge) | Live ✅ | Späteres Andock-Ziel für S3-Objekte |
| S2 Supplement-Kompass (51 Einträge) | Live ✅ | Späteres Andock-Ziel für S3-Objekte |
| Q4 Update-/Change-Layer | Datenmodell spezifiziert (P7D-01), nicht gebaut | S3 liefert später Studien-Objekte als Input für Q4 |
| Discovery-Basis (P7D-02) | Build abgeschlossen ✅ | S3-Routing-Slot in Routing-Matrix: offen / Phase C |
| S4 Arztbrief-Decoder | Beta live (Text/OCR/Anon), LLM blockiert | Kein Zusammenhang mit S3 |

### 3c — Warum jetzt Freeze nötig ist

**BEOBACHTUNG (nicht Entscheidung):** S3 grenzt an mehrere aktive Bereiche: Discovery wurde gerade aufgebaut (P7D-02), Q4 Update-Layer wurde spezifiziert, S5 ist live und wartet auf Forschungsverknüpfungen, S8 enthält einen „Aktuelle Forschung"-Block. Ohne expliziten Freeze besteht die Gefahr, dass S3-Logik stillschweigend in Discovery, Q4, S5 oder S8 hineindriftet.

**ENTSCHEIDUNG:** Freeze jetzt, um alle späteren S3-Pakete gegen eine bindende Quelle prüfen zu können — bevor S3-Inhalte faktisch in anderen Bereichen entstehen.

---

## 4. S3 — bindende Kernaufgabe

### ENTSCHEIDUNG — Minimalste saubere Definition

> **S3 Studienkompass macht echte Forschungsergebnisse für Laien zugänglich: auffindbar, eingeordnet, auf Alltagsrelevanz geprüft — und klar getrennt von Schlagzeilen, Hype und Meinung.**

### ENTSCHEIDUNG — Erweiterte Definition (für Architektur-Entscheidungen)

S3 ist eine eigenständige Inhaltsebene mit eigenen Kernobjekten (Studien, Reviews, Evidenzzusammenfassungen), die:
1. Forschungseinheiten als verlinkbare, suchbare Objekte (K6) speichert
2. Studien nach Evidenzgrad, Studientyp und Qualitätsmerkmalen einordnet
3. Ergebnisse in verständlicher Sprache mit Alltagsbezug aufbereitet
4. Einschränkungen, Replikationsstatus und Interessenkonflikte transparent macht
5. An Kernobjekte K1–K5 (Krankheit, Supplement, Laborwert etc.) objektgebunden andockt — ohne mit ihnen zu verschmelzen

### ENTSCHEIDUNG — Was S3 leistet (positiv)

| Kernleistung | Konkret |
|-------------|---------|
| Forschung finden | Studien zu einer Krankheit, einem Supplement, einem Laborwert auffindbar machen |
| Forschung verstehen | 6-Punkte-Struktur: Was untersucht, Ergebnis, Studientyp-Ampel, Einschränkungen, Alltagsbezug, Quelle |
| Forschung einordnen | Studientyp-Hierarchie: Meta-Analyse > RCT > Beobachtungsstudie; Evidenz-Ampel identisch zu S2/S14 |
| Qualität signalisieren | Retraction-Check, Interessenkonflikt-Flag, Zitationsanzahl, Replikationsstatus |
| Schlagzeilen prüfen | Schlagzeilen-Check als Killer-Feature: Medienbehauptung vs. tatsächliche Studienlage |
| Forschungsstand kommunizieren | „Was weiß die Forschung" — nicht „was soll ich tun" |

---

## 5. S3 — ausdrücklich NICHT

### ENTSCHEIDUNG — Was S3 nicht ist und nicht tut

| Was S3 nicht ist/tut | Warum explizit ausgeschlossen | Wo es stattdessen hingehört |
|--------------------|-------------------------------|----------------------------|
| Newsroom / Nachrichtenportal | Floating-News ohne Objektbezug = Newsroom-Drift; No-Go aus P7D-Freeze | Nirgends — dauerhaftes No-Go |
| Update-/Change-Layer (Q4) | Q4 ist Querschicht, nicht Säule; Q4 empfängt S3-Daten, erzeugt sie nicht | Q4 (Querschicht, Phase C) |
| Diagnose-Tool | Keine Diagnosestellung, keine Therapieempfehlung | Ausdrückliches Produktverbot (VW_04) |
| Trend-Radar / Trending | Pseudorelevanz ohne verifizierte Datenbasis — Vertrauensschaden | Dauerhaftes No-Go |
| Allgemeine Gesundheitstipps | Nicht evidenzgebunden, kein Kernobjekt-Bezug | Kein VitalWissen-Scope |
| Good-News-Kuratierung | Einseitiger Bias | Dauerhaftes No-Go |
| Influencer-/Claim-System | Claim-zentrierte Logik gehört zu S14 | S14 (Phase C) |
| Konkrete nächste Schritte | S8-Territory: was tue ich jetzt? | S8 (Phase C Build) |
| Wirksamkeit-/Zeitachse | Maßnahmen-Zeitlogik gehört zu S15 | S15 als Modul (Phase C) |
| Eigener Navigationsbereich für S15 | S15 ist Modul, kein eigenständiger Hauptbereich | S15 dockt an S2/S5/S18 an |
| Medikamenten-Wirksamkeit | Bleibt S6 | S6 (Phase B Build) |
| Arztbriefe / Dokumente | S4-Scope (Zero-Retention-Verarbeitung) | S4 (Phase B, in Arbeit) |

---

## 6. S3 vs Discovery / Q4 / S5 / S8 / S15 / S14 / S6

### Tabelle B — Abgrenzung S3 vs andere Bereiche

| Vergleich | S3 | Anderer Bereich | Trennlinie | Verwechslungsgefahr | Entscheidung |
|-----------|-----|----------------|------------|---------------------|--------------|
| **S3 vs Discovery (Q1/B1)** | Forschungsobjekte erstellen und kuratieren | Nutzer zu Inhalten führen (Routing, Navigation) | S3 = Inhaltsproduzent (K6-Objekte); Discovery = Output-Layer (leitet zu K6) | „Forschung"-Einstieg auf Startseite vor S3-Build | Discovery-Einstieg nur aktiv wenn S3 Content existiert; kein Phase-B-Forschungs-Kachel |
| **S3 vs Q4 Update-Layer** | Studienobjekte (K6) als Datenbasis | Objekt-gebundene Änderungsinformationen (Leitlinien, neue Studien, Zulassungen) | S3 = Inhaltslieferant; Q4 = Änderungs-Schicht, die S3-Objekte referenziert | „neue Studie" klingt wie Update und wie S3-Inhalt | S3 erzeugt K6-Objekte; Q4 verweist auf sie als Typ `neue_studie` — kein Build-Overlap |
| **S3 vs S5 Krankheits-Lexikon** | Studien als eigenständige Objekte, an Krankheiten andockend | Krankheiten erklären und verknüpfen (primärer Content-Hub) | S3 dockt an S5 an, ist aber kein Unterbereich von S5 | S3-Block auf S5-Detailseite könnte S3 als „Unterseite von S5" erscheinen lassen | S3 bleibt eigenständige Säule mit eigener Liste/Detailseite; S5 hat Cross-Block zu S3-Objekten — kein Merge |
| **S3 vs S8 Diagnose-Navigator** | Forschungsverständnis: „Was weiß die Forschung?" | Konkrete nächste Schritte: „Was tue ich jetzt?" | S3 = Wissensebene; S8 = Aktionsebene — zeitlich nach S5-Lektüre | S8 hat „Aktuelle Forschung"- und „Klinische Studien"-Blöcke | S8 verlinkt zu S3-Objekten (K6), baut aber keine Studien-Objekte selbst; S8-Build darf S3 referenzieren, nicht ersetzen |
| **S3 vs S15 Wirksamkeit & Zeitachse** | Studieninhalt einordnen | Wann wirkt eine Maßnahme, woran messbar | S3 = Quellenlage; S15 = abgeleitete Wirksamkeitsaussage mit Zeitachse | S15 nutzt PubMed wie S3 | S15 bleibt Funktionsmodul (kein eigener Hauptbereich); S15 nutzt S3-Objekte als Quellenbasis, ist aber keine S3-Teilfunktion |
| **S3 vs S14 Influencer-/Claim-Kompass** | Forschungseinheiten (Studien, Reviews) | Gesundheitsbehauptungen aus Social Media mit Evidenz-Ampel einordnen | S3 = Studienobjekte; S14 = Claim-Objekte (nutzen S3-Daten als Quelle) | Beide nutzen PubMed und Cochrane; beide haben Evidenz-Ampel | S14 bleibt claim-zentriert; S3-Daten fließen in S14 ein, aber S14 ist kein S3-Feature; S14 nicht in S3 hineinziehen |
| **S3 vs S6 Medikamenten-Erklärer** | Forschungslage zu Wirkstoffen / Erkrankungen | Wirkstoffbasis, Beipackzettel, Interaktionen | S6 erklärt das Medikament; S3 liefert Studien zum Medikament / Wirkstoff | „Studien zu Metformin" könnte S3 oder S6 sein | S3-Detailseiten können an K5-Medikamente andocken; S6 verlinkt zu S3-Objekten; kein Build-Overlap |

### PFLICHTFRAGEN — Beantwortet

**F1: Was ist die minimale saubere Definition von S3?**

S3 kuratiert, erklärt und ordnet Forschungsergebnisse (Studien, Reviews, Meta-Analysen) als eigenständige, verlinkbare Kernobjekte (K6) ein — getrennt nach Evidenzqualität, mit Alltagsbezug und Einschränkungs-Transparenz.

**F2: Wo würde S3 sonst mit Discovery verwechselt?**

Ein „Forschung"-Einstieg auf der Startseite vor S3-Build — der keine Inhalte hat und nur eine leere Seite zeigt. Oder ein „Trend-Radar" auf der Startseite, der Studien-Headlines als Discovery-Inhalt behandelt. Beide sind No-Gos.

**F3: Wo würde S3 sonst mit S8 verwechselt?**

S8 enthält einen „Aktuelle Forschung"-Block und einen „Klinische Studien (Studien-Radar)"-Block. Diese Blöcke in S8 sind **Verweise auf S3-Objekte und externe Quellen** — keine eigenständige Studien-Datenbank. Wenn S8 beginnt, eigene Studienobjekte zu speichern und einzuordnen, driftet S8 in S3-Scope.

**F4: Welche S3-Objekte sind später sinnvoll?**

→ Abschnitt 7 (Kernobjekte) und 9 (Seitentypen).

**F5: Braucht S3 eigene Detailseiten, Listen oder beides?**

Beides. Eine Listenseite (nach Kernobjekt-Typ gefiltert: Krankheit, Supplement, Laborwert) und eine Detailseite je Studie/Review. Kein reines Cross-Block-Modell — S3 muss eigenständig navigierbar sein.

**F6: Wie stark soll S3 an Krankheiten/Supplements andocken, ohne nur „Unterseite von S5/S2" zu werden?**

S3 dockt bidirektional an: S5-Detailseite hat einen Cross-Block „Forschung zu dieser Erkrankung" (→ S3-Objekte); S3-Detailseite verweist zurück auf K1/K4. Aber S3 hat eine eigene Listenseite, eigene URL-Struktur (`/studien/...`), eigenes Datenbankschema und eigene Navigationsberechtigung. Das verhindert Unterseiten-Drift.

**F7: Was gehört in den späteren Build, aber jetzt noch nicht?**

→ Abschnitt 12 (Phase-B-/Phase-C-Grenze) und Tabelle F.

**F8: Welche S3-Features wären zu früh und würden Strategiedrift erzeugen?**

PubMed-API-Test als „Warm-up", Retraction-Watch-Connector-Bau als Vorbereitung, Discovery-Routing auf leere S3-Seite, Studien-Headlines im Q4-Feed ohne verifizierte S3-Datenbasis, S15-Zeitachsen-Logik innerhalb von S3 statt als separates Modul.

---

## 7. Kernobjekte von S3

### Tabelle C — Kernobjekte in S3

| Objekt | Typ | Definition | Eigenständige Detailseite | An welche Kernobjekte andockend | Phase |
|--------|-----|------------|--------------------------|--------------------------------|-------|
| **Studie** (Primärstudie) | K6 | Einzelne wissenschaftliche Untersuchung mit klar definierter Fragestellung, Methodik und Ergebnis | Ja | K1 (Krankheit), K3 (Laborwert), K4 (Supplement), K5 (Medikament) | C |
| **Review / Übersichtsarbeit** | K6 | Systematischer Überblick über Primärstudien zu einer Fragestellung (ohne eigene Originaldaten) | Ja | K1, K3, K4, K5 | C |
| **Meta-Analyse** | K6 | Statistische Zusammenfassung von Primärstudien (höchste Evidenzstufe im S3-Kontext) | Ja — mit Priorisierung in der Listenseite | K1, K3, K4, K5 | C |
| **Evidenzzusammenfassung** | K6 (kuratiert) | Redaktionell erstellte Zusammenfassung der Forschungslage zu einer Fragestellung (kein eigener PMID) | Optional — kann auch Cross-Block auf S5 sein | K1, K4 | C (nach Primärobjekten) |
| **Forschungsfrage** | Strukturierungsobjekt (kein K6) | Geordnete Sammlung von K6-Objekten rund um eine offene Forschungsfrage | Nein — nur Filter/Gruppierungsebene | K1, K4 | OFFEN — erst nach Primärobjekten klären |

**Hinweis K6 — Einheitlichkeit:** Studie, Review und Meta-Analyse sind verschiedene Subtypen von K6 mit gleichem Datenbankschema und eigenem `studientyp`-Feld. Die Studientyp-Ampel kommuniziert die Einordnung.

**Hinweis Evidenzzusammenfassung:** Ist keine externe Quelle, sondern intern kuratiert. Unterschied zu einer Studie: kein PMID, kein DOI. Reihenfolge: erst Primärobjekte (Studien/Reviews/Meta-Analysen), dann Evidenzzusammenfassungen klären.

**Hinweis Forschungsfrage:** Unklar ob eigenständiges Objekt oder nur Filtermechanismus. Kein OFFEN-to-DO für Phase C Build — explizit offenlassen bis Primärobjekte gebaut.

---

## 8. S3-Einstiegspfade

### ENTSCHEIDUNG — Woher kommen Nutzer zu S3?

S3 ist in zwei Modi erreichbar:

**Modus 1 — Objekt-kontextuell (von anderen Kernobjekten aus):**
- Von S5-Detailseite (Krankheit) → Cross-Block „Forschung zu dieser Erkrankung" → S3-Listenseite gefiltert nach K1-ID
- Von S2-Detailseite (Supplement) → Cross-Block „Studien" → S3-Listenseite gefiltert nach K4-ID
- Von S1-Detailseite (Laborwert) → Cross-Block „Forschung" → S3-Listenseite gefiltert nach K3-ID
- Von S8-Block „Aktuelle Forschung" → S3-Detailseite (K6)

**Modus 2 — Eigenständig (direkte Navigation):**
- Über Discovery-Routing: Eingabe eines Studienthemas → S3-Listenseite (erst aktiv wenn S3 Content existiert)
- Über eigenen Nav-Punkt (Phase C — nicht vor S3-Build)
- Über URL direkt (`/studien/[slug]`)

**IST-ZUSTAND:** Weder Modus 1 noch Modus 2 existiert. Kein Cross-Block auf S5/S2/S1. Kein Discovery-Routing. Kein Nav-Punkt.

**ARBEITSHYPOTHESE Einstieg:** Modus 1 (Objekt-kontextueller Einstieg) sollte vor Modus 2 (eigenständige Navigation) gebaut werden, weil S3-Inhalte immer an Kernobjekte geknüpft sind und weil Nutzer wahrscheinlich über Krankheits-/Supplement-Kontext zu Forschung kommen, nicht direkt.

---

## 9. S3-Seitentypen / Objektlogik

### Tabelle D — Seitentypen / Ansichten / Zielnutzen

| Seitentyp | URL-Muster | Inhalt | Zielnutzen für Nutzer | Phase | Abhängigkeiten |
|-----------|-----------|--------|-----------------------|-------|----------------|
| **S3 Listenseite (ungefiltert)** | `/studien` | Alle K6-Objekte, sortierbar nach Studientyp / Datum / Evidenzampel | Überblick: Was hat VitalWissen zur Forschung? | C | S3 Content muss existieren |
| **S3 Listenseite (kernobjekt-gefiltert)** | `/studien?krankheit=E11` oder `/studien?supplement=vitamin-d` | K6-Objekte zu einem spezifischen K1/K3/K4/K5 | Von Krankheits-/Supplement-Kontext aus: Was weiß die Forschung dazu? | C | Kernobjekt-Bindung muss implementiert sein |
| **S3 Detailseite** | `/studien/[slug]` | 6-Punkte-Inhalt (s. Abschnitt 10), Pflichtfelder, Qualitätsflags | Einzelne Studie verstehen und einordnen | C | S3 DB-Schema + Content |
| **S3 Cross-Block auf S5/S2/S1** | Eingebettet in Detailseiten anderer Säulen | Mini-Liste der relevantesten K6-Objekte zum Kernobjekt | Kontextueller Forschungshinweis ohne Navigation zu S3 | C (nach Listenseite/Detailseite) | S3 Content + Cross-Block-Logik |
| **Schlagzeilen-Check** | Eingebettet oder `/studien/check/[slug]` | Gegenüberstellung Medienbehauptung vs. tatsächliche Studienlage | Medienkompetenz: Schlagzeile einordnen | C (OFFEN — kann eigenständig oder eingebettet sein) | S3 Content + kuratierte Claim-Mapping-Logik |

### Objektlogik — 6-Punkte-Struktur pro Studieneintrag

Aus `VW_05_SAEULEN.md` (S3-Scope):

1. Was wurde untersucht
2. Ergebnis
3. Studientyp-Ampel (Meta-Analyse / RCT / Beobachtungsstudie / etc.)
4. Einschränkungen
5. Alltagsbezug
6. Originalquelle (PubMed-ID, DOI, direkt verlinkbar — E28)

**Pflichtfelder zusätzlich:**
- Frauenanteil der Studienteilnehmer
- Altersrange der Studienteilnehmer

**Qualitätsflags (Ergänzungen):**
- Retraction-Check (wurde die Studie zurückgezogen?)
- Interessenkonflikt-Flag (industrie-finanziert, Autor-Interessenkonflikt bekannt)
- Zitationsanzahl (Proxy für Rezeption)
- Replikationsstatus (repliziert / nicht repliziert / Replikation ausstehend)

---

## 10. S3-Datenquellen und ihre Rolle

### Tabelle E — Datenquellen / Nutzen / Risiken / Phase

| Datenquelle | Rolle | Nutzen | Risiko / Einschränkung | Phase-Freigabe |
|-------------|-------|--------|------------------------|----------------|
| **PubMed E-utilities** | Primärquelle für Studienobjekte | Größte biomedizinische Literaturdatenbank; kostenlos; API vorhanden | Qualitätsstreuung: nicht jeder PubMed-Eintrag ist hochwertig — Selektion zwingend | Phase C Build |
| **PubMed Central (PMC)** | Volltext-Zugang für Open-Access-Studien | Volltexte bei Open-Access-Artikeln | Nur für Open-Access verfügbar | Phase C Build |
| **Cochrane Library** | Höchste Evidenzstufe (systematische Reviews) | Goldstandard für Reviews und Meta-Analysen | Zugangsweg zu klären — möglicherweise lizenzpflichtig (VW_05: „Zugangsweg noch zu prüfen") | Phase C — erst Zugang klären |
| **Epistemonikos** | Open-Access-Datenbank für systematische Reviews | Multilingual, breite Abdeckung; keine Lizenz nötig | Weniger bekannt, Qualität variiert | Phase C Build |
| **EuropePMC** | Europäisches PubMed-Pendant | Breitere EU-Quellenabdeckung, guter API-Zugang | Überschneidung mit PubMed — Deduplication nötig | Phase C Build |
| **RetractionWatch** | Retraction-Check für K6-Objekte | Einzige systematische Retraction-Datenbank; Vertrauens-Layer | API-Zugang eingeschränkt; manuelle Prüfung für Phase C nötig | Phase C — Zugangsbedingungen prüfen |
| **OpenCitations** | Zitationsanzahl für K6-Objekte | Open-Data, kostenlos | Vollständigkeit variiert | Phase C Build |

**ENTSCHEIDUNG — Quellen-Hierarchie für Studientyp-Priorisierung:**
1. Meta-Analysen und systematische Reviews (Cochrane, PubMed-Filter) — immer zuerst
2. RCTs (PubMed-Filter `Clinical Trial`)
3. Beobachtungsstudien (PubMed-Filter `Observational Study`)
4. Tiermodelle und In-vitro-Studien — nur mit explizitem Hinweis auf Übertragbarkeitsgrenzen

**ENTSCHEIDUNG — Ausdrücklich ausgeschlossene Quellen:**
- KI-generierte Quellen ohne menschliche Verifikation (E28)
- Preprints ohne Peer-Review-Status als gleichwertig zu publizierten Studien — nur mit explizitem Preprint-Flag
- Studien ohne PMID/DOI (nicht verlinkbar — E28-Bedingung: verlinkbar)

---

## 11. Evidenz-/Qualitäts-/Vertrauenslogik

### ENTSCHEIDUNG — Studientyp-Ampel

Studientyp-Ampel vorgesehen; genaue Skala/Farbsemantik im S3-Spec festzulegen. Bezug = Studientyp, nicht Ergebnis.

**ENTSCHEIDUNG — Ampel bezieht sich auf Studientyp, nicht auf das Ergebnis.** Kein positives Ergebnis soll die Einordnung des Studientyps überschreiben. Genaue Stufenzahl und Farbzuordnung sind im S3-Spec-Paket zu definieren.

### ENTSCHEIDUNG — Kompatibilität mit E28

E28 (Grundsatzentscheidung, 12.04.2026): „Quellen müssen professionell anerkannt und verlinkbar sein. KI-generierte Quellen sind verboten."

Für S3 bedeutet das:
- Jeder K6-Eintrag braucht PMID und/oder DOI bzw. eine gleichwertige Primärreferenz — kein Eintrag ohne verlinkbare Originalquelle
- Keine KI-generierten Quellen, keine ungestützten Evidenzbehauptungen; KI nur für quellengebundene Aufbereitung, nicht als Evidenzquelle
- Schlagzeilen-Check-Behauptungen: Medienquelle muss verlinkbar sein
- Keine S3-Inhalte ohne manuellen Review vor Veröffentlichung (identisch zu S14-Logik)

### ENTSCHEIDUNG — Keine Produktüberhöhung

S3 ist Forschungsorientierung, keine medizinische Empfehlung. Konsequenz für Formulierungen:
- „Die Forschung zeigt…" — erlaubt
- „Studien belegen…" — erlaubt, wenn Studientyp angegeben
- „Sie sollten…" — nicht erlaubt in S3-Inhalten
- „Bewiesenermaßen wirksam" — nicht erlaubt ohne Meta-Analyse-Basis

---

## 12. Phase-B-/Phase-C-Grenze

### ENTSCHEIDUNG — Was Phase C Build ist (aber jetzt nicht vorzubereiten ist)

**Phase B (aktuell):** S3 = read-only Freeze. Kein Code. Kein DB-Schema. Kein API-Test. Keine Datenbankmodellierung über Kernobjekt-Definition hinaus.

**Phase C Start-Bedingung für S3:**
1. Discovery-Basis (P7D-02) abgeschlossen ✅ (bereits erfüllt)
2. S3-Freeze (dieses Dokument) als bindende Grundlage vorhanden ✅ (mit diesem Paket erfüllt)
3. Separates S3-Spec-Paket erstellt (Datenmodell, Pipeline-Spec, UX-Spec) — noch nicht erstellt
4. S3-Spec von Sebastian freigegeben — noch nicht erfolgt

### Tabelle F — Was erst Phase C Build ist

| Bereich | Phase-C-Build | Warum nicht jetzt |
|---------|--------------|-------------------|
| S3-Datenbankschema (`studien`-Tabelle in Supabase) | ✅ Phase C | Kein Schema ohne freigegebe Spec |
| PubMed-E-utilities-Pipeline | ✅ Phase C | Kein API-Bau ohne Schema und Spec |
| Retraction-Watch-Connector | ✅ Phase C | Zugangsbedingungen noch zu klären; kein Vorzug |
| OpenCitations-Anbindung | ✅ Phase C | Abhängig von K6-Schema |
| Cochrane-Zugangs-Klärung | ✅ Phase C (Vorbereitung) | Ist Recherche, kein Build — aber erst wenn S3-Spec steht |
| S3-Listenseite (`/studien`) | ✅ Phase C | Kein Frontend ohne DB + Content |
| S3-Detailseite (`/studien/[slug]`) | ✅ Phase C | Kein Frontend ohne DB + Content |
| Cross-Block S5→S3 | ✅ Phase C (nach Listenseite) | Abhängig von S3-Content |
| Discovery-Routing zu S3 | ✅ Phase C (aktiv) | S3-Spec definiert es, Routing wird nach S3-Build aktiviert |
| Schlagzeilen-Check-Feature | ✅ Phase C (nach Primärobjekten) | Abhängig von S3-Primärobjekten |
| Studientyp-Ampel-Implementierung | ✅ Phase C | Teil des S3-Build-Pakets |
| S3-Nav-Punkt | ✅ Phase C | Erst wenn Content vorhanden |
| S15-Modul als S3-Erweiterung | ✅ Phase C | S15 ist eigenständiges Modul; Reihenfolge: S3 zuerst |
| Q4-Feed mit S3-Typ `neue_studie` | ✅ Phase C | Q4-Build braucht zuerst K6-Objekte |

---

## 13. Nicht-Scope

Dieser Abschnitt benennt, was dauerhaft außerhalb von S3 liegt — auch wenn es thematisch nahe erscheint.

| Was | Warum dauerhaft außerhalb S3 | Wo stattdessen |
|-----|----------------------------|----------------|
| Claim-Datenbank (Social-Media-Claims) | Claim-zentriert, nicht Studien-zentriert | S14 |
| Konkrete nächste Schritte / Aktionsplan | S8-Kernaufgabe | S8 |
| Wirksamkeit-/Zeitachse einer Maßnahme | S15 als Funktionsmodul | S15 (andockt an S2/S5/S18) |
| Medikamenten-Wirksamkeit (Beipackzettel-Ebene) | S6-Scope | S6 |
| Arztbriefe / Dokumenten-Dekodierung | S4-Scope (Zero-Retention) | S4 |
| Allgemeine Gesundheitstipps ohne Studienbindung | Kein Kernobjekt-Bezug | Kein VitalWissen-Scope |
| Radiologische Diagnostik-Studien interpretieren | Medizinrechtlich No-Go (P7D-Freeze Abschnitt 13) | Dauerhaftes No-Go |
| Community-Diskussion zu Studien | S7-Scope | S7 (Phase E) |
| Personalisierte Studienempfehlungen | S9-abhängig (Phase D) | S9 / Phase D |
| News-Kuratierung ohne Objektbezug | Newsroom-Drift | Dauerhaftes No-Go |
| Trending-Studien ohne verifizierte Datenbasis | Pseudorelevanz | Dauerhaftes No-Go |
| Influencer-Claim vs. Studie (claim-first) | S14-Logik (claim-first, nicht studie-first) | S14 |

---

## 14. Empfohlener Folgeauftrag nach dem Freeze

**[P7D-05a-Patch, 19.04.2026: Der ursprüngliche Arbeitstitel „P7D-04" für den S3-Spec-Folgeauftrag ist nicht mehr gültig. Das tatsächliche P7D-04 wurde als S18-Reset/Freeze vergeben. Der S3-Spec-Folgeauftrag ist ein eigenständiges Paket; der Paketname wird beim Commissioning neu vergeben.]**

**Direkter nächster Schritt für S3 (Phase C Vorbereitung):**

> S3-Spec (Paketname beim Commissioning neu zu vergeben — ursprünglicher Arbeitstitel „P7D-04" nicht mehr gültig) — Phase C Vorbereitung, read-only
>
> **Scope:** Datenbankschema-Spec für `studien`-Tabelle + alle Relationen (kernobjekt_id-Felder). PubMed-Pipeline-Spec: Abfragelogik, Selektion, Qualitätsfilter, Retraction-Check-Integration. UX-Spec für Listenseite + Detailseite. Cochrane-Zugangsstatus klären. Reviewer-Workflow-Spec (manuelle Freigabe vor Veröffentlichung).
>
> **Nicht-Scope:** Kein Code, kein DB-Write, kein API-Aufruf, kein Push.
>
> **Bedingung:** Dieses Dokument (P7D-03) muss als gelesen + freigegeben markiert sein. Kein Build ohne diesen Freeze und die folgende Spec.
>
> **Validator:** Schema vollständig (alle 6 Pflichtfelder + Qualitätsflags modelliert), PubMed-Abfragelogik klar, Reviewer-Workflow definiert, keine Strategiedrift.

**Parallele unabhängige Stränge (nicht blockiert durch S3-Freeze):**
- P7-04b (LLM-Proxy-Build) — wartet auf Mistral-ZDR-Bestätigung, völlig unabhängig von S3
- S18-Reset-Spec — Scope-Entscheidung für Ernährung, unabhängig von S3

---

## PFLICHT-TABELLEN (Übersicht)

**Tabelle A** — S3: Kernaufgabe / Nicht-Aufgabe

| Dimension | Inhalt |
|-----------|--------|
| **Kernaufgabe** | Forschungsergebnisse auffindbar, eingeordnet und verständlich machen — als eigenständige verlinkbare Objekte (K6), gebunden an Kernobjekte K1–K5 |
| **Nicht-Aufgabe** | Newsroom, Diagnosen, allgemeine Tipps, nächste Schritte (S8), Zeitachsen (S15), Claims (S14), Medikamentenerklärung (S6), Arztbriefe (S4), Personalisierung (S9), Arzt-Matching (S17) |
| **Externer Produktbereich** | B3 (Forschung / Optionen / Zukunft) |
| **Interne Säule** | S3 |
| **Kernobjekt** | K6 (Studie / Forschungseintrag) — Subtypen: Primärstudie, Review, Meta-Analyse |
| **Phase** | Phase C Build — kein Build vor S3-Spec und Freigabe |
| **Ampellogik** | Studientyp-Ampel vorgesehen; genaue Skala/Farbsemantik im S3-Spec festzulegen. Bezug = Studientyp, nicht Ergebnis. |
| **Quellen-Standard** | E28: verlinkbar, professionell anerkannt; PMID und/oder DOI bzw. gleichwertige Primärreferenz; keine KI-generierten Quellen; KI nur für quellengebundene Aufbereitung, nicht als Evidenzquelle |
| **Killer-Feature** | Schlagzeilen-Check (Medienbehauptung vs. Studienlage) — Phase C, nach Primärobjekten |

---

## VALIDATOR

| # | Validator-Frage | Ergebnis |
|---|----------------|----------|
| 1 | Nur 1 neue Datei geschrieben? | ✅ Nur `01_PROJECT_SOURCES_CURRENT/P7D_03_S3_FREEZE.md` — keine weiteren Writes |
| 2 | Kein Code / kein Repo-Write / kein DB-Write? | ✅ Kein Code. Kein Repo-Zugriff. Kein Supabase-Write. Kein Commit. Kein Push. Kein Deploy. |
| 3 | S3 sauber von Discovery/Q1 getrennt? | ✅ Abschnitt 6 (Tabelle B): S3 = Inhaltsproduzent (K6-Objekte); Discovery = Output-Layer. S3-Einstieg erst aktiv wenn S3 Content existiert. |
| 4 | S3 sauber von Q4 Update-Layer getrennt? | ✅ Abschnitt 6 (Tabelle B) + Abschnitt 7: S3 erzeugt K6-Objekte; Q4 referenziert sie als Typ `neue_studie`. Kein Build-Overlap. |
| 5 | S3 sauber von S8 getrennt? | ✅ Abschnitt 6 (Tabelle B) + Pflichtfragen F3: S3 = Wissensebene, S8 = Aktionsebene. S8 verlinkt K6, baut keine eigene Studien-DB. |
| 6 | S15 nicht zum Hauptbereich gemacht? | ✅ Abschnitt 5 + Abschnitt 9: S15 bleibt Funktionsmodul, kein eigenständiger Navigationsbereich. Andockt an S2/S5/S18. |
| 7 | S14 nicht in S3 hineingezogen? | ✅ Abschnitt 5 + Abschnitt 6 (Tabelle B): S14 bleibt claim-zentriert. S3-Daten fließen in S14 ein, aber S14 ist kein S3-Feature. |
| 8 | Keine neue Strategie außerhalb P7D eingeführt? | ✅ Alle Entscheidungen gegen `P7D_ARCHITECTURE_RESET_FREEZE.md` und `VW_04_ENTSCHEIDUNGEN.md` verifiziert. Keine neuen Grundsatzentscheidungen eingeführt. |
| 9 | Folgeauftrag sauber benannt? | ✅ Abschnitt 14: S3-Spec-Paket (Arbeitstitel: P7D-04) mit Scope, Nicht-Scope, Bedingung und Validator benannt. |
| 10 | Ops-/Persistenzstatus sauber? | ✅ Abschnitt OPS-CLOSURE: alle Pflichtfelder ausgefüllt. |
| 11 | Abschluss ohne implizite Build-Freigabe formuliert? | ✅ Kein Build-Auftrag. Kein Code. Kein API-Test. Kein Schema-Build. Abschluss-Satz explizit. |

---

## OPS-CLOSURE (Pflicht)

### A — Geänderte Dateien

| Aktion | Datei | Status |
|--------|-------|--------|
| NEU ERSTELLT | `01_PROJECT_SOURCES_CURRENT/P7D_03_S3_FREEZE.md` | ✅ Lokal gespeichert |
| KEINE WEITEREN WRITES | — | — |

### B — Inhaltlich entschieden

1. S3-Kernaufgabe: Forschung finden, verstehen, einordnen — als eigenständige Kernobjekte (K6), objektgebunden, nicht floating
2. S3 ≠ Newsroom: kein Trending, kein News-Feed, kein Good-News-Bias
3. Q4 bleibt objektgebundener Update-Layer, der S3-Objekte referenziert — nicht S3 selbst
4. S3 ≠ S8: S3 = „Was weiß die Forschung?" / S8 = „Was tue ich jetzt?" — trennscharf
5. S15 bleibt Modul/Funktionsschicht, kein eigenständiger S3-Teilbereich
6. S14 bleibt claim-zentriert; S3-Daten fließen ein, aber S14 ist nicht Teil von S3
7. Kernobjekte: Primärstudie, Review, Meta-Analyse (alle K6), Evidenzzusammenfassung (K6-kuratiert), Forschungsfrage (OFFEN)
8. Studientyp-Ampel vorgesehen; genaue Skala/Farbsemantik im S3-Spec festzulegen. Bezug = Studientyp, nicht Ergebnis.
9. E28-Kompatibilität: alle K6-Objekte brauchen PMID und/oder DOI bzw. gleichwertige Primärreferenz; keine KI-generierten Quellen; KI nur für quellengebundene Aufbereitung, nicht als Evidenzquelle
10. Phase C Build-Bedingung: S3-Spec-Paket erstellen und freigeben lassen, bevor irgendein Build beginnt
11. S3-Einstiegspfade: Modus 1 (objekt-kontextuell, von S5/S2/S1 aus) vor Modus 2 (eigenständige Navigation) empfohlen
12. Schlagzeilen-Check = Killer-Feature, aber Phase C — erst nach Primärobjekten

### C — Nicht getan / bewusst offen gelassen

| Bereich | Warum offen |
|---------|------------|
| S3-Datenbankschema | Phase C Spec-Paket (Arbeitstitel: P7D-04) |
| PubMed-Pipeline-Spec | Phase C Spec-Paket (Arbeitstitel: P7D-04) |
| Cochrane-Zugangs-Klärung | Phase C — erst wenn S3-Spec steht |
| Retraction-Watch Zugangs-Klärung | Phase C — erst wenn S3-Spec steht |
| UX-Spec Listenseite / Detailseite | Phase C Spec-Paket (Arbeitstitel: P7D-04) |
| Reviewer-Workflow-Spec | Phase C Spec-Paket (Arbeitstitel: P7D-04) |
| Forschungsfrage als eigenständiges Objekt | Bewusst offen — erst nach Primärobjekten entscheiden |
| Schlagzeilen-Check-URL-Struktur (eingebettet vs. eigenständig) | Bewusst offen — Phase C Spec-Entscheidung |
| Epistemikos-API-Prüfung | Phase C — kein Vorzug |
| S3-Nav-Punkt: Wording und Position | Phase C — erst wenn Content vorhanden |

### D — Validator-Ergebnis

Alle 11 Validator-Punkte: ✅ grün. Keine implizite Build-Freigabe. Keine Strategiedrift. Kein Side Effect.

### E — Ops-Status

| Dimension | Status |
|-----------|--------|
| **Lokale Speicherung** | ✅ Datei gespeichert in `01_PROJECT_SOURCES_CURRENT/P7D_03_S3_FREEZE.md` |
| **git status** | Nicht geprüft — kein git-Zugriff in diesem Paket |
| **Commit-Status** | Kein Commit |
| **Push-Status** | Kein Push |
| **DB-Writes** | Nein |
| **Deploy** | Nein |
| **Offener Side Effect** | Keiner |

---

P7D-03 S3-Freeze ist damit als read-only Architektur-/Scope-Paket abgeschlossen; kein Build, keine Strategiedrift, keine Vorverlagerung von Q4/S8/S15.

---

*Erstellt: 19.04.2026 — P7D-03 S3-Freeze abgeschlossen.*  
*Führende Basis: `P7D_ARCHITECTURE_RESET_FREEZE.md` (18.04.2026).*  
*Nächster zulässiger Schritt: S3-Spec-Paket (Arbeitstitel: P7D-04) — Phase C Vorbereitung, separates Paket.*
