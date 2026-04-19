# VitalWissen — Synchronisationsregeln für die Review-Ablage

> Stand: 19.04.2026 | Paket: P7D-08

Diese Regeln gelten für jede künftige Aktualisierung der `docs/review_*`-Ablage.

---

## Grundregeln

### 1. Nur nach akzeptierten Paketen synchronisieren
Änderungen an der Review-Ablage sind nur dann zulässig, wenn ein Paket explizit abgeschlossen und freigegeben wurde. Kein spekulatives Vorab-Spiegeln von in-progress-Dokumenten.

### 2. Führende Dokumente aktuell halten
Wenn sich ein führendes Dokument (`VW_03_STATUS.md`, `P7D_ARCHITECTURE_RESET_FREEZE.md` etc.) durch ein neues Paket ändert, muss die gespiegelte Version in `review_canon/` nachgezogen werden.

### 3. Relevante neue Package-Dokumente ergänzen
Nach jedem abgeschlossenen Paket: prüfen, ob neue Closure-/Spec-/Freeze-Dokumente in `review_packages/` oder `review_audits/` aufgenommen werden sollen.

### 4. Veraltete Package-Dateien nicht automatisch weitertragen
Superseded Pakete müssen nicht aktiv aus `review_packages/` entfernt werden, aber sie dürfen nicht als führend bezeichnet werden. Bei echter Obsoleszenz kann die Datei entfernt oder mit einem Deprecation-Hinweis versehen werden.

### 5. Nie Secrets publizieren
**Hardregel — keine Ausnahme:**
- Keine Tokens
- Keine API-Keys (weder Supabase Anon Key noch Service Key)
- Keine GitHub-PATs
- Keine DB-Passwords oder -URLs mit Credentials
- Keine Dashboard-Session-Token-Hinweise, die nicht ohnehin öffentlich bekannt sind
- Keine App-Passwörter (Password-Gate)
- Keine E-Mail-Adressen mit kontogebundenen Passwörtern

**Vor jedem Push:** grep-Scan der zu committenden Dateien auf bekannte Secret-Muster.

### 6. CLAUDE_PUBLIC.md immer redaktieren
`docs/review_canon/CLAUDE_PUBLIC.md` ist die einzige öffentliche Spiegelung des internen `CLAUDE.md`. Sie muss immer:
- vollständig frei von Credentials sein
- den aktuellen Projektstand wiedergeben
- bei jeder CLAUDE.md-Aktualisierung nachgezogen werden (wenn die Änderungen öffentlich tragbar sind)

### 7. Jede Spiegelung im Paket-Closure dokumentieren
Wenn eine Review-Ablage-Aktualisierung Teil eines Pakets ist, muss sie im Ops-Status des Pakets aufgeführt sein:
- welche Dateien neu/geändert
- was gespiegelt wurde
- was bewusst ausgelassen wurde
- Security-Befunde (ohne Secret-Werte)

### 8. Kein Vollspiegel des Arbeitsordners
Folgende Verzeichnisse und Dateitypen dürfen nie automatisch gespiegelt werden:
- `00_REPO/` (Git-Clones)
- `02_PROJECT_SOURCES_ARCHIVE/` (historische Logs)
- `03_LEGACY/` (veraltete Pakete)
- `04_OPS_SQL/` (einmalige SQL-Operationen)
- Test-/OCR-/Handout-Dateien
- `WORKFLOW_README.md` (enthielt Secret, bleibt gesperrt)
- `WEBSITE_PROJECT_MASTER_DOSSIER.md` (Altstand, nicht führend)

---

## Security-Audit-Checkliste (vor jedem Push)

```
□ grep -rn "(sb_secret|github_pat_|eyJhbGc)" docs/review_*/
□ Kein App-Passwort (Password-Gate) als Klartext enthalten?
□ Keine DB-URL mit Passwort enthalten?
□ Keine Netlify/Mistral/sonstigen API-Keys enthalten?
□ CLAUDE_PUBLIC.md: vollständig redaktiert?
□ SOURCE_MAPPING.md: aktuell?
□ INDEX.md / LATEST_STATE.md: aktuell?
```

Wenn einer der Checks schlägt an: **nicht pushen**, Datei reparieren oder ausschließen.
