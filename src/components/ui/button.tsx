import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const baseButtonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-2 bg-clip-padding font-bold whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-200 ease-(--ease-out-soft) outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  {
    variants: {
      variant: {
        /** Sticker button: ink outline + hard offset shadow, like the logo. */
        default:
          "border-ink bg-primary text-primary-foreground shadow-offset-sm hover:-translate-x-px hover:-translate-y-px hover:shadow-offset active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        whatsapp:
          "border-ink bg-whatsapp text-white shadow-offset-sm hover:-translate-x-px hover:-translate-y-px hover:shadow-offset active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        ink: "border-transparent bg-ink text-paper hover:bg-ink/90",
        outline:
          "border-ink bg-transparent text-foreground hover:bg-butter aria-expanded:bg-butter",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-straw aria-expanded:bg-straw",
        ghost:
          "border-transparent font-semibold hover:bg-sand hover:text-foreground aria-expanded:bg-sand",
        destructive:
          "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "h-auto! rounded-none border-0 border-transparent px-0! font-semibold text-lagoon underline decoration-2 underline-offset-4 hover:decoration-sun",
      },
      size: {
        default: "h-11 gap-2 px-5 text-[0.95rem]",
        xs: "h-7 gap-1 px-2.5 text-xs",
        sm: "h-9 gap-1.5 px-4 text-sm",
        lg: "h-13 gap-2.5 px-7 text-base",
        icon: "size-11",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-9",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonVariantProps = VariantProps<typeof baseButtonVariants> & {
  className?: string
}

/**
 * Class names for button-styled elements (e.g. links). Output is merged with
 * `cn` so a `className` override reliably wins over variant defaults.
 */
function buttonVariants({ className, ...props }: ButtonVariantProps = {}) {
  return cn(baseButtonVariants(props), className)
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof baseButtonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={
        typeof className === "function"
          ? (state) =>
              buttonVariants({ variant, size, className: className(state) })
          : buttonVariants({ variant, size, className })
      }
      {...props}
    />
  )
}

export { Button, buttonVariants }
