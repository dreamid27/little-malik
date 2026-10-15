import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import type { ReactNode } from "react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { WhatsAppFab } from "@/components/layout/whatsapp-fab"
import { NotFound } from "@/components/layout/not-found"
import { site } from "@/config/site"
import { seo } from "@/lib/seo"
import appCss from "@/styles.css?url"

export const Route = createRootRoute({
  head: () => {
    const defaults = seo({ path: "/" })
    return {
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "theme-color", content: "#FFFCF5" },
        { name: "color-scheme", content: "light" },
        { name: "format-detection", content: "telephone=no" },
        { name: "application-name", content: site.name },
        { name: "apple-mobile-web-app-title", content: site.name },
        { name: "author", content: site.name },
        ...defaults.meta,
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" },
        {
          rel: "alternate",
          type: "text/plain",
          href: "/llms.txt",
          title: "LLM summary",
        },
        { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      ],
    }
  },
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang={site.language}>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#konten"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Lewati ke konten
        </a>
        <SiteHeader />
        <main id="konten" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFab />
        <Scripts />
      </body>
    </html>
  )
}
