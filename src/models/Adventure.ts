// Define the plain interface for Adventure
export interface IAdventurePlain {
  _id?: string; // Ensure this matches Prisma's 'id'
  name: string;
  location: string; // This will be used for creating adventures
  description: string;
  // Add other properties as needed
}

// Since you're using Prisma, you don't need a separate document interface
// You can directly use the Prisma model for type safety

export interface Adventure {
  id: string;
  title: string;
  // Add other properties as needed
}