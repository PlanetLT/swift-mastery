import type { Metadata } from "next"
import { sourceGroups, sourcesInGroup } from "@/lib/sources"

export const metadata: Metadata = {
  title: "Source library",
  description:
    "The official Apple pathways, documentation, WWDC sessions, Swift book, design guidelines, courses, and forums this guide is built from.",
}

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
        Ranked canon
      </p>
      <h1 className="mt-3 max-w-3xl font-heading text-4xl font-medium tracking-tight sm:text-5xl">
        The pages this guide is built from
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8">
        A perfect path is a short path you actually finish. These are the primary
        sources: Apple first, the Swift book for the language, then the courses
        and forums worth your hours. Lessons cite two to four of them, in the
        order you should open them.
      </p>
      <nav className="mt-6 flex flex-wrap gap-2">
        {sourceGroups.map((group) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted"
          >
            {group.title}
          </a>
        ))}
      </nav>
      <div className="mt-10 space-y-12">
        {sourceGroups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-20">
            <h2 className="font-heading text-3xl">{group.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {group.lede}
            </p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {sourcesInGroup(group.id).map((source) => (
                <li key={source.id} className="rounded-2xl border border-border bg-card px-4 py-4">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    {source.title}
                  </a>
                  <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                    {source.publisher}
                  </p>
                  <p className="mt-2 text-sm leading-6">{source.blurb}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
