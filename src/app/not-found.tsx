import Link from 'next/link';
import { ReactNode } from 'react';

const NotFound = (): ReactNode => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Not Found</h1>
        <p className="text-lg mb-4">Could not find requested resource.</p>
        <Link href="/" className="text-blue-500 hover:underline">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFound; 