import { NavBar } from '@/components/ui/NavBar';
import Link from 'next/link';
import { ReactNode } from 'react';

export const Header = (): ReactNode => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800">Adventure Journal</h1>
        </Link>
        <NavBar />
      </div>
    </header>
  );
};
