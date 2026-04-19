# P7_03A — S4 Arztbrief-Decoder · Anonymisierungs-Boundary-Spec

**Paketname:** P7-03a — Anonymization Boundary & Unlock Spec  
**Datum:** 18.04.2026  
**Status:** Read-only Spezifikationsdokument. Kein Code. Kein DB-Write. Kein Commit. Kein Push. Kein Deploy.  
**Zweck:** Präzise Festlegung der Anonymisierungsgrenze für S4; Entscheidungsgrundlage ob und unter welchen Bedingungen P7-04 gebaut werden darf.  
**Führende Quellengrundlage:** P7D_ARCHITECTURE_RESET_FREEZE.md (Strategie/Phasenlogik), CLAUDE.md (P7-Unterstatus), VW_04_ENTSCHEIDUNGEN.md (E07/E08), P7_01_S4_ARCHITECTURE_SPEC.md (technische Blocker), VW_05_SAEULEN.md (S4-Zielbild), VW_06_WEBSITE.md (UX-Logik)

---

## A — IST-ZUSTAND

### A.1 — Aktueller S4-Unterstatus

| Paket | Status | Ergebnis |
|-------|--------|---------|
| P7-01 | ✅ Abgeschlossen (16.04.2026) | Architektur- und Sicherheits-Spec inkl. P7-01a-Patch. Blocker B1–B5 identifiziert und dokumentiert. Quelle: `P7_01_S4_ARCHITECTURE_SPEC.md` |
| P7-02 | ✅ Abgeschlossen (16.04.2026) | Lokale S4-Minimal-Arbeitsfläche `/arztbrief` live: Text-Paste + PDF-Text-Layer-Extraktion (pdfjs-dist). Kein OCR, kein LLM, kein externer Rohdatenabfluss. Commit `0a3961d`. |
| P7-02b | ✅ Abgeschlossen (17.04.2026) | Client-seitige OCR via Tesseract.js (Scan-PDF + PNG/JPG/JPEG), vollständig same-origin. Commits `ac3f40c` + `1f1e4a3` + `dfb6676`. SC-1 + SC-2 live bestanden. |
| P7-02c | ✅ Abgeschlossen (17.04.2026) | Scan-PDF-OCR Completion-Fix: renderCanvas+Whitefill→ImageBitmap→ocrCanvas. Commit `f757630`. Bundle `index-BLz1WreD.js`. |
| P7-03 | 🔒 Blockiert | Anonymisierungs-Ort offen. Eigener Worker nicht freigegeben (Blocker B2 aus P7_01). |
| P7-04 | 🔒 Blockiert | Zero Retention nicht dokumentiert, kein Backend-Proxy (Blocker B1 + B3 aus P7_01). |
| P7-05 | 🔒 Blockiert | S4-UX in VW_06 nicht verifiziert (Blocker B4 aus P7_01). |

### A.2 — Harte Entscheidungen / Constraints

**E07 — Client-side-Verarbeitung [SICHER FESTGELEGT, VW_04]**

Client-side-Verarbeitung ist Pflichtprinzip dort, wo besonders sensible Daten entstehen — ausdrücklich S4. Ein eigener DE/EU-Server oder Worker, der Rohtext eines Arztbriefs empfängt, ist **eine Abweichung von E07** und braucht eine explizite, dokumentierte Architektur-/Datenschutzentscheidung. E07 ist keine Kann-Empfehlung, sondern sicher festgelegte Entscheidung.

**E08 — Zero Retention [SICHER FESTGELEGT, VW_04]**

Kein Rohtext eines Arztbriefs darf bei einem externen Dienst gespeichert werden — weder dauerhaft noch temporär als Logging-Seiteneffekt. Zero Retention muss vertraglich/technisch nachgewiesen sein, bevor ein externer LLM-Call erfolgt. Diese Bedingung ist für P7-04 noch nicht erfüllt (Blocker B1).

**S4-Zielbild aus VW_05_SAEULEN.md (direkt zitiert):**

- Input: PDF / Foto / Text
- Output: Parallelansicht oder Fließtext, Inline-Erklärungen, Zusammenfassung, Rückfragen nach Dekodierung, Links zu ICD (S5), Laborwerten (S1), Medikamenten (S6)
- DSGVO: Anonymisierung vor API-Call; keine Speicherung als Standard; Zero Retention
- Tech-Kandidaten: Tesseract, Google Vision API, spaCy + german-medbert, Claude API
- Vernetzung: S1, S5, S6, S8, S11; S9 optional Phase 2

**Relevante UX-/Website-Logik aus VW_06_WEBSITE.md:**

- S4 ist in den Einstiegspfaden der Universalsuche **nicht explizit** als Zieltyp definiert
- Die `/arztbrief`-Seite ist **Arbeitshypothese** für P7-02, keine durch VW_06 verifizierte Website-Entscheidung
- Einstiegspfad, Route und strukturelle Einbindung in die Startseiten-Navigation bleiben unter Blocker B4 offen
- S4-UX (Parallelansicht, Inline-Erklärungen, Rückfragen, Cross-Links) ist Gegenstand von P7-05, das VW_06 vorausetzt

### A.3 — Blocker-Tabelle (präzise)

