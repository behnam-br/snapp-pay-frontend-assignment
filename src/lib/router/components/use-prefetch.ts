import { RefObject, useCallback, useEffect } from 'react';

import { prefetchRoute } from '@/lib/router/utils';

/**
 * Hook that returns a function to prefetch a route module and can also prefetch
 * automatically when the referenced element enters the viewport.
 *
 * @typeParam T - The element type being observed. Defaults to `HTMLAnchorElement`.
 * @param to - Target path to prefetch (should match the path used in your route config).
 * @param prefetch - Enables/disables all prefetch behavior for this hook.
 * @param elementRef - Ref to the element whose visibility should trigger automatic prefetch.
 * @returns A callback you can invoke to trigger prefetch manually (e.g. on hover/focus/touch).
 *
 * @remarks
 * This hook provides two prefetch strategies:
 * 1) **Viewport-based prefetch** using `IntersectionObserver`:
 *    - When the element becomes visible (within `rootMargin`), it prefetches once and disconnects.
 *    - If `IntersectionObserver` is unavailable (e.g. older browsers/SSR), this behavior is skipped.
 *
 * 2) **Intent-based prefetch** via the returned callback:
 *    - Call the returned function from `onMouseEnter`, `onFocus`, `onTouchStart`, etc.
 *
 * The actual prefetch work is delegated to {@link prefetchRoute}, which may internally
 * normalize paths and dedupe repeated calls.
 */
export const usePrefetch = <T extends HTMLElement = HTMLAnchorElement>(
  to: string,
  prefetch: boolean = true,
  elementRef: RefObject<T | null>
): (() => void) => {
  /**
   * Distance outside the viewport at which the route should begin prefetching.
   * Increasing this can make navigation feel snappier at the cost of earlier network usage.
   */
  const rootMargin = '100px';

  useEffect(() => {
    if (!elementRef.current || !prefetch) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const element = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prefetchRoute(to);
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(element);

    return () => {
      observer?.disconnect();
    };
  }, [to, rootMargin, prefetch, elementRef]);

  const on = useCallback(() => {
    if (!prefetch) return;
    prefetchRoute(to);
  }, [to, prefetch]);

  return on;
};
