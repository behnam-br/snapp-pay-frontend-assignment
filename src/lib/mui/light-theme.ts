import { createTheme } from '@mui/material';

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
