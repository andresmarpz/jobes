import { Effect } from "effect"
import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
  ApplicationStatus,
  StatusHistoryEntry,
} from "../types"
import {
  getApplicationsFromStorage,
  saveApplicationsToStorage,
  StorageError,
} from "./storage"

export class ApplicationNotFoundError extends Error {
  readonly _tag = "ApplicationNotFoundError"
  constructor(id: string) {
    super(`Application with id ${id} not found`)
    this.name = "ApplicationNotFoundError"
  }
}

export const getApplications = getApplicationsFromStorage

export const getApplication = (id: string) =>
  Effect.gen(function* () {
    const applications = yield* getApplicationsFromStorage
    const application = applications.find((a) => a.id === id)
    if (!application) {
      return yield* Effect.fail(new ApplicationNotFoundError(id))
    }
    return application
  })

export const createApplication = (input: CreateApplicationInput) =>
  Effect.gen(function* () {
    const applications = yield* getApplicationsFromStorage
    const now = new Date().toISOString()

    const initialHistory: StatusHistoryEntry = {
      id: crypto.randomUUID(),
      status: input.status,
      note: null,
      changedAt: now,
    }

    const newApplication: Application = {
      id: crypto.randomUUID(),
      ...input,
      statusHistory: [initialHistory],
      createdAt: now,
      updatedAt: now,
    }
    yield* saveApplicationsToStorage([...applications, newApplication])
    return newApplication
  })

export const updateApplication = (id: string, input: UpdateApplicationInput) =>
  Effect.gen(function* () {
    const applications = yield* getApplicationsFromStorage
    const index = applications.findIndex((a) => a.id === id)
    if (index === -1) {
      return yield* Effect.fail(new ApplicationNotFoundError(id))
    }

    const current = applications[index]
    const now = new Date().toISOString()

    // If status changed, add to history
    let statusHistory = current.statusHistory
    if (input.status && input.status !== current.status) {
      const newHistoryEntry: StatusHistoryEntry = {
        id: crypto.randomUUID(),
        status: input.status,
        note: null,
        changedAt: now,
      }
      statusHistory = [...statusHistory, newHistoryEntry]
    }

    const updatedApplication: Application = {
      ...current,
      ...input,
      statusHistory,
      updatedAt: now,
    }
    const updatedApplications = [...applications]
    updatedApplications[index] = updatedApplication
    yield* saveApplicationsToStorage(updatedApplications)
    return updatedApplication
  })

export const updateStatus = (
  id: string,
  status: ApplicationStatus,
  note?: string
) =>
  Effect.gen(function* () {
    const applications = yield* getApplicationsFromStorage
    const index = applications.findIndex((a) => a.id === id)
    if (index === -1) {
      return yield* Effect.fail(new ApplicationNotFoundError(id))
    }

    const now = new Date().toISOString()
    const newHistoryEntry: StatusHistoryEntry = {
      id: crypto.randomUUID(),
      status,
      note: note || null,
      changedAt: now,
    }

    const updatedApplication: Application = {
      ...applications[index],
      status,
      statusHistory: [...applications[index].statusHistory, newHistoryEntry],
      updatedAt: now,
    }
    const updatedApplications = [...applications]
    updatedApplications[index] = updatedApplication
    yield* saveApplicationsToStorage(updatedApplications)
    return updatedApplication
  })

export const deleteApplication = (id: string) =>
  Effect.gen(function* () {
    const applications = yield* getApplicationsFromStorage
    const index = applications.findIndex((a) => a.id === id)
    if (index === -1) {
      return yield* Effect.fail(new ApplicationNotFoundError(id))
    }
    const updatedApplications = applications.filter((a) => a.id !== id)
    yield* saveApplicationsToStorage(updatedApplications)
  })

export type ApplicationServiceError = StorageError | ApplicationNotFoundError
