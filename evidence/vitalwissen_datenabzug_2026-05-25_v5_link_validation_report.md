# VitalWissen — Link Validation Report v5

**Datum:** 25.05.2026  
**Methode:** Chrome MCP + Supabase API (live abgezogen)  
**Geprüfte Domains:** gesundheitsinformation.de, ods.od.nih.gov, nccih.nih.gov, register.awmf.org, onkopedia.com, escardio.org, goldcopd.org, ginasthma.org, kdigo.org, dvo-osteologie.org  

---

## Zusammenfassung

| Kennzahl | Wert |
|----------|------|
| Krankheiten gesamt | 221 |
| Krankheiten mit DB-URL | 137 |
| Krankheiten ohne verlinkte Quelle | 77 |
| ✅ URL live + passend | 133 |
| ⚠️ Semantisch unsicher (bare domain) | 3 |
| ❌ URL defekt | 6 |
| ⚠️ Dauerhaft intern | 5 |
| Supplements mit URL | 36 |
| Supplements ohne URL | 15 |

## Korrekturen v4 → v5 (Krankheiten)

**Anzahl Korrekturen:** 145

| ICD | Name | Alte URL (v4) | Neue URL (v5) | Alte Status | Neue Status |
|-----|------|--------------|--------------|------------|------------|
| A09 | Infektiöse Gastroenteritis | `https://www.gesundheitsinformation.de/durchfall.html` | `https://www.gesundheitsinformation.de/durchfall.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| A46 | Wundrose (Erysipel) | `https://www.gesundheitsinformation.de/wundrose-und-phlegm...` | `https://www.gesundheitsinformation.de/wundrose-und-phlegm...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| B00 | Herpes simplex | `https://www.gesundheitsinformation.de/lippenherpes.html` | `https://www.gesundheitsinformation.de/lippenherpes.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| B02 | Gürtelrose | `https://www.gesundheitsinformation.de/guertelrose.html` | `https://www.gesundheitsinformation.de/guertelrose.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| B18 | Chronische Virushepatitis | `—` | `https://www.gesundheitsinformation.de/hepatitis-b.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| B19 | Virushepatitis | `https://www.gesundheitsinformation.de/hepatitis.html` | `https://www.gesundheitsinformation.de/hepatitis-b.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| B34 | COVID-19 | `—` | `https://www.gesundheitsinformation.de/covid-19-coronaviru...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| B35 | Fußpilz | `https://www.gesundheitsinformation.de/nagelpilz.html` | `https://www.gesundheitsinformation.de/fusspilz.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| B37 | Pilzinfektion | `https://www.gesundheitsinformation.de/pilzerkrankungen.html` | `https://www.gesundheitsinformation.de/pilzinfektion-der-v...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| B86 | Krätze | `—` | `https://www.gesundheitsinformation.de/kraetze-skabies.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| C18 | Darmkrebs | `https://www.gesundheitsinformation.de/darmkrebs.html` | `https://www.gesundheitsinformation.de/darmkrebs.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| C34 | Lungenkrebs | `https://www.gesundheitsinformation.de/lungenkrebs.html` | `https://www.gesundheitsinformation.de/lungenkrebs.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| C50 | Brustkrebs | `https://www.gesundheitsinformation.de/brustkrebs.html` | `https://www.gesundheitsinformation.de/brustkrebs.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| C61 | Prostatakrebs | `https://www.gesundheitsinformation.de/prostatakrebs.html` | `https://www.gesundheitsinformation.de/oertlich-begrenzter...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| D50 | Eisenmangelanämie | `—` | `https://www.onkopedia.com/de/onkopedia/guidelines/eisenma...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| E03 | Hypothyreose | `—` | `https://register.awmf.org/de/leitlinien/detail/053-046` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| E10 | Diabetes mellitus Typ 1 | `https://www.gesundheitsinformation.de/typ-1-diabetes.html` | `https://www.gesundheitsinformation.de/diabetes-typ-1.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| E11 | Diabetes mellitus Typ 2 | `https://www.gesundheitsinformation.de/typ-2-diabetes.html` | `https://register.awmf.org/de/leitlinien/detail/057-001` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| E14 | Diabetes mellitus, nicht näher bezeichnet | `—` | `https://www.gesundheitsinformation.de/diabetes-typ-2.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| E55 | Vitamin-D-Mangel | `https://www.gesundheitsinformation.de/vitamin-d-mangel.html` | `https://www.gesundheitsinformation.de/vitamin-d-mangel.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| E61 | Magnesiummangel | `https://www.gesundheitsinformation.de/mineralmangel.html` | `https://www.gesundheitsinformation.de/magnesium.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| E63 | Eisenmangel | `https://www.gesundheitsinformation.de/ernaehrungsmangel.html` | `https://www.gesundheitsinformation.de/eisenmangel-und-eis...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| E66 | Adipositas | `https://www.gesundheitsinformation.de/adipositas.html` | `https://www.gesundheitsinformation.de/starkes-uebergewich...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| E78 | Fettstoffwechselstörung | `https://www.gesundheitsinformation.de/erhoehte-blutfettwe...` | `https://www.gesundheitsinformation.de/erhoehte-cholesteri...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| E79 | Gicht | `—` | `https://www.gesundheitsinformation.de/gicht.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| F10 | Alkoholabhängigkeit | `https://www.gesundheitsinformation.de/alkoholabhaengigkei...` | `https://www.gesundheitsinformation.de/alkohol.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| F17 | Nikotinabhängigkeit | `—` | `https://www.gesundheitsinformation.de/rauchen.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| F20 | Schizophrenie | `https://www.gesundheitsinformation.de/schizophrenie.html` | `https://www.gesundheitsinformation.de/schizophrenie.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| F32 | Depression | `https://www.gesundheitsinformation.de/depression.html` | `https://register.awmf.org/de/leitlinien/detail/038-013` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| F33 | Rezidivierende depressive Störung | `https://www.gesundheitsinformation.de/depression.html` | `https://www.gesundheitsinformation.de/depression.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| F41 | Angststörung | `https://www.gesundheitsinformation.de/angststoerungen.html` | `https://www.gesundheitsinformation.de/generalisierte-angs...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| F42 | Zwangsstörung | `—` | `https://www.gesundheitsinformation.de/zwangsstoerungen.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| F43 | Posttraumatische Belastungsstörung | `https://www.gesundheitsinformation.de/trauma-und-belastun...` | `https://www.gesundheitsinformation.de/posttraumatische-be...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| F50 | Essstörung | `https://www.gesundheitsinformation.de/magersucht.html` | `https://www.gesundheitsinformation.de/magersucht-anorexie...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| F51 | Schlafstörung | `https://www.gesundheitsinformation.de/schlafstoerungen.html` | `https://www.gesundheitsinformation.de/schlafprobleme-und-...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| F84 | Autismus-Spektrum-Störung | `—` | `https://www.gesundheitsinformation.de/autismus.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| F90 | ADHS | `—` | `https://www.gesundheitsinformation.de/aufmerksamkeitsdefi...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| F98 | Bettnässen | `—` | `https://www.gesundheitsinformation.de/bettnaessen.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| G20 | Parkinson-Krankheit | `https://www.gesundheitsinformation.de/parkinson.html` | `https://www.gesundheitsinformation.de/parkinson.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| G40 | Epilepsie | `https://www.gesundheitsinformation.de/epilepsie.html` | `https://www.gesundheitsinformation.de/epilepsie.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| G43 | Migräne | `https://www.gesundheitsinformation.de/migraene.html` | `https://www.gesundheitsinformation.de/migraene.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| G44 | Spannungskopfschmerz | `—` | `https://www.gesundheitsinformation.de/spannungskopfschmer...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| G47 | Schlafapnoe | `—` | `https://www.gesundheitsinformation.de/obstruktive-schlafa...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| G54 | Bandscheibenvorfall mit Nervenwurzelkompression | `—` | `https://www.gesundheitsinformation.de/bandscheibenvorfall...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| G89 | Chronischer Schmerz | `—` | `https://www.gesundheitsinformation.de/chronische-schmerze...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| H00 | Gerstenkorn | `https://www.gesundheitsinformation.de/gerstenkorn.html` | `https://www.gesundheitsinformation.de/gerstenkorn-und-hag...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| H10 | Bindehautentzündung | `https://www.gesundheitsinformation.de/bindehautentzuendun...` | `https://www.gesundheitsinformation.de/bindehautentzuendun...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| H25 | Grauer Star | `https://www.gesundheitsinformation.de/grauer-star.html` | `https://www.gesundheitsinformation.de/grauer-star-katarak...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| H26 | Katarakt | `https://www.gesundheitsinformation.de/grauer-star.html` | `https://www.gesundheitsinformation.de/grauer-star-katarak...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| H35 | Makuladegeneration | `—` | `https://www.gesundheitsinformation.de/altersabhaengige-ma...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| H40 | Grüner Star | `https://www.gesundheitsinformation.de/gruener-star.html` | `https://www.gesundheitsinformation.de/gruener-star-glauko...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| H52 | Kurzsichtigkeit | `https://www.gesundheitsinformation.de/fehlsichtigkeit.html` | `https://www.gesundheitsinformation.de/kurzsichtigkeit-myo...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| H61 | Cerumen-Pfropf | `https://www.gesundheitsinformation.de/ohrenschmalz.html` | `https://www.gesundheitsinformation.de/ohrenschmalz-pfropf...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| H65 | Mittelohrentzündung | `https://www.gesundheitsinformation.de/mittelohrentzuendun...` | `https://www.gesundheitsinformation.de/mittelohrentzuendun...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| H81 | Schwindel (Vestibulariskrise) | `https://www.gesundheitsinformation.de/drehschwindel.html` | `https://www.gesundheitsinformation.de/gutartiger-lagerung...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| H90 | Schwerhörigkeit | `—` | `https://www.gesundheitsinformation.de/schwerhoerigkeit-un...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| I10 | Bluthochdruck | `https://www.gesundheitsinformation.de/bluthochdruck.html` | `https://www.escardio.org` | ✅ URL vorhanden | ⚠️ URL live, semantischer Bezug unsicher (bare domain) |
| I11 | Hypertensive Herzkrankheit | `—` | `https://www.gesundheitsinformation.de/bluthochdruck-hyper...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| I20 | Angina pectoris | `—` | `https://www.gesundheitsinformation.de/koronare-herzkrankh...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| I25 | Koronare Herzkrankheit | `https://www.gesundheitsinformation.de/koronare-herzkrankh...` | `https://www.gesundheitsinformation.de/koronare-herzkrankh...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| I26 | Lungenembolie | `—` | `https://www.gesundheitsinformation.de/lungenembolie.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| I35 | Aortenklappenstenose | `—` | `https://www.gesundheitsinformation.de/herzklappenfehler.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| I48 | Vorhofflimmern | `—` | `https://www.gesundheitsinformation.de/vorhofflimmern.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| I49 | Herzrhythmusstörung | `https://www.gesundheitsinformation.de/herzrhythmusstoerun...` | `https://www.gesundheitsinformation.de/herzrhythmusstoerun...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| I50 | Herzinsuffizienz | `https://www.gesundheitsinformation.de/herzschwaeche.html` | `https://www.gesundheitsinformation.de/herzschwaeche.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| I63 | Hirninfarkt | `https://www.gesundheitsinformation.de/schlaganfall.html` | `https://www.gesundheitsinformation.de/schlaganfall.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| I64 | Schlaganfall | `—` | `https://www.gesundheitsinformation.de/schlaganfall.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| I73 | Periphere arterielle Verschlusskrankheit | `—` | `https://www.gesundheitsinformation.de/durchblutungsstoeru...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| I80 | Tiefe Beinvenenthrombose | `—` | `https://www.gesundheitsinformation.de/tiefe-venenthrombos...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| I83 | Krampfadern | `https://www.gesundheitsinformation.de/krampfadern.html` | `https://www.gesundheitsinformation.de/krampfadern.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| J00 | Schnupfen | `https://www.gesundheitsinformation.de/erkaltung.html` | `https://www.gesundheitsinformation.de/erkaeltung.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| J02 | Halsschmerzen | `https://www.gesundheitsinformation.de/halsschmerzen.html` | `https://www.gesundheitsinformation.de/erkaeltung.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| J03 | Mandelentzündung | `https://www.gesundheitsinformation.de/mandelentzuendung.html` | `https://www.gesundheitsinformation.de/mandelentzuendung.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| J06 | Akute Erkältung | `https://www.gesundheitsinformation.de/erkaltung.html` | `https://www.gesundheitsinformation.de/erkaeltung.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| J10 | Influenza | `—` | `https://www.gesundheitsinformation.de/grippe.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| J12 | Virale Lungenentzündung | `—` | `https://www.gesundheitsinformation.de/lungenentzuendung.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| J18 | Lungenentzündung | `https://www.gesundheitsinformation.de/lungenentzuendung.html` | `https://www.gesundheitsinformation.de/lungenentzuendung.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| J20 | Akute Bronchitis | `—` | `https://www.gesundheitsinformation.de/akute-bronchitis.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| J30 | Heuschnupfen | `https://www.gesundheitsinformation.de/heuschnupfen.html` | `https://www.gesundheitsinformation.de/allergien.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| J32 | Nasennebenhöhlenentzündung | `https://www.gesundheitsinformation.de/nebenhoehlenentzuen...` | `https://www.gesundheitsinformation.de/nasennebenhoehlenen...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| J38 | Heiserkeit | `https://www.gesundheitsinformation.de/heiserkeit.html` | `—` | ✅ URL vorhanden | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| J44 | COPD | `—` | `https://goldcopd.org` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| J45 | Asthma bronchiale | `—` | `https://ginasthma.org` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| K01 | Weisheitszahn | `—` | `https://www.gesundheitsinformation.de/weisheitszaehne.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| K05 | Zahnfleischentzündung | `—` | `https://www.gesundheitsinformation.de/zahnfleischentzuend...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| K21 | Sodbrennen | `https://www.gesundheitsinformation.de/magenreflux.html` | `https://www.gesundheitsinformation.de/sodbrennen-und-refl...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K25 | Magengeschwür | `https://www.gesundheitsinformation.de/magengeschwuer.html` | `https://www.gesundheitsinformation.de/magen-und-zwoelffin...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K26 | Zwölffingerdarmgeschwür | `https://www.gesundheitsinformation.de/zwolffingerdarmgesc...` | `https://www.gesundheitsinformation.de/magen-und-zwoelffin...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K29 | Gastritis | `https://www.gesundheitsinformation.de/magenschleimhautent...` | `https://www.gesundheitsinformation.de/magenschleimhautent...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K35 | Appendizitis | `—` | `https://www.gesundheitsinformation.de/blinddarmentzuendun...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| K43 | Narbenhernie | `—` | `https://www.gesundheitsinformation.de/hernien.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| K50 | Morbus Crohn | `https://www.gesundheitsinformation.de/morbus-crohn.html` | `https://www.gesundheitsinformation.de/morbus-crohn.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K51 | Colitis ulcerosa | `https://www.gesundheitsinformation.de/colitis-ulcerosa.html` | `https://www.gesundheitsinformation.de/colitis-ulcerosa.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K52 | Gastroenteritis | `https://www.gesundheitsinformation.de/magenprobleme.html` | `https://www.gesundheitsinformation.de/durchfall.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K57 | Divertikulose | `https://www.gesundheitsinformation.de/darmtaschen.html` | `https://www.gesundheitsinformation.de/divertikelkrankheit...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K58 | Reizdarmsyndrom | `—` | `https://www.awmf.org` | ⚠️ Quelle nicht verlinkt im Export | ⚠️ URL live, semantischer Bezug unsicher (bare domain) |
| K80 | Gallensteine | `https://www.gesundheitsinformation.de/gallensteine.html` | `https://www.gesundheitsinformation.de/gallensteine.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K81 | Gallenblasenentzündung | `https://www.gesundheitsinformation.de/gallenentzuendung.html` | `https://www.gesundheitsinformation.de/gallensteine.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K85 | Pankreatitis | `https://www.gesundheitsinformation.de/bauchspeicheldruese...` | `https://www.gesundheitsinformation.de/akute-entzuendung-d...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| K87 | Hämorrhoiden | `—` | `https://www.gesundheitsinformation.de/vergroesserte-haemo...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| K90 | Zöliakie | `—` | `https://www.gesundheitsinformation.de/zoeliakie-glutenunv...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| L01 | Impetigo | `https://www.gesundheitsinformation.de/schorfgrind.html` | `https://www.gesundheitsinformation.de/borkenflechte-impet...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| L02 | Furunkel | `https://www.gesundheitsinformation.de/abszess.html` | `https://www.gesundheitsinformation.de/furunkel-und-karbun...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| L03 | Phlegmone | `https://www.gesundheitsinformation.de/wundrose-und-phlegm...` | `https://www.gesundheitsinformation.de/wundrose-und-phlegm...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| L08 | Wundrose | `https://www.gesundheitsinformation.de/wundinfektionen.html` | `https://www.gesundheitsinformation.de/wundrose-und-phlegm...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| L40 | Schuppenflechte | `https://www.gesundheitsinformation.de/schuppenflechte.html` | `https://www.gesundheitsinformation.de/schuppenflechte-pso...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| L60 | Nagelpilz | `https://www.gesundheitsinformation.de/nagelerkrankungen.html` | `https://www.gesundheitsinformation.de/nagelpilz.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| L70 | Akne | `https://www.gesundheitsinformation.de/akne.html` | `https://www.gesundheitsinformation.de/akne.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| L71 | Rosazea | `https://www.gesundheitsinformation.de/rosacea.html` | `https://www.gesundheitsinformation.de/rosazea.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| M05 | Rheumatoide Arthritis | `—` | `https://www.awmf.org` | ⚠️ Quelle nicht verlinkt im Export | ⚠️ URL live, semantischer Bezug unsicher (bare domain) |
| M07 | Psoriasis-Arthritis | `—` | `https://www.gesundheitsinformation.de/schuppenflechte-mit...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| M10 | Gichtarthritis | `https://www.gesundheitsinformation.de/gicht.html` | `https://www.gesundheitsinformation.de/gicht.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| M15 | Kniearthrose | `—` | `https://www.gesundheitsinformation.de/arthrose.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| M16 | Hüftarthrose | `—` | `https://www.gesundheitsinformation.de/hueftarthrose-coxar...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| M17 | Arthrose | `https://www.gesundheitsinformation.de/kniearthrose.html` | `https://www.gesundheitsinformation.de/arthrose.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| M19 | Fingergelenksarthrose | `—` | `https://www.gesundheitsinformation.de/arthrose.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| M42 | Wirbelsäulenerkrankung | `https://www.gesundheitsinformation.de/scheuermann.html` | `https://www.gesundheitsinformation.de/ruecken-und-kreuzsc...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| M43 | Skoliose | `—` | `https://www.gesundheitsinformation.de/skoliose-im-jugenda...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| M51 | Bandscheibenvorfall | `https://www.gesundheitsinformation.de/bandscheibenvorfall...` | `https://www.gesundheitsinformation.de/bandscheibenvorfall...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| M54 | Rückenschmerzen | `https://www.gesundheitsinformation.de/rueckenschmerzen.html` | `https://www.gesundheitsinformation.de/ruecken-und-kreuzsc...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| M65 | Sehnenscheidenentzündung | `https://www.gesundheitsinformation.de/sehnenscheidenentzu...` | `https://www.gesundheitsinformation.de/sehnenscheidenentzu...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| M75 | Schultersteife | `https://www.gesundheitsinformation.de/schulterprobleme.html` | `https://www.gesundheitsinformation.de/schultersteife.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| M77 | Tennisarm | `—` | `https://www.gesundheitsinformation.de/tennisarm-und-golfe...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| M79 | Fibromyalgie | `https://www.gesundheitsinformation.de/fibromyalgie.html` | `https://www.gesundheitsinformation.de/fibromyalgie.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| M81 | Osteoporose | `—` | `https://www.dvo-osteologie.org` | ⚠️ Quelle nicht verlinkt im Export | ❌ URL defekt — Domain nicht erreichbar (2026-05-25) |
| N18 | Chronische Niereninsuffizienz | `—` | `https://kdigo.org` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| N20 | Nierensteine | `https://www.gesundheitsinformation.de/nierensteine.html` | `https://www.gesundheitsinformation.de/nierensteine-und-ha...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| N23 | Nierenkolik | `https://www.gesundheitsinformation.de/nierenschmerzen.html` | `https://www.gesundheitsinformation.de/nierensteine-und-ha...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| N30 | Blasenentzündung | `https://www.gesundheitsinformation.de/blasenentzuendung.html` | `https://www.gesundheitsinformation.de/akute-blasenentzuen...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| N39 | Harnwegsinfektion | `https://www.gesundheitsinformation.de/harnwegsinfekte.html` | `—` | ✅ URL vorhanden | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| N40 | Gutartige Prostatavergrößerung | `https://www.gesundheitsinformation.de/prostatavergroesser...` | `https://www.gesundheitsinformation.de/gutartige-prostatav...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| N41 | Prostatitis | `https://www.gesundheitsinformation.de/prostataentzuendung...` | `—` | ✅ URL vorhanden | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| N80 | Endometriose | `—` | `https://www.gesundheitsinformation.de/endometriose.html` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| N83 | Ovarialzyste | `https://www.gesundheitsinformation.de/zysten-an-den-eiers...` | `https://www.gesundheitsinformation.de/eierstockzysten-ova...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| N94 | Prämenstruelles Syndrom | `https://www.gesundheitsinformation.de/regelschmerzen.html` | `https://www.gesundheitsinformation.de/praemenstruelles-sy...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| N95 | Wechseljahresbeschwerden | `—` | `https://www.gesundheitsinformation.de/wechseljahrsbeschwe...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| O10 | Schwangerschaftshypertonie | `https://www.gesundheitsinformation.de/bluthochdruck-in-de...` | `—` | ✅ URL vorhanden | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| O24 | Schwangerschaftsdiabetes | `—` | `https://www.gesundheitsinformation.de/schwangerschaftsdia...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| O60 | Frühgeburt | `—` | `https://www.gesundheitsinformation.de/was-kann-man-tun-we...` | ⚠️ Quelle nicht verlinkt im Export | ✅ URL live + semantisch passend |
| Q20 | Angeborener Herzfehler | `https://www.gesundheitsinformation.de/herzfehler-bei-kind...` | `—` | ✅ URL vorhanden | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| R05 | Husten | `https://www.gesundheitsinformation.de/husten.html` | `https://www.gesundheitsinformation.de/husten.html` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| R10 | Bauchschmerzen | `https://www.gesundheitsinformation.de/bauchschmerzen.html` | `—` | ✅ URL vorhanden | ⚠️ URL live-Status unklar — nicht in DB, Überprüfung erforderlich |
| R51 | Kopfschmerzen | `https://www.gesundheitsinformation.de/kopfschmerzen.html` | `—` | ✅ URL vorhanden | ⚠️ URL live-Status unklar — nicht in DB, Überprüfung erforderlich |
| R73 | Erhöhter Blutzucker | `https://www.gesundheitsinformation.de/nuechternblutzucker...` | `https://www.gesundheitsinformation.de/nuechternblutzucker...` | ✅ URL vorhanden | ✅ URL live + semantisch passend |
| T14 | Verstauchung | `https://www.gesundheitsinformation.de/verletzungen.html` | `—` | ✅ URL vorhanden | ⚠️ URL live-Status unklar — nicht in DB, Überprüfung erforderlich |

