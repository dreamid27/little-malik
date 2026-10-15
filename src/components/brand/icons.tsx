/**
 * Little Malik icon set — 24px grid, 1.9 stroke, round caps/joins.
 * Icons inherit `currentColor` and size from font-size (1em) unless a
 * `size-*` class is passed. Decorative by default (aria-hidden); pass
 * `title` to make an icon meaningful to assistive tech.
 */
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

export type IconProps = Omit<ComponentProps<"svg">, "children"> & {
  title?: string
}

function createIcon(
  name: string,
  paths: ReactNode,
  options?: { filled?: boolean }
) {
  function Icon({ title, className, ...props }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill={options?.filled ? "currentColor" : "none"}
        stroke={options?.filled ? "none" : "currentColor"}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={title ? undefined : true}
        role={title ? "img" : undefined}
        focusable="false"
        data-icon={name}
        className={cn("size-[1em] shrink-0", className)}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {paths}
      </svg>
    )
  }
  Icon.displayName = `${name}Icon`
  return Icon
}

export const MenuIcon = createIcon(
  "Menu",
  <>
    <path d="M4 7h16" />
    <path d="M4 12h11" />
    <path d="M4 17h16" />
  </>
)

export const CloseIcon = createIcon(
  "Close",
  <>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </>
)

export const SearchIcon = createIcon(
  "Search",
  <>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="M15 15l5 5" />
  </>
)

export const FilterIcon = createIcon(
  "Filter",
  <>
    <path d="M4 7h9" />
    <path d="M17 7h3" />
    <circle cx="15" cy="7" r="2" />
    <path d="M4 17h3" />
    <path d="M11 17h9" />
    <circle cx="9" cy="17" r="2" />
  </>
)

export const ChevronDownIcon = createIcon(
  "ChevronDown",
  <path d="M6 9.5l6 6 6-6" />
)
export const ChevronLeftIcon = createIcon(
  "ChevronLeft",
  <path d="M14.5 6l-6 6 6 6" />
)
export const ChevronRightIcon = createIcon(
  "ChevronRight",
  <path d="M9.5 6l6 6-6 6" />
)

export const PlusIcon = createIcon(
  "Plus",
  <>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </>
)

export const MinusIcon = createIcon("Minus", <path d="M5 12h14" />)

export const CheckIcon = createIcon(
  "Check",
  <path d="M5 12.5l4.5 4.5L19 7.5" />
)

export const WhatsAppIcon = createIcon(
  "WhatsApp",
  <path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.7 4.3 3.8 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.2Z" />,
  { filled: true }
)

export const InstagramIcon = createIcon(
  "Instagram",
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </>
)

export const MailIcon = createIcon(
  "Mail",
  <>
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="M4 7.5l8 5.5 8-5.5" />
  </>
)

export const ClockIcon = createIcon(
  "Clock",
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </>
)

export const MapPinIcon = createIcon(
  "MapPin",
  <>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </>
)

export const TruckIcon = createIcon(
  "Truck",
  <>
    <path d="M3 6.5h10.5v9H3z" />
    <path d="M13.5 9.5h4l3 3.2v2.8h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </>
)

/** Clothes hanger — the catalogue's signature glyph. */
export const HangerIcon = createIcon(
  "Hanger",
  <>
    <path d="M12 8.5V8a2.2 2.2 0 1 0-2.2-2.2" />
    <path d="M12 8.5l-8.6 6.6c-.8.6-.4 1.9.6 1.9h16c1 0 1.4-1.3.6-1.9L12 8.5Z" />
  </>
)

export const RulerIcon = createIcon(
  "Ruler",
  <>
    <rect x="2.8" y="8" width="18.4" height="8" rx="2" />
    <path d="M7 8v3" />
    <path d="M11 8v4" />
    <path d="M15 8v3" />
    <path d="M19 8v2" />
  </>
)

/** Four-point sparkle from the logo. */
export const SparkleIcon = createIcon(
  "Sparkle",
  <path d="M12 2.5c.7 4.6 2.4 6.6 7.5 9.5-5.1 2.9-6.8 4.9-7.5 9.5-.7-4.6-2.4-6.6-7.5-9.5 5.1-2.9 6.8-4.9 7.5-9.5Z" />,
  { filled: true }
)

export const HeartIcon = createIcon(
  "Heart",
  <path d="M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z" />
)

/** Cotton boll — soft fabrics. */
export const CottonIcon = createIcon(
  "Cotton",
  <>
    <path d="M12 13.5a3 3 0 1 1 2.2-5 3 3 0 1 1 1.6 5.6 3 3 0 1 1-3.8 2.4 3 3 0 1 1-3.8-2.4 3 3 0 1 1 1.6-5.6A3 3 0 0 1 12 13.5Z" />
    <path d="M12 16.5V21" />
  </>
)

/** Needle and thread — careful stitching. */
export const StitchIcon = createIcon(
  "Stitch",
  <>
    <path d="M19.5 4.5L8 16" />
    <path d="M18 3.5l2.5 2.5" />
    <path
      d="M8 16c-2.5 2.5-4.5 1-3.5-.8 1-1.8 4.6-.5 4 2.3-.4 1.8-2.4 2.8-4.5 2.5"
      strokeDasharray="2 2.2"
    />
  </>
)

export const ShieldIcon = createIcon(
  "Shield",
  <>
    <path d="M12 3l7 2.8v5.4c0 4.4-3 8-7 9.8-4-1.8-7-5.4-7-9.8V5.8L12 3Z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </>
)

export const SunIcon = createIcon(
  "Sun",
  <>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.8v1.8M12 19.4v1.8M2.8 12h1.8M19.4 12h1.8M5.5 5.5l1.3 1.3M17.2 17.2l1.3 1.3M5.5 18.5l1.3-1.3M17.2 6.8l1.3-1.3" />
  </>
)

export const ChatIcon = createIcon(
  "Chat",
  <>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
    <path d="M8.5 9.5h7" />
    <path d="M8.5 12.5h4" />
  </>
)

export const BagIcon = createIcon(
  "Bag",
  <>
    <path d="M5 8.5h14l-1 11a1.6 1.6 0 0 1-1.6 1.5H7.6A1.6 1.6 0 0 1 6 19.5l-1-11Z" />
    <path d="M9 10.5V7a3 3 0 0 1 6 0v3.5" />
  </>
)

export const TagIcon = createIcon(
  "Tag",
  <>
    <path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.1 6.1a1.5 1.5 0 0 1-2.1 0l-8.8-7.8Z" />
    <circle cx="8" cy="8" r="1.4" />
  </>
)

export const ArrowLeftIcon = createIcon(
  "ArrowLeft",
  <>
    <path d="M19 12H5" />
    <path d="M11 6l-6 6 6 6" />
  </>
)

export const SendIcon = createIcon(
  "Send",
  <>
    <path d="M20.5 3.5L10 14" />
    <path d="M20.5 3.5l-6.5 17-4-6.5-6.5-4 17-6.5Z" />
  </>
)
