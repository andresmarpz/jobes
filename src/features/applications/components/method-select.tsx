"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useUpdateApplicationMutation } from "../queries";
import type { ApplicationMethod } from "../types";
import { methodLabels } from "./table-columns";

type MethodSelectProps = {
  applicationId: string;
  currentMethod: ApplicationMethod;
};

const methodOptions: ApplicationMethod[] = [
  "cold-email",
  "referral",
  "job-board",
  "linkedin",
  "other"
];

export function MethodSelect({ applicationId, currentMethod }: MethodSelectProps) {
  const updateMutation = useUpdateApplicationMutation();

  const handleChange = (value: ApplicationMethod) => {
    if (value !== currentMethod) {
      updateMutation.mutate({ id: applicationId, input: { method: value } });
    }
  };

  return (
    <Select value={currentMethod} onValueChange={handleChange}>
      <SelectTrigger className="hover:bg-muted/50 h-7 w-[110px] border-none bg-transparent px-2 text-xs shadow-none">
        <SelectValue>{methodLabels[currentMethod]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {methodOptions.map(method => (
          <SelectItem key={method} value={method}>
            {methodLabels[method]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
