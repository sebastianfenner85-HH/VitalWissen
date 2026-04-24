/**
 * LABORWERT_B4_ACTIONS_MAP — S8-BUILD-03
 *
 * Lokales Mapping für den "Was kann ich konkret tun?"-Block auf Laborwert-Detailseiten.
 * Schlüssel: LOINC-Code (string) — identisch mit LABORWERT_K3_MAP und lw.loinc_code in DB.
 * Fallback: slug (via B4ActionsBlock-Komponente in LaborwertDetail.jsx)
 *
 * Inhaltliche Abgrenzung zum K3-Map:
 *   K3 (laborwert_k3_map.js):  Was kann dieser Wert bedeuten? (Zusammenhänge, Einordnung)
 *   B4 (diese Datei):          Was kann ich als Nächstes prüfen, besprechen oder tun?
 *
 * Feldstruktur je Karte:
 *   title:          string  — Titel der Karte (keine Diagnose, keine Therapieanweisung)
 *   category:       'standard' | 'supporting'
 *   evidence:       string  — Evidenzgrundlage (Leitlinie / klinisch etabliert / klinisch relevant)
 *   whyShown:       string  — Kurzer Kontext: Warum ist diese Karte für diesen Wert relevant?
 *   whatHelps:      string  — Die eigentliche Maßnahme / der Gesprächspunkt
 *   expectedEffect: string  — Was nach dem Schritt zu erwarten ist
 *   cautions:       string | null — Vorsichtshinweis (nur bei echter Relevanz)
 *   monitoring:     string | null — Welche Werte sinnvoll nachverfolgt werden können
 *
 * Kategorie-Klassifikation:
 *   standard:    Mindestens eine nationale Leitlinie (ESC/EAC, DDG, AWMF, DGE) empfiehlt diesen Schritt
 *   supporting:  Klinisch sinnvoll, mehrere Studien/Konsens; kein aktiver Sicherheitshinweis
 *
 * Sprach-No-Gos (strikt):
 *   Kein "du hast X", kein "dein Wert bedeutet", kein Diagnose-Framing.
 *   Kein "nimm Supplement X", keine Dosierungsangabe.
 *   Nur: "besprich mit", "frage nach", "kann sinnvoll sein", "wird empfohlen".
 *
 * Stand: S8-BUILD-03 (24.04.2026) — 5 MVP-Laborwerte
 */

