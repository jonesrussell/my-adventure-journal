// src/actions/ActionsUser.ts
'use server';

import { createUser, getUser } from '@/lib/userDbService'; // Make sure to define getUser in userDbService
import { SignInSchema, SignupSchema } from '@/lib/zod'; // Define LoginSchema in zodSchemas

export async function signupUser(formData: FormData) {
  const rawFormData = {
    username: String(formData.get('username')),
    email: String(formData.get('email')),
    password: String(formData.get('password')),
    confirmPassword: String(formData.get('confirmPassword')),
    name: String(formData.get('name')),
  };

  const result = SignupSchema.safeParse(rawFormData);
  if (!result.success) {
    // Return validation errors as a user-friendly message
    return { success: false, message: result.error.errors.map(e => e.message).join(', ') };
  }

  // After successful validation, manually check if passwords match
  if (rawFormData.password !== rawFormData.confirmPassword) {
    // Return a user-friendly message
    return { success: false, message: 'Passwords do not match' };
  }

  const newUser = {
    username: rawFormData.username,
    email: rawFormData.email,
    password: rawFormData.password,
    name: rawFormData.name,
  };

  await createUser(newUser);

  return { success: true, message: 'User created successfully!' };
}

export async function signinUser(formData: FormData) {
  const rawFormData = {
    username: String(formData.get('username')),
    password: String(formData.get('password')),
  };

  const result = SignInSchema.safeParse(rawFormData); // Validate signin data
  if (!result.success) {
    // Return validation errors as a user-friendly message
    return { success: false, message: result.error.errors.map(e => e.message).join(', ') };
  }

  const user = await getUser(rawFormData.username); // Get user from database
  if (!user || user.hashedPassword !== rawFormData.password) {
    // If user doesn't exist or password doesn't match, return an error
    return { success: false, message: 'Invalid username or password' };
  }

  // If everything is okay, return a success message
  return { success: true, message: 'Login successful!' };
}
