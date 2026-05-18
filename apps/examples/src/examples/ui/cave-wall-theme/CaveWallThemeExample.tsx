import { useRef, useMemo } from 'react'
import {
	DEFAULT_THEME,
	TLDefaultColor,
	TLTheme,
	TLThemeFont,
	TLThemes,
	TLUiOverrides,
	Tldraw,
	toRichText,
	useEditor,
	getSnapshot,
	loadSnapshot,
} from 'tldraw'
import 'tldraw/tldraw.css'
import './cave-wall-theme.css'

// [1] Register cave fonts and remove the light-* color variants from the palette.
declare module '@tldraw/tlschema' {
	interface TLThemeFonts {
		painted: TLThemeFont // Rubik Dirt — painted titles
		scrawl: TLThemeFont // Finger Paint — scrawled body
		stamp: TLThemeFont // Rye — stamped labels
	}
	interface TLRemovedDefaultThemeColors {
		'light-violet': true
		'light-blue': true
		'light-green': true
		'light-red': true
	}
}

// [2] Build a full TLDefaultColor entry for a cave pigment.
// noteFill/noteText control sticky note appearance; frameText controls
// text rendered inside a frame.
function makeCaveColor(
	solid: string,
	semi: string,
	pattern: string,
	noteFill: string,
	noteText: string,
	frameText: string
): TLDefaultColor {
	return {
		solid,
		semi,
		pattern,
		fill: solid,
		linedFill: semi,
		frameHeadingStroke: solid,
		frameHeadingFill: semi,
		frameStroke: solid,
		frameFill: semi,
		frameText,
		noteFill,
		noteText,
		highlightSrgb: pattern,
		highlightP3: pattern,
	}
}

// [3] Cave pigment palette — earth tones only.
// black → charcoal, grey → stone, white → bone,
// red → ochre, orange → umber, yellow → ember,
// blue → clay, green → mud, violet → blood
const CAVE_BLACK = makeCaveColor('#1a120a', '#3b2a1b', '#2a1d12', '#d9bf89', '#1a120a', '#efe3c7')
const CAVE_GREY = makeCaveColor('#8a6a44', '#6b4a2e', '#b08a5c', '#c4a870', '#1a120a', '#efe3c7')
const CAVE_WHITE = makeCaveColor('#efe3c7', '#d9cca7', '#f8f0e0', '#f3e2b8', '#1a120a', '#1a120a')
const CAVE_RED = makeCaveColor('#8b2f1a', '#5d1d10', '#c84a28', '#e8a090', '#1a120a', '#efe3c7')
const CAVE_ORANGE = makeCaveColor('#c8841e', '#8b5a10', '#e0a030', '#f0d08a', '#1a120a', '#1a120a')
const CAVE_YELLOW = makeCaveColor('#e05a18', '#8b3a10', '#ff7a2b', '#f0b078', '#1a120a', '#1a120a')
const CAVE_BLUE = makeCaveColor('#7a4820', '#5a3010', '#9a6840', '#c09060', '#1a120a', '#efe3c7')
const CAVE_GREEN = makeCaveColor('#5a4020', '#3a2a10', '#7a5a30', '#a8845a', '#1a120a', '#efe3c7')
const CAVE_VIOLET = makeCaveColor('#5d0f0a', '#3b0a08', '#8b2f1a', '#d07060', '#1a120a', '#efe3c7')

// [4] Build the color palette: remove light-* variants, override everything else.
function buildCavePalette(base: typeof DEFAULT_THEME.colors.light): TLTheme['colors']['light'] {
	const {
		'light-violet': _lv,
		'light-blue': _lb,
		'light-green': _lg,
		'light-red': _lr,
		...kept
	} = base as Record<string, unknown>

	return {
		...(kept as Omit<typeof base, 'light-violet' | 'light-blue' | 'light-green' | 'light-red'>),
		// Palette-level overrides
		text: '#efe3c7',
		background: '#3b2a1b',
		negativeSpace: '#3b2a1b',
		solid: '#2a1d12',
		cursor: 'white',
		noteBorder: '#8b2f1a',
		snap: '#ff7a2b',
		selectionStroke: '#8b2f1a',
		selectionFill: 'rgba(139,47,26,0.22)',
		brushFill: 'rgba(200,132,30,0.12)',
		brushStroke: 'rgba(200,132,30,0.32)',
		selectedContrast: '#efe3c7',
		laser: '#ff7a2b',
		// Named color overrides — all earth tones
		black: CAVE_BLACK,
		grey: CAVE_GREY,
		white: CAVE_WHITE,
		red: CAVE_RED,
		orange: CAVE_ORANGE,
		yellow: CAVE_YELLOW,
		blue: CAVE_BLUE,
		green: CAVE_GREEN,
		violet: CAVE_VIOLET,
	} as TLTheme['colors']['light']
}

