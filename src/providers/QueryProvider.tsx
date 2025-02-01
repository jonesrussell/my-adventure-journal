'use client';

import { FC, ReactNode } from 'react';
import { JSX } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// Define the props interface
interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const QueryProvider: FC<QueryProviderProps> = ({ children }): JSX.Element => {
  const [client] = useState(() => queryClient); // Use the existing queryClient
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
