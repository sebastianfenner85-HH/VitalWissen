# CODEX_NEXT_PROMPT — S1-CHECKUP-BUILDER-BASE-01

**Version:** 1.1
**Stand:** 2026-06-25
**Freigabe durch Sebastian erforderlich vor Ausführung**

---

## CODEX-PROMPT

```
Du bist Entwicklungspartner von VitalWissen — einer deutschsprachigen
Gesundheitsplattform (Vite + React → Netlify, Supabase PostgreSQL).

Deine Aufgabe: S1-CHECKUP-BUILDER-BASE-01 bauen.

---

SCHRITT 0 — REMOTE/UMGEBUNGS-CHECK (vor jedem Produktschritt)

1. Prüfe: git remote get-url origin
   a) Wenn origin FEHLT:
      - Setze einmalig: git remote add origin https://github.com/sebastianfenner85-HH/VitalWissen.git
      - Prüfe erneut: git remote get-url origin
      - Wenn immer noch kein origin -> STOPP, Befund melden
   b) Wenn origin auf ein ANDERES Repo zeigt -> STOPP, nicht überschreiben, Befund melden
   c) Wenn Working Tree UNERWARTET DIRTY ist -> STOPP, Befund melden
   Gib niemals Credential-Werte, Tokens oder PAT-Strings aus.

2. Kontext-Ordner prüfen:
   - Prüfe: ls codex_context/S1-CHECKUP-BUILDER-BASE-01/
   - Wenn Ordner fehlt -> STOPP mit BLOCKED_MISSING_CONTEXT

3. Branch erstellen (vor dem ersten Commit):
   git checkout -b feat/s1-checkup-builder-base-01

---

ARBEITSORT

Klone das Repo frisch:
  git clone https://<PAT>@github.com/sebastianfenner85-HH/VitalWissen.git /tmp/vw-checkup-build
  cd /tmp/vw-checkup-build

Dann SCHRITT 0 ausführen (oben).

---

ZIEL

Erstelle einen statisch-konfigurierten Checkup-Builder unter /laborwerte/checkup-builder.
Kein DB-Write. Kein Schema-Change. Kein queries.js-Touch.
Alle Panel/Thema-Daten kommen aus einer neuen Config-Datei.

---

NEUE DATEIEN (CREATE)

1. src/lib/checkup_builder_config.js
   - TIER-Konstanten: STANDARD, OPTIONAL, SPEZIAL, NUR_FACHPERSON
   - PANELS-Objekt:
     'kleines-blutbild': Items mit loinc, slug, name_de, tier, reasoning
     'grosses-blutbild': Kleines Blutbild + Differentialblutbild
   - THEMEN-Objekt:
     'entzuendung', 'muedigkeit-erschoepfung', 'schilddruese', 'herz-kreislauf-stoffwechsel'
   - DISCLAIMER-Konstante (Pflicht-Text, s.u.)
   - Datei-Header-Kommentar mit Sprach-No-Gos (bindend):
     VERBOTEN: "Du brauchst diesen Wert" / "Lass bestimmen" / "Diagnostiziert X"
     ERLAUBT: "Kann sinnvoll sein zu besprechen" / "Optionaler Zusatzwert" / "Nur Fachperson"

   PANEL-DATEN (alle LOINC-Codes in DB verifiziert — verwende exakt diese):

   KLEINES BLUTBILD items (tier=standard):
   789-8/erythrozyten, 718-7/haemoglobin, 4544-3/haematokrit,
   787-2/mcv, 785-6/mch, 786-4/mchc, 788-0/rdw,
   6690-2/leukozyten, 777-3/thrombozyten

   GROSSES BLUTBILD = kleines-blutbild + (tier=standard):
   751-8/neutrophile, 731-0/lymphozyten, 742-7/monozyten,
   711-2/eosinophile, 704-7/basophile, 764-1/stabkernige
   + (tier=optional): 31112-6/retikulozyten

   RETIKULOZYTEN-HINWEIS: Verwende LOINC 31112-6, slug retikulozyten.
   NICHT 17849-1 — dieser Code ist ein Altstand und in der DB nicht vorhanden.

   THEMA ENTZÜNDUNG:
   1988-5/crp (standard), 30522-7/hs-crp (optional),
   4537-7/bsg (optional), 75241-0/procalcitonin (nur_fachperson)

   THEMA MÜDIGKEIT/ERSCHÖPFUNG:
   2276-4/ferritin (standard), 2132-9/vitamin-b12-serum (standard),
   2284-8/folsaeure-serum (standard), 3016-3/tsh (standard),
   14635-7/vitamin-d-25oh (optional), 19123-9/magnesium-serum (optional),
   5762-5/zink-serum (optional), 2143-6/cortisol (nur_fachperson)

   THEMA SCHILDDRÜSE:
   3016-3/tsh (standard), 3024-7/ft4 (optional),
   3051-0/ft3 (nur_fachperson), 8099-7/anti-tpo (nur_fachperson)

   THEMA HERZ-KREISLAUF/STOFFWECHSEL:
   2089-1/ldl-cholesterin (standard), 2085-9/hdl-cholesterin (standard),
   2093-3/cholesterin-gesamt (standard), 2571-8/triglyzeride (standard),
   4548-4/hba1c (standard), 2345-7/glukose-nuechtern (standard),
   2160-0/kreatinin (standard), 62238-1/egfr (standard),
   13965-9/homocystein (optional),
   10835-7/lipoprotein-a (nur_fachperson), 33762-6/nt-probnp (nur_fachperson)

   DEDUPLIKATION: TSH (3016-3) kommt in Müdigkeit und Schilddrüse vor.
   Die Ergebnisliste zeigt jeden Wert nur EINMAL — Dedup über LOINC-Code.

2. src/pages/CheckupBuilder.jsx
   - Schritt 1: Panel-Auswahl (kleines Blutbild / großes Blutbild)
   - Schritt 2: Themen-Auswahl (Entzündung / Müdigkeit / Schilddrüse / HKS)
   - Schritt 3: Ergebnisliste (LOINC-dedupliziert, nach tier gruppiert)
     Tier-Reihenfolge: standard -> optional -> spezial -> nur_fachperson
     Je Item: name_de + Link /laborwerte/:slug + tier-badge + reasoning
   - Disclaimer prominent (3 Pflicht-Sätze, s.u.)
   - Kein "du brauchst", kein "bestimmen lassen", kein Diagnose-Framing
   - Mobile-first, alle Tap-Targets >= 40px
   - CSS-Prefix: cb-*

3. src/pages/CheckupBuilder.css
   - Prefix: cb-* (ausschließlich)
   - Kein Touch an lw-*, supp-*, krank-* o.ä.
   - Mobile-first (@media max-width: 640px)
   - Tier-Badge-Farben:
     standard: var(--primary) / grün
     optional: var(--text-light) / neutral
     nur_fachperson: indigo / #4F46E5

4. docs/review_handoffs/S1_CHECKUP_BUILDER_BASE_01/CHATGPT_HANDOFF.md
   - Handoff-Bericht für ChatGPT-Review nach dem Build
   - Inhalt: Paket-ID, Was gebaut, AC-Ergebnisse (A1-A18), Dateien geändert,
     DB-Write: NEIN, Side Effects, PR-Link

---

ZU ÄNDERNDE DATEIEN (MODIFY)

5. src/App.jsx
   - Import CheckupBuilder hinzufügen
   - Route einfügen VOR /laborwerte/:code:
     <Route path="/laborwerte/checkup-builder" element={<CheckupBuilder />} />
     <Route path="/laborwerte/:code" element={<LaborwertDetail />} />
   - Sonst NICHTS ändern

6. src/pages/LaborwerteListe.jsx
   - Im Header-Bereich (nach dem h1, ca. Zeile 131):
     Einen Link/Button ergänzen: "Checkup vorbereiten →" -> /laborwerte/checkup-builder
   - Klasse: lw-checkup-link (in Laborwerte.css ergänzen — 3-5 Zeilen CSS)
   - SONST NICHTS ändern — keine Logik-Änderung

---

TABU (nicht anfassen)

- src/lib/queries.js
- src/lib/laborwert_k3_map.js
- src/lib/laborwert_b4_actions_map.js
- src/pages/LaborwertDetail.jsx
- src/pages/KrankheitDetail.jsx
- src/components/Nav.jsx
- src/styles/global.css
- Alle S2/S5/S6/S18/S4-Seiten
- DB / Supabase — kein Schema-Change, kein DB-Write

---

PFLICHT-DISCLAIMER (3 Sätze, exakt diese Aussagen in UI):

1. "Dies ist keine medizinische Empfehlung und kein Diagnose-Instrument."
2. "Welche Laborwerte im Einzelfall sinnvoll sind, entscheidet ausschließlich eine Fachperson."
3. "Die Ergebnisliste dient der Vorbereitung eines Gesprächs — nicht der Selbstdiagnose."

---

AKZEPTANZKRITERIEN (alle A1-A18 müssen PASS sein, vor Commit prüfen):

Siehe ACCEPTANCE_CRITERIA.md in diesem Ordner (codex_context/S1-CHECKUP-BUILDER-BASE-01/).

---

ABSCHLUSS (Branch/PR/Go-Workflow — kein direkter Push auf main)

1. Alle AC-1 bis AC-18 als PASS oder FAIL dokumentieren
2. git add -A
3. git commit -m "feat(S1): add checkup builder base (static config, /laborwerte/checkup-builder)"
4. git push origin feat/s1-checkup-builder-base-01
5. Draft PR gegen main erstellen (nicht mergen)
6. PR-Titel: "feat(S1): checkup builder base"
7. PR-Body: AC-Ergebnisse A1-A18, Dateien geändert, DB-Write NEIN
8. PR-Link an Sebastian/ChatGPT zur Review melden

KEIN direkter Push auf main.
KEIN Merge ohne explizites Sebastian/ChatGPT-Go.

Closure-Bericht:
- Alle AC-1 bis AC-18 explizit als PASS oder FAIL
- Dateien geändert: exakte Liste
- DB-Write: NEIN
- PR-Link
- Deploy: Netlify Auto-Deploy erst nach Merge (kein manueller Deploy)
```

---

## HINWEISE (Kontext, nicht Teil des Prompts)

1. **Retikulozyten-LOINC:** `31112-6` (verifiziert in Live-DB) — nicht `17849-1` (Altstand).

2. **Remote-Umgebung:** Codex muss origin selbst prüfen und ggf. setzen (SCHRITT 0).
   PAT kommt aus Sebastians Codex-Secrets — niemals im Prompt ausschreiben.

3. **Healthcheck:** `scripts/healthcheck-vitalwissen.mjs` (Node.js) — FAIL bei fehlenden
   ENV-Vars ist in Codex-Umgebung ohne Supabase-Verbindung erwartetes Verhalten.

4. **Kontext-Ordner:** `codex_context/S1-CHECKUP-BUILDER-BASE-01/` muss im Repo vorhanden
   sein, bevor Codex startet — sonst BLOCKED_MISSING_CONTEXT.

5. **TSH-Deduplikation:** TSH (3016-3) erscheint in Müdigkeit und Schilddrüse.
   LOINC-basierte Dedup sicherstellen — TSH darf in der Ergebnisliste nur einmal erscheinen.

---

*Version 1.1 | 2026-06-25 | Freigabe durch Sebastian erforderlich*
