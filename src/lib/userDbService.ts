// src/lib/userDatabaseService.ts
import connectToDatabase from '../utils/db';
import User, { IUser } from '../models/User';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const UserModel = User;

export const createUser = async (newUser: Omit<IUser, '_id'>): Promise<IUser> => {
  try {
    await connectToDatabase();

    // Hash the password before storing it
    if (!newUser.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const newUserDoc = new User({ ...newUser, password: hashedPassword });

    const savedUser = await newUserDoc.save();

    return {
      _id: savedUser._id.toString(),
      username: savedUser.username,
      email: savedUser.email,
    } as Omit<IUser, 'password'>;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    await connectToDatabase();

    const users = await UserModel.find({}).exec();

    return users.map(doc => ({
      _id: doc._id as string,
      username: doc.username,
      email: doc.email,
      password: doc.password,
    })) as IUser[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export async function fetchUserById(_id: string): Promise<IUser | null> {
  try {
    await connectToDatabase();

    const objectId = new ObjectId(_id);

    const userDocument = await UserModel.findById(objectId).exec();

    if (!userDocument) {
      return null;
    }

    const user = userDocument.toObject();

    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
    } as IUser;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
}

export async function getUser(username: string): Promise<IUser | null> {
  try {
    await connectToDatabase();

    const userDocument = await UserModel.findOne({ username }).exec();

    if (!userDocument) {
      return null;
    }

    const user = userDocument.toObject();

    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
    } as IUser;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
}
