// src/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { saltAndHashPassword } from '@/utils/password';
import { getUserFromDb } from '@/utils/db';
import { IUser } from '@/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials: Partial<Record<'username' | 'password', unknown>>) => {
        if (typeof credentials.username !== 'string' || typeof credentials.password !== 'string') {
          throw new Error('Invalid credentials.');
        }

        const pwHash = saltAndHashPassword(credentials.password);
        const userModel = await getUserFromDb(credentials.username, await pwHash);

        if (!userModel) {
          throw new Error('User not found.');
        }

        // Assuming userModel is already the document you want to work with
        const userObject: IUser = userModel.toObject();

        return userObject;
      },
    }),
  ],
});
