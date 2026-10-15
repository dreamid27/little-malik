/**
 * Flat, logo-style garment illustrations (400×400 artboard).
 * Every garment = one silhouette path (filled + patterned + offset shadow)
 * plus detail strokes drawn on top. Keep silhouettes closed and simple.
 */
import type { FabricPattern, GarmentKind } from "../../src/content/products"

export const INK = "#3B2416"

type GarmentShape = {
  /** Closed silhouette, also used as the pattern clip. */
  body: string
  /** Extra filled shapes drawn under the body (e.g. hood, straps). */
  under?: Array<{ d: string; tone: "shade" | "accent" }>
  /** Filled shapes drawn on top of the pattern (bands, pockets, collars). */
  over?: Array<{ d: string; tone: "shade" | "accent" | "base" }>
  /** Stroked detail lines (seams, folds). */
  lines?: Array<string>
  /** Buttons / snaps as [cx, cy, r]. */
  dots?: Array<[number, number, number]>
  /** Where the garment hangs from a clothesline peg. */
  pegs: Array<[number, number]>
}

export const garments: Record<GarmentKind, GarmentShape> = {
  tee: {
    body: "M140 74 L172 62 Q200 88 228 62 L260 74 L334 118 L308 170 L272 152 L272 330 Q200 342 128 330 L128 152 L92 170 L66 118 Z",
    over: [
      { d: "M172 62 Q200 88 228 62 L236 66 Q200 104 164 66 Z", tone: "shade" },
    ],
    lines: [
      "M96 160 L118 116",
      "M304 160 L282 116",
      "M136 314 Q200 324 264 314",
    ],
    pegs: [
      [150, 70],
      [250, 70],
    ],
  },
  shirt: {
    body: "M140 74 L172 60 L200 84 L228 60 L260 74 L334 118 L308 170 L272 152 L272 330 Q200 342 128 330 L128 152 L92 170 L66 118 Z",
    over: [
      { d: "M172 60 L200 84 L186 104 L160 74 Z", tone: "base" },
      { d: "M228 60 L200 84 L214 104 L240 74 Z", tone: "base" },
      { d: "M150 190 L182 190 L182 222 Q166 230 150 222 Z", tone: "shade" },
    ],
    lines: ["M200 84 L200 334", "M96 160 L118 116", "M304 160 L282 116"],
    dots: [
      [208, 128, 5],
      [208, 176, 5],
      [208, 224, 5],
      [208, 272, 5],
    ],
    pegs: [
      [150, 70],
      [250, 70],
    ],
  },
  hoodie: {
    body: "M136 92 L264 92 L336 146 L362 298 L326 308 L300 196 L292 332 Q200 344 108 332 L100 196 L74 308 L38 298 L64 146 Z",
    under: [{ d: "M146 104 Q138 40 200 36 Q262 40 254 104 Z", tone: "shade" }],
    over: [
      { d: "M150 258 L250 258 L268 308 L132 308 Z", tone: "shade" },
      { d: "M160 92 Q200 128 240 92 Z", tone: "shade" },
    ],
    lines: [
      "M300 196 L292 150",
      "M100 196 L108 150",
      "M112 318 Q200 330 288 318",
    ],
    pegs: [
      [140, 96],
      [260, 96],
    ],
  },
  shorts: {
    body: "M110 118 L290 118 L314 300 L216 312 L200 206 L184 312 L86 300 Z",
    over: [
      { d: "M110 118 L290 118 L293 146 L107 146 Z", tone: "shade" },
      { d: "M90 284 L184 296 L184 312 L86 300 Z", tone: "shade" },
      { d: "M216 296 L310 284 L314 300 L216 312 Z", tone: "shade" },
    ],
    lines: [
      "M200 146 L200 206",
      "M126 160 Q150 190 140 220",
      "M274 160 Q250 190 260 220",
    ],
    pegs: [
      [130, 120],
      [270, 120],
    ],
  },
  joggers: {
    body: "M122 76 L278 76 L298 318 L226 326 L206 164 L194 164 L174 326 L102 318 Z",
    over: [
      { d: "M122 76 L278 76 L280 104 L120 104 Z", tone: "shade" },
      { d: "M103 300 L176 308 L174 326 L102 318 Z", tone: "shade" },
      { d: "M224 308 L297 300 L298 318 L226 326 Z", tone: "shade" },
    ],
    lines: [
      "M200 104 L200 164",
      "M190 104 Q184 128 176 138",
      "M210 104 Q216 128 224 138",
      "M136 124 Q160 150 150 180",
      "M264 124 Q240 150 250 180",
    ],
    pegs: [
      [140, 78],
      [260, 78],
    ],
  },
  skirt: {
    body: "M136 112 L264 112 L330 318 Q200 344 70 318 Z",
    over: [{ d: "M136 112 L264 112 L268 140 L132 140 Z", tone: "shade" }],
    lines: ["M160 140 L130 326", "M200 140 L200 332", "M240 140 L270 326"],
    pegs: [
      [150, 114],
      [250, 114],
    ],
  },
  dress: {
    body: "M162 70 Q200 98 238 70 L262 78 Q294 90 296 120 Q282 136 262 130 L256 176 L326 330 Q200 354 74 330 L144 176 L138 130 Q118 136 104 120 Q106 90 138 78 Z",
    over: [
      { d: "M144 172 L256 172 L260 192 L140 192 Z", tone: "accent" },
      { d: "M162 70 Q200 98 238 70 L246 74 Q200 116 154 74 Z", tone: "base" },
    ],
    lines: [
      "M116 118 Q124 104 140 102",
      "M284 118 Q276 104 260 102",
      "M86 322 Q200 344 314 322",
    ],
    pegs: [
      [146, 76],
      [254, 76],
    ],
  },
  romper: {
    body: "M160 66 Q200 92 240 66 L268 74 L320 112 L298 154 L268 140 L270 248 Q274 300 252 322 L216 324 Q200 300 184 324 L148 322 Q126 300 130 248 L132 140 L102 154 L80 112 L132 74 Z",
    over: [
      { d: "M160 66 Q200 92 240 66 L248 70 Q200 108 152 70 Z", tone: "shade" },
      {
        d: "M140 300 Q160 316 184 318 L184 324 L148 322 Q140 312 140 300 Z",
        tone: "shade",
      },
      {
        d: "M260 300 Q240 316 216 318 L216 324 L252 322 Q260 312 260 300 Z",
        tone: "shade",
      },
    ],
    lines: ["M104 146 L120 112", "M296 146 L280 112"],
    dots: [
      [186, 312, 5],
      [200, 306, 5],
      [214, 312, 5],
    ],
    pegs: [
      [146, 70],
      [254, 70],
    ],
  },
  overall: {
    body: "M150 116 L250 116 L252 190 L302 196 L318 330 L216 338 L200 262 L184 338 L82 330 L98 196 L148 190 Z",
    under: [
      { d: "M150 120 L134 46 L152 42 L170 118 Z", tone: "shade" },
      { d: "M250 120 L266 46 L248 42 L230 118 Z", tone: "shade" },
    ],
    over: [
      { d: "M170 136 L230 136 L230 176 Q200 186 170 176 Z", tone: "shade" },
      { d: "M86 312 L184 320 L184 338 L82 330 Z", tone: "shade" },
      { d: "M216 320 L314 312 L318 330 L216 338 Z", tone: "shade" },
    ],
    lines: ["M148 190 L252 190", "M200 190 L200 262"],
    dots: [
      [160, 126, 7],
      [240, 126, 7],
    ],
    pegs: [
      [143, 46],
      [257, 46],
    ],
  },
  koko: {
    body: "M150 72 L250 72 L276 82 L346 144 L356 292 L320 298 L302 178 L296 336 Q200 348 104 336 L98 178 L80 298 L44 292 L54 144 L124 82 Z",
    over: [
      { d: "M158 58 L242 58 L248 82 Q200 96 152 82 Z", tone: "shade" },
      { d: "M188 88 L212 88 L212 212 L188 212 Z", tone: "accent" },
      { d: "M44 292 L80 298 L78 314 L42 308 Z", tone: "shade" },
      { d: "M320 298 L356 292 L358 308 L322 314 Z", tone: "shade" },
    ],
    lines: [
      "M178 96 L178 204",
      "M222 96 L222 204",
      "M302 178 L294 130",
      "M98 178 L106 130",
    ],
    dots: [
      [200, 112, 4],
      [200, 146, 4],
      [200, 180, 4],
    ],
    pegs: [
      [140, 76],
      [260, 76],
    ],
  },
  gamis: {
    body: "M166 64 Q200 86 234 64 L262 74 L332 140 L348 272 L316 278 L296 166 L286 176 L334 346 Q200 364 66 346 L114 176 L104 166 L84 278 L52 272 L68 140 L138 74 Z",
    over: [
      { d: "M110 176 L290 176 L294 196 L106 196 Z", tone: "accent" },
      {
        d: "M188 186 Q170 210 160 240 L176 240 Q186 214 200 192 Q214 214 224 240 L240 240 Q230 210 212 186 Z",
        tone: "accent",
      },
      { d: "M166 64 Q200 86 234 64 L242 68 Q200 104 158 68 Z", tone: "shade" },
      { d: "M52 272 L84 278 L82 292 L50 286 Z", tone: "shade" },
      { d: "M316 278 L348 272 L350 286 L318 292 Z", tone: "shade" },
    ],
    lines: ["M80 338 Q200 356 320 338"],
    pegs: [
      [150, 70],
      [250, 70],
    ],
  },
  "bucket-hat": {
    body: "M132 150 Q138 84 200 80 Q262 84 268 150 L276 196 Q326 206 330 226 Q200 262 70 226 Q74 206 124 196 Z",
    over: [
      {
        d: "M128 168 Q200 156 272 168 L276 196 Q200 184 124 196 Z",
        tone: "accent",
      },
    ],
    lines: ["M92 222 Q200 248 308 222", "M200 82 L200 160"],
    pegs: [[200, 84]],
  },
}

