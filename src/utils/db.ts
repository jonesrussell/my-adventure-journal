// src/utils/db.ts
import mongoose, { Document } from 'mongoose';
import { UserModel, IUser } from '@/models/User';

const cached = (global as ExtendedGlobal).mongoose || { conn: null, promise: null };

// interface UserModel extends Model<IUser> { }

/**
 * Fetches a user from the database based on their email and hashed password.
 * @param {string} email - The user's email address.
 * @param {string} hashedPassword - The hashed password to match against.
 * @returns {Promise<IUser | null>} A user object if found, otherwise null.
 */
export async function getUserFromDb(email: string, hashedPassword: string): Promise<Document<IUser> | null> {
  try {
    // Connect to the database if not already connected
    await connectToDatabase();

    // Find the user by email
    const user = await UserModel.findOne({ email }).exec();

    // Check if the user was found and if the hashed password matches
    if (user && (user as IUser).hashedPassword === hashedPassword) {
      return user as Document<IUser>;
    }

    return null;
  } catch (error) {
    console.error('Error fetching user from DB:', error);
    return null;
  }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    cached.promise = mongoose.connect(uri, options).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
