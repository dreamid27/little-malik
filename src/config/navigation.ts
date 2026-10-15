export const mainNav = [
  { to: "/", label: "Beranda" },
  { to: "/produk", label: "Katalog" },
  { to: "/tentang", label: "Tentang kami" },
  { to: "/kontak", label: "Kontak" },
] as const

export type MainNavItem = (typeof mainNav)[number]
