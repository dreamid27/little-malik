import { createFileRoute, useHydrated } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"

import { FilterIcon, SearchIcon } from "@/components/brand/icons"
import { EmptyBasket } from "@/components/brand/illustrations"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { Button } from "@/components/ui/button"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sortOptions } from "@/content/catalog"
import type { SortId } from "@/content/catalog"
import { products } from "@/content/products"
import {
  activeFilterCount,
  catalogSearchSchema,
  filterProducts,
  toFilters,
} from "@/features/catalog/catalog-search"
import type { CatalogSearch } from "@/features/catalog/catalog-search"
import { ActiveFilters } from "@/features/catalog/components/active-filters"
import { FilterPanel } from "@/features/catalog/components/filter-panel"
import type { SearchUpdater } from "@/features/catalog/components/filter-panel"
import { ProductCard } from "@/features/catalog/components/product-card"
import { breadcrumbJsonLd, itemListJsonLd, seo } from "@/lib/seo"

export const Route = createFileRoute("/produk/")({
  validateSearch: catalogSearchSchema,
  head: () =>
    seo({
      title: "Katalog baju anak",
      description:
        "Lihat semua koleksi Little Malik: kaos, kemeja, dress, romper, overall, baju koko, gamis, dan topi untuk usia 0–8 tahun. Filter berdasarkan kategori, usia, dan harga.",
      path: "/produk",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Beranda", path: "/" },
          { name: "Katalog", path: "/produk" },
        ]),
        itemListJsonLd(products),
      ],
    }),
  component: CatalogPage,
})

const EMPTY_SEARCH: CatalogSearch = {}

function CatalogPage() {
  const urlSearch = Route.useSearch()
  const navigate = Route.useNavigate()
  // Pages are prerendered without query params; apply URL filters only after
  // hydration so server and client markup match.
  const hydrated = useHydrated()
  const search = hydrated ? urlSearch : EMPTY_SEARCH

  const filters = useMemo(() => toFilters(search), [search])
  const results = useMemo(() => filterProducts(products, filters), [filters])
  const activeCount = activeFilterCount(search) - (search.q ? 1 : 0)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const update: SearchUpdater = (updater) => {
    void navigate({
      search: (prev) => updater(prev),
      replace: true,
      resetScroll: false,
    })
  }
  const clearAll = () => {
    void navigate({ search: {}, replace: true, resetScroll: false })
  }

  return (
    <div className="container-page pt-8 pb-16">
      <Breadcrumbs
        items={[{ label: "Beranda", to: "/" }, { label: "Katalog" }]}
      />
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h1 className="text-title">Katalog</h1>
          <p className="mt-3 text-ink-soft">
            Semua koleksi Little Malik untuk usia 0–8 tahun. Pilih produk untuk
            melihat ukuran dan memesan lewat WhatsApp.
          </p>
        </div>
        <SearchBox
          key={hydrated ? "client" : "server"}
          initial={search.q ?? ""}
          onSearch={(q) => update((prev) => ({ ...prev, q: q || undefined }))}
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[17rem_1fr]">
        <aside aria-label="Filter produk" className="hidden lg:block">
          <div className="sticky top-28">
            <FilterPanel
              products={products}
              search={search}
              filters={filters}
              onChange={update}
            />
          </div>
        </aside>

        <section aria-labelledby="results-heading">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-line pb-4">
            <h2
              id="results-heading"
              className="font-sans text-base font-bold"
              aria-live="polite"
            >
              <span data-testid="result-count">{results.length}</span> produk
            </h2>
            <div className="flex items-center gap-2">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger
                  render={
                    <Button variant="outline" size="sm" className="lg:hidden" />
                  }
                >
                  <FilterIcon />
                  Filter
                  {activeCount > 0 ? (
                    <span className="grid size-5 place-items-center rounded-full bg-marigold text-xs text-ink">
                      {activeCount}
                    </span>
                  ) : null}
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-[88svh] rounded-t-[2rem] bg-paper"
                >
                  <div className="flex items-center justify-between px-6 pt-6">
                    <SheetTitle className="font-heading text-2xl">
                      Filter
                    </SheetTitle>
                  </div>
                  <FilterPanel
                    products={products}
                    search={search}
                    filters={filters}
                    onChange={update}
                    className="overflow-y-auto px-6"
                  />
                  <div className="flex gap-3 border-t-2 border-line px-6 py-4">
                    <Button
                      variant="ghost"
                      className="flex-1"
                      onClick={clearAll}
                    >
                      Hapus semua
                    </Button>
                    <Button
                      className="flex-[2]"
                      onClick={() => setFiltersOpen(false)}
                    >
                      Tampilkan {results.length} produk
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <label htmlFor="sort" className="sr-only">
                Urutkan
              </label>
              <NativeSelect
                id="sort"
                size="sm"
                value={filters.sort}
                onChange={(e) =>
                  update((prev) => {
                    const sort = e.target.value as SortId
                    return {
                      ...prev,
                      sort: sort === "featured" ? undefined : sort,
                    }
                  })
                }
                className="[&_select]:h-9 [&_select]:rounded-full [&_select]:border-2 [&_select]:border-line [&_select]:bg-card [&_select]:pr-9 [&_select]:pl-4 [&_select]:font-bold"
              >
                {sortOptions.map((o) => (
                  <NativeSelectOption key={o.id} value={o.id}>
                    {o.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>

          <ActiveFilters search={search} onChange={update} onClear={clearAll} />

          {results.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div
              className="mt-12 flex flex-col items-center text-center"
              data-testid="empty-state"
            >
              <EmptyBasket className="w-56" />
              <h3 className="mt-6 text-2xl">Belum ada yang cocok</h3>
              <p className="mt-2 max-w-sm text-ink-soft">
                Coba kurangi filter atau ganti kata pencarian. Atau tanyakan
                langsung, mungkin stoknya baru datang.
              </p>
              <Button variant="outline" className="mt-6" onClick={clearAll}>
                Hapus semua filter
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function SearchBox({
  initial,
  onSearch,
}: {
  initial: string
  onSearch: (q: string) => void
}) {
  const [value, setValue] = useState(initial)

  // Keep the field in sync when the query is cleared elsewhere (filter pills).
  useEffect(() => setValue(initial), [initial])

  // Debounce typing so the URL isn't rewritten on every keystroke.
  useEffect(() => {
    if (value.trim() === initial) return
    const id = window.setTimeout(() => onSearch(value.trim()), 300)
    return () => window.clearTimeout(id)
  }, [value, initial, onSearch])

  return (
    <form
      role="search"
      className="relative w-full lg:w-80"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(value.trim())
      }}
    >
      <label htmlFor="catalog-search" className="sr-only">
        Cari produk
      </label>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-soft" />
      <input
        id="catalog-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari kaos, gamis, romper…"
        autoComplete="off"
        className="h-12 w-full rounded-full border-2 border-line bg-card pr-4 pl-11 font-semibold placeholder:font-normal placeholder:text-ink-soft/70 focus:border-ink focus:outline-none"
      />
    </form>
  )
}
