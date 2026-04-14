# P6C_01A_DIFF_REPORT — Curated Verified Core 5

**Paket:** P6c-01a  
**Version:** rev3  
**Erstellt:** 2026-04-14  
**Status:** READ-ONLY — kein DB-Write erfolgt  
**Scope:** E11, E03, D50, I10, F32  
**Quellen:** VITALWISSEN_CORE_BUILD_DUE_DILIGENCE.md + VITALWISSEN_CORE_BUILD_DELTA_AUDIT.md  
**DB-Verifikation:** Supabase REST API via Chrome-JS, 14.04.2026  
**Änderung rev3:** Quellen-Blocker E03 / D50 / I10 geschlossen (Browser-Navigation 14.04.2026)

---

## 1. Vorher/Nachher-Matrix pro Krankheit

### E11 — Diabetes mellitus Typ 2

| Dimension | Vorher (DB-Ist laut Audit) | Nachher (Kuratiert) | Änderung |
|-----------|---------------------------|---------------------|----------|
| slug | `diabetes-typ-2` | `diabetes-typ-2` | ✓ DB-verifiziert |
| related_labs | `2345-7`, `4548-4`, `17856-6` (broken) | `2345-7`, `4548-4` | 1 broken entfernt |
| related_supplements | `magnesium`, `vitamin-d` (broken), `omega-3` | `magnesium`, `vitamin-d3`, `omega-3` | Slug korrigiert |
| quellen | AWMF 057-001 (alte URL), DDG (generisch), MedlinePlus | AWMF 057-001 (kanonische URL) ✓, DDG offen, MedlinePlus offen | AWMF-Redirect verifiziert |
| status_labs | 2 valide + 1 broken | CLEAN | ✓ |
| status_supplements | 2 valide + 1 broken | CLEAN | ✓ |
| status_sources | PARTIAL | PARTIAL — 1 verifiziert | AWMF 057-001 ✓ |

**Kanonische AWMF-URL:** `https://www.awmf.org/leitlinien/detail/ll/057-001.html` → redirect → `https://register.awmf.org/de/leitlinien/detail/057-001` (Browser-Navigation 14.04.2026 bestätigt)

---

### E03 — Hypothyreose

| Dimension | Vorher (DB-Ist laut Audit) | Nachher rev2 | Nachher rev3 (NEU) | Änderung |
|-----------|---------------------------|-------------|-------------------|----------|
| slug | `hypothyreose` | `hypothyreose` | `hypothyreose` | ✓ DB-verifiziert |
| related_labs | `3016-3`, `3051-0` | `3016-3`, `3051-0` | `3016-3`, `3051-0` | keine |
| related_supplements | `selen`, `jod`, `vitamin-d` (broken) | `selen`, `jod`, `vitamin-d3` | `selen`, `jod`, `vitamin-d3` | Slug korrigiert (rev2) |
| quellen AWMF | generische Startseite awmf.org | null | AWMF 053-046 ✓ | **BLOCKER GESCHLOSSEN** |
| quellen DGE | generische Startseite endokrinologie.net | null | endokrinologie.net/krankheiten-schilddruese-unterfunktion.php ✓ | **BLOCKER GESCHLOSSEN** |
| status_labs | CLEAN | CLEAN | CLEAN | ✓ |
| status_supplements | 2 valide + 1 broken | CLEAN | CLEAN | ✓ |
| status_sources | OPEN (BLOCKER) | OPEN (BLOCKER) | PARTIAL — 2 verifiziert ✓ | **rev3: Blocker behoben** |

**AWMF 053-046:** `https://register.awmf.org/de/leitlinien/detail/053-046` — "S2k-Leitlinie Erhöhter TSH-Wert in der Hausarztpraxis", Version 2.4, gültig bis 31.05.2027 (Browser-Navigation 14.04.2026 bestätigt)  
**Hinweis:** Keine eigenständige AWMF-Leitlinie "Hypothyreose" existiert. AWMF 053-046 ist die nächstliegende registrierte Leitlinie für TSH-Erhöhung/Hypothyreose-Diagnostik.  
**Deutsche Ges. f. Endokrinologie e.V.:** `https://www.endokrinologie.net/krankheiten-schilddruese-unterfunktion.php` — "Schilddrüsenunterfunktion - www.endokrinologie.net", vollständige Krankheitsseite mit Symptomen/Ursachen/Diagnostik (Browser-Navigation 14.04.2026 bestätigt). Anker-Kürzel "DGE" vermieden — dieser steht in anderen Kontexten für Deutsche Gesellschaft für Ernährung.

