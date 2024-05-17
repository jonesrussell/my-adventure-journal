// src/app/pages/adventures/[slug]/page.tsx
'use server';

import { fetchAdventureById } from '@/lib/adventureDbService';
import { IAdventurePlain } from '@/models/Adventure';
import { disassembleSlug } from '@/utils/slug';

export default async function Page({ params }: { params: { slug: string } }) {
  const result = disassembleSlug(params.slug);

  if (!result || !result._id) {
    // Handle the case where disassembleSlug returns null or no _id
    return <div>Error loading adventure</div>; // Or any appropriate fallback UI
  }

  const { _id } = result;

  const adventure: IAdventurePlain | null = await fetchAdventureById(_id);

  if (!adventure) return <div>Loading...</div>;

  return (
    <div>
      <h1>{adventure.name}</h1>
      <p>{adventure.description}</p>
      {/* Render other adventure details as needed */}
    </div>
  );
}
