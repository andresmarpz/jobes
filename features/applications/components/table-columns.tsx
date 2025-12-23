"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Application } from "@/features/applications/types";
import { APPLICATION_STATUSES, APPLICATION_METHODS } from "@/features/applications/constants";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export const columns: ColumnDef<Application>[] = [
  {
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    header: ({ table }) => {
      const isAllSelected = table.getIsAllPageRowsSelected();
      return (
        <Checkbox
          aria-label="Select all rows"
          checked={isAllSelected}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        />
      );
    },
    id: "select",
    size: 28
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => (
      <Link href={`/applications/${row.original.id}`}>
        <div className="font-mono font-medium hover:underline">{row.original.position}</div>
      </Link>
    ),
    size: 200
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => (
      <div className="text-muted-foreground font-mono font-medium">{row.original.companyName}</div>
    ),
    size: 150
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusConfig = APPLICATION_STATUSES[status];
      return <Badge className={statusConfig.className}>{statusConfig.label}</Badge>;
    },
    size: 100
  },
  {
    accessorKey: "applicationDate",
    header: "Applied",
    cell: ({ row }) => (
      <div className="text-muted-foreground font-mono">
        {formatDate(row.original.applicationDate)}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return (
        new Date(rowA.original.applicationDate).getTime() -
        new Date(rowB.original.applicationDate).getTime()
      );
    },
    size: 100
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => {
      const method = row.original.method;
      const methodConfig = APPLICATION_METHODS[method];
      return <div className="text-muted-foreground font-mono">{methodConfig.label}</div>;
    },
    size: 150
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => (
      <div className="text-muted-foreground font-mono">{row.original.salary || "-"}</div>
    ),
    size: 120
  }
];
