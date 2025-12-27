import { forwardRef, useRef } from 'react';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';

import { usePrefetch } from '@/lib/router/use-prefetch';
import { mergeRefs } from '@/shared/utils/merge-refs';

/**
 * NavLink component with prefetch support.
 * @param RouterNavLinkProps - The props to pass to the router nav link.
 * @returns The nav link component.
 */
export const NavLink = forwardRef<HTMLAnchorElement, RouterNavLinkProps>(
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
      <RouterNavLink
        ref={mergeRefs(internalRef, ref)}
        to={to}
        prefetch={prefetch}
        {...handlers}
        {...props}
      />
    );
  }
);

NavLink.displayName = 'NavLink';
