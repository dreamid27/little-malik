import { Link } from "@tanstack/react-router"
import { useState } from "react"

import { MenuIcon, WhatsAppIcon } from "@/components/brand/icons"
import { Logo } from "@/components/brand/logo"
import { Sparkle } from "@/components/brand/illustrations"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { mainNav } from "@/config/navigation"
import { site } from "@/config/site"
import { buildWhatsAppUrl, defaultGreeting } from "@/lib/whatsapp"

const navLinkClass =
  "relative rounded-full px-4 py-2 font-semibold text-ink-soft transition-colors hover:text-ink data-[status=active]:text-ink"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md supports-backdrop-filter:bg-paper/75">
      <div className="container-page flex h-18 items-center justify-between gap-4 sm:h-20">
        <Link
          to="/"
          className="-my-2 shrink-0 rounded-xl"
          aria-label={`${site.name} — beranda`}
        >
          <Logo height={72} priority className="w-[4.5rem] sm:w-20" />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className={navLinkClass}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive ? (
                        <Sparkle className="absolute -top-0.5 left-1/2 size-2.5 -translate-x-1/2" />
                      ) : null}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppUrl(defaultGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "whatsapp",
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            <WhatsAppIcon />
            Chat WhatsApp
          </a>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Buka menu"
                />
              }
            >
              <MenuIcon className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] gap-0 bg-paper p-0">
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <Logo height={48} className="w-13" />
                <SheetTitle className="font-heading text-xl">Menu</SheetTitle>
              </div>
              <nav aria-label="Navigasi seluler" className="px-3 py-4">
                <ul className="flex flex-col">
                  {mainNav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        activeOptions={{ exact: item.to === "/" }}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-heading text-2xl text-ink-soft data-[status=active]:bg-butter data-[status=active]:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto border-t border-line p-5">
                <a
                  href={buildWhatsAppUrl(defaultGreeting)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: "whatsapp",
                    className: "w-full",
                  })}
                >
                  <WhatsAppIcon />
                  Chat {site.contact.whatsappDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
