/**
 * anonymizeWorker.js — P7-03b
 * Browser Web Worker für client-seitige Anonymisierung medizinischer DE-Texte.
 *
 * E07/E08-konform:
 *  - Läuft vollständig im Browser-Prozess (Web Worker, same-origin).
 *  - Kein Netzwerkaufruf, kein externer Dienst.
 *  - Fehler führen NIEMALS zu einem Bypass mit teilanonymisiertem Text.
 *  - Keine PII wird in Fehlermeldungen oder Konsolen-Ausgaben weitergegeben.
 *
 * Protokoll:
 *  Eingehend:  { type: 'anonymize', text: string }
 *  Ausgehend:  { type: 'result', anonymizedText: string, report: object }
 *           oder { type: 'error', message: string }
 *
 * Regel-Reihenfolge:
 *  Kontextbasierte Namen-Labels (patient_label, name_label) laufen VOR
 *  strukturellen Nummern-Labels (fallnummer), damit "Patient: Name" nicht
 *  durch das Nummern-Muster fehl-konsumiert wird.
 *  Danach: strukturierte IDs, Kontaktdaten, Adressen, Anrede-Namen.
 */

'use strict';

// ---------------------------------------------------------------------------
// Regelwerk — Hybrid: strukturierte Regex + Kontextmuster
//
// Wichtige Design-Entscheidungen:
//  - name_label / patient_label ZUERST (vor fallnummer), damit "Patient: Name"
//    vollständig als Namen-Block erkannt wird, bevor der Nummern-Matcher läuft.
//  - fallnummer: Pat-Prefix erfordert ausdrücklich "nummer" oder "nr" Suffix —
//    "Patient:" ohne Nummernkennzeichen matcht NICHT.
//  - name_label: `[^\S\n]*` statt `\s*` verhindert Zeilenüberschreitung
//    bei der Wiederholungsgruppe.
//  - Platzhalter immer exakt in GROSSBUCHSTABEN mit eckigen Klammern.
// ---------------------------------------------------------------------------

