/**
 * Static (non-product) pages. Shared by the prerender config in
 * vite.config.ts and the sitemap generator so they never drift apart.
 */
export const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: 1 },
  { path: "/produk", changefreq: "daily", priority: 0.9 },
  { path: "/tentang", changefreq: "monthly", priority: 0.6 },
  { path: "/kontak", changefreq: "monthly", priority: 0.7 },
] as const
