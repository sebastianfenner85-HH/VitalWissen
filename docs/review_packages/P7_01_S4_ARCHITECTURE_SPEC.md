# P7_01 — S4 Arztbrief-Decoder · Architektur- und Sicherheits-Spezifikation

**Datum:** 16.04.2026 (P7-01a Patch)
**Status:** Architektur-Spec (read-only). Kein Code, kein DB-Write, kein Deploy.
**Zweck:** Verbindliche MVP-Ausführungsgrundlage für P7 — S4 Arztbrief-Decoder.
**Gültigkeit:** bis diese Datei durch eine spätere P7-Iteration ersetzt oder explizit revidiert wird.
**Patch-Stand:** P7-01a — E07/E08-Engschnitt: eigener Anonymisierungs-Worker = offen/nicht freigegeben; Cloud-OCR = E07+E08-Konflikt, kein freigegebener Pfad; dedizierte S4-Seite = empfohlene Arbeitshypothese für P7-02, keine VW_06-Entscheidung; Schlussfreigabe neu gefasst.

---

## 1. Scope

Verbindliche Architektur-, Sicherheits- und Reihenfolgeentscheidungen für den ersten baubaren S4-MVP-Schritt. Klärung von:

1. kleinstmöglicher robuster S4-MVP-Schnitt
2. Client-/Server-Trennung und Trust Boundaries
3. praktische Umsetzung bzw. Annäherung an Zero Retention (E08)
4. Pipeline-Reihenfolge (Input → Text-Extraktion → Anonymisierung → LLM-Dekodierung → strukturierte Ausgabe)
5. Umgang mit Druck-PDF, Foto und Handschrift im MVP
6. Abgrenzung zwischen sofort baubar und bewusst verschoben
7. sicherer erster technischer Build-Schritt nach dieser Spezifikation

---

## 2. Nicht-Scope

- kein Frontend-Code
- kein Backend-Code
- keine DB-Änderungen, keine neue Tabelle, keine Migration
- keine API-Keys, keine Secrets
- keine Netlify- oder Deploy-Änderung
- kein Commit, kein Push
- keine stillen Nebeneffekte
- kein Re-Scan des Gesamtprojekts außerhalb S4/P7-relevanter Teile
- keine Festlegung auf konkrete LLM-Anbieter über E06 hinaus
- keine UX-/Design-Festlegung über das in VW_05 und VW_06 bereits Bestehende hinaus

---

## 3. Führende Quellenbasis

Führend ausschließlich (in Prioritätenreihenfolge):

| Quelle | Beitrag zur Spec |
|---|---|
| `CLAUDE.md` | Stack (Vite+React+Netlify+Supabase), Sandbox-Netzwerk, Repo-Zugriff |
| `01_PROJECT_SOURCES_CURRENT/VW_03_STATUS.md` | S4 = Konzept fertig, P7 = nächstes Ziel, Baureihenfolge S5 → S4 → S3 |
| `01_PROJECT_SOURCES_CURRENT/VW_05_SAEULEN.md` | S4-Kernidee, Input, Output, Tech-Kandidaten, DSGVO, Vernetzung |
| `01_PROJECT_SOURCES_CURRENT/VW_04_ENTSCHEIDUNGEN.md` | E06 (LLM-Anbieter), E07 (Client-side), E08 (Zero Retention), E09 (FHIR R4), E11 (Serverstandort), E12 (React+Vite) |
| `01_PROJECT_SOURCES_CURRENT/VW_06_WEBSITE.md` | Einstiegspfade, Cross-Säulen-Logik, S4 im Website-Kontext |
| `01_PROJECT_SOURCES_CURRENT/P6_FINAL_CLOSURE.md` | Nachweis P6 vollständig geschlossen → P7-Start freigegeben |

Historische Dossiers und Audits (`02_PROJECT_SOURCES_ARCHIVE/`, ältere Session-Logs) werden nicht als führender Live-Stand verwendet.

---

## 4. Verbindliches S4-Zielbild (aus führenden Quellen abgeleitet)

**Direkt aus VW_05 (S4):**

