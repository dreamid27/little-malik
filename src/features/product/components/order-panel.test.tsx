import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it } from "vitest"

import { getProductBySlug } from "@/content/products"
import { OrderPanel } from "@/features/product/components/order-panel"

const product = getProductBySlug("dress-kebun-bunga")!

beforeAll(() => {
  // jsdom lacks these browser APIs.
  Element.prototype.scrollIntoView = () => {}
})

function orderText(link: HTMLElement) {
  return new URL(link.getAttribute("href")!).searchParams.get("text") ?? ""
}

describe("<OrderPanel>", () => {
  it("asks for a size before opening WhatsApp", async () => {
    const user = userEvent.setup()
    render(<OrderPanel product={product} />)

    await user.click(screen.getByTestId("order-whatsapp"))
    expect(screen.getByRole("alert")).toHaveTextContent("Pilih ukuran dulu")
  })

  it("prefills the WhatsApp message with the selection", async () => {
    const user = userEvent.setup()
    render(<OrderPanel product={product} />)

    await user.click(within(screen.getByTestId("size-options")).getByText("4 th"))
    await user.click(screen.getByRole("radio", { name: "Merah Muda Blush" }))
    await user.click(screen.getByRole("button", { name: "Tambah jumlah" }))
    await user.click(screen.getByRole("button", { name: "Tambah jumlah" }))

    expect(screen.getByTestId("quantity")).toHaveTextContent("3")
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()

    const message = orderText(screen.getByTestId("order-whatsapp"))
    expect(message).toContain("Ukuran: 4 th")
    expect(message).toContain("Warna: Merah Muda Blush")
    expect(message).toContain("Jumlah: 3")
  })

  it("keeps quantity at least 1", async () => {
    const user = userEvent.setup()
    render(<OrderPanel product={product} />)
    const minus = screen.getByRole("button", { name: "Kurangi jumlah" })
    expect(minus).toBeDisabled()
    await user.click(screen.getByRole("button", { name: "Tambah jumlah" }))
    await user.click(minus)
    expect(screen.getByTestId("quantity")).toHaveTextContent("1")
  })
})
