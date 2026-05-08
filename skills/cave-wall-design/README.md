# Cave Wall Design System

A paleolithic cave-painting aesthetic for decks, slides, posters, and any artifact that should feel hand-scratched by torchlight.

The system was derived from **Cave Wall Deck.html** — a 9-slide deck explaining cave-art techniques, built to look like it was painted on a rock wall by a caveman.

## Source

- `Cave Wall Deck.html` — the origin artifact, used as the reference for every foundation and component.
- `uploads/Gemini_Generated_Image_g5hk33g5hk33g5hk.png` — the initial mood-board image from the user.

---

## Content fundamentals

**Voice: caveman-terse, declarative, earthy.**

- **Person:** first-person plural ("we paint", "we count the kill") or direct imperative ("press the hand", "count the moons"). Never "you" in the marketing sense.
- **Casing:** ALL CAPS for painted titles. lowercase for scrawled body copy. `UPPERCASE+LETTER-SPACED` for stamps/chips.
- **Grammar:** drop articles. "fire dies. story stays on wall." not "the fire dies and the story stays on the wall."
- **Sentence length:** short. one idea per line. line breaks do work that commas normally would.
- **Punctuation:** periods, not exclamation. occasional em-dash. no semicolons. no emoji.
- **Metaphors:** time is "winters" or "moons". quantity is "fists". color comes from earth, fire, bone, blood.

**Examples (lifted from the deck):**

| Bad ("modern voice") | Good (cave voice) |
|---|---|
| "Our pigments were derived from natural minerals." | "iron in the clay. crush. spit. smear." |
| "Many bison were hunted during the last full moon." | "three fists of beasts. moon was full." |
| "Please submit your questions." | "grunt once for yes, twice for no." |
| "Archaeological sites across Europe and Asia." | "places of the old marks." |

**Don't:** emoji, modern idioms ("let's dive in"), corporate verbs ("leverage", "unlock"), question marks in headings, gradient-y hype.

---

## Visual foundations

### Palette
Warm earth tones only. Everything is made of rock, fire, blood, or bone.

- **Cave wall base** — layered browns from deep shadow (`#2a1d12`) to lit rim (`#d4b27c`), always with rock-noise texture and a torch-lit vignette.
- **Red ochre** `#8b2f1a` — the primary "paint" color. Used for titles, hand stencils, hero pictographs.
- **Yellow ochre** `#c8841e` — secondary pigment. Subheads, accent glyphs, "sun" color.
- **Charcoal** `#1a120a` — outlines, friezes, dark animals.
- **Bone white** `#efe3c7` — body copy on wall, highlights, negative-space accent.
- **Ember** `#ff7a2b` — reserved for actual fire/flame glows. Use sparingly.

No blues, no greens, no purples. No saturated "accent" colors outside this list.

### Type
Three fonts, cast in strict roles:

- **Rubik Dirt** (Google Fonts) — painted titles. Applied through the `#rough` SVG displacement filter so every stroke looks pigment-dragged.
- **Finger Paint** (Google Fonts) — scrawled body copy, handwritten notes.
- **Rye** (Google Fonts) — stamp/label/chip text. Letter-spaced, always uppercase.

Minimum sizes at 1920×1080: titles 78–150px, body 38–54px, labels 26px+.

### Backgrounds
Every slide/screen is a full-bleed **cave wall**, not a flat color:

1. Radial fire-glow at center (warm orange, low opacity).
2. Rock gradient (upper-left highlight → lower-right shadow).
3. Two SVG `feTurbulence` noise layers (fine grain + coarse mottling) blended `multiply`.
4. Vignette ring darkening the edges; small ember highlights in the corners.

Never a flat color. Never a smooth gradient alone.

