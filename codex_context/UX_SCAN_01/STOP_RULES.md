# UX_SCAN_01 — Stop Rules und Checks

## Hard Stops

Codex muss sofort stoppen und ohne Commit berichten, wenn einer dieser Punkte zutrifft:

1. `AGENTS.md` fehlt oder widerspricht diesem Paket.
2. Working Tree ist vor Start dirty.
3. Branch ist `main`.
4. Erlaubte Dateiliste ist nicht eindeutig.
5. Änderung würde medizinische Aussagen, Zielwerte, Referenzwerte, B4-/K3-Inhalte, Quellenlogik oder Supabase-Daten ändern.
6. Build schlägt fehl.
7. Text-Safety findet BOM, CRLF, Bidi-Control, U+2028, U+2029 oder NUL-Bytes in geänderten Textdateien.
8. Netlify-/Supabase-Write wäre nötig.

## Erlaubte Dateien

Produktänderung nur in:
- `src/pages/LaborwertDetail.jsx`
- `src/pages/Laborwerte.css`

Zusätzlich erlaubt für Abschlussnachweis:
- `codex_context/UX_SCAN_01/CLOSURE.md`

Keine anderen Dateien ändern.

## Pflichtchecks vor Commit

- `git diff --check`
- `npm run build`
- Text-Safety für alle geänderten `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.md`, `.yml`, `.yaml` Dateien:
  - kein BOM
  - kein CRLF
  - keine Bidi Controls
  - kein U+2028 / U+2029
  - keine NUL-Bytes
- Prüfen, dass keine Datei außerhalb der erlaubten Liste geändert ist.

## Pflichtchecks nach PR

- PR als Draft öffnen.
- GitHub CI abwarten oder Status berichten.
- Netlify Preview URL nennen, falls verfügbar.
- Visuelle Smoke-Tests auf mindestens:
  - `/laborwerte/4548-4` HbA1c
  - `/laborwerte/2089-1` LDL
- Mobile-Breite prüfen oder klar melden, wenn nicht möglich.

## Sicherheitsrahmen

- Kein Supabase Write.
- Kein Netlify Write außer automatisch erzeugter Preview durch PR.
- Kein Merge.
- Kein Push auf `main`.
- Keine medizinische Erweiterung.
- Keine neuen Therapie-, Diagnose- oder Dosierungsaussagen.