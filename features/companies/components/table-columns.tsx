import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Company } from "@/features/companies/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Company>[] = [
  {
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    header: ({ table }) => {
      const isAllSelected = table.getIsAllPageRowsSelected();
      return (
        <Checkbox
          aria-label="Select all rows"
          checked={isAllSelected}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      );
    },
    id: "select",
    size: 28,
  },
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
