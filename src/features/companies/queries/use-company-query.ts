"use client";

import { useQuery } from "@tanstack/react-query";
import { Effect } from "effect";
import * as CompanyService from "../services/company-service";
import { companyKeys } from "./keys";

export function useCompanyQuery(id: string) {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: async () => {
      const result = await Effect.runPromise(Effect.either(CompanyService.getCompany(id)));
      if (result._tag === "Left") {
        throw new Error(result.left.message);
      }
      return result.right;
    },
    enabled: !!id
  });
}
