#!/usr/bin/env python3
"""
apply_p6c_verified_core.py
P6c-01b — Kontrollierter Apply: schreibt kuratierte Werte in krankheiten-Tabelle.

Erlaubte Write-Felder: quellen, verwandte_laborwerte, verwandte_supplements
Scope: exakt 5 Krankheiten (E11, E03, D50, I10, F32)
Identifikation: icd10_code

Ausführung:
  python3 scripts/apply_p6c_verified_core.py

Voraussetzungen:
  - Internetzugang zu Supabase REST API
  - pip install requests (falls nicht vorhanden)

Exit-Codes:
  0 = Apply vollständig — alle 5 Rows geschrieben
  1 = Fehler bei einem oder mehreren Writes
  2 = Netzwerkfehler
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
    "Prefer": "return=representation",
}

CURATION_FILE = os.path.join(
    os.path.dirname(__file__), "..", "data", "curation", "p6c_verified_core_5.json"
)

ALLOWED_ICD10 = {"E11", "E03", "D50", "I10", "F32"}
WRITE_FIELDS = ["quellen", "verwandte_laborwerte", "verwandte_supplements"]


# ---------------------------------------------------------------------------
# Quellenformat: nur verifizierte oder explizit vorhandene URLs extrahieren
# ---------------------------------------------------------------------------

def build_quellen_payload(sources_curated: list) -> list:
    """
    Baut quellen-Array für DB aus sources_curated.
    Nur Einträge mit gesetzter URL werden übernommen.
    Format: Liste von {name, url} — einfach halten, nur notwendige Felder.
    """
    result = []
    for src in sources_curated:
        url = src.get("url")
        name = src.get("name", "")
        if url:
            result.append({"name": name, "url": url})
    return result


# ---------------------------------------------------------------------------
# Apply-Logik
# ---------------------------------------------------------------------------

def apply_disease(icd10: str, payload: dict) -> dict:
    """
    Schreibt payload (nur erlaubte Felder) für eine Krankheit.
    Identifikation über icd10_code.
    Gibt Response-Daten zurück.
    """
    # Scope-Guard: nur erlaubte Felder schreiben
    safe_payload = {k: v for k, v in payload.items() if k in WRITE_FIELDS}
    if not safe_payload:
        return {"error": f"[{icd10}] Kein erlaubtes Feld im Payload"}

    url = f"{SUPABASE_URL}/rest/v1/krankheiten?icd10_code=eq.{icd10}"
    resp = requests.patch(url, headers=HEADERS, json=safe_payload, timeout=15)

    if resp.status_code not in (200, 204):
        return {"error": f"HTTP {resp.status_code} — {resp.text[:200]}"}

    result = resp.json() if resp.content else []
    return {"ok": True, "rows_returned": len(result) if isinstance(result, list) else 1}


# ---------------------------------------------------------------------------
# Haupt-Routine
# ---------------------------------------------------------------------------

def main():
    print("=" * 65)
    print("P6c-01b APPLY — Curated Verified Core 5")
    print("=" * 65)

    # Kurationsdatei laden
    curation_path = os.path.abspath(CURATION_FILE)
    print(f"\n[1/4] Kurationsdatei: {curation_path}")
    if not os.path.exists(curation_path):
        print("  FEHLER: Datei nicht gefunden.")
        sys.exit(1)

    with open(curation_path, "r", encoding="utf-8") as f:
        curation = json.load(f)

    diseases = curation.get("diseases", [])
    print(f"  OK — {len(diseases)} Einträge geladen")

    # Scope-Check
    icds = {d.get("icd10_code") for d in diseases}
    outside = icds - ALLOWED_ICD10
    if outside:
        print(f"  SCOPE-FEHLER: {outside} außerhalb erlaubter Krankheiten — Abbruch")
        sys.exit(1)
    if len(diseases) != 5:
        print(f"  SCOPE-FEHLER: {len(diseases)} Einträge erwartet 5 — Abbruch")
        sys.exit(1)
    print(f"  Scope OK — {sorted(icds)}")

    # Verbindungstest
    print("\n[2/4] Supabase-Verbindung prüfen ...")
    try:
        test = requests.get(
            f"{SUPABASE_URL}/rest/v1/krankheiten?select=icd10_code&limit=1",
            headers=HEADERS, timeout=10
        )
        if test.status_code != 200:
            raise RuntimeError(f"HTTP {test.status_code}")
        print(f"  OK — Verbindung steht")
    except Exception as e:
        print(f"\n  NETZWERK-FEHLER: {e}")
        print("  Hinweis: Validator benötigt Internetzugang zu Supabase.")
        print("  Ausführen über Chrome-Tab oder GitHub Actions.")
        sys.exit(2)

    # Apply
    print("\n[3/4] Apply läuft ...")
    errors = []
    write_count = 0

    for d in diseases:
        icd = d.get("icd10_code")
        quellen = build_quellen_payload(d.get("sources_curated", []))
        labs = d.get("related_labs_curated", [])
        supps = d.get("related_supplements_curated", [])

        payload = {
            "quellen": quellen,
            "verwandte_laborwerte": labs,
            "verwandte_supplements": supps,
        }

        print(f"  PATCH {icd} — quellen={len(quellen)}, labs={len(labs)}, supps={len(supps)} ...")
        result = apply_disease(icd, payload)

        if "error" in result:
            print(f"    FEHLER: {result['error']}")
            errors.append(f"{icd}: {result['error']}")
        else:
            print(f"    OK — {result}")
            write_count += 1

    # Ergebnis
    print(f"\n[4/4] Ergebnis:")
    print(f"  Geschrieben:  {write_count}/5 Krankheiten")
    print(f"  Fehler:       {len(errors)}")

    if errors:
        print("\n  FEHLER-LISTE:")
        for e in errors:
            print(f"    ✗ {e}")

    print("\n" + "=" * 65)
    if errors:
        print("URTEIL: PARTIAL APPLY")
        print("=" * 65)
        sys.exit(1)
    else:
        print("URTEIL: APPLY COMPLETE — alle 5 Krankheiten geschrieben")
        print("=" * 65)
        sys.exit(0)


if __name__ == "__main__":
    main()
