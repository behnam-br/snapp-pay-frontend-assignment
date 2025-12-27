import { MutableRefObject, Ref, RefCallback } from 'react';

/**
 * Merges multiple React refs into a single callback ref.
 * @param refs - The refs to merge.
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
