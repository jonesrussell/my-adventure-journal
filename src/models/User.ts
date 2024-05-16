import mongoose from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
