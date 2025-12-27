import { RefObject, useCallback, useEffect } from 'react';

import { prefetchRoute } from '@/lib/router/utils';

export const usePrefetch = <T extends HTMLElement = HTMLAnchorElement>(
  to: string,
  prefetch: boolean = true,
  elementRef: RefObject<T | null>
): (() => void) => {
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
