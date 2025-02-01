'use client';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { FC } from 'react';
import { JSX } from 'react';

const Auth: FC = (): JSX.Element => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication
          </h2>
        </div>
        <div>
          <SignInForm onSubmit={() => {}} />
          <SignUpForm onSubmit={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
