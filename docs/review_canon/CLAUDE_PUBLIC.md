# VitalWissen — Projektkontext (öffentliche Version)

> **Hinweis:** Dies ist die redaktierte, öffentlich tragbare Version des internen Projektkontext-Dokuments.
> Credentials, API-Keys, Tokens, Passwörter und Zugangsdaten sind vollständig entfernt.
> Letzte Aktualisierung der Quelle: 19.04.2026 (P7D-07b).

---

## Was ist VitalWissen?

Deutschsprachige Gesundheitsplattform — Menschen mündig machen.
Tagline: *"Es gibt einen Moment in dem man aufhört zu googeln und anfängt zu verstehen."*
Live: https://vitalwissen.netlify.app · Vorbild: Examine.com (deutsches Pendant fehlt)
**Kernprinzip:** Werbefrei, kein Affiliate, kein Sponsoring. Vertrauen vor Reichweite.

---

## Stack

| Was | Details |
|-----|---------|
| Frontend | Vite + React → Netlify (Auto-Deploy) |
| DB | Supabase PostgreSQL (Frankfurt) |
| Repo | github.com/sebastianfenner85-HH/VitalWissen (public) |
| Pipelines | Python, Ordner `/pipelines` im Repo |

---

## Projektfortschritt

| Sprint | Status | Inhalt |
|--------|--------|--------|
| P1 | ✅ | Frontend: S1 + S2 Seiten, Design-System, Seed-Daten |
| P2 | ✅ | Netlify Deploy, GitHub Repo, Supabase Schema |
| P3 | ✅ | Supabase JS Client, alle Seiten live verbunden |
| P4 | ✅ | 20 Supplements in DB (Tier 1, NIH ODS Basisdaten) |
| P5 | ✅ | 50 Supplements + 60 Laborwerte in DB — S1 und S2 vollständig befüllt |
| P5b | ✅ | Vollständiges Frontend-Audit + Stabilisierung (10.04.2026) |
| P6 | ✅ | S5 Krankheits-Lexikon: 221 Einträge live, Tag-Filter, Footer/Disclaimer, RLS (12.04.2026) |
| P6c | ✅ | Curated Verified Core 5 (14.04.2026): E11/E03/D50/I10/F32 — broken Refs bereinigt, Quellenanker verifiziert |
| P6d | ✅ | S5 Kreuzreferenz-Bereinigung (15.04.2026): broken Chips gefiltert, LOINC-Codes korrigiert, vitamin-k2 angelegt. Commit ee0e67f. |
| P6b-02b | ✅ | S5 Quellen-Write (15.04.2026): 184 Krankheiten mit AWMF+IQWiG Quellen befüllt. 195/221 echte Quellen. Kein Commit (nur DB). |
| P6b-03a | ✅ | Crosslink-Rulebook erstellt (16.04.2026): bindendes Regelwerk für verwandte_laborwerte + verwandte_supplements. |
| P6b-03b | ✅ | Crosslink-Matrix erstellt (16.04.2026): 221er Dual-Matrix (klasse_lw + klasse_supp A/B/C). DB-verifiziert. |
| P6b-03c | ✅ | Crosslink-Write abgeschlossen (16.04.2026): 147 A-Klasse-Einträge geschrieben (lw=123, supps=108). |
| P6b-Rest | ✅ | Quellen-Rest abgeschlossen (16.04.2026): 21/26 Rest-ICDs mit echten Quellen versorgt. 5 dauerhaft intern (F06/L72/M13/R74/Z87). |
| P6b | ✅ | S5 Vervollständigung komplett: Quellen 216/221, Crosslinks lw=123/supps=108. |
| P6-Final-01 | ✅ | P6 vollständig geschlossen (16.04.2026): 8 Non-Standard-Typen normalisiert. |
| P7-01 | ✅ | S4-Architektur- und Sicherheits-Spec (16.04.2026). → `P7_01_S4_ARCHITECTURE_SPEC.md` |
| P7-02 | ✅ | S4-Minimal-Arbeitsfläche `/arztbrief` live (16.04.2026): Text-Paste + PDF-Text-Layer-Extraktion. Commit `0a3961d`. → `P7_02_CLOSURE.md` |
| P7-02b | ✅ | Client-seitige OCR via Tesseract.js (Scan-PDF + PNG/JPG/JPEG) — live, vollständig same-origin. Commits `ac3f40c` + `1f1e4a3` + `dfb6676` (17.04.2026). |
| P7-02c | ✅ | Scan-PDF-OCR Completion-Fix (17.04.2026). Commit `f757630`. → `P7_02C_CLOSURE.md` |
| P7-03 | ✅ | Client-seitiger Anonymisierungs-Worker (18.04.2026): Browser Web Worker, 10-Block-Regelwerk (~18 Regex-Regeln). 8/8 Test-Audit PASS. Commit `07576d0`. → `P7_03B_S4_ANONYMIZATION_BUILD_CLOSURE.md` |
| P7-04a | ✅ | LLM-Proxy-/Provider-Freigabe-Spec (18.04.2026): P7-04 freigabefähig unter exakt benannten Bedingungen — aktuell blockiert bis B1 (ZDR-Nachweis) geschlossen. |
| P7-04 | 🔒 | LLM-Dekodierung — blockiert (B1: Mistral-ZDR-Ticket eingereicht, Antwort ausstehend; B3: Proxy noch nicht gebaut) |
| P7-05 | 🔒 | Sichere Ausgabe/UX — blockiert (S4-UX in VW_06 nicht verifiziert) |
| P7D-01 | ✅ | Architecture Reset Freeze — Produktstruktur, Phasenlogik A–E, Kernobjekte K1–K11 (18.04.2026). → `P7D_ARCHITECTURE_RESET_FREEZE.md` |
| P7D-02 | ✅ | Discovery-Basis-Build (19.04.2026): Suche/Discovery verbessert. Commit `a32e877`. → `P7D_02_DISCOVERY_BASIS_BUILD_CLOSURE.md` |
| P7D-02b | ✅ | UI-Polish Krankheits-Lexikon (19.04.2026). Commit `dea4c36`. → `P7D_02B_UI_POLISH_CLOSURE.md` |
| P7D-03 | ✅ | S3-Freeze (19.04.2026): Studienkompass scope-scharf gefasst. → `P7D_03_S3_FREEZE.md` |
| P7D-04 | ✅ | S18 Reset/Freeze (19.04.2026): S18 strategisch neu gefasst — „Ernährung verstehen, bewerten, anwenden". → `P7D_S18_RESET_FREEZE.md` |
| P7D-04a | ✅ | S18 Clarification Patch (19.04.2026): Pakettrennung nachgezogen. → Patch auf `P7D_S18_RESET_FREEZE.md` |
| P7D-05 | ✅ | Phase-B Vollaudit (19.04.2026). → `P7D_05_PHASE_B_FULL_AUDIT.md` |
| P7D-05a | ✅ | Kanon-Reparatur (19.04.2026): P7D-03 gespiegelt, WEBSITE_PROJECT_MASTER_DOSSIER-Rolle entschärft. → `P7D_05A_CANON_REPAIR_CLOSURE.md` |
| P7D-07 | ✅ | S18 Slice 1 — Ernährungsmuster (19.04.2026): `/ernaehrung` + `/ernaehrung/muster/:slug` live. Commit `8867f79`. → `P7D_07_S18_SLICE1_CLOSURE.md` |
| P7D-07a | ✅ | S18 Slice 1 Verifikation + Doku-Sync (19.04.2026): Repo (13/13) + DB (20/20) direkt verifiziert. → `P7D_07A_S18_SLICE1_VERIFICATION_AND_DOC_SYNC.md` |
| P7D-07b | ✅ | S18 Dokument-Reconciliation (19.04.2026): `P7D_06_S18_SPEC.md` direkt verifiziert (574 Zeilen). → `P7D_07B_S18_DOC_RECONCILIATION.md` |
| P7D-08 | ✅ | Öffentliche Review-Ablage im GitHub-Repo angelegt (19.04.2026): kuratierter Mirror unter `docs/review_*`. → `docs/review_meta/INDEX.md` |

