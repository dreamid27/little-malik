import { Link } from "@tanstack/react-router"

import { ChevronRightIcon } from "@/components/brand/icons"
import { cn } from "@/lib/utils"

export type Crumb = {
  label: string
  to?: string
  params?: Record<string, string>
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: ReadonlyArray<Crumb>
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-soft">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.to && !last ? (
                <Link
                  to={item.to}
                  params={item.params}
                  className="rounded-sm font-semibold hover:text-ink hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn(last && "text-ink")}
                >
                  {item.label}
                </span>
              )}
              {!last ? (
                <ChevronRightIcon className="size-3.5 opacity-60" />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
