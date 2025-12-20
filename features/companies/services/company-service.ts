import { Effect } from "effect"
import type {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
  CreateContactInput,
  Contact,
} from "../types"
import {
  getCompaniesFromStorage,
  saveCompaniesToStorage,
  StorageError,
} from "./storage"

export class CompanyNotFoundError extends Error {
  readonly _tag = "CompanyNotFoundError"
  constructor(id: string) {
    super(`Company with id ${id} not found`)
    this.name = "CompanyNotFoundError"
  }
}

export class ContactNotFoundError extends Error {
  readonly _tag = "ContactNotFoundError"
  constructor(id: string) {
    super(`Contact with id ${id} not found`)
    this.name = "ContactNotFoundError"
  }
}

export const getCompanies = getCompaniesFromStorage

export const getCompany = (id: string) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage
    const company = companies.find((c) => c.id === id)
    if (!company) {
      return yield* Effect.fail(new CompanyNotFoundError(id))
    }
    return company
  })

export const createCompany = (input: CreateCompanyInput) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage
    const now = new Date().toISOString()
    const newCompany: Company = {
      id: crypto.randomUUID(),
      ...input,
      contacts: [],
      createdAt: now,
      updatedAt: now,
    }
    yield* saveCompaniesToStorage([...companies, newCompany])
    return newCompany
  })

export const updateCompany = (id: string, input: UpdateCompanyInput) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage
    const index = companies.findIndex((c) => c.id === id)
    if (index === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(id))
    }
    const updatedCompany: Company = {
      ...companies[index],
      ...input,
      updatedAt: new Date().toISOString(),
    }
    const updatedCompanies = [...companies]
    updatedCompanies[index] = updatedCompany
    yield* saveCompaniesToStorage(updatedCompanies)
    return updatedCompany
  })

export const deleteCompany = (id: string) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage
    const index = companies.findIndex((c) => c.id === id)
    if (index === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(id))
    }
    const updatedCompanies = companies.filter((c) => c.id !== id)
    yield* saveCompaniesToStorage(updatedCompanies)
  })

export const addContact = (companyId: string, input: CreateContactInput) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage
    const index = companies.findIndex((c) => c.id === companyId)
    if (index === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(companyId))
    }
    const newContact: Contact = {
      id: crypto.randomUUID(),
      ...input,
    }
    const updatedCompany: Company = {
      ...companies[index],
      contacts: [...companies[index].contacts, newContact],
      updatedAt: new Date().toISOString(),
    }
    const updatedCompanies = [...companies]
    updatedCompanies[index] = updatedCompany
    yield* saveCompaniesToStorage(updatedCompanies)
    return newContact
  })

export const updateContact = (
  companyId: string,
  contactId: string,
  input: Partial<CreateContactInput>
) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage
    const companyIndex = companies.findIndex((c) => c.id === companyId)
    if (companyIndex === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(companyId))
    }
    const company = companies[companyIndex]
    const contactIndex = company.contacts.findIndex((c) => c.id === contactId)
    if (contactIndex === -1) {
      return yield* Effect.fail(new ContactNotFoundError(contactId))
    }
    const updatedContact: Contact = {
      ...company.contacts[contactIndex],
      ...input,
    }
    const updatedContacts = [...company.contacts]
    updatedContacts[contactIndex] = updatedContact
    const updatedCompany: Company = {
      ...company,
      contacts: updatedContacts,
      updatedAt: new Date().toISOString(),
    }
    const updatedCompanies = [...companies]
    updatedCompanies[companyIndex] = updatedCompany
    yield* saveCompaniesToStorage(updatedCompanies)
    return updatedContact
  })

export const removeContact = (companyId: string, contactId: string) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage
    const companyIndex = companies.findIndex((c) => c.id === companyId)
    if (companyIndex === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(companyId))
    }
    const company = companies[companyIndex]
    const contactIndex = company.contacts.findIndex((c) => c.id === contactId)
    if (contactIndex === -1) {
      return yield* Effect.fail(new ContactNotFoundError(contactId))
    }
    const updatedContacts = company.contacts.filter((c) => c.id !== contactId)
    const updatedCompany: Company = {
      ...company,
      contacts: updatedContacts,
      updatedAt: new Date().toISOString(),
    }
    const updatedCompanies = [...companies]
    updatedCompanies[companyIndex] = updatedCompany
    yield* saveCompaniesToStorage(updatedCompanies)
  })

export type CompanyServiceError =
  | StorageError
  | CompanyNotFoundError
  | ContactNotFoundError
