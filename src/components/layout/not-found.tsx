import { Link } from "@tanstack/react-router"

import { LostSock } from "@/components/brand/illustrations"
import { buttonVariants } from "@/components/ui/button"

export function NotFound() {
  return (
    <section className="container-page grid min-h-[60svh] items-center gap-10 py-16 md:grid-cols-2">
      <div className="max-w-md">
        <p className="font-heading text-6xl text-marigold">404</p>
        <h1 className="mt-3 text-title">Halaman ini tidak ditemukan</h1>
        <p className="mt-4 text-ink-soft">
          Seperti kaus kaki yang hilang sebelah, halaman yang Anda cari tidak
          ada di sini. Mungkin tautannya sudah berubah atau salah ketik.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/produk" className={buttonVariants()}>
            Lihat katalog
          </Link>
          <Link to="/" className={buttonVariants({ variant: "outline" })}>
            Kembali ke beranda
          </Link>
        </div>
      </div>
      <LostSock className="mx-auto w-full max-w-sm" />
    </section>
  )
}
