"use client";

import { DataTable } from "@/components/ui/data-table";
import { useApplications } from "../hooks/use-applications";
import { columns } from "@/features/applications/components/table-columns";

export function ApplicationsTable() {
  const { applications, isLoading, error } = useApplications();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p className="text-muted-foreground">
          No applications yet. Click &quot;Add Application&quot; to get started.
        </p>
      </div>
    );
  }

  return <DataTable columns={columns} data={applications} />;
}
