import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import { LessonActions } from "@/components/lesson-actions"
import { mdxComponents } from "@/components/mdx/lesson-mdx"
import { TrackOutline } from "@/components/track-outline"
import { getLesson, getLessons, lessonsForTrack, neighbors } from "@/lib/lessons"
import { getSource } from "@/lib/sources"
import { getTrack, isTrackId, levelLabel } from "@/lib/tracks"

export const dynamicParams = false

export function generateStaticParams() {
  return getLessons().map((lesson) => ({
    track: lesson.meta.track,
    slug: lesson.meta.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>
}): Promise<Metadata> {
  const { track, slug } = await params
  if (!isTrackId(track)) {
    return { title: "Lesson" }
  }
  const lesson = getLesson(track, slug)
  if (!lesson) {
    return { title: "Lesson" }
  }
  return { title: lesson.meta.title, description: lesson.meta.summary }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ track: string; slug: string }>
}) {
  const { track: trackId, slug } = await params
  if (!isTrackId(trackId)) {
    notFound()
  }
  const lesson = getLesson(trackId, slug)
  if (!lesson) {
    notFound()
  }
  const track = getTrack(trackId)
  const { content } = await compileMDX({
    source: lesson.body,
    components: mdxComponents,
  })
  const { previous, next } = neighbors(lesson)
  const outline = lessonsForTrack(trackId).map((item) => item.meta)

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden lg:sticky lg:top-20 lg:block lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
        <Link
          href={`/learn/${track.id}`}
          className={`text-xs font-semibold tracking-[0.16em] uppercase ${track.textClass}`}
        >
          {track.label}
        </Link>
        <div className="mt-3">
          <TrackOutline lessons={outline} currentSlug={lesson.meta.slug} />
        </div>
      </aside>
      <article>
        <p className="text-sm text-muted-foreground">
          <Link href={`/learn/${track.id}`} className="hover:text-foreground">
            {track.label}
          </Link>
          <span aria-hidden> · </span>
          {levelLabel(lesson.meta.level)}
          <span aria-hidden> · </span>
          {lesson.meta.minutes} min read
        </p>
        <h1 className="mt-3 font-heading text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          {lesson.meta.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/85">
          {lesson.meta.summary}
        </p>
        <LessonActions slug={lesson.meta.slug} />
        <div className="lesson-prose prose prose-stone max-w-none prose-headings:font-heading prose-headings:font-semibold prose-h2:mt-10 prose-h2:text-2xl prose-p:leading-8">
          {content}
        </div>
        <section className="mt-10 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-2xl">Exit check</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
            {lesson.meta.exit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="font-heading text-2xl">Read next, in this order</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Official material first. One deeper session or course after that.
          </p>
          <ol className="mt-4 space-y-3">
            {lesson.meta.sources.map((sourceId, index) => {
              const source = getSource(sourceId)
              return (
                <li key={source.id} className="rounded-xl border border-border px-4 py-3">
                  <a
                    href={source.url}
                    className="font-medium underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {index + 1}. {source.title}
                  </a>
                  <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                    {source.publisher}
                  </p>
                  <p className="mt-1 text-sm leading-6">{source.blurb}</p>
                </li>
              )
            })}
          </ol>
        </section>
        <nav className="mt-10 grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/learn/${track.id}/${previous.meta.slug}`}
              className="rounded-xl border border-border px-4 py-3 hover:bg-muted"
            >
              <span className="text-xs text-muted-foreground">Previous</span>
              <span className="mt-1 block font-medium">{previous.meta.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/learn/${track.id}/${next.meta.slug}`}
              className="rounded-xl border border-border px-4 py-3 text-right hover:bg-muted"
            >
              <span className="text-xs text-muted-foreground">Next</span>
              <span className="mt-1 block font-medium">{next.meta.title}</span>
            </Link>
          ) : (
            <Link
              href="/map"
              className="rounded-xl border border-border px-4 py-3 text-right hover:bg-muted"
            >
              <span className="text-xs text-muted-foreground">After this track</span>
              <span className="mt-1 block font-medium">Open the transfer map</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  )
}
