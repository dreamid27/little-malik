import { cn } from "@/lib/utils"
import { formatRupiah } from "@/lib/format"

type PriceProps = {
  price: number
  compareAtPrice?: number
  size?: "md" | "lg"
  className?: string
}

export function Price({
  price,
  compareAtPrice,
  size = "md",
  className,
}: PriceProps) {
  const onSale = compareAtPrice !== undefined && compareAtPrice > price
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      <span
        data-testid="price"
        className={cn(
          "font-extrabold tabular-nums",
          size === "lg" ? "text-2xl sm:text-3xl" : "text-base",
          onSale ? "text-poppy" : "text-ink"
        )}
      >
        <span className="sr-only">{onSale ? "Harga promo: " : "Harga: "}</span>
        {formatRupiah(price)}
      </span>
      {onSale ? (
        <s
          className={cn(
            "text-ink-soft/80 tabular-nums",
            size === "lg" ? "text-lg" : "text-sm"
          )}
        >
          <span className="sr-only">Harga normal: </span>
          {formatRupiah(compareAtPrice)}
        </s>
      ) : null}
    </p>
  )
}
