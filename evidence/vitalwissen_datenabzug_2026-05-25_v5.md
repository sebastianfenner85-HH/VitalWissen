# VitalWissen — Vollständiger Datenbankabzug

**Erstellt:** 25.05.2026  
**Datenbank:** Supabase PostgreSQL · Projekt ejyrzxmtosrouwstiyws · Frankfurt (eu-central-1)  
**Tabellen:** laborwerte (60), supplements (51), krankheiten (221)

> Dieser Abzug enthält Strukturdaten, Referenzwerte, Klassifikationen und Quellenangaben pro Eintrag. Audit-Stand: 25.05.2026 — v5 Live-Link- und Semantik-Validation angewendet.

---

## Inhaltsverzeichnis

1. [Laborwerte (60)](#laborwerte)
2. [Supplements (51)](#supplements)  
3. [Krankheiten (221)](#krankheiten)

---

# Laborwerte (60 Einträge)

**Quellen:** LOINC (Struktur), DGKL (DE-Referenzbereiche), ESC/EAS (Lipide/Herzmarker), DDG/DGKL (Diabetes), DGE/DGKL (Vitamine)


## Blut

| Name | LOINC | Panel | Ref DE Männer | Ref DE Frauen | Einheit | Quelle | Prüfhinweis | Notfall |
|------|-------|-------|--------------|--------------|---------|--------|------------|---------|
| **AP (Alkalische Phosphatase)** | `6768-6` | Leber | 40–130 | 35–105 | U/L | DGKL 2023 | — | Nein |
| **Albumin** | `1751-7` | Leber | 35–52 | 35–52 | g/L | DGKL 2023 | — | Nein |
| **Anti-TPO** | `8099-7` | Schilddrüse | <34 | <34 | IU/mL | DGKL 2023 | — | Nein |
| **BSG** | `4537-7` | Entzündung | <15 | <20 | mm/h | DGKL 2023 | — | Nein |
| **Bilirubin (gesamt)** | `1975-2` | Leber | 0.2–1.2 | 0.2–1.2 | mg/dL | DGKL 2023 | — | 🚨 Ja |
| **C-Peptid** | `1986-9` | Diabetes | 0.5–2 | 0.5–2 | ng/mL | DGKL 2023 | — | Nein |
| **CRP** | `1988-5` | Entzündung | <5 | <5 | mg/L | DGKL 2023 | — | Nein |
| **Chlorid** | `2075-0` | Elektrolyte | 98–106 | 98–106 | mmol/L | DGKL 2023 | — | Nein |
| **Cholesterin (gesamt)** | `2093-3` | Lipide | <200 | <200 | mg/dL | ESC/EAS 2023 | — | Nein |
| **Cortisol (morgens)** | `2143-6` | Hormone | 170–500 | 170–500 | nmol/L | DGKL 2023 | — | Nein |
| **Cystatin C** | `33959-8` | Niere | 0.5–1 | 0.5–1 | mg/L | DGKL 2023 | — | Nein |
| **Eisen (Serum)** | `2498-4` | Eisenstoffwechsel | 60–170 | 37–145 | µg/dL | DGKL 2023 | — | Nein |
| **Erythrozyten** | `789-8` | Blutbild | 4.5–5.9 | 4.1–5.1 | T/L | DGKL 2023 | — | Nein |
| **FSH** | `15067-2` | Hormone | 1–12 | 1–135 | IU/L | DGKL 2023 | — | Nein |
| **Ferritin** | `2276-4` | Eisenstoffwechsel | 30–400 | 13–150 | ng/mL | DGKL 2023 | — | Nein |
| **Folsäure** | `2284-8` | Vitamine | 3–17 | 3–17 | ng/mL | DGKL 2023 | — | Nein |
| **GGT** | `2324-2` | Leber | <61 | <36 | U/L | DGKL 2023 | — | Nein |
| **GOT (AST)** | `1920-8` | Leber | <40 | <35 | U/L | DGKL 2023 | — | Nein |
| **GPT (ALT)** | `1742-6` | Leber | <50 | <35 | U/L | DGKL 2023 | — | Nein |
| **Glukose (nüchtern)** | `2345-7` | Diabetes | 70–100 | 70–100 | mg/dL | DGKL 2023 | — | 🚨 Ja |
| **HDL-Cholesterin** | `2085-9` | Lipide | >40 | >50 | mg/dL | ESC/EAS 2023 | — | Nein |
| **Harnstoff** | `3091-6` | Niere | 10–50 | 10–50 | mg/dL | DGKL 2023 | — | Nein |
| **Harnsäure** | `3084-1` | Niere | 3.4–7 | 2.4–5.7 | mg/dL | DGKL 2023 | — | Nein |
| **HbA1c** | `4548-4` | Diabetes | <5.7 | <5.7 | % | DDG/DGKL 2023 | — | Nein |
| **Hämatokrit** | `4544-3` | Blutbild | 40–52 | 36–48 | % | DGKL 2023 | — | Nein |
| **Hämoglobin** | `718-7` | Blutbild | 13.5–17.5 | 12–16 | g/dL | DGKL 2023 | — | Nein |
| **Insulin (nüchtern)** | `20448-7` | Diabetes | 2–25 | 2–25 | mU/L | DGKL 2023 | — | Nein |
| **Kalium** | `2823-3` | Elektrolyte | 3.5–5 | 3.5–5 | mmol/L | DGKL 2023 | — | 🚨 Ja |
| **Kalzium (Serum)** | `17861-6` | Mineralien | 2.2–2.6 | 2.2–2.6 | mmol/L | DGKL 2023 | — | 🚨 Ja |
| **Kreatinin** | `2160-0` | Niere | 0.7–1.2 | 0.5–1 | mg/dL | DGKL 2023 | — | Nein |
| **LDL-Cholesterin** | `2089-1` | Lipide | <130 | <130 | mg/dL | ESC/EAS 2023 | Orientierungswert; risikobasierte Zielwerte nötig: <116/<100/<70/<55 je Risiko (ESC/EAS 2021) | Nein |
| **LH** | `10501-5` | Hormone | 1–9 | 1–75 | IU/L | DGKL 2023 | — | Nein |
| **Leukozyten** | `6690-2` | Blutbild | 4–10 | 4–10 | G/L | DGKL 2023 | — | 🚨 Ja |
| **Lipoprotein (a)** | `10835-7` | Lipide | <30 | <30 | mg/dL | ESC 2023 | — | Nein |
| **MCH** | `785-6` | Blutbild | 27–34 | 27–34 | pg | DGKL 2023 | — | Nein |
| **MCHC** | `786-4` | Blutbild | 32–36 | 32–36 | g/dL | DGKL 2023 | — | Nein |
| **MCV** | `787-2` | Blutbild | 80–100 | 80–100 | fL | DGKL 2023 | — | Nein |
| **Magnesium** | `19123-9` | Mineralien | 0.7–1 | 0.7–1 | mmol/L | DGKL 2023 | — | Nein |
| **NT-proBNP** | `33762-6` | Herzmarker | <125 | <125 | ng/L | ESC 2023 | — | 🚨 Ja |
| **Natrium** | `2951-2` | Elektrolyte | 136–145 | 136–145 | mmol/L | DGKL 2023 | — | 🚨 Ja |
| **Phosphat** | `2777-1` | Mineralien | 0.8–1.5 | 0.8–1.5 | mmol/L | DGKL 2023 | — | Nein |
| **Procalcitonin (PCT)** | `75241-0` | Entzündung | <0.5 | <0.5 | µg/L | DGKL 2023 | — | 🚨 Ja |
| **Progesteron** | `2839-9` | Hormone | 0.3–3.5 | — | nmol/L | DGKL 2023 | — | Nein |
| **Quick / INR** | `5902-7` | Gerinnung | 70–130 | 70–130 | % | DGKL 2023 | — | 🚨 Ja |
| **Retikulozyten** | `31112-6` | Eisenstoffwechsel | 0.5–2.5 | 0.5–2.5 | % | DGKL 2023 | — | Nein |
| **TSH** | `3016-3` | Schilddrüse | 0.4–4 | 0.4–4 | mU/L | DGKL 2023 | — | Nein |
| **Testosteron** | `2986-8` | Hormone | 9.9–27.8 | 0.3–2.4 | nmol/L | DGKL 2023 | — | Nein |
| **Thrombozyten** | `777-3` | Blutbild | 150–400 | 150–400 | G/L | DGKL 2023 | — | 🚨 Ja |
| **Transferrin** | `3034-6` | Eisenstoffwechsel | 200–360 | 200–360 | mg/dL | DGKL 2023 | — | Nein |
| **Transferrinsättigung** | `2502-3` | Eisenstoffwechsel | 16–45 | 16–45 | % | DGKL 2023 | — | Nein |
| **Triglyzeride** | `2571-8` | Lipide | <150 | <150 | mg/dL | ESC/EAS 2023 | — | Nein |
| **Troponin I (hochsensitiv)** | `89579-7` | Herzmarker | <16 | <12 | ng/L | ESC 2023 | — | 🚨 Ja |
| **Vitamin B12** | `2132-9` | Vitamine | 200–900 | 200–900 | pg/mL | DGKL 2023 | — | Nein |
| **Vitamin D (25-OH)** | `14635-7` | Vitamine | 30–60 | 30–60 | ng/mL | DGE/DGKL 2023 | DB-Fachreview nötig: LOINC 14635-7 = Moles/vol; ng/mL spricht für anderen LOINC, wahrscheinlich 62292-8 bei Gesamt-25-OH-D | Nein |
| **Zink** | `5762-5` | Mineralien | 60–120 | 60–120 | µg/dL | DGKL 2023 | — | Nein |
| **eGFR (CKD-EPI)** | `62238-1` | Niere | 60–120 | 60–120 | mL/min/1.73m² | DGKL 2023 | — | 🚨 Ja |
| **fT3** | `3051-0` | Schilddrüse | 3.5–6.5 | 3.5–6.5 | pmol/L | DGKL 2023 | — | Nein |
| **fT4** | `3024-7` | Schilddrüse | 12–22 | 12–22 | pmol/L | DGKL 2023 | — | Nein |
| **hs-CRP** | `30522-7` | Entzündung | <1 | <1 | mg/L | ESC 2023 | — | Nein |
| **Östradiol (E2)** | `2243-4` | Hormone | 40–190 | 84–1.320 (zyklusabh.) | pmol/L | DGKL 2023 | — | Nein |
---

# Supplements (51 Einträge)

**Quellen:** NIH ODS (Primär — Vitamine/Mineralien), EFSA DRVs (EU-Obergrenze), NCCIH (Pflanzenstoffe ohne NIH-ODS-Einzelblatt). Einträge ohne verifizierte Quelle: Status ⚠️ fachlicher Review nötig.

> **Quelle-Spalte:** NIH ODS = verlinktes Factsheet · NCCIH = verlinktes Factsheet · Einträge ohne Einzelblatt: Quelle offen / ⚠️ fachlicher Review nötig


## Aminosäuren

| Name | Wissenschaftlich | Wofür | Evidenz | Dosierung NIH | Dosierung BfR | UL (EFSA) | Quelle | Quelle-URL | Prüfstatus |
|------|-----------------|-------|---------|--------------|--------------|-----------|--------|-----------|-----------|
| **BCAA** | Leucin, Isoleucin, Valin | Für Muskelaufbau und Muskelschutz beim Sport | 🟡 moderat | 5.000 mg | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Kreatin** | Creatine monohydrate | Für Kraftsport, Muskelaufbau und Schnellkraft | 🟢 stark | 3 g/Tag | — | — | [NIH ODS — Ausdauer und Sport](https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/) | https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/ | ✅ Ersatzquelle verifiziert; ursprünglicher NIH-ODS-Einzelstofflink war 404 |
| **L-Arginin** | L-Arginin | Für Durchblutung und sportliche Leistung | 🟡 moderat | 3.000 mg | — | 9.000 mg | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **L-Carnitin** | L-Carnitin | Für Fettstoffwechsel und Energie | 🟡 moderat | 1.000 mg | — | — | [NIH ODS](https://ods.od.nih.gov/factsheets/Carnitine-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Carnitine-HealthProfessional/ | ✅ URL verifiziert |
| **L-Glutamin** | L-Glutamin | Für Darmgesundheit und Muskelregeneration | 🟡 moderat | 5.000 mg | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **NAC (N-Acetylcystein)** | N-Acetylcystein | Für Entgiftung, Lunge und Glutathion-Produktion | 🟡 moderat | 600 mg | — | 1.800 mg | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Taurin** | Taurin | Für Herzfunktion und antioxidativen Schutz | 🟡 moderat | 500 mg | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |

## Fettsäuren

| Name | Wissenschaftlich | Wofür | Evidenz | Dosierung NIH | Dosierung BfR | UL (EFSA) | Quelle | Quelle-URL | Prüfstatus |
|------|-----------------|-------|---------|--------------|--------------|-----------|--------|-----------|-----------|
| **CLA (Konjugierte Linolsäure)** | Konjugierte Linolsäure (CLA) | Für Körperzusammensetzung (Evidenz widersprüchlich) | ⚪ widersprüchlich | 3.000 mg | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **MCT-Öl** | Mittelkettige Triglyzeride (MCT) | Schnelle Energie für Gehirn und Sport (Keto) | 🟡 moderat | 15 ml | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Omega-3-Fettsäuren** | Omega-3 Fatty Acids EPA/DHA | Für Herzgesundheit und Entzündungshemmung | 🟢 stark | 1.600 mg | — | — | [NIH ODS](https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/ | ✅ URL verifiziert |

## Mineralstoffe

| Name | Wissenschaftlich | Wofür | Evidenz | Dosierung NIH | Dosierung BfR | UL (EFSA) | Quelle | Quelle-URL | Prüfstatus |
|------|-----------------|-------|---------|--------------|--------------|-----------|--------|-----------|-----------|
| **Chrom** | Trivalentes Chrom (Chrom(III)) | Für Blutzuckerstoffwechsel | 🔴 schwach | 35 µg | — | — | [NIH ODS](https://ods.od.nih.gov/factsheets/Chromium-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Chromium-HealthProfessional/ | ✅ URL verifiziert |
| **Eisen** | Ferrum | Für Blutbildung und Sauerstofftransport | 🟢 stark | 8 mg | — | 45 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/ | ✅ URL verifiziert |
| **Jod** | Iodine | Für Schilddrüsenfunktion und Hormonbildung | 🟢 stark | 150 µg | — | 1.100 µg | [NIH ODS](https://ods.od.nih.gov/factsheets/Iodine-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Iodine-HealthProfessional/ | ✅ URL verifiziert |
| **Kalium** | Kaliumsalze | Senkt Blutdruck, schützt Herzrhythmus | 🟡 moderat | 2.600 mg | — | — | [NIH ODS](https://ods.od.nih.gov/factsheets/Potassium-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Potassium-HealthProfessional/ | ✅ URL verifiziert |
| **Kalzium** | Calcium | Für Knochen, Zähne und Muskelkontraktion | 🟢 stark | 1.000 mg | — | 2.500 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/ | ✅ URL verifiziert |
| **Kupfer** | Kupfer | Für Eisenstoffwechsel und Kollagenbildung | 🟡 moderat | 900 µg | 1.000 µg | 10 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/Copper-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Copper-HealthProfessional/ | ✅ URL verifiziert |
| **Magnesium** | Magnesium | Für Muskelentspannung, Nervenfunktion und Schlaf | 🟢 stark | 400 mg | — | 350 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/ | ✅ URL verifiziert |
| **Mangan** | Mangan | Für Knochen und antioxidative Enzyme | 🔴 schwach | 2,3 mg | — | 11 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/Manganese-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Manganese-HealthProfessional/ | ✅ URL verifiziert |
| **Selen** | Selenium | Für Schilddrüse, Immunsystem und Zellschutz | 🟢 stark | 55 µg | — | 400 µg | [NIH ODS](https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional/ | ✅ URL verifiziert |
| **Silizium** | Siliziumdioxid / Orthosiliziumsäure | Für Knochen, Bindegewebe und Haarstruktur | 🔴 schwach | 10 mg | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Zink** | Zinc | Für Immunsystem, Wundheilung und Hormonstoffwechsel | 🟢 stark | 11 mg | — | 40 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/ | ✅ URL verifiziert |

## Pflanzenstoffe

| Name | Wissenschaftlich | Wofür | Evidenz | Dosierung NIH | Dosierung BfR | UL (EFSA) | Quelle | Quelle-URL | Prüfstatus |
|------|-----------------|-------|---------|--------------|--------------|-----------|--------|-----------|-----------|
| **Ashwagandha** | Withania somnifera | Für Stressreduktion und Cortisol-Regulierung | 🟡 moderat | — | — | — | [NIH ODS](https://ods.od.nih.gov/factsheets/Ashwagandha-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Ashwagandha-HealthProfessional/ | ✅ URL verifiziert |
| **Berberin** | Berberin (Berberitze, Goldensiegelwurzel) | Für Blutzucker und Cholesterinsenkung | 🟡 moderat | 900 mg | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Echinacea** | Echinacea purpurea / angustifolia | Für Immunstärkung bei Erkältung | 🟡 moderat | — | — | — | [NCCIH](https://www.nccih.nih.gov/health/echinacea) | https://www.nccih.nih.gov/health/echinacea | ✅ URL verifiziert |
| **Ginkgo Biloba** | Ginkgo biloba | Für Durchblutung und Gedächtnisleistung | 🟡 moderat | 120 mg | — | — | [NCCIH](https://www.nccih.nih.gov/health/ginkgo) | https://www.nccih.nih.gov/health/ginkgo | ✅ URL verifiziert |
| **Kurkumin** | Curcuma longa | Für Entzündungshemmung und antioxidativen Schutz | 🟡 moderat | — | — | — | [NCCIH Turmeric](https://www.nccih.nih.gov/health/turmeric) | https://www.nccih.nih.gov/health/turmeric | ✅ Ersatzquelle verifiziert; ursprünglicher NIH-ODS-Einzelstofflink war 404 |
| **Mariendistel** | Silybum marianum (Silymarin) | Für Leberschutz und Leberregeneration | 🟡 moderat | 420 mg | — | — | [NCCIH](https://www.nccih.nih.gov/health/milk-thistle) | https://www.nccih.nih.gov/health/milk-thistle | ✅ URL verifiziert |
| **Quercetin** | Quercetin | Antioxidans und natürliches Antiallergikum | 🟡 moderat | 500 mg | — | 1.000 mg | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Resveratrol** | trans-Resveratrol | Für Herzschutz und zelluläre Langlebigkeit | 🔴 schwach | 150 mg | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Rhodiola Rosea** | Rhodiola rosea | Für Stressresistenz und geistige Leistungsfähigkeit | 🟡 moderat | 400 mg | — | — | [NCCIH](https://www.nccih.nih.gov/health/rhodiola) | https://www.nccih.nih.gov/health/rhodiola | ✅ URL verifiziert |

## Probiotika

| Name | Wissenschaftlich | Wofür | Evidenz | Dosierung NIH | Dosierung BfR | UL (EFSA) | Quelle | Quelle-URL | Prüfstatus |
|------|-----------------|-------|---------|--------------|--------------|-----------|--------|-----------|-----------|
| **Probiotika** | Lactobacillus spp. | Für Darmgesundheit und Immunsystem | 🟡 moderat | — | — | — | [NIH ODS](https://ods.od.nih.gov/factsheets/Probiotics-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Probiotics-HealthProfessional/ | ✅ URL verifiziert |

## Sonstiges

| Name | Wissenschaftlich | Wofür | Evidenz | Dosierung NIH | Dosierung BfR | UL (EFSA) | Quelle | Quelle-URL | Prüfstatus |
|------|-----------------|-------|---------|--------------|--------------|-----------|--------|-----------|-----------|
| **Alpha-Liponsäure** | Alpha-Liponsäure (ALA) | Antioxidans für Nerven und Insulinsensitivität | 🟡 moderat | 600 mg | — | 2.400 mg | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Beta-Glucan** | Beta-1,3/1,6-Glucan | Für Cholesterin, Blutzucker und Immunsystem | 🟡 moderat | 3.000 mg | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Coenzym Q10** | Ubiquinon | Für Energiestoffwechsel und Herzfunktion | 🟡 moderat | — | — | — | [NCCIH](https://www.nccih.nih.gov/health/coenzyme-q10) | https://www.nccih.nih.gov/health/coenzyme-q10 | ✅ Ersatzquelle verifiziert; ursprünglicher NIH-ODS-Einzelstofflink war 404 |
| **Hyaluronsäure** | Hyaluronsäure (Natriumhyaluronat) | Für Gelenke und Hauthydratation | 🔴 schwach | 120 mg | — | 200 mg | Quelle offen | — | ⚠️ fachlicher Review nötig |
| **Melatonin** | Melatonin (N-Acetyl-5-methoxytryptamin) | Für Einschlafen und Jet-Lag | 🟢 stark | — | — | 10 mg | [NCCIH](https://www.nccih.nih.gov/health/melatonin-what-you-need-to-know) | https://www.nccih.nih.gov/health/melatonin-what-you-need-to-know | ✅ URL verifiziert |
| **NADH** | Nicotinamid-Adenin-Dinukleotid (reduziert) | Für Zellenergie bei chronischer Erschöpfung | 🔴 schwach | 10 mg | — | — | Quelle offen | — | ⚠️ fachlicher Review nötig |

## Vitamine

| Name | Wissenschaftlich | Wofür | Evidenz | Dosierung NIH | Dosierung BfR | UL (EFSA) | Quelle | Quelle-URL | Prüfstatus |
|------|-----------------|-------|---------|--------------|--------------|-----------|--------|-----------|-----------|
| **Biotin (Vitamin B7)** | Biotin | Für Haarwachstum und Energiestoffwechsel | 🟡 moderat | 30 µg | 40 µg | — | [NIH ODS](https://ods.od.nih.gov/factsheets/Biotin-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Biotin-HealthProfessional/ | ✅ URL verifiziert |
| **Folsäure** | Folat | Für Zellteilung und Schwangerschaft | 🟢 stark | 400 µg | — | 1.000 µg | [NIH ODS](https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/ | ✅ URL verifiziert |
| **Niacin (Vitamin B3)** | Niacin / Nicotinsäure / Nicotinamid | Für Energiestoffwechsel und DNA-Reparatur | 🟡 moderat | 16 mg NE | 16 mg NE | 35 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/Niacin-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Niacin-HealthProfessional/ | ✅ URL verifiziert |
| **Pantothensäure (Vitamin B5)** | Pantothensäure | Für Energiestoffwechsel und Cortisolproduktion | 🔴 schwach | 5 mg | 6 mg | — | [NIH ODS](https://ods.od.nih.gov/factsheets/PantothenicAcid-HealthProfessional/) | https://ods.od.nih.gov/factsheets/PantothenicAcid-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin A** | Retinol | Für Sehkraft, Immunsystem und Haut | 🟢 stark | 900 µg RAE | — | 3.000 µg RAE | [NIH ODS](https://ods.od.nih.gov/factsheets/VitaminA-HealthProfessional/) | https://ods.od.nih.gov/factsheets/VitaminA-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin B1 (Thiamin)** | Thiamin | Für Energiestoffwechsel und Nervensystem | 🟡 moderat | 1,2 mg | 1,3 mg | — | [NIH ODS](https://ods.od.nih.gov/factsheets/Thiamin-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Thiamin-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin B12** | Cobalamin | Für Nervengesundheit, Blutbildung und Energie | 🟢 stark | 2,4 µg | — | — | [NIH ODS](https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/) | https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin B2 (Riboflavin)** | Riboflavin | Für Energiestoffwechsel und B-Vitamin-Aktivierung | 🟡 moderat | 1,3 mg | 1,4 mg | — | [NIH ODS](https://ods.od.nih.gov/factsheets/Riboflavin-HealthProfessional/) | https://ods.od.nih.gov/factsheets/Riboflavin-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin B6** | Pyridoxin | Für Nervensystem, Immunsystem und Hormonstoffwechsel | 🟢 stark | 1,3 mg | — | 100 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/VitaminB6-HealthProfessional/) | https://ods.od.nih.gov/factsheets/VitaminB6-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin C** | Ascorbinsäure | Für Immunsystem, Kollagenbildung und Zellschutz | 🟢 stark | 90 mg | — | 2.000 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/) | https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin D** | Cholecalciferol | Für Knochen, Immunsystem und Stimmungsregulation | 🟢 stark | 600 IU | — | 4.000 IU | [NIH ODS](https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/) | https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin E** | Alpha-Tocopherol | Für antioxidativen Zellschutz und Immunsystem | 🟢 stark | 15 mg | — | 1.000 mg | [NIH ODS](https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/) | https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin K** | Phyllochinon | Für Blutgerinnung und Knochengesundheit | 🟡 moderat | 120 µg | — | — | [NIH ODS](https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/) | https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/ | ✅ URL verifiziert |
| **Vitamin K2** | Menaquinon (Vitamin K2) | Für Knochengesundheit und Aktivierung Vitamin-K-abhängiger Proteine | 🟡 moderat | — | — | — | [NIH ODS](https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/) | https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/ | ✅ URL verifiziert |

---

# Krankheiten (221 Einträge)

**Quellen:** ICD-10-GM/BfArM (Klassifikation), AWMF-Leitlinien (Standard-of-Care), IQWiG/Gesundheitsinformation.de, MedlinePlus, RKI (Epidemiologie), Orphanet (seltene Erkrankungen)


## Angeboren

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `Q20` | **Angeborener Herzfehler** | Kongenitaler Herzfehler | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie + Patienteninformation | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| `Q65` | **Hüftdysplasie** | Hüftgelenksdysplasie | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `Q89` | **Marfan-Syndrom** | Fibrillinopathie | Selten | 🚨 Ja | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `Q61` | **Zystische Nierenerkrankung** | Polyzystische Nierenerkrankung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |

## Atemwege

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `J20` | **Akute Bronchitis** | Tracheobronchitis | Sehr häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/akute-bronchitis.html) | Klassifikation | ✅ URL live + semantisch passend |
| `J06` | **Akute Erkältung** | Erkältung | Sehr häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/erkaeltung.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `J45` | **Asthma bronchiale** | Asthma | Häufig | 🚨 Ja | AWMF-Leitlinie | [GINA Asthma](https://ginasthma.org) | Leitlinie | ✅ URL live + semantisch passend |
| `J96` | **Atemversagen** | Respiratorische Insuffizienz | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `J44` | **COPD** | Chronisch obstruktive Lungenerkrankung | Häufig | Nein | AWMF-Leitlinie | [GOLD COPD](https://goldcopd.org) | Leitlinie | ✅ URL live + semantisch passend |
| `J02` | **Halsschmerzen** | Pharyngitis | Sehr häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/erkaeltung.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `J38` | **Heiserkeit** | Dysphonie | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie + Patienteninformation | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| `J30` | **Heuschnupfen** | Allergetische Rhinitis | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/allergien.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `R05` | **Husten** | Tussis | Sehr häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/husten.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `J10` | **Influenza** | Grippe | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/grippe.html) | Klassifikation | ✅ URL live + semantisch passend |
| `J18` | **Lungenentzündung** | Pneumonie | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/lungenentzuendung.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `J03` | **Mandelentzündung** | Tonsilitis | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/mandelentzuendung.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `J32` | **Nasennebenhöhlenentzündung** | Sinusitis | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/nasennebenhoehlenentzuendung.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `J95` | **Pneumothorax** | Lungenkollaps | Häufig | 🚨 Ja | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `J00` | **Schnupfen** | Akute Rhinitis | Sehr häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/erkaeltung.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `J12` | **Virale Lungenentzündung** | Virale Pneumonie | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/lungenentzuendung.html) | Klassifikation | ✅ URL live + semantisch passend |

## Augen & Ohren

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `H10` | **Bindehautentzündung** | Konjunktivitis | Sehr häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/bindehautentzuendung.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `H61` | **Cerumen-Pfropf** | Ohrenschmalz-Pfropfen | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/ohrenschmalz-pfropf.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `H00` | **Gerstenkorn** | Hordeolum | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/gerstenkorn-und-hagelkorn-augenlidentzuendung.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `H25` | **Grauer Star** | Katarakt | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/grauer-star-katarakt.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `H40` | **Grüner Star** | Glaukom | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/gruener-star-glaukom.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `H26` | **Katarakt** | Linsentrübung | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/grauer-star-katarakt.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `H52` | **Kurzsichtigkeit** | Myopie | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/kurzsichtigkeit-myopie.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `H35` | **Makuladegeneration** | Altersbedingte Makuladegeneration (AMD) | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/altersabhaengige-makuladegeneration-amd.html) | Klassifikation | ✅ URL live + semantisch passend |
| `H65` | **Mittelohrentzündung** | Otitis media acuta | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/mittelohrentzuendung.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `H90` | **Schwerhörigkeit** | Hypakusis | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/schwerhoerigkeit-und-gehoerlosigkeit-bei-erwachsenen.html) | Klassifikation | ✅ URL live + semantisch passend |
| `H81` | **Schwindel (Vestibulariskrise)** | Vertigo | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/gutartiger-lagerungsschwindel.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |

## Bewegungsapparat

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `M13` | **Arthritis** | Gelenksentzündung | Häufig | Nein | ⚠️ dauerhaft intern | — | intern | ⚠️ dauerhaft intern — laut P6-Final begründet |
| `M17` | **Arthrose** | Gelenkverschleiß | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/arthrose.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `M51` | **Bandscheibenvorfall** | Bandscheibenprolaps | Häufig | 🚨 Ja | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/bandscheibenvorfall.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `M79` | **Fibromyalgie** | Fibromyalgisches Syndrom | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/fibromyalgie.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `M19` | **Fingergelenksarthrose** | Osteoarthrose der Finger | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/arthrose.html) | Klassifikation | ✅ URL live + semantisch passend |
| `M10` | **Gichtarthritis** | Podagra | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/gicht.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `M16` | **Hüftarthrose** | Coxarthrose | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/hueftarthrose-coxarthrose.html) | Klassifikation | ✅ URL live + semantisch passend |
| `M15` | **Kniearthrose** | Gonarthrose | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/arthrose.html) | Klassifikation | ✅ URL live + semantisch passend |
| `M81` | **Osteoporose** | Knochenschwund | Häufig | Nein | AWMF-Leitlinie | [DVO](https://www.dvo-osteologie.org) | Leitlinie | ❌ URL defekt — Domain nicht erreichbar (2026-05-25) |
| `M07` | **Psoriasis-Arthritis** | PsA | Selten | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/schuppenflechte-mit-gelenkentzuendung-psoriasis-arthritis.html) | Klassifikation | ✅ URL live + semantisch passend |
| `M06` | **Reaktive Arthritis** | Reitersche Erkrankung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `M05` | **Rheumatoide Arthritis** | RA | Häufig | Nein | AWMF-Leitlinie | [AWMF](https://www.awmf.org) | Leitlinie | ⚠️ URL live, semantischer Bezug unsicher (bare domain) |
| `M54` | **Rückenschmerzen** | Dorsalgie | Sehr häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/ruecken-und-kreuzschmerzen.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `M75` | **Schultersteife** | Adhäsive Kapsulitis | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/schultersteife.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `M65` | **Sehnenscheidenentzündung** | Tenosynovitis | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/sehnenscheidenentzuendung.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `M43` | **Skoliose** | Wirbelsäulenverkrümmung | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/skoliose-im-jugendalter.html) | Klassifikation | ✅ URL live + semantisch passend |
| `M47` | **Spondylose** | Wirbelsäulenverschleiß | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `M77` | **Tennisarm** | Epicondylitis lateralis | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/tennisarm-und-golferarm.html) | Klassifikation | ✅ URL live + semantisch passend |
| `M42` | **Wirbelsäulenerkrankung** | Spondylose | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/ruecken-und-kreuzschmerzen.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |

## Blut

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `D64` | **Anämie** | Blutarmut | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `D50` | **Eisenmangelanämie** | Eisenmangel | Sehr häufig | Nein | AWMF-Leitlinie | [Onkopedia](https://www.onkopedia.com/de/onkopedia/guidelines/eisenmangel-und-eisenmangelanaemie/@@guideline/html/index.html) | Leitlinie | ✅ URL live + semantisch passend |
| `D86` | **Sarkoidose** | Boeck-Krankheit | Selten | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `D69` | **Thrombozytopenie** | Thrombozytenmangel | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `D51` | **Vitamin-B12-Mangel-Anämie** | Perniziöse Anämie | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |

## Endokrinologie

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `E06` | **Hashimoto-Thyreoiditis** | Autoimmun-Thyreoiditis | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `E05` | **Hyperthyreose** | Schilddrüsenüberfunktion | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `E03` | **Hypothyreose** | Schilddrüsenunterfunktion | Häufig | Nein | AWMF-Leitlinie | [AWMF-Leitlinie](https://register.awmf.org/de/leitlinien/detail/053-046) | Leitlinie | ✅ URL live + semantisch passend |
| `E27` | **Nebennierenrindeninsuffizienz** | Addison-Krankheit | Selten | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `E28` | **Polyzystisches Ovarialsyndrom** | Stein-Leventhal-Syndrom | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |

## Gynäkologie

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `N73` | **Adnexitis** | Pelvic Inflammatory Disease (PID) | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `N91` | **Ausbleiben der Menstruation** | Amenorrhoe | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `N80` | **Endometriose** | Adenomyosis externa | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/endometriose.html) | Klassifikation | ✅ URL live + semantisch passend |
| `O60` | **Frühgeburt** | Partus praematurus | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/was-kann-man-tun-wenn-sich-eine-fruehgeburt-ankuendigt.html) | Klassifikation | ✅ URL live + semantisch passend |
| `N83` | **Ovarialzyste** | Ovarielle Zyste | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/eierstockzysten-ovarialzysten.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `N94` | **Prämenstruelles Syndrom** | PMS | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/praemenstruelles-syndrom-pms.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `O24` | **Schwangerschaftsdiabetes** | Gestationsdiabetes | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/schwangerschaftsdiabetes.html) | Klassifikation | ✅ URL live + semantisch passend |
| `O10` | **Schwangerschaftshypertonie** | Gestationshypertonie | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie + Patienteninformation | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| `N92` | **Starke Regelblutung** | Menorrhagie | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `N95` | **Wechseljahresbeschwerden** | Klimakterium | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/wechseljahrsbeschwerden.html) | Klassifikation | ✅ URL live + semantisch passend |

## Haut

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `L70` | **Akne** | Acne vulgaris | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/akne.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `L57` | **Aktinische Keratose** | Solarkeratose | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `L72` | **Atheromatöse Zyste** | Epidermoidalzyste | Häufig | Nein | ⚠️ dauerhaft intern | — | intern | ⚠️ dauerhaft intern — laut P6-Final begründet |
| `L02` | **Furunkel** | Lochabszess | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/furunkel-und-karbunkel.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `L01` | **Impetigo** | Eiterflechte | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/borkenflechte-impetigo.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `L29` | **Juckreiz** | Pruritus | Sehr häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `L23` | **Kontaktekzem** | Kontaktdermatitis | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `L43` | **Lichen planus** | Lichen ruber planus | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `L93` | **Lupus erythematodes** | Systemischer Lupus erythematodes (SLE) | Selten | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `L60` | **Nagelpilz** | Onychomykose | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/nagelpilz.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `L20` | **Neurodermitis** | Atopische Dermatitis | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `L03` | **Phlegmone** | Zellgewebsentzündung | Häufig | 🚨 Ja | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/wundrose-und-phlegmone.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `L71` | **Rosazea** | Couperose | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/rosazea.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `L40` | **Schuppenflechte** | Psoriasis | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/schuppenflechte-psoriasis.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `L50` | **Urtikaria** | Nesselsucht | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `L08` | **Wundrose** | Erysipel | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/wundrose-und-phlegmone.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |

## Herz-Kreislauf

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `I20` | **Angina pectoris** | Brustenge | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/koronare-herzkrankheit-khk.html) | Klassifikation | ✅ URL live + semantisch passend |
| `I35` | **Aortenklappenstenose** | Aortenklappenstenose | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/herzklappenfehler.html) | Klassifikation | ✅ URL live + semantisch passend |
| `I70` | **Arteriosklerose** | Atherosklerose | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `I10` | **Bluthochdruck** | Hypertonie | Sehr häufig | Nein | AWMF-Leitlinie | [ESC](https://www.escardio.org) | Leitlinie + Patienteninformation | ⚠️ URL live, semantischer Bezug unsicher (bare domain) |
| `I87` | **Chronisch venöse Insuffizienz** | Veneninsuffizienz | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `I21` | **Herzinfarkt** | Myokardinfarkt | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `I50` | **Herzinsuffizienz** | Herzschwäche | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/herzschwaeche.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `I49` | **Herzrhythmusstörung** | Arrhythmie | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/herzrhythmusstoerungen.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `I11` | **Hypertensive Herzkrankheit** | Hypertensive Herzerkrankung | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/bluthochdruck-hypertonie.html) | Klassifikation | ✅ URL live + semantisch passend |
| `I42` | **Kardiomyopathie** | Herzmuskelerkrankung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `I25` | **Koronare Herzkrankheit** | Ischämische Herzkrankheit | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/koronare-herzkrankheit-khk.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `I83` | **Krampfadern** | Varizen | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/krampfadern.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `I26` | **Lungenembolie** | Pulmonalembolie | Häufig | 🚨 Ja | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/lungenembolie.html) | Klassifikation | ✅ URL live + semantisch passend |
| `I73` | **Periphere arterielle Verschlusskrankheit** | Periphere Verschlusskrankheit | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/durchblutungsstoerung-der-beine-pavk.html) | Klassifikation | ✅ URL live + semantisch passend |
| `I80` | **Tiefe Beinvenenthrombose** | TVT | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/tiefe-venenthrombose-tvt.html) | Klassifikation | ✅ URL live + semantisch passend |
| `I48` | **Vorhofflimmern** | Absolute Arrhythmie | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/vorhofflimmern.html) | Klassifikation | ✅ URL live + semantisch passend |

## Infektionskrankheiten

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `B34` | **COVID-19** | Coronavirus-Erkrankung 2019 | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/covid-19-coronavirus-krankheit.html) | Klassifikation | ✅ URL live + semantisch passend |
| `B18` | **Chronische Virushepatitis** | Persistierende Virushepatitis | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/hepatitis-b.html) | Klassifikation | ✅ URL live + semantisch passend |
| `B35` | **Fußpilz** | Tinea pedis | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/fusspilz.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `B02` | **Gürtelrose** | Herpes zoster | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/guertelrose.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `B20` | **HIV-Infektion** | Humane Immundefizienz-Virus-Infektion | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `B00` | **Herpes simplex** | Herpes | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/lippenherpes.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `A09` | **Infektiöse Gastroenteritis** | Magen-Darm-Grippe | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/durchfall.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `B86` | **Krätze** | Scabies | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/kraetze-skabies.html) | Klassifikation | ✅ URL live + semantisch passend |
| `B37` | **Pilzinfektion** | Mykose | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/pilzinfektion-der-vagina-scheidenpilz.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `A41` | **Sepsis** | Blutvergiftung | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `A15` | **Tuberkulose** | Lungenschwindsucht | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `B19` | **Virushepatitis** | Hepatitis | Häufig | 🚨 Ja | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/hepatitis-b.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `A46` | **Wundrose (Erysipel)** | Erysipel | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/wundrose-und-phlegmone.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |

## Neurologie

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `G54` | **Bandscheibenvorfall mit Nervenwurzelkompression** | Diskushernie mit Radikulopathie | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/bandscheibenvorfall.html) | Klassifikation | ✅ URL live + semantisch passend |
| `G89` | **Chronischer Schmerz** | Chronische Schmerzstörung | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/chronische-schmerzen-verstehen.html) | Klassifikation | ✅ URL live + semantisch passend |
| `G40` | **Epilepsie** | Krampfleiden | Häufig | 🚨 Ja | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/epilepsie.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `G51` | **Fazialisparese** | Gesichtsnervenlähmung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `G61` | **Guillain-Barré-Syndrom** | Landry-Guillain-Barré-Strohl-Syndrom | Selten | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `I63` | **Hirninfarkt** | Schlaganfall | Häufig | 🚨 Ja | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/schlaganfall.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `R51` | **Kopfschmerzen** | Kopfweh | Sehr häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/kopfschmerzen.html) | Leitlinie + Patienteninformation | ⚠️ URL live-Status unklar — nicht in DB, Überprüfung erforderlich |
| `G43` | **Migräne** | Migränekopfschmerz | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/migraene.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `G35` | **Multiple Sklerose** | Encephalomyelitis disseminata | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `R55` | **Ohnmacht** | Synkope | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `G20` | **Parkinson-Krankheit** | Morbus Parkinson | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/parkinson.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `G47` | **Schlafapnoe** | Obstruktives Schlafapnoe-Syndrom (OSAS) | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/obstruktive-schlafapnoe.html) | Klassifikation | ✅ URL live + semantisch passend |
| `I64` | **Schlaganfall** | Hirninfarkt | Häufig | 🚨 Ja | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/schlaganfall.html) | Klassifikation | ✅ URL live + semantisch passend |
| `G44` | **Spannungskopfschmerz** | Spannungskopfschmerzen | Sehr häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/spannungskopfschmerzen.html) | Klassifikation | ✅ URL live + semantisch passend |
| `I65` | **Verschluss der hirnversorgenden Arterien** | Karotisstenose | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `G80` | **Zerebralparese** | Cerebralparese | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |

