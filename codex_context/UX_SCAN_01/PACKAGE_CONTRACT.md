# UX_SCAN_01 — Package Contract

## External Systems

- GitHub: GH3 — Branch, Commits, Draft PR erlaubt.
- Supabase: SB0 — kein Write, kein Schema, kein Datenänderung.
- Netlify: NF1/NF2 — nur automatisch erzeugte Preview prüfen, kein manueller Deploy.

## Allowed Paths

- `src/pages/LaborwertDetail.jsx`
- `src/pages/Laborwerte.css`
- `codex_context/UX_SCAN_01/CLOSURE.md`

## Forbidden Paths

- `src/lib/laborwert_b4_actions_map.js`
- `src/lib/laborwert_k3_map.js`
- `src/lib/queries.js`
- `pipelines/`
- `supabase/`
- `.env*`
- alle Dateien außerhalb Allowed Paths

## Acceptance Criteria

- Sichtbare UX-/Scanability-Verbesserung auf Laborwertdetailseite.
- Keine medizinische Inhaltsänderung.
- Keine Datenlogikänderung.
- Build grün.
- Text-Safety grün.
- Draft PR erstellt.
- Preview-/Live-Test dokumentiert.
