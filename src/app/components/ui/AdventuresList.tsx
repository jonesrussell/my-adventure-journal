import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAdventures } from '@/api/adventures';
import { Adventure } from '@/models/Adventure'; // Import the Adventure type

const AdventuresList: React.FC = () => {
  const { data: adventures = [], isLoading, isError } = useQuery<Adventure[]>('adventures', fetchAdventures); // Specify the type here

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading adventures.</div>;
  }

  return (
    <div>
      {adventures.length > 0 ? ( // adventures is now an array
        <ul>
          {adventures.map((adventure: Adventure) => ( // Specify the type for adventure
            <li key={adventure.id}>{adventure.title}</li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <h2>No Adventures Found</h2>
          <p>It looks like you haven&apos;t created any adventures yet.</p> {/* Escape the single quote */}
          <button className="btn btn-primary" onClick={() => {/* Navigate to create adventure page */}}>
            Create Your First Adventure
          </button>
        </div>
      )}
    </div>
  );
};

export default AdventuresList; 