#!/usr/bin/env python3
"""
validate_p6c_verified_core.py
P6c-01a — Validator für data/curation/p6c_verified_core_5.json

Zweck:
  Hartes Fehlschlagen wenn:
  - LOINC-Code nicht in laborwerte-Tabelle existiert
  - Supplement-Slug nicht in supplements-Tabelle existiert
  - Slug einer Zielkrankheit nicht in krankheiten-Tabelle existiert
  - URL-Feld gesetzt aber leer (kein None, sondern leerer String)
  - Krankheit außerhalb der 5 Zielthemen verändert würde
  - Broken Chip für eine der 5 Zielkrankheiten verbleibt

Ausführung:
  python3 scripts/validate_p6c_verified_core.py

Voraussetzungen:
  - Internetzugang zu Supabase REST API
  - pip install requests (falls nicht vorhanden)

Ausgabe:
  - Exit 0: Validator grün — READY FOR APPLY
  - Exit 1: Validator rot — NOT READY (Fehler aufgelistet)
"""

import json
import sys
import os

try:
    import requests
except ImportError:
    print("FEHLER: 'requests' nicht installiert. Ausführen: pip install requests")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Konfiguration
# ---------------------------------------------------------------------------

SUPABASE_URL = "https://ejyrzxmtosrouwstiyws.supabase.co"
SUPABASE_ANON_KEY = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    ".eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXJ6eG10b3Nyb3V3c3RpeXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDE1NTMsImV4cCI6MjA5MTIxNzU1M30"
    ".ChFlnkJvHZCyvLttcE9UNS_XijxExE83esakiz6wnqs"
)

HEADERS = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "Content-Type": "application/json",
}

CURATION_FILE = os.path.join(
    os.path.dirname(__file__), "..", "data", "curation", "p6c_verified_core_5.json"
)

# Genau diese 5 ICD-10-Codes dürfen bearbeitet werden
ALLOWED_ICD10 = {"E11", "E03", "D50", "I10", "F32"}

# ---------------------------------------------------------------------------
# Hilfsfunktionen
# ---------------------------------------------------------------------------


def supabase_get(table: str, select: str, filter_eq: dict = None) -> list:
    """Einfache SELECT-Abfrage gegen Supabase REST API."""
    url = f"{SUPABASE_URL}/rest/v1/{table}?select={select}"
    if filter_eq:
        for col, val in filter_eq.items():
            url += f"&{col}=eq.{val}"
    resp = requests.get(url, headers=HEADERS, timeout=15)
    if resp.status_code != 200:
        raise RuntimeError(
            f"Supabase-Fehler bei Tabelle '{table}': "
            f"HTTP {resp.status_code} — {resp.text[:200]}"
        )
    return resp.json()


def fetch_all_loinc_codes() -> set:
    rows = supabase_get("laborwerte", "loinc_code")
    return {r["loinc_code"] for r in rows}


def fetch_all_supplement_slugs() -> set:
    rows = supabase_get("supplements", "slug")
    return {r["slug"] for r in rows}


def fetch_all_krankheiten_slugs() -> set:
    rows = supabase_get("krankheiten", "slug")
    return {r["slug"] for r in rows}


def fetch_all_krankheiten_icd10() -> set:
    rows = supabase_get("krankheiten", "icd10_code")
    return {r["icd10_code"] for r in rows}


# ---------------------------------------------------------------------------
# Validierungslogik
# ---------------------------------------------------------------------------


def validate(curation: dict, loinc_in_db: set, slugs_in_db: set,
             krankheit_slugs_in_db: set, krankheit_icd10_in_db: set) -> list[str]:
    """
    Gibt Liste aller Fehler zurück.
    Leere Liste = alles OK.
    """
    errors = []
    diseases = curation.get("diseases", [])

    # 1. Scope: genau 5 Einträge, alle innerhalb ALLOWED_ICD10
    if len(diseases) != 5:
        errors.append(
            f"SCOPE-FEHLER: Kurationsdatei enthält {len(diseases)} Einträge, "
            f"erwartet: 5"
        )

    for d in diseases:
        icd = d.get("icd10_code", "")
        name = d.get("name_de", icd)

        if icd not in ALLOWED_ICD10:
            errors.append(
                f"SCOPE-FEHLER [{icd}]: ICD-10-Code außerhalb der 5 Zielthemen"
            )

        # 2. ICD-10 muss in krankheiten-Tabelle existieren
        if icd not in krankheit_icd10_in_db:
            errors.append(
                f"DB-FEHLER [{icd} {name}]: ICD-10-Code nicht in krankheiten-Tabelle"
            )

        # 3. Slug prüfen (nur wenn angegeben und verified)
        slug = d.get("slug")
        slug_verified = d.get("slug_verified", False)
        if slug is not None:
            if slug not in krankheit_slugs_in_db:
                errors.append(
                    f"DB-FEHLER [{icd} {name}]: Slug '{slug}' nicht in "
                    f"krankheiten-Tabelle — slug_verified={slug_verified}"
                )
        else:
            # Slug = null ist kein harter Fehler im read-only Paket,
            # aber ein klarer Warn-Hinweis
            errors.append(
                f"WARN [{icd} {name}]: slug = null — muss vor Apply gegen DB "
                f"verifiziert werden"
            )

        # 4. LOINC-Codes in related_labs_curated
        labs = d.get("related_labs_curated", [])
        for loinc in labs:
            if loinc not in loinc_in_db:
                errors.append(
                    f"BROKEN-REF [{icd} {name}]: LOINC '{loinc}' nicht in "
                    f"laborwerte-Tabelle — broken chip würde verbleiben"
                )

        # 5. Supplement-Slugs in related_supplements_curated
        supps = d.get("related_supplements_curated", [])
        for s_slug in supps:
            if s_slug not in slugs_in_db:
                errors.append(
                    f"BROKEN-REF [{icd} {name}]: Supplement-Slug '{s_slug}' nicht "
                    f"in supplements-Tabelle — broken chip würde verbleiben"
                )

        # 6. URL-Feld: wenn nicht None, darf nicht leerer String sein
        sources = d.get("sources_curated", [])
        for src in sources:
            url = src.get("url")
            if url is not None and url.strip() == "":
                errors.append(
                    f"URL-FEHLER [{icd} {name}]: Quelleintrag "
                    f"'{src.get('name', '?')}' hat leere URL-String — "
                    f"entweder null oder gültige URL"
                )

        # 7. open_points darf nicht leer sein wenn status != CLEAN
        status_s = d.get("status_sources", "")
        status_l = d.get("status_labs", "")
        status_su = d.get("status_supplements", "")
        open_pts = d.get("open_points", [])

        non_clean = any(
            s.startswith("OPEN") or s.startswith("PARTIAL")
            for s in [status_s, status_l, status_su]
        )
        if non_clean and len(open_pts) == 0:
            errors.append(
                f"KONSISTENZ-FEHLER [{icd} {name}]: Status ist OPEN/PARTIAL aber "
                f"open_points ist leer"
            )

    return errors


