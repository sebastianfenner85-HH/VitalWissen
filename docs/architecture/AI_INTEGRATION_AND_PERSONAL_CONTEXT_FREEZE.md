# AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE

**Paketname:** AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE — Strategie-Freeze
**Datum:** 13.05.2026
**Status:** ✅ Freeze-Dokument erstellt — bindende strategische Grundlage
**Kein DB-Write. Kein Commit. Kein Push. Kein Deploy. Kein Build-Auftrag.**

**Pflichtlektüre-Basis (Quellen dieses Dokuments):**

| Quelle | Rolle |
|--------|-------|
| `P7D_ARCHITECTURE_RESET_FREEZE.md` | Führend — Architektur, Kernobjekte, Querschichten, Phasenlogik |
| `VW_04_ENTSCHEIDUNGEN.md` | Führend — Grundsatzentscheidungen E01–E29 |
| `AUDIT_CANON_CURRENT.md` | Aktueller Gesamtstand |
| `ACTIVE_STRANDS_CURRENT.md` | Operative Strang-Übersicht |
| `VW_03_STATUS.md` | Sprint-Status aller Säulen |
| `VW_05_SAEULEN.md` | Säulen-Scope und Datenlogik |
| `VW_06_WEBSITE.md` | Website-Konzept, Einstiegspfade, UX |

---

## 1. KURZVERDIKT

**VitalWissen ist keine Antwortmaschine. VitalWissen ist eine Verständnis-, Trust- und Handlungsschicht über Gesundheitswissen.**

Google-KI beantwortet schnell. VitalWissen erklärt belastbar. Das ist kein Widerspruch — es ist eine Arbeitsteilung.

Google/Gemini ist für VitalWissen gleichzeitig:
- **Benchmark** (Nutzernachfrage dort zeigt Wissensbedarf hier)
- **potenzielle Integrationsschicht** (API, AI-Readable-Content, KI-Prompt-Export)
- **Kanal** (VitalWissen-Inhalte können in Gemini-Antworten zitiert werden)
- **kein Feind** und **kein Kernbesitz** der Plattform

Die defensible Differenzierung liegt nicht in schnelleren Antworten, sondern in:
1. Quellenverankerung (Q2 Trust-Layer — jede Aussage nachvollziehbar)
2. Personalisiertem Kontext (persönliche Laborwerte, Diagnosen, Arztbriefe — auf Wunsch)
3. Vernetzung (Krankheit → Laborwert → Supplement → Wirkstoff → Forschung → nächste Schritte)
4. Handlungsorientierung (B4 — was kann ich konkret tun?)

**Was immer bei VitalWissen liegt — und nirgendwo anders:**
Persönlicher Gesundheitskontext mit dokumentierten Quellen, plattformübergreifend nutzbar, unter Nutzerhoheit.

---

## 2. PRODUKTTHESE

> **VitalWissen ist die verlässliche deutschsprachige Basis, die Gesundheitsinformation, Forschung und persönlichen Kontext verbindet — damit Menschen informiert handeln, statt nur zu googeln.**
> *(P7D_ARCHITECTURE_RESET_FREEZE §1, unveränderter Nordstern)*

**Konkretisierung für das KI-Zeitalter:**

In einer Welt, in der Google/Gemini jede Gesundheitsfrage binnen Sekunden mit einer Antwort bedient, ist die Frage nicht mehr *"Wie bekomme ich eine Antwort?"*, sondern *"Warum sollte ich dieser Antwort trauen, und was mache ich jetzt konkret?"*

VitalWissen beantwortet genau das:

| Was Google gibt | Was VitalWissen ergänzt |
|----------------|------------------------|
| Schnelle Antwort | Verlässlichkeit + Quellenbeleg |
| Allgemeine Info | Einordnung im persönlichen Kontext |
| Text-Ergebnis | Vernetzung + nächste Schritte |
| Wahrscheinlichste Diagnose | Einordnung des eigenen Befunds, nicht Diagnoseersatz |
| Keine Haftung | Klare Abgrenzung (kein Arzt, kein Diagnose-Bot) |

VitalWissen konkurriert also nicht auf der Ebene "Wer antwortet schneller", sondern auf der Ebene "Wer ist verlässlicher, tiefer verlinkt und für meine persönliche Situation relevanter".

---

## 3. WARUM GOOGLE-KI KONKURRENZ UND WERKZEUG ZUGLEICH IST

### Konkurrenz — auf der Einstiegsebene

Wenn jemand "Was bedeutet Ferritin erniedrigt?" googelt, bekommt er heute mit Gemini eine sofortige, kompakt formulierte Antwort. Das ist real. Viele Nutzer werden nie tiefer gehen. Das ist der Verlust-Kanal.