### Textures & marks
- **Rough filter** (`#rough`): `feTurbulence baseFrequency=0.04 → feDisplacementMap scale=3`. Applied to painted text and most SVG pictographs.
- **Heavy rough** (`#roughHeavy`): `baseFrequency=0.06, scale=6`. For hero titles only.
- **Paint drips**: thin vertical gradient bars from the top edge, varying opacity.
- **Charcoal friezes**: rows of small pictographs (bison, spiral, paw, spear, chevron) along the top and bottom of most slides.
- **Parchment panels**: warm ochre radial gradient inside a charcoal border, with inset shadow and its own noise overlay. Used for "quote card" / "content panel" needs instead of white cards.

### Iconography
Original, intentionally-primitive SVG pictographs — all defined once as `<symbol>` in a shared defs block and reused via `<use>`. Stroke/fill is `currentColor` so any pigment can be applied.

Set:
- `pg-bison`, `pg-mammoth`, `pg-deer`, `pg-horse` — fauna
- `pg-hand` — hand stencil
- `pg-spiral`, `pg-dots`, `pg-paw`, `pg-spear`, `pg-sun`, `pg-chev` — marks
- `pg-person` — stick figure

No emoji. No Lucide/Heroicons/etc — anachronistic. When a concept isn't in the pictograph set (e.g. "settings"), invent a new primitive-style symbol in the same hand-drawn register rather than reaching for a modern icon.

### Motion & states
- **Transitions:** slide-fade via deck-stage defaults. Nothing else moves.
- **Hover:** warm-up — shift fill one step toward yellow ochre or add a faint fire-glow behind the element. Never scale or translate.
- **Press:** darken toward charcoal, no shrink.
- **Animation easing:** if used, slow and heavy (torch-flicker), not bouncy.

### Layout
- Always padded generously (~100–140px on 1920-wide surfaces) — the wall needs breathing room for the vignette to read.
- Top and bottom friezes frame most slides like the reference poster.
- Content is centered or split 2-column. Avoid dense grids (not in the brand).

### Corners & borders
- Corners: **never rounded** on painted/pictograph elements — strokes are organic. Parchment panels have straight edges with a hand-drawn-feel border.
- Borders: 2–4px solid charcoal or red ochre, passed through `#rough` filter when possible.

### Shadows
- **Text shadow:** hard offset `2–4px 2–4px 0 rgba(0,0,0,.35)` behind painted titles — reads like pigment behind the wall.
- **Panel shadow:** `inset 0 0 40px rgba(90,50,10,.35), 0 6px 18px rgba(0,0,0,.5)` — inner glow plus soft drop.
- No soft blurred shadows in isolation. Everything hard-edged or inset.

### Diagrams & charts

#### Diagram primitives

- **Nodes (boxes):** 3px charcoal or red-ochre stroke, transparent or parchment fill, **never rounded**, `filter: url(#rough)`. Label inside with Finger Paint, or a `.cv-chip-box` stamp on top. Use `.cv-node` CSS class.
- **Nodes (circles):** same stroke rules; `.cv-node--circle` is the only context where `border-radius: 50%` is permitted — these are semantic diagram states, not buttons. Stone-disk fill (radial gradient from `--bone` to `--ochre-yellow`) when they need visual weight.
- **Edges (lines):** SVG `<line>` or `<path>`, 3–4px stroke in `--charcoal` or `--ochre-deep`, `stroke-linecap: round`, through `#rough` filter. Add class `.cv-edge`. For optional/weak edges use `.cv-edge--dashed` (`stroke-dasharray: 6 8`) — reads as paint flecks, not a modern dotted line.
- **Arrowheads:** defined as SVG `<marker>` defs — `cv-arrow` (filled charcoal triangle) or `cv-arrow-open` (two-stroke chevron, no fill). Set `marker-end="url(#cv-arrow)"` on any edge. The `#pg-arrow` pictograph symbol can also be placed inline as a directional glyph.
- **Layout:** generous whitespace, nodes on a coarse informal grid, edges orthogonal or at 30°/60°. No smooth Bezier curves — the stroke wiggles from `#rough` are the only curvature.

