import { test as base, expect } from "@playwright/test"
import type { Page } from "@playwright/test"

export const WHATSAPP_NUMBER = "6281220330128"

type Fixtures = {
  /** Console errors + uncaught exceptions collected during the test. */
  consoleErrors: Array<string>
}

/**
 * - Stubs wa.me so tests never hit the network but popups still open.
 * - Fails any test that logs a console error (catches hydration mismatches).
 */
export const test = base.extend<Fixtures>({
  context: async ({ context }, use) => {
    await context.route("https://wa.me/**", (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: "<title>WhatsApp</title>" })
    )
    await context.route("https://instagram.com/**", (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: "<title>Instagram</title>" })
    )
    await use(context)
  },
  consoleErrors: async ({ page }, use) => {
    const errors: Array<string> = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })
    page.on("pageerror", (err) => errors.push(err.message))
    await use(errors)
    expect(errors, "console errors").toEqual([])
  },
})

export { expect }

/** Wait until React has hydrated (the router marks the document). */
export async function gotoHydrated(page: Page, url: string) {
  await page.goto(url)
  await page.waitForFunction(() => {
    const root = document.querySelector("#konten")
    // React attaches its fiber key to hydrated DOM nodes.
    return root ? Object.keys(root).some((k) => k.startsWith("__react")) : false
  })
}

/** Decoded `text` param from a wa.me URL. */
export function whatsappText(url: string): string {
  return new URL(url).searchParams.get("text") ?? ""
}

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 768
