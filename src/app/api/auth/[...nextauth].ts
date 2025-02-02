import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/nodemailer';
import { PrismaClient } from '@prisma/client';
import { IUser } from '@/models/User'; // Ensure this path is correct

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define types for JWT and Session
interface JWT {
  id: string;
  name?: string | null; // Allow null to match expected types
  email?: string | null; // Allow null to match expected types
}

interface Session {
  user: {
    id: string;
    name?: string | null; // Allow null to match expected types
    email?: string | null; // Allow null to match expected types
  };
  expires: string; // Add expires property
}

// Function to configure providers
const configureProviders = () => {
  return [
    EmailProvider({
      server: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      from: process.env.EMAIL_FROM, // The email address to send from
      // The EmailProvider handles sending the email automatically
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ];
};

// NextAuth configuration
export const { handlers, auth } = NextAuth({
  providers: configureProviders(),
  callbacks: {
    async jwt({ token, user, account, profile }: { token: JWT; user?: IUser; account?: any; profile?: any }): Promise<JWT> {
      if (user) {
        token.id = user.id; // Ensure user.id is present
        token.name = user.name || null; // Ensure name can be null
        token.email = user.email || null; // Ensure email can be null
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name || null; // Ensure name can be null
        session.user.email = token.email || null; // Ensure email can be null
      }
      session.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Set expiration date
      return session;
    },
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
});

export default auth; 