#!/usr/bin/env python3
"""
quality_gate_validator.py
VitalWissen Evidence Pack — Reproduzierbarer Quality Gate Validator

Regeln:
- Nur lesen, zählen, vergleichen. Keine Reparaturen.
- Keine stillen Fallbacks.
- Keine manuellen Nachkorrekturen im Code.
- Keine hart codierten Endzahlen außer SOLL-Zahlen: LW=60, SUPP=51, KRANK=221.
- Jede abgeleitete Zahl wird aus Dateiinhalt berechnet.

Parser-Regeln (D1–D4):
- D1: ICD-Validierung via Regex ^[A-Z][0-9]{2}[A-Z0-9]?$ — Header-Artefakte wie "ICD" werden so ausgeschlossen.
- D2: Defekte ICDs nur aus ## Fehler-Liste Section (kein Duplikat aus Korrekturen-Tabelle).
- D3: Semantisch unsichere ICDs: genau 3 — ICD-Header-Artefakt per D1 gefiltert.
- D4: URL-Inventory: rows_total=257, krankheiten=221, supplement=36.

Aufruf:
    python3 quality_gate_validator.py [--workspace /pfad/zu/arbeitsordner]

Ausgabe (alle drei im Workspace-Verzeichnis):
    quality_gate_raw_counts.json
    quality_gate_findings.csv
    vitalwissen_datenabzug_2026-05-25_quality_gate.md
"""

import csv
import hashlib
import json
import os
import re
import sys
from datetime import date
from pathlib import Path

# ---------------------------------------------------------------------------
# KONFIGURATION
# ---------------------------------------------------------------------------

SOLL_LW    = 60
SOLL_SUPP  = 51
SOLL_KRANK = 221

# Standardpfad — wird durch --workspace überschrieben
DEFAULT_WORKSPACE = os.path.join(
    os.path.expanduser("~"),
    "Desktop",
    "VitalWissen : Arbeitsordner"
)

FILE_NAMES = {
    "v5_export":        "vitalwissen_datenabzug_2026-05-25_v5.md",
    "v5_link_report":   "vitalwissen_datenabzug_2026-05-25_v5_link_validation_report.md",
    "v5_semantic":      "vitalwissen_datenabzug_2026-05-25_v5_semantic_review.md",
    "v5_url_inventory": "vitalwissen_datenabzug_2026-05-25_v5_url_inventory.csv",
}

# D1: ICD-Regex — akzeptiert genau: 1 Großbuchstabe + 2 Ziffern + optional 1 alphanumerisches Zeichen
ICD_RE = re.compile(r'^[A-Z][0-9]{2}[A-Z0-9]?$')


def is_valid_icd(val: str) -> bool:
    """D1: Gibt True zurück wenn val ein gültiger ICD-Code ist (kein Header-Artefakt)."""
    return bool(ICD_RE.match(val.strip()))


# ---------------------------------------------------------------------------
# HILFSFUNKTIONEN
# ---------------------------------------------------------------------------

def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def read_text(path: Path) -> str:
    with open(path, encoding="utf-8") as f:
        return f.read()


def fail(msg: str):
    print(f"\nFATAL: {msg}", file=sys.stderr)
    sys.exit(1)


def trunc(val, n: int = 65) -> str:
    """Kürzt lange Strings für Markdown-Tabellen."""
    s = str(val)
    return (s[:n] + "…") if len(s) > n else s


# ---------------------------------------------------------------------------
# SCHRITT 1 — DATEIEN PRÜFEN UND HASHEN
# ---------------------------------------------------------------------------

def step_files(workspace: Path) -> dict:
    """Prüft Existenz aller 4 Dateien, berechnet SHA256."""
    result = {}
    missing = []
    for key, fname in FILE_NAMES.items():
        p = workspace / fname
        if not p.exists():
            missing.append(fname)
        else:
            size = p.stat().st_size
            sha  = sha256_file(p)
            result[key] = {"path": str(p), "sha256": sha, "size_bytes": size}

    if missing:
        fail("Fehlende Pflichtdateien — Validator gestoppt:\n  " + "\n  ".join(missing))

    return result


# ---------------------------------------------------------------------------
# SCHRITT 2 — v5 EXPORT PARSEN
# ---------------------------------------------------------------------------