**Antwort von VitalWissen:** Nicht versuchen, auf dieser Ebene zu "gewinnen" — sondern tiefer zu liefern als jede KI-Schnellantwort: verlinkte Quellen, Zielwerte, Einordnung im klinischen Kontext, was zu tun ist.

### Werkzeug — auf der Integrations- und Distributionsebene

Google/Gemini kann VitalWissen-Inhalte indexieren, zitieren und als verlässliche Quelle weiterleiten. Das ist kein Verlust, sondern Distribution. Voraussetzung: VitalWissen-Inhalte sind maschinenlesbar, strukturiert, sauber quellenbelegte (Schema.org, strukturierter Markup).

**Kernprinzip:** VitalWissen ist AI-Readable by Design. Nicht als Kapitulation vor Google, sondern als strategische Entscheidung: Wer in KI-Antworten als Quelle zitiert wird, hat gewonnen.

### Weder Feind noch Kernbesitz

| Fehlannahme | Richtige Einordnung |
|-------------|---------------------|
| „Wir müssen schneller sein als Gemini" | Falsch — Geschwindigkeit ist nicht der Differenzierungshebel |
| „Gemini ersetzt VitalWissen komplett" | Falsch — KI kann keinen verifizierten persönlichen Gesundheitskontext halten |
| „Wir müssen Google-unabhängig bleiben" | Teilweise richtig — persönliche Daten nie an Google; öffentliche Inhalte können indexiert werden |
| „Wir bauen ein eigenes KI-Frontend" | Falsch für Phase 1–3 — BYO-AI reicht, kein eigenes Modell (E06) |

---

## 4. DREI MODI VON VITALWISSEN

VitalWissen bedient drei fundamentale Nutzermodi. Diese Modi sind keine getrennten Produkte — sie sind Zugriffsebenen auf dieselbe Plattform.

---

### Modus 1 — Schnellantwort

**Definition:** Der Nutzer hat eine konkrete Frage und will sofort eine verständliche, verlässliche Antwort — ohne langes Lesen.

**Wer braucht das:** Jemand, der gerade einen Laborbefund in der Hand hat und "Was bedeutet HbA1c 7,2 %" wissen will.

**Was VitalWissen liefert:**
- Kurze, direkte Erklärung auf der Detailseite (Block 1)
- Einordnung: normal / grenzwertig / erhöht (visuell, ohne Diagnose)
- Quellenankerpunkt (Q2 Trust-Layer — eine Zeile, kein Wall of Text)
- Nächste Schritte: eine handlungsorientierte Empfehlung (B4, Gesprächspunkt-Karte)

**Was VitalWissen NICHT liefert:** Diagnose, Therapieempfehlung, "Sie haben X".

**Differenzierung zu Google-KI:** Die Schnellantwort bei VitalWissen ist quellenbelegbar und an Kernobjekte gebunden (kein halluzinierter Kontext). Der Nutzer kann sofort sehen, woher die Information kommt.

**UI-Konsequenz:** Schnellantwort-Modus ist nicht separat — er ist die Detailseite mit optimierter Scanning-Logik (Q6 Mobile-first, Q3 Piktogramm-Layer, klare Block-Hierarchie). Die ersten zwei Blöcke müssen für Scanning ohne Scrollen auswertbar sein.

---

### Modus 2 — Tiefen-/Trustansicht

**Definition:** Der Nutzer will mehr als die Schnellantwort — er will die Quelle sehen, verstehen warum eine Information stimmt, vergleichen, und den Hintergrund erkennen.

**Wer braucht das:** Jemand, der eine Diagnose bekommen hat und sich wirklich informieren will. Oder jemand, der einem Arzt gegenübersitzt und fundierte Rückfragen stellen will.

**Was VitalWissen liefert:**
- Vollständige Detailseite mit allen Blöcken (B2 Verstehen/Einordnen)
- Q2 QuellenBox: Quellentyp-Chip, Name-Link, Jahr — je Aussage nachvollziehbar
- Vernetzungslogik: Krankheit → verwandte Laborwerte → verwandte Supplements → Wirkstoffe → Studien
- S3 Studien-Block (Phase C): was sagt die Forschung, eingeordnet nach Evidenzlevel
- B4 Nächste Schritte: eingestufte Maßnahmen mit Gesprächspunkten vs. Eigenhandeln

**Differenzierung zu Google-KI:** Keine KI-generierte Zusammenfassung. Jede Aussage hat einen verifizierten, verlinkbaren Quellanker (E28). Kein Halluzinationsrisiko auf Quellenebene.

**UI-Konsequenz:** Sekundärblöcke (surface-2) trennen Tiefeninfo von Basisinfo visuell. QuellenBox ist on-page, nicht hinter einem externen Link. Accordion-Logik für Zielwerte/B4 schützt vor Überfrachtung.

