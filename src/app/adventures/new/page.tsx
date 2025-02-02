'use client';

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/FormIndex';
import { Input } from '@/components/ui/input';
import { createAdventure } from '@/lib/adventureDbService';
import { FC, ReactNode } from 'react';
import { NewAdventureFormValues } from '@/types/NewAdventureFormValues'; // Ensure this path is correct
import Form from '@/components/ui/Form';
import FormField from '@/components/ui/FormField';

const NewAdventurePage: FC = (): ReactNode => {
  const newAdventureSchema = z.object({
    name: z.string().min(8, {
      message: 'Adventure name must be at least 8 characters.',
    }),
    location: z.string().min(2, {
      message: 'Adventure location must be at least 2 characters.',
    }),
    description: z.string().min(10, {
      message: 'Description must be at least 10 characters.',
    }),
  });

  const formMethods = useForm<NewAdventureFormValues>({
    resolver: zodResolver(newAdventureSchema),
    defaultValues: {
      name: '',
      location: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<NewAdventureFormValues> = async (data) => {
    try {
      const newAdventure = await createAdventure(data);
      console.log('Adventure created successfully:', newAdventure);
    } catch (error) {
      console.error('Failed to create new adventure:', error);
    }
  };

  return (
    <Form formMethods={formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <FormField
          control={formMethods.control}
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
          control={formMethods.control}
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
          control={formMethods.control}
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
  );
};

export default NewAdventurePage;
