import { describe, expect, it } from "vitest"

import { products } from "@/content/products"
import type { Product } from "@/content/products"
import {
  activeFilterCount,
  catalogSearchSchema,
  facetCount,
  filterProducts,
  sortProducts,
  toFilters,
  toggleInList,
} from "@/features/catalog/catalog-search"

const filtersFor = (search: Record<string, unknown>) =>
  toFilters(catalogSearchSchema.parse(search))

describe("catalogSearchSchema", () => {
  it("keeps only known ids in comma lists and dedupes them", () => {
    const parsed = catalogSearchSchema.parse({
      category: "dress,unknown,dress,atasan",
      age: "bayi",
    })
    expect(parsed.category).toBe("dress,atasan")
    expect(parsed.age).toBe("bayi")
  })

  it("drops invalid values instead of throwing", () => {
    const parsed = catalogSearchSchema.parse({
      gender: "robot",
      price: 42,
      sort: "random",
      category: "nope",
      q: "   ",
    })
    expect(parsed).toEqual({
      q: undefined,
      category: undefined,
      age: undefined,
      gender: undefined,
      price: undefined,
      sort: undefined,
      promo: undefined,
    })
  })

  it("accepts promo as boolean or string flag", () => {
    expect(catalogSearchSchema.parse({ promo: true }).promo).toBe(true)
    expect(catalogSearchSchema.parse({ promo: "1" }).promo).toBe(true)
    expect(catalogSearchSchema.parse({ promo: "no" }).promo).toBeUndefined()
  })
})

describe("toggleInList", () => {
  it("adds, removes and empties", () => {
    expect(toggleInList(undefined, "dress")).toBe("dress")
    expect(toggleInList("dress", "atasan")).toBe("dress,atasan")
    expect(toggleInList("dress,atasan", "dress")).toBe("atasan")
    expect(toggleInList("dress", "dress")).toBeUndefined()
  })
})

describe("filterProducts", () => {
  it("returns everything with no filters", () => {
    expect(filterProducts(products, filtersFor({}))).toHaveLength(
      products.length
    )
  })

  it("filters by multiple categories (OR within a group)", () => {
    const result = filterProducts(
      products,
      filtersFor({ category: "dress,muslim" })
    )
    expect(result.length).toBeGreaterThan(0)
    expect(
      result.every((p) => p.category === "dress" || p.category === "muslim")
    ).toBe(true)
  })

  it("combines groups with AND", () => {
    const result = filterProducts(
      products,
      filtersFor({ category: "bayi", age: "bayi" })
    )
    expect(
      result.every((p) => p.category === "bayi" && p.ageGroups.includes("bayi"))
    ).toBe(true)
  })

  it("includes unisex items when filtering a specific gender", () => {
    const result = filterProducts(products, filtersFor({ gender: "perempuan" }))
    expect(result.some((p) => p.gender === "unisex")).toBe(true)
    expect(result.some((p) => p.gender === "laki-laki")).toBe(false)
  })

  it("filters by price range bounds", () => {
    const result = filterProducts(products, filtersFor({ price: "under-100" }))
    expect(result.every((p) => p.price < 100_000)).toBe(true)
  })

  it("filters to promo items", () => {
    const result = filterProducts(products, filtersFor({ promo: true }))
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((p) => p.compareAtPrice !== undefined)).toBe(true)
  })

  it("searches case- and accent-insensitively across name, material and colour", () => {
    expect(
      filterProducts(products, filtersFor({ q: "GAMIS" })).map((p) => p.slug)
    ).toEqual(["gamis-mentari"])
    expect(
      filterProducts(products, filtersFor({ q: "organik" })).length
    ).toBeGreaterThan(0)
    expect(
      filterProducts(products, filtersFor({ q: "zzz-tidak-ada" }))
    ).toHaveLength(0)
  })
})

describe("sortProducts", () => {
  const sample = products.slice(0, 6)

  it("sorts by price both ways", () => {
    const asc = sortProducts(sample, "price-asc").map((p) => p.price)
    expect(asc).toEqual([...asc].sort((a, b) => a - b))
    const desc = sortProducts(sample, "price-desc").map((p) => p.price)
    expect(desc).toEqual([...desc].sort((a, b) => b - a))
  })

  it("sorts newest first", () => {
    const dates = sortProducts(sample, "newest").map((p) => p.addedAt)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it("does not mutate the input", () => {
    const copy = [...sample]
    sortProducts(sample, "price-asc")
    expect(sample).toEqual(copy)
  })
})

describe("facetCount", () => {
  it("ignores its own group so counts stay honest", () => {
    const filters = filtersFor({ category: "dress" })
    const isAtasan = (p: Product) => p.category === "atasan"
    expect(facetCount(products, filters, "categories", isAtasan)).toBe(
      products.filter(isAtasan).length
    )
  })
})

describe("activeFilterCount", () => {
  it("counts every active value", () => {
    expect(
      activeFilterCount(
        catalogSearchSchema.parse({
          category: "dress,atasan",
          gender: "unisex",
          q: "kaos",
        })
      )
    ).toBe(4)
  })
})
