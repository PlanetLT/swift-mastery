import type { Metadata } from "next"
import Link from "next/link"
import { GuideMissing } from "@/components/guide-missing"
import { TrackOutline } from "@/components/track-outline"
import { TrackProgress } from "@/components/track-progress"
import { lessonsForTrack } from "@/lib/lessons"
import { getTrack, isTrackId, levels, tracks } from "@/lib/tracks"

export const dynamicParams = false

export function generateStaticParams() {
  return tracks.map((track) => ({ track: track.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>
}): Promise<Metadata> {
  const { track: trackId } = await params
  if (!isTrackId(trackId)) {
    return { title: "Track" }
  }
  const track = getTrack(trackId)
  return { title: track.title, description: track.description }
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>
}) {
  const { track: trackId } = await params
  if (!isTrackId(trackId)) {
    return <GuideMissing />
  }
  const track = getTrack(trackId)
  const lessons = lessonsForTrack(trackId)
  const first = lessons[0]

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          In this track
        </p>
        <TrackOutline lessons={lessons.map((lesson) => lesson.meta)} />
      </aside>
      <div>
        <p className={`text-xs font-semibold tracking-[0.16em] uppercase ${track.textClass}`}>
          {track.kicker}
        </p>
        <h1 className="mt-2 font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          {track.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8">{track.description}</p>
        <div className="mt-6 max-w-xl">
          <TrackProgress slugs={lessons.map((lesson) => lesson.meta.slug)} />
        </div>
        {trackId !== "foundation" ? (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            Finish the{" "}
            <Link href="/learn/foundation" className="underline underline-offset-4">
              foundation
            </Link>{" "}
            first if SwiftUI state is still new. Then come back here.
          </p>
        ) : null}
        {first ? (
          <p className="mt-6">
            <Link
              href={`/learn/${track.id}/${first.meta.slug}`}
              className="font-medium underline underline-offset-4"
            >
              Begin with {first.meta.title}
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            This track has no lessons yet.
          </p>
        )}

        <div className="mt-10 space-y-10">
          {levels.map((level) => {
            const group = lessons.filter((lesson) => lesson.meta.level === level.id)
            if (group.length === 0) {
              return null
            }
            return (
              <section key={level.id}>
                <h2 className="font-heading text-2xl">{level.label}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{level.detail}</p>
                <ol className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
                  {group.map((lesson) => (
                    <li key={lesson.meta.slug}>
                      <Link
                        href={`/learn/${track.id}/${lesson.meta.slug}`}
                        className="flex flex-col gap-1 px-4 py-4 hover:bg-muted/70 sm:flex-row sm:items-baseline sm:justify-between"
                      >
                        <span>
                          <span className="mr-3 font-mono text-xs text-muted-foreground">
                            {String(lesson.meta.order).padStart(2, "0")}
                          </span>
                          <span className="font-medium">{lesson.meta.title}</span>
                          <span className="mt-1 block pl-8 text-sm text-muted-foreground sm:pl-0 sm:mt-1">
                            {lesson.meta.summary}
                          </span>
                        </span>
                        <span className="pl-8 text-xs text-muted-foreground sm:pl-0 sm:whitespace-nowrap">
                          {lesson.meta.minutes} min
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
