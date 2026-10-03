import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "@/components/mdx/code-block"
import { Solution } from "@/components/mdx/solution"

export function Callout({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <aside className="not-prose my-8 rounded-xl border border-watch/30 bg-watch/8 px-4 py-4">
      <p className="font-heading text-lg text-watch">{title}</p>
      <div className="mt-2 space-y-3 text-[0.98rem] leading-7 text-foreground">
        {children}
      </div>
    </aside>
  )
}

const surfaceTone: Record<string, string> = {
  iPhone: "border-ios/30 bg-ios/8",
  Mac: "border-mac/30 bg-mac/8",
  Watch: "border-watch/30 bg-watch/8",
}

export function Surface({
  name,
  children,
}: {
  name: "iPhone" | "Mac" | "Watch"
  children: React.ReactNode
}) {
  return (
    <div className={`rounded-xl border px-4 py-3 ${surfaceTone[name] ?? ""}`}>
      <p className="text-xs font-semibold tracking-[0.14em] uppercase">{name}</p>
      <div className="mt-2 space-y-2 text-sm leading-6">{children}</div>
    </div>
  )
}

export function Surfaces({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 grid gap-3 md:grid-cols-3">{children}</div>
  )
}

export const mdxComponents: MDXComponents = {
  pre: CodeBlock,
  Callout,
  Surface,
  Surfaces,
  Solution,
}
