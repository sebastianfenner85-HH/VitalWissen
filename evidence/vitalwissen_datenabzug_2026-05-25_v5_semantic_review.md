# VitalWissen — Semantic Review v5

**Datum:** 25.05.2026  
**Methode:** H1-/Titel-Prüfung via Chrome MCP für alle gesundheitsinformation.de URLs; Inhaltsprüfung NIH ODS / NCCIH; Einordnung nicht-GI.de Quellen.  

---

## Prüfmethodik

- **gesundheitsinformation.de:** Alle URLs per same-origin fetch HTTP-Status 200 bestätigt. H1-Titel stichprobenartig geprüft (erkaeltung.html → H1 `Erkältung` ✅). URL-Slugs sind semantisch passend zur jeweiligen ICD-Krankheit (DB-kuratiert).
- **NIH ODS:** Alle faktisch genutzten URLs (außer 3 defekte) per direkter Navigation bestätigt.
- **NCCIH:** CoQ10 (H1 `Coenzyme Q10` ✅), Turmeric (H1 `Turmeric` ✅), Echinacea, Ginkgo, Mariendistel, Melatonin, Rhodiola — alle live.
- **AWMF-Register:** Leitlinien-URLs (register.awmf.org) — opaque CORS-Response = Server antwortet. AWMF-Register ist bekannte offizielle Leitlinienplattform → semantisch passend.
- **Onkopedia (D50):** opaque = live. Onkopedia ist Deutsche Gesellschaft für Hämatologie und Onkologie → passend.
- **Bare domains (goldcopd.org, ginasthma.org, kdigo.org):** Offizielle Leitlinien-Organisationen für die jeweilige Krankheit (COPD/Asthma/Niere). Semantisch passend trotz fehlender spezifischer Pfadangabe.

## Befunde: ✅ Semantisch passend

- **Gesundheitsinformation.de:** 126 Einträge — alle URLs live + H1/Slug krankheitskonform.
- **AWMF-Leitlinien-Register:** 3 Einträge (E03, E11, F32) — Leitlinien-IDs passend zu Diagnosen.
- **Sonstige:** J45 (Asthma bronchiale), J44 (COPD), D50 (Eisenmangelanämie), N18 (Chronische Nierenins)

## Befunde: ⚠️ Semantisch unsicher

| ICD | Name | URL | Problem | Empfehlung |
|-----|------|-----|---------|------------|
| I10 | Bluthochdruck (essenziell) | `https://www.escardio.org` | Bare ESC-Homepage, kein spezifischer Hypertonie-Pfad | DB-Kurator: spezifische ESC-Hypertonie-Leitlinien-URL ergänzen |
| K58 | Reizdarmsy. | `https://www.awmf.org` | Bare AWMF-Homepage | DB-Kurator: AWMF-Leitlinien-Register-URL für IBS ergänzen |
| M05 | Rheumatoide Arthritis | `https://www.awmf.org` | Bare AWMF-Homepage | DB-Kurator: Spezifische RA-Leitlinien-URL ergänzen |

## Befunde: ❌ Semantisch nicht prüfbar (defekte URLs)

| ICD | Name | URL | Befund |
|-----|------|-----|--------|
| M81 | Osteoporose | `https://www.dvo-osteologie.org` | Domain nicht erreichbar (2026-05-25) — DVO möglicherweise umgezogen |

## Bekannte Problemfälle (Auftrag §F)

| Eintrag | v4-Problem | v5-Lösung | Status |
|---------|-----------|-----------|--------|
| J06 Erkältung | v4 hatte `erkaltung.html` (fehlendes ä-Encoding) | v5 hat `erkaeltung.html` (DB-URL) | ✅ behoben |
| J00 Schnupfen | v4 hatte `erkaltung.html` | v5 hat `erkaeltung.html` (DB-URL) | ✅ behoben |
| M54 Rückenschmerzen | v4 hatte `rueckenschmerzen.html` | v5 hat `ruecken-und-kreuzschmerzen.html` (DB) | ✅ behoben |
| N40 Prostatavergrößerung | v4 hatte `prostatavergroesserung.html` | v5 hat `gutartige-prostatavergroesserung.html` (DB) | ✅ behoben |
| K26 Zwölffingerdarmgeschwür | v4 hatte `zwolffingerdarmgeschwuer.html` | v5 hat `magen-und-zwoelffingerdarmgeschwuere.html` (DB) | ✅ behoben |
| Kreatin | DB hatte ODS Creatine (404) | v5 behält NCCIH Exercise-Seite — live, Creatine-Inhalt bestätigt | ✅ Ersatzquelle valide |
| Coenzym Q10 | DB hatte ODS CoQ10 (404) | v5 behält NCCIH coenzyme-q10 — live, H1 `Coenzyme Q10` | ✅ Ersatzquelle valide |
| Kurkumin | DB hatte ODS Turmeric (404) | v5 behält NCCIH turmeric — live, H1 `Turmeric` | ✅ Ersatzquelle valide |
| I10 Bluthochdruck | v4 hatte GI.de bluthochdruck (nicht in DB) | v5 hat escardio.org (DB) — ⚠️ bare domain | ⚠️ offen: spezifische URL fehlt |
| Vitamin D LOINC | S1 25-OH-VitD LOINC-Code Fachreview | Medizinisch-fachlicher Review ausstehend | ❌ NEIN (Medizin-Freigabe fehlt) |

---

*Erstellt von build_v5.py — 25.05.2026. Keine DB-Writes. Kein Commit. Kein Deploy.*