/** Mix a hex color toward another by `t` (0..1). */
export function mix(a: string, b: string, t: number): string {
  const pa = parseHex(a)
  const pb = parseHex(b)
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t))
  return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`
}

/** Darken in HSL space so light fabrics keep their hue instead of greying. */
export function darken(hex: string, amount: number): string {
  const [r, g, b] = parseHex(hex).map((v) => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h /= 6
  }
  return hslToHex(h, Math.min(1, s + 0.08), Math.max(0, l - amount))
}

function hslToHex(h: number, s: number, l: number): string {
  const hue = (p: number, q: number, t: number) => {
    const tt = t < 0 ? t + 1 : t > 1 ? t - 1 : t
    if (tt < 1 / 6) return p + (q - p) * 6 * tt
    if (tt < 1 / 2) return q
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const rgb =
    s === 0
      ? [l, l, l]
      : [hue(p, q, h + 1 / 3), hue(p, q, h), hue(p, q, h - 1 / 3)]
  return `#${rgb
    .map((v) =>
      Math.round(v * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ]
}

/** Motif-only pattern (transparent tile) — the base colour is painted underneath. */
function patternDef(
  id: string,
  pattern: FabricPattern,
  accent: string
): string {
  switch (pattern) {
    case "stripes":
      return `<pattern id="${id}" width="40" height="40" patternUnits="userSpaceOnUse"><rect y="24" width="40" height="12" fill="${accent}"/></pattern>`
    case "dots":
      return `<pattern id="${id}" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="5" fill="${accent}"/><circle cx="27" cy="27" r="5" fill="${accent}"/></pattern>`
    case "gingham":
      return `<pattern id="${id}" width="32" height="32" patternUnits="userSpaceOnUse"><rect width="16" height="32" fill="${accent}" opacity=".45"/><rect width="32" height="16" fill="${accent}" opacity=".45"/></pattern>`
    case "daisies":
      return `<pattern id="${id}" width="56" height="56" patternUnits="userSpaceOnUse">${daisy(14, 14, accent)}${daisy(42, 42, accent)}</pattern>`
    case "sparkles":
      return `<pattern id="${id}" width="60" height="60" patternUnits="userSpaceOnUse">${sparklePath(16, 16, 8, accent)}${sparklePath(44, 42, 6, accent)}</pattern>`
    case "plain":
      return `<pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"></pattern>`
  }
}

