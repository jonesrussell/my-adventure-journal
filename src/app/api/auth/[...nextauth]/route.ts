import NextAuth, { NextAuthConfig } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/nodemailer';
import { PrismaClient } from '@prisma/client';
import { comparePasswords } from '@/utils/passwordUtils'; // Ensure this path is correct

// Initialize Prisma Client
const prisma = new PrismaClient();

// NextAuth configuration
const authOptions: NextAuthConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ credentials }: { credentials?: Record<string, unknown> }) {
      if (!credentials) return false; // Handle undefined credentials

      const username = (credentials.username as string) || ''; // Assert as string
      const password = (credentials.password as string) || ''; // Assert as string

      // Check if username and password are defined
      if (!username || !password) return false; // Return false if either is missing

      const dbUser = await prisma.user.findUnique({
        where: { username },
      });

      if (!dbUser || !(await comparePasswords(password, dbUser.hashedPassword))) {
        return false; // Return false to indicate sign-in failure
      }

      return true; // Return true to indicate sign-in success
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      return token; // Return the modified token
    },
    async session({ session, token }) {
      if (token && typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export const { handlers, auth } = NextAuth(authOptions);
export default auth;
