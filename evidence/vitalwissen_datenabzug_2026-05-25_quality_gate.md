# VitalWissen — Quality Gate

**Erstellt:** 25.05.2026
**Methode:** Maschinell abgeleitet aus `quality_gate_validator.py`
**Quelle:** `quality_gate_raw_counts.json`
**Geprüfte Dateien:** v5.md · v5_link_validation_report.md · v5_semantic_review.md · v5_url_inventory.csv

> **Grundregel:** Jede Zahl in diesem Dokument stammt direkt aus `quality_gate_raw_counts.json`.
> Keine manuell eingetragenen Werte. Keine Freigabe ohne maschinellen Beleg.

---

## A. Grundregeln — Unveränderlich

1. Kein PASS ohne maschinelle Ableitung aus den geprüften Dateien.
2. Keine Gesamtfreigabe, solange eine Abweichung im Validator besteht.
3. Jede Zahl in diesem Dokument muss in `quality_gate_raw_counts.json` auffindbar sein.
4. Keine CSV-Findings, die nicht aus JSON/Validator ableitbar sind.
5. Dieses Dokument wird vollständig neu erzeugt wenn der Validator erneut ausgeführt wird.

---

## B. Geprüfte Quelldateien (SHA256)

| Datei | SHA256 | Größe Bytes | gelesen |
|---|---|---:|---|
| `vitalwissen_datenabzug_2026-05-25_v5.md` | `4a597254dfd748bee78563f742ce8596…` | 72,991 | ✅ |
| `vitalwissen_datenabzug_2026-05-25_v5_link_validation_report.md` | `bfce3ab5a4a274cf4bc5304be1a93497…` | 30,683 | ✅ |
| `vitalwissen_datenabzug_2026-05-25_v5_semantic_review.md` | `da3ee2eb5709fd7d0f505108429d96f9…` | 3,945 | ✅ |
| `vitalwissen_datenabzug_2026-05-25_v5_url_inventory.csv` | `842eec50b388fe24505b93cc84af33fd…` | 30,714 | ✅ |

---

## C. Validator-Ergebnis

**Prüfungen gesamt:** 17  
**OK:** 14  
**ABWEICHUNGEN:** 3  
**Gesamtverdikt: FAIL — Report/Export-Inkonsistenz besteht weiterhin**

