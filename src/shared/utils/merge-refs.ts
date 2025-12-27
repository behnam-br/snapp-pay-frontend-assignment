import { MutableRefObject, Ref, RefCallback } from 'react';

/**
 * Merges multiple React refs into a single callback ref.
 *
 * Use this when you need to attach the same DOM/node instance to more than one ref
 * (e.g. an internal ref plus a forwarded ref, or multiple library integrations).
 *
 * @typeParam T - The instance type being referenced (e.g. `HTMLDivElement`, a component instance, etc.).
 * @param refs - A list of refs to merge.
 * @returns A single callback ref that updates all provided refs with the same value.
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
