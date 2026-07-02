# B4-BUILD-04-SPEC-WAVE1 — Verworfene Kartenideen

Ziel: keine stillen Entscheidungen. Alle erwogenen, aber nicht spezifizierten Kartenideen sind hier dokumentiert.

| laborwert_name | direction | dropped_card_idea | drop_reason | risk_type | could_revisit_later | needed_before_revisit |
|---|---|---|---|---|---|---|
| Hämoglobin | high/low | Eisensupplementierung mit Dosierungsempfehlung | Dosierung nicht zulässig | dosage | no | — |
| Hämoglobin | low | „Diagnose Blutarmut aus einem Wert" | Diagnose-Framing | diagnosis | no | — |
| Hämoglobin | low | Generische Ernährungstipps „eisenreich essen" als eigene Karte | Redundant zur bestehenden Ferritin-B4-Karte (`2276-4`) — Füllkarte | low_utility | no | — |
| TSH | high | Levothyroxin-Dosisanpassung als Karte | Dosierung nicht zulässig | dosage | no | — |
| TSH | high/low | „Diagnose Hashimoto/Basedow nur aus TSH" | Diagnose-Framing, Leitlinie erfordert weitere Werte/Antikörper | diagnosis | no | — |
| TSH | — | Referenzbereich-Tabelle je Trimester (Schwangerschaft) | Referenzwerte nicht Teil dieses Pakets; kein S1-Schwangerschaftsreferenz-Feld im Schema | threshold/source | yes | S1-Arbeit (Schema-Erweiterung Schwangerschaftsreferenzen) |
| Kreatinin | high | „Diagnose Nierenerkrankung aus Kreatinin allein" | Diagnose-Framing, Pflicht-Nichtziel | diagnosis | no | — |
| Kreatinin | low | Zweite Low-Karte „Ernährungstipps bei geringer Muskelmasse" | Zielzahl war 1 Karte; zweite Karte ohne klaren Zusatznutzen | low_utility | no | — |
| eGFR | high | CKD-Stadien-Übersichtskarte (G1–G5) | Explizit verboten laut Pflichtthemen — Stadien-/Diagnose-Framing | diagnosis/threshold | no | — |
| eGFR | high | „High"-Karte „Sehr gute Nierenfunktion" | Künstliches Befüllen der leeren High-Richtung ohne Nutzerzweck | low_utility | no | — |
| eGFR | low | Diagnose „chronische Nierenerkrankung" als Karte | Explizit verboten laut Pflichtthemen | diagnosis | no | — |
| Glukose nüchtern | high | Diabetes-Diagnosekriterien-Karte mit Grenzwerten (z. B. 126 mg/dl) | Grenzwerte in diesem Paket explizit nicht zulässig, obwohl in K3-Map als Kontextinfo vorhanden | threshold | yes | S1-Arbeit / eigene Grenzwert-Freigabe außerhalb dieses Pakets |
| Glukose nüchtern | high | Konkrete Ernährungsvorschriften (z. B. Kohlenhydratmenge) | Explizit verboten laut Pflichtthemen | therapy | no | — |
| Glukose nüchtern | low | Notfallprotokoll bei Hypoglykämie mit Traubenzucker-Dosierung | Dosierung und übertriebene Notfallanleitung explizit nicht zulässig | dosage | no | — |
| HDL-Cholesterin | high | Karte für „hohes HDL" | Explizit verboten laut Pflichtthemen — kein eigenständiges Handlungsfeld | not_applicable | no | — |
| HDL-Cholesterin | low | Nikotinsäure-/Fibrat-Empfehlung zur „aktiven HDL-Erhöhung" | Verbotenes Framing „HDL aktiv hochtherapieren", zudem Therapieempfehlung | therapy | no | — |
| HDL-Cholesterin | low | Quantifizierte HDL-Steigerung durch Bewegung (z. B. „+X mg/dl") | Keine lokal verifizierte Quelle für konkrete Effektgröße — Erfindungsrisiko | threshold/source | yes | Konkrete Meta-Analyse-Quelle verifizieren |

## Zusammenfassung

- Gesamt verworfene Ideen: 17
- Nach `risk_type`: diagnosis 5, dosage 3, therapy 3, threshold/source 3, low_utility 3 (Mehrfachnennung möglich, `threshold/source` als kombinierte Kategorie gezählt)
- `could_revisit_later = yes`: 3 (Schwangerschafts-TSH-Referenzen, Diabetes-Grenzwertkarte, quantifizierte HDL-Effektgröße) — alle 3 benötigen entweder eine S1-Schema-Erweiterung oder eine gesonderte Quellenfreigabe außerhalb dieses Pakets.
- `could_revisit_later = no`: 14 — endgültig verworfen (Diagnose-, Dosierungs-, Therapie- oder reine Füllkarten-Ideen).
