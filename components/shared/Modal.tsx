import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Form } from "../ui/form";
import { SupportTicketParams } from "@/lib/types/SupportTicketParams";
import { updateSupportTicket } from "@/lib/actions/supportTicket.actions";
import { useForm } from "react-hook-form";
import { Dropdown } from 'flowbite-react';

interface ModalProps {
    ticketData: SupportTicketParams | null;
    onUpdateSuccess: () => Promise<void>;
    onClose: () => void;
}

export function Modal({ ticketData, onClose, onUpdateSuccess }: ModalProps) {
    const form = useForm<SupportTicketParams>({
      defaultValues: ticketData || {
        _id: "",
        name: "",
        email: "",
        description: "",
        status: "New",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
});

  const handleSubmit = async (values: SupportTicketParams) => {
    try {
      const ticketData = {
        ...values,
        updatedAt: new Date(),
      };
      console.log(ticketData);
      if (ticketData._id) {
        await updateSupportTicket(ticketData);
        console.log("Support ticket updated successfully!");
        onUpdateSuccess();
      } else {
        console.log("Support ticket created successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error updating/support ticket:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name" {...form.register("name")} disabled/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Email" {...form.register("email")} disabled/>
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                 <select id="status" {...form.register("status")}   className="block w-full px-3 py-2 mt-1 leading-tight bg-white border border-gray-300 text-sm rounded-md focus:outline-none focus:border-blue-500"
>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select> 

                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => form.handleSubmit(handleSubmit)()}>
            Update Ticket
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}