| # | Blocker | Quelle | Warum blockierend | Was genau ungeklärt ist |
|---|---------|--------|-------------------|------------------------|
| B2 | Anonymisierungs-Ausführungsort offen | P7_01 Abschnitt 9, E07 | E07 priorisiert Client-side. Ein Worker außerhalb des Browsers lässt Rohtext das Gerät verlassen — das ist eine E07-Abweichung, keine automatisch erlaubte Alternative. | Ist eine rein client-seitige Anonymisierung (WASM, Regex, Regel-Engine) für medizinische Arztbriefe ausreichend präzise? Oder braucht es einen Worker — und wenn ja, unter welchen explizit genehmigten Bedingungen? |
| B1 | Zero-Retention-Zusicherung für LLM-Anbieter nicht dokumentiert | P7_01 Abschnitt 9, E08 | Ohne dokumentierte ZDR-Garantie (Zero Data Retention) darf kein Text an externe LLM-API gesendet werden. Claude API und GPT-4 API sind Kandidaten, aber der gewählte Vertrag muss ZDR ausdrücklich zusichern. | Welcher Anbieter mit welchem Vertrags-/Produkttyp sichert ZDR zu? Diese Entscheidung liegt außerhalb der Sandbox (Browser-Recherche / Vertragsarbeit nötig). |
| B3 | Kein Backend-Proxy für API-Key-Schutz | P7_01 Abschnitt 9 | Ein API-Key darf nicht im Browser-Bundle liegen. Für einen LLM-Call braucht es eine serverseitige Proxy-Fläche (z. B. Netlify Functions), die nur anonymisierten Text weiterleitet. | Netlify Functions vs. anderer EU-Edge-Dienst — Entscheidung nicht gefallen. Proxy-Fläche noch nicht gebaut. |
| B4 | S4-UX nicht in VW_06 spezifiziert | VW_06_WEBSITE.md, P7_01 Abschnitt 9 | P7-05 (sichere Ausgabe/UX) setzt eine durch VW_06 abgestützte UX-Entscheidung voraus: Einstiegspfad, Route, Seitenstruktur, Cross-Link-Logik nach S1/S5/S6. | Wie wird S4 in die Website-Navigation eingebunden? Eigene Route unter `/arztbrief`, Suche-Einstiegspfad, Modal? Kein Beschluss vorhanden. |
| B5 (bereits aufgelöst für OCR) | Cloud-OCR (Google Vision API) kollidiert mit E07+E08 | P7_01 Abschnitt 6, 8, 9, VW_04 E07/E08 | Rohinhalt verlässt den Client vor Anonymisierung (E07-Verstoß) + Retention-Risiko beim Cloud-Dienst (E08-Verstoß). | Kein offener Klärungsbedarf mehr: Cloud-OCR ist kein freigegebener Pfad. Tesseract.js (WASM, client-seitig) ist der einzige E07/E08-konforme OCR-Weg und wurde in P7-02b + P7-02c live umgesetzt. B5 gilt als für OCR abgeschlossen — für LLM-Anonymisierungs-Worker analog anwendbar. |

---

## B — OPTIONENRAUM

Drei Architekturpfade für P7-03 (Anonymisierung):

---

### Option A — Vollständige lokale Anonymisierung im Browser-Hauptthread

**Beschreibung:** Anonymisierung läuft synchron im JS-Hauptthread des Browsers — kein Worker, kein Server. Technisch: Regex-Muster + Regelwerk + optional leichtes WASM-Modell (z. B. komprimiertes Ner-Modell < 10 MB).

| Kriterium | Bewertung |
|-----------|-----------|
| E07-Kompatibilität | ✅ Vollständig. Keine Daten verlassen den Client. Entspricht dem E07-Primat ohne jede Einschränkung. |
| E08-Kompatibilität | ✅ Vollständig. Kein externer Dienst erhält Daten — keine Retention möglich. |
| Datenschutz-/Leak-Risiko | Minimal. Angriffsfläche beschränkt sich auf den Browser des Nutzers selbst. Kein Netzwerk-Hop. |
| Umsetzungsaufwand | Mittel. Regex-Engine + Regelwerk für DE-medizinischen Text ist in 1–2 Wochen baubar. Vollständige WASM-NLP-Modelle (german-medbert) sind zu groß (400–800 MB, inakzeptabel für Web-Bundle). Leichte Regel-Engines (Wink-NLP DE, custom Regex) sind realistisch. |
| Folgeeffekt auf P7-04 | ✅ Freigabefähig. Nach erfolgreichem P7-03 (Option A) kann P7-04 mit anonymisiertem Text starten — kein E07-Problem. |
| Folgeeffekt auf P7-05 | ✅ Freigabefähig (nach P7-04). Kein zusätzliches Hindernis durch Option A. |
| No-Go / Stop-Bedingungen | Stop wenn: (1) Anonymisierungsqualität nach Test-Audit < Mindestschwelle (zu viele nicht erkannte PII-Stellen im Testkorpus) und kein Upgrade möglich ohne Worker. Dann → Wechsel auf Option B. |

**Kernrisiko Option A:** UI-Blockierung bei langen Dokumenten (> 5–10 Seiten). Synchrone Verarbeitung im Hauptthread friert die Oberfläche ein. Bei kurzen Standard-Arztbriefen (1–3 Seiten) akzeptabel; bei langen Entlassbriefen problematisch.

---

### Option B — Vollständige lokale Anonymisierung in dediziertem Web Worker

**Beschreibung:** Anonymisierung läuft in einem JavaScript Web Worker — client-seitig, aber in einem separaten Thread. Kein Netzwerkaufruf. Technisch: gleiche Regex/Regelwerk-Engine wie Option A, aber non-blocking. Tesseract.js in P7-02b/02c wurde bereits genau so umgesetzt (WASM in Worker).

