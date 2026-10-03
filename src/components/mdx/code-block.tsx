import { createHighlighter, type Highlighter } from "shiki"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import { CopyCode } from "@/components/mdx/copy-code"

const highlighterPromise: Promise<Highlighter> = createHighlighter({
  themes: ["github-light"],
  langs: ["swift", "bash", "json", "text"],
  engine: createJavaScriptRegexEngine(),
})

async function highlight(code: string, lang: string) {
  const language = ["swift", "bash", "json", "text"].includes(lang) ? lang : "text"
  const highlighter = await highlighterPromise
  return highlighter.codeToHtml(code, {
    lang: language,
    theme: "github-light",
  })
}

function readCode(children: React.ReactNode): { code: string; lang: string } {
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    children.props
  ) {
    const props = children.props as {
      className?: string
      children?: React.ReactNode
    }
    const match = /language-([\w-]+)/.exec(props.className ?? "")
    const code = String(props.children ?? "").replace(/\n$/, "")
    return { code, lang: match?.[1] ?? "swift" }
  }
  return { code: String(children ?? "").replace(/\n$/, ""), lang: "text" }
}

export async function CodeBlock({
  children,
}: {
  children?: React.ReactNode
}) {
  const { code, lang } = readCode(children)
  if (!code.trim()) {
    return null
  }
  const html = await highlight(code, lang)
  return <CopyCode html={html} raw={code} />
}
