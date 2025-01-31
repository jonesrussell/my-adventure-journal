import mongoose, { Document, Model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUser {
  id: ObjectId;
  username: string;
  name: string;
  email: string;
  hashedPassword: string;
  password?: string;
}

const UserSchema = new mongoose.Schema({
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
  hashedPassword: String,
  password: {
    type: String,
  },
});

let UserModel: Model<IUser>;

if (mongoose.models?.User) {
  UserModel = mongoose.model('User') as Model<IUser>;
} else {
  UserModel = mongoose.model<IUser>('User', UserSchema);
}

export { UserModel };
