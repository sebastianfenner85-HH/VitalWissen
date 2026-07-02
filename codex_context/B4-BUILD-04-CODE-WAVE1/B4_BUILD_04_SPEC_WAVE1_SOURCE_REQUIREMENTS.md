# B4-BUILD-04-SPEC-WAVE1 — Quellenbedarf je Karte

Grundsatz: Konkrete Quellen wurden nur genannt, wenn sie bereits lokal im Projektmaterial vorhanden sind (`src/lib/laborwert_k3_map.js`, bestehende B4-Karten). Keine neue externe Recherche, keine erfundenen Links.

| Laborwert | Direction | Karte | Quellenklasse | Lokale Quelle vorhanden | Vor Codex zwingend? | Nur spätere Verbesserung? | Offene Quellenfrage | Status |
|---|---|---|---|---|---|---|---|---|
| Hämoglobin | high | Kontext und mögliche Auslöser | guideline | Ja — K3-Map `718-7` high (EHA/DGHO) | nein | nein | keine | SOURCE_OK |
| Hämoglobin | high | Verlaufskontrolle | clinical_consensus | Nein, allgemeine Praxis | nein | ja — spezifische Monitoring-Leitlinie könnte ergänzt werden | welche Leitlinie empfiehlt konkretes Intervall? | SOURCE_REQUIRED_LATER |
| Hämoglobin | low | Eisenstatus und Ursache | guideline | Ja — K3-Map `718-7` low (WHO/AWMF) | nein | nein | keine | SOURCE_OK |
| Hämoglobin | low | Warnzeichen | clinical_consensus | Nein, allgemeiner Red-Flag-Konsens | nein | ja | spezifische Quelle für Red-Flag-Liste wünschenswert | SOURCE_REQUIRED_LATER |
| Hämoglobin | low | Verlaufskontrolle | clinical_consensus | Nein | nein | ja | wie Hämoglobin high | SOURCE_REQUIRED_LATER |
| TSH | high | fT3/fT4 gemeinsam | guideline | Ja — K3-Map `3016-3` high (AWMF S2k Hypothyreose 2022) | nein | nein | keine | SOURCE_OK |
| TSH | high | Biotin-Einnahme angeben | clinical_consensus | Ja — bereits in K3-Map `3016-3` low.caution genannt | nein | ja — externe FDA/Endokrinologie-Quelle könnte ergänzt werden | präzise externe Quelle für Biotin-Interferenz | SOURCE_REQUIRED_LATER |
| TSH | high | Arztgespräch bei starker Abweichung | clinical_consensus | Nein | nein | ja | keine spezifische Leitlinie identifiziert | SOURCE_REQUIRED_LATER |
| TSH | low | fT3/fT4 gemeinsam (Hyperthyreose) | guideline | Ja — K3-Map `3016-3` low (AWMF S2k Hyperthyreose 2020) | nein | nein | keine | SOURCE_OK |
| TSH | low | Biotin-Einnahme verfälscht | clinical_consensus | Ja — identisch zu TSH high | nein | ja | wie TSH high | SOURCE_REQUIRED_LATER |
| TSH | low | Medikamenten-/Supplement-Kontext | clinical_consensus | Nein | nein | ja | keine spezifische Leitlinie identifiziert | SOURCE_REQUIRED_LATER |
| Kreatinin | high | Gemeinsam mit eGFR | guideline | Ja — K3-Map `2160-0` high (KDIGO 2024/NVL) | nein | nein | keine | SOURCE_OK |
| Kreatinin | high | Hydratation/Muskelmasse/Belastung | clinical_consensus | Ja — direkt aus K3-Map-Text | nein | nein | keine | SOURCE_OK |
| Kreatinin | high | Arztgespräch bei wiederholten Werten | clinical_consensus | Nein | nein | ja | keine spezifische Leitlinie identifiziert | SOURCE_REQUIRED_LATER |
| Kreatinin | low | Muskelmasse/Ernährungsstatus | clinical_consensus | Ja — direkt aus K3-Map-Text | nein | nein | keine | SOURCE_OK |
| eGFR | low | Wiederholungsmessung/Verlauf | guideline | Ja — K3-Map `62238-1` low (KDIGO 2024/NVL CKD) | nein | nein | keine | SOURCE_OK |
| eGFR | low | Kreatinin/Urin-Albumin | guideline | Ja — identisch zu eGFR L1 | nein | nein | keine | SOURCE_OK |
| eGFR | low | Medikamente/Nierenbelastung | clinical_consensus | Nein | nein | ja | keine spezifische Leitlinie identifiziert | SOURCE_REQUIRED_LATER |
| Glukose nüchtern | high | Nüchternstatus/Messkontext | clinical_consensus | Ja — direkt aus K3-Map-Text | nein | nein | keine | SOURCE_OK |
| Glukose nüchtern | high | HbA1c als Verlaufskontext | guideline | Ja — DDG/ADA, identisch zur bestehenden HbA1c-B4-Karte | nein | nein | keine | SOURCE_OK |
| Glukose nüchtern | high | Wiederholungsmessung/ärztliche Einordnung | guideline | Ja — K3-Map `2345-7` high (DDG/ADA) | nein | nein | keine | SOURCE_OK |
| Glukose nüchtern | low | Sicherheitskontext bei niedrigen Werten | clinical_consensus | Ja — direkt aus K3-Map-Text | nein | nein | keine | SOURCE_OK |
| Glukose nüchtern | low | Ursache bei wiederholt niedrigen Werten | clinical_consensus | Nein | nein | ja | keine spezifische Leitlinie identifiziert | SOURCE_REQUIRED_LATER |
| HDL-Cholesterin | low | Vollständiges Lipidprofil | guideline | Ja — K3-Map `2085-9` low (ESC/EAS 2019/DGK) | nein | nein | keine | SOURCE_OK |
| HDL-Cholesterin | low | Bewegung und Ernährung | clinical_consensus | Nein, bewusst ohne quantitative Meta-Analyse-Quelle | nein | ja | konkrete Meta-Analyse für HDL-Effektgröße, falls quantitative Aussage gewünscht | SOURCE_REQUIRED_LATER |
| HDL-Cholesterin | low | Metabolisches Syndrom | guideline | Ja — K3-Map `2085-9` low (IDF/AHA, DDG) | nein | nein | keine | SOURCE_OK |

## Zusammenfassung

| Status | Anzahl |
|---|---|
| SOURCE_OK | 15 |
| SOURCE_REQUIRED_LATER | 11 |
| SOURCE_REQUIRED_BEFORE_CODE | 0 |
| SOURCE_NOT_NEEDED | 0 |

**Keine Karte blockiert den Codex-Start.** Die 11 `SOURCE_REQUIRED_LATER`-Fälle betreffen ausschließlich Verfeinerungen (präzisere externe Zitate für bereits inhaltlich korrekte, klinisch konsentierte Aussagen wie Monitoring-Intervalle, Red-Flag-Listen oder die Biotin-Interferenz) — kein Fall stützt sich auf eine unsichere oder unbelegte medizinische Kernaussage.
