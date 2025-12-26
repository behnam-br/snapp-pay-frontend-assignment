import { ComponentType, lazy, ReactNode, Suspense } from 'react';

import { routes } from '@/app/routes';
import PageLoader from '@/components/layout/page-loader';

/**
 * Declarative description of a route whose page component is loaded lazily.
 *
 * @remarks
 * This shape is typically used to build a typed map of React components via {@link getRouteComponents}
 * and to support route prefetching via {@link prefetchRoute} / {@link prefetchAllRoutes}.
 *
 * @property path - The route path (normalized with a leading `/`), used to match and prefetch.
 * @property load - Loader function that dynamically imports a module containing one or more components.
 * @property component - The exported component name within the loaded module to render for this route.
 */
export type RouteConfig = {
  path: string;
  load: () => Promise<Record<string, ComponentType>>;
  component: string;
};

/**
 * Wraps a component in React {@link Suspense} with a standard page-level fallback.
 *
 * @param Component - A React component to render within Suspense.
 * @returns A {@link ReactNode} that renders `Component` with a {@link PageLoader} fallback.
 *
 * @remarks
 * Useful when rendering a lazily-loaded route component (e.g. from {@link getRouteComponents}).
 */
export function withSuspense(Component: ComponentType): ReactNode {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

/**
 * Builds a typed map of lazily-loaded route components from a declarative route list.
 *
 * @typeParam T - A readonly array (tuple-friendly) of {@link RouteConfig}.
 * @param routes - Route configurations describing how to load each component.
 * @returns An object mapping each `route.component` name to a `React.lazy` component.
 *
 * @remarks
 * Each entry uses `React.lazy` and will call `route.load()` on first render, then select
 * `module[route.component]` as the default export for the lazy boundary.
 *
 * This enables:
 * - Centralized lazy import wiring
 * - Typed access by component name (especially when `routes` is `as const`)
 *
 * @example
 * ```ts
 * const routes = [
 *   { path: '/', load: () => import('./pages'), component: 'Home' },
 *   { path: '/about', load: () => import('./pages'), component: 'About' },
 * ] as const;
 *
 * const RouteComponents = getRouteComponents(routes);
 * // RouteComponents.Home and RouteComponents.About are lazy components
 * ```
 */
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

/**
 * Internal cache of normalized paths that have already been prefetched
 * during the current session.
 */
const prefetchedRoutes = new Set<string>();

/**
 * Prefetches the route module for a given path (no-op if already prefetched or not found).
 *
 * @param path - A URL path. May be empty, missing a leading slash, or include query/hash.
 * @returns A promise that resolves once the matching route module has been loaded (or immediately if no-op).
 *
 * @remarks
 * Behavior:
 * - Normalizes `path` by:
 *   - converting `''` to `'/'`
 *   - ensuring a leading `/`
 *   - stripping query (`?`) and hash (`#`)
 * - Uses an internal cache to avoid duplicate prefetches per normalized path.
 * - Looks up the route by exact `RouteConfig.path` match in the app's `routes` list.
 *
 * Common use cases:
 * - Prefetch on link hover/focus to reduce navigation latency.
 * - Prefetch ahead of time based on user intent (e.g. next step in a flow).
 *
 * @example
 * ```ts
 * // e.g. onMouseEnter for a nav item:
 * void prefetchRoute('/settings');
 *
 * // these normalize to the same cached key:
 * void prefetchRoute('settings?tab=profile#top');
 * ```
 */
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

/**
 * Prefetches modules for all declared routes.
 *
 * @returns A promise that resolves when all route modules have been prefetched.
 *
 * @remarks
 * This uses {@link prefetchRoute} under the hood, so it benefits from the same
 * normalization and caching behavior. Routes that were already prefetched will be skipped.
 */
export const prefetchAllRoutes = (): Promise<void[]> => {
  return Promise.all(routes.map((route: RouteConfig) => prefetchRoute(route.path)));
};
