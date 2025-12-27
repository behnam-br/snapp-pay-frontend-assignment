import { forwardRef, useRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { usePrefetch } from '@/lib/router/use-prefetch';
import { mergeRefs } from '@/shared/utils/merge-refs';

/**
 * Link component with prefetch support.
 * @param RouterLinkProps - The props to pass to the router link.
 * @returns The link component.
 */
export const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ prefetch, onMouseEnter, onFocus, onTouchStart, to, ...props }, ref) => {
    const internalRef = useRef<HTMLAnchorElement>(null);

    const handlers = usePrefetch(
      {
        to,
        prefetch,
        onMouseEnter,
        onFocus,
        onTouchStart,
      },
      internalRef
    );

    return (
      <RouterLink
        ref={mergeRefs(internalRef, ref)}
        to={to}
        prefetch={prefetch}
        {...handlers}
        {...props}
      />
    );
  }
);

Link.displayName = 'Link';
