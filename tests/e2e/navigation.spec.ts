import {
  WHATSAPP_NUMBER,
  expect,
  gotoHydrated,
  isMobile,
  test,
} from "./fixtures"

test.describe("site navigation", () => {
  test("home page renders hero, sections and clothesline links", async ({
    page,
    consoleErrors,
  }) => {
    await gotoHydrated(page, "/")
    await expect(page).toHaveTitle(/Little Malik/)
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Baju anak yang nyaman"
    )
    await expect(
      page.getByRole("heading", { name: "Belanja sesuai usia" })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Pesan dalam tiga langkah" })
    ).toBeVisible()

    // Garments hanging on the hero clothesline link to product pages.
    await page
      .getByRole("link", { name: /Dress Kebun Bunga — lihat detail/ })
      .click()
    await expect(page).toHaveURL(/\/produk\/dress-kebun-bunga$/)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Dress Kebun Bunga"
    )
    expect(consoleErrors).toEqual([])
  })

  test("main navigation reaches every page", async ({
    page,
    consoleErrors,
  }) => {
    await gotoHydrated(page, "/")
    const pages = [
      { name: "Katalog", url: /\/produk$/, heading: "Katalog" },
      {
        name: "Tentang kami",
        url: /\/tentang$/,
        heading: /Baju anak yang kami sendiri/,
      },
      { name: "Kontak", url: /\/kontak$/, heading: "Mari ngobrol" },
      { name: "Beranda", url: /\/$/, heading: /Baju anak yang nyaman/ },
    ]
    for (const target of pages) {
      if (isMobile(page)) {
        await page.getByRole("button", { name: "Buka menu" }).click()
        await page
          .getByRole("navigation", { name: "Navigasi seluler" })
          .getByRole("link", { name: target.name })
          .click()
      } else {
        await page
          .getByRole("navigation", { name: "Navigasi utama" })
          .getByRole("link", { name: target.name })
          .click()
      }
      await expect(page).toHaveURL(target.url)
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        target.heading
      )
    }
    expect(consoleErrors).toEqual([])
  })

  test("shop-by-age tile opens a filtered catalogue", async ({ page }) => {
    await gotoHydrated(page, "/")
    await page.getByRole("link", { name: /Bayi\s*0–12 bulan/ }).click()
    await expect(page).toHaveURL(/\/produk\?age=bayi$/)
    await expect(
      page
        .getByRole("group", { name: "Filter aktif" })
        .getByRole("button", { name: /0–12 bulan/ })
    ).toBeVisible()
    await expect(page.getByTestId("result-count")).toHaveText("4")
  })

  test("floating WhatsApp button opens a chat with the store", async ({
    page,
  }) => {
    await gotoHydrated(page, "/")
    const popupPromise = page.waitForEvent("popup")
    await page
      .getByRole("link", { name: "Chat dengan Little Malik di WhatsApp" })
      .click()
    const popup = await popupPromise
    expect(popup.url()).toContain(`wa.me/${WHATSAPP_NUMBER}`)
  })

  test("FAQ accordion expands answers", async ({ page }) => {
    await gotoHydrated(page, "/")
    const trigger = page.getByRole("button", {
      name: "Apakah bisa tukar ukuran?",
    })
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(
      page.getByText(/maksimal 3 hari setelah paket diterima/).first()
    ).toBeVisible()
  })

  test("unknown URLs show the branded 404 page with a 404 status", async ({
    page,
  }) => {
    const response = await page.goto("/halaman-yang-tidak-ada")
    expect(response?.status()).toBe(404)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Halaman ini tidak ditemukan"
    )
    await page.getByRole("link", { name: "Lihat katalog" }).first().click()
    await expect(page).toHaveURL(/\/produk$/)
  })

  test("legacy English URLs redirect to Indonesian routes", async ({
    page,
  }) => {
    await page.goto("/about")
    await expect(page).toHaveURL(/\/tentang$/)
    await page.goto("/products/dress-kebun-bunga")
    await expect(page).toHaveURL(/\/produk\/dress-kebun-bunga$/)
  })
})
