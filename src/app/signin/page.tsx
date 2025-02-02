// src/app/signin/page.tsx
'use client';

import { FC, JSX } from 'react';
import { useActionState } from 'react';
import { signinUser } from '@/actions/ActionsUser';

const initialState = {
  message: '',
};

const SignInPage: FC = (): JSX.Element => {
  const [state, formAction, pending] = useActionState(
    async (state: { message: string }, formData: FormData) => {
      return await signinUser(formData); // Call signinUser with FormData
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" required autoComplete="current-password" />
        </div>
        <div className="flex items-center justify-between">
          <button disabled={pending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
