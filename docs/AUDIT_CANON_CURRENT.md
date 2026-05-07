# AUDIT_CANON_CURRENT — VitalWissen Projektkanon (Schnellzugriff)

**Stand:** 07.05.2026 (Q2-MAPPING-PATCH)  
**Typ:** Meta-Datei — Verdichtung, kein Ersatz für Einzeldokumente  
**Pflege:** Bei jedem Paket-Abschluss mitziehen  

---

## 1. ZWECK UND GELTUNG

Diese Datei ist die **Audit-Einstiegsdatei** für Claude, GPT und externe Reviewer. Sie verdichtet den aktuellen Projektstand, die Source-of-Truth-Hierarchie, die führenden Entscheidungen und die aktiven No-Gos auf eine lesbare Seite.

**Was diese Datei IST:**
- Schnellzugriff auf Kanon-Hierarchie und Gesamtstand
- Verdichtung für Kontextweitergabe (z. B. neuer Chat, GPT-Session)
- Pflicht-Bestandteil jeder Doppelpflege ab 21.04.2026

**Was diese Datei NICHT IST:**
- Ersatz für Einzeldokumente (Freeze-, Spec-, Closure-, Status-Dateien)
- Bindende operative Entscheidungsgrundlage (dafür immer Einzeldokument lesen)
- Archiv (nur Ist-Stand, keine Historik)

---

## 2. SOURCE-OF-TRUTH-HIERARCHIE

Wenn Dokumente widersprechen, gilt folgende Priorität:

| Priorität | Dokument | Führend für |
|-----------|----------|-------------|
| 1 | Aktives Strang-Dokument (neuestes Freeze/Closure/Status je Paket) | Paket-spezifischer IST-Stand |
| 2 | `VW_03_STATUS.md` | Operativer Sprint-Status aller Säulen |
| 3 | `VW_04_ENTSCHEIDUNGEN.md` | Getroffene Grundsatzentscheidungen |
| 4 | `P7D_ARCHITECTURE_RESET_FREEZE.md` | Architektur, Kernobjekte, Querschichten, Phasenlogik |
| 5 | `VW_05_SAEULEN.md` | Säulen-Scope und Datenlogik |
| 6 | `VW_06_WEBSITE.md` | Website-Konzept, Einstiegspfade, UX-Logik |
| 7 | `CLAUDE.md` | Projektkontext, Stack, Credentials, Verhaltensregeln |
| 8 | Ältere Audit-/Dossier-Dateien | Nur als Historik, nicht führend |

**Goldene Regel:** Neuere operative Freeze-/Closure-Dateien überschreiben ältere Zusammenfassungen. `WEBSITE_PROJECT_MASTER_DOSSIER.md` und frühes Strategie-Reassessment (18.04.2026) sind **nicht führend** für aktuelle Zahlen und Architekturentscheidungen — diese sind durch `P7D_ARCHITECTURE_RESET_FREEZE.md` und operative Closure-Dokumente abgelöst.

**Widersprüche:** Diese Datei darf Widersprüche nicht glätten, sondern muss sie markieren. Bei Widerspruch: Einzeldokument lesen und diesen Stand hier korrigieren.

---

## 3. AKTUELLER GESAMTSTAND (07.05.2026 — Q2-MAPPING-PATCH)

### Live-Module

| Säule | Status | DB-Einträge | Letzter Commit |
|-------|--------|-------------|----------------|
| S1 Laborwert-Lexikon | ✅ Live + **S1-BUILD-01 (24.04.2026):** Zielwert-Block V3, 8 neue DB-Felder, 5 Pilot-Werte. + **S1-BUILD-01b (24.04.2026):** LDL Microcopy. + **S1-BUILD-01c (25.04.2026):** LDL Zielwert-Klarstellung. + **Q2-BUILD-02d (07.05.2026): LwQuellenBox** — Typ-Chip (database), Region-Flag, Name-Link, Jahr, max-2-expand. Block [4b] ersetzt. Leer-Guard: 55 nicht-pilot LW unberührt. Mobile Q6 ✅. Kein DB-Write. Commit `fab4374`. Schließt FULL_AUDIT_2026-05 Befund #3. | 60 Laborwerte (5 mit `zielwerte`) | `fab4374` (Q2-BUILD-02d) |
| S2 Supplement-Kompass | ✅ Live + **Q2-BUILD-02c (06.05.2026):** supplements.quellen JSONB live, SuppQuellenBox, 21 NIH-ODS-Quellen, PubMed-Key-Fix. **Q2-BUILD-02c-P2A (06.05.2026):** +10 NIH-ODS-Lücken geschlossen (B-Vitamine/Mineralien/L-Carnitin). **31/51 Supplements mit quellen.** | 51 Supplements (31 mit quellen) | `e496dbe` (Q2-BUILD-02c + P2A — kein Build-Commit; Doku-Sync `821d44a`→`e496dbe`) |
| S5 Krankheits-Lexikon | ✅ Live + **Q2-BUILD-02a (24.04.2026): Quellenbox-Komponente** + **Q2-MAPPING-PATCH (07.05.2026): `research`-Eintrag in QUELLEN_TYP** (violett-grau, kein CSS-Touch) | 221 Krankheiten (216/221 echte Quellen) | `27b3fb6` (Q2-MAPPING-PATCH) |
| S4 Arztbrief-Decoder | ✅ Beta Freeze | kein DB-Touch | `519f2d9` (P7-05) |
| S6 Medikamenten-Erklärer | ✅ **Q2-BUILD-02b (06.05.2026):** MedQuellenBox live. + **Q2-MAPPING-PATCH (07.05.2026): `patient_info`-Eintrag in MED_QUELLEN_TYP** (teal, kein CSS-Touch) | 50 Wirkstoffe | `27b3fb6` (Q2-MAPPING-PATCH) |
| S18 Ernährungskompass | ✅ **S18-Build-05 abgeschlossen (23.04.2026)** — Alle 4 Kernobjekte vollständig: K8a Nährstoffe (41) + K8b Lebensmittel (24) + K8c Muster (4) + K8d Zusatzstoffe (35) | 4 Muster + 41 Nährstoffe + 24 Lebensmittel + **35 Zusatzstoffe** | `9941a3f` (S18-Build-05) |
| S8 B4 Nächste Schritte | ✅ **B4-SAFETY-PATCH abgeschlossen (07.05.2026):** 18 Karten (HbA1c/Ferritin/VitD/CRP) mit `safetyLevel` + `requiresDoctorDiscussion` nachgerüstet. 1 Datei, 36 Insertions, 0 Deletions. Schließt FULL_AUDIT_2026-05 Befund #2 (KRITISCH-MED). B4-BUILD-03 entsperrt. Vorgänger: B4-BUILD-02 (25.04.2026) — LDL-Journey K3→B4 live (8 high + 1 low Karten, 15-Felder-Schema, 17/17 PASS). | `naechste_schritte` JSONB (5 Krankheiten) | `8f19256` (B4-SAFETY-PATCH) |

