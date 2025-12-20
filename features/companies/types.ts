export type Contact = {
  id: string
  name: string
  role: string
  linkedinUrl: string | null
  country: string
}

export type Company = {
  id: string
  name: string
  description: string
  websiteUrl: string | null
  linkedinUrl: string | null
  contacts: Contact[]
  createdAt: string
  updatedAt: string
}

export type CreateCompanyInput = Omit<Company, "id" | "contacts" | "createdAt" | "updatedAt">

export type UpdateCompanyInput = Partial<CreateCompanyInput>

export type CreateContactInput = Omit<Contact, "id">

export type SortDirection = "asc" | "desc"

export type SortConfig = {
  column: keyof Company
  direction: SortDirection
}
