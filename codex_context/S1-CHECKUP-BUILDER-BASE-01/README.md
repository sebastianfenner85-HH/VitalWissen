# Codex-Kontext: S1-CHECKUP-BUILDER-BASE-01

**Paket-ID:** S1-CHECKUP-BUILDER-BASE-01  
**Stand:** 2026-06-25  
**Zweck:** Kontextordner für Codex-Build — enthält Prompt, AC, Safety-Spec

---

## Ziel

Sichtbare Basis des Laborwert-/Checkup-Builders auf VitalWissen:  
- Neue Seite `/laborwerte/checkup-builder`  
- Statisch konfiguriert (kein DB-Schema, kein DB-Write)  
- Panel-Auswahl (Kleines/Großes Blutbild) + Themen-Auswahl (4 Themen)  
- Ergebnisliste mit Tier-Badges + Links zu bestehenden Laborwert-Detailseiten  
- Einstieg über CTA-Link in `LaborwerteListe.jsx`

---

## Status

Dieser Ordner ist **Kontext für den Codex-Build** — noch kein Produktcode vorhanden.

| Phase | Status |
|-------|--------|
| Prebuild-Plan | ABGESCHLOSSEN (2026-06-25) |
| Codex-Kontext (dieser Ordner) | BEREIT |
| Codex-Build (Produktcode) | NOCH NICHT AUSGEFÜHRT |

---

## Pflichtdateien in diesem Ordner

| Datei | Inhalt |
|-------|--------|
| `README.md` | Diese Datei — Überblick und Hinweise |
| `CODEX_NEXT_PROMPT.md` | Vollständiger Codex-Arbeitsauftrag |
| `ACCEPTANCE_CRITERIA.md` | AC A1–A18 (alle müssen PASS sein vor PR) |
| `SAFETY_AND_SCOPE.md` | Verboten/Erlaubt-Scope für dieses Paket |

---

## Kritische Hinweise für Codex

### Branch/PR/Go-Workflow (bindend)

Codex arbeitet **niemals direkt auf `main`**.  
Pflichtworkflow:

1. Feature-Branch erstellen: `git checkout -b feat/s1-checkup-builder-base-01`
2. Alle Änderungen committen
3. Push auf Feature-Branch: `git push origin feat/s1-checkup-builder-base-01`
4. Draft PR gegen `main` erstellen
5. Review durch ChatGPT/Sebastian
6. Merge **erst nach explizitem Go** von Sebastian oder ChatGPT

**Kein direkter Push auf `main`.  
Kein Merge ohne explizites Sebastian/ChatGPT-Go.**

### Remote-Prüfung

Vor Produktänderungen:
- `git remote get-url origin` ausführen
- Wenn `origin` fehlt: einmalig `git remote add origin https://github.com/sebastianfenner85-HH/VitalWissen.git` setzen, dann erneut prüfen
- Wenn `origin` auf ein anderes Repo zeigt: STOPP — nicht überschreiben, Befund melden
- Keine Credentials/Tokens in Ausgaben

### Kein DB/Supabase/SQL

- Kein `CREATE TABLE`, kein `ALTER TABLE`, kein `INSERT`, kein `UPDATE`
- Kein Schema-Change, kein RLS-Change
- Alle Panel-/Thema-Daten kommen ausschließlich aus `src/lib/checkup_builder_config.js`

### Tabu-Dateien (nicht anfassen)

- `src/lib/queries.js`
- `src/lib/laborwert_k3_map.js`
- `src/lib/laborwert_b4_actions_map.js`
- `src/pages/LaborwertDetail.jsx`
- `src/pages/KrankheitDetail.jsx`
- `src/components/Nav.jsx`
- `src/styles/global.css`
- Alle S2/S5/S6/S18/S4-Seiten
- Alle DB/Supabase-Dateien

---

## Repo-Referenz

| Feld | Wert |
|------|------|
| Repo | github.com/sebastianfenner85-HH/VitalWissen |
| Stack | Vite + React → Netlify, Supabase PostgreSQL |
| Letzter bekannter Merge | `c0197c4` (feature/s1-lab-list-status-ux-01) |
| DB laborwerte | 90 Einträge live (Stand 2026-06-25) |

---

*Erstellt: 2026-06-25 | Kein Code, kein DB-Write, kein Commit auf main*
