# P7D — S18 RESET FREEZE

**Paketname:** P7D — S18 Reset/Freeze  
**Untertitel:** Ernährungskompass — strategische Neueinrahmung nach Architecture Reset  
**Datum:** 19.04.2026  
**Status:** ✅ Freeze-Dokument erstellt — bindendes S18-Scope-Dokument  
**Patch:** P7D-04a Clarification Patch (19.04.2026) — Pakettrennung nachgezogen, S5↔S18 als neue Paketentscheidung explizit markiert, S18↔S6 auf Schnittstellenlogik begrenzt  
**Kein DB-Write. Kein Commit. Kein Push. Kein Deploy. Kein Build-Auftrag.**

---

## 0. PAKET- UND PROZESSKLARSTELLUNG (P7D-04a)

**Dieses Dokument ist als eigenständiges S18-Paket zu lesen.**

| Aussage | Erläuterung |
|---------|------------|
| **Inhaltliche Gültigkeit** | Führend ist der dokumentierte Paketinhalt — nicht der Chat-Kontext, in dem dieses Dokument entstanden ist. Chat-Kontext ist flüchtig und nicht auditierbar. |
| **Pakettrennung** | Dieses S18-Reset/Freeze-Paket ist inhaltlich strikt getrennt von P7D-03 (S3-Freeze). Es gibt keine Vermischung. S18-Scope-Entscheidungen in diesem Dokument binden nicht S3 und umgekehrt. |
| **Geltungsbereich** | Dieses Dokument trifft bindende Freeze-Entscheidungen für S18 auf Basis von `P7D_ARCHITECTURE_RESET_FREEZE.md`. Es ist kein Build-Auftrag, kein Spec-Paket, kein Commit/Push/Deploy. |
| **Verhältnis zu Altständen** | Wo Altdokumente (`VW_06_WEBSITE.md`, `VW_05_SAEULEN.md`) abweichen, ist deren Altstand explizit als solcher benannt. Neue Paketentscheidungen sind explizit als solche markiert. Keine implizite Rückdatierung, keine stille Übernahme des Altstands als Kanon. |

---

## Pflichtlektüre-Basis (Quellen dieses Dokuments)

Dieses Dokument synthetisiert folgende Quellen in der vorgeschriebenen Reihenfolge (Stand 19.04.2026):

| Quelle | Rolle | Priorität |
|--------|-------|-----------|
| `P7D_ARCHITECTURE_RESET_FREEZE.md` | Führendes Architektur-Freeze — Produktstruktur, Phasenlogik, Kernobjekte | 1 (führend) |
| `VITALWISSEN_STRATEGIE_REASSESSMENT_2026-04-18.md` | Delta-Quelle: strategische Erweiterung von S18 über alte Scope | 2 (Delta) |
| `VW_05_SAEULEN.md` | Alter S18-Scope (Nährstoff/Lebensmittel/Muster) — nur als Ausgangsbefund | 3 (Ausgangsbefund) |
| `VW_06_WEBSITE.md` | Website-UX für S18 — Einstiegspfade, Detailseiten-Konzept | 3 (Ausgangsbefund) |
| `VW_04_ENTSCHEIDUNGEN.md` | Grundsatzentscheidungen E01–E29 | 2 (bindend) |
| `VW_03_STATUS.md` | Operativer Ist-Zustand | 2 (bindend) |

Widerspruchsregel: `P7D_ARCHITECTURE_RESET_FREEZE.md` ist führend vor Altständen aus VW_05/VW_06.
Abweichungen zwischen altem und neuem S18-Scope werden explizit benannt und entschieden.

---

## 1. KURZURTEIL

S18 war bislang als „Ernährungskompass" mit drei Ebenen definiert (Nährstoff-Lexikon / Lebensmittel-Kompass / Ernährungsmuster) — das ist eine sinnvolle Datenbasis, aber ein zu enges strategisches Konzept.

**Nach dem Architecture Reset ist S18 strategisch aufgewertet und neu einzurahmen:**

> **S18 ist die verlässliche deutschsprachige Wissensbasis für Ernährung: Sie erklärt, wie Nährstoffe, Lebensmittel, Zusatzstoffe und Ernährungsmuster die Gesundheit beeinflussen — mit alltagstauglichen Einordnungshilfen, Querverweisen auf Krankheiten und Laborwerte, ohne Rezeptportal, Tracking oder Diätlogik.**

S18 bleibt intern Säule, extern Teil von B2 (Verstehen / Einordnen). Die drei alten Ebenen aus VW_05_SAEULEN bleiben erhalten und werden um explizite Zusatzstoffe/E-Nummern und alltagstaugliche Heuristiken erweitert. Die Scope-Entscheidung über Phase-Zugehörigkeit dieser Erweiterungen wird in diesem Dokument bindend getroffen.

---

## 2. IST-ZUSTAND

### 2.1 Operativer Stand (VW_03_STATUS.md, 19.04.2026)

- S18: Status „✅ Konzept fertig", nächster Schritt bisher: „Tech: DGE/USDA-Pipeline"
- Kein DB-Schema für S18 angelegt
- Keine Pipeline gebaut
- Keine S18-Seiten live
- Keine UI-Entscheidungen umgesetzt

### 2.2 Bisheriger Scope (VW_05_SAEULEN.md — Ausgangsbefund)

Alter S18-Scope hatte drei Ebenen:
- Ebene 1: Nährstoff-Lexikon (Vitamine, Mineralstoffe, Makronährstoffe, sekundäre Pflanzenstoffe)
- Ebene 2: Lebensmittel-Kompass (Nährwertprofil, gesundheitlicher Nutzen/Risiken, Wechselwirkungen)
- Ebene 3: Ernährungsmuster (Mediterran, DASH, Low-Carb, Intervallfasten etc.)

Explizit ausgeschlossen: Rezepte im MVP.

Offene Punkte aus VW_05: DGE-API-Verfügbarkeit, Rezept-Feature (ausgeschlossen), Personalisierung via S9 (Phase 2), vegane/allergiebedingte Filter (Scope-Entscheidung offen), Kindernährstoffbedarf.

