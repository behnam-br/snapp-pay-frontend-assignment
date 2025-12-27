import { ErrorBoundary } from '@/components/layout/error-boundary';

import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/app/home/home-page').then((module) => ({
            Component: module.HomePage,
          })),
      },
      {
        path: '/product',
        lazy: () =>
          import('@/app/product/product-page').then((module) => ({
            Component: module.ProductPage,
          })),
      },
    ],
  },
];
