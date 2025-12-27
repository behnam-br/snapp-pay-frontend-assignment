import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

import { lightTheme } from '@/lib/mui/light-theme';

import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

type CreateTestQueryClientOptions = {
  retry?: boolean;
};

export function createTestQueryClient(options?: CreateTestQueryClientOptions) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: options?.retry ?? false,
      },
      mutations: {
        retry: options?.retry ?? false,
      },
    },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    queryClient?: QueryClient;
    children?: ReactNode;
  }
) {
  const queryClient = options?.queryClient ?? createTestQueryClient();
  const theme = createTheme(lightTheme);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return render(ui, { ...options, wrapper: Wrapper });
}
