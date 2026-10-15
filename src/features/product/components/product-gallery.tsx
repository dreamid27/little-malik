import { useState } from "react"

import type { Product } from "@/content/products"
import { getProductImages } from "@/content/products"
import { backdropFor } from "@/lib/color"
import { cn } from "@/lib/utils"

const viewLabels = ["Tampak depan", "Di gantungan", "Detail bahan"]

export function ProductGallery({ product }: { product: Product }) {
  const images = getProductImages(product)
  const [active, setActive] = useState(0)
  const backdrop = backdropFor(product.art.base)

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative aspect-square overflow-hidden rounded-[2.5rem]"
        style={{ backgroundColor: backdrop }}
      >
        <img
          key={images[active]}
          src={images[active]}
          alt={`${product.name} — ${viewLabels[active] ?? `foto ${active + 1}`}`}
          width={420}
          height={420}
          fetchPriority="high"
          className="size-full animate-in object-contain p-[7%] duration-300 fade-in-0 zoom-in-95"
          data-testid="gallery-main"
        />
      </div>
      <div
        className="grid grid-cols-3 gap-3 sm:gap-4"
        role="group"
        aria-label="Pilih tampilan foto"
      >
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            aria-label={viewLabels[index] ?? `Foto ${index + 1}`}
            className={cn(
              "aspect-square cursor-pointer overflow-hidden rounded-3xl border-2 transition-[border-color,transform] duration-200",
              active === index
                ? "border-ink"
                : "border-transparent hover:-translate-y-0.5"
            )}
            style={{ backgroundColor: backdrop }}
          >
            <img
              src={src}
              alt=""
              width={140}
              height={140}
              loading="lazy"
              className="size-full object-contain p-[10%]"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
