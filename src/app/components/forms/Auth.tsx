'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { createUser } from '@/lib/userDbService';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error('Sign in error:', result.error);
      setError(result.error);
    } else {
      // Handle successful sign-in (e.g., redirect or show a success message)
    }
  };

  const handleSignUp = async () => {
    try {
      const newUser = {
        username: email.split('@')[0],
        email,
        password,
        name,
      };
      await createUser(newUser);
      // Handle successful sign-up (e.g., redirect or show a success message)
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleSignOut = async () => {
    // Implement sign-out logic if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication
          </h2>
          {error && <p className="mt-2 text-center text-red-600">{error}</p>}
        </div>
        <div>
          <SignInForm onSubmit={handleSignIn} />
          <SignUpForm onSubmit={handleSignUp} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
