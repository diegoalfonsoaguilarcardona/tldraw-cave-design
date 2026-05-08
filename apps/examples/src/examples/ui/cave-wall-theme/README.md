---
title: Cave wall theme
component: ./CaveWallThemeExample.tsx
priority: 0.7
keywords: [theme, cave, paleolithic, ochre, custom, palette, fonts, brand]
---

A paleolithic cave-painting aesthetic for the tldraw editor — earth pigments, torch-lit canvas, hand-painted marks.

---

This example registers a custom theme that maps tldraw's shape colors to earth pigments (red ochre, yellow ochre, charcoal, bone, ember, clay, mud, blood, stone), swaps fonts for cave-style typefaces (Rubik Dirt for painted titles, Finger Paint for scrawled body, Rye for stamped labels), and styles the canvas and UI chrome to look painted on a cave wall by torchlight.

Open the font and color pickers in the style panel to explore the full cueva palette.

## Running this example

Requires Node.js ≥20. From the repo root:

```bash
# Install dependencies (first time only)
npm i -g corepack && corepack enable && yarn

# Start the examples dev server
yarn dev
```

Then open [http://localhost:5420](http://localhost:5420) and select **Cave wall theme** from the sidebar under the UI category.