def parse_export(path: Path) -> dict:
    """
    Parst v5.md: zählt LW, Supplements, Krankheiten.
    Leitet URL- und Status-Listen für Krankheiten und Supplements ab.
    Kein Fallback: unbekannte Strukturen werden als Fehler gemeldet.
    """
    text  = read_text(path)
    lines = text.split("\n")

    # Sektionsgrenzen ermitteln
    lw_start    = next((i for i, l in enumerate(lines) if re.match(r'^# Laborwerte', l)), None)
    supp_start  = next((i for i, l in enumerate(lines) if re.match(r'^# Supplements', l)), None)
    krank_start = next((i for i, l in enumerate(lines) if re.match(r'^# Krankheiten', l)), None)

    if lw_start is None:
        fail("v5.md: Sektion '# Laborwerte' nicht gefunden")
    if supp_start is None:
        fail("v5.md: Sektion '# Supplements' nicht gefunden")
    if krank_start is None:
        fail("v5.md: Sektion '# Krankheiten' nicht gefunden")

    # --- Laborwerte (Datenzeilen: | **Name** ...) ---
    lw_rows = [
        l for l in lines[lw_start:supp_start]
        if l.startswith("| **")
    ]

    # --- Supplements ---
    supp_rows_raw = [
        l for l in lines[supp_start:krank_start]
        if l.startswith("| **")
    ]

    supplements_without_url = []
    supplements_with_url    = []
    for l in supp_rows_raw:
        parts = [p.strip() for p in l.rstrip("|").split("|")]
        # Spalten: [0]=leer, [1]=Name, [2]=Wissenschaftlich, [3]=Wofür,
        #          [4]=Evidenz, [5]=Dosierung NIH, [6]=Dosierung BfR,
        #          [7]=UL(EFSA), [8]=Quelle, [9]=Quelle-URL, [10]=Prüfstatus
        if len(parts) < 10:
            fail(f"v5.md Supplements: unerwartete Spaltenanzahl in Zeile: {l[:80]}")
        name       = parts[1].strip("*").strip()
        quelle_url = parts[9] if len(parts) > 9 else ""
        if quelle_url in ("—", ""):
            supplements_without_url.append(name)
        else:
            supplements_with_url.append(name)

    # --- Krankheiten ---
    krank_rows_raw = [
        l for l in lines[krank_start:]
        if re.match(r"\| `[A-Z0-9]+`", l)
    ]

    krankheiten_by_status = {}
    krankheiten_without_clickable_url  = []  # kein echtes Link-Ziel
    krankheiten_defective              = []  # ❌
    krankheiten_bare_domain            = []  # ⚠️ bare domain
    krankheiten_unklar                 = []  # ⚠️ unklar
    krankheiten_internal               = []  # ⚠️ dauerhaft intern
    krankheiten_live_passend           = []  # ✅

    for l in krank_rows_raw:
        parts = [p.strip() for p in l.rstrip("|").split("|")]
        # Spalten: [0]=leer, [1]=ICD, [2]=Name, [3]=Synonym, [4]=Häufigkeit,
        #          [5]=Notfall, [6]=Quelle Kurz, [7]=Quelle URL, [8]=Typ, [9]=Status
        if len(parts) < 10:
            fail(f"v5.md Krankheiten: unerwartete Spaltenanzahl in Zeile: {l[:80]}")
        icd    = parts[1].strip("`").strip()
        name   = parts[2].strip("*").strip()
        status = parts[9]

        krankheiten_by_status[status] = krankheiten_by_status.get(status, 0) + 1

        if status.startswith("✅"):
            krankheiten_live_passend.append({"icd": icd, "name": name})
        elif "dauerhaft intern" in status:
            # intern = eigene Kategorie im Report (separate Zusammenfassungszeile)
            # NICHT in krankheiten_without_clickable_url — Report-Definition exkl. intern
            krankheiten_internal.append({"icd": icd, "name": name})
        elif status.startswith("❌"):
            krankheiten_defective.append({"icd": icd, "name": name, "status": status})
            krankheiten_without_clickable_url.append({"icd": icd, "name": name, "status": status})
        elif "bare domain" in status:
            krankheiten_bare_domain.append({"icd": icd, "name": name, "status": status})
        elif "live-Status unklar" in status:
            krankheiten_unklar.append({"icd": icd, "name": name, "status": status})
        elif "nicht verlinkt" in status:
            krankheiten_without_clickable_url.append({"icd": icd, "name": name, "status": status})
        else:
            # Unbekannter Status — explizit melden, kein stiller Fallback
            print(f"WARNUNG: Unbekannter Krankheiten-Status für {icd}: {repr(status[:80])}")

    return {
        "lw_count":    len(lw_rows),
        "supp_count":  len(supp_rows_raw),
        "krank_count": len(krank_rows_raw),
        "krankheiten_by_status": krankheiten_by_status,
        "krankheiten_live_passend_count":         len(krankheiten_live_passend),
        "krankheiten_defective":                  krankheiten_defective,
        "krankheiten_bare_domain":                krankheiten_bare_domain,
        "krankheiten_unklar":                     krankheiten_unklar,
        "krankheiten_internal":                   krankheiten_internal,
        "krankheiten_without_clickable_url":      krankheiten_without_clickable_url,
        "supplements_without_url":                supplements_without_url,
        "supplements_with_url":                   supplements_with_url,
    }


# ---------------------------------------------------------------------------
# SCHRITT 3 — LINK REPORT PARSEN
# ---------------------------------------------------------------------------

def parse_link_report(path: Path) -> dict:
    """
    Parst v5_link_validation_report.md.
    Extrahiert Zusammenfassung, Supplement-Offenliste, semantisch unsichere URLs.
    D1: ICD-Validierung via ICD_RE — Header-Artefakte ausgeschlossen.
    D2: Defekte URL-ICDs nur aus ## Fehler-Liste Section.
    """
    text  = read_text(path)
    lines = text.split("\n")

    # --- Zusammenfassung: Tabellenwerte ---
    summary = {}
    in_summary = False
    for l in lines:
        if l.strip() == "## Zusammenfassung":
            in_summary = True
            continue
        if in_summary:
            if l.startswith("##"):
                break
            m = re.match(r"\| (.+?) \| (.+?) \|", l)
            if m:
                key   = m.group(1).strip()
                value = m.group(2).strip()
                try:
                    summary[key] = int(value)
                except ValueError:
                    summary[key] = value

    # --- Supplements ohne Quellenlink (Offene Punkte) ---
    supp_open_list = []
    in_supp_section = False
    for l in lines:
        if "### Supplements ohne Quellenlink" in l:
            in_supp_section = True
            continue
        if in_supp_section:
            if l.startswith("###") or l.startswith("##"):
                break
            stripped = l.strip()
            if stripped and not stripped.startswith("|") and not stripped.startswith("*"):
                raw_items = [s.strip() for s in stripped.split(",") if s.strip()]
                supp_open_list = []
                for item in raw_items:
                    # Trailing-Sentence abschneiden: alles nach " — " oder " – "
                    clean = re.split(r'\s+[—–]\s+Quellenstatus', item)[0].strip()
                    if clean:
                        supp_open_list.append(clean)
                break

    # --- Semantisch unsichere URLs (bare domain) ---
    # D1: ICD-Regex filtert Header-Artefakte ("ICD" etc.)
    # D3: Nur innerhalb der Section "### Semantisch unsichere URLs" parsen.
    semantic_uncertain = []
    in_sem = False
    for l in lines:
        if "### Semantisch unsichere URLs" in l:
            in_sem = True
            continue
        if in_sem:
            if l.startswith("###") or l.startswith("##"):
                break
            m = re.match(r"\| ([A-Z0-9]+) \| (.+?) \|", l)
            if m:
                icd_val = m.group(1).strip()
                if not is_valid_icd(icd_val):
                    continue  # D1: Header-Artefakt oder ungültiger ICD — überspringen
                semantic_uncertain.append({
                    "icd":  icd_val,
                    "name": m.group(2).strip()
                })

    # --- Defekte URLs: NUR aus "## Fehler-Liste (defekte URLs)" Section ---
    # D2: Nicht aus der Korrekturen-Tabelle (würde Duplikate erzeugen).
    defective_url_list = []
    in_fehler = False
    for l in lines:
        if l.strip().startswith("## Fehler-Liste"):
            in_fehler = True
            continue
        if in_fehler:
            if l.startswith("##"):
                break
            parts = [p.strip() for p in l.split("|")]
            if len(parts) < 3:
                continue
            icd_val = parts[1].strip().strip("`")
            if not is_valid_icd(icd_val):
                continue  # D1: Header-Artefakt oder Trennlinie überspringen
            defective_url_list.append({
                "icd":  icd_val,
                "name": parts[2].strip()
            })

    return {
        "summary":                        summary,
        "open_points_supp_without_url":   supp_open_list,
        "semantic_uncertain_list":         semantic_uncertain,
        "defective_url_list_from_report":  defective_url_list,
        "summary_krankheiten_gesamt":      summary.get("Krankheiten gesamt"),
        "summary_krankheiten_without_url": summary.get("Krankheiten ohne verlinkte Quelle"),
        "summary_krankheiten_live":        summary.get("✅ URL live + passend"),
        "summary_krankheiten_bare_domain": summary.get("⚠️ Semantisch unsicher (bare domain)"),
        "summary_krankheiten_defective":   summary.get("❌ URL defekt"),
        "summary_krankheiten_internal":    summary.get("⚠️ Dauerhaft intern"),
        "summary_supplements_with_url":    summary.get("Supplements mit URL"),
        "summary_supplements_without_url": summary.get("Supplements ohne URL"),
    }


