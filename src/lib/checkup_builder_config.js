// ============================================================
// CHECKUP-BUILDER CONFIG — src/lib/checkup_builder_config.js
// VitalWissen | Stand: 2026-06-25
// ============================================================
// Sprachrahmen: Gesprächsvorbereitung, fachliche Einordnung, keine Diagnose,
// keine Therapie, keine Bestimmungsaufforderung, keine Kausal-/Verdachtslogik.
// Kategorie nicht_teil_des_grossen_blutbilds bedeutet nur: nicht Bestandteil
// des großen Blutbilds, aber je nach Fragestellung als Gesprächspunkt möglich.
// ============================================================

export const TIER = {
  STANDARD: 'standardwert',
  OPTIONAL: 'optional_zusatzwert',
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
// Retikulozyten: LOINC 31112-6 (verifiziert) — nicht 17849-1.

const KLEINES_BLUTBILD_ITEMS = [
  { loinc: '789-8',  slug: 'erythrozyten',  name_de: 'Erythrozyten (Rote Blutkörperchen)', tier: TIER.STANDARD, reasoning: 'Standardwert des kleinen Blutbilds zur fachlichen Einordnung der roten Blutkörperchen.' },
  { loinc: '718-7',  slug: 'haemoglobin',   name_de: 'Hämoglobin',                          tier: TIER.STANDARD, reasoning: 'Standardwert des kleinen Blutbilds zur fachlichen Einordnung des Sauerstofftransport-Kontexts.' },
  { loinc: '4544-3', slug: 'haematokrit',   name_de: 'Hämatokrit',                          tier: TIER.STANDARD, reasoning: 'Standardwert des kleinen Blutbilds zur fachlichen Einordnung des Zellanteils im Blut.' },
  { loinc: '787-2',  slug: 'mcv',           name_de: 'MCV (Mittleres Erythrozytenvolumen)', tier: TIER.STANDARD, reasoning: 'Standardwert des kleinen Blutbilds zur fachlichen Einordnung der Erythrozyten-Größe.' },
  { loinc: '785-6',  slug: 'mch',           name_de: 'MCH',                                 tier: TIER.STANDARD, reasoning: 'Standardwert des kleinen Blutbilds zur fachlichen Einordnung des Erythrozyten-Kontexts.' },
  { loinc: '786-4',  slug: 'mchc',          name_de: 'MCHC',                                tier: TIER.STANDARD, reasoning: 'Standardwert des kleinen Blutbilds zur fachlichen Einordnung des Erythrozyten-Kontexts.' },
  { loinc: '788-0',  slug: 'rdw',           name_de: 'RDW (Erythrozyten-Verteilungsbreite)',tier: TIER.STANDARD, reasoning: 'Standardwert des kleinen Blutbilds zur fachlichen Einordnung der Erythrozyten-Verteilung.' },
  { loinc: '6690-2', slug: 'leukozyten',    name_de: 'Leukozyten (Weiße Blutkörperchen)',  tier: TIER.STANDARD, reasoning: 'Standardwert des kleinen Blutbilds zur fachlichen Einordnung weißer Blutkörperchen.' },
  { loinc: '777-3',  slug: 'thrombozyten',  name_de: 'Thrombozyten (Blutplättchen)',        tier: TIER.STANDARD, reasoning: 'Standardwert des kleinen Blutbilds zur fachlichen Einordnung der Blutplättchen.' },
]

const DIFFERENTIALBLUTBILD_ITEMS = [
  { loinc: '751-8',   slug: 'neutrophile',   name_de: 'Neutrophile Granulozyten',    tier: TIER.STANDARD,  reasoning: 'Standardwert des Differentialblutbilds zur fachlichen Einordnung einer Leukozyten-Untergruppe.' },
  { loinc: '731-0',   slug: 'lymphozyten',   name_de: 'Lymphozyten',                 tier: TIER.STANDARD,  reasoning: 'Standardwert des Differentialblutbilds zur fachlichen Einordnung einer Leukozyten-Untergruppe.' },
  { loinc: '742-7',   slug: 'monozyten',     name_de: 'Monozyten',                   tier: TIER.STANDARD,  reasoning: 'Standardwert des Differentialblutbilds zur fachlichen Einordnung einer Leukozyten-Untergruppe.' },
  { loinc: '711-2',   slug: 'eosinophile',   name_de: 'Eosinophile Granulozyten',    tier: TIER.STANDARD,  reasoning: 'Standardwert des Differentialblutbilds zur fachlichen Einordnung einer Leukozyten-Untergruppe.' },
  { loinc: '704-7',   slug: 'basophile',     name_de: 'Basophile Granulozyten',      tier: TIER.STANDARD,  reasoning: 'Standardwert des Differentialblutbilds zur fachlichen Einordnung einer Leukozyten-Untergruppe.' },
  { loinc: '764-1',   slug: 'stabkernige',   name_de: 'Stabkernige Neutrophile',     tier: TIER.STANDARD,  reasoning: 'Standardwert des Differentialblutbilds zur fachlichen Einordnung unreifer neutrophiler Zellen.' },
  { loinc: '31112-6', slug: 'retikulozyten', name_de: 'Retikulozyten',               tier: TIER.OPTIONAL,  reasoning: 'Optionaler Zusatzwert zur fachlichen Einordnung junger roter Blutkörperchen.' },
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
      { loinc: '1988-5',  slug: 'crp',           name_de: 'CRP (C-reaktives Protein)',        tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Thematischer Wert zur fachlichen Einordnung einer Entzündungs-Fragestellung; nicht Teil des großen Blutbilds.' },
      { loinc: '30522-7', slug: 'hs-crp',         name_de: 'hs-CRP (Hochsensitives CRP)',      tier: TIER.OPTIONAL, reasoning: 'Optionaler Zusatzwert für ausgewählte Entzündungs- oder Risikofragestellungen.' },
      { loinc: '4537-7',  slug: 'bsg',            name_de: 'BSG (Blutsenkungsgeschwindigkeit)',tier: TIER.OPTIONAL, reasoning: 'Optionaler Zusatzwert zur ergänzenden fachlichen Entzündungs-Einordnung.' },
      { loinc: '75241-0', slug: 'procalcitonin',  name_de: 'Procalcitonin',                    tier: TIER.NUR_FACHPERSON, reasoning: 'Nur nach fachlicher Einordnung sinnvoll; kein Routine-Gesprächspunkt ohne konkrete Indikation.' },
    ],
  },
  'muedigkeit-erschoepfung': {
    label: 'Müdigkeit & Erschöpfung',
    icon: '😴',
    items: [
      { loinc: '2276-4',  slug: 'ferritin',           name_de: 'Ferritin',             tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Thematischer Wert zur fachlichen Einordnung des Eisen-Speicher-Kontexts; nicht Teil des großen Blutbilds.' },
      { loinc: '2132-9',  slug: 'vitamin-b12-serum',  name_de: 'Vitamin B12 (Serum)',   tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Thematischer Wert zur fachlichen Einordnung des Vitamin-B12-Kontexts; nicht Teil des großen Blutbilds.' },
      { loinc: '2284-8',  slug: 'folsaeure-serum',    name_de: 'Folsäure (Serum)',      tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Thematischer Wert zur fachlichen Einordnung des Folat-Kontexts; nicht Teil des großen Blutbilds.' },
      { loinc: '3016-3',  slug: 'tsh',                name_de: 'TSH (Schilddrüsenhormon)', tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Thematischer Wert zur fachlichen Einordnung einer Schilddrüsen-Fragestellung; nicht Teil des großen Blutbilds.' },
      { loinc: '14635-7', slug: 'vitamin-d-25oh',     name_de: 'Vitamin D (25-OH)',     tier: TIER.OPTIONAL, reasoning: 'Optionaler Zusatzwert, der je nach Situation fachlich besprochen werden kann.' },
      { loinc: '19123-9', slug: 'magnesium-serum',    name_de: 'Magnesium (Serum)',     tier: TIER.OPTIONAL, reasoning: 'Optionaler Zusatzwert mit kontextabhängiger Aussagekraft.' },
      { loinc: '5762-5',  slug: 'zink-serum',         name_de: 'Zink (Serum)',          tier: TIER.OPTIONAL, reasoning: 'Optionaler Zusatzwert, der je nach Fragestellung fachlich besprochen werden kann.' },
      { loinc: '2143-6',  slug: 'cortisol',           name_de: 'Cortisol',              tier: TIER.NUR_FACHPERSON, reasoning: 'Nur bei gezielter fachlicher Fragestellung sinnvoll einzuordnen.' },
    ],
  },
  'schilddruese': {
    label: 'Schilddrüse',
    icon: '🪀',
    items: [
      { loinc: '3016-3', slug: 'tsh',       name_de: 'TSH (Schilddrüsenhormon)', tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Thematischer Wert zur fachlichen Einordnung einer Schilddrüsen-Fragestellung; nicht Teil des großen Blutbilds.' },
      { loinc: '3024-7', slug: 'ft4',       name_de: 'Freies T4 (fT4)',          tier: TIER.OPTIONAL, reasoning: 'Optionaler Zusatzwert, der je nach TSH-Kontext fachlich besprochen werden kann.' },
      { loinc: '3051-0', slug: 'ft3',       name_de: 'Freies T3 (fT3)',          tier: TIER.NUR_FACHPERSON, reasoning: 'Nur nach fachlicher Einordnung sinnvoll; kein allgemeiner Basiswert.' },
      { loinc: '8099-7', slug: 'anti-tpo',  name_de: 'Anti-TPO-Antikörper',      tier: TIER.NUR_FACHPERSON, reasoning: 'Kann bei gezielter Schilddrüsen-/Autoimmun-Fragestellung fachlich eingeordnet werden.' },
    ],
  },
  'herz-kreislauf-stoffwechsel': {
    label: 'Herz-Kreislauf & Stoffwechsel',
    icon: '❤️',
    items: [
      { loinc: '2089-1',  slug: 'ldl-cholesterin',    name_de: 'LDL-Cholesterin',            tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Fettstoffwechselwert zur fachlichen Einordnung im Risikokontext; nicht Teil des großen Blutbilds.' },
      { loinc: '2085-9',  slug: 'hdl-cholesterin',    name_de: 'HDL-Cholesterin',            tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Fettstoffwechselwert zur fachlichen Einordnung im Risikokontext; nicht Teil des großen Blutbilds.' },
      { loinc: '2093-3',  slug: 'cholesterin-gesamt', name_de: 'Cholesterin (Gesamt)',       tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Fettstoffwechselwert zur fachlichen Einordnung im Risikokontext; nicht Teil des großen Blutbilds.' },
      { loinc: '2571-8',  slug: 'triglyzeride',       name_de: 'Triglyzeride',               tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Fettstoffwechselwert zur fachlichen Einordnung im Risikokontext; nicht Teil des großen Blutbilds.' },
      { loinc: '4548-4',  slug: 'hba1c',              name_de: 'HbA1c (Langzeitblutzucker)', tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Glukose-Stoffwechselwert zur fachlichen Einordnung; nicht Teil des großen Blutbilds.' },
      { loinc: '2345-7',  slug: 'glukose-nuechtern',  name_de: 'Glukose (Nüchtern)',         tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Glukose-Stoffwechselwert zur fachlichen Einordnung; nicht Teil des großen Blutbilds.' },
      { loinc: '2160-0',  slug: 'kreatinin',          name_de: 'Kreatinin',                  tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Nierenfunktionsbezogener Wert zur fachlichen Einordnung; nicht Teil des großen Blutbilds.' },
      { loinc: '62238-1', slug: 'egfr',               name_de: 'eGFR (Nierenfiltrationsrate)',tier: TIER.NICHT_TEIL_DES_GROSSEN_BLUTBILDS, reasoning: 'Nierenfunktionsbezogener Wert zur fachlichen Einordnung; nicht Teil des großen Blutbilds.' },
      { loinc: '13965-9', slug: 'homocystein',        name_de: 'Homocystein',                tier: TIER.OPTIONAL, reasoning: 'Optionaler Zusatzwert für ausgewählte Herz-Kreislauf- oder Stoffwechsel-Fragestellungen.' },
      { loinc: '10835-7', slug: 'lipoprotein-a',      name_de: 'Lipoprotein(a)',             tier: TIER.NUR_FACHPERSON, reasoning: 'Spezialwert, der im persönlichen Risikokontext fachlich eingeordnet werden sollte.' },
      { loinc: '33762-6', slug: 'nt-probnp',          name_de: 'NT-proBNP',                  tier: TIER.NUR_FACHPERSON, reasoning: 'Nur bei gezielter fachlicher Fragestellung sinnvoll einzuordnen.' },
    ],
  },
}
