# Codex-Auftrag — UX_SCAN_01

Paket: UX_SCAN_01

Ziel: Laborwertdetailseite sichtbarer, ruhiger und mobiler scannbar machen.

## Kontext

Arbeite im Repo `sebastianfenner85-HH/VitalWissen`.

Lies vor Start:
- `AGENTS.md`
- `codex_context/UX_SCAN_01/README.md`
- `codex_context/UX_SCAN_01/STOP_RULES.md`
- `docs/specs/BRAND_UX_REFRESH_SPEC.md` falls vorhanden
- `src/pages/LaborwertDetail.jsx`
- `src/pages/Laborwerte.css`

Branch:
- `feature/ux-scan-01-laborwert-detail`

## Erlaubte Dateien

Nur diese Produktdateien ändern:
- `src/pages/LaborwertDetail.jsx`
- `src/pages/Laborwerte.css`

Zusätzlich erlaubt:
- `codex_context/UX_SCAN_01/CLOSURE.md`

Keine anderen Dateien ändern.

## Aufgabe

Verbessere die Laborwertdetailseite als kleines sichtbares UX-Paket:

1. Nach Header und Beschreibung einen kurzen Orientierungsblock ergänzen. Zweck: Nutzer sehen sofort, was die Seite bietet.
2. Abschnittshierarchie verbessern: ruhigere Abstände, bessere Kartenflächen, klarere Abschnittstitel.
3. Mobile Darstellung verbessern: keine gequetschten Karten, gute Stapelung, lesbare Abstände.
4. Bestehende Blöcke müssen erhalten bleiben: Referenzbereiche, Quellenbox, Zielwerte, Einordnung, B4 Actions, Ursachen, Wann zum Arzt, Supplement-/Medikamenten-Einfluss, Disclaimer.
5. Keine Datenlogik ändern. Keine neuen medizinischen Aussagen. Keine neuen Bibliotheken.
6. Falls in geänderten Dateien verbotene Textzeichen gefunden werden, bereinigen und in `CLOSURE.md` dokumentieren.

## Pflichtchecks

Vor Commit ausführen:
- `git diff --check`
- `npm run build`
- Text-Safety für geänderte Textdateien: kein BOM, kein CRLF, keine Bidi Controls, kein U+2028/U+2029, keine NUL-Bytes.

## PR

Draft PR gegen `main` öffnen.

PR-Body muss enthalten:
- Ziel
- geänderte Dateien
- sichtbare Änderung
- Build-Status
- Text-Safety-Status
- Supabase Write: NEIN
- Netlify Write: NEIN, außer automatischer Preview
- Preview-/Live-Teststatus
- kein Merge ohne Sebastian-GO

## Preview-Test

Wenn Netlify Preview verfügbar ist, prüfen:
- `/laborwerte/4548-4`
- `/laborwerte/2089-1`
- Desktop und mobile Breite, soweit möglich
- keine Console-Fehler akzeptieren

## Abschluss

Erstelle `codex_context/UX_SCAN_01/CLOSURE.md` mit Branch, Commit, PR-Link, geänderten Dateien, Checks, Preview-Test und offenen Punkten.

ENDE_AUFTRAG
