import { createTheme } from '@mui/material';

/**
 * Application light theme configuration for Material UI (MUI).
 *
 * @remarks
 * This theme sets:
 * - `palette.mode` to `"light"`
 * - primary/secondary brand colors
 * - default background and paper surfaces
 * - primary/secondary text colors
 *
 * Import and provide this theme via `ThemeProvider` (see `MuiProvider`) to ensure
 * consistent styling across the application.
 */
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005FB8',
    },
    secondary: {
      main: '#2E7D32',
    },
    background: {
      default: '#fff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#222',
      secondary: '#666',
    },
  },
});
