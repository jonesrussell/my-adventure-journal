import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import argon2 from 'argon2'; // Import argon2 for password hashing

dotenv.config();

const prisma = new PrismaClient();

async function main() {
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