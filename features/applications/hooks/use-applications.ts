"use client"

import { useState, useEffect, useCallback } from "react"
import { Effect } from "effect"
import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
  ApplicationStatus,
  SortConfig
} from "../types"
import * as ApplicationService from "../services/application-service"

type UseApplicationsState = {
  applications: Application[]
  isLoading: boolean
  error: string | null
}

export function useApplications(initialSortConfig?: SortConfig) {
  const [state, setState] = useState<UseApplicationsState>({
    applications: [],
    isLoading: true,
    error: null
  })
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialSortConfig ?? { column: "applicationDate", direction: "desc" }
  )

  const loadApplications = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    const result = await Effect.runPromise(Effect.either(ApplicationService.getApplications))
    if (result._tag === "Left") {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: result.left.message
      }))
    } else {
      setState({ applications: result.right, isLoading: false, error: null })
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadApplications()
  }, [loadApplications])

  const sortedApplications = [...state.applications].sort((a, b) => {
    const aValue = a[sortConfig.column]
    const bValue = b[sortConfig.column]
    if (aValue === null) return 1
    if (bValue === null) return -1
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    if (Array.isArray(aValue) && Array.isArray(bValue)) {
      return sortConfig.direction === "asc"
        ? aValue.length - bValue.length
        : bValue.length - aValue.length
    }
    return 0
  })

  const toggleSort = useCallback((column: keyof Application) => {
    setSortConfig(prev => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc"
    }))
  }, [])

  const createApplication = useCallback(
    async (input: CreateApplicationInput) => {
      const result = await Effect.runPromise(
        Effect.either(ApplicationService.createApplication(input))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadApplications()
      return result.right
    },
    [loadApplications]
  )

  const updateApplication = useCallback(
    async (id: string, input: UpdateApplicationInput) => {
      const result = await Effect.runPromise(
        Effect.either(ApplicationService.updateApplication(id, input))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadApplications()
      return result.right
    },
    [loadApplications]
  )

  const updateStatus = useCallback(
    async (id: string, status: ApplicationStatus, note?: string) => {
      const result = await Effect.runPromise(
        Effect.either(ApplicationService.updateStatus(id, status, note))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadApplications()
      return result.right
    },
    [loadApplications]
  )

  const deleteApplication = useCallback(
    async (id: string) => {
      const result = await Effect.runPromise(
        Effect.either(ApplicationService.deleteApplication(id))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadApplications()
    },
    [loadApplications]
  )

  return {
    applications: sortedApplications,
    isLoading: state.isLoading,
    error: state.error,
    sortConfig,
    toggleSort,
    refresh: loadApplications,
    createApplication,
    updateApplication,
    updateStatus,
    deleteApplication
  }
}

export function useApplication(id: string) {
  const [application, setApplication] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadApplication = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    const result = await Effect.runPromise(Effect.either(ApplicationService.getApplication(id)))
    if (result._tag === "Left") {
      setError(result.left.message)
      setApplication(null)
    } else {
      setApplication(result.right)
    }
    setIsLoading(false)
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadApplication()
  }, [loadApplication])

  const updateApplication = useCallback(
    async (input: UpdateApplicationInput) => {
      const result = await Effect.runPromise(
        Effect.either(ApplicationService.updateApplication(id, input))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadApplication()
      return result.right
    },
    [id, loadApplication]
  )

  const updateStatus = useCallback(
    async (status: ApplicationStatus, note?: string) => {
      const result = await Effect.runPromise(
        Effect.either(ApplicationService.updateStatus(id, status, note))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadApplication()
      return result.right
    },
    [id, loadApplication]
  )

  const deleteApplication = useCallback(async () => {
    const result = await Effect.runPromise(Effect.either(ApplicationService.deleteApplication(id)))
    if (result._tag === "Left") {
      throw new Error(result.left.message)
    }
  }, [id])

  return {
    application,
    isLoading,
    error,
    refresh: loadApplication,
    updateApplication,
    updateStatus,
    deleteApplication
  }
}