### DB-Tabellen (23.04.2026)

| Tabelle | Einträge | RLS | Hinweis |
|---------|----------|-----|---------|
| `laborwerte` | 60 | ✅ | 12 mit Notfall-Flag; **+8 neue Felder (S1-BUILD-01):** `zielwerte` JSONB, `ref_*_quelle_url/_jahr ×3`, `letzte_aktualisierung`; 5 Pilot-Werte mit `zielwerte` befüllt |
| `supplements` | 51 | ✅ | inkl. vitamin-k2; `kategorie` 7 distinct; **`wofuer` 51/51 gefüllt** (S2-02A); **`quellen` JSONB live: 31/51 mit NIH-ODS-Quellen** (Q2-BUILD-02c: 21 + P2A: 10), 20 noch leer |
| `krankheiten` | 221 | ✅ | 5 dauerhaft intern (F06/L72/M13/R74/Z87); **`naechste_schritte` JSONB: 5 befüllt, 216 leer** (S8-BUILD-01) |
| `ernaehrungsmuster` | 4 | ✅ | Public-Read-Policy |
| `naehrstoffe` | 41 | ✅ | anon read-only; 4 Kategorien (14 Vitamine, 12 Mineralstoffe, 6 Makronährstoffe, 9 Pflanzenstoffe) |
| `wirkstoffe` | 50 | ✅ | anon read-only; 19 mit supp_interaktionen; 7 distinct filter_tags, 50/50 befüllt |
| **`lebensmittel`** | **24** | ✅ | S18-Build-04 (23.04.2026) — 10 Kategorien, 3 Indizes, anon read; 1 Eintrag mit wechselwirkungen (grapefruit: Simvastatin+Amlodipin) |
| **`zusatzstoffe`** | **35** | ✅ | **NEU (S18-Build-05, 23.04.2026)** — 7 Kategorien, 3 Indizes, anon read; ~12 Einträge mit hinweise_vorsicht (nur regulatorisch belegt) |
| `supplement_laborwert` | 0 | ✅ | noch nicht befüllt |
| `aenderungslog` | 0 | ✅ | — |

### Repo & Hosting

- Letzter Commit auf `main`: `27b3fb6` (Q2-MAPPING-PATCH, 07.05.2026) — Vorgänger: `fab4374` (Q2-BUILD-02d)
- Netlify: Auto-Publishing AN, live unter `https://vitalwissen.netlify.app`
- GitHub: `sebastianfenner85-HH/VitalWissen` (public)
- MISTRAL_API_KEY: in Netlify gesetzt (Production, S4-Proxy)

### Architektur-Phasenzuordnung

| Phase | Bezeichnung | Inhalt | Status |
|-------|-------------|--------|--------|
| Phase A | Grundlage | Basis-Frontend, S1/S2 live | ✅ Abgeschlossen |
| Phase B | Kernplattform stabilisieren | S5, S4 Beta, S6 Slice 1, S18 Slice 1, Discovery-Basis | 🟡 In Arbeit |
| Phase C | Tiefe + Vernetzung | S3, S8, S10-S12, S15, Watchlists | Ausstehend |
| Phase D | Personalisierung | S9 Health Data Hub, E2E, FHIR | Ausstehend |
| Phase E | Ökosystem | S7 Community, S13 Agenten, S17 Matching | Ausstehend |

---

## 4. AKTIVE STRATEGISCHE GRUNDENTSCHEIDUNGEN

Nur sicher festgelegte, bindende Entscheidungen (Quelle: `VW_04_ENTSCHEIDUNGEN.md`):

