import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  title: string
  description?: ReactNode
  action?: ReactNode
  id?: string
  className?: string
}

export function SectionHeading({
  title,
  description,
  action,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-xl">
        <h2 id={id} className="text-title">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-ink-soft">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
