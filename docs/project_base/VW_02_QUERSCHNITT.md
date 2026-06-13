## Design-System
- Primärfarbe: #0B6E4F
- Akzentfarbe: #E8A838
- Schriften: DM Sans + Instrument Serif
- Hosting: Netlify (auto-deploy aus GitHub)

## Tech-Stack

| Komponente | Technologie | Zweck |
|---|---|---|
| Frontend | React + Vite | Nutzeroberfläche, SPA |
| Routing | React Router DOM | Seitennavigation |
| Hosting | Netlify | Auto-deploy aus GitHub |
| Versionierung | GitHub (Repo: sebastianfenner85-HH/VitalWissen, public) | Code-Speicher, Deployment-Trigger |
| Datenbank | Supabase (PostgreSQL + pgvector) | Hauptdatenbank + semantische Suche |
| Datenaggregation | Python + Requests | API-Calls, Pipelines |
| Web-Scraping | BeautifulSoup | BfR, EFSA, Behörden-/PDF-Inhalte |
| LLM-Extraktion | Claude API / GPT-4 API | Strukturierung von Papers, PDFs, Arztbriefen |
| OCR Standard | Tesseract | gedruckte Dokumente |
| OCR Handschrift | Google Vision API | handschriftliche Arztbriefe |
| Anonymisierung | spaCy + german-medbert | NER für Personendaten |
| Monitoring | Change Detection Tools | Leitlinien- und Gesetzesänderungen |

## Arbeitsmodell Claude ↔ Sebastian

Session = Paket. Jede Session hat ein klar abgrenzbares Ergebnis.
Kein Thema-Mix innerhalb einer Session.

Rollen:
- Claude baut Code und liefert fertige Dateien
- Sebastian ersetzt Dateien im GitHub-Repo
- Netlify deployed automatisch bei jedem Push
- Pipelines (Daten, Automatisierung) laufen über Cowork auf Sebastians Rechner

Paketstruktur (Stand: April 2026):

| Paket | Inhalt | Status |
|---|---|---|
| P1 | Frontend MVP (S1+S2), DB-Schema, Pipeline-Skript | ✅ Abgeschlossen |
| P2 | GitHub + Netlify + Supabase Setup + Schema einspielen | ✅ Abgeschlossen |
| P3 | Supabase-Anbindung (Live-Daten statt Seed, Suche) | ✅ Abgeschlossen |
| P4 | NIH ODS Pipeline live (50 Supplements) | ⬜ Cowork |
| P5 | LOINC-Import (60 Laborwerte) | ⬜ Cowork |
| P6 | S5 Krankheits-Lexikon (Frontend + Daten) | ⬜ Geplant |
| P7 | S4 Arztbrief-Decoder (OCR + Claude API) | ⬜ Geplant |

## Code-Struktur (Stand P3)

vitalwissen/
├── src/
│   ├── App.jsx               — Router + Seitenstruktur
│   ├── main.jsx              — Entry point
│   ├── styles/global.css     — Design-System CSS-Variablen
│   ├── components/
│   │   ├── Nav.jsx + Nav.css
│   │   └── EvidenzAmpel.jsx + EvidenzAmpel.css
│   ├── data/
│   │   ├── laborwerte.js     — Seed-Daten S1 (nicht mehr aktiv)
│   │   └── supplements.js    — Seed-Daten S2 (nicht mehr aktiv)
│   ├── lib/
│   │   ├── supabase.js       — Supabase Client
│   │   └── queries.js        — alle DB-Abfragen zentral
│   └── pages/
│       ├── Home.jsx + Home.css
│       ├── LaborwerteListe.jsx
│       ├── LaborwertDetail.jsx
│       ├── Laborwerte.css
│       ├── SupplementsListe.jsx
│       ├── SupplementDetail.jsx
│       └── Supplements.css
├── database/
│   └── schema.sql            — Supabase-Schema S1+S2
├── pipelines/
│   ├── s2_nih_ods_pipeline.py
│   ├── requirements.txt
│   └── .env.example
├── index.html
├── netlify.toml              — SPA-Routing für Netlify
└── vite.config.js

