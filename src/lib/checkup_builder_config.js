// ============================================================
// CHECKUP-BUILDER CONFIG — src/lib/checkup_builder_config.js
// VitalWissen | Stand: 2026-06-25
// ============================================================
// SPRACH-NO-GOS (verbindlich für alle Texte in dieser Datei und CheckupBuilder.jsx):
//   VERBOTEN: "Du brauchst diesen Wert" | "Lass diesen Wert bestimmen"
//             "Diagnostiziert X" | "Deutet auf X hin" | Therapieempfehlungen
//   ERLAUBT:  "Kann sinnvoll sein zu besprechen" | "Optionaler Zusatzwert"
//             "Spezialwert / nur nach fachlicher Einordnung" | "Zur Gesprächsvorbereitung"
//             Kategorie nicht_teil_des_grossen_blutbilds: kein Diagnose-Framing
// ============================================================

export const TIER = {
  STANDARD: 'standard',
  OPTIONAL: 'optional',
  SPEZIAL: 'spezialwert',
  NUR_FACHPERSON: 'nur_fachperson',
  NICHT_TEIL_DES_GROSSEN_BLUTBILDS: 'nicht_teil_des_grossen_blutbilds',
}

export const DISCLAIMER = {
  zeile1: 'Dies ist keine medizinische Empfehlung und kein Diagnose-Instrument.',
  zeile2: 'Welche Laborwerte im Einzelfall sinnvoll sind, entscheidet ausschließlich eine Fachperson.',
  zeile3: 'Die Ergebnisliste dient der Vorbereitung eines Gesprächs — nicht der Selbstdiagnose.',
}

// ------------------------------------
// PANELS
// ------------------------------------
// LOINC-Codes wurden in der Live-DB verifiziert.
// Retikulozyten: LOINC 31112-6 (verifiziert) — NICHT 17849-1 (Altstand, nicht in DB).

const KLEINES_BLUTBILD_ITEMS = [
  { loinc: '789-8',  slug: 'erythrozyten',  name_de: 'Erythrozyten (Rote Blutkörperchen)', tier: TIER.STANDARD, reasoning: 'Grundwert des kleinen Blutbilds' },
  { loinc: '718-7',  slug: 'haemoglobin',   name_de: 'Hämoglobin',                          tier: TIER.STANDARD, reasoning: 'Sauerstofftransportkapazität' },
  { loinc: '4544-3', slug: 'haematokrit',   name_de: 'Hämatokrit',                          tier: TIER.STANDARD, reasoning: 'Anteil der roten Blutkörperchen im Blut' },
  { loinc: '787-2',  slug: 'mcv',           name_de: 'MCV (Mittleres Erythrozytenvolumen)', tier: TIER.STANDARD, reasoning: 'Größe der roten Blutkörperchen' },
  { loinc: '785-6',  slug: 'mch',           name_de: 'MCH',                                 tier: TIER.STANDARD, reasoning: 'Hämoglobingehalt je Erythrozyt' },
  { loinc: '786-4',  slug: 'mchc',          name_de: 'MCHC',                                tier: TIER.STANDARD, reasoning: 'Hämoglobinkonzentration im Erythrozyt' },
  { loinc: '788-0',  slug: 'rdw',           name_de: 'RDW (Erythrozyten-Verteilungsbreite)',tier: TIER.STANDARD, reasoning: 'Gleichmäßigkeit der Erythrozytengröße' },
  { loinc: '6690-2', slug: 'leukozyten',    name_de: 'Leukozyten (Weiße Blutkörperchen)',  tier: TIER.STANDARD, reasoning: 'Immunzellzahl im Überblick' },
  { loinc: '777-3',  slug: 'thrombozyten',  name_de: 'Thrombozyten (Blutplättchen)',        tier: TIER.STANDARD, reasoning: 'Blutgerinnung und Wundheilung' },
]

