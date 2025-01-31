// Interface for plain JavaScript object
export interface IAdventurePlain {
  _id?: string; // Optional, as it may not be present when creating a new adventure
  name: string;
  location: string;
  description: string;
}

// Interface for Mongoose document
export interface IAdventureDocument extends IAdventurePlain, Document {
  _id: string; // Ensure compatibility with Document by explicitly including _id
}

const AdventureSchema: Schema = new Schema<IAdventureDocument>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Adventure || mongoose.model<IAdventureDocument>('Adventure', AdventureSchema, 'adventures');