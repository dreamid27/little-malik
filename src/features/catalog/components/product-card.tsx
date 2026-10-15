import { Link } from "@tanstack/react-router"

import { getProductImages } from "@/content/products"
import type { Product } from "@/content/products"
import { backdropFor } from "@/lib/color"
import { cn } from "@/lib/utils"
import { Price } from "@/features/catalog/components/price"
import { primaryBadge, sizeRangeLabel } from "@/features/catalog/product-meta"

const badgeTone = {
  sale: "bg-poppy text-white",
  new: "bg-lagoon text-white",
  best: "bg-sun text-ink",
} as const

type ProductCardProps = {
  product: Product
  priority?: boolean
  className?: string
}

export function ProductCard({
  product,
  priority = false,
  className,
}: ProductCardProps) {
  const [image] = getProductImages(product)
  const badge = primaryBadge(product)

  return (
    <article
      className={cn("group relative flex flex-col", className)}
      data-testid="product-card"
    >
      <div
        className="relative aspect-square overflow-hidden rounded-[1.75rem] transition-[border-radius] duration-300 group-hover:rounded-[2.25rem]"
        style={{ backgroundColor: backdropFor(product.art.base) }}
      >
        <img
          src={image}
          alt={`Ilustrasi ${product.name}`}
          width={420}
          height={420}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-contain p-[9%] transition-transform duration-500 ease-(--ease-out-soft) group-hover:scale-[1.03] group-hover:-rotate-2"
        />
        {badge ? (
          <span
            className={cn(
              "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-extrabold",
              badgeTone[badge.tone]
            )}
          >
            {badge.label}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-1 px-1">
        <h3 className="font-heading text-lg leading-snug">
          <Link
            to="/produk/$slug"
            params={{ slug: product.slug }}
            className="rounded-sm after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-4 focus-visible:after:outline-lagoon"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-ink-soft">
          Ukuran {sizeRangeLabel(product)}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
          />
          <ul className="flex -space-x-1.5" aria-label="Pilihan warna">
            {product.colors.map((c) => (
              <li
                key={c.name}
                title={c.name}
                className="size-4.5 rounded-full border-2 border-paper ring-1 ring-ink/15"
                style={{ backgroundColor: c.hex }}
              >
                <span className="sr-only">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