| ID | Entscheidung | Status |
|----|-------------|--------|
| E01 | Vollständig werbefrei, kein Affiliate, kein Sponsoring | SICHER |
| E02 | Wirkstoffbasiert statt produktbasiert (S2/S6) | SICHER |
| E03 | Aggregieren statt eigenes medizinisches Wissen erfinden | SICHER |
| E04 | In Phase 1 vorrangig kostenlose Kernquellen nutzen | SICHER |
| E05 | PostgreSQL via Supabase (DE/EU) | SICHER |
| E07 | Client-side-Verarbeitung bei sensiblen Daten (S4/S8/S11/S12) | SICHER |
| E08 | Zero Retention als Kernprinzip in S4 | SICHER |
| E12 | React + Vite als Frontend-Framework | SICHER |
| E13 | GitHub als zentraler Code-Speicher | SICHER |
| E14 | Session = Paket | SICHER |
| E27 | Notfall-Flag als aktives UI-Element | SICHER |
| E28 | Quellen müssen professionell anerkannt und verlinkbar sein — KI-generierte Quellen VERBOTEN | SICHER |
| E29 | RLS auf allen Supabase-Tabellen | SICHER |

**Querschnitt-Architekturentscheidungen** (Quelle: `P7D_ARCHITECTURE_RESET_FREEZE.md`):
- Säulen S1–S18 bleiben **interne Architektur** — kein externes Navigationsmodell
- Fünf externe Produktbereiche: B1 Finden/Entdecken · B2 Verstehen/Einordnen · B3 Forschung · B4 Nächste Schritte · B5 Mein Gesundheitsraum
- K1–K11 Kernobjekte definiert (K5 = Medikament/Wirkstoff = S6)
- S5 = primärer Content-Hub / Anker von B2

---

## 5. AKTIVE NO-GOS / HARTE GRENZEN

Keine Ausnahmen. Dauerhaft bindend.

| No-Go | Quelle |
|-------|--------|
| Therapieempfehlung oder Diagnose stellen | P7D §13, E03 |
| Rezeptportal / Shop / Marktplatz / Kostenpfad in Phase 1 | P7D §13 |
| Automatischer Live-Interaktions-Checker (Nutzereingabe eigene Medikamente) | S6-FREEZE §2B, Phase 2 |
| Cloud-OCR in S4 (Roh-Bilddaten auf Drittserver) | E07/E08, P7-01a |
| DrugBank für S6 Slice 1 | S6-SPEC §2b — Lizenzrisiko |
| KI-generierte Quellen ohne Verifikation | E28 |
| Scope-Drift zwischen Paketen | Projektregel |
| Stille DB-Writes ohne Dokumentation | Projektregel |
| Neue Features ohne explizite Freigabe in eigenständigem Chat | Projektregel |
| S5 Drei-Sprachebenen für Diagnose-Therapie-Empfehlung | dauerhaftes No-Go |
| Direkte Produkt-/Markenname-Einträge als Haupteintrag in S6 | E02 |

---

## 6. AKTIVE QUERSCHICHTEN / SYSTEMLOGIK

(Quelle: `P7D_ARCHITECTURE_RESET_FREEZE.md` §4, Q1–Q10)

| # | Querschicht | Phase-Status |
|---|-------------|-------------|
| Q1 | Discovery / Suche / Einstiege | **Früh** — Basis-Build P7D-02 live; Ausbau Phase B/C |
| Q2 | Vertrauens-/Quellen-Layer | **Früh** — bereits im Ansatz live (AWMF/IQWiG/EMA) |
| Q3 | Visual-/Piktogramm-Layer | **Mittel** |
| Q4 | Update-/Change-Layer (objekt-gebunden, kein Newsroom) | **Mittel** — Spec-Phase ausstehend |
| Q5 | Watchlists / Glocke / Alerts | **Mittel** — Phase-C-Spec-only |
| Q6 | Mobile-first als Architekturprinzip | **Jetzt bindend** — kein Build-Auftrag |
| Q7 | Personalisierungs-Layer | **Spät** — S9 (Phase D) |
| Q8 | Integrations-Layer (FHIR R4) | **Spät** |
| Q9 | BYO-AI-Kontext-Layer | **Spät** |
| Q10 | Mehrsprachigkeit / i18n | **Architekturprinzip jetzt**, kein Build-Auftrag Phase 1 |

**Crosslink-Prinzip (aktiv):** S5 = primärer Hub. Cross-Blocks bidirektional: S5↔S1 ✅, S5↔S2 ✅, S5↔S6 ✅ (S6-03), S18→S5 ✅ (S18-Build-02), S5→S18 ✅ (S18-Build-03, Block [13]: amber Nährstoff + teal Muster + **orange Lebensmittel-Chips `krank-lm-chip`** (S18-Build-04)). S5↔S18 Bidirektionalität vollständig inkl. Lebensmittel. **S6↔K8b Minimalmodus ✅ (S6-06):** Cross-Block „Lebensmittel mit Hinweisen" auf Wirkstoffseiten — `med-crosslink-chip--lm` (orange) via JSONB-Containment auf `lebensmittel.wechselwirkungen.medikament_slug`.

---

## 7. AKTUELLE HAUPTSTRÄNGE

### P7 / S4 — Arztbrief-Decoder
**Status:** ✅ Beta Freeze (P7-FINAL, 20.04.2026). Strang formal geschlossen.  
Letzter Commit: `519f2d9`. Mistral stateless API (ZDR bestätigt). E07/E08 eingefroren.  
Nächster Schritt: P7-06 als separates Spec-Paket (kein sofortiger Build-Auftrag).  
Führend: `P7_FINAL_FREEZE_CLOSURE.md`

