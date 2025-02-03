import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SignInFormProps {
  onSubmit: (data: { username: string; password: string }) => void;
}

const SignInForm: FC<SignInFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<{ username: string; password: string }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <Input {...register('username')} placeholder="Enter your username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input type="password" {...register('password')} placeholder="Enter your password" />
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default SignInForm; 