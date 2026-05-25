# VitalWissen v5 — Quellen-Backlog

**Stand:** 25.05.2026 · Commit `cc8fcb3`  
**Quelle:** maschinell abgeleitet aus `quality_gate_raw_counts.json`  
**Zweck:** Dokumentation offener Quellenlücken aus dem Quality Gate  

> Diese Datei ist ein reines Befund-Inventar.
> Keine Quellenverfügbarkeitsbehauptungen. Keine Apply-Anweisung. Keine DB-Writes.
> Jede Maßnahme erfordert einen separaten, explizit freigegebenen Auftrag.

---

## 1. Supplements ohne Quellenlink (15 von 51)

Export-abgeleitete Liste — direkt aus `vitalwissen_datenabzug_2026-05-25_v5.md`.

| # | Supplement |
|---|---|
| 1 | BCAA |
| 2 | L-Arginin |
| 3 | L-Glutamin |
| 4 | NAC (N-Acetylcystein) |
| 5 | Taurin |
| 6 | CLA (Konjugierte Linolsäure) |
| 7 | MCT-Öl |
| 8 | Silizium |
| 9 | Berberin |
| 10 | Quercetin |
| 11 | Resveratrol |
| 12 | Alpha-Liponsäure |
| 13 | Beta-Glucan |
| 14 | Hyaluronsäure |
| 15 | NADH |

**Hinweis Report-Abweichung:** Die Offenliste im `v5_link_validation_report.md`
enthält fälschlich Echinacea, Ginkgo Biloba und Mariendistel (haben URLs) und
vergisst NAC (hat keine URL). Diese Abweichung ist als C7/C7b im Quality Gate
dokumentiert. Die obige Liste ist export-korrekt.

---

## 2. Krankheiten mit defekten URLs (6)

URLs waren zum Zeitpunkt 25.05.2026 nicht erreichbar oder wurden in v5 entfernt.

| ICD | Name | Befund |
|---|---|---|
| `Q20` | Angeborener Herzfehler | v4-URL war 404 — in v5 entfernt |
| `J38` | Heiserkeit | v4-URL war 404 — in v5 entfernt |
| `M81` | Osteoporose | Domain nicht erreichbar (25.05.2026) |
| `O10` | Schwangerschaftshypertonie | v4-URL war 404 — in v5 entfernt |
| `N39` | Harnwegsinfektion | v4-URL war 404 — in v5 entfernt |
| `N41` | Prostatitis | v4-URL war 404 — in v5 entfernt |

---

## 3. Bare Domains — semantisch unsicher (3)

URLs zeigen nur auf Hauptdomains ohne spezifischen Inhaltspfad.

| ICD | Name |
|---|---|
| `M05` | Rheumatoide Arthritis |
| `I10` | Bluthochdruck |
| `K58` | Reizdarmsyndrom |

---

## 4. URL-Status unklar (3)

Live-Prüfung ergab keinen eindeutigen Status.

| ICD | Name |
|---|---|
| `R51` | Kopfschmerzen |
| `R10` | Bauchschmerzen |
| `T14` | Verstauchung |

---

## 5. Krankheiten dauerhaft intern (5) — kein Quellenpflege-Bedarf

| ICD | Begründung |
|---|---|
| `F06` | ICD-Spezifität zu gering für Quellenanker |
| `L72` | Kein öffentlicher Quellenanker — nur intern |
| `M13` | Kein öffentlicher Quellenanker — nur intern |
| `R74` | Laborwert-Grenzfall, kein eigenständiger Quellenanker |
| `Z87` | Anamnese-Kode, kein klinischer Quellenanker |

---

## 6. Offener fachlicher Review

| Punkt | Status |
|---|---|
| Vitamin-D LOINC-Fachreview (FULL_AUDIT_2026-05) | ❌ offen |

---

*Abgeleitet aus `quality_gate_raw_counts.json` (SHA256: `022cc84cbd4db4cf`).
Keine DB-Writes. Kein Deploy. Evidence Pack in evidence/ im Repo persistiert.*
