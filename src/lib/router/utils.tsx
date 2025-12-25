import { ComponentType, lazy, ReactNode, Suspense } from 'react';

import { routes } from '@/app/routes';
import PageLoader from '@/components/layout/page-loader';

export type RouteConfig = {
  path: string;
  load: () => Promise<Record<string, ComponentType>>;
  component: string;
};

export type RouteComponentUnion<T extends readonly RouteConfig[]> = T[number]['component'];

export function withSuspense(Component: ComponentType): ReactNode {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export function getRouteComponents<T extends readonly RouteConfig[]>(routes: T) {
  return routes.reduce(
    (acc, route) => {
      acc[route.component as T[number]['component']] = lazy(() =>
        route.load().then((module) => ({
          default: (module as Record<string, ComponentType>)[route.component],
        }))
      );
      return acc;
    },
    {} as Record<T[number]['component'], ComponentType>
  );
}

const prefetchedRoutes = new Set<string>();

export const prefetchRoute = (path: string): Promise<void> => {
  let normalizedPath = path === '' ? '/' : path;
  normalizedPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
  normalizedPath = normalizedPath.split('?')[0].split('#')[0];

  if (prefetchedRoutes.has(normalizedPath)) {
    return Promise.resolve();
  }

  const route = routes.find((r: RouteConfig) => r.path === normalizedPath);

  if (route) {
    prefetchedRoutes.add(normalizedPath);
    return route.load().then(() => {});
  }

  return Promise.resolve();
};

export const prefetchAllRoutes = (): Promise<void[]> => {
  return Promise.all(routes.map((route: RouteConfig) => prefetchRoute(route.path)));
};