### S6 — Medikamenten-Erklärer
**Status:** ✅ **S6-06 abgeschlossen (23.04.2026).** S6↔K8b Minimalmodus: Cross-Block „Lebensmittel mit Hinweisen" auf `MedikamentDetail.jsx`. `getLebensmittelByWirkstoffSlug()` (JSONB-Containment auf `lebensmittel.wechselwirkungen.medikament_slug`). 2 Wirkstoffe mit Treffern (simvastatin + amlodipin → grapefruit). Block bei 0 Treffern absent. K8d out of scope. Kein DB-Write. 3 Dateien. Commit `8bf2145`.  
Nächster Schritt: S6-07 oder neues Säulenpaket — eigenständiger Chat.  
Führend: `S6_06_LM_HINWEISBLOCK_CLOSURE.md`

### S18 — Ernährungskompass
**Status:** ✅ Slice 1 live. ✅ Slice 2 (Nährstoffe). ✅ S18-Build-03 (S5→S18-Crosslinks). ✅ S18-Build-04 (Lebensmittel-Kompass K8b). ✅ **S18-Build-04a abgeschlossen (23.04.2026):** 8-Punkte Mobile-Audit (Q6). A4-Befund: 4 Tap-Targets unter 40px behoben — `min-height: 40px` für filter-chip, erkrankungs-chip, mikro-chip--linked + `padding: 8px 0` für back-btn im Mobile-Breakpoint. 1 Datei (Ernaehrung.css). Kein JSX-Touch, kein DB-Write. Q6 bestätigt. Commit `13f7b8b`.  
Nächster Schritt: S18-Build-05 (E-Nummern K8d) oder S6-06 — eigenständiger Chat.  
Führend: **`S18_BUILD04_LEBENSMITTEL_CLOSURE.md`** (inkl. Anhang S18-Build-04a)

### S8 / B4 — B4 Ableitungslogik
**Status:** ✅ **B4-SAFETY-PATCH abgeschlossen (07.05.2026), Commit `8f19256`** — 18 Karten (HbA1c/Ferritin/VitD/CRP) mit `safetyLevel` + `requiresDoctorDiscussion` nachgerüstet. 1 Datei, 36 Insertions, 0 Deletions. Befund #2 (KRITISCH-MED) aus FULL_AUDIT_2026-05 geschlossen. B4-BUILD-03 entsperrt. ✅ B4-BUILD-02 (25.04.2026): LDL-Journey live. ✅ S8-BUILD-01/02/02b/02c/03. ✅ B4-DECISION-LOGIC-FREEZE + PATCH-01.  
Nächster Schritt: **B4-BUILD-03** (Rollout B4-Actions weitere Laborwerte — jetzt entsperrt), S8-BUILD-02d (Kalium/Natrium K3-Map), Q2-BUILD-02d (S1-Quellenbox) — je eigenständiger Chat.  
Führend: **`01_PROJECT_SOURCES_CURRENT/B4_SAFETY_PATCH_CLOSURE.md`** (07.05.2026) · **`01_PROJECT_SOURCES_CURRENT/B4_BUILD_02_LDL_JOURNEY_CLOSURE.md`** · **`01_PROJECT_SOURCES_CURRENT/B4_DECISION_LOGIC_FREEZE.md`**

### P7D / Discovery / Architektur
**Status:** ✅ Architecture Reset Freeze (P7D-01, 18.04.2026). Discovery-Basis-Build live (P7D-02). S3-Freeze abgeschlossen (P7D-03). S18-Freeze+Reset abgeschlossen (P7D-04/04a).  
Führend: `P7D_ARCHITECTURE_RESET_FREEZE.md`

### S3 — Studienkompass
**Status:** ✅ Freeze (P7D-03, 19.04.2026). Scope definiert. Phase C Build.  
Nächster Schritt: S3-Spec-Paket (eigenständiger Chat, explizite Freigabe).

