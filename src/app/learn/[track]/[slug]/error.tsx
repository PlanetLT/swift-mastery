"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function LessonError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="font-heading text-3xl">This lesson did not open</h1>
      <p className="mt-3 leading-7 text-muted-foreground">
        The page failed while rendering. Try again, or go back to the track list.
      </p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}
