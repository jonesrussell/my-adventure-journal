// src/actions/auth.ts
'use server';

import { createUser, getUser } from '@/lib/userDbService'; // Ensure this path is correct
import { comparePasswords } from '@/utils/passwordUtils'; // Ensure this path is correct
import { ZodSchema } from 'zod'; // Import ZodSchema
import { SignupFormSchema, SignInFormSchema } from '@/lib/definitions'; // Remove if not used

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
export async function signup(formData: FormData): Promise<{ success: boolean; message: string; errors?: Record<string, string[]> }> {
  const errors: Record<string, string[]> = {}; // Initialize errors as an object with arrays

  const rawFormData: SignupFormData = {
    username: String(formData.get('username')),
    email: String(formData.get('email')),
    password: String(formData.get('password')),
    confirmPassword: String(formData.get('confirmPassword')),
  };

  // Use validateFormData to validate the signup form fields
  const validationResult = validateFormData(SignupFormSchema, rawFormData);
  if (!validationResult.success) {
    errors.validation = errors.validation || [];
    errors.validation.push(validationResult.message);
  }

  // Check if passwords match
  const passwordMatchResult = checkPasswordsMatch(rawFormData.password, rawFormData.confirmPassword);
  if (!passwordMatchResult.success) {
    errors.password = errors.password || [];
    errors.password.push(passwordMatchResult.message);
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: 'Validation failed', errors }; // Return errors as arrays
  }

  // Pass the plain password to createUser
  const newUser = {
    username: rawFormData.username,
    email: rawFormData.email,
    password: rawFormData.password, // Pass the plain password
    name: rawFormData.username, // Assuming name is required in your schema
  };

  await createUser(newUser); // Use createUser function from userDbService

  return { success: true, message: 'User created successfully!' };
}

/**
 * Sign in an existing user.
 * @param formData - The form data containing user credentials.
 * @returns A promise that resolves to an object with a message indicating success or failure.
 */
export async function signinUser(formData: FormData): Promise<{ message: string; errors?: Record<string, string> }> {
  const rawFormData: SignInFormData = {
    username: String(formData.get('username')),
    password: String(formData.get('password')),
  };

  // Use validateFormData to validate the signin data
  const validationResult = validateFormData(SignInFormSchema, rawFormData);
  if (!validationResult.success) {
    return {
      message: 'Validation failed',
      errors: validationResult.message.split(', ').reduce((acc, error) => {
        acc[error] = error; // Create an object with error messages
        return acc;
      }, {} as Record<string, string>),
    };
  }

  const user = await getUser(rawFormData.username); // Get user from database
  if (!user || !(await comparePasswords(rawFormData.password, user.hashedPassword))) {
    // If user doesn't exist or password doesn't match, return an error
    return { message: 'Invalid username or password' };
  }

  // If everything is okay, return a success message
  return { message: 'Login successful!' };
}
