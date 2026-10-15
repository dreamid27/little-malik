import type {
  AgeGroupId,
  CategoryId,
  GenderId,
  SizeId,
} from "@/content/catalog"

export type GarmentKind =
  | "tee"
  | "shirt"
  | "hoodie"
  | "shorts"
  | "joggers"
  | "skirt"
  | "dress"
  | "romper"
  | "overall"
  | "koko"
  | "gamis"
  | "bucket-hat"

export type FabricPattern =
  "plain" | "stripes" | "dots" | "gingham" | "daisies" | "sparkles"

export type ProductColor = { name: string; hex: string }

export type Product = {
  slug: string
  name: string
  category: CategoryId
  gender: GenderId
  ageGroups: ReadonlyArray<AgeGroupId>
  sizes: ReadonlyArray<SizeId>
  colors: ReadonlyArray<ProductColor>
  price: number
  /** Original price when the item is on promo. */
  compareAtPrice?: number
  material: string
  summary: string
  description: string
  details: ReadonlyArray<string>
  care: ReadonlyArray<string>
  isNew?: boolean
  isBestSeller?: boolean
  /** ISO date — used for "newest" sort and sitemap lastmod. */
  addedAt: string
  /**
   * Spec for the generated placeholder illustration (`bun run art`).
   * Set `images` to real photo paths to override.
   */
  art: {
    kind: GarmentKind
    pattern: FabricPattern
    base: string
    accent: string
  }
  images?: ReadonlyArray<string>
}

const careCotton = [
  "Cuci dengan air dingin, maksimal 30°C",
  "Jangan gunakan pemutih",
  "Jemur terbalik, hindari matahari terik langsung",
  "Setrika suhu rendah",
]

