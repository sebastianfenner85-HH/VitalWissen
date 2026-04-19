# P7-04a — S4 Arztbrief-Decoder · LLM- und Proxy-Freigabe-Spec

**Paketname:** P7-04a — LLM Provider & Proxy Release Spec  
**Datum:** 18.04.2026  
**Status:** Read-only Spezifikationsdokument. Kein Code. Kein DB-Write. Kein Commit. Kein Push. Kein Deploy.  
**Zweck:** Saubere Auflösung der zwei verbliebenen P7-04-Freigabeblocker B1 (ZDR-Nachweis) und B3 (Proxy-Architektur). Entscheidungsgrundlage für das P7-04-Build-Paket.  
**Führende Quellengrundlage:**  
- `P7_03A_S4_ANONYMIZATION_BOUNDARY_SPEC.md` — führend für P7-04-Freigabebedingungen  
- `P7_03B_S4_ANONYMIZATION_BUILD_CLOSURE.md` — führend für technischen Ist-Stand nach P7-03b  
- `P7D_ARCHITECTURE_RESET_FREEZE.md` — führend für Phasenlogik und No-Gos  
- `P7_01_S4_ARCHITECTURE_SPEC.md` — Blocker-Basis B1–B5  
- `VW_04_ENTSCHEIDUNGEN.md` — E06, E07, E08, E11  

---

## A — IST-ZUSTAND

### A.1 — Was nach P7-03b technisch bereits vorhanden ist

| Baustein | Status | Commit | Details |
|----------|--------|--------|---------|
| Eingabe-Oberfläche `/arztbrief` | ✅ Live | `0a3961d` | Text-Paste + PDF-Textlayer-Extraktion (pdfjs-dist), clientseitig |
| OCR Scan-PDF | ✅ Live | `f757630` | Tesseract.js WASM im Browser Web Worker, SC-1 + SC-2 bestanden |
| OCR Bild (PNG/JPG/JPEG) | ✅ Live | `dfb6676` | Tesseract.js WASM, createImageBitmap→Canvas-Fix, SC-3–SC-6 bestanden |
| Anonymisierungs-Worker | ✅ Live | `07576d0` | `src/workers/anonymizeWorker.js` — Browser Web Worker, 10 Blöcke, ~18 Regeln |
| Anonymisierungs-Integration | ✅ Live | `07576d0` | Alle 4 Eingabepfade anonymisiert vor Anzeige, Hard-Stop bei Fehler |
| Test-Audit Anonymisierung | ✅ PASS | `07576d0` | 8/8 Testfälle bestanden, kein PII-Leak |
| E07-Konformität | ✅ | — | Kein Netzwerkaufruf im Worker, vollständig client-seitig |
| E08-Konformität | ✅ | — | Kein externer Dienst erhält Daten in aktuellem Stand |
| **LLM-Dekodierung** | ❌ Nicht vorhanden | — | P7-04, noch geblockt |
| **Backend-Proxy** | ❌ Nicht vorhanden | — | P7-03, B3 offen |

**Was der anonymisierte Text bereits liefert (nach P7-03b):**  
Der Worker gibt `anonymizedText` (mit Platzhaltern `[NAME]`, `[ADRESSE]`, `[GEBURTSDATUM]`, `[KONTAKT]`, `[FALLNUMMER]`, `[BEHANDLER]`, `[EINRICHTUNG]`, `[PERSON]`, `[ID]`) zurück. Dieser Text ist das einzig zulässige Payload für einen späteren LLM-Call.

---

### A.2 — Welche Freigabeblocker für P7-04 laut P7-03a noch offen sind

Aus P7-03a, Abschnitt F (UNLOCK-MAP) und Abschnitt I (Abschlussurteil):

| Blocker | Quelle | Inhalt |
|---------|--------|--------|
| **B1 — ZDR-Nachweis** | P7-03a/I, P7-01/9 | Zero-Retention-Zusicherung für den gewählten LLM-Anbieter liegt nicht vor. Ohne dokumentierte ZDR-Garantie darf kein Text an eine externe LLM-API gesendet werden. Die Entscheidung liegt außerhalb der Sandbox (externe Vertragsarbeit / Anbieterbewertung). |
| **B3 — Kein Backend-Proxy** | P7-03a/F, P7-01/9 | API-Key darf nicht im Browser-Bundle liegen. Proxy-Fläche (Netlify Function oder vergleichbar) ist noch nicht gebaut. B3 ist technisch innerhalb von P7-04 lösbar — aber erst wenn B1 entschieden ist (kein Proxy für ungewissen Anbieter). |

**P7-03 (B2) gilt als vollständig aufgelöst durch P7-03b** (Worker live, 8/8 PASS). B2 ist nicht mehr offen.

---

### A.3 — Was innerhalb Cowork/Sandbox direkt prüfbar ist — und was nicht

