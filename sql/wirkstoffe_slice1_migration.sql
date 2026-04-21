-- ============================================================
-- S6-01 — wirkstoffe Slice 1 Migration
-- Erstellt: 2026-04-21
-- Zweck: Wirkstoff-Lexikon Tabelle (S6, Slice 1)
-- Scope: nur Slice-1-Pflichtfelder + vorbereitende Felder
-- Nicht enthalten: med_interaktionen (Slice 2), verwandte_laborwerte (Slice 2),
--   evidenz_ampel (Slice 2), zulassung_datum (Slice 2), eu_uk_verfuegbarkeit (Phase C)
-- Quellreferenz: S6_SPEC_CLOSURE.md §4a
-- ============================================================

-- Tabelle anlegen
CREATE TABLE IF NOT EXISTS wirkstoffe (
  -- Identifikation
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT NOT NULL UNIQUE,        -- URL-safe INN, z.B. "ibuprofen", "metformin"
  name_de        TEXT NOT NULL,               -- Deutscher INN-Name (WHO INN / EMA EPAR)
  synonyme       TEXT[] DEFAULT '{}',         -- Handelsnamen als Sucheinstieg: ["Ibuflam", "Nurofen"]

  -- Klassifikation
  atc_code       TEXT NOT NULL,               -- WHO ATC Level 5, z.B. "M01AE01"
  atc_name       TEXT,                        -- ATC Level 5 Bezeichnung
  wirkstoffklasse TEXT NOT NULL,              -- Laienfreundlich, z.B. "Schmerzmittel / NSAR"

  -- Kerninhalte (Slice 1)
  was_ist_das    TEXT NOT NULL,               -- Laienhafte Erklärung, 2–4 Sätze, ohne Werturteil
  indikationen   TEXT[] DEFAULT '{}',         -- Laienfreundliche Indikationsgruppen: ["Schmerz", "Entzündung"]
  einnahme       JSONB DEFAULT '{}',          -- {"allgemein": "...", "timing": "...", "besonderheiten": "..."}
  nebenwirkungen JSONB DEFAULT '{}',          -- {"haeufig": [...], "gelegentlich": [...], "selten": [...]}
  kontraindikationen TEXT[] DEFAULT '{}',     -- Kontraindikationen als Hinweisliste

  -- Wechselwirkungen Slice 1 (statisch, nicht abschließend)
  supp_interaktionen JSONB DEFAULT '[]',      -- [{"supplement": "...", "hinweis": "...", "quelle": "..."}]
  med_interaktionen_hinweis TEXT DEFAULT 'Bei gleichzeitiger Einnahme mehrerer Medikamente bitte Apotheke oder Arzt befragen.',
  -- med_interaktionen JSONB -- Slice 2: vollständiges Med-Med-Mapping (DrugBank Commercial o. Äquivalent)

  -- Generika / Alternativen
  generika_alternativen TEXT[] DEFAULT '{}',  -- Wirkstoffgleiche Produktnamen, kein Ranking

  -- Zulassung
  zulassung_de   TEXT NOT NULL,               -- z.B. "verschreibungspflichtig" | "frei verkäuflich (OTC)"
  zulassung_eu_status TEXT DEFAULT 'zugelassen', -- "zugelassen" | "zurückgezogen" | "suspendiert"
  otc_status     BOOLEAN DEFAULT false,       -- true = OTC, false = Rx

  -- Quellen (E28-konform)
  quellen        JSONB DEFAULT '[]',          -- [{"typ": "ema|bfarm|openfda", "name": "...", "url": "..."}]

  -- Cross-Links zu anderen Säulen (Slice 1)
  verwandte_krankheiten  TEXT[] DEFAULT '{}', -- ICD-10-Codes: ["I10", "I50"] → krankheiten.icd10_code
  verwandte_supplements  TEXT[] DEFAULT '{}', -- Slugs: ["omega-3", "vitamin-d"] → supplements.slug
  -- verwandte_laborwerte TEXT[] DEFAULT '{}' -- Slice 2: LOINC-Codes → laborwerte.loinc_code

  -- Filter / Discovery
  filter_tags    TEXT[] DEFAULT '{}',         -- ["Schmerzmittel", "OTC", "Entzündung", "NSAR"]

  -- Daten-Stand
  daten_stand    DATE,                        -- Datum des letzten Quelldaten-Updates

  -- Audit
  erstellt_am    TIMESTAMPTZ DEFAULT now() NOT NULL,
  aktualisiert_am TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ─── Indizes ─────────────────────────────────────────────────────────────────

-- Primäre Lesepfade
CREATE INDEX IF NOT EXISTS wirkstoffe_slug_idx    ON wirkstoffe(slug);
CREATE INDEX IF NOT EXISTS wirkstoffe_atc_idx     ON wirkstoffe(atc_code);
CREATE INDEX IF NOT EXISTS wirkstoffe_otc_idx     ON wirkstoffe(otc_status);

-- Synonyme-Volltextsuche (GIN für Array-Operatoren)
CREATE INDEX IF NOT EXISTS wirkstoffe_synonyme_gin  ON wirkstoffe USING GIN(synonyme);

-- Filter-Tags Suche
CREATE INDEX IF NOT EXISTS wirkstoffe_tags_gin      ON wirkstoffe USING GIN(filter_tags);

-- Cross-Link-Lookup S6→S5 (ICD-Codes)
CREATE INDEX IF NOT EXISTS wirkstoffe_krankheiten_gin ON wirkstoffe USING GIN(verwandte_krankheiten);

-- Cross-Link-Lookup S6→S2 (Supplement-Slugs)
CREATE INDEX IF NOT EXISTS wirkstoffe_supplements_gin ON wirkstoffe USING GIN(verwandte_supplements);

-- ─── RLS ─────────────────────────────────────────────────────────────────────

-- RLS aktivieren (E29: alle Tabellen mit RLS)
ALTER TABLE wirkstoffe ENABLE ROW LEVEL SECURITY;

-- Public Read für anon (identisch S5-Muster)
CREATE POLICY "Public anon read wirkstoffe"
  ON wirkstoffe
  FOR SELECT
  TO anon
  USING (true);

-- Service Role hat vollen Zugriff (implizit durch Supabase service_role)
-- Kein INSERT/UPDATE/DELETE für anon

-- ─── Auto-Update aktualisiert_am ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_wirkstoffe_aktualisiert_am()
RETURNS TRIGGER AS $$
BEGIN
  NEW.aktualisiert_am = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER wirkstoffe_aktualisiert_trigger
  BEFORE UPDATE ON wirkstoffe
  FOR EACH ROW
  EXECUTE FUNCTION update_wirkstoffe_aktualisiert_am();

-- ─── Slice-2-Reminder ────────────────────────────────────────────────────────
-- Felder für Slice 2 (wenn DrugBank Commercial oder Äquivalent verfügbar):
--   med_interaktionen JSONB  — vollständiges Med-Med-Interaktionsmapping
--   verwandte_laborwerte TEXT[]  — LOINC-Codes, FK auf laborwerte.loinc_code
--   evidenz_ampel TEXT  — Ampel für Wirksamkeitsbelege
--   zulassung_datum DATE  — Erst-Zulassungsdatum (historisch)
-- Felder für Phase C:
--   eu_uk_verfuegbarkeit JSONB  — EU/UK-Länderstatus-Matrix

-- ─── Migrationsstatus ────────────────────────────────────────────────────────
-- Tabelle ist nach Migration leer.
-- Inhalt-Import (50 Wirkstoffe) erfolgt in S6-02 (eigenständiger Build-Chat).
-- Anschlusspfad: Import muss alle NOT NULL-Felder liefern:
--   slug, name_de, atc_code, wirkstoffklasse, was_ist_das, zulassung_de
