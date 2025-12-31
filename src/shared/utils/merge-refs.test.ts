import { describe, expect, it, vi } from 'vitest';

import { mergeRefs } from '@/shared/utils/merge-refs';

import type { MutableRefObject } from 'react';

describe('mergeRefs', () => {
  it('updates object refs and calls callback refs', () => {
    const el = document.createElement('div');

    const objRef1: MutableRefObject<HTMLDivElement | null> = { current: null };
    const objRef2: MutableRefObject<HTMLDivElement | null> = { current: null };
    const cbRef = vi.fn<(value: HTMLDivElement | null) => void>();

    const merged = mergeRefs<HTMLDivElement>(objRef1, cbRef, undefined, objRef2);

    merged(el);

    expect(objRef1.current).toBe(el);
    expect(objRef2.current).toBe(el);
    expect(cbRef).toHaveBeenCalledWith(el);
  });

  it('sets refs to null on unmount', () => {
    const objRef: MutableRefObject<HTMLDivElement | null> = {
      current: document.createElement('div'),
    };
    const cbRef = vi.fn<(value: HTMLDivElement | null) => void>();

    const merged = mergeRefs<HTMLDivElement>(objRef, cbRef);

    merged(null);

    expect(objRef.current).toBe(null);
    expect(cbRef).toHaveBeenCalledWith(null);
  });
});
