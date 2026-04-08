export const SUPPLEMENTS = [
  {
    id: 1,
    slug: "vitamin-d3",
    name: "Vitamin D3",
    wissenschaftlich: "Cholecalciferol",
    kategorie: "Vitamine",
    evidenz_ampel: "stark",
    wofuer:
      "Knochengesundheit, Immunfunktion, Muskelkraft, Stimmungsregulation, Hormonhaushalt. Vitamin D ist an über 200 Genaktivierungsprozessen beteiligt – es ist eines der am besten untersuchten Supplements mit einer der breitesten Wirkstoffprofilen.",
    dosierung: {
      bfr: { wert: 20, einheit: "mcg/Tag (800 IU)", hinweis: "Erhaltungsdosis für Gesunde" },
      nih: { wert: "600–800", einheit: "IU/Tag", hinweis: "RDA, je nach Alter" },
      efsa: { wert: 15, einheit: "mcg/Tag (600 IU)", hinweis: "Adequate Intake Erwachsene" },
      ul: { wert: 100, einheit: "mcg/Tag (4.000 IU)", hinweis: "Upper Limit – nicht dauerhaft überschreiten" },
    },
    formen: [
      { name: "D3 (Cholecalciferol)", bioverfu: "Hoch", empfohlen: true, hinweis: "Körpereigene Form, deutlich wirksamer als D2" },
      { name: "D2 (Ergocalciferol)", bioverfu: "Moderat", empfohlen: false, hinweis: "Pflanzliche Quelle, schwächer bei Blutspiegelhebung" },
      { name: "Öl-Kapseln", bioverfu: "Hoch", empfohlen: true, hinweis: "Fettlöslich → immer mit Fett einnehmen" },
    ],
    timing: "Morgens mit einer fettreichen Mahlzeit (fettlöslich!). Nicht abends – manche berichten über Einschlafprobleme.",
    kombinationen: {
      synergien: [
        { name: "Vitamin K2 (MK-7)", hinweis: "Lenkt Kalzium in die Knochen, verhindert Gefäßverkalkung" },
        { name: "Magnesium", hinweis: "Wird für die Aktivierung von Vitamin D benötigt" },
        { name: "Kalzium", hinweis: "Synergistisch für Knochenaufbau" },
      ],
      antagonisten: [
        { name: "Ohne Fett einnehmen", hinweis: "Drastisch reduzierte Resorption" },
      ],
    },
    qualitaet: {
      kriterien: ["GMP-zertifiziert", "Drittlabor-Analyse", "ISO 22000"],
      worauf_achten: "Kapseln ohne Titandioxid (E171), Lanolin-Quelle für Veganer oft nicht akzeptabel → auf Flechten-basierten D3 achten.",
    },
    studien: [
      { pmid: "26391968", titel: "Vitamin D supplementation and mortality", ergebnis: "Moderat", quelle: "BMJ 2015" },
      { pmid: "26168502", titel: "Vitamin D and immune function", ergebnis: "Signifikanter Effekt bei Mangel", quelle: "JAMA 2015" },
    ],
    laborwerte: ["Vitamin D (25-OH)", "Kalzium", "PTH"],
    interaktionen: [
      { name: "Thiazid-Diuretika", schwere: "moderat", hinweis: "Erhöhtes Risiko für Hyperkalzämie" },
      { name: "Kortikosteroide", schwere: "moderat", hinweis: "Beschleunigen Vitamin-D-Abbau" },
      { name: "Antiepileptika", schwere: "moderat", hinweis: "Erhöhter Vitamin-D-Bedarf" },
    ],
    nih_ods_link: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
    tier: 1,
  },
  {
    id: 2,
    slug: "magnesium",
    name: "Magnesium",
    wissenschaftlich: "Magnesium (verschiedene Verbindungen)",
    kategorie: "Mineralstoffe",
    evidenz_ampel: "stark",
    wofuer:
      "Muskelentspannung, Schlafqualität, Energiestoffwechsel, Herzrhythmus, Nervenfunktion, Proteinsynthese. Magnesium ist als Kofaktor an über 300 Enzymreaktionen beteiligt – darunter die ATP-Synthese und DNA-Reparatur.",
    dosierung: {
      bfr: { wert: "300–400", einheit: "mg/Tag", hinweis: "Je nach Geschlecht und Alter" },
      nih: { wert: "310–420", einheit: "mg/Tag", hinweis: "Männer höher als Frauen" },
      efsa: { wert: "300–350", einheit: "mg/Tag", hinweis: "Adequate Intake" },
      ul: { wert: 250, einheit: "mg/Tag aus Supplements", hinweis: "UL für Supplemental Mg, nicht Nahrung" },
    },
    formen: [
      { name: "Magnesiumglycinat", bioverfu: "Sehr hoch", empfohlen: true, hinweis: "Beste Verträglichkeit, kein Abführeffekt, ideal zum Schlafen" },
      { name: "Magnesiumcitrat", bioverfu: "Hoch", empfohlen: true, hinweis: "Gut resorbierbar, leicht abführend in höheren Dosen" },
      { name: "Magnesiummalat", bioverfu: "Hoch", empfohlen: true, hinweis: "Gut für Energie & Muskeln, gut verträglich" },
      { name: "Magnesiumoxid", bioverfu: "Niedrig (4%)", empfohlen: false, hinweis: "Schlecht bioverfügbar, überwiegend Abführmittel" },
    ],
    timing: "Abends vor dem Schlafengehen für Schlaf- und Muskelentspannung. Alternativ aufgeteilt über den Tag.",
    kombinationen: {
      synergien: [
        { name: "Vitamin D", hinweis: "Magnesium wird für die Aktivierung von Vitamin D benötigt" },
        { name: "Vitamin B6", hinweis: "Verbessert die intrazelluläre Magnesiumaufnahme" },
      ],
      antagonisten: [
        { name: "Kalzium (hohes Verhältnis)", hinweis: "Ca:Mg-Verhältnis sollte 2:1 nicht überschreiten" },
        { name: "Alkohol", hinweis: "Erhöht Magnesiumausscheidung über die Nieren" },
      ],
    },
    qualitaet: {
      kriterien: ["GMP-zertifiziert", "Ohne Zusatzstoffe (Stearate, künstliche Aromen)"],
      worauf_achten: "Auf die Magnesiumverbindung achten – viele günstige Produkte enthalten Magnesiumoxid mit kaum Wirkung.",
    },
    studien: [
      { pmid: "27933574", titel: "Magnesium and sleep", ergebnis: "Verbesserung der Schlafqualität bei Mangel", quelle: "Nutrients 2017" },
      { pmid: "12163983", titel: "Magnesium and cardiovascular disease", ergebnis: "Inverser Zusammenhang mit Herzerkrankungsrisiko", quelle: "ATVB 2003" },
    ],
    laborwerte: ["Magnesium", "Kalzium"],
    interaktionen: [
      { name: "Antibiotika (Tetracycline, Chinolone)", schwere: "moderat", hinweis: "Mind. 2h Abstand, da Chelatbildung" },
      { name: "Bisphosphonate", schwere: "moderat", hinweis: "Magnesium reduziert Resorption, 2h Abstand" },
      { name: "Diuretika (Schleifendiuretika)", schwere: "hoch", hinweis: "Erhöhen Magnesiumverlust über Nieren" },
    ],
    nih_ods_link: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/",
    tier: 1,
  },
  {
    id: 3,
    slug: "omega-3",
    name: "Omega-3",
    wissenschaftlich: "Eicosapentaensäure (EPA) + Docosahexaensäure (DHA)",
    kategorie: "Fettsäuren",
    evidenz_ampel: "moderat",
    wofuer:
      "Herzgesundheit (Triglyzeride senken), Entzündungshemmung, Gehirnfunktion, Augengesundheit, Stimmung. EPA wirkt primär entzündungshemmend, DHA ist Strukturbestandteil von Gehirn und Netzhaut.",
    dosierung: {
      bfr: { wert: "250–500", einheit: "mg EPA+DHA/Tag", hinweis: "Erhaltungsdosis für Gesunde" },
      nih: { wert: "1.1–1.6", einheit: "g ALA/Tag", hinweis: "RDA, aber EPA/DHA direkter wirksamer" },
      efsa: { wert: 250, einheit: "mg EPA+DHA/Tag", hinweis: "Adequate Intake" },
      ul: { wert: 5000, einheit: "mg EPA+DHA/Tag", hinweis: "EFSA obere Grenze als sicher eingestuft" },
    },
    formen: [
      { name: "Fischöl (EPA+DHA)", bioverfu: "Hoch", empfohlen: true, hinweis: "Direktverfügbare Form, re-esterifiziertes TG-Form am besten" },
      { name: "Algenöl (EPA+DHA)", bioverfu: "Hoch", empfohlen: true, hinweis: "Vegan, gleiche Wirkung, Quelle der Fische" },
      { name: "Leinöl (ALA)", bioverfu: "Niedrig", empfohlen: false, hinweis: "Umwandlung zu EPA/DHA < 15%, schlechte Alternative" },
      { name: "Krill-Öl", bioverfu: "Sehr hoch", empfohlen: true, hinweis: "Phospholipid-Form, ggf. bessere Bioverfügbarkeit, teurer" },
    ],
    timing: "Mit Mahlzeiten einnehmen (fettlöslich). Manche kühlen das Öl zur Reduktion von Fischaufstoßen.",
    kombinationen: {
      synergien: [
        { name: "Vitamin E", hinweis: "Antioxidans, schützt die sensiblen Fettsäuren vor Oxidation" },
        { name: "Vitamin D", hinweis: "Häufig zusammen sinnvoll, synergistischer Anti-Entzündungseffekt" },
      ],
      antagonisten: [
        { name: "Hohe Omega-6-Zufuhr", hinweis: "Konkurriert um Enzymwege, Verhältnis Omega-6:3 sollte < 5:1 sein" },
      ],
    },
    qualitaet: {
      kriterien: ["IFOS-zertifiziert (International Fish Oil Standards)", "Frischetest (TOTOX-Wert)", "Schwermetallfreiheit"],
      worauf_achten: "EPA+DHA-Gehalt pro Kapsel (nicht nur Fischöl-Gesamtmenge!). Produkte oxidieren – Lagerung im Kühlschrank nach Öffnen.",
    },
    studien: [
      { pmid: "29387889", titel: "Omega-3 und kardiovaskuläre Endpunkte (ASCEND, VITAL)", ergebnis: "Gemischte Ergebnisse, klar positiv nur bei hohem Risiko", quelle: "NEJM 2018" },
      { pmid: "25062404", titel: "DHA und kognitive Funktion", ergebnis: "Kein Effekt bei Gesunden, möglicherweise bei MCI", quelle: "Cochrane 2014" },
    ],
    laborwerte: ["Triglyzeride", "CRP", "Cholesterin", "LDL"],
    interaktionen: [
      { name: "Marcumar / Warfarin", schwere: "hoch", hinweis: "Erhöhtes Blutungsrisiko, INR-Kontrolle notwendig" },
      { name: "Aspirin", schwere: "moderat", hinweis: "Additive Hemmung der Thrombozytenaggregation" },
      { name: "Andere Antikoagulantien", schwere: "moderat", hinweis: "Arzt informieren bei Dosen > 3g/Tag EPA+DHA" },
    ],
    nih_ods_link: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/",
    tier: 1,
  },
  {
    id: 4,
    slug: "vitamin-b12",
    name: "Vitamin B12",
    wissenschaftlich: "Cobalamin (Methylcobalamin, Cyanocobalamin, Adenosylcobalamin)",
    kategorie: "Vitamine",
    evidenz_ampel: "stark",
    wofuer:
      "Nervenfunktion (Myelinscheide), Blutbildung (Erythropoese), DNA-Synthese, Homocystein-Abbau. B12-Mangel ist heimtückisch: Neurologische Schäden können entstehen, bevor Blutbild auffällig wird.",
    dosierung: {
      bfr: { wert: 4, einheit: "mcg/Tag", hinweis: "Tägesbedarf Erwachsene" },
      nih: { wert: 2.4, einheit: "mcg/Tag", hinweis: "RDA Erwachsene" },
      efsa: { wert: 4, einheit: "mcg/Tag", hinweis: "Adequate Intake" },
      ul: { wert: "kein UL", einheit: "festgelegt", hinweis: "Keine Toxizität bei hohen Dosen bekannt" },
    },
    formen: [
      { name: "Methylcobalamin", bioverfu: "Sehr hoch", empfohlen: true, hinweis: "Bioaktive Form, direkt verwertbar, keine Umwandlung nötig" },
      { name: "Adenosylcobalamin", bioverfu: "Sehr hoch", empfohlen: true, hinweis: "Bioaktive Form, wichtig für mitochondriale Funktion" },
      { name: "Cyanocobalamin", bioverfu: "Moderat", empfohlen: false, hinweis: "Synthetisch, muss umgewandelt werden; günstig aber weniger effizient" },
      { name: "Hydroxocobalamin", bioverfu: "Hoch", empfohlen: true, hinweis: "Lange Halbwertszeit, gut für Depot-Aufbau" },
    ],
    timing: "Morgens auf nüchternen Magen für beste Resorption. Bei hochdosierten Kapseln (≥ 500 mcg) ist passiver Transport aktiv – Mahlzeit weniger relevant.",
    kombinationen: {
      synergien: [
        { name: "Folsäure (B9)", hinweis: "Gemeinsam im Methylierungszyklus, sollten zusammen kontrolliert werden" },
        { name: "Vitamin B6", hinweis: "Synergistisch beim Homocystein-Abbau" },
      ],
      antagonisten: [
        { name: "Hohe Folsäure-Dosen ohne B12", hinweis: "Kann B12-Mangel-Anämie maskieren, aber neurologischen Schaden nicht verhindern" },
      ],
    },
    qualitaet: {
      kriterien: ["Methylcobalamin bevorzugen", "Ohne unnötige Füllstoffe"],
      worauf_achten: "Lichtempfindlich – Dunkelverpackung kaufen. Sublingual-Tropfen oder -Tabletten bei Resorptionsstörungen (z.B. nach Magenentfernung, älteren Personen) deutlich effektiver.",
    },
    studien: [
      { pmid: "19593529", titel: "B12 Defizienz und neurologische Komplikationen", ergebnis: "Klar kausal, frühzeitige Substitution entscheidend", quelle: "NEJM 2009" },
    ],
    laborwerte: ["Vitamin B12 (Cobalamin)", "Homocystein", "MCV", "Holo-Transcobalamin"],
    interaktionen: [
      { name: "Metformin", schwere: "moderat", hinweis: "Metformin reduziert B12-Resorption – regelmäßige Kontrolle bei Diabetikern!" },
      { name: "Protonenpumpenhemmer (PPIs)", schwere: "moderat", hinweis: "Reduzieren Magensäure → schlechtere B12-Freisetzung aus Nahrung" },
      { name: "H2-Blocker", schwere: "niedrig", hinweis: "Ähnlicher Mechanismus wie PPIs, geringerer Effekt" },
    ],
    nih_ods_link: "https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/",
    tier: 1,
  },
  {
    id: 5,
    slug: "zink",
    name: "Zink",
    wissenschaftlich: "Zink (verschiedene Verbindungen)",
    kategorie: "Mineralstoffe",
    evidenz_ampel: "moderat",
    wofuer:
      "Immunfunktion (besonders bei Infekten), Wundheilung, Hormonsynthese (Testosteron, Insulin), Hautgesundheit, Enzymfunktion (über 300 Enzyme), Riechvermögen. Zink ist eines der am meisten unterschätzten Mineralstoffe.",
    dosierung: {
      bfr: { wert: "7–10", einheit: "mg/Tag", hinweis: "Frauen 7 mg, Männer 10–16 mg" },
      nih: { wert: "8–11", einheit: "mg/Tag", hinweis: "RDA, Männer höher als Frauen" },
      efsa: { wert: "7.5–12.7", einheit: "mg/Tag", hinweis: "Je nach Phytatgehalt der Ernährung" },
      ul: { wert: 25, einheit: "mg/Tag", hinweis: "EFSA obere Grenze – bei Überschreitung Kupfermangel möglich" },
    },
    formen: [
      { name: "Zinkgluconat", bioverfu: "Hoch", empfohlen: true, hinweis: "Gut verträglich, weit verfügbar" },
      { name: "Zinkbisglycinat", bioverfu: "Sehr hoch", empfohlen: true, hinweis: "Chelatform, beste Verträglichkeit und Bioverfügbarkeit" },
      { name: "Zinkcitrat", bioverfu: "Hoch", empfohlen: true, hinweis: "Gut bioverfügbar, gut verträglich" },
      { name: "Zinkoxid", bioverfu: "Niedrig", empfohlen: false, hinweis: "Sehr schlechte Bioverfügbarkeit" },
    ],
    timing: "Auf nüchternen Magen für beste Resorption – aber bei Übelkeit: mit kleiner Mahlzeit. Nicht gleichzeitig mit Kalzium oder Eisen.",
    kombinationen: {
      synergien: [
        { name: "Vitamin C", hinweis: "Synergistisch bei Immunfunktion" },
        { name: "Selen", hinweis: "Antioxidativ, synergistisch bei Schilddrüsenfunktion" },
      ],
      antagonisten: [
        { name: "Kupfer", hinweis: "Hohe Zinkdosen (> 40mg/Tag) können Kupfermangel auslösen – bei Langzeiteinnahme auf Kupfer achten" },
        { name: "Eisen", hinweis: "Gegenseitige Resorptionshemmung, zeitlich trennen" },
        { name: "Phytate (Vollkorn, Hülsenfrüchte)", hinweis: "Reduzieren Zinkresorption aus der Nahrung deutlich" },
      ],
    },
    qualitaet: {
      kriterien: ["Zinkbisglycinat oder Zinkgluconat bevorzugen", "Keine unnötigen Füllstoffe"],
      worauf_achten: "Bei Langzeiteinnahme > 15mg/Tag Kupferstatus mitüberwachen (Zink:Kupfer-Verhältnis).",
    },
    studien: [
      { pmid: "11597664", titel: "Zink und Erkältungsdauer", ergebnis: "Reduziert Erkältungsdauer um ~1 Tag bei früher Einnahme", quelle: "Cochrane 2012" },
      { pmid: "17344507", titel: "Zink und Immunfunktion", ergebnis: "Klar positiver Effekt bei Zinkmangel", quelle: "AJCN 2007" },
    ],
    laborwerte: ["Zink im Serum", "Kupfer", "Alkalische Phosphatase"],
    interaktionen: [
      { name: "Antibiotika (Tetracycline, Chinolone)", schwere: "moderat", hinweis: "Mind. 2h Abstand – Chelatbildung reduziert Antibiotika-Wirkung" },
      { name: "Penicillamin", schwere: "hoch", hinweis: "Zink reduziert die Resorption stark" },
    ],
    nih_ods_link: "https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/",
    tier: 1,
  },
];

export const SUPPLEMENT_KATEGORIEN = [
  "Vitamine",
  "Mineralstoffe",
  "Fettsäuren",
  "Aminosäuren",
  "Pflanzenstoffe",
  "Probiotika",
];

export const EVIDENZ_FARBEN = {
  stark: { bg: "#D1FAE5", text: "#065F46", label: "Starke Evidenz" },
  moderat: { bg: "#FEF3C7", text: "#92400E", label: "Moderate Evidenz" },
  schwach: { bg: "#FEE2E2", text: "#991B1B", label: "Schwache Evidenz" },
  widersprüchlich: { bg: "#EDE9FE", text: "#5B21B6", label: "Widersprüchlich" },
  keine: { bg: "#F3F4F6", text: "#374151", label: "Keine Evidenz" },
};
