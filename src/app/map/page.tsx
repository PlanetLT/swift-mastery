import type { Metadata } from "next"
import Link from "next/link"
import { transfers } from "@/lib/transfer"

export const metadata: Metadata = {
  title: "Transfer map",
  description:
    "What carries from iPhone to Mac to Apple Watch, and what you have to relearn on each surface.",
}

const columns = [
  { key: "iphone" as const, label: "iPhone", className: "text-ios" },
  { key: "mac" as const, label: "Mac", className: "text-mac" },
  { key: "watch" as const, label: "Watch", className: "text-watch" },
]

export default function MapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
        One language, three surfaces
      </p>
      <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
        What transfers, and what you learn again
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8">
        Finish the foundation, ship something small on one device, then use this
        map before you start the next track. The model moves. The interface and
        the store rules often do not.
      </p>
      <p className="mt-4 text-sm">
        <Link href="/learn/foundation" className="underline underline-offset-4">
          Foundation
        </Link>
        {" · "}
        <Link href="/learn/ios" className="underline underline-offset-4">
          iPhone
        </Link>
        {" · "}
        <Link href="/learn/mac" className="underline underline-offset-4">
          Mac
        </Link>
        {" · "}
        <Link href="/learn/watch" className="underline underline-offset-4">
          Apple Watch
        </Link>
      </p>

      <div className="mt-10 space-y-4">
        {transfers.map((row) => (
          <article key={row.skill} className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-2xl">{row.skill}</h2>
            <p className="mt-2 max-w-3xl leading-7">{row.carries}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {columns.map((column) => (
                <div key={column.key} className="rounded-xl bg-background px-3 py-3">
                  <p className={`text-xs font-semibold tracking-[0.14em] uppercase ${column.className}`}>
                    {column.label}
                  </p>
                  <p className="mt-2 text-sm leading-6">{row[column.key]}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
