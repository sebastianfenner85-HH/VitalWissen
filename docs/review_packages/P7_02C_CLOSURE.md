# P7-02c — S4 Arztbrief-Decoder · Scan-PDF-OCR Completion-Fix · Closure

**Datum:** 17.04.2026
**Status:** Abgeschlossen. Live Smoke-Check SC-1 + SC-2 bestanden.
**Bindende Vorlage:** `P7_01_S4_ARCHITECTURE_SPEC.md` (inkl. P7-01a-Patch).
**Commit P7-02c-fix:** `f757630` — „P7-02c-fix: ocrPdfDoc — renderCanvas→ImageBitmap→ocrCanvas vor worker.recognize"

---

## 1. Scope (exakt gebaut)

Behebung des dauerhaften 0%-Hängens im Scan-PDF-OCR-Pfad (`ocrPdfDoc`):

- Ursache isoliert: aktiver pdfjs-Renderkontext auf dem Canvas + fehlender weißer Hintergrund
- Fix: Weißer Hintergrund vor `page.render()` + renderCanvas→`createImageBitmap`→frischer ocrCanvas (identisch fix2-Muster für Bilder)
- Ergebnis: Scan-PDF-OCR läuft deterministisch bis Abschluss — kein unendlicher 0%-Lauf mehr

## 2. Nicht-Scope (bewusst ausgelassen)

- PNG/JPG-Pfad (`ocrImageFile`) — unberührt, läuft korrekt seit fix2
- Text-Layer-PDF-Pfad — unberührt
- Anonymisierung (P7-03), LLM-Anbindung (P7-04), UX-Endausbau (P7-05)
- Alle P6-Dateien
- `P7_01_S4_ARCHITECTURE_SPEC.md`

## 3. Root-Cause-Analyse

| Aspekt | Befund |
|---|---|
| `ocrImageFile` (✅) | Canvas vor Worker erstellt (fix2-Muster): File→ImageBitmap→Canvas→`createWorker`→`recognize(canvas)` |
| `ocrPdfDoc` (❌ vor fix) | Worker vor Canvas erstellt, Canvas nach `page.render()` direkt an `recognize` übergeben — aktiver pdfjs-Renderkontext im Canvas-Objekt hängt den WASM-Worker |
| Sekundärproblem | Kein weißer Hintergrund → transparente RGBA-Pixel bei PDFs ohne expliziten Seitenhintergrund |
| Fix | Identisches Muster wie fix2: renderCanvas (weiß+render) → `createImageBitmap` → ocrCanvas (clean) → `recognize(ocrCanvas)` |

## 4. Technische Umsetzung

| Bereich | Änderung |
|---|---|
| Geändert | `src/pages/Arztbrief.jsx` — `ocrPdfDoc`: renderCanvas+Whitefill, ImageBitmap-Konvertierung |

**Unverändert:** `ocrImageFile`, `App.jsx`, `Nav.jsx`, alle P6-Dateien, `P7_01_S4_ARCHITECTURE_SPEC.md`, alle Supabase-Tabellen.

## 5. Live Smoke-Check — Ergebnisse (17.04.2026, Bundle `index-BLz1WreD.js`)

| # | Test | Ergebnis | Befund |
|---|---|---|---|
| SC-1 | Text-Layer-PDF (Regression) | ✅ PASS | 77 Zeichen, Quelle „lokal aus PDF-Text-Layer extrahiert", kein CDN-Request für OCR |
| SC-2 | Scan-PDF-OCR | ✅ PASS | „Befund: unauffaellig Datum: 17.04.2026" (38 Zeichen) in ~15 s, Quelle „lokal per OCR erkannt (Texterkennung im Browser)", kein CDN-Request für OCR |

**Network-Audit:** Keine CDN-Requests für OCR-Assets.

**Hinweis Google Fonts:** `fonts.googleapis.com` + `fonts.gstatic.com` sind app-weite Font-Requests (DM Sans, Instrument Serif) — kein Bezug zur OCR-Pipeline. OCR-Origin bleibt ausschließlich app-eigene Domain (`/tesseract/`, `/tessdata/`).

