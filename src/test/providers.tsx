import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

import { lightTheme } from '@/lib/mui/light-theme';
import { createQueryClient } from '@/lib/react-query/query-client';

import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    children?: ReactNode;
  }
) {
  const queryClient = createQueryClient();
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
