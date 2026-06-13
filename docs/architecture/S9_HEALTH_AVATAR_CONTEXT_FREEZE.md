# S9 Health Avatar Context Freeze
## Mein Gesundheitsavatar / Mein Gesundheitskontext

**Status:** FREEZE — Read-only
**Datum:** 13.05.2026
**Paket:** S9-HEALTH-AVATAR-CONTEXT-FREEZE
**Phase:** Architektur-Strategie (vor Phase D Build)
**Voraussetzung geprüft:** `AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md` ✅ · `S3_SCHEMA_MIGRATION_APPLY_CLOSURE.md` ✅

> **Kein Build. Kein Code. Kein DB-Write. Kein Commit ohne explizite Freigabe.**

---

## 1. Kurzverdikt

VitalWissen braucht „Mein Gesundheitsavatar" als Kernkonzept ab Phase D — nicht als Feature, sondern als Voraussetzung für sinnvolle Personalisierung. Ohne persistierten Nutzerkontext bleibt jede Plattforminteraktion episodisch und generisch. Der Avatar ist der Speicher, der aus wiederholtem Nachschlagen echten Nutzen macht.

Das Konzept ist umsetzbar, aber nicht trivial. Die entscheidenden Fragen sind nicht technisch, sondern architektonisch und rechtlich: Wo liegen die Daten? Wer darf sie sehen? Was passiert bei externem KI-Einsatz? Wie werden veraltete Informationen erkannt und aktualisiert?

**Verdikt:** Alle 19 Zu-klären-Fragen beantwortet. Profiltypen, Einwilligungsmodell, Datenhaltung, Update-Logik und KI-Grenze sind hiermit bindend eingefroren. Phase-D-Build-Freigabe erfordert separaten Chat und explizite Freigabe.

---

## 2. Produktthese

VitalWissen wird durch den Gesundheitsavatar von einer generischen Nachschlageseite zu einem persönlichen Gesundheitsbegleiter.

**These:** Die meisten Gesundheitsportale geben dieselben Informationen an alle. VitalWissen gibt die richtigen Informationen für jemanden mit Typ-2-Diabetes, Ferritin-Mangel und einem 7-jährigen Kind, das Schilddrüsenprobleme hat — weil VitalWissen diesen Kontext kennt und behält.

**Konkret:** Ein Nutzer gibt einmal an, dass er Metformin nimmt und Vitamin D erhöhen will. VitalWissen zeigt ihm seitdem bei jedem Supplement-Block automatisch die Metformin-Interaktion. Ohne Avatar: Nutzer muss das jedes Mal neu denken. Mit Avatar: VitalWissen denkt es für ihn.

Das ist kein Versprechen für Phase A–C. Es ist die architektonische Begründung, warum S9 in Phase D gebaut wird — nicht als Ergänzung, sondern als Fundament für Q7 (Personalisierung), Q9 (BYO-AI) und B5 (Mein Gesundheitsraum).

---

## 3. Warum Gesundheitsavatare zentraler Mehrwert sind

### 3.1 Das Generizitätsproblem

Ohne persistierten Kontext ist jede Nutzersitzung auf VitalWissen ein Reset. Der Nutzer weiß, wer er ist — VitalWissen weiß es nicht. Dasselbe Laborwert-Ergebnis ist bei einem 45-jährigen Diabetiker anders einzuordnen als bei einer gesunden 25-Jährigen. Ohne Avatar: VitalWissen kann nicht differenzieren.

### 3.2 Das Kontextproblem bei KI-Nutzung

Nutzer, die ihre Gesundheitsfragen an externe KI-Systeme (ChatGPT, Gemini) stellen, müssen ihren Kontext jedes Mal neu eingeben — oder sie tun es nicht, und erhalten generische Antworten. VitalWissen kann diesen Kontext als strukturierter, vertrauenswürdiger Layer bereitstellen. Das ist der Kernwert von Q9 (BYO-AI): nicht VitalWissen als KI, sondern VitalWissen als Kontext-Lieferant für die KI des Nutzers.

### 3.3 Das Familienproblem

Gesundheitsmanagement ist selten individuell. Eltern verwalten die Gesundheit ihrer Kinder. Erwachsene Kinder übernehmen Verantwortung für ihre Eltern. Partner koordinieren gemeinsame Medikamentenpläne. Ohne Mehrfachprofil-Konzept muss VitalWissen entweder mehrere Einzelaccounts anbieten (Kontextverlust) oder gar keine Personalisierung (Nutzwertverlust).

### 3.4 Das Update-Problem

Laborwerte, Diagnosen, Medikamentenpläne ändern sich. Eine Diagnose aus 2023 ist möglicherweise 2025 revidiert. Eine neue Leitlinie ändert die Zielwerte. Ein neues Supplement ist jetzt mit einem Medikament interagierend. Ohne Avatar gibt es kein Objekt, das diese Änderungen in Bezug auf den Nutzer einordnen kann. Mit Avatar kann VitalWissen sagen: „Diese neue Leitlinie betrifft dich direkt."

### 3.5 Phase-D-Relevanz: Infrastruktur, nicht Feature

Der Avatar ist nicht ein Feature unter vielen — er ist die Infrastruktur für:
- **Q7** (Personalisierungs-Layer): setzt S9 voraus
- **Q9** (BYO-AI-Kontext-Export): setzt strukturierten Nutzerkontext voraus
- **B5** (Mein Gesundheitsraum): ist das externe Produkt, das S9 sichtbar macht
- **Q4/Q5** (Update-Layer / Watchlists): maximaler Nutzen nur mit Avatar-Kontext

---

## 4. Begriffsklärung

| Begriff | Definition im VitalWissen-Kontext |
|---|---|
| **Gesundheitsavatar** | Persistiertes digitales Profil einer Person mit gesundheitsrelevantem Kontext (Diagnosen, Laborwerte, Medikamente, Supplements, Watchlists) |
| **Gesundheitskontext** | Der aktive, sessiongebundene Ausschnitt des Avatars, der eine Interaktionssitzung beeinflusst (kann ohne persistierten Avatar auch manuell eingegeben werden) |
| **K11** | Kernobjekt „Persönlicher Gesundheitsdatensatz" gemäß P7D Architecture Reset Freeze — das strukturelle Datenmodell hinter dem Avatar |
| **S9** | Interne Säule „Health Data Hub" — die technische Infrastruktur für K11 (Phase D) |
| **B5** | Externes Produktbereich „Mein Gesundheitsraum" — die nutzerseitige Oberfläche von S9 |
| **Profiltyp** | Klassifikation eines Avatars nach Beziehung zum Accountinhaber (Eigen, Kind, Elternteil, Betreuter, Partner, Temporär) |
| **Hauptprofil** | Der Avatar des Accountinhabers selbst — immer vorhanden, immer primär |
| **Fremdprofil** | Ein Avatar einer anderen Person, die der Accountinhaber (mit Einwilligung) verwaltet |
| **Einwilligung (Consent)** | Aktive, dokumentierte Zustimmung einer einwilligungsfähigen Person zur Profilverwaltung durch den Accountinhaber |
| **Vollmacht** | Rechtliche Vertretungsbefugnis (z.B. Eltern für Kinder unter 18, Betreuer mit Vorsorgevollmacht) — ersetzt die Einwilligung der vertretenen Person |
| **Temporärprofil** | Kurzfristiger Kontext ohne Persistenz (z.B. für Arztgespräch-Vorbereitung für einen Besuch), der nach der Session automatisch gelöscht wird |
| **KI-Prompt-Export** | Nutzerinitiierter Export des eigenen Kontexts als strukturierter Text zur Nutzung in externen KI-Systemen (Phase C, ohne S9) |

