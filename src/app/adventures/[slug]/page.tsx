// src/app/adventures/[slug]/page.tsx
'use client';

import { FC, useEffect, useState } from 'react';
import { JSX } from 'react';
import { Metadata } from 'next'; // Import Metadata if needed
import { fetchAdventureById } from '@/lib/adventureDbService';
import { IAdventurePlain } from '@/models/Adventure';
import { disassembleSlug } from '@/utils/slug';

const AdventurePage: FC<{ params: { slug: string } }> = ({ params }): JSX.Element => {
  const [fetchedAdventure, setFetchedAdventure] = useState<IAdventurePlain | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const result = disassembleSlug(params.slug);

    if (!result || !result._id) {
      setError('Invalid adventure slug');
      return;
    }

    const fetchAdventure = async (): Promise<void> => {
      try {
        const adventure = await fetchAdventureById(result._id);
        if (!adventure) {
          setError('Adventure not found');
        } else {
          setFetchedAdventure(adventure);
        }
      } catch (err) {
        console.error(err);
        setError('Error loading adventure');
      }
    };

    fetchAdventure();
  }, [params.slug]);

  if (error) {
    return <div>{error}</div>; // Handle error display
  }

  if (!fetchedAdventure) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <h1>{fetchedAdventure.name}</h1>
      <p>{fetchedAdventure.description}</p>
      {/* Render other adventure details as needed */}
    </div>
  );
};

// Optionally, you can define metadata for the page
export const metadata: Metadata = {
  title: 'Adventure Details',
  description: 'Details about the selected adventure.',
};

export default AdventurePage;