## Niere

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `N17` | **Akutes Nierenversagen** | Akutes Niereninsuffizienz | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `N30` | **Blasenentzündung** | Zystitis | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/akute-blasenentzuendung.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `N18` | **Chronische Niereninsuffizienz** | CKD | Häufig | Nein | AWMF-Leitlinie | [KDIGO](https://kdigo.org) | Leitlinie | ✅ URL live + semantisch passend |
| `N39` | **Harnwegsinfektion** | Harnwegsinfektion | Sehr häufig | Nein | AWMF-Leitlinie | — | Leitlinie + Patienteninformation | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| `N23` | **Nierenkolik** | Harnkolik | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/nierensteine-und-harnleitersteine.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `N20` | **Nierensteine** | Nephrolithiasis | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/nierensteine-und-harnleitersteine.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |

## Onkologie

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `C67` | **Blasenkrebs** | Urothelkarzinom | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `C50` | **Brustkrebs** | Mammakarzinom | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/brustkrebs.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `C18` | **Darmkrebs** | Kolonkarzinom | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/darmkrebs.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `C56` | **Eierstockkrebs** | Ovarialkarzinom | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `C54` | **Gebärmutterkrebs** | Endometriumkarzinom | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `C91` | **Leukämie** | Blutkrebs | Selten | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `C34` | **Lungenkrebs** | Bronchialkarzinom | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/lungenkrebs.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `C43` | **Melanom** | Schwarzer Hautkrebs | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `C61` | **Prostatakrebs** | Prostatakarzinom | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/oertlich-begrenzter-prostatakrebs.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `C73` | **Schilddrüsenkrebs** | Karzinom der Schilddrüse | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |

## Psyche

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `F90` | **ADHS** | Aufmerksamkeitsdefizit-Hyperaktivitätssyndrom | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/aufmerksamkeitsdefizit-und-hyperaktivitaetsstoerung-adhs.html) | Klassifikation | ✅ URL live + semantisch passend |
| `F10` | **Alkoholabhängigkeit** | Alkoholsucht | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/alkohol.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `F41` | **Angststörung** | Angsterkrankung | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/generalisierte-angststoerung.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `F84` | **Autismus-Spektrum-Störung** | Autismus | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/autismus.html) | Klassifikation | ✅ URL live + semantisch passend |
| `F98` | **Bettnässen** | Enuresis nocturna | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/bettnaessen.html) | Klassifikation | ✅ URL live + semantisch passend |
| `F31` | **Bipolare Störung** | Manisch-depressive Erkrankung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `Z73` | **Burnout-Syndrom** | Erschöpfungssyndrom | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `F32` | **Depression** | Depressive Episode | Sehr häufig | Nein | AWMF-Leitlinie | [AWMF-Leitlinie](https://register.awmf.org/de/leitlinien/detail/038-013) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `F50` | **Essstörung** | Essstörungen | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/magersucht-anorexie.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `F17` | **Nikotinabhängigkeit** | Tabakabhängigkeit | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/rauchen.html) | Klassifikation | ✅ URL live + semantisch passend |
| `F11` | **Opiatabhängigkeit** | Heroinabhängigkeit | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `F06` | **Organische psychische Störung** | Organisches Psychosyndrom | Häufig | Nein | ⚠️ dauerhaft intern | — | intern | ⚠️ dauerhaft intern — laut P6-Final begründet |
| `F60` | **Persönlichkeitsstörung** | Persönlichkeitszug-Störung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `F40` | **Phobische Störung** | Phobische Angststörung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `F43` | **Posttraumatische Belastungsstörung** | PTBS | Häufig | 🚨 Ja | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/posttraumatische-belastungsstoerung.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `F33` | **Rezidivierende depressive Störung** | Rezidivierende Depression | Häufig | 🚨 Ja | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/depression.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `F20` | **Schizophrenie** | Schizophrenie-Spektrum-Störung | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/schizophrenie.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `F51` | **Schlafstörung** | Insomnie | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/schlafprobleme-und-schlafstoerungen-insomnie.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `F45` | **Somatoforme Störung** | Funktionsstörung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `F91` | **Störung des Sozialverhaltens** | Verhaltensstörung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `F42` | **Zwangsstörung** | Obsessive-Compulsive Disorder (OCD) | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/zwangsstoerungen.html) | Klassifikation | ✅ URL live + semantisch passend |

