// src/app/page.tsx
import React from 'react';
import AdventuresList from './adventures/_components/AdventureList';
import Hero from '@/components/ui/Hero';
import About from '@/components/ui/About';
import { IAdventurePlain } from '@/models/Adventure';
import { fetchAdventures } from '@/lib/adventureDbService';

const Home = async () => {
  const adventures: IAdventurePlain[] = await fetchAdventures();

  return (
    <>
      <Hero />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Adventures</h2>
          <AdventuresList adventures={adventures} />
        </section>

        <About />
      </main>
    </>
  );
};

export default Home;
