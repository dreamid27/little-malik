import { absoluteUrl, site } from "@/config/site"
import { findById, sizes } from "@/content/catalog"
import type { Product } from "@/content/products"
import { formatRupiah } from "@/lib/format"

/** wa.me deep link — opens the app on mobile, WhatsApp Web on desktop. */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export type OrderSelection = {
  product: Product
  sizeId?: string
  colorName?: string
  quantity: number
}

export function buildOrderMessage({
  product,
  sizeId,
  colorName,
  quantity,
}: OrderSelection): string {
  const size = sizeId ? findById(sizes, sizeId)?.label : undefined
  const lines = [
    `Halo ${site.name}! Saya mau pesan:`,
    "",
    `• Produk: ${product.name}`,
    `• Ukuran: ${size ?? "belum dipilih"}`,
    `• Warna: ${colorName ?? product.colors.at(0)?.name ?? "-"}`,
    `• Jumlah: ${quantity}`,
    `• Harga: ${formatRupiah(product.price)} / pcs`,
    "",
    `Link: ${absoluteUrl(`/produk/${product.slug}`)}`,
    "",
    "Apakah stoknya tersedia? Terima kasih.",
  ]
  return lines.join("\n")
}

export function buildProductQuestionMessage(product: Product): string {
  return [
    `Halo ${site.name}! Saya mau tanya tentang ${product.name}.`,
    `Link: ${absoluteUrl(`/produk/${product.slug}`)}`,
  ].join("\n")
}

export type InquiryInput = {
  name: string
  topic: string
  message: string
}

export function buildInquiryMessage({
  name,
  topic,
  message,
}: InquiryInput): string {
  return [
    `Halo ${site.name}! Saya ${name.trim()}.`,
    `Topik: ${topic}`,
    "",
    message.trim(),
  ].join("\n")
}

export const defaultGreeting = `Halo ${site.name}! Saya mau tanya-tanya tentang koleksi baju anaknya.`
