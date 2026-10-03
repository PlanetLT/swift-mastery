"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useProgress } from "@/components/progress-store"
import { cn } from "@/lib/utils"

const links = [
  { href: "/learn/foundation", label: "Foundation" },
  { href: "/learn/ios", label: "iPhone" },
  { href: "/learn/mac", label: "Mac" },
  { href: "/learn/watch", label: "Watch" },
  { href: "/map", label: "Transfer map" },
  { href: "/sources", label: "Sources" },
]

function NavLinks({
  onNavigate,
  stacked = false,
}: {
  onNavigate?: () => void
  stacked?: boolean
}) {
  const pathname = usePathname()
  return (
    <nav className={stacked ? "flex flex-col gap-1" : "flex flex-row items-center gap-0.5"}>
      {links.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`)
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "rounded-md px-2.5 py-2",
              stacked ? "text-base" : "text-sm",
              stacked
                ? active
                  ? "bg-background text-foreground"
                  : "text-background hover:bg-background/15"
                : active
                  ? "bg-foreground text-background"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function SiteHeader() {
  const { ready, map } = useProgress()
  const readCount = Object.values(map).filter((item) => item.read).length
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="font-heading text-lg tracking-tight">
          Swift Mastery
        </Link>
        <div className="ml-auto hidden md:block">
          <NavLinks />
        </div>
        <p className="ml-3 hidden text-xs text-muted-foreground lg:block">
          {ready ? `${readCount} read` : "Progress in this browser"}
        </p>
        <button
          type="button"
          className="ml-auto inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-foreground bg-foreground px-4 py-3 text-background md:hidden">
          <NavLinks stacked onNavigate={() => setOpen(false)} />
          <p className="mt-3 px-2.5 text-xs text-background/70">
            {ready
              ? `${readCount} lessons marked read on this device.`
              : "Reading progress is saved in this browser."}
          </p>
        </div>
      ) : null}
    </header>
  )
}
