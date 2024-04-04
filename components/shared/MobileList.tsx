import React, { useState } from "react";
import { SupportTicketParams } from "@/lib/types/SupportTicketParams";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { getStatusColor } from "@/lib/utils";

interface MobileListProps {
  ticketData: SupportTicketParams[];
  handleUpdateTicket: (ticketId: string) => void;
  handleRespondToTicket: (ticketId: string) => void;
  handleDeleteTicket: (ticketId: string) => void;
}

export function MobileList({ ticketData, handleUpdateTicket, handleRespondToTicket, handleDeleteTicket }: MobileListProps) {
  const pageSize = 5; 
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, ticketData.length);
  const displayedTickets = ticketData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(ticketData.length / pageSize);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full space-y-4">
        {displayedTickets.map((ticket) => (
          <div key={ticket._id} className="bg-white rounded-lg shadow-md text-xs max-w-lg p-4">
            <div className="flex">
              <div className="w-1/2 pr-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-black">{ticket.name}</p>
                  <p className="text-black">{ticket.email}</p>
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-end">
                <div className="flex flex-col space-y-1">
                  <p className={getStatusColor(ticket.status)}>{ticket.status}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <div>
                <label className="text-gray-500">
                  Created: {formatDateTime(ticket.createdAt.toString())}
                </label>
                <br />
                <label className="text-gray-500">
                  Updated: {formatDateTime(ticket.updatedAt.toString())}
                </label>
              </div>
              <div className="flex items-center"> 
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleUpdateTicket(ticket._id)}>Update Ticket</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRespondToTicket(ticket._id)}>Respond To Ticket</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteTicket(ticket._id)}>Delete Ticket</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <Button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>Previous</Button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>Next</Button>
      </div>
    </div>
  );
}
