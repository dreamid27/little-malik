import type { ReactNode } from "react"

import { CheckIcon } from "@/components/brand/icons"
import { ageGroups, categories, genders, priceRanges } from "@/content/catalog"
import type { Product } from "@/content/products"
import { facetCount, toggleInList } from "@/features/catalog/catalog-search"
import type {
  CatalogFilters,
  CatalogSearch,
} from "@/features/catalog/catalog-search"
import { cn } from "@/lib/utils"

export type SearchUpdater = (
  updater: (prev: CatalogSearch) => CatalogSearch
) => void

type FilterPanelProps = {
  products: ReadonlyArray<Product>
  search: CatalogSearch
  filters: CatalogFilters
  onChange: SearchUpdater
  className?: string
}

function FilterGroup({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <fieldset className="border-b-2 border-line py-5 first:pt-0 last:border-b-0">
      <legend className="float-left mb-3 w-full font-heading text-lg">
        {title}
      </legend>
      <div className="clear-left flex flex-wrap gap-2">{children}</div>
    </fieldset>
  )
}

type ChipProps = {
  label: string
  count: number
  pressed: boolean
  onClick: () => void
}

function FilterChip({ label, count, pressed, onClick }: ChipProps) {
  const disabled = count === 0 && !pressed
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-sm font-bold transition-colors duration-150",
        pressed
          ? "border-ink bg-ink text-paper"
          : "border-line bg-card text-ink hover:border-ink/60",
        disabled && "cursor-not-allowed opacity-40 hover:border-line"
      )}
    >
      {pressed ? <CheckIcon className="size-3.5" /> : null}
      {label}
      <span
        className={cn(
          "tabular-nums",
          pressed ? "text-paper/70" : "text-ink-soft"
        )}
      >
        {count}
      </span>
    </button>
  )
}

export function FilterPanel({
  products,
  search,
  filters,
  onChange,
  className,
}: FilterPanelProps) {
  return (
    <div className={className}>
      <FilterGroup title="Kategori">
        {categories.map((c) => (
          <FilterChip
            key={c.id}
            label={c.label}
            pressed={filters.categories.includes(c.id)}
            count={facetCount(
              products,
              filters,
              "categories",
              (p) => p.category === c.id
            )}
            onClick={() =>
              onChange((prev) => ({
                ...prev,
                category: toggleInList(prev.category, c.id),
              }))
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Usia">
        {ageGroups.map((a) => (
          <FilterChip
            key={a.id}
            label={a.label}
            pressed={filters.ages.includes(a.id)}
            count={facetCount(products, filters, "ages", (p) =>
              p.ageGroups.includes(a.id)
            )}
            onClick={() =>
              onChange((prev) => ({
                ...prev,
                age: toggleInList(prev.age, a.id),
              }))
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Untuk">
        {genders.map((g) => (
          <FilterChip
            key={g.id}
            label={g.label}
            pressed={search.gender === g.id}
            count={facetCount(
              products,
              filters,
              "gender",
              (p) =>
                p.gender === g.id ||
                (p.gender === "unisex" && g.id !== "unisex")
            )}
            onClick={() =>
              onChange((prev) => ({
                ...prev,
                gender: prev.gender === g.id ? undefined : g.id,
              }))
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Harga">
        {priceRanges.map((r) => (
          <FilterChip
            key={r.id}
            label={r.label}
            pressed={search.price === r.id}
            count={facetCount(
              products,
              filters,
              "price",
              (p) => p.price >= r.min && p.price <= r.max
            )}
            onClick={() =>
              onChange((prev) => ({
                ...prev,
                price: prev.price === r.id ? undefined : r.id,
              }))
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Penawaran">
        <FilterChip
          label="Sedang promo"
          pressed={filters.promo}
          count={facetCount(products, filters, "promo", (p) =>
            Boolean(p.compareAtPrice)
          )}
          onClick={() =>
            onChange((prev) => ({
              ...prev,
              promo: prev.promo ? undefined : true,
            }))
          }
        />
      </FilterGroup>
    </div>
  )
}
