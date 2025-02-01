'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createAdventure } from '@/lib/adventureDbService';
import { FC } from 'react';
import { JSX } from 'react';
import { NewAdventureFormValues } from '@/types/NewAdventureFormValues'; // Ensure this path is correct

const NewAdventurePage: FC = (): JSX.Element => {
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

  const { control, handleSubmit } = useForm<NewAdventureFormValues>({
    resolver: zodResolver(newAdventureSchema),
    defaultValues: {
      name: '',
      location: '',
      description: '',
    },
  });

  const onSubmit = async (data: NewAdventureFormValues): Promise<void> => {
    try {
      const newAdventure = await createAdventure(data);
      console.log('Adventure created successfully:', newAdventure);
    } catch (error) {
      console.error('Failed to create new adventure:', error);
    }
  };

  return (
    <Form control={control} handleSubmit={handleSubmit(onSubmit)}>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </Form>
  );
};

export default NewAdventurePage;
