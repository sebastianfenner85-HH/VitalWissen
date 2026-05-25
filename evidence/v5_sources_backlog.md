# VitalWissen v5 — Quellen-Backlog

**Stand:** 25.05.2026 · Commit `cc8fcb3`  
**Quelle:** maschinell abgeleitet aus `quality_gate_raw_counts.json`  
**Zweck:** Arbeitsgrundlage für den separaten Quellenpflege-Strang  

> Diese Datei dokumentiert offene Quellenlücken. Sie ist read-only im
> Evidence-Pack-Strang — Änderungen erfolgen ausschließlich im Quellenpflege-Strang
> nach erneutem Validator-Lauf.

---

## 1. Supplements ohne Quellenlink (15 von 51)

Export-abgeleitete Liste — direkt aus `vitalwissen_datenabzug_2026-05-25_v5.md`.

| # | Supplement | Priorität-Hinweis |
|---|---|---|
| 1 | BCAA | Aminosäure-Gruppe, NIH ODS verfügbar |
| 2 | L-Arginin | NIH ODS verfügbar |
| 3 | L-Glutamin | NIH ODS verfügbar |
| 4 | NAC (N-Acetylcystein) | NIH ODS verfügbar |
| 5 | Taurin | NIH ODS verfügbar |
| 6 | CLA (Konjugierte Linolsäure) | NIH ODS verfügbar |
| 7 | MCT-Öl | keine direkte NIH-ODS-Seite — Alternativquelle nötig |
| 8 | Silizium | Alternativquelle nötig (EFSA/BfR) |
| 9 | Berberin | kein NIH ODS — Primärliteratur/EFSA |
| 10 | Quercetin | kein NIH ODS — Primärliteratur |
| 11 | Resveratrol | NIH ODS verfügbar |
| 12 | Alpha-Liponsäure | kein NIH ODS — Primärliteratur |
| 13 | Beta-Glucan | NIH ODS verfügbar |
| 14 | Hyaluronsäure | kein NIH ODS — EFSA/Primärliteratur |
| 15 | NADH | kein NIH ODS — Primärliteratur |

**Hinweis Report-Abweichung:** Die Offenliste im `v5_link_validation_report.md`
enthält fälschlich Echinacea, Ginkgo Biloba und Mariendistel (haben URLs) und
vergisst NAC (hat keine URL). Diese Abweichung ist als C7/C7b dokumentiert und
betrifft nur den Report-Text, nicht den Export. Die obige Liste ist export-korrekt.

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

**Nächster Schritt:** Für jeden Eintrag Ersatzquelle recherchieren (AWMF/IQWiG),
DB-Update via Supabase, anschließend neuer Validator-Lauf.

---

## 3. Bare Domains — semantisch unsicher (3)

URLs zeigen nur auf Hauptdomains ohne spezifischen Inhaltspfad.

| ICD | Name | Problem |
|---|---|---|
| `M05` | Rheumatoide Arthritis | URL = bare domain, kein Pfad zur spezifischen Quelle |
| `I10` | Bluthochdruck | URL = bare domain |
| `K58` | Reizdarmsyndrom | URL = bare domain |

**Nächster Schritt:** Spezifische Quellenunterseite ermitteln und URL im DB-Eintrag
auf vollständigen Pfad aktualisieren.

---

## 4. URL-Status unklar (3)

Live-Prüfung ergab keinen eindeutigen Status.

| ICD | Name |
|---|---|
| `R51` | Kopfschmerzen |
| `R10` | Bauchschmerzen |
| `T14` | Verstauchung |

**Nächster Schritt:** Erneute manuelle Prüfung der URLs.

---

## 5. Krankheiten dauerhaft intern (5) — kein Handlungsbedarf

Diese 5 Einträge haben keine öffentlich verlinkbare Quelle. Status dauerhaft
dokumentiert, kein Quellenpflege-Bedarf:

| ICD | Begründung |
|---|---|
| `F06` | ICD-Spezifität zu gering für Quellenanker |
| `L72` | Nur interne Fachquellen verfügbar |
| `M13` | Nur interne Fachquellen verfügbar |
| `R74` | Laborwert-Grenzfall, kein eigenständiger Quellenanker |
| `Z87` | Anamnese-Kode, kein klinischer Quellenanker |

---

## 6. Offener fachlicher Review

| Punkt | Status |
|---|---|
| Vitamin-D LOINC-Fachreview (FULL_AUDIT_2026-05) | ❌ offen — separater Klärungsbedarf |

---

*Abgeleitet aus `quality_gate_raw_counts.json` (SHA256: `022cc84cbd4db4cf`).
Kein DB-Write. Kein Deploy. Evidence Pack in evidence/ im Repo persistiert.*
