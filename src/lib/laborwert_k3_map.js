/**
 * LABORWERT_K3_MAP — S8-BUILD-02
 *
 * Lokales Mapping für den "Einordnung des Wertes"-Block auf Laborwert-Detailseiten.
 * Schlüssel: LOINC-Code (string) — muss mit lw.loinc_code in der DB übereinstimmen.
 *
 * Feldstruktur je Eintrag:
 *   title:       string   — Titel der Karte (kein Diagnose-Framing)
 *   type:        'standard' | 'supporting' | 'uncertain'
 *   evidence:    string   — Evidenzgrundlage (Leitlinie / klinisch etabliert / plausibel)
 *   description: string   — 2–3 Sätze. Formulierung: "wird beobachtet bei" / "kann auftreten bei"
 *   caution:     string | null — Vorsichtshinweis (nur bei relevanter Einschränkung)
 *
 * Typ-Klassifikation:
 *   standard:    Mindestens eine nationale Leitlinie (AWMF/DGE/DDG) benennt diesen Zusammenhang
 *   supporting:  Mehrere klinische Studien; kein aktiver Sicherheitshinweis
 *   uncertain:   Einzelne Studien oder Mechanismus-Hypothesen; kein klinischer Konsens
 *
 * Sprach-No-Gos (strikt): Kein "du hast", kein "bedeutet", kein Diagnose-Framing.
 * Nur: "wird beobachtet bei", "kann auftreten bei", "wird häufig festgestellt bei".
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
          'Auch Medikamente (z. B. Schilddrüsenhormone in zu hoher Dosierung, hochdosiertes Biotin) und transiente Schilddrüsenentzündungen können TSH erniedrigen. Immer ärztlich einordnen lassen.',
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
}
