import { RefObject, useCallback, useEffect, useMemo } from 'react';
import { LinkProps as RouterLinkProps, matchRoutes } from 'react-router-dom';

import { routes } from '@/app/routes';
import { useIsIntersecting } from '@/shared/hooks/use-is-intersecting';

import type { RouteObject, To } from 'react-router-dom';

/**
 * Used in Link and NavLink components to prefetch routes. based on the prefetch prop.
 * @param to - The to prop.
 * @param prefetch - The prefetch prop.
 * @param onMouseEnter - The onMouseEnter prop.
 * @param onFocus - The onFocus prop.
 * @param onTouchStart - The onTouchStart prop.
 * @param ref - The ref prop.
 */
export function usePrefetch(
  {
    to,
    prefetch,
    onMouseEnter,
    onFocus,
    onTouchStart,
  }: Pick<RouterLinkProps, 'prefetch' | 'onMouseEnter' | 'onFocus' | 'onTouchStart' | 'to'>,
  ref: RefObject<HTMLAnchorElement | null>
) {
  const path = useMemo(() => toPath(to), [to]);
  const isIntersected = useIsIntersecting(ref);

  const doPrefetch = useCallback(() => {
    if (!path) return;
    prefetchLazyRoute(path);
  }, [path]);

  useEffect(() => {
    if (prefetch === 'viewport' && isIntersected) doPrefetch();
  }, [prefetch, isIntersected, doPrefetch]);

  const handleIntentPrefetch = useCallback(() => {
    if (prefetch === 'intent') doPrefetch();
  }, [prefetch, doPrefetch]);

  const handleMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      handleIntentPrefetch();
      onMouseEnter?.(e);
    },
    [handleIntentPrefetch, onMouseEnter]
  );

  const handleFocus: React.FocusEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      handleIntentPrefetch();
      onFocus?.(e);
    },
    [handleIntentPrefetch, onFocus]
  );

  const handleTouchStart: React.TouchEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      handleIntentPrefetch();
      onTouchStart?.(e);
    },
    [handleIntentPrefetch, onTouchStart]
  );

  return {
    onMouseEnter: handleMouseEnter,
    onFocus: handleFocus,
    onTouchStart: handleTouchStart,
  };
}

function toPath(to: To): string {
  if (typeof to === 'string') return to;
  return to.pathname ?? '';
}

/**
 * Prefetch a lazy route based on the pathname.
 * @param pathname - The pathname to prefetch.
 * @returns A promise that resolves when the route is prefetched.
 */
async function prefetchLazyRoute(pathname: string): Promise<void> {
  const matches = matchRoutes(routes, pathname);
  if (!matches?.length) return;

  const matchesLazy = matches.filter((m) => m.route.lazy && typeof m.route.lazy === 'function');

  await Promise.all(
    matchesLazy.map((m) =>
      (m.route as RouteObject & { lazy: () => Promise<void> }).lazy?.().then(() => undefined)
    )
  );
}
