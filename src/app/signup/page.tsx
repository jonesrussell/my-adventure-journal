// src/app/signup/page.tsx
'use client';

import { FC, JSX } from 'react';
import { useActionState } from 'react';
import { createUser } from '@/actions';

const initialState = {
  message: '',
};

const SignUpPage: FC = (): JSX.Element => {
  // Initialize state for action
  const [state, formAction, pending] = useActionState(
    async (state: { message: string | { [key: string]: string[] } }, formData: FormData) => {
      return await createUser(formData); // Call createUser with FormData
    },
    initialState
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form action={formAction} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {state.message && (
          <p className="text-red-600 mt-2 text-sm p-2 bg-red-100 rounded">
            {typeof state.message === 'string' ? state.message : 'An error occurred.'}
          </p>
        )}

        <div className="mb-4 mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" required autoComplete="new-password" />
        </div>
        <div className="flex items-center justify-between">
          <button disabled={pending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
