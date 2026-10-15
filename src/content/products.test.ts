import { existsSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

import { categoryIds, sizes } from "@/content/catalog"
import {
  getProductImages,
  getProductShareImage,
  getRelatedProducts,
  products,
} from "@/content/products"

/** Content integrity checks — catch typos when the catalogue is edited. */
describe("product catalogue", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = products.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it.each(products.map((p) => [p.slug, p] as const))(
    "%s is well-formed",
    (_, p) => {
      expect(categoryIds).toContain(p.category)
      expect(p.price).toBeGreaterThan(0)
      if (p.compareAtPrice) expect(p.compareAtPrice).toBeGreaterThan(p.price)
      expect(p.colors.length).toBeGreaterThan(0)
      expect(p.sizes.length).toBeGreaterThan(0)
      expect(p.ageGroups.length).toBeGreaterThan(0)
      expect(Number.isNaN(Date.parse(p.addedAt))).toBe(false)
      // Sizes are listed smallest → largest.
      const order = p.sizes.map((s) => sizes.findIndex((x) => x.id === s))
      expect(order).toEqual([...order].sort((a, b) => a - b))
      expect(order).not.toContain(-1)
    }
  )

  it("has generated images on disk for every product", () => {
    const publicDir = path.resolve(__dirname, "../../public")
    for (const p of products) {
      for (const img of [...getProductImages(p), getProductShareImage(p)]) {
        expect(existsSync(path.join(publicDir, img)), img).toBe(true)
      }
    }
  })

  it("suggests related products without the product itself", () => {
    const [first] = products
    const related = getRelatedProducts(first, 4)
    expect(related).toHaveLength(4)
    expect(related.map((p) => p.slug)).not.toContain(first.slug)
  })
})
