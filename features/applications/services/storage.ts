import { Effect } from "effect"
import type { Application } from "../types"

const STORAGE_KEY = "jobes-applications"

export class StorageError extends Error {
  readonly _tag = "StorageError"
  constructor(message: string) {
    super(message)
    this.name = "StorageError"
  }
}

export const getApplicationsFromStorage = Effect.try({
  try: (): Application[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data) as Application[]
  },
  catch: error => new StorageError(`Failed to read from storage: ${String(error)}`)
})

export const saveApplicationsToStorage = (applications: Application[]) =>
  Effect.try({
    try: () => {
      if (typeof window === "undefined") return
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
    },
    catch: error => new StorageError(`Failed to write to storage: ${String(error)}`)
  })

export const clearStorage = Effect.try({
  try: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
  },
  catch: error => new StorageError(`Failed to clear storage: ${String(error)}`)
})
