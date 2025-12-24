import { describe, it, expect, beforeEach } from "vitest";
import { Effect } from "effect";
import {
  getApplicationsFromStorage,
  saveApplicationsToStorage,
  clearStorage,
} from "./storage";
import type { Application } from "../types";

const STORAGE_KEY = "jobes-applications";
const VERSION_KEY = "jobes-applications-version";

const createTestApplication = (
  overrides: Partial<Application> = {}
): Application => ({
  id: "test-app-1",
  position: "Software Engineer",
  company: "Test Corp",
  companyId: "test-company-1",
  status: "applied",
  relevantUrl: "https://test.com/jobs/1",
  method: "job-board",
  salary: "$100,000",
  notes: "Test application",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

describe("applications storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getApplicationsFromStorage", () => {
    it("seeds default data for new users", () => {
      const applications = Effect.runSync(getApplicationsFromStorage);

      expect(applications.length).toBeGreaterThan(0);
      expect(applications[0]).toHaveProperty("id");
      expect(applications[0]).toHaveProperty("position");
      expect(applications[0]).toHaveProperty("status");
    });

    it("sets version key for new users", () => {
      Effect.runSync(getApplicationsFromStorage);

      const version = localStorage.getItem(VERSION_KEY);
      expect(version).toBe("1");
    });

    it("persists seeded data to localStorage for new users", () => {
      Effect.runSync(getApplicationsFromStorage);

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBeGreaterThan(0);
    });

    it("returns existing data when localStorage has data", () => {
      const testApplications = [createTestApplication()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testApplications));
      localStorage.setItem(VERSION_KEY, "1");

      const applications = Effect.runSync(getApplicationsFromStorage);

      expect(applications).toHaveLength(1);
      expect(applications[0].id).toBe("test-app-1");
      expect(applications[0].position).toBe("Software Engineer");
    });

    it("creates version key for users without one (legacy data)", () => {
      const testApplications = [createTestApplication()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testApplications));
      // No version key set - simulating legacy user

      Effect.runSync(getApplicationsFromStorage);

      const version = localStorage.getItem(VERSION_KEY);
      expect(version).toBe("1");
    });

    it("preserves data when upgrading legacy users to versioned storage", () => {
      const testApplications = [
        createTestApplication({ position: "Legacy Position" }),
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testApplications));
      // No version key - legacy user

      const applications = Effect.runSync(getApplicationsFromStorage);

      expect(applications).toHaveLength(1);
      expect(applications[0].position).toBe("Legacy Position");
    });
  });

  describe("saveApplicationsToStorage", () => {
    it("saves applications to localStorage", () => {
      const testApplications = [createTestApplication()];

      Effect.runSync(saveApplicationsToStorage(testApplications));

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].id).toBe("test-app-1");
    });

    it("sets version key when saving", () => {
      const testApplications = [createTestApplication()];

      Effect.runSync(saveApplicationsToStorage(testApplications));

      const version = localStorage.getItem(VERSION_KEY);
      expect(version).toBe("1");
    });

    it("overwrites existing data", () => {
      const oldApplications = [
        createTestApplication({ id: "old-1", position: "Old Position" }),
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(oldApplications));

      const newApplications = [
        createTestApplication({ id: "new-1", position: "New Position" }),
      ];
      Effect.runSync(saveApplicationsToStorage(newApplications));

      const applications = Effect.runSync(getApplicationsFromStorage);
      expect(applications).toHaveLength(1);
      expect(applications[0].position).toBe("New Position");
    });
  });

  describe("clearStorage", () => {
    it("removes data from localStorage", () => {
      const testApplications = [createTestApplication()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testApplications));
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
