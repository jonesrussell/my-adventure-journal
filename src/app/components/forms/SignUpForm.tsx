import type { FC } from 'react';

interface SignUpFormProps {
  onSubmit: () => void;
}

const SignUpForm: FC<SignUpFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Add your input fields for username, email, password, and name here */}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm; 