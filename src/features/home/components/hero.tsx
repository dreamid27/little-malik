import { Link } from "@tanstack/react-router"

import { CottonIcon, TruckIcon, WhatsAppIcon } from "@/components/brand/icons"
import { buttonVariants } from "@/components/ui/button"
import type { Product } from "@/content/products"
import { Clothesline } from "@/features/home/components/clothesline"
import { buildWhatsAppUrl, defaultGreeting } from "@/lib/whatsapp"

const promises = [
  { icon: CottonIcon, label: "Katun lembut" },
  { icon: TruckIcon, label: "Kirim se-Indonesia" },
  { icon: WhatsAppIcon, label: "Pesan via WhatsApp" },
] as const

export function Hero({ hanging }: { hanging: ReadonlyArray<Product> }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="container-page pt-6 pb-16 sm:pt-10 lg:pb-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="order-2 animate-rise lg:order-1">
          <h1 id="hero-title" className="text-display">
            Baju anak yang nyaman untuk{" "}
            <span className="whitespace-nowrap">hari-hari</span> cerah
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg text-ink-soft">
            Kaos, dress, romper, baju koko, dan gamis dari katun pilihan untuk
            usia 0–8 tahun. Pilih di katalog, pesan lewat WhatsApp, dan paketnya
            kami kirim ke rumah.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/produk" className={buttonVariants({ size: "lg" })}>
              Lihat katalog
            </Link>
            <a
              href={buildWhatsAppUrl(defaultGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <WhatsAppIcon className="text-whatsapp" />
              Tanya dulu
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem] font-semibold">
            {promises.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-butter text-marigold-deep">
                  <Icon className="size-5" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <Clothesline
          products={hanging}
          className="order-1 max-sm:aspect-[1.45] lg:order-2"
        />
      </div>
    </section>
  )
}