- S4 dekodiert Arztbriefe, Befunde und Entlassbriefe für Laien.
- Input: PDF, Foto, Text.
- Output: Parallelansicht oder Fließtext, Inline-Erklärungen, Zusammenfassung, Rückfragen nach Dekodierung, Links zu ICD (S5), Laborwerten (S1), Medikamenten (S6).
- Tech-Kandidatenliste: Tesseract, Google Vision API, spaCy + german-medbert, Claude API.
- DSGVO: Anonymisierung vor API-Call; keine Speicherung als Standard; Zero Retention.
- Ergänzungen (nicht zwingend im ersten MVP-Schritt): Handschrift, mehrsprachige Briefe, Notfall-Flag.
- Vernetzung: S1, S5, S6, S8, S11; S9 optional Phase 2.

**Direkt aus VW_04:**

- E07 [SICHER FESTGELEGT]: Client-side-Verarbeitung wo besonders sensible Daten entstehen (v. a. S4/S8/S11/S12).
- E08 [SICHER FESTGELEGT]: Zero Retention als Kernprinzip in S4.
- E06 [AKTUELLER KONZEPTSTAND]: LLM via Claude API / GPT-4 API, kein eigenes Training in Phase 1.
- E09 [PLANUNGSPRINZIP]: FHIR R4 früh mitdenken — keine Implementierungsvorgabe im MVP.
- E12 [SICHER FESTGELEGT]: Frontend = React + Vite, Auto-Deploy via Netlify.

**Direkt aus VW_06:**

- S4 ist in den Einstiegspfaden der Universalsuche **nicht explizit** als Zieltyp geführt. Ein eigener S4-Einstieg (eigene Route, eigene Detailseite, eigener Suchtyp) ist **nicht direkt verifiziert** und muss in einem Nicht-Scope-Paket später geklärt werden.

**Nicht direkt verifiziert (bewusst markiert):**

- konkrete Anonymisierungs-Pipeline (spaCy + german-medbert als Kandidat, aber nicht als gesetzt).
- konkrete OCR-Pipeline (Tesseract und Google Vision als Kandidaten, nicht als gesetzt).
- konkrete UX/Seitenstruktur für S4.

---

## 5. MVP-Schnitt

**Kleinster robuster S4-MVP (P7-02-Scope):**

- Input akzeptiert nur:
  1. Freitext-Paste in ein Eingabefeld
  2. PDF mit eingebettetem Text-Layer (digitale Druck-PDF) — client-seitige Textextraktion über pdf.js
- keine Bildverarbeitung, keine OCR, kein LLM-Call in dieser Stufe
- Output in dieser Stufe: extrahierter Klartext als Vorschau plus Warnhinweis, dass Dekodierung noch nicht aktiv ist

**Bewusst NICHT im ersten MVP-Schritt:**

- Foto-Upload und Scan-OCR (erst P7-02b/später)
- Handschrifterkennung (bleibt in S4-Ergänzungen, nicht im Kern-MVP)
- Anonymisierung (P7-03)
- LLM-Dekodierung (P7-04, blockiert durch Zero-Retention-Klärung)
- strukturierte Parallelansicht, Inline-Erklärungen, Rückfragen (P7-05)
- Notfall-Flag, mehrsprachige Briefe (spätere Erweiterungen)
- Cross-Verlinkung zu S1/S5/S6 (erst nach stabiler LLM-Extraktion)

**Begründung Schnitt:** Jeder Schritt vor der LLM-Schnittstelle liefert für sich stehenden Nutzerwert (Textvorschau, transparente Datenschutzanzeige) und hält den Rohtext vollständig im Browser. Damit ist der erste Build-Schritt unabhängig von der noch offenen Zero-Retention-Klärung und kann ohne Side Effects gestartet werden.

**UX-Fläche im MVP-Schritt (minimal):**

