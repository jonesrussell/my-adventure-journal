import { z } from 'zod';

// Define the signup form schema using Zod
export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    })
    .trim(),
  confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters long.' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'], // Path to the field that should show the error
});

// Define the sign-in form schema using Zod
export const SignInFormSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters long.' }).trim(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }).trim(),
});

// Define the FormState type for error handling
export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined; 