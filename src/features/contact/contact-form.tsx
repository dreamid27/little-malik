import { useId, useState } from "react"
import type { FormEvent } from "react"
import { z } from "zod"

import { MailIcon, WhatsAppIcon } from "@/components/brand/icons"
import { Button } from "@/components/ui/button"
import { site } from "@/config/site"
import { buildInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

export const contactTopics = [
  "Tanya stok & ukuran",
  "Status pesanan",
  "Tukar ukuran",
  "Pesanan dalam jumlah banyak",
  "Lainnya",
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Tulis nama Anda, minimal 2 huruf."),
  topic: z.enum(contactTopics),
  message: z
    .string()
    .trim()
    .min(10, "Ceritakan sedikit lebih detail, minimal 10 karakter.")
    .max(1000, "Pesan terlalu panjang, maksimal 1000 karakter."),
})

type FieldErrors = Partial<Record<"name" | "message", string>>

const fieldClass =
  "w-full rounded-2xl border-2 bg-card px-4 py-3 font-semibold placeholder:font-normal placeholder:text-ink-soft/70 focus:border-ink focus:outline-none"

/**
 * No backend: the form composes a WhatsApp (or email) message from the
 * fields and opens it in a new tab.
 */
export function ContactForm() {
  const id = useId()
  const [errors, setErrors] = useState<FieldErrors>({})

  function read(form: HTMLFormElement) {
    const data = new FormData(form)
    return contactSchema.safeParse({
      name: data.get("name"),
      topic: data.get("topic"),
      message: data.get("message"),
    })
  }

  function validate(form: HTMLFormElement) {
    const result = read(form)
    if (result.success) {
      setErrors({})
      return result.data
    }
    const next: FieldErrors = {}
    for (const issue of result.error.issues) {
      const key = issue.path[0]
      if ((key === "name" || key === "message") && !next[key])
        next[key] = issue.message
    }
    setErrors(next)
    form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus()
    return null
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = validate(event.currentTarget)
    if (!data) return
    window.open(
      buildWhatsAppUrl(buildInquiryMessage(data)),
      "_blank",
      "noopener,noreferrer"
    )
  }

  function onEmail(form: HTMLFormElement | null) {
    if (!form) return
    const data = validate(form)
    if (!data) return
    const subject = encodeURIComponent(`[${site.name}] ${data.topic}`)
    const body = encodeURIComponent(buildInquiryMessage(data))
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      aria-label="Formulir pesan"
    >
      <div>
        <label htmlFor={`${id}-name`} className="mb-2 block font-bold">
          Nama
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          placeholder="Contoh: Bunda Aisyah"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          onInput={() =>
            errors.name && setErrors((e) => ({ ...e, name: undefined }))
          }
          className={cn(
            fieldClass,
            errors.name ? "border-poppy" : "border-line"
          )}
        />
        {errors.name ? (
          <p
            id={`${id}-name-error`}
            className="mt-2 text-sm font-bold text-poppy"
          >
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${id}-topic`} className="mb-2 block font-bold">
          Topik
        </label>
        <select
          id={`${id}-topic`}
          name="topic"
          defaultValue={contactTopics[0]}
          className={cn(fieldClass, "border-line")}
        >
          {contactTopics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-2 block font-bold">
          Pesan
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          placeholder="Contoh: Apakah Dress Kebun Bunga ukuran 4 th warna kuning masih ada?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          onInput={() =>
            errors.message && setErrors((e) => ({ ...e, message: undefined }))
          }
          className={cn(
            fieldClass,
            "resize-y",
            errors.message ? "border-poppy" : "border-line"
          )}
        />
        {errors.message ? (
          <p
            id={`${id}-message-error`}
            className="mt-2 text-sm font-bold text-poppy"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          variant="whatsapp"
          size="lg"
          className="sm:flex-1"
        >
          <WhatsAppIcon />
          Kirim lewat WhatsApp
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={(e) => onEmail(e.currentTarget.form)}
        >
          <MailIcon />
          Kirim lewat email
        </Button>
      </div>
    </form>
  )
}