| Kriterium | Bewertung |
|-----------|-----------|
| E07-Kompatibilität | ✅ Vollständig. Ein Web Worker ist kein eigener Server — er läuft im selben Browser-Prozess, mit identischer Same-Origin-Policy. Kein Netzwerk-Hop. Keine Abweichung von E07. |
| E08-Kompatibilität | ✅ Vollständig. Kein externer Dienst erhält Rohdaten. Zero Retention trivial gewährleistet. |
| Datenschutz-/Leak-Risiko | Minimal. Identisch mit Option A — kein Netzwerk involviert. Etwas komplexere Angriffsfläche durch Worker-Kommunikation, aber ohne Praxisrelevanz für dieses Szenario. |
| Umsetzungsaufwand | Mittel bis hoch. Worker-Setup in Vite/React ist bekannte Technik (Tesseract.js in P7-02b wurde genau so gebaut — identisches Muster wiederverwendbar). Regelwerk/Regex-Engine gleich wie Option A. Mehraufwand gegenüber A: Worker-Kommunikation, Fortschrittsanzeige. Realistisch: 1–3 Wochen. |
| Folgeeffekt auf P7-04 | ✅ Freigabefähig. Anonymisierter Text verlässt den Worker-Thread und wird über Proxy an LLM gesendet — E07 gewahrt. |
| Folgeeffekt auf P7-05 | ✅ Freigabefähig (nach P7-04). Kein zusätzliches Hindernis durch Option B. |
| No-Go / Stop-Bedingungen | Stop wenn: (1) Anonymisierungsqualität nach Test-Audit < Mindestschwelle und kein Upgrade möglich ohne Serverarchitektur. Dann → Option C nur mit expliziter E07-Ausnahme-Entscheidung durch Sebastian. (2) Worker-Architektur in Vite-Netlify-Build nicht deploybar (unwahrscheinlich — Tesseract.js läuft bereits so). |

---

### Option C — Teilweiser Backend-/Proxy-Pfad (eigener DE/EU-Worker/Server)

**Beschreibung:** Rohtext des Arztbriefs wird an einen eigenen DE/EU-Server (z. B. Netlify Edge Function, eigener Docker-Container auf deutschen Servern) gesendet, dort anonymisiert (z. B. mit vollwertigem spaCy + german-medbert), und nur der anonymisierte Text wird ans LLM weitergeleitet. Rohtext verlässt den Browser.

| Kriterium | Bewertung |
|-----------|-----------|
| E07-Kompatibilität | ❌ Abweichung. E07 priorisiert ausdrücklich Client-side-Verarbeitung. Rohtext verlässt das Gerät vor Anonymisierung. Ein eigener DE/EU-Server ist **kein automatisch erlaubter Ersatz** für Client-side — er ist eine explizit zu genehmigende Ausnahme. Wortlaut P7_01: „Ein eigener DE/EU-Worker ist nicht automatisch erlaubt und braucht eine explizite Architektur-/Datenschutzentscheidung." |
| E08-Kompatibilität | ⚠️ Bedingt. E08 fordert Zero Retention. Ein eigener Server könnte Zero Retention garantieren, aber das muss nachgewiesen werden (kein Logging, sofortige Löschung). Der eigene Server kann die LLM-ZDR-Bedingung nicht ersetzen — P7-04 bleibt trotzdem an B1 gebunden. |
| Datenschutz-/Leak-Risiko | Hoch. Jeder Netzwerk-Hop mit Rohtext ist ein potenzieller Leak-Pfad: Logging auf dem Server, TLS-Interception, Serverabsturz mit Disk-Persistenz, Konfigurationsfehler. Höheres Restrisiko als Option A/B auch bei technisch korrekter Implementierung. |
| Umsetzungsaufwand | Hoch. Server-Infrastruktur (Container, DE/EU-Hosting, Deployment-Pipeline, Zero-Retention-Konfiguration, Monitoring, Incident Response). Signifikant größerer Aufwand als A/B. Abhängig von Sebastian: Serverinfrastruktur-Entscheidung und laufende Betriebskosten. |
| Folgeeffekt auf P7-04 | Nur nach expliziter E07-Ausnahme-Entscheidung. LLM-Proxy wird zusätzlich nötig (B3 bleibt). Doppelter Server-Pfad: Anonymisierungs-Server + LLM-Proxy. |
| Folgeeffekt auf P7-05 | Keine zusätzlichen Blocker durch Option C selbst, aber höhere Gesamt-Architekturkomplexität erhöht Risiko für P7-05. |
| No-Go / Stop-Bedingungen | Stop-Bedingung 1: E07-Ausnahme nicht explizit durch Sebastian genehmigt → vollständiger Stop von Option C. Stop-Bedingung 2: Server kann Zero Retention nicht nachweisbar garantieren → E08-Verletzung, vollständiger Stop. Stop-Bedingung 3: Keine Ressourcen (Serverinfrastruktur, laufende Betriebskosten) → praktischer Stop. |

---

## C — ENTSCHEIDUNGSVORSCHLAG

**Empfohlener Pfad: Option B — vollständige lokale Anonymisierung in dediziertem Web Worker.**

**Begründung:**

Option B ist die einzige Option, die E07 und E08 vollständig erfüllt, ohne eine explizite Ausnahme-Entscheidung zu brauchen, und gleichzeitig eine produktionsfähige UX liefert (kein UI-Freeze wie Option A bei längeren Dokumenten).

Das Umsetzungsmuster ist bereits im Projekt etabliert: Tesseract.js in P7-02b und P7-02c läuft identisch als WASM-Worker in der Vite/React-Architektur. Die Worker-Infrastruktur kann direkt wiederverwendet werden. Kein neues Architekturmuster nötig.

Option A ist als Fallback vertretbar für kurze Dokumente (< 3 Seiten), ist aber ohne Worker-Absicherung bei langen Entlassbriefen UX-kritisch. Option A kann als initiale Test-Implementierung gebaut und später durch Option B ersetzt werden, wenn UI-Freeze sich als Problem erweist.

