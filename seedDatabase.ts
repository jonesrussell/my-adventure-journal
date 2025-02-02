import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as argon2 from 'argon2'; // Use named import for argon2

// Load environment variables from .env file
dotenv.config();

// Initialize Prisma Client with the DATABASE_URL from the environment variables
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Use the DATABASE_URL from .env
    },
  },
});

async function main(): Promise<void> {
  // Example: Create a new adventure
  const adventure = await prisma.adventure.create({
    data: {
      name: 'Adventure Name',
      location: 'Adventure Location',
      description: 'Adventure Description',
    },
  });

  console.log('Created adventure:', adventure);

  // Hash the password before saving
  const hashedPassword = await argon2.hash('securePassword'); // Hash the password

  // Example: Create a new user
  const user = await prisma.user.create({
    data: {
      username: 'exampleUser',
      name: 'Example User',
      email: 'example@example.com',
      hashedPassword: hashedPassword, // Use hashedPassword instead of password
    },
  });

  console.log('Created user:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });