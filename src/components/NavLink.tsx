import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => (
  <a href={href} className="text-gray-800 hover:text-blue-500">
    {children}
  </a>
);