export const LABORWERT_B4_ACTIONS_MAP = {

  // ─── LDL-Cholesterin — LOINC 2089-1 ──────────────────────────────────────
  '2089-1': {
    title: 'Was kann ich bei erhöhtem LDL besprechen?',
    intro:
      'LDL-Cholesterin wird immer im Zusammenhang mit dem gesamten Herz-Kreislauf-Risiko bewertet. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Therapieempfehlung.',
    high: [
      {
        title: 'Gesamtrisiko ärztlich einordnen lassen',
        category: 'standard',
        evidence: 'Leitlinie — ESC/EAC Dyslipidämien 2019',
        whyShown:
          'LDL-Zielwerte hängen stark vom individuellen Herz-Kreislauf-Risiko ab — ein einzelner LDL-Wert reicht für die Einordnung nicht aus.',
        whatHelps:
          'Besprich Risikofaktoren wie Blutdruck, Rauchen, Diabetes, familiäre Belastung und frühere Herz-Kreislauf-Ereignisse mit deiner Ärztin oder deinem Arzt.',
        expectedEffect:
          'Einordnung, welcher LDL-Zielwert für dich individuell gilt und ob Maßnahmen sinnvoll sind.',
        cautions:
          'Ein einzelner erhöhter LDL-Wert ohne bekannte Vorerkrankungen erfordert nicht automatisch eine medikamentöse Therapie.',
        monitoring:
          'Vollständiges Lipidprofil (LDL, HDL, Triglyzeride), Blutdruck, Nüchternblutzucker.',
      },
      {
        title: 'Ernährungs- und Lebensstilgewohnheiten besprechen',
        category: 'standard',
        evidence: 'Leitlinie — ESC/EAC 2019, AWMF',
        whyShown:
          'Ernährung (gesättigte Fettsäuren, Ballaststoffe) und körperliche Aktivität haben messbaren Einfluss auf den LDL-Spiegel.',
        whatHelps:
          'Besonders relevant: Reduktion gesättigter Fettsäuren, mehr Ballaststoffe, regelmäßige körperliche Aktivität. Arzt oder Ernährungsberatung können konkrete Maßnahmen vorschlagen.',
        expectedEffect:
          'Lebensstilmaßnahmen können LDL je nach Ausgangslage messbar senken — besonders bei milder Erhöhung.',
        cautions:
          'Bei familiärer Hypercholesterinämie sind Lebensstilmaßnahmen allein meist nicht ausreichend.',
        monitoring:
          'Kontrolle des Lipidprofils nach 3–6 Monaten Lebensstilmaßnahmen empfohlen.',
      },
      {
        title: 'Vollständiges Lipidprofil beurteilen lassen',
        category: 'standard',
        evidence: 'Klinisch etabliert — ESC/EAC 2019',
        whyShown:
          'LDL allein ist nur ein Teil des kardiovaskulären Risikobilds — HDL, Triglyzeride und Gesamtcholesterin sind für eine vollständige Einordnung notwendig.',
        whatHelps:
          'Bitte darum, dass HDL, Triglyzeride und Non-HDL-Cholesterin in die Blutuntersuchung einbezogen werden.',
        expectedEffect:
          'Bessere Risikoabschätzung durch das vollständige Fettstoffwechselprofil.',
        cautions: null,
        monitoring:
          'Nicht-nüchtern-Lipide sind für Erstscreening geeignet; für Verlaufskontrollen wird nüchtern empfohlen.',
      },
      {
        title: 'Familienanamnese ansprechen',
        category: 'supporting',
        evidence: 'Klinisch relevant — AWMF Leitlinie Familiäre Hypercholesterinämie',
        whyShown:
          'Bei familiärer Hypercholesterinämie (FH) können sehr hohe LDL-Werte erblich bedingt sein. Frühzeitige Erkennung verbessert die Prognose deutlich.',
        whatHelps:
          'Sprich an, ob Herzerkrankungen oder sehr hohe Cholesterin-Werte in der Familie bekannt sind — besonders bei Betroffenen in jungem Alter.',
        expectedEffect:
          'Ggf. gezielte genetische Abklärung oder intensivere Therapieplanung möglich.',
        cautions:
          'Familiäre Hypercholesterinämie ist selten, aber häufig unterdiagnostiziert.',
        monitoring: null,
      },
    ],
    low: [
      {
        title: 'Bestehende lipidsenkende Therapie einordnen lassen',
        category: 'standard',
        evidence: 'Klinisch etabliert — ESC/EAC 2019',
        whyShown:
          'Sehr niedrige LDL-Werte entstehen häufig unter hochdosierten Statinen oder anderen Lipidsenkern. In bestimmten Hochrisikogruppen sind niedrige LDL-Zielwerte leitliniengerecht.',
        whatHelps:
          'Falls du Lipidsenker einnimmst, besprich mit deiner Ärztin oder deinem Arzt, ob Dosierung und Therapieziel noch passend sind.',
        expectedEffect:
          'Einordnung, ob der Wert im angestrebten Zielbereich liegt oder eine Anpassung sinnvoll ist.',
        cautions: null,
        monitoring: null,
      },
    ],
  },

  // ─── HbA1c — LOINC 4548-4 ────────────────────────────────────────────────
  '4548-4': {
    title: 'Was kann ich bei auffälligem HbA1c besprechen?',
    intro:
      'HbA1c spiegelt den durchschnittlichen Blutzucker der vergangenen 2–3 Monate wider. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Therapieempfehlung.',
    high: [
      {
        title: 'Blutzucker-Einstellung ärztlich bewerten lassen',
        category: 'standard',
        evidence: 'Leitlinie — DDG/AkdÄ NVL Diabetes mellitus Typ 2, ADA Standards of Care 2024',
        whyShown:
          'Ein erhöhter HbA1c zeigt, dass der Blutzucker in den vergangenen Monaten anhaltend erhöht war. Er ist ein wichtiger Verlaufsparameter bei Diabetes.',
        whatHelps:
          'Besprich den Wert im Kontext deiner aktuellen Therapie, des Nüchternblutzuckers und deiner Alltagsgewohnheiten mit deiner Ärztin oder deinem Arzt.',
        expectedEffect:
          'Einordnung, ob eine Therapieanpassung oder intensivere Begleitung sinnvoll ist.',
        cautions:
          'HbA1c allein ist kein Diagnosetest für Diabetes — dafür sind Nüchternblutzucker und ggf. ein oraler Glukosetoleranztest notwendig.',
        monitoring:
          'Nüchternblutzucker, Gewicht, Blutdruck, Nierenwerte (Kreatinin, eGFR).',
      },
      {
        title: 'Ernährung und Bewegungsgewohnheiten besprechen',
        category: 'standard',
        evidence: 'Leitlinie — DDG NVL, ESC/EASD 2023',
        whyShown:
          'Ernährungsweise und körperliche Aktivität haben direkten Einfluss auf die Blutzuckerkontrolle und damit auf den HbA1c.',
        whatHelps:
          'Besonders relevant: Kohlenhydratqualität (ballaststoffreiche Kost statt schnell verfügbarer Kohlenhydrate), Gewichtsmanagement, regelmäßige körperliche Aktivität. Eine Diabetes- oder Ernährungsberatung kann konkrete Maßnahmen unterstützen.',
        expectedEffect:
          'Lebensstilmaßnahmen können HbA1c messbar senken — besonders wirksam in der Frühphase von Typ-2-Diabetes.',
        cautions:
          'Bei bekanntem Typ-1-Diabetes sind Insulindosierung und Kohlenhydratmanagement zentral — ärztliche Begleitung ist unerlässlich.',
        monitoring:
          'Kontrolle nach 3 Monaten empfohlen (entspricht der biologischen Halbwertszeit von HbA1c).',
      },
      {
        title: 'Individuelle Therapieziele abklären',
        category: 'standard',
        evidence: 'Leitlinie — DDG NVL, ADA Standards of Care 2024',
        whyShown:
          'HbA1c-Zielwerte sind individuell und hängen von Alter, Begleiterkrankungen, Therapieform und Lebensqualität ab.',
        whatHelps:
          'Frage nach dem für dich persönlich geltenden HbA1c-Zielwert und was eine Überschreitung in deinem Fall bedeutet.',
        expectedEffect:
          'Besseres Verständnis, ob und welche Maßnahmen sinnvoll oder dringend sind.',
        cautions:
          'Zu aggressive Blutzuckersenkung (Hypoglykämien) kann bei bestimmten Gruppen — z. B. älteren Patienten — schädlicher sein als ein leicht erhöhter HbA1c.',
        monitoring: null,
      },
    ],
    low: [
      {
        title: 'Hämatologische Ursachen abklären lassen',
        category: 'supporting',
        evidence: 'Klinisch etabliert',
        whyShown:
          'Ein niedriger HbA1c kann auf eine verkürzte Lebensdauer der roten Blutkörperchen hinweisen — etwa bei Anämien oder hämolytischen Erkrankungen.',
        whatHelps:
          'Besprich mit deiner Ärztin oder deinem Arzt, ob ein Blutbild und Anämieparameter (Hämoglobin, Ferritin) sinnvoll sind.',
        expectedEffect:
          'Einordnung, ob HbA1c als verlässlicher Verlaufsparameter für Blutzuckerkontrolle geeignet ist.',
        cautions:
          'Ein niedrigerer HbA1c bei Anämie ist kein Hinweis auf gute Blutzuckerkontrolle — andere Messmethoden (z. B. Fruktosamin) können dann besser geeignet sein.',
        monitoring:
          'Hämoglobin, Ferritin, ggf. Retikulozyten.',
      },
    ],
  },

  // ─── Ferritin — LOINC 2276-4 ─────────────────────────────────────────────
  '2276-4': {
    title: 'Was kann ich bei auffälligem Ferritin besprechen?',
    intro:
      'Ferritin ist ein Eisenspeicherprotein, das auch bei Entzündungen ansteigt. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Therapieempfehlung.',
    high: [
      {
        title: 'Entzündungskontext ärztlich einordnen lassen',
        category: 'standard',
        evidence: 'Klinisch etabliert — AWMF-Leitlinie Eisenmangel 025-021',
        whyShown:
          'Ferritin ist ein Akut-Phase-Protein und steigt bei Entzündungen an — auch ohne Überladung der Eisenspeicher. Ein erhöhter Wert muss immer im Kontext von Entzündungsmarkern (CRP) betrachtet werden.',
        whatHelps:
          'Besprich, ob CRP und weitere Entzündungsparameter parallel bestimmt wurden oder werden sollten.',
        expectedEffect:
          'Einordnung, ob das erhöhte Ferritin entzündungsbedingt oder eisenspeicherbezogen ist.',
        cautions:
          'Erhöhtes Ferritin schließt einen gleichzeitigen Eisenmangel nicht aus (sogenannter funktioneller Eisenmangel).',
        monitoring:
          'CRP, Transferrinsättigung, ggf. löslicher Transferrinrezeptor.',
      },
      {
        title: 'Leberwerte im Kontext beurteilen lassen',
        category: 'supporting',
        evidence: 'Klinisch relevant — DGVS',
        whyShown:
          'Ferritin wird in Leberzellen gespeichert. Lebererkrankungen wie Fettleber oder Hepatitis können Ferritin erhöhen, ohne dass die Eisenspeicher überfüllt sind.',
        whatHelps:
          'Frage nach Leberwerten (GOT/GPT/GGT), falls diese nicht parallel bestimmt wurden.',
        expectedEffect:
          'Einordnung, ob eine Leberursache für das erhöhte Ferritin relevant ist.',
        cautions: null,
        monitoring:
          'GOT (AST), GPT (ALT), GGT.',
      },
      {
        title: 'Vollständigen Eisenstatus bestimmen lassen',
        category: 'standard',
        evidence: 'Klinisch etabliert — AWMF-Leitlinie Eisenmangel',
        whyShown:
          'Für eine vollständige Einordnung des Eisenstoffwechsels ist Ferritin allein nicht ausreichend — Transferrinsättigung und Serumeisen ergänzen das Bild.',
        whatHelps:
          'Bitte um einen vollständigen Eisenstatus (Ferritin, Transferrin, Transferrinsättigung, Serumeisen) wenn dieser noch nicht bestimmt wurde.',
        expectedEffect:
          'Einordnung, ob eine Eisenüberladung (z. B. Hämochromatose) oder eine andere Ursache vorliegt.',
        cautions:
          'Hämochromatose ist selten — häufigere Ursachen für erhöhtes Ferritin sind Entzündungen und Lebererkrankungen.',
        monitoring:
          'Transferrinsättigung; bei begründetem Verdacht: HFE-Gentest (Hämochromatose).',
      },
    ],
    low: [
      {
        title: 'Eisenstatus vollständig abklären lassen',
        category: 'standard',
        evidence: 'Leitlinie — AWMF-Leitlinie Eisenmangel 025-021',
        whyShown:
          'Niedriges Ferritin gilt als zuverlässiger Marker für erschöpfte Eisenspeicher — auch dann, wenn Hämoglobin noch normal ist (latenter Eisenmangel).',
        whatHelps:
          'Besprich mit deiner Ärztin oder deinem Arzt, ob Hämoglobin, Transferrinsättigung und eine Ursachenklärung sinnvoll sind.',
        expectedEffect:
          'Einordnung, ob ein latenter Eisenmangel, eine manifeste Eisenmangelanämie oder eine andere Ursache vorliegt.',
        cautions:
          'Bei gleichzeitiger Entzündung (erhöhtem CRP) kann Ferritin trotz Eisenmangel normal oder sogar erhöht erscheinen.',
        monitoring:
          'Hämoglobin, Transferrinsättigung, CRP.',
      },
      {
        title: 'Ursache des Eisenmangels klären lassen',
        category: 'standard',
        evidence: 'Klinisch etabliert — AWMF',
        whyShown:
          'Niedriges Ferritin hat verschiedene mögliche Ursachen: unzureichende Zufuhr, Resorptionsstörungen (z. B. Zöliakie, Morbus Crohn) oder chronische Blutverluste.',
        whatHelps:
          'Besprich potenzielle Ursachen: Ernährungsgewohnheiten, gastrointestinale Beschwerden, Menstruationsstärke (bei Frauen) oder bekannte Grunderkrankungen.',
        expectedEffect:
          'Zielgerichtete Behandlung der Ursache ist dauerhaft wirksamer als alleinige Supplementierung.',
        cautions:
          'Eisensupplementation ohne Ursachenklärung kann eine Diagnose verzögern.',
        monitoring: null,
      },
      {
        title: 'Eisenreiche Ernährungsgewohnheiten besprechen',
        category: 'supporting',
        evidence: 'Klinisch etabliert — DGE Referenzwerte',
        whyShown:
          'Ernährungsgewohnheiten beeinflussen die Eisenaufnahme — sowohl die Menge als auch die Bioverfügbarkeit.',
        whatHelps:
          'Besprich mit Arzt oder Ernährungsberatung: Quellen für gut verfügbares Eisen, die Kombination mit Vitamin-C-reichen Speisen und häufige Hemmfaktoren (z. B. Kaffee, Tee oder calciumreiche Speisen zur selben Mahlzeit).',
        expectedEffect:
          'Ernährungsanpassungen können die Eisenaufnahme verbessern — besonders bei leichtem Mangel ohne Resorptionsstörung.',
        cautions:
          'Bei nachgewiesenem Eisenmangel reichen Ernährungsmaßnahmen allein oft nicht aus — ärztliche Beurteilung bleibt notwendig.',
        monitoring: null,
      },
    ],
  },

  // ─── Vitamin D 25-OH — LOINC 14635-7 ─────────────────────────────────────
  '14635-7': {
    title: 'Was kann ich bei auffälligem Vitamin-D-Spiegel besprechen?',
    intro:
      'Vitamin D 25-OH ist der wichtigste Labormarker für den Vitamin-D-Versorgungsstatus. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Supplementierungsempfehlung.',
    high: [
      {
        title: 'Aktuelle Supplementierung ärztlich einordnen lassen',
        category: 'standard',
        evidence: 'Klinisch etabliert — DGE, AWMF',
        whyShown:
          'Sehr hohe Vitamin-D-Werte entstehen fast ausschließlich durch hochdosierte Supplementierung. Eine Überdosierung kann langfristig zu erhöhten Kalziumspiegeln führen.',
        whatHelps:
          'Falls du Vitamin-D-Präparate einnimmst, besprich die aktuelle Dosierung und Einnahmedauer mit deiner Ärztin oder deinem Arzt.',
        expectedEffect:
          'Anpassung der Supplementierung auf einen sicheren Bereich.',
        cautions:
          'Sonnenexposition allein führt nicht zu Vitamin-D-Toxizität — das Risiko entsteht ausschließlich durch übermäßige Supplementierung.',
        monitoring:
          'Kalzium im Blut (bei stark erhöhten Werten), Nierenfunktion.',
      },
    ],
    low: [
      {
        title: 'Ursache und Ausgangssituation besprechen',
        category: 'standard',
        evidence: 'Klinisch etabliert — AWMF, DGE',
        whyShown:
          'Niedrige Vitamin-D-Werte sind in Deutschland häufig — besonders in den Wintermonaten. Hauptursachen sind geringe Sonnenexposition, dunkler Hauttyp und wenig Freiluftaufenthalt.',
        whatHelps:
          'Besprich mit deiner Ärztin oder deinem Arzt, ob Sonnenlichtexposition und Ernährungsgewohnheiten Verbesserungspotenzial bieten und ob eine Supplementierung sinnvoll ist.',
        expectedEffect:
          'Einordnung, ob und wie ein Mangel therapeutisch angegangen werden sollte.',
        cautions:
          'Nicht jeder niedrige Vitamin-D-Wert erfordert hochdosierte Supplementierung — eine ärztliche Einschätzung ist sinnvoll.',
        monitoring:
          'Kontrollmessung nach 3–6 Monaten bei laufender Supplementierung.',
      },
      {
        title: 'Supplementierung mit Arzt besprechen',
        category: 'standard',
        evidence: 'Klinisch etabliert — DGE Referenzwerte, AWMF',
        whyShown:
          'Bei nachgewiesenem Mangel ist eine Supplementierung in Leitlinien empfohlen. Dosierung, Dauer und Form sollten individuell festgelegt werden.',
        whatHelps:
          'Lass dich ärztlich beraten, ob eine Supplementierung sinnvoll ist — und in welcher Dosierung und Einnahmeform.',
        expectedEffect:
          'Anhebung des Vitamin-D-Spiegels in den gewünschten Zielbereich.',
        cautions:
          'Selbstständige Hochdosierung ohne ärztliche Kontrolle ist nicht empfohlen — Vitamin D ist fettlöslich und kann sich im Körper anreichern.',
        monitoring:
          'Kontrollmessung nach 3–6 Monaten.',
      },
      {
        title: 'Knochengesundheit im Kontext einordnen lassen',
        category: 'supporting',
        evidence: 'Klinisch relevant — AWMF Osteoporose-Leitlinie',
        whyShown:
          'Vitamin D ist wichtig für die Kalziumresorption und Knochengesundheit. Anhaltender Mangel erhöht das Risiko für Knochenschwund (Osteopenie/Osteoporose).',
        whatHelps:
          'Wenn niedriges Vitamin D mit weiteren Risikofaktoren zusammentrifft (hohes Alter, Immobilität, familiäre Osteoporose), kann eine umfassendere Knochengesundheits-Abklärung sinnvoll sein.',
        expectedEffect:
          'Früherkennung von Knochensubstanzverlust und ggf. gezielte Prävention möglich.',
        cautions: null,
        monitoring:
          'Kalzium, Phosphat, ggf. PTH (Parathormon).',
      },
    ],
  },

  // ─── CRP — LOINC 1988-5 ──────────────────────────────────────────────────
  '1988-5': {
    title: 'Was kann ich bei erhöhtem CRP besprechen?',
    intro:
      'CRP ist ein unspezifischer Entzündungsmarker — er zeigt, dass eine Entzündungsreaktion stattfindet, aber nicht wo oder warum. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Therapieempfehlung.',
    high: [
      {
        title: 'Akutsymptome und Verlauf ärztlich einordnen lassen',
        category: 'standard',
        evidence: 'Klinisch etabliert — breiter medizinischer Konsens',
        whyShown:
          'Ein erhöhtes CRP allein sagt noch nichts über Ursache oder Schwere einer Entzündung aus — der klinische Kontext (Symptome, Krankheitsverlauf) ist für die Einordnung entscheidend.',
        whatHelps:
          'Beschreibe deiner Ärztin oder deinem Arzt alle aktuellen oder zurückliegenden Symptome: Fieber, Schmerzen, Müdigkeit, lokale Entzündungszeichen.',
        expectedEffect:
          'Einordnung, ob eine akute Infektion, ein chronisch-entzündlicher Prozess oder ein anderer Auslöser vorliegt.',
        cautions:
          'Selbstbehandlung ohne ärztliche Diagnose ist bei unklarem CRP-Anstieg nicht empfohlen.',
        monitoring:
          'Blutbild (Leukozyten, Differentialblutbild), ggf. Procalcitonin bei Infektionsverdacht.',
      },
      {
        title: 'Entzündungsursache gezielt klären lassen',
        category: 'standard',
        evidence: 'Klinisch etabliert',
        whyShown:
          'CRP steigt bei sehr verschiedenen Ursachen an — von kurzfristigen Infektionen bis hin zu chronisch-entzündlichen Erkrankungen. Die Ursache bestimmt die notwendige Reaktion.',
        whatHelps:
          'Bitte um ergänzende Diagnostik, wenn die Ursache unklar ist: z. B. Differentialblutbild, Nierenparameter, Urinstatus oder Autoimmunmarker — je nach klinischem Verdacht.',
        expectedEffect:
          'Zielgerichtete Behandlung ist möglich, wenn die Ursache bekannt ist.',
        cautions: null,
        monitoring:
          'Verlaufskontrolle CRP nach 1–2 Wochen, um das Therapieansprechen einzuschätzen.',
      },
      {
        title: 'Verlaufskontrolle nach Behandlung besprechen',
        category: 'standard',
        evidence: 'Klinisch etabliert — Monitoring-Standard',
        whyShown:
          'CRP wird als Verlaufsmarker genutzt — ein Absinken unter Therapie zeigt das Ansprechen auf Antibiotika oder entzündungshemmende Medikamente an.',
        whatHelps:
          'Frage nach dem geplanten Kontroll-Zeitpunkt und welche Werte dann gemessen werden sollen.',
        expectedEffect:
          'Einordnung, ob die Therapie anschlägt oder eine Anpassung notwendig ist.',
        cautions: null,
        monitoring: null,
      },
      {
        title: 'Chronisch erhöhtes CRP als Risikofaktor einordnen lassen',
        category: 'supporting',
        evidence: 'Klinisch relevant — Forschungskonsens',
        whyShown:
          'Anhaltend leicht erhöhtes CRP (Low-Grade-Inflammation) wird in der Forschung mit erhöhtem kardiovaskulären Risiko assoziiert.',
        whatHelps:
          'Wenn CRP bei mehreren Messungen leicht erhöht ist ohne klare akute Ursache, besprich mit deiner Ärztin oder deinem Arzt, ob eine weiterführende Abklärung sinnvoll ist.',
        expectedEffect:
          'Ggf. frühere Erkennung eines kardiovaskulären oder chronisch-entzündlichen Risikos.',
        cautions:
          'Leicht erhöhtes CRP kann auch durch viele alltägliche Faktoren bedingt sein — z. B. eine kürzliche Infektion oder intensive körperliche Anstrengung.',
        monitoring: null,
      },
    ],
    low: [],
  },
}
