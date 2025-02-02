// src/app/signup/page.tsx
'use client';

import { FC, JSX } from 'react';
import SignupForm from '@/ui/SignupForm';

const SignUpPage: FC = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
