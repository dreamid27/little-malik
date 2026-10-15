/**
 * Catalog taxonomy: categories, age groups, sizes, price ranges.
 * Keep ids URL-safe — they are used directly in search params.
 */

export const categories = [
  {
    id: "atasan",
    label: "Atasan",
    description: "Kaos, kemeja, dan hoodie untuk main seharian.",
  },
  {
    id: "bawahan",
    label: "Bawahan",
    description: "Celana pendek, jogger, dan rok yang leluasa bergerak.",
  },
  {
    id: "dress",
    label: "Dress",
    description: "Dress katun ringan untuk jalan-jalan dan acara keluarga.",
  },
  {
    id: "bayi",
    label: "Bayi",
    description: "Romper dan jumper lembut untuk si kecil 0–12 bulan.",
  },
  {
    id: "muslim",
    label: "Muslim",
    description: "Baju koko dan gamis untuk mengaji, Jumatan, dan Lebaran.",
  },
  {
    id: "aksesori",
    label: "Aksesori",
    description: "Topi bucket dan pelengkap gaya si kecil.",
  },
] as const

export type CategoryId = (typeof categories)[number]["id"]
export const categoryIds = categories.map((c) => c.id) as [
  CategoryId,
  ...Array<CategoryId>,
]

export const ageGroups = [
  { id: "bayi", label: "0–12 bulan", short: "Bayi" },
  { id: "balita", label: "1–3 tahun", short: "Balita" },
  { id: "anak", label: "4–8 tahun", short: "Anak" },
] as const

export type AgeGroupId = (typeof ageGroups)[number]["id"]
export const ageGroupIds = ageGroups.map((a) => a.id) as [
  AgeGroupId,
  ...Array<AgeGroupId>,
]

export const genders = [
  { id: "laki-laki", label: "Laki-laki" },
  { id: "perempuan", label: "Perempuan" },
  { id: "unisex", label: "Unisex" },
] as const

export type GenderId = (typeof genders)[number]["id"]
export const genderIds = genders.map((g) => g.id) as [
  GenderId,
  ...Array<GenderId>,
]

export const sizes = [
  { id: "0-3m", label: "0–3 bln", chest: 40, length: 32 },
  { id: "3-6m", label: "3–6 bln", chest: 42, length: 35 },
  { id: "6-12m", label: "6–12 bln", chest: 45, length: 38 },
  { id: "1y", label: "1 th", chest: 50, length: 40 },
  { id: "2y", label: "2 th", chest: 53, length: 43 },
  { id: "3y", label: "3 th", chest: 56, length: 46 },
  { id: "4y", label: "4 th", chest: 59, length: 49 },
  { id: "5y", label: "5 th", chest: 62, length: 52 },
  { id: "6y", label: "6 th", chest: 65, length: 55 },
  { id: "8y", label: "8 th", chest: 70, length: 60 },
] as const

export type SizeId = (typeof sizes)[number]["id"]

export const priceRanges = [
  { id: "under-100", label: "Di bawah Rp100rb", min: 0, max: 99_999 },
  { id: "100-150", label: "Rp100rb – Rp150rb", min: 100_000, max: 150_000 },
  { id: "above-150", label: "Di atas Rp150rb", min: 150_001, max: Infinity },
] as const

export type PriceRangeId = (typeof priceRanges)[number]["id"]
export const priceRangeIds = priceRanges.map((p) => p.id) as [
  PriceRangeId,
  ...Array<PriceRangeId>,
]

export const sortOptions = [
  { id: "featured", label: "Pilihan kami" },
  { id: "newest", label: "Terbaru" },
  { id: "price-asc", label: "Harga terendah" },
  { id: "price-desc", label: "Harga tertinggi" },
] as const

export type SortId = (typeof sortOptions)[number]["id"]
export const sortIds = sortOptions.map((s) => s.id) as [
  SortId,
  ...Array<SortId>,
]

export function findById<T extends { id: string }>(
  list: ReadonlyArray<T>,
  id: string
): T | undefined {
  return list.find((item) => item.id === id)
}
