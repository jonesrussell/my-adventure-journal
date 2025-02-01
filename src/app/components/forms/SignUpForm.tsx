import React from 'react';

interface SignUpFormProps {
  onSubmit: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Add your input fields for username, email, password, and name here */}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm; 