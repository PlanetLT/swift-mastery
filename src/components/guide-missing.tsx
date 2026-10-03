import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GuideMissing() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
        Missing page
      </p>
      <h1 className="mt-3 font-heading text-4xl">That page is not in the guide</h1>
      <p className="mt-4 leading-7">
        The lesson or track address does not match anything written here. Start
        from the foundation, or open the source library.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/learn/foundation" className={cn(buttonVariants())}>
          Foundation track
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          Home
        </Link>
      </div>
    </div>
  )
}
