# BRAND_UX_REFRESH_SPEC — VitalWissen

**Paketname:** Brand / UX Refresh Spec
**Typ:** Read-only Spec-Paket — bindende Richtungsentscheidungen
**Datum:** 24.04.2026
**Status:** ✅ Spec abgeschlossen — kein Build, kein DB-Write, kein Commit, kein Deploy
**Kein Build. Kein DB-Write. Kein Commit. Kein Push. Kein Deploy.**

---

## GRUNDLAGE DIESES DOKUMENTS

Direkt verifiziert (Code-Audit + Kanon-Lektüre):

| Quelle | Gelesen / Verifiziert |
|--------|----------------------|
| `global.css` | ✅ vollständig |
| `Home.css` | ✅ vollständig |
| `Nav.css` | ✅ vollständig |
| `Footer.css` | ✅ vollständig |
| `Krankheiten.css` | ✅ vollständig (534 Zeilen) |
| `Laborwerte.css` | ✅ erste 150 Zeilen (Detail-Pattern) |
| `Supplements.css` | ✅ erste 100 Zeilen |
| Chip-Farben (S6-03, S18-03/04, Q2-02a, S8-01) | nicht direkt verifiziert (Repo-Clone ist pre-S6) — aus Closure-Dokumenten rekonstruiert |
| `AUDIT_CANON_CURRENT.md` | ✅ vollständig |
| `ACTIVE_STRANDS_CURRENT.md` | ✅ vollständig |
| `VW_04_ENTSCHEIDUNGEN.md` | ✅ vollständig |
| `VW_06_WEBSITE.md` | ✅ vollständig |
| `P7D_ARCHITECTURE_RESET_FREEZE.md` | ✅ erste 80 Zeilen (Produktkern + Externsicht) |

Kein separates Brand/UX-Audit-Dokument vorhanden — dieser Spec baut direkt auf dem Code-Audit auf.

---

## TEIL A — ENTSCHEIDUNGSRELEVANTE VERDICHTUNG DES AUDITS

Nur die Punkte, die echte Refresh-Entscheidungen verlangen. Kein vollständiger Audit-Bericht.