- eine dedizierte S4-Seite als **empfohlene minimale Arbeitsfläche für P7-02**. Ausdrücklich **keine** durch VW_06 verifizierte Website-Entscheidung — VW_06 führt S4 nicht als eigenen Einstiegspfad/Detailseitentyp. Einstiegspfad, Route und Website-Einbindung bleiben offen (B4).
- ein Drop-/Upload-Feld für PDF plus ein Textarea für Text-Paste
- Anzeige des extrahierten Klartextes
- ein klarer Datenschutz-Banner, der benennt, was bisher lokal bleibt und was bei späterer LLM-Aktivierung passieren würde

---

## 6. Trust Boundaries / Datenschutzfluss

**Grundregel aus E07 + E08:**

- E07 priorisiert **Client-side-Verarbeitung**. Jede serverseitige Verarbeitung sensibler Rohdaten ist eine Abweichung und braucht eine explizite Architektur-/Datenschutzentscheidung — ein eigener DE/EU-Worker ist **kein automatisch erlaubter Ersatz** für Client-side.
- Rohtext eines Arztbriefs darf den Browser **nur anonymisiert** in Richtung LLM verlassen.
- OCR, die Rohtext an einen externen Cloud-Dienst sendet (z. B. Google Vision API), sendet **Rohtext vor Anonymisierung** und verstößt damit gleichzeitig gegen **E07** (Rohinhalt verlässt den Client) **und E08** (Retention beim externen Dienst). Dieser Pfad ist in P7-01 **kein freigegebener Pfad** und nur als explizit zu genehmigende Ausnahmefrage zulässig — nicht als Standard-, Primär- oder Fallback-Pfad. Siehe Abschnitt 9 (Blocker B5).
- Client-seitige Textextraktion aus PDF-Text-Layern (pdf.js) verlässt den Client nicht → unproblematisch.
- Client-seitige OCR via Tesseract.js (WASM) verlässt den Client ebenfalls nicht → vertretbar, mit bekannter Qualitäts-Einschränkung bei Scans/Fotos.

**Minimale Serverfläche im MVP:**

- Der erste Build-Schritt braucht **kein Backend**.
- Sobald ein LLM-Call nötig ist, braucht es eine Proxy-Fläche (z. B. Netlify Functions oder vergleichbar) für den API-Key-Schutz. Diese Fläche ist in P7-01 **nicht festgelegt** und wird in P7-04 spezifiziert.
- Supabase ist im S4-MVP nicht involviert — keine Tabelle, kein Schema-Eingriff.

**Pflicht-Tabelle 2 — Trust Boundary (Ziel-MVP nach P7-04):**

| Schritt | Client-seitig | Verlässt Gerät | Vorbedingung | Risiko |
|---|---|---|---|---|
| Eingabe Freitext / PDF-Upload | ja | nein | — | keins (Daten im Browser) |
| PDF-Text-Layer-Extraktion (pdf.js) | ja | nein | PDF hat Text-Layer | keins |
| Foto/Scan-OCR (Tesseract.js) | ja | nein | WASM unterstützt | Qualität bei schwachen Scans niedrig |
| Foto/Scan-OCR (Google Vision API) | nein | ja | Cloud-Call | **Konflikt mit E07 (Rohtext verlässt Client) + E08 (Retention beim Dienst). In P7-01 kein freigegebener Pfad — nur als explizit zu genehmigende Ausnahmefrage.** |
| Anonymisierung (NER auf Klartext) | E07-Primat: Client-seitig. Eigener DE/EU-Worker = **offen, nicht freigegeben in P7-01** | bei Client-Variante: nein. Bei Worker-Variante: ja, vor Freigabe unzulässig | Entscheidung in P7-03 mit expliziter Architektur-/Datenschutzprüfung | bei Worker-Variante verlässt Rohtext das Gerät → E07-Abweichung, nur mit gesonderter Genehmigung |
| LLM-Dekodierung (Claude/GPT) | nein | ja | Input anonymisiert + Zero-Retention-Zusicherung | Retention-Fenster, Re-Identifikation durch Kontext |
| Ausgabe-Render (Parallelansicht) | ja | nein | — | keins |

---

## 7. Eingabetypen und Verarbeitungspfad

**Input-Klassen und Behandlung:**

