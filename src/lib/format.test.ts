import { describe, expect, it } from "vitest"

import { backdropFor, luminance, mixHex } from "@/lib/color"
import { discountPercent, formatRupiah } from "@/lib/format"

describe("formatRupiah", () => {
  it("formats IDR without decimals using regular spaces", () => {
    expect(formatRupiah(89_000)).toBe("Rp 89.000")
    expect(formatRupiah(1_250_000)).toBe("Rp 1.250.000")
  })
})

describe("discountPercent", () => {
  it("rounds the saving", () => {
    expect(discountPercent(129_000, 149_000)).toBe(13)
  })
  it("returns 0 without a higher compare price", () => {
    expect(discountPercent(100_000)).toBe(0)
    expect(discountPercent(100_000, 90_000)).toBe(0)
  })
})

describe("color helpers", () => {
  it("mixes hex colours", () => {
    expect(mixHex("#000000", "#ffffff", 0.5)).toBe("#808080")
  })
  it("computes luminance at the extremes", () => {
    expect(luminance("#000000")).toBe(0)
    expect(luminance("#ffffff")).toBeCloseTo(1)
  })
  it("puts very light garments on sky so they stay visible", () => {
    expect(backdropFor("#FFF8EC")).toBe("#CFE8F3")
    expect(backdropFor("#9A3B2E")).not.toBe("#CFE8F3")
  })
})
