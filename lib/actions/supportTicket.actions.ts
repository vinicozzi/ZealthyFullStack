"use server" 

import { connectToDatabase } from "../mongodb/database";
import { SupportTicketParams } from "../types/SupportTicketParams";
import SupportTicket from "../mongodb/database/models/form.model";

export const createSupportTicket = async ({ name, email, description, createdAt, updatedAt, status } :SupportTicketParams) => {
    try {
        await connectToDatabase();

        const newSupportticket = await SupportTicket.create({ name, email, description, createdAt, updatedAt, status });

        return JSON.parse(JSON.stringify(newSupportticket));
    } catch (error) {
        console.error(error);
    }
}

export const deleteSupportTicket = async (ticketId: string) => {
    try {
        await connectToDatabase();

        const deletedTicket = await SupportTicket.findByIdAndDelete(ticketId);

        if (!deletedTicket) {
            console.warn(`Ticket with ID ${ticketId} not found`);
            return null;
          }

        return JSON.parse(JSON.stringify(deletedTicket));
    } catch (error) {
        console.error("Error deleting support ticket:", error);
        return null;
    }
};
export const getAllTickets = async () => { 
    try {
        await connectToDatabase();

        const allTickets = await SupportTicket.find();

        return JSON.parse(JSON.stringify(allTickets));
    } catch (error) {
        console.error(error);
    }
}

export const updateSupportTicket = async (ticketData :SupportTicketParams) => {
    try {
        await connectToDatabase();

        const updatedTicket = await SupportTicket.findByIdAndUpdate(
            ticketData._id,
            ticketData,
            { new: true }
        );

        return JSON.parse(JSON.stringify(updatedTicket));
    } catch (error) {
        console.error(error);
    }
}

export const fetchTicketById = async (ticketId: string) => {
    try {
      await connectToDatabase();
  
      const foundTicket = await SupportTicket.findById(ticketId);
  
      if (!foundTicket) {
        console.warn(`Ticket with ID ${ticketId} not found`);
        return null;
      }
  
      return JSON.parse(JSON.stringify(foundTicket));
    } catch (error) {
      console.error("Error fetching ticket by ID:", error);
      return null;
    }
  };