## Sonstiges

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `Z87` | **Chronische Erkrankung in der Vorgeschichte** | Chronische Krankheit in der Vorgeschichte | Sehr häufig | Nein | ⚠️ dauerhaft intern | — | intern | ⚠️ dauerhaft intern — laut P6-Final begründet |
| `R53` | **Erschöpfung** | Fatigue | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `R00` | **Herzrasen** | Tachykardie | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `Z03` | **Post-COVID-Syndrom** | Long-COVID | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |

## Stoffwechsel

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `E66` | **Adipositas** | Fettsucht | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/starkes-uebergewicht-adipositas.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `E10` | **Diabetes mellitus Typ 1** | Typ-1-Diabetes | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/diabetes-typ-1.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `E11` | **Diabetes mellitus Typ 2** | Zuckerkrankheit | Sehr häufig | Nein | AWMF-Leitlinie | [AWMF-Leitlinie](https://register.awmf.org/de/leitlinien/detail/057-001) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `E14` | **Diabetes mellitus, nicht näher bezeichnet** | Zuckerkrankheit | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/diabetes-typ-2.html) | Klassifikation | ✅ URL live + semantisch passend |
| `E63` | **Eisenmangel** | Eisenmangel-Anämie | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/eisenmangel-und-eisenmangel-anaemie.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `R73` | **Erhöhter Blutzucker** | Hyperglykämie | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/nuechternblutzucker.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `E78` | **Fettstoffwechselstörung** | Dyslipidämie | Sehr häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/erhoehte-cholesterinwerte.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `E79` | **Gicht** | Harnsäurekrankheit | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/gicht.html) | Klassifikation | ✅ URL live + semantisch passend |
| `E61` | **Magnesiummangel** | Hypomagnesiämie | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/magnesium.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `E55` | **Vitamin-D-Mangel** | Vitamin-D-Insuffizienz | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/vitamin-d-mangel.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `E84` | **Zystische Fibrose** | Mukoviszidose | Selten | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |

