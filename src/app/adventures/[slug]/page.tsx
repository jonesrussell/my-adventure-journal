// src/app/pages/adventures/[slug]/page.tsx
// Remove 'use client' directive to make this a server component

import { fetchAdventureById } from '@/lib/adventureDbService';
import { IAdventurePlain } from '@/models/Adventure';
import { disassembleSlug } from '@/utils/slug';
import { Metadata } from 'next'; // Import Metadata if needed

// Define the component with params as a promise
export default async function AdventurePage({
  params,
}: {
  params: Promise<{ slug: string }>; // Define params as a promise
}) {
  const resolvedParams = await params; // Await the params to get the actual value
  const result = disassembleSlug(resolvedParams.slug);

  if (!result || !result._id) {
    return <div>Invalid adventure slug</div>; // Handle invalid slug
  }

  try {
    const fetchedAdventure: IAdventurePlain | null = await fetchAdventureById(result._id);
    
    // Check if fetchedAdventure is null
    if (!fetchedAdventure) {
      return <div>Adventure not found</div>; // Handle case where adventure is not found
    }

    return (
      <div>
        <h1>{fetchedAdventure.name}</h1>
        <p>{fetchedAdventure.description}</p>
        {/* Render other adventure details as needed */}
      </div>
    );
  } catch (err) {
    console.error(err);
    return <div>Error loading adventure</div>; // Handle fetch error
  }
};

// Optionally, you can define metadata for the page
export const metadata: Metadata = {
  title: 'Adventure Details',
  description: 'Details about the selected adventure.',
};
