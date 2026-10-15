import { Link } from "@tanstack/react-router"
import type { CSSProperties } from "react"

import { Cloud, Sparkle, SunMascot } from "@/components/brand/illustrations"
import type { Product } from "@/content/products"
import { cn } from "@/lib/utils"

/**
 * The hero's signature: real catalogue items hanging on a sagging clothesline.
 * Geometry is expressed in % of the panel so it scales fluidly:
 *   - the rope is a quadratic Bézier from (0, Y0) via (50, YC) to (100, Y2)
 *   - each `-hang.svg` has its peg at y=30/420 of the artwork, so we offset
 *     the image top by that fraction to sit the peg on the rope.
 */
const ASPECT = 1.18 // panel width / height
const Y0 = 22
const YC = 44
const Y2 = 18
const PEG_FRACTION = 30 / 420

function ropeY(xPercent: number): number {
  const t = xPercent / 100
  return (1 - t) ** 2 * Y0 + 2 * t * (1 - t) * YC + t ** 2 * Y2
}

const SLOTS = [
  { x: 16, width: 33, delay: "0s" },
  { x: 39, width: 32, delay: "-1.6s" },
  { x: 62, width: 31, delay: "-3.1s" },
  { x: 85, width: 31, delay: "-4.4s" },
] as const

type ClotheslineProps = {
  products: ReadonlyArray<Product>
  className?: string
}

export function Clothesline({ products, className }: ClotheslineProps) {
  const items = products.slice(0, SLOTS.length)

  return (
    // The outer frame may crop (e.g. shorter on phones); the inner stage keeps
    // the fixed aspect ratio the rope geometry depends on.
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2.5rem] bg-sky sm:rounded-[3rem]",
        className
      )}
    >
      <div className="relative" style={{ aspectRatio: String(ASPECT) }}>
        <SunMascot className="absolute -top-[10%] -right-[7%] w-[30%] animate-[spin_60s_linear_infinite] motion-reduce:animate-none" />
        <Cloud className="absolute top-[4%] left-[6%] w-[24%] opacity-95" />
        <Cloud className="absolute bottom-[4%] -left-[8%] w-[38%] text-butter" />
        <Cloud className="absolute right-[-10%] bottom-[-3%] w-[44%]" />
        <Sparkle className="absolute top-[52%] left-[8%] w-[4%] text-marigold" />
        <Sparkle className="absolute top-[8%] left-[44%] w-[3%] text-paper" />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 size-full"
        >
          <path
            d={`M0 ${Y0} Q50 ${YC} 100 ${Y2}`}
            fill="none"
            stroke="var(--lm-ink)"
            strokeOpacity=".6"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ul className="absolute inset-0">
          {items.map((product, index) => {
            const slot = SLOTS[index]
            const top = ropeY(slot.x) - PEG_FRACTION * slot.width * ASPECT
            const style: CSSProperties = {
              left: `${slot.x - slot.width / 2}%`,
              top: `${top}%`,
              width: `${slot.width}%`,
              animationDelay: slot.delay,
            }
            return (
              <li
                key={product.slug}
                className="absolute origin-[50%_7%] animate-sway motion-reduce:animate-none"
                style={style}
              >
                <Link
                  to="/produk/$slug"
                  params={{ slug: product.slug }}
                  className="group block rounded-3xl focus-visible:outline-offset-0"
                  aria-label={`${product.name} — lihat detail`}
                >
                  <img
                    src={`/images/products/${product.slug}-hang.svg`}
                    alt=""
                    width={420}
                    height={420}
                    fetchPriority={index < 2 ? "high" : "auto"}
                    className="w-full transition-transform duration-300 ease-(--ease-bounce) group-hover:translate-y-[3%] group-focus-visible:translate-y-[3%]"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