### 2.3 Bisheriger UX-Stand (VW_06_WEBSITE.md — Ausgangsbefund)

- Einstieg: „Nährstoff / Lebensmittel → S18 Detailseite" (via Universalsuche)
- Drei Seitentypen: Nährstoff-Detailseite, Lebensmittel-Detailseite, Ernährungsmuster-Detailseite
- 2 eingebettete Cross-Blöcke: Relevante Laborwerte → S1, Erkrankungen mit Ernährungsbezug → S5
- Block „Ernährung bei dieser Erkrankung" auf S5: als Phase-2-Crossblock markiert
- Genaue Seitenstruktur und Cross-Block-Logik: ausdrücklich OFFEN

### 2.4 Wichtige Abweichung: Alt vs. Neu

| Aspekt | Alter Stand (VW_05_SAEULEN) | Neuer Stand (P7D + Reassessment) | Entscheidungsbedarf |
|--------|----------------------------|---------------------------------|---------------------|
| Kernaufgabe | Nährstoff/Lebensmittel/Muster-Datenbank | Ernährung verstehen, bewerten, anwenden | ✅ Reset-Entscheidung (dieses Dokument) |
| Zusatzstoffe/E-Nummern | nicht erwähnt | explizit Teil des neuen Scopes | ✅ Phase-Entscheidung (dieses Dokument) |
| Alltagsheuristiken | implizit in „praktische Prinzipien" | explizit als eigene Inhaltsebene | ✅ Bestätigt (dieses Dokument) |
| Krankheitsbezogene Ernährung | als Killer-Feature bidirektional mit S5 | stärker betont, früher | ✅ Bestätigt als Phase B |
| Laborwertbezogene Ernährung | als Biomarker-Verknüpfung in S1 | explizit bidirektional | ✅ Bestätigt |
| Produktvergleich/Warenkorb | nicht erwähnt | explizit Phase E | ✅ Grenze gezogen |

---

## 3. WARUM S18 RESET BRAUCHT

### 3.1 Beobachtung aus Quellenlage

Der alte S18-Scope war datenbankorientiert gedacht: Nährstofftabellen, Lebensmitteldaten, Musterbeschreibungen. Das ist sinnvolle Datenbasis, greift aber strategisch zu kurz.

Das Reassessment vom 18.04.2026 benennt explizit vier Ebenen, die S18 abdecken muss:
1. Grundlagen verstehen
2. Lebensmittel bewerten
3. Zusatzstoffe / E-Nummern kontextualisieren
4. Alltagstaugliche Entscheidungen / Heuristiken

Der Architecture Reset Freeze markiert S18 als „Aufgewerteter Hauptbereich in B2, Phase B Reset/Scope-Klärung" und nennt Zusatzstoffe/E-Nummern explizit als offene Scope-Entscheidung.

### 3.2 Schlussfolgerung

**S18 braucht Reset, weil:**
- der alte Scope (3 Ebenen) wichtige strategische Dimensionen (E-Nummern, Heuristiken, krankheits-/laborwertbezogene Einordnung) nur implizit oder gar nicht enthält
- ohne klare Trennlinien zu S2/S14/S15 S18-Build zu Scope-Drift führt
- der Phase-Schnitt für E-Nummern/Zusatzstoffe bisher explizit offengelassen war (P7D-Festlegung: entscheiden vor Build)

**S18 braucht keinen grundlegenden Strategiewechsel** — die Kernidee (evidenzbasiert, kein Affiliate, keine Rezepte) ist unverändert gültig.

---

## 4. ENTSCHEIDUNG — S18-KERN

### Präzise Kernaufgabe in 1 Satz

> **S18 macht Ernährungswissen verlässlich zugänglich: Was enthalten Lebensmittel, was bewirken Nährstoffe und Ernährungsmuster, was steckt hinter Zusatzstoffen — eingeordnet, evidenzbasiert, alltagstauglich und verknüpft mit Krankheiten und Laborwerten.**

### Nüchterne Produktbeschreibung

S18 ist eine evidenzbasierte Ernährungs-Wissensdatenbank. Sie erklärt Nährstoffe und ihre Wirkung auf Gesundheit und Biomarker, bewertet Lebensmittel nach Nährwertprofil und Evidenz, ordnet Zusatzstoffe und E-Nummern sachlich ein, beschreibt Ernährungsmuster mit Wirksamkeitsevidenz und gibt alltagstaugliche Einordnungshilfen. Bidirektional verknüpft mit S5 (Krankheiten) und S1 (Laborwerte). Kein Rezeptportal, kein Tracking, kein Diätprogramm.

### Kurzform für interne Nutzung

**S18 = Ernährung verstehen, bewerten, anwenden**

### Einordnung im Produktsystem

- Interne Säule: S18 (Ernährungskompass)
- Externer Bereich: B2 (Verstehen / Einordnen)
- Kernobjekt: K8 (Lebensmittel / Nährstoff / Zusatzstoff)
- Phase: B (Reset → Build)

---

## 5. ENTSCHEIDUNG — WAS S18 IST / WAS S18 NICHT IST

### Tabelle 1: Was gehört zu S18 / was nicht

