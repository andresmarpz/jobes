"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
  SortConfig
} from "../types";
import {
  useApplicationsQuery,
  useApplicationQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation
} from "../queries";

export function useApplications(initialSortConfig?: SortConfig) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialSortConfig ?? { column: "createdAt", direction: "desc" }
  );

  const { data: applications = [], isLoading, error, refetch } = useApplicationsQuery();
  const createMutation = useCreateApplicationMutation();
  const updateMutation = useUpdateApplicationMutation();
  const deleteMutation = useDeleteApplicationMutation();

  const sortedApplications = useMemo(() => {
    return [...applications].sort((a, b) => {
      const aValue = a[sortConfig.column];
      const bValue = b[sortConfig.column];
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }, [applications, sortConfig]);

  const toggleSort = useCallback((column: keyof Application) => {
    setSortConfig(prev => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc"
    }));
  }, []);

  const createApplication = useCallback(
    async (input: CreateApplicationInput) => {
      return createMutation.mutateAsync(input);
    },
    [createMutation]
  );

  const updateApplication = useCallback(
    async (id: string, input: UpdateApplicationInput) => {
      return updateMutation.mutateAsync({ id, input });
    },
    [updateMutation]
  );

  const deleteApplication = useCallback(
    async (id: string) => {
      return deleteMutation.mutateAsync(id);
    },
    [deleteMutation]
  );

  return {
    applications: sortedApplications,
    isLoading,
    error: error?.message ?? null,
    sortConfig,
    toggleSort,
    refresh: refetch,
    createApplication,
    updateApplication,
    deleteApplication
  };
}

export function useApplication(id: string) {
  const { data: application = null, isLoading, error, refetch } = useApplicationQuery(id);
  const updateMutation = useUpdateApplicationMutation();
  const deleteMutation = useDeleteApplicationMutation();

  const updateApplication = useCallback(
    async (input: UpdateApplicationInput) => {
      return updateMutation.mutateAsync({ id, input });
    },
    [id, updateMutation]
  );

  const deleteApplication = useCallback(async () => {
    return deleteMutation.mutateAsync(id);
  }, [id, deleteMutation]);

  return {
    application,
    isLoading,
    error: error?.message ?? null,
    refresh: refetch,
    updateApplication,
    deleteApplication
  };
}
