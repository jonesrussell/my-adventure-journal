import { MongoClient, WithId, Document } from 'mongodb';
import { User } from '@/types/User'; // Updated path if moved

const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/myjournal';
const client = new MongoClient(uri);
const dbName = 'myjournal';
const collectionName = 'users';

async function connect(): Promise<void> {
  try {
    await client.connect(); // Attempt to connect
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

// Function to map MongoDB document to User interface
function mapToUser(doc: WithId<Document>): User {
  return {
    id: doc._id.toString(), // Convert ObjectId to string
    username: doc.username,
    name: doc.name,
    email: doc.email,
    hashedPassword: doc.hashedPassword,
    password: doc.password || null,
  };
}

export async function findUserByEmail(email: string): Promise<User | null> {
  await connect();
  const db = client.db(dbName);
  const userDoc = await db.collection(collectionName).findOne({ email });

  if (userDoc) {
    return mapToUser(userDoc); // Map the document to User
  }

  return null; // Return null if no user found
}

// Add other authentication-related functions as needed
