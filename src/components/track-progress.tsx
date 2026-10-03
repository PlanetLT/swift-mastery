"use client"

import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { statusFor, useProgress } from "@/components/progress-store"
import { Button } from "@/components/ui/button"

export function TrackProgress({
  slugs,
  allowReset = false,
}: {
  slugs: string[]
  allowReset?: boolean
}) {
  const { ready, map, reset } = useProgress()
  const read = slugs.filter((slug) => statusFor(map, slug).read).length
  const exercises = slugs.filter((slug) => statusFor(map, slug).exercise).length
  const percent = slugs.length === 0 ? 0 : Math.round((read / slugs.length) * 100)

  if (!ready) {
    return (
      <p className="text-sm text-muted-foreground">
        Reading progress loads from this browser.
      </p>
    )
  }

  if (read === 0 && exercises === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nothing marked yet. Open the first lesson and check it off when you finish.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      <Progress value={percent}>
        <ProgressLabel>{read} of {slugs.length} lessons read</ProgressLabel>
        <ProgressValue />
      </Progress>
      <p className="text-sm text-muted-foreground">
        {exercises} exercise{exercises === 1 ? "" : "s"} checked off in Xcode.
      </p>
      {allowReset ? (
        <Button variant="outline" size="sm" onClick={reset}>
          Reset progress on this browser
        </Button>
      ) : null}
    </div>
  )
}