## Gemeinsame Datenlogik
Verbindende Codes / Schlüssel:
- LOINC für Laborwerte
- ICD-10-GM für Erkrankungen
- ATC für Wirkstoffe
- PubMed-ID / DOI für Studien

Tabellen-Prinzip:
- `gender_context JSONB`
- `letzte_aktualisierung TIMESTAMP`
- `schema_org JSONB`

## Automatisierungslogik
Grundprinzip:
- möglichst hohe Automatisierung bei vertretbarer Qualität
- Review dort, wo medizinische oder rechtliche Unsicherheit hoch ist

Automatisierungsgrade sind Schätzungen, keine festen Werte:
- strukturierte APIs: ca. 80–90 %
- LLM-Extraktion aus Papers/PDFs: ca. 65–85 %
- rechtliche Inhalte: ca. 50–60 %
- Community-Inhalte: keine klassische Pipeline, aber KI-Moderation

Monitoring:
- Change Detection für AWMF, Gesetzestexte, BfArM-Änderungen
- regelmäßige PubMed-Updates
- täglicher Studien-Sync in S8
- wiederkehrende Qualitätsberichte / Registerdaten

## Gender-Medizin & Altersgruppen
Warum:
- Forschung historisch stark an männlichen Erwachsenen ausgerichtet
- Unterschiede nach Geschlecht und Alter müssen explizit mitgedacht werden

Umsetzung:
- `gender_context` in den relevanten Datenstrukturen
- Altersgruppen:
  - Neugeborene
  - Säugling
  - Kleinkind
  - Schulkind
  - Teenager
  - Erwachsene
  - Senior
- LLM-/Extraktionslogik: Unterschiede explizit prüfen und ausweisen

Quellenrichtung:
- NIH Office of Research on Women's Health
- FDA FAERS
- strukturierte alters-/geschlechtsbezogene Referenzsysteme

## KI-Optimierung / AEO
Strategie:
VitalWissen soll von KI-Systemen auffindbar und zitierbar sein.

Technische Maßnahmen:
- llms.txt
- Schema.org Health Markup
- JSON-LD
- Provenance-Standard mit Quelle + Datum + Konfidenz
- Q&A-Struktur
- OpenAPI 3.0
- robots.txt mit relevanten KI-Crawlern

Wichtiger Hinweis:
- FHIR R4 ist kein AEO-Tool
- FHIR R4 ist ein Interoperabilitätsstandard und vor allem für S9/ePA relevant

## KI-Suche mit Learning-Layer
- semantische Suche via pgvector + Embeddings
- konkretes Embedding-Modell noch offen
- Zero-Result-Dashboard für nicht beantwortete Suchanfragen
- anonyme Auswertung nur über Hashes/Kategorien
- Feed in S7 / Intelligence Layer

## Kosten & Erstattung
Querschnittsthema für S5, S6, S8:
- GKV / PKV
- IGeL-Warnung
- Festbeträge
- Erstattungslogik
- Datenquelle: IGeL-Monitor

## Notfall-Flagging
- "Notruf 112" aktiv und prominent
- kein bloßer Footer-Hinweis
- relevant für S1, S4, S5
- technisch über explizite Prompt-/Regellogik
- im Frontend: notfall_flag Boolean → rotes Banner auf Detailseite

## Einfache Sprache
- mindestens für S5 in drei Ebenen:
  - Sehr Einfach
  - Laienhaft
  - Fachlich
- sehr einfache Sprache als eigener Qualitätsmodus
- Zielgruppen: geringe Gesundheitskompetenz, Migranten, Senioren, Kinderkontext

## Website-Architektur
Die vollständige Website-Architektur, Seitenlogik und
Cross-Säulen-Verbindungen sind dokumentiert in:

→ VW_06_WEBSITE — Seitenarchitektur & Website-Logik

Dieser Block enthält bewusst keine eigene Website-Logik mehr,
um Doppelungen und Drift zwischen den Dateien zu vermeiden.
