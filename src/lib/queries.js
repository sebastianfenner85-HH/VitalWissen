import { supabase } from './supabase'

// ─── S1 — Laborwerte ─────────────────────────────────────────────────────────

export async function getLaborwerteListe() {
  const { data, error } = await supabase
    .from('laborwerte_referenzen')
    .select(`
      loinc_code,
      name,
      kategorie,
      beschreibung,
      notfall_flag
    `)
    .order('name', { ascending: true })

  if (error) throw error
  return data
}

export async function getLaborwertByCode(loincCode) {
  const { data, error } = await supabase
    .from('laborwerte_referenzen')
    .select('*')
    .eq('loinc_code', loincCode)
    .single()

  if (error) throw error
  return data
}

// ─── S2 — Supplements ────────────────────────────────────────────────────────

export async function getSupplementsListe() {
  const { data, error } = await supabase
    .from('supplements')
    .select(`
      id,
      slug,
      name,
      gruppe,
      kurzbeschreibung,
      evidenz_ampel
    `)
    .order('name', { ascending: true })

  if (error) throw error
  return data
}

export async function getSupplementBySlug(slug) {
  const { data, error } = await supabase
    .from('supplements')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// ─── Suche (Home) ────────────────────────────────────────────────────────────

export async function sucheGlobal(query) {
  if (!query || query.trim().length < 2) return { laborwerte: [], supplements: [] }

  const term = `%${query.trim()}%`

  const [laborwerteResult, supplementsResult] = await Promise.all([
    supabase
      .from('laborwerte_referenzen')
      .select('loinc_code, name, kategorie, beschreibung')
      .or(`name.ilike.${term},beschreibung.ilike.${term}`)
      .limit(5),

    supabase
      .from('supplements')
      .select('slug, name, gruppe, kurzbeschreibung')
      .or(`name.ilike.${term},kurzbeschreibung.ilike.${term}`)
      .limit(5),
  ])

  if (laborwerteResult.error) throw laborwerteResult.error
  if (supplementsResult.error) throw supplementsResult.error

  return {
    laborwerte: laborwerteResult.data,
    supplements: supplementsResult.data,
  }
}
