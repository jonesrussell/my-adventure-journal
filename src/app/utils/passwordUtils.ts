import argon2 from 'argon2'; // Import argon2

// Hash a password using argon2
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password); // Hash the password
}

// Compare a password with a hashed password
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await argon2.verify(hashedPassword, password); // Verify the password
}
