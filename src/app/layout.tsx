import './globals.css';
import { cn } from '@/utils/utils';
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import { Inter as FontSans } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import { FC } from 'react';
import { ReactNode } from 'react';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Global metadata for the layout
export const metadata: Metadata = {
  title: 'Adventure Journal',
  description: 'Adventure Journal - Document and share your adventures',
};

const Layout: FC<{ children: ReactNode }> = ({ children }): ReactNode => {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Header />
        <QueryProvider>
          <div className="min-h-screen bg-gray-100 grid grid-rows-[auto,1fr,auto]">
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
