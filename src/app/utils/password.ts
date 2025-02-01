// utils/password.ts
import crypto from 'crypto';

/**
 * Salts and hashes a password.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} A hashed password string.
 */
export const saltAndHashPassword = async (password: string): Promise<string> => {
  try {
    // Generate a random salt
    const salt = crypto.randomBytes(16).toString('hex');

    // Hash the password with the salt
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Return the salt concatenated with the hash
    return `${salt}:${hash}`;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};