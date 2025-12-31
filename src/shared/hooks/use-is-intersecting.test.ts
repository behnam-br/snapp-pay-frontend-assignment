import { act, renderHook } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { useIsIntersecting } from '@/shared/hooks/use-is-intersecting';

it('becomes true when intersecting', () => {
  let cb: IntersectionObserverCallback | undefined;

  const disconnectSpy = vi.fn();
  const observeSpy = vi.fn();

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin = '0px';
    readonly thresholds: ReadonlyArray<number> = [0];

    constructor(callback: IntersectionObserverCallback) {
      cb = callback;
    }

    observe = (target: Element) => observeSpy(target);
    unobserve = (_target: Element) => {};
    disconnect = () => disconnectSpy();
    takeRecords = (): IntersectionObserverEntry[] => [];
  }

  vi.stubGlobal(
    'IntersectionObserver',
    MockIntersectionObserver as unknown as typeof IntersectionObserver
  );

  const el = document.createElement('div');
  const ref: React.RefObject<HTMLDivElement> = { current: el };

  const { result } = renderHook(() => useIsIntersecting(ref));
  expect(result.current).toBe(false);

  const entry: IntersectionObserverEntry = {
    time: 0,
    target: el,
    isIntersecting: true,
    intersectionRatio: 1,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
  };

  act(() => cb?.([entry], {} as IntersectionObserver));

  expect(result.current).toBe(true);
  expect(disconnectSpy).toHaveBeenCalled();

  vi.unstubAllGlobals();
});
