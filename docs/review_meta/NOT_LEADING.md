# VitalWissen — Nicht führende Dokumente

> Stand: 19.04.2026 | Paket: P7D-08

Diese Datei listet explizit Dokumente und Quellen, die **nicht führend** sind und bei Widersprüchen mit den führenden Dokumenten zurückstehen.

---

## Explizit nicht führend (mit Begründung)

### WEBSITE_PROJECT_MASTER_DOSSIER.md
- **Status:** Altstand (13.04.2026) — nicht führend
- **Begründung:** Enthält überholten Hosting-Status (als "offline" deklariert, war aber bereits wieder live), veraltete DB-Zahlen, vorläufige Planungsstände.
- **Zweck:** Nur als historischer Vergleich / Negativkontrolle nutzbar.
- **Ort:** Nur im internen Arbeitsordner, nicht in dieser Review-Ablage gespiegelt.
- **Bei Widerspruch:** Führende Dokumente (`P7D_ARCHITECTURE_RESET_FREEZE.md`, `VW_03_STATUS.md` etc.) haben Vorrang.

### VITALWISSEN_STRATEGIE_REASSESSMENT_2026-04-18.md
- **Status:** Delta-/Historienquelle — nicht führend
- **Begründung:** Enthält eine Zwischenbetrachtung, die durch nachfolgende Freeze-Dokumente (P7D_ARCHITECTURE_RESET_FREEZE.md) überholt wurde.
- **Ort:** Nur im internen Arbeitsordner, nicht gespiegelt.

### Frühe Due-Diligence-/Delta-Audits
- **Status:** Historisch — nicht führend
- **Beispiele:** P6B_FORENSIC_RECONCILIATION_AUDIT.md, frühe S-Build-Status-Dokumente
- **Begründung:** Diese Dokumente beschreiben Zwischenstände des Aufbaus, keine aktuellen Wahrheiten.
- **Ort:** Nur im internen Arbeitsordner, nicht gespiegelt.

### 02_PROJECT_SOURCES_ARCHIVE/
- **Status:** Archiv — nicht Teil des öffentlichen Review-Kanons
- **Enthält:** SESSION_P4_09042026.md, SESSION_P5b_10042026.md, P6D_02_STATUS.md und weitere historische Session-Logs
- **Nicht gespiegelt.**

### 03_LEGACY/
- **Status:** Veraltet — nicht Teil des öffentlichen Review-Kanons
- **Enthält:** Altes Supabase-Anbindungspaket aus frühen Phasen
- **Nicht gespiegelt.**

### 04_OPS_SQL/
- **Status:** Einmalig genutzt — nicht Teil des öffentlichen Review-Kanons
- **Enthält:** SQL-Dateien für einmalige Datenbank-Operationen
- **Nicht gespiegelt.**

### Test-/OCR-/Handout-Dateien im Arbeitsordner
- **Status:** Nicht relevant für externe Reviews
- **Beispiele:** Handout-HTML/PDF, OCR-Test-Ausgaben, TAGGING_SQL_EINMALIG.sql
- **Nicht gespiegelt.**

### WORKFLOW_README.md
- **Status:** Im Arbeitsordner vorhanden, aber NICHT gespiegelt
- **Begründung:** Enthielt Supabase Service Key (Secret) — Security-Fund verhindert Veröffentlichung.
- **Nicht gespiegelt.**

---

## Hinweis zur Nutzung

Wenn ein externes Review-Tool (z. B. ChatGPT) auf eines der oben genannten Dokumente stößt oder es zitiert, gilt: **Der aktuelle Stand ist in den führenden Dokumenten unter `review_canon/` definiert.** Altstände haben keine Entscheidungsrelevanz.

Führende Reihenfolge: → `docs/review_meta/READING_ORDER.md`
