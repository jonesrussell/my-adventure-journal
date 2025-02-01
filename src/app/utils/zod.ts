// src/lib/zod.ts
import { z, object, string } from 'zod';

export const SignInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const SignupSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'),

  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),

  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),

  confirmPassword: string({ required_error: 'Confirm Password is required' })
    .min(1, 'Confirm Password is required')
    .min(8, 'Confirm Password must be more than 8 characters')
    .max(32, 'Confirm Password must be less than 32 characters'),
});
