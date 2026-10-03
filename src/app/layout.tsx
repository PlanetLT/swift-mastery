import type { Metadata } from "next"
import { Source_Code_Pro, Source_Sans_3, Source_Serif_4 } from "next/font/google"
import { ProgressProvider } from "@/components/progress-store"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
})

const sourceCode = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-source-code",
})

export const metadata: Metadata = {
  title: {
    default: "Swift Mastery",
    template: "%s · Swift Mastery",
  },
  description:
    "A beginner-to-professional study guide for Swift on iPhone, Mac, and Apple Watch. One language, three surfaces.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} ${sourceCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProgressProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </body>
    </html>
  )
}
