import { describe, expect, it } from 'vitest';

import { formatDate } from '@/shared/utils/format-date';

describe('formatDate', () => {
  it('should format Unix timestamp in seconds and return a non-empty string', () => {
    const timestamp = 1705322400;
    const result = formatDate(timestamp);

    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle Unix timestamp in milliseconds', () => {
    const timestamp = 1705322400000;
    const result = formatDate(timestamp);

    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return same output for equivalent timestamps', () => {
    const timestampSeconds = 1705322400;
    const timestampMilliseconds = 1705322400000;

    const resultSeconds = formatDate(timestampSeconds);
    const resultMilliseconds = formatDate(timestampMilliseconds);

    expect(resultSeconds).toBe(resultMilliseconds);
  });

  it('should format different timestamps differently', () => {
    const timestamp1 = 1705322400;
    const timestamp2 = 1609459200;

    const result1 = formatDate(timestamp1);
    const result2 = formatDate(timestamp2);

    expect(result1).not.toBe(result2);
  });

  it('should handle edge case of very old timestamp', () => {
    const timestamp = 0;
    const result = formatDate(timestamp);

    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
