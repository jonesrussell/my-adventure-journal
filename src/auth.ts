// src/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error('No credentials provided');
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (user && (await bcrypt.compare(credentials.password, user.hashedPassword))) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          return null;
        }
      }
    }),
  ],
};

export default NextAuth(authOptions);
