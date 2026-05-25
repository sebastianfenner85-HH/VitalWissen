# evidence/ — VitalWissen Datenabzug v5 · Quality Gate

**Stand:** 25.05.2026  
**Letzter Commit:** `cc8fcb3`  
**Gesamtfreigabe:** ❌ NEIN — Report/Export-Inkonsistenz + offene URL-Befunde  

---

## Inhalt dieses Ordners

Alle 8 Dateien sind maschinell abgeleitet oder direkt aus dem Produktionsdatenbestand
extrahiert. Kein manuell eingetragener Wert ohne Quellenbeleg.

### Quelldateien (Eingabe für Validator)

| Datei | Inhalt | SHA256 (16 Zeichen) |
|---|---|---|
| `vitalwissen_datenabzug_2026-05-25_v5.md` | Kanonischer Vollexport: 60 LW · 51 Supplements · 221 Krankheiten | `4a597254dfd748be` |
| `vitalwissen_datenabzug_2026-05-25_v5_link_validation_report.md` | Link-Validierung: Live-Status + Offenlisten | `bfce3ab5a4a274cf` |
| `vitalwissen_datenabzug_2026-05-25_v5_semantic_review.md` | Semantische Prüfung: bare domains + ICDs | `da3ee2eb5709fd7d` |
| `vitalwissen_datenabzug_2026-05-25_v5_url_inventory.csv` | URL-Inventar: 257 Zeilen (221 Krankheiten + 36 Supplements) | `842eec50b388fe24` |

### Artefakte (Ausgabe des Validators)

| Datei | Inhalt | SHA256 (16 Zeichen) |
|---|---|---|
| `quality_gate_raw_counts.json` | Maschinenlesbare Rohdaten: alle abgeleiteten Zählungen + 17 Konsistenzprüfungen | `022cc84cbd4db4cf` |
| `quality_gate_findings.csv` | 44 Befundzeilen: `kategorie` + `status` (PASS/FAIL/WARN) | `c8a3c8f012962474` |
| `vitalwissen_datenabzug_2026-05-25_quality_gate.md` | Human-lesbarer Quality-Gate-Report (Sections A–I) | `e202f1526563a22b` |
| `quality_gate_validator.py` | Validator v2.0 — erzeugt alle 3 Artefakte in einem Lauf | `9e4c5f2a27e0f7b8` |

---

## Gesamtstatus

| Prüfebene | Ergebnis |
|---|---|
| Export-Struktur (LW/SUPP/KRANK) | ✅ 60/51/221 — SOLL erfüllt |
| Konsistenzprüfungen | ✅ 14/17 OK · ❌ 3 ABWEICHUNG (Supplement-Offenliste) |
| Defekte URLs | ❌ 6 Krankheiten (Q20/J38/M81/O10/N39/N41) |
| Bare Domains | ❌ 3 Krankheiten (M05/I10/K58) — semantisch unsicher |
| URL-Status unklar | ⚠️ 3 Krankheiten (R51/R10/T14) |
| Supplements ohne URL | ⚠️ 15/51 (siehe v5_sources_backlog.md) |
| Krankheiten ohne URL | ⚠️ 77 (excl. 5 dauerhaft intern) |
| Medizinisch-fachlich | ❌ Vitamin-D LOINC-Fachreview offen |
| **Gesamtfreigabe** | **❌ NEIN** |

---

## Offene Punkte (nächster Strang)

Die v5-Daten sind **export-technisch nutzbar** — Struktur und Zählungen korrekt.
Gesamtfreigabe bleibt blockiert durch:

1. **3 Report/Export-Inkonsistenzen** (Supplement-Offenliste im Link-Report):
   Echinacea/Ginkgo/Mariendistel fälschlich gelistet · NAC fehlt
2. **6 defekte URLs** → Quellenrecherche + DB-Update nötig
3. **3 bare domains** → spezifische Pfade ergänzen
4. **15 Supplements ohne URL** → siehe v5_sources_backlog.md
5. **Vitamin-D LOINC-Fachreview** → fachliche Prüfung ausstehend

Diese Punkte werden im separaten **Quellenpflege-Strang** adressiert.
Keine Änderung an v5-Artefakten ohne neuen Validator-Lauf.

---

## Validator neu ausführen

```bash
python3 quality_gate_validator.py \
  --workspace "/path/to/VitalWissen : Arbeitsordner"
```

Erzeugt alle 3 Artefakte (JSON + CSV + MD) synchronisiert in einem Lauf.
Validator v2.0 — Keine DB-Writes, kein Deploy.
