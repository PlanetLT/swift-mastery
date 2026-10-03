import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { getSource } from "@/lib/sources"
import {
  isTrackId,
  levelIds,
  type LevelId,
  type TrackId,
} from "@/lib/tracks"

export type LessonMeta = {
  title: string
  slug: string
  track: TrackId
  level: LevelId
  order: number
  minutes: number
  summary: string
  exit: string[]
  sources: string[]
}

export type Lesson = {
  meta: LessonMeta
  body: string
}

const lessonsDirectory = path.join(process.cwd(), "content", "lessons")

function asString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${file}: ${field} must be a non-empty string`)
  }
  return value.trim()
}

function asStringList(value: unknown, field: string, file: string): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${file}: ${field} must be a non-empty list`)
  }
  return value.map((item, index) => {
    if (typeof item !== "string" || item.trim().length === 0) {
      throw new Error(`${file}: ${field}[${index}] must be a string`)
    }
    return item.trim()
  })
}

function parseLesson(file: string): Lesson {
  const fullPath = path.join(lessonsDirectory, file)
  const raw = fs.readFileSync(fullPath, "utf8")
  const parsed = matter(raw)
  const data = parsed.data
  const slug = asString(data.slug, "slug", file)
  const expected = `${slug}.mdx`
  if (file !== expected) {
    throw new Error(`${file}: filename must be ${expected}`)
  }
  const trackValue = asString(data.track, "track", file)
  if (!isTrackId(trackValue)) {
    throw new Error(`${file}: unknown track ${trackValue}`)
  }
  const levelValue = asString(data.level, "level", file)
  if (!(levelIds as readonly string[]).includes(levelValue)) {
    throw new Error(`${file}: unknown level ${levelValue}`)
  }
  const order = data.order
  const minutes = data.minutes
  if (typeof order !== "number" || order < 1) {
    throw new Error(`${file}: order must be a positive number`)
  }
  if (typeof minutes !== "number" || minutes < 5) {
    throw new Error(`${file}: minutes must be a number of at least 5`)
  }
  const sources = asStringList(data.sources, "sources", file)
  for (const sourceId of sources) {
    getSource(sourceId)
  }
  return {
    meta: {
      title: asString(data.title, "title", file),
      slug,
      track: trackValue,
      level: levelValue as LevelId,
      order,
      minutes,
      summary: asString(data.summary, "summary", file),
      exit: asStringList(data.exit, "exit", file),
      sources,
    },
    body: parsed.content.trim(),
  }
}

let cached: Lesson[] | null = null

export function getLessons(): Lesson[] {
  if (cached) {
    return cached
  }
  if (!fs.existsSync(lessonsDirectory)) {
    throw new Error(`Missing lessons directory: ${lessonsDirectory}`)
  }
  const files = fs
    .readdirSync(lessonsDirectory)
    .filter((file) => file.endsWith(".mdx"))
  const lessons = files.map(parseLesson)
  const slugs = new Set<string>()
  const orders = new Set<string>()
  for (const lesson of lessons) {
    if (slugs.has(lesson.meta.slug)) {
      throw new Error(`Duplicate slug: ${lesson.meta.slug}`)
    }
    slugs.add(lesson.meta.slug)
    const orderKey = `${lesson.meta.track}:${lesson.meta.order}`
    if (orders.has(orderKey)) {
      throw new Error(`Duplicate order ${orderKey}`)
    }
    orders.add(orderKey)
  }
  cached = lessons.sort((a, b) => {
    if (a.meta.track === b.meta.track) {
      return a.meta.order - b.meta.order
    }
    return a.meta.track.localeCompare(b.meta.track)
  })
  return cached
}

export function lessonsForTrack(track: TrackId): Lesson[] {
  return getLessons()
    .filter((lesson) => lesson.meta.track === track)
    .sort((a, b) => a.meta.order - b.meta.order)
}

export function getLesson(track: TrackId, slug: string): Lesson | undefined {
  return lessonsForTrack(track).find((lesson) => lesson.meta.slug === slug)
}

export function neighbors(lesson: Lesson): {
  previous?: Lesson
  next?: Lesson
} {
  const trackLessons = lessonsForTrack(lesson.meta.track)
  const index = trackLessons.findIndex(
    (item) => item.meta.slug === lesson.meta.slug,
  )
  return {
    previous: index > 0 ? trackLessons[index - 1] : undefined,
    next: index < trackLessons.length - 1 ? trackLessons[index + 1] : undefined,
  }
}
