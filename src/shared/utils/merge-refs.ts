import { MutableRefObject, Ref, RefCallback } from 'react';

/**
 * Merges multiple refs into a single ref callback.
 * Useful when you need to pass a ref to a component that also needs an internal ref.
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
