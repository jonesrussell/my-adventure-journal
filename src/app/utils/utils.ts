import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const someUtilityFunction = (param: string): string => {
  // Your existing logic...
  return param.toUpperCase(); // Example return statement
};