---

## Datenbank-Status (Stand: 19.04.2026)

- `supplements` → 51 Einträge (Tier 1) ✅
- `laborwerte` → 60 Einträge ✅ (12 mit Notfall-Flag)
- `krankheiten` → 221 Einträge ✅ | 216/221 mit echten Quellen | verwandte_laborwerte: 123 | verwandte_supplements: 108 | 5 dauerhaft intern: F06/L72/M13/R74/Z87
- `ernaehrungsmuster` → 4 Einträge ✅ (mediterrane-ernaehrung, dash, ballaststoffreiche-ernaehrung, eiweissbetonte-ernaehrung) | RLS aktiv
- `supplement_laborwert` → leer
- `aenderungslog` → leer

---

## Hosting-Status

- **Netlify: live und aktiv** (Stand: 19.04.2026)
- Letzter Build-Commit: `8867f79` (P7D-07, 19.04.2026). Auto-Publishing ist AN.
- Site erreichbar: https://vitalwissen.netlify.app

---

## Plattform-Säulen (18 gesamt, MVP = S1 + S2)

Empfohlene Baureihenfolge: S1/S2 → S5 → S4 → S3 → S6 → S10/11/12 → S7 → S8 → S9

Detailspezifikation aller Säulen: `docs/review_canon/VW_03_STATUS.md` und `docs/review_canon/VW_05_SAEULEN.md`

