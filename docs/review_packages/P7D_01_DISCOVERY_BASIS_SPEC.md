# P7D-01 — Discovery-Basis-Spec

**Paketname:** P7D-01 — Discovery-Basis-Spec (Phase B, read-only)
**Datum:** 19.04.2026
**Status:** ✅ Spec-Datei erstellt (read-only) — kein Build, kein DB-Write, kein Commit, kein Push, kein Deploy
**Führende strategische Basis:** `P7D_ARCHITECTURE_RESET_FREEZE.md` (18.04.2026)

---

## 1. Zweck und Rolle des Dokuments

Dieses Dokument ist die **bindende Phase-B-Spezifikation für Discovery-Basis** in VitalWissen.

Es beantwortet exakt: Was ist „Discovery-Basis" in VitalWissen, was gehört in Phase B, was nicht — und wie ist es sauber von allen anderen Säulen, Schichten und externen Produktbereichen abzugrenzen.

**Rolle dieses Dokuments:**
- Binding Spec für alle nachfolgenden Build-Pakete zu Discovery
- Entscheidungs-Dokument: Was darf ein Discovery-Phase-B-Paket enthalten, was nicht
- Abgrenzungsdokument gegenüber S3, S5, S8, S14, S18 und den Querschichten Q4/Q5

**Kein Build-Auftrag.** Kein Code wird geschrieben. Kein Commit. Kein Push. Kein Deploy. Keine DB-Änderung.

---

## 2. Führende Quellen + Widerspruchsregel

| Priorität | Quelle | Rolle in diesem Dokument |
|-----------|--------|--------------------------|
| 1 | `P7D_ARCHITECTURE_RESET_FREEZE.md` | Führend: Externe Produktbereiche, Querschichten, Kernobjekte, Phasenlogik |
| 2 | `VW_04_ENTSCHEIDUNGEN.md` | Führend: Grundsatzentscheidungen E01–E29 |
| 2 | `VW_03_STATUS.md` | Führend: Operativer Ist-Zustand, was gebaut ist und was nicht |
| 3 | `VW_05_SAEULEN.md` | Führend: Säulen-Scope und Abgrenzung der einzelnen Säulen |
| 3 | `VW_06_WEBSITE.md` | Führend: Website-Konzept, Einstiegspfade, Routing-Logik |
| 4 | `CLAUDE.md` | Kontext, Stack, Verhaltensregeln |

**Widerspruchsregel:**
- `P7D_ARCHITECTURE_RESET_FREEZE.md` hat Vorrang vor allen anderen Quellen bei Strategie- und Strukturfragen.
- Bei Widersprüchen zwischen `VW_06_WEBSITE.md` und `P7D_ARCHITECTURE_RESET_FREEZE.md` gilt das Freeze-Dokument.
- Ältere Audit-Stände, Master-Dossiers und historische Sessions sind nicht führend.
- `VW_06_WEBSITE.md` bleibt führend für konkrete UX-Details und bestehende Routing-Definitionen, sofern kein Widerspruch zum Freeze-Dokument besteht.

---

## 3. IST-ZUSTAND

### 3a — Was ist heute bereits vorhanden?

| Komponente | Stand (19.04.2026) | Quelle |
|------------|-------------------|--------|
| Universelle Suchleiste (Konzept) | Spezifiziert in `VW_06_WEBSITE.md` | VW_06 |
| Routing-Matrix nach Eingabetyp | Konzept vorhanden (7 Eingabetypen in VW_06) | VW_06 |
| S5 Krankheits-Lexikon (221 Einträge) | Live, ICD-10-basiert, Tag-Filter | VW_03 |
| S1 Laborwert-Lexikon (60 Einträge) | Live, LOINC-basiert | VW_03 |
| S2 Supplement-Kompass (51 Einträge) | Live, Evidenz-Ampel | VW_03 |
| Crosslinks (lw↔krankheiten, supp↔krankheiten) | DB: 123 lw, 108 supps in S5 | VW_03 |
| Startseite | Statisch, kein Discovery-Layer | Ist-Zustand |
| Update-/Change-Layer | Nicht vorhanden | Ist-Zustand |
| Watchlists | Nicht vorhanden | Ist-Zustand |
| Semantische Suche (pgvector) | Nicht vorhanden | Ist-Zustand |
| Discovery-Routing (implementiert) | Nicht vorhanden | Ist-Zustand |

**IST-ZUSTAND (nüchtern):** Es gibt ein Routing-Konzept auf Papier (VW_06), drei live befüllte Kernobjekt-Typen (K1/K3/K4), und eine statische Startseite. Eine funktionale Discovery-Schicht existiert nicht.

### 3b — Was ist ausdrücklich noch NICHT vorhanden?

- Kein implementierter Sucheinstieg auf der Startseite (jenseits des Passwort-Gates)
- Keine technische Routing-Logik nach Eingabetyp
- Kein Update-/Change-Layer (Q4)
- Keine Watchlist-Funktion (Q5)
- Keine Disambiguierung bei unklaren Freitexteingaben
- Keine thematischen Einstiegspunkte (Browsing ohne Suchintention)
- Kein „Wichtige Entwicklungen"-Bereich
- Kein S6-Content (Medikamente noch nicht gebaut)
- Kein S18-Content (Ernährung noch nicht gebaut)
- Kein S14-Content (Influencer-Kompass noch nicht gebaut)
- Kein S3-Content (Studien noch nicht gebaut)

---

## 4. Entscheidung: Was Discovery-Basis in VitalWissen ist

### ENTSCHEIDUNG — Definition Discovery-Basis Phase B

**Discovery-Basis ist die minimale Schicht, die Nutzern erlaubt, Inhalte in VitalWissen zu finden, zu navigieren und einzuordnen — unabhängig davon, ob sie wissen, wonach sie suchen.**

Discovery-Basis in Phase B umfasst exakt:

1. **Funktionale universelle Suchleiste** — Eingabe → Typ-Erkennung → Routing zu Kernobjekt-Detailseite
2. **Typ-basiertes Routing** — für alle Eingabetypen, für die bereits Inhalte existieren (K1/K2/K3/K4)
3. **Fallback-Logik** — für Eingaben, die keinem Kernobjekt zugeordnet werden können
4. **Thematische Einstiegspunkte** auf der Startseite — scanbare Kacheln für die wichtigsten Einstiegskategorien (keine Watchlists, kein Update-Feed)
5. **„Wichtige Entwicklungen"-Logik und Datenmodell** — spezifiziert, noch nicht gebaut; objektgebunden, kein Newsroom

Discovery-Basis in Phase B umfasst NICHT:
- Watchlists (Phase C)
- Update-/Change-Layer Build (Phase C)
- Semantische pgvector-Suche (Phase C)
- Personalisierung (Phase D)
- S6/S18/S14-Routing (erst wenn die Säulen gebaut sind)

### KANONISCHE ARBEITSHYPOTHESE

> Discovery ist kein eigenständiger Inhaltsbereich, keine neue Säule und kein Newsroom. Discovery ist die Querschicht Q1, die alle Kernobjekte zugänglich macht — sowohl für Nutzer mit klarer Suchanfrage als auch für Nutzer ohne.

### Tabelle A — Discovery-Bereich: Ziel, Rolle, Nicht-Rolle

| Dimension | Inhalt |
|-----------|--------|
| **Ziel** | Nutzer zu relevantem Inhalt führen — unabhängig von Suchanfrage-Präzision |
| **Rolle im Produktmodell** | Externer Produktbereich B1 (Finden/Entdecken) + Querschicht Q1 (Discovery/Suche/Einstiege) |
| **Interne Architektur** | Querschicht — keine eigene Säule, keine eigene Datenbank, keine eigene Content-Pipeline |
| **Was Discovery macht** | Eingabe typisieren, routen, disambiguieren, thematische Einstiege anbieten |
| **Was Discovery NICHT ist** | Eigener Inhaltsbereich, Newsroom, Watchlist-System, Forschungsdatenbank, Empfehlungs-Engine |
| **Was Discovery NICHT tut** | Eigene Inhalte produzieren, Quellen aggregieren, Diagnosen navigieren (das ist S8), Forschung kuratieren (das ist S3) |
| **Abhängigkeit** | Discovery funktioniert nur, wenn Kernobjekte befüllt sind — sie ist Output-Schicht, kein Content-Erzeuger |
| **Phasen-Einordnung** | B1 Phase B: Basis-Routing und Startseite; Q4/Q5 Phase C: Update-Layer und Watchlists |

---

## 5. Klare Abgrenzungen

### 5.1 Discovery vs. globale Suche

| Dimension | Discovery | Globale Suche |
|-----------|-----------|---------------|
| **Ausgangszustand** | Nutzer ohne oder mit vager Anfrage | Nutzer mit konkreter Anfrage |
| **Mechanismus** | Thematische Einstiege, Browsing, Kategorien | Eingabe → Typ-Erkennung → Routing |
| **Inhalt** | Startseiten-Module, Kacheln, Einstiegspfade | Suchergebnis-Liste, Direktrouting |
| **Überschneidung** | Beide gehören zu B1 / Q1 | Beide gehören zu B1 / Q1 |
| **Phase-B-Scope** | Thematische Startseiten-Module (max. 4–5 Kacheln) | Suchleiste + Typ-basiertes Routing |
| **Trennlinie** | „Ich weiß nicht, was ich suche" | „Ich suche etwas Bestimmtes" |

**Entscheidung:** Beide Mechanismen sind Phase-B-Scope und implementieren gemeinsam Q1. Sie sind nicht zwei separate Projekte — ein Discovery-Basis-Build enthält beides.

### 5.2 Discovery vs. Update-/Change-Layer (Q4)

| Dimension | Discovery (Q1) | Update-/Change-Layer (Q4) |
|-----------|----------------|---------------------------|
| **Frage** | Wie finde ich Inhalte? | Was hat sich an einem Objekt geändert? |
| **Funktion** | Routing, Einstieg, Navigation | Objekt-gebundene Änderungsinformation |
| **Abhängigkeit** | Kernobjekte K1–K4 (Phase B) | Kernobjekte K1–K8 + Quell-Daten (Phase C) |
| **Phase** | B (Basis jetzt) | C (Build nach Discovery-Basis) |
| **Overlap-Risiko** | „Wichtige Entwicklungen" auf der Startseite darf nicht Q4 vorwegnehmen | Q4 ist objekt-gebunden, nicht eigenständig |

**Entscheidung:** Discovery-Basis spezifiziert das Datenmodell für „Wichtige Entwicklungen" (Q4), baut es aber nicht. Ein Startseiten-Modul für Entwicklungen ist erst Phase C — wenn Q4-Daten existieren.

### 5.3 Discovery vs. Watchlists (Q5)

| Dimension | Discovery (Q1) | Watchlists (Q5) |
|-----------|----------------|-----------------|
| **Interaktionstyp** | Passiv — Nutzer browst/sucht | Aktiv — Nutzer abonniert ein Objekt |
| **Nutzerprofil nötig** | Nein | Ja (oder Session-based minimal) |
| **Abhängigkeit** | Kernobjekte | Q4 (Update-Layer) + K10 (Watchlist-Objekt) |
| **Phase** | B | C |
| **Verwechslungsgefahr** | „Merken"-Button darf nicht in Phase B gebaut werden | Watchlist-Widget auf Startseite = Phase C |

**Entscheidung:** Watchlists werden in Phase B ausdrücklich NICHT gebaut und auch nicht als UI-Element vorbereitet. Kein „Merken"-Button, kein Glocken-Icon, kein Alert-Hinweis auf Detailseiten in Phase B.

### 5.4 Discovery vs. S3 Forschung

