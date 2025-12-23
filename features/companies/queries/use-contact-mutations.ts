"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Effect } from "effect";
import type { Company, Contact, CreateContactInput } from "../types";
import * as CompanyService from "../services/company-service";
import { companyKeys } from "./keys";

export function useAddContactMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, input }: { companyId: string; input: CreateContactInput }) => {
      const result = await Effect.runPromise(
        Effect.either(CompanyService.addContact(companyId, input))
      );
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
      return result.right;
    },
    onMutate: async ({ companyId, input }) => {
      await queryClient.cancelQueries({ queryKey: companyKeys.lists() });
      await queryClient.cancelQueries({ queryKey: companyKeys.detail(companyId) });

      const previousCompanies = queryClient.getQueryData<Company[]>(companyKeys.lists());
      const previousCompany = queryClient.getQueryData<Company>(companyKeys.detail(companyId));

      const optimisticContact: Contact = {
        id: crypto.randomUUID(),
        ...input
      };

      queryClient.setQueryData<Company[]>(companyKeys.lists(), old =>
        old?.map(company =>
          company.id === companyId
            ? {
                ...company,
                contacts: [...company.contacts, optimisticContact],
                updatedAt: new Date().toISOString()
              }
            : company
        )
      );

      queryClient.setQueryData<Company>(companyKeys.detail(companyId), old =>
        old
          ? {
              ...old,
              contacts: [...old.contacts, optimisticContact],
              updatedAt: new Date().toISOString()
            }
          : old
      );

      return { previousCompanies, previousCompany };
    },
    onError: (_err, { companyId }, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(companyKeys.lists(), context.previousCompanies);
      }
      if (context?.previousCompany) {
        queryClient.setQueryData(companyKeys.detail(companyId), context.previousCompany);
      }
    },
    onSettled: (_data, _error, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(companyId) });
    }
  });
}

export function useUpdateContactMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      companyId,
      contactId,
      input
    }: {
      companyId: string;
      contactId: string;
      input: Partial<CreateContactInput>;
    }) => {
      const result = await Effect.runPromise(
        Effect.either(CompanyService.updateContact(companyId, contactId, input))
      );
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
      return result.right;
    },
    onMutate: async ({ companyId, contactId, input }) => {
      await queryClient.cancelQueries({ queryKey: companyKeys.lists() });
      await queryClient.cancelQueries({ queryKey: companyKeys.detail(companyId) });

      const previousCompanies = queryClient.getQueryData<Company[]>(companyKeys.lists());
      const previousCompany = queryClient.getQueryData<Company>(companyKeys.detail(companyId));

      const updateContacts = (contacts: Contact[]) =>
        contacts.map(contact => (contact.id === contactId ? { ...contact, ...input } : contact));

      queryClient.setQueryData<Company[]>(companyKeys.lists(), old =>
        old?.map(company =>
          company.id === companyId
            ? {
                ...company,
                contacts: updateContacts(company.contacts),
                updatedAt: new Date().toISOString()
              }
            : company
        )
      );

      queryClient.setQueryData<Company>(companyKeys.detail(companyId), old =>
        old
          ? {
              ...old,
              contacts: updateContacts(old.contacts),
              updatedAt: new Date().toISOString()
            }
          : old
      );

      return { previousCompanies, previousCompany };
    },
    onError: (_err, { companyId }, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(companyKeys.lists(), context.previousCompanies);
      }
      if (context?.previousCompany) {
        queryClient.setQueryData(companyKeys.detail(companyId), context.previousCompany);
      }
    },
    onSettled: (_data, _error, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(companyId) });
    }
  });
}

export function useRemoveContactMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, contactId }: { companyId: string; contactId: string }) => {
      const result = await Effect.runPromise(
        Effect.either(CompanyService.removeContact(companyId, contactId))
      );
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
    },
    onMutate: async ({ companyId, contactId }) => {
      await queryClient.cancelQueries({ queryKey: companyKeys.lists() });
      await queryClient.cancelQueries({ queryKey: companyKeys.detail(companyId) });

      const previousCompanies = queryClient.getQueryData<Company[]>(companyKeys.lists());
      const previousCompany = queryClient.getQueryData<Company>(companyKeys.detail(companyId));

      const removeContact = (contacts: Contact[]) =>
        contacts.filter(contact => contact.id !== contactId);

      queryClient.setQueryData<Company[]>(companyKeys.lists(), old =>
        old?.map(company =>
          company.id === companyId
            ? {
                ...company,
                contacts: removeContact(company.contacts),
                updatedAt: new Date().toISOString()
              }
            : company
        )
      );

      queryClient.setQueryData<Company>(companyKeys.detail(companyId), old =>
        old
          ? {
              ...old,
              contacts: removeContact(old.contacts),
              updatedAt: new Date().toISOString()
            }
          : old
      );

      return { previousCompanies, previousCompany };
    },
    onError: (_err, { companyId }, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(companyKeys.lists(), context.previousCompanies);
      }
      if (context?.previousCompany) {
        queryClient.setQueryData(companyKeys.detail(companyId), context.previousCompany);
      }
    },
    onSettled: (_data, _error, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(companyId) });
    }
  });
}
