'use client';

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createAdventure } from '@/lib/adventureDbService';
import { FC } from 'react';
import { NewAdventureFormValues } from '@/types/NewAdventureFormValues'; // Ensure this path is correct

const NewAdventurePage: FC = () => {
  const newAdventureSchema = z.object({
    name: z.string().min(8, { message: 'Adventure name must be at least 8 characters.' }),
    location: z.string().min(2, { message: 'Adventure location must be at least 2 characters.' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
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
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <Input {...formMethods.register('name')} placeholder="Type a name" />
        {formMethods.formState.errors.name && (
          <p className="text-red-600">{formMethods.formState.errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <Input {...formMethods.register('location')} placeholder="Type a location" />
        {formMethods.formState.errors.location && (
          <p className="text-red-600">{formMethods.formState.errors.location.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Input {...formMethods.register('description')} placeholder="Describe your adventure" />
        {formMethods.formState.errors.description && (
          <p className="text-red-600">{formMethods.formState.errors.description.message}</p>
        )}
      </div>
      <Button type="submit">Add New</Button>
    </form>
  );
};

export default NewAdventurePage;
