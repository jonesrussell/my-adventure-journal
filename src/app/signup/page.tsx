// src/app/signup/page.tsx
'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignupFormValues } from '@/types/SignupFormValues';
import { signup } from '@/actions/auth';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const SignUpPage: FC = (): ReactNode => {
  const { register, handleSubmit } = useForm<SignupFormValues>();
  const [isMounted, setIsMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success messages
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    setIsMounted(true); // Set mounted state to true after the component mounts
  }, []);

  const onSubmit = async (data: SignupFormValues): Promise<void> => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);

    try {
      await signup(formData);
      setErrorMessage(null); // Clear any previous error messages
      setSuccessMessage('Signup successful! Redirecting...'); // Set success message
      setTimeout(() => {
        router.push('/'); // Redirect to a welcome page after 2 seconds
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Display the error message
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.'); // Fallback error message
      }
    }
  };

  if (!isMounted) return null; // Prevent rendering until mounted

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Display error message */}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>} {/* Display success message */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
            <Input {...register('username')} placeholder="Type a username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="username" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <Input {...register('email')} placeholder="Type your email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="email" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <Input {...register('password')} type="password" placeholder="Type your password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" autoComplete="new-password" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <Input {...register('confirmPassword')} type="password" placeholder="Confirm your password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" autoComplete="new-password" />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
