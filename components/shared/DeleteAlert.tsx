import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SupportTicketParams } from "@/lib/types/SupportTicketParams";
import { deleteSupportTicket } from "@/lib/actions/supportTicket.actions";

interface DeleteAlertProps {
  ticketData: SupportTicketParams | null;
  onClose: () => void;
  onUpdateSuccess: () => Promise<void>;
}

export function DeleteAlert({ ticketData, onClose, onUpdateSuccess }: DeleteAlertProps) {

  const handleDelete = async () => {
    try {
      if (ticketData && ticketData._id) {
        await deleteSupportTicket(ticketData._id);
        console.log("Support ticket deleted successfully!");
        onUpdateSuccess(); 
      }
    } catch (error) {
      console.error("Error deleting support ticket:", error);
    } finally {
      onClose();
    }
  };

  const handleCancel = () => {
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Delete Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Are you sure you want to delete this ticket?</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleDelete} className="ml-2">
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