| Gegenstand | Prüfbar in Cowork/Sandbox | Begründung |
|-----------|--------------------------|------------|
| Ist-Stand der Projektdateien (P7-03a, P7-03b, P7-01, P7D, VW_04) | ✅ Direkt geprüft in dieser Session | Alle Dateien gelesen |
| Anonymisierungs-Worker-Code (`anonymizeWorker.js`) | ✅ Prüfbar via git clone | Datei im Repo, Commit `07576d0` |
| Netlify Functions Verfügbarkeit im bestehenden Stack | ✅ Grundsätzlich prüfbar | Netlify-Account vorhanden; Functions-Unterstützung ist Netlify-Standard |
| Supabase Edge Functions Verfügbarkeit | ✅ Grundsätzlich prüfbar | Supabase-Projekt vorhanden |
| ZDR-Vertragsstatus Anthropic für Sebastians API-Key | ❌ **Nicht direkt prüfbar** | Erfordert Zugriff auf Anthropic-Dashboard oder Vertragsdokumente, kein Sandbox-Internetzugriff |
| ZDR-Vertragsstatus OpenAI für Sebastians API-Key | ❌ **Nicht direkt prüfbar** | Wie Anthropic: externer Kontozugriff erforderlich |
| ZDR-Vertragsstatus Mistral / Aleph Alpha | ❌ **Nicht direkt prüfbar** | Externe Anbietersites; kein Sandbox-Internetzugriff |
| Proxy-Build (Code) | ❌ **Nicht in diesem Paket** | Gemäß Scope: kein Code in P7-04a; Proxy wird in P7-04 gebaut |
| LLM-Qualitäts-Test für deutschen medizinischen Text | ❌ **Nicht in diesem Paket** | Erfordert LLM-Call, erst nach B1-Auflösung |

---

## B — PROVIDER-OPTIONEN

Mindestens 3 realistische LLM-Pfade für P7-04. Alle Angaben zum ZDR-Status basieren auf dem Wissensstand 18.04.2026. Wo direkte Verifikation nicht möglich war: explizit als „nicht direkt verifiziert" markiert.

---

### Option B-1 — Anthropic Claude API (mit ZDR-Option)

| Kriterium | Bewertung |
|-----------|-----------|
| **Anbieter / Produktpfad** | Anthropic Claude API (claude-sonnet-4-6 oder claude-haiku-4-5). Standard-API unter anthropic.com. E06 nennt Claude API als Kandidaten. |
| **ZDR-/Zero-Retention-Status** | **Nicht direkt verifiziert für Sebastians Account.** Nach Wissensstand 18.04.2026: Anthropic bietet für API-Kunden eine explizite Zero Data Retention Option an — Inputs und Outputs werden nicht gespeichert. Diese Option ist in bestimmten Vertragsstufen verfügbar. Standard-API-Keys haben nach Standardvertrag ein begrenztes Datenhaltungsfenster für Safety-Monitoring. Ob ZDR für Sebastians Account aktivierbar ist, hängt von seinem Vertragstyp ab und ist **nicht in der Sandbox prüfbar**. |
| **Nachweisform** | Anthropic Privacy Policy + API Data Handling Policy lesen (anthropic.com/privacy). ZDR-Option aktivieren (falls verfügbar im Account) oder Enterprise-Vertrag mit ZDR-Klausel abschließen. Schriftliche Bestätigung durch Account-Dashboard oder Vertragsbestätigung. |
| **API-Eignung für S4** | Hoch. Claude ist stark in deutschem medizinischem Text, Erklärungen und strukturiertem Output. Direkte Modell-Kompatibilität vorhanden (VitalWissen läuft bereits auf Claude-Infrastruktur). |
| **Risiko** | Standard-API ohne aktiviertes ZDR = E08-Verstoß. Risiko: versehentlich ohne ZDR-Aktivierung live gehen. Mitigierung: ZDR-Status muss vor API-Call technisch im Proxy erzwungen werden (kein Fallback auf Non-ZDR). |
| **Offene Punkte** | (1) Vertragstyp von Sebastians Account: Ist ZDR aktivierbar oder erfordert es ein Enterprise Upgrade? (2) Genauer Wortlaut der ZDR-Garantie (vollständige Nicht-Speicherung oder nur Nicht-Training)? Beide Punkte sind außerhalb der Sandbox zu klären. |
| **Freigabefähig** | **NEIN — noch nicht.** Erst freigabefähig wenn: ZDR-Option aktiviert und dokumentiert (Account-Dashboard Screenshot + Datumsstempel oder schriftliche Vertragsbestätigung). |

---

### Option B-2 — OpenAI GPT-4 API (mit ZDR-Option)

