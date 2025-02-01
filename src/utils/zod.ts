import { z } from 'zod';

export const SignInSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  email: z.string().email('Invalid email format'),
}); 