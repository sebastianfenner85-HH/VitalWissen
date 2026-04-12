#!/usr/bin/env python3
"""
VitalWissen — Krankheiten-Pipeline (P6)
========================================
Füllt die Supabase-Tabelle `krankheiten` mit strukturierten Einträgen.

Strategie:
  1. Liest die kuratierte ICD-Liste aus krankheiten_icd_list.json
  2. Überspringt bereits vorhandene Slugs (idempotent)
  3. Ruft Claude API auf → generiert 3 Sprachebenen + strukturierte Felder
  4. Schreibt Ergebnis direkt in Supabase

Setup:
  pip install anthropic supabase python-dotenv

Env-Variablen (lokal: .env | GitHub Actions: Secrets):
  CLAUDE_API_KEY       = sk-ant-...
  SUPABASE_URL         = https://ejyrzxmtosrouwstiyws.supabase.co
  SUPABASE_SERVICE_KEY = sb_secret_...

Ausführen (lokal):
  python pipelines/krankheiten_pipeline.py

Ausführen (mit Limit, z.B. zum Testen):
  python pipelines/krankheiten_pipeline.py --count 10

Ausführen (nur bestimmte Kategorie):
  python pipelines/krankheiten_pipeline.py --kategorie "Herz-Kreislauf"

Kosten-Schätzung:
  claude-haiku-3-5: ~$0.0025 / Eintrag → 200 Einträge ≈ $0.50
"""

import json
import re
import sys
import time
import argparse
import os
from pathlib import Path
from datetime import datetime

# ─── Abhängigkeiten prüfen ────────────────────────────────────────────────────
try:
    import anthropic
except ImportError:
    print("❌  anthropic nicht installiert → pip install anthropic")
    sys.exit(1)

try:
    from supabase import create_client, Client
except ImportError:
    print("❌  supabase-py nicht installiert → pip install supabase")
    sys.exit(1)

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # .env ist optional

# ─── Konfiguration ────────────────────────────────────────────────────────────
CLAUDE_API_KEY       = os.getenv("CLAUDE_API_KEY")
SUPABASE_URL         = os.getenv("SUPABASE_URL", "https://ejyrzxmtosrouwstiyws.supabase.co")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

# Günstiges + schnelles Modell für Bulk-Verarbeitung
CLAUDE_MODEL  = "claude-haiku-4-5-20251001"
DELAY_SECONDS = 0.6    # Pause zwischen API-Calls (Rate Limiting)
MAX_RETRIES   = 3      # Wiederholungen bei API-Fehler

SCRIPT_DIR = Path(__file__).parent
ICD_LIST_PATH = SCRIPT_DIR / "krankheiten_icd_list.json"

# ─── Prompt ───────────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """Du bist ein erfahrener medizinischer Redakteur für eine deutschsprachige Gesundheitsplattform.
Deine Texte sind sachlich korrekt, evidenzbasiert und für verschiedene Zielgruppen verständlich.
Du antwortest AUSSCHLIESSLICH mit validem JSON — kein erklärender Text davor oder danach."""

USER_PROMPT_TEMPLATE = """Erstelle einen strukturierten Lexikon-Eintrag für folgende Erkrankung:

ICD-10-Code: {icd10_code}
Name (Deutsch): {name_de}
Kategorie: {kategorie}

Antworte NUR mit diesem JSON-Format (alle Felder pflicht):
{{
  "beschreibung_einfach": "1-2 Sätze. Sprache wie für ein Kind (10 Jahre). Kurz und bildlich.",
  "beschreibung_laienhaft": "3-5 Sätze für medizinische Laien. Klar, ohne Fachjargon, mit Alltagsbezug.",
  "beschreibung_fachlich": "Fachlich präzise Beschreibung (4-6 Sätze). Ätiologie, Pathomechanismus, Epidemiologie.",
  "symptome": [
    {{"name": "Symptomname", "beschreibung": "Kurze Erklärung", "warnsignal": false}},
    {{"name": "Alarmsymptom", "beschreibung": "Beschreibung", "warnsignal": true}}
  ],
  "diagnostik": [
    {{"methode": "Methodenname", "beschreibung": "Was wird damit gemessen/geprüft"}}
  ],
  "behandlung": [
    {{"typ": "Behandlungstyp", "beschreibung": "Beschreibung der Behandlungsoption"}}
  ],
  "prognose": "1-2 Sätze zur Prognose mit und ohne Behandlung.",
  "leben_mit": "1-2 Sätze praktische Alltagstipps für Betroffene.",
  "haeufigkeit": "Sehr häufig|Häufig|Selten|Sehr selten",
  "notfall_flag": false,
  "synonym_de": ["Alternativname1", "Alternativname2"]
}}

