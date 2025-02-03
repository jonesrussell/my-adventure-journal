import Link from 'next/link';
import { ReactNode } from 'react';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/adventures', label: 'Adventures' },
  { href: '/signin', label: 'Login' },
  { href: '/signup', label: 'Signup' },
];

export const NavBar = (): ReactNode => {
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
