import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { TrackProgress } from "@/components/track-progress"
import { buttonVariants } from "@/components/ui/button"
import { getLessons } from "@/lib/lessons"
import { tracks } from "@/lib/tracks"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Learn Swift once",
    text: "Types, optionals, SwiftUI state, and a list that survives a relaunch. The foundation track is required before any device.",
  },
  {
    number: "02",
    title: "Pick a surface",
    text: "iPhone is the default second step. Mac and Apple Watch use the same language and a different shape of interface.",
  },
  {
    number: "03",
    title: "Read the transfer",
    text: "Before the second device, open the transfer map. It names what you keep and what you have to relearn.",
  },
  {
    number: "04",
    title: "Follow one source",
    text: "Each lesson ends with a short ranked reading list. Official documentation first, then one session or one course.",
  },
]

export default function HomePage() {
  const slugs = getLessons().map((lesson) => lesson.meta.slug)

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] md:py-20">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Field guide · Swift 6 and SwiftUI
          </p>
          <h1 className="mt-4 max-w-xl font-heading text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl">
            One language.
            <span className="block">Three surfaces.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/85">
            A path from a first Swift file to a professional release on iPhone,
            Mac, and Apple Watch. The language is taught once. Each later lesson
            shows how the same idea changes in a hand, a window, and a glance.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/learn/foundation/the-machine-you-need"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}
            >
              Start with the machine
              <ArrowRight />
            </Link>
            <Link
              href="/map"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-4",
              )}
            >
              See what transfers
            </Link>
          </div>
        </div>
        <aside className="rounded-2xl border border-border bg-card p-5">
          <p className="font-heading text-2xl">How to use this guide</p>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            <li>Read a lesson, then type the exercise in Xcode on a Mac.</li>
            <li>Check off reading and the exercise. Progress stays in this browser.</li>
            <li>Open the ranked sources when you want the full document, not a summary.</li>
            <li>Older courses still use ObservableObject and UIKit. This guide tells you when.</li>
          </ul>
          <div className="mt-6 border-t border-border pt-4">
            <TrackProgress slugs={slugs} allowReset />
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="grid gap-4 md:grid-cols-2">
          {tracks.map((track) => (
            <Link
              key={track.id}
              href={`/learn/${track.id}`}
              className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/60"
            >
              <div className={`mb-4 h-1.5 w-16 rounded-full ${track.barClass}`} />
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {track.kicker}
              </p>
              <h2 className="mt-2 font-heading text-3xl font-medium">{track.title}</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-foreground/80">
                {track.description}
              </p>
              <p className={`mt-4 text-sm font-medium ${track.textClass}`}>
                {track.promise}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-heading text-3xl font-medium">The method</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.number} className="rounded-2xl border border-border p-4">
              <p className="font-mono text-xs text-muted-foreground">{step.number}</p>
              <h3 className="mt-2 font-heading text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/80">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-3xl font-medium">Who it is for</h2>
          <div className="mt-4 space-y-3 text-[1.02rem] leading-7">
            <p>
              You are new to programming, or new to Apple platforms, and you want
              a single path that does not restart the language every time the
              device changes.
            </p>
            <p>
              You already ship iPhone apps and want Mac or Apple Watch without a
              second beginner course. Read the foundation only where a topic is
              unfamiliar, then use the transfer map.
            </p>
            <p>
              Practice happens in Xcode. This site is the reading room: the idea,
              a short original sample, the mistake people make, and the page to
              open next.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-foreground px-5 py-6 text-background">
          <h2 className="font-heading text-3xl font-medium">What “pro” means here</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-background/85">
            <li>You can explain why a view updated.</li>
            <li>You can keep work off the main actor until the screen needs it.</li>
            <li>You can test the model without launching a device.</li>
            <li>You can name the privacy, signing, and review steps for the store you chose.</li>
            <li>You can read a release note and decide what your app must adopt.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
