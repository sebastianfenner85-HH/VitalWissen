# Q2-BUILD-02c-P2A — Closure: S2 NIH-ODS Top-10 Quellenlücken

**Paketname:** Q2-BUILD-02c-P2A — S2 NIH-ODS Top-10 Quellenlücken  
**Typ:** DB-only (kein Frontend, kein Code, kein Build-Commit, kein Deploy); Doku-Sync über Commit `821d44a`  
**Datum:** 06.05.2026  
**Status:** ✅ ABGESCHLOSSEN  
**Führende Basis:** `Q2_BUILD_02C_S2_QUELLENBOX_CLOSURE.md` · `Q2_BUILD_02C_01_SCHEMA_NIH_BOOTSTRAP_SPEC.md`

---

## A. Scope

Schließung der NIH-ODS-Importlücken für exakt 10 Supplements:

| Slug | Fact-Sheet |
|------|------------|
| `vitamin-b1` | Thiamin |
| `vitamin-b2` | Riboflavin |
| `vitamin-b3` | Niacin |
| `vitamin-b5` | Pantothensäure |
| `biotin` | Biotin |
| `kalium-supplement` | Potassium |
| `chrom` | Chromium |
| `kupfer` | Copper |
| `mangan` | Manganese |
| `l-carnitin` | Carnitine |

**Nicht-Scope:** NCCIH-Supplements (5), P3-Supplements (10), Frontend, Code, Commit, Deploy.

---

## B. Preflight — Hard-Stop-Prüfung

| Check | Ergebnis |
|-------|----------|
| `supplements.quellen` JSONB, DEFAULT `'[]'` | ✅ |
| `supplements.nih_ods_link` VARCHAR | ✅ |
| Alle 10 Slugs gefunden | ✅ count=10 |
| Alle 10 haben `quellen = []` | ✅ |
| Alle 10 haben `nih_ods_link = null` | ✅ |
| Gesamtzahl Supplements = 51 | ✅ |

**Kein Hard Stop ausgelöst.**

---

## C. Entscheidung: `typ`-Wert

**Datenvertrag (Cowork-Auftrag):** `"typ": "nih_ods"` (lowercase)  
**Bestehende 21 Einträge:** `"typ": "NIH ODS"` (Klartext)  
**Rendering:** `SupplementDetail.jsx` Zeile 171 rendert `q.typ` direkt als sichtbaren Text

**Entscheidung:** `"typ": "NIH ODS"` verwendet — konsistent mit bestehenden 21 Einträgen, verhindert UI-Inkonsistenz ("nih_ods" vs. "NIH ODS" als sichtbaren Text).

**Abweichung vom Datenvertrag-Literal dokumentiert** — `quellen_typ: "database"` korrekt gesetzt (das ist das UI-steuernde Feld für Chip-Styling).

**Maschinenkey-Normalisierung (`"nih_ods"` lowercase) ist ein eigenes Paket, nicht P2A.** Wenn `q.typ` zukünftig als Maschinenkey genutzt werden soll (z.B. für i18n oder Filterlogik), muss `SupplementDetail.jsx` Zeile 171 gleichzeitig angepasst und alle bestehenden JSONB-Einträge migriert werden — das ist ein koordinierter Schritt (Frontend + DB), der nicht in einem DB-only-Paket liegen darf. Bis dahin gilt `"NIH ODS"` als bestehende S2-Anzeigekonvention.

**NCCIH-Supplements (Melatonin/Echinacea/Ginkgo/Mariendistel/Rhodiola) sind nicht automatisch der nächste Schritt.** Vor P2B ist eine separate Typentscheidung nötig: NCCIH-Quellen haben einen anderen institutionellen Charakter als NIH-ODS-Fact-Sheets. Quellentyp und Beschreibungstext müssen eigenständig definiert werden (eigenständiger Chat, eigenständiger Auftrag).

---

## D. DB-Write

Ein einziger UPDATE-Statement für beide Felder (`nih_ods_link` + `quellen`) via CASE/WHEN, RETURNING-Verifikation:

