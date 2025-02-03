import { FC } from 'react';

const Custom404: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="text-blue-500 hover:underline">Go back to Home</a>
      </div>
    </div>
  );
};

export default Custom404; 