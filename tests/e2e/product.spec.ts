import {
  WHATSAPP_NUMBER,
  expect,
  gotoHydrated,
  test,
  whatsappText,
} from "./fixtures"

const PRODUCT = "/produk/dress-kebun-bunga"

test.describe("product page", () => {
  test("shows product info, price and breadcrumbs", async ({
    page,
    consoleErrors,
  }) => {
    await gotoHydrated(page, PRODUCT)
    await expect(page).toHaveTitle("Dress Kebun Bunga | Little Malik")
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Dress Kebun Bunga"
    )
    await expect(page.getByText("Rp 169.000").first()).toBeVisible()
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" })
    await expect(crumbs.getByRole("link", { name: "Katalog" })).toHaveAttribute(
      "href",
      "/produk"
    )
    expect(consoleErrors).toEqual([])
  })

  test("requires a size before ordering", async ({ page }) => {
    await gotoHydrated(page, PRODUCT)
    await page.getByTestId("order-whatsapp").click()
    await expect(page.getByRole("alert")).toHaveText(
      "Pilih ukuran dulu sebelum memesan."
    )
    // No popup was opened.
    expect(page.context().pages()).toHaveLength(1)
  })

  test("orders via WhatsApp with the selected options", async ({ page }) => {
    await gotoHydrated(page, PRODUCT)
    await page
      .getByTestId("size-options")
      .getByText("4 th", { exact: true })
      .click()
    await page
      .getByRole("radio", { name: "Merah Muda Blush" })
      .check({ force: true })
    await page.getByRole("button", { name: "Tambah jumlah" }).click()
    await expect(page.getByTestId("quantity")).toHaveText("2")

    const popupPromise = page.waitForEvent("popup")
    await page.getByTestId("order-whatsapp").click()
    const popup = await popupPromise
    const url = popup.url()
    expect(url).toContain(`wa.me/${WHATSAPP_NUMBER}`)
    const text = whatsappText(url)
    expect(text).toContain("Produk: Dress Kebun Bunga")
    expect(text).toContain("Ukuran: 4 th")
    expect(text).toContain("Warna: Merah Muda Blush")
    expect(text).toContain("Jumlah: 2")
    expect(text).toMatch(/\/produk\/dress-kebun-bunga/)
  })

  test("gallery thumbnails switch the main image", async ({ page }) => {
    await gotoHydrated(page, PRODUCT)
    const main = page.getByTestId("gallery-main")
    await expect(main).toHaveAttribute("src", /dress-kebun-bunga-1\.svg/)
    await page.getByRole("button", { name: "Di gantungan" }).click()
    await expect(page.getByTestId("gallery-main")).toHaveAttribute(
      "src",
      /dress-kebun-bunga-2\.svg/
    )
    await expect(
      page.getByRole("button", { name: "Di gantungan" })
    ).toHaveAttribute("aria-pressed", "true")
  })

  test("size guide opens and closes", async ({ page }) => {
    await gotoHydrated(page, PRODUCT)
    await page.getByRole("button", { name: "Panduan ukuran" }).click()
    const dialog = page.getByRole("dialog", { name: "Panduan ukuran" })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole("rowheader", { name: "4 th" })).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
  })

  test("related products navigate client-side", async ({
    page,
    consoleErrors,
  }) => {
    await gotoHydrated(page, PRODUCT)
    const related = page.getByRole("region", {
      name: "Mungkin si kecil juga suka",
    })
    const firstLink = related
      .getByTestId("product-card")
      .first()
      .getByRole("link")
    const name = (await firstLink.textContent()) ?? ""
    await firstLink.click()
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name)
    expect(consoleErrors).toEqual([])
  })

  test("unknown product slug returns 404", async ({ page }) => {
    const response = await page.goto("/produk/tidak-ada")
    expect(response?.status()).toBe(404)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Halaman ini tidak ditemukan"
    )
  })
})