Wichtig:
- symptome: 3-6 Einträge, mindestens 1 warnsignal:true wenn klinisch relevant
- diagnostik: 2-4 Einträge
- behandlung: 2-4 Einträge
- synonym_de: 0-3 gebräuchliche alternative Namen auf Deutsch
- notfall_flag: true nur bei lebensbedrohlichen Akutsituationen (Herzinfarkt, Sepsis, Anaphylaxie, etc.)
- Alle Texte auf Deutsch, sachlich korrekt, keine Eigenwerbung oder Markennennung"""


# ─── Hilfsfunktionen ──────────────────────────────────────────────────────────
def make_slug(name_de: str) -> str:
    """Erstellt einen URL-sicheren Slug aus dem deutschen Namen."""
    s = name_de.lower()
    # Umlaute ersetzen
    for umlaut, replacement in [('ä','ae'),('ö','oe'),('ü','ue'),('ß','ss')]:
        s = s.replace(umlaut, replacement)
    # Sonderzeichen entfernen, Bindestriche normalisieren
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s]+', '-', s.strip())
    s = re.sub(r'-+', '-', s)
    return s[:80]  # Max 80 Zeichen


def call_claude(client: anthropic.Anthropic, icd10_code: str, name_de: str, kategorie: str) -> dict | None:
    """Ruft Claude API auf und gibt geparsten JSON-Dict zurück."""
    prompt = USER_PROMPT_TEMPLATE.format(
        icd10_code=icd10_code,
        name_de=name_de,
        kategorie=kategorie
    )

    for attempt in range(MAX_RETRIES):
        try:
            msg = client.messages.create(
                model=CLAUDE_MODEL,
                max_tokens=2000,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": prompt}]
            )
            raw = msg.content[0].text.strip()

            # JSON-Block extrahieren (falls Claude trotzdem Text drumherum schreibt)
            json_match = re.search(r'\{.*\}', raw, re.DOTALL)
            if not json_match:
                print(f"    ⚠️  Kein JSON gefunden (Versuch {attempt+1})")
                continue

            data = json.loads(json_match.group())

            # Pflichtfelder validieren
            required = ['beschreibung_einfach', 'beschreibung_laienhaft', 'beschreibung_fachlich',
                        'symptome', 'diagnostik', 'behandlung', 'prognose', 'leben_mit',
                        'haeufigkeit', 'notfall_flag', 'synonym_de']
            missing = [f for f in required if f not in data]
            if missing:
                print(f"    ⚠️  Fehlende Felder: {missing} (Versuch {attempt+1})")
                continue

            return data

        except json.JSONDecodeError as e:
            print(f"    ⚠️  JSON-Parse-Fehler: {e} (Versuch {attempt+1})")
        except anthropic.RateLimitError:
            wait = 30 * (attempt + 1)
            print(f"    ⏳ Rate Limit — warte {wait}s...")
            time.sleep(wait)
        except anthropic.APIError as e:
            print(f"    ❌ API-Fehler: {e} (Versuch {attempt+1})")
            time.sleep(5)

        time.sleep(2)

    return None


def upsert_krankheit(supabase: Client, record: dict) -> bool:
    """Schreibt einen Eintrag in Supabase. Überspringt bei Konflikt (slug)."""
    try:
        result = supabase.table("krankheiten").upsert(
            record,
            on_conflict="slug",
            ignore_duplicates=True
        ).execute()
        return True
    except Exception as e:
        print(f"    ❌ Supabase-Fehler: {e}")
        return False


def get_existing_slugs(supabase: Client) -> set:
    """Lädt alle bereits vorhandenen Slugs aus Supabase."""
    try:
        result = supabase.table("krankheiten").select("slug").execute()
        return {row["slug"] for row in result.data}
    except Exception as e:
        print(f"⚠️  Konnte vorhandene Slugs nicht laden: {e}")
        return set()


# ─── Hauptprogramm ────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="VitalWissen Krankheiten-Pipeline")
    parser.add_argument("--count",     type=int,  default=0,  help="Max. Anzahl zu verarbeitender Einträge (0 = alle)")
    parser.add_argument("--start",     type=int,  default=0,  help="Start-Index in der ICD-Liste")
    parser.add_argument("--kategorie", type=str,  default="", help="Nur eine Kategorie verarbeiten")
    parser.add_argument("--dry-run",   action="store_true",   help="Nur simulieren, nicht in DB schreiben")
    parser.add_argument("--force",     action="store_true",   help="Bereits vorhandene Einträge überschreiben")
    args = parser.parse_args()

    # ── Credentials prüfen ────────────────────────────────────────────────────
    if not CLAUDE_API_KEY:
        print("❌  CLAUDE_API_KEY nicht gesetzt. Bitte in .env oder als Env-Variable setzen.")
        sys.exit(1)
    if not SUPABASE_SERVICE_KEY:
        print("❌  SUPABASE_SERVICE_KEY nicht gesetzt.")
        sys.exit(1)

    # ── Clients initialisieren ────────────────────────────────────────────────
    claude_client = anthropic.Anthropic(api_key=CLAUDE_API_KEY)
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    # ── ICD-Liste laden ───────────────────────────────────────────────────────
    if not ICD_LIST_PATH.exists():
        print(f"❌  ICD-Liste nicht gefunden: {ICD_LIST_PATH}")
        sys.exit(1)

    with open(ICD_LIST_PATH, "r", encoding="utf-8") as f:
        icd_raw = json.load(f)

    # Duplikate in der Liste entfernen (nach ICD-Code)
    seen_codes = set()
    icd_list = []
    for entry in icd_raw:
        code = entry[0]
        if code not in seen_codes:
            seen_codes.add(code)
            icd_list.append(entry)

    # Filter anwenden
    if args.kategorie:
        icd_list = [e for e in icd_list if e[2] == args.kategorie]
        print(f"📂 Filter: Kategorie '{args.kategorie}' → {len(icd_list)} Codes")

    icd_list = icd_list[args.start:]
    if args.count > 0:
        icd_list = icd_list[:args.count]

    # ── Vorhandene Slugs laden ────────────────────────────────────────────────
    if not args.force and not args.dry_run:
        print("🔍 Lade vorhandene Einträge aus Supabase...")
        existing_slugs = get_existing_slugs(supabase)
        print(f"   {len(existing_slugs)} Einträge bereits vorhanden")
    else:
        existing_slugs = set()

    # ── Verarbeitung ──────────────────────────────────────────────────────────
    to_process = [e for e in icd_list if make_slug(e[1]) not in existing_slugs]

    print(f"\n{'='*60}")
    print(f"VitalWissen Krankheiten-Pipeline — {datetime.now().strftime('%d.%m.%Y %H:%M')}")
    print(f"{'='*60}")
    print(f"Gesamt in Liste:     {len(icd_list)}")
    print(f"Bereits vorhanden:   {len(icd_list) - len(to_process)}")
    print(f"Zu verarbeiten:      {len(to_process)}")
    if args.dry_run:
        print(f"Modus:               DRY RUN (keine DB-Schreibvorgänge)")
    print(f"{'='*60}\n")

    if len(to_process) == 0:
        print("✅ Alle Einträge bereits vorhanden. Nichts zu tun.")
        return

    stats = {"ok": 0, "skip": 0, "error": 0}

    for i, (icd10_code, name_de, kategorie) in enumerate(to_process):
        slug = make_slug(name_de)
        print(f"[{i+1:>3}/{len(to_process)}] {icd10_code:<6} {name_de}")

        if args.dry_run:
            print(f"         → slug: {slug} [DRY RUN]")
            stats["ok"] += 1
            continue

        # Claude API aufrufen
        data = call_claude(claude_client, icd10_code, name_de, kategorie)
        if not data:
            print(f"         ❌ Übersprungen (Claude-Fehler)")
            stats["error"] += 1
            time.sleep(DELAY_SECONDS)
            continue

        # Datensatz zusammenbauen
        record = {
            "icd10_code":             icd10_code,
            "slug":                   slug,
            "name_de":                name_de,
            "kategorie":              kategorie,
            "synonym_de":             data.get("synonym_de", []),
            "beschreibung_einfach":   data.get("beschreibung_einfach", ""),
            "beschreibung_laienhaft": data.get("beschreibung_laienhaft", ""),
            "beschreibung_fachlich":  data.get("beschreibung_fachlich", ""),
            "symptome":               data.get("symptome", []),
            "diagnostik":             data.get("diagnostik", []),
            "behandlung":             data.get("behandlung", []),
            "prognose":               data.get("prognose", ""),
            "leben_mit":              data.get("leben_mit", ""),
            "haeufigkeit":            data.get("haeufigkeit", "Häufig"),
            "notfall_flag":           bool(data.get("notfall_flag", False)),
            "gender_kontext":         {},
            "komorbiditaeten":        [],
            "verwandte_laborwerte":   [],
            "verwandte_supplements":  [],
            "weiterfuehrend":         [],
            "quellen":                [{"name": "Basierend auf ICD-10-GM + klinischem Wissen", "typ": "intern"}],
            "letzte_aktualisierung":  datetime.utcnow().isoformat(),
        }

        if upsert_krankheit(supabase, record):
            print(f"         ✅ Gespeichert (haeufigkeit: {data.get('haeufigkeit')}, notfall: {data.get('notfall_flag')})")
            stats["ok"] += 1
        else:
            stats["error"] += 1

        time.sleep(DELAY_SECONDS)

    # ── Zusammenfassung ───────────────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"Fertig! ✅ {stats['ok']} gespeichert | ❌ {stats['error']} Fehler")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