Option C ist mit E07 nicht vereinbar ohne explizite Ausnahme-Entscheidung. Diese Ausnahme-Entscheidung liegt nicht in diesem Paket. Option C wird daher für P7-03 **nicht empfohlen**.

**Anonymisierungstechnik für Option B:**

Keine vollwertigen ML-Modelle (german-medbert: 400–800 MB, inakzeptabel für Web-Bundle). Stattdessen: **Hybrid-Regelwerk** im Worker:

1. Strukturierte Regex-Muster für vorhersehbare PII-Positionen (Datumsformate, Anredekonventionen, Fallnummern-Schemata, IBAN/Versicherungsnummern)
2. Kontextbasierte Mustererkennung für Namensfelder (Anrede + Wort-n-Gram-Kombination)
3. Wortlisten-Blacklist für häufige Einrichtungsnamen, Arztpraxis-Signalwörter
4. Konsistenz-Token-Mapping (gleiche Entität → gleicher Platzhalter im selben Dokument)

Diese Technik erreicht für strukturierte medizinische Dokumente nach Erfahrungswerten 80–90 % der kritischen PII-Stellen. Die verbleibenden 10–20 % (freie Personenreferenzen in Fließtext) sind durch Nutzerhinweis (explizite Warnung) und Post-Anonymisierungs-Review-Logik in P7-05 zu adressieren.

**Klarstellung: Stop-Bedingung für diese Empfehlung:**

Wenn Test-Audit nach P7-03-Build zeigt, dass die Anonymisierungsqualität (unerkannte kritische PII im Testkorpus) die im Anonymisierungsvertrag (Abschnitt D) definierten Mindestanforderungen unterschreitet, und kein vertretbares Upgrade innerhalb der Client-Architektur möglich ist, bleibt P7-04 blockiert. In diesem Fall ist eine neue Entscheidungsvorlage nötig — kein stilles Weiterentwickeln.

---

## D — ANONYMISIERUNGSVERTRAG

Dieser Vertrag ist verbindlich für alle P7-03-Implementierungen. Er definiert, was vor einem externen Call entfernt, ersetzt oder gehalten werden darf.

### D.1 — Rohdatenarten, die vor externer Verarbeitung entfernt/ersetzt werden MÜSSEN