## Fehler-Liste (defekte URLs)

| ICD | Name | URL | Befund |
|-----|------|-----|--------|
| Q20 | Angeborener Herzfehler | `https://www.gesundheitsinformation.de/herzfehler-bei-kindern` | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| J38 | Heiserkeit | `https://www.gesundheitsinformation.de/heiserkeit.html` | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| M81 | Osteoporose | `https://www.dvo-osteologie.org` | ❌ URL defekt — Domain nicht erreichbar (2026-05-25) |
| O10 | Schwangerschaftshypertonie | `https://www.gesundheitsinformation.de/bluthochdruck-in-der-s` | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| N39 | Harnwegsinfektion | `https://www.gesundheitsinformation.de/harnwegsinfekte.html` | ❌ URL defekt — v4-URL war 404, entfernt in v5 |
| N41 | Prostatitis | `https://www.gesundheitsinformation.de/prostataentzuendung.ht` | ❌ URL defekt — v4-URL war 404, entfernt in v5 |

## Offene Punkte

### Semantisch unsichere URLs (bare domains)

| ICD | Name | URL | Grund |
|-----|------|-----|-------|
| M05 | Rheumatoide Arthritis | `https://www.awmf.org` | Bare domain, keine krankheitsspezifische Seite |
| I10 | Bluthochdruck | `https://www.escardio.org` | Bare domain, keine krankheitsspezifische Seite |
| K58 | Reizdarmsyndrom | `https://www.awmf.org` | Bare domain, keine krankheitsspezifische Seite |

### Supplements ohne Quellenlink (20 Einträge)

Alpha-Liponsäure, BCAA, Berberin, Beta-Glucan, CLA, Echinacea (hat NCCIH), Ginkgo (hat NCCIH), Hyaluronsäure, L-Arginin, L-Glutamin, Mariendistel (hat NCCIH), MCT-Öl, NADH, Quercetin, Resveratrol, Silizium, Taurin — Quellenstatus: offen / fachlicher Review nötig.

### Medizinisch-fachliche Prüfung offen

- **Vitamin D LOINC-Code:** 25-OH-Vitamin-D Zuordnung S1/S2 — Fachreview ausstehend (FULL_AUDIT_2026-05 Befund).

---

*Erstellt von build_v5.py — 25.05.2026. Keine DB-Writes. Kein Commit. Kein Deploy.*
