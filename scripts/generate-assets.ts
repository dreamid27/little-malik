/**
 * Generates every static image asset from code + the source logo:
 *   - product illustrations   public/images/products/{slug}-{1,2,3}.svg + -share.jpg
 *   - brand icons              public/favicon.svg, favicon.ico, icons/*.png
 *   - logo variants            public/images/brand/logo.{png,webp}
 *   - social share image       public/images/og-default.jpg
 *
 * Run with `bun run assets` after changing products or the logo.
 */
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

import { products } from "../src/content/products"
import { backdropFor } from "../src/lib/color"
import {
  INK,
  garmentMarkup,
  garmentPegs,
  pegMarkup,
  sparklePath,
} from "./art/garments"

const ROOT = path.resolve(import.meta.dirname, "..")
const PUBLIC = path.join(ROOT, "public")
const LOGO_SOURCE = path.join(ROOT, "assets/brand/logo-source.png")

const PAPER = "#FFFCF5"
const SUN = "#FDC73E"
const MARIGOLD = "#FB8C00"
const SKY = "#CFE8F3"
const BUTTER = "#FEF0B9"

/** Peg height (artboard units) shared by every `-hang.svg`. */
const HANG_PEG_Y = 40

const svg = (viewBox: string, body: string, extra = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${extra}>${body}</svg>`

/* ------------------------------------------------------------------ */
/* Brand mark: the smiling sun from the logo                           */
/* ------------------------------------------------------------------ */

export function sunMark(cx: number, cy: number, r: number): string {
  const rays = Array.from({ length: 10 }, (_, i) => {
    const deg = i * 36
    return `<rect x="${cx - r * 0.12}" y="${cy - r * 1.42}" width="${r * 0.24}" height="${r * 0.42}" rx="${r * 0.12}" fill="${SUN}" transform="rotate(${deg} ${cx} ${cy})"/>`
  }).join("")
  const eye = (x: number) =>
    `<ellipse cx="${x}" cy="${cy - r * 0.08}" rx="${r * 0.085}" ry="${r * 0.12}" fill="${INK}"/>`
  return `${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${SUN}"/>${eye(cx - r * 0.36)}${eye(cx + r * 0.36)}<path d="M${cx - r * 0.24} ${cy + r * 0.18} Q${cx} ${cy + r * 0.52} ${cx + r * 0.24} ${cy + r * 0.18}" fill="none" stroke="${INK}" stroke-width="${r * 0.1}" stroke-linecap="round"/>`
}

function cloud(x: number, y: number, s: number, fill: string): string {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}"><circle cx="40" cy="40" r="28"/><circle cx="80" cy="30" r="36"/><circle cx="122" cy="44" r="26"/><rect x="40" y="40" width="82" height="30"/></g>`
}

/* ------------------------------------------------------------------ */
/* Product illustrations                                               */
/* ------------------------------------------------------------------ */

function hangerMarkup(): string {
  return `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M200 70 Q200 40 216 36 Q232 34 232 50" stroke="${INK}" stroke-opacity=".55" stroke-width="7"/><path d="M200 70 L82 118 Q70 124 80 128 L320 128 Q330 124 318 118 Z" stroke="#C98A4B" stroke-width="12" fill="none"/></g>`
}

function decorations(seed: number, color: string): string {
  const spots: Array<[number, number, number]> = [
    [52, 60, 14],
    [356, 84, 10],
    [340, 352, 16],
    [60, 340, 9],
  ]
  return spots
    .filter((_, i) => (seed + i) % 2 === 0)
    .map(([x, y, r]) => sparklePath(x, y, r, color))
    .join("")
}

async function writeProductArt() {
  const dir = path.join(PUBLIC, "images/products")
  await mkdir(dir, { recursive: true })

  for (const [index, product] of products.entries()) {
    const { art } = product
    const garment = (id: string) => garmentMarkup({ ...art, idPrefix: id })
    const sparkleColor = art.base === SUN ? MARIGOLD : SUN

    const front = svg(
      "0 0 420 420",
      `${decorations(index, sparkleColor)}<g transform="translate(6 4)">${garment("f")}</g>`
    )
    const onHanger = svg(
      "0 0 420 420",
      `<g transform="translate(10 0)">${hangerMarkup()}<g transform="translate(40 66) scale(.8)">${garment("h")}</g></g>`
    )
    const detail = svg("100 120 210 210", garment("d"))
    // Clothesline variant: pegs baked in, top peg normalised to y=40 so the
    // hero can align every garment to the rope with the same offset.
    const pegs = garmentPegs(art.kind)
    const lift = Math.min(...pegs.map(([, y]) => y)) - HANG_PEG_Y
    const hanging = svg(
      "0 0 420 420",
      `<g transform="translate(10 ${-lift})">${garment("c")}${pegs.map(([x, y]) => pegMarkup(x, y)).join("")}</g>`
    )

    await writeFile(path.join(dir, `${product.slug}-1.svg`), front)
    await writeFile(path.join(dir, `${product.slug}-2.svg`), onHanger)
    await writeFile(path.join(dir, `${product.slug}-3.svg`), detail)
    await writeFile(path.join(dir, `${product.slug}-hang.svg`), hanging)

    const backdrop = backdropFor(art.base)
    const share = svg(
      "0 0 1200 1200",
      `<rect width="1200" height="1200" fill="${backdrop}"/>${cloud(860, 120, 1.6, PAPER)}${sunMark(180, 190, 70)}<g transform="translate(190 200) scale(2.05)">${garment("s")}</g>`
    )
    await sharp(Buffer.from(share))
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(dir, `${product.slug}-share.jpg`))
  }
  console.log(`✓ product art for ${products.length} products`)
}

