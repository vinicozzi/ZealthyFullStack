'use client'
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { supportFormSchema } from "@/lib/validator";
import { z } from 'zod';

import { createSupportTicket } from "@/lib/actions/supportTicket.actions";
import { SupportTicketParams } from "@/lib/types/SupportTicketParams";
import { Textarea } from "../ui/textarea";

const SupportForm = () => {
    
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof supportFormSchema>>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email:"",
      description:"",
      status: "New",
      createdAt: new Date(), 
      updatedAt: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof supportFormSchema>) {
    try {
        const ticketData= {
          ...values,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
    
        await createSupportTicket(ticketData as SupportTicketParams);
        setIsSubmitted(true);
        console.log('Support ticket submitted successfully!');
        form.reset();
      } catch (error) {
        console.error('Error submitting support ticket:', error);
      }
  } 

  const handleCreateNewTicket = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
      {!isSubmitted ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 bg-white shadow-md rounded px-10 pt-6 pb-8 w-96">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem key={field.name}>
                <FormLabel className="block text-gray-700 text-lg font-bold mb-2">Name</FormLabel>
                <FormControl>
                  <Input className="shadow appearance-none border rounded w-full py-5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem key={field.name}>
                <FormLabel className="block text-gray-700 text-lg font-bold mb-2">Email</FormLabel>
                <FormControl>
                  <Input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem key={field.name}>
                <FormLabel className="block text-gray-700 text-lg font-bold mb-2">Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</Button>
          </div>
        </form>
            ) : (
                <div className="mt-10 text-center text-blue-500 font-bold">
                <div>Support ticket successfully submitted!</div>
                <div className="flex justify-center mt-4">
                    <Button onClick={handleCreateNewTicket} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline">Create New Support Ticket</Button>
                </div>
                </div>
            )}     
      </Form>
    </div>
  );
}
    


export default SupportForm;