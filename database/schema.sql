-- ============================================
-- VitalWissen — Datenbankschema
-- Supabase (PostgreSQL)
-- Stand: 2026
-- ============================================

-- S1: Laborwert-Lexikon
-- ============================================
CREATE TABLE laborwerte (
  id              SERIAL PRIMARY KEY,
  loinc_code      VARCHAR(20)  UNIQUE NOT NULL,  -- LOINC-Code als primärer Identifier
  slug            VARCHAR(200) UNIQUE NOT NULL,  -- URL-slug, z.B. "tsh"
  name_de         VARCHAR(200) NOT NULL,          -- Kurzname, z.B. "TSH"
  vollname_de     VARCHAR(500),                  -- Vollname
  name_en         VARCHAR(200),

  kategorie       VARCHAR(50),  -- Blut | Urin | Stuhl | Speichel
  panel           VARCHAR(100), -- Schilddrüse | Eisenstoffwechsel | ...

  -- Beschreibungen
  beschreibung_laienhaft  TEXT,
  beschreibung_einfach    TEXT,  -- Sehr einfache Sprache
  beschreibung_fachlich   TEXT,

  -- Referenzbereiche DE (DGKL)
  ref_de_min_m    DECIMAL(10,3),
  ref_de_max_m    DECIMAL(10,3),
  ref_de_min_w    DECIMAL(10,3),
  ref_de_max_w    DECIMAL(10,3),
  ref_de_einheit  VARCHAR(50),
  ref_de_quelle   VARCHAR(200),

  -- Referenzbereiche USA (AACC)
  ref_usa_min     DECIMAL(10,3),
  ref_usa_max     DECIMAL(10,3),
  ref_usa_einheit VARCHAR(50),
  ref_usa_quelle  VARCHAR(200),

  -- Referenzbereiche Japan (JSCC)
  ref_jp_min      DECIMAL(10,3),
  ref_jp_max      DECIMAL(10,3),
  ref_jp_einheit  VARCHAR(50),
  ref_jp_quelle   VARCHAR(200),

  -- Kinderwerte und Sondergruppen
  referenz_kinder       JSONB,  -- [{gruppe, min, max, einheit}]
  referenz_schwanger    JSONB,
  gender_context        JSONB,  -- {maennlich: {min,max,hinweis}, weiblich: ...}

  -- Klinische Infos
  ursachen_hoch         JSONB,  -- ["Ursache 1", "Ursache 2"]
  ursachen_niedrig      JSONB,
  wann_arzt             TEXT,
  zusammenhaenge        JSONB,  -- ["fT3", "fT4"]

  -- Cross-Pillar-Verbindungen (S2, S6)
  supplement_einfluss   JSONB,  -- ["Vitamin D", "Jod"]
  medikament_einfluss   JSONB,  -- ["Levothyroxin", "Amiodaron"]

  -- Flags
  notfall_flag          BOOLEAN DEFAULT FALSE,
  notfall_beschreibung  TEXT,
  zyklusabhaengig       BOOLEAN DEFAULT FALSE,

  -- AEO / Maschinenlesbarkeit
  schema_org            JSONB,
  icd10_bezug           VARCHAR(20),

  -- Meta
  datenqualitaet        SMALLINT DEFAULT 1,  -- 1=Basis, 2=Vollständig, 3=Geprüft
  letzte_aktualisierung TIMESTAMP DEFAULT NOW(),
  erstellt_am           TIMESTAMP DEFAULT NOW()
);

-- Suchindex
CREATE INDEX idx_laborwerte_slug     ON laborwerte(slug);
CREATE INDEX idx_laborwerte_loinc    ON laborwerte(loinc_code);
CREATE INDEX idx_laborwerte_kategorie ON laborwerte(kategorie);
CREATE INDEX idx_laborwerte_panel    ON laborwerte(panel);

-- Volltext-Suche
ALTER TABLE laborwerte ADD COLUMN IF NOT EXISTS search_vector tsvector;
CREATE INDEX idx_laborwerte_fts ON laborwerte USING gin(search_vector);

