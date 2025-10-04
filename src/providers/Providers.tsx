// src/providers/Providers.tsx
'use client';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../services/queryClient';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';

const queryClient = createQueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