/* ------------------------------------------------------------------ */
/* Favicons + PWA icons                                                */
/* ------------------------------------------------------------------ */

const faviconSvg = svg(
  "0 0 64 64",
  `<rect width="64" height="64" rx="16" fill="${BUTTER}"/>${sunMark(32, 33, 15)}`
)
const maskableSvg = svg(
  "0 0 512 512",
  `<rect width="512" height="512" fill="${BUTTER}"/>${sunMark(256, 262, 110)}`
)

/** Minimal ICO container with embedded PNG frames. */
function buildIco(frames: Array<{ size: number; png: Buffer }>): Buffer {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(frames.length, 4)
  const entries: Array<Buffer> = []
  let offset = 6 + frames.length * 16
  for (const { size, png } of frames) {
    const e = Buffer.alloc(16)
    e.writeUInt8(size >= 256 ? 0 : size, 0)
    e.writeUInt8(size >= 256 ? 0 : size, 1)
    e.writeUInt8(0, 2)
    e.writeUInt8(0, 3)
    e.writeUInt16LE(1, 4)
    e.writeUInt16LE(32, 6)
    e.writeUInt32LE(png.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += png.length
    entries.push(e)
  }
  return Buffer.concat([header, ...entries, ...frames.map((f) => f.png)])
}

async function writeIcons() {
  const iconsDir = path.join(PUBLIC, "icons")
  await mkdir(iconsDir, { recursive: true })
  await writeFile(path.join(PUBLIC, "favicon.svg"), faviconSvg)

  const render = (src: string, size: number) =>
    sharp(Buffer.from(src), { density: 384 })
      .resize(size, size)
      .png()
      .toBuffer()

  const ico = buildIco(
    await Promise.all(
      [16, 32, 48].map(async (size) => ({
        size,
        png: await render(faviconSvg, size),
      }))
    )
  )
  await writeFile(path.join(PUBLIC, "favicon.ico"), ico)
  await writeFile(
    path.join(iconsDir, "apple-touch-icon.png"),
    await render(maskableSvg, 180)
  )
  for (const size of [192, 512]) {
    await writeFile(
      path.join(iconsDir, `icon-${size}.png`),
      await render(faviconSvg, size)
    )
    await writeFile(
      path.join(iconsDir, `icon-maskable-${size}.png`),
      await render(maskableSvg, size)
    )
  }
  console.log("✓ favicons + app icons")
}

/* ------------------------------------------------------------------ */
/* Logo variants + Open Graph                                          */
/* ------------------------------------------------------------------ */

/** The source logo ships on an opaque white square — make it transparent. */
async function keyOutWhite(file: string): Promise<Buffer> {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const LO = 228
  for (let i = 0; i < data.length; i += 4) {
    const minChannel = Math.min(data[i], data[i + 1], data[i + 2])
    if (minChannel > LO) {
      const t = (minChannel - LO) / (255 - LO)
      data[i + 3] = Math.round(data[i + 3] * (1 - t))
    }
  }
  return sharp(data, { raw: info }).png().toBuffer()
}

async function writeLogo(): Promise<Buffer> {
  const dir = path.join(PUBLIC, "images/brand")
  await mkdir(dir, { recursive: true })
  const trimmed = await sharp(await keyOutWhite(LOGO_SOURCE))
    .trim({ threshold: 10 })
    .toBuffer()
  await sharp(trimmed)
    .resize({ width: 480 })
    .webp({ quality: 88 })
    .toFile(path.join(dir, "logo.webp"))
  await sharp(trimmed)
    .resize({ width: 480 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, "logo.png"))
  await sharp(trimmed)
    .resize({ width: 1024 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, "logo-1024.png"))
  console.log("✓ logo variants")
  return trimmed
}

async function writeOgImage(logo: Buffer) {
  const lineY = 250
  const picks = [
    "kaos-matahari-kecil",
    "romper-garis-laut",
    "dress-polkadot-senja",
  ]
  const hung = picks
    .map((slug, i) => {
      const p = products.find((x) => x.slug === slug)
      if (!p) return ""
      const scale = 0.62
      const x = 640 + i * 175
      const pegs = garmentPegs(p.art.kind)
      const topY = Math.min(...pegs.map(([, y]) => y))
      const y = lineY - topY * scale + 6
      const rot = [-3, 2, -2][i]
      return `<g transform="translate(${x} ${y}) rotate(${rot} 200 0) scale(${scale})">${garmentMarkup({ ...p.art, idPrefix: `og${i}` })}${pegs.map(([px, py]) => pegMarkup(px, py)).join("")}</g>`
    })
    .join("")

  const bg = svg(
    "0 0 1200 630",
    `<rect width="1200" height="630" fill="${SKY}"/>${cloud(90, 470, 2.2, BUTTER)}${cloud(860, 500, 2.4, PAPER)}${sunMark(1080, 110, 54)}<path d="M600 ${lineY - 26} Q890 ${lineY + 30} 1200 ${lineY - 40}" fill="none" stroke="${INK}" stroke-opacity=".6" stroke-width="4"/>${hung}`,
    ' width="1200" height="630"'
  )
  const logoPng = await sharp(logo).resize({ width: 520 }).png().toBuffer()
  const meta = await sharp(logoPng).metadata()
  await sharp(Buffer.from(bg))
    .composite([
      {
        input: logoPng,
        left: 60,
        top: Math.round((630 - meta.height) / 2) - 10,
      },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(PUBLIC, "images/og-default.jpg"))
  console.log("✓ og-default.jpg")
}

await writeProductArt()
await writeIcons()
await writeOgImage(await writeLogo())
