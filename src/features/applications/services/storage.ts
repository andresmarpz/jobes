import { Effect } from "effect";
import type { Application } from "../types";

const STORAGE_KEY = "jobes-applications";

const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: "app-silver-swe",
    position: "Software Engineer",
    company: "Silver.dev",
    companyId: "silver-default",
    status: "applied",
    relevantUrl: "https://silver.dev/careers",
    method: "job-board",
    salary: "$120,000",
    notes: "Great opportunity to work with top US startups. Remote-friendly position.",
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

export const getApplicationsFromStorage = Effect.try({
  try: (): Application[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (data === null) {
      // First time: seed with default data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_APPLICATIONS));
      return DEFAULT_APPLICATIONS;
    }
    return JSON.parse(data) as Application[];
  },
  catch: error => new StorageError(`Failed to read from storage: ${String(error)}`)
});

export const saveApplicationsToStorage = (applications: Application[]) =>
  Effect.try({
    try: () => {
      if (typeof window === "undefined") return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
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