---

### Modus 3 — Persönlicher Kontext

**Definition:** Der Nutzer bringt seine eigene Situation ein — eigene Laborwerte, eigene Diagnosen, eigener Arztbrief, eigene Medikamentenliste — und will Inhalte im Licht seiner persönlichen Daten sehen.

**Wer braucht das:** Jemand, der seinen Arztbrief nicht versteht. Jemand, der wissen will, ob seine aktuelle Medikation mit einem Supplement interagiert. Jemand, der mehrere Diagnosen hat und verstehen will, wie sie zusammenhängen.

**Was VitalWissen liefert (phasenweise):**
- **Jetzt:** S4 Arztbrief-Decoder (E07/E08: Zero Retention, client-side, kein Cloud-OCR ohne ZDR, kein persistentes Speichern)
- **Phase C:** Watchlists (K10) — eigene Kernobjekte abonnieren, Updates bekommen
- **Phase D:** S9 Health Data Hub — opt-in, E2E-verschlüsselt, FHIR R4, Nutzerhoheit vollständig
- **Phase D:** Q7 Personalisierungs-Layer — eigene Laborwerte, Diagnosen, Medikamente als Kontextfilter

**Warum dieser Modus defensibel ist:**
Google/Gemini hat keinen Zugriff auf persönliche Gesundheitsdaten unter Nutzerhoheit. Wer diesen Kontext bei VitalWissen hält, hat einen Wissensassistenten, der ihn kennt — ohne dass Google/Meta/OpenAI die Daten sehen.

**UI-Konsequenz:** Persönlicher Kontext erscheint nie ungefragt. Opt-in-Logik ist prominent und ehrlich. S4 hat klaren Trust-Frame. S9 (Phase D) braucht dediziertes Onboarding.

---

## 5. GOOGLE-/GEMINI-INTEGRATIONSPFADE

Diese Pfade sind keine Build-Aufträge. Sie sind Architekturprinzipien und spätere Optionen — eingeordnet nach Phase und Freigabestatus.

---

### Pfad 1 — AI-Readable Website (Architekturprinzip: jetzt)

**Was:** VitalWissen-Inhalte sind strukturiert und maschinenlesbar aufgebaut — Schema.org-Markup, saubere Semantic-HTML-Struktur, offene URLs, keine paywalled Content-Walls.

**Warum:** Wenn Gemini / ChatGPT / Perplexity Gesundheitsfragen beantwortet, sollen sie VitalWissen als verlässliche Quelle zitieren. Das ist passives Marketing und Distribution.

**Voraussetzungen heute bereits erfüllt:**
- Öffentliche Detailseiten ohne Login-Wall (PasswordGate nur Beta)
- Strukturierter Content nach Blöcken
- Quellenangaben direkt auf der Seite

**Offen:** Schema.org-Markup (schema_org JSONB in laborwerte — vorgesehen, nicht ausgebaut). Kein Build-Auftrag in diesem Freeze.

**Freigabestatus:** Architekturprinzip ✅ — kein separater Build-Auftrag nötig, fließt in reguläre Build-Sorgfalt ein.

---

### Pfad 2 — KI-Prompt-Export (Phase C)

**Was:** Ein Nutzer kann seinen VitalWissen-Kontext (Diagnosen, Laborwerte, Watchlist) als strukturierten Text exportieren und in ChatGPT, Claude oder Gemini einfügen.

**Beispiel:** "Hier ist mein aktueller Gesundheitskontext aus VitalWissen. Mein HbA1c ist 7,2, ich habe Typ-2-Diabetes (E11) und Eisenmangel (D50). Welche Fragen sollte ich beim nächsten Arzttermin stellen?"

**Warum:** VitalWissen wird Kontextgeber, nicht Antwortgeber. Nutzer behalten Kontrolle. Kein Datentransfer direkt zwischen VitalWissen und Google.

**Datenschutzprinzip:** Der Export liegt beim Nutzer. VitalWissen überträgt keine Daten direkt an Google. Der Nutzer entscheidet selbst, was er in eine externe KI einfügt.

**Freigabestatus:** Architekturkonzept — Phase C, kein Build-Auftrag jetzt.

---

### Pfad 3 — Gemini API als optionaler Provider (Phase D, opt-in)

**Was:** Für bestimmte Verarbeitungsaufgaben (z. B. Zusammenfassungen, Sprachvereinfachung, Klassifikation) könnte Gemini API als alternativer LLM-Provider neben Mistral/Claude eingebunden werden.