// [5] Cave fonts — loaded by the CSS @import, referenced here by family name.
// No `faces` entries needed since Google Fonts handles loading.
const paintedFont: TLThemeFont = {
	fontFamily: "'Rubik Dirt', cursive",
	icon: (
		<span style={{ fontFamily: "'Rubik Dirt', cursive", fontSize: 13, lineHeight: 1 }}>Aa</span>
	),
}

const scrawlFont: TLThemeFont = {
	fontFamily: "'Finger Paint', cursive",
	icon: (
		<span style={{ fontFamily: "'Finger Paint', cursive", fontSize: 13, lineHeight: 1 }}>Aa</span>
	),
}

const stampFont: TLThemeFont = {
	fontFamily: "'Rye', serif",
	icon: <span style={{ fontFamily: "'Rye', serif", fontSize: 13, lineHeight: 1 }}>Aa</span>,
}

// Drop serif and mono from the default palette; keep draw + sans, add cave fonts.
const { serif: _serif, mono: _mono, ...keptFonts } = DEFAULT_THEME.fonts
const caveFonts = {
	...keptFonts,
	painted: paintedFont,
	scrawl: scrawlFont,
	stamp: stampFont,
} as TLTheme['fonts']

// [6] Translation overrides so the style panel shows cave-voice names.
const uiOverrides: TLUiOverrides = {
	translations: {
		en: {
			'color-style.black': 'Charcoal',
			'color-style.grey': 'Stone',
			'color-style.white': 'Bone',
			'color-style.red': 'Ochre',
			'color-style.orange': 'Umber',
			'color-style.yellow': 'Ember',
			'color-style.blue': 'Clay',
			'color-style.green': 'Mud',
			'color-style.violet': 'Blood',
			'font-style.painted': 'Painted',
			'font-style.scrawl': 'Scrawl',
			'font-style.stamp': 'Stamp',
		},
	},
}