| Kriterium | Bewertung |
|-----------|-----------|
| **Anbieter / Produktpfad** | OpenAI API (gpt-4o oder gpt-4-turbo). Standard-API unter platform.openai.com. E06 nennt GPT-4 API als Kandidaten. |
| **ZDR-/Zero-Retention-Status** | **Nicht direkt verifiziert für Sebastians Account.** Nach Wissensstand 18.04.2026: OpenAI bietet für API-Kunden zwei relevante Optionen: (1) `"store": false` als API-Parameter — deaktiviert Input/Output-Speicherung für diesen Request. (2) Data Processing Addendum (DPA) — regelt, dass API-Daten nicht für Training verwendet werden (Standard für alle API-Nutzer). Vollständige ZDR (kein Safety-Monitoring-Logging) erfordert möglicherweise ein Enterprise Agreement. Der genaue Umfang von `"store": false` (vollständige Nichtspeicherung oder nur kein Training) ist **nicht direkt verifiziert** und muss in der OpenAI-Dokumentation geprüft werden. |
| **Nachweisform** | OpenAI API Data Usage Policy + DPA lesen (openai.com/policies). `"store": false` Parameter in API-Requests setzen. Dokumentieren, ob das vollständige ZDR oder nur No-Training bedeutet. Ggf. Enterprise-DPA abschließen. |
| **API-Eignung für S4** | Hoch. GPT-4-Modelle gut für deutschen medizinischen Text. Breite Nutzung, stabile API. Kein bestehender Account von Sebastian nachgewiesen (nicht direkt verifiziert). |
| **Risiko** | Gleiche Logik wie B-1: ZDR muss aktiviert und dokumentiert sein. Zusätzlich: OpenAI ist ein US-Unternehmen — E11 (DE/EU-Serverstandort) gilt für S9, nicht für S4, aber DSGVO-Konformität des API-Transfers muss geprüft werden (Standard-Clauses vorhanden, aber nicht direkt verifiziert). |
| **Offene Punkte** | (1) Bedeutet `"store": false` vollständige ZDR oder nur No-Training? (2) DSGVO-Transfer-Grundlage für US-Transfer dokumentieren (Standard Contractual Clauses o.ä.)? (3) Bestehender Account bei Sebastian? Beide Punkte außerhalb der Sandbox zu klären. |
| **Freigabefähig** | **NEIN — noch nicht.** Erst freigabefähig wenn: Umfang von `"store": false` oder DPA als vollständige ZDR verifiziert und dokumentiert + DSGVO-Transfer-Grundlage dokumentiert. |

---

### Option B-3 — EU-basierter Open-Source LLM-Dienst (Mistral API / Aleph Alpha)

| Kriterium | Bewertung |
|-----------|-----------|
| **Anbieter / Produktpfad** | Mistral AI (Frankreich): Mistral-large oder Mistral-medium API über mistral.ai. Alternativ: Aleph Alpha (Deutschland): Luminous-Modelle über Aleph Alpha API. EU-Hosting-Standort (beides EU-Unternehmen, aber genaue Serverstandorte der jeweiligen API-Infrastruktur nicht direkt verifiziert). |
| **ZDR-/Zero-Retention-Status** | **Nicht direkt verifiziert für beide Optionen.** Allgemeine Lage: EU-Anbieter haben oft strengere Datenschutz-Defaults als US-Anbieter, aber ZDR ist nicht automatisch gegeben. Mistral AI hat als französisches Unternehmen DSGVO-Compliance als Grundlage, aber spezifische ZDR-Vertragsklauseln für API-Nutzung: **nicht belegt**. Aleph Alpha ist explizit auf Sovereign AI / deutsches Hosting ausgerichtet und bietet spezifische Datenschutzverträge an, aber aktueller Produktstand und API-Konditionen: **nicht direkt verifiziert** (Wissensstand 18.04.2026). |
| **Nachweisform** | Wie B-1/B-2: Anbieter-Datenschutzseite + API-Vertrag lesen, ZDR-Klausel identifizieren und dokumentieren. |
| **API-Eignung für S4** | Mittel bis hoch für Mistral (gut für Deutsch, breite Sprachkompetenz). Für Aleph Alpha: trainiert auf deutschem Text, möglicherweise besser für DE-spezifische medizinische Sprache — aber qualitative Einschätzung für komplexen medizinischen Text nicht direkt verifiziert. |
| **Risiko** | Qualitäts-Unsicherheit für DE-medizinischen Text gegenüber Claude/GPT-4. Möglicherweise kleinere Entwickler-Ökosysteme, weniger aktive Dokumentation. Kein bestehender Account von Sebastian für diese Anbieter. Einarbeitungsaufwand höher. |
| **Offene Punkte** | (1) ZDR-Klausel im Anbietervertrag vorhanden? (2) Qualität für DE-medizinischen Text ausreichend? (3) API-Kosten und Verfügbarkeit? Alle drei Punkte außerhalb der Sandbox zu klären. |
| **Freigabefähig** | **NEIN — noch nicht.** Erst freigabefähig wenn: ZDR-Nachweis nach dem unter C definierten Standard vorliegend + Qualität für DE-medizinischen Text validiert. |

---

### Option B-4 — Lokales / Self-Hosted LLM (Ollama / LLaMA / Mistral lokal)