| Dimension | Discovery (Q1) | S3 Forschungskompass |
|-----------|----------------|----------------------|
| **Was es tut** | Nutzer zu Inhalten führen | Forschungseinheiten kuratieren und erklären |
| **Inhaltsproduzent** | Nein | Ja (eigene Objekte: Studien K6) |
| **Phase** | B (Basis) | C (Build) |
| **Overlap-Risiko** | Navigation zu Studien ist Discovery; Studien-Objekte selbst sind S3 | S3 ist Daten-Lieferant für Q4 (Update-Layer) |
| **Zulässige Verbindung** | Discovery kann auf S3-Inhalte routen (wenn S3 existiert) | S3 liefert Studien-Objekte an Discovery |

**Entscheidung:** Discovery darf in Phase B keinen „Forschung"-Einstieg auf der Startseite zeigen — S3 ist noch nicht gebaut. Der Routing-Pfad für Studien-Eingaben ist in der Routing-Matrix als „OFFEN / Phase C" zu markieren.

### 5.5 Discovery vs. S5 Krankheits-Hub

| Dimension | Discovery (Q1) | S5 Krankheits-Lexikon |
|-----------|----------------|----------------------|
| **Rolle** | Einstiegsschicht | Primärer Content-Hub (Anker von B2) |
| **Was es tut** | Nutzer zu S5 routen | Krankheiten erklären und verknüpfen |
| **Datenquelle** | S5 ist Ziel, keine eigene DB | ICD-10-basierte Datenbasis |
| **Verwechslungsgefahr** | Discovery verwendet S5 als Routing-Ziel | S5 ist kein Discovery-Tool |

**Entscheidung:** Discovery-Basis-Startseite darf S5 als primäres Routing-Ziel exponieren (z.B. Krankheits-Kachel als prominentester Einstieg). Sie baut aber keine eigene Krankheits-Übersicht — S5 hat bereits eine Listenseite.

### 5.6 Discovery vs. S8 Nächste Schritte (Diagnose-Navigator)

| Dimension | Discovery (Q1) | S8 Diagnose-Navigator |
|-----------|----------------|----------------------|
| **Frage** | Wie finde ich was ich brauche? | Was tue ich jetzt konkret? |
| **Funktion** | Orientierung, Navigation, Einstieg | Aktionsplan: Behandlung, Studien, Spezialisten |
| **Timing** | Vor S5-Lektüre oder parallel | Nach S5-Lektüre |
| **Phase** | B | B/C |

**Entscheidung:** Discovery-Basis darf keinen „Nächste Schritte"-Bereich zeigen — das ist S8-Territory. Ein Link von S5 zu S8 ist S5-eigene Navigation. Discovery führt zu S5, S8 führt von S5 weiter.

### 5.7 Discovery vs. S14 Claim-/Influencer-Kompass

| Dimension | Discovery (Q1) | S14 Claim-Kompass |
|-----------|----------------|-------------------|
| **Frage** | Wie finde ich Inhalte? | Ist dieser Gesundheitsclaim belegt? |
| **Funktion** | Routing bei „Claim"-Eingabe | Claim-Datenbank mit Evidenz-Ampel |
| **Phase** | B (Routing-Regel) | C/D (Build) |
| **Overlap** | Discovery routet Claims zu S14 | S14 ist Routing-Ziel, nicht Routing-Layer |

**Entscheidung:** In Phase B wird der Claim-Eingabetyp in der Routing-Matrix als Pfad zu S14 spezifiziert, aber als „OFFEN — S14 noch nicht gebaut" markiert. Kein „Claim prüfen"-Modul auf der Startseite in Phase B.

### 5.8 Discovery vs. S18 Ernährung

| Dimension | Discovery (Q1) | S18 Ernährungskompass |
|-----------|----------------|----------------------|
| **Funktion** | Routing bei Nährstoff-/Lebensmittel-Eingabe | Inhalte zu Ernährung, Nährstoffen, Mustern |
| **Phase** | B (Routing-Regel spezifiziert) | B Reset (Scope-Entscheidung ausstehend) |
| **Overlap** | Discovery routet zu S18 | S18 ist Ziel, nicht Routing-Layer |

**Entscheidung:** In Phase B wird der Nährstoff/Lebensmittel-Eingabetyp in der Routing-Matrix spezifiziert, aber als „OFFEN — S18 noch nicht gebaut" markiert. Kein Ernährungs-Kachel auf der Discovery-Startseite, solange S18 nicht existiert.

---

## 6. Discovery-Kernobjekte für Phase B

### 6a — Welche Objektarten Discovery in Phase B anfassen darf

| Kernobjekt | Typ | Begründung | Status |
|------------|-----|------------|--------|
| K1 — Krankheit/Diagnose | Routing-Ziel | S5 live, 221 Einträge | ✅ Phase B |
| K2 — Symptom | Routing-Einstieg (Freitext → K1) | Freitext-Einstieg in S5 existiert | ✅ Phase B |
| K3 — Laborwert | Routing-Ziel | S1 live, 60 Einträge | ✅ Phase B |
| K4 — Supplement | Routing-Ziel | S2 live, 51 Einträge | ✅ Phase B |
| K5 — Medikament/Wirkstoff | Routing-Ziel | Routing-Regel spezifiziert; S6 noch nicht gebaut | ⚠️ Spec Phase B, Routing aktiv erst wenn S6 existiert |

### 6b — Welche Objektarten Discovery in Phase B NICHT anfassen darf

| Kernobjekt | Begründung | Phase |
|------------|------------|-------|
| K6 — Studie/Forschungseintrag | S3 nicht gebaut | C |
| K7 — Maßnahme/Zeitachse | S15 nicht gebaut | C (als Modul) |
| K8 — Lebensmittel/Nährstoff | S18-Scope-Entscheidung ausstehend | B Reset → dann Discovery-Integration |
| K9 — Dokument/Arztbrief | Sonderrolle (Zero-Retention-Verarbeitungsobjekt, kein Discovery-Objekt) | S4 nie als Discovery-Routing-Ziel |
| K10 — Watchlist/Nutzerinteresse | Q5 = Phase C | C |
| K11 — Persönlicher Datensatz | Phase D, Opt-in | D |

