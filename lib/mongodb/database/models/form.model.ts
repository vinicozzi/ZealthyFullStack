import { Schema, model, models } from "mongoose";

const SupportTicketSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'New' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const SupportTicket = models.SupportTicket|| model('SupportTicket', SupportTicketSchema);

export default SupportTicket;