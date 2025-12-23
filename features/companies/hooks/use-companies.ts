"use client"

import { useState, useEffect, useCallback } from "react"
import { Effect } from "effect"
import type {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
  CreateContactInput,
  SortConfig
} from "../types"
import * as CompanyService from "../services/company-service"

type UseCompaniesState = {
  companies: Company[]
  isLoading: boolean
  error: string | null
}

export function useCompanies(initialSortConfig?: SortConfig) {
  const [state, setState] = useState<UseCompaniesState>({
    companies: [],
    isLoading: true,
    error: null
  })
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialSortConfig ?? { column: "name", direction: "asc" }
  )

  const loadCompanies = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    const result = await Effect.runPromise(Effect.either(CompanyService.getCompanies))
    if (result._tag === "Left") {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: result.left.message
      }))
    } else {
      setState({ companies: result.right, isLoading: false, error: null })
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCompanies()
  }, [loadCompanies])

  const sortedCompanies = [...state.companies].sort((a, b) => {
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

  const toggleSort = useCallback((column: keyof Company) => {
    setSortConfig(prev => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc"
    }))
  }, [])

  const createCompany = useCallback(
    async (input: CreateCompanyInput) => {
      const result = await Effect.runPromise(Effect.either(CompanyService.createCompany(input)))
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompanies()
      return result.right
    },
    [loadCompanies]
  )

  const updateCompany = useCallback(
    async (id: string, input: UpdateCompanyInput) => {
      const result = await Effect.runPromise(Effect.either(CompanyService.updateCompany(id, input)))
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompanies()
      return result.right
    },
    [loadCompanies]
  )

  const deleteCompany = useCallback(
    async (id: string) => {
      const result = await Effect.runPromise(Effect.either(CompanyService.deleteCompany(id)))
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompanies()
    },
    [loadCompanies]
  )

  const addContact = useCallback(
    async (companyId: string, input: CreateContactInput) => {
      const result = await Effect.runPromise(
        Effect.either(CompanyService.addContact(companyId, input))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompanies()
      return result.right
    },
    [loadCompanies]
  )

  const updateContact = useCallback(
    async (companyId: string, contactId: string, input: Partial<CreateContactInput>) => {
      const result = await Effect.runPromise(
        Effect.either(CompanyService.updateContact(companyId, contactId, input))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompanies()
      return result.right
    },
    [loadCompanies]
  )

  const removeContact = useCallback(
    async (companyId: string, contactId: string) => {
      const result = await Effect.runPromise(
        Effect.either(CompanyService.removeContact(companyId, contactId))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompanies()
    },
    [loadCompanies]
  )

  return {
    companies: sortedCompanies,
    isLoading: state.isLoading,
    error: state.error,
    sortConfig,
    toggleSort,
    refresh: loadCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    addContact,
    updateContact,
    removeContact
  }
}

export function useCompany(id: string) {
  const [company, setCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCompany = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    const result = await Effect.runPromise(Effect.either(CompanyService.getCompany(id)))
    if (result._tag === "Left") {
      setError(result.left.message)
      setCompany(null)
    } else {
      setCompany(result.right)
    }
    setIsLoading(false)
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCompany()
  }, [loadCompany])

  const updateCompany = useCallback(
    async (input: UpdateCompanyInput) => {
      const result = await Effect.runPromise(Effect.either(CompanyService.updateCompany(id, input)))
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompany()
      return result.right
    },
    [id, loadCompany]
  )

  const deleteCompany = useCallback(async () => {
    const result = await Effect.runPromise(Effect.either(CompanyService.deleteCompany(id)))
    if (result._tag === "Left") {
      throw new Error(result.left.message)
    }
  }, [id])

  const addContact = useCallback(
    async (input: CreateContactInput) => {
      const result = await Effect.runPromise(Effect.either(CompanyService.addContact(id, input)))
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompany()
      return result.right
    },
    [id, loadCompany]
  )

  const updateContact = useCallback(
    async (contactId: string, input: Partial<CreateContactInput>) => {
      const result = await Effect.runPromise(
        Effect.either(CompanyService.updateContact(id, contactId, input))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompany()
      return result.right
    },
    [id, loadCompany]
  )

  const removeContact = useCallback(
    async (contactId: string) => {
      const result = await Effect.runPromise(
        Effect.either(CompanyService.removeContact(id, contactId))
      )
      if (result._tag === "Left") {
        throw new Error(result.left.message)
      }
      await loadCompany()
    },
    [id, loadCompany]
  )

  return {
    company,
    isLoading,
    error,
    refresh: loadCompany,
    updateCompany,
    deleteCompany,
    addContact,
    updateContact,
    removeContact
  }
}
