import { Effect } from "effect";
import type {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
  CreateContactInput,
  Contact
} from "../types";
import { getCompaniesFromStorage, saveCompaniesToStorage, StorageError } from "./storage";

export class CompanyNotFoundError extends Error {
  readonly _tag = "CompanyNotFoundError";
  constructor(id: string) {
    super(`Company with id ${id} not found`);
    this.name = "CompanyNotFoundError";
  }
}

export class ContactNotFoundError extends Error {
  readonly _tag = "ContactNotFoundError";
  constructor(id: string) {
    super(`Contact with id ${id} not found`);
    this.name = "ContactNotFoundError";
  }
}

function buildIconUrls(websiteUrl: string | null): string[] {
  if (!websiteUrl) return [];

  try {
    const url = new URL(websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`);
    const baseUrl = `${url.protocol}//${url.hostname}`;
    const domain = url.hostname;

    return [
      `${baseUrl}/favicon.ico`,
      `${baseUrl}/favicon.png`,
      `${baseUrl}/apple-touch-icon.png`,
      `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    ];
  } catch {
    return [];
  }
}

export const getCompanies = getCompaniesFromStorage;

export const getCompany = (id: string) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage;
    const company = companies.find(c => c.id === id);
    if (!company) {
      return yield* Effect.fail(new CompanyNotFoundError(id));
    }
    return company;
  });

export const createCompany = (input: CreateCompanyInput) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage;
    const now = new Date().toISOString();
    const newCompany: Company = {
      id: crypto.randomUUID(),
      ...input,
      iconUrls: buildIconUrls(input.websiteUrl),
      contacts: [],
      createdAt: now,
      updatedAt: now
    };
    yield* saveCompaniesToStorage([...companies, newCompany]);
    return newCompany;
  });

export const updateCompany = (id: string, input: UpdateCompanyInput) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage;
    const index = companies.findIndex(c => c.id === id);
    if (index === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(id));
    }
    const existing = companies[index];

    // Determine iconUrls: explicit input > rebuild from new websiteUrl > keep existing
    let iconUrls: string[];
    if (input.iconUrls !== undefined) {
      iconUrls = input.iconUrls;
    } else if (input.websiteUrl !== undefined) {
      iconUrls = buildIconUrls(input.websiteUrl);
    } else {
      iconUrls = existing.iconUrls;
    }

    const updatedCompany: Company = {
      ...existing,
      ...input,
      iconUrls,
      updatedAt: new Date().toISOString()
    };
    const updatedCompanies = [...companies];
    updatedCompanies[index] = updatedCompany;
    yield* saveCompaniesToStorage(updatedCompanies);
    return updatedCompany;
  });

export const deleteCompany = (id: string) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage;
    const index = companies.findIndex(c => c.id === id);
    if (index === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(id));
    }
    const updatedCompanies = companies.filter(c => c.id !== id);
    yield* saveCompaniesToStorage(updatedCompanies);
  });

export const addContact = (companyId: string, input: CreateContactInput) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage;
    const index = companies.findIndex(c => c.id === companyId);
    if (index === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(companyId));
    }
    const newContact: Contact = {
      id: crypto.randomUUID(),
      ...input
    };
    const updatedCompany: Company = {
      ...companies[index],
      contacts: [...companies[index].contacts, newContact],
      updatedAt: new Date().toISOString()
    };
    const updatedCompanies = [...companies];
    updatedCompanies[index] = updatedCompany;
    yield* saveCompaniesToStorage(updatedCompanies);
    return newContact;
  });

export const updateContact = (
  companyId: string,
  contactId: string,
  input: Partial<CreateContactInput>
) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage;
    const companyIndex = companies.findIndex(c => c.id === companyId);
    if (companyIndex === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(companyId));
    }
    const company = companies[companyIndex];
    const contactIndex = company.contacts.findIndex(c => c.id === contactId);
    if (contactIndex === -1) {
      return yield* Effect.fail(new ContactNotFoundError(contactId));
    }
    const updatedContact: Contact = {
      ...company.contacts[contactIndex],
      ...input
    };
    const updatedContacts = [...company.contacts];
    updatedContacts[contactIndex] = updatedContact;
    const updatedCompany: Company = {
      ...company,
      contacts: updatedContacts,
      updatedAt: new Date().toISOString()
    };
    const updatedCompanies = [...companies];
    updatedCompanies[companyIndex] = updatedCompany;
    yield* saveCompaniesToStorage(updatedCompanies);
    return updatedContact;
  });

export const removeContact = (companyId: string, contactId: string) =>
  Effect.gen(function* () {
    const companies = yield* getCompaniesFromStorage;
    const companyIndex = companies.findIndex(c => c.id === companyId);
    if (companyIndex === -1) {
      return yield* Effect.fail(new CompanyNotFoundError(companyId));
    }
    const company = companies[companyIndex];
    const contactIndex = company.contacts.findIndex(c => c.id === contactId);
    if (contactIndex === -1) {
      return yield* Effect.fail(new ContactNotFoundError(contactId));
    }
    const updatedContacts = company.contacts.filter(c => c.id !== contactId);
    const updatedCompany: Company = {
      ...company,
      contacts: updatedContacts,
      updatedAt: new Date().toISOString()
    };
    const updatedCompanies = [...companies];
    updatedCompanies[companyIndex] = updatedCompany;
    yield* saveCompaniesToStorage(updatedCompanies);
  });

export type CompanyServiceError = StorageError | CompanyNotFoundError | ContactNotFoundError;
