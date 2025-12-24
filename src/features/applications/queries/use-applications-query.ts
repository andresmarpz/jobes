"use client";

import { useQuery } from "@tanstack/react-query";
import { Effect } from "effect";
import * as ApplicationService from "../services/application-service";
import { applicationKeys } from "./keys";

export function useApplicationsQuery() {
  return useQuery({
    queryKey: applicationKeys.lists(),
    queryFn: async () => {
      const result = await Effect.runPromise(Effect.either(ApplicationService.getApplications));
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
      return result.right;
    }
  });
}
