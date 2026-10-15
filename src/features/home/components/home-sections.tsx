import { Link } from "@tanstack/react-router"

import {
  CottonIcon,
  HangerIcon,
  ShieldIcon,
  StitchIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/brand/icons"
import { ScallopEdge, StrawHat } from "@/components/brand/illustrations"
import { SectionHeading } from "@/components/layout/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { ageGroups, categories } from "@/content/catalog"
import type { AgeGroupId } from "@/content/catalog"
import type { Product } from "@/content/products"
import { ProductCard } from "@/features/catalog/components/product-card"

const ageTiles: Record<AgeGroupId, { bg: string; art: string; blurb: string }> =
  {
    bayi: {
      bg: "bg-butter",
      art: "romper-pagi-cerah",
      blurb: "Romper dan overall lembut dengan kancing jepret.",
    },
    balita: {
      bg: "bg-sky",
      art: "overall-kebun-kecil",
      blurb: "Baju main yang gampang dipakai dan dilepas.",
    },
    anak: {
      bg: "bg-blush",
      art: "dress-kebun-bunga",
      blurb: "Dress, kemeja, koko, dan gamis untuk segala acara.",
    },
  }

export function ShopByAge() {
  return (
    <section
      aria-labelledby="age-title"
      className="container-page py-12 sm:py-16"
    >
      <SectionHeading
        id="age-title"
        title="Belanja sesuai usia"
        description="Ukuran kami dibuat untuk tubuh anak Indonesia, dari bayi baru lahir sampai 8 tahun."
      />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {ageGroups.map((age) => {
          const tile = ageTiles[age.id]
          return (
            <li key={age.id}>
              <Link
                to="/produk"
                search={{ age: age.id }}
                className={`group relative flex h-full min-h-64 flex-col overflow-hidden rounded-[2rem] p-7 ${tile.bg}`}
              >
                <span className="font-heading text-3xl">{age.short}</span>
                <span className="mt-1 font-bold text-ink-soft">
                  {age.label}
                </span>
                <span className="mt-3 max-w-[13rem] text-[0.95rem] text-ink-soft">
                  {tile.blurb}
                </span>
                <span className="mt-auto pt-6 font-bold underline decoration-marigold decoration-2 underline-offset-4">
                  Lihat koleksi {age.short.toLowerCase()}
                </span>
                <img
                  src={`/images/products/${tile.art}-1.svg`}
                  alt=""
                  width={420}
                  height={420}
                  loading="lazy"
                  className="pointer-events-none absolute -right-8 -bottom-8 w-52 rotate-6 transition-transform duration-500 ease-(--ease-bounce) group-hover:rotate-0"
                />
              </Link>
            </li>
          )
        })}
      </ul>

      <nav aria-label="Kategori" className="mt-8">
        <ul className="flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                to="/produk"
                search={{ category: c.id }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-card px-4 py-2 font-semibold transition-colors hover:border-ink"
              >
                <HangerIcon className="size-4 text-marigold-deep" />
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

export function NewArrivals({
  products,
}: {
  products: ReadonlyArray<Product>
}) {
  return (
    <section
      aria-labelledby="new-title"
      className="container-page py-12 sm:py-16"
    >
      <SectionHeading
        id="new-title"
        title="Baru dijemur minggu ini"
        description="Koleksi terbaru yang baru saja datang dari penjahit kami."
        action={
          <Link
            to="/produk"
            search={{ sort: "newest" }}
            className={buttonVariants({ variant: "outline" })}
          >
            Lihat semua produk
          </Link>
        }
      />
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  )
}

const steps = [
  {
    icon: HangerIcon,
    title: "Pilih baju",
    body: "Jelajahi katalog, lalu pilih ukuran, warna, dan jumlah yang diinginkan.",
  },
  {
    icon: WhatsAppIcon,
    title: "Kirim pesan WhatsApp",
    body: "Tekan “Pesan via WhatsApp”. Detail pesanan sudah terisi, tinggal kirim.",
  },
  {
    icon: TruckIcon,
    title: "Bayar & tunggu paket",
    body: "Admin konfirmasi stok dan ongkir. Setelah transfer, paket langsung dikirim.",
  },
] as const

export function HowToOrder() {
  return (
    <section aria-labelledby="order-title" className="mt-12 sm:mt-16">
      <ScallopEdge className="rotate-180 text-butter" />
      <div className="bg-butter py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            id="order-title"
            title="Pesan dalam tiga langkah"
            description="Tidak perlu daftar akun atau keranjang belanja. Cukup chat."
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-[2rem] bg-paper p-7 sticker"
              >
                <span className="absolute -top-5 right-6 grid size-11 place-items-center rounded-full border-2 border-ink bg-marigold font-heading text-xl">
                  {index + 1}
                </span>
                <step.icon className="size-9 text-marigold-deep" />
                <h3 className="mt-5 text-2xl">{step.title}</h3>
                <p className="mt-2 text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <ScallopEdge className="text-butter" />
    </section>
  )
}

const values = [
  {
    icon: CottonIcon,
    title: "Katun yang lembut",
    body: "Kami memilih katun combed, rayon, dan katun organik yang adem untuk iklim tropis.",
  },
  {
    icon: StitchIcon,
    title: "Jahitan yang rapi",
    body: "Jahitan rata di bagian dalam supaya tidak menggesek kulit saat si kecil bergerak.",
  },
  {
    icon: ShieldIcon,
    title: "Aman untuk anak",
    body: "Tinta water-based, kancing bebas nikel, dan tudung tanpa tali serut.",
  },
] as const

export function WhyUs() {
  return (
    <section
      aria-labelledby="why-title"
      className="container-page py-16 sm:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-md">
          <div className="aspect-square rounded-full bg-sky" />
          <StrawHat className="absolute top-[6%] left-1/2 w-[72%] -translate-x-1/2 -rotate-6" />
          <img
            src="/images/products/baju-koko-malik-1.svg"
            alt=""
            width={420}
            height={420}
            loading="lazy"
            className="absolute bottom-[4%] left-[2%] w-[46%] -rotate-6"
          />
          <img
            src="/images/products/gamis-mentari-1.svg"
            alt=""
            width={420}
            height={420}
            loading="lazy"
            className="absolute right-[0%] bottom-[2%] w-[48%] rotate-6"
          />
        </div>
        <div>
          <SectionHeading
            id="why-title"
            title="Dibuat seperti untuk anak sendiri"
            description="Little Malik berawal dari mencari baju yang nyaman untuk anak kami. Standar yang sama kami pakai untuk setiap potong baju."
          />
          <ul className="mt-10 space-y-7">
            {values.map((v) => (
              <li key={v.title} className="flex gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-butter text-marigold-deep">
                  <v.icon className="size-7" />
                </span>
                <div>
                  <h3 className="text-xl">{v.title}</h3>
                  <p className="mt-1 text-ink-soft">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/tentang"
            className={buttonVariants({ variant: "link", className: "mt-8" })}
          >
            Kenali Little Malik
          </Link>
        </div>
      </div>
    </section>
  )
}
