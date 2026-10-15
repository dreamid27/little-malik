import { defineConfig, devices } from "@playwright/test"

const PORT = Number(process.env.E2E_PORT ?? 4173)
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`

/**
 * E2E runs against the *production* static build served by Wrangler — the
 * same runtime as Cloudflare Pages (incl. _headers, _redirects, 404.html).
 * Run `bun run build` first (CI does this), or point E2E_BASE_URL at a
 * deployed preview.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    locale: "id-ID",
    timezoneId: "Asia/Jakarta",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `bunx wrangler pages dev dist/client --port ${PORT} --compatibility-date=2026-09-01`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        stdout: "ignore",
      },
})
