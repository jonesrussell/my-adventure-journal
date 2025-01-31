// src/lib/adventureDbService.ts
import { PrismaClient } from '@prisma/client';
import { IAdventurePlain } from '../models/Adventure';
import { v4 as uuidv4 } from 'uuid';

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
    const adventures = await prisma.adventure.findMany();
    return adventures.map(doc => ({
      _id: doc.id,
      name: doc.name,
      location: doc.location,
      description: doc.description,
    })) as IAdventurePlain[];
  } catch (error) {
    console.error('Error fetching adventures:', error);
    throw error;
  }
};

export async function fetchAdventureById(_id: string): Promise<IAdventurePlain | null> {
  try {
    const adventureDocument = await prisma.adventure.findUnique({
      where: { id: _id },
    });

    if (!adventureDocument) {
      return null;
    }

    return {
      _id: adventureDocument.id,
      name: adventureDocument.name,
      location: adventureDocument.location,
      description: adventureDocument.description,
    } as IAdventurePlain;
  } catch (error) {
    console.error('Error fetching adventure by id:', error);
    throw error;
  }
}