import React, { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { lightTheme } from '@/lib/mui/light-theme';

/**
 * Creates a fresh QueryClient for testing
 * Disables retries and caching for predictable test behavior
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  queryClient?: QueryClient;
  route?: string;
}

/**
 * Custom render function with all providers
 * Use this instead of @testing-library/react render
 *
 * @param ui - The component to render
 * @param options.initialEntries - Initial URL entries for MemoryRouter
 * @param options.route - Route pattern (e.g., '/contact/:id') for useParams support
 * @param options.queryClient - Custom QueryClient instance
 */
export function renderWithProviders(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { initialEntries = ['/'], queryClient, route, ...renderOptions } = options;
  const client = queryClient ?? createTestQueryClient();

  const user = userEvent.setup();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={initialEntries}>
          <ThemeProvider theme={lightTheme}>
            {route ? (
              <Routes>
                <Route path={route} element={children} />
              </Routes>
            ) : (
              children
            )}
          </ThemeProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  }

  return {
    user,
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}

/**
 * Wait for async operations to settle
 */
export async function waitForLoadingToFinish() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { userEvent };