| Kriterium | Bewertung |
|-----------|-----------|
| **Anbieter / Produktpfad** | Lokales Deployment auf eigenem Server (z.B. Hetzner DE) via Ollama oder llama.cpp. Kein externer API-Anbieter. |
| **ZDR-/Zero-Retention-Status** | ✅ Trivial ZDR — kein externer Call, kein externes Logging möglich. E08 vollständig eingehalten bei korrekter Konfiguration (kein Disk-Logging auf dem Server). |
| **Nachweisform** | Technisch selbst nachweisbar: kein Netzwerkaufruf an externe Dienste, Server-Konfiguration ohne Logging-Schicht. |
| **API-Eignung für S4** | Niedrig bis mittel. Lokal lauffähige Modelle (7B–13B Parameter) sind qualitativ schwächer als Claude/GPT-4 für komplexen deutschen medizinischen Text. Halluzinationsrate höher. Modelle > 30B wären qualitativ vertretbar, erfordern aber High-End-Hardware (100+ GB VRAM oder Multi-GPU-Setup) — wirtschaftlich und operativ für Sebastian nicht sinnvoll. |
| **Risiko** | Hoher Betriebsaufwand: Server-Infrastruktur beschaffen, konfigurieren, warten. Laufende Kosten. Qualitäts-Risiko für medizinische Erklärungen (falsche/halluzinierte Erklärungen in Arztbrief-Dekodierung = erhebliches Vertrauensrisiko für VitalWissen). |
| **Offene Punkte** | Modell-Auswahl, Server-Infrastruktur, Qualitäts-Validierung. Erheblicher Setup-Aufwand. |
| **Freigabefähig** | **NEIN für P7-04 MVP.** Zu hoher Betriebsaufwand, Qualitäts-Risiko bei Medical Text zu hoch ohne umfangreiche Evaluation. ZDR-Problem zwar technisch gelöst, aber nicht empfohlener Pfad. Könnte als Langzeit-Option für Phase D/E evaluiert werden. |

---

## C — ZDR-NACHWEISSTANDARD

Dieser Standard ist verbindlich für die Auflösung von B1. Ein Anbieter gilt nur dann als für P7-04 freigegeben, wenn alle drei Ebenen erfüllt sind.

### C.1 — Nachweisarten, die akzeptiert werden

| Nachweisart | Bedingungen | Stufe |
|-------------|-------------|-------|
| Schriftliche Vertragsklausel mit explizitem ZDR-Wortlaut | Vertrag oder DPA des Anbieters enthält explizit: (1) Eingaben werden nicht gespeichert und (2) Ausgaben werden nicht gespeichert. Nicht ausreichend: nur "keine Trainingsnutzung". | **Pflicht** |
| Account-Dashboard-Konfiguration mit ZDR-Flag | Einstellung im Anbieter-Dashboard aktiviert und Screenshot mit Datum dokumentiert. Nur gültig wenn Anbieterdokumentation bestätigt, dass dieses Flag vollständige Nichtspeicherung (nicht nur No-Training) bewirkt. | **Ergänzend** |
| API-Parameter-Dokumentation (z.B. `"store": false`) | Anbieterdokumentation belegt eindeutig, dass dieser Parameter vollständige ZDR (kein Request-Logging, kein Safety-Monitoring-Storage) bewirkt — nicht nur No-Training. | **Ergänzend, nur wenn vollständig belegt** |
| DSGVO-Standardvertragsklauseln (SCCs) für Nicht-EU-Anbieter | Zusätzlich zu ZDR: für US-Anbieter (Anthropic, OpenAI) muss der Datentransfer auf Basis von SCCs oder Adequacy Decision dokumentiert sein. | **Pflicht für Nicht-EU-Anbieter** |

### C.2 — Nachweisarten, die nicht akzeptiert werden

| Nicht akzeptierte Nachweisart | Begründung |
|-------------------------------|------------|
| Marketing-Aussagen der Anbieter ("wir nehmen Datenschutz ernst", "privacy-first") | Keine rechtliche Bindung, nicht belegt |
| Default-API-Nutzung ohne explizite ZDR-Aktivierung | Standard-APIs haben typisch ein Logging-/Retention-Fenster; Default ≠ ZDR |
| Mündliche oder Chat-basierte Zusicherungen des Anbieters | Nicht dokumentierbar, keine rechtliche Wirkung |
| Analogie zu anderen Anbietern ("X hat ZDR, also Y auch") | Jeder Anbieter muss separat nachgewiesen werden |
| Annahme aufgrund DSGVO-Sitz (EU-Unternehmen ≠ automatisch ZDR) | EU-Sitz garantiert nur DSGVO-Konformität, nicht Zero Retention |
| Verweis auf eigene Anonymisierung als Ersatz für ZDR | Anonymisierter Text ist weiterhin eine Dienstleistung; ZDR muss sich auf den anonymisierten Text beim Anbieter beziehen |

### C.3 — Wann ein Anbieter als „nicht freigegeben" gilt

Ein Anbieter gilt als nicht für P7-04 freigegeben wenn:
1. Keine schriftliche Vertragsklausel mit explizitem ZDR-Wortlaut vorliegt
2. ZDR-Parameter existiert aber Umfang ist nur "No-Training" statt vollständiger Nichtspeicherung
3. Kein dokumentierter Transfer-Rechtsrahmen für Nicht-EU-Anbieter
4. Widerspruch zwischen vertraglicher Zusicherung und technischer Praxis (z.B. Safety-Logging trotz ZDR-Behauptung)
5. Vertragsstand unklar oder nicht dokumentiert

### C.4 — Wie zu dokumentieren ist, dass nur anonymisierter Text gesendet wird

Pflicht-Nachweis-Trio (alle drei müssen vorliegen vor P7-04 Live-Betrieb):

