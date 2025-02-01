import React from 'react';
import Link from 'next/link';

const navItems = [
  { href: '#', label: 'About' },
  { href: '/adventures', label: 'Adventures' },
  { href: '#', label: 'Contact' },
  { href: '/signin', label: 'Login' },
  { href: '/signup', label: 'Signup' },
];

export const NavBar = () => {
  return (
    <nav className="space-x-4">
      {navItems.map((item) => (
        <Link key={item.label} href={item.href} className="text-gray-800 hover:text-blue-500">
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