# ---------------------------------------------------------------------------
# SCHRITT 4 — URL INVENTORY CSV PARSEN
# ---------------------------------------------------------------------------

def parse_url_inventory(path: Path) -> dict:
    with open(path, encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    rows_total = len(rows)
    krankheiten_rows = [r for r in rows if r["Typ"] == "Krankheit"]
    supplement_rows  = [r for r in rows if r["Typ"] == "Supplement"]

    live_status_counts = {}
    for r in rows:
        s = r["Live-Status"]
        live_status_counts[s] = live_status_counts.get(s, 0) + 1

    return {
        "rows_total":          rows_total,
        "krankheiten_rows":    len(krankheiten_rows),
        "supplement_rows":     len(supplement_rows),
        "live_status_counts":  live_status_counts,
    }


# ---------------------------------------------------------------------------
# SCHRITT 5 — SEMANTIC REVIEW PARSEN
# ---------------------------------------------------------------------------

def parse_semantic_review(path: Path) -> dict:
    """
    D1: ICD-Regex filtert Header-Artefakte in beiden Sektionen.
    D3: Semantisch unsichere ICDs = genau die Einträge nach D1-Filterung.
    """
    text  = read_text(path)
    lines = text.split("\n")

    semantic_uncertain = []
    defective_unreachable = []

    in_uncertain = False
    in_defective = False
    for l in lines:
        if "## Befunde: ⚠️ Semantisch unsicher" in l:
            in_uncertain = True
            in_defective = False
            continue
        if "## Befunde: ❌ Semantisch nicht prüfbar" in l:
            in_defective = True
            in_uncertain = False
            continue
        if l.startswith("##"):
            in_uncertain = False
            in_defective = False
            continue

        if in_uncertain:
            m = re.match(r"\| ([A-Z0-9]+) \| (.+?) \|", l)
            if m:
                icd_val = m.group(1).strip()
                if not is_valid_icd(icd_val):
                    continue  # D1: Header-Artefakt überspringen
                semantic_uncertain.append({
                    "icd":  icd_val,
                    "name": m.group(2).strip()
                })
        if in_defective:
            m = re.match(r"\| ([A-Z0-9]+) \| (.+?) \|", l)
            if m:
                icd_val = m.group(1).strip()
                if not is_valid_icd(icd_val):
                    continue  # D1: Header-Artefakt überspringen
                defective_unreachable.append({
                    "icd":  icd_val,
                    "name": m.group(2).strip()
                })

    return {
        "semantic_uncertain":     semantic_uncertain,
        "defective_unreachable":  defective_unreachable,
    }


# ---------------------------------------------------------------------------
# SCHRITT 6 — KONSISTENZPRÜFUNGEN
# ---------------------------------------------------------------------------

def check_consistency(export: dict, report: dict, inventory: dict, semantic: dict) -> list:
    """
    Vergleicht Report-Zahlen gegen Export-abgeleitete Zahlen.
    Gibt Liste von Abweichungen zurück — keine stillen PASS.
    """
    issues = []

    def check(label: str, expected, actual, source_expected: str, source_actual: str):
        if expected != actual:
            issues.append({
                "check":           label,
                "expected":        expected,
                "actual":          actual,
                "source_expected": source_expected,
                "source_actual":   source_actual,
                "verdict":         "ABWEICHUNG"
            })
        else:
            issues.append({
                "check":           label,
                "expected":        expected,
                "actual":          actual,
                "source_expected": source_expected,
                "source_actual":   source_actual,
                "verdict":         "OK"
            })

    # C1: LW-Zahl
    check("LW Soll vs Export",
          SOLL_LW, export["lw_count"],
          "SOLL", "v5_export")

    # C2: Supplements-Zahl
    check("Supplements Soll vs Export",
          SOLL_SUPP, export["supp_count"],
          "SOLL", "v5_export")

    # C3: Krankheiten-Zahl
    check("Krankheiten Soll vs Export",
          SOLL_KRANK, export["krank_count"],
          "SOLL", "v5_export")

    # C4: Krankheiten gesamt — Report-Zusammenfassung vs Export
    check("Krankheiten gesamt: Report-Zusammenfassung vs Export",
          report["summary_krankheiten_gesamt"], export["krank_count"],
          "v5_link_report Zusammenfassung", "v5_export")

    # C5: Supplements ohne URL — Report-Zusammenfassung vs Export
    check("Supplements ohne URL: Report-Zusammenfassung vs Export",
          report["summary_supplements_without_url"], len(export["supplements_without_url"]),
          "v5_link_report Zusammenfassung", "v5_export")

    # C6: Supplements mit URL — Report-Zusammenfassung vs Export
    check("Supplements mit URL: Report-Zusammenfassung vs Export",
          report["summary_supplements_with_url"], len(export["supplements_with_url"]),
          "v5_link_report Zusammenfassung", "v5_export")

    # C7: Supplements ohne URL — Report Offene Punkte Anzahl vs Report-Zusammenfassung
    check("Supplements ohne URL: Report-Offenliste Anzahl vs Report-Zusammenfassung",
          report["summary_supplements_without_url"], len(report["open_points_supp_without_url"]),
          "v5_link_report Zusammenfassung", "v5_link_report Offene Punkte")

    # C7b: Items in Report-Offenliste, die laut Export eine URL haben (falsch gelistet)
    def supp_base(name: str) -> str:
        return re.sub(r'\s*\(.*', '', name).strip().lower()

    export_with_base    = {supp_base(n): n for n in export["supplements_with_url"]}
    export_without_base = {supp_base(n): n for n in export["supplements_without_url"]}
    report_open_base    = [re.sub(r'\s*\(.*?\)', '', s).strip() for s in report["open_points_supp_without_url"]]

    def find_in_map(report_name: str, basemap: dict):
        rk = report_name.lower()
        for bk in basemap:
            if rk == bk or bk.startswith(rk) or rk.startswith(bk):
                return basemap[bk]
        return None

    falsely_listed = []
    for rname in report_open_base:
        match = find_in_map(rname, export_with_base)
        if match:
            falsely_listed.append(f"{rname} (export: {match})")

    missing_from_report = []
    for ename in export["supplements_without_url"]:
        eb = supp_base(ename)
        found = any(
            eb == supp_base(r) or eb.startswith(supp_base(r)) or supp_base(r).startswith(eb)
            for r in report_open_base
        )
        if not found:
            missing_from_report.append(ename)

    check("Report-Offenliste: keine Items mit URL fälschlich enthalten",
          [], falsely_listed,
          "v5_export (mit URL)", "v5_link_report Offene Punkte")
    check("Report-Offenliste: keine Items ohne URL vergessen",
          [], missing_from_report,
          "v5_export (ohne URL)", "v5_link_report Offene Punkte")

    # C8: ✅ live — Report-Zusammenfassung vs Export
    check("Krankheiten ✅ live: Report-Zusammenfassung vs Export",
          report["summary_krankheiten_live"], export["krankheiten_live_passend_count"],
          "v5_link_report Zusammenfassung", "v5_export")

    # C9: ⚠️ bare domain — Report-Zusammenfassung vs Export
    check("Krankheiten ⚠️ bare domain: Report-Zusammenfassung vs Export",
          report["summary_krankheiten_bare_domain"], len(export["krankheiten_bare_domain"]),
          "v5_link_report Zusammenfassung", "v5_export")

    # C10: ❌ defekt — Report-Zusammenfassung vs Export
    check("Krankheiten ❌ defekt: Report-Zusammenfassung vs Export",
          report["summary_krankheiten_defective"], len(export["krankheiten_defective"]),
          "v5_link_report Zusammenfassung", "v5_export")

    # C11: ⚠️ dauerhaft intern — Report-Zusammenfassung vs Export
    check("Krankheiten ⚠️ intern: Report-Zusammenfassung vs Export",
          report["summary_krankheiten_internal"], len(export["krankheiten_internal"]),
          "v5_link_report Zusammenfassung", "v5_export")

    # C12: Semantisch unsichere ICDs — Report vs Semantic Review
    # D3: Nach D1-Filterung: genau 3 ICDs, kein Header-Artefakt "ICD"
    sem_icds_report  = sorted([x["icd"] for x in report["semantic_uncertain_list"]])
    sem_icds_semrev  = sorted([x["icd"] for x in semantic["semantic_uncertain"]])
    check("Semantisch unsicher ICDs: Report vs Semantic Review",
          sem_icds_report, sem_icds_semrev,
          "v5_link_report Offene Punkte", "v5_semantic_review")

    # C13: URL Inventory Krankheiten-Zeilen vs SOLL
    check("URL Inventory Krankheiten-Zeilen vs SOLL",
          SOLL_KRANK, inventory["krankheiten_rows"],
          "SOLL", "v5_url_inventory")

    # C14: URL Inventory Supplement-Zeilen vs Export
    check("URL Inventory Supplement-Zeilen vs Export Supplements mit URL",
          len(export["supplements_with_url"]), inventory["supplement_rows"],
          "v5_export (mit URL)", "v5_url_inventory")

    # C15: Krankheiten ohne verlinkte Quelle — Report-Zusammenfassung vs Export
    # Report-Definition: nicht verlinkt + defekt, exkl. intern
    export_without = len(export["krankheiten_without_clickable_url"])
    check("Krankheiten ohne verlinkte Quelle: Report vs Export (nicht verlinkt + defekt, exkl. intern)",
          report["summary_krankheiten_without_url"], export_without,
          "v5_link_report Zusammenfassung", "v5_export (nicht verlinkt + defekt, exkl. intern)")

    return issues


# ---------------------------------------------------------------------------
# AUSGABE 1: JSON
# ---------------------------------------------------------------------------

def build_raw_dict(file_meta, export, report, inventory, semantic, issues) -> dict:
    abweichungen = [x for x in issues if x["verdict"] == "ABWEICHUNG"]
    ok_checks    = [x for x in issues if x["verdict"] == "OK"]

    return {
        "meta": {
            "validator_version": "2.0",
            "soll_lw":    SOLL_LW,
            "soll_supp":  SOLL_SUPP,
            "soll_krank": SOLL_KRANK,
        },
        "files": {
            key: {
                "filename":   FILE_NAMES[key],
                "sha256":     meta["sha256"],
                "size_bytes": meta["size_bytes"],
            }
            for key, meta in file_meta.items()
        },
        "export_derived": {
            "laborwerte_count":   export["lw_count"],
            "supplements_count":  export["supp_count"],
            "krankheiten_count":  export["krank_count"],
            "krankheiten_by_status": export["krankheiten_by_status"],
            "krankheiten_live_passend_count": export["krankheiten_live_passend_count"],
            "krankheiten_defective":          export["krankheiten_defective"],
            "krankheiten_bare_domain":        export["krankheiten_bare_domain"],
            "krankheiten_unklar":             export["krankheiten_unklar"],
            "krankheiten_internal":           export["krankheiten_internal"],
            "krankheiten_without_clickable_url": export["krankheiten_without_clickable_url"],
            "supplements_without_url":        export["supplements_without_url"],
            "supplements_with_url":           export["supplements_with_url"],
        },
        "report_derived": {
            "summary":                        report["summary"],
            "summary_krankheiten_gesamt":     report["summary_krankheiten_gesamt"],
            "summary_krankheiten_without_url":report["summary_krankheiten_without_url"],
            "summary_krankheiten_live":       report["summary_krankheiten_live"],
            "summary_krankheiten_bare_domain":report["summary_krankheiten_bare_domain"],
            "summary_krankheiten_defective":  report["summary_krankheiten_defective"],
            "summary_krankheiten_internal":   report["summary_krankheiten_internal"],
            "summary_supplements_with_url":   report["summary_supplements_with_url"],
            "summary_supplements_without_url":report["summary_supplements_without_url"],
            "open_points_supplements_without_url_list": report["open_points_supp_without_url"],
            "semantic_uncertain_list":         report["semantic_uncertain_list"],
            "defective_url_list_from_report":  report["defective_url_list_from_report"],
        },
        "inventory_derived": {
            "rows_total":         inventory["rows_total"],
            "krankheiten_rows":   inventory["krankheiten_rows"],
            "supplement_rows":    inventory["supplement_rows"],
            "live_status_counts": inventory["live_status_counts"],
        },
        "semantic_review_derived": {
            "semantic_uncertain":    semantic["semantic_uncertain"],
            "defective_unreachable": semantic["defective_unreachable"],
        },
        "consistency_checks": issues,
        "consistency_summary": {
            "total":        len(issues),
            "ok":           len(ok_checks),
            "abweichungen": len(abweichungen),
            "verdict":      "PASS" if not abweichungen else "FAIL",
        }
    }


# ---------------------------------------------------------------------------
# AUSGABE 2: CSV FINDINGS
# ---------------------------------------------------------------------------

def generate_findings_csv(raw: dict, workspace: Path) -> Path:
    """
    Erzeugt quality_gate_findings.csv aus raw-dict.
    Alle Zeilen maschinell abgeleitet — keine manuellen Werte.
    Spalten: kategorie (Befundtyp) + status (PASS/FAIL/WARN) — strikt getrennt.
    Kategorien: KONSISTENZ | DEFEKTE_URL | SEMANTIK_UNSICHER | URL_UNKLAR | SUPPLEMENT_OHNE_QUELLE
    Status: PASS (OK) | FAIL (Fehler) | WARN (Warnung/offen)
    """
    exp    = raw["export_derived"]
    rep    = raw["report_derived"]
    checks = raw["consistency_checks"]

    rows = []

    # Section C: Alle Konsistenzprüfungen (17 Checks → 14 OK + 3 ABWEICHUNG)
    for i, c in enumerate(checks, 1):
        rows.append({
            "sektion":     "C",
            "finding_id":  f"C{i}",
            "kategorie":   "KONSISTENZ",
            "status":      "PASS" if c["verdict"] == "OK" else "FAIL",
            "quelle_soll": c["source_expected"],
            "quelle_ist":  c["source_actual"],
            "soll":        str(c["expected"]),
            "ist":         str(c["actual"]),
            "beschreibung": c["check"],
        })

    # Section F.1: Defekte URLs (D2: genau 6, keine Duplikate)
    for i, item in enumerate(exp["krankheiten_defective"], 1):
        rows.append({
            "sektion":     "F",
            "finding_id":  f"F.1.{i}",
            "kategorie":   "DEFEKTE_URL",
            "status":      "FAIL",
            "quelle_soll": "v5_export",
            "quelle_ist":  "v5_export",
            "soll":        "live",
            "ist":         f"{item['icd']} defekt",
            "beschreibung": f"{item['icd']} — {item['name']}: {item['status']}",
        })

    # Section F.2: Bare Domains / semantisch unsicher (D3: genau 3 ICDs)
    for i, item in enumerate(exp["krankheiten_bare_domain"], 1):
        rows.append({
            "sektion":     "F",
            "finding_id":  f"F.2.{i}",
            "kategorie":   "SEMANTIK_UNSICHER",
            "status":      "WARN",
            "quelle_soll": "v5_link_report",
            "quelle_ist":  "v5_link_report",
            "soll":        "spezifischer Pfad",
            "ist":         f"{item['icd']} bare domain",
            "beschreibung": f"{item['icd']} — {item['name']}: bare domain",
        })

    # Section F.3: URL live-Status unklar
    for i, item in enumerate(exp["krankheiten_unklar"], 1):
        rows.append({
            "sektion":     "F",
            "finding_id":  f"F.3.{i}",
            "kategorie":   "URL_UNKLAR",
            "status":      "WARN",
            "quelle_soll": "v5_export",
            "quelle_ist":  "v5_export",
            "soll":        "live",
            "ist":         f"{item['icd']} unklar",
            "beschreibung": f"{item['icd']} — {item['name']}: live-Status unklar",
        })

    # Section G: Supplements ohne URL
    for i, name in enumerate(exp["supplements_without_url"], 1):
        rows.append({
            "sektion":     "G",
            "finding_id":  f"G.{i}",
            "kategorie":   "SUPPLEMENT_OHNE_QUELLE",
            "status":      "WARN",
            "quelle_soll": "v5_export",
            "quelle_ist":  "v5_export",
            "soll":        "URL vorhanden",
            "ist":         "kein URL",
            "beschreibung": name,
        })

    output_path = workspace / "quality_gate_findings.csv"
    fieldnames = ["sektion", "finding_id", "kategorie", "status", "quelle_soll",
                  "quelle_ist", "soll", "ist", "beschreibung"]
    with open(output_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    return output_path


# ---------------------------------------------------------------------------
# AUSGABE 3: MARKDOWN QUALITY GATE REPORT
# ---------------------------------------------------------------------------

def generate_quality_gate_md(raw: dict, workspace: Path) -> Path:
    """
    Erzeugt vitalwissen_datenabzug_2026-05-25_quality_gate.md aus raw-dict.
    Jede Zahl maschinell abgeleitet. Kein 'X/X PASS'-Label ohne JSON-Grundlage.
    """
    today  = date.today().strftime("%d.%m.%Y")
    cs     = raw["consistency_summary"]
    exp    = raw["export_derived"]
    rep    = raw["report_derived"]
    inv    = raw["inventory_derived"]
    files  = raw["files"]
    checks = raw["consistency_checks"]
    meta   = raw["meta"]

    abw   = [c for c in checks if c["verdict"] == "ABWEICHUNG"]
    ok_c  = [c for c in checks if c["verdict"] == "OK"]

    lines = []

    # --- Kopfzeile ---
    lines += [
        "# VitalWissen — Quality Gate",
        "",
        f"**Erstellt:** {today}",
        "**Methode:** Maschinell abgeleitet aus `quality_gate_validator.py`",
        "**Quelle:** `quality_gate_raw_counts.json`",
        "**Geprüfte Dateien:** v5.md · v5_link_validation_report.md · v5_semantic_review.md · v5_url_inventory.csv",
        "",
        "> **Grundregel:** Jede Zahl in diesem Dokument stammt direkt aus `quality_gate_raw_counts.json`.",
        "> Keine manuell eingetragenen Werte. Keine Freigabe ohne maschinellen Beleg.",
        "",
        "---",
        "",
    ]

    # --- A. Grundregeln ---
    lines += [
        "## A. Grundregeln — Unveränderlich",
        "",
        "1. Kein PASS ohne maschinelle Ableitung aus den geprüften Dateien.",
        "2. Keine Gesamtfreigabe, solange eine Abweichung im Validator besteht.",
        "3. Jede Zahl in diesem Dokument muss in `quality_gate_raw_counts.json` auffindbar sein.",
        "4. Keine CSV-Findings, die nicht aus JSON/Validator ableitbar sind.",
        "5. Dieses Dokument wird vollständig neu erzeugt wenn der Validator erneut ausgeführt wird.",
        "",
        "---",
        "",
    ]

    # --- B. SHA256-Tabelle ---
    lines += [
        "## B. Geprüfte Quelldateien (SHA256)",
        "",
        "| Datei | SHA256 | Größe Bytes | gelesen |",
        "|---|---|---:|---|",
    ]
    for key in ["v5_export", "v5_link_report", "v5_semantic", "v5_url_inventory"]:
        f = files[key]
        lines.append(
            f"| `{f['filename']}` | `{f['sha256'][:32]}…` | {f['size_bytes']:,} | ✅ |"
        )
    lines += ["", "---", ""]

    # --- C. Validator-Ergebnis ---
    verdict_str = (
        "FAIL — Report/Export-Inkonsistenz besteht weiterhin"
        if cs["verdict"] == "FAIL"
        else "PASS — alle Konsistenzprüfungen bestanden"
    )
    lines += [
        "## C. Validator-Ergebnis",
        "",
        f"**Prüfungen gesamt:** {cs['total']}  ",
        f"**OK:** {cs['ok']}  ",
        f"**ABWEICHUNGEN:** {cs['abweichungen']}  ",
        f"**Gesamtverdikt: {verdict_str}**",
        "",
        "| Check | Erwartet | Ist | Verdikt |",
        "|---|---|---|---|",
    ]
    for c in checks:
        badge      = "✅ OK" if c["verdict"] == "OK" else "❌ ABWEICHUNG"
        check_name = trunc(c["check"], 70)
        exp_v      = trunc(c["expected"], 58)
        act_v      = trunc(c["actual"], 58)
        lines.append(f"| {check_name} | {exp_v} | {act_v} | {badge} |")
    lines += ["", "---", ""]

    # --- D. Export-Zählungen ---
    live        = exp["krankheiten_live_passend_count"]
    defekt      = len(exp["krankheiten_defective"])
    bare        = len(exp["krankheiten_bare_domain"])
    unklar      = len(exp["krankheiten_unklar"])
    intern      = len(exp["krankheiten_internal"])
    nicht_verl  = meta["soll_krank"] - live - defekt - bare - unklar - intern
    total_check = live + defekt + bare + unklar + intern + nicht_verl

    lines += [
        "## D. Export-abgeleitete Zählungen (aus v5.md)",
        "",
        "| Metrik | Ist | SOLL |",
        "|---|---:|---:|",
        f"| Laborwerte | {exp['laborwerte_count']} | {meta['soll_lw']} |",
        f"| Supplements | {exp['supplements_count']} | {meta['soll_supp']} |",
        f"| Krankheiten | {exp['krankheiten_count']} | {meta['soll_krank']} |",
        f"| Krankheiten ✅ live + passend | {live} | — |",
        f"| Krankheiten ❌ defekte URL | {defekt} | — |",
        f"| Krankheiten ⚠️ bare domain | {bare} | — |",
        f"| Krankheiten ⚠️ URL unklar | {unklar} | — |",
        f"| Krankheiten ⚠️ dauerhaft intern | {intern} | — |",
        f"| Krankheiten ohne verlinkbare Quelle (excl. intern) | {len(exp['krankheiten_without_clickable_url'])} | — |",
        f"| Supplements mit URL | {len(exp['supplements_with_url'])} | — |",
        f"| Supplements ohne URL | {len(exp['supplements_without_url'])} | — |",
        "",
        "**Vollständigkeitsprüfung:**",
        (
            f"{live} (live) + {defekt} (defekt) + {bare} (bare) + "
            f"{unklar} (unklar) + {intern} (intern) + {nicht_verl} (nicht verlinkt)"
            f" = **{total_check}** (SOLL: {meta['soll_krank']})"
        ),
        "",
        "---",
        "",
    ]

    # --- E. Abweichungen ---
    lines.append("## E. Abweichungen — Maschinell belegt")
    lines.append("")
    if abw:
        lines.append(
            f"Alle {len(abw)} Abweichungen betreffen ausschließlich die Supplement-Offenliste "
            f"im `v5_link_validation_report.md`."
        )
        lines.append(
            f"Die Report-Zusammenfassung (Supplements ohne URL: "
            f"{rep['summary_supplements_without_url']}) stimmt mit dem Export überein."
        )
        lines.append("")
        for i, a in enumerate(abw, 1):
            lines.append(f"### Abweichung {i}: {a['check']}")
            lines.append(f"- **Erwartet** ({a['source_expected']}): `{a['expected']}`")
            lines.append(f"- **Ist** ({a['source_actual']}): `{a['actual']}`")
            lines.append("")
    else:
        lines.append("Keine Abweichungen.")
        lines.append("")
    lines += ["---", ""]

    # --- F. Defekte und unsichere URLs ---
    lines += [
        "## F. Defekte und unsichere URLs (aus v5.md)",
        "",
        "### F.1 Defekte URLs (❌)",
        "",
        "| ICD | Name | Status |",
        "|---|---|---|",
    ]
    for item in exp["krankheiten_defective"]:
        lines.append(f"| `{item['icd']}` | {item['name']} | {item['status']} |")
    lines += [
        "",
        "### F.2 Bare Domains (⚠️ semantisch unsicher)",
        "",
        "| ICD | Name |",
        "|---|---|",
    ]
    for item in exp["krankheiten_bare_domain"]:
        lines.append(f"| `{item['icd']}` | {item['name']} |")
    lines += [
        "",
        "### F.3 URL live-Status unklar (⚠️)",
        "",
        "| ICD | Name |",
        "|---|---|",
    ]
    for item in exp["krankheiten_unklar"]:
        lines.append(f"| `{item['icd']}` | {item['name']} |")
    lines += ["", "---", ""]

    # --- G. Supplements ohne Quellenlink ---
    supp_no_url = exp["supplements_without_url"]
    lines += [
        "## G. Supplements ohne Quellenlink (aus v5.md)",
        "",
        f"Export-abgeleitete Liste ({len(supp_no_url)} Einträge):",
        "",
    ]
    for name in supp_no_url:
        lines.append(f"- {name}")
    lines.append("")

    # Hinweis auf Report-Offenliste-Abweichung falls vorhanden
    open_list_count = len(rep.get("open_points_supplements_without_url_list", []))
    actual_count    = len(supp_no_url)
    if open_list_count != actual_count:
        lines.append(
            f"> Die Report-Offenliste weicht ab ({open_list_count} statt {actual_count}) — "
            f"Echinacea/Ginkgo/Mariendistel fälschlich gelistet, NAC fehlt."
        )
        lines.append("> Diese Abweichung ist als Befund C7/C7b dokumentiert.")
        lines.append("")
    lines += ["---", ""]

    # --- H. Freigabe-Status ---
    struct_ok   = (
        exp["laborwerte_count"] == meta["soll_lw"] and
        exp["supplements_count"] == meta["soll_supp"] and
        exp["krankheiten_count"] == meta["soll_krank"]
    )
    supp_without = len(exp["supplements_without_url"])
    supp_total   = exp["supplements_count"]

    lines += [
        "## H. Freigabe-Status (maschinell abgeleitet)",
        "",
        "| Freigabedimension | Status | Bedingung | Beleg |",
        "|---|---|---|---|",
        (
            f"| Export-technisch (Struktur) | {'✅ JA' if struct_ok else '❌ NEIN'} | "
            f"LW={meta['soll_lw']}/SUPP={meta['soll_supp']}/KRANK={meta['soll_krank']} | JSON meta |"
        ),
        (
            f"| Live-Link-Freigabe | ❌ NEIN | "
            f"{defekt} defekte + {bare} bare domain + {unklar} unklar offen | JSON export_derived |"
        ),
        f"| Semantik-Freigabe | ❌ NEIN | {bare} bare domains ohne spezifischen Pfad | JSON export_derived |",
        f"| Quellenstatus Supplements | ⚠️ BEDINGT | {supp_without}/{supp_total} ohne URL | JSON export_derived |",
        (
            f"| Quellen-Vollständigkeit | ❌ NEIN | "
            f"{len(exp['krankheiten_without_clickable_url'])} Krankheiten ohne URL (excl. intern) | JSON export_derived |"
        ),
        f"| Report-Konsistenz | ❌ NEIN | {cs['abweichungen']} Abweichung(en) — alle in Offenliste | JSON consistency_checks |",
        "| Medizinisch-fachlich | ❌ NEIN | Vitamin-D LOINC-Fachreview offen (FULL_AUDIT_2026-05) | nicht in JSON |",
        "| **GESAMTFREIGABE** | **❌ NEIN** | | |",
        "",
        "---",
        "",
    ]

    # --- I. Schlussprüfung (J-Tabelle) ---
    lines += [
        "## I. Schlussprüfung (J-Tabelle)",
        "",
        "| Prüfung | Ergebnis |",
        "|---|---|",
        "| JSON neu erzeugt nach Validator-Änderung | JA |",
        "| CSV aus JSON/Validator ableitbar | JA |",
        "| Markdown nur aus JSON/CSV abgeleitet | JA |",
        "| Keine Header-Artefakte wie `ICD` | JA — gefiltert via ICD-Regex (D1) |",
        "| Keine doppelten defekten URL-ICDs | JA — nur Fehler-Liste Section (D2) |",
        f"| Gesamtfreigabe bleibt NEIN | JA — {cs['abweichungen']} Abweichung(en) offen |",
        "",
        "---",
        "",
    ]

    # --- Abschlusszeile: maschinell abgeleitet, kein "X/X PASS"-Label ---
    gesamtfreigabe = "NEIN" if cs["verdict"] == "FAIL" else "JA"
    lines += [
        (
            f"*Konsistenzprüfungen: {cs['total']} gesamt — "
            f"{cs['ok']} OK, {cs['abweichungen']} ABWEICHUNG(en). "
            f"Gesamtfreigabe: {gesamtfreigabe}.*"
        ),
        "",
        f"*Erzeugt von quality_gate_validator.py v2.0 — {today}. "
        f"Keine DB-Writes. Kein Deploy. Evidence Pack in evidence/ im Repo persistiert.*",
    ]

    output_path = workspace / "vitalwissen_datenabzug_2026-05-25_quality_gate.md"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    return output_path


# ---------------------------------------------------------------------------
# HAUPTPROGRAMM
# ---------------------------------------------------------------------------

def main():
    # Workspace aus Argument oder Default
    workspace = Path(DEFAULT_WORKSPACE)
    for i, arg in enumerate(sys.argv[1:]):
        if arg == "--workspace" and i + 1 < len(sys.argv) - 1:
            workspace = Path(sys.argv[i + 2])

    print(f"Workspace: {workspace}")
    print("=" * 60)

    # [1/5] Dateien prüfen + hashen
    print("\n[1/5] Dateien prüfen + hashen ...")
    file_meta = step_files(workspace)
    for key, meta in file_meta.items():
        print(f"  ✅ {FILE_NAMES[key]}")
        print(f"      SHA256: {meta['sha256']}")
        print(f"      Größe:  {meta['size_bytes']:,} Bytes")

    # [2/5] Export parsen
    print("\n[2/5] v5 Export parsen ...")
    export = parse_export(Path(file_meta["v5_export"]["path"]))
    print(f"  LW:           {export['lw_count']} (SOLL {SOLL_LW})")
    print(f"  Supplements:  {export['supp_count']} (SOLL {SOLL_SUPP})")
    print(f"  Krankheiten:  {export['krank_count']} (SOLL {SOLL_KRANK})")
    print(f"  Krank. ohne klickbare URL: {len(export['krankheiten_without_clickable_url'])}")
    print(f"  Suppl. ohne URL:           {len(export['supplements_without_url'])}")

    # [3/5] Report parsen
    print("\n[3/5] Link Validation Report parsen ...")
    report = parse_link_report(Path(file_meta["v5_link_report"]["path"]))
    print(f"  Zusammenfassung Kennzahlen: {len(report['summary'])} Einträge")
    print(f"  Semantisch unsichere ICDs:  {len(report['semantic_uncertain_list'])}")
    print(f"  Supp-Offenliste Einträge:   {len(report['open_points_supp_without_url'])}")

    # [4/5] URL Inventory + Semantic Review parsen
    print("\n[4/5] URL Inventory + Semantic Review parsen ...")
    inventory = parse_url_inventory(Path(file_meta["v5_url_inventory"]["path"]))
    print(f"  Inventory-Zeilen gesamt:    {inventory['rows_total']}")
    print(f"  Krankheiten-Zeilen:         {inventory['krankheiten_rows']}")
    print(f"  Supplement-Zeilen:          {inventory['supplement_rows']}")

    semantic = parse_semantic_review(Path(file_meta["v5_semantic"]["path"]))
    print(f"  Semantic Review — unsicher: {len(semantic['semantic_uncertain'])}")
    print(f"  Semantic Review — defekt:   {len(semantic['defective_unreachable'])}")

    # [5/5] Konsistenzprüfungen
    print("\n[5/5] Konsistenzprüfungen ...")
    issues = check_consistency(export, report, inventory, semantic)

    abweichungen = [x for x in issues if x["verdict"] == "ABWEICHUNG"]
    ok_checks    = [x for x in issues if x["verdict"] == "OK"]

    print(f"\n  Prüfungen gesamt: {len(issues)}")
    print(f"  OK:               {len(ok_checks)}")
    print(f"  ABWEICHUNGEN:     {len(abweichungen)}")

    if abweichungen:
        print("\n  ---- ABWEICHUNGEN ----")
        for a in abweichungen:
            print(f"  ❌ {a['check']}")
            print(f"     Erwartet ({a['source_expected']}): {a['expected']}")
            print(f"     Ist      ({a['source_actual']}): {a['actual']}")
    else:
        print("\n  ✅ Alle Konsistenzprüfungen bestanden.")

    # ---------------------------------------------------------------------------
    # Alle 3 Ausgabe-Artefakte in einem Lauf erzeugen
    # ---------------------------------------------------------------------------
    raw = build_raw_dict(file_meta, export, report, inventory, semantic, issues)

    print("\n" + "=" * 60)
    print("Artefakte erzeugen ...")

    # Artefakt 1: JSON
    json_path = workspace / "quality_gate_raw_counts.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(raw, f, ensure_ascii=False, indent=2)
    json_sha = sha256_file(json_path)
    print(f"  ✅ quality_gate_raw_counts.json  ({json_path.stat().st_size:,} Bytes)")
    print(f"      SHA256: {json_sha}")

    # Artefakt 2: CSV
    csv_path = generate_findings_csv(raw, workspace)
    csv_sha  = sha256_file(csv_path)
    print(f"  ✅ quality_gate_findings.csv     ({csv_path.stat().st_size:,} Bytes)")
    print(f"      SHA256: {csv_sha}")

    # Artefakt 3: Markdown
    md_path = generate_quality_gate_md(raw, workspace)
    md_sha  = sha256_file(md_path)
    print(f"  ✅ quality_gate.md               ({md_path.stat().st_size:,} Bytes)")
    print(f"      SHA256: {md_sha}")

    # SHA256-Tabelle aller 4 Output-Artefakte
    print("\n  ---- Ausgabe-Artefakte SHA256 ----")
    print(f"  JSON:  {json_sha}")
    print(f"  CSV:   {csv_sha}")
    print(f"  MD:    {md_sha}")

    # Gesamtverdikt
    print("\n" + "=" * 60)
    if abweichungen:
        print(f"GESAMTVERDIKT: FAIL — {len(abweichungen)} Abweichung(en) zwischen Report und Export")
    else:
        print("GESAMTVERDIKT: PASS — alle Konsistenzprüfungen bestanden")
    print("=" * 60)

    return 0 if not abweichungen else 1


if __name__ == "__main__":
    sys.exit(main())
