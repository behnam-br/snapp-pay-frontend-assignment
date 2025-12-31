import { describe, expect, it } from 'vitest';

import { telegramToUrl } from '@/shared/utils/telegram-to-url';

describe('telegramToUrl', () => {
  it('returns null for empty/whitespace', () => {
    expect(telegramToUrl('')).toBeNull();
    expect(telegramToUrl('   ')).toBeNull();
  });

  it('keeps existing http/https urls', () => {
    expect(telegramToUrl('https://t.me/test')).toBe('https://t.me/test');
    expect(telegramToUrl('http://t.me/test')).toBe('http://t.me/test');
  });

  it('converts username with or without @ to t.me url', () => {
    expect(telegramToUrl('user')).toBe('https://t.me/user');
    expect(telegramToUrl('@user')).toBe('https://t.me/user');
  });

  it('trims and encodes', () => {
    expect(telegramToUrl('  @a b  ')).toBe('https://t.me/a%20b');
  });
});
