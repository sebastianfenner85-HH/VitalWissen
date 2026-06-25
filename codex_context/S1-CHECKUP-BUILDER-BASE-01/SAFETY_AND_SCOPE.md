# Safety & Scope — S1-CHECKUP-BUILDER-BASE-01

**Paket-ID:** S1-CHECKUP-BUILDER-BASE-01
**Stand:** 2026-06-25
**Bindend für Codex und alle Review-Schritte**

---

## VERBOTEN (Hard Stop — sofort abbrechen wenn verstoßen)

### Inhalt / Sprache

| Verboten | Begründung |
|----------|-----------|
| „Du brauchst diesen Wert" | Diagnose-/Therapie-Framing |
| „Lass diesen Wert bestimmen" | Implizite Handlungsanweisung ohne Kontext |
| „Diagnostiziert X" / „Deutet auf X hin" | Kein Diagnose-Instrument |
| Neue Grenz- oder Zielwerte setzen | Nur bestehende DB-Werte referenzieren |
| Therapieempfehlungen jeder Art | Außerhalb Produktscope |
| Selbstdiagnose-Framing | Verletzt Disclaimer-Pflicht |

### Technik / Infrastruktur

| Verboten | Begründung |
|----------|-----------|
| DB-Write / INSERT / UPDATE | Statische Config — kein DB-Zugriff |
| Schema-Change / ALTER TABLE / CREATE TABLE | Kein DB-Schema für dieses Paket |
| Supabase-Write jeder Art | Gleich wie DB-Write |
| SQL-Datei anlegen oder ausführen | Kein DB-Scope |
| Direkter Push auf `main` | Branch/PR/Go-Pflicht |
| Merge ohne explizites Sebastian/ChatGPT-Go | Review vor Merge |
| Secrets / PAT / Tokens in Dateien oder Ausgaben | Sicherheitspflicht |
| Credentials in Commit, PR-Body, Dateiinhalt, Clone-URL | Sicherheitspflicht |
| Netlify CLI Deploy / manueller Deploy | Kein manueller Deploy |
| Änderung an Tabu-Dateien (s. ACCEPTANCE_CRITERIA.md) | Scope-Grenze |

---

## ERLAUBT (Scope dieses Pakets)

### Neue Dateien (Create)

| Datei | Typ |
|-------|-----|
| `src/lib/checkup_builder_config.js` | Statische JS-Config (TIER: STANDARD, OPTIONAL, SPEZIAL, NUR_FACHPERSON, NICHT_TEIL_DES_GROSSEN_BLUTBILDS) |
| `src/pages/CheckupBuilder.jsx` | React-Komponente |
| `src/pages/CheckupBuilder.css` | CSS (Prefix `cb-*`) |
| `docs/review_handoffs/S1_CHECKUP_BUILDER_BASE_01/CHATGPT_HANDOFF.md` | Docs/Handoff |

### Geänderte Dateien (Modify — minimal)

| Datei | Erlaubte Änderung |
|-------|-----------------|
| `src/App.jsx` | Route `/laborwerte/checkup-builder` vor `/laborwerte/:code` einfügen + Import |
| `src/pages/LaborwerteListe.jsx` | CTA-Link „Checkup vorbereiten →" im Header-Bereich ergänzen |
| `src/styles/Laborwerte.css` | Klasse `lw-checkup-link` (3–5 Zeilen) ergänzen |

### Workflow

| Erlaubt | Bedingung |
|---------|----------|
| Feature-Branch erstellen | `feat/s1-checkup-builder-base-01` |
| Commit auf Feature-Branch | Nach AC-1 bis AC-18 PASS |
| Push auf Feature-Branch | Nicht auf main |
| Draft PR gegen main erstellen | Kein Auto-Merge |
| Netlify Deploy Preview (automatisch durch PR) | Kein Production Deploy — Preview ≠ Production |

---

## Erlaubte Sprache / Formulierungen

| Erlaubt | Kontext |
|---------|---------|
| „Kann sinnvoll sein zu besprechen" | Standard-Tier-Werte |
| „Optionaler Zusatzwert" | Optional-Tier |
| „Spezialwert / nur nach fachlicher Einordnung" | Nur-Fachperson-Tier |
| Kategorie `nicht_teil_des_grossen_blutbilds` | Werte außerhalb großes Blutbild — kein Diagnose-Framing |
| „Zur Gesprächsvorbereitung" | Framing für Gesamtbuilder |
| Verlinkung auf bestehende Laborwert-Detailseiten | Über Slug |

---

## Pflicht-Disclaimer (muss in UI erscheinen)

1. „Dies ist keine medizinische Empfehlung und kein Diagnose-Instrument."
2. „Welche Laborwerte im Einzelfall sinnvoll sind, entscheidet ausschließlich eine Fachperson."
3. „Die Ergebnisliste dient der Vorbereitung eines Gesprächs — nicht der Selbstdiagnose."

---

## Remote/Umgebungs-Regeln

| Situation | Reaktion |
|-----------|---------|
| `origin` fehlt | Einmalig `git remote add origin` setzen, dann erneut prüfen |
| `origin` auf falsches Repo | STOPP — nicht überschreiben |
| Working Tree unerwartet dirty | STOPP — Befund melden |
| Kontext-Ordner fehlt | STOPP — BLOCKED_MISSING_CONTEXT melden |
| Auth fehlt oder unzureichend | STOPP — PAT nie in URL/Ausgabe schreiben |

---

*Stand: 2026-06-25 | Bindend für Codex, ChatGPT-Review und Sebastian-Freigabe*
