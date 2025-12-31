import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useCopyFeedback } from '@/shared/hooks/use-copy-feedback';

describe('useCopyFeedback', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('resets copied after duration', () => {
    const { result } = renderHook(() => useCopyFeedback(200));

    expect(result.current.copied).toBe(false);

    act(() => result.current.setCopied(true));
    expect(result.current.copied).toBe(true);

    act(() => vi.advanceTimersByTime(200));
    expect(result.current.copied).toBe(false);
  });
});