| Kategorie | Konkrete Ausprägungen | Behandlung |
|-----------|----------------------|------------|
| **Name** | Vorname, Nachname, akademischer Titel kombiniert mit Name, Spitzname, Geburtsname | Entfernen + Platzhalter `[NAME]` |
| **Adresse** | Straße, Hausnummer, PLZ, Ort, Landkreis, vollständige Wohnanschrift | Entfernen + Platzhalter `[ADRESSE]` |
| **Geburtsdatum** | Vollständiges Datum (TT.MM.JJJJ), Partialangaben wenn mit Person verbunden | Entfernen + Platzhalter `[GEBURTSDATUM]`. Altersangaben in Jahren ohne Kontext (z. B. „67-jährige Patientin") können erhalten bleiben, da kein direkter Personenbezug ohne Name. |
| **Kontaktdaten** | Telefonnummer, Mobilnummer, E-Mail-Adresse, Fax | Entfernen + Platzhalter `[KONTAKT]` |
| **Versicherungs- / Fallnummern** | Krankenversicherungsnummer, Versicherungs-ID, Patientennummer, Fallnummer, Einweisungsnummer | Entfernen + Platzhalter `[FALLNUMMER]` |
| **Behandler- / Einrichtungsdaten** | Name des Arztes, Arztpraxis-Name, Klinikname, Abteilungsname (wenn personenidentifizierend), Arztnummer, Betriebsstättennummer | Entfernen + Platzhalter `[BEHANDLER]` bzw. `[EINRICHTUNG]`. Fachrichtungen ohne Namen (z. B. „Kardiologie") können erhalten bleiben. |
| **Freie Personenreferenzen** | Im Fließtext genannte Dritte (Angehörige, Pflegepersonal, andere Ärzte), wenn namentlich erwähnt | Entfernen + Platzhalter `[PERSON]` |
| **Sonstige identifizierende Marker** | IBAN, BIC (in Rechnungsdokumenten), Rentenversicherungsnummer, Steuer-ID, Kfz-Kennzeichen (falls in Unfallbericht), IP-Adressen in technischen Anhängen | Entfernen + spezifischer Platzhalter `[ID]` |

### D.2 — Daten, die nach Anonymisierung zulässig sind

Nach vollständiger Anonymisierung darf folgendes external gesendet werden:

| Datentyp | Bedingung |
|----------|-----------|
| Diagnose-Codes (ICD-10) | Immer zulässig — keine direkte Personenidentifikation |
| Medizinische Fachbegriffe (Symptome, Befunde, Therapien) | Zulässig — Kerninhalt für Dekodierung |
| Laborwerte ohne Patientenkontext | Zulässig (Wert, Einheit, Referenzbereich) |
| Medikamentennamen und Dosierungen | Zulässig |
| Fachrichtungen, medizinische Institutionstypen (ohne Namen) | Zulässig |
| Altersangaben in Jahren (ohne Name/Datum-Verbindung) | Zulässig |
| Datumsangaben medizinischer Ereignisse (ohne Geburtsdatum) | Zulässig, wenn nicht personenidentifizierend |
| Platzhalter-Token (z. B. `[NAME]`, `[ADRESSE]`) | Zulässig — der LLM-Kontext zeigt nur Token, keine Rohdaten |

### D.3 — Daten, die niemals den Browser roh verlassen dürfen

Absolute Grenze — kein Pfad, keine Ausnahme:

- Vollständiger Rohtext eines Arztbriefs vor abgeschlossener Anonymisierung
- Jede identifizierende Kombination (Name + Datum, Name + Diagnose, Name + Adresse)
- Bild-Rohdaten von Scan-PDFs oder Fotos (Tesseract.js verarbeitet lokal, kein Bild-Upload an externe Dienste)
- Authentifizierungsmerkmale (Krankenversicherungsnummer, Patientennummer)

### D.4 — Redaktionsformat

**Platzhalterlogik:**

- Format: `[KATEGORIE]` in Großbuchstaben, immer in eckigen Klammern
- Kategorien: `[NAME]`, `[ADRESSE]`, `[GEBURTSDATUM]`, `[KONTAKT]`, `[FALLNUMMER]`, `[BEHANDLER]`, `[EINRICHTUNG]`, `[PERSON]`, `[ID]`
- Keine Originalzahl/Länge erhalten (kein `[NAME_7]` o. ä.) — Längenangaben könnten Inferenz ermöglichen

**Stabilität / Konsistenz gleicher Entitäten:**

- Tritt dieselbe Entität mehrfach im Dokument auf, erhält sie konsistent denselben Platzhalter-Typ, aber **keine Nummerierung** im ersten MVP (kein `[NAME_1]` vs. `[NAME_2]`). Begründung: Nummerierung könnte Entitätsstruktur offenbaren, die für Re-Identifikation ausreicht. Spätere Erweiterung möglich, aber nur nach expliziter Prüfung.
- Ausnahme: mehrere unterschiedliche Personen im selben Dokument können mit inkrementellem Index versehen werden (`[BEHANDLER_A]`, `[BEHANDLER_B]`), wenn der LLM-Kontext das für die Dekodierung braucht — diese Entscheidung gehört in P7-05.

**Was für Links / Mapping erhalten bleiben darf:**

- ICD-10-Codes → dürfen für Cross-Linking zu S5 erhalten und genutzt werden
- Laborwert-LOINC-Codes → dürfen für Cross-Linking zu S1 erhalten bleiben
- Medikamentennamen → dürfen für Cross-Linking zu S6 erhalten bleiben
- Alle Platzhalter → dürfen für die Ausgabe-Parallelansicht erhalten und dem Nutzer angezeigt werden

**Was nicht erhalten bleiben darf:**

- Interne Entitäts-Mapping-Tabelle (Name → Platzhalter) darf nicht extern gesendet werden — nur der anonymisierte Text
- Rohdaten nach Abschluss der Verarbeitung nicht im Browser-Storage persistieren (sessionStorage, localStorage) — nur im Memory während der aktiven Session

---

## E — FLOW-MATRIX PRO INPUT-TYP

### Reiner Text (Freitext-Paste)

| Stufe | Detail |
|-------|--------|
| Ingest | Textarea-Eingabe. Vollständig client-seitig. Seit P7-02 live. |
| OCR | Nein — kein OCR nötig. |
| Anonymisierungsschritt | Worker-Anonymisierung (Option B): Regex + Regelwerk-Engine im Web Worker. Input: Rohtext. Output: anonymisierter Text + Token-Liste. |
| Worker-Ort | Browser Web Worker (client-seitig, same-origin). Kein Netzwerkaufruf in diesem Schritt. |
| Externer Call erlaubt | Nein (vor Anonymisierung). Ja (nach vollständiger Anonymisierung, an LLM-Proxy). |
| Zulässiges Payload-Niveau | Nur anonymisierter Text mit Platzhaltern. Keine Rohdaten. |
| Rückgabeformat | LLM-Antwort (strukturiert): Glossar-Erklärungen, Zusammenfassung, erkannte ICD/LOINC/Medikamenten-Codes für Cross-Linking. |
| Rest-Risiko | Niedrig. Freie Personenreferenzen im Fließtext können vom Regelwerk nicht erkannt werden. Nutzerhinweis + Review-Mechanismus in P7-05 nötig. |
| Freigabestatus | 🟡 Freigabefähig nach P7-03-Build und Test-Audit. |

### Digitales PDF mit Textlayer

| Stufe | Detail |
|-------|--------|
| Ingest | Datei-Upload. PDF-Textextraktion via pdfjs-dist, vollständig client-seitig. Seit P7-02 live. |
| OCR | Nein — Textlayer direkt extrahierbar. |
| Anonymisierungsschritt | Identisch mit reinem Text nach Extraktion. Extrahierter Klartext → Worker-Anonymisierung. |
| Worker-Ort | Browser Web Worker (client-seitig). |
| Externer Call erlaubt | Nein (vor Anonymisierung). Ja (nach Anonymisierung, an LLM-Proxy). |
| Zulässiges Payload-Niveau | Nur anonymisierter Text. |
| Rückgabeformat | Wie reiner Text. |
| Rest-Risiko | Niedrig. Identisch mit reinem Text. Zusätzliches Restrisiko: eingebettete Metadaten im PDF (Dateiname, Author-Feld) werden nicht durch Textextraktion erfasst — diese Metadaten verlassen den Browser ohnehin nicht, aber der Nutzer sollte darauf hingewiesen werden. |
| Freigabestatus | 🟡 Freigabefähig nach P7-03-Build und Test-Audit. |

### Scan-PDF

| Stufe | Detail |
|-------|--------|
| Ingest | Datei-Upload. PDF wird seitenweise gerendert (renderCanvas + Whitefill → ImageBitmap → ocrCanvas). Seit P7-02c live. |
| OCR | Ja — Tesseract.js WASM im Worker (client-seitig). Ergebnis: extrahierter Klartext. Tesseract.js verlässt den Client nicht. |
| Anonymisierungsschritt | Nach OCR-Abschluss: Worker-Anonymisierung des OCR-Textes. Identisch mit reinem Text. |
| Worker-Ort | Browser Web Worker (OCR-Worker bereits existent aus P7-02c). Anonymisierungs-Schritt kann im selben oder einem zweiten Worker laufen. |
| Externer Call erlaubt | Nein (vor Anonymisierung). Ja (nach Anonymisierung, an LLM-Proxy). |
| Zulässiges Payload-Niveau | Nur anonymisierter OCR-Text. Keine Bild-Rohdaten. |
| Rückgabeformat | Wie reiner Text. Zusätzlich: OCR-Qualitäts-Warnung bei niedrigem Confidence-Wert — in Ausgabe sichtbar. |
| Rest-Risiko | Mittel. OCR-Qualität bei schlechten Scans niedrig → unvollständiger extrahierter Text. Unvollständiger Text erhöht Anonymisierungs-Fehlerquote (nicht erkannte PII in fragmentiertem Text). Nutzer-Warnung erforderlich. |
| Freigabestatus | 🟡 Freigabefähig nach P7-03-Build und Test-Audit. OCR-Qualitäts-Caveats müssen in P7-05-UX sichtbar sein. |

### Bilddatei (PNG / JPG / JPEG)

| Stufe | Detail |
|-------|--------|
| Ingest | Datei-Upload. Bild wird via createImageBitmap + Canvas verarbeitet. Seit P7-02b (fix: ocrImageFile) live. |
| OCR | Ja — Tesseract.js WASM im Worker (client-seitig). Identisch mit Scan-PDF-Pfad. |
| Anonymisierungsschritt | Nach OCR-Abschluss: Worker-Anonymisierung. Identisch mit Scan-PDF. |
| Worker-Ort | Browser Web Worker (client-seitig). |
| Externer Call erlaubt | Nein (vor Anonymisierung). Ja (nach Anonymisierung, an LLM-Proxy). |
| Zulässiges Payload-Niveau | Nur anonymisierter OCR-Text. Keine Bilddaten. |
| Rückgabeformat | Wie Scan-PDF. |
| Rest-Risiko | Mittel bis hoch. Foto-Qualität stark variabel (Beleuchtung, Winkel, Auflösung). OCR-Qualität entsprechend variabler. Handschrift → weiterhin explizit nicht unterstützt (MVP-Scope). Nutzer-Warnung bei Handschrift-Erkennung nötig. |
| Freigabestatus | 🟡 Freigabefähig nach P7-03-Build und Test-Audit. Handschrift-Warnung Pflicht. Foto-Qualitäts-Hinweis Pflicht. |

---

## F — UNLOCK-MAP

| Paket | Aktueller Status | Genaue Freigabebedingung | Was danach als nächstes zulässig ist |
|-------|-----------------|--------------------------|--------------------------------------|
| **P7-03** | 🔒 Blockiert (B2) | (1) Architekturentscheidung für Client-Worker-Variante (Option B) bestätigt — durch dieses Dokument geliefert. (2) P7-03-Build: Anonymisierungs-Worker implementiert, Regelwerk/Regex-Engine für DE-medizinischen Text gebaut. (3) Test-Audit: Testkorpus aus mindestens 5 anonymisierten Beispiel-Arztbriefen, Befund: alle Pflicht-PII-Kategorien (D.1) erkannt und ersetzt. (4) Kein Single Point of Failure: extrahierter Klartext darf in keinem Fall ohne vollständigen Anonymisierungsabschluss den Worker verlassen. | P7-04 wird freigabefähig (unter seinen eigenen Bedingungen). |
| **P7-04** | 🔒 Blockiert (B1 + B3) | (1) P7-03 vollständig abgeschlossen + Test-Audit bestanden. (2) Zero-Retention-Nachweis für gewählten LLM-Anbieter: schriftliche ZDR-Garantie (Claude API Zero Data Retention-Produktoption oder vergleichbar GPT-4). (3) Backend-Proxy gebaut: Netlify Function oder vergleichbarer EU-konformer Edge-Dienst, der nur anonymisierten Text weiterleitet und API-Key serverseitig hält. (4) Proxy sendet ausschließlich anonymisierten Text — technisch erzwungen, nicht nur policy-seitig. (5) Test: Request-Audit (kein Rohtext in Transit sichtbar). | P7-05 wird freigabefähig (unter seinen eigenen Bedingungen). |
| **P7-05** | 🔒 Blockiert (B4 + P7-04) | (1) P7-04 vollständig abgeschlossen. (2) Explizite UX-Entscheidung für S4 in VW_06 nachgezogen: Route, Einstiegspfad, Seitenstruktur, Navigation. (3) Ausgabe-UX spezifiziert: Parallelansicht Original/anonymisierter Text/Erklärung, Inline-Glossar-Logik, Zusammenfassungsblock, Rückfragen-Block, Cross-Link-Logik zu S1 (Laborwerte) / S5 (ICD-Codes) / S6 (Medikamente). (4) Nutzerhinweis-Texte für Anonymisierungs-Einschränkungen und OCR-Qualität in der UX sichtbar. | S4 als vollständiger MVP-Feature-Block live. Cross-Linking zu S1/S5/S6 nutzbar. |

---

## G — UX-/PRODUKTABGLEICH

### Was VW_06 zum Thema S4 hergibt

VW_06_WEBSITE.md (Stand März 2026, Nachtrag 16.04.2026) enthält:

- Universale Suchleiste auf Startseite mit Routing je Eingabetyp: Symptom → S5, Diagnose → S5, Laborwert → S1, Supplement → S2, Wirkstoff → S6, Nährstoff → S18, Gesundheitsclaim → S14. **S4 ist in dieser Liste nicht als expliziter Einstiegspfad geführt.**
- Der S4-Nachtrag vom 16.04.2026 hält fest: „Diese Seite [/arztbrief] ist keine finale S4-UX-Entscheidung. Einstiegspfade der Universalsuche auf der Startseite sind davon nicht berührt — eine strukturelle S4-Einbindung in die Website-UX ist weiterhin offen und Gegenstand eines späteren Pakets (P7-05)."

### Passt der geplante S4-Output zur aktuellen Produktlogik?

**Ja, inhaltlich.** S4 ist in P7D als K9 (Kernobjekt Dokument/Arztbrief, Verarbeitungsobjekt) und in B2 (Verstehen/Einordnen) als Teil des externen Produktbereichs klassifiziert. S4 fügt sich in die Produktlogik ein. Die Verbindungen zu S1/S5/S6 (Cross-Linking im Output) sind durch VW_06 strukturell vorgezeichnet (bidirektionale Cross-Blocks).

**Noch nicht: strukturell in Navigation.** Der Einstiegspfad für S4 fehlt. Die `/arztbrief`-Beta-Seite ist nicht über die Hauptnavigation erreichbar (nur als direkter URL-Aufruf oder Beta-Link). Das ist für P7-03/P7-04 nicht blockierend, aber für P7-05 muss es adressiert werden.

### Wo fehlen UX-Vorgaben?

| Fehlende Vorgabe | Relevanz für welches Paket |
|-----------------|---------------------------|
| S4-Einstiegspfad in Universalsuche (z. B. Eingabe „Arztbrief dekodieren" → wohin?) | P7-05 |
| S4-Seitenstruktur: Parallelansicht oder Fließtext als Default? Wie wechselbar? | P7-05 |
| Anonymisierungs-Qualitätsbanner in der UX: Wortlaut, Position, Verbindlichkeit | P7-03 (Nutzer-Hinweis) + P7-05 (vollständige UX) |
| Cross-Link-Trigger-Logik: Wann wird ein ICD-Code automatisch mit S5 verlinkt? Nach welchem Konfidenz-Schwellenwert? | P7-05 |
| Rückfragen-Mechanismus: Wie stellt der Nutzer Anschlussfragen nach Dekodierung? | P7-05 |
| Navigation: Bleibt `/arztbrief` als dedizierte Route oder wird S4 in Universalsuche integriert? | P7-05 |

**Hinweis gemäß Arbeitsauftrag:** Keine neue UX wird hier erfunden. Die Lücken sind explizit als Lücken markiert. Sie sind Gegenstand des P7-05-Pakets — nicht dieses Dokuments.

### Was für P7-05 noch unklar ist

P7-05 kann erst starten, wenn (a) P7-04 abgeschlossen ist und (b) die oben markierten UX-Vorgaben in einem eigenen Arbeitspaket nachgezogen wurden — entweder als Update zu VW_06 oder als separates P7-05-Spezifikationspaket.

---

## H — NO-GOS / STOP-REGELN

Eigener Abschnitt. Jede der folgenden Regeln ist absolute Grenze — keine Ausnahme ohne explizite Freigabe:

**H.1 — Kein Rohdatenabfluss**  
Rohtext eines Arztbriefs verlässt den Browser unter keinen Umständen, bevor die Anonymisierung vollständig und erfolgreich abgeschlossen ist. Kein Logging, kein Debug-Endpoint, kein Fehlerreporting-Dienst darf Rohtext erhalten. Verletzung dieser Regel = sofortiger Stop.

**H.2 — Kein stiller Cloud-OCR-Pfad**  
Cloud-OCR (Google Vision API oder vergleichbar) ist für S4 kein freigegebener Pfad — weder als Primärweg noch als Fallback. Jeder Pfad, der Bild-Rohdaten oder nicht-anonymisierten Text an einen externen Dienst sendet, um Text zu extrahieren, verstößt gegen E07 und E08 gleichzeitig. Einzige E07/E08-konforme OCR-Lösung: Tesseract.js WASM client-seitig (bereits live in P7-02b/02c).

**H.3 — Keine LLM-Dekodierung vor fixierter Anonymisierungsgrenze**  
P7-04 darf nicht gestartet werden, bevor P7-03 vollständig abgeschlossen und der Anonymisierungsvertrag (Abschnitt D) durch einen Test-Audit gegen einen repräsentativen Testkorpus validiert ist. Kein Kompromiss: nicht „weitgehend anonymisiert" oder „für die meisten Fälle ausreichend" — die Pflicht-PII-Kategorien (D.1) müssen nachweislich erkannt werden.

**H.4 — Keine implizite S9-Logik in Phase B**  
S4 in Phase B ist ein Zero-Retention-Verarbeitungsobjekt (K9). Kein Arztbrief oder Befund wird in dieser Phase in Supabase oder im Browser-Storage gespeichert. S9-Anbindung (persönlicher Gesundheitsraum) ist Phase D — kein Vorziehen, keine stille Vorbereitung.

**H.5 — Keine radiologische Bildinterpretation**  
S4 verarbeitet Arztbriefe, Befund-PDFs und Fotos davon — nicht MRT-, CT- oder Röntgenbilder zum Zweck der medizinischen Auswertung. Tesseract.js extrahiert Text aus Dokumenten; es interpretiert keine medizinischen Bildgebungsdaten. Diese Grenze gilt dauerhaft (P7D: „dauerhaftes No-Go bis fundamentale Klärung").

**H.6 — Keine stillen Nebeneffekte**  
Jede Änderung an bestehenden Dateien, jeder DB-Write, jeder Commit, jedes Push, jedes Deploy in Zusammenhang mit P7-03 wird explizit dokumentiert und ist nur nach ausdrücklicher Freigabe durch Sebastian zulässig. Dieses Dokument selbst ist eine neue Datei — kein bestehender Code, keine DB, kein Commit, kein Push.

**H.7 — Kein Worker-Variante ohne explizite Freigabe für Option C**  
„Dedizierter Worker" im Sinne von Option B (Browser Web Worker, client-seitig) ist freigegeben. „Dedizierter Worker" im Sinne von Option C (eigener Server, Rohtext verlässt Browser) ist nicht freigegeben ohne explizite Entscheidung durch Sebastian mit Ausnahme-Dokumentation. Diese Grenze besteht, solange E07 nicht explizit für diesen Pfad angepasst wurde.

**H.8 — Kein Anonymisierungs-Bypass bei Fehler**  
Wenn die Anonymisierungs-Engine einen Fehler wirft oder einen Schritt nicht abschließen kann, darf kein Fallback auf „unvollständig anonymisierten Text weiterleiten" greifen. Fehlerfall = sofortiger Stop mit Nutzer-Hinweis. Kein stilles Weiterentwickeln mit degradierter Anonymisierung.

---

## I — ABSCHLUSSURTEIL

> **P7-03 nur unter klar benannten Zusatzentscheidungen freigabefähig.**

**Begründung:**

Die technische Grundlage für P7-03 ist durch dieses Dokument gelegt. Die Architekturentscheidung (Option B — Browser Web Worker mit Hybrid-Regelwerk) ist getroffen und E07/E08-konform. Der Anonymisierungsvertrag (Abschnitt D) ist verbindlich formuliert.

P7-03 selbst ist **noch nicht freigegeben**, weil:

1. Der Worker-Build und das Regelwerk müssen erst gebaut werden (das ist das P7-03-Arbeitspaket, das auf dieser Spec basiert).
2. Ein Test-Audit gegen einen repräsentativen Testkorpus muss nach dem Build die Anonymisierungsqualität nachweisen.
3. Erst nach positivem Test-Audit gilt P7-03 als abgeschlossen.

P7-04 ist nach positivem P7-03-Abschluss **noch nicht automatisch freigegeben**, weil Blocker B1 (Zero-Retention-Nachweis für LLM-Anbieter) und B3 (Backend-Proxy) weiterhin bestehen und außerhalb der Sandbox zu klären sind.

**Für Sebastian direkt beantwortbar:**

> „Darf als nächstes P7-04 gebaut werden?"  
> **Nein — noch nicht.**

P7-04 darf erst gebaut werden, wenn alle drei Bedingungen erfüllt sind:

1. **P7-03 abgeschlossen:** Worker-Anonymisierungs-Build live + Test-Audit bestanden (alle Pflicht-PII-Kategorien aus D.1 erkannt)
2. **B1 gelöst:** Zero-Retention-Zusicherung für gewählten LLM-Anbieter schriftlich / vertraglich dokumentiert (z. B. Anthropic Claude API mit Zero Data Retention Policy oder OpenAI GPT-4 API mit vergleichbarer ZDR-Option)
3. **B3 gelöst:** Backend-Proxy (Netlify Function oder vergleichbar) gebaut, der API-Key server-seitig hält und ausschließlich anonymisierten Text weiterleitet

Wenn alle drei Bedingungen erfüllt sind: P7-04 ist freigabefähig unter den dann geltenden Bedingungen.

---

## J — OPS CLOSURE

### Inhaltlich

Dieses Dokument liefert vollständige Spezifikation aller 10 Pflichtabschnitte (A–J). IST-Zustand ist ohne Interpretation aus führenden Quellen abgeleitet und mit Quellenangaben versehen. Befund, Entscheidung und Hypothese sind strikt getrennt. Nicht direkt verifizierbares ist als solches markiert. Keine Strategiedrift in Richtung Discovery/S3/S18/S6. Das Abschlussurteil (Abschnitt I) beantwortet die Kernfrage eindeutig.

**Inhaltlich: abgeschlossen.**

### Technisch angewendet

- **Neue Datei erstellt:** `01_PROJECT_SOURCES_CURRENT/P7_03A_S4_ANONYMIZATION_BOUNDARY_SPEC.md` ✅
- **Keine bestehende Datei verändert** ✅
- **Kein Code angefasst** ✅
- **DB-Write:** keiner ✅
- **Commit:** keiner ✅
- **Push:** keiner ✅
- **Deploy:** keins ✅
- **Offener Side Effect:** keiner ✅

**Technisch angewendet: nur neue Datei, ja.**

### Operativ abgesichert

| Punkt | Status |
|-------|--------|
| Lokaler Speicherstatus | Datei im macOS-Mount `01_PROJECT_SOURCES_CURRENT/` — außerhalb der Session persistierend |
| git status | Nicht eingecheckt (Datei liegt im Arbeitsordner-Mount, außerhalb `00_REPO/vitalwissen_repo_current/`) |
| Commit-Status | Kein Commit |
| Push-Status | Kein Push |
| DB-Writes | Nein |
| Deploy | Nein |
| Offener Side Effect | Keiner |
| P7-04 danach freigegeben? | **Nein — noch nicht.** P7-04 ist erst freigegeben wenn: (1) P7-03 Build + Test-Audit abgeschlossen, (2) B1 Zero-Retention-Nachweis LLM-Anbieter dokumentiert, (3) B3 Backend-Proxy gebaut. |

**Nächster zulässiger Schritt:** P7-03 Build-Auftrag auf Basis dieser Spec formulieren und starten.  
**Nicht zulässig vor P7-03-Abschluss:** P7-04, P7-05, Cloud-OCR-Pfad, serverseitiger Anonymisierungs-Worker (Option C ohne E07-Ausnahme).

---

*Erstellt: 18.04.2026 — P7-03a Anonymization Boundary Spec abgeschlossen.*  
*Führend für: P7-03-Build-Planung, P7-04-Freigabebedingungen, P7-05-UX-Anforderungen.*
