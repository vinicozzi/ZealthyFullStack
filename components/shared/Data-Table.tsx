"use client"
import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


import { getStatusColor } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input";

interface DataTableProps<TData, TValue> {
    openModalForTicketUpdate: (ticketId: string) => Promise<void>;
    openModalForTicketDelete: (ticketId: string) => Promise<void>;
    openModalForTicketRespond: (ticketId: string) => Promise<void>;
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )
    const [selectedFilter, setSelectedFilter] = React.useState<string>("All");

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleFilterSelection = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      table.resetColumnFilters();
    } else {
      table.getColumn("status")?.setFilterValue(filter);
    }
  };


  return (
    <div className="relative">
    <div className="absolute top-0 right-0 py-4 px-6">
        <Input
          placeholder="Filter By Email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 py-4 px-6">
        <Input
          placeholder="Filter By Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="flex items-center py-4">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                <Button variant="outline">{selectedFilter}</Button> 
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleFilterSelection("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelection("New")}>New</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelection("In Progress")}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelection("Resolved")}>Resolved</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const status = cell.getValue() as string; 
                  return (
                    <TableCell key={cell.id} className={getStatusColor(status)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}