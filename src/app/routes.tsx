import { ErrorBoundary } from '@/components/layout/error-boundary';
import { AppLoader } from '@/components/ui/app-loader';

import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    HydrateFallback: AppLoader,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/app/home/home-page').then((module) => ({
            Component: module.HomePage,
          })),
      },
      {
        path: '/contact/:id',
        lazy: () =>
          import('@/app/contact/contact-page').then((module) => ({
            Component: module.ContactPage,
          })),
      },
    ],
  },
];
