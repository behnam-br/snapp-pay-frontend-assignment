import { useEffect, useState } from 'react';
import { Box, Pagination } from '@mui/material';

export type PaginationBarProps = {
  incomingPage: number;
  incomingCount: number;
  onPageChange: (page: number) => void;
};

export const PaginationBar = ({
  incomingPage,
  incomingCount,
  onPageChange,
}: PaginationBarProps) => {
  const [page, setPage] = useState(incomingPage);
  const [count, setCount] = useState(incomingCount);

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  useEffect(() => {
    if (incomingCount !== count) {
      setPage(1);
      setCount(incomingCount);
    }
  }, [incomingCount, count]);

  useEffect(() => {
    setPage(incomingPage);
  }, [incomingPage]);

  if (count <= 1) return null;
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 3 }}>
      <Pagination
        aria-label='pagination bar'
        role='navigation'
        count={count}
        page={page}
        onChange={(_, next) => {
          setPage(next);
        }}
        color='primary'
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
};