---

### D50 — Eisenmangelanämie

| Dimension | Vorher (DB-Ist laut Audit) | Nachher rev2 | Nachher rev3 (NEU) | Änderung |
|-----------|---------------------------|-------------|-------------------|----------|
| slug | `eisemangelanaemie` (DB-Typo!) | `eisemangelanaemie` | `eisemangelanaemie` | ✓ DB-verifiziert, Typo dokumentiert |
| related_labs | `20570-8` (broken), `2601-3` (broken), `14627-4` (broken) | `[]` (leer) | `[]` (leer) | alle 3 broken entfernt (rev2) |
| related_supplements | `eisen`, `vitamin-c`, `vitamin-b12` | `eisen`, `vitamin-c`, `vitamin-b12` | `eisen`, `vitamin-c`, `vitamin-b12` | keine |
| quellen DGHO | generische Startseite dgho.de | null | DGHO Onkopedia ✓ | **BLOCKER GESCHLOSSEN** |
| status_labs | 0 valide, 3 broken | CLEAN (leer) | CLEAN (leer) | ✓ |
| status_supplements | CLEAN | CLEAN | CLEAN | ✓ |
| status_sources | OPEN (BLOCKER) | OPEN (BLOCKER) | PARTIAL — 1 verifiziert ✓ | **rev3: Blocker behoben** |

**DGHO Onkopedia-URL:** `https://www.onkopedia.com/de/onkopedia/guidelines/eisenmangel-und-eisenmangelanaemie/@@guideline/html/index.html` — "Eisenmangel und Eisenmangelanämie — Onkopedia", offizielle DGHO-Leitlinie (Browser-Navigation 14.04.2026 bestätigt)  
**Zusatzbefund Slug:** DB enthält `eisemangelanaemie` — fehlendes 'n' (sollte `eisenmangelanaemie` sein). Slug-Korrektur außerhalb P6c-01a-Scope.

---

### I10 — Bluthochdruck

| Dimension | Vorher (DB-Ist laut Audit) | Nachher rev2 | Nachher rev3 (NEU) | Änderung |
|-----------|---------------------------|-------------|-------------------|----------|
| slug | `bluthochdruck` | `bluthochdruck` | `bluthochdruck` | ✓ DB-verifiziert |
| related_labs | `2708-6` (broken), `2823-3` (valide) | `2823-3` | `2823-3` | 1 broken entfernt (rev2) |
| related_supplements | `magnesium`, `coenzym-q10`, `omega-3` | unverändert | unverändert | alle 3 valide |
| quellen ESC | generische Startseite escardio.org | null | null (nachrangig) | ESC-Anker nicht nötig |
| quellen DHL | generische Startseite hochdruckliga.de | null | hochdruckliga.de/betroffene/bluthochdruck ✓ | **BLOCKER GESCHLOSSEN** |
| status_labs | 1 valide + 1 broken | CLEAN | CLEAN | ✓ |
| status_supplements | CLEAN | CLEAN | CLEAN | ✓ |
| status_sources | OPEN (BLOCKER) | OPEN (BLOCKER) | PARTIAL — 1 verifiziert ✓ | **rev3: Blocker behoben** |

**DHL-URL:** `https://www.hochdruckliga.de/betroffene/bluthochdruck` — "Bluthochdruck bei Erwachsenen und Kindern", offizielle Patienteninformationsseite der Deutschen Hochdruckliga (Browser-Navigation 14.04.2026 bestätigt)

---

### F32 — Depression

| Dimension | Vorher (DB-Ist laut Audit) | Nachher (Kuratiert) | Änderung |
|-----------|---------------------------|---------------------|----------|
| slug | `depression` | `depression` | ✓ DB-verifiziert |
| related_labs | `[]` (leer) | `[]` (leer) | keine |
| related_supplements | `vitamin-d` (broken), `omega-3`, `magnesium` | `vitamin-d3`, `omega-3`, `magnesium` | Slug korrigiert |
| quellen | AWMF 038-013 (alte URL), DeprHilfe (Startseite) | AWMF 038-013 (kanonische URL) ✓, DeprHilfe offen | AWMF-Redirect verifiziert |
| status_labs | CLEAN (leer) | CLEAN (leer) | ✓ |
| status_supplements | 2 valide + 1 broken | CLEAN | ✓ |
| status_sources | PARTIAL | PARTIAL — 1 verifiziert | AWMF 038-013 ✓ |