| Input | MVP-Schritt 1 (P7-02) | MVP-Schritt 2 (P7-02b) | Spätere Stufe |
|---|---|---|---|
| Freitext (Paste) | ✅ akzeptiert | ✅ | ✅ |
| Druck-PDF mit Text-Layer | ✅ akzeptiert, pdf.js | ✅ | ✅ |
| Druck-PDF ohne Text-Layer (Scan-PDF) | ❌ bewusst raus | ✅ via Tesseract.js | ✅ |
| Foto einer Druckseite | ❌ bewusst raus | ✅ via Tesseract.js | ✅ |
| Handschrift (Foto/Scan) | ❌ bewusst raus | ❌ bewusst raus | offen (S4-Ergänzung, nicht MVP-kritisch) |
| Mehrsprachige Briefe | ❌ bewusst raus | ❌ | offen |

**Pipeline-Reihenfolge (Ziel-MVP-Kette, schrittweise baubar):**

1. **Input-Erfassung** — Textarea oder Datei-Upload, client-seitig.
2. **Text-Extraktion** — pdf.js für PDF-Text-Layer; Tesseract.js für Scan/Foto (erst ab P7-02b).
3. **Anonymisierung** — client-seitige NER-Maskierung von Patientendaten (Name, Adresse, Geburtsdatum, Vers.-Nr., Ärztedaten), bevor irgendetwas den Browser verlässt.
4. **LLM-Dekodierung** — Anfrage mit anonymisiertem Text an LLM-Anbieter, über API-Key-Proxy. Zero-Retention-Bedingungen vertraglich/technisch nachgewiesen.
5. **Strukturierte Ausgabe** — Parallelansicht Original/Erklärung, Inline-Glossar, Zusammenfassung, Links zu S1/S5/S6 auf Basis erkannter Entitäten.

**Handschrift im MVP — explizite Entscheidung:**

- Handschrifterkennung ist technisch unverhältnismäßig teuer und fehleranfällig für den ersten MVP.
- VW_05 listet Handschrift unter "Ergänzungen", nicht im S4-Kern.
- Empfehlung: im MVP nicht unterstützen. Nutzer-Hinweis, handschriftliche Briefe selbst abzutippen oder einzusenden; spätere Stufe kann dedizierte Handschrift-OCR evaluieren.

---

## 8. Komponentenentscheidung

**Pflicht-Tabelle 1 — Komponentenentscheidung:**

| Baustein | Kandidat(en) aus VW_05 | MVP ja/nein | Begründung |
|---|---|---|---|
| PDF-Text-Extraktion | pdf.js (Kandidat nicht explizit in VW_05, aber implizit Standard im React/Vite-Stack) | **ja** | client-seitig, kein API-Call, kein Retention-Risiko, Null-Aufwand im Vite/React-Stack. Nicht direkt aus VW_05 abgeleitet → als Ableitung aus E07 gekennzeichnet. |
| OCR Druck | Tesseract (VW_05), Google Vision API (VW_05) | **nein im Kern-MVP** | erst P7-02b. Tesseract.js (WASM) als Client-Variante ist der einzige E07-konforme Weg. Google Vision API (Cloud-OCR) ist in P7-01 **kein freigegebener Pfad** — weder als Primärweg noch als Fallback, weil Rohinhalt vor Anonymisierung den Client verlässt (Konflikt mit E07 **und** E08). Nur als explizit zu genehmigende Ausnahmefrage zulässig. |
| OCR Handschrift | (offen in VW_05, nur als Ergänzung erwähnt) | **nein** | außerhalb MVP. Keine Festlegung in dieser Spec. |
| Anonymisierung | spaCy + german-medbert (VW_05) | **ja, aber erst P7-03** | Kern der Zero-Retention-Strategie. E07 priorisiert Client-Variante (z. B. WASM). Ein eigener DE/EU-Worker ist **offene Architekturfrage** und **in P7-01 nicht vorfreigegeben** — er würde Rohtext den Client verlassen lassen und damit von E07 abweichen. Entscheidung gehört in P7-03 mit expliziter Architektur-/Datenschutzprüfung. |
| LLM-Dekodierung | Claude API (VW_05, E06), GPT-4 API (E06) | **ja, aber erst P7-04** | blockiert, bis Zero-Retention-Garantie des gewählten Anbieters dokumentiert ist und API-Key-Proxy existiert. |
| Ausgabeformat | Parallelansicht oder Fließtext, Inline-Erklärungen, Zusammenfassung, Rückfragen, Links zu S1/S5/S6 (VW_05) | **ja, aber erst P7-05** | setzt stabile LLM-Extraktion voraus. UX-Struktur in P7-05 fixieren. |

