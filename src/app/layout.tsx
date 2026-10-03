import type { Metadata } from "next"
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google"
import { ProgressProvider } from "@/components/progress-store"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
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
      className={`${sourceSans.variable} ${fraunces.variable} ${plex.variable} h-full antialiased`}
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
