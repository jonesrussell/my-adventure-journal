import Link from 'next/link';
import { FC } from 'react';

interface NavBarProps {
  isLoggedIn: boolean; // Prop to determine if the user is logged in
}

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/adventures', label: 'Adventures' },
];

export const NavBar: FC<NavBarProps> = ({ isLoggedIn }) => {
  return (
    <nav className="space-x-4">
      {navItems.map((item) => (
        <Link key={item.label} href={item.href} className="text-gray-800 hover:text-blue-500">
          {item.label}
        </Link>
      ))}
      {isLoggedIn ? (
        <Link href="/logout" className="text-gray-800 hover:text-blue-500">Logout</Link>
      ) : (
        <>
          <Link href="/signin" className="text-gray-800 hover:text-blue-500">Login</Link>
          <Link href="/signup" className="text-gray-800 hover:text-blue-500">Signup</Link>
        </>
      )}
    </nav>
  );
};
