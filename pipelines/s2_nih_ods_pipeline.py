"""
VitalWissen — S2 Supplement-Pipeline
Quelle: NIH Office of Dietary Supplements (ODS) API
Tier 1: Vollautomatisch

Ausführen: python s2_nih_ods_pipeline.py
Voraussetzungen: pip install requests psycopg2-binary python-dotenv
"""

import os
import json
import time
import logging
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("vitalwissen.s2")

# ─── Konfiguration ────────────────────────────────────────────────────────────

NIH_ODS_BASE = "https://api.ods.od.nih.gov/dsld/v8"

# Supplements die wir importieren wollen (NIH ODS Ingredient IDs)
# Vollständige Liste: https://api.ods.od.nih.gov/dsld/v8/ingredient
TARGET_SUPPLEMENTS = [
    {"slug": "vitamin-d3",   "nih_name": "Vitamin D",       "kategorie": "Vitamine"},
    {"slug": "magnesium",    "nih_name": "Magnesium",        "kategorie": "Mineralstoffe"},
    {"slug": "omega-3",      "nih_name": "Omega-3 Fatty Acids", "kategorie": "Fettsäuren"},
    {"slug": "vitamin-b12",  "nih_name": "Vitamin B12",      "kategorie": "Vitamine"},
    {"slug": "zink",         "nih_name": "Zinc",             "kategorie": "Mineralstoffe"},
    {"slug": "vitamin-c",    "nih_name": "Vitamin C",        "kategorie": "Vitamine"},
    {"slug": "eisen",        "nih_name": "Iron",             "kategorie": "Mineralstoffe"},
    {"slug": "folsaeure",    "nih_name": "Folate",           "kategorie": "Vitamine"},
    {"slug": "kalzium",      "nih_name": "Calcium",          "kategorie": "Mineralstoffe"},
    {"slug": "jod",          "nih_name": "Iodine",          "kategorie": "Mineralstoffe"},
    {"slug": "selen",        "nih_name": "Selenium",         "kategorie": "Mineralstoffe"},
    {"slug": "vitamin-a",    "nih_name": "Vitamin A",        "kategorie": "Vitamine"},
    {"slug": "vitamin-e",    "nih_name": "Vitamin E",        "kategorie": "Vitamine"},
    {"slug": "vitamin-k",    "nih_name": "Vitamin K",        "kategorie": "Vitamine"},
    {"slug": "vitamin-b6",   "nih_name": "Vitamin B6",       "kategorie": "Vitamine"},
    {"slug": "coenzym-q10",  "nih_name": "Coenzyme Q10",     "kategorie": "Sonstiges"},
    {"slug": "probiotika",   "nih_name": "Probiotics",       "kategorie": "Probiotika"},
    {"slug": "kreatin",      "nih_name": "Creatine",         "kategorie": "Aminosäuren"},
    {"slug": "ashwagandha",  "nih_name": "Ashwagandha",      "kategorie": "Pflanzenstoffe"},
    {"slug": "curcumin",     "nih_name": "Turmeric",         "kategorie": "Pflanzenstoffe"},
]


# ─── API-Abruf ────────────────────────────────────────────────────────────────

def fetch_nih_ods_ingredient_list():
    """Alle verfügbaren Ingredients von NIH ODS abrufen."""
    url = f"{NIH_ODS_BASE}/ingredient"
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    return resp.json()


