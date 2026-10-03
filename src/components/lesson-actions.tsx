"use client"

import { statusFor, useProgress } from "@/components/progress-store"

export function LessonActions({ slug }: { slug: string }) {
  const { ready, map, markRead, markExercise } = useProgress()
  const status = statusFor(map, slug)

  return (
    <fieldset
      className="not-prose my-6 grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2"
      disabled={!ready}
    >
      <legend className="px-1 text-xs tracking-[0.14em] text-muted-foreground uppercase">
        Your progress
      </legend>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          type="checkbox"
          className="mt-1 size-4 accent-ink"
          checked={ready ? status.read : false}
          onChange={(event) => markRead(slug, event.target.checked)}
        />
        <span>
          <span className="font-medium">I have read this lesson.</span>
          <span className="block text-muted-foreground">
            Saved only in this browser.
          </span>
        </span>
      </label>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          type="checkbox"
          className="mt-1 size-4 accent-ink"
          checked={ready ? status.exercise : false}
          onChange={(event) => markExercise(slug, event.target.checked)}
        />
        <span>
          <span className="font-medium">I did the exercise in Xcode.</span>
          <span className="block text-muted-foreground">
            Open the solution sketch only after you try.
          </span>
        </span>
      </label>
    </fieldset>
  )
}
