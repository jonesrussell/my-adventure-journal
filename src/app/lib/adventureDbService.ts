// src/lib/adventureDbService.ts
import { PrismaClient } from '@prisma/client';
import { IAdventurePlain } from '@/models/Adventure';

const prisma = new PrismaClient();

export const createAdventure = async (adventureData: IAdventurePlain) => {
  return await prisma.adventure.create({
    data: adventureData,
  });
};

export const fetchAdventures = async () => {
  return await prisma.adventure.findMany();
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