**Anmerkungen zu den Kandidaten:**

- Tesseract vs. Tesseract.js: VW_05 nennt "Tesseract" ohne Spezifikation von Variante. Für E07 ist Tesseract.js (WASM, client-seitig) die konsequente Wahl. Diese Zuordnung ist eine Ableitung aus E07, **nicht direkt aus VW_05 verifiziert**.
- german-medbert und spaCy: als Kandidaten genannt; Einsatzort (Client-Bundle-Größe vs. eigener Server) offen. Ein eigener DE/EU-Anonymisierungs-Worker ist aus E07 **nicht automatisch erlaubt**: er würde Rohtext vor Anonymisierung serverseitig verarbeiten und weicht damit vom E07-Primat der Client-side-Verarbeitung ab. Er kann nur nach expliziter Architektur-/Datenschutzentscheidung in P7-03 in Frage kommen; in P7-01 **nicht freigegeben**.
- Claude API: Standardvertrag bei Anthropic hat ein Retention-Fenster (je nach Vertrag und Zero-Data-Retention-Flag unterschiedlich). Für E08 muss der gewählte Vertrag ausdrücklich Zero Retention zusichern. **Nicht direkt verifiziert in führenden Quellen** → Blocker (siehe Abschnitt 9).

---

## 9. Blocker / Risiken

**Harte Blocker (müssen vor den jeweiligen Teilpaketen gelöst sein):**

| # | Blocker | Blockiert | Auflösungsweg |
|---|---|---|---|
| B1 | Zero-Retention-Zusicherung für LLM-Anbieter nicht dokumentiert | P7-04 | schriftliche/vertragliche Bestätigung Zero Retention für Claude API (ZDR) oder GPT-4 API beschaffen; wenn nicht erreichbar, Alternative evaluieren |
| B2 | Anonymisierungs-Ausführungsort offen. E07 priorisiert Client-side; **ein eigener DE/EU-Worker ist offene Architekturfrage und in P7-01 nicht vorfreigegeben** — er würde vom E07-Primat abweichen und braucht eine explizite Architektur-/Datenschutzentscheidung. | P7-03 | Entscheidungsvorlage in P7-03: Client-seitige NER-Lösung zuerst prüfen (E07-Primat); Worker-Variante nur mit expliziter Genehmigung und DSGVO-Bewertung |
| B3 | Kein Backend-Proxy für API-Key-Schutz vorhanden | P7-04 | Entscheidung Netlify Functions vs. eigener EU-Edge-Dienst; in P7-04 festlegen |
| B4 | S4-UX nicht in VW_06 spezifiziert (Einstiegspfad, Route, Seitenstruktur) | P7-05 | eigene UX-Klärung vor oder in P7-05; in dieser Spec nicht festgelegt. Die für P7-02 empfohlene S4-Seite ist Arbeitshypothese, keine VW_06-Entscheidung. |
| B5 | Cloud-OCR (z. B. Google Vision) kollidiert gleichzeitig mit **E07** (Rohinhalt verlässt den Client vor Anonymisierung) **und E08** (Retention beim externen Dienst). Nicht nur ein Vertrags-/Retention-Thema. | P7-02b und darüber hinaus | In P7-01 **kein freigegebener Pfad** — weder Standard noch Fallback. Nur als explizit zu genehmigende Ausnahmefrage, mit eigener Architektur-/Datenschutzentscheidung. Primärweg bleibt Tesseract.js (client-seitig). |

