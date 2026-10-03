export const trackIds = ["foundation", "ios", "mac", "watch"] as const
export type TrackId = (typeof trackIds)[number]

export const levelIds = [
  "beginner",
  "intermediate",
  "advanced",
  "professional",
] as const
export type LevelId = (typeof levelIds)[number]

export type Track = {
  id: TrackId
  label: string
  kicker: string
  title: string
  description: string
  promise: string
  accentClass: string
  barClass: string
  softClass: string
  textClass: string
}

export const tracks: Track[] = [
  {
    id: "foundation",
    label: "Foundation",
    kicker: "Shared Swift",
    title: "Swift, before a platform",
    description:
      "The language, the SwiftUI mental model, and one small app that saves its data. Every later track assumes this ground.",
    promise: "You can read Swift and explain why a view updates.",
    accentClass: "track-foundation",
    barClass: "bg-ink",
    softClass: "bg-ink/8",
    textClass: "text-ink",
  },
  {
    id: "ios",
    label: "iPhone",
    kicker: "Mobile apps",
    title: "Apps for iPhone",
    description:
      "From a layout that fits a hand to TestFlight, privacy, and a module you can keep shipping.",
    promise: "You can build, measure, and submit an iPhone app.",
    accentClass: "track-ios",
    barClass: "bg-ios",
    softClass: "bg-ios/10",
    textClass: "text-ios",
  },
  {
    id: "mac",
    label: "Mac",
    kicker: "Mac apps",
    title: "Apps for Mac",
    description:
      "Windows, menus, tables, documents, the sandbox, and the choice between notarization and the Mac App Store.",
    promise: "You can ship a keyboard-first Mac app people can trust.",
    accentClass: "track-mac",
    barClass: "bg-mac",
    softClass: "bg-mac/10",
    textClass: "text-mac",
  },
  {
    id: "watch",
    label: "Apple Watch",
    kicker: "Wrist apps",
    title: "Apps for Apple Watch",
    description:
      "Glanceable interfaces, the Digital Crown, complications, HealthKit boundaries, and a Smart Stack that earns its place.",
    promise: "You can put a useful five-second experience on the wrist.",
    accentClass: "track-watch",
    barClass: "bg-watch",
    softClass: "bg-watch/10",
    textClass: "text-watch",
  },
]

export const levels: { id: LevelId; label: string; detail: string }[] = [
  {
    id: "beginner",
    label: "Beginner",
    detail: "You can make a small, clear interface and run it.",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    detail: "You can fetch, store, and present real data.",
  },
  {
    id: "advanced",
    label: "Advanced",
    detail: "You can structure, test, and measure the app.",
  },
  {
    id: "professional",
    label: "Professional",
    detail: "You can ship it under Apple's rules and keep it alive.",
  },
]

export function isTrackId(value: string): value is TrackId {
  return (trackIds as readonly string[]).includes(value)
}

export function getTrack(id: TrackId): Track {
  const track = tracks.find((item) => item.id === id)
  if (!track) {
    throw new Error(`Unknown track: ${id}`)
  }
  return track
}

export function levelLabel(id: LevelId): string {
  return levels.find((level) => level.id === id)?.label ?? id
}
