"use client"

import { DataTable } from "@/components/ui/data-table"
import { useCompanies } from "../hooks/use-companies"
import { columns } from "@/features/companies/components/table-columns"

export function CompaniesTable() {
  const { companies, isLoading, error } = useCompanies()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading companies...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p className="text-muted-foreground">
          No companies yet. Click &quot;Add Company&quot; to get started.
        </p>
      </div>
    )
  }

  return <DataTable columns={columns} data={companies} />
}
