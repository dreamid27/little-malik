import { Link, createFileRoute } from "@tanstack/react-router"

import {
  CottonIcon,
  HeartIcon,
  ShieldIcon,
  StitchIcon,
  SunIcon,
  TruckIcon,
} from "@/components/brand/icons"
import {
  Cloud,
  Sparkle,
  StrawHat,
  SunMascot,
} from "@/components/brand/illustrations"
import { WhatsAppCta } from "@/components/content/whatsapp-cta"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { SectionHeading } from "@/components/layout/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/config/site"
import { categories } from "@/content/catalog"
import { breadcrumbJsonLd, seo, storeJsonLd } from "@/lib/seo"

export const Route = createFileRoute("/tentang")({
  head: () =>
    seo({
      title: "Tentang kami",
      description: `Kenali ${site.name}: toko baju anak online dari Indonesia yang memilih katun lembut, jahitan rapi, dan desain ceria untuk usia 0–8 tahun.`,
      path: "/tentang",
      type: "article",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `Tentang ${site.name}`,
          url: `${site.url}/tentang`,
          about: { "@id": `${site.url}/#store` },
          inLanguage: site.language,
        },
        storeJsonLd(),
        breadcrumbJsonLd([
          { name: "Beranda", path: "/" },
          { name: "Tentang kami", path: "/tentang" },
        ]),
      ],
    }),
  component: AboutPage,
})

const values = [
  {
    icon: CottonIcon,
    title: "Nyaman dulu, baru gaya",
    body: "Anak-anak tidak peduli merek. Mereka peduli bajunya gatal atau tidak. Karena itu kami mulai dari bahan: katun yang adem dan lembut untuk cuaca tropis.",
  },
  {
    icon: StitchIcon,
    title: "Detail yang dipikirkan",
    body: "Kancing jepret untuk ganti popok, pinggang karet yang bisa dipakai sendiri, dan label cetak supaya tidak menggaruk tengkuk.",
  },
  {
    icon: ShieldIcon,
    title: "Aman untuk dipakai main",
    body: "Tanpa tali serut di leher, tinta sablon water-based, dan kancing bebas nikel. Hal kecil yang membuat orang tua tenang.",
  },
  {
    icon: SunIcon,
    title: "Ceria seperti hari cerah",
    body: "Warna matahari, langit, dan kebun bunga. Desain yang membuat si kecil senang memilih bajunya sendiri.",
  },
] as const

function AboutPage() {
  return (
    <>
      <section className="container-page pt-8">
        <Breadcrumbs
          items={[{ label: "Beranda", to: "/" }, { label: "Tentang kami" }]}
        />
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="text-display">
              Baju anak yang kami sendiri ingin pakaikan
            </h1>
            <div className="mt-8 max-w-[60ch] space-y-5 text-lg text-ink-soft">
              <p>
                {site.name} lahir dari hal sederhana: susahnya menemukan baju
                anak yang lembut, adem, dan tetap lucu dipakai seharian. Banyak
                baju yang cantik di foto, tapi gatal saat dipakai main di bawah
                matahari.
              </p>
              <p>
                Jadi kami mulai mengumpulkan baju yang memenuhi standar kami
                sendiri: bahannya nyaman, jahitannya rapi, dan desainnya membuat
                anak tersenyum. Hari ini kami melayani keluarga di seluruh
                Indonesia lewat satu cara yang paling akrab: chat WhatsApp.
              </p>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[3rem] bg-butter" />
            <SunMascot className="absolute -top-8 -right-6 w-36" />
            <Cloud className="absolute bottom-10 -left-8 w-44" />
            <StrawHat className="absolute top-[10%] left-1/2 w-[70%] -translate-x-1/2 -rotate-3" />
            <img
              src="/images/products/romper-pagi-cerah-1.svg"
              alt=""
              width={420}
              height={420}
              className="absolute bottom-[6%] left-[8%] w-[44%] -rotate-6"
            />
            <img
              src="/images/products/kaos-matahari-kecil-1.svg"
              alt=""
              width={420}
              height={420}
              className="absolute right-[6%] bottom-[8%] w-[44%] rotate-6"
            />
            <Sparkle className="absolute right-[18%] bottom-[22%] w-6" />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="values-title"
        className="container-page py-16 sm:py-24"
      >
        <SectionHeading id="values-title" title="Yang kami pegang" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <li
              key={v.title}
              className="rounded-[2rem] border-2 border-line bg-card p-7"
            >
              <v.icon className="size-9 text-marigold-deep" />
              <h3 className="mt-5 text-2xl">{v.title}</h3>
              <p className="mt-2 text-ink-soft">{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="facts-title"
        className="bg-sky-soft py-16 sm:py-20"
      >
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="facts-title" className="text-title">
              Sekilas {site.name}
            </h2>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="font-bold">Usia</dt>
                <dd className="text-ink-soft">0 bulan sampai 8 tahun</dd>
              </div>
              <div>
                <dt className="font-bold">Pemesanan</dt>
                <dd className="text-ink-soft">
                  Lewat WhatsApp{" "}
                  <span className="whitespace-nowrap">
                    {site.contact.whatsappDisplay}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-bold">Pengiriman</dt>
                <dd className="text-ink-soft">Ke seluruh Indonesia</dd>
              </div>
              <div>
                <dt className="font-bold">Jam layanan</dt>
                <dd className="text-ink-soft">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}, {h.time}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-2xl">Yang kami jual</h3>
            <ul className="mt-6 space-y-3">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/produk"
                    search={{ category: c.id }}
                    className="group flex items-baseline justify-between gap-4 border-b-2 border-ink/10 pb-3"
                  >
                    <span className="font-heading text-xl group-hover:text-marigold-deep">
                      {c.label}
                    </span>
                    <span className="text-right text-sm text-ink-soft">
                      {c.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex max-w-xl items-start gap-3 font-heading text-2xl">
          <HeartIcon className="mt-1 size-7 shrink-0 text-poppy" />
          Terima kasih sudah mempercayakan baju si kecil kepada kami.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/produk" className={buttonVariants()}>
            Lihat katalog
          </Link>
          <Link to="/kontak" className={buttonVariants({ variant: "outline" })}>
            <TruckIcon />
            Info pengiriman
          </Link>
        </div>
      </section>

      <WhatsAppCta
        title="Ingin ngobrol langsung?"
        body="Kami senang mendengar cerita dan masukan dari para orang tua. Sapa kami di WhatsApp kapan saja."
        message={`Halo ${site.name}! Saya mau kenalan dan tanya-tanya dulu.`}
      />
    </>
  )
}
