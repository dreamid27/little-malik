import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

type Faq = { question: string; answer: string }

export function FaqList({
  faqs,
  className,
}: {
  faqs: ReadonlyArray<Faq>
  className?: string
}) {
  return (
    <Accordion
      className={cn("divide-y-2 divide-line border-y-2 border-line", className)}
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.question}
          value={faq.question}
          className="not-last:border-b-0"
        >
          <AccordionTrigger className="py-5 text-left font-heading text-lg leading-snug hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-marigold-deep sm:text-xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="max-w-[62ch] pb-2 text-base text-ink-soft">
              {faq.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
