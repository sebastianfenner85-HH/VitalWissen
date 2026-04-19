# VitalWissen — Öffentlicher Review-Canon: INDEX

> Stand: 19.04.2026 | Paket: P7D-08

---

## 1. Zweck dieser Review-Ablage

Dieser `docs/review_*`-Bereich ist eine **kuratierte, öffentlich tragbare Spiegelung** der führenden Projektdokumente von VitalWissen. Er wurde angelegt, damit externe Reviewers (z. B. ChatGPT oder andere KI-Tools) künftige Prüfungen direkt gegen:

- die Live-Seite (https://vitalwissen.netlify.app)
- den echten Repo-Code
- aktuelle, bereinigte Projektquellen

durchführen können — ohne Zugriff auf den internen Arbeitsordner.

**Wichtig:** Dies ist KEIN vollständiger Spiegel des Arbeitsordners. Es ist eine gezielt kuratierte, sicherheitsgeprüfte Auswahl.

---

## 2. Was ist führend?

| Dokument | Rang | Zweck |
|----------|------|-------|
| `review_canon/P7D_ARCHITECTURE_RESET_FREEZE.md` | **Führend (1)** | Produktstruktur, Phasenlogik A–E, Kernobjekte, Querschichten |
| `review_canon/VW_04_ENTSCHEIDUNGEN.md` | **Führend (2)** | Getroffene Grundsatzentscheidungen + Begründungen |
| `review_canon/VW_03_STATUS.md` | **Führend (3)** | Sprint-Status aller 18 Säulen, offene Punkte |
| `review_canon/VW_05_SAEULEN.md` | **Führend (4)** | Detailspezifikation aller 18 Säulen |
| `review_canon/VW_06_WEBSITE.md` | **Führend (5)** | UX, Navigation, Website-Konzept |
| `review_canon/VW_01_MASTER.md` | Wichtig | Vision, Positionierung, Personas, Markt |
| `review_canon/VW_02_QUERSCHNITT.md` | Wichtig | Querschnittsthemen (AEO, Gender, Qualität) |
| `review_canon/CLAUDE_PUBLIC.md` | Kontext | Redaktiertes Projektkontextdokument |

---

## 3. Was ist sekundär / historisch?

Explizit nicht führend: → `review_meta/NOT_LEADING.md`

- `WEBSITE_PROJECT_MASTER_DOSSIER.md` = Altstand (13.04.2026), historischer Vergleich, keine Entscheidungsgrundlage
- frühe Due-Diligence-/Delta-Audits = historisch, nicht führend
- `VITALWISSEN_STRATEGIE_REASSESSMENT_2026-04-18.md` = Delta-/Historienquelle, nicht führend
- Archiv-/Legacy-Dokumente = nicht gespiegelt

---

## 4. Aktuelle Lese-Reihenfolge

→ `review_meta/READING_ORDER.md` (vollständig)

Kurzfassung:
1. `P7D_ARCHITECTURE_RESET_FREEZE.md`
2. `VW_04_ENTSCHEIDUNGEN.md`
3. `VW_03_STATUS.md`
4. `VW_05_SAEULEN.md`
5. `VW_06_WEBSITE.md`
6. aktuelle Package-Dokumente unter `review_packages/`

---

## 5. Live-URL und Repo

- **Live-Site:** https://vitalwissen.netlify.app
- **Repo (public):** https://github.com/sebastianfenner85-HH/VitalWissen
- **Passwort (Beta-Gate):** nicht hier dokumentiert

---

## 6. Letzter verifizierter Produktstand

- **Letzter Commit:** `8867f79` — P7D-07: S18 Slice 1 (Ernährungsmuster-Übersicht + Detailseite)
- **Letzter Review-Ablage-Commit:** P7D-08 (dieser Push, 19.04.2026)
- **DB-Stand:** supplements=51, laborwerte=60, krankheiten=221, ernaehrungsmuster=4
- **Live-Bereiche:** S1 (Supplements), S2 (Laborwerte), S4 (Arztbrief/beta), S5 (Krankheits-Lexikon), S18-Slice1 (Ernährungsmuster)

---

## 7. Nächster zulässiger Schritt

- S18 Slice 2 (`P7D_06_S18_SPEC.md` als Spec-Grundlage) — eigenständiger Chat
- S6-Freeze — eigenständiger Chat
- P7-04b (LLM-Proxy) — blockiert bis Mistral-ZDR-Antwort

---

## 8. Security- und Redaction-Regel

**Kein Secret, kein Token, kein API-Key, kein Passwort wird in dieser Review-Ablage veröffentlicht.**

- `CLAUDE_PUBLIC.md` ist die einzige Spiegelung von `CLAUDE.md` — vollständig redaktiert
- `WORKFLOW_README.md` ist nicht gespiegelt (enthielt Supabase Secret Key)
- Jede künftige Synchronisation muss vor dem Push security-geprüft werden
- Details: `review_meta/SYNC_RULES.md`

---

## 9. Hinweis: kein Vollspiegel des Arbeitsordners

Der interne Arbeitsordner enthält:
- `00_REPO/` — Git-Clones (nicht gespiegelt)
- `02_PROJECT_SOURCES_ARCHIVE/` — historische Logs (nicht gespiegelt)
- `03_LEGACY/` — veraltete Pakete (nicht gespiegelt)
- `04_OPS_SQL/` — einmalige SQL-Operationen (nicht gespiegelt)
- diverse Test-/OCR-/Handout-Dateien (nicht gespiegelt)

Diese Ablage enthält nur: `review_canon/`, `review_packages/`, `review_audits/`, `review_meta/`.
