# Akzeptanzkriterien — S1-CHECKUP-BUILDER-BASE-01

**Paket-ID:** S1-CHECKUP-BUILDER-BASE-01
**Stand:** 2026-06-25
**Alle 18 AC müssen PASS sein vor Commit und PR-Erstellung.**

---

## Pflichtkriterien A1–A18

| AC | Beschreibung | Prüfmethode |
|----|-------------|------------|
| **A1** | Route `/laborwerte/checkup-builder` erreichbar, kein 404 | Browser-Aufruf |
| **A2** | Panel-Auswahl Kleines/Großes Blutbild funktioniert | Interaktion |
| **A3** | Alle 4 Themen wählbar (Entzündung / Müdigkeit / Schilddrüse / HKS) | Interaktion |
| **A4** | Ergebnisliste zeigt tier-gruppierte Werte mit Badges (standard / optional / nur_fachperson / nicht_teil_des_grossen_blutbilds) | Sichtprüfung |
| **A5** | Alle Items verlinken korrekt auf `/laborwerte/:slug` | Link-Check |
| **A6** | Deduplikation: TSH (3016-3) erscheint bei Auswahl Müdigkeit + Schilddrüse genau einmal | Interaktion + Sichtprüfung |
| **A7** | Kein Diagnose-Framing, kein „du brauchst", kein „lass bestimmen" in UI-Texten und Config-Datei | Text-Audit |
| **A8** | Disclaimer mit allen 3 Pflicht-Sätzen vorhanden und prominent | Sichtprüfung |
| **A9** | Mobile-first: Tap-Targets >= 40px, Layout <= 640px responsiv | CSS/DevTools |
| **A10** | CSS-Klassen-Audit: alle `className=` in `CheckupBuilder.jsx` sind in `CheckupBuilder.css` definiert | Grep + CSS-Review |
| **A11** | Kein DB-Write, kein Schema-Change, `queries.js` unverändert | Diff-Check |
| **A12** | Route in `App.jsx` steht VOR `/laborwerte/:code` | Code-Review |
| **A13** | Entry-Point in `LaborwerteListe.jsx` sichtbar (Link/Button "Checkup vorbereiten →") | Sichtprüfung |
| **A14** | `checkup_builder_config.js` enthält Sprach-No-Go-Kommentarblock am Dateianfang + alle 5 TIER-Konstanten (STANDARD, OPTIONAL, SPEZIAL, NUR_FACHPERSON, NICHT_TEIL_DES_GROSSEN_BLUTBILDS) | Code-Review |
| **A15** | Build-Fehler: keine (`npm run build` sauber) | Build-Log |
| **A16** | Handoff-Datei `docs/review_handoffs/S1_CHECKUP_BUILDER_BASE_01/CHATGPT_HANDOFF.md` erstellt | Datei-Prüfung |
| **A17** | Feature-Branch verwendet — kein direkter Push auf `main` | `git log --oneline main` + Branch-Check |
| **A18** | Draft PR gegen `main` erstellt und offen — kein Merge ohne Go | GitHub PR-Status |

---

## Pflicht-Disclaimer-Texte (Referenz für A8)

Folgende 3 Sätze müssen exakt (oder inhaltlich gleichwertig) in der UI stehen:

1. „Dies ist keine medizinische Empfehlung und kein Diagnose-Instrument."
2. „Welche Laborwerte im Einzelfall sinnvoll sind, entscheidet ausschließlich eine Fachperson."
3. „Die Ergebnisliste dient der Vorbereitung eines Gesprächs — nicht der Selbstdiagnose."

---

## Deduplikations-Pflicht (Referenz für A6)

Beim Zusammenführen von Panel- und Thema-Ergebnissen:
- Dedup über LOINC-Code (primär)
- Fallback: Slug
- TSH (3016-3) erscheint in Müdigkeit/Erschöpfung (standard) und Schilddrüse (standard)
- Bei Kombination: genau einmal in der Liste, tier = standard

---

## Retikulozyten-Korrektur (Referenz für A4/A5)

- Korrekte LOINC: `31112-6`, Slug: `retikulozyten`
- NICHT: `17849-1` (Altstand aus panel_demo.md — nicht in DB vorhanden)

---

## Tabu-Dateien (Referenz für A11)

Diese Dateien dürfen NICHT geändert werden:

- `src/lib/queries.js`
- `src/lib/laborwert_k3_map.js`
- `src/lib/laborwert_b4_actions_map.js`
- `src/pages/LaborwertDetail.jsx`
- `src/pages/KrankheitDetail.jsx`
- `src/components/Nav.jsx`
- `src/styles/global.css`
- Alle S2/S5/S6/S18/S4-Seiten

---

*Stand: 2026-06-25 | Alle 18 AC müssen PASS sein vor Commit*
