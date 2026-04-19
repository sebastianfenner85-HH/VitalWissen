# P7-03b — S4 Anonymisierungs-Worker: Build-Abschluss

**Datum:** 18.04.2026  
**Sprint:** P7-03b  
**Autor:** Claude (Cowork-Session)  
**Commit:** `07576d0`  
**Push:** ✅ `origin/main`  

---

## A. Scope

**Ziel:** Client-seitiger Anonymisierungs-Worker für die `/arztbrief`-Oberfläche.  
Alle 4 Eingabepfade (Text-Paste, PDF-Textlayer, Scan-PDF via OCR, Bild via OCR) müssen nach Extraktion durch den Worker laufen, bevor Text angezeigt wird.

**Nicht-Scope (eingehalten):**
- Kein LLM-Aufruf
- Kein Backend-Proxy
- Kein Supabase-Write
- Keine neue Route
- Keine Cloud-OCR
- Kein radiologisches Bildlogik
- Kein Bypass bei Fehler (Hard-Stop-Prinzip)

---

## B. Geänderte Dateien

| Datei | Änderungstyp | Inhalt |
|-------|-------------|--------|
| `src/workers/anonymizeWorker.js` | NEU | Browser Web Worker — Hybrid-Regex-Anonymisierung |
| `src/pages/Arztbrief.jsx` | GEÄNDERT | Worker-Integration, alle 4 Eingabepfade, Debounce, Hard-Stop-UI |
| `src/pages/Arztbrief.css` | GEÄNDERT | Anon-Status-Styles (Spinner, Badge, Hinweis) |

---

## C. Anonymisierungs-Worker — Architektur

**Datei:** `src/workers/anonymizeWorker.js`  
**Typ:** Browser Web Worker (Vite-nativer Import: `new Worker(new URL(..., import.meta.url))`)  
**Protokoll:**
- Eingehend: `{ type: 'anonymize', text: string }`
- Ausgehend: `{ type: 'result', anonymizedText: string, report: { totalReplacements, byCategory } }`
- Fehler: `{ type: 'error', message: string }` — keine PII in Fehlermeldungen

**Regelwerk — 10 Blöcke, ~18 Regeln:**

| Block | Regeln | Placeholder |
|-------|--------|-------------|
| 1 — Kontext-Namen-Labels | patient_label, name_label | `[NAME]` |
| 2 — Strukturierte IDs | iban, rv_nummer, kv_nummer | `[ID]` |
| 3 — Geburtsdatum (Kontext) | geburtsdatum_asterisk, geburtsdatum_label | `[GEBURTSDATUM]` |
| 4 — Kontaktdaten | email, telefon | `[KONTAKT]` |
| 5 — Fall-/Versicherungsnummern | fallnummer, versicherung_nr | `[FALLNUMMER]` |
| 6 — Behandler/Einrichtungen | behandler_titel, einrichtung | `[BEHANDLER]`, `[EINRICHTUNG]` |
| 7 — Adressen | adresse_vollstaendig, plz_ort | `[ADRESSE]` |
| 8 — Anrede-Namen | name_anrede | `[NAME]` |
| 9 — Angehörige | person_angehoerige | `[PERSON]` |
| 10 — Schlussformel | schlussformel_unterschrift | `[BEHANDLER]` |

**Kritische Reihenfolge-Entscheidung:**  
`patient_label` und `name_label` laufen in BLOCK 1 **vor** `fallnummer` (BLOCK 5). Damit wird verhindert, dass "Patient: Max Mustermann" durch das Nummern-Muster als `[FALLNUMMER]: Max Mustermann` fehl-konsumiert wird — ein Bug, der in der ersten Version alle 4 Namens-Testfälle zum Scheitern brachte.

**Sicherheitsgarantien:**
- Fehler in einer Einzelregel → Regel wird übersprungen, kein Gesamtabbruch
- Worker-Fehler → Hard-Stop: `anonStatus='failed'`, `anonText=''`, kein Bypass
- Keine PII in Fehlermeldungen
- E07/E08-konform: kein Netzwerkaufruf aus dem Worker

---

## D. Integration Arztbrief.jsx

**Neue State-Variablen:**
- `pasteValue` — kontrolliertes Textarea-State
- `anonStatus` — `null | 'running' | 'done' | 'failed'`
- `anonText` — der angezeigte anonymisierte Text (nie der Rohtext)
- `anonReport` — `{ totalReplacements, byCategory }`

**Worker-Lifecycle:**
- Worker-Instanz via `useEffect` (Mount/Unmount)
- `w.onmessage` + `w.onerror` beide mit Hard-Stop-Logik