```sql
UPDATE supplements
SET
  nih_ods_link = CASE slug
    WHEN 'vitamin-b1'        THEN 'https://ods.od.nih.gov/factsheets/Thiamin-HealthProfessional/'
    WHEN 'vitamin-b2'        THEN 'https://ods.od.nih.gov/factsheets/Riboflavin-HealthProfessional/'
    WHEN 'vitamin-b3'        THEN 'https://ods.od.nih.gov/factsheets/Niacin-HealthProfessional/'
    WHEN 'vitamin-b5'        THEN 'https://ods.od.nih.gov/factsheets/PantothenicAcid-HealthProfessional/'
    WHEN 'biotin'            THEN 'https://ods.od.nih.gov/factsheets/Biotin-HealthProfessional/'
    WHEN 'kalium-supplement' THEN 'https://ods.od.nih.gov/factsheets/Potassium-HealthProfessional/'
    WHEN 'chrom'             THEN 'https://ods.od.nih.gov/factsheets/Chromium-HealthProfessional/'
    WHEN 'kupfer'            THEN 'https://ods.od.nih.gov/factsheets/Copper-HealthProfessional/'
    WHEN 'mangan'            THEN 'https://ods.od.nih.gov/factsheets/Manganese-HealthProfessional/'
    WHEN 'l-carnitin'        THEN 'https://ods.od.nih.gov/factsheets/Carnitine-HealthProfessional/'
  END,
  quellen = CASE slug ... END
WHERE slug IN (...)
RETURNING slug, nih_ods_link, jsonb_array_length(quellen), quellen->0->>'url';
```

**RETURNING-Ergebnis:** 10 Rows, alle `quellen_count=1`, alle `url_check = nih_ods_link`.

---

## E. Validatoren

| Validator | Erwartet | Ergebnis | Status |
|-----------|----------|----------|--------|
| V1: Gesamtzahl Supplements | 51 | 51 | ✅ |
| V2: Supplements mit `quellen`-Einträgen | 31 (war 21 +10) | 31 | ✅ |
| V3: Supplements mit `quellen = []` | 20 (war 30 -10) | 20 | ✅ |
| V4: Alle 10 mit `nih_ods_link` gesetzt | 10 | 10 | ✅ |
| V5: Alle 10 mit `quellen_count = 1` | 10 | 10 | ✅ |
| V6: Leere URLs in neuen 10 | 0 | 0 | ✅ |
| V7: `quellen_typ = 'database'` für alle neuen | 10 | 10 | ✅ |
| V8: Stichprobe `biotin` | korrekte JSONB-Struktur | `{typ:"NIH ODS", name:"...", url:"https://ods.od.nih.gov/factsheets/Biotin-HealthProfessional/", quellen_typ:"database", beschreibung:"Basis-Monographie"}` | ✅ |

**Alle 8 Validatoren direkt bestätigt.**

---

## F. Ops-Closure

| Dimension | Status |
|-----------|--------|
| DB-Write | JA — UPDATE 10 Rows (nih_ods_link + quellen), Dashboard-JWT |
| Kein Frontend-Touch | ✅ |
| Kein Code-Touch | ✅ |
| Kein Code-/Build-Commit | ✅ (DB-only; Doku-Sync `821d44a`) |
| Kein Deploy | ✅ |
| Offener Side Effect | NEIN |
| Supabase-Stabilität | Projekt aktiv, alle Queries erfolgreich |

---

## G. Offene Punkte nach P2A

| Punkt | Empfehlung |
|-------|------------|
| 20 Supplements mit `quellen = []` verbleibend | P2B: 5× NCCIH (Melatonin/Echinacea/Ginkgo/Mariendistel/Rhodiola) + 5× P2-Kandidaten — je eigenständiger Chat |
| 10 P3-Supplements (kein E28-konformer Link) | Vorerst leer lassen |

*Erstellt: 06.05.2026 — Q2-BUILD-02c-P2A ✅ abgeschlossen. DB-Write: 10 UPDATE-Rows. Kein Code, kein Build-Commit, kein Deploy. Doku-Sync: Commit `821d44a`.*
