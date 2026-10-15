# Little Malik

Storefront for **Little Malik**, an Indonesian children's clothing shop. Visitors
browse and filter the catalogue, open a product, pick size/colour/quantity and
order through a prefilled **WhatsApp** message. No cart, no checkout, no backend.

- **Stack:** TanStack Start (React 19) · Vite 8 · Tailwind CSS v4 · shadcn/ui (Base UI) · Zod
- **Output:** fully static, prerendered HTML (SSG) → Cloudflare Pages (or nginx)
- **Quality:** TypeScript strict · ESLint · Prettier · Vitest · Playwright (desktop + mobile)

## Quick start

```bash
bun install
bun run dev            # http://localhost:3000  (add `--port 3100` if taken)
```

Requirements: Bun ≥ 1.3 and Node ≥ 22 (Vite runs on Node).

## Scripts

| Script                  | What it does                                                         |
| ----------------------- | -------------------------------------------------------------------- |
| `bun run dev`           | Generate SEO files, start the dev server                             |
| `bun run build`         | Generate SEO files + prerender every page into `dist/client`         |
| `bun run preview`       | Serve `dist/client` with Wrangler (same runtime as Cloudflare Pages) |
| `bun run check`         | Typecheck + lint + format check + unit tests                         |
| `bun run test`          | Unit + component tests (Vitest)                                      |
| `bun run test:e2e`      | End-to-end tests against the built site (run `build` first)          |
| `bun run assets`        | Regenerate product art, favicons, logo variants and OG image         |
| `bun run seo`           | Regenerate robots.txt, sitemap.xml, manifest, llms.txt               |
| `bun run deploy`        | Build and deploy to Cloudflare Pages with Wrangler                   |

## Project structure

```
src/
  config/          site.ts (brand, contact, URL), navigation.ts
  content/         catalog taxonomy, products, FAQ: the "CMS"
  features/        feature modules (catalog, product, home, contact)
    catalog/       URL search schema, filtering, product card, filters
    product/       gallery, order panel, size guide
  components/
    brand/         logo, custom icon set, illustrations
    layout/        header, footer, breadcrumbs, 404, section heading
    content/       FAQ list, WhatsApp CTA band
    ui/            vendored shadcn/ui primitives (managed by the shadcn CLI)
  lib/             pure helpers: whatsapp, seo, format, color
  routes/          file-based routes (TanStack Router)
  styles.css       design tokens + Tailwind theme
scripts/           asset + SEO generators, shared static route list
tests/e2e/         Playwright specs
deploy/nginx/      nginx config for self-hosting
public/            static files (_headers, _redirects, generated images)
docs/              conventions, design system, content, deployment
```

## Routes

| Path              | Page                                                     |
| ----------------- | -------------------------------------------------------- |
| `/`               | Home: clothesline hero, shop by age, new arrivals, FAQ   |
| `/produk`         | Catalogue with `?q`, `category`, `age`, `gender`, `price`, `promo`, `sort` |
| `/produk/:slug`   | Product detail + WhatsApp order                          |
| `/tentang`        | About / brand profile                                    |
| `/kontak`         | Contact channels + message form                          |
| `/404`            | Prerendered as `404.html` for unknown URLs               |

## Documentation

- [docs/CONVENTIONS.md](docs/CONVENTIONS.md): code style, folder rules, testing
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md): brand, tokens, type, icons, illustration
- [docs/CONTENT.md](docs/CONTENT.md): adding products, swapping in real photos, contact details
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): Cloudflare Pages, custom domain, nginx/Docker, SEO/GEO checklist