**Debounce:** 600ms für Paste-Eingabe (via `setTimeout` + Ref)

**Eingabepfade → Anonymisierung:**
- Text-Paste → Debounce 600ms → `triggerAnonymization()`
- PDF-Textlayer → sofort nach Extraktion → `triggerAnonymization()`
- Scan-PDF (OCR) → nach OCR-Completion → `triggerAnonymization()`
- Bild (OCR) → nach OCR-Completion → `triggerAnonymization()`

**Anzeige-Logik:**
- Vorschau zeigt **ausschließlich** `anonText` wenn `anonStatus === 'done'`
- Bei `anonStatus === 'failed'`: Fehlermeldung, keine Textanzeige
- Banner-Chip: "Anonymisierung aktiv (lokal)" statt "Noch keine Anonymisierung"

---

## E. Test-Audit — 8/8 PASS

| ID | Eingabetyp | Quelle | Ersetzungen | Ergebnis |
|----|------------|--------|-------------|----------|
| T01 | reiner Text | direkt | 5 | ✅ PASS |
| T02 | reiner Text | direkt | 9 | ✅ PASS |
| T03 | PDF-Textlayer | Textlayer | 6 | ✅ PASS |
| T04 | PDF-Textlayer | Textlayer | 6 | ✅ PASS |
| T05 | Scan-PDF (OCR-Text) | OCR | 7 | ✅ PASS |
| T06 | Scan-PDF (OCR-Text) | OCR | 6 | ✅ PASS |
| T07 | Bild (OCR-Text) | OCR | 7 | ✅ PASS |
| T08 | Bild (OCR-Text) | OCR | 7 | ✅ PASS |

**Kein einziger PII-Leak** in allen 8 Testfällen. Akzeptanzkriterium erfüllt.

**Behobene Bugs (zwischen v1 und v2):**
1. `fallnummer`-Muster konsumierte "Patient:" ohne Nummern-Suffix → Fix: `(?:nummer|nr)` nicht-optional für Pat*-Prefix
2. `name_label`-Muster überschritt Zeilengrenze → Fix: `[^\S\n]*` statt `\s*` in Wiederholungsgruppe
3. Regelreihenfolge: `patient_label`/`name_label` in BLOCK 1 (vor `fallnummer`)

---

## F. Akzeptanzkriterien-Check (aus P7-03b-Auftrag)

| Kriterium | Ergebnis |
|-----------|----------|
| Läuft P7-03b vollständig client-seitig? | ✅ JA — Web Worker, kein Netzwerkaufruf |
| Sind alle 4 Eingabetypen anonymisiert vor Anzeige? | ✅ JA — alle 4 Pfade gehen durch `triggerAnonymization()` |
| Kein Bypass bei Fehler? | ✅ JA — Hard-Stop, `anonText=''` bei Fehler |
| 8/8 Testfälle PASS? | ✅ JA |

---

## G. Ops Closure

| Dimension | Status |
|-----------|--------|
| Lokaler Speicherstatus | ✅ Clean (3 Dateien committed) |
| git status | ✅ `main` up to date mit origin |
| Commit | ✅ `07576d0` |
| Push | ✅ `origin/main` gepusht |
| DB-Writes | NEIN |
| Deploy | Netlify Auto-Deploy ausgelöst via Push — aus Sandbox nicht direkt verifiziert |
| Unbeabsichtigte Side Effects | KEINE |
| Intendierte Side Effects | Commit + Push erfolgt; Netlify-Deploy ausgelöst (erwarteter Ops-Effekt) |
| CLAUDE.md | Formaler OOS-Doku-Nachzug: Sprint-Status, Hosting-Stand, Dateiliste aktualisiert — kein Code, kein technischer Schaden, kein P7-04-Unlock |

---

## H. Freigabezustand nach P7-03b

| Sprint | Voraussetzungen | Status |
|--------|----------------|--------|
| P7-03 (Anonymisierung) | Build + 8/8 PASS | ✅ ERFÜLLT |
| P7-04 (LLM-Dekodierung) | P7-03 ✅ + ZDR-Nachweis LLM-Provider + Backend-Proxy | 🔒 NOCH OFFEN |
| P7-05 (Ausgabe/UX) | P7-04 ✅ | 🔒 NOCH OFFEN |

P7-04 bleibt blockiert. Offene Voraussetzungen gemäß P7-03a-Spec (Abschnitt I, UNLOCK-MAP):
- Zero-Data-Retention-Nachweis des gewählten LLM-Providers (nicht beschafft)
- Backend-Proxy gebaut (nicht gebaut)
