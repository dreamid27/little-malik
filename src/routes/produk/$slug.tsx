import { Link, createFileRoute, notFound } from "@tanstack/react-router"

import { CottonIcon, TruckIcon } from "@/components/brand/icons"
import { SectionHeading } from "@/components/layout/section-heading"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  getProductBySlug,
  getProductShareImage,
  getRelatedProducts,
} from "@/content/products"
import { Price } from "@/features/catalog/components/price"
import { ProductCard } from "@/features/catalog/components/product-card"
import {
  categoryLabel,
  primaryBadge,
  sizeRangeLabel,
} from "@/features/catalog/product-meta"
import { OrderPanel } from "@/features/product/components/order-panel"
import { ProductGallery } from "@/features/product/components/product-gallery"
import { formatRupiah } from "@/lib/format"
import { breadcrumbJsonLd, productJsonLd, seo } from "@/lib/seo"

export const Route = createFileRoute("/produk/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug)
    if (!product) throw notFound()
    return { product, related: getRelatedProducts(product) }
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return seo({
        title: "Produk tidak ditemukan",
        path: "/produk",
        noindex: true,
      })
    const { product } = loaderData
    return seo({
      title: product.name,
      description: `${product.summary} ${product.material}, ukuran ${sizeRangeLabel(product)}. ${formatRupiah(product.price)}. Pesan via WhatsApp, kirim ke seluruh Indonesia.`,
      path: `/produk/${product.slug}`,
      image: getProductShareImage(product),
      imageAlt: `Ilustrasi ${product.name}`,
      type: "product",
      jsonLd: [
        productJsonLd(product),
        breadcrumbJsonLd([
          { name: "Beranda", path: "/" },
          { name: "Katalog", path: "/produk" },
          { name: product.name, path: `/produk/${product.slug}` },
        ]),
      ],
    })
  },
  component: ProductPage,
})

const accordionTrigger =
  "py-4 font-heading text-lg hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-marigold-deep"

function ProductPage() {
  const { product, related } = Route.useLoaderData()
  const badge = primaryBadge(product)

  return (
    <>
      <div className="container-page pt-8 pb-12">
        <Breadcrumbs
          items={[
            { label: "Beranda", to: "/" },
            { label: "Katalog", to: "/produk" },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery key={product.slug} product={product} />

          <div className="lg:pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/produk"
                search={{ category: product.category }}
                className="rounded-full bg-sand px-3 py-1 text-sm font-bold hover:bg-butter"
              >
                {categoryLabel(product)}
              </Link>
              {badge ? (
                <span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-paper">
                  {badge.label}
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 text-title">{product.name}</h1>
            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
              className="mt-4"
            />
            <p className="mt-5 max-w-[56ch] text-lg text-ink-soft">
              {product.description}
            </p>

            <div className="mt-8 border-t-2 border-line pt-8">
              <OrderPanel key={product.slug} product={product} />
            </div>

            <Accordion
              className="mt-8 border-y-2 border-line"
              defaultValue={["detail"]}
            >
              <AccordionItem
                value="detail"
                className="border-line not-last:border-b-2"
              >
                <AccordionTrigger className={accordionTrigger}>
                  Detail produk
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2 text-base text-ink-soft">
                    <li className="flex gap-2.5">
                      <CottonIcon className="mt-1 size-4 text-marigold-deep" />
                      Bahan: {product.material}
                    </li>
                    {product.details.map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-marigold"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="care"
                className="border-line not-last:border-b-2"
              >
                <AccordionTrigger className={accordionTrigger}>
                  Cara merawat
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2 text-base text-ink-soft">
                    {product.care.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lagoon"
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className={accordionTrigger}>
                  Pengiriman & penukaran
                </AccordionTrigger>
                <AccordionContent>
                  <p className="flex gap-2.5 pb-2 text-base text-ink-soft">
                    <TruckIcon className="mt-1 size-4 shrink-0 text-lagoon" />
                    Dikirim ke seluruh Indonesia 1×24 jam hari kerja setelah
                    pembayaran. Tukar ukuran maksimal 3 hari setelah paket
                    diterima, selama label masih terpasang.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-title"
          className="container-page py-12"
        >
          <SectionHeading
            id="related-title"
            title="Mungkin si kecil juga suka"
          />
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}
