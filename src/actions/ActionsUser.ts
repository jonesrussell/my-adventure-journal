// src/actions/ActionsUser.ts
'use server';

import { createUser, getUser } from '@/lib/userDbService'; // Ensure this path is correct
import { SignInSchema, SignupSchema } from '@/utils/zod'; // Updated path to zod
import { hashPassword, comparePasswords } from '@/utils/passwordUtils'; // Ensure this path is correct
import { ZodSchema } from 'zod'; // Import ZodSchema

// Define an interface for the form data
interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

// Define an interface for the sign-in form data
interface SignInFormData {
  username: string;
  password: string;
}

// Utility function to validate form data
function validateFormData<T>(schema: ZodSchema<T>, data: T) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { success: false, message: result.error.errors.map(e => e.message).join(', ') };
  }
  return { success: true };
}

// Utility function to check if passwords match
function checkPasswordsMatch(password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match' };
  }
  return { success: true };
}

export async function signupUser(formData: FormData) {
  const rawFormData = {
    username: String(formData.get('username')),
    email: String(formData.get('email')),
    password: String(formData.get('password')),
    confirmPassword: String(formData.get('confirmPassword')),
    name: String(formData.get('name')),
  };

  // Validate signup data
  const validationResult = validateFormData(SignupSchema, rawFormData);
  if (!validationResult.success) {
    return validationResult; // Return validation errors
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

export async function signinUser(formData: FormData) {
  const rawFormData: SignInFormData = {
    username: String(formData.get('username')),
    password: String(formData.get('password')),
  };

  // Validate signin data
  const validationResult = validateFormData(SignInSchema, rawFormData);
  if (!validationResult.success) {
    return validationResult; // Return validation errors
  }

  const user = await getUser(rawFormData.username); // Get user from database
  if (!user || !(await comparePasswords(rawFormData.password, user.hashedPassword))) {
    // If user doesn't exist or password doesn't match, return an error
    return { success: false, message: 'Invalid username or password' };
  }

  // If everything is okay, return a success message
  return { success: true, message: 'Login successful!' };
}
