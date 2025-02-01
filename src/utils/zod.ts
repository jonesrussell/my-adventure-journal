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

// Define a schema for additional validation
const schema = z.object({
  name: z.string(),
  age: z.number(),
});

// Add explicit return type
const validateData = (data: unknown): { success: boolean; errors?: string[] } => {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.errors.map(e => e.message) };
  }
  return { success: true };
};

export { validateData }; 