**Bedingungen (alle müssen erfüllt sein):**
- Ausschließlich für öffentliche Inhalte (nie für personenbezogene Daten)
- Verarbeitete Daten dürfen keine Gesundheitsdaten des Nutzers enthalten
- ZDR/DPA-Konformität muss geprüft und schriftlich bestätigt sein (analog Mistral P7-04c)
- Opt-in durch Sebastian explizit für diesen Pfad

**Aktuell:** MISTRAL_API_KEY gesetzt (S4-Proxy, stateless, Phase B). Kein Gemini-API-Schlüssel. Kein Build-Auftrag.

**Freigabestatus:** Spätere Option — Phase D, kein Build-Auftrag jetzt. Kein Commit, kein API-Key, kein Implementierungsschritt.

---

### Pfad 4 — Google Health API / Health Connect (Phase D/E)

**Was:** Direkte Anbindung von Google Health Connect (Android) für Wearable-/Tracker-Daten (Schritte, Herzrate, Schlaf, Gewicht).

**Voraussetzungen:**
- S9 Health Data Hub live (Phase D)
- E2E-Verschlüsselung aktiv (E10)
- Datenschutzrechtliche Prüfung DE/EU (Health-Daten = besondere Kategorie DSGVO Art. 9)
- OAuth-Implementierung (E25)
- Explizites Nutzer-Opt-in pro Datenquelle

**Freigabestatus:** Phase D/E — kein Build-Auftrag jetzt. Kein OAuth-Flow, kein API-Key, keine Implementierung.

---

### Pfad 5 — BYO-AI-Kontextschicht (Q9, Phase D/E)

**Was:** Nutzer können ihre eigene KI (Claude, GPT-4, Gemini) mit VitalWissen-Kontext versorgen — entweder via Prompt-Export (Pfad 2) oder via strukturiertem API-Zugang auf ihre eigenen S9-Daten (mit Nutzerschlüssel).

**Warum:** VitalWissen wird Wissens- und Datenschicht, nicht KI-Frontend. Das ist effizienter als ein eigenes KI-Interface und respektiert Nutzerentscheidungen über KI-Präferenzen.

**Q9-Einordnung (bestehend, P7D §7):** BYO-AI ist **Integrationslayer Q9** — keine eigene Säule, kein eigenes KI-Frontend. Querschicht, die über S9 andockt. Phase D.

**Freigabestatus:** Architekturprinzip jetzt ✅ (aus P7D_ARCHITECTURE_RESET_FREEZE §7) — Build Phase D, kein Auftrag jetzt.

---

## 6. DATENKLASSIFIKATION

Jede Kategorie hat klare Regeln für den Umgang mit externen KI-Systemen.

---

### Klasse 1 — Öffentliche Inhaltsdaten

**Was:** Texte, Einordnungen, Quellenbelege auf Detailseiten (Krankheiten, Laborwerte, Supplements, Wirkstoffe, Ernährung, Studien). Diese Daten sind auf `vitalwissen.netlify.app` öffentlich abrufbar.

**Externe KI-Freigabe:** ✅ **Vollständig freigegeben**
- Indexierung durch Google/Bing/KI-Crawler: erlaubt
- Zitierung in Gemini/ChatGPT-Antworten: erwünscht
- Nutzung als Trainings-/Retrieval-Basis durch externe KI: strukturell möglich, keine aktive Blockierung

**Bedingung:** Quellenangaben müssen erhalten bleiben. VitalWissen ist kein freier Content-Lieferant ohne Attribution.

---

### Klasse 2 — Pseudonyme Nutzungsdaten

**Was:** Technische Nutzungslogs, Suchanfragen ohne Personenbezug (falls zukünftig erhoben), Watchlist-Aktivitäten auf öffentlichen Inhalten.

**Externe KI-Freigabe:** ⚠️ **Nur anonymisiert und aggregiert**
- Kein individueller Datentransfer an Google/Gemini
- Aggregierte Trending-Daten (z. B. "diese Krankheit wird häufig zusammen mit X gesucht") intern nutzbar
- Kein Verkauf, kein Affiliate, kein Targeting (E01)

---

### Klasse 3 — Gesundheitsdaten (nutzereingebracht, opt-in)

**Was (Phase D):** Eigene Laborwerte, gespeicherte Diagnosen, Watchlist-Objekte mit persönlichem Kontext. Nur nach explizitem Opt-in in S9 Health Data Hub.

**Externe KI-Freigabe:** 🔴 **NEIN — grundsätzlich verboten ohne explizite Nutzerentscheidung**
- Kein automatischer Transfer an Google Health / Gemini
- Kein Cloud-Logging persönlicher Gesundheitsprofile
- DSGVO Art. 9 (besondere Kategorien) — höchste Schutzklasse
- Ausnahme nur nach explizitem, informiertem Nutzerkonsent für exakt diesen Datensatz

