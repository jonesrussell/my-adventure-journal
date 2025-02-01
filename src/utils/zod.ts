import { z } from 'zod';

const BaseUserSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

export const SignInSchema = BaseUserSchema.extend({
    username: z.string().min(1, 'Username is required'),
});

export const SignupSchema = BaseUserSchema.extend({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
}); 