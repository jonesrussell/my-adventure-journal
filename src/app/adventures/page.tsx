// src/app/adventures/page.tsx
import React from 'react';
import { IAdventurePlain } from '@/models/Adventure';
import { fetchAdventures } from '@/lib/adventureDbService';
import AdventuresList from './_components/AdventureList';

const Page = async () => {
  const adventures: IAdventurePlain[] = await fetchAdventures();

  return (
    <>
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Adventures</h2>
          <AdventuresList adventures={adventures} />{' '}
          {/* Use AdventuresGrid for a grid layout */}
        </section>
      </main>
    </>
  );
};

export default Page;