**Entscheidung:** Discovery-Basis Phase B arbeitet ausschließlich mit K1–K4. K5 wird in der Spec mitdefiniert, der Routing-Pfad ist aber erst aktiv, wenn S6 Content existiert. K9 (Arztbrief) ist kein Discovery-Objekt — S4 ist keine Suchziel-Seite im Discovery-Sinne.

---

## 7. Einstiegstypen / Routing-Matrix

### Tabelle B — Eingabetyp → Zielobjekt → Zielbereich → Routing-Regel → Fallback

| Eingabetyp | Zielobjekt | Zielbereich | Routing-Regel | Fallback | Phase-B-Status |
|------------|------------|-------------|---------------|----------|----------------|
| **Symptom** (Freitext, z.B. „Müdigkeit") | K1 (Krankheit) | B2 → S5 Trefferliste | Text-Match auf S5-Symptomfelder → Trefferliste → Detailseite | Hinweis: „Kein direkter Treffer — ähnliche Krankheiten" + Kategorie-Browse | ✅ Phase B |
| **Diagnose** (ICD-Code, z.B. „E11") | K1 (Krankheit) | B2 → S5 Detailseite | Exakter ICD-Match → Direktrouting zur Detailseite | Fuzzy-Match auf ICD-Beschreibung → Trefferliste | ✅ Phase B |
| **Diagnose** (Freitext, z.B. „Diabetes Typ 2") | K1 (Krankheit) | B2 → S5 Detailseite | Text-Match auf S5-Name/Synonymfelder → wenn eindeutig: direkt, sonst Trefferliste | Disambiguierungs-Ansicht + Kategorie-Browse | ✅ Phase B |
| **Laborwert** (Name/LOINC, z.B. „TSH", „2823-3") | K3 (Laborwert) | B2 → S1 Detailseite | Exact-Match auf LOINC-Code oder Name | Fuzzy-Match → Trefferliste S1 | ✅ Phase B |
| **Supplement** (Name, z.B. „Magnesium", „Vitamin D") | K4 (Supplement) | B2 → S2 Detailseite | Exact-Match auf Slug / Name | Fuzzy-Match → Trefferliste S2 | ✅ Phase B |
| **Medikament/Wirkstoff** (z.B. „Metformin", „Ibuprofen") | K5 (Medikament) | B2 → S6 Detailseite | Exact-Match auf Wirkstoff-Name | „Bereich Medikamente wird aufgebaut" + Hinweis auf verwandte S5-Einträge | ⚠️ Spec Phase B, aktiv erst wenn S6 Content existiert |
| **Nährstoff/Lebensmittel** (z.B. „Omega-3", „Lachs") | K8 (Lebensmittel) | B2 → S18 Detailseite | Exact-Match auf Nährstoff/Lebensmittel | „Bereich Ernährung wird aufgebaut" + S2-Crosslink wenn zutreffend | ⚠️ Spec Phase B, aktiv erst wenn S18 Content existiert |
| **Gesundheitsclaim** (z.B. „Kurkuma heilt Krebs") | — (kein K vorhanden) | B2 (opt.) → S14 | — | „Claim-Überprüfung: Bereich im Aufbau" + ggf. S2/S5-Verweis | 🔒 Spec Phase B, aktiv erst wenn S14 existiert (Phase C) |
| **Unklare Freitextsuche** (z.B. „Energie Schlaf Hormone") | Disambiguierung | — | Multi-Token-Analyse → ranked Trefferliste aller Kernobjekt-Typen | „Meintest du: [Symptom-Liste / Laborwert-Liste]" — explizite Typ-Auswahl anbieten | ⚠️ Phase B: einfaches Fallback; semantische pgvector-Suche = Phase C |

**Wichtige Nicht-Routing-Fälle:**
- `K9 Arztbrief/Dokument` ist kein Discovery-Ziel. S4 hat eigene Navigation. Keine Weiterleitung von Discovery zu S4.
- `Notfall-Keywords` (z.B. „Herzinfarkt Symptome akut") → Notfall-Flag muss immer sichtbar bleiben, keine Unterdrückung durch Routing-Logik.

---

## 8. Startseiten-/Einstiegslogik

### Tabelle C — Startseitenmodul → Zweck → Phase → Abhängigkeiten → No-Go-Risiko

| Modul | Zweck | Phase | Abhängigkeiten | No-Go-Risiko |
|-------|-------|-------|----------------|--------------|
| **Universelle Suchleiste** | Primärer Einstieg, Typ-Routing | B ✅ | K1–K4 vorhanden | Kein No-Go; aber: Routing-Logik muss Fallback haben |
| **Thematische Einstiegskacheln** (max. 4–5) | Schnellzugriff für Nutzer ohne Suchanfrage | B ✅ | K1/K3/K4 vorhanden | Kein No-Go; aber: nur Objekttypen zeigen, die befüllt sind |
| **Notfall-Flag-Sichtbarkeit** | E27-Entscheidung: aktives UI-Element | B ✅ (bereits beschlossen) | Frontend | Fehlen wäre No-Go |
| **„Wichtige Entwicklungen"-Feed** | Objektgebundener Update-Feed | C 🔒 | Q4 Daten müssen existieren | Ohne Q4-Daten: Newsroom-Drift-Risiko |
| **Watchlist-Widget** | Abonnierte Objekte mit Alerts | C 🔒 | Q5 + Nutzerprofil | Phase-B-Build wäre No-Go |
| **Personalisierter Content** | Basiert auf Nutzerdaten (S9) | D 🔒 | S9 Health Data Hub | Phase-B/C-Build wäre No-Go |
| **S3-Forschungs-Einstieg** | Routing zu Studien/Forschung | C 🔒 | S3 Content | Ohne S3-Content: leere Seite — No-Go |
| **S18-Ernährungs-Einstieg** | Routing zu Nährstoffen/Lebensmitteln | B* 🔒 | S18-Scope-Entscheidung + Content | *Erst wenn S18 gebuildet — Phase B Reset |
| **S14-Claim-Einstieg** | Routing zu Claim-Check | C 🔒 | S14 Content | Ohne S14-Content: leere Seite — No-Go |

**Entscheidung Phase-B-Startseite (maximal erlaubte Module):**
1. Universelle Suchleiste (obligatorisch)
2. Thematische Einstiegskacheln für K1 (Krankheiten), K3 (Laborwerte), K4 (Supplements) — nur diese drei, weil nur diese befüllt sind
3. Notfall-Flag-Hinweis (obligatorisch laut E27)
4. Ggf. kurzer Plattform-Erklärtext (ein Satz, kein Marketing-Absatz)

**Ausdrücklich NICHT auf der Phase-B-Startseite:**
- Kein Update-/News-Feed
- Kein Watchlist-Widget
- Kein Medikamenten-Kachel (solange S6 leer)
- Kein Ernährungs-Kachel (solange S18 leer)
- Keine personalisierten Empfehlungen
- Keine „Trending"-Logik

---

## 9. „Was ist neu?" / „Wichtige Entwicklungen"

### IST-ZUSTAND

Kein Update-Layer vorhanden. Keine Q4-Daten. Keine Leitlinien-Update-Feeds eingebunden.

### ENTSCHEIDUNG — Objektgebunden, kein Newsroom

**Kerngrundsatz (aus P7D_ARCHITECTURE_RESET_FREEZE.md, Abschnitt 6):**

> Jede Entwicklung muss an ein Kernobjekt (K1–K8) andocken. Nicht: Floating News, Headline-Ticker, Positiv-News-Kuratierung.

**Für Phase B gilt:** Das Datenmodell und die Logik für „Wichtige Entwicklungen" werden in diesem Dokument spezifiziert. Der Build (Frontend + Q4-Daten) ist Phase C.

### Datenmodell-Spec für „Wichtige Entwicklungen" (Phase B: nur Spec)

Ein Entwicklungs-Eintrag hat exakt folgende Felder:

```
entwicklung {
  id:               UUID
  typ:              enum(leitlinien_update | neue_studie | zulassung | sicherheitsupdate | versorgungsschritt | forschungsfortschritt)
  titel:            string (max. 80 Zeichen — keine Headline-Logik)
  kurzbeschreibung: string (max. 250 Zeichen — sachlich, kein Clickbait)
  kernobjekt_typ:   enum(krankheit | laborwert | supplement | medikament | studie)
  kernobjekt_id:    FK → entsprechende Tabelle (PFLICHT — kein floating entry)
  quelle_url:       string (verlinkbar, professionell anerkannt — E28)
  quelle_typ:       enum(awmf | iqwig | ema | fda | pubmed | bfarm | rki | gba)
  datum_original:   date (Veröffentlichungsdatum der Quelle)
  datum_erfasst:    timestamp
  verifiziert:      boolean (PFLICHT: true vor Veröffentlichung — kein Auto-Publish)
}
```

**Was NICHT in das Modell gehört:**
- Kein `trending_score`, kein `relevance_rank` ohne Objektbezug
- Kein `gut_fuer_dich`-Flag
- Keine KI-generierten Quellen (E28)
- Kein `bild_url` für illustrative Zwecke ohne Informationswert

### Beantwortung Prüffrage 3: Wie „Wichtige Entwicklungen" formulieren, damit kein Newsroom entsteht?

**Drei Regeln:**
1. **Kein Entwicklungs-Eintrag ohne `kernobjekt_id`** — kein floating Entry, erzwungen durch DB-Constraint (NOT NULL FK)
2. **Kein Titel als reißerische Headline** — Titellänge begrenzt, Formulierung sachlich: „Neue AWMF-Leitlinie zu [Krankheit]", nicht „Sensation: Diabetes behandeln wird einfacher"
3. **Kein automatisches Publish** — `verifiziert = false` bis manuelle Freigabe; kein Content-Rauschen

---

## 10. Watchlists / Q4 / Q5

### ENTSCHEIDUNG — Was jetzt spezifiziert wird

| Bereich | Status | Was in diesem Dokument |
|---------|--------|----------------------|
| Q4 Update-/Change-Layer (Datenmodell) | Spec Phase B ✅ | Datenmodell-Spec in Abschnitt 9 |
| Q4 Update-/Change-Layer (Build) | 🔒 Phase C | Nicht in diesem Paket |
| Q5 Watchlists (Konzept) | Spec Phase B ✅ (minimal) | Systemgrenze definiert |
| Q5 Watchlists (Build) | 🔒 Phase C | Nicht in diesem Paket |
| Glocken-Icon / Alert-UI | 🔒 Phase C | Kein UI-Element in Phase B |

### Watchlist-Systemgrenze (Phase-B-Spec, kein Build)

Eine Watchlist in VitalWissen bedeutet: **Nutzer abonniert ein Kernobjekt und bekommt bei Q4-Einträgen zu diesem Objekt eine Benachrichtigung.**

Bedingungen für Phase-C-Build:
1. Q4-Update-Layer muss existieren und befüllt sein
2. Mindestens K1-Objekte (Krankheiten) müssen Watch-fähig sein
3. Nutzerprofil oder Session-Persistenz muss existieren
4. Benachrichtigungs-Kanal (E-Mail oder Push) muss definiert sein

**Ausdrücklich NICHT in Phase B:**
- Keine Watchlist-Tabelle in Supabase
- Kein „Merken"-Button auf Detailseiten
- Kein Glocken-Symbol im Frontend
- Keine temporäre Interim-Lösung via localStorage (CLAUDE.md: localStorage nicht unterstützt in Artifacts; allgemein: kein State ohne Nutzer-Opt-in)

---

## 11. Mobile-/Scanbarkeit-/Piktogramm-Anforderungen für Discovery

**Basis:** Q6 (Mobile-first) und Q3 (Visual-/Piktogramm-Layer) aus P7D_ARCHITECTURE_RESET_FREEZE.md sind ab Phase B als Architekturprinzip verbindlich.

### Discovery-spezifische Anforderungen

| Anforderung | Konkret | Begründung |
|-------------|---------|------------|
| Suchleiste sofort sichtbar | Above the fold, keine Scroll-Anforderung für primären Einstieg | Haupt-Discovery-Mechanismus muss in 0,5 Sekunden erreichbar sein |
| Einstiegskacheln scanbar | Max. 1–2 Zeilen Text, ikonischer Anker je Kachel | Nutzer in Stress lesen keine Fließtext-Kacheln |
| Kein Hover-only-Pfad | Alle Discovery-Einstiege müssen per Tap/Click funktionieren | Mobile hat kein Hover |
| Kurze Fallback-Texte | Fallback-Meldungen max. 2 Sätze | Lange Fehlertexte werden auf Mobile nicht gelesen |
| Routing-Ergebnis erkennbar | Trefferlisten müssen Typ-Label zeigen (z.B. „Krankheit", „Laborwert") | Nutzer soll sofort wissen, in welchem Bereich er gelandet ist |
| Notfall-Flag nicht versteckbar | Auch auf kleinen Screens sichtbar, kein Collapse | Sicherheitsprinzip (E27) |
| Thematische Kacheln touch-freundlich | Mindest-Tap-Fläche 44×44px | iOS HIG Standard |

### Piktogramm-Anforderung für Discovery-Einstiege

Für Phase B gilt: Einstiegskacheln sollen je einen ikonischen Anker tragen — **kein reiner Text**. Empfehlung: einfache, semantisch eindeutige Icons je Kernobjekttyp:

- Krankheit/Diagnose → Stethoskop-Icon oder ICD-Symbol
- Laborwert → Reagenzglas-Icon
- Supplement → Kapsel-Icon
- (Medikament, wenn S6 live → Tabletten-Icon)

**Kein eigenständiger Piktogramm-Build in Phase B.** Die Icons sind Bestandteil des Discovery-Build-Pakets, nicht ein separater Sprint.

---

## 12. i18n-/Tag-/Typ-System-Anforderungen als Architekturprinzip

**Basis:** Q10 (Mehrsprachigkeit) aus P7D_ARCHITECTURE_RESET_FREEZE.md: „Architekturprinzip jetzt, Build-Auftrag Phase D."

### Discovery-spezifische i18n-Anforderungen

| Bereich | Anforderung | Was zu vermeiden ist |
|---------|-------------|---------------------|
| **Routing-Labels** | Eingabetyp-Labels nicht als hartkodierte deutsche Strings — Schlüssel verwenden (z.B. `input_type.symptom`, nicht `"Symptom"`) | Hartkodierte DE-Strings die i18n-Extraktion erzwingen |
| **Tag-System** | Routing-Tags und Filter-Tags als neutrale IDs (z.B. `tag:cardiovascular`, nicht `tag:Herz-Kreislauf`) | Rein deutsche Tag-Strings die international nicht portierbar sind |
| **Entwicklungstypen** (Q4-Datenmodell) | `typ`-Enum-Werte als technische Keys, nicht als DE-Labels im Schema | `typ: "Leitlinien-Update"` als DB-Wert ist falsch; `typ: "leitlinien_update"` ist richtig |
| **Fallback-Texte** | Als übersetzbarer String in Frontend-Konstanten, nicht als hartkodiertes JSX-Text | `<p>Kein Treffer gefunden</p>` direkt in JSX statt via i18n-Key |
| **Kernobjekt-Typ-Labels** | In der UI als i18n-Key referenziert, nicht hartkodiert | CSS-Klassen-Namen bleiben DE (CSS-Konvention ist ok), UI-Text-Strings sind i18n-Keys |

### Nicht-Ziele für Phase B

- Kein tatsächlicher EN-Übersetzungs-Build
- Kein i18n-Framework-Setup (react-i18next etc.) ist Pflicht für Phase B
- Keine zweisprachige UI in Phase B

**Was Phase B leisten muss:** Strukturen (DB-Felder, Enums, Tags) so anlegen, dass sie in Phase D ohne Schema-Breaking-Change i18n-fähig erweiterbar sind.

---

## 13. Phase-B-/Phase-C-Grenze

### Tabelle E — Was jetzt spezifiziert wird vs. was später gebaut wird

| Bereich | Phase-B-Spec (dieses Dokument) | Phase-B-Build (nächstes Paket) | Phase-C-Build |
|---------|-------------------------------|-------------------------------|---------------|
| Routing-Matrix K1–K4 | ✅ Spec fertig | Implementierung | — |
| Fallback-Logik | ✅ Spec fertig | Implementierung | — |
| Startseiten-Module | ✅ Erlaubte Module definiert | Implementierung | — |
| K5-Routing-Regel | ✅ Spec fertig | Nur wenn S6 ready | — |
| K8-Routing-Regel | ✅ Spec fertig | Nur wenn S18 ready | — |
| Q4 Datenmodell | ✅ Datenmodell-Spec fertig | — | Build + Befüllung |
| Q4 Frontend-Modul | — | — | Build |
| Q5 Watchlist-Systemgrenze | ✅ Systemgrenze definiert | — | Build |
| Q5 Watchlist-UI | — | — | Build |
| Piktogramm-System | ✅ Anforderungen definiert | Teil des Discovery-Builds | Ausbau |
| i18n-Strukturprinzipien | ✅ Anforderungen definiert | Architekturprinzip beim Build | Operativer EN-Build |
| Semantische pgvector-Suche | — | — | Build (Phase C nach S3) |
| S14-Routing | ✅ Spec definiert | — | Aktiv wenn S14 ready |
| S3-Routing | — | — | Spec + Build Phase C |
| Personalisierung | — | — | Phase D |

### Beantwortung Prüffragen 1 + 2:

**1. Minimale Discovery-Basis, die strategisch sauber ist:**
- Funktionale Suchleiste mit Typ-Routing (K1–K4)
- Fallback für unbekannte Eingaben
- Thematische Einstiegskacheln nur für befüllte Kernobjekttypen
- Mobile-first, scanbare UI
- Kein Update-Feed, keine Watchlists

**2. Was wäre schon zu viel (würde Phase C/D vorwegnehmen):**
- Watchlist-Button auf Detailseiten
- Update-Feed ohne Q4-Daten
- Semantische Suche (pgvector)
- Personalisierung ohne S9
- S14/S3-Einstiege ohne Content

---

## 14. Harte No-Gos / Nicht-Scope

### Tabelle F — No-Go-Matrix

| No-Go | Kategorie | Begründung | Klassifikation |
|-------|-----------|------------|----------------|
| Update-/News-Feed ohne Q4-Daten | Architektur | Würde Newsroom erzeugen | **Phase-B-No-Go** |
| Watchlist-Build oder -UI | Architektur | Q5 = Phase C; Q4 muss erst existieren | **Phase-B-No-Go** |
| S4 (Arztbrief) als Discovery-Routing-Ziel | Architektur | K9 ist Zero-Retention-Verarbeitungsobjekt, kein Suchobjekt | **Dauerhaftes No-Go für Discovery-Routing** |
| S3-Einstieg ohne S3-Content | Produkt | Leere Seite; falsches Produktversprechen | **Phase-B-No-Go** |
| S18-Einstieg ohne S18-Content | Produkt | S18-Scope-Entscheidung noch nicht getroffen | **Phase-B-No-Go** |
| S14-Einstieg ohne S14-Content | Produkt | S14 = Phase C | **Phase-B-No-Go** |
| Personalisierung ohne S9 | Architektur | S9 = Phase D | **Phase-B/C-No-Go** |
| KI-generierte Quellen im Q4-Feed | Vertrauen | E28: nur professionell anerkannte, verlinkbare Quellen | **Dauerhaftes No-Go** |
| Floating-News ohne Objektbezug | Vertrauen | Zerstört Quellenlogik; Newsroom-Drift | **Dauerhaftes No-Go** |
| „Good News"-Kuratierung | Vertrauen | Einseitiger Bias; Vertrauensschaden | **Dauerhaftes No-Go** |
| Trending-Logik ohne verifizierte Datenbasis | Vertrauen | Pseudorelevanz; nicht evidenzbasiert | **Phase-B-No-Go** |
| Hartkodierte DE-Strings in DB-Enums und Tags | Architektur | Blockiert i18n-Erweiterbarkeit (Q10) | **Ab jetzt vermeiden** |
| Hover-only UX-Pfade | Architektur | Q6 Mobile-first; kein Hover auf Mobile | **Ab jetzt vermeiden** |
| LLM-gestützte Disambiguierung | Architektur | S4-Logik; P7-04 blockiert; Discovery muss ohne LLM funktionieren | **Phase-B-No-Go** |
| Supabase-Write in diesem Paket | Ops | Dieses Paket ist read-only Spec | **Paket-No-Go** |
| Git-Write/Commit/Push in diesem Paket | Ops | Dieses Paket ist read-only Spec | **Paket-No-Go** |

### Beantwortung Prüffrage 5: Welche Begriffe würden zu Überschneidungen führen?

| Begriff/Modul in Navigation | Overlap-Risiko | Empfehlung |
|-----------------------------|---------------|-----------|
| „Forschung" als Navigationspunkt | Überschneidung mit S3 (Phase C) | Erst wenn S3 gebaut — kein Phase-B-Navigationspunkt |
| „Nächste Schritte" in Discovery | Überschneidung mit S8 (Phase B/C) | S8-eigene Navigation — nicht in Discovery replizieren |
| „Ernährung" in Discovery-Kacheln | Überschneidung mit S18 (Phase B Reset) | Erst wenn S18 Content vorhanden |
| „News" oder „Aktuell" | Newsroom-Drift | Vermeiden; stattdessen: „Wichtige Entwicklungen" mit Q4-Bedingung |
| „Für dich" oder „Empfohlen" | Personalisierungs-Drift | Phase D — nicht vor S9 |
| „Claim prüfen" | Überschneidung mit S14 (Phase C) | Erst wenn S14 gebaut |

---

## 15. Empfohlener Folgeauftrag nach diesem Paket

**Direkter nächster Schritt (Discovery-Basis-Build):**

> P7D-02 — Discovery-Basis-Build (Phase B)
>
> **Scope:** Implementierung der universellen Suchleiste + Typ-Routing (K1–K4) + Fallback-Logik + Thematische Einstiegskacheln (K1/K3/K4) auf der Startseite. Mobile-first, scanbare UI, Piktogramm-Anker je Kachel. i18n-konforme Strukturen.
>
> **Nicht-Scope:** Kein Q4-Build, keine Watchlists, kein S6/S18/S14-Routing, keine semantische Suche, kein LLM.
>
> **Bedingung:** Dieses Dokument (P7D-01) muss als gelesen + freigegeben markiert sein. Kein Build ohne diesen Spec.
>
> **Validator:** Suchleiste live, Routing K1–K4 funktional, Fallback gezeigt, Startseite mobil scanbar, kein Update-Feed, keine Watchlists.

**Parallelstrang (nicht blockiert, unabhängig):**
- P7-04b (Proxy-Build) sobald Mistral-ZDR-Bestätigung vorliegt — völlig unabhängig von Discovery
- S18-Reset-Spec — Scope-Entscheidung für Ernährung (unabhängig von Discovery-Basis)

**Erst nach Discovery-Basis-Build:**
- Q4 Update-/Change-Layer Build (Phase C) — braucht Discovery-Routing als Basis
- Q5 Watchlists (Phase C) — braucht Q4

---

## VALIDATOR (Pflichtblock)

| # | Validator-Frage | Ergebnis |
|---|----------------|----------|
| 1 | Kein Build vorgeschlagen? | ✅ Dieses Dokument enthält keine Build-Aufträge. Der Folgeauftrag ist als separates Paket benannt, nicht als Teil dieses Pakets. |
| 2 | Kein S4-Unlock impliziert? | ✅ S4 wird in Abschnitt 6b explizit als Nicht-Discovery-Objekt ausgeschlossen (K9 = Zero-Retention-Verarbeitungsobjekt). P7-04b bleibt blockiert bis Mistral-ZDR-Bestätigung. |
| 3 | Discovery sauber von S3/S5/S8/S14/S18 getrennt? | ✅ Abschnitt 5 enthält 8 explizite paarweise Abgrenzungen mit Tabellen und bindendem Entscheid. |
| 4 | Update-Layer objektgebunden gehalten? | ✅ Abschnitt 9: Datenmodell enthält Pflicht-FK `kernobjekt_id` (NOT NULL), Entscheidung ist explizit. Kein floating Entry möglich. |
| 5 | Watchlists nicht vorgezogen? | ✅ Abschnitt 10: Watchlist-Build = Phase C. Kein UI-Element, kein DB-Schema, kein „Merken"-Button in Phase B. |
| 6 | Mobile-first und i18n als Prinzip mitgedacht? | ✅ Abschnitt 11 (Mobile/Scanbarkeit) und Abschnitt 12 (i18n) als eigenständige Abschnitte mit konkreten Anforderungen. |
| 7 | Keine alten Audit-Stände als führend benutzt? | ✅ Führende Quellen in Abschnitt 2 explizit benannt; alle Entscheidungen gegen P7D_ARCHITECTURE_RESET_FREEZE.md, VW_04 und VW_03 verifiziert. Keine Bezugnahme auf historische Master-Dossiers oder Alt-Audits. |
| 8 | Genau 1 Datei geschrieben? | ✅ Nur diese Datei (`01_PROJECT_SOURCES_CURRENT/P7D_01_DISCOVERY_BASIS_SPEC.md`). Keine weiteren Writes. |
| 9 | Kein Commit/Push/Deploy? | ✅ Kein Git-Zugriff. Kein Commit. Kein Push. Kein Deploy. Kein Supabase-Write. Kein Netlify-Trigger. |
| 10 | Klarer Folgeauftrag benannt? | ✅ Abschnitt 15: P7D-02 (Discovery-Basis-Build) mit Scope, Nicht-Scope, Bedingung und Validator präzise definiert. |

---

## OPS-CLOSURE (Pflicht)

### A — Geänderte Dateien

| Aktion | Datei | Status |
|--------|-------|--------|
| NEU ERSTELLT | `01_PROJECT_SOURCES_CURRENT/P7D_01_DISCOVERY_BASIS_SPEC.md` | ✅ Lokal gespeichert |
| KEINE WEITEREN WRITES | — | — |

### B — Inhaltlich entschieden

1. Discovery-Basis = externer Produktbereich B1 + Querschicht Q1 — keine neue interne Säule
2. Phase-B-Routing: K1–K4 (K5/K8 spezifiziert, aktiv erst wenn Säulen gebaut)
3. Update-/Change-Layer (Q4): Datenmodell spezifiziert, Build = Phase C
4. Watchlists (Q5): Systemgrenze definiert, Build = Phase C — kein UI-Element in Phase B
5. Startseite Phase B: max. 3 Einstiegskacheln (K1/K3/K4) + Suchleiste + Notfall-Flag
6. „Wichtige Entwicklungen": objektgebunden, NOT-NULL-FK Pflicht, kein Newsroom, Build = Phase C
7. K9 (Arztbrief/Dokument) ist kein Discovery-Routing-Ziel — dauerhaft
8. 8 Abgrenzungspaare explizit entschieden (Discovery vs. S3/S5/S8/S14/S18/Suche/Update-Layer/Watchlist)
9. Mobile-first und i18n als Architekturprinzip für alle Discovery-Builds ab Phase B bindend
10. LLM-gestützte Disambiguierung ist Phase-B-No-Go (S4 blockiert, Discovery muss regelbasiert funktionieren)

### C — Nicht getan / bewusst offen gelassen

| Bereich | Warum offen |
|---------|------------|
| Discovery-Build (Code) | Dieses Paket ist read-only Spec — kein Build |
| S6-Routing aktiv | S6 noch nicht gebaut |
| S18-Routing aktiv | S18-Scope-Entscheidung ausstehend |
| S14-Routing aktiv | S14 = Phase C |
| Q4 Build (Update-Layer) | Phase C — braucht zuerst Discovery-Basis |
| Q5 Build (Watchlists) | Phase C — braucht Q4 |
| Semantische pgvector-Suche | Phase C — braucht S3-Content |
| Piktogramm-Set (konkrete Icons) | Build-Entscheidung im Discovery-Build-Paket |
| i18n-Framework-Wahl | Build-Entscheidung Phase B/C |
| S3-Routing-Spec | Phase C — S3-Spec muss zuerst finalisiert werden |
| Freigabe P7-04b | Wartet auf Mistral-ZDR-Bestätigung — unabhängig von Discovery |

### D — Ops-Status

| Dimension | Status |
|-----------|--------|
| **Lokale Speicherung** | ✅ Datei gespeichert in `01_PROJECT_SOURCES_CURRENT/P7D_01_DISCOVERY_BASIS_SPEC.md` |
| **git status** | Unverändert — kein git-Zugriff in diesem Paket |
| **Commit-Status** | Kein Commit |
| **Push-Status** | Kein Push |
| **DB-Writes** | Nein |
| **Deploy** | Nein |
| **Offener Side Effect** | Keiner |

---

**Discovery-Basis ist hiermit als read-only Phase-B-Spec sauber gefasst; kein Build, kein S4-Unlock, keine Strategiedrift.**

---

*Erstellt: 19.04.2026 — P7D-01 Discovery-Basis-Spec abgeschlossen.*
*Führende Basis: `P7D_ARCHITECTURE_RESET_FREEZE.md` (18.04.2026).*
*Nächster zulässiger Schritt: P7D-02 Discovery-Basis-Build (separates Paket, separate Session).*
