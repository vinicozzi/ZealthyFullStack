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
import { useForm } from "react-hook-form";
import { Dropdown } from 'flowbite-react';

interface ModalProps {
   ticketData: SupportTicketParams | null;
   onUpdateSuccess: () => Promise<void>;
   onClose: () => void;
}

export function RespondModal({ ticketData, onClose, onUpdateSuccess }: ModalProps) {
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

const [responseText, setResponseText] = useState<string>(""); 

  const handleResponseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponseText(event.target.value);
  };

const handleSubmit = async () => {
    try {
      const { _id, name, email, description, status } = ticketData || {}; 
  
      const emailContent = 
        `Ticket Details:\n
        Ticket ID: ${_id}\n
        Name: ${name}\n
        Email: ${email}\n
        Description: ${description}\n
        Status: ${status}\n\n
        Admin Response:\n
        ${responseText}\n\n
        Thank you for your patience!`;
  
      console.log("Email content:", emailContent);
  
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };
  
 const handleCancel = () => {
   onClose();
 };

 return (
   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
     <Card className="w-[350px]">
       <CardHeader>
         <CardTitle>Respond to Ticket</CardTitle>
       </CardHeader>
       <CardContent>
         <Form {...form}>
        <form onSubmit={form.handleSubmit(() => handleSubmit())}> 
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
                <Input id="status" placeholder="Status" {...form.register("status")} disabled/>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="response">Response</Label>
                    <textarea id="response" placeholder="Write your response here" value={responseText} onChange={handleResponseChange} />
                    </div>
            
             </div>
           </form>
         </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                    Respond To Ticket
                </Button>
                </CardFooter>
      </Card>
    </div>
  );
}