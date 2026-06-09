# VitalWissen Healthcheck

Der Workflow **VitalWissen Healthcheck** prüft täglich um `07:00 UTC` sowie bei manuellem Start die Backend-Identität, zwei read-only Supabase-REST-Abfragen und die wichtigsten Live-Routen. Er führt ausschließlich HTTP-GET-Anfragen aus und löst weder Datenänderungen noch Netlify-Deploys aus.

## GitHub-Konfiguration

Vor dem ersten Lauf sind in den GitHub-Repository-Einstellungen folgende Werte einzurichten:

| Typ | Name | Inhalt |
| --- | --- | --- |
| Variable | `VITALWISSEN_SUPABASE_URL` | Supabase-URL des Projekts |
| Secret | `VITALWISSEN_SUPABASE_ANON_KEY` | Supabase anon key, niemals ein Service-Role-Key |
| Variable (optional) | `VITALWISSEN_SITE_URL` | Live-URL; Fallback: `https://vitalwissen.netlify.app` |

Der erwartete Supabase Project-Ref ist `ejyrzxmtosrouwstiyws`. Das Skript loggt den Project-Ref und Hosts, aber niemals den anon key oder vollständige Antworten.

## Verhalten

Kritische Fehler bei Konfiguration, Backend-Identität, Supabase REST, Live-Startseite oder `/laborwerte` beenden das Skript mit Exit-Code `1` und setzen den GitHub-Workflow auf rot. Ein nicht verfügbarer Auth-Health-Endpunkt, eine nicht verfügbare optionale Detailroute oder eine leere REST-Antwort werden als Warnung protokolliert.

## Prüfung bei einem Fehler

1. Supabase Dashboard und Projektstatus prüfen.
2. Netlify-Umgebungsvariablen prüfen.
3. Live-App Network Host mit `ejyrzxmtosrouwstiyws.supabase.co` vergleichen.
4. RLS und anon read für `laborwerte` und `krankheiten` prüfen.
5. GitHub-Actions-Logs prüfen, ohne Secrets in Diagnoseausgaben zu kopieren.
