"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { statusFor, useProgress } from "@/components/progress-store"
import type { LessonMeta } from "@/lib/lessons"
import { levelLabel } from "@/lib/tracks"
import { cn } from "@/lib/utils"

export function TrackOutline({
  lessons,
  currentSlug,
}: {
  lessons: LessonMeta[]
  currentSlug?: string
}) {
  const { ready, map } = useProgress()

  return (
    <ol className="space-y-1">
      {lessons.map((lesson) => {
        const status = statusFor(map, lesson.slug)
        const current = lesson.slug === currentSlug
        return (
          <li key={lesson.slug}>
            <Link
              href={`/learn/${lesson.track}/${lesson.slug}`}
              className={cn(
                "flex items-start gap-2 rounded-md px-2 py-1.5 text-sm leading-5",
                current ? "bg-foreground text-background" : "hover:bg-muted",
              )}
            >
              <span className="mt-0.5 w-4 shrink-0">
                {ready && status.read ? (
                  <Check className="size-3.5" aria-label="Read" />
                ) : (
                  <span className="block text-xs tabular-nums opacity-60">
                    {lesson.order}
                  </span>
                )}
              </span>
              <span>
                <span className="block">{lesson.title}</span>
                <span
                  className={cn(
                    "text-xs",
                    current ? "text-background/75" : "text-muted-foreground",
                  )}
                >
                  {levelLabel(lesson.level)}
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
