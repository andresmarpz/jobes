"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Effect } from "effect";
import type { Application, CreateApplicationInput, UpdateApplicationInput } from "../types";
import * as ApplicationService from "../services/application-service";
import { applicationKeys } from "./keys";
import { companyKeys } from "../../companies/queries/keys";

export function useCreateApplicationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateApplicationInput) => {
      const result = await Effect.runPromise(
        Effect.either(ApplicationService.createApplication(input))
      );
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
      return result.right;
    },
    onMutate: async newApplication => {
      await queryClient.cancelQueries({ queryKey: applicationKeys.lists() });
      const previousApplications = queryClient.getQueryData<Application[]>(
        applicationKeys.lists()
      );

      const optimisticApplication: Application = {
        id: crypto.randomUUID(),
        ...newApplication,
        companyId: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      queryClient.setQueryData<Application[]>(applicationKeys.lists(), old => [
        ...(old ?? []),
        optimisticApplication
      ]);

      return { previousApplications };
    },
    onError: (_err, _newApplication, context) => {
      if (context?.previousApplications) {
        queryClient.setQueryData(applicationKeys.lists(), context.previousApplications);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
    }
  });
}

export function useUpdateApplicationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateApplicationInput }) => {
      const result = await Effect.runPromise(
        Effect.either(ApplicationService.updateApplication(id, input))
      );
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
      return result.right;
    },
    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey: applicationKeys.lists() });
      await queryClient.cancelQueries({ queryKey: applicationKeys.detail(id) });

      const previousApplications = queryClient.getQueryData<Application[]>(
        applicationKeys.lists()
      );
      const previousApplication = queryClient.getQueryData<Application>(
        applicationKeys.detail(id)
      );

      queryClient.setQueryData<Application[]>(applicationKeys.lists(), old =>
        old?.map(application =>
          application.id === id
            ? { ...application, ...input, updatedAt: new Date().toISOString() }
            : application
        )
      );

      queryClient.setQueryData<Application>(applicationKeys.detail(id), old =>
        old ? { ...old, ...input, updatedAt: new Date().toISOString() } : old
      );

      return { previousApplications, previousApplication };
    },
    onError: (_err, { id }, context) => {
      if (context?.previousApplications) {
        queryClient.setQueryData(applicationKeys.lists(), context.previousApplications);
      }
      if (context?.previousApplication) {
        queryClient.setQueryData(applicationKeys.detail(id), context.previousApplication);
      }
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
    }
  });
}

export function useDeleteApplicationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await Effect.runPromise(
        Effect.either(ApplicationService.deleteApplication(id))
      );
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
    },
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: applicationKeys.lists() });

      const previousApplications = queryClient.getQueryData<Application[]>(
        applicationKeys.lists()
      );

      queryClient.setQueryData<Application[]>(applicationKeys.lists(), old =>
        old?.filter(application => application.id !== id)
      );

      return { previousApplications };
    },
    onError: (_err, _id, context) => {
      if (context?.previousApplications) {
        queryClient.setQueryData(applicationKeys.lists(), context.previousApplications);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
    }
  });
}
