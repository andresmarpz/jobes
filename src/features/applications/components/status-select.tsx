"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useUpdateApplicationMutation } from "../queries";
import type { ApplicationStatus } from "../types";
import { statusConfig } from "./table-columns";

type StatusSelectProps = {
  applicationId: string;
  currentStatus: ApplicationStatus;
};

const statusOptions: ApplicationStatus[] = [
  "applied",
  "screening",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn"
];

export function StatusSelect({ applicationId, currentStatus }: StatusSelectProps) {
  const updateMutation = useUpdateApplicationMutation();

  const handleChange = (value: ApplicationStatus | null) => {
    if (value && value !== currentStatus) {
      updateMutation.mutate({ id: applicationId, input: { status: value } });
    }
  };

  const config = statusConfig[currentStatus];

  return (
    <Select value={currentStatus} onValueChange={handleChange}>
      <SelectTrigger className="hover:bg-muted/50 max-h-7 w-[120px] truncate border-none bg-transparent px-2 text-xs shadow-none">
        <SelectValue>{config.label}</SelectValue>
      </SelectTrigger>
      <SelectContent className="text-xs">
        {statusOptions.map(status => (
          <SelectItem className="text-xs" key={status} value={status}>
            {statusConfig[status].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