## 6. Trust-Boundary-Nachweis

| Frage | Antwort | Nachweis |
|---|---|---|
| Verlässt OCR-Rohtext das Gerät? | Nein | renderCanvas→ocrCanvas im Hauptthread; kein fetch mit Nutzerinhalt |
| Werden PDFs/Bilder an externen Dienst gesendet? | Nein | Gesamter OCR-Pfad lokal in WASM |
| CDN-Request für OCR-Assets? | Nein | Kein tesseract/jsdelivr-Request in Network-Audit |
| Drittanbieter-Origin im OCR-Pfad? | Nein | Nur `/tesseract/` + `/tessdata/` (eigene App-Origin) |
| Google Fonts = OCR-Verstoß? | Nein | Fonts sind App-UI, nicht OCR. Kein Nutzerdatenabfluss. |
| Cloud-OCR eingebaut? | Nein | kein googleapis, kein Vision-API-Import |
| LLM angebunden? | Nein | kein LLM-Import |
| Gespeichert (DB / localStorage / sessionStorage)? | Nein | kein Speicherzugriff |

## 7. Validatoren

- ✅ kein CDN / keine Drittanbieter-Origin für OCR
- ✅ kein Nutzerdatenabfluss
- ✅ Scan-PDF-Pfad endet deterministisch (SC-2: Ergebnis in ~15 s)
- ✅ Text-Layer-PDF regressiert nicht (SC-1: 77 Zeichen)
- ✅ keine P6-Datei berührt
- ✅ `P7_01_S4_ARCHITECTURE_SPEC.md` unverändert
- ✅ kein Scope-Leak (P7-03/04/05 weiterhin blockiert)

## 8. Offene Blocker (aus `P7_01_S4_ARCHITECTURE_SPEC.md`, unverändert bindend)

| Blocker | Betrifft Stufe |
|---|---|
| B1 — Zero Retention nicht vertraglich dokumentiert | P7-04 |
| B2 — Ort der Anonymisierung offen, eigener Worker nicht vorfreigegeben | P7-03 |
| B3 — Kein freigegebener Backend-Proxy | P7-04 |
| B4 — S4-UX in `VW_06_WEBSITE.md` nicht verifiziert | P7-05 |

---

## Ops Closure

### Inhaltlich
P7-02c-fix behebt den einzigen echten Restfehler aus P7-02b (SC-2 dauerhaftes 0%-Hängen). Root Cause: aktiver pdfjs-Renderkontext + fehlender weißer Canvas-Hintergrund. Fix: renderCanvas→ImageBitmap→ocrCanvas, identisch fix2-Muster. E07/E08-Primat vollständig eingehalten: kein Nutzerdatenabfluss, same-origin OCR. SC-1 + SC-2 live bestanden.

### Technisch angewendet
- Geänderte Datei: `src/pages/Arztbrief.jsx` — nur `ocrPdfDoc`
- Keine weitere Datei verändert
- Keine DB-Writes
- Keine Änderung an `P7_01_S4_ARCHITECTURE_SPEC.md`
- Keine P6-Datei berührt

### Operativ abgesichert
- **Lokaler Clone:** `/sessions/nifty-amazing-mccarthy/work/vitalwissen_p7_02c`
- **git status:** clean nach Commit
- **Commit P7-02c-fix:** `f757630`
- **Push:** `dfb6676→f757630` (17.04.2026)
- **Netlify Bundle:** `index-BLz1WreD.js` (aktiv, Live-verifiziert)
- **Supabase:** unberührt, kein DB-Write
- **Netlify:** Auto-Publishing AN → Deploy automatisch nach Push
- **Offener Side Effect:** keiner

---

*P7-02c inhaltlich + technisch + operativ geschlossen. Scan-PDF-OCR deterministisch. P7-03/04/05 bleiben blockiert bis E07/E08-Engschnitt pro Stufe freigegeben.*
