import { ReactNode, useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '@/lib/mui/light-theme';

interface MuiProviderProps {
  children: ReactNode;
}

export function MuiProvider({ children }: MuiProviderProps) {
  const theme = useMemo(() => createTheme(lightTheme), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
