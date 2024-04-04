import React, { useState, useEffect } from "react";
import { SupportTicketParams } from "@/lib/types/SupportTicketParams";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { getStatusColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface MobileListProps {
    ticketData: SupportTicketParams[];
    handleUpdateTicket: (ticketId: string) => void;
    handleRespondToTicket: (ticketId: string) => void;
    handleDeleteTicket: (ticketId: string) => void;
}

export function MobileList({ ticketData, handleUpdateTicket, handleRespondToTicket, handleDeleteTicket }: MobileListProps) {
  const pageSize = 5; 
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    setCurrentPage(1); 
  }, [filterName, filterEmail, filterStatus]);

  const applyFilters = (ticket: SupportTicketParams) => {
    return (
        ticket.name.toLowerCase().includes(filterName.toLowerCase()) &&
        ticket.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
        ticket.status.toLowerCase().includes(filterStatus.toLowerCase())
    );
  };

  const filteredTickets = ticketData.filter(applyFilters);
  const totalPages = Math.ceil(filteredTickets.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredTickets.length);
  const displayedTickets = filteredTickets.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return; 
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white ">
      <div className="w-full space-y-4">
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-md py-1 px-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <Input
            type="text"
            placeholder="Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
          />
        </div>
        {displayedTickets.map((ticket) => (
          <div key={ticket._id} className="bg-white rounded-lg shadow-md text-xs max-w-lg p-4">
            <div className="flex justify-center">
              <div className="w-1/2 pr-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-black text-sm">{ticket.name}</p>
                  <p className="text-black">{ticket.email}</p>
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-end">
                <div className="flex flex-col space-y-1">
                  <p className={getStatusColor(ticket.status)}>{ticket.status}</p>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs font-semibold text-gray-900">{ticket.description}</p>
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
      
      {displayedTickets.length === 0? (
          <div className="text-center text-gray-500 mt-4 font-bold">No results found</div>
          ) : (
      <div className="flex items-center mt-8 space-x-2">
        <Button 
          disabled={currentPage === 1} 
          onClick={() => goToPage(currentPage - 1)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button 
          disabled={currentPage === totalPages} 
          onClick={() => goToPage(currentPage + 1)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Next
        </Button>
      </div>
      )}
    </div>
  );
}
