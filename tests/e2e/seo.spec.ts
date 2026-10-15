import { expect, test } from "./fixtures"

const SITE = process.env.VITE_SITE_URL ?? "https://little-malik.pages.dev"

const pages = [
  { path: "/", title: /Little Malik — Baju anak/ },
  { path: "/produk", title: "Katalog baju anak | Little Malik" },
  { path: "/produk/baju-koko-malik", title: "Baju Koko Malik | Little Malik" },
  { path: "/tentang", title: "Tentang kami | Little Malik" },
  { path: "/kontak", title: "Kontak | Little Malik" },
]

test.describe("SEO", () => {
  // Pure HTML checks — one browser project is enough.
  test.skip(({ isMobile }) => isMobile, "desktop only")

  for (const p of pages) {
    test(`${p.path} ships complete, prerendered meta`, async ({
      request,
      page,
    }) => {
      // Fetch raw HTML (no JS) to prove crawlers get everything server-side.
      const res = await request.get(p.path)
      expect(res.status()).toBe(200)
      const html = await res.text()
      expect(html).toContain('<html lang="id"')

      await page.setContent(html)
      await expect(page).toHaveTitle(p.title)
      const canonical = `${SITE}${p.path === "/" ? "/" : p.path}`
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        canonical
      )
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /.{50,}/
      )
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        canonical
      )
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        new RegExp(`^${SITE}/images/`)
      )
      await expect(page.locator("h1")).toHaveCount(1)
      // No duplicated tags from root/child head merging.
      await expect(page.locator("title")).toHaveCount(1)
      await expect(page.locator('meta[name="description"]')).toHaveCount(1)

      const ld = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent)))
      expect(ld.length).toBeGreaterThan(0)
      for (const block of ld)
        expect(block["@context"]).toBe("https://schema.org")
    })
  }

  test("product pages expose Product + Offer structured data", async ({
    request,
    page,
  }) => {
    await page.setContent(
      await (await request.get("/produk/gamis-mentari")).text()
    )
    const types = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent)))
    const product = types.find((t) => t["@type"] === "Product")
    expect(product.offers).toMatchObject({
      priceCurrency: "IDR",
      price: 199000,
    })
    expect(product.image[0]).toMatch(/gamis-mentari-share\.jpg$/)
    expect(types.some((t) => t["@type"] === "BreadcrumbList")).toBe(true)
  })

  test("404 page is noindex", async ({ request }) => {
    const res = await request.get("/404")
    expect(await res.text()).toContain('content="noindex, follow"')
  })

  test("robots.txt allows search + AI crawlers and links the sitemap", async ({
    request,
  }) => {
    const body = await (await request.get("/robots.txt")).text()
    expect(body).toContain("User-agent: *")
    expect(body).toContain("User-agent: GPTBot")
    expect(body).toContain("User-agent: ClaudeBot")
    expect(body).toContain(`Sitemap: ${SITE}/sitemap.xml`)
  })

  test("sitemap lists every page and product", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text()
    expect(xml).toContain(`<loc>${SITE}/</loc>`)
    expect(xml).toContain(`<loc>${SITE}/produk/dress-kebun-bunga</loc>`)
    expect(xml.match(/<url>/g)?.length).toBe(4 + 16)
    expect(xml).not.toContain("/404")
  })

  test("llms.txt summarises the store for AI assistants (GEO)", async ({
    request,
  }) => {
    const res = await request.get("/llms.txt")
    expect(res.headers()["content-type"]).toContain("text/plain")
    const body = await res.text()
    expect(body).toMatch(/^# Little Malik/)
    expect(body).toContain("+62 812-2033-0128")
    expect(body).toContain("littlemalik151@gmail.com")
    expect(body).toContain(`${SITE}/produk/baju-koko-malik`)
    const full = await (await request.get("/llms-full.txt")).text()
    expect(full).toContain("## Panduan ukuran")
    expect(full).toContain("## FAQ")
  })

  test("web manifest and icons are served", async ({ request }) => {
    const manifest = await (await request.get("/manifest.webmanifest")).json()
    expect(manifest.name).toBe("Little Malik")
    for (const icon of manifest.icons) {
      expect((await request.get(icon.src)).status()).toBe(200)
    }
    expect((await request.get("/favicon.ico")).status()).toBe(200)
    expect((await request.get("/images/og-default.jpg")).status()).toBe(200)
  })

  test("security and caching headers are applied", async ({ request }) => {
    const res = await request.get("/")
    expect(res.headers()["x-content-type-options"]).toBe("nosniff")
    expect(res.headers()["x-frame-options"]).toBe("DENY")
    const html = await res.text()
    const asset = html.match(/\/assets\/[^"]+\.js/)?.[0]
    expect(asset).toBeTruthy()
    const assetRes = await request.get(asset!)
    expect(assetRes.headers()["cache-control"]).toContain("immutable")
  })
})
