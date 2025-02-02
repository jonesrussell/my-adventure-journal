// src/lib/adventureDbService.ts
import { PrismaClient } from '@prisma/client';
import { IAdventurePlain } from '@/models/Adventure';

const prisma = new PrismaClient();

// Fetch all adventures
export const fetchAdventures = async (): Promise<IAdventurePlain[]> => {
  const adventures = await prisma.adventure.findMany();
  return adventures.map(adventure => ({
    _id: adventure.id,
    name: adventure.name,
    location: adventure.location,
    description: adventure.description,
  }));
};

// Create a new adventure
export const createAdventure = async (adventureData: IAdventurePlain): Promise<IAdventurePlain> => {
  const newAdventure = await prisma.adventure.create({
    data: adventureData,
  });
  return newAdventure; // This should return the full adventure object, including _id
};

// Fetch an adventure by ID
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