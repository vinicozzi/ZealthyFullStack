'use client'
import React, { useState, useEffect } from 'react';
import { getAllTickets } from '@/lib/actions/supportTicket.actions';
import { SupportTicketParams } from '@/lib/types/SupportTicketParams';

import { columns } from '@/components/shared/Columns';
import { DataTable } from '@/components/shared/Data-Table';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/UpdateModal';
import { RespondModal } from '@/components/shared/RespondModal';
import { fetchTicketById } from '@/lib/actions/supportTicket.actions';

import { DeleteAlert } from '@/components/shared/DeleteAlert';
import { MobileList } from '@/components/shared/MobileList';

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
      tickets.sort((a: SupportTicketParams, b: SupportTicketParams) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

    const [isMobile, setIsMobile] = useState(false); 

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1400); 
  };

  useEffect(() => {
    handleResize(); 
    window.addEventListener('resize', handleResize); 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    return (
      <div className="container mx-auto py-16 bg-white">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="md:flex md:flex-col bg-white">
              {isMobile ? (
              <MobileList 
                ticketData={supportTickets}
                handleDeleteTicket={openModalForTicketDelete}
                handleUpdateTicket={openModalForTicketUpdate}
                handleRespondToTicket={openModalForTicketRespond}
              />
              ) : (
                <DataTable
                  columns={columns(openModalForTicketUpdate, openModalForTicketDelete, openModalForTicketRespond)}
                  data={supportTickets}
                  openModalForTicketDelete={openModalForTicketDelete}
                  openModalForTicketUpdate={openModalForTicketUpdate}
                  openModalForTicketRespond={openModalForTicketRespond}
                />
              )}
            </div>
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