**Kanonische AWMF-URL:** `https://www.awmf.org/leitlinien/detail/ll/038-013.html` → redirect → `https://register.awmf.org/de/leitlinien/detail/038-013` (Browser-Navigation 14.04.2026 bestätigt)

---

## 2. Entfernte broken LOINC-Codes

| LOINC-Code | Krankheit | Bedeutung (laut Delta-Audit) | Entfernt |
|------------|-----------|------------------------------|---------|
| `17856-6` | E11 Diabetes Typ 2 | HbA1c (alternative Version) | ✓ |
| `2708-6` | I10 Bluthochdruck | pO2 (arteriell) | ✓ |
| `20570-8` | D50 Eisenmangelanämie | Serum-Eisen (Variante) | ✓ |
| `2601-3` | D50 Eisenmangelanämie | Retikulozyten-Hämoglobin | ✓ |
| `14627-4` | D50 Eisenmangelanämie | Löslicher Transferrinrezeptor | ✓ |

**Gesamt entfernt: 5 broken LOINC-Codes**

---

## 3. Normalisierte Supplement-Slugs

| Alter Slug (broken) | Neuer Slug (valide) | Betroffene Krankheiten |
|--------------------|--------------------|------------------------|
| `vitamin-d` | `vitamin-d3` | E11, E03, F32 |

**Gesamt: 1 Slug-Fehler, 3 Krankheiten korrigiert**

---

## 4. Verifizierte Quellenanker (rev3)

| Krankheit | Anker | Kanonische URL | Verifikationsmethode |
|-----------|-------|----------------|----------------------|
| E11 | AWMF 057-001 | `https://register.awmf.org/de/leitlinien/detail/057-001` | Browser-Navigation 14.04.2026 — Redirect von alter URL bestätigt |
| E03 | AWMF 053-046 | `https://register.awmf.org/de/leitlinien/detail/053-046` | Browser-Navigation 14.04.2026 — Seite direkt aufgerufen, Titel + Gültigkeit bestätigt |
| E03 | Deutsche Ges. f. Endokrinologie e.V. | `https://www.endokrinologie.net/krankheiten-schilddruese-unterfunktion.php` | Browser-Navigation 14.04.2026 — Seite "Schilddrüsenunterfunktion" mit vollem Inhalt geladen |
| D50 | DGHO Onkopedia | `https://www.onkopedia.com/de/onkopedia/guidelines/eisenmangel-und-eisenmangelanaemie/@@guideline/html/index.html` | Browser-Navigation 14.04.2026 — Seite "Eisenmangel und Eisenmangelanämie — Onkopedia" geladen |
| I10 | DHL Hochdruckliga | `https://www.hochdruckliga.de/betroffene/bluthochdruck` | Browser-Navigation 14.04.2026 — Seite "Bluthochdruck bei Erwachsenen und Kindern" geladen |
| F32 | AWMF 038-013 | `https://register.awmf.org/de/leitlinien/detail/038-013` | Browser-Navigation 14.04.2026 — Redirect von alter URL bestätigt |

**Gesamt verifiziert: 6 exakte Quellenanker (rev3: +4 gegenüber rev2)**  
**Alle 5 Krankheiten haben mindestens 1 verifizierten Quellenanker ✓**

---

## 5. Validator-Output

### Python-Validator (`scripts/validate_p6c_verified_core.py`)

```
=================================================================
P6c-01a VALIDATOR — Curated Verified Core 5
=================================================================

[1/5] Kurationsdatei: .../data/curation/p6c_verified_core_5.json
  OK — 5 Einträge geladen

[2/5] Supabase-Verbindung prüfen ...
  Lade laborwerte (LOINC-Codes) ...

  NETZWERK-FEHLER: HTTPSConnectionPool(host='ejyrzxmtosrouwstiyws.supabase.co',
  port=443): Max retries exceeded [...] (Caused by ProxyError('Unable to connect
  to proxy', OSError('Tunnel connection failed: 403 Forbidden')))
  Hinweis: Validator benötigt Internetzugang zu Supabase.
  Ausführen über Chrome-Tab oder GitHub Actions.

EXIT_CODE: 2
```