| Check | Erwartet | Ist | Verdikt |
|---|---|---|---|
| LW Soll vs Export | 60 | 60 | ✅ OK |
| Supplements Soll vs Export | 51 | 51 | ✅ OK |
| Krankheiten Soll vs Export | 221 | 221 | ✅ OK |
| Krankheiten gesamt: Report-Zusammenfassung vs Export | 221 | 221 | ✅ OK |
| Supplements ohne URL: Report-Zusammenfassung vs Export | 15 | 15 | ✅ OK |
| Supplements mit URL: Report-Zusammenfassung vs Export | 36 | 36 | ✅ OK |
| Supplements ohne URL: Report-Offenliste Anzahl vs Report-Zusammenfassu… | 15 | 17 | ❌ ABWEICHUNG |
| Report-Offenliste: keine Items mit URL fälschlich enthalten | [] | ['Echinacea (export: Echinacea)', 'Ginkgo (export: Ginkgo … | ❌ ABWEICHUNG |
| Report-Offenliste: keine Items ohne URL vergessen | [] | ['NAC (N-Acetylcystein)'] | ❌ ABWEICHUNG |
| Krankheiten ✅ live: Report-Zusammenfassung vs Export | 133 | 133 | ✅ OK |
| Krankheiten ⚠️ bare domain: Report-Zusammenfassung vs Export | 3 | 3 | ✅ OK |
| Krankheiten ❌ defekt: Report-Zusammenfassung vs Export | 6 | 6 | ✅ OK |
| Krankheiten ⚠️ intern: Report-Zusammenfassung vs Export | 5 | 5 | ✅ OK |
| Semantisch unsicher ICDs: Report vs Semantic Review | ['I10', 'K58', 'M05'] | ['I10', 'K58', 'M05'] | ✅ OK |
| URL Inventory Krankheiten-Zeilen vs SOLL | 221 | 221 | ✅ OK |
| URL Inventory Supplement-Zeilen vs Export Supplements mit URL | 36 | 36 | ✅ OK |
| Krankheiten ohne verlinkte Quelle: Report vs Export (nicht verlinkt + … | 77 | 77 | ✅ OK |

---

## D. Export-abgeleitete Zählungen (aus v5.md)

| Metrik | Ist | SOLL |
|---|---:|---:|
| Laborwerte | 60 | 60 |
| Supplements | 51 | 51 |
| Krankheiten | 221 | 221 |
| Krankheiten ✅ live + passend | 133 | — |
| Krankheiten ❌ defekte URL | 6 | — |
| Krankheiten ⚠️ bare domain | 3 | — |
| Krankheiten ⚠️ URL unklar | 3 | — |
| Krankheiten ⚠️ dauerhaft intern | 5 | — |
| Krankheiten ohne verlinkbare Quelle (excl. intern) | 77 | — |
| Supplements mit URL | 36 | — |
| Supplements ohne URL | 15 | — |

**Vollständigkeitsprüfung:**
133 (live) + 6 (defekt) + 3 (bare) + 3 (unklar) + 5 (intern) + 71 (nicht verlinkt) = **221** (SOLL: 221)

---

## E. Abweichungen — Maschinell belegt

Alle 3 Abweichungen betreffen ausschließlich die Supplement-Offenliste im `v5_link_validation_report.md`.
Die Report-Zusammenfassung (Supplements ohne URL: 15) stimmt mit dem Export überein.

### Abweichung 1: Supplements ohne URL: Report-Offenliste Anzahl vs Report-Zusammenfassung
- **Erwartet** (v5_link_report Zusammenfassung): `15`
- **Ist** (v5_link_report Offene Punkte): `17`

### Abweichung 2: Report-Offenliste: keine Items mit URL fälschlich enthalten
- **Erwartet** (v5_export (mit URL)): `[]`
- **Ist** (v5_link_report Offene Punkte): `['Echinacea (export: Echinacea)', 'Ginkgo (export: Ginkgo Biloba)', 'Mariendistel (export: Mariendistel)']`

### Abweichung 3: Report-Offenliste: keine Items ohne URL vergessen
- **Erwartet** (v5_export (ohne URL)): `[]`
- **Ist** (v5_link_report Offene Punkte): `['NAC (N-Acetylcystein)']`

---

## F. Defekte und unsichere URLs (aus v5.md)

### F.1 Defekte URLs (❌)

| ICD | Name | Status |
|---|---|---|
| `Q20` | Angeborener Herzfehler | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| `J38` | Heiserkeit | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| `M81` | Osteoporose | ❌ URL defekt — Domain nicht erreichbar (2026-05-25) |
| `O10` | Schwangerschaftshypertonie | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| `N39` | Harnwegsinfektion | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| `N41` | Prostatitis | ❌ URL defekt — v4-URL war 404, entfernt in v5 |

### F.2 Bare Domains (⚠️ semantisch unsicher)

| ICD | Name |
|---|---|
| `M05` | Rheumatoide Arthritis |
| `I10` | Bluthochdruck |
| `K58` | Reizdarmsyndrom |

### F.3 URL live-Status unklar (⚠️)

| ICD | Name |
|---|---|
| `R51` | Kopfschmerzen |
| `R10` | Bauchschmerzen |
| `T14` | Verstauchung |

---

## G. Supplements ohne Quellenlink (aus v5.md)

Export-abgeleitete Liste (15 Einträge):

- BCAA
- L-Arginin
- L-Glutamin
- NAC (N-Acetylcystein)
- Taurin
- CLA (Konjugierte Linolsäure)
- MCT-Öl
- Silizium
- Berberin
- Quercetin
- Resveratrol
- Alpha-Liponsäure
- Beta-Glucan
- Hyaluronsäure
- NADH

> Die Report-Offenliste weicht ab (17 statt 15) — Echinacea/Ginkgo/Mariendistel fälschlich gelistet, NAC fehlt.
> Diese Abweichung ist als Befund C7/C7b dokumentiert.

---

## H. Freigabe-Status (maschinell abgeleitet)

| Freigabedimension | Status | Bedingung | Beleg |
|---|---|---|---|
| Export-technisch (Struktur) | ✅ JA | LW=60/SUPP=51/KRANK=221 | JSON meta |
| Live-Link-Freigabe | ❌ NEIN | 6 defekte + 3 bare domain + 3 unklar offen | JSON export_derived |
| Semantik-Freigabe | ❌ NEIN | 3 bare domains ohne spezifischen Pfad | JSON export_derived |
| Quellenstatus Supplements | ⚠️ BEDINGT | 15/51 ohne URL | JSON export_derived |
| Quellen-Vollständigkeit | ❌ NEIN | 77 Krankheiten ohne URL (excl. intern) | JSON export_derived |
| Report-Konsistenz | ❌ NEIN | 3 Abweichung(en) — alle in Offenliste | JSON consistency_checks |
| Medizinisch-fachlich | ❌ NEIN | Vitamin-D LOINC-Fachreview offen (FULL_AUDIT_2026-05) | nicht in JSON |
| **GESAMTFREIGABE** | **❌ NEIN** | | |

---

## I. Schlussprüfung (J-Tabelle)

| Prüfung | Ergebnis |
|---|---|
| JSON neu erzeugt nach Validator-Änderung | JA |
| CSV aus JSON/Validator ableitbar | JA |
| Markdown nur aus JSON/CSV abgeleitet | JA |
| Keine Header-Artefakte wie `ICD` | JA — gefiltert via ICD-Regex (D1) |
| Keine doppelten defekten URL-ICDs | JA — nur Fehler-Liste Section (D2) |
| Gesamtfreigabe bleibt NEIN | JA — 3 Abweichung(en) offen |

---

*Konsistenzprüfungen: 17 gesamt — 14 OK, 3 ABWEICHUNG(en). Gesamtfreigabe: NEIN.*

*Erzeugt von quality_gate_validator.py v2.0 — 25.05.2026. Keine DB-Writes. Kein Commit. Kein Push. Kein Deploy.*