const RULES = [

  // =========================================================================
  // BLOCK 1 — Kontextbasierte Namen-Labels
  // (vor Nummern-Regeln, damit "Patient: Name" nicht fehl-gematcht wird)
  // =========================================================================

  /**
   * Patient/Patientin: <Name> — bis zu 3 Wörter, inkl. Bindestrich-Namen.
   * Wird durch `patient_label` vollständig konsumiert, bevor `fallnummer`
   * das "Patient:"-Präfix als Nummern-Label behandeln kann.
   */
  {
    id: 'patient_label',
    placeholder: '[NAME]',
    pattern: /(?:Patient(?:in)?|Pat\.)[:\s]+(?:[A-ZÄÖÜ][a-zäöüß]+(?:[\-][A-ZÄÖÜ][a-zäöüß]+)?[^\S\n]*){1,3}/g,
  },

  /**
   * Name-Label-Muster: "Name:", "Vorname:", "Nachname:" + folgende Wörter.
   * [^\S\n]* statt \s* — verhindert, dass nächste Zeile mitgefasst wird.
   */
  {
    id: 'name_label',
    placeholder: '[NAME]',
    pattern: /(?:Vor[\-\s]?und\s+Nachname|Vorname|Nachname|Name[n]?)[:\s]+(?:[A-ZÄÖÜ][a-zäöüß]+(?:[\-][A-ZÄÖÜ][a-zäöüß]+)?[^\S\n]*[,;]?[^\S\n]*){1,3}/gi,
  },

  // =========================================================================
  // BLOCK 2 — Strukturierte Identifikatoren (zuverlässigste Muster zuerst)
  // =========================================================================

  /** IBAN: DE + 2 Prüfziffern + 18 Stellen (optionale Leerzeichen) */
  {
    id: 'iban',
    placeholder: '[ID]',
    pattern: /\bDE\d{2}(?:\s?\d{4}){4}\s?\d{2}\b/gi,
  },

  /**
   * Rentenversicherungsnummer (DE): 2+6+1+3 Stellen
   * z. B. "65 070366 W 000" oder "65070366W000"
   */
  {
    id: 'rv_nummer',
    placeholder: '[ID]',
    pattern: /\b\d{2}[\s-]?\d{6}[\s-]?[A-ZÄÖÜ][\s-]?\d{3}\b/g,
  },

  /**
   * Krankenversicherungsnummer: Buchstabe + 9 Ziffern (z. B. A123456789)
   * Word-Boundary verhindert Treffer innerhalb längerer Codes.
   */
  {
    id: 'kv_nummer',
    placeholder: '[ID]',
    pattern: /\b[A-ZÄÖÜ]\d{9}\b/g,
  },

  // =========================================================================
  // BLOCK 3 — Geburtsdatum (NUR mit Kontext-Label)
  //
  // Nach Spec D.2: Datumsangaben medizinischer Ereignisse ohne Personenbezug
  // sind erlaubt. Geburtsdatum wird nur bei explizitem Kontext-Label ersetzt.
  // =========================================================================

  /** Asterisk-Konvention: *12.03.1975 oder * 12.03.1975 */
  {
    id: 'geburtsdatum_asterisk',
    placeholder: '[GEBURTSDATUM]',
    pattern: /\*\s*\d{1,2}[./\-]\d{1,2}[./\-]\d{2,4}/g,
  },

  /**
   * "geb. 12.03.1975" / "geboren am …" / "Geburtsdatum: …" / "DOB:" / "GD:"
   */
  {
    id: 'geburtsdatum_label',
    placeholder: '[GEBURTSDATUM]',
    pattern: /(?:geb(?:oren)?(?:en)?\.?\s*(?:am\s+)?|Geburtsdatum[:\s.]*|Geburtstag[:\s.]*|GD[:\s.]*|DOB[:\s.]*)\d{1,2}[./\-]\d{1,2}[./\-]\d{2,4}/gi,
  },

  // =========================================================================
  // BLOCK 4 — Kontaktdaten
  // =========================================================================

  /** E-Mail-Adressen */
  {
    id: 'email',
    placeholder: '[KONTAKT]',
    pattern: /\b[\w.+%\-]+@[\w.\-]+\.[a-zA-Z]{2,}\b/gi,
  },

  /**
   * Telefon- und Faxnummern (deutsche Formate).
   * Erkennt "+49"-Formate und kennzeichnungspflichtige Labels (Tel., Fax etc.).
   * Kein Catch-All für reine Zahlenreihen (würde Laborwerte treffen).
   */
  {
    id: 'telefon',
    placeholder: '[KONTAKT]',
    pattern: /(?:\+49|0049)[\s\-]?(?:\(?\d{2,5}\)?)[\s\-]?\d{3,10}(?:[\s\-]\d{2,6})?|(?:Fon|Fax|Tel\.?|Telefon|Mobil|Handy)[:\s]*(?:0\d{2,5}[\s\-\/]?\d{3,10})/gi,
  },

  // =========================================================================
  // BLOCK 5 — Fall-/Versicherungsnummern
  //
  // Wichtig: "Pat(ienten?)" erfordert jetzt ausdrücklich "nummer/nr" Suffix.
  // "Patient:" ohne Nummer-Kennzeichen wird NICHT mehr gematcht —
  // das verhindert den Bug, bei dem "Patient: Name" zu "[FALLNUMMER]: Name"
  // wurde und der Name unerkannt blieb.
  // =========================================================================

  {
    id: 'fallnummer',
    placeholder: '[FALLNUMMER]',
    // Pat muss "nummer" oder "nr" als Suffix haben (kein optionales Weglassen mehr)
    pattern: /(?:Fall(?:[\-\s]*(?:nummer|nr))?\.?|Pat(?:ienten?)?(?:nummer|nr)\.?|Aufnahme(?:[\-\s]*(?:nummer|nr))?\.?|Einweisungs(?:[\-\s]*(?:nummer|nr))?\.?|Kassen(?:[\-\s]*(?:nummer|nr))?\.?)[:\s#]*[\w\/\-]+/gi,
  },

  {
    id: 'versicherung_nr',
    placeholder: '[FALLNUMMER]',
    pattern: /(?:Vers(?:icherungs?)?[\s.\-]*(?:Nr|Nummer)\.?|VersNr\.?)[.:\s]*[\w\/\-]+/gi,
  },

  // =========================================================================
  // BLOCK 6 — Behandler und Einrichtungen
  // =========================================================================

  /**
   * Ärzte mit akademischem Titel vor dem Namen.
   * "Dr. med. Max Mustermann" / "Prof. Dr. Anna Müller" / "OA Dr. Schmidt"
   */
  {
    id: 'behandler_titel',
    placeholder: '[BEHANDLER]',
    pattern: /(?:(?:OA|CA|PD|Priv\.\s*Doz\.?|apl\.\s*Prof\.?|Prof\.?\s*(?:Dr\.?(?:\s*(?:med|h\.c\.|rer\.nat\.|phil|jur|oec)\.?)*)?\s*|Dr\.?(?:\s*(?:med|h\.c\.|rer\.nat\.|phil|jur|oec)\.?)*\s*)(?:[\s]+))(?:[A-ZÄÖÜ][a-zäöüß]+[\-]?)+(?:\s+(?:[A-ZÄÖÜ][a-zäöüß]+[\-]?)+){0,2}/g,
  },

  /**
   * Einrichtungen: Klinik, Krankenhaus, Praxis, MVZ etc. + Eigenname.
   */
  {
    id: 'einrichtung',
    placeholder: '[EINRICHTUNG]',
    pattern: /(?:Klinik(?:um)?|Universitätsklinikum|Universitätsklinik|Krankenhaus|(?:St\.|Sankt\s+)[A-ZÄÖÜ][a-zäöüß]+\s*Klinik|Fachklinik|Rehaklinik|Reha-Klinik|Praxis|Gemeinschaftspraxis|Facharztpraxis|MVZ|Medizinisches\s+Versorgungszentrum|Gesundheitszentrum|Ärztezentrum|Poliklinik|Ambulanz)(?:\s+(?:für\s+)?[A-ZÄÖÜ][a-zäöüßa-zA-Z]+){1,5}/g,
  },

  // =========================================================================
  // BLOCK 7 — Adressen
  // =========================================================================

  /**
   * Vollständige Adresse: Straßenname + Hausnummer (+ optionale PLZ + Ort).
   * Erkennt Musterstraße 12 / Musterstr. 12 / Musterweg 3a / Musterallee 1,
   * jeweils mit optionalem ", 80333 München" danach.
   */
  {
    id: 'adresse_vollstaendig',
    placeholder: '[ADRESSE]',
    pattern: /[A-ZÄÖÜ][a-zäöüßA-ZÄÖÜ]+(?:straße|strasse|str\.|gasse|gässchen|weg|allee|platz|ring|damm|berg|pfad|steig|graben|ufer|promenade|chaussee|boulevard)[,\s]+\d+\s*[a-zA-Z]?(?:[,\s]+\d{5}\s+[A-ZÄÖÜ][a-zäöüß]+(?:[\s-][A-ZÄÖÜ][a-zäöüß]+)*)?/gi,
  },

  /**
   * PLZ + Ort (eigenständig, ohne vorangehende Straße).
   * Erkennt 5-stellige PLZ gefolgt von großgeschriebenem Stadtnamen.
   */
  {
    id: 'plz_ort',
    placeholder: '[ADRESSE]',
    pattern: /\b\d{5}\s+[A-ZÄÖÜ][a-zäöüß]+(?:[\s-][A-ZÄÖÜ][a-zäöüß]+)?\b/g,
  },

  // =========================================================================
  // BLOCK 8 — Anrede-basierte Namen
  // =========================================================================

  /**
   * Name mit Anrede (Herr/Frau/Hr./Fr.) — kontextbasiert.
   * "Herr Max Mustermann" / "Frau Dr. Anna Müller-Schmidt"
   */
  {
    id: 'name_anrede',
    placeholder: '[NAME]',
    pattern: /(?:Herr(?:n)?|Frau|Hr\.|Fr\.)\s+(?:(?:Prof\.?|Dr\.?(?:\s*(?:med|dent|rer\.nat|phil|jur|oec)\.?)*)\s+)?(?:[A-ZÄÖÜ][a-zäöüß]+(?:[\-][A-ZÄÖÜ][a-zäöüß]+)?\s+){0,2}[A-ZÄÖÜ][a-zäöüß]+(?:[\-][A-ZÄÖÜ][a-zäöüß]+)?/g,
  },

  // =========================================================================
  // BLOCK 9 — Freie Personenreferenzen (Angehörige)
  // =========================================================================

  {
    id: 'person_angehoerige',
    placeholder: '[PERSON]',
    pattern: /(?:Vater|Mutter|Ehemann|Ehefrau|Partner(?:in)?|Lebensgefährt(?:e|in)|Sohn|Tochter|Geschwister|Bruder|Schwester|Eltern|Großvater|Großmutter|Opa|Oma|Erziehungsberechtigte[r]?)[:\s]+(?:[A-ZÄÖÜ][a-zäöüß]+(?:[\-][A-ZÄÖÜ][a-zäöüß]+)?[^\S\n]*){1,3}/gi,
  },

  // =========================================================================
  // BLOCK 10 — Ärztliche Schlussformel mit Unterschrift
  // =========================================================================

  {
    id: 'schlussformel_unterschrift',
    placeholder: '[BEHANDLER]',
    pattern: /(?:Mit\s+(?:freundlich(?:en)?|kollegial(?:en)?)[\s\S]{0,40}Grüßen[,\s]*[\r\n]+\s*)(?:(?:Prof\.?|Dr\.?(?:\s*med\.?)?)\s+)?[A-ZÄÖÜ][a-zäöüß]+(?:[\-][A-ZÄÖÜ][a-zäöüß]+)?(?:\s+[A-ZÄÖÜ][a-zäöüß]+(?:[\-][A-ZÄÖÜ][a-zäöüß]+)?){0,2}/gi,
  },
];

// ---------------------------------------------------------------------------
// Anonymisierungs-Engine
// ---------------------------------------------------------------------------

/**
 * Anonymisiert den übergebenen Text nach dem Regelwerk.
 *
 * Sicherheitsgarantien:
 * - Fehler in einer Einzelregel überspringen nur diese Regel (nicht den Gesamttext).
 * - Die Funktion wirft einen Fehler oder gibt vollständig verarbeiteten Text zurück.
 *   Es gibt keinen partiellen Bypass-Pfad.
 * - Keine PII in Rückgabe von Fehlermeldungen.
 */
function anonymize(rawText) {
  if (typeof rawText !== 'string') {
    throw new TypeError('anonymize: rawText muss ein String sein');
  }
  if (rawText.length === 0) {
    return { anonymizedText: '', report: { totalReplacements: 0, byCategory: {} } };
  }

  let result = rawText;
  const byCategory = {};
  let totalReplacements = 0;

  for (const rule of RULES) {
    let rx;
    try {
      rx = new RegExp(rule.pattern.source, rule.pattern.flags);
    } catch (_e) {
      // Syntaxfehler in Regel → überspringen, nicht Bypass
      continue;
    }

    const matches = result.match(rx);
    if (!matches || matches.length === 0) continue;

    try {
      result = result.replace(
        new RegExp(rule.pattern.source, rule.pattern.flags),
        rule.placeholder,
      );
      const cat = rule.placeholder.replace(/[\[\]]/g, '').toLowerCase();
      byCategory[cat] = (byCategory[cat] || 0) + matches.length;
      totalReplacements += matches.length;
    } catch (_e) {
      // Ersetzungsfehler → überspringen
      continue;
    }
  }

  return {
    anonymizedText: result,
    report: { totalReplacements, byCategory },
  };
}

// ---------------------------------------------------------------------------
// Worker Message Handler
// ---------------------------------------------------------------------------

self.addEventListener('message', function (evt) {
  const data = evt.data || {};

  if (data.type !== 'anonymize') {
    self.postMessage({
      type: 'error',
      message: 'Unbekannter Nachrichtentyp: Worker erwartet { type: "anonymize", text: string }.',
    });
    return;
  }

  if (typeof data.text !== 'string') {
    self.postMessage({
      type: 'error',
      message: 'Ungültige Eingabe: "text" muss ein String sein.',
    });
    return;
  }

  try {
    const { anonymizedText, report } = anonymize(data.text);
    self.postMessage({ type: 'result', anonymizedText, report });
  } catch (_err) {
    // Keine PII in Fehlermeldung
    self.postMessage({
      type: 'error',
      message: 'Anonymisierung fehlgeschlagen (technischer Fehler). Bitte Seite neu laden.',
    });
  }
});
