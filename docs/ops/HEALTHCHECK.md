# VitalWissen Healthcheck

Der Workflow **VitalWissen Healthcheck** prueft taeglich um `07:00 UTC` sowie bei manuellem Start die Backend-Identitaet, zwei read-only Supabase-REST-Abfragen und die wichtigsten Live-Routen. Er fuehrt ausschliesslich HTTP-GET-Anfragen aus und loest weder Datenaenderungen noch Netlify-Deploys aus.

## GitHub-Konfiguration

Vor dem ersten Lauf sind in den GitHub-Repository-Einstellungen folgende Werte einzurichten:

| Typ | Name | Inhalt |
| --- | --- | --- |
| Variable | `VITALWISSEN_SUPABASE_URL` | Supabase-URL des Projekts |
| Secret | `VITALWISSEN_SUPABASE_ANON_KEY` | Supabase anon key, niemals ein Service-Role-Key |
| Variable (optional) | `VITALWISSEN_SITE_URL` | Live-URL; Fallback: `https://vitalwissen.netlify.app` |

Der erwartete Supabase Project-Ref ist `ejyrzxmtosrouwstiyws`. Das Skript loggt den Project-Ref und Hosts, aber niemals den anon key oder vollstaendige Antworten.

## Verhalten

Kritische Fehler bei Konfiguration, Backend-Identitaet, Supabase REST, Live-Startseite oder `/laborwerte` beenden das Skript mit Exit-Code `1` und setzen den GitHub-Workflow auf rot. Ein nicht verfuegbarer Auth-Health-Endpunkt, eine nicht verfuegbare optionale Detailroute oder eine leere REST-Antwort werden als Warnung protokolliert.

## Pruefung bei einem Fehler

1. Supabase Dashboard und Projektstatus pruefen.
2. Netlify-Umgebungsvariablen pruefen.
3. Live-App Network Host mit `ejyrzxmtosrouwstiyws.supabase.co` vergleichen.
4. RLS und anon read fuer `laborwerte` und `krankheiten` pruefen.
5. GitHub-Actions-Logs pruefen, ohne Secrets in Diagnoseausgaben zu kopieren.
