// src/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserFromDb } from '@/utils/db';
import { IUser } from '@/models/User';

interface User {
  id: string;
  name: string;
  email: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const user = await getUserFromDb(credentials.username, credentials.password);
        if (user) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } else {
          return null;
        }
      }
    }),
  ],
});