**Labels:** Rye stamp on a `.cv-chip-box` when the label is short; Finger Paint scrawl placed directly against the stroke when longer. Never bare sans-serif text floating next to an edge.

Examples (cave voice for diagram captions):

| Bad (modern) | Good (cave voice) |
|---|---|
| "Step 1 → Step 2 → Step 3" | "first mark. second mark. third." |
| "Process Flow Diagram" | "path of the hunt" |
| "Node A depends on Node B" | "B comes first. A follows." |

#### Chart foundations

- **Axes:** single charcoal rough stroke; no background grid. Tick marks are short perpendicular slashes (8–12px). Tick numerals in Rye, letter-spaced. Axis titles in Finger Paint, lowercase, short.
- **No frame or box** around the chart — the cave wall or parchment panel is the frame.
- **Series color order:** `--ochre-red` → `--ochre-yellow` → `--charcoal` → `--bone`. Stop at four series. A fifth, if unavoidable, borrows `--ember` used sparingly.
- **No floating legend boxes.** Label each series directly (inline next to the last data point, or via `.cv-chip-box` anchored to the series).

#### Chart types

| Type | How it's drawn | CSS/SVG entry point |
|---|---|---|
| **Tally / bar** | Below ~30 units: rows of `#pg-tally` glyphs (four verticals + diagonal slash = five). Above 30: vertical painted bars (`.cv-bar`) with rough edges, ochre-red fill, no corner radius. | `.cv-bar`, `#pg-tally` |
| **Trail / line** | A single hand-drawn path ("hunt trail") in `--ochre-red` through `#rough`. No area fill below the line. Data points marked with `#pg-paw` or `#pg-hand` at `<use>` positions. No curve smoothing. | `.cv-edge` + pictographs |
| **Stone-disk pie** | One `<circle>` with a stone-texture fill (radial gradient, `--bone` → `--ochre-yellow`); charcoal 4px strokes through `#rough` crack the disk into wedges; each wedge `<path>` painted in a series color with `mix-blend-mode: multiply` so texture shows through. 3–5 slices maximum. | `.cv-pie` |
| **Scatter / dots** | `#pg-paw`, `#pg-hand`, or plain `<circle filter="url(#rough)">` positioned on bare axes. Size-encoding is fine; color-encoding must stay within the four-color palette. | `.cv-scatter-dot` |

#### Diagram & chart don'ts
- No smooth Bezier edges in flow diagrams.
- No `chart.js` / `d3` default themes — always override stroke, fill, and filter before using any charting library.
- No 3D/isometric bars, no gradient fills inside bars, no chart-element drop shadows.
- No legends in rounded floating boxes.
- No grid lines (not even subtle ones).

---

## Index

| File | What it is |
|---|---|
| `README.md` | This file |
| `colors_and_type.css` | CSS variables + semantic classes |
| `cave-wall-design.md` | Agent-skill entry point |
| `Cave Wall Deck.html` | Origin reference artifact |
| `deck-stage.js` | Slide-deck web component (from starter) |
| `assets/pictographs.svg.html` | Shared SVG symbol library (incl. `pg-arrow`, `pg-tally`, `cv-arrow` markers) |
| `assets/cave-wall.css` | Reusable `.cv-wall` background + filters |
| `assets/diagrams.css` | Diagram & chart classes (nodes, edges, bars, axes, pie, scatter) |
| `preview/` | Design-system preview cards — incl. flow, tally, trail, pie, scatter |
| `ui_kits/cave-wall/` | UI kit — hand-painted poster + notice board |
| `slides/` | Sample slide templates |

---

## Caveats

- Fonts are **Google Fonts substitutes** for genuine hand-drawn lettering. If you have real caveman handwriting in a local TTF, drop it into `fonts/` and rewire `colors_and_type.css`.
- Pictographs are original primitive drawings, not photos of actual cave art. They're deliberately crude but not authentic — fine for stylized decks, not for archaeology publications.
- The whole system leans theatrical. Treat it as a costume, not a faithful historical reconstruction.
