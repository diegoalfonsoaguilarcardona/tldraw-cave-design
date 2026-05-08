---
name: cave-wall-design
description: Use this skill to generate well-branded interfaces and assets in the Cave Wall paleolithic design system — hand-painted cave-art aesthetic with earth tones, charcoal pictographs, red-ochre titles, and caveman-terse voice. Good for decks, posters, novelty UIs, and any artifact that should feel scratched onto a rock wall. Supports three themes: "cueva" (dark cave, default), "luminoso" (sunlit limestone), and "moderno" (geometric/futuristic, clean light surface).
user-invocable: true
---

Read `README.md` within this skill's directory for the full design spec, then explore the other available files as needed.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and apply the rules in README.md.

When invoked without other guidance, ask the user what they want to build (deck? poster? web page?) and which theme (cueva, luminoso, or moderno), clarify length/audience, then act as an expert in this aesthetic.

## Theme system

Three themes via `data-theme` on `<html>`. Load all theme files and switch with one attribute:

```html
<html data-theme="cueva">    <!-- dark cave (default) -->
<html data-theme="luminoso"> <!-- sunlit limestone, warm and open -->
<html data-theme="moderno">  <!-- geometric, futuristic, hopeful -->
```

Load order:
```html
<link rel="stylesheet" href="colors_and_type.css"/>
<link rel="stylesheet" href="themes/cueva.css"/>
<link rel="stylesheet" href="themes/luminoso.css"/>
<link rel="stylesheet" href="themes/moderno.css"/>
<link rel="stylesheet" href="assets/cave-wall.css"/>
```

**cueva** — deep stone shadow bg (`#3b2a1b`), bone text, torchlight vignette, dark smoky noise. The default.

**luminoso** — warm sand bg (`#e0c898`), charcoal text, subtle golden glow, sandy limestone grain. Same pictographs, same fonts, same marks — just on a sunlit wall.

**moderno** — near-white warm bg (`#f4efe6`), charcoal text, warm amber dot grid, zero vignette. Fonts replace cave script with Exo 2 (geometric titles) + DM Sans (body) + Space Mono (labels). Displacement filters removed from UI components — the marks keep their character, the scaffolding is clean. Shadows become material-style box shadows. Hopeful and technological.

## Moderno — key behavioral differences

| | cueva / luminoso | moderno |
|---|---|---|
| `--font-painted` | Rubik Dirt | Exo 2 900 |
| `--font-scrawl` | Finger Paint | DM Sans 500 |
| `--font-stamp` | Rye | Space Mono |
| Background texture | SVG noise (rock grain) | warm amber dot grid |
| Vignette | yes (cueva heavy, luminoso subtle) | none |
| `filter: url(#rough)` on CV classes | applied | removed |
| `--shadow-panel` | inset warm glow + drop | flat box shadow |
| `--shadow-painted` | `3px 3px 0` offset | `none` |

Inline `filter="url(#rough)"` on individual SVG elements (pictograph paths) is NOT overridden — those marks retain handmade character in all three themes.

For single-slide theme override in a deck (like the luminoso demo slide 25), use a class (e.g., `mod-slide`) and write matching section-level CSS overrides for background, ::before noise, and ::after vignette, mirroring the pattern in `Bootcamp IA Generativa Cave.html`.

## Key files (all relative to this skill's directory)
- `README.md` — full spec: palette, type, voice, foundations, iconography, diagrams, charts
- `colors_and_type.css` — CSS variables (cueva defaults) + semantic classes
- `themes/cueva.css` — explicit cueva theme token overrides
- `themes/luminoso.css` — luminoso token overrides + noise/vignette layer overrides
- `themes/moderno.css` — moderno token overrides + dot grid + filter removal + font imports
- `assets/cave-wall.css` — .cv-wall background, parchment panel, buttons
- `assets/diagrams.css` — diagram & chart classes: `.cv-node`, `.cv-edge`, `.cv-bar`, `.cv-axis`, `.cv-pie`, `.cv-scatter-dot`
- `assets/pictographs.svg.html` — inline SVG defs: pictographs + `#cv-arrow`/`#cv-arrow-open` markers + `#pg-arrow`, `#pg-tally` symbols
- `ui_kits/cave-wall/` — React components (Wall, Notice, HuntRow, Chip, Button, Frieze, Pictograph)
- `slides/` — title, quote, and 4-up grid templates (1280×720)
- `preview/` — specimen cards including flow diagrams, tally/bar, trail/line, stone-disk pie, scatter

Don'ts (apply to all three themes): no blue/green/purple accents outside the ochre family, no chart.js/d3 default themes, no grid lines, no floating legend boxes, no soft-blurred shadows in isolation. In moderno, rounded corners and emoji are still off-limits.