## Urologie

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `N48` | **Erektile Dysfunktion** | Impotenz | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `N40` | **Gutartige Prostatavergrößerung** | Benigne Prostatahyperplasie | Sehr häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/gutartige-prostatavergroesserung.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `N41` | **Prostatitis** | Prostatenentzündung | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie + Patienteninformation | ❌ URL defekt — v4-URL war 404, entfernt in v5 |

## Verdauung

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `K70` | **Alkoholische Lebererkrankung** | Alkoholische Hepatitis | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `K35` | **Appendizitis** | Blinddarmentzündung | Häufig | 🚨 Ja | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/blinddarmentzuendung-appendizitis.html) | Klassifikation | ✅ URL live + semantisch passend |
| `R10` | **Bauchschmerzen** | Abdominalschmerzen | Sehr häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/bauchschmerzen.html) | Leitlinie + Patienteninformation | ⚠️ URL live-Status unklar — nicht in DB, Überprüfung erforderlich |
| `K86` | **Chronische Bauchspeicheldrüsenentzündung** | Pankreatitis chronica | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `K51` | **Colitis ulcerosa** | Colitis ulcerosa | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/colitis-ulcerosa.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `K92` | **Darmblutung** | Gastrointestinale Blutung | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `K57` | **Divertikulose** | Divertikelbefund | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/divertikelkrankheit-und-divertikulitis.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `R74` | **Erhöhte Leberenzyme** | Transaminasenerhöhung | Häufig | Nein | ⚠️ dauerhaft intern | — | intern | ⚠️ dauerhaft intern — laut P6-Final begründet |
| `K81` | **Gallenblasenentzündung** | Cholezystitis | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/gallensteine.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `K80` | **Gallensteine** | Cholelithiasis | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/gallensteine.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `K29` | **Gastritis** | Magenschleimhautentzündung | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/magenschleimhautentzuendung-gastritis.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `K52` | **Gastroenteritis** | Magen-Darm-Entzündung | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/durchfall.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `K87` | **Hämorrhoiden** | Hämorrhoiden-Leiden | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/vergroesserte-haemorrhoiden-haemorrhoidalleiden.html) | Klassifikation | ✅ URL live + semantisch passend |
| `K72` | **Leberversagen** | Hepatisches Versagen | Selten | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `K74` | **Leberzirrhose** | Leberzirrhosis | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `K25` | **Magengeschwür** | Ulcus ventriculi | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/magen-und-zwoelffingerdarmgeschwuere.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `K50` | **Morbus Crohn** | Crohnsche Erkrankung | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/morbus-crohn.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `K43` | **Narbenhernie** | Incisional Hernia | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/hernien.html) | Klassifikation | ✅ URL live + semantisch passend |
| `K85` | **Pankreatitis** | Bauchspeicheldrüsenentzündung | Häufig | 🚨 Ja | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/akute-entzuendung-der-bauchspeicheldruese-pankreatitis.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `K58` | **Reizdarmsyndrom** | IBS | Häufig | Nein | AWMF-Leitlinie | [AWMF](https://www.awmf.org) | Leitlinie | ⚠️ URL live, semantischer Bezug unsicher (bare domain) |
| `K21` | **Sodbrennen** | Reflux | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/sodbrennen-und-refluxkrankheit.html) | Leitlinie + Patienteninformation | ✅ URL live + semantisch passend |
| `K01` | **Weisheitszahn** | Dritte Molaren | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/weisheitszaehne.html) | Klassifikation | ✅ URL live + semantisch passend |
| `K05` | **Zahnfleischentzündung** | Gingivitis | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/zahnfleischentzuendung-und-parodontitis.html) | Klassifikation | ✅ URL live + semantisch passend |
| `K26` | **Zwölffingerdarmgeschwür** | Duodenalgeschwür | Häufig | Nein | Gesundheitsinformation.de | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/magen-und-zwoelffingerdarmgeschwuere.html) | Patienteninformation | ✅ URL live + semantisch passend |
| `K90` | **Zöliakie** | Einheimische Sprue | Häufig | Nein | ICD-10-GM / BfArM | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/zoeliakie-glutenunvertraeglichkeit.html) | Klassifikation | ✅ URL live + semantisch passend |
| `R11` | **Übelkeit und Erbrechen** | Nausea und Vomitus | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |

