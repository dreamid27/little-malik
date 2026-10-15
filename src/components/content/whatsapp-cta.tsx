import { WhatsAppIcon } from "@/components/brand/icons"
import { Sparkle, SunMascot } from "@/components/brand/illustrations"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/config/site"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

type WhatsAppCtaProps = {
  title?: string
  body?: string
  message?: string
}

export function WhatsAppCta({
  title = "Bingung pilih ukuran?",
  body = "Kirim tinggi dan berat badan si kecil, kami bantu pilihkan ukuran yang pas. Biasanya kami balas dalam hitungan menit di jam kerja.",
  message = `Halo ${site.name}! Saya mau minta bantuan memilih ukuran.`,
}: WhatsAppCtaProps) {
  return (
    <section className="container-page py-12">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-marigold px-7 py-12 sticker sm:px-12 sm:py-14">
        <SunMascot className="absolute -top-14 -right-10 w-48 text-sun sm:w-64" />
        <Sparkle className="absolute right-[38%] bottom-8 hidden w-5 text-paper sm:block" />
        <div className="relative max-w-xl">
          <h2 className="text-title">{title}</h2>
          <p className="mt-3 text-lg text-ink/80">{body}</p>
          <a
            href={buildWhatsAppUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "ink",
              size: "lg",
              className: "mt-8",
            })}
          >
            <WhatsAppIcon />
            Chat {site.contact.whatsappDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
