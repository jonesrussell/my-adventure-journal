import { FC } from 'react';
import { JSX } from 'react';

export const Footer: FC = (): JSX.Element => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        Adventure Journal &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
};