---

### Klasse 4 — Arztbriefe und medizinische Befunde

**Was:** Eingaben in S4 Arztbrief-Decoder — PDF, Foto, Scan, Text-Paste.

**Externe KI-Freigabe:** 🔴 **NEIN — strukturell und technisch blockiert**
- E07 (Client-side-Verarbeitung) + E08 (Zero Retention) sind unveräußerliche Architekturentscheidungen
- Anonymisierung vor API-Call (P7-03 Worker aktiv)
- S4-Proxy nur für anonymisierten Text (Mistral stateless, ZDR-Nachweis P7-04c)
- Rohe Arztbrief-Daten verlassen das Client-Gerät strukturell nie
- Google Cloud Vision / Google Health API für Arztbriefe: **dauerhaftes No-Go**

---

### Klasse 5 — Wearable-/Fitnessdaten

**Was (Phase D/E):** Herzrate, Schlaf, Schritte, Gewicht aus Health Connect / Apple Health / Garmin etc.

**Externe KI-Freigabe:** 🔴 **NEIN ohne explizites Opt-in pro Quelle**
- Phase D — kein Build-Auftrag jetzt
- Jede Datenquelle braucht separates Nutzerkonsent
- Keine automatische Weitergabe an Google Health API ohne explizite Entscheidung
- E2E-Verschlüsselung (E10) und EU-Serverstandort (E11) als Bedingung für Phase-D-Build

---

### Zusammenfassung Datenklassifikation

| Klasse | Datentyp | Externe KI | Bedingung |
|--------|----------|-----------|-----------|
| 1 | Öffentliche Inhalte | ✅ Freigegeben | Attribution erhalten |
| 2 | Pseudonyme Nutzungsdaten | ⚠️ Nur anonymisiert/aggregiert | Kein Personenbezug |
| 3 | Persönliche Gesundheitsdaten | 🔴 NEIN | Nur explizites Opt-in pro Datensatz |
| 4 | Arztbriefe/Befunde | 🔴 NEIN (strukturell) | E07/E08 unveräußerlich |
| 5 | Wearable-/Fitnessdaten | 🔴 NEIN ohne Opt-in | Phase D, Opt-in pro Quelle |

---

## 7. UI-KONSEQUENZEN

Dieser Abschnitt listet UI-Bausteine, die auf Basis dieser Strategie auf künftigen Detailseiten und Seitenbereichen berücksichtigt werden müssen. **Kein Build-Auftrag.**

---

### 7.1 — Schnellantwort-Optimierung (Modus 1)

- **Blöcke 1+2** jeder Detailseite müssen auf Mobile ohne Scrollen auswertbar sein (Q6)
- Ikonische Einordnung (Ampel / Badge / Visual) vor Fließtext (Q3)
- Eine handlungsorientierte Nächste-Schritte-Karte (B4) muss auf Höhe Block 1–2 sichtbar oder unmittelbar darunter sein
- Kein Wall of Text im Einstiegsbereich

### 7.2 — Trust-Layer Sichtbarkeit (Q2, Modus 2)

- QuellenBox ist kein Link zum Ende der Seite — sie sitzt direkt am Inhaltselement, das sie belegt
- Quellentyp-Chip (guideline / regulatory / database / research / patient_info) macht Quellenart sofort lesbar
- Max. 2 Quellen expanded + "N weitere"-Button verhindert Überfrachtung
- `research`-Chip (violett-grau) kennzeichnet Forschungsquellen (S3, ab Phase C)

### 7.3 — Persönlicher Kontext (Modus 3)

- S4-Zugang: prominente Trust-Frame-Komponente (schon implementiert, P7-05) — Zero Retention-Versprechen muss auf der UI sichtbar und verständlich sein
- Phase C/D: Watchlist-Button auf Detailseiten (K10) — non-intrusiv, secondary-button
- Phase D: "In meinem Kontext" / "Zu meinem Profil hinzufügen" — immer als optionales Element, nicht als Pflichtinteraktion
- Kein personalisierer Inhalt ohne expliziten Opt-in-Flow

### 7.4 — KI-Transparenz-Baustein

- Wenn VitalWissen künftig KI-verarbeitete Inhalte zeigt (z. B. Zusammenfassungen via Mistral/Claude): eigene Komponente nötig — "KI-unterstützte Zusammenfassung — Quellen oben" — eindeutig sichtbar
- Kein unmarkierter KI-Generated-Content (E03, E28)
- S4 bereits: Disclaimer + Anon-Badge + Trust-Frame (P7-05)

### 7.5 — Externe KI-Hinweis-Baustein (Phase C/D)

