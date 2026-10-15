/**
 * Single source of truth for brand + contact details.
 * Everything user-facing (header, footer, SEO, JSON-LD, llms.txt) reads from here.
 */

const DEFAULT_SITE_URL = "https://little-malik.pages.dev"

function resolveSiteUrl(): string {
  const fromEnv =
    typeof import.meta.env !== "undefined"
      ? (import.meta.env.VITE_SITE_URL as string | undefined)
      : undefined
  const fromProcess =
    typeof process !== "undefined" ? process.env.VITE_SITE_URL : undefined
  return (fromEnv || fromProcess || DEFAULT_SITE_URL).replace(/\/+$/, "")
}

export const site = {
  name: "Little Malik",
  legalName: "Little Malik Kids Wear",
  tagline: "Baju anak yang nyaman untuk hari-hari cerah",
  description:
    "Little Malik adalah toko baju anak online dari Indonesia. Kaos, dress, romper, baju koko, gamis, dan aksesori berbahan katun lembut untuk usia 0–8 tahun. Pesan mudah lewat WhatsApp, kirim ke seluruh Indonesia.",
  url: resolveSiteUrl(),
  locale: "id_ID",
  language: "id",
  currency: "IDR",
  foundingYear: 2024,
  areaServed: "Indonesia",
  contact: {
    whatsapp: "6281220330128",
    whatsappDisplay: "+62 812-2033-0128",
    email: "littlemalik151@gmail.com",
  },
  social: {
    // TODO: replace with the real handle once the account exists.
    instagram: {
      handle: "@littlemalik.id",
      url: "https://instagram.com/littlemalik.id",
    },
  },
  hours: [
    { days: "Senin – Jumat", time: "08.00 – 20.00 WIB" },
    { days: "Sabtu – Minggu", time: "09.00 – 17.00 WIB" },
  ],
  openingHoursSpec: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    { days: ["Saturday", "Sunday"], opens: "09:00", closes: "17:00" },
  ],
} as const

export type Site = typeof site

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`
}
