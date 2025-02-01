// src/app/adventures/page.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAdventures } from '@/lib/adventureDbService';
import AdventureList from './_components/AdventureList';
import { IAdventurePlain } from '@/models/Adventure';

const AdventuresPage: React.FC = () => {
  const { data: adventures = [], isLoading, isError } = useQuery<IAdventurePlain[], Error>(
    ['adventures'],
    fetchAdventures
  );

  if (isLoading) {
    return <div>Loading adventures...</div>;
  }

  if (isError) {
    return <div>Error loading adventures.</div>;
  }

  return (
    <div>
      <h1>Adventures</h1>
      <AdventureList adventures={adventures} />
    </div>
  );
};

export default AdventuresPage;