- Wenn KI-Prompt-Export (Pfad 2) gebaut wird: klarer UI-Button "In eigener KI nutzen" mit Erklärtext
- Datenschutz-Hinweis direkt im Exportdialog ("Diese Daten verlassen VitalWissen. Du entscheidest, wo du sie einfügst.")

---

## 8. PHASENLOGIK

Einordnung aller Google-/KI-Integrationspfade in die bestehende Phasenlogik (P7D_ARCHITECTURE_RESET_FREEZE §11):

| Pfad / Maßnahme | Phase | Status | Freigabebedingung |
|----------------|-------|--------|--------------------|
| AI-Readable Website (Schema.org-Markup) | B/C | Architekturprinzip — mitläufen | Kein Build-Auftrag, fließt in reguläre Qualitätsanforderung ein |
| KI-Prompt-Export (Nutzerhoheit) | C | Konzept | Spec-Paket vor Build (eigenständiger Chat) |
| Gemini API als optionaler LLM-Provider | D | Nicht aktiv | ZDR/DPA-Nachweis Pflicht vor Freigabe |
| Google Health API / Health Connect | D/E | Nicht aktiv | S9 live + E2E + Opt-in-Architektur + rechtliche Prüfung |
| BYO-AI-Kontextschicht (Q9) | D/E | Architekturprinzip ✅ | Baut auf S9 auf — kein eigenständiger Build-Auftrag |
| Persönlicher Kontext (S9 Health Hub) | D | Nicht aktiv | E2E + Opt-in + FHIR R4 + EU-Server (schon geplant) |
| Watchlists (K10, Q5) | C | Spec ausstehend | Eigenständiger Spec-Chat vor Build |

**Unveränderter Nordstern der Phasenlogik:**
Phase B läuft. Phase C (S3-BUILD-01 nach SQL Apply) ist vorbereitet. Alles hier ist Konzept für Phase C/D/E — kein Eingriff in die aktive Phase B.

---

## 9. NO-GOS

Diese No-Gos sind bindend. Sie ergänzen die bestehenden No-Gos aus P7D_ARCHITECTURE_RESET_FREEZE §13 und VW_04_ENTSCHEIDUNGEN.md.

### Dauerhaft (keine Phase löst sie auf)

| No-Go | Begründung |
|-------|-----------|
| Freier Diagnose-Bot ("Haben Sie Symptome X und Y? Dann könnten Sie..." → Diagnose) | Medizinrechtlich, Haftung, E03, P7D §1 |
| Therapieautomatik ("Nehmen Sie Medikament X") | Dauerhaftes No-Go, P7D §13 |
| KI-generierte Quellen ohne Verifikation | E28 (permanent): nur verlinkbare, professionell anerkannte Quellen |
| Unkontrollierte Weitergabe persönlicher Gesundheitsdaten (Klassen 3–5) an Google/Gemini/andere | Datenklasse 3–5 = strukturell blockiert |
| Rohe Arztbrief-Daten an Cloud-Dienste (Cloud-OCR ohne ZDR-Nachweis) | E07, E08 permanent |
| Google als "Kernbesitz" der Plattform | VitalWissen ist Wissens-/Kontextschicht, nicht Google-Reseller |
| KI-Antwort ohne Quellenbeleg auf Inhaltsseiten | E03 + E28 |

### Bis zur expliziten Freigabe durch Sebastian

| No-Go | Freigabebedingung |
|-------|------------------|
| Google OAuth / Google Login | Nicht vor Phase D, explizites Freigabe-Paket nötig |
| Health Connect / Google Health API | S9 live + rechtliche Prüfung + Opt-in-Architektur |
| Gemini API als LLM-Provider | ZDR/DPA-Nachweis analog P7-04c |
| KI-Prompt-Export-Feature | Spec-Paket + Datenschutz-Review vor Build |
| Personalisierter Inhalt ohne Opt-in | S9-Architektur vollständig fertig |
| Jede neue externe API mit Gesundheitsdatenbezug | Explizites Freigabe-Paket mit ZDR/DPA-Check |

### In diesem Paket (Freeze-Scope)

| No-Go | |
|-------|---|
| Kein Code | ✅ |
| Kein DB-Write | ✅ |
| Kein Commit / Push / Deploy | ✅ |
| Kein Build-Auftrag enthalten | ✅ |
| Keine Änderung an S4, S6, S18 oder S3 | ✅ |

---

## 10. AUSWIRKUNGEN AUF STRÄNGE

### S3 — Studienkompass

