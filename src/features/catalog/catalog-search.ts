/**
 * Catalog filter state lives in the URL so filtered views are shareable,
 * bookmarkable and survive reloads. Multi-select params are comma lists
 * (`?category=dress,atasan`) to keep URLs readable.
 */
import { z } from "zod"
import {
  ageGroupIds,
  categoryIds,
  genderIds,
  priceRangeIds,
  priceRanges,
  sortIds,
} from "@/content/catalog"
import type {
  AgeGroupId,
  CategoryId,
  GenderId,
  PriceRangeId,
  SortId,
} from "@/content/catalog"
import type { Product } from "@/content/products"

function commaList<const T extends string>(allowed: ReadonlyArray<T>) {
  return z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined
      const picked = value
        .split(",")
        .map((v) => v.trim())
        .filter((v): v is T => (allowed as ReadonlyArray<string>).includes(v))
      const unique = [...new Set(picked)]
      return unique.length ? unique.join(",") : undefined
    })
    .catch(undefined)
}

export const catalogSearchSchema = z.object({
  q: z
    .string()
    .trim()
    .max(60)
    .optional()
    .transform((v) => v || undefined)
    .catch(undefined),
  category: commaList(categoryIds),
  age: commaList(ageGroupIds),
  gender: z.enum(genderIds).optional().catch(undefined),
  price: z.enum(priceRangeIds).optional().catch(undefined),
  sort: z.enum(sortIds).optional().catch(undefined),
  promo: z
    .union([z.boolean(), z.literal("true"), z.literal("1")])
    .optional()
    .transform((v) => (v ? true : undefined))
    .catch(undefined),
})

export type CatalogSearch = Partial<z.output<typeof catalogSearchSchema>>

export type CatalogFilters = {
  query?: string
  categories: ReadonlyArray<CategoryId>
  ages: ReadonlyArray<AgeGroupId>
  gender?: GenderId
  price?: PriceRangeId
  promo: boolean
  sort: SortId
}

export function splitList<T extends string>(value?: string): Array<T> {
  return value ? (value.split(",") as Array<T>) : []
}

export function toFilters(search: CatalogSearch): CatalogFilters {
  return {
    query: search.q,
    categories: splitList<CategoryId>(search.category),
    ages: splitList<AgeGroupId>(search.age),
    gender: search.gender,
    price: search.price,
    promo: search.promo ?? false,
    sort: search.sort ?? "featured",
  }
}

/** Toggle `id` inside a comma list param; returns undefined when empty. */
export function toggleInList(
  list: string | undefined,
  id: string
): string | undefined {
  const items = splitList(list)
  const next = items.includes(id)
    ? items.filter((i) => i !== id)
    : [...items, id]
  return next.length ? next.join(",") : undefined
}

export function activeFilterCount(search: CatalogSearch): number {
  return (
    splitList(search.category).length +
    splitList(search.age).length +
    (search.gender ? 1 : 0) +
    (search.price ? 1 : 0) +
    (search.promo ? 1 : 0) +
    (search.q ? 1 : 0)
  )
}

/** Lowercase + strip diacritics so "Gamis" matches "gamis". */
function normalize(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
}

function matchesQuery(product: Product, query: string): boolean {
  const haystack = normalize(
    [
      product.name,
      product.summary,
      product.material,
      product.category,
      product.gender,
      ...product.colors.map((c) => c.name),
    ].join(" ")
  )
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

type FilterKey = "categories" | "ages" | "gender" | "price" | "promo" | "query"

function matches(
  product: Product,
  f: CatalogFilters,
  skip?: FilterKey
): boolean {
  if (skip !== "query" && f.query && !matchesQuery(product, f.query))
    return false
  if (
    skip !== "categories" &&
    f.categories.length &&
    !f.categories.includes(product.category)
  )
    return false
  if (
    skip !== "ages" &&
    f.ages.length &&
    !product.ageGroups.some((a) => f.ages.includes(a))
  )
    return false
  if (
    skip !== "gender" &&
    f.gender &&
    product.gender !== f.gender &&
    // Unisex pieces suit everyone.
    !(product.gender === "unisex" && f.gender !== "unisex")
  )
    return false
  if (skip !== "price" && f.price) {
    const range = priceRanges.find((r) => r.id === f.price)
    if (range && (product.price < range.min || product.price > range.max))
      return false
  }
  if (skip !== "promo" && f.promo && !product.compareAtPrice) return false
  return true
}

const featuredScore = (p: Product) =>
  (p.isBestSeller ? 2 : 0) + (p.isNew ? 1 : 0)

export function sortProducts(
  list: ReadonlyArray<Product>,
  sort: SortId
): Array<Product> {
  const copy = [...list]
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price)
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price)
    case "featured":
      return copy.sort((a, b) => featuredScore(b) - featuredScore(a))
  }
}

export function filterProducts(
  list: ReadonlyArray<Product>,
  filters: CatalogFilters
): Array<Product> {
  return sortProducts(
    list.filter((p) => matches(p, filters)),
    filters.sort
  )
}

/**
 * How many products an option would show, given every *other* active filter.
 * Lets the UI show honest counts next to each option.
 */
export function facetCount(
  list: ReadonlyArray<Product>,
  filters: CatalogFilters,
  key: Exclude<FilterKey, "query">,
  predicate: (p: Product) => boolean
): number {
  return list.filter((p) => matches(p, filters, key) && predicate(p)).length
}
