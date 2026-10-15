import { CloseIcon } from "@/components/brand/icons"
import {
  ageGroups,
  categories,
  findById,
  genders,
  priceRanges,
} from "@/content/catalog"
import { splitList, toggleInList } from "@/features/catalog/catalog-search"
import type { CatalogSearch } from "@/features/catalog/catalog-search"
import type { SearchUpdater } from "@/features/catalog/components/filter-panel"

type Pill = {
  key: string
  label: string
  remove: (prev: CatalogSearch) => CatalogSearch
}

function buildPills(search: CatalogSearch): Array<Pill> {
  const pills: Array<Pill> = []
  if (search.q) {
    pills.push({
      key: "q",
      label: `“${search.q}”`,
      remove: (p) => ({ ...p, q: undefined }),
    })
  }
  for (const id of splitList(search.category)) {
    pills.push({
      key: `c-${id}`,
      label: findById(categories, id)?.label ?? id,
      remove: (p) => ({ ...p, category: toggleInList(p.category, id) }),
    })
  }
  for (const id of splitList(search.age)) {
    pills.push({
      key: `a-${id}`,
      label: findById(ageGroups, id)?.label ?? id,
      remove: (p) => ({ ...p, age: toggleInList(p.age, id) }),
    })
  }
  if (search.gender) {
    pills.push({
      key: "g",
      label: findById(genders, search.gender)?.label ?? search.gender,
      remove: (p) => ({ ...p, gender: undefined }),
    })
  }
  if (search.price) {
    pills.push({
      key: "p",
      label: findById(priceRanges, search.price)?.label ?? search.price,
      remove: (p) => ({ ...p, price: undefined }),
    })
  }
  if (search.promo) {
    pills.push({
      key: "promo",
      label: "Sedang promo",
      remove: (p) => ({ ...p, promo: undefined }),
    })
  }
  return pills
}

export function ActiveFilters({
  search,
  onChange,
  onClear,
}: {
  search: CatalogSearch
  onChange: SearchUpdater
  onClear: () => void
}) {
  const pills = buildPills(search)
  if (pills.length === 0) return null

  return (
    <div
      className="mt-4 flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Filter aktif"
    >
      {pills.map((pill) => (
        <button
          key={pill.key}
          type="button"
          onClick={() => onChange(pill.remove)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-butter py-1.5 pr-2.5 pl-3.5 text-sm font-bold transition-colors hover:bg-straw"
        >
          {pill.label}
          <CloseIcon
            className="size-3.5"
            title={`Hapus filter ${pill.label}`}
          />
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-bold text-lagoon underline decoration-2 underline-offset-4"
      >
        Hapus semua
      </button>
    </div>
  )
}
