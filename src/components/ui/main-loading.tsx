import { Box, CircularProgress } from '@mui/material';

export function MainLoading({ height }: { height?: string }) {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height={height ?? '10rem'}
      width='100%'
    >
      <CircularProgress size={40} />
    </Box>
  );
}
