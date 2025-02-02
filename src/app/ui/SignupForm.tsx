'use client';

import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignupFormValues } from '@/types/SignupFormValues';
import { signup } from '@/actions/auth';

const SignupForm: FC = () => {
  const { register, handleSubmit } = useForm<SignupFormValues>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted state after the component mounts
  }, []);

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);

      const response = await signup(formData);
      console.log('Signup successful:', response);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  if (!isMounted) return null; // Prevent rendering until mounted

  return (
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
  );
};

export default SignupForm; 