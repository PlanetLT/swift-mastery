import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>A study guide for Swift on iPhone, Mac, and Apple Watch.</p>
        <div className="flex gap-4">
          <Link href="/map" className="hover:text-foreground">
            Transfer map
          </Link>
          <Link href="/sources" className="hover:text-foreground">
            Source library
          </Link>
        </div>
      </div>
    </footer>
  )
}
