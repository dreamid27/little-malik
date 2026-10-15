import { useEffect, useId, useRef, useState } from "react"
import type { MouseEvent } from "react"

import {
  ChatIcon,
  MinusIcon,
  PlusIcon,
  WhatsAppIcon,
} from "@/components/brand/icons"
import { buttonVariants } from "@/components/ui/button"
import { findById, sizes } from "@/content/catalog"
import type { Product } from "@/content/products"
import { Price } from "@/features/catalog/components/price"
import { SizeGuide } from "@/features/product/components/size-guide"
import { cn } from "@/lib/utils"
import {
  buildOrderMessage,
  buildProductQuestionMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp"

const MAX_QTY = 20

export function OrderPanel({ product }: { product: Product }) {
  const id = useId()
  const [sizeId, setSizeId] = useState<string | undefined>()
  const [colorName, setColorName] = useState(product.colors.at(0)?.name)
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const sizeGroupRef = useRef<HTMLFieldSetElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const [ctaVisible, setCtaVisible] = useState(true)

  const orderUrl = buildWhatsAppUrl(
    buildOrderMessage({ product, sizeId, colorName, quantity })
  )

  // Show the sticky mobile bar only once the main button scrolls away.
  useEffect(() => {
    const el = ctaRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(([entry]) =>
      setCtaVisible(entry.isIntersecting)
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function requireSize(event: MouseEvent<HTMLAnchorElement>) {
    if (sizeId) return
    event.preventDefault()
    setSizeError(true)
    sizeGroupRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
    sizeGroupRef.current
      ?.querySelector<HTMLInputElement>("input")
      ?.focus({ preventScroll: true })
  }

  const selectedSize = sizeId ? findById(sizes, sizeId)?.label : undefined

  return (
    <div className="flex flex-col gap-7">
      <fieldset>
        <legend className="mb-3 font-bold">
          Warna:{" "}
          <span className="font-semibold text-ink-soft">{colorName}</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((c) => (
            <label
              key={c.name}
              className="group relative cursor-pointer"
              title={c.name}
            >
              <input
                type="radio"
                name={`${id}-color`}
                value={c.name}
                checked={colorName === c.name}
                onChange={() => setColorName(c.name)}
                className="peer sr-only"
              />
              <span
                className="block size-11 rounded-full border-2 border-paper ring-2 ring-line transition-shadow peer-checked:ring-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lagoon"
                style={{ backgroundColor: c.hex }}
              />
              <span className="sr-only">{c.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset
        ref={sizeGroupRef}
        aria-describedby={sizeError ? `${id}-size-error` : undefined}
        aria-invalid={sizeError || undefined}
        data-testid="size-options"
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <legend className="font-bold">
            Ukuran:{" "}
            <span className="font-semibold text-ink-soft">
              {selectedSize ?? "pilih salah satu"}
            </span>
          </legend>
          <SizeGuide product={product} />
        </div>
        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((sid) => {
            const label = findById(sizes, sid)?.label ?? sid
            return (
              <label key={sid} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-size`}
                  value={sid}
                  checked={sizeId === sid}
                  onChange={() => {
                    setSizeId(sid)
                    setSizeError(false)
                  }}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "inline-grid h-11 min-w-16 place-items-center rounded-2xl border-2 px-3 font-bold transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lagoon",
                    sizeError
                      ? "border-poppy/60 bg-poppy/5"
                      : "border-line bg-card hover:border-ink/60"
                  )}
                >
                  {label}
                </span>
              </label>
            )
          })}
        </div>
        {sizeError ? (
          <p
            id={`${id}-size-error`}
            role="alert"
            className="mt-3 text-sm font-bold text-poppy"
          >
            Pilih ukuran dulu sebelum memesan.
          </p>
        ) : null}
      </fieldset>

      <div>
        <span id={`${id}-qty`} className="mb-3 block font-bold">
          Jumlah
        </span>
        <div
          className="inline-flex items-center rounded-full border-2 border-line bg-card"
          role="group"
          aria-labelledby={`${id}-qty`}
        >
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Kurangi jumlah"
            className="grid size-11 cursor-pointer place-items-center rounded-full hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MinusIcon className="size-4" />
          </button>
          <output
            aria-live="polite"
            className="w-10 text-center font-extrabold tabular-nums"
            data-testid="quantity"
          >
            {quantity}
          </output>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}
            disabled={quantity >= MAX_QTY}
            aria-label="Tambah jumlah"
            className="grid size-11 cursor-pointer place-items-center rounded-full hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40"
          >
            <PlusIcon className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <a
          ref={ctaRef}
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={requireSize}
          className={buttonVariants({
            variant: "whatsapp",
            size: "lg",
            className: "w-full",
          })}
          data-testid="order-whatsapp"
        >
          <WhatsAppIcon />
          Pesan via WhatsApp
        </a>
        <a
          href={buildWhatsAppUrl(buildProductQuestionMessage(product))}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            variant: "outline",
            className: "w-full",
          })}
        >
          <ChatIcon />
          Tanya tentang produk ini
        </a>
        <p className="text-center text-sm text-ink-soft">
          Pesan berisi pilihan Anda akan terbuka di WhatsApp. Belum ada
          pembayaran apa pun.
        </p>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden",
          ctaVisible ? "translate-y-full" : "translate-y-0"
        )}
        aria-hidden={ctaVisible}
        inert={ctaVisible}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading">{product.name}</p>
            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              className="text-sm"
            />
          </div>
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={requireSize}
            className={buttonVariants({ variant: "whatsapp" })}
          >
            <WhatsAppIcon />
            Pesan
          </a>
        </div>
      </div>
    </div>
  )
}
