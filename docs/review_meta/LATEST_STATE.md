# VitalWissen — Aktueller Projektstand

> Stand: 19.04.2026 | Paket: P7D-08

---

## Datum und Gesamtstatus

- **Datum:** 19.04.2026
- **Projektstatus:** Phase-B-Freeze abgeschlossen; erste Bauten gestartet (S4, S5, S18 Slice 1); Phase-C noch nicht systematisch geöffnet
- **Review-Ablage-Stand:** P7D-08 initial erstellt

---

## Aktuell live

| Bereich | Route | Status |
|---------|-------|--------|
| S1 — Laborwerte | `/laborwerte`, `/laborwerte/:code` | ✅ live |
| S2 — Supplements | `/supplements`, `/supplements/:slug` | ✅ live |
| S4 — Arztbrief (beta) | `/arztbrief` | ✅ live (hinter Password-Gate) |
| S5 — Krankheits-Lexikon | `/krankheiten`, `/krankheiten/:slug` | ✅ live |
| S18 Slice 1 — Ernährungsmuster | `/ernaehrung`, `/ernaehrung/muster/:slug` | ✅ live |

---

## Letzter verifizierter Build-Commit

- **Commit:** `8867f79`
- **Paket:** P7D-07 — S18 Slice 1 (Ernährungsmuster-Übersicht + Detailseite)
- **Datum:** 19.04.2026
- **Branch:** `main`
- **Netlify Auto-Deploy:** AN

---

## Letzter verifizierter Docs-/Audit-Stand

- **P7D-07b** (19.04.2026) — S18 Dokument-Reconciliation abgeschlossen
- `P7D_06_S18_SPEC.md` direkt verifiziert (574 Zeilen, vollständige S18-Spec)
- DB-Belege (4 Rows, RLS, anon SELECT Policy) via Live-SQL verifiziert
- **P7D-08** (19.04.2026) — diese Review-Ablage

---

## Aktuelle Blocker

| ID | Blocker | Status |
|----|---------|--------|
| B1 | Mistral-ZDR-Nachweis (Datenschutzkonformität) | 🔒 Ticket eingereicht, Antwort ausstehend |
| B2 | P7-04 (LLM-Dekodierung) | 🔒 Blockiert bis B1 geschlossen |
| B3 | Proxy noch nicht gebaut | 🔒 Abhängig von B1 |
| B4 | P7-05 (Sichere Ausgabe/UX) | 🔒 Blockiert (S4-UX in VW_06 nicht verifiziert) |

---

## S4-Blocker (Arztbrief)

S4 ist produktiv in Phase: `Text-Paste + PDF-Text-Layer + Scan-OCR + Anonymisierung` (P7-02 bis P7-03 abgeschlossen).

**Nächster S4-Schritt (P7-04: LLM-Dekodierung) ist blockiert:**
- B1: Mistral-ZDR-Nachweis ausstehend
- B3: Proxy noch nicht gebaut

Die Spezifikation für P7-04 liegt vor (`P7_04A_S4_LLM_PROXY_RELEASE_SPEC.md`). Es fehlt die Freigabe-Voraussetzung B1.

---

## S18-Stand (Ernährung)

- **Slice 1** (Ernährungsmuster): ✅ live — 4 Einträge, RLS aktiv, S5-Crosslinks verifiziert
- **Slice 2** (Nährstoffe): 📋 Spec vorhanden (`P7D_06_S18_SPEC.md`), noch nicht gebaut
- **Nächster Schritt:** S18 Slice 2 als eigenständiger Chat, Spec als Grundlage

---

## Nächster zulässiger Schritt

Priorität (je eigenständiger Chat):
1. **S18 Slice 2** — Nährstoffe (`P7D_06_S18_SPEC.md` als Spec)
2. **S6 Folgepaket** — Scope noch offen, eigenständiger Chat erforderlich
3. **P7-04b** — LLM-Proxy (erst nach Mistral-ZDR-Antwort)

---

## DB-Angaben (soweit öffentlich tragbar)

Konkrete DB-Credentials und Zugangsdaten werden hier nicht veröffentlicht.

Tabellenstand (Zeilenzahlen, kein Schema):
- `supplements`: 51 Einträge
- `laborwerte`: 60 Einträge
- `krankheiten`: 221 Einträge
- `ernaehrungsmuster`: 4 Einträge
- `supplement_laborwert`: leer
- `aenderungslog`: leer
