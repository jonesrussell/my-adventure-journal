import { MongoClient, ObjectId } from 'mongodb';
import { AdventureData } from '@/types/Adventure';

const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/myjournal';
const client = new MongoClient(uri);
const dbName = 'myjournal';
const collectionName = 'adventures';

async function connect() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

// Fetch all adventures
export const fetchAdventures = async (): Promise<AdventureData[]> => {
  await connect();
  const db = client.db(dbName);
  const adventures = await db.collection(collectionName).find().toArray();
  return adventures;
};

// Create a new adventure
export const createAdventure = async (adventureData: AdventureData): Promise<AdventureData> => {
  await connect();
  const db = client.db(dbName);
  const result = await db.collection(collectionName).insertOne(adventureData);
  return result.ops[0];
};

// Fetch an adventure by ID
export async function fetchAdventureById(_id: string): Promise<AdventureData | null> {
  await connect();
  const db = client.db(dbName);
  const adventure = await db.collection(collectionName).findOne({ _id: new ObjectId(_id) });
  return adventure;
}

// Add other CRUD operations as needed 