const DIFFERENTIALBLUTBILD_ITEMS = [
  { loinc: '751-8',   slug: 'neutrophile',   name_de: 'Neutrophile Granulozyten',    tier: TIER.STANDARD,  reasoning: 'Erste Immunantwort auf Bakterien' },
  { loinc: '731-0',   slug: 'lymphozyten',   name_de: 'Lymphozyten',                 tier: TIER.STANDARD,  reasoning: 'Virusabwehr und Immungedächtnis' },
  { loinc: '742-7',   slug: 'monozyten',     name_de: 'Monozyten',                   tier: TIER.STANDARD,  reasoning: 'Makrophagenvorläufer und Immunregulation' },
  { loinc: '711-2',   slug: 'eosinophile',   name_de: 'Eosinophile Granulozyten',    tier: TIER.STANDARD,  reasoning: 'Beteiligt bei Allergie und Parasitenabwehr' },
  { loinc: '704-7',   slug: 'basophile',     name_de: 'Basophile Granulozyten',      tier: TIER.STANDARD,  reasoning: 'Seltener Immunzelltyp, Allergievermittlung' },
  { loinc: '764-1',   slug: 'stabkernige',   name_de: 'Stabkernige Neutrophile',     tier: TIER.STANDARD,  reasoning: 'Unreife Neutrophile, Hinweis auf Aktivierung' },
  { loinc: '31112-6', slug: 'retikulozyten', name_de: 'Retikulozyten',              tier: TIER.OPTIONAL,  reasoning: 'Optionaler Zusatzwert: junge rote Blutkörperchen, Knochenmarkaktivität' },
]

export const PANELS = {
  'kleines-blutbild': {
    label: 'Kleines Blutbild',
    beschreibung: 'Die 9 Basiswerte: Erythrozyten, Hämoglobin, Leukozyten, Thrombozyten und weitere Zellparameter.',
    items: KLEINES_BLUTBILD_ITEMS,
  },
  'grosses-blutbild': {
    label: 'Großes Blutbild',
    beschreibung: 'Kleines Blutbild + Differentialblutbild: Aufschlüsselung der Leukozyten in ihre Untergruppen.',
    items: [...KLEINES_BLUTBILD_ITEMS, ...DIFFERENTIALBLUTBILD_ITEMS],
  },
}

// ------------------------------------
// THEMEN
// ------------------------------------