-- Trigger für automatische Volltext-Aktualisierung
CREATE OR REPLACE FUNCTION update_laborwerte_search()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('german', COALESCE(NEW.name_de, '')), 'A') ||
    setweight(to_tsvector('german', COALESCE(NEW.vollname_de, '')), 'B') ||
    setweight(to_tsvector('german', COALESCE(NEW.beschreibung_laienhaft, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER laborwerte_search_trigger
  BEFORE INSERT OR UPDATE ON laborwerte
  FOR EACH ROW EXECUTE FUNCTION update_laborwerte_search();


-- S2: Supplement-Kompass
-- ============================================
CREATE TABLE supplements (
  id              SERIAL PRIMARY KEY,
  slug            VARCHAR(200) UNIQUE NOT NULL,
  name_de         VARCHAR(200) NOT NULL,
  wissenschaftlich VARCHAR(500),
  synonyme        JSONB,  -- ["Cholecalciferol", "Calciferol"]

  kategorie       VARCHAR(100),  -- Vitamine | Mineralstoffe | Fettsäuren | ...
  tier            SMALLINT DEFAULT 1,  -- 1=NIH ODS, 2=PubMed, 3=Wikipedia

  -- Wofür
  wofuer          TEXT,
  wofuer_kurz     VARCHAR(200),

  -- Dosierung
  dosierung_bfr_wert     VARCHAR(100),
  dosierung_bfr_einheit  VARCHAR(100),
  dosierung_bfr_hinweis  TEXT,
  dosierung_nih_wert     VARCHAR(100),
  dosierung_nih_einheit  VARCHAR(100),
  dosierung_nih_hinweis  TEXT,
  dosierung_efsa_wert    VARCHAR(100),
  dosierung_efsa_einheit VARCHAR(100),
  dosierung_efsa_hinweis TEXT,
  dosierung_ul_wert      VARCHAR(100),
  dosierung_ul_einheit   VARCHAR(100),
  dosierung_ul_hinweis   TEXT,

  -- Formen & Bioverfügbarkeit
  formen          JSONB,  -- [{name, bioverfu, empfohlen, hinweis}]

  -- Timing
  timing          TEXT,

  -- Kombinationen
  synergien       JSONB,  -- [{name, hinweis}]
  antagonisten    JSONB,  -- [{name, hinweis}]

  -- Qualität
  qualitaet_kriterien   JSONB,  -- ["GMP", "ISO 22000"]
  qualitaet_worauf      TEXT,

  -- Studien
  studien         JSONB,  -- [{pmid, titel, ergebnis, quelle}]

  -- Evidenz-Ampel
  evidenz_ampel   VARCHAR(30),  -- stark | moderat | schwach | widersprüchlich | keine

  -- Cross-Pillar-Verbindungen
  beeinflusste_laborwerte  JSONB,  -- ["Vitamin D (25-OH)", "Kalzium"]
  medikament_interaktionen JSONB,  -- [{name, schwere, hinweis}]

  -- Gender/Alter
  gender_context    JSONB,
  kinderdosierung   JSONB,

  -- NIH ODS
  nih_ods_link      VARCHAR(500),
  nih_ods_id        VARCHAR(50),

  -- AEO
  schema_org        JSONB,

  -- Meta
  datenqualitaet        SMALLINT DEFAULT 1,
  letzte_aktualisierung TIMESTAMP DEFAULT NOW(),
  erstellt_am           TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_supplements_slug     ON supplements(slug);
CREATE INDEX idx_supplements_kategorie ON supplements(kategorie);
CREATE INDEX idx_supplements_evidenz  ON supplements(evidenz_ampel);
CREATE INDEX idx_supplements_tier     ON supplements(tier);

-- Volltext-Suche
ALTER TABLE supplements ADD COLUMN IF NOT EXISTS search_vector tsvector;
CREATE INDEX idx_supplements_fts ON supplements USING gin(search_vector);

CREATE OR REPLACE FUNCTION update_supplements_search()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('german', COALESCE(NEW.name_de, '')), 'A') ||
    setweight(to_tsvector('german', COALESCE(NEW.wissenschaftlich, '')), 'B') ||
    setweight(to_tsvector('german', COALESCE(NEW.wofuer, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER supplements_search_trigger
  BEFORE INSERT OR UPDATE ON supplements
  FOR EACH ROW EXECUTE FUNCTION update_supplements_search();


-- Cross-Tabelle: Supplement ↔ Laborwert (bidirektional)
-- ============================================
CREATE TABLE supplement_laborwert (
  supplement_id   INTEGER REFERENCES supplements(id) ON DELETE CASCADE,
  laborwert_id    INTEGER REFERENCES laborwerte(id) ON DELETE CASCADE,
  richtung        VARCHAR(20),  -- erhöht | senkt | beeinflusst
  mechanismus     TEXT,
  evidenz_ampel   VARCHAR(30),
  PRIMARY KEY (supplement_id, laborwert_id)
);

-- Änderungslog für Monitoring
-- ============================================
CREATE TABLE aenderungslog (
  id          SERIAL PRIMARY KEY,
  tabelle     VARCHAR(50),
  eintrag_id  INTEGER,
  aenderung   JSONB,
  quelle      VARCHAR(200),
  erstellt_am TIMESTAMP DEFAULT NOW()
);

-- Row Level Security für zukünftige Nutzer-Features
-- (S9 Health Data Hub, Phase 2)
-- ALTER TABLE laborwerte ENABLE ROW LEVEL SECURITY;

-- Kommentar
COMMENT ON TABLE laborwerte IS 'S1 Laborwert-Lexikon — LOINC-basiert, 3-Leitlinien-Vergleich DE/USA/JP';
COMMENT ON TABLE supplements IS 'S2 Supplement-Kompass — Tier 1/2/3, NIH ODS + PubMed Pipeline';
