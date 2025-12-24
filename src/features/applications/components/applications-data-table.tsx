"use client";

import { Frame } from "@/components/ui/frame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { useState } from "react";
import type { Application } from "../types";
import ApplicationContextMenu from "./application-context-menu";

interface ApplicationsDataTableProps {
  columns: ColumnDef<Application>[];
  data: Application[];
}

export function ApplicationsDataTable({ columns, data }: ApplicationsDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });

  return (
    <Frame className="w-full">
      <Table className="table-fixed">
        <colgroup>
          {table.getAllColumns().map(column => (
            <col
              key={column.id}
              style={{
                width: column.id === "select" ? `${column.getSize()}px` : "auto"
              }}
            />
          ))}
        </colgroup>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <button
                      className="flex h-full w-full items-center justify-between gap-2"
                      onClick={header.column.getToggleSortingHandler()}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          header.column.getToggleSortingHandler()?.(e);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: (
                          <IconArrowUp aria-hidden="true" className="size-4 shrink-0 opacity-80" />
                        ),
                        desc: (
                          <IconArrowDown
                            aria-hidden="true"
                            className="size-4 shrink-0 opacity-80"
                          />
                        )
                      }[header.column.getIsSorted() as string] ?? null}
                    </button>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <ApplicationContextMenu application={row.original} key={row.id}>
                <TableRow data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              </ApplicationContextMenu>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Frame>
  );
}