export const products: ReadonlyArray<Product> = [
  {
    slug: "kaos-matahari-kecil",
    name: "Kaos Matahari Kecil",
    category: "atasan",
    gender: "unisex",
    ageGroups: ["balita", "anak"],
    sizes: ["1y", "2y", "3y", "4y", "5y", "6y"],
    colors: [
      { name: "Kuning Bunga Matahari", hex: "#FDC73E" },
      { name: "Langit", hex: "#CFE8F3" },
    ],
    price: 89_000,
    material: "Katun combed 30s",
    summary: "Kaos harian bermotif garis yang adem dan menyerap keringat.",
    description:
      "Kaos andalan untuk main di luar. Katun combed 30s yang tipis dan adem, jahitan leher rib yang tidak gampang melar, dan potongan sedikit longgar supaya si kecil bebas bergerak.",
    details: [
      "Katun combed 30s, adem dan menyerap keringat",
      "Leher rib elastis, tidak mudah melar",
      "Sablon water-based yang aman untuk kulit",
    ],
    care: careCotton,
    isBestSeller: true,
    addedAt: "2026-07-02",
    art: {
      kind: "tee",
      pattern: "stripes",
      base: "#FDC73E",
      accent: "#FFFCF5",
    },
  },
  {
    slug: "kemeja-kotak-piknik",
    name: "Kemeja Kotak Piknik",
    category: "atasan",
    gender: "laki-laki",
    ageGroups: ["balita", "anak"],
    sizes: ["2y", "3y", "4y", "5y", "6y", "8y"],
    colors: [
      { name: "Oranye Marigold", hex: "#FB8C00" },
      { name: "Hijau Sage", hex: "#A9C6A0" },
    ],
    price: 129_000,
    compareAtPrice: 149_000,
    material: "Katun gingham yarn-dyed",
    summary: "Kemeja kotak-kotak lengan pendek untuk acara santai.",
    description:
      "Kemeja motif kotak yang cocok untuk piknik, kondangan santai, atau foto keluarga. Kain yarn-dyed sehingga warnanya tidak cepat pudar walau sering dicuci.",
    details: [
      "Kain gingham yarn-dyed, warna awet",
      "Kancing batok yang mudah dibuka-tutup",
      "Kerah bulat yang lembut di leher",
    ],
    care: careCotton,
    addedAt: "2026-05-18",
    art: {
      kind: "shirt",
      pattern: "gingham",
      base: "#FB8C00",
      accent: "#FFFCF5",
    },
  },
  {
    slug: "hoodie-awan-lembut",
    name: "Hoodie Awan Lembut",
    category: "atasan",
    gender: "unisex",
    ageGroups: ["balita", "anak"],
    sizes: ["2y", "3y", "4y", "5y", "6y", "8y"],
    colors: [
      { name: "Langit", hex: "#CFE8F3" },
      { name: "Krem Mentega", hex: "#FEF0B9" },
    ],
    price: 189_000,
    material: "Fleece katun ringan",
    summary: "Hoodie hangat untuk pagi berangin dan ruangan ber-AC.",
    description:
      "Hoodie fleece ringan yang hangat tanpa bikin gerah. Kantong kanguru untuk menyimpan harta karun kecil, dan tudung tanpa tali supaya lebih aman untuk anak.",
    details: [
      "Fleece katun ringan, hangat tapi tidak gerah",
      "Tudung tanpa tali serut, lebih aman untuk anak",
      "Kantong kanguru di depan",
    ],
    care: careCotton,
    isNew: true,
    addedAt: "2026-09-20",
    art: {
      kind: "hoodie",
      pattern: "plain",
      base: "#CFE8F3",
      accent: "#1E6B86",
    },
  },
  {
    slug: "celana-pendek-pantai",
    name: "Celana Pendek Pantai",
    category: "bawahan",
    gender: "laki-laki",
    ageGroups: ["balita", "anak"],
    sizes: ["1y", "2y", "3y", "4y", "5y", "6y"],
    colors: [
      { name: "Biru Laguna", hex: "#1E6B86" },
      { name: "Krem Oat", hex: "#EFE3CC" },
    ],
    price: 79_000,
    material: "Katun twill ringan",
    summary: "Celana pendek pinggang karet untuk main pasir dan air.",
    description:
      "Celana pendek dengan pinggang karet penuh yang gampang dipakai sendiri. Bahan twill ringan yang cepat kering, pas untuk liburan ke pantai.",
    details: [
      "Pinggang karet penuh, mudah dipakai sendiri",
      "Twill ringan dan cepat kering",
      "Dua saku samping",
    ],
    care: careCotton,
    addedAt: "2026-06-11",
    art: {
      kind: "shorts",
      pattern: "plain",
      base: "#1E6B86",
      accent: "#FDC73E",
    },
  },
  {
    slug: "jogger-petualang",
    name: "Jogger Petualang",
    category: "bawahan",
    gender: "unisex",
    ageGroups: ["balita", "anak"],
    sizes: ["2y", "3y", "4y", "5y", "6y", "8y"],
    colors: [
      { name: "Hijau Sage", hex: "#A9C6A0" },
      { name: "Cokelat Kayu", hex: "#9A3B2E" },
    ],
    price: 119_000,
    material: "Katun french terry",
    summary: "Celana jogger panjang dengan ujung rib yang rapi.",
    description:
      "Jogger french terry untuk anak yang tidak bisa diam. Ujung kaki rib supaya tidak terseret, lutut tetap leluasa untuk memanjat dan berlari.",
    details: [
      "French terry lembut, tidak kaku",
      "Ujung kaki rib, tidak terseret",
      "Tali serut di pinggang untuk penyesuaian",
    ],
    care: careCotton,
    isNew: true,
    addedAt: "2026-09-05",
    art: {
      kind: "joggers",
      pattern: "plain",
      base: "#A9C6A0",
      accent: "#3B2416",
    },
  },
  {
    slug: "rok-bunga-daisy",
    name: "Rok Bunga Daisy",
    category: "bawahan",
    gender: "perempuan",
    ageGroups: ["balita", "anak"],
    sizes: ["2y", "3y", "4y", "5y", "6y"],
    colors: [
      { name: "Merah Muda Blush", hex: "#F6C9C0" },
      { name: "Krem Mentega", hex: "#FEF0B9" },
    ],
    price: 99_000,
    material: "Katun poplin",
    summary: "Rok A-line motif daisy dengan celana dalam terpasang.",
    description:
      "Rok A-line bermotif bunga daisy yang manis. Sudah dilengkapi celana pendek di dalam, jadi si kecil bebas berputar dan bermain tanpa khawatir.",
    details: [
      "Katun poplin halus",
      "Celana pendek dalam sudah terpasang",
      "Pinggang karet yang nyaman",
    ],
    care: careCotton,
    addedAt: "2026-04-22",
    art: {
      kind: "skirt",
      pattern: "daisies",
      base: "#F6C9C0",
      accent: "#FFFCF5",
    },
  },
  {
    slug: "dress-kebun-bunga",
    name: "Dress Kebun Bunga",
    category: "dress",
    gender: "perempuan",
    ageGroups: ["balita", "anak"],
    sizes: ["1y", "2y", "3y", "4y", "5y", "6y", "8y"],
    colors: [
      { name: "Kuning Bunga Matahari", hex: "#FDC73E" },
      { name: "Merah Muda Blush", hex: "#F6C9C0" },
    ],
    price: 169_000,
    compareAtPrice: 199_000,
    material: "Katun rayon",
    summary: "Dress lengan balon bermotif daisy untuk hari spesial.",
    description:
      "Dress katun rayon yang jatuh dan ringan dengan lengan balon. Kancing di belakang untuk kemudahan memakai, panjang di bawah lutut supaya tetap sopan saat bermain.",
    details: [
      "Katun rayon yang jatuh dan adem",
      "Lengan balon dengan karet lembut",
      "Kancing belakang, panjang di bawah lutut",
    ],
    care: careCotton,
    isBestSeller: true,
    addedAt: "2026-06-28",
    art: {
      kind: "dress",
      pattern: "daisies",
      base: "#FDC73E",
      accent: "#FFFCF5",
    },
  },
  {
    slug: "dress-polkadot-senja",
    name: "Dress Polkadot Senja",
    category: "dress",
    gender: "perempuan",
    ageGroups: ["balita", "anak"],
    sizes: ["2y", "3y", "4y", "5y", "6y"],
    colors: [{ name: "Merah Bata", hex: "#9A3B2E" }],
    price: 159_000,
    material: "Katun poplin",
    summary: "Dress polkadot warna senja dengan kerah bulat.",
    description:
      "Dress polkadot dengan warna merah bata yang hangat. Kerah bulat yang rapi, potongan A-line, dan saku tersembunyi di samping.",
    details: [
      "Katun poplin halus dan tidak menerawang",
      "Saku tersembunyi di sisi samping",
      "Potongan A-line yang leluasa",
    ],
    care: careCotton,
    isNew: true,
    addedAt: "2026-09-28",
    art: { kind: "dress", pattern: "dots", base: "#9A3B2E", accent: "#FEF0B9" },
  },
  {
    slug: "romper-pagi-cerah",
    name: "Romper Pagi Cerah",
    category: "bayi",
    gender: "unisex",
    ageGroups: ["bayi"],
    sizes: ["0-3m", "3-6m", "6-12m"],
    colors: [
      { name: "Krem Mentega", hex: "#FEF0B9" },
      { name: "Hijau Sage", hex: "#A9C6A0" },
    ],
    price: 99_000,
    material: "Katun organik interlock",
    summary: "Romper katun organik dengan kancing jepret di bawah.",
    description:
      "Romper untuk bayi dari katun organik interlock yang sangat lembut. Kancing jepret di bawah memudahkan ganti popok tanpa harus melepas semuanya.",
    details: [
      "Katun organik interlock, sangat lembut",
      "Kancing jepret bebas nikel",
      "Label dicetak, tidak menggaruk kulit",
    ],
    care: careCotton,
    isBestSeller: true,
    addedAt: "2026-03-14",
    art: {
      kind: "romper",
      pattern: "sparkles",
      base: "#FEF0B9",
      accent: "#FB8C00",
    },
  },
  {
    slug: "romper-garis-laut",
    name: "Romper Garis Laut",
    category: "bayi",
    gender: "laki-laki",
    ageGroups: ["bayi"],
    sizes: ["0-3m", "3-6m", "6-12m", "1y"],
    colors: [{ name: "Langit", hex: "#CFE8F3" }],
    price: 89_000,
    compareAtPrice: 109_000,
    material: "Katun organik interlock",
    summary: "Romper garis biru yang segar untuk si kecil.",
    description:
      "Romper motif garis-garis biru laut, lembut dan elastis. Kancing jepret di bahu dan di bawah memudahkan Bunda saat memakaikan.",
    details: [
      "Katun organik interlock",
      "Kancing jepret di bahu dan bawah",
      "Jahitan rata, nyaman untuk kulit bayi",
    ],
    care: careCotton,
    addedAt: "2026-05-02",
    art: {
      kind: "romper",
      pattern: "stripes",
      base: "#CFE8F3",
      accent: "#1E6B86",
    },
  },
  {
    slug: "overall-kebun-kecil",
    name: "Overall Kebun Kecil",
    category: "bayi",
    gender: "unisex",
    ageGroups: ["bayi", "balita"],
    sizes: ["6-12m", "1y", "2y", "3y"],
    colors: [
      { name: "Cokelat Kayu", hex: "#9A3B2E" },
      { name: "Oranye Marigold", hex: "#FB8C00" },
    ],
    price: 149_000,
    material: "Katun corduroy halus",
    summary: "Overall corduroy dengan tali yang bisa disesuaikan.",
    description:
      "Overall corduroy halus yang menggemaskan. Tali bahu bisa disesuaikan sehingga bisa dipakai lebih lama seiring si kecil tumbuh.",
    details: [
      "Corduroy halus, tidak kaku",
      "Tali bahu bisa disesuaikan",
      "Kancing jepret di selangkangan",
    ],
    care: careCotton,
    addedAt: "2026-08-10",
    art: {
      kind: "overall",
      pattern: "plain",
      base: "#9A3B2E",
      accent: "#FDC73E",
    },
  },
  {
    slug: "baju-koko-malik",
    name: "Baju Koko Malik",
    category: "muslim",
    gender: "laki-laki",
    ageGroups: ["balita", "anak"],
    sizes: ["2y", "3y", "4y", "5y", "6y", "8y"],
    colors: [
      { name: "Putih Gading", hex: "#FFF8EC" },
      { name: "Hijau Sage", hex: "#A9C6A0" },
    ],
    price: 149_000,
    material: "Katun toyobo",
    summary: "Baju koko lengan panjang dengan bordir halus di depan.",
    description:
      "Baju koko andalan untuk Jumatan, mengaji, dan Lebaran. Katun toyobo yang adem, kerah shanghai, dan bordir halus di sepanjang kancing depan.",
    details: [
      "Katun toyobo, adem dan tidak mudah kusut",
      "Kerah shanghai dan bordir di depan",
      "Lengan panjang dengan manset kancing",
    ],
    care: careCotton,
    isBestSeller: true,
    addedAt: "2026-02-20",
    art: { kind: "koko", pattern: "plain", base: "#FFF8EC", accent: "#C9A227" },
  },
  {
    slug: "gamis-mentari",
    name: "Gamis Mentari",
    category: "muslim",
    gender: "perempuan",
    ageGroups: ["balita", "anak"],
    sizes: ["2y", "3y", "4y", "5y", "6y", "8y"],
    colors: [
      { name: "Merah Muda Blush", hex: "#F6C9C0" },
      { name: "Langit", hex: "#CFE8F3" },
    ],
    price: 199_000,
    material: "Katun rayon premium",
    summary: "Gamis anak berbahan rayon adem dengan pita di pinggang.",
    description:
      "Gamis panjang yang jatuh dan adem dengan pita di pinggang. Lengan panjang dengan karet di ujung supaya tidak mengganggu saat berwudu.",
    details: [
      "Katun rayon premium, adem dan jatuh",
      "Pita pinggang yang bisa diikat",
      "Ujung lengan berkaret, praktis untuk wudu",
    ],
    care: careCotton,
    isNew: true,
    addedAt: "2026-09-12",
    art: {
      kind: "gamis",
      pattern: "plain",
      base: "#F6C9C0",
      accent: "#9A3B2E",
    },
  },
  {
    slug: "topi-bucket-jerami",
    name: "Topi Bucket Jerami",
    category: "aksesori",
    gender: "unisex",
    ageGroups: ["bayi", "balita", "anak"],
    sizes: ["6-12m", "2y", "4y", "6y"],
    colors: [{ name: "Jerami", hex: "#FDE79A" }],
    price: 69_000,
    material: "Katun kanvas",
    summary: "Topi bucket bertali dagu, terinspirasi topi jerami Malik.",
    description:
      "Topi bucket kanvas dengan pita merah dan tali dagu yang bisa dilepas. Melindungi wajah si kecil dari matahari saat main di luar.",
    details: [
      "Kanvas katun yang kokoh",
      "Tali dagu bisa dilepas",
      "Pinggiran lebar untuk melindungi dari matahari",
    ],
    care: ["Cuci tangan dengan air dingin", "Jemur di tempat teduh"],
    isBestSeller: true,
    addedAt: "2026-04-01",
    art: {
      kind: "bucket-hat",
      pattern: "gingham",
      base: "#FDE79A",
      accent: "#F2B52A",
    },
  },
  {
    slug: "kaos-bintang-kecil",
    name: "Kaos Bintang Kecil",
    category: "atasan",
    gender: "perempuan",
    ageGroups: ["balita", "anak"],
    sizes: ["1y", "2y", "3y", "4y", "5y"],
    colors: [{ name: "Merah Muda Blush", hex: "#F6C9C0" }],
    price: 59_000,
    compareAtPrice: 79_000,
    material: "Katun combed 30s",
    summary: "Kaos bermotif bintang kecil yang ceria.",
    description:
      "Kaos ringan dengan motif bintang-bintang kecil. Bahan katun combed yang adem untuk dipakai sehari-hari di iklim tropis.",
    details: [
      "Katun combed 30s",
      "Motif bintang yang dicetak, tidak luntur",
      "Potongan reguler yang nyaman",
    ],
    care: careCotton,
    addedAt: "2026-03-30",
    art: {
      kind: "tee",
      pattern: "sparkles",
      base: "#F6C9C0",
      accent: "#FB8C00",
    },
  },
  {
    slug: "setelan-tidur-awan",
    name: "Setelan Tidur Awan",
    category: "atasan",
    gender: "unisex",
    ageGroups: ["balita", "anak"],
    sizes: ["2y", "3y", "4y", "5y", "6y"],
    colors: [{ name: "Langit", hex: "#CFE8F3" }],
    price: 139_000,
    material: "Katun rib stretch",
    summary: "Atasan tidur polkadot yang lembut untuk tidur nyenyak.",
    description:
      "Atasan tidur lengan panjang bermotif titik-titik seperti awan kecil. Katun rib yang stretch mengikuti gerak si kecil sepanjang malam.",
    details: [
      "Katun rib stretch",
      "Tidak ada kancing atau aplikasi yang mengganjal",
      "Cocok untuk ruangan ber-AC",
    ],
    care: careCotton,
    addedAt: "2026-08-24",
    art: {
      kind: "hoodie",
      pattern: "dots",
      base: "#CFE8F3",
      accent: "#FFFCF5",
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductImages(product: Product): ReadonlyArray<string> {
  if (product.images && product.images.length > 0) return product.images
  return [1, 2, 3].map((n) => `/images/products/${product.slug}-${n}.svg`)
}

/** Raster version used for Open Graph / JSON-LD where SVG is not accepted. */
export function getProductShareImage(product: Product): string {
  return `/images/products/${product.slug}-share.jpg`
}

export function getRelatedProducts(
  product: Product,
  limit = 4
): ReadonlyArray<Product> {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  )
  const others = products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.category !== product.category &&
      p.ageGroups.some((a) => product.ageGroups.includes(a))
  )
  return [...sameCategory, ...others].slice(0, limit)
}
