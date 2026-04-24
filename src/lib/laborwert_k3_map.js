/**
 * LABORWERT_K3_MAP — S8-BUILD-02 / S8-BUILD-02c
 *
 * Lokales Mapping für den "Einordnung des Wertes"-Block auf Laborwert-Detailseiten.
 * Schlüssel: LOINC-Code (string) — muss mit lw.loinc_code in der DB übereinstimmen.
 * Fallback: slug (via EinordnungBlock-Komponente in LaborwertDetail.jsx)
 *
 * Feldstruktur je Eintrag:
 *   title:       string   — Titel der Karte (kein Diagnose-Framing)
 *   type:        'standard' | 'supporting' | 'uncertain'
 *   evidence:    string   — Evidenzgrundlage (Leitlinie / klinisch etabliert / plausibel)
 *   description: string   — 2–3 Sätze. Formulierung: "wird beobachtet bei" / "kann auftreten bei"
 *   caution:     string | null — Vorsichtshinweis (nur bei relevanter Einschränkung)
 *
 * Typ-Klassifikation:
 *   standard:    Mindestens eine nationale Leitlinie (AWMF/DGE/DDG/DGK) benennt diesen Zusammenhang
 *   supporting:  Mehrere klinische Studien; kein aktiver Sicherheitshinweis
 *   uncertain:   Einzelne Studien oder Mechanismus-Hypothesen; kein klinischer Konsens
 *
 * Sprach-No-Gos (strikt): Kein "du hast", kein "bedeutet", kein Diagnose-Framing.
 * Nur: "wird beobachtet bei", "kann auftreten bei", "wird häufig festgestellt bei",
 *       "spricht im Kontext eher für", "sollte zusammen mit anderen Werten betrachtet werden".
 *
 * Stand: S8-BUILD-02c (24.04.2026) — 20 Laborwerte, 57 Einträge
 */

