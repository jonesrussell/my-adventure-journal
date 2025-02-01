// src/lib/adventureDbService.ts
import { PrismaClient } from '@prisma/client';
import { IAdventurePlain } from '../models/Adventure';

const prisma = new PrismaClient();

export const createAdventure = async (newAdventure: Omit<IAdventurePlain, '_id'>): Promise<IAdventurePlain> => {
  try {
    const savedAdventure = await prisma.adventure.create({
      data: {
        name: newAdventure.name,
        location: newAdventure.location,
        description: newAdventure.description,
      },
    });

    return {
      _id: savedAdventure.id, // Assuming id is a string
      name: savedAdventure.name,
      location: savedAdventure.location,
      description: savedAdventure.description,
    } as IAdventurePlain;
  } catch (error) {
    console.error('Error creating adventure:', error);
    throw error;
  }
};

export const fetchAdventures = async (): Promise<IAdventurePlain[]> => {
  try {
    // Use the full URL for the fetch call
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/adventures`; // Ensure NEXT_PUBLIC_API_URL is set in your .env file
    console.log('Fetching from URL:', url); // Log the URL for debugging

    const response = await fetch(url);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const errorText = await response.text(); // Get the response text for debugging
      throw new Error(`Error fetching adventures: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    // Check if data is null or not an object
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data received from the API');
    }

    return data as IAdventurePlain[];
  } catch (error) {
    console.error('Error fetching adventures:', error);
    throw error; // Rethrow the error for further handling
  }
};

export async function fetchAdventureById(_id: string): Promise<IAdventurePlain | null> {
  try {
    const adventureDocument = await prisma.adventure.findUnique({
      where: { id: _id },
    });

    if (!adventureDocument) {
      console.warn(`Adventure with id ${_id} not found`);
      return null; // Return null if the adventure is not found
    }

    return {
      _id: adventureDocument.id,
      name: adventureDocument.name,
      location: adventureDocument.location,
      description: adventureDocument.description,
    } as IAdventurePlain;
  } catch (error) {
    console.error('Error fetching adventure by id:', error);
    throw error; // Rethrow the error for further handling
  }
}

// Use uuidv4 somewhere in your code
// const newId = uuidv4();
// Use newId as needed...