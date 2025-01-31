// src/utils/db.ts
import { PrismaClient } from '@prisma/client';
import { IUser } from '@/models/User';

const prisma = new PrismaClient();

/**
 * Fetches a user from the database based on their email and hashed password.
 * @param {string} email - The user's email address.
 * @param {string} hashedPassword - The hashed password to match against.
 * @returns {Promise<IUser | null>} A user object if found, otherwise null.
 */
export async function getUserFromDb(email: string, hashedPassword: string): Promise<IUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && user.hashedPassword === hashedPassword) {
    return user;
  }
  return null;
}
