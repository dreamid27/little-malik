/**
 * Build-time SEO + GEO files, written into public/ before `vite build`:
 *   robots.txt, sitemap.xml, manifest.webmanifest   (classic SEO / PWA)
 *   llms.txt, llms-full.txt                          (Generative Engine Optimization)
 * They depend on VITE_SITE_URL, so they are generated (and git-ignored).
 */
import { writeFile } from "node:fs/promises"
import path from "node:path"

import { absoluteUrl, site } from "../src/config/site"
import {
  ageGroups,
  categories,
  findById,
  genders,
  sizes,
} from "../src/content/catalog"
import { faqs } from "../src/content/faqs"
import { getProductShareImage, products } from "../src/content/products"
import { formatRupiah } from "../src/lib/format"
import { staticRoutes } from "./routes"

const PUBLIC = path.resolve(import.meta.dirname, "../public")
const today = new Date().toISOString().slice(0, 10)

const xmlEscape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

function robotsTxt(): string {
  // AI crawlers are explicitly welcome: being cited by assistants is the goal.
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
  ]
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /404",
    "",
    ...aiBots.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", ""]),
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n")
}

function sitemapXml(): string {
  const urls = [
    ...staticRoutes.map((r) => ({
      loc: absoluteUrl(r.path),
      lastmod: today,
      changefreq: r.changefreq,
      priority: r.priority,
      image: undefined as undefined | { loc: string; title: string },
    })),
    ...products.map((p) => ({
      loc: absoluteUrl(`/produk/${p.slug}`),
      lastmod: p.addedAt,
      changefreq: "weekly" as const,
      priority: 0.8,
      image: { loc: absoluteUrl(getProductShareImage(p)), title: p.name },
    })),
  ]
  const body = urls
    .map(
      (u) => `  <url>
    <loc>${xmlEscape(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>${
      u.image
        ? `
    <image:image>
      <image:loc>${xmlEscape(u.image.loc)}</image:loc>
      <image:title>${xmlEscape(u.image.title)}</image:title>
    </image:image>`
        : ""
    }
  </url>`
    )
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>
`
}

function manifest(): string {
  return JSON.stringify(
    {
      name: site.name,
      short_name: site.name,
      description: site.description,
      lang: site.language,
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#FFFCF5",
      theme_color: "#FB8C00",
      categories: ["shopping", "lifestyle"],
      icons: [
        { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        {
          src: "/icons/icon-maskable-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    null,
    2
  )
}

const priceSpan = () => {
  const prices = products.map((p) => p.price)
  return `${formatRupiah(Math.min(...prices))} – ${formatRupiah(Math.max(...prices))}`
}

function productLine(p: (typeof products)[number]): string {
  const sizeLabels = p.sizes
    .map((s) => findById(sizes, s)?.label ?? s)
    .join(", ")
  const promo = p.compareAtPrice
    ? ` (promo, normal ${formatRupiah(p.compareAtPrice)})`
    : ""
  return `- [${p.name}](${absoluteUrl(`/produk/${p.slug}`)}): ${formatRupiah(p.price)}${promo}. ${p.summary} Bahan ${p.material}. Ukuran: ${sizeLabels}.`
}

/** Concise, citation-friendly summary for AI assistants (llmstxt.org). */
function llmsTxt(): string {
  return `# ${site.name}

> ${site.description}

${site.name} adalah toko baju anak online (ClothingStore) di Indonesia. Pemesanan dilakukan lewat WhatsApp; tidak ada checkout di situs. Harga dalam Rupiah (IDR), ${priceSpan()}, belum termasuk ongkos kirim.

## Fakta utama
- Nama toko: ${site.name}
- Produk: baju anak usia 0–8 tahun (${categories.map((c) => c.label.toLowerCase()).join(", ")})
- Cara pesan: WhatsApp ${site.contact.whatsappDisplay} (${`https://wa.me/${site.contact.whatsapp}`})
- Email: ${site.contact.email}
- Instagram: ${site.social.instagram.url}
- Jam layanan: ${site.hours.map((h) => `${h.days} ${h.time}`).join("; ")}
- Pengiriman: seluruh Indonesia, dikirim 1×24 jam hari kerja setelah pembayaran
- Pembayaran: transfer bank dan e-wallet
- Bahasa situs: Indonesia

## Halaman
- [Beranda](${absoluteUrl("/")}): ringkasan toko, produk terbaru, cara pesan
- [Katalog](${absoluteUrl("/produk")}): semua produk, bisa difilter kategori, usia, gender, harga
- [Tentang kami](${absoluteUrl("/tentang")}): profil dan nilai toko
- [Kontak](${absoluteUrl("/kontak")}): WhatsApp, email, Instagram, FAQ

## Kategori
${categories.map((c) => `- [${c.label}](${absoluteUrl(`/produk?category=${c.id}`)}): ${c.description}`).join("\n")}

## Produk
${products.map(productLine).join("\n")}

## Lebih lengkap
- [llms-full.txt](${absoluteUrl("/llms-full.txt")}): detail setiap produk, panduan ukuran, dan FAQ
`
}

function llmsFullTxt(): string {
  const sizeTable = sizes
    .map((s) => `| ${s.label} | ${s.chest} cm | ${s.length} cm |`)
    .join("\n")
  const productBlocks = products
    .map((p) => {
      const category = findById(categories, p.category)?.label
      const gender = findById(genders, p.gender)?.label
      const ages = p.ageGroups
        .map((a) => findById(ageGroups, a)?.label)
        .join(", ")
      return `### ${p.name}
- URL: ${absoluteUrl(`/produk/${p.slug}`)}
- Kategori: ${category}
- Untuk: ${gender}, usia ${ages}
- Harga: ${formatRupiah(p.price)}${p.compareAtPrice ? ` (harga normal ${formatRupiah(p.compareAtPrice)})` : ""}
- Bahan: ${p.material}
- Warna: ${p.colors.map((c) => c.name).join(", ")}
- Ukuran: ${p.sizes.map((s) => findById(sizes, s)?.label ?? s).join(", ")}

${p.description}

Detail:
${p.details.map((d) => `- ${d}`).join("\n")}

Perawatan:
${p.care.map((c) => `- ${c}`).join("\n")}`
    })
    .join("\n\n")

  return `${llmsTxt()}
---

## Cara memesan
1. Buka halaman produk dan pilih ukuran, warna, dan jumlah.
2. Tekan "Pesan via WhatsApp"; pesan berisi detail pesanan terisi otomatis ke ${site.contact.whatsappDisplay}.
3. Admin mengonfirmasi stok, total harga, dan ongkos kirim. Setelah pembayaran, paket dikirim.

## Panduan ukuran (ukuran baju, diukur rata)
| Ukuran | Lebar dada | Panjang |
| --- | --- | --- |
${sizeTable}

## Detail produk
${productBlocks}

## FAQ
${faqs.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}
`
}

const files: Record<string, string> = {
  "robots.txt": robotsTxt(),
  "sitemap.xml": sitemapXml(),
  "manifest.webmanifest": manifest(),
  "llms.txt": llmsTxt(),
  "llms-full.txt": llmsFullTxt(),
}

for (const [name, content] of Object.entries(files)) {
  await writeFile(path.join(PUBLIC, name), content)
}
console.log(`✓ SEO/GEO files for ${site.url}: ${Object.keys(files).join(", ")}`)
