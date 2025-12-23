"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Effect } from "effect";
import type { Company, CreateCompanyInput, UpdateCompanyInput } from "../types";
import * as CompanyService from "../services/company-service";
import { findWorkingIconUrl } from "../services/icon-validation";
import { companyKeys } from "./keys";

async function validateAndUpdateIconUrls(company: Company): Promise<void> {
  if (company.iconUrls.length === 0) return;

  const workingUrl = await findWorkingIconUrl(company.iconUrls);
  const validatedUrls = workingUrl ? [workingUrl] : [];

  // Only update if the validated URLs are different
  if (JSON.stringify(validatedUrls) !== JSON.stringify(company.iconUrls)) {
    await Effect.runPromise(
      CompanyService.updateCompany(company.id, { iconUrls: validatedUrls })
    );
  }
}

export function useCreateCompanyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCompanyInput) => {
      const result = await Effect.runPromise(Effect.either(CompanyService.createCompany(input)));
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
      return result.right;
    },
    onMutate: async newCompany => {
      await queryClient.cancelQueries({ queryKey: companyKeys.lists() });
      const previousCompanies = queryClient.getQueryData<Company[]>(companyKeys.lists());

      const optimisticCompany: Company = {
        id: crypto.randomUUID(),
        ...newCompany,
        iconUrls: [],
        contacts: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      queryClient.setQueryData<Company[]>(companyKeys.lists(), old => [
        ...(old ?? []),
        optimisticCompany
      ]);

      return { previousCompanies };
    },
    onError: (_err, _newCompany, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(companyKeys.lists(), context.previousCompanies);
      }
    },
    onSuccess: async company => {
      await validateAndUpdateIconUrls(company);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
    }
  });
}

export function useUpdateCompanyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateCompanyInput }) => {
      const result = await Effect.runPromise(
        Effect.either(CompanyService.updateCompany(id, input))
      );
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
      return result.right;
    },
    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey: companyKeys.lists() });
      await queryClient.cancelQueries({ queryKey: companyKeys.detail(id) });

      const previousCompanies = queryClient.getQueryData<Company[]>(companyKeys.lists());
      const previousCompany = queryClient.getQueryData<Company>(companyKeys.detail(id));

      queryClient.setQueryData<Company[]>(companyKeys.lists(), old =>
        old?.map(company =>
          company.id === id
            ? { ...company, ...input, updatedAt: new Date().toISOString() }
            : company
        )
      );

      queryClient.setQueryData<Company>(companyKeys.detail(id), old =>
        old ? { ...old, ...input, updatedAt: new Date().toISOString() } : old
      );

      return { previousCompanies, previousCompany };
    },
    onError: (_err, { id }, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(companyKeys.lists(), context.previousCompanies);
      }
      if (context?.previousCompany) {
        queryClient.setQueryData(companyKeys.detail(id), context.previousCompany);
      }
    },
    onSuccess: async (company, { input }) => {
      // Only validate if websiteUrl changed (iconUrls were rebuilt with candidates)
      if (input.websiteUrl !== undefined) {
        await validateAndUpdateIconUrls(company);
      }
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(id) });
    }
  });
}

export function useDeleteCompanyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await Effect.runPromise(Effect.either(CompanyService.deleteCompany(id)));
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
    },
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: companyKeys.lists() });

      const previousCompanies = queryClient.getQueryData<Company[]>(companyKeys.lists());

      queryClient.setQueryData<Company[]>(companyKeys.lists(), old =>
        old?.filter(company => company.id !== id)
      );

      return { previousCompanies };
    },
    onError: (_err, _id, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(companyKeys.lists(), context.previousCompanies);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
    }
  });
}
