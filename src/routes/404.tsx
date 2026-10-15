import { createFileRoute } from "@tanstack/react-router"

import { NotFound } from "@/components/layout/not-found"
import { seo } from "@/lib/seo"

/**
 * Prerendered to /404.html. Cloudflare Pages (and the nginx config) serve it
 * with a 404 status for any unknown URL.
 */
export const Route = createFileRoute("/404")({
  head: () =>
    seo({ title: "Halaman tidak ditemukan", path: "/404", noindex: true }),
  component: NotFound,
})
