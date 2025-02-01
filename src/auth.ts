// src/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Use bcryptjs
import { IUser } from '@/models/User';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error('No credentials provided');
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username as string },
        }) as IUser | null;

        if (user && typeof user.hashedPassword === 'string') {
          const isPasswordValid = await bcrypt.compare(credentials.password as string, user.hashedPassword);
          if (isPasswordValid) {
            return { id: user.id, name: user.name, email: user.email };
          }
        }
        return null; // Return null if user not found or password is invalid
      }
    }),
  ],
};

export default NextAuth(authOptions);
export { authOptions as auth };
