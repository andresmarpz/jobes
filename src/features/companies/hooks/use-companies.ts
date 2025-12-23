"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
  CreateContactInput,
  SortConfig
} from "../types";
import {
  useCompaniesQuery,
  useCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useAddContactMutation,
  useUpdateContactMutation,
  useRemoveContactMutation
} from "../queries";

export function useCompanies(initialSortConfig?: SortConfig) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialSortConfig ?? { column: "name", direction: "asc" }
  );

  const { data: companies = [], isLoading, error, refetch } = useCompaniesQuery();
  const createMutation = useCreateCompanyMutation();
  const updateMutation = useUpdateCompanyMutation();
  const deleteMutation = useDeleteCompanyMutation();
  const addContactMutation = useAddContactMutation();
  const updateContactMutation = useUpdateContactMutation();
  const removeContactMutation = useRemoveContactMutation();

  const sortedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => {
      const aValue = a[sortConfig.column];
      const bValue = b[sortConfig.column];
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (Array.isArray(aValue) && Array.isArray(bValue)) {
        return sortConfig.direction === "asc"
          ? aValue.length - bValue.length
          : bValue.length - aValue.length;
      }
      return 0;
    });
  }, [companies, sortConfig]);

  const toggleSort = useCallback((column: keyof Company) => {
    setSortConfig(prev => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc"
    }));
  }, []);

  const createCompany = useCallback(
    async (input: CreateCompanyInput) => {
      return createMutation.mutateAsync(input);
    },
    [createMutation]
  );

  const updateCompany = useCallback(
    async (id: string, input: UpdateCompanyInput) => {
      return updateMutation.mutateAsync({ id, input });
    },
    [updateMutation]
  );

  const deleteCompany = useCallback(
    async (id: string) => {
      return deleteMutation.mutateAsync(id);
    },
    [deleteMutation]
  );

  const addContact = useCallback(
    async (companyId: string, input: CreateContactInput) => {
      return addContactMutation.mutateAsync({ companyId, input });
    },
    [addContactMutation]
  );

  const updateContact = useCallback(
    async (companyId: string, contactId: string, input: Partial<CreateContactInput>) => {
      return updateContactMutation.mutateAsync({ companyId, contactId, input });
    },
    [updateContactMutation]
  );

  const removeContact = useCallback(
    async (companyId: string, contactId: string) => {
      return removeContactMutation.mutateAsync({ companyId, contactId });
    },
    [removeContactMutation]
  );

  return {
    companies: sortedCompanies,
    isLoading,
    error: error?.message ?? null,
    sortConfig,
    toggleSort,
    refresh: refetch,
    createCompany,
    updateCompany,
    deleteCompany,
    addContact,
    updateContact,
    removeContact
  };
}

export function useCompany(id: string) {
  const { data: company = null, isLoading, error, refetch } = useCompanyQuery(id);
  const updateMutation = useUpdateCompanyMutation();
  const deleteMutation = useDeleteCompanyMutation();
  const addContactMutation = useAddContactMutation();
  const updateContactMutation = useUpdateContactMutation();
  const removeContactMutation = useRemoveContactMutation();

  const updateCompany = useCallback(
    async (input: UpdateCompanyInput) => {
      return updateMutation.mutateAsync({ id, input });
    },
    [id, updateMutation]
  );

  const deleteCompany = useCallback(async () => {
    return deleteMutation.mutateAsync(id);
  }, [id, deleteMutation]);

  const addContact = useCallback(
    async (input: CreateContactInput) => {
      return addContactMutation.mutateAsync({ companyId: id, input });
    },
    [id, addContactMutation]
  );

  const updateContact = useCallback(
    async (contactId: string, input: Partial<CreateContactInput>) => {
      return updateContactMutation.mutateAsync({ companyId: id, contactId, input });
    },
    [id, updateContactMutation]
  );

  const removeContact = useCallback(
    async (contactId: string) => {
      return removeContactMutation.mutateAsync({ companyId: id, contactId });
    },
    [id, removeContactMutation]
  );

  return {
    company,
    isLoading,
    error: error?.message ?? null,
    refresh: refetch,
    updateCompany,
    deleteCompany,
    addContact,
    updateContact,
    removeContact
  };
}