function daisy(cx: number, cy: number, petal: string): string {
  const petals = [0, 60, 120, 180, 240, 300]
    .map(
      (deg) =>
        `<ellipse cx="${cx}" cy="${cy - 6}" rx="3.2" ry="5.5" fill="${petal}" transform="rotate(${deg} ${cx} ${cy})"/>`
    )
    .join("")
  return `${petals}<circle cx="${cx}" cy="${cy}" r="3.4" fill="#FB8C00"/>`
}

/** Four-point sparkle, matching the logo's star. */
export function sparklePath(
  cx: number,
  cy: number,
  r: number,
  fill: string
): string {
  const k = r * 0.22
  return `<path d="M${cx} ${cy - r} Q${cx + k} ${cy - k} ${cx + r} ${cy} Q${cx + k} ${cy + k} ${cx} ${cy + r} Q${cx - k} ${cy + k} ${cx - r} ${cy} Q${cx - k} ${cy - k} ${cx} ${cy - r} Z" fill="${fill}"/>`
}

export type GarmentRenderOptions = {
  kind: GarmentKind
  pattern: FabricPattern
  base: string
  accent: string
  /** Unique prefix for <defs> ids when several garments share a document. */
  idPrefix?: string
}

/** Garment markup (no <svg> wrapper) on the 400×400 artboard. */
export function garmentMarkup({
  kind,
  pattern,
  base,
  accent,
  idPrefix = "g",
}: GarmentRenderOptions): string {
  const shape = garments[kind]
  const shade = darken(base, 0.13)
  const tones = { shade, accent, base }
  const patId = `${idPrefix}-pat`
  const clipId = `${idPrefix}-clip`
  const shadow = (d: string) =>
    `<path d="${d}" fill="${INK}" transform="translate(9 9)"/>`

  const parts = [
    `<defs>${patternDef(patId, pattern, accent)}<clipPath id="${clipId}"><path d="${shape.body}"/></clipPath></defs>`,
    ...(shape.under ?? []).map((u) => shadow(u.d)),
    shadow(shape.body),
    ...(shape.under ?? []).map(
      (u) => `<path d="${u.d}" fill="${u.tone === "accent" ? accent : shade}"/>`
    ),
    `<path d="${shape.body}" fill="${base}"/>`,
    pattern === "plain"
      ? ""
      : `<path d="${shape.body}" fill="url(#${patId})"/>`,
    `<g clip-path="url(#${clipId})">${(shape.over ?? [])
      .map((o) => `<path d="${o.d}" fill="${tones[o.tone]}"/>`)
      .join("")}</g>`,
    `<g fill="none" stroke="${INK}" stroke-opacity=".32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${(
      shape.lines ?? []
    )
      .map((l) => `<path d="${l}"/>`)
      .join("")}</g>`,
    ...(shape.dots ?? []).map(
      ([cx, cy, r]) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${mix(accent, INK, 0.1)}" stroke="${INK}" stroke-opacity=".35" stroke-width="2"/>`
    ),
  ]
  return parts.join("")
}

export function garmentPegs(kind: GarmentKind): Array<[number, number]> {
  return garments[kind].pegs
}

/** Wooden clothes peg centred on (x, y). */
export function pegMarkup(x: number, y: number): string {
  return `<g transform="translate(${x - 7} ${y - 26})"><rect x="0" y="0" width="14" height="40" rx="5" fill="#C98A4B"/><rect x="0" y="0" width="14" height="40" rx="5" fill="none" stroke="${INK}" stroke-opacity=".35" stroke-width="2"/><rect x="5" y="14" width="4" height="10" rx="2" fill="${INK}" opacity=".35"/></g>`
}
