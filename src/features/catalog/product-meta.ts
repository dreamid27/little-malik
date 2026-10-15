import { categories, findById, sizes } from "@/content/catalog"
import type { Product } from "@/content/products"
import { discountPercent } from "@/lib/format"

/** "1 th – 6 th" from the first and last available size. */
export function sizeRangeLabel(product: Product): string {
  const first = findById(sizes, product.sizes[0] ?? "")
  const last = findById(sizes, product.sizes[product.sizes.length - 1] ?? "")
  if (!first || !last) return ""
  return first.id === last.id ? first.label : `${first.label} – ${last.label}`
}

export function categoryLabel(product: Product): string {
  return findById(categories, product.category)?.label ?? product.category
}

export type ProductBadge = { label: string; tone: "sale" | "new" | "best" }

/** At most one badge per card — the most useful one. */
export function primaryBadge(product: Product): ProductBadge | undefined {
  const off = discountPercent(product.price, product.compareAtPrice)
  if (off > 0) return { label: `Hemat ${off}%`, tone: "sale" }
  if (product.isNew) return { label: "Baru", tone: "new" }
  if (product.isBestSeller) return { label: "Favorit", tone: "best" }
  return undefined
}
