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

// ─── S18 — Ernährungskompass ──────────────────────────────────────────────────

export async function getErnaehrungsmusterListe() {
  const { data, error } = await supabase
    .from('ernaehrungsmuster')
    .select('id, slug, name_de, kurzbeschreibung')
    .order('id', { ascending: true })

  if (error) throw error
  return data
}

export async function getErnaehrungsmusterBySlug(slug) {
  const { data, error } = await supabase
    .from('ernaehrungsmuster')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// Krankheiten-NameMap für S18-Crosslinks (S18 → S5)
export async function getKrankheitenNameMap(slugs) {
  if (!slugs || slugs.length === 0) return {}
  const { data, error } = await supabase
    .from('krankheiten')
    .select('slug, name_de')
    .in('slug', slugs)
  if (error) throw error
  return Object.fromEntries((data || []).map(r => [r.slug, r.name_de]))
}

// ─── S6 — Wirkstoff-Lexikon ──────────────────────────────────────────────────

export async function getWirkstoffeListe() {
  const { data, error } = await supabase
    .from('wirkstoffe')
    .select(`
      id,
      slug,
      name_de,
      synonyme,
      atc_code,
      wirkstoffklasse,
      indikationen,
      zulassung_de,
      otc_status,
      filter_tags
    `)
    .order('name_de', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getWirkstoffBySlug(slug) {
  const { data, error } = await supabase
    .from('wirkstoffe')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// S5 → S6: Wirkstoffe die für eine Krankheit relevant sind (ICD-10-Code)
// Wird in KrankheitDetail für den Standardmedikamente-Block verwendet
export async function getWirkstoffeByKrankheit(icd10Code) {
  if (!icd10Code) return []
  const { data, error } = await supabase
    .from('wirkstoffe')
    .select('slug, name_de, wirkstoffklasse, otc_status')
    .contains('verwandte_krankheiten', [icd10Code])
    .order('name_de', { ascending: true })
    .limit(8)

  if (error) {
    console.warn('getWirkstoffeByKrankheit:', error.message)
    return []
  }
  return data ?? []
}

// S2 → S6: Wirkstoffe die Wechselwirkungen mit einem Supplement haben
// Wird in SupplementDetail für den Medikamenten-Block verwendet (Slice 1 vorbereitet)
export async function getWirkstoffeBySupp(suppSlug) {
  if (!suppSlug) return []
  const { data, error } = await supabase
    .from('wirkstoffe')
    .select('slug, name_de, wirkstoffklasse')
    .contains('verwandte_supplements', [suppSlug])
    .order('name_de', { ascending: true })
    .limit(8)

  if (error) {
    console.warn('getWirkstoffeBySupp:', error.message)
    return []
  }
  return data ?? []
}

// Name-Map für S6-Crosslinks: ICD-10-Codes → { icd: { name_de, slug } }
export async function getKrankheitenDetailMap(icdCodes) {
  if (!icdCodes || icdCodes.length === 0) return {}
  const { data, error } = await supabase
    .from('krankheiten')
    .select('icd10_code, name_de, slug')
    .in('icd10_code', icdCodes)
  if (error) throw error
  return Object.fromEntries((data || []).map(r => [r.icd10_code, { name_de: r.name_de, slug: r.slug }]))
}

// ─── Suche (Home) ────────────────────────────────────────────────────────────

export async function sucheGlobal(query) {
  if (!query || query.trim().length < 2) return { laborwerte: [], supplements: [], krankheiten: [] }

  const term = `%${query.trim()}%`

  const [laborwerteResult, supplementsResult, krankheitenResult] = await Promise.all([
    supabase
      .from('laborwerte')
      .select('loinc_code, slug, name_de, kategorie, notfall_flag')
      .or(`name_de.ilike.${term},vollname_de.ilike.${term}`)
      .limit(5),

    supabase
      .from('supplements')
      .select('slug, name_de, kategorie, wofuer_kurz')
      .or(`name_de.ilike.${term},wofuer_kurz.ilike.${term}`)
      .limit(5),

    supabase
      .from('krankheiten')
      .select('slug, name_de, icd10_code, notfall_flag')
      .or(`name_de.ilike.${term},synonym_de.ilike.${term},icd10_code.ilike.${term}`)
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