## Verletzungen

| ICD-10 | Name | Synonym | Häufigkeit | Notfall | Quelle Kurz | Quelle URL | Typ | Status |
|--------|------|---------|------------|---------|------------|-----------|-----|--------|
| `T78` | **Anaphylaxie** | Anaphylaktischer Schock | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `S12` | **Halswirbelkörperfraktur** | Cervikalfraktur | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `S62` | **Handknochen-Fraktur** | Fraktur der Handknochen | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `S82` | **Knöchelfraktur** | Sprunggelenkfraktur | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `S72` | **Oberschenkelhalsfraktur** | Schenkelhalsfraktur | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `S22` | **Rippenfraktur** | Rippenfraktur | Häufig | Nein | ICD-10-GM / BfArM | — | Klassifikation | ⚠️ Quelle nicht verlinkt im Export |
| `S06` | **Schädel-Hirn-Trauma** | Schädel-Hirn-Verletzung | Häufig | 🚨 Ja | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `S52` | **Unterarmfraktur** | Radiusfraktur | Häufig | Nein | AWMF-Leitlinie | — | Leitlinie | ⚠️ Quelle nicht verlinkt im Export |
| `T14` | **Verstauchung** | Distorsion | Häufig | Nein | AWMF-Leitlinie | [Gesundheitsinformation.de](https://www.gesundheitsinformation.de/verletzungen.html) | Leitlinie + Patienteninformation | ⚠️ URL live-Status unklar — nicht in DB, Überprüfung erforderlich |
