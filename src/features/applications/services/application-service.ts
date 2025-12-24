import { Effect } from "effect";
import type { Application, CreateApplicationInput, UpdateApplicationInput } from "../types";
import {
  getApplicationsFromStorage,
  saveApplicationsToStorage,
  StorageError
} from "./storage";
import * as CompanyService from "../../companies/services/company-service";

export class ApplicationNotFoundError extends Error {
  readonly _tag = "ApplicationNotFoundError";
  constructor(id: string) {
    super(`Application with id ${id} not found`);
    this.name = "ApplicationNotFoundError";
  }
}

export const getApplications = getApplicationsFromStorage;

export const getApplication = (id: string) =>
  Effect.gen(function* () {
    const applications = yield* getApplicationsFromStorage;
    const application = applications.find(a => a.id === id);
    if (!application) {
      return yield* Effect.fail(new ApplicationNotFoundError(id));
    }
    return application;
  });

export const createApplication = (input: CreateApplicationInput) =>
  Effect.gen(function* () {
    const applications = yield* getApplicationsFromStorage;
    const company = yield* CompanyService.findOrCreateCompanyByName(input.company);
    const now = new Date().toISOString();
    const newApplication: Application = {
      id: crypto.randomUUID(),
      ...input,
      companyId: company.id,
      createdAt: now,
      updatedAt: now
    };
    yield* saveApplicationsToStorage([...applications, newApplication]);
    return newApplication;
  });

export const updateApplication = (id: string, input: UpdateApplicationInput) =>
  Effect.gen(function* () {
    const applications = yield* getApplicationsFromStorage;
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) {
      return yield* Effect.fail(new ApplicationNotFoundError(id));
    }
    const existing = applications[index];

    let companyId = existing.companyId;
    if (input.company && input.company !== existing.company) {
      const company = yield* CompanyService.findOrCreateCompanyByName(input.company);
      companyId = company.id;
    }

    const updatedApplication: Application = {
      ...existing,
      ...input,
      companyId,
      updatedAt: new Date().toISOString()
    };
    const updatedApplications = [...applications];
    updatedApplications[index] = updatedApplication;
    yield* saveApplicationsToStorage(updatedApplications);
    return updatedApplication;
  });

export const deleteApplication = (id: string) =>
  Effect.gen(function* () {
    const applications = yield* getApplicationsFromStorage;
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) {
      return yield* Effect.fail(new ApplicationNotFoundError(id));
    }
    const updatedApplications = applications.filter(a => a.id !== id);
    yield* saveApplicationsToStorage(updatedApplications);
  });

export type ApplicationServiceError = StorageError | ApplicationNotFoundError;