# ---------------------------------------------------------------------------
# Haupt-Routine
# ---------------------------------------------------------------------------


def main():
    print("=" * 65)
    print("P6c-01a VALIDATOR — Curated Verified Core 5")
    print("=" * 65)

    # Kurationsdatei laden
    curation_path = os.path.abspath(CURATION_FILE)
    print(f"\n[1/5] Kurationsdatei: {curation_path}")
    if not os.path.exists(curation_path):
        print(f"  FEHLER: Datei nicht gefunden.")
        sys.exit(1)

    with open(curation_path, "r", encoding="utf-8") as f:
        curation = json.load(f)
    print(f"  OK — {len(curation.get('diseases', []))} Einträge geladen")

    # DB-Daten laden
    print("\n[2/5] Supabase-Verbindung prüfen ...")
    try:
        print("  Lade laborwerte (LOINC-Codes) ...")
        loinc_in_db = fetch_all_loinc_codes()
        print(f"  OK — {len(loinc_in_db)} LOINC-Codes")

        print("  Lade supplements (Slugs) ...")
        slugs_in_db = fetch_all_supplement_slugs()
        print(f"  OK — {len(slugs_in_db)} Supplement-Slugs")

        print("  Lade krankheiten (Slugs + ICD-10) ...")
        krankheit_slugs_in_db = fetch_all_krankheiten_slugs()
        krankheit_icd10_in_db = fetch_all_krankheiten_icd10()
        print(
            f"  OK — {len(krankheit_slugs_in_db)} Krankheiten-Slugs, "
            f"{len(krankheit_icd10_in_db)} ICD-10-Codes"
        )

    except Exception as e:
        print(f"\n  NETZWERK-FEHLER: {e}")
        print("  Hinweis: Validator benötigt Internetzugang zu Supabase.")
        print("  Ausführen über Chrome-Tab oder GitHub Actions.")
        sys.exit(2)

    # Validierung
    print("\n[3/5] Validierung läuft ...")
    errors = validate(
        curation, loinc_in_db, slugs_in_db,
        krankheit_slugs_in_db, krankheit_icd10_in_db
    )

    # Ergebnisse
    hard_errors = [e for e in errors if not e.startswith("WARN")]
    warnings = [e for e in errors if e.startswith("WARN")]

    print(f"\n[4/5] Ergebnis:")
    print(f"  Harte Fehler: {len(hard_errors)}")
    print(f"  Warnungen:    {len(warnings)}")

    if hard_errors:
        print("\n  HARTE FEHLER:")
        for err in hard_errors:
            print(f"    ✗ {err}")

    if warnings:
        print("\n  WARNUNGEN (kein Abbruch, aber vor Apply beheben):")
        for w in warnings:
            print(f"    ⚠ {w}")

    # Scope-Check: Kein Eintrag außerhalb der 5 Krankheiten
    print("\n[5/5] Scope-Verifikation:")
    diseases_in_file = {d.get("icd10_code") for d in curation.get("diseases", [])}
    outside_scope = diseases_in_file - ALLOWED_ICD10
    if outside_scope:
        print(f"  FEHLER: Einträge außerhalb des P6c-01a-Scopes: {outside_scope}")
    else:
        print(f"  OK — nur erlaubte ICD-10-Codes: {sorted(diseases_in_file)}")

    # Urteil
    print("\n" + "=" * 65)
    if hard_errors or outside_scope:
        print("URTEIL: NOT READY")
        print(f"Grund: {len(hard_errors)} harte Fehler, {len(outside_scope)} Scope-Verletzungen")
        print("=" * 65)
        sys.exit(1)
    elif warnings:
        print("URTEIL: READY FOR APPLY (mit offenen Punkten)")
        print(f"Hinweis: {len(warnings)} Warnungen müssen vor Apply bestätigt werden.")
        print("=" * 65)
        sys.exit(0)
    else:
        print("URTEIL: READY FOR APPLY")
        print("=" * 65)
        sys.exit(0)


if __name__ == "__main__":
    main()
