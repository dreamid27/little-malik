# Managing content

All content lives in TypeScript files, typed and validated by tests. Editing
them and pushing to `main` redeploys the site.

## Contact details & brand

`src/config/site.ts`: WhatsApp number (`6281220330128`, international format
without `+`), email, Instagram, opening hours, tagline and description. These
feed the header, footer, contact page, JSON-LD, `llms.txt` and every WhatsApp
link.

> **Instagram is a placeholder** (`@littlemalik.id`). Update `social.instagram`
> once the account exists.

## Add a product

1. Append an entry to `products` in `src/content/products.ts`:
   - `slug`: lowercase-with-dashes, unique (becomes `/produk/<slug>`)
   - `category`, `gender`, `ageGroups`, `sizes`: ids from `src/content/catalog.ts`
     (sizes in ascending order)
   - `price` (and optional `compareAtPrice` for promos, which must be higher)
   - `colors`, `material`, `summary`, `description`, `details`, `care`, `addedAt`
   - `isNew` / `isBestSeller` for badges and "Pilihan kami" ordering
2. Images: either
   - **Illustrated placeholder:** set `art` (garment kind, pattern, colours)
     and run `bun run assets`, or
   - **Real photos:** put files in `public/images/products/` and set
     `images: ["/images/products/<slug>-1.webp", …]`. Also provide
     `public/images/products/<slug>-share.jpg` (1200×1200) for social previews.
3. `bun run test`: content checks catch bad ids, unsorted sizes, missing images.

Product pages, sitemap, `llms.txt`, structured data and the prerender list all
update automatically.

## FAQ

`src/content/faqs.ts`. Shown on home + contact, emitted as `FAQPage` JSON-LD
and included in `llms-full.txt`. **Review the shipping, exchange and payment
answers with the owner.** They are sensible defaults, not confirmed policy.

## Copy that needs the owner's review

- About page story (`src/routes/tentang.tsx`)
- FAQ terms (exchange window, dispatch time, payment methods)
- Product names, prices and descriptions (sample catalogue)

## Logo

Source: `assets/brand/logo-source.png`. After replacing it, run
`bun run assets` to regenerate the trimmed transparent logo, favicons, app
icons and the Open Graph image.
