import {
  WHATSAPP_NUMBER,
  expect,
  gotoHydrated,
  test,
  whatsappText,
} from "./fixtures"

test.describe("contact + profile", () => {
  test("lists every contact channel", async ({ page, consoleErrors }) => {
    await gotoHydrated(page, "/kontak")
    const main = page.locator("#konten")
    await expect(
      main.getByRole("link", { name: /\+62 812-2033-0128/ }).first()
    ).toHaveAttribute("href", new RegExp(`wa\\.me/${WHATSAPP_NUMBER}`))
    await expect(
      main.getByRole("link", { name: /littlemalik151@gmail\.com/ })
    ).toHaveAttribute("href", "mailto:littlemalik151@gmail.com")
    await expect(
      main.getByRole("link", { name: /@littlemalik\.id/ })
    ).toHaveAttribute("href", /instagram\.com\/littlemalik\.id/)
    expect(consoleErrors).toEqual([])
  })

  test("form validates required fields", async ({ page }) => {
    await gotoHydrated(page, "/kontak")
    await page.getByRole("button", { name: "Kirim lewat WhatsApp" }).click()
    await expect(
      page.getByText("Tulis nama Anda, minimal 2 huruf.")
    ).toBeVisible()
    await expect(page.getByText(/minimal 10 karakter/)).toBeVisible()
    await expect(page.getByLabel("Nama", { exact: true })).toBeFocused()
  })

  test("form composes a WhatsApp message", async ({ page }) => {
    await gotoHydrated(page, "/kontak")
    await page.getByLabel("Nama", { exact: true }).fill("Bunda Aisyah")
    await page
      .getByLabel("Topik", { exact: true })
      .selectOption("Status pesanan")
    await page
      .getByLabel("Pesan", { exact: true })
      .fill("Pesanan saya kemarin sudah dikirim belum?")

    const popupPromise = page.waitForEvent("popup")
    await page.getByRole("button", { name: "Kirim lewat WhatsApp" }).click()
    const popup = await popupPromise
    const text = whatsappText(popup.url())
    expect(popup.url()).toContain(`wa.me/${WHATSAPP_NUMBER}`)
    expect(text).toContain("Saya Bunda Aisyah")
    expect(text).toContain("Topik: Status pesanan")
    expect(text).toContain("Pesanan saya kemarin sudah dikirim belum?")
  })

  test("about page tells the brand story and links to categories", async ({
    page,
  }) => {
    await gotoHydrated(page, "/tentang")
    await expect(
      page.getByRole("heading", { name: "Yang kami pegang" })
    ).toBeVisible()
    await page
      .getByRole("link", { name: /^Muslim/ })
      .first()
      .click()
    await expect(page).toHaveURL(/\/produk\?category=muslim$/)
    await expect(page.getByTestId("result-count")).toHaveText("2")
  })
})
