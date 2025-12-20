"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Company } from "../types"

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      const handleSort = () => {
        if (!isSorted) {
          column.toggleSorting(false) // set to asc
        } else if (isSorted === "asc") {
          column.toggleSorting(true) // set to desc
        } else {
          column.clearSorting() // clear sorting
        }
      }
      return (
        <button
          onClick={handleSort}
          className="flex items-center gap-1 hover:text-foreground/80"
        >
          Name
          {isSorted === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4 opacity-50" />
          )}
        </button>
      )
    },
    cell: ({ row }) => {
      const company = row.original
      return (
        <Link
          href={`/companies/${company.id}`}
          className="font-medium hover:underline"
        >
          {company.name}
        </Link>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      const handleSort = () => {
        if (!isSorted) {
          column.toggleSorting(false)
        } else if (isSorted === "asc") {
          column.toggleSorting(true)
        } else {
          column.clearSorting()
        }
      }
      return (
        <button
          onClick={handleSort}
          className="flex items-center gap-1 hover:text-foreground/80"
        >
          Description
          {isSorted === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4 opacity-50" />
          )}
        </button>
      )
    },
    cell: ({ row }) => (
      <span className="max-w-xs truncate block">
        {row.getValue("description")}
      </span>
    ),
  },
  {
    accessorKey: "websiteUrl",
    header: "Website",
    cell: ({ row }) => {
      const url = row.getValue("websiteUrl") as string | null
      if (!url) {
        return <span className="text-muted-foreground">-</span>
      }
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only">Visit website</span>
        </a>
      )
    },
  },
  {
    accessorKey: "linkedinUrl",
    header: "LinkedIn",
    cell: ({ row }) => {
      const url = row.getValue("linkedinUrl") as string | null
      if (!url) {
        return <span className="text-muted-foreground">-</span>
      }
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only">Visit LinkedIn</span>
        </a>
      )
    },
  },
  {
    accessorKey: "contacts",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      const handleSort = () => {
        if (!isSorted) {
          column.toggleSorting(false)
        } else if (isSorted === "asc") {
          column.toggleSorting(true)
        } else {
          column.clearSorting()
        }
      }
      return (
        <button
          onClick={handleSort}
          className="flex items-center gap-1 hover:text-foreground/80"
        >
          Contacts
          {isSorted === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4 opacity-50" />
          )}
        </button>
      )
    },
    cell: ({ row }) => {
      const contacts = row.original.contacts
      return <Badge variant="secondary">{contacts.length}</Badge>
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.contacts.length - rowB.original.contacts.length
    },
  },
]