---

## 5. Profiltypen und Mehrfachprofile

### 5.1 Übersicht Profiltypen

| Typ | Bezeichnung | Basis-Legitimation | Datenpersistenz | Limit |
|---|---|---|---|---|
| **P1** | Eigenprofil | Account-Inhaberschaft | Server (E2E) | 1 pro Account |
| **P2** | Kinderprofil | Elterliche Vertretung (Vollmacht kraft Gesetz bis 18) | Server (E2E) | 3 pro Account |
| **P3** | Elternprofil | Einwilligung + opt. Vollmacht (Vorsorgevollmacht) | Server (E2E) | 2 pro Account |
| **P4** | Betreutes Profil | Amtliche Betreuung / Vorsorgevollmacht | Server (E2E) | 2 pro Account |
| **P5** | Partnerprofil | Gegenseitige Einwilligung (bidirektional) | Server (E2E) | 1 pro Account |
| **P6** | Temporärprofil | Kein Einwilligungsnachweis erforderlich | Nur lokal/Session | Unbegrenzt |

**Gesamtlimit:** Maximal 9 persistierte Fremdprofile pro Account (P2+P3+P4+P5). Begründung: operativer Komplexitätsrahmen, nicht technische Schranke.

### 5.2 Kinderprofil (P2) — Sonderregeln

- Elterliche Verwaltung ist **kraft Gesetzes legitim** (§ 1629 BGB), kein gesonderter Einwilligungsnachweis erforderlich
- Bei getrennt lebenden Eltern: Beide erhalten auf Wunsch Lesezugriff; Schreibrecht bleibt bei erstellendem Elternteil
- **Übergang Volljährigkeit (18. Geburtstag):** Avatar geht automatisch in P1-Eigenprofil des Kindes über (separater Account). Daten werden nicht automatisch gelöscht — Nutzer entscheidet.
- Gesundheitsdaten von Minderjährigen: erhöhte Schutzpflicht. Keine Drittnutzung, keine KI-Weitergabe, kein Export ohne explizite Eltern-Freigabe (DSGVO Art. 8 + Art. 9).

### 5.3 Eltern-/Betreuten-Profil (P3/P4) — Sonderregeln

- **P3 ohne Vollmacht:** Nur lesender Kontext (Diagnosen, Medikamente). Kein Schreiben ohne ausdrückliche Einwilligung.
- **P3/P4 mit Vollmacht:** Vollständiges Schreibrecht. Vollmachts-Nachweis: selbst-deklaratorisch (keine Verifikation durch VitalWissen — Verantwortung liegt beim Nutzer, DSGVO-konform).
- Widerruf: Einwilligung oder Vollmacht jederzeit durch die betroffene Person oder durch Accountinhaber widerrufbar.

### 5.4 Partnerprofil (P5) — Sonderregeln

- **Bidirektional opt-in:** Beide Partner müssen aktiv zustimmen. Kein einseitiges Anlegen möglich.
- Geteilte Ansicht: nur Felder, die der jeweilige Partner zur Teilung freigegeben hat (granulare Feldfreigabe, Phase D Detailspec).
- Trennung: Gegenseitige Profile werden bei Widerruf sofort voneinander getrennt. Keine gemeinsame Datenhaltung — jede Person hat nur eigene Kopie.

### 5.5 Temporärprofil (P6) — Sonderregeln

- Kein Login erforderlich (wenn Hauptaccount nicht eingeloggt)
- Kein Server-Write: alles im Browser-Speicher (sessionStorage, nicht localStorage)
- Automatische Löschung: bei Tab-Schließung oder manuell
- Keine Crosslink-Aktivierung von personalisierten Q7-Layern
- Verwendungszweck: schnelle Kontexteingabe für Arztgespräch-Vorbereitung, Eltern die kurz nachschlagen, Pflegepersonal in akuter Situation

### 5.6 Zu-klären ZK-01 (beantwortet): Eigenes Profil vs. Fremdprofile

**Frage:** Wie klar muss die Trennung zwischen eigenem Profil und Fremdprofilen sein?

**Antwort:** Maximal klar. Jedes Fremdprofil trägt dauerhaft einen Typ-Indikator (Kinderprofil / Elternprofil / Partner / Betreuter / Temporär). Der Kontext-Switch ist eine explizite Nutzeraktion (kein automatischer Wechsel). Alle Aktionen (Schreiben, Exportieren, KI-Übergabe) zeigen prominent den aktiven Profil-Typ an.

---

## 6. Einwilligungs- und Berechtigungsmodell

### 6.1 Grundprinzip

Jeder Datenpunkt in einem Fremdprofil ist einer Legitimationsbasis zugeordnet. Ohne dokumentierte Basis kein Write-Zugriff. Dieses Prinzip gilt für alle Profiltypen außer P1 (Eigenprofil).

### 6.2 Legitimationsbases

| Basis | Code | Anwendung | Verifikation durch VW |
|---|---|---|---|
| Gesetzliche Vertretung | LB-1 | Eltern für Kinder (P2) | Nein (selbst-deklaratorisch) |
| Einwilligung (aktiv) | LB-2 | P3 ohne Vollmacht, P5 | Digitaler Consent-Flow |
| Vollmacht (selbst-deklariert) | LB-3 | P3 mit Vollmacht, P4 | Nein (Verantwortung beim Nutzer) |
| Keine Basis (Session only) | LB-0 | P6 Temporärprofil | Nicht anwendbar |

**Wichtig:** VitalWissen verifiziert keine Vollmachten rechtlich. Dies ist DSGVO-konform: die Verantwortung für die Richtigkeit der Vollmacht liegt beim Datenverarbeiter (Nutzer), nicht bei der Plattform. VitalWissen dokumentiert die Selbstdeklaration.

### 6.3 Consent-Flow für P3 (Einwilligung ohne Vollmacht) und P5

1. Accountinhaber gibt E-Mail-Adresse der zustimmenden Person an
2. VitalWissen sendet Einwilligungslink (tokenbasiert, 7-Tage-Ablauf)
3. Zustimmende Person klickt, verifiziert ihre E-Mail, wählt Umfang der Freigabe
4. Consent wird mit Timestamp + Scope in Profil gespeichert
5. Widerruf: jederzeit durch beide Parteien über eigenen Widerruf-Link

### 6.4 Berechtigungsmatrix

