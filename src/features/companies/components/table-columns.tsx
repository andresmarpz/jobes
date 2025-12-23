import TableHyperlinkCell from "@/components/shared/table-hyperlink-cell";
import { Badge } from "@/components/ui/badge";
import { Company } from "@/features/companies/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { CompanyIcon } from "./company-icon";

export const columns: ColumnDef<Company>[] = [
  // {
  //   cell: ({ row }) => (
  //     <Checkbox
  //       aria-label="Select row"
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //     />
  //   ),
  //   enableSorting: false,
  //   header: ({ table }) => {
  //     const isAllSelected = table.getIsAllPageRowsSelected();
  //     return (
  //       <Checkbox
  //         aria-label="Select all rows"
  //         checked={isAllSelected}
  //         onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       />
  //     );
  //   },
  //   id: "select",
  //   size: 32
  // },
  {
    accessorKey: "name",
    header: () => {
      return <span className="ml-6">Name</span>;
    },
    cell: ({ row }) => (
      <Link href={`/companies/${row.original.id}`} className="cursor-default">
        <div className="flex items-center gap-2 truncate py-3 font-mono font-medium">
          <CompanyIcon websiteUrl={row.original.websiteUrl} />
          {row.original.name}
        </div>
      </Link>
    ),
    size: 80
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <Link href={`/companies/${row.original.id}`} className="cursor-default">
        <div className="text-muted-foreground truncate py-3 font-mono font-medium">
          {row.original.description}
        </div>
      </Link>
    ),
    size: 120
  },
  {
    accessorKey: "websiteUrl",
    header: "Website",
    cell: ({ row }) => <TableHyperlinkCell url={row.original.websiteUrl ?? undefined} />,
    size: 100
  },
  {
    accessorKey: "linkedinUrl",
    header: "LinkedIn",
    cell: ({ row }) => <TableHyperlinkCell url={row.original.linkedinUrl ?? undefined} />,
    size: 100
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
    size: 40
  }
];