### Q2 — Vertrauens-/Quellen-Layer
**Status:** ✅ **Q2-BUILD-01 abgeschlossen (24.04.2026)** — Globale Vertrauensseite `/vertrauen` live. ✅ **Q2-BUILD-02a abgeschlossen (24.04.2026)** — S5 Quellenbox-Komponente live. ✅ **Q2-BUILD-02b abgeschlossen (06.05.2026)** — S6 QuellenBox-Rollout: `MedQuellenBox`-Komponente in `MedikamentDetail.jsx` Block 6. `MED_QUELLEN_TYP`-Konstante + `getMedTypInfo()`-Helper + Inline-Komponente. Typ-Mapping: ema/bfarm→regulatory, openfda/atc/who_atc→database, guideline→guideline, research→research, Fallback→database. Chip-Farben Q2-konsistent (regulatory=blau, database=slate, guideline=indigo, research=amber). Max-2-Expand. Roh-Enum-Anzeige (`toUpperCase()`) entfernt. Zulassungsinfos + Disclaimer-Blöcke unverändert. S2 deferred (`supplements.quellen`-Feld nicht vorhanden). 2 Dateien (+79/-16 JSX, +132 CSS). V1–V10 ✅. Commit `c4b70d7`. ✅ **Q2-BUILD-02c abgeschlossen (06.05.2026)** — S2 QuellenBox: `supplements.quellen` JSONB-Feld live (ALTER TABLE), 21 NIH-ODS-Einträge (Bootstrap aus `nih_ods_link`). `SuppQuellenBox`-Inline-Komponente in `SupplementDetail.jsx`. `supp-quellenbox-*` CSS (mobile-first, Tap-Targets ≥ 44px). PubMed-Key-Fix: Dual-Fallback `pmid`/`pubmed_id`. E28-konform (alle Einträge mit URL). DB-Write: JA (ALTER TABLE + 21 UPDATEs). 3 Dateien. V1–V10 ✅. Commit `2e1223d`.  
✅ **Q2-BUILD-02c-P2A abgeschlossen (06.05.2026)** — 10 NIH-ODS-Importlücken geschlossen (nih_ods_link + quellen für B1/B2/B3/B5/Biotin/Kalium/Chrom/Kupfer/Mangan/L-Carnitin). DB: 31/51 Supplements mit quellen. Kein Code, kein Build-Commit, kein Deploy. P2A-Doku-Sync `821d44a`, finaler Metadaten-Fix `e496dbe`. V1–V8 ✅.  
✅ **Q2-BUILD-02d abgeschlossen (07.05.2026)** — S1 LwQuellenBox: `LwQuellenBox`-Inline-Komponente in `LaborwertDetail.jsx`. Typ: database (DGKL/AACC/JSCC per S1-PRE-SPEC). Region-Flag + Name-Link + Jahr. Max-2-Expand. Leer-Guard. Mobile Q6 ✅. Block [4b] ersetzt. 2 Dateien, kein DB-Write. Commit `fab4374`. Schließt FULL_AUDIT_2026-05 Befund #3 (alle 3 Befunde nun geschlossen).  
Nächster Schritt: Q2-BUILD-02c-P2B (5× NCCIH: Melatonin/Echinacea/Ginkgo/Mariendistel/Rhodiola) oder Q2-BUILD-03 (`review_typ`/`quellen_konflikt`-Schema) — je eigenständiger Chat.  
Führend: `Q2_BUILD_02D_S1_QUELLENBOX_CLOSURE.md` · `Q2_BUILD_02C_P2A_NIH_ODS_TOP10_CLOSURE.md` · `Q2_BUILD_02C_S2_QUELLENBOX_CLOSURE.md` · `Q2_BUILD_02B_S6_QUELLENBOX_CLOSURE.md` · `Q2_BUILD_02A_S5_QUELLENBOX_CLOSURE.md` · `Q2_BUILD_01_CLOSURE.md`

### UI-REFRESH — Brand/UX CSS-Refresh (Design-Governance + Builds)
**Status:** ✅ **UI-REFRESH-01** (24.04.2026, `54447ba`) ✅ **UI-REFRESH-02** (24.04.2026, `f4600f0`) ✅ **UI-REFRESH-03** (24.04.2026, `f038e34`) — alle drei abgeschlossen.  
BRAND-UX-REFRESH-SPEC: Bindendes Design-Governance-Dokument (B1–B5, C1–C11, 12 No-Gos).  
UI-REFRESH-01: 7 CSS-Dateien, Serif-Pauschalregel entfernt, Gradienten, Hero, Nav-Tagline.  
UI-REFRESH-02: 6 CSS-Dateien, 14 Crosslink-Chips → Typ-1 neutral, Q2-research amber → violett-grau, uppercase-Bereinigungen, soon-tag neutral.  
UI-REFRESH-03: 3 CSS-Dateien. Ernaehrung.css: 5 Hero-Header beruhigt, 3 Eyebrow-Badges display:none, 6 Serif → DM Sans 600. Medikamente.css: med-title/-section-title → DM Sans 600. Laborwerte.css: detail-section-title uppercase/letter-spacing bereinigt. 22/22 Checks PASS.  
Nächster Schritt: **UI-REFRESH-04** (Detailseiten-Hierarchie: Primär/Sekundär-Container `var(--surface-2)`, Legacy-Tap-Targets krank-ebene-btn/panel-btn ≥40px — CSS + ggf. minimales JSX, eigenständiger Chat).  
DB-Write: NEIN. JSX: NEIN.  
Führend: `01_PROJECT_SOURCES_CURRENT/BRAND_UX_REFRESH_SPEC.md` · `UI_REFRESH_03_CLOSURE.md` · `UI_REFRESH_02_CLOSURE.md` · `UI_REFRESH_01_CLOSURE.md`  
**Strang formal geschlossen:** UI-REFRESH-01+02+03 JA — UI-REFRESH-04 = nächstes Paket

---

### S1 — Laborwert-Lexikon (Compare/Zielwert/Trend)
**Status:** ✅ **S1-BUILD-01 abgeschlossen (24.04.2026)** + ✅ **S1-BUILD-01b + 01c** + ✅ **Q2-BUILD-02d abgeschlossen (07.05.2026)**  
S1-BUILD-01: 8 neue DB-Felder, 5 Pilot-Werte (HbA1c/LDL/Ferritin/TSH/eGFR), ZielwertBlock ZT1–ZT4, Quellenkontext-Zeile. Commit `4ea4290`. DB-Write: JA.  
S1-BUILD-01b: LDL Microcopy. Commit `d430333`. DB-Write: NEIN.  
S1-BUILD-01c: LDL Zielwert-Klarstellung. Commit `06c1176`. DB-Write: NEIN.  
Q2-BUILD-02d: LwQuellenBox live. Typ-Chip (database/DATENBANK), Region-Flag, Name-Link, Jahr. Max-2-Expand. Leer-Guard (55 nicht-pilot LW absent). Mobile Q6 ✅. Block [4b] ersetzt. 2 Dateien, kein DB-Write. Commit `fab4374`. Schließt FULL_AUDIT_2026-05 Befund #3.  
Nächster Schritt: S1-BUILD-02 (Rollout auf alle 60 Werte, V2-Kontext, S1↔S5/S6-Crosslinks — eigenständiger Chat nach expliziter Freigabe).  
Führend: `01_PROJECT_SOURCES_CURRENT/Q2_BUILD_02D_S1_QUELLENBOX_CLOSURE.md`

