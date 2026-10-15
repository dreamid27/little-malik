import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { ContactForm } from "@/features/contact/contact-form"

afterEach(() => vi.restoreAllMocks())

describe("<ContactForm>", () => {
  it("shows field errors and does not open WhatsApp when invalid", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null)
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole("button", { name: /Kirim lewat WhatsApp/ }))

    expect(screen.getByText(/Tulis nama Anda/)).toBeInTheDocument()
    expect(screen.getByText(/minimal 10 karakter/)).toBeInTheDocument()
    expect(screen.getByLabelText("Nama")).toHaveAttribute("aria-invalid", "true")
    expect(open).not.toHaveBeenCalled()
  })

  it("opens WhatsApp with the composed message when valid", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null)
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText("Nama"), "Bunda Aisyah")
    await user.selectOptions(screen.getByLabelText("Topik"), "Tukar ukuran")
    await user.type(screen.getByLabelText("Pesan"), "Mau tukar ukuran dress ke 5 th.")
    await user.click(screen.getByRole("button", { name: /Kirim lewat WhatsApp/ }))

    expect(open).toHaveBeenCalledOnce()
    const url = new URL(open.mock.calls[0][0] as string)
    expect(url.origin + url.pathname).toBe("https://wa.me/6281220330128")
    const text = url.searchParams.get("text")
    expect(text).toContain("Saya Bunda Aisyah")
    expect(text).toContain("Topik: Tukar ukuran")
    expect(text).toContain("Mau tukar ukuran dress ke 5 th.")
  })
})
