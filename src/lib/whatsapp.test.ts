import { describe, expect, it } from "vitest"

import { site } from "@/config/site"
import { getProductBySlug } from "@/content/products"
import {
  buildInquiryMessage,
  buildOrderMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp"

const product = getProductBySlug("dress-kebun-bunga")!

describe("buildWhatsAppUrl", () => {
  it("targets the store number on wa.me", () => {
    expect(buildWhatsAppUrl()).toBe(`https://wa.me/${site.contact.whatsapp}`)
    expect(site.contact.whatsapp).toBe("6281220330128")
  })

  it("URL-encodes the message", () => {
    const url = new URL(buildWhatsAppUrl("Halo & salam\nbaris dua"))
    expect(url.searchParams.get("text")).toBe("Halo & salam\nbaris dua")
  })
})

describe("buildOrderMessage", () => {
  it("includes product, size label, colour, quantity, price and link", () => {
    const message = buildOrderMessage({
      product,
      sizeId: "4y",
      colorName: "Merah Muda Blush",
      quantity: 2,
    })
    expect(message).toContain("Dress Kebun Bunga")
    expect(message).toContain("Ukuran: 4 th")
    expect(message).toContain("Warna: Merah Muda Blush")
    expect(message).toContain("Jumlah: 2")
    expect(message).toContain("Rp 169.000")
    expect(message).toContain(`${site.url}/produk/dress-kebun-bunga`)
  })

  it("falls back gracefully when size/colour are missing", () => {
    const message = buildOrderMessage({ product, quantity: 1 })
    expect(message).toContain("Ukuran: belum dipilih")
    expect(message).toContain(`Warna: ${product.colors[0].name}`)
  })
})

describe("buildInquiryMessage", () => {
  it("trims user input", () => {
    expect(
      buildInquiryMessage({ name: "  Aisyah ", topic: "Tukar ukuran", message: "  Halo  " })
    ).toBe(`Halo ${site.name}! Saya Aisyah.\nTopik: Tukar ukuran\n\nHalo`)
  })
})
