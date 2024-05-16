// src/lib/zodSchemas.ts
import { z } from 'zod';

export const SignupSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'),

  email: z.string()
    .email('Please enter a valid email address')
    .refine(value => value.includes('@'), {
      message: 'Email must include \'@\'',
      path: ['email']
    }),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least one letter and one number'),

  confirmPassword: z.string()
    .min(8, 'Confirm Password must be at least 8 characters')
    .max(50, 'Confirm Password cannot exceed 50 characters')
});

export const LoginSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least one letter and one number'),
});