| Aktion | P1 Eigen | P2 Kind | P3 Eltern (ohne V.) | P3/P4 (mit V.) | P5 Partner | P6 Temp |
|---|---|---|---|---|---|---|
| Profil anlegen | ✅ | ✅ | ✅ (nach Consent) | ✅ | ✅ (bidirektional) | ✅ (lokal) |
| Lesen | ✅ | ✅ | ✅ | ✅ | ✅ (freigegeben) | ✅ (Session) |
| Schreiben | ✅ | ✅ | ❌ | ✅ | ✅ (eigene Felder) | ✅ (Session) |
| KI-Prompt-Export | ✅ | ✅ (Eltern) | ❌ | ✅ | ❌ | ❌ |
| Watchlist-Aktivierung | ✅ | ✅ (Eltern) | ❌ | ✅ | ✅ | ❌ |
| Profil löschen | ✅ | ✅ | Widerruf | Widerruf | Widerruf | Auto |
| Daten-Export (DSGVO) | ✅ | ✅ (Eltern) | ❌ | ✅ | Nur eigene Daten | ❌ |

### 6.5 Zu-klären ZK-02 (beantwortet): Einwilligung bei Betreuung

**Frage:** Was gilt, wenn die betreute Person nicht mehr einwilligungsfähig ist?

**Antwort:** Bei P4 (amtliche Betreuung / Vorsorgevollmacht) ersetzt die Vollmacht die Einwilligung vollständig. VitalWissen verweist in der UI auf die rechtliche Eigenverantwortung des Nutzers. Eine Überprüfung der Einwilligungsfähigkeit durch VitalWissen ist nicht möglich und nicht geplant.

### 6.6 Zu-klären ZK-03 (beantwortet): Widerrufsmechanismus

**Frage:** Wie wird Einwilligung widerrufen, wenn beide Parteien keinen Zugang mehr haben?

**Antwort:** Jede Einwilligung enthält einen unveränderlichen Widerruf-Token, der per E-Mail an die zustimmende Person gesendet wird. Dieser Token ermöglicht Widerruf ohne Login. Danach werden alle Freigaben sofort gesperrt; Profil-Daten bleiben bis zur expliziten Löschanforderung erhalten (DSGVO-Datensparsamkeit vs. DSGVO-Recht auf Löschung — gelöst durch 30-Tage-Retention nach Widerruf mit anschließender Auto-Löschung, wenn keine Reaktivierung).

---

## 7. Datenhaltungsmodell (lokal vs. server-seitig)

### 7.1 Entscheidungsprinzip

| Datenkategorie | Haltungsort | Begründung |
|---|---|---|
| Eigenprofil (P1) | Server (E2E) | Persistenz über Geräte, FHIR-Basis für Phase D |
| Fremdprofile (P2–P5) | Server (E2E) | Persistenz, Zugriff für legitimierte Personen |
| Temporärprofil (P6) | Browser (sessionStorage) | Keine Persistenzanforderung, kein Server-Risk |
| Watchlist-Abonnements | Server (E2E) | Q5-Integration erfordert Server-Side-State |
| KI-Prompt-Export-Entwürfe | Client-Only | Vorbereitungsschritt; kein Server-Write bis explizit gespeichert |
| Arztbrief-Uploads (S4) | Kein Server-Write | E07/E08 bindend — Zero Retention |

### 7.2 Server-Architektur (bindend für Phase D)

- **Server-Standort:** DE/EU (E11-konform, SICHER)
- **Verschlüsselung at rest:** AES-256 (E10-konform)
- **Verschlüsselung in transit:** TLS 1.3
- **Key Management:** Nutzer-kontrollierte Keys (E10: E2E-Anforderung) — bedeutet: VitalWissen selbst kann ohne Nutzer-Schlüssel nicht auf Klartextdaten zugreifen
- **Zugriffsmodell:** Zero-Knowledge-Prinzip für Klartextgesundheitsdaten
- **FHIR R4:** Standardisiertes Datenformat für medizinische Kernobjekte (E09-konform, Phase D Planungsprinzip)

### 7.3 Zu-klären ZK-04 (beantwortet): Offline-Szenarien

**Frage:** Was passiert, wenn Nutzer ohne Internetverbindung auf Gesundheitsdaten zugreifen wollen?

**Antwort:** Phase D MVP: kein Offline-Modus. Nur P6-Temporärprofile sind offline nutzbar (sessionStorage). Für persistierte Profile (P1–P5): Seite zeigt „Offline nicht verfügbar"-State, kein Caching von verschlüsselten Gesundheitsdaten im Browser. Rationale: Offline-Caching verschlüsselter Daten erhöht Attack Surface erheblich; MVP-Scope lässt dies aus.

### 7.4 Zu-klären ZK-05 (beantwortet): Gerätesynchronisation

**Frage:** Wie funktioniert Sync zwischen mehreren Geräten?

**Antwort:** Server-Side-State ist per Definition geräteübergreifend (kein lokaler Sync erforderlich). Alle Geräte fetchen denselben E2E-verschlüsselten Server-State. Key-Management-Implikation: Nutzer-Keys müssen geräteübergreifend zugänglich sein (Keychain / Passphrase-Derivation, Phase D Detailspec). Kein proprietäres Sync-Protokoll — Standard HTTPS + JWT.

### 7.5 Zu-klären ZK-06 (beantwortet): Datenlöschung und Portabilität

**Frage:** Wie werden DSGVO Art. 17 (Recht auf Löschung) und Art. 20 (Datenportabilität) erfüllt?

**Antwort:**
- **Löschung:** Account-Löschung löscht alle Server-seitigen Schlüssel und damit alle Klartextdaten (technisch irreversibel). Fremdprofile werden bei Widerruf nach 30 Tagen gelöscht (Retention-Window für Neuverknüpfung).
- **Portabilität:** FHIR R4-Export als Pflicht-Feature (DSGVO Art. 20). Nutzer kann alle K11-Daten als strukturierte FHIR-Datei herunterladen. Format: FHIR R4 JSON Bundle.

---

## 8. Datenkategorien und Klassifikation

### 8.1 Datenklassen-Mapping (aus AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md)

| Klasse | Inhalt | Externe KI | KI-Prompt-Export |
|---|---|---|---|
| **1** | Allgemeine Plattformnutzung (anonymisiert) | ✅ erlaubt | n/a |
| **2** | Opt-in Nutzerpräferenzen (Watchlists, Seitenpräferenzen, keine Diagnosen) | ✅ erlaubt | ✅ erlaubt |
| **3** | Persönliche Gesundheitsdaten (Diagnosen, Laborwerte, Medikamente, Supplements) | ❌ blockiert | ✅ mit explizitem opt-in pro Session |
| **4** | Hochsensible Dokumente (Arztbriefe, Befunde mit PII) | ❌ strukturell blockiert (E07/E08) | ❌ nie |
| **5** | Wearable-/Messdaten (Schlafdaten, Herzfrequenz, Körpergewicht-Verlauf) | ❌ blockiert | ✅ mit explizitem opt-in pro Session (Phase D/E) |

### 8.2 Avatar-Inhaltskategorien (K11-Felder)

