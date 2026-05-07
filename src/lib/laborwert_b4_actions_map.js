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
          '"Was wäre ein realistisches LDL-Ziel für mein Risikoprofil?" / "Welches Statin ist geeignet und welche Dosis?" / "Was tun bei Muskelbeschwerden?"',
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
          'Flohsamenschalen (Psyllium, 10–15 g täglich, in Wasser oder Joghurt eingerührt) können als ergänzende Maßnahme besprochen werden.',
        expectedBenefit:
          'LDL-Senkung um ~5–7 % in mehreren RCTs; zusätzlich positiver Effekt auf Blutzucker und Darmgesundheit.',
        uncertaintyReason:
          'Kein aktiver Leitlinienstandard für Flohsamenschalen — gut belegte unterstützende Evidenz (mehrere RCTs), aber kein klinischer Konsens als Primärtherapie.',
        risksAndCautions:
          'Ausreichend Flüssigkeit trinken (mindestens 1–2 Gläser Wasser pro Einnahme). Langsam einschleichen bei empfindlichem Verdauungstrakt.',
        contraindicationsOrRedFlags:
          'Zeitversetzt zu Medikamenten einnehmen (mind. 30–60 Min. Abstand), da Psyllium die Aufnahme einiger Wirkstoffe verzögern kann.',
        monitoring: 'LDL-Kontrolle nach 6–12 Wochen bei regelmäßiger Anwendung.',
        doctorDiscussion:
          '"Kann Psyllium in meinem Fall sinnvoll sein?" / "Gibt es Wechselwirkungen mit meinen aktuellen Medikamenten?"',
        notToConfuseWith:
          'Nicht verwechseln mit unlöslichen Ballaststoffen (z. B. Weizenkleie) — diese haben keine vergleichbare LDL-senkende Wirkung. Kein Ersatz für Statine bei klinisch relevantem Risiko.',
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
        sourceRequirement:
          'Gut untersucht — Cochrane Review Soluble Dietary Fibre 2016 + EFSA Health Claim Psyllium',
      },
      {
        title: 'Pflanzensterole und -stanole',
        measureCategory: 'supportive',
        evidenceMaturity: 'supported',
        evidenceType: 'meta_analysis',
        whyShown:
          'Gezeigt, weil: Pflanzensterole/-stanole hemmen die Cholesterinaufnahme im Darm — EFSA-anerkannter Health Claim bei 2–3 g täglich',
        targetGroup:
          'Menschen mit erhöhtem LDL, die ergänzende Ernährungsmaßnahmen suchen; nicht bei Schwangerschaft oder Stillzeit ohne ärztliche Rücksprache',
        whatCouldHelp:
          'Pflanzensterole/-stanole sind in angereicherten Margarine- und Joghurtprodukten erhältlich. 2–3 g täglich zu einer Hauptmahlzeit können LDL messbar senken.',
        expectedBenefit:
          'LDL-Senkung um 7–12 % bei 2–3 g Pflanzensterolen täglich — belegt durch Meta-Analysen und EFSA Health Claim.',
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
        requiresDoctorDiscussion: false,
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
          'Hochdosierte Omega-3-Präparate (> 3 g/Tag): erhöhtes Blutungsrisiko. Wechselwirkungen mit Blutgerinnungshemmern möglich.',
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
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: false,
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
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'low',
        requiresDoctorDiscussion: false,
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
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'high',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
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
        safetyLevel: 'medium',
        requiresDoctorDiscussion: true,
      },
    ],
    low: [],
  },
}