**Weiche Risiken (dokumentiert, nicht akut blockierend):**

- Re-Identifikationsrisiko trotz Anonymisierung durch Kontext (seltene Diagnose + Fachbegriffe) — in P7-03 adressieren.
- Qualität von Tesseract.js bei schlechten Scans niedrig — P7-02b muss Mindest-Qualitäts-Heuristik oder Nutzer-Hinweis mitliefern.
- FHIR R4 (E09) wird im S4-MVP **nicht** umgesetzt, sondern nur im Datenmodell-Entwurf als Planungsprinzip mitgedacht.
- Sandbox hat keinen externen Internet-Zugriff (CLAUDE.md) → relevant für Pipeline-/Bundle-Builds durch Claude, nicht für die Laufzeit im Nutzerbrowser.
- S4 in VW_06_WEBSITE nicht als Detailseite beschrieben → Einstiegspfad noch zu klären (B4). Nicht direkt verifiziert.

**Keine STOP-Regel ausgelöst:**

- A-Punkte sind ohne Spekulation aus führenden Quellen ableitbar, sofern "nicht direkt verifiziert" sauber markiert ist.
- Datenschutz-Anspruch (E07/E08) und geplanter Technikweg kollidieren nicht im ersten Build-Schritt (P7-02), da dort kein Netzverkehr mit Rohtext stattfindet.
- Kein vorgeschlagener MVP-Schritt arbeitet mit zu vielen stillen Annahmen — Blocker B1–B5 sind offen benannt und ihren Teilpaketen zugeordnet.

---

## 10. Empfohlene P7-Teilpakete in Reihenfolge

**Pflicht-Tabelle 3 — P7-Phasenfolge:**

| Paket | Ziel | Build ja/nein | Grund |
|---|---|---|---|
| P7-01 | Architektur- und Sicherheits-Spec (diese Datei) | **ja — abgeschlossen mit diesem Dokument** | Grundlage für alle Folgepakete |
| P7-02 | Minimal-Input (Paste/Text + PDF-Text-Layer via pdf.js) auf einer **S4-Seite als minimaler Arbeitsfläche (Arbeitshypothese, keine VW_06-Entscheidung)**, Datenschutz-Banner, **keine OCR, kein LLM, kein externer Rohdatenabfluss** | **ja — sofort baubar** | kein Netzverkehr mit Nutzertext, kein Backend nötig, keine Blocker |
| P7-02b | Client-seitige OCR für Foto/Scan via Tesseract.js | ja, nach P7-02 | kein Netzverkehr mit Nutzertext, Qualitäts-Caveats dokumentieren. Cloud-OCR-Alternative ist **kein freigegebener Pfad** (B5). |
| P7-03 | Anonymisierungs-Stufe — **Client-Variante gemäß E07-Primat**; eigener DE/EU-Worker nur nach expliziter Architektur-/Datenschutzentscheidung | **blockiert durch B2** | Client-Variante zuerst evaluieren; Worker-Variante ist nicht vorfreigegeben |
| P7-04 | LLM-Dekodierung über API-Key-Proxy, Zero-Retention nachgewiesen | **blockiert durch B1 und B3** | Vertrag + Proxy + Tests |
| P7-05 | Sichere Ausgabe/UX (Parallelansicht, Inline-Erklärungen, Rückfragen, Cross-Links S1/S5/S6) | blockiert durch P7-04 | setzt stabile LLM-Extraktion voraus |
| P7-Optional (Phase 2) | Handschrift, Mehrsprachigkeit, Notfall-Flag, S9-Anbindung | **nein im MVP** | nicht Kern, klare Erweiterungspfade |

**Begründung Reihenfolge:** Jedes Paket kann unabhängig vom jeweils folgenden stabilen Nutzerwert liefern (Text-Vorschau → OCR-Vorschau → anonymisierte Vorschau → dekodierte Ausgabe). Kein Paket erzwingt Entscheidungen in einem späteren Paket.

---

## 11. Freigabeentscheidung für den ersten Build-Schritt

**Status dieser Spec nach P7-01a-Patch:**