// [SavePanel] Save/load the drawing as a local JSON file.
function SavePanel() {
	const editor = useEditor()
	const inputRef = useRef<HTMLInputElement>(null)

	function handleSave() {
		const snapshot = getSnapshot(editor.store)
		const blob = new Blob([JSON.stringify(snapshot)], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'cave-drawing.json'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		setTimeout(() => URL.revokeObjectURL(url), 100)
	}

	function handleLoad(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = (ev) => {
			try {
				const snapshot = JSON.parse(ev.target?.result as string)
				loadSnapshot(editor.store, snapshot)
			} catch {
				// invalid file, ignore
			}
		}
		reader.readAsText(file)
		e.target.value = ''
	}

	return (
		<div style={{ display: 'flex', gap: 6, padding: '0 8px', pointerEvents: 'all' }}>
			<button
				onClick={handleSave}
				style={{
					background: '#8b2f1a',
					color: '#efe3c7',
					border: 'none',
					borderRadius: 6,
					padding: '4px 12px',
					cursor: 'pointer',
					fontFamily: "'Rye', serif",
					fontSize: 13,
				}}
			>
				Save
			</button>
			<button
				onClick={() => inputRef.current?.click()}
				style={{
					background: '#3b2a1b',
					color: '#efe3c7',
					border: '1px solid #8b2f1a',
					borderRadius: 6,
					padding: '4px 12px',
					cursor: 'pointer',
					fontFamily: "'Rye', serif",
					fontSize: 13,
				}}
			>
				Open
			</button>
			<input
				ref={inputRef}
				type="file"
				accept=".json"
				style={{ display: 'none' }}
				onChange={handleLoad}
			/>
		</div>
	)
}

export default function CaveWallThemeExample() {
	// [7] Build the cave theme: same earth palette for both light and dark
	// since the cave has no day/night mode.
	const themes = useMemo<Partial<TLThemes>>(() => {
		const cavePalette = buildCavePalette(DEFAULT_THEME.colors.light)
		return {
			default: {
				id: 'default',
				fontSize: DEFAULT_THEME.fontSize,
				lineHeight: DEFAULT_THEME.lineHeight,
				strokeWidth: DEFAULT_THEME.strokeWidth,
				fonts: caveFonts,
				colors: {
					light: cavePalette,
					dark: cavePalette,
				},
			},
		}
	}, [])

	return (
		<div className="cv-tldraw tldraw__editor">
			<Tldraw
				persistenceKey="cave-wall-theme-example"
				themes={themes}
				overrides={uiOverrides}
				components={{ SharePanel: SavePanel }}
				onMount={(editor) => {
					// [8] Seed shapes on first visit to demonstrate the palette.
					if (editor.getCurrentPageShapeIds().size > 0) return

					editor.createShapes([
						// Painted hero title
						{
							type: 'text',
							x: 80,
							y: 60,
							props: {
								richText: toRichText('HUNT BEGINS'),
								font: 'painted',
								color: 'red',
								size: 'xl',
							},
						},
						// Scrawled body copy — cave voice
						{
							type: 'text',
							x: 82,
							y: 220,
							props: {
								richText: toRichText('three bison. moon was full.'),
								font: 'scrawl',
								color: 'white',
								size: 'm',
							},
						},
						// Stamp label
						{
							type: 'text',
							x: 82,
							y: 300,
							props: {
								richText: toRichText('MARK THE KILL'),
								font: 'stamp',
								color: 'orange',
								size: 's',
							},
						},
						// A note with cave-voice wisdom
						{
							type: 'note',
							x: 520,
							y: 80,
							props: {
								color: 'black',
								richText: toRichText('iron in the clay.\ncrush. spit. smear.'),
							},
						},
						// A geo shape — sun or moon
						{
							type: 'geo',
							x: 520,
							y: 280,
							props: {
								w: 160,
								h: 160,
								color: 'red',
								geo: 'ellipse',
							},
						},
					])

					editor.zoomToFit({ animation: { duration: 0 } })
				}}
			/>
		</div>
	)
}

/*

[1]
Module augmentation adds three cave font keys to the type system so
`font: 'painted'` (etc.) is valid in shape props. Removing the `light-*`
color variants via `TLRemovedDefaultThemeColors` stops them appearing in
the style panel.

[2]
`makeCaveColor` builds a complete `TLDefaultColor` entry. `noteFill` and
`noteText` control sticky-note appearance; `frameText` controls text rendered
inside a frame container. Earth pigments need explicit light note fills so
sticky note text stays readable on the darker-than-default canvas.

[3]
Nine earth-tone colors replace the full tldraw default palette. The slot
names (black, grey, …, violet) are kept so existing shapes created with
the default theme still resolve to a pigment. The style panel shows the
cave-voice names from the `TLUiOverrides` translations below.

[4]
`buildCavePalette` destructures out the removed `light-*` variants and
spreads the result before overriding the palette-level strings (background,
text, selectionStroke, etc.) and every named color object. Both `light` and
`dark` variants receive the same palette — the cave has no day/night mode.

[5]
Cave fonts are loaded by the `@import` in `cave-wall-theme.css`. Omitting
`faces` tells tldraw to treat them as pre-loaded system fonts; the CSS
import ensures they're available in the browser before shapes try to render.

[6]
`TLUiOverrides.translations` renames each color and font in the style panel
to cave-voice labels ("Charcoal", "Ochre", "Painted", etc.) without changing
the underlying color key names used in shape props.

[7]
The `themes` object is memo-stable (no reactive deps). Passing
`{ default: ... }` overrides the built-in default theme so every new shape
inherits the cave palette automatically.

[8]
Shapes are seeded once on first mount. `zoomToFit` frames them so the user
sees the full demo without scrolling.

*/
