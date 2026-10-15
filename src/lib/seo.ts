/**
 * SEO + GEO helpers. Every route calls `seo()` from its `head()` so titles,
 * canonical URLs, Open Graph, Twitter cards and JSON-LD stay consistent.
 */
import { absoluteUrl, site } from "@/config/site"
import { categories, findById, sizes } from "@/content/catalog"
import type { Product } from "@/content/products"
import { getProductShareImage, products } from "@/content/products"
import { formatRupiah } from "@/lib/format"

type JsonLd = Record<string, unknown>

export type SeoInput = {
  title?: string
  description?: string
  path: string
  image?: string
  imageAlt?: string
  type?: "website" | "product" | "article"
  noindex?: boolean
  jsonLd?: ReadonlyArray<JsonLd>
}

export const DEFAULT_OG_IMAGE = "/images/og-default.jpg"

export function pageTitle(title?: string): string {
  return title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`
}

/** Serialise JSON-LD safely for inline <script> tags. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function seo({
  title,
  description = site.description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = site.name,
  type = "website",
  noindex = false,
  jsonLd = [],
}: SeoInput) {
  const fullTitle = pageTitle(title)
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex
          ? "noindex, follow"
          : "index, follow, max-image-preview:large, max-snippet:-1",
      },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: site.locale },
      { property: "og:type", content: type === "product" ? "product" : type },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: serializeJsonLd(data),
    })),
  }
}

/* ─── JSON-LD builders ──────────────────────────────────────────────── */

const ORG_ID = `${site.url}/#store`

function catalogPriceRange(): string {
  const prices = products.map((p) => p.price)
  return `${formatRupiah(Math.min(...prices))} – ${formatRupiah(Math.max(...prices))}`
}

export function storeJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    logo: absoluteUrl("/images/brand/logo-1024.png"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    email: site.contact.email,
    telephone: site.contact.whatsappDisplay.replace(/[\s-]/g, ""),
    priceRange: catalogPriceRange(),
    currenciesAccepted: site.currency,
    paymentAccepted: "Transfer bank, e-wallet",
    foundingDate: String(site.foundingYear),
    areaServed: { "@type": "Country", name: site.areaServed },
    address: { "@type": "PostalAddress", addressCountry: "ID" },
    knowsLanguage: ["id", "en"],
    sameAs: [site.social.instagram.url],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.contact.whatsappDisplay.replace(/[\s-]/g, ""),
        email: site.contact.email,
        availableLanguage: ["Indonesian", "English"],
        areaServed: "ID",
      },
    ],
    openingHoursSpecification: site.openingHoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  }
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: site.language,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/produk?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function productJsonLd(product: Product): JsonLd {
  const category = findById(categories, product.category)
  const url = absoluteUrl(`/produk/${product.slug}`)
  const validUntil = `${new Date().getFullYear() + 1}-12-31`
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description,
    sku: product.slug,
    url,
    image: [absoluteUrl(getProductShareImage(product))],
    brand: { "@type": "Brand", name: site.name },
    category: category?.label,
    material: product.material,
    color: product.colors.map((c) => c.name).join(", "),
    size: product.sizes.map((s) => findById(sizes, s)?.label ?? s).join(", "),
    audience: {
      "@type": "PeopleAudience",
      suggestedGender:
        product.gender === "laki-laki"
          ? "male"
          : product.gender === "perempuan"
            ? "female"
            : "unisex",
      suggestedMaxAge: product.ageGroups.includes("anak") ? 8 : 3,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: site.currency,
      price: product.price,
      priceValidUntil: validUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "ID" },
      },
    },
  }
}

export function itemListJsonLd(items: ReadonlyArray<Product>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/produk/${p.slug}`),
      name: p.name,
    })),
  }
}

export function faqJsonLd(
  faqs: ReadonlyArray<{ question: string; answer: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}