**Python-Validator: NICHT abgeschlossen** (Sandbox ohne Netzwerkzugang, Exit 2)

### Chrome-JS-Äquivalent (identische Prüflogik, Supabase via Browser)

```json
{
  "hard_errors": [],
  "warnings": [],
  "counts": { "errors": 0, "warnings": 0 },
  "verdict": "READY_FOR_APPLY"
}
```

**DB-Basis:** 60 LOINC-Codes, 50 Supplement-Slugs, 221 Krankheiten — alle live aus Supabase geladen  
**Geprüft:** alle LOINC-Codes, alle Supplement-Slugs, alle Krankheits-Slugs + ICD-10-Codes gegen Live-DB  
**Ergebnis: 0 harte Fehler, 0 Warnungen**  
**Hinweis:** Chrome-JS-Validator wurde in rev2 (14.04.2026) ausgeführt. Kein neuer Validator-Lauf in rev3 erforderlich, da rev3 ausschließlich `url`-Felder innerhalb `sources_curated` ergänzt — kein Einfluss auf LOINC, Supplement-Slugs, Krankheits-Slugs oder Scope. Alle geprüften Dimensionen identisch zu rev2.

---

## 6. Offene Punkte (rev3)

| # | Krankheit | Punkt | Priorität |
|---|-----------|-------|-----------|
| OP-01 | E03 | AWMF 053-046 hat Titel "Erhöhter TSH-Wert in der Hausarztpraxis" — kein explizites "Hypothyreose". Kein eigenständiges AWMF-Leitlinie Hypothyreose vorhanden. | INFO |
| OP-02 | D50 | Slug-Typo in DB: `eisemangelanaemie` statt `eisenmangelanaemie` — separater Fix | MITTEL |
| OP-03 | D50 | Laborwerte leer — klinisch naheliegende LOINC-Codes (Ferritin, Serum-Eisen, Transferrinsättigung) nicht als DB-Cross-Refs hinterlegt | MITTEL |
| OP-04 | E11 | ddg.info: exakte Leitlinien-Seite finden (aktuell Startseite) | NIEDRIG |
| OP-05 | F32 | deutsche-depressionshilfe.de: exakte Seite (z.B. /erkrankungen/depression/) verifizieren | NIEDRIG |
| OP-06 | I10 | escardio.org: exakte 2023-ESH/ESC-Leitlinien-URL nicht geprüft — nachrangig | NIEDRIG |

**Alle BLOCKER (OP-01 bis OP-06 aus rev2) geschlossen. Verbleibende Punkte sind keine Blocker für APPLY.**

---

## 7. Abschlussurteil (rev3)

```
────────────────────────────────────────────────────────────────
VALIDATOR — CHROME-JS (Live-DB): 0 harte Fehler, 0 Warnungen ✓
VALIDATOR — PYTHON (Sandbox):    Exit 2, Netzwerkfehler       ✗

READY-FOR-APPLY-Bedingungen:
  ✓ Validator mit Live-DB ausgeführt (Chrome-JS, alle IDs geprüft)
  ✓ 0 harte Fehler (LOINC, Supplement-Slug, Krankheits-Slug, Scope)
  ✓ Alle 5 Slugs verifiziert (DB-Abfrage 14.04.2026)
  ✓ Kein Scope-Verstoß
  ✓ AWMF 053-046 — verifizierter exakter Anker E03
  ✓ DGE endokrinologie.net — verifizierter exakter Anker E03
  ✓ DGHO Onkopedia — verifizierter exakter Anker D50
  ✓ DHL hochdruckliga.de — verifizierter exakter Anker I10
  ✓ AWMF 057-001 — verifizierter exakter Anker E11 (seit rev2)
  ✓ AWMF 038-013 — verifizierter exakter Anker F32 (seit rev2)

URTEIL: READY FOR APPLY

Alle 5 Krankheiten haben mindestens 1 verifizierten exakten
Quellenanker. Alle Cross-Refs (LOINC, Slugs) sind sauber und
DB-valide. Offene Punkte sind keine APPLY-Blocker.
────────────────────────────────────────────────────────────────
```

---

*Ende des Reports — P6c-01a Read-only, rev3, 14.04.2026*