def fetch_nih_ods_factsheet(ingredient_name: str) -> dict | None:
    """
    NIH ODS Factsheet für ein Supplement abrufen.
    Gibt strukturierte Daten zurück oder None bei Fehler.
    """
    # Suche nach dem Ingredient
    search_url = f"{NIH_ODS_BASE}/ingredient"
    params = {"name": ingredient_name, "lang": "en"}
    try:
        resp = requests.get(search_url, params=params, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        if not data:
            log.warning(f"Kein Ergebnis für: {ingredient_name}")
            return None
        return data[0] if isinstance(data, list) else data
    except Exception as e:
        log.error(f"Fehler beim Abrufen von {ingredient_name}: {e}")
        return None


def fetch_pubmed_abstracts(query: str, max_results: int = 5) -> list[dict]:
    """
    PubMed-Abstracts für einen Suchbegriff abrufen.
    Für Tier-2-Anreicherung.
    """
    base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"

    # Schritt 1: IDs suchen
    search_url = f"{base}/esearch.fcgi"
    params = {
        "db": "pubmed",
        "term": f"{query}[Title/Abstract] AND (systematic review[Publication Type] OR meta-analysis[Publication Type])",
        "retmax": max_results,
        "retmode": "json",
        "sort": "relevance",
    }
    try:
        resp = requests.get(search_url, params=params, timeout=30)
        resp.raise_for_status()
        ids = resp.json()["esearchresult"]["idlist"]
        if not ids:
            return []

        # Schritt 2: Abstracts abrufen
        fetch_url = f"{base}/efetch.fcgi"
        fetch_params = {
            "db": "pubmed",
            "id": ",".join(ids),
            "retmode": "json",
            "rettype": "abstract",
        }
        fetch_resp = requests.get(fetch_url, params=fetch_params, timeout=30)
        # Vereinfachte Rückgabe — in Produktion vollständig parsen
        return [{"pmid": pmid, "quelle": f"PubMed (Suche: {query})"} for pmid in ids]

    except Exception as e:
        log.error(f"PubMed-Fehler für '{query}': {e}")
        return []


# ─── Transformation ───────────────────────────────────────────────────────────

def transform_nih_to_vitalwissen(nih_data: dict, config: dict) -> dict:
    """
    NIH ODS Rohdaten in VitalWissen-Datenbankformat überführen.
    Fehlende Felder werden als None markiert (→ manueller Review).
    """
    return {
        "slug": config["slug"],
        "name_de": config.get("name_de", nih_data.get("name", config["slug"])),
        "wissenschaftlich": nih_data.get("scientificName", nih_data.get("name")),
        "kategorie": config["kategorie"],
        "tier": 1,
        "nih_ods_link": f"https://ods.od.nih.gov/factsheets/{nih_data.get('name', '').replace(' ', '')+'-HealthProfessional/'}",
        "nih_ods_id": str(nih_data.get("id", "")),
        "wofuer": None,           # → LLM-Extraktion oder manuell
        "evidenz_ampel": None,    # → manueller Review zwingend
        "dosierung_bfr_wert": None,    # → BfR-Quelle separat
        "dosierung_nih_wert": nih_data.get("rda"),
        "dosierung_nih_einheit": nih_data.get("rdaUnit"),
        "dosierung_ul_wert": nih_data.get("ul"),
        "dosierung_ul_einheit": nih_data.get("ulUnit"),
        "formen": None,           # → manuell oder LLM
        "timing": None,           # → manuell
        "synergien": None,        # → manuell
        "antagonisten": None,     # → manuell
        "qualitaet_kriterien": None,
        "studien": None,          # → PubMed-Pipeline (Tier 2)
        "beeinflusste_laborwerte": None,
        "medikament_interaktionen": None,
        "datenqualitaet": 1,
        "letzte_aktualisierung": datetime.now().isoformat(),
    }


# ─── Datenbankoperationen ─────────────────────────────────────────────────────

def upsert_supplement(db_conn, data: dict):
    """Supplement in Datenbank einfügen oder aktualisieren."""
    import psycopg2.extras

    cols = list(data.keys())
    vals = list(data.values())
    placeholders = ", ".join(["%s"] * len(cols))
    col_names = ", ".join(cols)
    updates = ", ".join([f"{c} = EXCLUDED.{c}" for c in cols if c != "slug"])

    query = f"""
        INSERT INTO supplements ({col_names})
        VALUES ({placeholders})
        ON CONFLICT (slug) DO UPDATE SET {updates};
    """
    with db_conn.cursor() as cur:
        cur.execute(query, vals)
    db_conn.commit()
    log.info(f"✓ Upsert: {data['slug']}")


# ─── Hauptprozess ─────────────────────────────────────────────────────────────

def run_pipeline(dry_run: bool = True):
    """
    Hauptprozess der S2-Pipeline.

    dry_run=True: Nur abrufen und anzeigen, nicht in DB schreiben.
    dry_run=False: In Supabase schreiben (SUPABASE_DB_URL in .env erforderlich).
    """
    log.info(f"VitalWissen S2 Pipeline gestartet — dry_run={dry_run}")
    results = []

    for config in TARGET_SUPPLEMENTS:
        log.info(f"→ Verarbeite: {config['nih_name']}")

        # NIH ODS abrufen
        nih_data = fetch_nih_ods_factsheet(config["nih_name"])
        if not nih_data:
            log.warning(f"  Übersprungen: {config['nih_name']} (kein NIH-Ergebnis)")
            continue

        # Transformieren
        transformed = transform_nih_to_vitalwissen(nih_data, config)

        # PubMed-Anreicherung (Tier 2)
        pubmed = fetch_pubmed_abstracts(config["nih_name"] + " supplementation", max_results=3)
        if pubmed:
            transformed["studien"] = json.dumps(pubmed)

        results.append(transformed)

        # Rate limiting (NIH empfiehlt max 3 req/s)
        time.sleep(0.4)

    log.info(f"\n{'='*50}")
    log.info(f"Pipeline abgeschlossen: {len(results)}/{len(TARGET_SUPPLEMENTS)} Supplements verarbeitet")

    if dry_run:
        log.info("DRY RUN — Ergebnisvorschau:")
        for r in results[:3]:
            print(json.dumps(r, indent=2, ensure_ascii=False, default=str))
        log.info(f"... und {len(results)-3} weitere")
        return results

    # Produktionsmodus: In Supabase schreiben
    import psycopg2
    db_url = os.getenv("SUPABASE_DB_URL")
    if not db_url:
        raise ValueError("SUPABASE_DB_URL nicht in .env gesetzt!")

    conn = psycopg2.connect(db_url)
    for data in results:
        upsert_supplement(conn, data)
    conn.close()
    log.info("✅ Alle Supplements in Supabase geschrieben.")
    return results


if __name__ == "__main__":
    import sys
    dry = "--live" not in sys.argv
    run_pipeline(dry_run=dry)
