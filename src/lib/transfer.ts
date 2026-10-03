export type TransferRow = {
  skill: string
  carries: string
  iphone: string
  mac: string
  watch: string
}

export const transfers: TransferRow[] = [
  {
    skill: "Swift language",
    carries:
      "Types, optionals, protocols, errors, generics, and concurrency are the same language on every device.",
    iphone: "You write the model here first, because the phone is where most people practice.",
    mac: "Reuse the model. Change the commands that call it, not the types.",
    watch: "Reuse the model if it is small. A watch screen shows one fact from it, not the whole graph.",
  },
  {
    skill: "SwiftUI views",
    carries:
      "View, body, and modifiers are the same idea. The container that should hold them changes.",
    iphone: "Stacks, lists, safe areas, and a thumb's reach.",
    mac: "Sidebars, tables, toolbars, and room for more than one pane.",
    watch: "One primary fact, large type, and almost no chrome.",
  },
  {
    skill: "State",
    carries:
      "@State, bindings, and @Observable work on all three. A view updates because data changed.",
    iphone: "Screen-sized state, often one navigation path.",
    mac: "Window-sized state. Two windows can show the same model with different selections.",
    watch: "Tiny state. If a value is not visible, it probably should not live on the watch.",
  },
  {
    skill: "Navigation",
    carries:
      "People move toward detail and back. The control that does it is platform-specific.",
    iphone: "NavigationStack, tabs, and sheets.",
    mac: "Columns, windows, and menu commands. A sheet is rare.",
    watch: "A short stack, a page, or a crown. Deep trees fail.",
  },
  {
    skill: "Persistence",
    carries:
      "SwiftData models can be shared. The container and the lifetime change.",
    iphone: "A database for the person's library.",
    mac: "A database, or a document the person can see in Finder.",
    watch: "A small cache. The full history often stays on the phone.",
  },
  {
    skill: "Networking",
    carries:
      "URLSession and Codable do not care which device called them.",
    iphone: "The usual place to fetch, with room for an error screen.",
    mac: "The same fetch, often triggered from a menu or a refresh command.",
    watch: "Prefer data the phone already fetched. A watch radio is a battery decision.",
  },
  {
    skill: "Background work",
    carries:
      "The system, not your timer, decides when you run.",
    iphone: "Background Tasks and push, with a reason the person understands.",
    mac: "A long-lived app or a menu-bar extra can stay available. It still should not spin for nothing.",
    watch: "Timeline schedules, workout sessions, and a tight refresh budget.",
  },
  {
    skill: "Input",
    carries:
      "SwiftUI gestures exist everywhere. The primary input does not.",
    iphone: "Touch, with room for a keyboard when a field asks for one.",
    mac: "Keyboard first, pointer second. Every frequent action needs a menu item.",
    watch: "Tap, Digital Crown, and complications. Typing is a last resort.",
  },
  {
    skill: "Accessibility",
    carries:
      "Labels, traits, and Dynamic Type are your job on every surface.",
    iphone: "VoiceOver order follows the visual stack you built.",
    mac: "Full keyboard access and focus order matter as much as the pointer.",
    watch: "VoiceOver and a short label. A complication needs a name.",
  },
  {
    skill: "Distribution",
    carries:
      "Signing, a privacy story, and review rules show up on all three. The storefront differs.",
    iphone: "TestFlight, then the App Store.",
    mac: "The Mac App Store, or a notarized app you distribute yourself.",
    watch: "Usually beside an iPhone app, or as an independent watch app on the store.",
  },
  {
    skill: "Design rules",
    carries:
      "The Human Interface Guidelines are three books that share a philosophy.",
    iphone: "Designing for iOS.",
    mac: "Designing for macOS.",
    watch: "Designing for watchOS. Read it before you add a second button.",
  },
  {
    skill: "Testing",
    carries:
      "XCTest runs in Xcode for every target. Test the model without a device.",
    iphone: "Unit tests plus a UI test for the main path.",
    mac: "The same tests, plus keyboard commands you can invoke.",
    watch: "Test the model on the Mac. Use the watch Simulator for the glance, not for logic.",
  },
]