| Kategorie | Datenklasse | FHIR R4 Ressource | Pflicht/Optional |
|---|---|---|---|
| Diagnosen (ICD-10) | 3 | `Condition` | Optional |
| Laborwerte (LOINC) | 3 | `Observation` | Optional |
| Medikamente (ATC) | 3 | `MedicationStatement` | Optional |
| Supplements | 3 | `NutritionIntake` (custom) | Optional |
| Allergien / Unverträglichkeiten | 3 | `AllergyIntolerance` | Optional |
| Watchlist-Abonnements | 2 | n/a (VW-intern) | Optional |
| Arztbriefe (strukturiert) | 4 | `DocumentReference` | Optional, Zero Retention |
| Impfstatus | 3 | `Immunization` | Optional |
| Grundlegende Stammdaten (Geburtsjahr, Geschlecht) | 3 | `Patient` | Optional (für Kontextualisierung) |
| Ernährungsmuster | 3 | `NutritionIntake` | Optional |
| Wearable-Daten | 5 | `Observation` (vital-signs) | Phase D/E |

### 8.3 Minimalset für sinnvolle Personalisierung (Q7)

Für Q7 benötigt VitalWissen mindestens: **1 Diagnose ODER 1 Laborwert ODER 1 Medikament**. Mit weniger ist keine meaningful Personalisierung möglich — Platform zeigt dann Standardview ohne Avatar-Einfluss.

### 8.4 Zu-klären ZK-07 (beantwortet): Datenpräzision vs. Einfachheit

**Frage:** Wie präzise müssen Diagnosen sein (ICD-Code vs. Freitext)?

