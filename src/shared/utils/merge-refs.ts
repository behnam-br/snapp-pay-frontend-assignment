import { MutableRefObject, Ref, RefCallback } from 'react';

/**
 * Merges multiple React refs into a single callback ref.
 *
 * Use this when you need to attach the same DOM/node instance to more than one ref
 * (e.g. an internal ref plus a forwarded ref, or multiple library integrations).
 *
 * The returned callback will:
 * - Call any function refs with the provided value.
 * - Assign the value to `.current` for any object refs.
 * - Ignore `undefined` refs safely.
 *
 * @typeParam T - The instance type being referenced (e.g. `HTMLDivElement`, a component instance, etc.).
 * @param refs - A list of refs to merge. Each may be a callback ref, a mutable object ref, or `undefined`.
 * @returns A single callback ref that updates all provided refs with the same value.
 *
 * @example
 * ```tsx
 * const innerRef = useRef<HTMLButtonElement>(null);
 *
 * const Button = forwardRef<HTMLButtonElement, JSX.IntrinsicElements["button"]>(
 *   (props, forwardedRef) => (
 *     <button ref={mergeRefs(innerRef, forwardedRef)} {...props} />
 *   )
 * );
 * ```
 */
export const mergeRefs = <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
};
