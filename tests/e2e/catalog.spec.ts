import type { Page } from "@playwright/test"

import { expect, gotoHydrated, isMobile, test } from "./fixtures"

const resultCount = (page: Page) => page.getByTestId("result-count")
const cards = (page: Page) => page.getByTestId("product-card")

/** Filters live in the sidebar on desktop and in a bottom sheet on mobile. */
async function filterChip(page: Page, name: RegExp) {
  if (isMobile(page)) {
    const dialog = page.getByRole("dialog")
    if (!(await dialog.isVisible())) {
      await page.getByRole("button", { name: /^Filter/ }).click()
    }
    return dialog.getByRole("button", { name })
  }
  return page
    .getByRole("complementary", { name: "Filter produk" })
    .getByRole("button", { name })
}

async function closeFilterSheet(page: Page) {
  if (isMobile(page)) {
    await page.getByRole("button", { name: /^Tampilkan \d+ produk$/ }).click()
    await expect(page.getByRole("dialog")).toBeHidden()
  }
}

test.describe("catalogue", () => {
  test("lists every product", async ({ page, consoleErrors }) => {
    await gotoHydrated(page, "/produk")
    await expect(resultCount(page)).toHaveText("16")
    await expect(cards(page)).toHaveCount(16)
    expect(consoleErrors).toEqual([])
  })

  test("category filter updates results and the URL", async ({ page }) => {
    await gotoHydrated(page, "/produk")
    await (await filterChip(page, /^Dress/)).click()
    await expect(page).toHaveURL(/category=dress/)
    await expect(resultCount(page)).toHaveText("2")
    await (await filterChip(page, /^Muslim/)).click()
    await expect(page).toHaveURL(
      /category=dress%2Cmuslim|category=dress,muslim/
    )
    await expect(resultCount(page)).toHaveText("4")
    await closeFilterSheet(page)
    await expect(cards(page)).toHaveCount(4)
  })

  test("filters combine across groups and show active pills", async ({
    page,
  }) => {
    await gotoHydrated(page, "/produk")
    await (await filterChip(page, /^0–12 bulan/)).click()
    await (await filterChip(page, /^Laki-laki/)).click()
    await closeFilterSheet(page)

    const pills = page.getByRole("group", { name: "Filter aktif" })
    await expect(
      pills.getByRole("button", { name: /0–12 bulan/ })
    ).toBeVisible()
    await expect(pills.getByRole("button", { name: /Laki-laki/ })).toBeVisible()
    const count = Number(await resultCount(page).textContent())
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(16)

    await pills.getByRole("button", { name: /Laki-laki/ }).click()
    await expect(page).not.toHaveURL(/gender=/)
    await pills.getByRole("button", { name: "Hapus semua" }).click()
    await expect(resultCount(page)).toHaveText("16")
  })

  test("deep links restore filters after hydration", async ({
    page,
    consoleErrors,
  }) => {
    await gotoHydrated(page, "/produk?category=muslim&gender=perempuan")
    await expect(resultCount(page)).toHaveText("1")
    await expect(cards(page).first()).toContainText("Gamis Mentari")
    expect(consoleErrors).toEqual([])
  })

  test("invalid search params are ignored instead of crashing", async ({
    page,
  }) => {
    await gotoHydrated(page, "/produk?category=robot&sort=lol&price=999")
    await expect(resultCount(page)).toHaveText("16")
  })

  test("search narrows results and shows an empty state", async ({ page }) => {
    await gotoHydrated(page, "/produk")
    const search = page.getByRole("searchbox", { name: "Cari produk" })
    await search.fill("romper")
    await expect(page).toHaveURL(/q=romper/)
    await expect(resultCount(page)).toHaveText("2")

    await search.fill("jaket kulit")
    await expect(page.getByTestId("empty-state")).toBeVisible()
    await page.getByRole("button", { name: "Hapus semua filter" }).click()
    await expect(resultCount(page)).toHaveText("16")
    await expect(search).toHaveValue("")
  })

  test("sorting by price orders the grid", async ({ page }) => {
    await gotoHydrated(page, "/produk")
    await page.getByLabel("Urutkan").selectOption("price-asc")
    await expect(page).toHaveURL(/sort=price-asc/)
    const prices = await cards(page)
      .getByTestId("price")
      .evaluateAll((els) =>
        els.map((el) => Number(el.textContent.replace(/\D/g, "")))
      )
    expect(prices.length).toBe(16)
    expect(prices).toEqual([...prices].sort((a, b) => a - b))
  })

  test("promo filter only shows discounted items", async ({ page }) => {
    await gotoHydrated(page, "/produk")
    await (await filterChip(page, /^Sedang promo/)).click()
    await closeFilterSheet(page)
    const count = await cards(page).count()
    expect(count).toBeGreaterThan(0)
    for (const card of await cards(page).all()) {
      await expect(card.getByText(/Hemat \d+%/)).toBeVisible()
    }
  })

  test("product card opens the product page", async ({ page }) => {
    await gotoHydrated(page, "/produk")
    await cards(page).first().getByRole("link").click()
    await expect(page).toHaveURL(/\/produk\/[a-z-]+$/)
    await expect(page.getByTestId("order-whatsapp")).toBeVisible()
  })
})