**Antwort:** Dual-Input-Modell: Nutzer gibt Freitext ein (z.B. „Bluthochdruck"), VitalWissen mappt auf ICD-Code mit Bestätigungs-Schritt. Mapping-Confidence wird angezeigt. Kein Zwang zu ICD-Code-Eingabe, aber nur ICD-gemappte Diagnosen aktivieren Cross-Features (Q7, Crosslinks, Update-Alerts). Freitext-Diagnosen ohne ICD-Mapping bleiben als Notiz gespeichert, ohne Crosslink-Funktion.

---

## 9. Update-Logik (neue Studien / Leitlinien / Zulassungen)

### 9.1 Problemstellung

Ein Avatar ist nur dann wertvoll, wenn seine Gesundheitsdaten mit der aktuellen wissenschaftlichen Lage abgeglichen werden. Ohne Update-Logik wird der Avatar zur statischen Datei.

### 9.2 Drei Typen von Avatar-relevanten Updates

| Update-Typ | Auslöser | Avatar-Relevanz-Check | Nutzer-Notification |
|---|---|---|---|
| **U1 — Neue Leitlinie** | Neues Dokument in S5/S6-Quellen (Q4-Layer) | ICD-Code des Updates ∈ Nutzer-Diagnosen? | Q4-Alert + B5-Hinweis |
| **U2 — Neuer Laborwert-Zielwert** | S1-Update (neue Referenzwerte) | LOINC-Code ∈ Nutzer-Laborwerte? | Q4-Alert + S1-Detailseite-Kontext |
| **U3 — Neue Studienlage** | S3-Curation (neue K6-Einträge) | ICD-Code ∈ Nutzer-Diagnosen ODER Supplement ∈ Nutzer-Supplements? | Q5-Watchlist-Alert (wenn abonniert) |
| **U4 — Neue Zulassung / Marktveränderung** | S6-Update (neue Wirkstoffe, Rückrufe) | Wirkstoff ∈ Nutzer-Medikamente? | Q4-Alert (HOCH — Sicherheitsrelevant) |
| **U5 — Neue Interaktion entdeckt** | S6-Update (neue Supplement-Medikament-Interaktion) | Wirkstoff ∈ Nutzer-Medikamente UND Supplement ∈ Nutzer-Supplements? | Q4-Alert (HOCH — Sicherheitsrelevant) |

### 9.3 Avatar-Relevanz-Check-Mechanismus

Der Avatar-Relevanz-Check ist ein server-seitiger Abgleich zwischen:
- Dem Update-Objekt (ICD-Code, LOINC-Code, ATC-Code, Supplement-Slug)
- Den gespeicherten Profil-Feldern (Diagnosen, Laborwerte, Medikamente, Supplements)

Dieser Check wird **nicht real-time** (bei jedem Update) ausgeführt, sondern **batch-artig** (tägliche Auswertung bei Phase D MVP). Ergebnis: Liste von Alert-IDs per Profil-ID.

### 9.4 Priorisierung der Updates

| Priorität | Kriterium | Notification-Kanal |
|---|---|---|
| **KRITISCH** | Sicherheitsrelevant (Rückruf, neue gefährliche Interaktion, U4/U5) | Push + E-Mail + In-App-Banner |
| **HOCH** | Neue Leitlinie für aktive Diagnose | In-App-Alert |
| **MITTEL** | Neue Studie für Watchlist-Objekt | In-App-Badge |
| **NIEDRIG** | Neue Studie für verwandte Objekte | Wochendigest |

### 9.5 Kein automatisches Überschreiben

Avatar-Daten werden durch Updates **nie automatisch überschrieben**. Ein neuer Laborwert-Zielwert ändert nicht die gespeicherten Nutzer-Laborwerte. Updates sind immer nur Hinweise, keine Mutations. Der Nutzer entscheidet über Aktualisierung seiner Avatar-Daten.

### 9.6 Zu-klären ZK-08 (beantwortet): Veraltete Avatar-Daten

**Frage:** Was passiert, wenn Nutzer Daten nicht aktualisiert (veraltete Diagnose, abgesetzte Medikamente)?

**Antwort:** VitalWissen zeigt bei Daten, die älter als 12 Monate sind, einen „Daten prüfen"-Badge an. Kein Zwang zur Aktualisierung. Veraltete Daten bleiben wirksam (kein Auto-Deaktivieren), da die Alternative (stille Deaktivierung ohne Nutzeraktion) zu False-Negatives bei Personalisierung führt — gefährlicher als veraltete Daten mit Hinweis. Für Medikamente: 6-Monate-Schwelle (medizinisch sensitiver).

### 9.7 Zu-klären ZK-09 (beantwortet): Update-Relevanz für Fremdprofile

**Frage:** Erhalten Accountinhaber Updates für Fremdprofile?

**Antwort:** Ja, für P2 (Kinder) und P4 (Betreute, mit Vollmacht). Update-Alerts werden an den Accountinhaber zugestellt, jedoch mit klarem Profil-Label. Für P3 (Eltern, ohne Vollmacht, nur Lesen): keine Update-Alerts. Für P5 (Partner): nur Updates für freigegebene Felder des Partnerkontos.

---

## 10. KI-Schnittstellen-Grenze

### 10.1 Grundsatz

Aus `AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md` bindend übernommen:
> Datenklassen 3–5 dürfen externe KI-Systeme nur mit **explizitem opt-in pro Session** erreichen. Klasse 4 (Arztbriefe) ist strukturell blockiert — E07/E08 sind permanent.

### 10.2 KI-Modi für Avatar-Daten

| Modus | Beschreibung | Avatar-Datenklassen | Phase |
|---|---|---|---|
| **KI-Modus 1** | Schnellantwort ohne Avatar-Kontext | Nur Klasse 1 | Jetzt (A–C) |
| **KI-Modus 2** | Tiefen-Trustansicht (VitalWissen eigene Inhalte) | Klasse 1+2 | Jetzt (A–C) |
| **KI-Modus 3a** | KI-Prompt-Export (manuell, Phase C) | Klasse 2+3 (opt-in) | Phase C |
| **KI-Modus 3b** | Direkte API-Übergabe an Nutzer-eigene KI (Q9) | Klasse 2+3 (opt-in, pro Session) | Phase D/E |
| **KI-Modus 4** | Gemini/Google Health API Integration | Klasse 2+3 (opt-in + DPA + Legal Review) | Phase D/E |

### 10.3 KI-Prompt-Export (Phase C) — Bindende Spezifikation

**Was exportiert wird:**
- Diagnosen (ICD-Codes + Klarnamen)
- Aktive Laborwerte mit Referenzbereichen
- Medikamentenliste (Wirkstoffe, Klassen)
- Supplement-Liste
- Watchlist-Abonnements
- Metadaten: Erstellt am, zuletzt aktualisiert

**Was nie exportiert wird:**
- Arztbrief-Inhalte (Klasse 4 — absolutes Verbot)
- Wearable-Rohdaten (Klasse 5 — Phase D/E Entscheidung offen)
- Biometrische Identifikatoren
- Kontodaten, Zahlungsinformationen
- Fremdprofile (jedes Profil exportiert nur sich selbst)

**Export-Format:** Strukturierter Text mit klar benannten Abschnitten (nicht FHIR — KI-lesbar, kein XML). Empfohlener Textblock für Copy-Paste in externe KI.

**Opt-in-Mechanismus:**
1. Nutzer klickt „Kontext für KI vorbereiten"
2. Vorschau: alle zu exportierenden Felder sichtbar
3. Granulare Abwahl möglich (z.B. Medikamente abwählen)
4. Erzeugter Text wird angezeigt + Copy-Button
5. Kein Server-Write des Export-Textes (nur client-seitig generiert)
6. Opt-in gilt nur für diese Session

### 10.4 Zu-klären ZK-10 (beantwortet): Sicherheit bei KI-Prompt-Export

**Frage:** Wie wird verhindert, dass exportierter Text unkontrolliert weiterverbreitet wird?

**Antwort:** VitalWissen kann das nicht technisch verhindern (Text liegt im Clipboard des Nutzers). Die Antwort ist Transparenz statt Kontrolle: klarer Hinweis bei Export, dass der Nutzer ab diesem Zeitpunkt für den Verbleib der Daten verantwortlich ist. Wasserzeichen im Text (Timestamp + Account-Hash, nicht PII) für eventuelle Rückverfolgbarkeit. Kein DRM.

### 10.5 Zu-klären ZK-11 (beantwortet): Automatische Kontextübergabe an VW-eigene KI

**Frage:** Darf VitalWissen Avatar-Kontext automatisch an seinen eigenen KI-Service übergeben?

**Antwort:** Nein, nicht automatisch. Jede Kontextübergabe an KI-Komponenten (auch eigene, wie S4-Proxy) erfordert explizite Nutzeraktion. Rationale: E07/E08 gelten auch intern. S4 arbeitet Zero-Retention, ohne persistierten Avatar-Kontext. Wenn Q7 (Personalisierungs-Layer) Kontext nutzt, ist das kein KI-Aufruf — Q7 ist client-seitige Filterlogik ohne externe API-Calls.

### 10.6 Zu-klären ZK-12 (beantwortet): Minderanforderungen für Google Health API

**Frage:** Was muss erfüllt sein, bevor Google Health API integriert wird?

**Antwort (aus AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md übernommen):**
1. S9 live (E2E, DE/EU)
2. Explizites opt-in pro Nutzerin
3. Abschluss eines DPA mit Google (Data Processing Agreement)
4. Legal Review durch Datenschutzanwalt
5. Separate Datenschutzerklärung für Google-Integration

Phase D/E frühestens. Kein Build-Auftrag in diesem Freeze.

---

## 11. S4-Schnittstelle (Arztbrief-Dekodierung)

### 11.1 Permanente Grenze (E07/E08)

S4 verarbeitet Arztbriefe client-seitig und Zero-Retention. Diese Grenze ist **permanent** und gilt unabhängig vom Avatar-Kontext.

### 11.2 Avatar ↔ S4 Interaktion

**Was S4 vom Avatar nutzen darf:** Nichts. S4 ist eine isolated Pipeline — kein Lesen aus Avatar, kein Schreiben in Avatar.

**Was S4 in den Avatar schreiben darf:** Nichts automatisch. Nach einer S4-Analyse kann der Nutzer manuell Elemente in den Avatar übertragen (z.B. „Diese Diagnose aus dem Arztbrief zu meinem Profil hinzufügen"). Dieser Transfer ist:
- Immer manuell initiiert (kein Auto-Write)
- Immer mit Bestätigungs-Dialog
- Immer mit Typ-Hinweis: „Diese Information stammt aus einem KI-verarbeiteten Arztbrief. Bitte prüfe sie auf Richtigkeit."

**Was nie passiert:** Direkter Transfer von Arztbrief-Inhalten in den KI-Prompt-Export. Klasse-4-Daten bleiben Klasse-4 — auch wenn der Nutzer sie manuell in den Avatar übertragen hat, wird der Avatar-Eintrag dann als Klasse-3-Selbstangabe klassifiziert (Transformation, kein Bypass).

### 11.3 Zu-klären ZK-13 (beantwortet): Avatar-Kontextualisierung von Arztbrief-Analyse

**Frage:** Soll S4-Analyse bessere Ergebnisse liefern, wenn Avatar-Kontext vorhanden ist?

**Antwort:** Nein, nicht in Phase D MVP. S4 bleibt isolated. Kontext-Anreicherung der S4-Analyse durch Avatar-Daten würde bedeuten, dass Avatar-Daten an den LLM-Proxy gesendet werden — das verletzt E07 (keine Klasse-3-Daten in externe APIs ohne explizites opt-in). Wenn dieser Feature-Wunsch entsteht: separater Architektur-Freeze erforderlich, kein stiller Ausbau.

---

## 12. Q4/Q5-Schnittstelle (Update-Layer / Watchlists)

### 12.1 Status von Q4/Q5

Q4 (Update-/Change-Layer) und Q5 (Watchlists) sind Phase-C-Specs — noch nicht gebaut. Ihr Verhältnis zum Avatar ist hier vorab eingefroren.

### 12.2 Avatar → Q5 (Watchlists)

**Basis-Watchlists (ohne Avatar):** Nutzer abonniert einzelne Objekte manuell (Laborwert, Supplement, Krankheit). Kein Avatar erforderlich.

**Avatar-erweiterte Watchlists:** Wenn Avatar vorhanden, schlägt VitalWissen proaktiv Watchlist-Objekte vor, die zu den Avatar-Diagnosen und -Laborwerten passen. Beispiel: Nutzer hat HbA1c im Avatar → VitalWissen schlägt vor, „HbA1c-Zielwert-Updates" + „Typ-2-Diabetes-Leitlinien" zu abonnieren.

**Entscheidung:** Avatar-basierte Watchlist-Vorschläge sind Phase-D-Feature (benötigen S9 live). Basis-Watchlists ohne Avatar: Phase C.

### 12.3 Avatar → Q4 (Update-Notifications)

**Ohne Avatar:** Q4 sendet Updates nur für explizit abonnierte Watchlist-Objekte (Phase C).

**Mit Avatar:** Q4 kann Update-Relevanz-Check gegen Avatar-Felder laufen (Abschnitt 9.3). Alle Avatar-Felder (Diagnosen, Medikamente, Supplements, Laborwerte) dienen als implizite Watchlist-Basis. Nutzer kann diesen impliziten Monitor deaktivieren (Opt-out, nicht Opt-in — weil es erwartetes Verhalten ist).

### 12.4 Zu-klären ZK-14 (beantwortet): Watchlist ohne Avatar

**Frage:** Sollen Watchlists auch ohne Avatar (ohne Profil) funktionieren?

**Antwort:** Ja. Watchlists sind Phase-C-Feature und dürfen nicht von Phase-D-S9 abhängen. Basis-Watchlists sind reine Objekt-Abonnements (keine Personalisierung). Avatar-erweiterte Features (proaktive Vorschläge, impliziter Monitor) kommen in Phase D dazu.

---

## 13. Q7-Schnittstelle (Personalisierungs-Layer)

### 13.1 Q7 ist der primäre Nutzen des Avatars

Q7 macht Avatar-Daten sichtbar: Laborwert-Detailseiten zeigen automatisch, ob der Nutzer diesen Wert im Avatar hat und wie er dazu steht. Supplement-Seiten zeigen Interaktionen mit den Nutzer-Medikamenten. Krankheits-Detailseiten zeigen, welche der empfohlenen Maßnahmen zur Situation des Nutzers passen.

### 13.2 Q7 ist client-seitige Filterlogik, keine externe API

Q7 liest Avatar-Daten aus dem lokalen Speicher/Session-State, nicht aus externen APIs. Kein Klasse-3-Datentransfer an externe Systeme. Verarbeitung im Browser.

### 13.3 Q7 Opt-in

Q7-Personalisierung ist per Default **aus**. Nutzer aktiviert sie einmalig mit explizitem Klick. Begründung: Personalisierung macht nur Sinn, wenn der Nutzer versteht, dass VitalWissen seinen Kontext kennt. Stille Aktivierung würde Vertrauen schädigen.

### 13.4 Zu-klären ZK-15 (beantwortet): Q7 ohne vollständigen Avatar

**Frage:** Wie verhält sich Q7, wenn nur partielle Avatar-Daten vorhanden sind?

**Antwort:** Graceful Degradation. Q7 zeigt Personalisierung nur für Bereiche, in denen Avatar-Daten vorhanden sind. Beispiel: Avatar hat Diagnose aber keine Medikamente → Q7 aktiviert ICD-basierte Crosslinks, aber kein Medikamenten-Interaktionsfilter. Empty-State-Regel: kein Personalisierungs-Hinweis wenn kein relevanter Kontext vorhanden.

---

## 14. Q9-Schnittstelle (BYO-AI-Kontext-Layer)

### 14.1 VitalWissen als Kontext-Lieferant, nicht als KI

Q9 ist der Kanal für Nutzer, die ihre eigene KI nutzen (ChatGPT, Gemini, Claude etc.) und VitalWissen als Informations- und Kontext-Layer nutzen wollen.

### 14.2 Zwei Q9-Pfade

**Q9-Pfad A (Phase C): KI-Prompt-Export (manuell)**
Nutzer exportiert seinen Kontext als Text und fügt ihn selbst in seine KI ein. Vollständig beschrieben in Abschnitt 10.3.

**Q9-Pfad B (Phase D/E): Direkte API-Anbindung**
Nutzer verbindet VitalWissen direkt mit seiner KI (z.B. Custom GPT, Claude Project). VitalWissen stellt einen strukturierten Context-Endpoint bereit. Erfordert:
- S9 live
- Nutzer-API-Key der externen KI (gespeichert in E2E-verschlüsseltem S9)
- Opt-in für jeden Verbindungsaufbau
- Datenklassen-Filterung: nur Klasse 2+3 (opt-in), nie Klasse 4+5 ohne explizite Phase-D/E-Entscheidung

### 14.3 Zu-klären ZK-16 (beantwortet): Kontrollverlust bei Q9

**Frage:** Wie verhindert VitalWissen, dass Nutzer über Q9 mehr Daten preisgeben als gewollt?

**Antwort:** Granulare Vorschau + Session-Scoped-Tokens. Vor jedem Q9-Export sieht der Nutzer exakt, was übertragen wird. Session-Tokens laufen nach 60 Minuten ab (kein permanenter Kontext-Zugriff ohne erneuerte Einwilligung). Kein automatischer Kontext-Refresh ohne Nutzeraktion.

---

## 15. DSGVO-Konformitätsrahmen

### 15.1 Rechtsgrundlagen

| Datenverarbeitung | Rechtsgrundlage | Art. |
|---|---|---|
| Eigenprofil-Speicherung | Einwilligung | Art. 6 (1)(a) + Art. 9 (2)(a) |
| Fremdprofil P2 (Kinder unter 18) | Berechtigte Interessen / gesetzliche Pflicht | Art. 6 (1)(c) + § 1629 BGB |
| Fremdprofil P3/P4 (mit Einwilligung/Vollmacht) | Einwilligung (dokumentiert) | Art. 6 (1)(a) + Art. 9 (2)(a) |
| Update-Notifications | Einwilligung (opt-in) | Art. 6 (1)(a) |
| KI-Prompt-Export | Einwilligung (per Session) | Art. 6 (1)(a) + Art. 9 (2)(a) |
| Daten-Export (Portabilität) | Rechtliche Verpflichtung | Art. 20 |
| Account-Löschung | Rechtliche Verpflichtung | Art. 17 |

### 15.2 Besondere Anforderungen Gesundheitsdaten (Art. 9)

Gesundheitsdaten sind Daten besonderer Kategorie. Mehrfach-Absicherung:
1. Explizite Art.-9-(2)(a)-Einwilligung (eigene Textbox, keine Blanket-Consent)
2. E2E-Verschlüsselung (VitalWissen kann Klartext nicht lesen)
3. DE/EU-Server
4. Zero-Knowledge-Architektur (Key Management beim Nutzer)
5. Keine Weitergabe an Dritte ohne explizites opt-in + DPA

### 15.3 Minderjährige (DSGVO Art. 8)

Kinderdaten (P2) haben erhöhten Schutz:
- Keine Profilbildung für Werbezwecke
- Keine Datenweitergabe an Dritte
- KI-Prompt-Export nur durch Elternteil (nicht durch das Kind selbst, unter 16)
- Beim Übergang zu P1-Eigenprofil (18. Geburtstag): neue Art.-9-(2)(a)-Einwilligung des Nutzers selbst erforderlich

### 15.4 Zu-klären ZK-17 (beantwortet): Datenschutzerklärung-Anforderungen

**Frage:** Welche spezifischen Datenschutzerklärungsabschnitte braucht S9?

**Antwort:** Separate S9-Datenschutzseite (nicht nur globale DSE) mit:
1. Art der gespeicherten Gesundheitsdaten
2. E2E-Verschlüsselungs-Erklärung (technisch verständlich)
3. Fremdprofil-Rechte und Pflichten
4. Löschfristen und Portabilitäts-Optionen
5. Spezifische Einwilligungs-Dokumentation
6. Kontakt für Datenschutzanfragen
Rechtsanwaltliche Prüfung dieser Seite ist Pflicht vor Phase-D-Build-Freigabe.

### 15.5 Zu-klären ZK-18 (beantwortet): Auftragsverarbeiter

**Frage:** Wie wird der Supabase-Dienstleister DSGVO-konform eingebunden?

**Antwort:** Supabase bietet AV-Vertrag (AVV) nach Art. 28 DSGVO an. Frankfurt-Region ist EU-Server. AVV muss vor Phase-D-Build abgeschlossen werden. E2E-Verschlüsselung bedeutet, dass Supabase nur verschlüsselte Blobs speichert (kein Klartextzugriff) — reduziert aber nicht die AVV-Pflicht.

---

## 16. Phasierung und Build-Abhängigkeiten

### 16.1 Was wann gebaut werden darf

| Phase | Was | Avatar-Abhängigkeit |
|---|---|---|
| **Phase A–C (jetzt)** | KI-Prompt-Export (Modus 3a) ohne persistierten Avatar | Kein S9 nötig — manueller Kontext-Input |
| **Phase C** | Q5 Watchlists (Basis, ohne Avatar) | Kein S9 nötig |
| **Phase C** | Q4 Update-Layer (objekt-gebunden, ohne Avatar) | Kein S9 nötig |
| **Phase D Prerequisite** | Datenschutz-Seite S9 + AVV Supabase + Rechtsanwalt | Pflicht vor Build |
| **Phase D** | S9 Build: K11-Datenschicht, P1-Eigenprofil, E2E, FHIR | Kernsystem |
| **Phase D** | P2 Kinderprofile | Erfordert S9 live |
| **Phase D** | Q7 Personalisierungs-Layer | Erfordert S9 + min. 1 Avatar-Datenpunkt |
| **Phase D** | P3/P4/P5 Fremdprofile | Erfordert S9 + Consent-Flow |
| **Phase D/E** | Q9-Pfad B (API-Anbindung) | Erfordert S9 + Legal Review |
| **Phase D/E** | Google Health API | Erfordert S9 + DPA Google + Legal Review |

### 16.2 Kritischer Pfad

```
Rechtsprüfung DSE + AVV
       ↓
S9 Core Build (K11, P1, E2E, FHIR)
       ↓
Q7 Personalisierungs-Layer
       ↓
P2/P3/P4/P5 Fremdprofile
       ↓
Q9-Pfad B (BYO-AI API)
```

**Parallelpfad (Phase C, kein S9 erforderlich):**
- Q5 Basis-Watchlists
- Q4 Update-Layer
- KI-Prompt-Export (Modus 3a, manuell)

### 16.3 Zu-klären ZK-19 (beantwortet): Monetarisierungsmodell S9

**Frage:** Was ist kostenpflichtig, was kostenlos?

**Antwort (aus E24-Entscheidung + VW_05_SAEULEN.md):**
- **Basis (kostenlos):** P1-Eigenprofil, 1 Kinderprofil (P2), Basis-Watchlists, KI-Prompt-Export
- **Premium (4–8€/Monat):** Weitere Fremdprofile (P2 über 1 hinaus, P3/P4/P5), Avatar-erweiterte Watchlists, Q9-Pfad B, Update-Priorität KRITISCH via Push/E-Mail
- **Begründung:** Fremdprofile erzeugen Compliance-Kosten (Consent-Infrastruktur, AVV-Erweiterung); diese müssen refinanzierbar sein

---

## 17. Risiken und Blocker

### 17.1 Blocker (Build darf nicht starten, bis gelöst)

| ID | Blocker | Lösung | Verantwortung |
|---|---|---|---|
| **B1** | Kein AVV mit Supabase für Gesundheitsdaten | AVV abschließen, Frankfurt bestätigen | Sebastian (vor Phase D) |
| **B2** | Keine rechtlich geprüfte S9-Datenschutzseite | Rechtsanwalt beauftragen | Sebastian (vor Phase D) |
| **B3** | E2E Key Management Konzept nicht ausgearbeitet | Eigener Architektur-Chat: Key-Derivation, Geräte-Sync, Recovery | Gemeinsam (Phase D Vorbereitung) |
| **B4** | FHIR R4 Implementierungs-Entscheidung offen | Bibliotheks-Auswahl (fhir.js o.ä.) + Schema-Mapping | Gemeinsam (Phase D Vorbereitung) |

### 17.2 Risiken (zu monitoren, kein Build-Stopper)

| ID | Risiko | Wahrscheinlichkeit | Mitigierung |
|---|---|---|---|
| **R1** | Nutzer-Adoption: Wenigste Nutzer füllen Profil aus | Mittel | KI-Prompt-Export als Low-Barrier-Einstieg (Phase C) |
| **R2** | Fremdprofil-Missbrauch (P4: falsche Vollmacht-Angabe) | Niedrig (juristisch beim Nutzer) | Self-Deklaration + deutlicher Hinweis auf Nutzerverantwortung |
| **R3** | E2E-Architektur erhöht Komplexität erheblich | Hoch (technisch) | Phase-D-Build benötigt mehr Vorlaufzeit als andere Säulen |
| **R4** | DSGVO Art. 9: Regulatorische Verschärfungen (z.B. Health Data Act EU) | Niedrig–Mittel | Flexible Architektur, kein Vendor-Lock-in |
| **R5** | Nutzer übergibt Klasse-4-Daten über Umwege an externe KI (Eigenverantwortung) | Mittel | UI-Warnungen + klare Grenzmarkierungen; technisch nicht vollständig verhinderbar |
| **R6** | Volljährigkeits-Übergang (P2→P1): Daten-Übergabe-Prozess komplex | Niedrig | Klarer Übergabe-Flow + E-Mail-basierte Kind-Account-Erstellung |

---

## 18. Entscheidungsmatrix offene Fragen

Alle 19 Zu-klären-Fragen aus dem Auftrag sind beantwortet (verteilt über Sektionen 5–16). Zur Übersicht:

| ZK-ID | Frage (Kurzform) | Beantwortet in | Status |
|---|---|---|---|
| ZK-01 | Trennung Eigen-/Fremdprofil | §5.6 | ✅ GESCHLOSSEN |
| ZK-02 | Einwilligung bei Betreuung | §6.5 | ✅ GESCHLOSSEN |
| ZK-03 | Widerrufsmechanismus | §6.6 | ✅ GESCHLOSSEN |
| ZK-04 | Offline-Szenarien | §7.3 | ✅ GESCHLOSSEN |
| ZK-05 | Gerätesynchronisation | §7.4 | ✅ GESCHLOSSEN |
| ZK-06 | DSGVO Löschung + Portabilität | §7.5 | ✅ GESCHLOSSEN |
| ZK-07 | Datenpräzision (ICD vs. Freitext) | §8.4 | ✅ GESCHLOSSEN |
| ZK-08 | Veraltete Avatar-Daten | §9.6 | ✅ GESCHLOSSEN |
| ZK-09 | Update-Relevanz für Fremdprofile | §9.7 | ✅ GESCHLOSSEN |
| ZK-10 | Sicherheit KI-Prompt-Export | §10.4 | ✅ GESCHLOSSEN |
| ZK-11 | Automatische KI-Übergabe VW-eigene KI | §10.5 | ✅ GESCHLOSSEN |
| ZK-12 | Mindestanforderungen Google Health API | §10.6 | ✅ GESCHLOSSEN |
| ZK-13 | Avatar-Kontextualisierung S4-Analyse | §11.3 | ✅ GESCHLOSSEN |
| ZK-14 | Watchlist ohne Avatar | §12.4 | ✅ GESCHLOSSEN |
| ZK-15 | Q7 mit partiellem Avatar | §13.4 | ✅ GESCHLOSSEN |
| ZK-16 | Kontrollverlust Q9 | §14.3 | ✅ GESCHLOSSEN |
| ZK-17 | Datenschutzerklärung S9 | §15.4 | ✅ GESCHLOSSEN |
| ZK-18 | Auftragsverarbeiter Supabase | §15.5 | ✅ GESCHLOSSEN |
| ZK-19 | Monetarisierungsmodell S9 | §16.3 | ✅ GESCHLOSSEN |

**Alle 19 Fragen: GESCHLOSSEN.**

---

## 19. No-Gos (bindend)

Die folgenden No-Gos sind bindend für alle Folge-Chats und Build-Pakete, die S9 berühren:

1. **Kein automatischer Write von S4-Inhalten in den Avatar.** Jeder Transfer ist manuell und mit Bestätigungs-Dialog.
2. **Kein automatischer Kontexttransfer von Avatar-Daten an externe KI-APIs** ohne expliziten opt-in pro Session.
3. **Kein Klasse-4-Daten-Export** (Arztbriefe) über KI-Prompt-Export oder Q9, unter keinen Umständen.
4. **Kein Avatar-Build ohne abgeschlossenen AVV mit Supabase** (Blocker B1).
5. **Kein Avatar-Build ohne rechtlich geprüfte S9-Datenschutzseite** (Blocker B2).
6. **Keine einseitige Anlage von Fremdprofilen.** P3/P4/P5 immer mit dokumentierter Legitimationsbasis.
7. **Keine automatische Mutation von Avatar-Daten durch Updates.** Updates sind immer nur Hinweise.
8. **Kein Server-Write für Temporärprofile (P6).** Immer sessionStorage only.
9. **Kein Offline-Caching von verschlüsselten Gesundheitsdaten im Browser** (Phase D MVP).
10. **Kein eigenes KI-Modell-Training auf Gesundheitsdaten** (Phase A–D, bindend aus P7D Architecture Reset Freeze).
11. **Kein automatischer Q7-Aktivierungs-Default.** Q7-Personalisierung ist immer opt-in.
12. **Keine permanenten Q9-API-Zugriffstoken.** Immer session-scoped (max. 60 Minuten).

---

## 20. Ops Closure

### Inhaltlicher Abschluss

| Kriterium | Status |
|---|---|
| AK-1: Exakt 20 Sektionen vorhanden | ✅ |
| AK-2: 19 ZK-Fragen alle beantwortet | ✅ (§18 Übersicht) |
| AK-3: Profiltypen vollständig (P1–P6) | ✅ (§5) |
| AK-4: Einwilligungsmodell vollständig | ✅ (§6) |
| AK-5: Datenhaltungsmodell vollständig | ✅ (§7) |
| AK-6: Update-Logik vollständig | ✅ (§9) |
| AK-7: KI-Grenze konsistent mit AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md | ✅ (§10) |
| AK-8: Alle No-Gos aus AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md berücksichtigt | ✅ (§19) |
| AK-9: Phasierung konsistent mit P7D Architecture Reset Freeze | ✅ (§16) |
| AK-10: Keine versteckten Build-Aufträge im Freeze | ✅ — Reines Read-Only-Dokument |

### Technischer Anwendungsstatus

| Kategorie | Status |
|---|---|
| Lokaler Speicherstatus | Datei in `01_PROJECT_SOURCES_CURRENT/` angelegt |
| Git Status | Kein Commit — kein Build-Auftrag erteilt |
| Commit-Status | Kein Commit |
| Push-Status | Kein Push |
| DB-Writes | NEIN |
| Deploy | NEIN |
| Offener Side Effect | NEIN |

### Operativer Abschluss-Status

**Doppelpflege-Standard:** CLAUDE.md + VW_03_STATUS.md + AUDIT_CANON_CURRENT.md + ACTIVE_STRANDS_CURRENT.md werden in diesem Paket nachgezogen (separater Schritt).

**Nächste zulässige Schritte (Reihenfolge):**
1. **S3 Curation-Queue** — 5 Dossiers × 4 K6-Einträge (eigenständiger Chat, explizite Freigabe, unmittelbar nächster operativer Schritt)
2. **Phase-C-Pakete** (Q5 Basis-Watchlists, Q4 Update-Layer, KI-Prompt-Export ohne S9 — je eigenständiger Chat)
3. **Phase-D-Vorbereitung** (AVV Supabase, Rechtsanwalt S9-DSE, Key-Management-Spec, FHIR-Bibliotheks-Entscheidung — eigenständige Chats, keine Build-Freigabe ohne alle 4 Blocker geschlossen)
4. **S9 Phase-D-Build** (erst wenn alle B1–B4-Blocker geschlossen)

**Offene Punkte nach diesem Freeze:** Keine. Alle 19 ZK-Fragen geschlossen. 4 Build-Blocker (B1–B4) dokumentiert und bekannt.

---

*Erstellt: 13.05.2026 — S9-HEALTH-AVATAR-CONTEXT-FREEZE*
*Basis: AI_INTEGRATION_AND_PERSONAL_CONTEXT_FREEZE.md · P7D_ARCHITECTURE_RESET_FREEZE.md · S3_SCHEMA_MIGRATION_APPLY_CLOSURE.md · VW_03_STATUS.md · VW_04_ENTSCHEIDUNGEN.md · VW_05_SAEULEN.md · AUDIT_CANON_CURRENT.md · ACTIVE_STRANDS_CURRENT.md · VW_06_WEBSITE.md*
