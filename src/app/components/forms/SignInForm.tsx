import type { FC } from 'react';

interface SignInFormProps {
  onSubmit: () => void;
}

const SignInForm: FC<SignInFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Add your input fields for email and password here */}
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm; 