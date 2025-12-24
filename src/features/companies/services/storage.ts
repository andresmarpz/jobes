import { Effect } from "effect";
import type { Company } from "../types";

const STORAGE_KEY = "jobes-companies";

const DEFAULT_COMPANIES: Company[] = [
  {
    id: "jobes-default",
    name: "Jobes",
    description:
      "Your personal job tracker dashboard. Manage job opportunities, professional contacts, and application progress all in one place.",
    websiteUrl: "https://jobes.app",
    linkedinUrl: null,
    iconUrls: ["https://jobes.app/favicon.ico"],
    contacts: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "silver-default",
    name: "Silver.dev",
    description:
      "Silver is a recruiting agency helping top US startups acquire the best LatAm talent.",
    websiteUrl: "https://silver.dev",
    linkedinUrl: "https://linkedin.com/company/silver-dev",
    iconUrls: ["https://silver.dev/favicon.ico"],
    contacts: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export class StorageError extends Error {
  readonly _tag = "StorageError";
  constructor(message: string) {
    super(message);
    this.name = "StorageError";
  }
}

export const getCompaniesFromStorage = Effect.try({
  try: (): Company[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (data === null) {
      // First time: seed with default data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMPANIES));
      return DEFAULT_COMPANIES;
    }
    return JSON.parse(data) as Company[];
  },
  catch: error => new StorageError(`Failed to read from storage: ${String(error)}`)
});

export const saveCompaniesToStorage = (companies: Company[]) =>
  Effect.try({
    try: () => {
      if (typeof window === "undefined") return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
    },
    catch: error => new StorageError(`Failed to write to storage: ${String(error)}`)
  });

export const clearStorage = Effect.try({
  try: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
  catch: error => new StorageError(`Failed to clear storage: ${String(error)}`)
});
