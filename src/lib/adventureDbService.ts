import { PrismaClient } from '@prisma/client';
import { IAdventurePlain } from '@/models/Adventure';

const prisma = new PrismaClient();

export const fetchAdventures = async (): Promise<IAdventurePlain[]> => {
  const adventures = await prisma.adventure.findMany();
  return adventures.map(adventure => ({
    _id: adventure.id,
    name: adventure.name,
    location: adventure.location,
    description: adventure.description,
  }));
};

export const createAdventure = async (adventureData: IAdventurePlain): Promise<IAdventurePlain> => {
  return await prisma.adventure.create({
    data: adventureData,
  });
};
