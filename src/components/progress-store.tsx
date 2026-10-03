"use client"

import { createContext, useContext, useSyncExternalStore } from "react"

const storageKey = "swift-mastery-progress-v1"
const changeEvent = "swift-mastery-progress"

export type LessonStatus = {
  read: boolean
  exercise: boolean
}

type ProgressMap = Record<string, LessonStatus>

type ProgressContextValue = {
  ready: boolean
  map: ProgressMap
  markRead: (slug: string, read: boolean) => void
  markExercise: (slug: string, done: boolean) => void
  reset: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

const emptyMap: ProgressMap = {}
let cachedRaw: string | null = null
let cachedMap: ProgressMap = emptyMap

function readMap(): ProgressMap {
  const raw = window.localStorage.getItem(storageKey)
  if (raw === cachedRaw) {
    return cachedMap
  }
  cachedRaw = raw
  if (!raw) {
    cachedMap = emptyMap
    return cachedMap
  }
  try {
    const parsed = JSON.parse(raw) as ProgressMap
    cachedMap = parsed && typeof parsed === "object" ? parsed : emptyMap
  } catch {
    cachedMap = emptyMap
  }
  return cachedMap
}

function writeMap(map: ProgressMap) {
  const raw = JSON.stringify(map)
  window.localStorage.setItem(storageKey, raw)
  cachedRaw = raw
  cachedMap = map
  window.dispatchEvent(new Event(changeEvent))
}

function subscribeReady() {
  return () => {}
}

function clientReady() {
  return true
}

function serverReady() {
  return false
}

function subscribe(onStoreChange: () => void) {
  const notify = () => onStoreChange()
  window.addEventListener(changeEvent, notify)
  window.addEventListener("storage", notify)
  return () => {
    window.removeEventListener(changeEvent, notify)
    window.removeEventListener("storage", notify)
  }
}

function emptyStatus(): LessonStatus {
  return { read: false, exercise: false }
}

function ProgressState({ children }: { children: React.ReactNode }) {
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady)
  const map = useSyncExternalStore(subscribe, readMap, () => emptyMap)

  const value: ProgressContextValue = {
    ready,
    map,
    markRead: (slug, read) => {
      const current = readMap()
      writeMap({
        ...current,
        [slug]: { ...emptyStatus(), ...current[slug], read },
      })
    },
    markExercise: (slug, done) => {
      const current = readMap()
      writeMap({
        ...current,
        [slug]: { ...emptyStatus(), ...current[slug], exercise: done },
      })
    },
    reset: () => {
      window.localStorage.removeItem(storageKey)
      cachedRaw = null
      cachedMap = emptyMap
      window.dispatchEvent(new Event(changeEvent))
    },
  }

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  )
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  return <ProgressState>{children}</ProgressState>
}

export function useProgress() {
  const value = useContext(ProgressContext)
  if (!value) {
    throw new Error("useProgress must be used inside ProgressProvider")
  }
  return value
}

export function statusFor(map: ProgressMap, slug: string): LessonStatus {
  return map[slug] ?? emptyStatus()
}