- **P7-01 nach diesem Patch kanonisch freigabefähig.** E07/E08 sind enger, nicht weicher ausgelegt. Weder eigener Anonymisierungs-Worker noch Cloud-OCR sind durch P7-01 vorfreigegeben.

**Freigegeben:**

- **P7-02** — ausschließlich: lokaler Input (Paste/Text + PDF-Upload) + lokale PDF-Text-Layer-Extraktion (pdf.js) + minimale S4-Seite als Arbeitsfläche + Datenschutz-Banner.
  - **ohne OCR**
  - **ohne LLM**
  - **ohne externen Rohdatenabfluss**
  - kein Backend, kein Supabase-Eingriff, keine neuen DB-Tabellen, keine Secrets
  - S4-Seite ist Arbeitshypothese für P7-02, keine durch VW_06 verifizierte Website-Entscheidung — Einstiegspfad/Route bleibt unter B4 offen

**Nicht freigegeben (bleibt blockiert bis Bedingungen erfüllt):**

- P7-03 (Anonymisierung) — blockiert durch B2. Client-Variante hat E07-Vorrang. Eigener DE/EU-Worker ist **nicht vorfreigegeben** und braucht explizite Architektur-/Datenschutzentscheidung.
- P7-04 (LLM-Dekodierung) — blockiert durch B1 und B3
- P7-05 (UX/Ausgabe) — blockiert durch P7-04
- Cloud-OCR-Route (z. B. Google Vision) — **kein freigegebener Pfad**, weder Primär- noch Fallbackweg (B5). Nur als explizit zu genehmigende Ausnahmefrage mit eigener Architektur-/Datenschutzentscheidung.

**Empfohlener nächster Schritt nach dieser Spec:** P7-02 starten, streng auf lokalen Input + lokale PDF-Text-Layer-Extraktion + UI-Fläche + Datenschutz-Banner begrenzt. Keine OCR, keine Anonymisierung, keine LLM-Anbindung, kein externer Rohdatenabfluss in diesem Paket.

---

## Ops Closure (inhaltlich · technisch angewendet · operativ abgesichert)

### Inhaltlich

P7-01 liefert die verbindliche Architektur- und Sicherheitsgrundlage für S4. MVP-Schnitt, Trust Boundaries, Pipeline-Reihenfolge, Komponenten-Zuordnung, Blocker-Liste und P7-Phasenfolge sind aus den führenden Quellen abgeleitet und offen markiert, wo nicht direkt verifizierbar. Erster Build-Schritt (P7-02) freigegeben; P7-03/04/05 sauber an Blocker gekoppelt.

### Technisch angewendet

- Datei: `01_PROJECT_SOURCES_CURRENT/P7_01_S4_ARCHITECTURE_SPEC.md` — erstellt in P7-01, **in P7-01a gepatcht** (einzige geänderte Datei)
- Keine andere Datei verändert
- Keine DB-Writes
- Keine Code-Änderungen
- Keine Deploy-Änderungen

### Operativ abgesichert

- Speicherpfad: `01_PROJECT_SOURCES_CURRENT/P7_01_S4_ARCHITECTURE_SPEC.md` im Arbeitsordner (persistierend).
- Lokaler Persistenzstatus: Datei im macOS-Mount geschrieben, außerhalb jeder Session abrufbar.
- `git status`: nicht eingecheckt (neue Datei außerhalb des Repo-Clones in `00_REPO/`).
- Commit-Status: **kein Commit**.
- Push-Status: **kein Push**.
- DB-Writes: **nein**.
- Deploy: **nein**.
- Offener Side Effect: **nein**.

---

*Erstellt: 16.04.2026 — P7-01 abgeschlossen. Grundlage für P7-02.*
*Patch: 16.04.2026 — P7-01a Micro-Patch angewendet. E07/E08 enger gefasst; eigener Anonymisierungs-Worker = offen/nicht freigegeben; Cloud-OCR = E07+E08-Konflikt, kein freigegebener Pfad; dedizierte S4-Seite = Arbeitshypothese für P7-02; Schlussfreigabe neu gefasst.*