export const THEMEN = {
  'entzuendung': {
    label: 'Entzündung',
    icon: '🔥',
    items: [
      { loinc: '1988-5',  slug: 'crp',           name_de: 'CRP (C-reaktives Protein)',       tier: TIER.STANDARD,      reasoning: 'Wichtiger Entzündungsmarker im Blut' },
      { loinc: '30522-7', slug: 'hs-crp',         name_de: 'hs-CRP (Hochsensitives CRP)',     tier: TIER.OPTIONAL,      reasoning: 'Optionaler Zusatzwert: sensitiver als CRP, relevant bei Herzrisiko' },
      { loinc: '4537-7',  slug: 'bsg',            name_de: 'BSG (Blutsenkungsgeschwindigkeit)',tier: TIER.OPTIONAL,      reasoning: 'Optionaler Zusatzwert: unspezifischer Entzündungsmarker' },
      { loinc: '75241-0', slug: 'procalcitonin',  name_de: 'Procalcitonin',                   tier: TIER.NUR_FACHPERSON, reasoning: 'Nur nach fachlicher Einordnung: Marker für bakterielle Infektionen' },
    ],
  },
  'muedigkeit-erschoepfung': {
    label: 'Müdigkeit & Erschöpfung',
    icon: '😴',
    items: [
      { loinc: '2276-4',  slug: 'ferritin',           name_de: 'Ferritin',                     tier: TIER.STANDARD,      reasoning: 'Eisenspeicher, häufige Ursache von Erschöpfung' },
      { loinc: '2132-9',  slug: 'vitamin-b12-serum',  name_de: 'Vitamin B12 (Serum)',           tier: TIER.STANDARD,      reasoning: 'B12-Mangel kann Erschöpfung und neurologische Beschwerden verursachen' },
      { loinc: '2284-8',  slug: 'folsaeure-serum',    name_de: 'Folsäure (Serum)',              tier: TIER.STANDARD,      reasoning: 'Folsäuremangel kann Erschöpfung und Blutbildveränderungen verursachen' },
      { loinc: '3016-3',  slug: 'tsh',                name_de: 'TSH (Schilddrüsenhormon)',      tier: TIER.STANDARD,      reasoning: 'Schilddrüsenfunktion, Unterfunktion geht oft mit Müdigkeit einher' },
      { loinc: '14635-7', slug: 'vitamin-d-25oh',     name_de: 'Vitamin D (25-OH)',             tier: TIER.OPTIONAL,      reasoning: 'Optionaler Zusatzwert: Vitamin-D-Mangel ist weit verbreitet' },
      { loinc: '19123-9', slug: 'magnesium-serum',    name_de: 'Magnesium (Serum)',             tier: TIER.OPTIONAL,      reasoning: 'Optionaler Zusatzwert: Magnesiummangel kann Erschöpfung mitverursachen' },
      { loinc: '5762-5',  slug: 'zink-serum',         name_de: 'Zink (Serum)',                  tier: TIER.OPTIONAL,      reasoning: 'Optionaler Zusatzwert: Zink unterstützt Immunsystem und Energiestoffwechsel' },
      { loinc: '2143-6',  slug: 'cortisol',           name_de: 'Cortisol',                     tier: TIER.NUR_FACHPERSON, reasoning: 'Nur nach fachlicher Einordnung: Stresshormon, komplexe Interpretation' },
    ],
  },
  'schilddruese': {
    label: 'Schilddrüse',
    icon: '🪀',
    items: [
      { loinc: '3016-3', slug: 'tsh',       name_de: 'TSH (Schilddrüsenhormon)',         tier: TIER.STANDARD,      reasoning: 'Basiswert der Schilddrüsendiagnostik' },
      { loinc: '3024-7', slug: 'ft4',       name_de: 'Freies T4 (fT4)',                  tier: TIER.OPTIONAL,      reasoning: 'Optionaler Zusatzwert: direktes Schilddrüsenhormon' },
      { loinc: '3051-0', slug: 'ft3',       name_de: 'Freies T3 (fT3)',                  tier: TIER.NUR_FACHPERSON, reasoning: 'Nur nach fachlicher Einordnung: aktives Schilddrüsenhormon' },
      { loinc: '8099-7', slug: 'anti-tpo',  name_de: 'Anti-TPO-Antikörper',              tier: TIER.NUR_FACHPERSON, reasoning: 'Nur nach fachlicher Einordnung: Autoantikörper bei Hashimoto-Verdacht' },
    ],
  },
  'herz-kreislauf-stoffwechsel': {
    label: 'Herz-Kreislauf & Stoffwechsel',
    icon: '❤️',
    items: [
      { loinc: '2089-1',  slug: 'ldl-cholesterin',    name_de: 'LDL-Cholesterin',           tier: TIER.STANDARD,      reasoning: 'Wichtiger kardiovaskulärer Risikomarker' },
      { loinc: '2085-9',  slug: 'hdl-cholesterin',    name_de: 'HDL-Cholesterin',           tier: TIER.STANDARD,      reasoning: 'Schützender Einfluss auf Herzgesundheit' },
      { loinc: '2093-3',  slug: 'cholesterin-gesamt', name_de: 'Cholesterin (Gesamt)',      tier: TIER.STANDARD,      reasoning: 'Gesamtcholesterin als Überblickswert' },
      { loinc: '2571-8',  slug: 'triglyzeride',       name_de: 'Triglyzeride',              tier: TIER.STANDARD,      reasoning: 'Blutfette, relevant für Herz- und Stoffwechselgesundheit' },
      { loinc: '4548-4',  slug: 'hba1c',              name_de: 'HbA1c (Langzeitblutzucker)',tier: TIER.STANDARD,      reasoning: 'Blutzuckerregulation der letzten 2–3 Monate' },
      { loinc: '2345-7',  slug: 'glukose-nuechtern',  name_de: 'Glukose (Nüchtern)',        tier: TIER.STANDARD,      reasoning: 'Aktueller Nüchternblutzucker' },
      { loinc: '2160-0',  slug: 'kreatinin',          name_de: 'Kreatinin',                 tier: TIER.STANDARD,      reasoning: 'Nierenfunktionsmarker' },
      { loinc: '62238-1', slug: 'egfr',               name_de: 'eGFR (Nierenfiltrationsrate)',tier: TIER.STANDARD,    reasoning: 'Errechnete Nierenfunktion' },
      { loinc: '13965-9', slug: 'homocystein',        name_de: 'Homocystein',               tier: TIER.OPTIONAL,      reasoning: 'Optionaler Zusatzwert: kardiovaskulärer Risikomarker' },
      { loinc: '10835-7', slug: 'lipoprotein-a',      name_de: 'Lipoprotein(a)',            tier: TIER.NUR_FACHPERSON, reasoning: 'Nur nach fachlicher Einordnung: genetisch bestimmter Risikomarker' },
      { loinc: '33762-6', slug: 'nt-probnp',          name_de: 'NT-proBNP',                 tier: TIER.NUR_FACHPERSON, reasoning: 'Nur nach fachlicher Einordnung: Herzbelastungsmarker' },
    ],
  },
}