---

## 8. BEKANNTE OFFENE RISIKEN / INKONSISTENZEN

| Risiko | Einstufung | Handlungsbedarf |
|--------|-----------|-----------------|
| FULL_AUDIT_2026-05 Befund #2 — B4-actions-map HbA1c/Ferritin/VitD/CRP ohne safetyLevel+requiresDoctorDiscussion | ✅ GESCHLOSSEN | B4-SAFETY-PATCH abgeschlossen (07.05.2026), Commit `8f19256` |
| FULL_AUDIT_2026-05 Befund #3 — S1 ohne QuellenBox | ✅ GESCHLOSSEN | Q2-BUILD-02d abgeschlossen (07.05.2026), Commit `fab4374` — alle 3 FULL_AUDIT_2026-05-Befunde geschlossen |
| Mistral DPA-Vertragsklausel offen | NIEDRIG | Sebastian: Compliance-Nachtrag bei Mistral anfordern |
| S4 ST-1a/b/c (Performance nach P7-04d) ausstehend | OFFEN | Sebastian manuell — kein Blocker |
| S4 ST-P705-4 (UX nach P7-05) ausstehend | OFFEN | Sebastian manuell — kein Blocker |
| S6 supp_interaktionen: nur 19/50 Wirkstoffe befüllt | INFO | Slice 2 — kein Slice-1-Blocker |
| S1/S6 Cross-Block | ✅ ERLEDIGT | S6-03 abgeschlossen (22.04.2026), Commit `45dcca4` |
| S6 Filter-UI | ✅ ERLEDIGT | S6-04 abgeschlossen (22.04.2026), Commit `3a003ca` |
| S6 Globalsuche-Integration | ✅ ERLEDIGT | S6-05 abgeschlossen (22.04.2026), Commit `5c8f537` |
| S5↔S18 Cross-Block | ✅ ERLEDIGT | S18-Build-03 + S18-Build-04 — Block [13] inkl. LM-Chips live |
| S18 Lebensmittel K8b | ✅ ERLEDIGT | S18-Build-04 abgeschlossen (23.04.2026), Commit `84c8fdb` |
| S18 Mobile-Audit Q6 | ✅ ERLEDIGT | S18-Build-04a: 4 Tap-Targets behoben, Q6 bestätigt. Commit `13f7b8b` |
| JSCC-Extraktion (S1 JP-Referenzbereiche) technisch offen | NIEDRIG | In S1-PRE-SPEC als V2-Datenlücke markiert — Phase C, kein Build-Blocker |
| S5 Quellen: 5 dauerhaft intern (F06/L72/M13/R74/Z87) | INFO | Dokumentiert, kein Handlungsbedarf |

---

## 9. NICHT MEHR FÜHRENDE DOKUMENTTYPEN

Nur als historische Referenz — nicht für aktuelle Architektur-/Zahlen-/Zustandsaussagen verwenden:

| Dokument | Warum nicht mehr führend |
|----------|--------------------------|
| `WEBSITE_PROJECT_MASTER_DOSSIER.md` | Altstand 13.04.2026. Veralteter Hosting-Status, veraltete DB-Zahlen. Durch spätere operative Dokumente überholt. |
| `VITALWISSEN_STRATEGIE_REASSESSMENT_2026-04-18.md` | Delta-Quelle — von `P7D_ARCHITECTURE_RESET_FREEZE.md` in strukturierte, bindende Form überführt. |
| Frühe P6B-Mapping-/Forensik-Dokumente (`P6B_FORENSIC_RECONCILIATION_AUDIT.md` etc.) | Abgeschlossene Zwischen-Audits — für Crosslink-Fragen weiterhin referenzierbar, aber nicht operativ führend. |
| `S1_BUILD_01_STATUS.md`, `S2_BUILD_01_STATUS.md`, `S5_BUILD_01_STATUS.md` | Frühe Sprint-Status — durch VW_03_STATUS.md und spätere Closures überholt. |
| `P7A_S1_ARCHITECTURE_IA_FREEZE.md`, `P7B_S2_ARCHITECTURE_IA_FREEZE.md`, `P7C_S5_QUALITY_HUB_FREEZE.md` | Frühe Architektur-Freeze-Dokumente — inhaltslogisch korrekt, durch P7D_ARCHITECTURE_RESET_FREEZE.md zusammengeführt. |

---

## 10. PFLEGE-REGEL FÜR ZUKÜNFTIGE SESSIONS

**Standardannahme: JA, diese Datei muss mitgepflegt werden.**

Wenn ein Paket gebaut, gefreezt, repariert oder geschlossen wird:

1. Einzeldokument erstellen/aktualisieren (Freeze/Closure/Status)
2. `CLAUDE.md` nachziehen
3. `VW_03_STATUS.md` nachziehen
4. **Diese Datei (`AUDIT_CANON_CURRENT.md`) nachziehen**
5. **`ACTIVE_STRANDS_CURRENT.md` nachziehen**

