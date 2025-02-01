// Remove Mongoose imports
// import { Document } from 'mongoose';

// Define the plain interface for Adventure
export interface IAdventurePlain {
  _id?: string; // Make this optional, as it may not be present when creating a new adventure
  name: string;
  location: string; // This will be used for creating adventures
  description: string;
}

// Since you're using Prisma, you don't need a separate document interface
// You can directly use the Prisma model for type safety