**Einordnung:** Öffentliche Inhalte (Klasse 1). Studieneinträge (K6) sind AI-Readable. S3-Block [15] auf S5-Seiten ist Modus-2-Inhalt (Tiefenansicht). Keine KI-Generierung in K6-Feldern — alle Felder `ergebnis`, `was_untersucht`, `einschraenkungen` sind manuell kuratiert (Pipeline-Spec K.1, S3-K6-SCHEMA-SPEC permanent). Hype-Guardrails (tierversuch_flag, preprint_flag) bleiben unverändert. Keine Auswirkung auf die laufende Preflight-Phase.

### S6 — Medikamenten-Erklärer

**Einordnung:** Öffentliche Inhalte (Klasse 1). Wirkstoff-Interaktionsdaten (supp_interaktionen) sind öffentlich zugänglich. S6↔S4-Anschluss: Wirkstoff-Erkennung aus Arztbriefen könnte in S4 eingebunden werden — nur nach Anonymisierung, nur client-side. Kein neuer Build-Auftrag hier.

### S8 — B4 Nächste Schritte

**Einordnung:** Handlungsorientierung (B4) ist das entscheidende Differenzierungsmerkmal gegenüber Google-KI-Schnellantworten. B4-Karten müssen mit `whyShown`, `safetyLevel`, `requiresDoctorDiscussion` befüllt sein (B4-DECISION-LOGIC-FREEZE, Patch-01). KI darf nie B4-Maßnahmen generieren — nur manuell kuratierte Daten. Bestehende Safety-Architektur unverändert.

### S9 — Health Data Hub

**Einordnung:** Fundament für Modus 3 (Persönlicher Kontext). S9 ist Phase D — kein Build-Auftrag. Architekturprinzip: E2E-Verschlüsselung (E10), EU-Server (E11), Opt-in-Logik, FHIR R4 (E09). Alle in §5 genannten Google-Integrationspfade (Pfad 3–5) bauen auf S9 auf und sind damit frühestens Phase D.

### S18 — Ernährungskompass

**Einordnung:** Öffentliche Inhalte (Klasse 1). Lebensmittel-Wechselwirkungen (z. B. Grapefruit↔Simvastatin) könnten in KI-Prompt-Export (Pfad 2) besonders wertvoll sein — Nutzer können ihren Ernährungskontext exportieren. Kein Build-Auftrag jetzt. Alle 4 Kernobjekte vollständig (S18-Build-05).

### Q2 — Trust-Layer

**Einordnung:** Q2 ist der primäre Differenzierungshebel gegenüber KI-Schnellantworten. Quellenbox (auf S1, S2, S5, S6 implementiert) macht jeden Inhaltsblock nachvollziehbar. KI-Antworten haben keine QuellenBox — VitalWissen hat sie. Q2 muss auf jeder neuen Seite von Beginn an implementiert sein. Quellentyp `research` (violett-grau, Q2-MAPPING-PATCH) deckt S3-Inhalte ab.

### Q4 — Update-/Change-Layer

**Einordnung:** Q4 (noch nicht gebaut) ist der Mechanismus, mit dem Google/Gemini-Updates ("neue Leitlinie zu Metformin") in VitalWissen-Inhalte eingearbeitet werden — objekt-gebunden, nicht als Newsroom. Q4 macht VitalWissen aktiver als statische KI-Trainingsdaten.

### Q5 — Watchlists

**Einordnung:** Q5 (noch nicht gebaut) ist der Weg, wie Nutzer VitalWissen-Kernobjekte "abonnieren" und Updates bekommen — ohne Google Alerts, ohne eigene KI. Retention-Hebel und persönlicher Kontextanker. Phase C.

### Q9 — BYO-AI-Kontext-Layer

**Einordnung:** Q9 ist der Kanal, durch den Nutzer ihre VitalWissen-Daten (Klasse 1–2, explizit opt-in für Klasse 3) in externe KI-Tools bringen. Nicht VitalWissen als KI-Frontend, sondern VitalWissen als Kontextlieferant. Phase D/E — Architekturprinzip aus P7D §7 bleibt unverändert.

---

## 11. NÄCHSTE EMPFOHLENE OPERATIVE SCHRITTE

Diese Schritte sind Empfehlungen, keine Freigaben. Reihenfolge nicht bindend.

| Priorität | Schritt | Chat-Typ | Voraussetzung |
|-----------|---------|----------|----------------|
| 1 (sofort) | S3 SQL Apply freigeben | Eigenständiger Chat, explizite Freigabe | Sebastian gibt GO |
| 2 | S3 Curation-Queue starten (5 Dossiers × 4 K6-Einträge) | Eigenständiger Chat | SQL Apply abgeschlossen |
| 3 | B4-BUILD-03 (weitere Laborwerte mit Actions-Map) | Eigenständiger Chat | B4-SAFETY-PATCH ✅ abgeschlossen |
| 4 | Q2-BUILD-02c-P2B (weitere Supplement-Quellen) | Eigenständiger Chat | — |
| 5 | Schema.org-Markup auf Detailseiten | Eigenständiger Spec-Chat | Architekturprinzip → Spec → Build |
| Spät | KI-Prompt-Export Spec | Eigenständiger Chat | S9-Architektur klar |
| Phase D | S9 Health Data Hub | Eigener Spec-Sprint | Phase C vollständig |

