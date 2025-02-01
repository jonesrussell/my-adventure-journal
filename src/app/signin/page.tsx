// src/app/signin/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { signinUser } from '@/actions/ActionsUser'; // Make sure to define signinUser in ActionsUser.ts

export default function Page() {
  // Initialize state for errors and success
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const result = await signinUser(formData); // Use signinUser instead of signupUser
      if (result.success) {
        setIsSuccessful(true);
      } else {
        setErrorMessage(result.message || 'An unknown error occurred.');
      }
    } catch (error: unknown) {
      const errorMessage =
        typeof error === 'object' && error !== null ? (error as Error).message : 'An unexpected error occurred.';
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {errorMessage && (
          <p className="text-red-600 mt-2 text-sm p-2 bg-red-100 rounded">
            {errorMessage}
          </p>
        )}
        {isSuccessful && (
          <p className="text-green-600 mt-2 text-sm p-2 bg-green-100 rounded">
            Login successful!
          </p>
        )}

        <div className="mb-4 mt-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
