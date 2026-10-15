import { Link } from "@tanstack/react-router"

import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/brand/icons"
import { Cloud, ScallopEdge, SunMascot } from "@/components/brand/illustrations"
import { Logo } from "@/components/brand/logo"
import { mainNav } from "@/config/navigation"
import { site } from "@/config/site"
import { categories } from "@/content/catalog"
import { buildWhatsAppUrl, defaultGreeting } from "@/lib/whatsapp"

const linkClass =
  "rounded-sm text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-24 text-ink">
      <ScallopEdge className="text-sky" />
      <div className="relative overflow-hidden bg-sky">
        <SunMascot className="pointer-events-none absolute -top-10 -right-8 size-40 opacity-90 sm:size-52" />
        <Cloud className="pointer-events-none absolute bottom-6 -left-10 w-48 opacity-70" />

        <div className="relative container-page grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Logo height={96} className="w-28" />
            <p className="mt-4 text-[0.95rem] text-ink-soft">
              {site.description}
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <h2 className="font-heading text-lg">Jelajahi</h2>
            <ul className="mt-4 space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-lg">Kategori</h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/produk"
                    search={{ category: c.id }}
                    className={linkClass}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-lg">Hubungi kami</h2>
            <ul className="mt-4 space-y-3 text-[0.95rem]">
              <li>
                <a
                  href={buildWhatsAppUrl(defaultGreeting)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <WhatsAppIcon className="size-5 text-whatsapp" />
                  {site.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <MailIcon className="size-5 text-lagoon" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <InstagramIcon className="size-5 text-rust" />
                  {site.social.instagram.handle}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ink-soft">
                <ClockIcon className="mt-0.5 size-5 text-marigold-deep" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-ink-soft">
                <TruckIcon className="size-5 text-lagoon" />
                Kirim ke seluruh Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-ink/10">
          <div className="container-page flex flex-col gap-2 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.name}. Dibuat dengan sayang untuk si kecil.
            </p>
            <p>Harga dalam Rupiah, belum termasuk ongkos kirim.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
