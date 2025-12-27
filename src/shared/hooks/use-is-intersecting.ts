import { RefObject, useEffect, useState } from 'react';

/**
 * Hook to check if an element is intersecting with the viewport.
 * @param elementRef - The ref to the element to check.
 * @returns True if the element is intersecting with the viewport, false otherwise.
 */
export const useIsIntersecting = <T extends HTMLElement>(
  elementRef: RefObject<T | null>
): boolean => {
  const [isIntersected, setIsIntersected] = useState(false);
  const rootMargin = '100px';

  useEffect(() => {
    if (!elementRef.current) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const element = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersected(true);
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
  }, [rootMargin, elementRef]);

  return isIntersected;
};
