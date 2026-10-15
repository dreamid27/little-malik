import { createFileRoute } from "@tanstack/react-router"

import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/brand/icons"
import { FaqList } from "@/components/content/faq-list"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { site } from "@/config/site"
import { faqs } from "@/content/faqs"
import { ContactForm } from "@/features/contact/contact-form"
import { breadcrumbJsonLd, faqJsonLd, seo, storeJsonLd } from "@/lib/seo"
import { buildWhatsAppUrl, defaultGreeting } from "@/lib/whatsapp"

export const Route = createFileRoute("/kontak")({
  head: () =>
    seo({
      title: "Kontak",
      description: `Hubungi ${site.name} lewat WhatsApp ${site.contact.whatsappDisplay}, email ${site.contact.email}, atau Instagram ${site.social.instagram.handle}. Kami membantu soal stok, ukuran, dan pengiriman.`,
      path: "/kontak",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Kontak ${site.name}`,
          url: `${site.url}/kontak`,
          about: { "@id": `${site.url}/#store` },
        },
        storeJsonLd(),
        faqJsonLd(faqs),
        breadcrumbJsonLd([
          { name: "Beranda", path: "/" },
          { name: "Kontak", path: "/kontak" },
        ]),
      ],
    }),
  component: ContactPage,
})

const channels = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: site.contact.whatsappDisplay,
    note: "Paling cepat dibalas. Untuk pesanan, stok, dan ukuran.",
    href: buildWhatsAppUrl(defaultGreeting),
    tone: "bg-whatsapp text-white",
    external: true,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: site.contact.email,
    note: "Untuk kerja sama dan pesanan dalam jumlah banyak.",
    href: `mailto:${site.contact.email}`,
    tone: "bg-lagoon text-white",
    external: false,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: site.social.instagram.handle,
    note: "Lihat koleksi terbaru dan cerita di balik layar.",
    href: site.social.instagram.url,
    tone: "bg-rust text-white",
    external: true,
  },
] as const

function ContactPage() {
  return (
    <>
      <section className="container-page pt-8">
        <Breadcrumbs
          items={[{ label: "Beranda", to: "/" }, { label: "Kontak" }]}
        />
        <div className="mt-8 max-w-2xl">
          <h1 className="text-display">Mari ngobrol</h1>
          <p className="mt-5 text-lg text-ink-soft">
            Tanya stok, minta saran ukuran, atau cek status pesanan. Kami
            membalas setiap pesan sendiri, bukan bot.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex h-full flex-col rounded-[2rem] border-2 border-line bg-card p-7 transition-colors hover:border-ink"
              >
                <span
                  className={`grid size-12 place-items-center rounded-2xl ${c.tone}`}
                >
                  <c.icon className="size-6" />
                </span>
                <span className="mt-5 font-bold text-ink-soft">{c.label}</span>
                <span className="mt-1 font-heading text-xl break-all group-hover:underline sm:text-2xl">
                  {c.value}
                </span>
                <span className="mt-3 text-[0.95rem] text-ink-soft">
                  {c.note}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="form-title"
        className="container-page py-16 sm:py-20"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 id="form-title" className="text-title">
              Tulis pesan
            </h2>
            <p className="mt-3 max-w-md text-ink-soft">
              Isi formulir ini dan kami siapkan pesannya untuk Anda. Tinggal
              tekan kirim di WhatsApp atau aplikasi email.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <ClockIcon className="mt-1 size-6 shrink-0 text-marigold-deep" />
                <div>
                  <h3 className="font-sans text-base font-bold">Jam layanan</h3>
                  {site.hours.map((h) => (
                    <p key={h.days} className="text-ink-soft">
                      {h.days}: {h.time}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <TruckIcon className="mt-1 size-6 shrink-0 text-lagoon" />
                <div>
                  <h3 className="font-sans text-base font-bold">Pengiriman</h3>
                  <p className="text-ink-soft">
                    Toko online, kirim ke seluruh Indonesia. Pesanan dikirim
                    1×24 jam hari kerja setelah pembayaran.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-butter p-6 sm:p-9">
            <ContactForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-faq" className="container-page pb-8">
        <h2 id="contact-faq" className="text-title">
          Pertanyaan umum
        </h2>
        <FaqList faqs={faqs} className="mt-8" />
      </section>
    </>
  )
}
