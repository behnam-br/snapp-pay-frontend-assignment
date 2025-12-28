import { Box } from '@mui/material';

export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box maxWidth='1600px' margin='0 auto' padding={2}>
      {children}
    </Box>
  );
}
