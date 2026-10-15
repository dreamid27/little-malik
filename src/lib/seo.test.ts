import { describe, expect, it } from "vitest"

import { site } from "@/config/site"
import { getProductBySlug } from "@/content/products"
import { pageTitle, productJsonLd, seo, serializeJsonLd } from "@/lib/seo"

describe("seo()", () => {
  it("builds canonical, OG and Twitter tags from one input", () => {
    const head = seo({ title: "Kontak", path: "/kontak", description: "Hubungi kami" })
    const meta = Object.fromEntries(
      head.meta.map((m) => ["title" in m ? "title" : (m.name ?? m.property), m])
    )
    expect(meta.title).toEqual({ title: `Kontak | ${site.name}` })
    expect(meta["og:url"]).toMatchObject({ content: `${site.url}/kontak` })
    expect(meta["og:image"]).toMatchObject({ content: `${site.url}/images/og-default.jpg` })
    expect(meta["twitter:card"]).toMatchObject({ content: "summary_large_image" })
    expect(head.links).toEqual([{ rel: "canonical", href: `${site.url}/kontak` }])
  })

  it("marks pages noindex on request", () => {
    const robots = seo({ path: "/404", noindex: true }).meta.find(
      (m) => "name" in m && m.name === "robots"
    )
    expect(robots).toMatchObject({ content: "noindex, follow" })
  })

  it("uses the tagline for the home title", () => {
    expect(pageTitle()).toBe(`${site.name} — ${site.tagline}`)
  })
})

describe("JSON-LD", () => {
  it("escapes < to keep inline scripts safe", () => {
    expect(serializeJsonLd({ x: "</script>" })).not.toContain("</script>")
  })

  it("describes a product with an IDR offer", () => {
    const ld = productJsonLd(getProductBySlug("baju-koko-malik")!) as {
      offers: { price: number; priceCurrency: string; availability: string }
      brand: { name: string }
    }
    expect(ld.offers.priceCurrency).toBe("IDR")
    expect(ld.offers.price).toBe(149_000)
    expect(ld.offers.availability).toBe("https://schema.org/InStock")
    expect(ld.brand.name).toBe(site.name)
  })
})
