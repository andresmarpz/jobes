"use client";

import TableHyperlinkCell from "@/components/shared/table-hyperlink-cell";
import type { Application, ApplicationStatus, ApplicationMethod } from "../types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CompanyIcon } from "@/features/companies/components/company-icon";
import { useCompany } from "@/features/companies/hooks/use-companies";

export const statusConfig: Record<
  ApplicationStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  applied: { label: "Applied", variant: "default" },
  screening: { label: "Screening", variant: "secondary" },
  interviewing: { label: "Interviewing", variant: "outline" },
  offer: { label: "Offer", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  withdrawn: { label: "Withdrawn", variant: "secondary" }
};

export const methodLabels: Record<ApplicationMethod, string> = {
  "cold-email": "Cold Email",
  referral: "Referral",
  "job-board": "Job Board",
  linkedin: "LinkedIn",
  other: "Other"
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function CompanyCell({ application }: { application: Application }) {
  const { company } = useCompany(application.companyId);
  if (!company) return null;
  return (
    <Link href={`/companies/${application.companyId}`} className="cursor-default">
      <div className="flex items-center gap-2 truncate py-3 font-mono font-medium">
        <CompanyIcon iconUrls={company.iconUrls} />
        {company.name}
      </div>
    </Link>
  );
}

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => (
      <Link href={`/applications/${row.original.id}`} className="cursor-default">
        <div className="truncate py-3 font-mono font-medium">{row.original.position}</div>
      </Link>
    ),
    size: 120
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => <CompanyCell application={row.original} />,
    size: 100
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = statusConfig[status];
      return (
        <Badge variant={config.variant} className="w-fit">
          {config.label}
        </Badge>
      );
    },
    size: 100
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => {
      const method = row.original.method;
      return (
        <Badge variant="outline" className="w-fit font-normal">
          {methodLabels[method]}
        </Badge>
      );
    },
    size: 100
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => (
      <span className="text-muted-foreground font-mono">{row.original.salary ?? "-"}</span>
    ),
    size: 60
  },
  {
    accessorKey: "relevantUrl",
    header: "URL",
    cell: ({ row }) => <TableHyperlinkCell url={row.original.relevantUrl ?? undefined} />,
    size: 80
  },
  {
    accessorKey: "createdAt",
    header: "Applied",
    cell: ({ row }) => (
      <span className="text-muted-foreground font-mono text-sm">
        {formatDate(row.original.createdAt)}
      </span>
    ),
    size: 80
  }
];
