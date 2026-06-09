// Text format: UTF-8, LF, no bidirectional Unicode controls.
const EXPECTED_PROJECT_REF = 'ejyrzxmtosrouwstiyws'
const DEFAULT_SITE_URL = 'https://vitalwissen.netlify.app'
const REQUEST_TIMEOUT_MS = 15_000

const supabaseUrlInput = process.env.VITALWISSEN_SUPABASE_URL?.trim()
const anonKey = process.env.VITALWISSEN_SUPABASE_ANON_KEY?.trim()
const siteUrlInput = process.env.VITALWISSEN_SITE_URL?.trim() || DEFAULT_SITE_URL

let criticalFailures = 0

function log(result, check, details = '') {
  console.log(`[${result}] ${check}${details ? ` | ${details}` : ''}`)
}

function fail(check, details) {
  criticalFailures += 1
  log('FAIL', check, details)
}

function parseBaseUrl(value, name) {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') {
      fail(name, 'URL muss HTTPS verwenden')
      return null
    }
    return new URL(url.origin)
  } catch {
    fail(name, 'URL ist ungueltig')
    return null
  }
}

async function request(check, url, { headers, critical = true, inspectArray = false } = {}) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      redirect: 'follow',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    const details = `HTTP ${response.status} | Host ${new URL(response.url).host}`
    if (response.status !== 200) {
      if (critical) fail(check, details)
      else log('WARN', check, details)
      return false
    }

    if (inspectArray) {
      try {
        const data = await response.json()
        if (!Array.isArray(data) || data.length === 0) {
          log('WARN', check, `${details} | Antwort enthaelt keine Daten`)
          return true
        }
      } catch {
        if (critical) fail(check, `${details} | Antwort ist kein gueltiges JSON`)
        else log('WARN', check, `${details} | Antwort ist kein gueltiges JSON`)
        return false
      }
    }

    log('PASS', check, details)
    return true
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unbekannter Netzwerkfehler'
    if (critical) fail(check, message)
    else log('WARN', check, message)
    return false
  }
}

if (!supabaseUrlInput) fail('Konfiguration Supabase URL', 'VITALWISSEN_SUPABASE_URL fehlt')
if (!anonKey) fail('Konfiguration Supabase anon key', 'VITALWISSEN_SUPABASE_ANON_KEY fehlt')

const supabaseUrl = supabaseUrlInput
  ? parseBaseUrl(supabaseUrlInput, 'Konfiguration Supabase URL')
  : null
const siteUrl = parseBaseUrl(siteUrlInput, 'Konfiguration Site URL')

if (criticalFailures > 0) {
  log('FAIL', 'Healthcheck', `${criticalFailures} kritische(r) Konfigurationsfehler`)
  process.exit(1)
}

if (supabaseUrl) {
  if (supabaseUrl.hostname === `${EXPECTED_PROJECT_REF}.supabase.co`) {
    log('PASS', 'Backend-Identitaet', `Project-Ref ${EXPECTED_PROJECT_REF} | Host ${supabaseUrl.host}`)
  } else {
    fail('Backend-Identitaet', `Erwarteter Project-Ref ${EXPECTED_PROJECT_REF} fehlt | Host ${supabaseUrl.host}`)
  }
}

if (criticalFailures > 0) {
  log('FAIL', 'Healthcheck', `${criticalFailures} kritische(r) Fehler vor Netzwerkpruefung`)
  process.exit(1)
}

if (supabaseUrl && anonKey) {
  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
  }

  await request(
    'Supabase REST laborwerte',
    new URL('/rest/v1/laborwerte?select=loinc_code&limit=1', supabaseUrl),
    { headers, inspectArray: true },
  )
  await request(
    'Supabase REST krankheiten',
    new URL('/rest/v1/krankheiten?select=slug&limit=1', supabaseUrl),
    { headers, inspectArray: true },
  )
  await request('Supabase Auth Health', new URL('/auth/v1/health', supabaseUrl), {
    critical: false,
  })
}

if (siteUrl) {
  await request('Live-Startseite', new URL('/', siteUrl))
  await request('Live-Laborwerte', new URL('/laborwerte', siteUrl))
  await request('Live-Laborwert-Detail', new URL('/laborwerte/4548-4', siteUrl), {
    critical: false,
  })
}

if (criticalFailures > 0) {
  log('FAIL', 'Healthcheck', `${criticalFailures} kritische(r) Fehler`)
  process.exit(1)
}

log('PASS', 'Healthcheck', `Project-Ref ${EXPECTED_PROJECT_REF}`)
process.exit(0)
