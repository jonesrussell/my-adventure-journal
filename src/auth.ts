import { MongoClient, WithId, Document } from 'mongodb';
import { User } from '@/types/User'; // Ensure this path is correct
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'; // Import for username/password
import EmailProvider from 'next-auth/providers/email'; // Import for email authentication
import GitHubProvider from 'next-auth/providers/github'; // Import for GitHub authentication
import GoogleProvider from 'next-auth/providers/google'; // Import for Google authentication
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb'; // Ensure this points to your MongoDB client

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

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      // Your credential provider configuration
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM, // Email address to send from
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Other NextAuth options
};

// Export handlers for NextAuth
export const { auth, handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers; // Ensure GET and POST are exported