Nur wenn ausnahmsweise nicht nötig: explizit begründen.

Aktualisierung bedeutet mindestens: Tabellen in §3 (DB-Stand, Live-Module), §7 (Hauptstränge), §8 (Risiken). Bei neuen Entscheidungen auch §4 und §5.

---

*Erstellt: 21.04.2026 — Kanon-Doppelpflege-Paket*  
*Aktualisiert: 22.04.2026 — S18-BUILD-02b: Schema-Normalisierung Hardening abgeschlossen. Commit `c60f47a`.*  
*Aktualisiert: 22.04.2026 — S6-04: Filter-UI MedikamenteListe abgeschlossen. Psyche-Bug behoben, Gastro-Uro ergänzt (4 DB-Rows), Count-Badge live. Commit `3a003ca`. `S6_04_FILTER_UI_CLOSURE.md` erstellt.*  
*Aktualisiert: 22.04.2026 — S6-05: Globalsuche-Integration abgeschlossen. Commit `5c8f537`. S6-05 in §7 und §8 nachgezogen.*  
*Aktualisiert: 22.04.2026 — Reconciliation-Audit: VW-AUDIT-18A (Commit `8445cac`) in CLAUDE.md-Sprinttabelle ergänzt. S6-03 (Commit `45dcca4`) + S18-Build-03 (Commit `ac130b0`) in §6/§7/§8 bereits korrekt — Footer-Trail nachgezogen. K8c-Fehler (E-Nummern) in ACTIVE_STRANDS_CURRENT.md korrigiert (→ K8d). VW_03_STATUS.md DB-Stand + Nächste-Schritte + Gesamtübersicht S1/S2/S5 bereinigt.*  
*Aktualisiert: 23.04.2026 — S18-Build-04: Lebensmittel-Kompass K8b abgeschlossen. `lebensmittel`-Tabelle (24 Rows, RLS). 7 Frontend-Dateien. Block [13] um orange LM-Chips erweitert. Commit `84c8fdb`. V1–V11 ✅. §3 DB-Stand + Live-Module + §6 Crosslink + §7 S18 + §8 Risiken nachgezogen.*  
*Aktualisiert: 23.04.2026 — S18-Build-04a: Mobile-Audit (8 Prüfpunkte, Q6). A4-Befund 4 Tap-Targets behoben (min-height 40px + padding 8px 0 im Mobile-Breakpoint). Commit `13f7b8b`. Kein DB-Write. Q6 bestätigt. §3 Live-Module + §3 Repo + §7 S18 + §8 Risiken nachgezogen.*  
*Aktualisiert: 23.04.2026 — S8-PRE-SPEC B4-Ableitungslogik abgeschlossen (read-only). Pre-Spec `S8_PRE_SPEC_B4_ABLEITUNGSLOGIK.md` erstellt. §7 Hauptstränge um S8-Strang ergänzt. Kein DB-Write, kein Commit, kein Deploy.*  
*Aktualisiert: 23.04.2026 — S8-BUILD-01: B4 Nächste-Schritte-Block live. 5 Krankheiten (I10/E11/F32/E03/D50), 27 Optionen. `naechste_schritte` JSONB auf `krankheiten`. CSS `b4-*` (30 Klassen). Commit `bcda9bf`. V1–V12 PASS. §3 Live-Module + DB-Stand + Repo + §7 S8 + §8 Risiken nachgezogen.*  
*Aktualisiert: 24.04.2026 — Q2-BUILD-01: Globale Vertrauensseite `/vertrauen` live. 7 Pflichtblöcke, 5 Quellentypen (Chips), Quellenhierarchie, CSS `q2-*`, Footer-Link. 5 Dateien. Commit `e3b5617`. V1–V12 ✅. DB-Write: NEIN. §3 Repo + §7 Q2-Strang + §8 Risiken nachgezogen.*  
*Aktualisiert: 24.04.2026 — Q2-BUILD-02a: S5 Quellenbox-Komponente live. QuellenBox (Inline, TYP_MAP) ersetzt Plain-Link-Liste in Block [16]. Typ-Chip + Name-Link + beschreibung wenn vorhanden. Max-2-Expand. Mobile-first. 2 Dateien. Commit `6a9fde7`. V1–V12 ✅. DB-Write: NEIN. §3 S5-Live-Module + Repo + §7 Q2-Strang nachgezogen.*  
*Aktualisiert: 24.04.2026 — S1-PRE-SPEC: S1 Compare-/Zielwert-/Trend Pre-Spec abgeschlossen (read-only). 4-Ebenen-Vergleichsmodell, 4 Zielwert-Typen, 16 DB-Felder spezifiziert, 12 No-Gos, S8-BUILD-02-Anschluss K3→B4 vorbereitet. Kein Code, kein DB-Write, kein Commit. §7 S1-Strang neu + §8 JSCC-Risiko-Update nachgezogen.*  
*Aktualisiert: 24.04.2026 — S1-BUILD-01: Zielwert-Block V3 + Quellenkontext live. ALTER TABLE laborwerte (8 neue Felder). 5 Pilot-Werte befüllt (HbA1c/LDL/Ferritin/TSH/eGFR, 9 ZT-Einträge). ZielwertBlock-Komponente (ZT1/ZT2 direkt, ZT3/ZT4 Intent-Gate, ZT4 Arzt-Disclaimer). Quellenkontext-Zeile + Mobile-fix referenz-grid. 2 Dateien. CSS-Audit 29/29+6/6 ✅. Commit `4ea4290`. DB-Write: JA. §3 S1-Live-Module + DB-Stand + Repo + §7 S1-Strang nachgezogen.*  
*Aktualisiert: 24.04.2026 — BRAND-UX-REFRESH-SPEC ✅ Bindendes Design-Governance-Dokument abgeschlossen. Audit 8 Befunde. 5 Kernentscheidungen (B1–B5). 11 CSS-Spec-Blöcke (C1–C11) + 12 No-Gos. Nächster Schritt: UI-REFRESH-01 (CSS-only, eigenständiger Chat). Kein Code, kein DB-Write, kein Commit, kein Deploy. §7 BRAND-UX-REFRESH-SPEC-Strang neu ergänzt.*  
*Aktualisiert: 24.04.2026 — UI-REFRESH-01 ✅ + UI-REFRESH-02 ✅ CSS-Refresh Priorität 1+2 abgeschlossen. UI-REFRESH-01: Commit `54447ba`. UI-REFRESH-02: 14 Crosslink-Chips → Typ-1, Q2-research amber → violett-grau, uppercase-Bereinigungen, soon-tag neutral. Commit `f4600f0`. §3 Repo-Stand + §7 UI-REFRESH-Strang nachgezogen.*  
*Aktualisiert: 24.04.2026 — B4-DECISION-LOGIC-FREEZE ✅ Vollständige B4-Entscheidungslogik eingefroren (read-only). 8 Maßnahmenkategorien, 6 Evidenz-Reifegrade, 15-Feld-Pflichtschema, Sicherheitslogik, 12 No-Gos, 5 Lehrbeispiele, 6-Paket-Roadmap. Kein Code, kein Commit, kein DB-Write. §3 S8 Live-Module + §7 S8-Strang + Footer nachgezogen. Führend: `B4_DECISION_LOGIC_FREEZE.md`.*  
*Aktualisiert: 24.04.2026 — B4-DECISION-LOGIC-FREEZE-PATCH-01 ✅ 5 Schärfungs-Patches auf `B4_DECISION_LOGIC_FREEZE.md` (read-only, kein Code, kein Commit, kein DB-Write). Kontextpflicht-Regel §6.2, whyShown-Pflichtfeld §8.5, UI-Label-Pflicht evidenceMaturity §5.1+§5.9, LDL-Zielwert risikobasiert §10.1 (ESC/EAS 2021), Paket 1b S1-BUILD-01b in §12. §7 S8-Strang nachgezogen. Nächster Schritt: S1-BUILD-01b → B4-BUILD-02.*  
*Aktualisiert: 24.04.2026 — S1-BUILD-01b ✅ LDL Zielwert-Microcopy live. loincCode-Prop an ZielwertBlock, LOINC `2089-1`-Gating, ESC/EAS-Risikokontext-Hinweis, lw-zt-hinweis wiederverwendet. 1 Datei (LaborwertDetail.jsx), 14 Insertions, 2 Deletions. Build 126 Module, 0 Fehler. Commit `d430333`. DB-Write: NEIN. Paket 1b abgeschlossen — Voraussetzung für B4-BUILD-02 erfüllt. §3 S1 Live-Module (Commit auf `d430333`) + Repo-Stand + §7 S1-Strang (S1-BUILD-01b ergänzt) + §7 S8-Strang (S1-BUILD-01b ✅, Nächster Schritt B4-BUILD-02) nachgezogen.*  
*Aktualisiert: 06.05.2026 — Q2-BUILD-02c ✅ S2 QuellenBox abgeschlossen. supplements.quellen JSONB live (ALTER TABLE). NIH-ODS-Bootstrap: 21/51 Supplements befüllt. SuppQuellenBox-Komponente in SupplementDetail.jsx (inline, analog MedQuellenBox). PubMed-Key-Fix (pmid/pubmed_id dual fallback). schema.sql sync. Build 126 Module ✅. Commit `2e1223d`. Push origin/main. Netlify Auto-Deploy. DB-Write: JA. §3 S2-Live-Module + DB-Stand (supplements) + Repo-Stand nachgezogen.*
*Aktualisiert: 06.05.2026 — VITALWISSEN_FULL_SYSTEM_AUDIT_2026-05 ✅ Vollaudit abgeschlossen (read-only). Phasen A–G: Dokument-/Repo-Audit, 20+ Live-Seiten getestet, DB vollständig abgefragt, Source/Evidence, Medical-Safety, UX/Brand, Architektur. Gesamtverdikt: GRÜN. Kritischster Befund: lokaler Repo-Clone veraltet (ee0e67f vs. Live HEAD) + B4-actions-map für 4 LW fehlende Pflicht-Sicherheitsfelder. §7 UI-REFRESH-Drift korrigiert (UI-REFRESH-03 war fälschlich als "Nächster Schritt" markiert — jetzt ✅). Report: `01_PROJECT_SOURCES_CURRENT/VITALWISSEN_FULL_SYSTEM_AUDIT_2026_05.md`. DB-Write: NEIN. Commit: NEIN. Deploy: NEIN.*
*Nächste Pflicht-Aktualisierung: bei B4-SAFETY-PATCH, Q2-BUILD-02d, Q2-BUILD-02c-P2B, S8-BUILD-02d, B4-BUILD-03 oder jedem anderen Paket-Abschluss*
