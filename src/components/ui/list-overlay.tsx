import { Box } from '@mui/material';

export function ListOverlay({ isFetching }: { isFetching: boolean }) {
  if (!isFetching) return <></>;
  return (
    <Box
      role='presentation'
      aria-label='list overlay'
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 10,
      }}
    />
  );
}
