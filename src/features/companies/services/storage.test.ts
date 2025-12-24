import { describe, it, expect, beforeEach } from "vitest";
import { Effect } from "effect";
import {
  getCompaniesFromStorage,
  saveCompaniesToStorage,
  clearStorage,
} from "./storage";
import type { Company } from "../types";

const STORAGE_KEY = "jobes-companies";
const VERSION_KEY = "jobes-companies-version";

const createTestCompany = (overrides: Partial<Company> = {}): Company => ({
  id: "test-company-1",
  name: "Test Company",
  description: "A test company",
  websiteUrl: "https://test.com",
  linkedinUrl: null,
  iconUrls: [],
  contacts: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

describe("companies storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getCompaniesFromStorage", () => {
    it("seeds default data for new users", () => {
      const companies = Effect.runSync(getCompaniesFromStorage);

      expect(companies.length).toBeGreaterThan(0);
      expect(companies[0]).toHaveProperty("id");
      expect(companies[0]).toHaveProperty("name");
    });

    it("sets version key for new users", () => {
      Effect.runSync(getCompaniesFromStorage);

      const version = localStorage.getItem(VERSION_KEY);
      expect(version).toBe("1");
    });

    it("persists seeded data to localStorage for new users", () => {
      Effect.runSync(getCompaniesFromStorage);

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBeGreaterThan(0);
    });

    it("returns existing data when localStorage has data", () => {
      const testCompanies = [createTestCompany()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testCompanies));
      localStorage.setItem(VERSION_KEY, "1");

      const companies = Effect.runSync(getCompaniesFromStorage);

      expect(companies).toHaveLength(1);
      expect(companies[0].id).toBe("test-company-1");
      expect(companies[0].name).toBe("Test Company");
    });

    it("creates version key for users without one (legacy data)", () => {
      const testCompanies = [createTestCompany()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testCompanies));
      // No version key set - simulating legacy user

      Effect.runSync(getCompaniesFromStorage);

      const version = localStorage.getItem(VERSION_KEY);
      expect(version).toBe("1");
    });

    it("preserves data when upgrading legacy users to versioned storage", () => {
      const testCompanies = [createTestCompany({ name: "Legacy Company" })];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testCompanies));
      // No version key - legacy user

      const companies = Effect.runSync(getCompaniesFromStorage);

      expect(companies).toHaveLength(1);
      expect(companies[0].name).toBe("Legacy Company");
    });
  });

  describe("saveCompaniesToStorage", () => {
    it("saves companies to localStorage", () => {
      const testCompanies = [createTestCompany()];

      Effect.runSync(saveCompaniesToStorage(testCompanies));

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].id).toBe("test-company-1");
    });

    it("sets version key when saving", () => {
      const testCompanies = [createTestCompany()];

      Effect.runSync(saveCompaniesToStorage(testCompanies));

      const version = localStorage.getItem(VERSION_KEY);
      expect(version).toBe("1");
    });

    it("overwrites existing data", () => {
      const oldCompanies = [createTestCompany({ id: "old-1", name: "Old" })];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(oldCompanies));

      const newCompanies = [createTestCompany({ id: "new-1", name: "New" })];
      Effect.runSync(saveCompaniesToStorage(newCompanies));

      const companies = Effect.runSync(getCompaniesFromStorage);
      expect(companies).toHaveLength(1);
      expect(companies[0].name).toBe("New");
    });
  });

  describe("clearStorage", () => {
    it("removes data from localStorage", () => {
      const testCompanies = [createTestCompany()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testCompanies));
      localStorage.setItem(VERSION_KEY, "1");

      Effect.runSync(clearStorage);

      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    it("removes version key from localStorage", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      localStorage.setItem(VERSION_KEY, "1");

      Effect.runSync(clearStorage);

      expect(localStorage.getItem(VERSION_KEY)).toBeNull();
    });
  });
});
