import { forwardRef, useRef } from 'react';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';

import { usePrefetch } from '@/lib/router/components/use-prefetch';
import { mergeRefs } from '@/shared/utils/merge-refs';

/**
 * Props for the app's enhanced `NavLink` component.
 *
 * @remarks
 * This component wraps React Router's `NavLink` and adds optional route prefetching.
 * The `prefetch` prop is omitted from the underlying React Router props and reintroduced
 * here as a boolean feature flag.
 */
export interface NavLinkProps extends Omit<RouterNavLinkProps, 'prefetch'> {
  /**
   * When `true`, the linked route will be prefetched on user intent signals
   * (hover, focus, or touch start).
   *
   * @defaultValue false
   */
  prefetch?: boolean;
}

/**
 * A React Router `NavLink` wrapper that can prefetch the destination route module.
 *
 * @remarks
 * If `prefetch` is enabled, this component will trigger prefetching on:
 * - `onMouseEnter` (hover)
 * - `onFocus` (keyboard navigation)
 * - `onTouchStart` (mobile intent)
 *
 * It forwards a ref to the underlying `<a>` element and also keeps an internal ref
 * used by the prefetch hook; both refs are combined via {@link mergeRefs}.
 *
 * Because this wraps `NavLink`, you still get all of React Router's active/pending
 * styling behavior (e.g. `className` as a function).
 *
 * @example
 * ```tsx
 * <NavLink to="/settings" prefetch className={({ isActive }) => isActive ? "active" : ""}>
 *   Settings
 * </NavLink>
 * ```
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
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
      <RouterNavLink
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

NavLink.displayName = 'NavLink';
