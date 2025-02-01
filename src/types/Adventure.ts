export interface Adventure {
  id: string; // or _id, depending on your database schema
  name: string;
  location: string;
  description: string;
}

export interface AdventureData {
  name: string;
  location: string;
  description: string;
} 