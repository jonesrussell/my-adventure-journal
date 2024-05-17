import React from 'react';
import { NavLink } from '@/components/NavLink';

export const NavBar = () => {
  return (
    <nav className="space-x-4">
      <NavLink href="/">Home</NavLink>
      <NavLink href="#">About</NavLink>
      <NavLink href="/adventures">Adventures</NavLink>
      <NavLink href="#">Contact</NavLink>
      <NavLink href="/login">Login</NavLink>
      <NavLink href="/signup">Signup</NavLink>
    </nav>
  );
};
