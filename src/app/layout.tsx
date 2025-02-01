import './globals.css';
import { cn } from '@/utils/utils';
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import { Inter as FontSans } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import { FC } from 'react';
import { JSX } from 'react';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Adventure Journal',
  description: 'Adventure Journal',
};

const Layout: FC = (): JSX.Element => {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <QueryProvider>
          <div className="min-h-screen bg-gray-100 grid grid-rows-[auto,1fr,auto]">
            <Header />
            {/* Your existing code... */}
          </div>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
