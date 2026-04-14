# P6d-02 — Status-Sync: DB-only S5-Reparaturen

**Datum:** 14.04.2026  
**Betroffene Pakete:** P6d-01, P6d-02a, P6d-02b  
**Repo-HEAD vor diesem Commit:** `d21b725`

---

## Paketstatus

| Paket | Status |
|-------|--------|
| P6d-01 | ✅ geschlossen |
| P6d-02a | ✅ geschlossen |
| P6d-02b | ✅ geschlossen |

---

## P6d-01 — Broken-Chip-Filter (Frontend)

- `KrankheitDetail.jsx`: Filter auf `valLaborwerte` / `valSupplements` vor Render
- Broken Refs werden nicht mehr als leere Chips dargestellt
- Commit: `d21b725`

---

## P6d-02a — Supplement-Slug-Normalisierung (DB-only)

**Tabelle:** `krankheiten.verwandte_supplements`

- `vitamin-d` → `vitamin-d3` normalisiert
- Exakt 5 Krankheitszeilen geändert (M81, M05, J45, J44, N18)
- `vitamin-k2` bewusst nicht angefasst — separater Entscheidungsfall

---

## P6d-02b — LOINC-Code-Korrekturen (DB-only)

**Tabelle:** `krankheiten.verwandte_laborwerte`

| ICD-10 | Alter Code | Neuer Code | Laborwert |
|--------|-----------|-----------|-----------|
| M05 | `1988-3` | `1988-5` | CRP |
| N18 | `3094-0` | `3091-6` | Harnstoff (BUN) |

---

## Offene Restpunkte

- `vitamin-k2` — bleibt separater Entscheidungsfall
- `1914-9` (M81) — knochen-spez. ALP vs. Gesamt-ALP, klinisch offen
- `19187-1` (J45, J44) — kein Äquivalent in `laborwerte` (Spirometrie)
- `2703-7` (J44) — kein Äquivalent in `laborwerte` (pO2 / Blutgasanalyse)

---

## Ops-Hinweis

P6d-02a und P6d-02b waren DB-only Pakete ohne Repo-Codeänderung.  
Dieser Commit dient ausschließlich der Repo-Status-Synchronisierung.
