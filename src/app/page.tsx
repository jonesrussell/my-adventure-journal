// src/app/page.tsx

import { ReactNode } from 'react';
import AdventuresList from './adventures/_components/AdventureList';
import Hero from '@/components/ui/Hero';
import About from '@/components/ui/About';
import { IAdventurePlain } from '@/models/Adventure';
import { fetchAdventures } from '@/lib/adventureDbService';
import { auth } from '@/auth';

const Home = async (): Promise<ReactNode> => {
  const session = await auth();
  const adventures: IAdventurePlain[] = await fetchAdventures();

  console.log(adventures);

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

        <p>
          This is a simple paragraph that introduces users to the adventure journal application. 
          Here, you can document your adventures, share experiences, and keep track of your journeys.
        </p>

        <p>Welcome {session?.user?.name || 'Guest'}!</p>
      </main>
    </>
  );
};

export default Home;
