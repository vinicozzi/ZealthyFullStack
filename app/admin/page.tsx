'use client'
import React, { useState, useEffect } from 'react';
import { getAllTickets } from '@/lib/actions/supportTicket.actions';
import { SupportTicketParams } from '@/lib/types/SupportTicketParams';

import { columns, handleUpdateTicket} from '@/components/shared/Columns';
import { DataTable } from '@/components/shared/Data-Table';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/Modal';
import { RespondModal } from '@/components/shared/RespondModal';
import { fetchTicketById } from '@/lib/actions/supportTicket.actions';

import { DeleteAlert } from '@/components/shared/DeleteAlert';

import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert";

export default function Page() {
const [loading, setLoading] = useState(true);
const [supportTickets, setSupportTickets] = useState<SupportTicketParams[]>([]);
const [selectedTicket, setSelectedTicket] = useState<SupportTicketParams | null>(null);
const [alert, setAlert] = useState(false);
const [openModal, setOpenModal] = useState(false);
const [openRespondModal, setOpenRespondModal] = useState(false);


const openModalForTicketUpdate = async (ticketId: string) => {
    try {
        const fetchedTicketData = await fetchTicketById(ticketId);
        setSelectedTicket(fetchedTicketData);
        console.log(fetchedTicketData);
        setOpenModal(true);
    } catch (error) {
        console.error('Error fetching ticket data:', error);
    }
};

const openModalForTicketDelete = async (ticketId: string) => {
    try {
        const fetchedTicket = await fetchTicketById(ticketId);
        setSelectedTicket(fetchedTicket);
        setAlert(true);
    } catch (error) {
        console.error('Error fetching ticket for deletion:', error);
    }
};

const openModalForTicketRespond = async (ticketId: string) => {
    try {
        const fetchedTicket = await fetchTicketById(ticketId);
        setSelectedTicket(fetchedTicket);
        setOpenRespondModal(true);
    } catch (error) {
        console.error('Error fetching ticket for response:', error);
    }
}

const fetchTickets = async () => {
    try {
      const tickets = await getAllTickets();
      setSupportTickets(tickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

const handleUpdateSuccess = async () => {
    await fetchTickets();
    setOpenModal(false);
  };

    useEffect(() => {
        fetchTickets();
    }, []);

  return (
    <div className="container mx-auto py-16">
    {loading ? (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ) : (
      <>
        <DataTable
          columns={columns(openModalForTicketUpdate, openModalForTicketDelete, openModalForTicketRespond)}
          data={supportTickets}
          openModalForTicketDelete={openModalForTicketDelete}
          openModalForTicketUpdate={openModalForTicketUpdate}
          openModalForTicketRespond={openModalForTicketRespond}
        />
        {openModal && (
          <Modal
            onClose={() => setOpenModal(false)}
            ticketData={selectedTicket}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
        {openRespondModal && (
          <RespondModal
            onClose={() => setOpenRespondModal(false)}
            ticketData={selectedTicket}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
        {alert && (
          <DeleteAlert
                onClose={() => setAlert(false)}
                ticketData={selectedTicket}
                onUpdateSuccess={handleUpdateSuccess}
          />
        )}
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <Link href="/">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Access Ticket Form
            </Button>
          </Link>
        </div>
      </>
    )}
  </div>
);
}