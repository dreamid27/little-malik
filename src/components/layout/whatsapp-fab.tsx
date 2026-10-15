import { useRouterState } from "@tanstack/react-router"

import { WhatsAppIcon } from "@/components/brand/icons"
import { buildWhatsAppUrl, defaultGreeting } from "@/lib/whatsapp"

/**
 * Floating WhatsApp shortcut. Hidden on product pages, which have their own
 * sticky "Pesan via WhatsApp" bar with the selected size/colour prefilled.
 */
export function WhatsAppFab() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  if (pathname.startsWith("/produk/")) return null

  return (
    <a
      href={buildWhatsAppUrl(defaultGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat dengan Little Malik di WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-white sticker transition-transform duration-200 ease-(--ease-bounce) hover:-translate-y-1 sm:right-6 sm:bottom-6 sm:size-16"
    >
      <WhatsAppIcon className="size-7 sm:size-8" />
    </a>
  )
}
