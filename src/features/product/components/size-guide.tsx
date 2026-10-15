import { RulerIcon } from "@/components/brand/icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { findById, sizes } from "@/content/catalog"
import type { Product } from "@/content/products"

export function SizeGuide({ product }: { product: Product }) {
  const rows = product.sizes
    .map((id) => findById(sizes, id))
    .filter((s): s is (typeof sizes)[number] => Boolean(s))

  return (
    <Dialog>
      <DialogTrigger className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm text-sm font-bold text-lagoon underline decoration-2 underline-offset-4">
        <RulerIcon className="size-4" />
        Panduan ukuran
      </DialogTrigger>
      <DialogContent className="rounded-[2rem] bg-paper p-7 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            Panduan ukuran
          </DialogTitle>
          <DialogDescription className="text-base text-ink-soft">
            Ukuran baju dalam sentimeter, diukur dalam keadaan rata. Jika ragu,
            pilih satu ukuran lebih besar.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden rounded-2xl border-2 border-line">
          <table className="w-full text-left text-[0.95rem]">
            <thead className="bg-butter">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold">
                  Ukuran
                </th>
                <th scope="col" className="px-4 py-3 font-bold">
                  Lebar dada
                </th>
                <th scope="col" className="px-4 py-3 font-bold">
                  Panjang
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-line bg-card">
              {rows.map((s) => (
                <tr key={s.id}>
                  <th scope="row" className="px-4 py-2.5 font-bold">
                    {s.label}
                  </th>
                  <td className="px-4 py-2.5 tabular-nums">{s.chest} cm</td>
                  <td className="px-4 py-2.5 tabular-nums">{s.length} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
