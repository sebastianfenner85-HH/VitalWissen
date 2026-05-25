# evidence/ — VitalWissen Datenabzug v5 · Quality Gate

**Stand:** 25.05.2026  
**Letzter Commit:** `b1e2a7c`  
**Gesamtfreigabe:** ❌ NEIN — Report/Export-Inkonsistenz + offene URL-Befunde  

---

## Ordnerinhalt

### 8 Evidence-Pack-Kerndateien

Alle maschinell abgeleitet oder direkt aus dem Produktionsdatenbestand extrahiert.
Kein manuell eingetragener Wert ohne Quellenbeleg.

**Quelldateien (Eingabe für Validator):**

| Datei | Inhalt |
|---|---|
| `vitalwissen_datenabzug_2026-05-25_v5.md` | Vollexport: 60 LW · 51 Supplements · 221 Krankheiten |
| `vitalwissen_datenabzug_2026-05-25_v5_link_validation_report.md` | Link-Validierung: Live-Status + Offenlisten |
| `vitalwissen_datenabzug_2026-05-25_v5_semantic_review.md` | Semantische Prüfung: bare domains + ICDs |
| `vitalwissen_datenabzug_2026-05-25_v5_url_inventory.csv` | URL-Inventar: 257 Zeilen (221 Krankheiten + 36 Supplements) |

**Artefakte (Ausgabe des Validators):**

| Datei | Inhalt |
|---|---|
| `quality_gate_raw_counts.json` | Maschinenlesbare Rohdaten: Zählungen + 17 Konsistenzprüfungen |
| `quality_gate_findings.csv` | 44 Befundzeilen: `kategorie` + `status` (PASS/FAIL/WARN) |
| `vitalwissen_datenabzug_2026-05-25_quality_gate.md` | Human-lesbarer Quality-Gate-Report (Sections A–I) |
| `quality_gate_validator.py` | Validator v2.0 — erzeugt alle 3 Artefakte in einem Lauf |

### Ergänzende Dokumentationsdateien

| Datei | Inhalt |
|---|---|
| `README.md` | Diese Datei — Ordner-Navigation |
| `v5_sources_backlog.md` | Offene Quellenlücken — reines Befund-Inventar |
| `ARTIFACT_INVENTORY_2026-05-25.md` | Vollständiges Artefakt-Inventar: kanonisch / Working-Copy / Legacy / Orphan |

---

## Gesamtstatus

| Prüfebene | Ergebnis |
|---|---|
| Export-Struktur (LW/SUPP/KRANK) | ✅ 60/51/221 — SOLL erfüllt |
| Konsistenzprüfungen | ✅ 14/17 OK · ❌ 3 ABWEICHUNG (Supplement-Offenliste) |
| Defekte URLs | ❌ 6 Krankheiten (Q20/J38/M81/O10/N39/N41) |
| Bare Domains | ❌ 3 Krankheiten (M05/I10/K58) — semantisch unsicher |
| URL-Status unklar | ⚠️ 3 Krankheiten (R51/R10/T14) |
| Supplements ohne URL | ⚠️ 15/51 — siehe `v5_sources_backlog.md` |
| Krankheiten ohne URL | ⚠️ 77 (excl. 5 dauerhaft intern) |
| Medizinisch-fachlich | ❌ Vitamin-D LOINC-Fachreview offen |
| **Gesamtfreigabe** | **❌ NEIN** |

v5 ist **export-technisch nutzbar** (Struktur + Zählungen korrekt).
Gesamtfreigabe bleibt blockiert — Details in `v5_sources_backlog.md`.

---

## Validator neu ausführen

```bash
python3 quality_gate_validator.py \
  --workspace "/path/to/VitalWissen : Arbeitsordner"
```

Erzeugt alle 3 Artefakte (JSON + CSV + MD) synchronisiert in einem Lauf.
Validator v2.0 — Keine DB-Writes, kein Deploy.
