import { Link, createFileRoute } from "@tanstack/react-router"

import { FaqList } from "@/components/content/faq-list"
import { WhatsAppCta } from "@/components/content/whatsapp-cta"
import { SectionHeading } from "@/components/layout/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { faqs } from "@/content/faqs"
import { getProductBySlug, products } from "@/content/products"
import type { Product } from "@/content/products"
import { sortProducts } from "@/features/catalog/catalog-search"
import { Hero } from "@/features/home/components/hero"
import {
  HowToOrder,
  NewArrivals,
  ShopByAge,
  WhyUs,
} from "@/features/home/components/home-sections"
import { faqJsonLd, seo, storeJsonLd, websiteJsonLd } from "@/lib/seo"

const HANGING = [
  "kaos-matahari-kecil",
  "dress-kebun-bunga",
  "romper-garis-laut",
  "overall-kebun-kecil",
]

export const Route = createFileRoute("/")({
  loader: () => ({
    hanging: HANGING.map(getProductBySlug).filter((p): p is Product =>
      Boolean(p)
    ),
    newest: sortProducts(products, "newest").slice(0, 4),
  }),
  head: () =>
    seo({
      path: "/",
      jsonLd: [storeJsonLd(), websiteJsonLd(), faqJsonLd(faqs)],
    }),
  component: HomePage,
})

function HomePage() {
  const { hanging, newest } = Route.useLoaderData()
  return (
    <>
      <Hero hanging={hanging} />
      <ShopByAge />
      <NewArrivals products={newest} />
      <HowToOrder />
      <WhyUs />
      <section
        aria-labelledby="faq-title"
        className="container-page py-12 sm:py-16"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="faq-title"
            title="Pertanyaan yang sering ditanyakan"
            description="Belum menemukan jawabannya? Tanyakan langsung, kami senang membantu."
            action={
              <Link
                to="/kontak"
                className={buttonVariants({ variant: "outline" })}
              >
                Hubungi kami
              </Link>
            }
            className="sm:flex-col sm:items-start lg:sticky lg:top-28 lg:self-start"
          />
          <FaqList faqs={faqs} />
        </div>
      </section>
      <WhatsAppCta />
    </>
  )
}
