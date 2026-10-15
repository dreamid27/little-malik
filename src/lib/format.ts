const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
})

/** 89000 → "Rp 89.000" (Intl's non-breaking space normalised to a regular one). */
export function formatRupiah(value: number): string {
  return rupiah.format(value).replace(/\u00a0/g, " ")
}

/** Whole-number discount percentage, e.g. 149000 → 129000 = 13. */
export function discountPercent(
  price: number,
  compareAtPrice?: number
): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}
