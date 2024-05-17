'use client';

import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createAdventure } from '@/lib/adventureDbService';

const NewAdventurePage = () => {
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const user = useAuth();

  useEffect(() => {
    if (user !== null) {
      setIsUserInitialized(true);
      console.log(user);
    }
  }, [user]);

  if (isUserInitialized && user === null) {
    redirect('/login');
  }

  const newAdventureSchema = z.object({
    name: z.string().min(8, {
      message: 'Adventer name must be at least 8 characters.',
    }),
    location: z.string().min(8, {
      message: 'Adventere location must be at least 2 characters.',
    }),
    description: z.string().min(10, {
      message: 'Description must be at least 10 characters.',
    }),
  });

  const form = useForm<z.infer<typeof newAdventureSchema>>({
    resolver: zodResolver(newAdventureSchema),
    defaultValues: {
      name: '',
      location: '',
      description: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof newAdventureSchema>) => {
    try {
      // Perform any additional application-layer validation here
      // For example, checking if the combined length of name and location exceeds a limit

      const newAdventure = await createAdventure(values);
      console.log('Adventure created successfully:', newAdventure);
      // Handle success
    } catch (error) {
      console.error('Failed to create new adventure:', error);
      // Handle error
    }
  };

  return (
    <>
      <div>Welcome {user?.email} New Adventure page</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type a name" {...field} />
                </FormControl>
                <FormDescription>Name for your Adventure</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Type a location" {...field} />
                </FormControl>
                <FormDescription>Location of your Adventure</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Describe your adventure" {...field} />
                </FormControl>
                <FormDescription>Description of your Adventure</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add New</Button>
        </form>
      </Form>
    </>
  );
};

export default NewAdventurePage;