---

## 12. OFFENE RISIKEN

| ID | Risiko | Wahrscheinlichkeit | Konsequenz | Mitigationsstrategie |
|----|--------|---------------------|------------|---------------------|
| R1 | Google Gemini integriert direkt Gesundheitsdaten-Aggregatoren — VitalWissen wird als Quelle irrelevant | Mittel (2–3 Jahre) | Distributionsverlust bei Klasse-1-Inhalten | Differenzierung auf Klasse 3–5 (persönlicher Kontext) schärfen; Q2 Trust-Layer als Alleinstellungsmerkmal ausbauen |
| R2 | Nutzer geben Arztbrief-Daten in externe KI (ChatGPT, Gemini) statt in S4 | Hoch (bereits heute) | S4-Differenzierungsvorteil gefährdet | Zero-Retention-Vorteil proaktiv kommunizieren; S4-Trust-Frame stärken |
| R3 | Gemini-API-Integration öffnet Datentransfer-Risiko (falls falsch implementiert) | Niedrig aktuell | DSGVO-Verstoß bei Gesundheitsdaten | ZDR/DPA-Pflicht vor jedem externen API-Key |
| R4 | AI-Crawler verändert Content-Qualität (Halluzination über VitalWissen) | Mittel | Falschinformation im Namen von VitalWissen | Schema.org-Markup + präzise robots.txt (nur Indexierung, kein Scraping) |
| R5 | Q9 BYO-AI als KI-Frontend missverstanden (interne Scope-Drift) | Niedrig | Build-Aufwand für Feature, das nicht Kernprodukt ist | Dieses Freeze-Dokument als Referenz bei Scope-Fragen |

---

## 13. OPS CLOSURE

### Inhaltlich

Dieses Dokument friert die KI-/Google-Integrationsstrategie für VitalWissen verbindlich ein. Google/Gemini ist als Benchmark, Kanal und potenzielle Integrationsschicht eingeordnet — nicht als Feind und nicht als Kernbesitz. VitalWissens defensibler Kern liegt in Quellenverankerung (Q2), Vernetzung (B2/B3/B4) und persönlichem Kontext unter Nutzerhoheit (Modus 3, Phase D). Alle 10 Akzeptanzkriterien sind erfüllt.

**Akzeptanzkriterien-Check:**

| # | Kriterium | Erfüllt |
|---|-----------|---------|
| 1 | Google nicht als Feindbild, sondern als Werkzeug/Kanal/Benchmark | ✅ §3 |
| 2 | VitalWissens defensibler Kern klar | ✅ §1, §2 |
| 3 | Persönlicher Kontext als eigener Asset geschützt | ✅ §4 Modus 3, §6 Klassen 3–5 |
| 4 | Kurzantworten nicht zu Therapieempfehlungen | ✅ §4 Modus 1, §9 No-Gos |
| 5 | Externe KI-Grenzen klar | ✅ §6 Datenklassifikation |
| 6 | Q2/Q4/Q5/Q9 sauber eingeordnet | ✅ §10 |
| 7 | Freeze enthält keine operative Build-Freigabe | ✅ §13 |

### Technisch angewendet

| Pflichtangabe | Status |
|---------------|--------|
| Neue Datei | `01_PROJECT_SOURCES_CURRENT/AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md` ✅ erstellt |
| Lokaler Speicherstatus | Im Workspace gespeichert ✅ |
| Git-Status | Kein Commit |
| DB-Writes | NEIN |
| Deploy | NEIN |
| Offener Side Effect | NEIN |
| S4/S3/S6/S18-Touch | NEIN |
| Schema/DB-Write | NEIN |

### Operativ abgesichert

- Nächster freigegebener Build-Schritt: S3 SQL Apply (Freigabe Sebastian) → unabhängig von diesem Freeze
- Dieses Dokument ist **kein Build-Auftrag** und enthält **keine operative Freigabe**
- Doppelpflege: CLAUDE.md + VW_03_STATUS.md + AUDIT_CANON_CURRENT.md + ACTIVE_STRANDS_CURRENT.md folgen in diesem Paket

---

*Erstellt: 13.05.2026 — AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE abgeschlossen.*
*Führend für KI-/Google-Integrationsstrategie ab diesem Datum.*
*Basisreferenz: P7D_ARCHITECTURE_RESET_FREEZE.md (18.04.2026) — unveränderter Nordstern.*
