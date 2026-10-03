"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CopyCode({ html, raw }: { html: string; raw: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="not-prose relative my-6">
      <button
        type="button"
        className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
        onClick={async () => {
          await navigator.clipboard.writeText(raw)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1400)
        }}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <div
        className="[&_pre]:m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
