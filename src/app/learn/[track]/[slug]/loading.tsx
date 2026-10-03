export default function LessonLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm text-muted-foreground">Opening the lesson…</p>
      <div className="mt-4 h-10 w-2/3 animate-pulse rounded-lg bg-muted" />
      <div className="mt-6 space-y-3">
        <div className="h-4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
