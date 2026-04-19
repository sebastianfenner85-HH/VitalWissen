Hinweis:
- Nur echte Entscheidungen oder klar gesetzte Grundrichtungen
- Arbeitshypothesen stehen in VW_03_STATUS oder VW_05_SAEULEN

## Grundsatzentscheidungen

**E01 — Vollständig werbefrei, kein Affiliate** [SICHER FESTGELEGT]
Begründung: Vertrauen ist Kernasset.

**E02 — Wirkstoffbasiert statt produktbasiert in S2/S6** [SICHER FESTGELEGT]
Begründung: kein Affiliate-Druck, höherer Informationswert.

**E03 — Aggregieren statt eigenes medizinisches Wissen erfinden** [SICHER FESTGELEGT]
Begründung: Wert liegt in Aufbereitung, Übersetzung, Vernetzung.

**E04 — In Phase 1 vorrangig kostenlose Kernquellen nutzen** [SICHER FESTGELEGT]
Begründung: nicht-kommerzielle Phase.
Hinweis: einzelne Detailfragen wie Cochrane-Zugang oder
DrugBank-Free-Tier bleiben zu prüfen.

## Technische Entscheidungen

**E05 — PostgreSQL als Hauptdatenbank via Supabase** [SICHER FESTGELEGT]
Begründung: relationale Struktur + JSONB + pgvector + managed hosting.
Konkret: Supabase (DE/EU-Server) als Managed-Dienst.

**E06 — LLM-Extraktion via Claude API / GPT-4 API,
kein eigenes Modelltraining in Phase 1** [AKTUELLER KONZEPTSTAND]

**E07 — Client-side-Verarbeitung wo besonders sensible Daten entstehen
(v. a. S4/S8/S11/S12)** [SICHER FESTGELEGT]

**E08 — Zero Retention als Kernprinzip in S4** [SICHER FESTGELEGT]

**E09 — FHIR R4 früh mitdenken** [PLANUNGSPRINZIP]
Hinweis: keine fertige Implementierungsentscheidung,
sondern Architekturvorgabe.

**E10 — E2E-Verschlüsselung in S9** [AKTUELLER KONZEPTSTAND]
Aktuell konkret mit AES-256 gedacht.

**E11 — Serverstandort DE/EU für S9** [SICHER FESTGELEGT]
Konkret: Supabase EU-Region.

**E12 — React + Vite als Frontend-Framework** [SICHER FESTGELEGT]
Begründung: in P1 implementiert, Netlify-Deploy funktioniert.

**E13 — GitHub als zentraler Code-Speicher** [SICHER FESTGELEGT]
Begründung: ermöglicht Sessions-übergreifendes Arbeiten mit Claude,
auto-deploy via Netlify, Versionierung.
Repo: vitalwissen (privat), Account: sebastianfenner85@gmail.com.

**E14 — Session = Paket** [SICHER FESTGELEGT]
Begründung: Claude-Kontextlimits erfordern klare Paketgrenzen.
Jede Session hat ein abgrenzbares Ergebnis.
Code-Übergabe: Claude liefert Dateien → Sebastian pushed zu GitHub →
Netlify deployed automatisch.

**E15 — Cowork für Pipeline-Ausführung** [SICHER FESTGELEGT]
Begründung: Pipelines müssen auf Sebastians Rechner laufen und
direkt mit Supabase kommunizieren. Claude baut die Skripte,
Cowork führt sie aus.

## Inhaltliche Entscheidungen

**E16 — 3-Leitlinien-Vergleich DE/USA/JP in S1** [SICHER FESTGELEGT]

**E17 — Tier 3/Wikipedia in S2 nicht im MVP** [SICHER FESTGELEGT]

**E18 — Gender-Medizin als Querschnitt, nicht als eigene Säule** [SICHER FESTGELEGT]

**E19 — Sehr einfache Sprache als dritte Ebene in S5** [SICHER FESTGELEGT]

**E20 — Familienanamnese als Pflichtfeld in S11** [SICHER FESTGELEGT]

**E21 — Alternatives-Kompass in S6** [SICHER FESTGELEGT]

**E22 — EU/UK-Verfügbarkeitsmatrix in S6** [AKTUELLER KONZEPTSTAND]

**E23 — Studien-Radar in S8** [AKTUELLER KONZEPTSTAND]

**E24 — S9 als Freemium/Premium-Modell** [AKTUELLER KONZEPTSTAND]
Hinweis: genaue Zahlen/Tier-Grenzen bleiben Arbeitshypothese.

**E25 — Mail-Verknüpfung in S9 via OAuth statt Passwortspeicherung** [SICHER FESTGELEGT]

**E26 — S13 zuerst Agent, Crowd erst nach S7/Nutzerbasis** [AKTUELLER KONZEPTSTAND]

**E27 — Notfall-Flag als aktives UI-Element, nicht nur Footer-Hinweis** [SICHER FESTGELEGT]
Konkret implementiert: rotes Banner auf Detailseite.

**E28 — Quellen müssen professionell anerkannt und verlinkbar sein** [SICHER FESTGELEGT, 12.04.2026]
Begründung: Vertrauen bei Ärzten, Krankenkassen, Universitäten ist Kernziel.
KI-generierte Quellen sind VERBOTEN — nur verifizierte Links.
Quellen-Hierarchie:
1. ICD-10-GM (BfArM) — immer automatisch aus dem ICD-Code generierbar
2. AWMF Leitlinien — kuratierte Mapping-Datei, kein KI-Lookup (Halluzinationsgefahr!)
3. Gesundheitsinformation.de (IQWiG) — automatisch verlinkbar
4. RKI Gesundheitsberichterstattung — für Epidemiologie/Prävalenz (Phase 2)
DB-Schema quellen-Feld: [{"typ":"icd10|awmf|iqwig|rki","name":"...","url":"...","beschreibung":"..."}]
Nächster Schritt: awmf_mapping.json bauen + Pipeline updaten (Session B3).

**E29 — RLS auf allen Supabase-Tabellen** [SICHER FESTGELEGT, 12.04.2026]
Alle 5 Tabellen haben RLS aktiv. Anon-Rolle: nur SELECT. Schreiben nur über Service Key.
Sicherheits-TODOs für Public Launch: PAT-Ablaufdatum setzen, PasswordGate entfernen.
