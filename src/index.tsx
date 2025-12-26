import '@/global.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/routes';
import { MuiProvider } from '@/lib/mui/mui-provider';
import { QueryProvider } from '@/lib/react-query/query-provider';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <QueryProvider>
      <MuiProvider>
        <RouterProvider router={router} />
      </MuiProvider>
    </QueryProvider>
  </StrictMode>
);