---

## Technische Hinweise (redaktiert)

### Stack-Details
- Frontend: Vite + React, Build via Netlify (Auto-Deploy bei Push auf `main`)
- DB: Supabase PostgreSQL (Frankfurt), RLS auf allen Tabellen
- Env-Vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) sind im Netlify-Dashboard gesetzt — nicht im Repo

### Bekannte Implementierungsregeln
- `@supabase/supabase-js` muss in `package.json` dependencies stehen — sonst scheitert Netlify-Build
- **CSS-Klassen-Audit vor jedem Push**: alle `className=` in JSX gegen zugehörige `.css`-Datei prüfen. Naming-Konventionen: `lw-*` (Laborwerte), `supp-*` (Supplements), `home-*` (Startseite), `ern-*` (Ernährung).
- **DB-Feldnamen sind `name_de`, nicht `name`** — Spalten immer gegen `queries.js` prüfen.
- Route-Param-Namen in `App.jsx` müssen mit `useParams()`-Keys übereinstimmen.
- Jede neue Säule braucht: eigene Route in `App.jsx`, eigenes CSS-File mit korrektem Prefix, Query-Funktion in `queries.js`, CSS-Klassen-Audit vor erstem Push.
- **Supabase-Writes**: RLS erlaubt anon key nur SELECT. DB-Writes erfordern erhöhte Rechte (Dashboard-Authentifizierung).
- **`home-hero > *`-Pattern**: max-width nie direkt auf Hero setzen wenn Hintergrund/Border volle Breite brauchen.

### Passwortschutz (Beta)
Die Site ist mit einem Client-seitigen Passwortschutz gesichert (`src/components/PasswordGate.jsx`).
Das Passwort ist im Quellcode gesetzt und wird hier nicht veröffentlicht.
Gespeichert in `sessionStorage` (gilt pro Browser-Tab-Session).

---

## Führende Dokumente (Lese-Reihenfolge)

Vollständige Lese-Reihenfolge: `docs/review_meta/READING_ORDER.md`

1. `docs/review_canon/P7D_ARCHITECTURE_RESET_FREEZE.md` — führendes Architektur-Freeze-Dokument
2. `docs/review_canon/VW_04_ENTSCHEIDUNGEN.md` — Grundsatzentscheidungen
3. `docs/review_canon/VW_03_STATUS.md` — Sprint-Status aller 18 Säulen
4. `docs/review_canon/VW_05_SAEULEN.md` — Detailspezifikation aller Säulen
5. `docs/review_canon/VW_06_WEBSITE.md` — UX / Website-Konzept
6. `docs/review_canon/VW_01_MASTER.md` — Vision, Personas, Markt
7. `docs/review_canon/VW_02_QUERSCHNITT.md` — Querschnittsthemen

Nicht führend (explizit): `docs/review_meta/NOT_LEADING.md`

---

*Redaktionsstatus: Credentials-Block vollständig entfernt. Passwort-Wert entfernt. Supabase-Zugangscode entfernt. GitHub-PAT entfernt. Öffentlich tragbar.*
*Quelle: internes CLAUDE.md (Cowork-Arbeitsordner, nicht im Repo). Letzte Quell-Aktualisierung: 19.04.2026.*
