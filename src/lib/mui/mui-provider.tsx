import { ReactNode, useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '@/lib/mui/light-theme';

interface MuiProviderProps {
  children: ReactNode;
}

/**
 * Application-level provider that configures Material UI (MUI) theming and baseline CSS.
 *
 * @param props - {@link MuiProviderProps}.
 * @returns A {@link ThemeProvider} that applies the app theme and renders {@link CssBaseline}.
 *
 * @remarks
 * - The theme is created once via `createTheme(lightTheme)` and memoized to avoid recreating
 *   the theme object on every render (which can cause unnecessary re-renders).
 * - {@link CssBaseline} applies a consistent CSS reset and sensible defaults across browsers.
 *
 * Typically rendered near the root of the app, wrapping components that use MUI.
 *
 * @example
 * ```tsx
 * export function App() {
 *   return (
 *     <MuiProvider>
 *       <QueryProvider>
 *         <RouterProvider router={router} />
 *       </QueryProvider>
 *     </MuiProvider>
 *   );
 * }
 * ```
 */
export function MuiProvider({ children }: MuiProviderProps) {
  const theme = useMemo(() => createTheme(lightTheme), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
