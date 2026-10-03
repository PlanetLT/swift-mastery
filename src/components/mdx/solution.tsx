"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Solution({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl border border-border bg-card">
      <Accordion>
        <AccordionItem value="solution" className="border-none">
          <AccordionTrigger className="px-4 py-3 font-heading text-base hover:no-underline">
            Solution sketch
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="lesson-prose prose prose-stone max-w-none text-[0.98rem] leading-7">
              {children}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
