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

// S18 — Nährstoffe
export async function getNaehrstoffListe() {
  const { data, error } = await supabase
    .from('naehrstoffe')
    .select('slug, name_de, kategorie, kurzbeschreibung')
    .order('kategorie', { ascending: true })
    .order('name_de', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getNaehrstoffBySlug(slug) {
  const { data, error } = await supabase
    .from('naehrstoffe')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function getNaehrstoffeByKategorie(kategorie) {
  const { data, error } = await supabase
    .from('naehrstoffe')
    .select('slug, name_de, kategorie, kurzbeschreibung')
    .eq('kategorie', kategorie)
    .order('name_de', { ascending: true })

  if (error) throw error
  return data ?? []
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

// S5 → S18: Nährstoffe die einen ICD-10-Code in erkrankungs_bezug referenzieren
// JSONB-Containment via filter 'cs' (Supabase PostgREST @> Operator)
export async function getNaehrstoffeByIcdCode(icdCode) {
  if (!icdCode) return []
  const { data, error } = await supabase
    .from('naehrstoffe')
    .select('slug, name_de, kategorie')
    .filter('erkrankungs_bezug', 'cs', JSON.stringify([{ icd_code: icdCode }]))
    .order('name_de', { ascending: true })
    .limit(5)

  if (error) {
    console.warn('getNaehrstoffeByIcdCode:', error.message)
    return []
  }
  return data ?? []
}

// S5 → S18: Ernährungsmuster die einen Krankheits-Slug in verwandte_krankheiten haben
export async function getMusterByKrankheitSlug(krankheitSlug) {
  if (!krankheitSlug) return []
  const { data, error } = await supabase
    .from('ernaehrungsmuster')
    .select('slug, name_de')
    .contains('verwandte_krankheiten', [krankheitSlug])
    .order('name_de', { ascending: true })
    .limit(3)

  if (error) {
    console.warn('getMusterByKrankheitSlug:', error.message)
    return []
  }
  return data ?? []
}

// ─── Suche (Home) ────────────────────────────────────────────────────────────

export async function sucheGlobal(query) {
  if (!query || query.trim().length < 2) return { laborwerte: [], supplements: [], krankheiten: [], wirkstoffe: [] }

  const term = `%${query.trim()}%`

  const [laborwerteResult, supplementsResult, krankheitenResult, wirkstoffeResult] = await Promise.all([
    supabase
      .from('laborwerte')
      .select('loinc_code, slug, name_de, kategorie, notfall_flag')
      .or(`name_de.ilike.${term},vollname_de.ilike.${term}`)
      .limit(4),

    supabase
      .from('supplements')
      .select('slug, name_de, kategorie, wofuer_kurz')
      .or(`name_de.ilike.${term},wofuer_kurz.ilike.${term}`)
      .limit(4),

    supabase
      .from('krankheiten')
      .select('slug, name_de, icd10_code, notfall_flag')
      .or(`name_de.ilike.${term},synonym_de.ilike.${term},icd10_code.ilike.${term}`)
      .limit(4),

    supabase
      .from('wirkstoffe')
      .select('slug, name_de, wirkstoffklasse, atc_code')
      .or(`name_de.ilike.${term},wirkstoffklasse.ilike.${term},atc_code.ilike.${term}`)
      .limit(4),
  ])

  if (laborwerteResult.error) throw laborwerteResult.error
  if (supplementsResult.error) throw supplementsResult.error
  if (krankheitenResult.error) throw krankheitenResult.error
  if (wirkstoffeResult.error) throw wirkstoffeResult.error

  return {
    laborwerte: laborwerteResult.data,
    supplements: supplementsResult.data,
    krankheiten: krankheitenResult.data,
    wirkstoffe: wirkstoffeResult.data,
  }
}

// ─── S18 — Lebensmittel (K8b) ────────────────────────────────────────────────
// S18-Build-04, 23.04.2026

export async function getLebensmittelListe() {
  const { data, error } = await supabase
    .from('lebensmittel')
    .select('slug, name_de, oberkategorie, kurzbeschreibung')
    .order('oberkategorie', { ascending: true })
    .order('name_de', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getLebensmittelBySlug(slug) {
  const { data, error } = await supabase
    .from('lebensmittel')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function getLebensmittelByKategorie(kategorie) {
  const { data, error } = await supabase
    .from('lebensmittel')
    .select('slug, name_de, oberkategorie, kurzbeschreibung')
    .eq('oberkategorie', kategorie)
    .order('name_de', { ascending: true })

  if (error) throw error
  return data ?? []
}

// S5 → S18: Lebensmittel die einen ICD-10-Code in erkrankungs_bezug referenzieren
// JSONB-Containment via filter 'cs' (Supabase PostgREST @> Operator)
// Identischer Mechanismus wie getNaehrstoffeByIcdCode (Build-03)
export async function getLebensmittelByIcdCode(icdCode) {
  if (!icdCode) return []
  const { data, error } = await supabase
    .from('lebensmittel')
    .select('slug, name_de, oberkategorie')
    .filter('erkrankungs_bezug', 'cs', JSON.stringify([{ icd_code: icdCode }]))
    .order('name_de', { ascending: true })
    .limit(5)

  if (error) {
    console.warn('getLebensmittelByIcdCode:', error.message)
    return []
  }
  return data ?? []
}

// S18-Build-05: Zusatzstoff-Kompass (K8d) — 23.04.2026
export async function getZusatzstoffListe() {
  const { data, error } = await supabase
    .from('zusatzstoffe')
    .select('slug, e_nummer, name_de, oberkategorie, funktion_im_lebensmittel')
    .order('oberkategorie', { ascending: true })
    .order('e_nummer', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getZusatzstoffBySlug(slug) {
  const { data, error } = await supabase
    .from('zusatzstoffe')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// ─── S6 → S18: Lebensmittel mit Hinweisen zu einem Wirkstoff (K8b) ──────────
// S6-06, 23.04.2026
// Reverse-Lookup: findet Lebensmittel deren wechselwirkungen-Feld den Wirkstoff-Slug enthält
// JSONB-Containment via filter 'cs' (@>) — identischer Mechanismus wie getLebensmittelByIcdCode
export async function getLebensmittelByWirkstoffSlug(wirkstoffSlug) {
  if (!wirkstoffSlug) return []
  const { data, error } = await supabase
    .from('lebensmittel')
    .select('slug, name_de, oberkategorie')
    .filter('wechselwirkungen', 'cs', JSON.stringify([{ medikament_slug: wirkstoffSlug }]))
    .order('name_de', { ascending: true })
    .limit(5)

  if (error) {
    console.warn('getLebensmittelByWirkstoffSlug:', error.message)
    return []
  }
  return data ?? []
}

// ─── S3 — Studienkompass (S3-BUILD-01, 14.05.2026) ────────────────────────────
// Lädt kuratierte Studien (approved + public) für einen ICD-Code-Anker
// verwandte_krankheiten = TEXT[], GIN-Index idx_studien_krankheiten_gin
// Sortierung: evidence_level ASC, publikationsjahr DESC; Limit 4
export async function getStudienByKrankheit(icdCode) {
  if (!icdCode) return []
  const { data, error } = await supabase
    .from('studien')
    .select(`
      slug, titel, studientyp, evidence_level, publikationsjahr, zeitschrift,
      was_untersucht, ergebnis, einschraenkungen, alltagsbezug,
      url, pmid, doi, hype_warnung,
      tierversuch_flag, in_vitro_flag, preprint_flag, interessenkonflikt_flag,
      retraction_status, stichprobengroesse
    `)
    .contains('verwandte_krankheiten', [icdCode])
    .eq('curation_status', 'approved')
    .eq('visibility', 'public')
    .order('evidence_level', { ascending: true })
    .order('publikationsjahr', { ascending: false })
    .limit(4)

  if (error) {
    console.warn('getStudienByKrankheit:', error.message)
    return []
  }
  return data ?? []
}

// Lädt eine einzelne Studie per Slug (für Detailseite /studien/:slug)
export async function getStudieBySlug(slug) {
  const { data, error } = await supabase
    .from('studien')
    .select('*')
    .eq('slug', slug)
    .eq('curation_status', 'approved')
    .eq('visibility', 'public')
    .single()

  if (error) throw error
  return data
}
