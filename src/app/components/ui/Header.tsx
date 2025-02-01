import React from 'react';
import { NavBar } from '@/components/NavBar';
import Link from 'next/link';

export const Header = () => {
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
