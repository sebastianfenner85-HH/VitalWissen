# Artefakt-Inventar — VitalWissen Datenabzug v5

**Erstellt:** 25.05.2026  
**Commit bei Erstellung:** `b1e2a7c`  
**Methode:** Direkter Dateivergleich (SHA256) + git-Prüfung  

> **Grundregel:** Kein Artefakt wird ohne separaten, explizit freigegebenen
> Auftrag gelöscht, verschoben oder umbenannt. Dieser Strang dokumentiert nur.

---

## A. Kanonische Evidence-Dateien (in `evidence/` im Repo)

Stand `cc8fcb3` — alle 8 Kerndateien present, SHA256 verifiziert.

### A.1 Quelldateien (Eingabe für Validator)

| Datei | SHA256 (16 Zeichen) | Größe |
|---|---|---|
| `vitalwissen_datenabzug_2026-05-25_v5.md` | `4a597254dfd748be` | 72.991 Bytes |
| `vitalwissen_datenabzug_2026-05-25_v5_link_validation_report.md` | `bfce3ab5a4a274cf` | 30.683 Bytes |
| `vitalwissen_datenabzug_2026-05-25_v5_semantic_review.md` | `da3ee2eb5709fd7d` | 3.945 Bytes |
| `vitalwissen_datenabzug_2026-05-25_v5_url_inventory.csv` | `842eec50b388fe24` | 30.714 Bytes |

### A.2 Artefakte (Ausgabe des Validators)

| Datei | SHA256 (16 Zeichen) | Größe |
|---|---|---|
| `quality_gate_raw_counts.json` | `022cc84cbd4db4cf` | 22.795 Bytes |
| `quality_gate_findings.csv` | `c8a3c8f012962474` | 5.240 Bytes |
| `vitalwissen_datenabzug_2026-05-25_quality_gate.md` | `e202f1526563a22b` | 7.562 Bytes |
| `quality_gate_validator.py` | `9e4c5f2a27e0f7b8` | 46.436 Bytes |

### A.3 Ergänzende Dokumentationsdateien (ab Commit `b1e2a7c`)

| Datei | Inhalt |
|---|---|
| `README.md` | Ordner-Navigation, Status-Überblick, Validator-Aufruf |
| `v5_sources_backlog.md` | Offene Quellenlücken — reines Befund-Inventar |
| `ARTIFACT_INVENTORY_2026-05-25.md` | Diese Datei |

---

## B. Lokale Working-Copies (Workspace-Root — nicht im Repo)

Entstanden als Arbeitsverzeichnis während der Evidence-Pack-Erstellung.
SHA256 identisch mit `evidence/` — keine inhaltliche Abweichung.

| Datei | SHA256-Match mit evidence/ |
|---|---|
| `vitalwissen_datenabzug_2026-05-25_v5.md` | ✅ identisch |
| `vitalwissen_datenabzug_2026-05-25_v5_link_validation_report.md` | ✅ identisch |
| `vitalwissen_datenabzug_2026-05-25_v5_semantic_review.md` | ✅ identisch |
| `vitalwissen_datenabzug_2026-05-25_v5_url_inventory.csv` | ✅ identisch |
| `vitalwissen_datenabzug_2026-05-25_quality_gate.md` | ✅ identisch |
| `quality_gate_findings.csv` | ✅ identisch |
| `quality_gate_raw_counts.json` | ✅ identisch |
| `quality_gate_validator.py` | ✅ identisch |

**Status:** Redundant, aber harmlos. Bereinigung erfordert separaten Auftrag.

---

## C. Legacy-/Altversionen (Workspace-Root — nicht im Repo)

Vorversionen des Datenabzugs aus der Entwicklungshistorie. Nicht in `evidence/`,
nicht im Repo. Inhalt und SHA256 nicht gegen evidence/ geprüft.

| Datei | Größe | Einordnung |
|---|---|---|
| `vitalwissen_datenabzug_2026-05-25.md` | 41.770 Bytes | Ungev. Frühversion (v1 oder v2) |
| `vitalwissen_datenabzug_2026-05-25_v3.md` | 67.362 Bytes | Exportversion v3 — überholt |
| `vitalwissen_datenabzug_2026-05-25_v4.md` | 66.638 Bytes | Exportversion v4 — überholt |
| `vitalwissen_datenabzug_2026-05-25_v4_validation_report.md` | 4.721 Bytes | v4-Validierungsreport — überholt |

**Status:** Nicht gelöscht. Bereinigung erfordert separaten Auftrag.

---

## D. Orphan-Dateien im Workspace-Root

Closure-Dokumente, die im Workspace-Root liegen statt in `01_PROJECT_SOURCES_CURRENT/`.
Nicht im Repo. Inhalt nicht geprüft.

| Datei | Erwarteter Ort |
|---|---|
| `S18_BUILD_03_S5_TO_S18_CROSSLINK_CLOSURE.md` | `01_PROJECT_SOURCES_CURRENT/` |
| `VW_AUDIT_18_VOLLBERICHT_22042026.md` | `01_PROJECT_SOURCES_CURRENT/` oder `02_PROJECT_SOURCES_ARCHIVE/` |

**Status:** Nicht gelöscht, nicht verschoben. Bereinigung erfordert separaten Auftrag.

---

## E. Abgrenzung: Was dieser Strang NICHT tut

- Keine Löschung alter Artefakte (B, C, D)
- Keine Verschiebung von Orphan-Dateien (D)
- Keine Korrektur von Quellen
- Keine Supabase-Änderung
- Keine App-Code-Änderung
- Keine Netlify-Änderung
- Keine neue Exportversion
- Keine Doppelpflege-Aktualisierung (CLAUDE.md, AUDIT_CANON, ACTIVE_STRANDS)

Alle oben genannten Punkte erfordern jeweils einen separaten, explizit
freigegebenen Auftrag im eigenen Chat.

---

*Inventar erstellt 25.05.2026. Keine DB-Writes. Kein Deploy.
Evidence Pack in evidence/ im Repo persistiert (HEAD b1e2a7c).*
