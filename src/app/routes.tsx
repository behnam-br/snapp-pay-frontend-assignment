import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ErrorBoundary } from '@/components/layout/error-boundary';
import { MainLayout } from '@/components/layout/main-layout';
import { getRouteComponents, RouteConfig, withSuspense } from '@/lib/router/utils';

export const routes = [
  {
    path: '/',
    load: () => import('@/app/home/home-page'),
    component: 'HomePage',
  },
] as const satisfies readonly RouteConfig[];

export const RouteComponents = getRouteComponents(routes);

export const routeTree: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: withSuspense(RouteComponents.HomePage),
      },
    ],
  },
];

export const router = createBrowserRouter(routeTree);
