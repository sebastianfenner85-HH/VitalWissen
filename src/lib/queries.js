import { supabase } from './supabase'

// ─── S1 — Laborwerte ─────────────────────────────────────────────────────────

export async function getLaborwerteListe() {
  const { data, error } = await supabase
    .from('laborwerte')
    .select(`
      loinc_code,
      slug,
      name_de,
      vollname_de,
      kategorie,
      panel,
      beschreibung_laienhaft,
      notfall_flag,
      ref_de_min_m,
      ref_de_max_m,
      ref_de_min_w,
      ref_de_max_w,
      ref_de_einheit
    `)
    .order('name_de', { ascending: true })

  if (error) throw error
  return data
}

export async function getLaborwertByCode(loincCode) {
  const { data, error } = await supabase
    .from('laborwerte')
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
      name_de,
      kategorie,
      wofuer_kurz,
      evidenz_ampel
    `)
    .order('name_de', { ascending: true })

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

// ─── S5 — Krankheiten ────────────────────────────────────────────────────────

export async function getKrankheitenListe() {
  const { data, error } = await supabase
    .from('krankheiten')
    .select(`
      id,
      slug,
      icd10_code,
      name_de,
      synonym_de,
      kategorie,
      beschreibung_laienhaft,
      notfall_flag,
      haeufigkeit,
      filter_tags
    `)
    .order('name_de', { ascending: true })

  if (error) throw error
  return data
}

export async function getKrankheitBySlug(slug) {
  const { data, error } = await supabase
    .from('krankheiten')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// ─── Name-Maps für Cross-Link-Auflösung (S5 Krankheitsdetail) ───────────────

export async function getLaborwerteNameMap(codes) {
  if (!codes || codes.length === 0) return {}
  const { data, error } = await supabase
    .from('laborwerte')
    .select('loinc_code, name_de')
    .in('loinc_code', codes)
  if (error) throw error
  return Object.fromEntries((data || []).map(r => [r.loinc_code, r.name_de]))
}

export async function getSupplementeNameMap(slugs) {
  if (!slugs || slugs.length === 0) return {}
  const { data, error } = await supabase
    .from('supplements')
    .select('slug, name_de')
    .in('slug', slugs)
  if (error) throw error
  return Object.fromEntries((data || []).map(r => [r.slug, r.name_de]))
}

// ─── Suche (Home) ────────────────────────────────────────────────────────────

export async function sucheGlobal(query) {
  if (!query || query.trim().length < 2) return { laborwerte: [], supplements: [], krankheiten: [] }

  const term = `%${query.trim()}%`

  const [laborwerteResult, supplementsResult, krankheitenResult] = await Promise.all([
    supabase
      .from('laborwerte')
      .select('loinc_code, slug, name_de, kategorie, beschreibung_laienhaft')
      .or(`name_de.ilike.${term},beschreibung_laienhaft.ilike.${term},vollname_de.ilike.${term}`)
      .limit(5),

    supabase
      .from('supplements')
      .select('slug, name_de, kategorie, wofuer_kurz')
      .or(`name_de.ilike.${term},wofuer_kurz.ilike.${term}`)
      .limit(5),

    supabase
      .from('krankheiten')
      .select('slug, name_de, kategorie, beschreibung_laienhaft, icd10_code')
      .or(`name_de.ilike.${term},beschreibung_laienhaft.ilike.${term},icd10_code.ilike.${term}`)
      .limit(5),
  ])

  if (laborwerteResult.error) throw laborwerteResult.error
  if (supplementsResult.error) throw supplementsResult.error
  if (krankheitenResult.error) throw krankheitenResult.error

  return {
    laborwerte: laborwerteResult.data,
    supplements: supplementsResult.data,
    krankheiten: krankheitenResult.data,
  }
}
