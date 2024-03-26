
// import { Document } from 'mongoose';

export interface SupportTicketParams {
    _id: string;
    name: string;
    email: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}