1. **Code-Review des Proxy-Handlers:** Zeigt, dass nur `anonymizedText` aus Worker-Ergebnis an LLM weitergeleitet wird. Kein `rawText`-Feld, kein Original-Input im Payload.  
2. **Request-Log-Audit (Testbetrieb):** Einmalige Aufzeichnung eines Testcalls im Staging (ohne echte Patientendaten) zeigt, dass im HTTP-Body des LLM-Calls keine Rohdaten vorhanden sind.  
3. **Proxy-Deployment-Konfiguration:** Dokument belegt, dass der Netlify Function Handler kein Request-Body-Logging aktiviert hat (weder durch Netlify-Defaults noch durch eigene Log-Statements).

---

## D — PROXY-ARCHITEKTUR-OPTIONEN

### Option D-1 — Netlify Function (empfohlen)

| Kriterium | Bewertung |
|-----------|-----------|
| **Option** | Netlify Serverless Function (`/.netlify/functions/llm-proxy`) im bestehenden VitalWissen-Netlify-Deploy |
| **API-Key-Schutz** | ✅ API-Key als Netlify Environment Variable gespeichert, niemals im Browser-Bundle. Netlify ENV vars sind server-seitig und nicht im öffentlichen Build-Output. |
| **E07/E08-Kompatibilität** | ✅ E07: Proxy empfängt nur anonymisierten Text vom Browser (kein Rohtext). E08: Kein eigenes Logging im Function-Handler (muss explizit sichergestellt werden — Netlify loggt per Default keine Request-Bodies, aber der Handler selbst darf keine Logging-Statements mit Payload-Inhalt enthalten). |
| **Payload-Grenze** | Technisch erzwingbar: Function-Handler validiert vor LLM-Weiterleitung, dass Request-Body keine verbotenen Felder enthält (Whitelist: nur `anonymizedText`, kein `rawText`, kein `filename`, keine Metadaten). |
| **Logging-Risiko** | Mittel. Netlify loggt Request-Headers und Metadaten (IP, Timestamp, Pfad) — diese enthalten keinen Payload. Request-Body-Logging ist Netlify-Standard-Off, muss aber im Function-Code aktiv freigehalten werden (kein `console.log(event.body)`). Netlify Function Logs sind im Dashboard einsehbar und müssen regelmäßig überprüft werden. |
| **Betriebsaufwand** | Gering. Netlify ist bereits im Stack, kein neues Hosting erforderlich. Function wird als `netlify/functions/llm-proxy.js` ins Repo eingecheckt und automatisch deployed. |
| **Serverstandort** | Netlify Functions laufen auf AWS-Infrastruktur. EU-spezifisches Routing nicht standardmäßig konfiguriert. E11 (DE/EU) gilt ausdrücklich für S9 — nicht für S4. Für S4-Proxy: DSGVO-Konformität des Datentransfers (SCCs) ist ausreichend, sofern die ZDR-Bedingung beim LLM-Anbieter erfüllt ist. |
| **Freigabefähig** | **JA — unter Bedingungen:** (1) Kein Payload-Logging im Function-Handler. (2) Whitelist-Validierung vor Weiterleitung. (3) API-Key als ENV var gespeichert. (4) ZDR-Nachweis für LLM-Anbieter vorab (B1) gelöst. |

---

### Option D-2 — Supabase Edge Function (Alternative)

| Kriterium | Bewertung |
|-----------|-----------|
| **Option** | Supabase Edge Function im bestehenden VitalWissen-Supabase-Projekt (Frankfurt DE) |
| **API-Key-Schutz** | ✅ API-Key als Supabase Secret gespeichert, server-seitig. |
| **E07/E08-Kompatibilität** | ✅ E07: Wie D-1 — empfängt nur anonymisierten Text. E08: Kein eigenes Logging im Function-Handler (Supabase loggt Edge Function Outputs im Dashboard — verbotene Logs müssen aktiv vermieden werden). |
| **Payload-Grenze** | Technisch erzwingbar: gleiche Whitelist-Validierung wie D-1. |
| **Logging-Risiko** | Mittel bis hoch. Supabase Edge Function Logs erscheinen im Supabase Dashboard mit Payload-Auszügen wenn `console.log()` mit Body-Inhalt aufgerufen wird. Risiko höher als D-1 weil das Dashboard bereits aktiv genutzt wird und Logs leichter versehentlich aktiviert werden. Strenge Code-Review notwendig. |
| **Betriebsaufwand** | Mittel. Supabase Edge Functions (Deno-basiert) erfordern eigenen Deploy-Prozess (`supabase functions deploy`). Kein automatisches Netlify-Deployment; separater Deploymentpfad. Deno-Syntax weicht von Node.js ab — mehr Einarbeitungsaufwand. |
| **Serverstandort** | ✅ Supabase Projekt Frankfurt (DE) — EU-Serverstandort. E11 prinzipiell erfüllt, obwohl E11 streng nur für S9 gilt. |
| **Freigabefähig** | **JA — unter Bedingungen:** Wie D-1, zusätzlich: striktes Verbot von Body-Content in Supabase Function Logs. Empfehlung: D-1 (Netlify Functions) bevorzugen wegen niedrigerem Betriebsaufwand und einfacherem Deploy-Pfad im bestehenden Stack. |

