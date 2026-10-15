import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

import { products } from "./src/content/products"
import { staticRoutes } from "./scripts/routes"

/**
 * Fully static build (SSG): every page is prerendered to HTML in dist/client,
 * which is what Cloudflare Pages (or nginx) serves. No server runtime needed.
 */
export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // `/produk` → produk.html (served at /produk without a trailing slash).
        autoSubfolderIndex: false,
        // Filtered catalog URLs (?category=…) share produk.html; filters are
        // applied client-side after hydration. Skip them and slash duplicates.
        filter: (page) =>
          !page.path.includes("?") &&
          (page.path === "/" || !page.path.endsWith("/")),
      },
      pages: [
        ...staticRoutes.map((r) => ({ path: r.path })),
        ...products.map((p) => ({ path: `/produk/${p.slug}` })),
        { path: "/404" },
      ],
    }),
    viteReact(),
  ],
})
