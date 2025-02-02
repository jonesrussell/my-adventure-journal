// src/actions/ActionsUser.ts
'use server';

import { createUser, getUser } from '@/lib/userDbService'; // Ensure this path is correct
import { SignInSchema, SignupSchema } from '@/utils/zod'; // Updated path to zod
import { hashPassword, comparePasswords } from '@/utils/passwordUtils'; // Ensure this path is correct
import { ZodSchema } from 'zod'; // Import ZodSchema

// Define an interface for the sign-in form data
interface SignInFormData {
  username: string;
  password: string;
}

// Define an interface for the sign-up form data
interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

// Utility function to validate form data
function validateFormData<T>(schema: ZodSchema<T>, data: T): { success: boolean; message: string } {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { success: false, message: result.error.errors.map(e => e.message).join(', ') };
  }
  return { success: true, message: 'Validation successful' }; // Ensure message is always a string
}

// Utility function to check if passwords match
function checkPasswordsMatch(password: string, confirmPassword: string): { success: boolean; message: string } {
  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match' };
  }
  return { success: true, message: 'Passwords match' }; // Ensure message is always a string
}

/**
 * Sign up a new user.
 * @param formData - The form data containing user information.
 * @returns A promise that resolves to an object indicating success and a message.
 */
export async function signupUser(formData: FormData): Promise<{ success: boolean; message: string }> {
  const rawFormData: SignupFormData = {
    username: String(formData.get('username')),
    email: String(formData.get('email')),
    password: String(formData.get('password')),
    confirmPassword: String(formData.get('confirmPassword')),
    name: String(formData.get('name')),
  };

  // Validate signup data
  const validationResult = validateFormData(SignupSchema, rawFormData);
  if (!validationResult.success) {
    return { success: false, message: validationResult.message }; // Ensure message is a string
  }

  // Check if passwords match
  const passwordMatchResult = checkPasswordsMatch(rawFormData.password, rawFormData.confirmPassword);
  if (!passwordMatchResult.success) {
    return passwordMatchResult; // Return password mismatch error
  }

  // Hash the password before saving
  const hashedPassword = await hashPassword(rawFormData.password);

  const newUser = {
    username: rawFormData.username,
    email: rawFormData.email,
    password: hashedPassword, // Use hashed password
    name: rawFormData.name,
  };

  await createUser(newUser);

  return { success: true, message: 'User created successfully!' };
}

/**
 * Sign in an existing user.
 * @param formData - The form data containing user credentials.
 * @returns A promise that resolves to an object with a message indicating success or failure.
 */
export async function signinUser(formData: FormData): Promise<{ message: string }> {
  const rawFormData: SignInFormData = {
    username: String(formData.get('username')),
    password: String(formData.get('password')),
  };

  // Validate signin data
  const validationResult = validateFormData(SignInSchema, rawFormData);
  if (!validationResult.success) {
    return { message: validationResult.message }; // Ensure message is a string
  }

  const user = await getUser(rawFormData.username); // Get user from database
  if (!user || !(await comparePasswords(rawFormData.password, user.hashedPassword))) {
    // If user doesn't exist or password doesn't match, return an error
    return { message: 'Invalid username or password' };
  }

  // If everything is okay, return a success message
  return { message: 'Login successful!' };
}