---

### Option D-3 — Direkter LLM-Call im Browser (bewusst verworfen)

| Kriterium | Bewertung |
|-----------|-----------|
| **Option** | API-Key direkt im React-Frontend, LLM-Call aus dem Browser heraus ohne Proxy |
| **API-Key-Schutz** | ❌ Nicht möglich. Jeder API-Key im JavaScript-Bundle ist im Browser-Quellcode sichtbar. Ein sichtbarer API-Key kann unbegrenzt von Dritten genutzt werden → sofortiger finanzieller und sicherheitstechnischer Schaden. |
| **E07/E08-Kompatibilität** | E07: technisch möglich (nur anonymisierter Text gesendet), E08: LLM-Anbieter-ZDR-Bedingung muss trotzdem erfüllt sein. Aber: ohne Proxy kein technisch erzwungener Payload-Filter. |
| **Payload-Grenze** | Nicht erzwingbar ohne Proxy. Kein technischer Schutz gegen versehentlichen Rohtext im Call. |
| **Logging-Risiko** | Hoch — API-Key sichtbar im Bundle bedeutet Missbrauch durch Dritte, unvorhersehbare Request-Logs beim Anbieter. |
| **Betriebsaufwand** | Niedrig — aber irrelevant, da nicht freigabefähig. |
| **Freigabefähig** | ❌ **ABSOLUTES NO-GO.** API-Key im Browser ist unter keinen Umständen akzeptabel. Diese Option ist dauerhaft verworfen. |

---

## E — VERBINDLICHER PAYLOAD-VERTRAG

Dieser Vertrag ist bindend für jeden Proxy-Handler, der für P7-04 gebaut wird. Kein Abweichen ohne neue Spec.

### E.1 — Was der Proxy annehmen DARF

```
Erlaubte Request-Felder:
{
  "anonymizedText": string,   // Pflichtfeld — nur anonymisierter Text aus Worker
  "requestId": string,        // Optional — UUID für Tracing (keine Nutzeridentifikation)
}
```

Keine weiteren Felder. Alle anderen Felder werden vom Proxy-Handler mit HTTP 400 abgelehnt.

### E.2 — Was der Proxy NIEMALS annehmen darf

| Verbotenes Feld | Begründung |
|-----------------|------------|
| `rawText` oder ähnliches Freitext-Feld ohne Anonymisierungsnachweis | E08-Verletzung: Rohtext beim Anbieter |
| `filename` | Dateiname kann Personenidentifikation enthalten |
| `userId`, `email`, `sessionId` (nutzerbezogen) | E07/E08, keine Nutzer-Verbindung zum Arztbrief |
| Bild-Rohdaten (base64-encoded, Blob) | Kein OCR über Proxy; Tesseract.js lokal |
| Inhalt von `anonReport` (Replacement-Statistik mit Kategorien) | Kann Rückschlüsse auf Dokumentstruktur ermöglichen |
| `originalText` oder Originaldokument-Metadaten | Rohtext, absolute Grenze |

### E.3 — Erlaubte Response-Struktur

```
Erlaubte Response-Felder vom Proxy an den Browser:
{
  "decodedText": string,        // LLM-Ausgabe: Erklärungen, Glossar, Zusammenfassung
  "recognizedCodes": {          // Optional: erkannte medizinische Codes für Cross-Linking
    "icd10": string[],
    "loinc": string[],
    "medication": string[]
  },
  "model": string,              // Genutztes Modell (für Transparenz in P7-05-UX)
  "requestId": string           // Echo des requestId für Tracing
}
```

Kein direktes Echo von `anonymizedText` in der Response. Kein Returnieren von Metadaten über den Nutzer oder den Request-Ursprung.

### E.4 — Verbotene Logs

Absolut verboten im Proxy-Handler (kein `console.log()`, kein Logging-Framework für diese Daten):
- Inhalt von `anonymizedText` (auch für Debugging verboten)
- Inhalt von `decodedText`
- IP-Adresse des Nutzers (soweit verhinderbar)
- Timestamp + anonymizedText-Hash-Kombination (Re-Identifikationsrisiko)

Erlaubt in Logs:
- HTTP-Statuscode
- Latenz-Zeit
- `requestId` (ohne Payload-Inhalt)
- Fehlercodes ohne Payload-Inhalt

### E.5 — Technische Erzwingung vs. Policy

Der Payload-Vertrag muss **technisch erzwungen** werden, nicht nur als Policy festgehalten:

| Mechanismus | Implementation |
|-------------|----------------|
| Input-Whitelist | Proxy-Handler prüft Request-Body auf erlaubte Felder; wirft 400 bei Fremdfeldnamen |
| `anonymizedText`-Pflicht | Kein LLM-Call wenn Feld fehlt oder leer — sofortiger 400 |
| Kein `console.log(body)` | Code-Kommentar + Code-Review-Pflicht vor Deployment |
| Payload-Size-Limit | Max. 50.000 Zeichen anonymizedText (typischer Arztbrief max. ~10.000 Zeichen) — Schutz gegen Missbrauch |

