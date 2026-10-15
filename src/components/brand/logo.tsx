import { cn } from "@/lib/utils"
import { site } from "@/config/site"

type LogoProps = {
  className?: string
  /** Rendered height in px; width follows the artwork's aspect ratio. */
  height?: number
  priority?: boolean
}

// Trimmed logo artwork is 480×432 (see scripts/generate-assets.ts).
const RATIO = 480 / 432

export function Logo({ className, height = 56, priority = false }: LogoProps) {
  return (
    <picture>
      <source srcSet="/images/brand/logo.webp" type="image/webp" />
      <img
        src="/images/brand/logo.png"
        alt={site.name}
        width={Math.round(height * RATIO)}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("h-auto select-none", className)}
        draggable={false}
      />
    </picture>
  )
}
