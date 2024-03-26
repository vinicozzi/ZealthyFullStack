"use client"
import React, { useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/utils";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

// import { updateSupportTicket, deleteSupportTicket} from "@/lib/actions/supportTicket.actions";
import { SupportTicketParams } from "@/lib/types/SupportTicketParams";

// const handleDeleteTicket = (ticket: SupportTicketParams) => {
//     console.log("Deleting ticket", ticket)
// };

// interface ColumnsProps {
//     onTicketUpdate: (ticket: SupportTicketParams) => void;
// }

export const handleUpdateTicket = (ticketId: string, openModalForTicketUpdate: (ticketId: string) => void) => {
    openModalForTicketUpdate(ticketId);
};

export const handleDeleteTicket = (ticketId: string, openModalForTicketDelete: (ticketId: string) => void) => {
    openModalForTicketDelete(ticketId);
}


export const columns = (openModalForTicketUpdate: (ticketId: string) => void, openModalForTicketDelete: (ticketId: string) => void): ColumnDef<SupportTicketParams>[] => [
    {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const createdAt: Date = row.original.createdAt;
        const formattedDateTime = formatDateTime(createdAt.toString());
        return <div>{formattedDateTime}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
      const updatedAt: Date = row.original.updatedAt;
      const formattedDateTime = formatDateTime(updatedAt.toString());
      return <div>{formattedDateTime}</div>;
    },

  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ticket = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleUpdateTicket(ticket._id, openModalForTicketUpdate)}>Update Ticket</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteTicket(ticket._id, openModalForTicketDelete)}>Delete Ticket</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
},
]