---

## F — P7-04 UNLOCK-MAP

| Restblocker | Konkrete Auflösung | Wer / Was nötig | Nach Auflösung freigegeben |
|-------------|-------------------|-----------------|--------------------------|
| **B1 — ZDR-Nachweis LLM-Anbieter** | (1) Anbieter wählen (Empfehlung: B-1 Anthropic oder B-2 OpenAI — je nach Account-Status). (2) ZDR-Option im Anbieter-Dashboard prüfen und aktivieren ODER Enterprise-Vertrag abschließen. (3) Nachweis dokumentieren: Screenshot/PDF + Datum. (4) DSGVO-Transfer-Grundlage für Nicht-EU-Anbieter dokumentieren. | **Sebastian direkt** — erfordert Zugang zum Anbieter-Account, ggf. Vertragsabschluss. Außerhalb Cowork-Sandbox. | P7-04-Build kann starten (Proxy + LLM-Integration) |
| **B3 — Kein Backend-Proxy** | (1) Entscheidung D-1 (Netlify Function) oder D-2 (Supabase Edge Function). (2) Proxy-Handler implementieren gemäß Payload-Vertrag E. (3) API-Key als ENV var konfigurieren. (4) Kein Payload-Logging sicherstellen. (5) Test-Call mit anonymisierten Testdaten (kein Rohtext). | **Claude im P7-04-Build-Paket** — technisch umsetzbar nach B1-Entscheidung. | LLM-Calls aus S4 möglich |
| **B1 vor B3** | B3 (Proxy) kann erst gebaut werden, wenn B1 (Anbieter) entschieden ist — kein Proxy für ungewissen Anbieter. Reihenfolge: B1 lösen → B3 bauen. | Sequentiell | P7-04 vollständig freigegeben |

**Empfehlung für B1-Auflösung:**

Aus den vier Provider-Optionen ergibt sich folgende Prioritätsreihenfolge für Sebastian's Klärungsaktion:

1. **Anthropic (B-1)** — Claude ist bereits VitalWissens Plattform-Backend; kein neuer Account erforderlich; höchste Wahrscheinlichkeit, dass ZDR-Option direkt im bestehenden Account zugänglich ist.  
2. **OpenAI (B-2)** — weit verbreitet, gute DPA-Dokumentation, aber neuer Account-Aufbau nötig wenn nicht vorhanden.  
3. **Mistral/Aleph Alpha (B-3)** — nur wenn B-1/B-2 ZDR nicht erreichbar; höherer Setup-Aufwand und Qualitäts-Unsicherheit.  
4. **Self-Hosted (B-4)** — nicht empfohlen für P7-04 MVP, keine Priorität.

---

## G — NO-GOS / STOP-REGELN

Alle Punkte sind absolute Grenzen. Keine Ausnahme ohne neue Spec.

**G.1 — Kein Rohtext an LLM**  
Einziger zulässiger LLM-Input ist `anonymizedText` aus dem Browser-Worker. Rohtext darf den Worker verlassen nur als anonymisierter Text; er darf den Browser nur als anonymisierter Text verlassen; er darf den Proxy nur als anonymisierter Text passieren. Jeder Pfad, bei dem Rohtext (direkt oder indirekt als Feld) den LLM-Endpoint erreicht, ist ein sofortiger Stop.

**G.2 — Kein API-Key im Browser**  
API-Key ist ausschließlich server-seitig (Netlify ENV oder Supabase Secret). Kein API-Key in `.env` im Repo, kein API-Key in Vite-Umgebungsvariablen mit `VITE_`-Prefix (diese landen im Browser-Bundle). Stop wenn Key im Bundle nachweisbar.

**G.3 — Kein unbewiesener ZDR-Pfad**  
Kein LLM-Produktionsbetrieb ohne dokumentierten ZDR-Nachweis nach Standard C. „Wahrscheinlich hat der Anbieter ZDR" reicht nicht. Stop bis Nachweis vorliegt.

**G.4 — Kein stiller Fallback auf nicht abgesicherten Anbieter**  
Wenn der primäre Anbieter (nach B1-Entscheidung) nicht erreichbar ist: Fehler zurückgeben, keine stille Weiterleitung an alternativen Anbieter ohne ZDR-Prüfung. Kein „try Claude, on error use OpenAI" ohne beidseitigen ZDR-Nachweis.

**G.5 — Keine implizite Speicherung**  
`anonymizedText` und `decodedText` dürfen nicht in Supabase geschrieben werden. Nicht im Browser-Storage (localStorage, sessionStorage). Nur im Memory der aktiven Session. Wenn S9-Speicherung später gewünscht (Phase D): eigene neue Entscheidung, eigene neue Spec.

**G.6 — Keine P7-05-UX vorziehen**  
P7-04 liefert das LLM-Ergebnis als rohen strukturierten Text. Keine Parallelansicht, kein Inline-Glossar, kein Cross-Link-Rendering in P7-04. UX ist P7-05-Scope. P7-04 endet mit einer technisch validierten LLM-Response in der Console oder einem minimal sichtbaren Ergebnis-Block — kein vollständiges UI.

