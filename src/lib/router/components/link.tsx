import { forwardRef, useRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { usePrefetch } from '@/lib/router/components/use-prefetch';
import { mergeRefs } from '@/shared/utils/merge-refs';

export interface LinkProps extends Omit<RouterLinkProps, 'prefetch'> {
  prefetch?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ prefetch = false, onMouseEnter, onFocus, onTouchStart, to, ...props }, ref) => {
    const internalRef = useRef<HTMLAnchorElement>(null);

    const triggerPrefetch = usePrefetch(
      typeof to === 'string' ? to : to.pathname || '',
      prefetch,
      internalRef
    );

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      triggerPrefetch();
      onMouseEnter?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
      triggerPrefetch();
      onFocus?.(e);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
      triggerPrefetch();
      onTouchStart?.(e);
    };

    return (
      <RouterLink
        ref={mergeRefs(internalRef, ref)}
        to={to}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        onTouchStart={handleTouchStart}
        {...props}
      />
    );
  }
);

Link.displayName = 'Link';
