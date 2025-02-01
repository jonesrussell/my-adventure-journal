// src/app/adventures/page.tsx
import React from 'react';
import { fetchAdventures } from '@/lib/adventureDbService';
import AdventureList from './_components/AdventureList';
import { IAdventurePlain } from '@/models/Adventure';

const AdventuresPage: React.FC = async () => {
  let adventures: IAdventurePlain[] = [];
  let errorMessage: string | null = null;

  try {
    adventures = await fetchAdventures();
  } catch (error) {
    console.error('Error fetching adventures:', error);
    errorMessage = 'Failed to load adventures.';
  }

  return (
    <div>
      <h1>Adventures</h1>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : adventures.length > 0 ? (
        <AdventureList adventures={adventures} />
      ) : (
        <p>No adventures found.</p>
      )}
    </div>
  );
};

export default AdventuresPage;
