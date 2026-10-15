# Deployment

The build is **100% static**: `bun run build` prerenders every route into
`dist/client` (HTML + hashed assets + images + SEO files). Any static host works;
Cloudflare Pages is the primary target.

## Option A: Cloudflare Pages via GitHub Actions (recommended)

The workflow `.github/workflows/ci.yml` runs typecheck → lint → format → unit
tests → build → Playwright e2e, then deploys the exact tested build.
Pushes to `main` go to production; pull requests get a preview URL.

One-time setup:

1. **Create the Pages project** (once):
   ```bash
   bunx wrangler login
   bunx wrangler pages project create little-malik --production-branch=main
   ```
2. **Create an API token**: Cloudflare dashboard → My Profile → API Tokens →
   _Create token_ → template **"Edit Cloudflare Workers"** (or a custom token
   with _Account → Cloudflare Pages → Edit_).
3. **GitHub repo → Settings → Secrets and variables → Actions**:
   - Secret `CLOUDFLARE_API_TOKEN`: the token
   - Secret `CLOUDFLARE_ACCOUNT_ID`: from the dashboard sidebar / `wrangler whoami`
   - Variable `SITE_URL`: `https://little-malik.pages.dev` until the domain is live
4. Push to `main`. Until the secrets exist, the deploy job is skipped with a notice.

## Option B: Cloudflare Pages Git integration (no Actions)

Dashboard → Workers & Pages → Create → Pages → _Connect to Git_ → pick the repo:

| Setting                | Value                                    |
| ---------------------- | ---------------------------------------- |
| Production branch      | `main`                                   |
| Build command          | `bun install --frozen-lockfile && bun run build` |
| Build output directory | `dist/client`                            |
| Env var `VITE_SITE_URL`| `https://little-malik.pages.dev` (then your domain) |
| Env var `NODE_VERSION` | `24`                                     |
| Env var `BUN_VERSION`  | `1.3.5`                                  |

(If you use this, delete the `deploy` job from the workflow to avoid double deploys.)

## Option C: manual

```bash
VITE_SITE_URL=https://little-malik.pages.dev bun run deploy
```

## Custom domain

1. Pages project → **Custom domains** → _Set up a domain_ → e.g.
   `littlemalik.id` (+ `www` redirecting to the apex). If the domain's DNS is
   on Cloudflare, records are created automatically; otherwise add the CNAME
   it shows.
2. Update the canonical origin and **rebuild**. All SEO output is baked in at
   build time:
   - GitHub variable `SITE_URL` (Option A), or Pages env `VITE_SITE_URL` (Option B)
3. Optional: _Rules → Redirect Rules_ to send `*.pages.dev` → the custom domain.
4. Submit `https://<domain>/sitemap.xml` in **Google Search Console** and
   **Bing Webmaster Tools** (Bing also powers several AI assistants).

## What the host must do (already configured)

| Concern            | Cloudflare Pages                  | nginx (`deploy/nginx/nginx.conf`) |
| ------------------ | --------------------------------- | --------------------------------- |
| Clean URLs         | `/produk` → `produk.html` (built-in) | `try_files $uri $uri.html`     |
| 404 page + status  | `404.html` (built-in)             | `error_page 404 /404.html`        |
| Redirects          | `public/_redirects`               | `location = /about { return 301 }`|
| Security headers   | `public/_headers`                 | `add_header …`                    |
| Immutable assets   | `/assets/*` 1 year                | `location /assets/`               |
| Compression        | automatic (brotli)                | `gzip on`                         |

## Self-hosting with Docker + nginx

```bash
docker build --build-arg VITE_SITE_URL=https://littlemalik.id -t little-malik .
docker run -d -p 8080:80 --name little-malik little-malik
# Verify: E2E_BASE_URL=http://localhost:8080 bun run test:e2e
```

Put TLS in front (Caddy, Traefik, or a Cloudflare proxy) and uncomment the
HSTS header in `nginx.conf`.

## SEO & GEO checklist (built in)

- [x] Prerendered HTML for every page (crawlers and AI agents see full content without JS)
- [x] Unique `<title>`, meta description, canonical, Open Graph, Twitter card per page
- [x] JSON-LD: `ClothingStore`, `WebSite` + `SearchAction`, `Product` + `Offer`,
      `BreadcrumbList`, `ItemList`, `FAQPage`, `AboutPage`, `ContactPage`
- [x] `sitemap.xml` with product images and `lastmod`; `robots.txt` linking it
- [x] **GEO:** `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot,
      Google-Extended, etc.; `/llms.txt` (concise facts + links) and
      `/llms-full.txt` (full catalogue, size guide, FAQ) per llmstxt.org; factual,
      quotable copy with explicit prices, sizes and contact details
- [x] `lang="id"`, `og:locale=id_ID`, IDR prices
- [x] Web app manifest, favicons (ico/svg), apple-touch and maskable icons
- [x] 404 is `noindex`; English alias URLs 301 to canonical Indonesian routes
- [ ] After launch: verify in Search Console, test a product URL in Google's
      Rich Results Test, and add the real Instagram URL to `site.ts` (`sameAs`)
