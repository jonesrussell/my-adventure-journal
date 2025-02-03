import { MongoClient } from 'mongodb';
import { User } from '@/types/User'; // Adjust the import path as necessary

const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/myjournal';
const client = new MongoClient(uri);
const dbName = 'myjournal';
const collectionName = 'users';

async function connect() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

export async function createUser(user: User) {
  await connect();
  const db = client.db(dbName);
  const result = await db.collection(collectionName).insertOne(user);
  return result.ops[0];
}

export async function getUser(username: string) {
  await connect();
  const db = client.db(dbName);
  const user = await db.collection(collectionName).findOne({ username });
  return user;
}

// Add other user-related functions as needed 