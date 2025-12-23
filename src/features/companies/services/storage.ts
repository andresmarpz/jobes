import { Effect } from "effect";
import type { Company } from "../types";

const STORAGE_KEY = "jobes-companies";

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
    if (!data) return [];
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
