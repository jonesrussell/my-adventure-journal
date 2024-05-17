// src/lib/adventureDbService.ts
import connectToDatabase from '../utils/db';
import Adventure, { IAdventurePlain } from '../models/Adventure';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const AdventureModel = Adventure;

export const createAdventure = async (newAdventure: Omit<IAdventurePlain, '_id'>): Promise<IAdventurePlain> => {
  try {
    await connectToDatabase();

    // Basic validation can be performed here if needed
    // For example, checking if the description length meets a minimum requirement

    const newAdventureDoc = new Adventure({
      ...newAdventure,
      _id: uuidv4(), // Generate a unique ID for the new adventure
    });

    const savedAdventure = await newAdventureDoc.save();

    return {
      _id: savedAdventure._id.toString(),
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
    await connectToDatabase();

    const adventures = await AdventureModel.find({}).exec();

    return adventures.map(doc => ({
      _id: doc._id as string,
      name: doc.name,
      location: doc.location,
      description: doc.description,
    })) as IAdventurePlain[];
  } catch (error) {
    console.error('Error fetching adventures:', error);
    throw error;
  }
};

// In adventureDbService.ts or similar
export async function fetchAdventureById(_id: string): Promise<IAdventurePlain | null> {
  try {
    await connectToDatabase();

    const objectId = new ObjectId(_id);

    const adventureDocument = await AdventureModel.findById(objectId).exec();

    if (!adventureDocument) {
      return null;
    }

    const adventure = adventureDocument.toObject();

    return {
      _id: adventure._id.toString(),
      name: adventure.name,
      location: adventure.location,
      description: adventure.description,
    } as IAdventurePlain;
  } catch (error) {
    console.error('Error fetching adventure by id:', error);
    throw error;
  }
}