export const LABORWERT_K3_MAP = {

  // ─── Bilirubin gesamt — LOINC 1975-2 ─────────────────────────────────────
  '1975-2': {
    high: [
      {
        title: 'Erkrankungen der Leber oder Gallenwege',
        type: 'standard',
        evidence: 'Klinisch etabliert — breiter Leitlinienkonsens (DGVS)',
        description:
          'Erhöhte Bilirubin-Werte werden häufig bei Erkrankungen festgestellt, die den Abfluss oder die Verarbeitung von Bilirubin in Leber oder Gallenwegen beeinträchtigen — z. B. bei Hepatitis, Leberzirrhose oder Gallenwegsverengungen.',
        caution:
          'Ein erhöhter Bilirubin-Wert allein erlaubt keine Diagnose. Weitere Laborwerte (z. B. Transaminasen, Gamma-GT) und eine ärztliche Untersuchung sind für die Einordnung notwendig.',
      },
      {
        title: 'Beschleunigter Abbau roter Blutkörperchen (Hämolyse)',
        type: 'standard',
        evidence: 'Klinisch etabliert',
        description:
          'Bilirubin entsteht beim Abbau von Hämoglobin. Wenn rote Blutkörperchen schneller als üblich abgebaut werden — etwa bei bestimmten Bluterkrankungen oder Autoimmunreaktionen — kann die Bilirubin-Konzentration im Blut ansteigen.',
        caution: null,
      },
      {
        title: 'Morbus Meulengracht (Gilbert-Syndrom)',
        type: 'standard',
        evidence: 'Klinisch etabliert — häufiger Zufallsbefund',
        description:
          'Das Gilbert-Syndrom ist eine häufige, harmlose Enzymvariante, bei der die Leber Bilirubin etwas langsamer verarbeitet. Leicht erhöhte Bilirubin-Werte können dabei auftreten, ohne dass eine Erkrankung vorliegt — oft als Zufallsbefund in Blutuntersuchungen.',
        caution: null,
      },
    ],
    low: [],
  },

  // ─── CRP — LOINC 1988-5 ──────────────────────────────────────────────────
  '1988-5': {
    high: [
      {
        title: 'Infektionen (bakteriell oder viral)',
        type: 'standard',
        evidence: 'Klinisch etabliert — breiter Leitlinienkonsens',
        description:
          'CRP ist ein Entzündungsmarker, der bei Infektionskrankheiten ansteigt. Besonders deutliche Erhöhungen werden bei bakteriellen Infektionen beobachtet. Virale Infektionen führen meist zu moderateren Anstiegen.',
        caution:
          'Die Höhe des CRP-Werts allein unterscheidet nicht zuverlässig zwischen bakteriellen und viralen Ursachen. Die Einordnung erfordert immer die ärztliche Gesamtbeurteilung.',
      },
      {
        title: 'Chronisch-entzündliche Erkrankungen',
        type: 'standard',
        evidence: 'Klinisch etabliert — Leitlinien DGRh/DGIM',
        description:
          'Bei Erkrankungen wie rheumatoider Arthritis, Morbus Crohn, Colitis ulcerosa oder anderen chronischen Entzündungszuständen kann CRP dauerhaft erhöht sein. Der Wert wird dort auch als Verlaufsparameter unter Therapie genutzt.',
        caution: null,
      },
      {
        title: 'Gewebeschäden (Operationen, Verletzungen, Herzinfarkt)',
        type: 'standard',
        evidence: 'Klinisch etabliert',
        description:
          'CRP steigt auch bei nicht-infektiösen Gewebeschäden an — etwa nach Operationen, bei Herzinfarkt oder schwerem Trauma. In diesen Fällen ist der Anstieg eine physiologische Entzündungsreaktion auf Zellschäden.',
        caution: null,
      },
    ],
    low: [],
  },

  // ─── HbA1c — LOINC 4548-4 ────────────────────────────────────────────────
  '4548-4': {
    high: [
      {
        title: 'Dauerhaft erhöhter Blutzucker',
        type: 'standard',
        evidence: 'Leitlinienbasiert — DDG / ADA 2023',
        description:
          'HbA1c spiegelt den durchschnittlichen Blutzucker der vergangenen 2–3 Monate wider. Erhöhte Werte werden bei anhaltend erhöhtem Blutzucker beobachtet — wie er bei Diabetes mellitus Typ 1 oder Typ 2 auftritt.',
        caution:
          'HbA1c ist ein Verlaufsmarker — kein eigenständiger Diagnosetest. Die Einordnung erfordert weitere Werte (z. B. Nüchternblutzucker) und eine ärztliche Beurteilung.',
      },
      {
        title: 'Mangelhaft eingestellte Diabetes-Therapie',
        type: 'standard',
        evidence: 'Leitlinienbasiert — DDG NVL Typ-2-Diabetes 2023',
        description:
          'Bei bekanntem Diabetes kann ein erhöhter HbA1c-Wert darauf hinweisen, dass die Blutzuckerkontrolle im zurückliegenden Zeitraum nicht ausreichend war. Er wird in Leitlinien als wichtiger Therapieziel-Parameter genutzt.',
        caution: null,
      },
    ],
    low: [
      {
        title: 'Beschleunigter Erythrozytenabbau',
        type: 'supporting',
        evidence: 'Klinisch plausibel — mehrere klinische Studien',
        description:
          'Ein niedrigerer HbA1c-Wert kann auftreten, wenn rote Blutkörperchen kürzer als üblich im Blut zirkulieren, z. B. bei bestimmten Bluterkrankungen (Anämieformen), nach Bluttransfusionen oder bei hämolytischen Zuständen. Da HbA1c im Verlauf der Erythrozyten-Lebenszeit gebildet wird, fällt der Wert dann geringer aus.',
        caution:
          'Dieser Befund ist selten und bedarf immer einer ärztlichen Abklärung.',
      },
    ],
  },

  // ─── TSH — LOINC 3016-3 ──────────────────────────────────────────────────
  '3016-3': {
    high: [
      {
        title: 'Schilddrüsenunterfunktion (Hypothyreose)',
        type: 'standard',
        evidence: 'Leitlinienbasiert — AWMF S2k Hypothyreose 2022',
        description:
          'TSH wird von der Hirnanhangsdrüse gebildet, um die Schilddrüse anzuregen. Erhöhte TSH-Werte werden typischerweise beobachtet, wenn die Schilddrüse nicht ausreichend aktiv ist und die Hirnanhangsdrüse gegensteuert.',
        caution:
          'Ein erhöhter TSH-Wert allein reicht für eine Diagnose nicht aus. Weitere Schilddrüsenwerte (fT3, fT4) und eine ärztliche Beurteilung sind erforderlich.',
      },
      {
        title: 'Autoimmune Schilddrüsenerkrankung (Hashimoto-Thyreoiditis)',
        type: 'standard',
        evidence: 'Klinisch etabliert — AWMF-Leitlinie',
        description:
          'Hashimoto-Thyreoiditis ist die häufigste Schilddrüsenerkrankung in Deutschland. Bei dieser Autoimmunerkrankung wird die Schilddrüse vom eigenen Immunsystem geschädigt, was häufig zu einer Unterfunktion führt — mit entsprechend erhöhtem TSH.',
        caution: null,
      },
    ],
    low: [
      {
        title: 'Schilddrüsenüberfunktion (Hyperthyreose)',
        type: 'standard',
        evidence: 'Leitlinienbasiert — AWMF S2k Hyperthyreose 2020',
        description:
          'Erniedrigte oder supprimierte TSH-Werte werden häufig bei einer Überfunktion der Schilddrüse beobachtet. Die Schilddrüse produziert dann mehr Hormone als benötigt — was die Hirnanhangsdrüse veranlasst, die TSH-Ausschüttung zu drosseln.',
        caution:
          'Auch Medikamente (z. B. Schilddrüsenhormone in zu hoher Dosis, hochdosiertes Biotin) und transiente Schilddrüsenentzündungen können TSH erniedrigen. Immer ärztlich einordnen lassen.',
      },
      {
        title: 'Morbus Basedow',
        type: 'standard',
        evidence: 'Klinisch etabliert — AWMF-Leitlinie',
        description:
          'Morbus Basedow ist eine Autoimmunerkrankung, bei der Antikörper (TRAK) die Schilddrüse dauerhaft stimulieren. TSH ist dabei meist stark erniedrigt oder supprimiert, da die Schilddrüse unkontrolliert übermäßig viele Hormone produziert.',
        caution: null,
      },
    ],
  },

  // ─── Ferritin — LOINC 2276-4 ─────────────────────────────────────────────
  '2276-4': {
    high: [
      {
        title: 'Entzündungsreaktion (Akute-Phase-Protein)',
        type: 'standard',
        evidence: 'Klinisch etabliert',
        description:
          'Ferritin gehört zu den Akut-Phase-Proteinen und steigt bei Entzündungsprozessen im Körper an — auch wenn die Eisenspeicher selbst nicht überfüllt sind. Erhöhte Werte müssen daher immer im Kontext weiterer Entzündungsmarker (z. B. CRP) betrachtet werden.',
        caution:
          'Ein erhöhtes Ferritin durch Entzündung schließt einen gleichzeitigen Eisenmangel nicht aus. Bei Verdacht sollten weitere Eisenparameter (z. B. Transferrinsättigung) bestimmt werden.',
      },
      {
        title: 'Erkrankungen der Leber',
        type: 'supporting',
        evidence: 'Klinisch plausibel — mehrere Kohortenstudien',
        description:
          'Da Ferritin vor allem in Leberzellen gespeichert wird, kann es bei Leberschäden oder Lebererkrankungen (z. B. Fettleber, Hepatitis, Zirrhose) in erhöhter Menge ins Blut freigesetzt werden.',
        caution: null,
      },
      {
        title: 'Hämochromatose (Eisenspeicherkrankheit)',
        type: 'supporting',
        evidence: 'Klinisch etabliert — seltene Ursache',
        description:
          'Bei der Hämochromatose — einer erblichen Erkrankung, bei der zu viel Eisen aufgenommen und in Organen gespeichert wird — ist Ferritin häufig deutlich erhöht. Typischerweise ist dabei auch die Transferrinsättigung erhöht.',
        caution:
          'Hämochromatose ist eine seltene Erkrankung. Erhöhtes Ferritin ist in den meisten Fällen auf häufigere Ursachen (Entzündungen, Lebererkrankungen) zurückzuführen.',
      },
    ],
    low: [
      {
        title: 'Eisenmangel',
        type: 'standard',
        evidence: 'Leitlinienbasiert — AWMF S1-Leitlinie Eisenmangel 2021',
        description:
          'Ferritin ist der wichtigste Speicherstoff für Eisen im Körper. Niedrige Ferritin-Werte gelten als zuverlässiger Hinweis auf erschöpfte Eisenspeicher — auch dann, wenn der Hämoglobin-Wert noch normal ist (latenter Eisenmangel).',
        caution:
          'Ferritin ist ein Akut-Phase-Protein: Bei gleichzeitiger Entzündung kann Ferritin trotz Eisenmangel normal oder sogar erhöht erscheinen. In diesem Fall helfen weitere Eisenparameter (z. B. Transferrinsättigung, löslicher Transferrinrezeptor).',
      },
      {
        title: 'Eisenmangelanämie',
        type: 'standard',
        evidence: 'Klinisch etabliert — breiter Leitlinienkonsens',
        description:
          'Wenn die Eisenspeicher so weit erschöpft sind, dass die Blutbildung beeinträchtigt wird, spricht man von Eisenmangelanämie. Ferritin ist dabei meist deutlich erniedrigt — in Kombination mit einem abgesenkten Hämoglobin-Wert.',
        caution: null,
      },
    ],
  },

  // ─── NEU AB S8-BUILD-02c ──────────────────────────────────────────────────

  // ─── Kreatinin — LOINC 2160-0 ────────────────────────────────────────────
  '2160-0': {
    high: [
      {
        title: 'Eingeschränkte Nierenfunktion',
        type: 'standard',
        evidence: 'Leitlinienbasiert — KDIGO 2024 / NVL Nierenerkrankungen',
        description:
          'Kreatinin wird über die Nieren ausgeschieden. Erhöhte Werte werden beobachtet, wenn die Filterleistung der Nieren vermindert ist — etwa bei chronischen Nierenerkrankungen, akutem Nierenversagen oder anhaltend schlechter Durchblutung der Nieren.',
        caution:
          'Kreatinin ist ein relativ unempfindlicher Marker — die Nierenfunktion kann bereits erheblich eingeschränkt sein, bevor Kreatinin den Referenzbereich verlässt. Für eine genauere Einschätzung wird die eGFR herangezogen.',
      },
      {
        title: 'Flüssigkeitsmangel (Dehydratation)',
        type: 'standard',
        evidence: 'Klinisch etabliert',
        description:
          'Ausgeprägte Flüssigkeitsdefizite oder ein vermindertes Blutvolumen können die Nierendurchblutung reduzieren und vorübergehend zu erhöhten Kreatinin-Werten führen (sogenanntes prärenales Nierenversagen). Nach Ausgleich des Flüssigkeitsmangels normalisiert sich der Wert meist wieder.',
        caution: null,
      },
      {
        title: 'Hohe Muskelmasse oder intensive körperliche Belastung',
        type: 'supporting',
        evidence: 'Klinisch plausibel — mehrere Studien',
        description:
          'Kreatinin entsteht als Abbauprodukt von Kreatin im Muskelgewebe. Bei Personen mit ausgeprägter Muskelmasse oder nach sehr intensiver körperlicher Belastung kann Kreatinin erhöht erscheinen, ohne dass eine Nierenerkrankung zugrunde liegt.',
        caution: null,
      },
    ],
    low: [
      {
        title: 'Geringe Muskelmasse',
        type: 'supporting',
        evidence: 'Klinisch plausibel',
        description:
          'Bei älteren Menschen und Personen mit reduzierter Muskelmasse (z. B. bei längerem Krankenhausaufenthalt, Mangelernährung oder chronischen Erkrankungen) werden häufig niedrigere Kreatinin-Werte festgestellt. Dies kann dazu führen, dass eine eingeschränkte Nierenfunktion durch die eGFR-Berechnung unterschätzt wird.',
        caution: null,
      },
    ],
  },

  // ─── eGFR (CKD-EPI) — LOINC 62238-1 ─────────────────────────────────────
  '62238-1': {
    high: [],
    low: [
      {
        title: 'Chronische Nierenerkrankung (CKD)',
        type: 'standard',
        evidence: 'Leitlinienbasiert — KDIGO 2024 / NVL CKD',
        description:
          'Die eGFR schätzt die Filterleistung der Nieren (in ml/min/1,73 m²). Dauerhaft niedrige Werte werden bei chronischen Nierenerkrankungen beobachtet — nach KDIGO-Leitlinie ab <60 ml/min/1,73 m² als Stadium G3a eingestuft. Die eGFR sollte immer im Zusammenhang mit weiteren Befunden betrachtet werden.',
        caution:
          'Ein einzelner eGFR-Wert erlaubt keine Stadieneinteilung — dafür sind mindestens zwei Messungen im Abstand von ≥3 Monaten erforderlich.',
      },
      {
        title: 'Akute Einschränkung der Nierenfunktion',
        type: 'standard',
        evidence: 'Klinisch etabliert — KDIGO AKI-Leitlinie',
        description:
          'Ein plötzlicher Abfall der eGFR kann auf ein akutes Nierenversagen hinweisen — z. B. bei ausgeprägtem Flüssigkeitsmangel, Medikamentenwirkungen, schweren Infektionen oder einer beeinträchtigten Nierenperfusion. Dies erfordert zeitnahe ärztliche Abklärung.',
        caution: null,
      },
      {
        title: 'Altersbedingte Veränderung der Nierenfunktion',
        type: 'supporting',
        evidence: 'Klinisch plausibel — CKD-EPI-Validierungsstudien',
        description:
          'Die eGFR nimmt im Alter physiologisch ab. Werte zwischen 45–59 ml/min/1,73 m² bei älteren Menschen ohne weitere Nierenbefunde können einen normalen Alterungsprozess widerspiegeln — eine Einordnung erfordert die ärztliche Gesamtbeurteilung.',
        caution: null,
      },
    ],
  },

  // ─── LDL-Cholesterin — LOINC 2089-1 ──────────────────────────────────────
  '2089-1': {
    high: [
      {
        title: 'Erhöhtes kardiovaskuläres Risiko im Kontext',
        type: 'standard',
        evidence: 'Leitlinienbasiert — ESC/EAS 2019 / DGK',
        description:
          'LDL-Cholesterin gilt als wichtiger Risikofaktor für Herzinfarkt und Schlaganfall. Die Bewertung erhöhter LDL-Werte erfolgt immer im Kontext weiterer kardiovaskulärer Risikofaktoren (z. B. Bluthochdruck, Rauchen, Diabetes, familiäre Belastung) und nicht als Einzelwert.',
        caution:
          'Der individuelle LDL-Zielwert richtet sich nach dem Gesamtrisikoprofil — ärztliche Einschätzung ist für die Bewertung unerlässlich.',
      },
      {
        title: 'Familiäre Hypercholesterinämie',
        type: 'standard',
        evidence: 'Klinisch etabliert — ESC/EAS Konsensus',
        description:
          'Bei genetisch bedingter familiärer Hypercholesterinämie werden häufig deutlich erhöhte LDL-Werte beobachtet (teils >190 mg/dl), die diätetisch kaum beeinflussbar sind. Eine familiäre Belastung (Herzerkrankungen in jungen Jahren) kann ein Hinweis sein.',
        caution: null,
      },
      {
        title: 'Ernährung und Lebensstil',
        type: 'supporting',
        evidence: 'Klinisch plausibel — Meta-Analysen',
        description:
          'Eine Ernährung reich an gesättigten Fettsäuren und Transfettsäuren kann den LDL-Spiegel erhöhen. Eine Anpassung des Lebensstils (ballaststoffreiche Kost, Gewichtsreduktion, körperliche Aktivität) kann LDL dagegen senken.',
        caution: null,
      },
    ],
    low: [
      {
        title: 'Sehr niedriges LDL unter lipidsenkender Therapie',
        type: 'supporting',
        evidence: 'Klinisch plausibel — Therapiemonitoring-Studien',
        description:
          'Sehr niedrige LDL-Werte werden häufig bei Personen beobachtet, die hochdosierte Statine oder andere Lipidsenker einnehmen. In Leitlinien werden für bestimmte Hochrisikogruppen sehr niedrige LDL-Zielwerte angestrebt.',
        caution: null,
      },
    ],
  },

  // ─── HDL-Cholesterin — LOINC 2085-9 ──────────────────────────────────────
  '2085-9': {
    high: [],
    low: [
      {
        title: 'Erhöhtes kardiovaskuläres Risiko im Kontext',
        type: 'standard',
        evidence: 'Leitlinienbasiert — ESC/EAS 2019 / DGK',
        description:
          'Niedrige HDL-Werte werden in Kombination mit anderen Risikofaktoren (hoher LDL, erhöhte Triglyzeride, Bluthochdruck, Rauchen) als Teilkomponente des kardiovaskulären Risikos betrachtet. HDL allein ist jedoch kein ausreichender Risikoprädiktor.',
        caution:
          'HDL allein erlaubt keine Aussage über das kardiovaskuläre Gesamtrisiko. Die Einordnung erfordert die Betrachtung des vollständigen Lipidprofils und weiterer Risikofaktoren.',
      },
      {
        title: 'Metabolisches Syndrom',
        type: 'standard',
        evidence: 'Klinisch etabliert — IDF/AHA-Kriterien, DDG',
        description:
          'Erniedrigtes HDL gehört zu den Diagnosekriterien des metabolischen Syndroms — zusammen mit erhöhten Triglyzeriden, vergrößertem Bauchumfang, Bluthochdruck und erhöhtem Nüchternblutzucker. Dieses Syndrom wird häufig bei Übergewicht und körperlicher Inaktivität beobachtet.',
        caution: null,
      },
    ],
  },

  // ─── Triglyzeride — LOINC 2571-8 ─────────────────────────────────────────
  '2571-8': {
    high: [
      {
        title: 'Metabolisches Syndrom und Insulinresistenz',
        type: 'standard',
        evidence: 'Leitlinienbasiert — ESC/EAS 2019 / DDG',
        description:
          'Erhöhte Triglyzerid-Werte werden häufig bei Übergewicht, Insulinresistenz und Diabetes mellitus Typ 2 beobachtet. Sie spiegeln einen gestörten Fettstoffwechsel wider und gelten als Bestandteil des metabolischen Syndroms.',
        caution:
          'Triglyzeride sind stark ernährungsabhängig — eine Messung sollte nach mindestens 12 Stunden Nahrungskarenz erfolgen. Werte direkt nach einer Mahlzeit sind nicht repräsentativ.',
      },
      {
        title: 'Erhöhtes kardiovaskuläres Risiko im Kontext',
        type: 'standard',
        evidence: 'Leitlinienbasiert — ESC/EAS 2019',
        description:
          'Deutlich erhöhte Triglyzeride werden als unabhängiger Risikofaktor für Herzkreislauf-Erkrankungen diskutiert — besonders in Kombination mit niedrigem HDL und erhöhtem LDL.',
        caution: null,
      },
      {
        title: 'Ernährung und Alkohol',
        type: 'supporting',
        evidence: 'Klinisch plausibel — Interventionsstudien',
        description:
          'Regelmäßiger Alkoholkonsum und eine Ernährung mit hohem Anteil an einfachen Kohlenhydraten und Zucker können den Triglyzeridspiegel erhöhen.',
        caution: null,
      },
    ],
    low: [],
  },

  // ─── Cholesterin (gesamt) — LOINC 2093-3 ─────────────────────────────────
  '2093-3': {
    high: [
      {
        title: 'Hypercholesterinämie',
        type: 'standard',
        evidence: 'Klinisch etabliert — ESC/EAS 2019 / DGK',
        description:
          'Erhöhte Gesamtcholesterin-Werte werden bei primären Fettstoffwechselstörungen (genetisch oder ernährungsbedingt) sowie bei sekundären Ursachen (z. B. Hypothyreose, Nierenerkrankungen) beobachtet. Der Wert ist jedoch ohne Differenzierung in LDL, HDL und Triglyzeride wenig aussagekräftig.',
        caution:
          'Der Gesamtcholesterin-Wert allein erlaubt keine Risikoabschätzung. Entscheidend ist das vollständige Lipidprofil mit LDL, HDL und Triglyzeriden in Kombination mit dem individuellen Risikoprofil.',
      },
    ],
    low: [],
  },

  // ─── Glukose (nüchtern) — LOINC 2345-7 ───────────────────────────────────
  '2345-7': {
    high: [
      {
        title: 'Gestörter Nüchternblutzucker / Prädiabetes',
        type: 'standard',
        evidence: 'Leitlinienbasiert — DDG / ADA 2023',
        description:
          'Erhöhte Nüchternglukose-Werte (100–125 mg/dl / 5,6–6,9 mmol/l) werden als gestörter Nüchternblutzucker eingestuft und können auf eine beginnende Insulinresistenz oder Prädiabetes hinweisen. Werte ≥126 mg/dl (≥7,0 mmol/l) an zwei Messtagen können im Rahmen der ärztlichen Beurteilung auf Diabetes mellitus hindeuten.',
        caution:
          'Eine valide Nüchternglukose-Messung erfordert mindestens 8 Stunden Nahrungskarenz. Für eine Diagnose sind mehrfache Messungen notwendig.',
      },
      {
        title: 'Diabetes mellitus (Typ 1 oder Typ 2)',
        type: 'standard',
        evidence: 'Leitlinienbasiert — DDG NVL Typ-2-Diabetes 2023 / ADA',
        description:
          'Bei nicht erkanntem oder unzureichend behandeltem Diabetes mellitus werden dauerhaft erhöhte Nüchternblutzucker-Werte beobachtet. Nüchternglukose ist einer von mehreren Parametern für die Diabetesdiagnostik.',
        caution: null,
      },
      {
        title: 'Vorübergehende Erhöhung durch Stress oder Medikamente',
        type: 'supporting',
        evidence: 'Klinisch plausibel',
        description:
          'Akute Erkrankungen, körperlicher oder psychischer Stress sowie bestimmte Medikamente (z. B. Glukokortikoide wie Kortison) können den Blutzucker vorübergehend erhöhen. In diesen Situationen ist eine einzelne erhöhte Messung nicht unbedingt auf einen Diabetes zurückzuführen.',
        caution: null,
      },
    ],
    low: [
      {
        title: 'Unterzuckerung (Hypoglykämie)',
        type: 'standard',
        evidence: 'Klinisch etabliert — DDG / ADA',
        description:
          'Sehr niedrige Nüchternglukose-Werte können auf eine Unterzuckerung hinweisen. Dies kann bei bekanntem Diabetes mit Insulintherapie, aber auch bei anderen Erkrankungen (z. B. Insulinom, Nebenniereninsuffizienz) auftreten.',
        caution:
          'Symptome einer Hypoglykämie (Zittern, Schweißausbruch, Schwindel, Bewusstseinsstörungen) erfordern sofortiges Handeln. Bei wiederholt niedrigen Werten ist ärztliche Abklärung notwendig.',
      },
    ],
  },

  // ─── Hämoglobin — LOINC 718-7 ────────────────────────────────────────────
  '718-7': {
    high: [
      {
        title: 'Polyzythämie / Erhöhte Erythrozytenproduktion',
        type: 'standard',
        evidence: 'Klinisch etabliert — EHA-Leitlinie / DGHO',
        description:
          'Erhöhte Hämoglobin-Werte werden bei Polycythaemia vera (einer seltenen Knochenmarkserkrankung) sowie reaktiv bei anhaltend niedrigem Sauerstoffangebot beobachtet (z. B. bei COPD, Schlafapnoe, längerem Höhenaufenthalt).',
        caution:
          'Stark erhöhte Hämoglobin-Werte erhöhen das Risiko für Thrombosen und erfordern zeitnahe ärztliche Abklärung.',
      },
    ],
    low: [
      {
        title: 'Anämie (verschiedene Ursachen)',
        type: 'standard',
        evidence: 'Leitlinienbasiert — WHO / AWMF Anämie-Leitlinie',
        description:
          'Ein niedriger Hämoglobin-Wert ist das Hauptkennzeichen einer Anämie (WHO: Frauen <12 g/dl, Männer <13 g/dl). Ursachen können u. a. Eisenmangel, Vitamin-B12- oder Folsäuremangel, chronische Erkrankungen, Blutverlust oder Knochenmarkerkrankungen sein.',
        caution:
          'Die Art der Anämie lässt sich nur durch weitere Werte bestimmen — z. B. Ferritin, MCV, Vitamin B12. Ein einzelner Hämoglobin-Wert reicht für eine Ursacheneingrenzung nicht aus.',
      },
      {
        title: 'Eisenmangelanämie',
        type: 'standard',
        evidence: 'Klinisch etabliert — AWMF S1-Leitlinie Eisenmangel 2021',
        description:
          'Die Eisenmangelanämie ist die häufigste Anämieform weltweit. Ein niedriges Hämoglobin in Kombination mit erniedrigtem Ferritin und kleinen Erythrozyten (niedriger MCV-Wert) spricht im Kontext eher für dieses Bild.',
        caution: null,
      },
    ],
  },

  // ─── Leukozyten — LOINC 6690-2 ───────────────────────────────────────────
  '6690-2': {
    high: [
      {
        title: 'Infektionen und Entzündungsreaktionen',
        type: 'standard',
        evidence: 'Klinisch etabliert — breiter medizinischer Konsens',
        description:
          'Erhöhte Leukozytenwerte (Leukozytose) werden häufig bei bakteriellen Infektionen, ausgeprägten Entzündungsreaktionen und Gewebeschäden beobachtet. Die Abwehrzellen des Körpers vermehren sich dabei als Reaktion auf die Gefahrensituation.',
        caution:
          'Leukozytose allein erlaubt keine Aussage über die Ursache. Das Differenzialblutbild (Anteil der verschiedenen Leukozyten-Untergruppen) liefert wichtige Zusatzinformationen.',
      },
      {
        title: 'Körperliche Belastung, Stress und Rauchen',
        type: 'supporting',
        evidence: 'Klinisch plausibel — mehrere Beobachtungsstudien',
        description:
          'Vorübergehend erhöhte Leukozytenwerte können durch intensive körperliche Belastung, akuten Stress und chronisches Rauchen auftreten, ohne dass eine Infektion oder Erkrankung vorliegt.',
        caution: null,
      },
    ],
    low: [
      {
        title: 'Leukopenie (Medikamente, Autoimmunerkrankungen, Knochenmark)',
        type: 'standard',
        evidence: 'Klinisch etabliert — DGHO',
        description:
          'Niedrige Leukozytenwerte (Leukopenie) werden beobachtet bei bestimmten Autoimmunerkrankungen (z. B. Lupus erythematodes), als Nebenwirkung bestimmter Medikamente (z. B. Chemotherapie, immunsuppressive Therapien) sowie bei Erkrankungen, die das Knochenmark beeinflussen.',
        caution:
          'Eine ausgeprägte Leukopenie erhöht die Infektanfälligkeit erheblich und erfordert zeitnahe ärztliche Abklärung.',
      },
    ],
  },

  // ─── Thrombozyten — LOINC 777-3 ──────────────────────────────────────────
  '777-3': {
    high: [
      {
        title: 'Reaktive Thrombozytose',
        type: 'standard',
        evidence: 'Klinisch etabliert — DGHO',
        description:
          'Erhöhte Thrombozytenwerte (Thrombozytose) treten häufig als Reaktion auf Infektionen, Entzündungen, Eisenmangel oder nach einer Milzentfernung auf. Diese Form gilt als reaktiv und ist in der Regel vorübergehend.',
        caution:
          'Sehr stark erhöhte Werte (>1.000 × 10⁹/l) können das Risiko für Thrombosen erhöhen und erfordern ärztliche Abklärung.',
      },
    ],
    low: [
      {
        title: 'Thrombozytopenie (Medikamente, Autoimmunerkrankungen)',
        type: 'standard',
        evidence: 'Klinisch etabliert — DGHO / ASH-Leitlinie ITP',
        description:
          'Niedrige Thrombozytenwerte (Thrombozytopenie) werden beobachtet bei Autoimmunerkrankungen (z. B. Immunthrombozytopenie, ITP), bestimmten Medikamenten, Infektionen (z. B. HIV) sowie bei Erkrankungen, die das Knochenmark oder die Leber betreffen.',
        caution:
          'Stark erniedrigte Thrombozytenwerte (<20 × 10⁹/l) erhöhen das Blutungsrisiko erheblich und erfordern umgehende ärztliche Abklärung.',
      },
    ],
  },

  // ─── GOT / AST — LOINC 1920-8 ────────────────────────────────────────────
  '1920-8': {
    high: [
      {
        title: 'Leberzellschäden',
        type: 'standard',
        evidence: 'Klinisch etabliert — DGVS-Leitlinien',
        description:
          'GOT (AST) steigt bei Schädigungen von Leberzellen an. Erhöhte Werte werden beobachtet bei viraler Hepatitis, alkoholbedingten Leberschäden, nicht-alkoholischer Fettleber (NASH) sowie bei Leberzirrhose. Bei alkoholbedingten Erkrankungen ist GOT oft stärker erhöht als GPT.',
        caution:
          'GOT allein reicht nicht für eine Diagnose. Das Verhältnis GOT/GPT sowie GGT und weitere Leberwerte liefern wichtige Zusatzinformationen.',
      },
      {
        title: 'Herzinfarkt und Muskelschäden',
        type: 'standard',
        evidence: 'Klinisch etabliert',
        description:
          'GOT ist nicht nur in der Leber, sondern auch im Herzmuskel und der Skelettmuskulatur vorhanden. Bei Herzinfarkt, ausgeprägtem Muskelschaden (Rhabdomyolyse) oder nach sehr intensivem Sport kann GOT erhöht sein.',
        caution: null,
      },
    ],
    low: [],
  },

  // ─── GPT / ALT — LOINC 1742-6 ────────────────────────────────────────────
  '1742-6': {
    high: [
      {
        title: 'Leberzellschäden / Hepatitis',
        type: 'standard',
        evidence: 'Leitlinienbasiert — DGVS / EASL',
        description:
          'GPT (ALT) gilt als leberspezifischerer Marker als GOT und ist der wichtigste Parameter für Leberzellschäden. Erhöhte Werte werden bei viraler Hepatitis (A, B, C), alkoholbedingten Leberschäden, Leberverfettung und medikamentös-toxischen Leberschäden beobachtet.',
        caution:
          'GPT allein erlaubt keine Diagnose. Eine vollständige Leberdiagnostik (GOT, GGT, AP, Bilirubin, ggf. Sonographie) ist für die Einordnung notwendig.',
      },
      {
        title: 'Nicht-alkoholische Fettleber (NAFL/NASH)',
        type: 'supporting',
        evidence: 'Klinisch plausibel — DGVS S2k-Leitlinie NAFLD 2022',
        description:
          'Isoliert oder mäßig erhöhte GPT-Werte werden zunehmend im Kontext einer nicht-alkoholischen Fettleber (NAFL) beobachtet — häufig bei Übergewicht, Typ-2-Diabetes und metabolischem Syndrom. Die NAFL kann lange symptomlos verlaufen.',
        caution: null,
      },
    ],
    low: [],
  },

  // ─── GGT — LOINC 2324-2 ──────────────────────────────────────────────────
  '2324-2': {
    high: [
      {
        title: 'Alkohol und alkoholbedingte Leberschäden',
        type: 'standard',
        evidence: 'Klinisch etabliert — DGVS / breiter Konsens',
        description:
          'GGT reagiert besonders empfindlich auf regelmäßigen Alkoholkonsum. Erhöhte Werte werden bei alkoholischer Fettleber, alkoholischer Hepatitis sowie bei regelmäßigem Konsum auch ohne strukturelle Leberschädigung beobachtet.',
        caution:
          'GGT ist kein spezifischer Marker — erhöhte Werte können viele Ursachen haben. Alkohol ist nur eine davon.',
      },
      {
        title: 'Gallenwegserkrankungen (Cholestase)',
        type: 'standard',
        evidence: 'Klinisch etabliert — DGVS-Leitlinie',
        description:
          'GGT steigt bei beeinträchtigtem Gallefluss (Cholestase) deutlich an — z. B. bei Gallensteinen, primär biliärer Cholangitis (PBC) oder anderen Gallenwegserkrankungen. In Kombination mit Alkalischer Phosphatase (AP) ist GGT ein wichtiger Cholestase-Marker.',
        caution: null,
      },
      {
        title: 'Medikamente und sonstige Lebererkrankungen',
        type: 'supporting',
        evidence: 'Klinisch plausibel',
        description:
          'Viele Medikamente (u. a. Antiepileptika, bestimmte Antibiotika, Statine) können GGT als Enzyminduktionsreaktion erhöhen, ohne dass ein echter Leberschaden vorliegt. Auch bei nicht-alkoholischer Fettleber, Herzinsuffizienz und Schilddrüsenerkrankungen können erhöhte GGT-Werte auftreten.',
        caution: null,
      },
    ],
    low: [],
  },

  // ─── Harnsäure — LOINC 3084-1 ────────────────────────────────────────────
  '3084-1': {
    high: [
      {
        title: 'Gicht (Hyperurikämie)',
        type: 'standard',
        evidence: 'Leitlinienbasiert — DGRh / EULAR Gicht-Leitlinie 2016',
        description:
          'Erhöhte Harnsäure-Werte (Hyperurikämie) sind der wesentliche Risikofaktor für Gicht — eine schmerzhafte Gelenkentzündung, die durch die Ablagerung von Harnsäurekristallen in Gelenken ausgelöst wird. Am häufigsten ist das Großzehengrundgelenk betroffen.',
        caution:
          'Nicht jede Hyperurikämie führt zu Gicht. Erhöhte Harnsäure-Werte können lange asymptomatisch bestehen. Eine ärztliche Einordnung ist sinnvoll.',
      },
      {
        title: 'Eingeschränkte Nierenfunktion',
        type: 'standard',
        evidence: 'Klinisch etabliert',
        description:
          'Da Harnsäure über die Nieren ausgeschieden wird, kann eine eingeschränkte Nierenfunktion zu einem Anstieg der Harnsäure im Blut führen. Erhöhte Harnsäure und Nierenerkrankungen können sich dabei gegenseitig begünstigen.',
        caution: null,
      },
      {
        title: 'Ernährung (purinstoffreiche Kost) und Alkohol',
        type: 'supporting',
        evidence: 'Klinisch plausibel — Ernährungsepidemiologie',
        description:
          'Eine purinstoffreiche Ernährung (z. B. Innereien, rotes Fleisch, bestimmte Meeresfrüchte) sowie regelmäßiger Alkohol- insbesondere Bierkonsum — können den Harnsäurespiegel erhöhen.',
        caution: null,
      },
    ],
    low: [],
  },

  // ─── Vitamin D (25-OH) — LOINC 14635-7 ───────────────────────────────────
  '14635-7': {
    high: [
      {
        title: 'Überdosierung durch Supplementierung',
        type: 'supporting',
        evidence: 'Klinisch plausibel — Fallberichte / EFSA',
        description:
          'Sehr hohe Vitamin-D-Werte werden fast ausschließlich durch übermäßige Einnahme von Vitamin-D-Präparaten beobachtet — nicht durch Sonnenlichtexposition. Eine Vitamin-D-Toxizität (mit erhöhtem Kalzium im Blut) tritt bei dauerhaft sehr hoher Supplementierung auf.',
        caution:
          'Vitamin-D-Toxizität ist selten, aber möglich bei anhaltend sehr hoher Dosierung. Eine hochdosierte Supplementierung sollte ärztlich begleitet werden.',
      },
    ],
    low: [
      {
        title: 'Vitamin-D-Mangel',
        type: 'standard',
        evidence: 'Leitlinienbasiert — AWMF S2k-Leitlinie Vitamin D 2023 / DGE',
        description:
          'Niedrige 25-OH-Vitamin-D-Werte zeigen einen Vitamin-D-Mangel an. In Deutschland weisen viele Menschen besonders in den Wintermonaten unzureichende Vitamin-D-Spiegel auf — bedingt durch geringe Sonnenlichtexposition. Als Grenze für einen Mangel wird häufig <50 nmol/l (20 ng/ml) angesetzt.',
        caution:
          'Die Definition von "ausreichend" und "mangelhaft" variiert zwischen Leitlinien. Die individuelle Einordnung sollte ärztlich erfolgen.',
      },
      {
        title: 'Erhöhtes Risiko für Knochenstoffwechselstörungen',
        type: 'standard',
        evidence: 'Klinisch etabliert — AWMF / NOF-Leitlinie Osteoporose',
        description:
          'Dauerhafter und ausgeprägter Vitamin-D-Mangel wird mit Störungen des Knochenstoffwechsels in Verbindung gebracht — Rachitis bei Kindern, Osteomalazie bei Erwachsenen und als Risikofaktor für Osteoporose.',
        caution: null,
      },
    ],
  },
}