| Bereich | Befund (Beobachtung) | Warum entscheidungsrelevant |
|---------|---------------------|----------------------------|
| **Hero / Einstieg** | Linear-Gradient grün (#f0faf5→#fafaf8→#fffdf5) + Eyebrow-Pill-Badge (uppercase, `var(--primary-100)`) + große Instrument-Serif-Headline (`clamp(28–48px)`) + Subline 18px + Suche + Quick-Links. Klassisches Content-Marketing-Hero-Pattern, nicht Werkzeug-Einstieg. Die Suche ist vorhanden, aber die Rahmung ist editorial. | B1: Statement vs. Tool-Einstieg |
| **Typografie — Serif-Scope** | `global.css` setzt `font-family: 'Instrument Serif'` pauschal auf **alle** `h1, h2, h3`. Das bedeutet: Blockheader auf Detailseiten (z.B. `.krank-section-title`), Karten-Überschriften, Seiten-Titel, Pillar-Card-Titel — alles Serif. Gleichzeitig: Blockheader als `11px uppercase text-muted` (DM Sans) — Widerspruch zur globalen Serif-Regel: dort übernimmt das Element keinen Serif weil die font-family lokal überschrieben wird. Das ergibt zwei inkonsistente Systeme nebeneinander. | B2: Serif-Grenze definieren |
| **Typografie — Nav** | `.nav-tagline` = Instrument Serif, kursiv. Logo-Mark = Instrument Serif. Die Tagline im Nav läuft durch die gesamte App. Kursiv-Serif in der Navigation ist ein starkes redaktionelles Signal. | B2: Serif-Reduktion in Interface-Elementen |
| **Farbsystem — Akkumulation** | `global.css` definiert Primary (grün) + Accent (amber). Darauf aufgesetzt wurden seither: Q2-Quellenbox (5 Farben: indigo, blau, slate, amber, teal), Crosslink-Chips S5 (grün), S6 (indigo), S18-Nährstoffe (amber), S18-Muster (teal), S18-Lebensmittel (orange), B4 (grün/indigo). **Amber erscheint als:** Accent-Farbe, Q2-Research-Typ-Chip, S18-Nährstoff-Chip, Supplement-Kat-Tag. Gleichzeitig 8+ aktive Farbsemantiken auf einer Seite möglich. | B3: Farbsystem-Obergrenze |
| **Chip-System — visuelle Überlast** | Eine S5-Detailseite kann gleichzeitig zeigen: grüne S1-Chips (Laborwerte), grüne S2-Chips (Supplements), indigo S6-Chips (Medikamente), amber/teal/orange S18-Chips (Nährstoffe/Muster/Lebensmittel), grün/indigo B4-Optionen, 5-Farben QuellenBox. Das ist keine Semantik mehr, das ist Farbrauschen. Nutzer können Chip-Farben nicht systemisch lesen. | B4: Chip-Reduktion |
| **Detailseiten — Blockhierarchie** | Alle Blöcke haben gleiche Gewichtung: weißes Karten-Element, `1px solid var(--border)`, `border-radius: 14px`, `padding: 24px`. Kein visueller Unterschied zwischen primären Informationsblöcken (Was ist das, Symptome) und sekundären/Meta-Blöcken (Quellen, Crosslinks, Nächste Schritte). Die Sektions-Titel sind `11px uppercase text-muted` — so subtil, dass sie beim Scannen übersehen werden können. | B5: Primär-/Sekundär-Trennung |
| **Seiten-Header-Gradienten** | Home: grün-Gradient, S1: grün-Gradient, S2: amber-Gradient (`#fffdf0`), S5: weißer Header (kein Gradient). Drei verschiedene Muster ohne System. Jede Säule macht es anders. | B3/B5: Header-Konsistenz |
| **Karten-Hover** | Alle Karten: `transform: translateY(-2px)` + `box-shadow`. Konsistent umgesetzt — das kann bleiben. | Kein Handlungsbedarf |
| **Mobile** | Grundstruktur funktioniert. krank-search-box mit `min-width: 320px` problematisch auf kleinen Screens. Newer tap-targets wurden als Einzel-Fixes gemacht (Q6-Audits), kein systemisches Tap-Target-Mindestmaß. | B5: Mobile-Regeln |

---

## TEIL B — BINDENDE KERNENTSCHEIDUNGEN

### B1 — Einstiegslogik / Hero

**Entscheidung: Die Hero-Logik wird in Richtung Werkzeug-Einstieg verschoben. Kein vollständiger Umbau, aber klare Reduktion des redaktionellen Rahmens.**

Konkret:
- **Eyebrow-Badge entfällt** vollständig. Das ist ein rein editorial-dekoratives Element ohne Informationswert.
- **Die Headline bleibt**, wird aber funktionaler formuliert und verkleinert. Kein `clamp(28–48px)` mehr. Zielgröße: `clamp(24–36px)`. Die Headline beschreibt das Werkzeug, feiert es nicht.
- **Der grüne Gradient bleibt** — er ist subtle genug, um nicht wellness-haft zu wirken, und schafft eine warme Trennung vom weißen Content-Bereich. Aber der Gradient wird künftig auf `#f5f9f7 → var(--bg)` reduziert (weniger grün-saturiert).
- **Die Suche bleibt** und wird visuell weiter in den Fokus gerückt: etwas mehr Abstand nach oben, Subline minimal — die Suche ist der Aufruf, nicht die Überschrift.
- **Quick-Links bleiben** — sie sind nützlich und signalisieren sofortige Nutzbarkeit.
- **Pillar-Cards bleiben** — nützlich. Ihre Überschriften wechseln von Instrument Serif zu DM Sans (s. B2).
- **Subline**: bleibt, aber kürzer. Max. eine Zeile auf Desktop.
- **Der Nav-Tagline** (Instrument Serif, kursiv, "Es gibt einen Moment…") **entfällt** aus der Navigation. Sie ist für Detailseiten ein Störfaktor. Wenn sie genutzt wird, dann nur auf der Startseite selbst als visuell understatete Zeile — nicht persistent über die gesamte App.

**Nicht geändert:** Grundstruktur Hero → Suche → Karten. Das ist funktional richtig.

---

### B2 — Typografie-System

**Entscheidung: Instrument Serif wird aus der globalen h1/h2/h3-Regel herausgelöst und auf drei spezifische Einsatzkontexte begrenzt.**

Erlaubte Einsatzkontexte für Instrument Serif:
1. **Homepage-Hauptüberschrift** (`.home-headline`) — eine Nutzung, groß, prominent
2. **Krankheits-/Laborwert-/Wirkstoff-Detailseiten-Titel** (die primäre `<h1>`-Ebene jeder Detailseite) — eine Nutzung pro Seite, ausschließlich als Seitentitel
3. **Logo-Mark** (der Buchstabe im Nav-Logo-Kasten) — bleibt

Verboten für Instrument Serif:
- Alle `h2`, `h3` auf Detailseiten
- Block-/Sektions-Überschriften
- Karten-Überschriften (Pillar-Cards, LW-Karten, Supplement-Karten)
- Seiten-Header auf Übersichtsseiten (S1, S2, S5, S6, S18 Listenseiten)
- Nav-Tagline
- Footer
- Alle Interface-Labels, Filter-Buttons, Tabs

**DM Sans übernimmt:**
- Alle `h2`, `h3` auf Detailseiten
- Alle Seiten-Titel auf Übersichtsseiten (bisher Instrument Serif über globale Regel)
- Karten-Titel: DM Sans, 600–700
- Block-/Sektions-Header: DM Sans, 13–14px, 600, nicht uppercase, nicht text-muted — lesbar aber nicht dominant
- Nav-Links: bleiben DM Sans (bereits korrekt)

**Italic-Einsatz:**
- Instrument Serif kursiv: ausschließlich für medizinische Lateinnamen (Synonyme, wissenschaftliche Namen auf Detailseiten). Nicht für UI-Elemente.
- DM Sans kursiv: erlaubt für Hinweise, Caveats, Disclaimers.

**Helvetica-Frage:**
- Entscheidung: kein Helvetica. DM Sans erfüllt den gleichen Zweck, ist im System, und hat keine Lizenz-/Rendering-Problematik. Helvetica wird nicht eingeführt.

**Größen-System (bindend):**
| Rolle | Font | Größe | Gewicht |
|-------|------|-------|---------|
| Detailseiten-H1 | Instrument Serif | clamp(28–40px) | 400 |
| H1 Übersichtsseiten | DM Sans | 28–32px | 600 |
| H2 Sektion (Block-Titel sichtbar) | DM Sans | 16–17px | 600 |
| Block-/Sektions-Label (Meta) | DM Sans | 12–13px | 600 |
| Body | DM Sans | 15–16px | 400 |
| Meta / Muted | DM Sans | 12–13px | 400 |
| Code / ICD-Label | DM Mono (system-fallback) | 11–12px | 400 |

---

### B3 — Farbsystem

**Entscheidung: Strikte Rollentrennung in 4 Ebenen. Kein weiteres Hinzufügen von semantischen Farben in Phase B.**

**Ebene 1 — Primärfarbe (Struktur und Navigation)**
- `--primary: #0B6E4F` — aktiver Zustand, Links, primäre Buttons, aktive Filter, Logo
- `--primary-100` / `--primary-50` — dezente Hintergründe für aktive Elemente
- Bleibt unverändert. Das Grün ist richtig: nicht wellness-hellgrün, nicht klinisches Blaugrün.

**Ebene 2 — Akzentfarbe (Kategorie-Signalfarbe für S2)**
- `--accent: #E8A838` — ausschließlich: Supplement-Kategorisierung (Kat-Tag, Hover auf S2-Karten), Evidenz-Ampel (Amber = mittel)
- Amber ist NICHT mehr zu verwenden für: Crosslink-Chips, Q2-Quellentypen, Hero-Eyebrow, sonstige Highlights
- Begründung: Amber verliert Bedeutung wenn es 4 verschiedene Zwecke gleichzeitig erfüllt

**Ebene 3 — Signalfarben (ausschließlich funktional)**
- `--red`: Notfall-Flag, kritische Hinweise, Überdosierungs-Warnungen. Nie dekorativ.
- `--yellow`: Vorsichts-Hinweise, Amber-Evidenzampel. Nie dekorativ.
- `--green`: Gute Evidenz (Ampel). Nie als Statusfarbe für "fertig" oder "aktiv".
- Keine neuen Signalfarben hinzufügen.

**Ebene 4 — Q2 Quellentyp-Farben (isolierter Kontext)**
- guideline=indigo, regulatory=blau, database=slate, research=violett-grau, patient_info=teal
- **Ausschließlich** innerhalb der QuellenBox-Komponente zulässig
- Niemals außerhalb QuellenBox als eigenständige Chip-Farben
- Research-Farbe: wird von Amber auf Violett-Grau (`#7C6FC4` / helles Lila) umgestellt, um den Amber-Konflikt mit Ebene 2 aufzulösen. (Dieser DB-Change ist Teil des Migrations-Plans.)
- Hinweis: Diese Umstellung ist **nicht direkt verifiziert** ob research-amber bereits live fest im JSONB steht — vor dem Build prüfen.

**Maximale Farbsimultaneität:**
- Auf einer einzelnen Seite maximal 4 gleichzeitig sichtbare Farbsemantiken (Primary, ggf. Accent, ggf. Signal-Farbe, ggf. Q2 isoliert)
- Ein Block = eine dominante Farbe. Chip-Blöcke mit 5 verschiedenen Hintergrundfarben sind nicht zulässig.

**Was nicht mehr zulässig ist:**
- Neue Farben pro Säule einführen ("S18 bekommt jetzt Orange")
- Amber für Crosslink-Chips außerhalb S2
- Indigo für Crosslink-Chips außerhalb Q2-QuellenBox oder einem definierten Einzel-Pattern
- Farbcodierung als einziges Unterscheidungsmerkmal (farbenblind-sicher: Label + Farbe)

---

### B4 — Crosslink-/Chip-/Badge-System

**Entscheidung: Crosslink-Chips werden auf ein einheitliches, farbneutrales System reduziert. Farbe kommt aus dem Label, nicht aus der Hintergrundfläche.**

**Bindend: 3 visuelle Typen, nicht mehr.**

**Typ 1 — Content-Crosslink-Chip** (S1, S2, S6, S18-Kapseln, etc.)
- Darstellung: neutrales `var(--surface-2)` als Hintergrund, `var(--border-dark)` als Border, `var(--text)` als Textfarbe
- Kein farbiger Hintergrund mehr pro Säule (kein Grün für S1, kein Indigo für S6, kein Orange für Lebensmittel)
- Differenzierung statt Farbe: kurzes Typ-Label als Prefix (z. B. „Laborwert", „Wirkstoff", „Nährstoff") in `text-muted`, dann der Name — oder ein Icon
- On-hover: leichter Primary-Border-Tint
- Begründung: der Nutzer liest den Namen des verlinkten Eintrags — nicht die Chip-Farbe. Die Farbe schafft Rauschen ohne Informationszugewinn.

**Typ 2 — Signal-Chip/Badge**
- Darstellung: Rot (Notfall), Gelb (Vorsicht), Grün (Bestätigung)
- Diese Farben bleiben exklusiv für Signal-Kontext
- Signal-Chips dürfen nicht mit Crosslink-Chips vermischt sein

**Typ 3 — Quellentyp-Chip (Q2)**
- Ausschließlich innerhalb QuellenBox: 5 Quellentypen mit definierten Farben
- Niemals als eigenständige Crosslink-Chips außerhalb QuellenBox

**Was entfällt:**
- Separater Hintergrundton pro Säule auf Crosslink-Chips
- Gleichzeitiges Auftreten von mehr als 2 Chip-Typen in einem einzigen Block

**Übergangslösung (Migration):**
- In einem Schritt können alle Crosslink-Chips auf Typ 1 umgestellt werden (rein CSS — kein DB-Write)
- Bestehende Farbdefinitionen bleiben bis zur Umstellung im Code, werden aber als "deprecated" markiert

**B4-Option-Cards (S8):**
- Bleiben vorerst mit ihrer aktuellen Farbtrennung (grün = Selbstmanagement, indigo = Arzt). Diese haben semantischen Gehalt (Handlungssphäre). Wird in der Migrations-Priorisierung als letztes angepasst.

---

### B5 — Detailseiten-Hierarchie / Scanbarkeit

**Entscheidung: Primäre und sekundäre Inhaltsblöcke werden visuell unterschieden. Das Leitprinzip "Oben schnell verständlich, unten sichtbar belastbar" wird in die Seitenstruktur übersetzt.**

**Primär-Block** (Was ist das, Symptome, Diagnose, Behandlung, Prognose — Kerninhalt):
- Aktuelles Karten-Pattern bleibt: weißer Hintergrund, Border, Radius
- **Änderung Block-Titel:** DM Sans 14px, 600, Farbe `var(--text)` (nicht `text-muted`), KEIN uppercase, KEIN letter-spacing 0.08em
- Begründung: Blockheader sollen gelesen werden, nicht dekorieren

**Sekundär-Block** (Crosslinks, Quellen, Nächste Schritte, Meta-Info):
- Kein weißes Karten-Element mehr
- Darstellung: kein Border-Kasten, stattdessen leichter Hintergrund `var(--surface-2)` oder separiert durch dünnere horizontale Linie + mehr Whitespace
- Oder: Karten-Element aber mit `var(--surface-2)` statt weißem Hintergrund → visuell zurückgestuft
- Blockheader: DM Sans 12px, 500, `var(--text-light)`

**Konkrete Umsetzung auf S5-Detailseite:**
- Blöcke [1]–[6] (Was ist das bis Prognose): Primär-Pattern
- Blöcke [7]–[16] (Leben mit, Weiterführend, Crosslinks, Quellen, Nächste Schritte): Sekundär-Pattern
- Der Übergang wird durch einen leichten visuellen Separator markiert (Linie + optionaler Label wie „Weiterführend" in kleiner, gedimmter Schrift)

**Mobile-Regeln (bindend):**
- Minimale Tap-Target-Größe: 44px (nicht 40px — iOS HIG-Standard)
- Gilt für: alle interaktiven Filter-Chips, Buttons, Back-Links, Accordion-Trigger
- Chip-Abstände auf Mobile: min. 8px zwischen Touch-Targets
- Kein `min-width` auf Suchfeldern ohne `width: 100%` auf Mobile

**Seiten-Header-Standardisierung:**
- Alle Übersichtsseiten (S1, S2, S5, S6, S18 etc.): einheitliches Header-Pattern
- `var(--bg)` als Hintergrund (kein Gradient) + `border-bottom: 1px solid var(--border)`
- Gradient wird auf den Home-Hero begrenzt — dort bleibt er, überall sonst entfällt er
- Begründung: jede Säule hat aktuell ihren eigenen Gradient (grün, amber, keiner) — das sieht nach Baustelle aus, nicht nach System

---

## TEIL C — VOLLSTÄNDIGE REFRESH-SPEC

---

### C1 — Zweck des Refreshs

VitalWissen hat in Phase B (S1–S18, Q2, S8) funktional stark zugelegt — 6 aktive Säulen, bidirektionale Crosslinks, Vertrauensseite, Zielwert-Blöcke. Das CSS-System ist dabei inkrementell gewachsen: jeder Build hat seine eigenen Farbwerte, Chip-Klassen und Schrift-Entscheidungen mitgebracht. Das Ergebnis ist kein inkohärentes System, aber ein überladenes — besonders auf Detailseiten.

Gleichzeitig sendet die aktuelle Einstiegslogik (große Serif-Headline, grüner Gradient, Eyebrow-Badge) das Signal „Magazin-Portal" statt „Werkzeug". Das widerspricht dem festgelegten Zielbild.

Der Refresh hat zwei Aufgaben:
1. Das Typografie- und Farbsystem auf ein tragfähiges Fundament reduzieren, das für Phase C (S3, S9, S12+) nicht weiter akkumuliert.
2. Die Startseiten-Anmutung weg vom Editorial-Portal, hin zum Tool-Einstieg verschieben — ohne das, was bereits gut funktioniert, anzufassen.

---

### C2 — Zielbild

VitalWissen sieht aus wie ein **Werkzeug, dem man vertraut** — nicht wie ein Magazin, nicht wie eine Klinik, nicht wie generisches SaaS.

- Ruhige Typografie-Hierarchie: Serif nur als bewusster Akzent auf Detailseiten-Titeln
- Grün als strukturelle Farbe, nicht als Wellness-Signal
- Chips und Badges ohne Farbrauschen: Inhalt zählt, nicht Buntheit
- Detailseiten: Kern oben scanbar, Tiefe unten transparent sichtbar
- Mobile: systemische Tap-Targets, kein Einzelfall-Patching

---

### C3 — Was erhalten bleibt

| Element | Begründung |
|---------|------------|
| `--primary: #0B6E4F` (Grün) | Distinktiv, nicht wellness, nicht klinisch. Funktioniert. |
| `--accent: #E8A838` (Amber) | Klar lesbar auf hellem Grund. Bleibt für S2-Kontext. |
| `--bg: #FAFAF8` (warmes Off-White) | Richtig. Nicht klinisch-weiß, nicht papier-gelb. |
| DM Sans als Body- und Interface-Schrift | Richtig. Gut lesbar, neutral, nicht SaaS-generisch. |
| Instrument Serif auf Detailseiten-H1 | Wertvoll als einziger Serif-Anker — erzeugt Würde ohne editorial zu werden. Bleibt begrenzt. |
| Q2 Quellentyp-Farben (5 Farben) | Inhaltlich richtig. Bleibt innerhalb QuellenBox. |
| Karten-Hover (`translateY(-2px)` + shadow) | Konsistentes, dezentes Interaction-Signal. Bleibt. |
| `--radius: 12px`, `--shadow`-System | Angemessen. Nicht gerundet-kindlich, nicht eckig-kalt. |
| Nav: transparent/blur-Hintergrund | Gut. Bleibt. |
| Suche als primäres Einstiegselement | Richtig und produktlogisch. Bleibt. |
| Quick-Links auf Startseite | Nützlich. Bleibt. |
| Notfall-Flag als rotes, prominentes Element | E27 — sicher festgelegt. Bleibt. |
| Pillar-Cards (Struktur) | Nützlich. Schrift wechselt, Struktur bleibt. |

---

### C4 — Was geändert wird

#### Einstieg / Hero
- Eyebrow-Badge entfernen
- Headline verkleinern (clamp 24–36px statt 28–48px), DM Sans für Sublines
- Instrument Serif auf `home-headline` begrenzen (bleibt dort)
- Hero-Gradient abmildern: `#f5f9f7 → var(--bg)` statt `#f0faf5 → #fafaf8 → #fffdf5`
- Nav-Tagline entfernen (persistent italic serif im Interface ist ein editorial-Signal)
- Hero-Padding reduzieren: `80px 24px 64px` → `56px 24px 48px`

#### Typografie
- `global.css`: `h1, h2, h3` nicht mehr pauschal Instrument Serif
- Statt: nur explizit benannte Klassen erhalten Instrument Serif (`.home-headline`, `.krank-detail-title`, `.lw-detail-title`, entsprechende Detailseiten-H1-Klassen)
- Alle Seiten-Titel auf Übersichtsseiten: DM Sans 28–32px, 600
- Block-/Sektions-Titel: DM Sans 14px, 600, `var(--text)`, kein uppercase, kein letter-spacing 0.08em
- Meta-Labels (wie aktuelle `.krank-section-title`): DM Sans 12px, 500, `var(--text-light)`, Pfeil/Icon als Gliederungshilfe statt only Farbe

#### Farbsystem
- Amber aus Crosslink-Chips entfernen (S18-Nährstoff-Chips → Typ 1 neutral)
- Q2-Research-Farbe von Amber auf Violett-Grau umstellen (Klassen-Update in Vertrauen.css + KrankheitDetail.jsx)
- Alle Seiten-Header-Gradienten außer Home: entfernen, `var(--bg)` als Hintergrund
- `--primary: #0B6E4F` bleibt exakt

#### Chips / Badges / Crosslinks
- Alle Content-Crosslink-Chips auf Typ 1 (neutral): `var(--surface-2)` bg, `var(--border-dark)` border, `var(--text)` text, Typ-Label als Prefix
- Ausnahmen die bleiben: Signal-Chips (rot/gelb/grün), Q2-Quellenbox-Chips (isoliert)
- B4-Option-Cards: zunächst unverändert (semantisch begründet, niedrige Prio)

#### Detailseiten
- Primärblöcke: Block-Titel auf DM Sans 14px, 600, `var(--text)` — kein uppercase
- Sekundärblöcke (Crosslinks, Quellen, Nächste Schritte): `var(--surface-2)` Hintergrund statt weiß
- Visueller Separator zwischen Primär- und Sekundärbereich

#### Mobile
- Systemisches Tap-Target-Minimum: 44px für alle interaktiven Elemente
- `min-width`-Werte auf Suchfeldern: mit `max-width: 100%` kombinieren

---

### C5 — Typografie-Regelwerk

#### Serif-Einsatzgrenzen
**Erlaubt (Instrument Serif):**
- `.home-headline` — Startseite, eine Nutzung
- Detailseiten-H1: Krankheit, Laborwert, Supplement, Wirkstoff, Nährstoff, Lebensmittel, Ernährungsmuster, Zusatzstoff — jeweils eine H1 pro Seite
- Logo-Mark im Nav

**Verboten (Instrument Serif):**
- Alle `h2`, `h3`, `h4` in Interface-Kontexten
- Block-/Sektions-Header
- Karten-Überschriften
- Listenseiten-Titel (S1, S2, S5, S6, S18 Übersichtsseiten)
- Navigation (Links, Labels, Tagline)
- Buttons, Filter, Tabs, Badges
- Footer

**Kursiv:**
- Instrument Serif kursiv: medizinische Synonyme / lateinische Eigennamen auf Detailseiten
- DM Sans kursiv: Caveats, Disclaimer-Einleitungssätze
- Keine dekorativen kursiv-Elemente in der Navigation

#### Sans-Hauptlogik
- DM Sans ist die einzige Interface-Schrift für alle nicht-H1-Elemente
- Gewichts-Hierarchie: 400 (Body/Meta), 500 (Labels, Sekundäres), 600 (Headings Interface, Blockheader, CTAs), 700 (Primäre Karten-Titel wenn nötig)
- Kein font-weight 300 außer optionalem dekorativem Subline-Einsatz

#### Header- / Blockstruktur
| Kontext | Schrift | Größe | Gewicht | Farbe |
|---------|---------|-------|---------|-------|
| H1 Detailseite | Instrument Serif | clamp(28–40px) | 400 | `var(--text)` |
| H1 Listenseite | DM Sans | 28–32px | 600 | `var(--text)` |
| Home-Headline | Instrument Serif | clamp(24–36px) | 400 | `var(--text)` |
| Block-Primärtitel | DM Sans | 14–15px | 600 | `var(--text)` |
| Block-Sekundärtitel | DM Sans | 12–13px | 500 | `var(--text-light)` |
| Body | DM Sans | 15–16px | 400 | `var(--text)` / `var(--text-light)` |
| Chip-Label | DM Sans | 12–13px | 500 | kontextabhängig |
| ICD / Code | DM Mono | 11–12px | 400 | `var(--text-muted)` |

---

### C6 — Farbsystem-Regelwerk

#### Primärfarbe (Ebene 1)
- `#0B6E4F` — aktive Zustände, primäre Links, aktiver Nav-Link, Logo, primäre Buttons
- `var(--primary-100)` / `var(--primary-50)` — Hintergründe aktiver Elemente, kein eigenständiges Designelement

#### Akzentfarbe (Ebene 2)
- `#E8A838` — ausschließlich: S2-Kategorie-Tags, S2-Karten-Hover, Evidenz-Ampel (Mittel)
- Nicht für: Crosslink-Chips, Hero-Eyebrow, Q2-Quellentypen, Navigation, generische Badges

#### Signalfarben (Ebene 3)
- Rot `#DC2626`: Notfall-Flag, kritische Hinweise, Fehler
- Gelb `#D97706`: Vorsichtshinweis, moderate Risiken
- Grün `#059669`: bestätigte Evidenz (Ampel), nicht für "aktiv" oder UI-Zustände
- Ausschließlich für funktionale Signale. Nie dekorativ.

#### Q2-Quellentypen (Ebene 4 — isoliert)
| Typ | Farbe | Hex (Referenz) |
|-----|-------|----------------|
| guideline | Indigo | #4F46E5 |
| regulatory | Blau | #2563EB |
| database | Slate | #475569 |
| research | Violett-Grau (NEU — ersetzt Amber) | #7C6FC4 |
| patient_info | Teal | #0D9488 |

**Nur innerhalb QuellenBox-Komponente. Nie außerhalb.**

#### Semantische Farbobergrenze
- Maximal 4 aktive Farbsemantiken gleichzeitig auf einer Seite
- Ein Block = eine dominante Farbe
- Neue Farben pro Säule werden nicht mehr eingeführt

#### Was nicht mehr benutzt werden darf
- Amber als Crosslink-Chip-Hintergrund außerhalb S2-Kat-Tags
- Indigo als Crosslink-Chip außerhalb Q2-QuellenBox
- Grün als Crosslink-Chip (das Primary-Grün ist für Struktur, nicht Semantik-Tagging)
- Orange als Säulen-Markierungsfarbe (S18-Lebensmittel-Chips → Typ 1 neutral)
- Neue Sektionsfarben (`--primary-100` als Seitenheader-Gradient außer Home)

---

### C7 — Crosslink-/Badge-System-Regelwerk

#### Typen-Hierarchie

**Typ 1 — Content-Crosslink (einheitlich)**
- Hintergrund: `var(--surface-2)` (#F5F5F2)
- Border: `var(--border-dark)` (#D0D0C8)
- Text: `var(--text)` oder `var(--text-light)`
- Prefix-Label: Typ-Kürzel in `var(--text-muted)`, 11px — dann Name in 13px, 500
- Hover: border-color → `var(--primary)`, background leicht aufhellen
- Gilt für: alle Säulen-Crosslinks (S1, S2, S6, S18-Nährstoffe, S18-Lebensmittel, S18-Muster, S18-Zusatzstoffe)

**Typ 2 — Signal-Badge**
- Rot: Notfall, kritisch
- Gelb: Vorsicht
- Grün: Evidenz-Bestätigung
- Nie für Navigation oder Kategorie-Tagging

**Typ 3 — Quellentyp-Chip (Q2)**
- Nur in QuellenBox — 5 Farben erlaubt
- Chip-Format: Typ-Farbe als linker Border oder kleines farbiges Dot, weißer Hintergrund — kein farbiger Vollhintergrund (reduziert visuelle Last)

#### Differenzierungsmittel (statt Farbe)
- Prefix-Label: „Laborwert ·", „Wirkstoff ·", „Nährstoff ·"
- Optional: Icon (Prefix-Glyph, monochrom)
- Position im Block (Laborwerte oben, Quellen unten)
- Kein Farbbeweis notwendig wenn Label vorhanden

#### Maximale visuelle Gleichzeitigkeit
- Pro Seite: maximal 3 verschiedene Chip-Typen sichtbar gleichzeitig
- Pro Block: ausschließlich ein Chip-Typ
- B4-Option-Cards: eigener Kontext (Handlungssphäre), vorerst wie jetzt

---

### C8 — Detailseiten-UX-Regelwerk

#### Primärinformation vs. Tiefeninformation
- Primär (Blöcke 1–ca. 6): Was ist das, Symptome, Diagnostik, Behandlung, Prognose, Leben damit
  - Weißer Kartencontainer, 1px border, `var(--radius)`, 24px padding
  - Block-Titel: DM Sans 14px, 600, `var(--text)`
  - Keine Chips in Primärblöcken (Ausnahme: Notfall-Badge, Sprachebenen-Toggle)
- Sekundär (ab ca. Block 7): Crosslinks, Quellen, Nächste Schritte, Verlinkungen
  - `var(--surface-2)` Hintergrund statt Weiß
  - Optionaler Separator (dünn, `var(--border)`) vor dem Sekundärbereich
  - Block-Titel: DM Sans 12–13px, 500, `var(--text-light)`

#### Header-Hierarchie auf Detailseiten
1. Zurück-Link (small, primary color)
2. H1 (Instrument Serif, groß) — Seiten-Haupttitel
3. Meta-Zeile (ICD, Häufigkeit, Synonyme) — klein, text-muted
4. Optional: Sprachebenen-Toggle
5. Primärblöcke
6. Visueller Separator
7. Sekundärblöcke

#### Blockgewichte
- Primärblock-Titel: sichtbar, les- und scanbar — **nicht** als `text-muted` uppercase
- Sekundärblock-Titel: dezent — sie ordnen, führen aber nicht
- Keine identische visuelle Gewichtung für alle 16 Blöcke einer Seite

#### Mobile-Regeln
- Alle interaktiven Elemente: `min-height: 44px`
- Suchfelder: `width: 100%; max-width: 320px` statt hartem `min-width`
- Filter-Chips auf Mobile: horizontal scrollbar statt wrap wenn > 6 Elemente
- Kein fester Abstand zwischen Hero und erstem Block kleiner 32px

#### Scanbarkeitspflichten
- Auf Desktop: die erste Bildschirmhöhe einer Detailseite zeigt H1 + Meta + ersten Inhaltsblock vollständig
- Der Nutzer sieht „Was ist das" ohne zu scrollen
- Crosslinks und Quellen sind am Ende erkennbar — nicht durch Farbe sondern durch Position und abgedunkelten Container

---

### C9 — Brand-/Design-No-Gos

Konkret, bindend, keine Ausnahmen ohne explizite Entscheidung in neuem Chat.

| No-Go | Beschreibung |
|-------|-------------|
| Neue semantische Farbe pro Säule | Keine neue Säule bekommt eine eigene Chip-Farbe. Typ-1-Chip ist Standard. |
| Instrument Serif in Interface-Elementen | Kein Serif in Nav, Buttons, Filter, Block-Titeln, Karten-Überschriften |
| Amber außerhalb S2-Kontext | Kein Amber für Crosslinks, Quellentypen, Highlights, Hero-Eyebrow |
| Farbiger Vollhintergrund auf Crosslink-Chips | Alle Content-Crosslinks: `var(--surface-2)` neutral |
| Eyebrow-Badge-Pattern | Das „Kategorie-Pill-Badge über der Headline"-Pattern ist editorial — entfällt |
| Seitenheader-Gradient außerhalb Home | Home-Hero behält Gradient. Alle anderen Seiten-Header: `var(--bg)` |
| Gleichgewichtung aller Detailseiten-Blöcke | Primär- und Sekundärblöcke sind visuell unterschiedlich zu gewichten |
| Uppercase-11px als primärer Block-Titel | Block-Titel müssen lesbar sein — kein Uppercase-Whisper |
| Orange als Säulen-Farbe | Kein Orange als Identifikationsfarbe einer Säule |
| Mehr als 4 Farbsemantiken gleichzeitig | Pro Seite maximal 4 aktive Farbsemantiken |
| Wellness-Sprache im UI | Kein „Stärke", „Energie", „Balance" als UI-Labels oder CTAs |
| Klinische Kälte | Kein Reinweiß-auf-Reinweiß, kein medical-blue, kein heavy-monochrome |
| Generisches SaaS | Kein Primary-Blau, kein Shadow-heavy-UI, keine Icon-heavy-Navigation |

---

### C10 — Migrationslogik

#### Priorität 1 — CSS-Only, kein JSX-Touch (schnellste Umsetzung)

Diese Änderungen sind rein CSS und können in einem kleinen Build-Paket gemacht werden:

- `global.css`: `h1, h2, h3` Serif-Pauschalregel entfernen → Instrument Serif nur noch auf benannte Klassen
- `Home.css`: Eyebrow-Badge-Klasse entfernen/deaktivieren, Gradient abschwächen, Hero-Padding reduzieren
- `Nav.css`: `.nav-tagline` entfernen oder ausblenden
- Alle Seiten-Header-Gradienten (S1 `lw-header`, S2 `supp-header`): `background: var(--bg)` setzen
- Block-Sektions-Titel (`.krank-section-title` + analoge in anderen CSS): uppercase/letter-spacing entfernen, color auf `var(--text)`, font-size auf 13–14px
- Sekundärblöcke: Hintergrund `var(--surface-2)` setzen (in Krankheiten.css für Crosslink-Blöcke)

**Scope: 5–7 CSS-Dateien, kein JSX. Kein DB-Write. Ein Commit.**

#### Priorität 2 — CSS + JSX minimal (eine Komponente)

- Crosslink-Chip-Normalisierung: Chip-Klassen auf Typ-1-Pattern umstellen (je CSS-Datei pro Säule, + ggf. Prefix-Label im JSX)
- Q2-Research-Farbe: Amber → Violett-Grau (Vertrauen.css + KrankheitDetail.jsx)
- Mobile-Tap-Targets: `44px` systemisch setzen (Einzelprüfung je CSS-Datei)

**Scope: 8–12 Dateien (CSS + JSX), 1–2 Commits. Kein DB-Write.**

#### Priorität 3 — Optional, niedriger Aufwand

- Seiten-Titel auf Übersichtsseiten auf DM Sans umstellen (falls sie aktuell Instrument Serif haben über globale Regel)
- B4-Option-Cards: Semantik-Farbentscheidung überprüfen und ggf. auf Typ-1 umstellen
- `supp-header` amber-Gradient: entfernen

#### Was rein optional ist

- Vollständige Detailseiten-Hierarchie-Umstellung (Primär/Sekundär-Container) — das ist mittlerer Aufwand und optional in Phase B, Pflicht in Phase C
- DM Mono offiziell importieren (aktuell nur system-fallback)

#### Kleiner First-Refresh ohne alles umzubauen

**Ja, möglich.** Ein First-Refresh von Priorität 1 (CSS-Only, 5–7 Dateien) liefert 70% der sichtbaren Wirkung:
- Keine Serif-Inflation auf Interface-Elementen
- Kein Editorial-Hero
- Konsistente Seiten-Header
- Lesbare Block-Titel

Das ist ein eigenständiges Mini-Build-Paket. Keine Chip-Normalisierung, kein DB-Write, kein Schema-Change.

---

### C11 — Erster sinnvoller Folge-Schritt

**Empfehlung: UI-Refresh-Build-Paket — Priorität 1 (CSS-Only)**

Paketname: **UI-REFRESH-01**

Inhalt:
- `global.css`: Instrument Serif nur noch auf explizite Klassen
- `Home.css`: Eyebrow entfernen, Gradient reduzieren, Hero-Padding reduzieren
- `Nav.css`: Nav-Tagline entfernen
- `Laborwerte.css`: Header-Gradient entfernen
- `Supplements.css`: Header-Gradient entfernen
- `Krankheiten.css`: Block-Sektions-Titel-Pattern (uppercase → lesbar)
- Ggf. weitere Seiten-Header falls vorhanden in Medikamente.css, Ernaehrung.css

Nicht in UI-REFRESH-01:
- Kein Chip-System-Umbau (Priorität 2)
- Kein DB-Write
- Keine JSX-Struktur-Änderungen

**Neuer Chat nötig: JA**
**Paket: UI-REFRESH-01**
**Voraussetzung: diese Spec ist führend, vor Build-Start lesen**

---

## TEIL D — DESIGN-/BRAND-NO-GOS (Kurzliste)

| # | No-Go |
|---|-------|
| 1 | Keine neue semantische Farbe pro Säule |
| 2 | Instrument Serif nicht in Interface-Elementen (Nav, Filter, Cards, Block-Titel) |
| 3 | Amber nicht für Crosslinks oder Quellentypen |
| 4 | Keine Eyebrow-Badges oder Pill-Labels über Headlines |
| 5 | Kein Seiten-Header-Gradient außerhalb Home |
| 6 | Kein gleiches visuelles Gewicht für alle Detailseiten-Blöcke |
| 7 | Kein Uppercase-11px als primärer Blockheader |
| 8 | Keine weitere Säulen-Identifikationsfarbe (Orange, Türkis, etc.) |
| 9 | Nicht mehr als 4 aktive Farbsemantiken gleichzeitig auf einer Seite |
| 10 | Kein Wellness-Vokabular in UI-Texten |
| 11 | Kein Medical-Blue / Krankenhaus-Ästhetik |
| 12 | Keine kosmetischen Vorschläge ohne Bezug zum Werkzeug-Zielbild |

---

## TEIL E — ERSTER SINNVOLLER FOLGE-SCHRITT

**Paket: UI-REFRESH-01 (CSS-Only First-Refresh)**
**Neuer Chat: JA**

Umfang: 5–7 CSS-Dateien, kein JSX, kein DB-Write, ein Commit.
Erwartete Wirkung: 70% des sichtbaren Refresh in einem kleinen, risikoarmen Paket.

Führendes Dokument für diesen Build: **diese Datei (`BRAND_UX_REFRESH_SPEC.md`)**
Pflichtlektüre vor Build-Start: zusätzlich `CLAUDE.md` + `AUDIT_CANON_CURRENT.md`

---

## OPS-CLOSURE

| Dimension | Status |
|-----------|--------|
| Lokaler Speicher | `BRAND_UX_REFRESH_SPEC.md` im Workspace erstellt |
| Git Status | kein Commit — read-only Spec |
| Commit-Status | NEIN |
| Push-Status | NEIN |
| DB-Write | NEIN |
| Deploy | NEIN |
| Offener Side Effect | NEIN |

**Doppelpflege (Pflichtschritt nach diesem Paket):**
- CLAUDE.md: Sprint-Tabelle nachziehen ← **offen, nach Sebastian-Review**
- VW_03_STATUS.md: Spec-Abschluss eintragen ← **offen**
- AUDIT_CANON_CURRENT.md: nachziehen ← **offen**
- ACTIVE_STRANDS_CURRENT.md: UI-REFRESH-01 als nächster Schritt eintragen ← **offen**

*Hinweis: Doppelpflege-Writes werden erst nach Sebastian-Review und explizitem Freigabe-Signal gemacht. Spec ist produktseitig abgeschlossen.*

---

*Erstellt: 24.04.2026 — Brand/UX Refresh Spec (read-only, kein Build)*
