import './globals.css';
import { cn } from '@/utils/utils';
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import { Inter as FontSans } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import { SessionProvider } from 'next-auth/react';
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
          'min-h-screen flex flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <SessionProvider>
          <Header />
          <QueryProvider>
            <div className="flex-grow bg-gray-100">
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </QueryProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
