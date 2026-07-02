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

  // ─── LDL-Cholesterin — LOINC 2089-1 — B4-BUILD-02 (15-Felder-Schema) ─────
  '2089-1': {
    title: 'Was kann ich bei erhöhtem LDL besprechen?',
    intro:
      'LDL-Cholesterin wird immer im Zusammenhang mit dem gesamten Herz-Kreislauf-Risiko bewertet. Welcher Zielwert gilt, hängt vom individuellen Risikoprofil ab — 116 mg/dL ist kein universeller Optimalwert. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Therapieempfehlung.',
    high: [
      {
        title: 'Gesamtrisiko und persönlichen Zielwert einordnen',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: LDL erhöht — welcher Zielwert gilt, hängt vom individuellen Herz-Kreislauf-Risiko ab (ESC/EAS 2021)',
        targetGroup:
          'Alle Personen mit erhöhtem LDL — vor jeder Entscheidung über Maßnahmen',
        whatCouldHelp:
          'Besprich mit deiner Ärztin oder deinem Arzt alle relevanten Risikofaktoren: Blutdruck, Rauchen, Diabetes, Alter, familiäre Belastung und ggf. frühere Herz-Kreislauf-Ereignisse.',
        expectedBenefit:
          'Einordnung, welcher LDL-Zielwert individuell gilt (< 116, < 100, < 70 oder < 55 mg/dL je Risikogruppe) und ob eine Maßnahme zeitnah sinnvoll ist.',
        uncertaintyReason: null,
        risksAndCautions:
          'Ein einzelner erhöhter LDL-Wert ohne bekannte Vorerkrankungen erfordert nicht automatisch eine medikamentöse Therapie.',
        contraindicationsOrRedFlags: null,
        monitoring:
          'Vollständiges Lipidprofil (LDL, HDL, Triglyzeride, Non-HDL), Blutdruck, Nüchternblutzucker.',
        doctorDiscussion:
          '"Welcher LDL-Zielwert gilt für mein individuelles Risikoprofil?" / "Welche weiteren Risikofaktoren sollten wir prüfen?"',
        notToConfuseWith:
          '116 mg/dL ist kein universeller Optimalwert — er gilt nur bei niedrigem kardiovaskulären Risiko. Mittleres Risiko: < 100, hohes Risiko: < 70, sehr hohes Risiko: < 55 mg/dL.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'Leitlinie — ESC/EAS 2021 Dyslipidämien',
      },
      {
        title: 'Ballaststoffreiche Ernährung',
        measureCategory: 'lifestyle',
        evidenceMaturity: 'supported',
        evidenceType: 'meta_analysis',
        whyShown:
          'Gezeigt, weil: Lösliche Ballaststoffe binden Gallensäuren im Darm und verringern die LDL-Aufnahme — gut belegt durch Meta-Analysen',
        targetGroup:
          'Menschen mit mäßig erhöhtem LDL bei niedrigem bis mittlerem kardiovaskulären Risiko',
        whatCouldHelp:
          'Mindestens 25–30 g Ballaststoffe täglich: Hafer (Beta-Glucan), Hülsenfrüchte, Flohsamenschalen, Gemüse, Vollkorn. WHO- und DGE-Empfehlung.',
        expectedBenefit:
          'LDL-Senkung um durchschnittlich 5–8 % — messbar nach 6–12 Wochen konsequenter Ernährungsumstellung.',
        uncertaintyReason: null,
        risksAndCautions:
          'Ballaststoffzufuhr langsam steigern; bei Reizdarm oder empfindlichem Darm vorsichtig beginnen.',
        contraindicationsOrRedFlags: null,
        monitoring: 'LDL-Kontrolle nach 3 Monaten konsequenter Ernährungsumstellung.',
        doctorDiscussion:
          '"Welche Ernährungsanpassungen machen in meinem Fall Sinn?" / "Kann eine Ernährungsberatung sinnvoll sein?"',
        notToConfuseWith:
          'Nicht verwechseln mit fettarmer Ernährung — lösliche Ballaststoffe senken LDL deutlich effektiver als eine Reduktion der Gesamtfettmenge.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement:
          'Gut untersucht — Cochrane Review Soluble Dietary Fibre (McRorie 2017) + EFSA-Stellungnahme Beta-Glucan',
      },
      {
        title: 'Vollständiges Lipidprofil bestimmen lassen',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: LDL allein bildet das kardiovaskuläre Risiko nicht vollständig ab — HDL, Triglyzeride und Non-HDL-Cholesterin sind für eine vollständige Einordnung notwendig',
        targetGroup:
          'Alle Personen mit erhöhtem LDL, sofern noch kein vollständiges Lipidprofil vorliegt',
        whatCouldHelp:
          'Bitte darum, dass HDL, Triglyzeride, Non-HDL-Cholesterin und Gesamtcholesterin in die Blutuntersuchung einbezogen werden.',
        expectedBenefit:
          'Vollständigere Risikoabschätzung — Non-HDL-Cholesterin gilt laut ESC/EAS 2021 als besserer Risikomarker als LDL allein.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring:
          'Nüchternblut für vollständiges Lipidprofil; Nicht-nüchtern-Werte für Erstscreening geeignet.',
        doctorDiscussion:
          '"Können wir das vollständige Lipidprofil bestimmen?" / "Was ist mein Non-HDL-Cholesterin?"',
        notToConfuseWith: null,
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement: 'Etabliert — ESC/EAS 2021 Dyslipidämien §4',
      },
      {
        title: 'Lipidsenker als Gesprächspunkt vorbereiten',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Bei erhöhtem LDL mit relevantem kardiovaskulären Risiko sind Statine die Klasse-I-A-Empfehlung der ESC/EAS-Leitlinie — ärztliche Einordnung notwendig',
        targetGroup:
          'Menschen mit erhöhtem LDL und relevantem Herz-Kreislauf-Risiko — Risikoeinschätzung nur ärztlich möglich',
        whatCouldHelp:
          'Wenn ärztlich ein relevantes Risiko festgestellt wird: Frag nach dem für dich geeigneten Therapieansatz, dem erwarteten Nutzen und was bei Muskelbeschwerden zu tun ist.',
        expectedBenefit:
          'Statine senken LDL je nach Präparat und Dosierung um 30–50 %. Langfristig: reduziertes kardiovaskuläres Risiko laut ESC/EAS 2021.',
        uncertaintyReason: null,
        risksAndCautions:
          'Mögliche Muskelbeschwerden (Myopathie) — ärztliche Kontrolle von CK und Leberwerten initial empfohlen.',
        contraindicationsOrRedFlags:
          'Schwangerschaft, schwere Lebererkrankung: Statine kontraindiziert. Muskelschmerzen unter Statinen zeitnah ärztlich klären.',
        monitoring: 'LDL, CK und Leberwerte (GOT/GPT) nach 4–8 Wochen; langfristig jährlich.',
        doctorDiscussion:
          '"Was wäre ein realistisches LDL-Ziel für mein Risikoprofil?" / "Was tun bei Muskelbeschwerden?"',
        notToConfuseWith:
          'Statine sind kein Ersatz für Lebensstiländerungen — sie wirken additiv. Eine Entscheidung über Statine liegt ausschließlich bei Ärztin oder Arzt.',
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'Etabliert — ESC/EAS 2021 Dyslipidämien',
      },
      {
        title: 'Lösliche Ballaststoffe: Flohsamenschalen (Psyllium)',
        measureCategory: 'supportive',
        evidenceMaturity: 'supported',
        evidenceType: 'rct',
        whyShown:
          'Gezeigt, weil: Mehrere RCTs zeigen LDL-Senkung durch Psyllium (Flohsamenschalen) um 5–7 % — als Ergänzung zu Ernährungsmaßnahmen belegt',
        targetGroup:
          'Menschen mit mäßig erhöhtem LDL, die Ernährungsmaßnahmen ergänzen möchten; kein Ersatz für ärztliche Beurteilung bei hohem Risiko',
        whatCouldHelp:
          'Flohsamenschalen (Psyllium) können als ergänzende Maßnahme ärztlich oder ernährungsfachlich besprochen werden; Menge und Anwendung sollten individuell festgelegt werden.',
        expectedBenefit:
          'LDL-Senkung um ~5–7 % in mehreren RCTs; zusätzlich positiver Effekt auf Blutzucker und Darmgesundheit.',
        uncertaintyReason:
          'Kein aktiver Leitlinienstandard für Flohsamenschalen — gut belegte unterstützende Evidenz (mehrere RCTs), aber kein klinischer Konsens als Primärtherapie.',
        risksAndCautions:
          'Ausreichend Flüssigkeit trinken und bei empfindlichem Verdauungstrakt vorsichtig beginnen.',
        contraindicationsOrRedFlags:
          'Zeitversetzt zu Medikamenten einnehmen (mind. 30–60 Min. Abstand), da Psyllium die Aufnahme einiger Wirkstoffe verzögern kann.',
        monitoring: 'LDL-Kontrolle nach 6–12 Wochen bei regelmäßiger Anwendung.',
        doctorDiscussion:
          '"Kann Psyllium in meinem Fall sinnvoll sein?" / "Gibt es Wechselwirkungen mit meinen aktuellen Medikamenten?"',
        notToConfuseWith:
          'Nicht verwechseln mit unlöslichen Ballaststoffen (z. B. Weizenkleie) — diese haben keine vergleichbare LDL-senkende Wirkung. Kein Ersatz für Statine bei klinisch relevantem Risiko.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement:
          'Gut untersucht — Cochrane Review Soluble Dietary Fibre 2016 + EFSA Health Claim Psyllium',
      },
      {
        title: 'Pflanzensterole und -stanole',
        measureCategory: 'supportive',
        evidenceMaturity: 'supported',
        evidenceType: 'meta_analysis',
        whyShown:
          'Gezeigt, weil: Pflanzensterole/-stanole hemmen die Cholesterinaufnahme im Darm — EFSA-anerkannter Health Claim für definierte Tagesmengen',
        targetGroup:
          'Menschen mit erhöhtem LDL, die ergänzende Ernährungsmaßnahmen suchen; nicht bei Schwangerschaft oder Stillzeit ohne ärztliche Rücksprache',
        whatCouldHelp:
          'Pflanzensterole/-stanole sind in angereicherten Margarine- und Joghurtprodukten erhältlich; Einsatz und geeignete Menge sollten ärztlich oder ernährungsfachlich eingeordnet werden.',
        expectedBenefit:
          'LDL-Senkung in Meta-Analysen und EFSA Health Claim belegt; langfristige klinische Endpunkte bleiben weniger klar.',
        uncertaintyReason:
          'Langzeitdaten zur Reduktion kardiovaskulärer Ereignisse fehlen — Surrogatmarker (LDL) gut belegt, klinischer Endpunkt weniger klar.',
        risksAndCautions:
          'Produkte können kostspielig sein. Bei Phytosterolemie (seltene Erbkrankheit) kontraindiziert.',
        contraindicationsOrRedFlags:
          'Phytosterolemie: absolute Kontraindikation. Schwangerschaft und Stillzeit: ärztliche Rücksprache empfohlen.',
        monitoring: 'LDL-Kontrolle nach 6–8 Wochen bei regelmäßiger Anwendung.',
        doctorDiscussion:
          '"Sind Pflanzensterol-Produkte in meinem Fall sinnvoll?" / "Gibt es Hinweise auf Phytosterolemie in meiner Familie?"',
        notToConfuseWith:
          'Pflanzensterole senken LDL — reduzieren aber keine bereits vorhandenen Gefäßablagerungen. Kein Ersatz für Statine bei hohem Risiko.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement:
          'Gut untersucht — EFSA Health Claim Phytosterols 2010 + Meta-Analyse Demonty et al. 2009',
      },
      {
        title: 'Omega-3-Fettsäuren als LDL-Senker',
        measureCategory: 'avoid',
        evidenceMaturity: 'avoid',
        evidenceType: 'meta_analysis',
        whyShown:
          'Gezeigt, weil: Omega-3 wird häufig zur LDL-Senkung empfohlen — die Evidenz spricht nicht für einen relevanten LDL-senkenden Effekt in diesem Kontext',
        targetGroup:
          'Menschen, die Omega-3 zur Senkung des LDL-Cholesterins einsetzen möchten',
        whatCouldHelp:
          'Für LDL-Senkung nicht geeignet — kein relevanter Effekt belegt.',
        expectedBenefit:
          'Kein relevanter LDL-senkender Effekt in Meta-Analysen und Leitlinien für diesen Kontext.',
        uncertaintyReason: null,
        risksAndCautions:
          'Hochdosierte Omega-3-Präparate können das Blutungsrisiko erhöhen. Wechselwirkungen mit Blutgerinnungshemmern möglich.',
        contraindicationsOrRedFlags: null,
        monitoring: null,
        doctorDiscussion: null,
        notToConfuseWith:
          'Omega-3 hat gut belegte Effekte auf Triglyzeride und kann kardiovaskuläres Gesamtrisiko beeinflussen — aber LDL-Cholesterin nicht spezifisch senken. Wer Omega-3 für andere Indikationen einnimmt, muss dies nicht absetzen.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement:
          'Eher vermeiden (für LDL-Senkung) — REDUCE-IT Trial + ESC/EAS 2021 §6 + Cochrane Omega-3 Lipide 2020',
      },
      {
        title: 'Verlaufskontrolle: Lipidprofil',
        measureCategory: 'monitoring',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: ESC/EAS-Leitlinie 2021 empfiehlt regelmäßige Lipidprofil-Kontrollen bei bekannt erhöhtem LDL — nach Maßnahmen und unter Therapie',
        targetGroup:
          'Alle Personen mit bekannt erhöhtem LDL, insbesondere nach Lebensstilanpassungen oder unter Therapie',
        whatCouldHelp:
          'Verlaufskontrollen des Lipidprofils (LDL, HDL, Triglyzeride, Non-HDL) ermöglichen die Einschätzung von Lebensstilmaßnahmen und ggf. Therapieeffekten.',
        expectedBenefit:
          'Einordnung, ob Maßnahmen wirken — und ob eine Anpassung der Strategie sinnvoll ist.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring:
          'Lipidprofil nach 3–6 Monaten bei Lebensstilmaßnahmen; nach 4–8 Wochen bei Therapiestart oder -anpassung.',
        doctorDiscussion:
          '"Wann und wie oft sollte ich das Lipidprofil kontrollieren lassen?"',
        notToConfuseWith: null,
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement: 'Etabliert — ESC/EAS 2021 Dyslipidämien Monitoring-Empfehlungen',
      },
    ],
    low: [
      {
        title: 'Bestehende lipidsenkende Therapie einordnen lassen',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Sehr niedrige LDL-Werte entstehen häufig unter lipidsenkender Therapie — Zielwerterreichung ärztlich prüfen lassen',
        targetGroup: 'Personen, die lipidsenkende Medikamente (z. B. Statine, Ezetimib) einnehmen',
        whatCouldHelp:
          'Besprich mit deiner Ärztin oder deinem Arzt, ob Dosierung und Therapieziel noch passend sind.',
        expectedBenefit:
          'Einordnung, ob der Wert im angestrebten Zielbereich liegt oder eine Anpassung sinnvoll ist.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'LDL, CK und Leberwerte (GOT/GPT) bei laufender Statin-Therapie jährlich.',
        doctorDiscussion:
          '"Liegt mein LDL-Wert im angestrebten Zielbereich?" / "Sollte die Dosierung oder Therapie angepasst werden?"',
        notToConfuseWith: null,
        safetyLevel: 'low',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'Etabliert — ESC/EAS 2021 Dyslipidämien Monitoring',
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
          loincCode: '4548-4',
          title: 'Zielwert und Behandlungskonzept einordnen lassen',
          measureCategory: 'doctor_discussion',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: HbA1c-Wert liegt im Diagnose- oder Therapie-Monitoring-Bereich — individuelle Zielwert-Besprechung laut DDG/AWMF Leitlinie empfohlen',
          targetGroup:
            'Alle Personen mit HbA1c ≥ 5,7 % oder bekanntem Diabetes; besonders relevant wenn neu diagnostiziert oder Wert sich verändert',
          whatCouldHelp:
            'Der richtige Zielwert hängt von Alter, Komorbiditäten, Hypoglykämierisiko und Lebensqualitäts-Präferenzen ab — gemeinsam festlegen laut DDG-Leitlinie 2022',
          expectedBenefit: 'Individuell passendes Therapieziel — vermeidet sowohl Über- als auch Untertherapie',
          uncertaintyReason: null,
          risksAndCautions:
            'HbA1c allein reicht nicht zur Diagnose bei Hämoglobin-Varianten oder Anämie — in diesen Fällen Blutzucker-Direktmessung nötig',
          contraindicationsOrRedFlags: 'HbA1c > 10 %: zeitnahe medizinische Vorstellung dringend empfohlen',
          monitoring: 'HbA1c alle 3 Monate bei Anpassung, alle 6 Monate bei stabiler Einstellung (DDG 2022)',
          doctorDiscussion:
            '\'Was ist mein individuelles HbA1c-Ziel?\' / \'Wie verläuft mein Wert in den letzten Messungen?\' / \'Brauche ich eine Therapieanpassung?\'',
          notToConfuseWith: 'HbA1c ist kein Tagesblutezucker — er spiegelt den Durchschnittswert der letzten 2–3 Monate',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'DDG/AWMF Nationale Versorgungsleitlinie Typ-2-Diabetes 2022 — doi.org/10.6101/AZQ/000475',
        },
        {
          loincCode: '4548-4',
          title: 'Strukturierte körperliche Bewegung',
          measureCategory: 'lifestyle',
          evidenceMaturity: 'established',
          evidenceType: 'meta_analysis',
          whyShown:
            'Gezeigt, weil: Körperliche Aktivität senkt HbA1c nachweislich — Standardmaßnahme der DDG/AWMF-Leitlinie',
          targetGroup:
            'Menschen mit Typ-2-Diabetes oder Prädiabetes (HbA1c 5,7–6,4 %); besonders wirksam bei Übergewicht',
          whatCouldHelp:
            'Mindestens 150 Minuten moderate Ausdauerbelastung pro Woche (z. B. Gehen, Radfahren, Schwimmen) plus 2× Krafttraining pro Woche — gemäß DDG/ADA-Empfehlung',
          expectedBenefit:
            'HbA1c-Senkung um durchschnittlich 0,5–0,7 % in Meta-Analysen; messbar nach 12 Wochen bei konsequenter Umsetzung',
          uncertaintyReason: null,
          risksAndCautions:
            'Bei Insulintherapie: Hypoglykämierisiko nach Sport beachten — Blutzucker vor/nach Sport kontrollieren',
          contraindicationsOrRedFlags: 'Bekannte kardiovaskuläre Erkrankung oder Neuropathie: Belastungstest vor Sportbeginn empfohlen',
          monitoring:
            'HbA1c + Nüchternblutzucker nach 3 Monaten regelmäßiger Aktivität; Blutdruck parallel kontrollieren',
          doctorDiscussion:
            '\'Welche Sportform ist bei meinem Status sicher?\' / \'Muss ich bei Medikation etwas beachten?\'',
          notToConfuseWith: 'Kein Ersatz für Medikation bei manifest erhöhtem HbA1c — wirkt additiv zur Pharmakotherapie',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement:
            'DDG NVL Typ-2-Diabetes 2022 + Cochrane Review Aerobic Exercise T2DM (Umpierre et al., JAMA 2011)',
        },
        {
          loincCode: '4548-4',
          title: 'Kohlenhydratbewusste Ernährung',
          measureCategory: 'lifestyle',
          evidenceMaturity: 'supported',
          evidenceType: 'meta_analysis',
          whyShown:
            'Gezeigt, weil: Ernährungsqualität und Kohlenhydratlast beeinflussen HbA1c direkt — mehrere Meta-Analysen mit konsistentem Effekt',
          targetGroup:
            'Menschen mit Typ-2-Diabetes oder Prädiabetes; vor allem bei kohlenhydratreicher Ernährung im Alltag',
          whatCouldHelp:
            'Reduktion schnell verfügbarer Kohlenhydrate (Weißbrot, Süßgetränke, Weißreis) und Ersatz durch ballaststoffreiche Alternativen; Mediterrane Kost zeigt in RCTs konsistente HbA1c-Reduktion',
          expectedBenefit:
            'HbA1c-Senkung um 0,3–0,6 % bei konsequenter Ernährungsumstellung; Effekt nach 3–6 Monaten messbar',
          uncertaintyReason:
            'Optimale Kohlenhydratmenge und -qualität wird in Leitlinien unterschiedlich bewertet — individuelle Ernährungsberatung empfohlen',
          risksAndCautions:
            'Sehr niedrige Kohlenhydratzufuhr bei Insulintherapie: Hypoglykämierisiko — ärztliche Abstimmung nötig',
          contraindicationsOrRedFlags: null,
          monitoring: 'HbA1c nach 3 Monaten; Gewichtsverlauf als indirekter Marker',
          doctorDiscussion:
            '\'Macht eine Ernährungsberatung in meinem Fall Sinn?\' / \'Gibt es eine spezifische Diätempfehlung für meinen Wert?\'',
          notToConfuseWith:
            'Nicht verwechseln mit \'Diabetiker-Ernährung\' als starrem Regelwerk — gemeint ist Gesamtqualität der Ernährung, nicht Verbotslisten',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement: 'Schwingshackl et al. Cochrane 2018 (Mediterranean Diet T2DM) + DDG Ernährungsempfehlungen 2021',
        },
        {
          loincCode: '4548-4',
          title: 'Blutzucker-Verlaufsmessung und HbA1c-Kontrolle',
          measureCategory: 'monitoring',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: HbA1c erfordert regelmäßige Kontrolle zur Therapiebewertung — Messintervall laut DDG/AWMF Leitlinie definiert',
          targetGroup: 'Alle Personen mit bekanntem Diabetes oder Prädiabetes',
          whatCouldHelp:
            'HbA1c alle 3 Monate bei Therapieanpassung, alle 6 Monate bei stabiler Einstellung; Nüchternblutzucker ergänzend je nach Therapieform',
          expectedBenefit: 'Frühzeitige Erkennung von Therapieverlusten und Hypoglykämierisiken',
          uncertaintyReason: null,
          risksAndCautions: 'CGM-Systeme können HbA1c nicht ersetzen — ergänzend, nicht alternativ',
          contraindicationsOrRedFlags: null,
          monitoring: 'HbA1c + Nüchternblutzucker + ggf. Lipidprofil + Nierenwerte (eGFR) als Komorbiditäts-Screening',
          doctorDiscussion:
            '\'In welchem Abstand sollte ich meinen HbA1c kontrollieren lassen?\' / \'Brauche ich zusätzliche Blutzuckerselbstmessung?\'',
          notToConfuseWith: 'HbA1c misst Langzeitverlauf — Tagesmessungen (Glukometer, CGM) liefern andere Information',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement: 'DDG NVL Typ-2-Diabetes 2022, Kapitel Monitoring',
        },
        {
          loincCode: '4548-4',
          title: 'Gewichtsreduktion bei Übergewicht',
          measureCategory: 'lifestyle',
          evidenceMaturity: 'established',
          evidenceType: 'meta_analysis',
          whyShown:
            'Gezeigt, weil: Übergewicht ist zentraler Risikofaktor für erhöhten HbA1c — Gewichtsreduktion senkt HbA1c nachweislich bei Typ-2-Diabetes',
          targetGroup:
            'Personen mit HbA1c-Erhöhung und gleichzeitigem BMI ≥ 25 — wirksamstes Lifestyle-Instrument in dieser Gruppe',
          whatCouldHelp:
            'Strukturiertes, alltagstaugliches Gewichtsmanagement mit Ernährungsanpassung und körperlicher Aktivität; Ziele und Vorgehen sollten individuell und nachhaltig geplant werden.',
          expectedBenefit:
            '5 % Gewichtsverlust reduziert HbA1c um ~0,5–1,0 % in Meta-Analysen; größere Reduktion (≥10 %) kann zu Teilremission führen',
          uncertaintyReason: 'Langzeit-Gewichtserhalt nach intensiven Programmen schwierig — Rückfallrisiko in Studien hoch',
          risksAndCautions:
            'Sehr niedrige Kalorienzufuhr nur unter ärztlicher Aufsicht; bei Insulintherapie: Hypoglykämierisiko bei Gewichtsabnahme.',
          contraindicationsOrRedFlags: 'Essstörungsanamnese — keine Kalorienreduktionsprogramme ohne psychologische Unterstützung',
          monitoring: 'Gewicht monatlich + HbA1c alle 3 Monate',
          doctorDiscussion:
            '\'Wie viel Gewichtsreduktion ist für meinen HbA1c realistisch?\' / \'Gibt es ein strukturiertes Programm das ich nutzen kann?\'',
          notToConfuseWith: 'Nicht verwechseln mit kurzfristiger Diät — Effekt hängt vom nachhaltigen Gewichtserhalt ab',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'Look AHEAD Trial (NEJM 2013) + ADA Standards of Medical Care 2024',
        },
        {
          loincCode: '4548-4',
          title: 'Schlafqualität und zirkadiane Rhythmik',
          measureCategory: 'promising',
          evidenceMaturity: 'promising',
          evidenceType: 'cohort_study',
          whyShown:
            'Gezeigt, weil: Schlechter Schlaf ist mit erhöhtem HbA1c assoziiert — mehrere Kohortenstudien, mechanistisch plausibel (Kortisol/Insulinresistenz)',
          targetGroup:
            'Personen mit bekannten Schlafproblemen und gleichzeitig erhöhtem HbA1c — keine isolierte Maßnahme, sondern im Kontext',
          whatCouldHelp:
            'Regelmäßiger Schlafrhythmus (7–8h), Vermeidung von Blaulicht und schwerem Essen vor dem Schlafen; Schlafapnoe abklären lassen wenn Schnarchen/Tagesmüdigkeit',
          expectedBenefit:
            'Verbesserter Schlaf kann Insulinsensitivität verbessern — Effektstärke auf HbA1c noch nicht ausreichend belegt',
          uncertaintyReason:
            'Kausalität unklar — ob Schlafverbesserung direkt HbA1c senkt ist nicht durch RCTs belegt; könnte Confounder (Lebensstil) sein',
          risksAndCautions: null,
          contraindicationsOrRedFlags: null,
          monitoring:
            'Subjektive Schlafqualität (Schlaftagebuch oder App); ggf. Polysomnographie bei Verdacht auf Schlafapnoe',
          doctorDiscussion:
            '\'Sollte ich auf Schlafapnoe untersucht werden?\' / \'Kann schlechter Schlaf meinen HbA1c beeinflussen?\'',
          notToConfuseWith:
            'Nicht als Alternative zu Ernährung und Bewegung kommunizieren — ergänzender Ansatz im Gesamtkontext',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement: 'Reutrakul & Van Cauter, Diabetes Care 2018 (Review) + NHANES Kohortendaten',
        },
    ],
    low: [],
  },

  '2276-4': {
    title: 'Was kann ich bei auffälligem Ferritin besprechen?',
    intro:
      'Ferritin ist ein Eisenspeicherprotein, das auch bei Entzündungen ansteigt. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Therapieempfehlung.',
    high: [
{
          loincCode: '2276-4',
          title: 'Erhöhtes Ferritin: Ursachen abklären lassen',
          measureCategory: 'doctor_discussion',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Ferritin über 300 µg/L (Männer) / 200 µg/L (Frauen) kann auf Hämochromatose, akute Entzündung oder Fettlebererkrankung hinweisen',
          targetGroup:
            'Personen mit deutlich erhöhtem Ferritin — besonders relevant bei gleichzeitig normalen oder niedrigen Transferrin-Werten',
          whatCouldHelp:
            'Differenzierung: Ferritin als Akutphasenprotein (Entzündung) vs. Eisenüberladung (Hämochromatose) vs. Lebererkrankung. CRP + Transferrinsättigung + Leberwerte helfen einzuordnen.',
          expectedBenefit:
            'Klärung ob Eisenüberladung, Entzündungsreaktion oder Leberproblem vorliegt — grundlegend unterschiedliche Therapien',
          uncertaintyReason: null,
          risksAndCautions:
            'Erhöhter Ferritin bei Hämochromatose und gleichzeitiger Eisensupplementierung: Organschäden (Leber, Herz, Pankreas) möglich',
          contraindicationsOrRedFlags:
            'Ferritin > 1000 µg/L: zeitnahe Abklärung dringend erforderlich. Absolute Kontraindikation: kein Eisen supplementieren bei erhöhtem Ferritin ohne Diagnose.',
          monitoring: 'Transferrinsättigung + Leberwerte (GOT, GPT, GGT) + CRP + ggf. HFE-Gentest',
          doctorDiscussion:
            '\'Warum ist mein Ferritin erhöht?\' / \'Sollte ich auf Hämochromatose getestet werden?\' / \'Ist meine Leber betroffen?\'',
          notToConfuseWith:
            'Erhöhtes Ferritin bedeutet nicht automatisch zu viel Eisen — Entzündungen können Ferritin stark erhöhen ohne echte Eisenüberladung',
          safetyLevel: 'high',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'AWMF-Leitlinie Hämochromatose 040-017 + EASL-Guideline Genetic Liver Diseases 2022',
        }
    ],
    low: [
{
          loincCode: '2276-4',
          title: 'Ursache klären — vor jeder Supplementierung',
          measureCategory: 'doctor_discussion',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Ferritin unter 30 µg/L — Ursachenklärung ist laut AWMF-Leitlinie Eisenmangel (021-025) zwingend vor jeder Supplementierung',
          targetGroup: 'Alle Personen mit niedrigem Ferritin — unabhängig ob mit oder ohne Symptome',
          whatCouldHelp:
            'Ursachen können sein: Ernährungsmangel, okkulter Blutverlust (GI-Trakt, Gynäkologie), Resorptionsproblem (Zöliakie, Gastritis), erhöhter Bedarf (Schwangerschaft, Leistungssport). Diagnose entscheidet über Therapieweg.',
          expectedBenefit: 'Gezielte Therapie verhindert Maskierung einer ernsthaften Grunderkrankung',
          uncertaintyReason: null,
          risksAndCautions:
            'Eisensupplementierung ohne Diagnose kann bei unerkannter Hämochromatose oder Polyzythämie gefährlich sein',
          contraindicationsOrRedFlags:
            'Ferritin < 12 µg/L oder Hämoglobin erniedrigt oder schwere Symptome (Herzrasen, Kurzatmigkeit): zeitnahe ärztliche Vorstellung dringend',
          monitoring: 'Blutbild + Ferritin + Transferrinsättigung + CRP (Entzündungsausschluss) + ggf. Retikulozyten',
          doctorDiscussion:
            '\'Was könnte der Grund für meinen niedrigen Ferritin sein?\' / \'Brauche ich eine GI-Abklärung?\' / \'Orale Supplementierung oder Infusion?\'',
          notToConfuseWith:
            'Ferritin ist kein direktes Maß für Hämoglobin — Eisenmangel-Anämie ist ein Folgezustand, kein Synonym für niedrigen Ferritin',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'AWMF-Leitlinie Eisenmangel und Eisenmangelanämie 021-025 (2023)',
        },
{
          loincCode: '2276-4',
          title: 'Eisenreiche Ernährung optimieren',
          measureCategory: 'lifestyle',
          evidenceMaturity: 'supported',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Ernährungsbedingte Eisenzufuhr ist erster Ansatz bei leichtem Ferritin-Mangel ohne Blutungsverdacht',
          targetGroup:
            'Leichter Mangel (Ferritin 12–30 µg/L) ohne schwere Symptome, kein Blutungsverdacht, vegetarische/vegane Ernährung als mögliche Ursache',
          whatCouldHelp:
            'Häm-Eisen (Fleisch, Fisch) hat 3-fach höhere Bioverfügbarkeit als Nicht-Häm-Eisen (Hülsenfrüchte, Spinat, Tofu). Vitamin-C-reiche Lebensmittel gleichzeitig erhöhen Nicht-Häm-Eisenaufnahme.',
          expectedBenefit:
            'Ferritin-Anstieg um 10–20 µg/L bei konsequenter Anpassung nach 8–12 Wochen — nur bei ernährungsbedingtem Mangel',
          uncertaintyReason: 'Ernährungsanpassung allein reicht bei schwerem Mangel oder Resorptionsproblem nicht aus',
          risksAndCautions:
            'Kaffee, schwarzer Tee, Kalzium und Polyphenole hemmen Eisenresorption — zeitversetzt konsumieren (mind. 1h Abstand)',
          contraindicationsOrRedFlags: null,
          monitoring: 'Ferritin + Transferrinsättigung nach 3 Monaten konsequenter Ernährungsumstellung',
          doctorDiscussion:
            '\'Kann ich meinen Bedarf über Ernährung decken oder brauche ich Supplements?\' / \'Wie hoch ist mein täglicher Eisenbedarf?\'',
          notToConfuseWith:
            'Spinat enthält zwar Eisen, aber auch Oxalat, das die Aufnahme hemmt — kein idealer Eisenlieferant',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement: 'DGE-Empfehlungen Eisen 2021 + AWMF-Leitlinie Eisenmangel 021-025',
        },
{
          loincCode: '2276-4',
          title: 'Orale Eisensupplementierung (nach ärztlicher Diagnose)',
          measureCategory: 'standard',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Orale Eisentherapie ist Standardbehandlung bei ernährungsbedingtem oder leichtem Eisenmangel — nach Ausschluss von Kontraindikationen',
          targetGroup:
            'Personen mit diagnostiziertem Eisenmangel (nicht nur Ferritin-Mangel), keine Hämochromatose, kein schwerer Blutverlust der sofortige Infusion erfordert',
          whatCouldHelp:
            'Orale Eisenpräparate können nach ärztlicher Diagnose besprochen werden; Präparat, Form, Menge und Dauer legt die Ärztin oder der Arzt fest.',
          expectedBenefit:
            'Ferritin-Normalisierung nach 3–6 Monaten bei oraler Therapie; Hämoglobin-Anstieg nach 4–8 Wochen messbar',
          uncertaintyReason: null,
          risksAndCautions:
            'Häufige Nebenwirkungen: Übelkeit, Verstopfung, dunkler Stuhl. Nicht zusammen mit Kaffee, Tee, Milchprodukten, Antazida einnehmen.',
          contraindicationsOrRedFlags:
            'Hämochromatose: absolute Kontraindikation. Chronisch entzündliche Erkrankungen (CED, RA): orale Therapie oft weniger wirksam — parenterale Alternative besprechen.',
          monitoring: 'Ferritin + Hämoglobin + Transferrinsättigung nach 4 Wochen und nach Abschluss der Therapie',
          doctorDiscussion:
            '\'Welches Eisenpräparat ist für mich am besten verträglich?\' / \'Wie lange muss ich supplementieren?\' / \'Wann ist eine Infusion besser?\'',
          notToConfuseWith:
            'Orales Eisen ist nicht für alle Ursachen ausreichend — bei starkem Blutverlust oder Resorptionsproblem ist intravenöses Eisen nötig',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'AWMF-Leitlinie Eisenmangel 021-025 (2023) + Cochrane Review Oral Iron Supplementation (2022)',
        },
{
          loincCode: '2276-4',
          title: 'Intravenöse Eisengabe bei Resorptionsproblem',
          measureCategory: 'standard',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Bestimmte Patientengruppen sprechen auf orale Eisentherapie nicht ausreichend an — parenterale Therapie laut Leitlinie in diesen Fällen Standard',
          targetGroup:
            'Personen mit CED (Morbus Crohn, Colitis ulcerosa), nach bariatrischer OP, schwangere Frauen mit schwerem Mangel, Dialysepatienten, Herzinsuffizienz-Patienten',
          whatCouldHelp:
            'Intravenöse Eisenpräparate (z. B. Eisencarboxymaltose) umgehen Resorptionsproblem und korrigieren Ferritin schneller als orale Therapie',
          expectedBenefit:
            'Ferritin-Normalisierung innerhalb von 2–4 Wochen bei i.v. Therapie — deutlich schneller als oral',
          uncertaintyReason: null,
          risksAndCautions:
            'Infusionsreaktionen möglich (selten aber ernst) — nur unter medizinischer Aufsicht; erstes Mal immer mit Überwachungszeit',
          contraindicationsOrRedFlags:
            'Erste Trimester Schwangerschaft: i.v. Eisen nur bei absolutem Bedarf; bakterielle Infekte aktiv: kein i.v. Eisen',
          monitoring: 'Ferritin + Hämoglobin 4 Wochen nach Infusion',
          doctorDiscussion:
            '\'Ist eine Infusion in meinem Fall sinnvoller als Tabletten?\' / \'Welches Präparat ist geeignet und wie wird es überwacht?\'',
          notToConfuseWith:
            'i.v. Eisen ist keine Lifestyle-Maßnahme sondern medizinische Therapie — nicht selbst initiierbar',
          safetyLevel: 'high',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'AWMF-Leitlinie Eisenmangel 021-025 (2023) + ECCO-Guideline CED-Eisenmangel',
        },
{
          loincCode: '2276-4',
          title: 'Verlaufskontrolle nach Eisentherapie',
          measureCategory: 'monitoring',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Ferritin und Hämoglobin müssen nach Therapiebeginn kontrolliert werden — Therapieerfolg und Überdosierungsrisiko prüfen',
          targetGroup: 'Alle Personen in Eisentherapie (oral oder i.v.)',
          whatCouldHelp:
            'Blutbild + Ferritin + Transferrinsättigung: 4 Wochen nach Therapiebeginn; nach Abschluss nochmals zur Therapie-Validierung',
          expectedBenefit: 'Therapieerfolg sichern und Übertherapie (Ferritin > 300 µg/L) verhindern',
          uncertaintyReason: null,
          risksAndCautions:
            'Ferritin als Akutphasenprotein: bei Infekten kurzfristig erhöht — Kontrollmessung nicht während akuter Erkrankung',
          contraindicationsOrRedFlags: null,
          monitoring: 'Ferritin + Hämoglobin + Transferrinsättigung: 4 Wochen nach Therapiebeginn, dann nach Abschluss',
          doctorDiscussion:
            '\'Wann sollte ich meinen Ferritin-Wert wieder kontrollieren?\' / \'Wann kann ich die Supplementierung beenden?\'',
          notToConfuseWith: null,
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement: 'AWMF-Leitlinie Eisenmangel 021-025 (2023)',
        }
    ],
  },

  '14635-7': {
    title: 'Was kann ich bei auffälligem Vitamin-D-Spiegel besprechen?',
    intro:
      'Vitamin D 25-OH ist der wichtigste Labormarker für den Vitamin-D-Versorgungsstatus. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Supplementierungsempfehlung.',
    high: [
{
          loincCode: '14635-7',
          title: 'Sehr hohe Vitamin-D-Werte ärztlich einordnen lassen',
          measureCategory: 'doctor_discussion',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Sehr hohe 25-OH-Vitamin-D-Werte meist durch Supplementierung entstehen und wegen Hyperkalzämie-Risiko ärztlich eingeordnet werden sollten',
          targetGroup: 'Personen mit sehr hohen 25-OH-Vitamin-D-Werten oder laufender hochdosierter Supplementierung',
          whatCouldHelp:
            'Aktuelle Präparate, Einnahmedauer und Begleitwerte ärztlich prüfen lassen; eigenständige weitere Einnahme bei Verdacht auf Überversorgung nicht fortsetzen, bis die Einordnung erfolgt ist.',
          expectedBenefit: 'Reduktion des Risikos für Überversorgung, Hyperkalzämie und Folgeprobleme durch kontrollierte Anpassung.',
          uncertaintyReason: null,
          risksAndCautions:
            'Vitamin D ist fettlöslich: Überversorgung kann zu erhöhten Kalziumwerten führen. Symptome wie Übelkeit, Schwäche, starker Durst oder Nierensteinbeschwerden ärztlich abklären.',
          contraindicationsOrRedFlags:
            'Hyperkalzämie, Nierensteine, schwere Nierenerkrankung, Sarkoidose oder primärer Hyperparathyreoidismus: Supplementierung nur fachärztlich einordnen.',
          monitoring: '25-OH-Vitamin-D, Kalzium, Phosphat und Nierenfunktion; Verlauf nach ärztlicher Festlegung.',
          doctorDiscussion: '\'Ist mein Wert zu hoch?\' / \'Soll ich meine Supplementierung pausieren?\' / \'Welche Begleitwerte sollten geprüft werden?\'',
          notToConfuseWith:
            'Vitamin D2 (Ergocalciferol) ist in Studien weniger effektiv als D3 (Cholecalciferol) — D3 bevorzugt',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'Endocrine Society Clinical Practice Guideline Vitamin D 2024 + DGE-Stellungnahme Vitamin D',
        }
    ],
    low: [
{
          loincCode: '14635-7',
          title: 'Sonnenlicht und UV-B-Exposition',
          measureCategory: 'lifestyle',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Über 90 % der körpereigenen Vitamin-D-Synthese erfolgt über UV-B-Bestrahlung der Haut',
          targetGroup:
            'Alle Personen mit Vitamin-D-Mangel; besonders in Herbst/Winter (Oktober–April in Deutschland: keine ausreichende UV-B-Intensität)',
          whatCouldHelp:
            'Sommer (April–September): 10–30 Min. direkte Sonneneinstrahlung auf Arme/Beine zwischen 11–15 Uhr ausreichend für Tagesbedarf. Winter: Sonnenlicht nicht ausreichend in Deutschland.',
          expectedBenefit: 'Ausreichende körpereigene Synthese im Sommer möglich — reduziert Supplementierungsbedarf',
          uncertaintyReason: null,
          risksAndCautions:
            'Sonnenbrennschutz ab SPF 15 reduziert Vitamin-D-Synthese um ~95 % — Abwägung mit Hautkrebs-Prävention notwendig',
          contraindicationsOrRedFlags:
            'Dunkle Hautfarbe, hohes Alter, Adipositas: Syntheserate reduziert — Supplementierung auch im Sommer notwendig prüfen',
          monitoring: '25-OH-Vitamin-D im Herbst kontrollieren (nach Sommerperiode: Spiegel in der Regel am höchsten)',
          doctorDiscussion: '\'Kann ich meinen Bedarf im Sommer über Sonne decken?\'',
          notToConfuseWith: 'Solarium ist kein Vitamin-D-Ersatz — erhöht Hautkrebs-Risiko ohne sicheren Vitamin-D-Nutzen',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'RKI Vitamin D 2020 + DGE-Stellungnahme Vitamin D 2020',
        },
{
          loincCode: '14635-7',
          title: 'Vitamin D3-Supplementierung',
          measureCategory: 'supportive',
          evidenceMaturity: 'supported',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Vitamin-D-Supplementierung bei nachgewiesenem Mangel leitlinienbasiert ärztlich eingeordnet werden kann',
          targetGroup:
            'Personen mit nachgewiesenem 25-OH-Vitamin-D-Mangel (< 50 nmol/L); besonders relevant für ältere Erwachsene, dunkle Hautfarbe, begrenzte Sonnenexposition',
          whatCouldHelp:
            'Vitamin D3 (Cholecalciferol) kann bei nachgewiesenem Mangel ärztlich besprochen werden; Form, Dauer und Menge richten sich nach Ausgangswert, Risikoprofil und Begleitwerten.',
          expectedBenefit:
            'Normalisierung 25-OH-Vitamin-D-Spiegel nach 3 Monaten; nachgewiesener Effekt auf Knochen- und Muskelgesundheit, Sturzprävention bei Älteren',
          uncertaintyReason:
            'Nicht-Knochen-Effekte (Immunsystem, Krebs, Herzerkrankungen, Depression) werden intensiv diskutiert — aktuelle Meta-Analysen zeigen keine konsistente Reduktion von Krebsinzidenz oder kardiovaskulärem Risiko',
          risksAndCautions:
            'Vitamin D ist fettlöslich: Überversorgung möglich. Hochdosierte Einnahme nur nach ärztlicher Festlegung und Kontrolle. Warnzeichen einer Überversorgung ärztlich abklären.',
          contraindicationsOrRedFlags: 'Sarkoidose, Hyperkalzämie, schwere Nierenerkrankung: kontraindiziert ohne Facharzt',
          monitoring: '25-OH-Vitamin-D nach 3 Monaten; bei Hochdosis: Kalzium + Phosphat',
          doctorDiscussion: '\'Brauche ich auch Kalzium?\'',
          notToConfuseWith:
            'Vitamin D aus Nahrungsmitteln allein (Fisch, Eier) reicht selten für Mangel-Korrektur — Supplementierung ergänzend',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'Endocrine Society Guideline Vitamin D 2024 + DGE-Stellungnahme Vitamin D 2020',
        },
{
          loincCode: '14635-7',
          title: 'Kalzium-Zufuhr bei Knochen-Indikation',
          measureCategory: 'supportive',
          evidenceMaturity: 'supported',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Vitamin D ohne ausreichend Kalzium kann Knochen-Wirkung nicht vollständig entfalten — kombinierte Indikation bei Osteoporose-Risiko',
          targetGroup:
            'Personen mit Vitamin-D-Mangel und gleichzeitigem Osteoporose-Risiko (Postmenopause, > 70 Jahre, Steroid-Langzeittherapie)',
          whatCouldHelp:
            'Kalziumzufuhr bevorzugt über Ernährung (Milchprodukte, Hülsenfrüchte, Brokkoli); Supplementierung nur besprechen, wenn die Ernährungszufuhr nicht ausreicht.',
          expectedBenefit:
            'Kombiniert mit Vitamin D: Sturzrate und Frakturrisiko bei Älteren reduziert (NNT ~67 für Hüftfrakturen)',
          uncertaintyReason:
            'Kalziumsupplementierung ohne Mangel-Indikation umstritten wegen möglichem Kardiovaskulärem Risiko — nur bei nachgewiesenem Bedarf',
          risksAndCautions:
            'Kalzium-Supplementierung kann Nierensteine begünstigen; mögliche kardiovaskuläre Risiken werden diskutiert. Nur bei nachgewiesenem Bedarf einordnen lassen.',
          contraindicationsOrRedFlags: 'Hyperkalzämie, Kalziumsteine in der Anamnese: Supplementierung kontraindiziert',
          monitoring: 'Kalzium im Serum + Parathormon (PTH) + Kreatinin bei Supplementierung',
          doctorDiscussion: '\'Brauche ich Kalzium zusätzlich zu Vitamin D?\' / \'Habe ich Osteoporose-Risiko?\'',
          notToConfuseWith:
            'Kalzium-Supplementierung allein ohne Vitamin D hat schwächeren Effekt auf Knochen — Kombination leitlinienbasiert',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'DVO-Leitlinie Osteoporose 2023 + Cochrane Review Calcium + Vitamin D 2022',
        },
{
          loincCode: '14635-7',
          title: 'Immunsystem, Krebs, Herzerkrankung: was die Forschung zeigt',
          measureCategory: 'promising',
          evidenceMaturity: 'uncertain',
          evidenceType: 'meta_analysis',
          whyShown:
            'Gezeigt, weil: Vitamin D wird häufig für viele Wirkungen beworben — einige davon sind gut belegt, andere nicht',
          targetGroup:
            'Personen die Vitamin D primär wegen Immunschutz, Krebsprävention oder Herzgesundheit supplementieren',
          whatCouldHelp:
            'Was belegt ist: Knochen, Muskelgesundheit, Sturzprävention bei Älteren. Was nicht konsistent belegt ist: Krebsincidenz, kardiovaskuläre Ereignisse, Infektionsprävention, Depression.',
          expectedBenefit:
            'Für Knochen-/Muskelgesundheit: klarer Nutzen. Für Nicht-Knochen-Effekte: keine konsistente Wirkung in großen RCTs (VITAL-Studie, D-HEALTH).',
          uncertaintyReason:
            'Große RCTs (VITAL 2019, D-HEALTH 2022) zeigen keinen konsistenten Effekt von Vitamin-D-Supplementierung auf Krebsinzidenz, kardiovaskuläre Ereignisse oder Gesamtmortalität bei Personen ohne definiertem Mangel',
          risksAndCautions: null,
          contraindicationsOrRedFlags: null,
          monitoring: null,
          doctorDiscussion: '\'Sollte ich Vitamin D primär wegen [Immunsystem / Krebs] nehmen?\'',
          notToConfuseWith:
            'Assoziation (niedrige Vitamin-D-Spiegel bei Erkrankten) ≠ Kausalität (Supplementierung schützt). Vitamin-D-Mangel kann Begleitzustand sein, nicht Ursache.',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement:
            'VITAL Study (Manson et al., NEJM 2019) + D-HEALTH Trial (Scragg et al., Lancet Diabetes Endocrinol 2022)',
        },
{
          loincCode: '14635-7',
          title: 'Verlaufskontrolle 25-OH-Vitamin-D',
          measureCategory: 'monitoring',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown: 'Gezeigt, weil: Vitamin D ist fettlöslich — Verlaufskontrolle verhindert Über- und Untertherapie',
          targetGroup: 'Alle Personen in Vitamin-D-Supplementierung',
          whatCouldHelp:
            '25-OH-Vitamin-D-Kontrolle nach 3 Monaten Supplementierung; Zielwert > 50 nmol/L (75 nmol/L bei Osteoporose-Indikation)',
          expectedBenefit:
            'Sicherstellen dass Zielwert erreicht und Toxizitätswerte (> 250 nmol/L) nicht überschritten werden',
          uncertaintyReason: null,
          risksAndCautions: 'Aktive Form (1,25-OH) ist für Monitoring ungeeignet — immer 25-OH-Vitamin-D messen',
          contraindicationsOrRedFlags: null,
          monitoring: '25-OH-Vitamin-D nach 3 Monaten; Kalzium + Phosphat bei Hochdosierung',
          doctorDiscussion: '\'Wann muss ich meinen Wert kontrollieren lassen?\' / \'Bin ich im Zielbereich?\'',
          notToConfuseWith:
            '1,25-OH-Vitamin-D (aktive Form) ist ein anderer Laborwert — für Supplementierungs-Monitoring nicht geeignet',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement: 'Endocrine Society Guideline Vitamin D 2024',
        }
    ],
  },

  '1988-5': {
    title: 'Was kann ich bei erhöhtem CRP besprechen?',
    intro:
      'CRP ist ein unspezifischer Entzündungsmarker — er zeigt, dass eine Entzündungsreaktion stattfindet, aber nicht wo oder warum. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Therapieempfehlung.',
    high: [
        {
          loincCode: '1988-5',
          title: 'CRP einordnen — Ursache klären',
          measureCategory: 'doctor_discussion',
          evidenceMaturity: 'established',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Erhöhter CRP-Wert ist kein Diagnose-Marker sondern Hinweis auf Entzündungsprozess — Ursache muss klinisch eingeordnet werden',
          targetGroup: 'Alle Personen mit erhöhtem CRP (> 5 mg/L) — unabhängig ob leicht oder stark erhöht',
          whatCouldHelp:
            'Kontextualisierung: akute Infektion (häufigste Ursache, CRP > 100 mg/L typisch bei bakteriell), chronische Entzündung (CRP 10–50 mg/L), metabolisches Syndrom (CRP 2–10 mg/L — hsCRP), Autoimmunerkrankung. Klinisches Bild entscheidend.',
          expectedBenefit: 'Gezielte Diagnostik statt blinder Therapie',
          uncertaintyReason: null,
          risksAndCautions: null,
          contraindicationsOrRedFlags:
            'CRP > 100 mg/L: zeitnahe medizinische Abklärung, mögliche bakterielle Infektion. CRP > 300 mg/L: notfallmäßige Abklärung.',
          monitoring:
            'Verlaufs-CRP (24–72h) bei akuter Infektion zur Therapiebewertung; hsCRP bei kardiovaskulärem Risiko-Screening',
          doctorDiscussion:
            '\'Warum ist mein CRP erhöht?\' / \'Brauche ich eine Infektionssuche?\' / \'Was bedeutet das für mein kardiovaskuläres Risiko?\'',
          notToConfuseWith:
            'CRP misst Entzündung — nicht welche Erkrankung vorliegt. Hohes CRP bedeutet nicht automatisch Autoimmunerkrankung oder Krebs.',
          safetyLevel: 'medium',
          requiresDoctorDiscussion: true,
          sourceRequirement: 'AWMF-Leitlinie Sepsis-Diagnostik + ESC-Guideline Cardiovascular Risk (hsCRP)',
        },
        {
          loincCode: '1988-5',
          title: 'Chronische low-grade-Entzündung: Lebensstil-Ansätze',
          measureCategory: 'lifestyle',
          evidenceMaturity: 'supported',
          evidenceType: 'meta_analysis',
          whyShown:
            'Gezeigt, weil: Leicht chronisch erhöhter CRP (2–10 mg/L) ohne akuten Infekt ist häufig mit Übergewicht, Bewegungsmangel und Ernährungsqualität assoziiert',
          targetGroup:
            'Personen mit persistierend leicht erhöhtem CRP (2–10 mg/L), kein akuter Infekt, keine bekannte Autoimmunerkrankung',
          whatCouldHelp:
            'Kombiniert wirksam: Anti-inflammatorische Ernährung (Mittelmeer-Muster), regelmäßige moderate Bewegung, Gewichtsreduktion bei Übergewicht, Rauchstopp',
          expectedBenefit:
            'hsCRP-Senkung um 20–40 % bei konsequenten Lebensstilmaßnahmen über 3–6 Monate in Interventionsstudien',
          uncertaintyReason: 'Unklar ob CRP-Senkung direkt kardiovaskuläres Outcome verbessert oder nur Marker ist',
          risksAndCautions: null,
          contraindicationsOrRedFlags: null,
          monitoring: 'hsCRP (hochsensitives CRP) nach 3–6 Monaten Lebensstilintervention',
          doctorDiscussion:
            '\'Ist mein erhöhter CRP auf Lebensstil zurückzuführen?\' / \'Sollte ich ein kardiovaskuläres Risiko-Screening machen?\'',
          notToConfuseWith:
            'Leicht erhöhtes CRP ohne Symptome ist ein Risikosignal, keine Erkrankung. Anti-inflammatorische Maßnahmen ergänzen, ersetzen nicht medizinische Abklärung.',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement: 'Ridker et al. NEJM 2008 (JUPITER Trial) + Cochrane Review Mediterranean Diet Inflammation 2022',
        },
        {
          loincCode: '1988-5',
          title: 'Anti-inflammatorische Ernährung (Mittelmeer-Muster)',
          measureCategory: 'lifestyle',
          evidenceMaturity: 'supported',
          evidenceType: 'meta_analysis',
          whyShown:
            'Gezeigt, weil: Ernährungsqualität beeinflusst hsCRP nachweislich — Mittelmeer-Ernährung am besten belegt',
          targetGroup:
            'Personen mit chronisch erhöhtem hsCRP (> 2 mg/L) ohne akuten Infekt; besonders relevant bei kardiovaskulärem Risikoprofil',
          whatCouldHelp:
            'Mittelmeer-Muster: Olivenöl, Fisch (2× wöchentlich), Hülsenfrüchte, Nüsse, Gemüse, Vollkorn. Reduktion: rotes/verarbeitetes Fleisch, Zuckerzusätze, Transfette.',
          expectedBenefit:
            'hsCRP-Senkung um 20–30 % bei konsequenter Mittelmeer-Ernährung in mehreren RCTs; kardiovaskuläres Risiko parallel gesenkt',
          uncertaintyReason: null,
          risksAndCautions: null,
          contraindicationsOrRedFlags: null,
          monitoring: 'hsCRP nach 3 Monaten; Lipidprofil + Glukose parallel sinnvoll',
          doctorDiscussion: '\'Welche Ernährungsumstellung würde in meinem Fall am meisten bringen?\'',
          notToConfuseWith:
            'Anti-inflammatorische Ernährung ist kein Ersatz für Antibiotika oder Immunsuppressiva bei echter Entzündungserkrankung',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement:
            'PREDIMED Study (Estruch et al. NEJM 2013) + Meta-Analyse Mediterranean Diet hsCRP (Schwingshackl 2017)',
        },
        {
          loincCode: '1988-5',
          title: 'Regelmäßige moderate körperliche Aktivität',
          measureCategory: 'lifestyle',
          evidenceMaturity: 'supported',
          evidenceType: 'meta_analysis',
          whyShown:
            'Gezeigt, weil: Moderate Bewegung senkt hsCRP nachweislich — Mechanismus über Zytokin-Regulation und Adipositas-Reduktion',
          targetGroup: 'Personen mit chronisch erhöhtem hsCRP und Bewegungsmangel oder Übergewicht',
          whatCouldHelp:
            '150 Minuten moderate Ausdauerbelastung pro Woche (Gehen, Schwimmen, Radfahren) — zu intensive Belastung kann CRP kurzfristig erhöhen (Übertraining-Effekt)',
          expectedBenefit: 'hsCRP-Senkung um 0,5–1,5 mg/L bei regelmäßiger moderater Bewegung nach 12 Wochen',
          uncertaintyReason:
            'Effekt größer wenn gleichzeitig Gewichtsverlust eintritt — isolierter Bewegungseffekt auf CRP geringer als kombinierter Effekt',
          risksAndCautions:
            'Sehr intensive Belastung (z. B. Marathon, extreme HIIT) erhöht CRP kurzfristig — kein Zeichen einer Erkrankung',
          contraindicationsOrRedFlags: null,
          monitoring: 'hsCRP nach 12 Wochen regelmäßiger Aktivität',
          doctorDiscussion: '\'Gibt es einen Belastungstest den ich machen sollte bevor ich intensiver trainiere?\'',
          notToConfuseWith:
            'Akuter Muskelkater oder Übertraining erhöhen CRP kurzfristig — nicht mit chronischer Entzündung verwechseln',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement:
            'Fedewa et al. Sports Med 2017 (Meta-Analyse Exercise CRP) + AHA Physical Activity Guidelines 2018',
        },
        {
          loincCode: '1988-5',
          title: 'hsCRP als kardiovaskulärer Risikomarker einordnen',
          measureCategory: 'monitoring',
          evidenceMaturity: 'supported',
          evidenceType: 'guideline',
          whyShown:
            'Gezeigt, weil: Hochsensitives CRP (hsCRP) ist ein eigenständiger kardiovaskulärer Risikomarker — ESC-Leitlinie nennt hsCRP als ergänzenden Risikofaktor',
          targetGroup:
            'Personen mit hsCRP 2–10 mg/L und kardiovaskulärem Risikoprofil (Lipide, Blutdruck, Diabetes, Rauchen)',
          whatCouldHelp:
            'hsCRP > 3 mg/L ist laut ESC-SCORE2 ein Modifier für höheres kardiovaskuläres Risiko — kann Behandlungsintensivierung begründen (z. B. Statin-Indikation nach JUPITER-Studie)',
          expectedBenefit: 'Genauere Risikoklassifizierung als alleiniges Lipidprofil — ermöglicht gezieltere Prävention',
          uncertaintyReason:
            'hsCRP als eigenständiger Kausal-Faktor vs. Entzündungsmarker wird weiter diskutiert. ESC-Leitlinie empfiehlt hsCRP als optionalen Modifier, nicht als Primärmarker.',
          risksAndCautions:
            'hsCRP im Rahmen akuter Infektion nicht für kardiovaskuläres Screening verwenden — Wert erst nach Genesung messen',
          contraindicationsOrRedFlags: null,
          monitoring: 'hsCRP im infektfreien Intervall messen; 2-fach Messung für Baseline-Einordnung empfohlen',
          doctorDiscussion:
            '\'Sollte mein hsCRP-Wert in meine kardiovaskuläre Risikoeinschätzung einfließen?\' / \'Verändert das meinen Behandlungsplan?\'',
          notToConfuseWith:
            'Standard-CRP und hsCRP sind dasselbe Protein — hsCRP ist eine sensitivere Messmethode für den Niedrigbereich (< 10 mg/L)',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement: 'ESC Guideline Cardiovascular Prevention 2021 (§hsCRP) + JUPITER Trial Ridker 2008',
        },
        {
          loincCode: '1988-5',
          title: 'Rauchstopp',
          measureCategory: 'lifestyle',
          evidenceMaturity: 'established',
          evidenceType: 'meta_analysis',
          whyShown:
            'Gezeigt, weil: Rauchen erhöht CRP chronisch — Rauchstopp ist die Einzelmaßnahme mit dem stärksten Effekt auf chronische low-grade-Entzündung',
          targetGroup: 'Rauchende Personen mit erhöhtem hsCRP',
          whatCouldHelp:
            'Rauchstopp reduziert hsCRP um 30–50 % innerhalb von 3–6 Monaten; kombiniert mit Nikotinersatz- oder Verhaltenstherapie höchste Erfolgsrate',
          expectedBenefit:
            'Direkte Reduktion pro-inflammatorischer Zytokine; kardiovaskuläres Risiko langfristig stark gesenkt',
          uncertaintyReason: null,
          risksAndCautions:
            'Nikotinersatztherapie (Pflaster, Kaugummi) ist sicherer als Rauchen — nicht gegenläufiger Effekt',
          contraindicationsOrRedFlags: null,
          monitoring: 'hsCRP nach 6 Monaten Rauchfreiheit; Lungenfunktion langfristig',
          doctorDiscussion:
            '\'Gibt es Unterstützungsangebote für einen Rauchstopp?\' / \'Welche Nikotinersatz-Option passt zu mir?\'',
          notToConfuseWith:
            'E-Zigaretten sind nicht rauchfrei im klassischen Sinne — Entzündungseffekte noch nicht ausreichend erforscht',
          safetyLevel: 'low',
          requiresDoctorDiscussion: false,
          sourceRequirement: 'Barnoya & Glantz, Circulation 2005 + Cochrane Review Smoking Cessation 2023',
        },
    ],
    low: [],
  },

  // ─── Hämoglobin — LOINC 718-7 — B4-BUILD-04-CODE-WAVE1 ─────
  '718-7': {
    title: 'Was kann ich bei auffälligem Hämoglobin besprechen?',
    intro:
      'Der Hämoglobin-Wert wird immer im Zusammenhang mit weiteren Blutbildwerten bewertet. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Diagnose oder Therapieempfehlung.',
    high: [
      {
        loincCode: '718-7',
        title: 'Kontext und mögliche Auslöser ärztlich einordnen lassen',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Erhöhtes Hämoglobin kann reaktiv (z. B. durch Rauchen, Höhenaufenthalt, Schlafapnoe, COPD) oder eigenständig (Polycythaemia vera) bedingt sein — die Unterscheidung ist nur ärztlich möglich.',
        targetGroup: 'Alle Personen mit erhöhtem Hämoglobin-Wert',
        whatCouldHelp:
          'Besprich mit deiner Ärztin oder deinem Arzt: Rauchstatus, Schlafqualität/Schlafapnoe-Verdacht, kürzlicher Höhenaufenthalt und bekannte Lungen- oder Herzerkrankungen.',
        expectedBenefit:
          'Einordnung, ob eine reaktive Ursache vorliegt oder eine weiterführende Abklärung sinnvoll ist.',
        uncertaintyReason: null,
        risksAndCautions:
          'Deutlich erhöhte Hämoglobin-Werte können mit einem erhöhten Thromboserisiko einhergehen.',
        contraindicationsOrRedFlags:
          'Neu aufgetretene starke Kopfschmerzen, Sehstörungen oder Schwindel bei stark erhöhtem Wert sind ein Grund für zeitnahe ärztliche Abklärung.',
        monitoring:
          'Wiederholungsmessung zur Bestätigung, ggf. ergänzt um Blutgasanalyse oder Sauerstoffsättigung je nach ärztlicher Einschätzung.',
        doctorDiscussion:
          '„Kommt die Erhöhung von einer erkennbaren Ursache, oder braucht es weitere Abklärung?"',
        notToConfuseWith:
          'Eine leichte, vorübergehende Erhöhung ist nicht automatisch mit Polycythaemia vera gleichzusetzen — diese ist selten.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement:
          'guideline — EHA/DGHO-Einordnung, identisch zur bestehenden K3-Map-Quelle für `718-7` high.',
      },
      {
        loincCode: '718-7',
        title: 'Verlaufskontrolle nach Ursachenabklärung',
        measureCategory: 'monitoring',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Nach Einordnung der Ursache hilft eine Verlaufskontrolle einzuschätzen, ob der Wert stabil, rückläufig oder weiter ansteigend ist.',
        targetGroup: 'Personen mit bereits ärztlich eingeordnetem, erhöhtem Hämoglobin',
        whatCouldHelp: 'Frage nach einem sinnvollen Kontrollzeitpunkt für eine erneute Messung.',
        expectedBenefit:
          'Einschätzung, ob sich der Wert im Verlauf verändert und ob weitere Schritte nötig sind.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'Verlaufsmessung des Hämoglobin-Werts in ärztlich festgelegtem Abstand.',
        doctorDiscussion: '„Wann sollte der Wert erneut kontrolliert werden?"',
        notToConfuseWith: null,
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement:
          'clinical_consensus — allgemeine Monitoring-Praxis, keine spezifische Leitlinienquelle lokal verifiziert.',
      },
    ],
    low: [
      {
        loincCode: '718-7',
        title: 'Eisenstatus und Ursache gemeinsam einordnen lassen',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Niedriges Hämoglobin ist das Hauptkennzeichen einer Anämie — die Ursache (u. a. Eisenmangel, Vitamin-B12-/Folsäuremangel, chronische Erkrankung, Blutverlust) lässt sich nur mit weiteren Werten eingrenzen.',
        targetGroup: 'Alle Personen mit erniedrigtem Hämoglobin-Wert',
        whatCouldHelp:
          'Bitte darum, dass Ferritin, Transferrinsättigung und MCV gemeinsam mit dem Hämoglobin-Wert betrachtet werden, falls noch nicht geschehen.',
        expectedBenefit: 'Bessere Eingrenzung, welche Anämie-Ursache im konkreten Fall wahrscheinlich ist.',
        uncertaintyReason: null,
        risksAndCautions: 'Ein einzelner Hämoglobin-Wert reicht für eine Ursacheneingrenzung nicht aus.',
        contraindicationsOrRedFlags: null,
        monitoring: 'Ferritin, Transferrinsättigung, MCV, ggf. Vitamin B12 und Folsäure.',
        doctorDiscussion:
          '„Welche Ursache kommt in meinem Fall am ehesten infrage?" / „Welche weiteren Werte sind sinnvoll?"',
        notToConfuseWith: 'Ein niedriges Hämoglobin allein erlaubt keine Aussage über die Art der Anämie.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement:
          'guideline — WHO/AWMF Anämie-Leitlinie, identisch zur bestehenden K3-Map-Quelle für `718-7` low.',
      },
      {
        loincCode: '718-7',
        title: 'Warnzeichen als Grund für zeitnahe ärztliche Abklärung',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Bestimmte Begleitsymptome bei niedrigem Hämoglobin sind ein Grund, die Abklärung nicht aufzuschieben.',
        targetGroup: 'Personen mit erniedrigtem Hämoglobin und Begleitsymptomen',
        whatCouldHelp:
          'Melde deiner Ärztin oder deinem Arzt zeitnah, wenn zusätzlich starke Müdigkeit, Atemnot bei geringer Belastung, Herzrasen, Schwindel oder sichtbares Blut im Stuhl oder Urin auftreten.',
        expectedBenefit: 'Schnellere Einordnung, ob eine dringlichere Abklärung notwendig ist.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags:
          'Sichtbares Blut im Stuhl oder Urin, starke Atemnot oder Brustschmerzen sind ein Grund für zeitnahe ärztliche Abklärung — unabhängig von der Ursache.',
        monitoring: null,
        doctorDiscussion: '„Sollten meine Symptome zeitnah abgeklärt werden?"',
        notToConfuseWith:
          'Dieser Hinweis beschreibt ein Symptombild, das abgeklärt werden sollte — er stellt keine Diagnose (z. B. Magen-Darm-Blutung) und keine Ursachenzuordnung dar.',
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
        sourceRequirement:
          'clinical_consensus — allgemeiner Red-Flag-Konsens, keine spezifische Leitlinienquelle lokal verifiziert.',
      },
      {
        loincCode: '718-7',
        title: 'Verlaufskontrolle nach Ursachenklärung',
        measureCategory: 'monitoring',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Nach Einordnung der Ursache zeigt eine Verlaufskontrolle, ob eine Maßnahme wirkt.',
        targetGroup: 'Personen mit bereits ärztlich eingeordnetem, erniedrigtem Hämoglobin',
        whatCouldHelp: 'Frage nach einem sinnvollen Kontrollzeitpunkt für eine erneute Messung.',
        expectedBenefit: 'Einschätzung, ob sich der Wert im Verlauf normalisiert.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'Verlaufsmessung des Hämoglobin-Werts in ärztlich festgelegtem Abstand.',
        doctorDiscussion: '„Wann sollte der Wert erneut kontrolliert werden?"',
        notToConfuseWith: null,
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement: 'clinical_consensus',
      },
    ],
  },

  // ─── TSH — LOINC 3016-3 — B4-BUILD-04-CODE-WAVE1 ─────
  '3016-3': {
    title: 'Was kann ich bei auffälligem TSH besprechen?',
    intro:
      'TSH wird immer im Zusammenhang mit weiteren Schilddrüsenwerten, Messbedingungen und Medikamenten betrachtet. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Diagnose oder Therapieempfehlung.',
    high: [
      {
        loincCode: '3016-3',
        title: 'fT3/fT4 gemeinsam betrachten lassen',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Ein erhöhter TSH-Wert allein reicht für eine Einordnung nicht aus — fT3 und fT4 ergänzen das Bild.',
        targetGroup: 'Alle Personen mit erhöhtem TSH-Wert',
        whatCouldHelp:
          'Bitte darum, dass fT3 und fT4 bestimmt werden, falls dies noch nicht geschehen ist.',
        expectedBenefit: 'Vollständigere Einordnung der Schilddrüsenfunktion.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'fT3, fT4.',
        doctorDiscussion: '„Sollten fT3 und fT4 mitbestimmt werden?"',
        notToConfuseWith:
          'Ein erhöhter TSH-Wert ist keine automatische Diagnose einer Schilddrüsenunterfunktion oder von Hashimoto — beides erfordert weitere Abklärung.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement:
          'guideline — AWMF S2k Hypothyreose 2022, identisch zur K3-Map-Quelle `3016-3` high.',
      },
      {
        loincCode: '3016-3',
        title: 'Biotin-Einnahme vor der Messung angeben',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Hochdosiertes Biotin (z. B. aus Nahrungsergänzung für Haare, Haut, Nägel) kann TSH-Messergebnisse verfälschen — dies ist bereits als Einflussfaktor auf die Schilddrüsenwerte dokumentiert.',
        targetGroup: 'Personen, die Biotin-Präparate einnehmen und einen auffälligen TSH-Wert haben',
        whatCouldHelp:
          'Gib bei der Blutabnahme an, ob und in welcher Form du Biotin-Präparate einnimmst, und bespreche mit der Praxis, ob eine Wiederholungsmessung nach einer Einnahmepause sinnvoll ist.',
        expectedBenefit:
          'Ausschluss einer messtechnischen Verfälschung, bevor weitere Schritte besprochen werden.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'Wiederholungsmessung nach ärztlich/laborseitig abgestimmter Einnahmepause.',
        doctorDiscussion: '„Kann meine Biotin-Einnahme das Ergebnis beeinflusst haben?"',
        notToConfuseWith: 'Eine biotinbedingte Verfälschung ist keine echte Schilddrüsenfunktionsstörung.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement:
          'clinical_consensus — Biotin bereits im bestehenden lokalen K3-Map-Eintrag `3016-3` (low, caution) als Einflussfaktor genannt; keine zusätzliche externe Quelle recherchiert.',
      },
      {
        loincCode: '3016-3',
        title: 'Arztgespräch bei neu auffälligem oder stark verändertem Wert',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Ein neu aufgetretener oder deutlich veränderter TSH-Wert profitiert von zeitnaher ärztlicher Einordnung, unabhängig vom genauen Ausmaß.',
        targetGroup:
          'Personen mit neu auffälligem oder im Vergleich zu Vorwerten stark verändertem TSH',
        whatCouldHelp:
          'Bringe frühere Messwerte mit, falls vorhanden, damit der Verlauf eingeordnet werden kann.',
        expectedBenefit:
          'Bessere Einordnung, ob es sich um eine neue Entwicklung oder eine bekannte Konstellation handelt.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags:
          'Begleitsymptome wie starker Gewichtsverlust, Herzrasen, ausgeprägte Erschöpfung oder Kälte-/Wärmeintoleranz sollten der Ärztin oder dem Arzt aktiv mitgeteilt werden.',
        monitoring: null,
        doctorDiscussion: '„Ist diese Veränderung im Vergleich zu meinen früheren Werten auffällig?"',
        notToConfuseWith: null,
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'clinical_consensus',
      },
    ],
    low: [
      {
        loincCode: '3016-3',
        title: 'fT3/fT4 gemeinsam betrachten lassen (Hyperthyreose-Richtung)',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Ein erniedrigter TSH-Wert allein reicht für eine Einordnung nicht aus — fT3 und fT4 zeigen, ob tatsächlich eine Überfunktion vorliegt.',
        targetGroup: 'Alle Personen mit erniedrigtem TSH-Wert',
        whatCouldHelp:
          'Bitte darum, dass fT3 und fT4 bestimmt werden, falls dies noch nicht geschehen ist.',
        expectedBenefit: 'Vollständigere Einordnung der Schilddrüsenfunktion.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring:
          'fT3, fT4, ggf. TRAK bei Verdacht auf Morbus Basedow (nur ärztlich zu veranlassen).',
        doctorDiscussion: '„Sollten fT3 und fT4 mitbestimmt werden?"',
        notToConfuseWith:
          'Ein erniedrigter TSH-Wert ist keine automatische Diagnose einer Schilddrüsenüberfunktion oder von Morbus Basedow.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement:
          'guideline — AWMF S2k Hyperthyreose 2020, identisch zur K3-Map-Quelle `3016-3` low.',
      },
      {
        loincCode: '3016-3',
        title: 'Biotin-Einnahme kann Testergebnis verfälschen',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Hochdosiertes Biotin kann TSH-Werte verfälscht niedrig erscheinen lassen und dadurch ein Bild ähnlich einer Überfunktion erzeugen.',
        targetGroup: 'Personen, die Biotin-Präparate einnehmen und einen erniedrigten TSH-Wert haben',
        whatCouldHelp:
          'Gib bei der Blutabnahme an, ob und in welcher Form du Biotin-Präparate einnimmst, und bespreche mit der Praxis, ob eine Wiederholungsmessung nach einer Einnahmepause sinnvoll ist.',
        expectedBenefit:
          'Ausschluss einer messtechnischen Verfälschung, bevor weitere Schritte besprochen werden.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'Wiederholungsmessung nach ärztlich/laborseitig abgestimmter Einnahmepause.',
        doctorDiscussion: '„Kann meine Biotin-Einnahme das Ergebnis beeinflusst haben?"',
        notToConfuseWith: 'Eine biotinbedingte Verfälschung ist keine echte Schilddrüsenüberfunktion.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'clinical_consensus — identische lokale Grundlage wie HIGH-2.',
      },
      {
        loincCode: '3016-3',
        title: 'Medikamenten-/Supplement-Kontext besprechen',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Ein erniedrigter TSH-Wert kann bei bestehender Schilddrüsenhormon-Einnahme auf eine zu hohe Dosierung hinweisen — dies ist nur ärztlich zu beurteilen.',
        targetGroup:
          'Personen, die Schilddrüsenhormone einnehmen und einen erniedrigten TSH-Wert haben',
        whatCouldHelp:
          'Besprich Dosierung und Einnahmezeitpunkt deiner Schilddrüsenmedikation mit deiner Ärztin oder deinem Arzt — ändere die Dosierung nicht eigenständig.',
        expectedBenefit: 'Einordnung, ob eine Dosisanpassung sinnvoll ist.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags:
          'Medikamente zur Schilddrüsenbehandlung nicht eigenständig absetzen oder in der Dosis verändern.',
        monitoring: 'TSH-Kontrolle nach ärztlich festgelegtem Intervall bei Dosisänderung.',
        doctorDiscussion: '„Ist meine aktuelle Dosierung noch passend?"',
        notToConfuseWith: null,
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'clinical_consensus',
      },
    ],
  },

  // ─── Kreatinin — LOINC 2160-0 — B4-BUILD-04-CODE-WAVE1 ─────
  '2160-0': {
    title: 'Was kann ich bei auffälligem Kreatinin besprechen?',
    intro:
      'Kreatinin wird immer im Zusammenhang mit eGFR, Muskelmasse, Flüssigkeitshaushalt und weiteren Befunden bewertet. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Diagnose oder Therapieempfehlung.',
    high: [
      {
        loincCode: '2160-0',
        title: 'Gemeinsam mit eGFR einordnen lassen',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Kreatinin ist ein relativ unempfindlicher Marker — die Nierenfunktion kann bereits eingeschränkt sein, bevor Kreatinin auffällig wird. Die eGFR liefert eine genauere Einschätzung.',
        targetGroup: 'Alle Personen mit erhöhtem Kreatinin',
        whatCouldHelp:
          'Betrachte den Kreatinin-Wert gemeinsam mit der eGFR (siehe eGFR-Seite) und bitte bei einem Erstbefund um eine Wiederholungsmessung.',
        expectedBenefit: 'Genauere Einschätzung der Nierenfunktion als durch Kreatinin allein.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'eGFR, Wiederholungsmessung des Kreatinin-Werts.',
        doctorDiscussion: '„Wie ordnet sich mein Kreatinin-Wert im Zusammenhang mit der eGFR ein?"',
        notToConfuseWith: 'Ein einzelner erhöhter Kreatinin-Wert ist keine Diagnose einer Nierenerkrankung.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement:
          'guideline — KDIGO 2024/NVL Nierenerkrankungen, identisch zur K3-Map-Quelle `2160-0` high.',
      },
      {
        loincCode: '2160-0',
        title: 'Hydratation, Muskelmasse und Belastung als Kontext',
        measureCategory: 'lifestyle',
        evidenceMaturity: 'supported',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Flüssigkeitsmangel sowie hohe Muskelmasse oder sehr intensive körperliche Belastung können Kreatinin erhöhen, ohne dass eine Nierenerkrankung vorliegt.',
        targetGroup:
          'Personen mit erhöhtem Kreatinin ohne bekannte Nierenerkrankung, insbesondere nach intensiver körperlicher Belastung oder bei geringer Trinkmenge vor der Messung',
        whatCouldHelp:
          'Besprich Trinkmenge und Zeitpunkt intensiver körperlicher Belastung vor der Blutabnahme — ggf. ist eine Wiederholungsmessung unter Standardbedingungen sinnvoll.',
        expectedBenefit: 'Einordnung, ob ein vorübergehender, nicht-renaler Effekt vorliegt.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring:
          'Wiederholungsmessung unter Standardbedingungen (ausreichend hydriert, ohne vorherige intensive Belastung).',
        doctorDiscussion: '„Könnten Trinkmenge oder Training das Ergebnis beeinflusst haben?"',
        notToConfuseWith:
          'Dies ersetzt keine ärztliche Abklärung bei wiederholt oder deutlich erhöhten Werten.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement: 'clinical_consensus — direkt aus K3-Map-Eintrag `2160-0` high übernommen.',
      },
      {
        loincCode: '2160-0',
        title: 'Arztgespräch bei wiederholt auffälligen Werten',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Wiederholt erhöhte Kreatinin-Werte sollten ärztlich abgeklärt werden — insbesondere im Zusammenhang mit Medikamenten, die die Nierenfunktion beeinflussen können.',
        targetGroup: 'Personen mit wiederholt oder deutlich erhöhtem Kreatinin',
        whatCouldHelp:
          'Bringe frühere Messwerte mit und liste alle aktuell eingenommenen Medikamente (inkl. rezeptfreier Schmerzmittel) auf.',
        expectedBenefit: 'Vollständigere Grundlage für die ärztliche Einordnung.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags:
          'Medikamente, die die Nierenfunktion beeinflussen können (z. B. bestimmte Schmerzmittel oder Blutdruckmedikamente), nicht eigenständig absetzen oder in der Dosis verändern — nur nach ärztlicher Rücksprache.',
        monitoring: 'Kreatinin und eGFR im ärztlich festgelegten Intervall.',
        doctorDiscussion:
          '„Sollte eine meiner Medikationen im Zusammenhang mit diesem Wert überprüft werden?"',
        notToConfuseWith: null,
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'clinical_consensus',
      },
    ],
    low: [
      {
        loincCode: '2160-0',
        title: 'Muskelmasse und Ernährungsstatus als Kontext für die eGFR',
        measureCategory: 'supporting',
        evidenceMaturity: 'supported',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Bei geringer Muskelmasse werden niedrigere Kreatinin-Werte festgestellt — dies kann dazu führen, dass eine eingeschränkte Nierenfunktion durch die eGFR-Berechnung unterschätzt wird.',
        targetGroup:
          'Personen mit erniedrigtem Kreatinin und geringer Muskelmasse (z. B. höheres Alter, längerer Krankenhausaufenthalt, Mangelernährung)',
        whatCouldHelp:
          'Besprich mit deiner Ärztin oder deinem Arzt, ob die eGFR-Berechnung in deinem Fall zuverlässig ist oder ob ergänzende Marker sinnvoll sind.',
        expectedBenefit: 'Vermeidung einer Fehleinschätzung der Nierenfunktion bei geringer Muskelmasse.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'Ggf. ergänzende Marker wie Cystatin C (nur nach ärztlicher Einschätzung).',
        doctorDiscussion: '„Ist meine eGFR bei meiner Muskelmasse zuverlässig einschätzbar?"',
        notToConfuseWith: null,
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'clinical_consensus — direkt aus K3-Map-Eintrag `2160-0` low übernommen.',
      },
    ],
  },

  // ─── eGFR — LOINC 62238-1 — B4-BUILD-04-CODE-WAVE1 ─────
  '62238-1': {
    title: 'Was kann ich bei niedriger eGFR besprechen?',
    intro:
      'Die eGFR wird im Verlauf und zusammen mit weiteren Nieren- und Urinwerten eingeordnet. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Diagnose oder Therapieempfehlung.',
    high: [
    ],
    low: [
      {
        loincCode: '62238-1',
        title: 'Wiederholungsmessung und Verlauf',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Ein einzelner eGFR-Wert erlaubt keine verlässliche Einordnung — eine Wiederholungsmessung zeigt, ob es sich um eine vorübergehende oder anhaltende Veränderung handelt.',
        targetGroup: 'Alle Personen mit erniedrigter eGFR',
        whatCouldHelp:
          'Bitte um eine Wiederholungsmessung im ärztlich empfohlenen Abstand, um vorübergehende von anhaltenden Veränderungen zu unterscheiden.',
        expectedBenefit: 'Verlässlichere Einordnung, ob eine anhaltende Veränderung vorliegt.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring:
          'Wiederholungsmessung im ärztlich festgelegten Abstand — nach Leitlinie sind für eine Einordnung als anhaltend in der Regel mehrere Messungen im Verlauf notwendig.',
        doctorDiscussion: '„Wann sollte die eGFR erneut kontrolliert werden?"',
        notToConfuseWith:
          'Dieser Hinweis beschreibt keine Krankheitsstadien — eine Stadieneinteilung erfolgt ausschließlich ärztlich.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement:
          'guideline — KDIGO 2024/NVL CKD, identisch zur K3-Map-Quelle `62238-1` low. Der Hinweis auf ein mehrfaches Messintervall ist eine Verfahrensangabe (keine Referenzwert-/Grenzwertnennung) und stammt direkt aus dem bereits lokal vorhandenen K3-Map-Cautiontext.',
      },
      {
        loincCode: '62238-1',
        title: 'Kreatinin und Urin-Albumin gemeinsam betrachten lassen',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Die eGFR sollte immer im Zusammenhang mit weiteren Befunden betrachtet werden, nicht isoliert.',
        targetGroup: 'Alle Personen mit erniedrigter eGFR',
        whatCouldHelp:
          'Frage nach Kreatinin und Urin-Albumin (Albumin-Kreatinin-Ratio), falls diese noch nicht bestimmt wurden.',
        expectedBenefit: 'Vollständigere Einordnung der Nierenfunktion.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'Kreatinin, Urin-Albumin-Kreatinin-Ratio.',
        doctorDiscussion: '„Sollte zusätzlich eine Urin-Untersuchung erfolgen?"',
        notToConfuseWith: null,
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'guideline — identisch zu LOW-1.',
      },
      {
        loincCode: '62238-1',
        title: 'Medikamente und Nierenbelastung nur ärztlich anpassen',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Manche Medikamente können die Nierenfunktion beeinflussen oder müssen bei eingeschränkter eGFR in der Dosierung angepasst werden — dies ist ausschließlich ärztlich zu beurteilen.',
        targetGroup: 'Personen mit erniedrigter eGFR, die regelmäßig Medikamente einnehmen',
        whatCouldHelp:
          'Liste alle aktuell eingenommenen Medikamente (inkl. rezeptfreier Schmerzmittel) auf und besprich sie mit deiner Ärztin oder deinem Arzt.',
        expectedBenefit:
          'Vermeidung einer zusätzlichen Belastung der Nierenfunktion durch nicht angepasste Medikation.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags:
          'Medikamente mit möglicher Nierenwirkung nicht eigenständig absetzen oder in der Dosierung verändern — nur nach ärztlicher Rücksprache.',
        monitoring: 'eGFR-Kontrolle bei Medikamentenanpassung im ärztlich festgelegten Intervall.',
        doctorDiscussion: '„Muss eine meiner Medikationen wegen der eGFR angepasst werden?"',
        notToConfuseWith: null,
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'clinical_consensus',
      },
    ],
  },

  // ─── Glukose nüchtern — LOINC 2345-7 — B4-BUILD-04-CODE-WAVE1 ─────
  '2345-7': {
    title: 'Was kann ich bei auffälliger Nüchternglukose besprechen?',
    intro:
      'Nüchternglukose wird im Zusammenhang mit Messbedingungen, Verlauf und weiteren Stoffwechselwerten bewertet. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Diagnose oder Therapieempfehlung.',
    high: [
      {
        loincCode: '2345-7',
        title: 'Nüchternstatus und Messkontext prüfen',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Eine valide Nüchternglukose-Messung setzt eine ausreichende Nahrungskarenz voraus — akute Erkrankung, Stress oder bestimmte Medikamente können den Wert zusätzlich vorübergehend beeinflussen.',
        targetGroup: 'Alle Personen mit erhöhter Nüchternglukose',
        whatCouldHelp:
          'Prüfe und besprich mit deiner Ärztin oder deinem Arzt, ob die Messung unter Nüchternbedingungen erfolgte und ob eine akute Erkrankung, Stress oder Medikamente (z. B. Kortisonpräparate) den Wert beeinflusst haben könnten.',
        expectedBenefit:
          'Einordnung, ob der Wert repräsentativ ist oder eine Wiederholung unter Standardbedingungen sinnvoll ist.',
        uncertaintyReason: null,
        risksAndCautions:
          'Eine unzureichende Nahrungskarenz vor der Messung ist eine häufige Ursache für einen einmalig auffälligen Wert.',
        contraindicationsOrRedFlags: null,
        monitoring: 'Wiederholungsmessung unter gesicherten Nüchternbedingungen.',
        doctorDiscussion: '„Wurde die Messung unter Nüchternbedingungen durchgeführt?"',
        notToConfuseWith: 'Ein einzelner erhöhter Wert ist keine Diabetesdiagnose.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement:
          'clinical_consensus — direkt aus K3-Map-Eintrag `2345-7` high übernommen (Verfahrenshinweis, kein Grenzwert).',
      },
      {
        loincCode: '2345-7',
        title: 'HbA1c als Verlaufskontext einbeziehen',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: HbA1c spiegelt den Blutzuckerverlauf der letzten Monate wider und ergänzt den punktuellen Nüchternwert.',
        targetGroup:
          'Alle Personen mit erhöhter Nüchternglukose, sofern noch kein aktueller HbA1c vorliegt',
        whatCouldHelp:
          'Bitte darum, dass HbA1c bestimmt oder — falls bereits vorhanden — gemeinsam mit dem Nüchternwert betrachtet wird.',
        expectedBenefit:
          'Einordnung, ob es sich um eine einmalige Auffälligkeit oder einen länger bestehenden Trend handelt.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'HbA1c.',
        doctorDiscussion: '„Was zeigt mein HbA1c im Vergleich zum Nüchternwert?"',
        notToConfuseWith: null,
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement:
          'guideline — DDG/ADA, identisch zur bestehenden HbA1c-B4-Karte-Argumentation (LOINC `4548-4`).',
      },
      {
        loincCode: '2345-7',
        title: 'Wiederholungsmessung und ärztliche Einordnung',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Eine einzelne Messung reicht laut Leitlinie nicht für eine Diagnosestellung — mehrere Messungen und die ärztliche Gesamtbeurteilung sind notwendig.',
        targetGroup: 'Alle Personen mit wiederholt oder deutlich erhöhter Nüchternglukose',
        whatCouldHelp:
          'Besprich mit deiner Ärztin oder deinem Arzt, ob eine Wiederholungsmessung oder weitere Diagnostik sinnvoll ist.',
        expectedBenefit: 'Verlässlichere Einordnung als durch eine Einzelmessung.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'Wiederholungsmessung im ärztlich festgelegten Abstand.',
        doctorDiscussion: '„Sind weitere Messungen oder Tests notwendig, um den Befund einzuordnen?"',
        notToConfuseWith:
          'Diese Karte stellt keine Diabetesdiagnose dar — die Diagnosestellung liegt ausschließlich bei Ärztin oder Arzt.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'guideline — DDG/ADA, identisch zur K3-Map-Quelle `2345-7` high.',
      },
    ],
    low: [
      {
        loincCode: '2345-7',
        title: 'Sicherheitskontext bei niedrigen Werten',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Sehr niedrige Nüchternglukose-Werte können auf eine Unterzuckerung hinweisen, die abgeklärt werden sollte.',
        targetGroup: 'Personen mit erniedrigter Nüchternglukose',
        whatCouldHelp:
          'Melde deiner Ärztin oder deinem Arzt, wenn zusätzlich Symptome wie Zittern, Schweißausbruch, Schwindel oder Konzentrationsstörungen auftreten oder aufgetreten sind.',
        expectedBenefit: 'Schnellere Einordnung, ob eine zeitnahe Abklärung notwendig ist.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags:
          'Symptome wie Zittern, Schweißausbruch, Schwindel oder Bewusstseinsstörungen sind ein Grund für zeitnahe ärztliche Abklärung.',
        monitoring: null,
        doctorDiscussion: '„Sollten meine Symptome zeitnah abgeklärt werden?"',
        notToConfuseWith: null,
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
        sourceRequirement:
          'clinical_consensus — direkt aus K3-Map-Eintrag `2345-7` low übernommen; bewusst ohne detailliertes Notfallprotokoll formuliert.',
      },
      {
        loincCode: '2345-7',
        title: 'Ursache bei wiederholt niedrigen Werten klären lassen',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Wiederholt niedrige Werte können verschiedene Ursachen haben — von einer bestehenden Diabetestherapie bis zu anderen Erkrankungen — und sollten ärztlich eingeordnet werden.',
        targetGroup: 'Personen mit wiederholt erniedrigter Nüchternglukose',
        whatCouldHelp:
          'Besprich mit deiner Ärztin oder deinem Arzt mögliche Ursachen, insbesondere falls du eine Diabetestherapie erhältst.',
        expectedBenefit: 'Einordnung der Ursache und ggf. Anpassung einer bestehenden Therapie.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags:
          'Diabetes-Medikamente (insbesondere Insulin) nicht eigenständig absetzen oder in der Dosis verändern.',
        monitoring: 'Verlaufsmessungen der Nüchternglukose.',
        doctorDiscussion: '„Sollte meine Therapie im Zusammenhang mit diesem Wert überprüft werden?"',
        notToConfuseWith: null,
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'clinical_consensus',
      },
    ],
  },

  // ─── HDL-Cholesterin — LOINC 2085-9 — B4-BUILD-04-CODE-WAVE1 ─────
  '2085-9': {
    title: 'Was kann ich bei niedrigem HDL besprechen?',
    intro:
      'HDL-Cholesterin wird immer im Zusammenhang mit dem vollständigen Lipidprofil und dem gesamten Herz-Kreislauf-Risiko bewertet. Die folgenden Punkte sind Gesprächs- und Orientierungsbausteine — keine individuelle Diagnose oder Therapieempfehlung.',
    high: [
    ],
    low: [
      {
        loincCode: '2085-9',
        title: 'Vollständiges Lipidprofil gemeinsam betrachten',
        measureCategory: 'standard',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: HDL allein ist kein ausreichender Risikoprädiktor — die Einordnung erfordert das vollständige Lipidprofil.',
        targetGroup: 'Alle Personen mit erniedrigtem HDL',
        whatCouldHelp:
          'Bitte darum, dass LDL, Triglyzeride und Gesamtcholesterin gemeinsam mit dem HDL-Wert betrachtet werden, falls dies noch nicht geschehen ist.',
        expectedBenefit: 'Vollständigere Einordnung des kardiovaskulären Risikoprofils.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'LDL, Triglyzeride, Gesamtcholesterin, Non-HDL-Cholesterin.',
        doctorDiscussion: '„Wie ordnet sich mein HDL-Wert im Zusammenhang mit dem übrigen Lipidprofil ein?"',
        notToConfuseWith:
          'Ein niedriges HDL allein ist keine Diagnose eines erhöhten Herz-Kreislauf-Risikos.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement: 'guideline — ESC/EAS 2019/DGK, identisch zur K3-Map-Quelle `2085-9` low.',
      },
      {
        loincCode: '2085-9',
        title: 'Bewegung und Ernährung als allgemeiner Risikokontext',
        measureCategory: 'lifestyle',
        evidenceMaturity: 'supported',
        evidenceType: 'clinical_consensus',
        whyShown:
          'Gezeigt, weil: Körperliche Aktivität und Ernährungsmuster gehören zu den am besten belegten Einflussfaktoren auf das kardiovaskuläre Risikoprofil, zu dem HDL als ein Baustein gehört.',
        targetGroup:
          'Personen mit erniedrigtem HDL, die ihr allgemeines kardiovaskuläres Risikoprofil verbessern möchten',
        whatCouldHelp:
          'Regelmäßige körperliche Aktivität und eine Ernährung mit einem höheren Anteil ungesättigter Fette können im Rahmen des allgemeinen Risikomanagements besprochen werden — mit Ärztin/Arzt oder Ernährungsberatung.',
        expectedBenefit:
          'Kein isoliertes Versprechen zur direkten Anhebung des HDL-Werts — wirkt im Rahmen des allgemeinen kardiovaskulären Risikoprofils.',
        uncertaintyReason:
          'Kein aktiver Leitlinienstandard, der eine gezielte ‚HDL-Anhebung\' als eigenständiges Therapieziel empfiehlt — Lebensstilmaßnahmen wirken auf das Gesamtrisikoprofil, nicht spezifisch und gezielt auf HDL.',
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'Verlaufskontrolle des vollständigen Lipidprofils.',
        doctorDiscussion: '„Welche Lebensstilaspekte sind in meinem Fall am relevantesten?"',
        notToConfuseWith:
          'Nicht zu verwechseln mit einem gezielten ‚HDL-Therapieziel\' — HDL wird nicht aktiv hochtherapiert, sondern im Rahmen des Gesamtrisikos betrachtet.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement:
          'clinical_consensus — bewusst ohne quantitative Effektangabe, da keine lokal verifizierte Meta-Analyse für HDL-spezifische Effektgrößen vorliegt (Unterschied zur bestehenden LDL-Ballaststoff-Karte, die eine konkrete, verifizierte Quelle zitiert).',
      },
      {
        loincCode: '2085-9',
        title: 'Metabolisches Syndrom als Kontext ärztlich einordnen lassen',
        measureCategory: 'doctor_discussion',
        evidenceMaturity: 'established',
        evidenceType: 'guideline',
        whyShown:
          'Gezeigt, weil: Niedriges HDL gehört zu den Kriterien des metabolischen Syndroms — zusammen mit erhöhten Triglyzeriden, Bauchumfang, Blutdruck und Nüchternblutzucker.',
        targetGroup:
          'Personen mit erniedrigtem HDL und weiteren möglichen Risikofaktoren (Übergewicht, wenig Bewegung, erhöhter Blutdruck)',
        whatCouldHelp:
          'Besprich mit deiner Ärztin oder deinem Arzt, ob eine Betrachtung im Rahmen des metabolischen Syndroms sinnvoll ist — insbesondere wenn weitere Risikofaktoren bekannt sind.',
        expectedBenefit:
          'Einordnung, ob mehrere Risikofaktoren zusammen vorliegen und gemeinsam angegangen werden sollten.',
        uncertaintyReason: null,
        risksAndCautions: null,
        contraindicationsOrRedFlags: null,
        monitoring: 'Bauchumfang, Blutdruck, Nüchternblutzucker/HbA1c, Triglyzeride.',
        doctorDiscussion: '„Liegen bei mir weitere Kriterien eines metabolischen Syndroms vor?"',
        notToConfuseWith:
          'Ein niedriges HDL allein ist keine Diagnose eines metabolischen Syndroms — dafür müssen mehrere Kriterien gemeinsam erfüllt sein.',
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
        sourceRequirement: 'guideline — IDF/AHA-Kriterien, DDG, identisch zur K3-Map-Quelle `2085-9` low.',
      },
    ],
  },

}