| Bereich | Entscheidung | Phase | Begründung |
|---------|-------------|-------|------------|
| **Ernährungsgrundlagen** (Makronährstoffe, Mikronährstoffe, Energiedichte, Verarbeitungsgrad) | ✅ JA — Kern | B | Notwendige Wissensbasis; ohne Grundlagen ist alles andere flach |
| **Nährstofflogik** (Tagesbedarf, Mangel, Überschuss, Biomarker-Bezug) | ✅ JA — Kern | B | War bereits alt in VW_05; unverändert führend |
| **Lebensmittelbewertung** (Nährwertprofil, gesundheitlicher Nutzen/Risiken, Verarbeitungsgrad) | ✅ JA — Kern | B | Reassessment explizit; USP-Thema |
| **Ernährungsmuster** (Mediterran, DASH, Low-Carb, Intervallfasten etc.) | ✅ JA — Kern | B | War bereits alt in VW_05; unverändert |
| **Zusatzstoffe / E-Nummern** | ✅ JA — Phase-B-Scope | B (light) | Explizit im Reassessment und P7D als Teil des neuen Scopes; eigene Detailseiten kommen Phase B, Tiefe ggf. Phase C (→ Abschnitt 10) |
| **Alltagstaugliche Heuristiken** (Protein-zu-kcal-Logik, Fetttypen, „einfach vs. optimal") | ✅ JA — Kern | B | Reassessment explizit; entscheidend für Nutzwert |
| **Krankheitsbezogene Ernährung** (Ernährung bei Bluthochdruck, Hypothyreose, Eisenmangel etc.) | ✅ JA — als Modul/Crosslink | B | Killer-Feature aus VW_05 bestätigt; als bidirektionaler Block mit S5 |
| **Laborwertbezogene Ernährung** (Nährstoff beeinflusst Biomarker) | ✅ JA — als Modul/Crosslink | B | Bidirektional mit S1; war bereits in VW_05 angelegt |
| **Rezeptportal** | ❌ NEIN — dauerhaft außerhalb Kern | — | Explizit ausgeschlossen seit VW_05; E03 (aggregieren, nicht kochen) |
| **Mahlzeitenplaner** | ❌ NEIN | — | Anwendungslogik, kein Wissensbereich |
| **Ernährungstagebuch** | ❌ NEIN | — | Nutzerdaten-Tracking → erst S9, Phase D |
| **Kalorientracker** | ❌ NEIN | — | Kein Informationsprodukt; keine S18-Kernkompetenz |
| **Abnehm-Coach** | ❌ NEIN | — | Nicht VitalWissens Produktversprechen; Scope-Drift |
| **Händler-/Warenkorb-Logik** | ❌ NEIN bis Phase E | E | Erst nach Bewertungslogik; Grundprinzip: Bewertung vor Produkt |
| **Produktverkauf / Affiliate** | ❌ NEIN — dauerhaft | — | E01 (werbefrei/kein Affiliate) — unverhandelbar |
| **Generische Supplement-Duplikation von S2** | ❌ NEIN | — | S18 = Nahrungsquelle; S2 = isoliertes Supplement → Crosslink, kein Duplikat |
| **Personalisierte Ernährungslogik via S9** | ❌ NEIN bis Phase D | D | S9 gibt es erst Phase D; Personalisierung ist Phase-D-Feature |
| **Vegane / allergiebedingte Filter** | ❌ NEIN bis Phase B/C | B/C | Scope-Entscheidung offen aus VW_05 → bleibt offen für S18-Spec-Paket |
| **Kindernährstoffbedarf** | ❌ NEIN bis Phase C | C | Toggle-Logik wie S1 sinnvoll, aber nicht MVP |

---

## 6. ENTSCHEIDUNG — KERNOBJEKTE VON S18

S18 arbeitet mit dem Kernobjekt **K8** (Lebensmittel / Nährstoff / Zusatzstoff) aus dem Architecture Reset Freeze. K8 umfasst mehrere Objekttypen, die hier als Sub-Objekte von K8 spezifiziert werden.

### Tabelle 2: Kernobjekte und Status

| Objekt | Typ | Entscheidung | Eigene Detailseite | Phase | Begründung |
|--------|-----|-------------|-------------------|-------|------------|
| **Nährstoff** (Vitamine, Mineralstoffe, Makronährstoffe, sekundäre Pflanzenstoffe) | K8-Sub-Objekt — eigenständig | ✅ JA — Kernobjekt | ✅ JA | B | War Kern des alten VW_05-Scopes; unverändert führend |
| **Lebensmittel** (Lebensmittelgruppen, einzelne Lebensmittel) | K8-Sub-Objekt — eigenständig | ✅ JA — Kernobjekt | ✅ JA | B | Eigenständige Bewertungseinheit mit Nährwertprofil und Evidenz |
| **Ernährungsmuster** (Mediterran, DASH, Low-Carb etc.) | K8-Sub-Objekt — eigenständig | ✅ JA — Kernobjekt | ✅ JA | B | Eigene Evidenz-Ampel, eigene Krankheits-Crosslinks |
| **Zusatzstoff / E-Nummer** | K8-Sub-Objekt — eigenständig | ✅ JA — Kernobjekt, eigene Detailseite Phase B | ✅ JA (Phase B) | B (Detailseite) | Explizit im Reassessment; USP-Thema; direkt mit Lebensmittelbewertung verbunden; eigene Pipeline nötig |
| **Ernährungsheuristik / Bewertungsregel** | Content-Modul | ❌ NEIN als eigenständiges Kernobjekt | ❌ NEIN (kein eigener Seitentyp) | — | Heuristiken sind inhaltliche Module innerhalb von Nährstoff-/Lebensmittel-/Muster-Seiten, kein verlinkbares Einzelobjekt |
| **Krankheitsspezifische Ernährungsempfehlung** | Crosslink-Modul | ❌ NEIN als eigenständiges Objekt | ❌ NEIN | — | Nur Modul: Block auf S5-Seiten + Block auf S18-Nährstoff/Lebensmittel-Seiten; kein eigener Seitentyp |
| **Laborwertbezogene Ernährungsempfehlung** | Crosslink-Modul | ❌ NEIN als eigenständiges Objekt | ❌ NEIN | — | Nur Modul: Block auf S1-Seiten + Biomarker-Verknüpfung auf S18-Nährstoffseiten; kein eigener Seitentyp |

**Hinweis zum Zusatzstoff/E-Nummer-Objekt:** Die Entscheidung für Phase B bedeutet, dass Zusatzstoffe/E-Nummern im Architecture Reset bereits Teil des K8-Komplexes waren und in S18 als eigene Detailseiten umgesetzt werden. Die genaue Datentiefe (nur sachliche Einordnung vs. vollständige Toxikologiedaten) bleibt Gegenstand des S18-Spec-Pakets. Diese Entscheidung ist eine **Freeze-Entscheidung**, keine Build-Freigabe.

---

## 7. ENTSCHEIDUNG — EXTERNE PRODUKTROLLE

### B2-Einordnung (primär)

S18 ist primär Teil von **B2 (Verstehen / Einordnen)** — dem externen Produktbereich, in dem Nutzer Befunde, Krankheiten, Supplements, Medikamente und Ernährung verstehen. Das ist die einzige primäre Einordnung.

S18 steht damit neben S1 (Laborwerte), S2 (Supplements), S4 (Arztbrief), S5 (Krankheiten) und S6 (Medikamente) im gleichen externen Bereich.

### Sekundäre Andockpunkte

**B3 (Forschung / Optionen / Zukunft):** S15 als Zeitachsen-Modul auf S18-Seiten schafft einen schwachen Andockpunkt an B3 — aber S18 selbst ist kein B3-Bereich. S15 ist Modul, nicht Säule.

**B4 (Nächste Schritte):** Wenn Nutzer nach dem Lesen einer Ernährungsempfehlung konkrete Schritte ableiten (Supplement kaufen, Arzt ansprechen), entsteht B4-Übergang — aber die Navigationslogik für diesen Übergang ist S8/S11-Aufgabe, nicht S18-Aufgabe.

**B1 (Finden / Entdecken):** S18-Inhalte sind über globale Suche auffindbar (wie alle anderen Kernobjekte). Kein eigener Discovery-Layer nötig.

### Crosslinks zu anderen Säulen (bindend für S18-Build)

| Ziel | Crosslink-Typ | Richtung | Phase |
|------|--------------|---------|-------|
| **S1** (Laborwerte) | Nährstoff beeinflusst Biomarker | bidirektional | B |
| **S2** (Supplements) | Nährstoff aus Nahrung ↔ Supplement als Alternative | bidirektional | B |
| **S5** (Krankheiten) | Ernährung bei Erkrankung | bidirektional | **B (NEUE PAKETENTSCHEIDUNG)** — Altstand VW_06: Phase 2 (unverändert dort); dieser Freeze zieht auf Phase B vor (→ Hinweis S5 unten) |
| **S14** (Influencer-Kompass) | Ernährungs-Claims verlinken zu S18 | eingehend | C |
| **S15** (Wirksamkeit/Zeitachse) | Zeitachsen-Modul auf S18-Seiten | S15 andockt | C |
| **S6** (Medikamente) | Lebensmittel-Medikament-Interaktionen | Schnittstellenlogik (Spec) | Phase-B-Spec-Ziel: S18 plant S6 als Interface-Target mit ein — **keine aktive Endnutzer-Verbindung bis S6 gebaut ist** (→ Hinweis S6 unten) |

**Hinweis S5-Crosslink — NEUE PAKETENTSCHEIDUNG:** In `VW_06_WEBSITE.md` (Altstand März 2026) ist der „Ernährung bei dieser Erkrankung"-Block auf S5-Seiten als **Phase-2-Crossblock** geführt. Dieses S18-Freeze-Paket zieht den S5↔S18-Crosslink bewusst auf **Phase B** vor. Das ist eine **explizite Freeze-Entscheidung dieses Pakets** — keine Behauptung, dass Phase-B-Einordnung schon vorher Kanon war. `VW_06_WEBSITE.md` selbst wird dadurch nicht geändert; der Altstand bleibt dort erhalten. Die genaue Crossblock-Inhaltslogik (konkrete Felder, Block-Struktur, Filterlogik S5→S18) bleibt offen für das S18-Spec-Paket.

**Hinweis S6-Crosslink — SCHNITTSTELLENLOGIK:** S6 (Medikamenten-Erklärer) ist in P7D als Phase-B-Build geführt, existiert aber noch nicht. Die Aufnahme von S6 in die Crosslink-Tabelle bedeutet: S18 plant die Lebensmittel-Medikament-Interaktionslogik als Interface-Ziel zu S6 mit ein. Das ist **keine Aussage darüber, dass Medikamenten-/Ernährungs-Interaktionen in Phase B bereits live oder endnutzerseitig verfügbar sind**. Die konkrete Interaktionsverbindung wird erst aktiviert, wenn S6 gebaut ist. Bis dahin gilt: Schnittstellenlogik spec-seitig vorgesehen, Build-Freigabe abhängig von S6-Build.

---

## 8. ENTSCHEIDUNG — TRENNSCHÄRFE ZU S2/S5/S14/S15/S16

### Tabelle 3: Trennschärfe zu Nachbarsäulen

| Grenze | S18-Seite | Andere Säule | Überlappungszone | Auflösung |
|--------|-----------|-------------|-----------------|-----------|
| **S18 ≠ S2** | Nährstoff aus Lebensmittelquellen; Lebensmittelbewertung; Ernährungsmuster | S2 = Supplement als isolierter Wirkstoff/Produkt | Nährstoff (z.B. Magnesium): S18 zeigt Lebensmittelquellen und Tagesbedarf; S2 zeigt das Supplement (Dosierung, Form, Bioverfügbarkeit) | Crosslink bidirektional. S18 ≠ S2: S18 erklärt Ernährungsquelle, S2 erklärt das Präparat. Kein Duplikat auf beiden Seiten — nur Verlinkung. |
| **S18 ≠ S5** | Ernährung erklärt (Nährstoffe, Lebensmittel, Muster) | S5 = Krankheit erklärt | Ernährung bei Erkrankung | Crosslink bidirektional. S18 erklärt die Ernährungslogik; S5 erklärt die Krankheit. Der Block „Ernährung bei dieser Erkrankung" auf S5 ist ein S18-Verweis, kein S18-Inhalt auf S5-Seiten. Kein Content-Overlap. |
| **S18 ≠ S14** | Systematische Wissensdatenbank (Nährstoffe, Lebensmittel, Muster) | S14 = Claim-Datenbank (spezifische Behauptungen aus Social Media) | Ernährungs-Claims (z.B. „Kokosöl ist gesund") | S14 bewertet den spezifischen Claim mit Evidenz-Ampel und verlinkt dann zu S18 (Lebensmittel: Kokosöl). S18 liefert die strukturierte Wissensbasis; S14 liefert die Claim-Einordnung. Getrennte Objekttypen: Claim ≠ Lebensmittel/Nährstoff. |
| **S18 ≠ S15** | Nährstoff-/Lebensmittel-/Musterwissen | S15 = Zeitachse (wann wirkt was, woran messbar) | Ernährungsumstellungen mit Zeitachse | S15 ist **Modul auf S18-Seiten**, kein eigenständiger Hauptbereich. S15-Inhalte (Zeitachse: „wann wirkt Ernährungsumstellung X") erscheinen als Funktionsblock auf S18-Detailseiten — nicht als eigenständige S18-Seite und nicht als Navigation. |
| **S18 ≠ S16** | Ernährungs-Wissensdatenbank | S16 = App-Aggregator (DiGA, Ernährungs-Apps) | Ernährungs-Apps tauchen in S16 auf | S16 aggregiert Apps (darunter Ernährungs-Apps) mit Datenschutz-Check und Qualitäts-Badge. S18 liefert das inhaltliche Hintergrundwissen. Keine Überlappung im Objekttyp: App ≠ Nährstoff/Lebensmittel. |
| **S18 ≠ Produktvergleich/Warenkorb** | Wissens- und Bewertungsplattform | Zukünftige Produktlogik (Phase E) | Lebensmittelempfehlung könnte in Produktauswahl münden | Die Bewertungslogik (welches Lebensmittel ist gut) kommt zuerst (S18, Phase B), die Produktlogik (welches konkrete Produkt kaufen) kommt danach (Phase E). S18 baut niemals Händler-Links, Warenkörbe oder bezahlte Produktplatzierungen. |
| **S18 ≠ S6** | Lebensmittelbewertung inkl. ernährungsseitiger Wechselwirkungen auf Lebensmittelebene | S6 = Medikamenten-Erklärer (Wirkstoffe, Interaktionen, Beipackzettel, Arzneimittellogik) | Lebensmittel-Medikament-Interaktionen (z.B. Grapefruit ↔ Statine) | S18 beschreibt die ernährungsseitige Wechselwirkung auf Lebensmittelebene. S6 beschreibt die Medikamentenseite (Wirkstofflogik, Interaktionsdatenbank). **Der S18↔S6-Crosslink ist Schnittstellenlogik / Spec-Ziel, keine aktive Phase-B-Endnutzer-Verbindung.** S6 ist Phase-B-Build, existiert noch nicht. Kein Eindruck, dass Medikamenten-/Ernährungs-Interaktionen schon live oder Phase-B-fertig wären. |

---

## 9. ENTSCHEIDUNG — EINSTIEGSPFADE UND SEITENTYPEN

### Einstiegspfade

| Einstiegspfad | Entscheidung | Phase | Begründung |
|--------------|-------------|-------|------------|
| **Einstieg über Nährstoff** (z.B. „Magnesium") | ✅ JA — Kernpfad | B | Direkter Einstieg via Universalsuche; Primärpfad |
| **Einstieg über Lebensmittel** (z.B. „Hülsenfrüchte") | ✅ JA — Kernpfad | B | Direkter Einstieg via Universalsuche; Primärpfad |
| **Einstieg über Ernährungsmuster** (z.B. „DASH-Diät") | ✅ JA — Kernpfad | B | Direkter Einstieg; Primärpfad |
| **Einstieg über Zusatzstoff/E-Nummer** (z.B. „E250") | ✅ JA — Phase B | B | Eigener Seitentyp beschlossen; direkte Suche nach E-Nummern ist hoher Nutzerwert |
| **Einstieg über Krankheit** (→ S18 via S5-Crosslink) | ✅ JA — Crosslink-Pfad | B | Bidirektionaler Crosslink S5↔S18; kein eigener Einstiegstyp in S18, aber Eingang via S5-Seiten |
| **Einstieg über Laborwert** (→ S18 via S1-Crosslink) | ✅ JA — Crosslink-Pfad | B | Bidirektionaler Crosslink S1↔S18; kein eigener Einstiegstyp in S18, aber Eingang via S1-Seiten |

### Seitentypen

| Seitentyp | Entscheidung | Phase | Anmerkung |
|-----------|-------------|-------|-----------|
| **Nährstoff-Detailseite** | ✅ JA | B | 7-Punkte-Struktur aus VW_05 als Ausgangsbasis |
| **Lebensmittel-Detailseite** | ✅ JA | B | Nährwertprofil, Nutzen/Risiken, Wechselwirkungen S6 |
| **Ernährungsmuster-Detailseite** | ✅ JA | B | Evidenz-Ampel, Erkrankungs-Bezug S5 |
| **Zusatzstoff/E-Nummer-Detailseite** | ✅ JA | B | Neu; sachliche Einordnung; Datentiefe in S18-Spec zu klären |
| **Übersichts-/Einstiegsseite S18** | ✅ JA | B | Einstieg in die 4 Seitentypen; Startseite für den Bereich |
| **Krankheitsspezifische Ernährungsseite** | ❌ NEIN als eigener Seitentyp | — | Nur als Crosslink-Modul auf S5- und S18-Seiten; kein eigenständiger Seitentyp |
| **Personalisierte Ernährungsseite** | ❌ NEIN bis Phase D | D | Erst mit S9; Phase-D-Feature |

---

## 10. ENTSCHEIDUNG — PHASE B / C / D-SCHNITT

**Leitfrage:** Was ist der kleinstmögliche sinnvolle S18-Start?

**Antwort:** Nährstoff-Lexikon (vollständig) + Lebensmittel-Kompass (häufige Lebensmittelgruppen) + wichtigste Ernährungsmuster + Zusatzstoff/E-Nummern (sachlich, Phase B-light) + Alltagsheuristiken (als Inhaltsmodul) + Crosslinks S1/S2/S5/S6. Das ist ein inhaltlich runder, alltagstauglicher und klar abgegrenzter Phase-B-Start.

### Tabelle 4: Phase B vs. C vs. D

| Bereich / Feature | Phase B | Phase C | Phase D | Begründung |
|-------------------|---------|---------|---------|------------|
| Nährstoff-Lexikon (vollständig) | ✅ | — | — | Kernpfad; Ausgangsbasis alt |
| Lebensmittel-Kompass (häufige Lebensmittelgruppen) | ✅ | — | — | Kernpfad |
| Ernährungsmuster (wichtigste) | ✅ | — | — | Kernpfad |
| Zusatzstoffe/E-Nummern (sachliche Einordnung, Phase-B-light) | ✅ (light) | ✅ (vollständig) | — | Phase B: Basisseiten mit sachlicher Einordnung; Phase C: vollständige Tiefe, Toxikologie-Daten, alle E-Nummern |
| Alltagsheuristiken als Inhaltsmodul | ✅ | — | — | Explizit Reassessment; kein eigener Seitentyp — Content-Modul auf bestehenden Seiten |
| Crosslinks S1↔S18 (Nährstoff/Biomarker) | ✅ | — | — | Bidirektional; Phase B |
| Crosslinks S2↔S18 (Nährstoff/Supplement) | ✅ | — | — | Bidirektional; Phase B |
| Crosslinks S5↔S18 (Ernährung bei Erkrankung) | ✅ | — | — | Phase B (vorgezogen von Phase-2-Stand VW_06) |
| Crosslinks S6↔S18 (Lebensmittel-Medikament-Interaktionen) | ✅ | — | — | Via Lebensmittel-Detailseite; Phase B |
| Crosslinks S14↔S18 (Ernährungs-Claims) | — | ✅ | — | Erst wenn S14 gebaut ist (Phase C) |
| S15-Zeitachsen-Modul auf S18-Seiten | — | ✅ | — | Erst wenn S15 als Modul gebaut ist (Phase C) |
| Kindernährstoffbedarf als Toggle | — | ✅ | — | Analog S1-Toggle; nicht MVP |
| Vegane / allergiebedingte Filter | — | ✅ | — | Scope bleibt offen; nicht MVP |
| Personalisierung via S9 | — | — | ✅ | Erst Phase D (S9 existiert) |
| Personalisierter Einkaufskorb / Händler-Links | — | — | — | Phase E / No-Go bis Bewertungslogik vollständig |
| Produktvergleich auf Lebensmittelebene | — | — | ✅+ | Phase E; erst nach vollständiger Bewertungslogik |

### Kleinstmöglicher sinnvoller S18-Start (Phase B)

Phase B muss folgende Elemente enthalten, um als inhaltlich rund zu gelten:
- Nährstoff-Lexikon: Tagesbedarf (DGE/EFSA/NIH), Mangel/Überschuss, beste Nahrungsquellen, Biomarker-Bezug, Supplement-Alternative
- Lebensmittel-Kompass: Nährwertprofil, Nutzen/Risiken, Wechselwirkungen
- Ernährungsmuster: Mediterran, DASH, Low-Carb, Intervallfasten — mit Evidenz-Ampel
- Zusatzstoffe/E-Nummern: sachliche Basiseinordnung (Phase B-light)
- Alltagsheuristiken: als Content-Modul integriert (kein separater Seitentyp)
- Crosslinks: S1, S2, S5, S6

**Was explizit NICHT im Phase-B-Start ist:**
- S15-Zeitachsen-Modul (erst Phase C)
- S14-Crosslinks (erst Phase C)
- Kindernährstoffbedarf
- Vegane/Allergie-Filter

---

## 11. OFFENE PUNKTE FÜR SPÄTERES S18-SPEC-PAKET

Diese Punkte sind bewusst offen — sie sind Spec- oder Build-Themen, die erst im S18-Spec-Paket entschieden werden. Kein Build ohne Spec zu diesen Punkten.

| Offener Punkt | Warum offen | Priorität für Spec |
|--------------|-------------|-------------------|
| Genaue Seitenstruktur (7-Punkte-Raster für alle 4 Seitentypen) | Nur Nährstoff-Struktur aus VW_05 bekannt; Lebensmittel/Muster/E-Nummern noch nicht spezifiziert | Hoch (vor Build) |
| DGE-API: Verfügbarkeit und Nutzungsbedingungen | Offener Punkt aus VW_05, nicht verifiziert | Hoch (vor Pipeline) |
| Zusatzstoff/E-Nummer: Datentiefe Phase B vs. Phase C | Phase B = sachliche Einordnung; Phase C = vollständige Toxikologie — genaue Grenzlinie zu klären | Hoch |
| EFSA-Daten: Zugang und Automatisierungsgrad | Analog Cochrane-Problem in S3 — Zugang prüfen | Mittel |
| Crossblock-Struktur S5↔S18 (genauer Inhalt des Blocks) | Nur Existenz entschieden, Inhalt offen | Hoch |
| Vegane / allergiebedingte Filter: Scope-Entscheidung | Offen seit VW_05; jetzt auf Phase C geschoben — aber genaue Anforderungen nicht definiert | Mittel |
| Kindernährstoffbedarf: Toggle-Logik wie S1 | Analog S1; Entscheidung vertagt auf Phase C | Niedrig |
| Automatisierungsgrad je Datenpipeline (DGE, EFSA, USDA, PubMed) | In VW_05 mit ~75–80 % geschätzt; muss vor Pipeline-Bau konkretisiert werden | Hoch |
| Datenbankschema S18 | Nicht existiert; braucht eigene Spec-Entscheidung | Hoch (vor Build) |
| Routenstruktur und CSS-Prefix für S18-Frontend | Nicht definiert; braucht Spec (analog lw-*, supp-*, krank-*) | Mittel (vor Build) |

---

## 12. NO-GO-TABELLE

### Tabelle 5: No-Gos und bewusst spätere Themen

| Was | Klassifikation | Begründung |
|-----|---------------|------------|
| Rezeptportal oder Rezeptsammlung | **Dauerhaftes No-Go als Kern** | Explizit ausgeschlossen seit VW_05; kein Informationsprodukt im VitalWissen-Sinn |
| Ernährungstagebuch / Mahlzeitentracking | **Kein S18-Thema** | Nutzerdaten-Tracking → erst S9, Phase D; kein Content-Thema |
| Kalorientracker | **Kein S18-Thema** | Keine S18-Kernkompetenz; Scope-Drift |
| Abnehm-Coaching / Diät-Programme | **Kein S18-Thema** | Nicht VitalWissens Produktversprechen; medizinrechtlich heikel |
| Produktverkauf / Affiliate-Links (Lebensmittel) | **Dauerhaftes No-Go** | E01 (werbefrei/kein Affiliate) — unverhandelbar |
| Händler-Integration / Warenkorb-Logik | **Phase E (nicht vor vollständiger Bewertungslogik)** | Erst Bewertung, dann Produkt; keine Händler-Partnerschaft in Phase 1–4 |
| Produktvergleich auf Marken-/Händlerebene | **Phase E** | Erst nach vollständiger Bewertungslogik und Beweis-Führung |
| Supplement-Duplikation aus S2 | **Dauerhaft NEIN** | S18 zeigt Lebensmittelquellen; S2 erklärt das Supplement; Crosslink ja, Duplikat nein |
| „Health-Hack"- oder Influencer-Ernährungslogik | **Kein S18-Thema** | Das ist S14-Thema (Claim-Bewertung); S18 ist systematische Wissensdatenbank |
| Automatische personalisierte Ernährungsempfehlung ohne S9 | **Vor Phase D NEIN** | Personalisierung erst mit S9 (Phase D); davor: generische evidenzbasierte Inhalte |
| KI-generierte Quellen ohne Verifikation | **Dauerhaftes No-Go** | E28 (nur verlinkbare, professionell anerkannte Quellen) — gilt für S18 wie für alle Säulen |
| Build-Freigabe aus diesem Dokument | **Kein Build-Auftrag** | Dieses Dokument ist Freeze/Spec-Grundlage, kein Build-Auftrag |
| Datenbankschema-Entscheidung aus diesem Dokument | **Kein DB-Schema** | Schema kommt in S18-Spec-Paket, nicht hier |
| UX-Wireframes aus diesem Dokument | **Keine UX-Wireframes** | UX kommt in S18-Spec-Paket nach Build-Freigabe |

---

## 13. VALIDATOR-BLOCK

| # | Validator-Frage | Ergebnis | Anmerkung |
|---|----------------|----------|-----------|
| 1 | S18 klar als B2-Bereich verortet? | ✅ PASS | Abschnitt 7: primäre Einordnung B2; sekundäre Andockpunkte B3/B4 explizit begrenzt |
| 2 | S18 klar von S2 getrennt? | ✅ PASS | Tabelle 3: S18 = Nahrungsquelle, S2 = Supplement; Crosslink ja, Duplikat nein |
| 3 | S18 klar von S5 getrennt? | ✅ PASS | Tabelle 3: S5 erklärt Krankheit, S18 erklärt Ernährung; Crosslink bidirektional |
| 4 | S18 klar von S14 getrennt? | ✅ PASS | Tabelle 3: S14 = Claim-Einordnung, S18 = systematische Wissensdatenbank |
| 5 | S15 korrekt nur als Modul behandelt? | ✅ PASS | Abschnitt 8 + Tabelle 4: S15 dockt an S18 an, ist kein eigenständiger Navpunkt |
| 6 | Zusatzstoffe/E-Nummern explizit entschieden statt nur erwähnt? | ✅ PASS | Tabelle 1 + Abschnitt 6 + Tabelle 4: Phase B (light) für Basisseiten, Phase C für Volltiefe |
| 7 | Produktvergleich/Warenkorb explizit als später oder außerhalb des Kerns behandelt? | ✅ PASS | Tabelle 1 + Tabelle 5: Phase E / dauerhaftes No-Go für Affiliate |
| 8 | Keine implizite Build-Freigabe? | ✅ PASS | Abschnitt 14 (Ops-Closure): kein Build-Auftrag; Tabelle 5: No-Go für Build-Freigabe |
| 9 | Keine stillen Side Effects? | ✅ PASS | Read-only-Paket; nur 1 neue Datei erstellt |
| 10 | Genau 1 neue Datei erstellt? | ✅ PASS | Nur `P7D_S18_RESET_FREEZE.md`; keine weiteren Dateiänderungen |

**Alle 10 Validatoren: PASS.**

**Patch P7D-04a — Zusatz-Validatoren:**

| # | Validator-Frage | Ergebnis | Anmerkung |
|---|----------------|----------|-----------|
| 11 | Nur 1 Datei geändert — keine neue Datei erzeugt? | ✅ PASS | Nur `P7D_S18_RESET_FREEZE.md` gepatcht; keine neue Datei |
| 12 | Pakettrennung explizit klargestellt (Chat-Kontext nicht führend, kein P7D-03/S3-Overlap)? | ✅ PASS | Abschnitt 0 eingefügt |
| 13 | S5↔S18 als neue Paketentscheidung markiert, VW_06-Altstand sauber überführt statt überschrieben? | ✅ PASS | Abschnitt 7: S5-Hinweis als „NEUE PAKETENTSCHEIDUNG" explizit gelabelt; VW_06 nicht geändert |
| 14 | S18↔S6 nur als Schnittstellenlogik/Spec, nicht als aktive Phase-B-Endnutzer-Verbindung formuliert? | ✅ PASS | Abschnitt 7: S6-Crosslink auf Spec-Ziel korrigiert + Hinweis eingefügt; Abschnitt 8: S18 ≠ S6 explizit ergänzt |
| 15 | Keine Strategiedrift gegenüber P7D_ARCHITECTURE_RESET_FREEZE.md? | ✅ PASS | Alle Entscheidungen innerhalb P7D-Rahmen |
| 16 | Kein Commit/Push/Deploy/DB-Write? | ✅ PASS | Read-only-Patch; nur Datei-Write |

**Alle 16 Validatoren (inkl. P7D-04a-Patch): PASS.**

---

## 14. OPS CLOSURE

### A — Geänderte/erstellte Dateien

| Datei | Aktion |
|-------|--------|
| `01_PROJECT_SOURCES_CURRENT/P7D_S18_RESET_FREEZE.md` | ✅ NEU ERSTELLT (initiales Paket) |
| `01_PROJECT_SOURCES_CURRENT/P7D_S18_RESET_FREEZE.md` | ✅ GEPATCHT (P7D-04a: Abschnitt 0 eingefügt, S5-Hinweis geschärft, S6-Crosslink korrigiert, S18 ≠ S6 ergänzt, Validatoren erweitert, Ops Closure aktualisiert) |

Keine weiteren Dateien geändert. `VW_06_WEBSITE.md` und `VW_05_SAEULEN.md` unberührt.

### B — Was inhaltlich entschieden wurde

**Initiales Paket (P7D S18 Reset/Freeze):**
1. **S18-Kernaufgabe** neu gefasst: „Ernährung verstehen, bewerten, anwenden" — breiter als bisheriger VW_05-Stand
2. **Zusatzstoffe/E-Nummern**: Phase B (light/Basisseiten), Phase C (vollständig) — war explizit offen in P7D, jetzt entschieden
3. **Krankheits-Crosslink S5↔S18**: Phase B — von Phase 2 (VW_06) auf Phase B vorgezogen (**NEUE PAKETENTSCHEIDUNG**)
4. **Kernobjekte**: Nährstoff, Lebensmittel, Ernährungsmuster, Zusatzstoff/E-Nummer als eigenständige Kernobjekte (K8-Sub-Objekte) bestätigt; Heuristiken, krankheitsbezogene und laborwertbezogene Ernährungsempfehlung als Crosslink-Module (keine eigenständigen Kernobjekte)
5. **Phase-B-Startumfang** definiert: 4 Seitentypen + Crosslinks S1/S2/S5/S6
6. **Phase-C/D/E-Grenzen** gezogen: S15-Modul = C; Personalisierung = D; Produktvergleich/Warenkorb = E
7. **No-Gos** explizit benannt: Rezeptportal, Tracking, Affiliate, Supplement-Duplikation, Warenkorb

**Clarification Patch P7D-04a (19.04.2026):**
8. **Pakettrennung** operativ nachgezogen: Abschnitt 0 eingefügt — Dokument steht unabhängig vom Chat-Kontext, keine Vermischung mit P7D-03/S3
9. **S5↔S18 als neue Paketentscheidung explizit markiert**: VW_06-Altstand (Phase 2) bleibt dort erhalten; Vorzug auf Phase B ist Freeze-Entscheidung dieses Pakets, kein behaupteter früherer Kanon
10. **S18↔S6 auf Schnittstellenlogik begrenzt**: S6-Crosslink in Tabelle korrigiert (Spec-Ziel, nicht aktive Phase-B-Endnutzer-Verbindung); S18 ≠ S6 in Trennschärfe-Tabelle ergänzt

### C — Was bewusst offen blieb

| Offener Punkt | Warum offen |
|--------------|-------------|
| Genaue Seitenstruktur (alle 4 Seitentypen) | S18-Spec-Paket |
| Datenbankschema S18 | S18-Spec-Paket |
| DGE-API-Verfügbarkeit | Vor Pipeline-Bau zu prüfen |
| Zusatzstoff/E-Nummer: genaue Phase-B/C-Grenzlinie | S18-Spec-Paket |
| Vegane/allergiebedingte Filter | Phase C, genaue Anforderungen offen |
| Kindernährstoffbedarf | Phase C |
| Crossblock-Inhalt S5↔S18 (genaue Felder) | S18-Spec-Paket |
| Routenstruktur und CSS-Prefix | S18-Spec-Paket |

### D — Validator-Ergebnis

Alle 16 Validatoren (inkl. P7D-04a-Patch): **PASS** (→ Tabellen in Abschnitt 13)

### E — Ops-Status

| Parameter | Status |
|-----------|--------|
| **Lokale Speicherung** | ✅ Datei gepatcht: `01_PROJECT_SOURCES_CURRENT/P7D_S18_RESET_FREEZE.md` (P7D-04a Clarification Patch, 10 Edits) |
| **git status** | Keine git-Operation ausgeführt — Datei liegt nur lokal im Arbeitsordner |
| **Commit-Status** | Kein Commit |
| **Push-Status** | Kein Push |
| **DB-Writes** | Keine |
| **Deploy** | Kein Deploy |
| **Offener Side Effect** | Keiner |

---

**S18-Reset/Freeze ist damit inhaltlich abgeschlossen, technisch read-only, operativ abgesichert; keine weiteren Änderungen/Writes/Commits/Pushes/Deploys für dieses Paket.**

---

*Erstellt: 19.04.2026 — P7D S18 Reset/Freeze abgeschlossen.*  
*Gepatcht: 19.04.2026 — P7D-04a Clarification Patch: Pakettrennung nachgezogen, S5↔S18 als neue Paketentscheidung explizit markiert, S18↔S6 auf Schnittstellenlogik begrenzt.*  
*Führende S18-Scope-Quelle ab diesem Datum: dieses Dokument (vor VW_05_SAEULEN.md für S18-spezifische Fragen).*  
*Nächster zulässiger Schritt für S18: S18-Spec-Paket (Datenbankschema, Seitenstruktur, Pipeline-Spec) — erst nach expliziter Build-Freigabe.*
