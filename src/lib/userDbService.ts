// src/lib/userDbService.ts
import { PrismaClient } from '@prisma/client';
import { IUser } from '@/models/User';
import argon2 from 'argon2';

const prisma = new PrismaClient();

export const createUser = async ({ username, email, password, name }: { username: string; email: string; password: string; name: string; }): Promise<IUser> => {
  try {
    // Hash the password before storing it
    if (!password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await argon2.hash(password); // Hash the password

    const savedUser = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword, // Store the hashed password
        name, // Include the name
      },
    });

    return {
      id: savedUser.id, // Assuming id is a string
      username: savedUser.username,
      email: savedUser.email,
      name: savedUser.name,
      hashedPassword: savedUser.hashedPassword,
    } as IUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const users = await prisma.user.findMany();
    return users.map(doc => ({
      id: doc.id,
      username: doc.username,
      email: doc.email,
      name: doc.name,
      hashedPassword: doc.hashedPassword,
    })) as IUser[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export async function fetchUserById(_id: string): Promise<IUser | null> {
  try {
    const userDocument = await prisma.user.findUnique({
      where: { id: _id },
    });

    if (!userDocument) {
      return null;
    }

    return {
      id: userDocument.id,
      username: userDocument.username,
      email: userDocument.email,
      name: userDocument.name,
      hashedPassword: userDocument.hashedPassword,
    } as IUser;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
}

export async function getUser(username: string): Promise<IUser | null> {
  try {
    const userDocument = await prisma.user.findUnique({
      where: { username },
    });

    if (!userDocument) {
      return null;
    }

    return {
      id: userDocument.id,
      username: userDocument.username,
      email: userDocument.email,
      name: userDocument.name,
      hashedPassword: userDocument.hashedPassword,
      password: null, // Set password to null or omit it if not needed
    } as IUser;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
}
