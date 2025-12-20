import { Badge } from "@/components/ui/badge";
import { Company } from "@/features/companies/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium font-mono">{row.original.name}</div>
    ),
    size: 80,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="font-medium font-mono text-muted-foreground">
        {row.original.description}
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: "websiteUrl",
    header: "Website",
    cell: ({ row }) => (
      <div className="font-medium font-mono text-muted-foreground truncate">
        {row.original.websiteUrl || "-"}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "linkedinUrl",
    header: "LinkedIn",
    cell: ({ row }) => (
      <div className="font-medium font-mono text-muted-foreground truncate">
        {row.original.linkedinUrl || "-"}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "contacts",
    header: "Contacts",
    cell: ({ row }) => {
      const contacts = row.original.contacts;
      return <Badge variant="secondary">{contacts.length}</Badge>;
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.contacts.length - rowB.original.contacts.length;
    },
  },
];
