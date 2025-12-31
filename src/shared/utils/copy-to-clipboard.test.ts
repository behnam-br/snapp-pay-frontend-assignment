import { expect, it, vi } from 'vitest';

import { copyToClipboard } from '@/shared/utils/copy-to-clipboard';

it('copies via clipboard, otherwise falls back', async () => {
  const e = {} as unknown as React.MouseEvent;

  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });

  expect(await copyToClipboard(e, 'hi')).toBe(true);
  expect(writeText).toHaveBeenCalledWith('hi');

  writeText.mockRejectedValueOnce(new Error('fail'));

  const execCommand = vi.fn().mockReturnValue(true);
  Object.defineProperty(document, 'execCommand', {
    value: execCommand,
    configurable: true,
  });

  expect(await copyToClipboard(e, 'hi')).toBe(true);
  expect(execCommand).toHaveBeenCalledWith('copy');
});