**G.7 — Keine Cloud-OCR als Fallback**  
Sollte Tesseract.js bei einem Eingabetyp scheitern: Fehler anzeigen, kein automatischer Fallback auf Cloud-OCR (Google Vision oder ähnliche). Cloud-OCR ist dauerhaft kein freigegebener Pfad (B5, P7_01, E07/E08).

**G.8 — Keine S9-Logik vorbereiten**  
K9 (Arztbrief/Befund) ist in Phase B ein Zero-Retention-Verarbeitungsobjekt. Kein Speichern, kein Verspeichern von Dokumentmetadaten, keine Supabase-Tabellen für S4-Inputs anlegen.

**G.9 — Kein Proxy-Build ohne B1-Entscheidung**  
Proxy (B3) wird erst nach Anbieter-Entscheidung (B1) gebaut. Kein Vorbau auf "irgendeinen Anbieter, der vielleicht ZDR hat". Proxy-Code-Entscheidungen (Endpoint-URL, Parameter) sind anbieterabhängig.

---

## H — ABSCHLUSSURTEIL

> **P7-04 unter exakt benannten Bedingungen freigabefähig — aber noch nicht freigegeben.**

Begründung:

P7-03 ist durch P7-03b vollständig abgeschlossen (Worker live, 8/8 PASS, Commit `07576d0`). Die erste der drei P7-03a-Freigabebedingungen für P7-04 ist damit erfüllt.

Die zwei verbleibenden Blocker sind:

**B1 (ZDR-Nachweis)** ist durch **Sebastian direkt** aufzulösen — außerhalb der Cowork-Sandbox. Empfohlener Weg: Anthropic-Account prüfen, ZDR-Option aktivieren und dokumentieren (Screenshot + Datum). Alternativ: OpenAI-Account mit DPA-Nachweis. Kein Anbieter ist aktuell als freigegeben markiert, da keine direkte Verifikation möglich war.

**B3 (Proxy-Build)** kann im Rahmen von P7-04 von Claude gebaut werden — **nach** B1-Entscheidung. Empfohlen: Netlify Function (D-1), da geringstem Betriebsaufwand und bestehender Stack-Integration.

**Konkret beantwortbar:**

> „Welcher konkrete LLM-/Proxy-Pfad ist für P7-04 freigabefähig?"

**Antwort:** Anthropic Claude API mit dokumentierter ZDR-Option + Netlify Function als Proxy ist der empfohlene, freigabefähige Pfad — **sobald Sebastian den ZDR-Nachweis für seinen Anthropic-Account beschafft und dokumentiert hat.** Bis dahin: P7-04 bleibt blockiert.

---

## I — OPS CLOSURE

### Inhaltlich

Alle Pflichtabschnitte A–I erstellt. IST-Zustand aus führenden Quellen (P7-03a, P7-03b, P7-01, P7D, VW_04, VW_06) abgeleitet. Kein Anbieter ohne Nachweis als freigegeben markiert. Unverifizierbares explizit als „nicht direkt verifiziert" oder „nicht belegt" markiert. Keine Marketing-Sprache als Nachweis akzeptiert. Kein Code. Keine Strategiedrift. Keine Vermischung mit P7-05. Abschlussurteil eindeutig formuliert.

### Technisch angewendet

| Dimension | Status |
|-----------|--------|
| Neue Datei erstellt | ✅ `01_PROJECT_SOURCES_CURRENT/P7_04A_S4_LLM_PROXY_RELEASE_SPEC.md` |
| Bestehende Datei verändert | NEIN |
| Code geändert | NEIN |
| DB-Write | NEIN |
| Commit | NEIN |
| Push | NEIN |
| Deploy | NEIN |

### Operativ abgesichert

| Punkt | Status |
|-------|--------|
| Lokaler Speicherstatus | Datei im macOS-Mount `01_PROJECT_SOURCES_CURRENT/` — persistierend |
| git status | Nicht eingecheckt (außerhalb `00_REPO/vitalwissen_repo_current/`) |
| Commit-Status | Kein Commit |
| Push-Status | Kein Push |
| DB-Writes | Nein |
| Deploy | Nein |
| Offener Side Effect | Keiner |

**Nächster zulässiger Schritt:**  
Sebastian beschafft ZDR-Nachweis für Anthropic-Account (oder OpenAI). Danach: P7-04-Build-Paket auf Basis dieser Spec (Proxy + LLM-Integration). Kein weiterer Schritt in Cowork bis B1 dokumentiert ist.

**Nicht zulässig vor B1-Auflösung:**  
Proxy-Code schreiben, LLM-Call testen, API-Key konfigurieren, S4-LLM-Dekodierung in irgendeiner Form live nehmen.

---

*Erstellt: 18.04.2026 — P7-04a LLM- und Proxy-Freigabe-Spec abgeschlossen.*  
*Führend für: P7-04-Build-Planung, B1/B3-Auflösungsstrategie.*  
*Widerspruchsregel: P7-03a führend für Freigabebedingungen · P7-03b führend für Ist-Stand · P7D führend für Phasenlogik.*
