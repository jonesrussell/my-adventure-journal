import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAdventures } from '@/lib/adventureDbService';
import { IAdventurePlain } from '@/models/Adventure'; // Use IAdventurePlain

const AdventuresList: React.FC = () => {
  const { data: adventures = [], isLoading, isError } = useQuery<IAdventurePlain[]>(['adventures'], fetchAdventures);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading adventures.</div>;
  }

  return (
    <div>
      {adventures.length > 0 ? (
        <ul>
          {adventures.map((adventure: IAdventurePlain) => (
            <li key={adventure._id}>{adventure.name}</li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <h2>No Adventures Found</h2>
          <p>It looks like you haven&apos;t created any adventures yet.</p>
          <button className="btn btn-primary" onClick={() => {/* Navigate to create adventure page */}}>
            Create Your First Adventure
          </button>
        </div>
      )}
    </div>
  );
};

export default AdventuresList; 