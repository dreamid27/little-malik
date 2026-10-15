const PAPER = "#FFFCF5"
const SKY = "#CFE8F3"

function toRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ]
}

function toHex(rgb: ReadonlyArray<number>): string {
  return `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`
}

export function mixHex(a: string, b: string, t: number): string {
  const pa = toRgb(a)
  const pb = toRgb(b)
  return toHex(pa.map((v, i) => v + (pb[i] - v) * t))
}

/** Relative luminance (WCAG). */
export function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Soft backdrop behind a product illustration. Very light garments sit on
 * sky so they never vanish into the paper background.
 */
export function backdropFor(garmentHex: string): string {
  if (luminance(garmentHex) > 0.78) return SKY
  return mixHex(garmentHex, PAPER, 0.78)
}
