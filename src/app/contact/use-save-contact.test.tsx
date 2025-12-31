import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSaveContact } from '@/app/contact/use-save-contact';

vi.mock('@/envs', () => ({
  default: {
    VISITED_CONTACT_IDS_KEY: 'VISITED_CONTACT_IDS_KEY',
  },
}));

const KEY = 'VISITED_CONTACT_IDS_KEY';

function readIds(): string[] {
  return JSON.parse(localStorage.getItem(KEY) ?? '[]');
}

describe('useSaveContact', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('does nothing when id is undefined', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    renderHook(() => useSaveContact(undefined));

    await waitFor(() => {
      expect(setItemSpy).not.toHaveBeenCalled();
      expect(readIds()).toEqual([]);
    });
  });

  it('stores the id when there are no stored ids', async () => {
    renderHook(() => useSaveContact('10'));

    await waitFor(() => {
      expect(readIds()).toEqual(['10']);
    });
  });

  it('moves an existing id to the front (no duplicates)', async () => {
    localStorage.setItem(KEY, JSON.stringify(['1', '2', '3']));

    renderHook(() => useSaveContact('2'));

    await waitFor(() => {
      expect(readIds()).toEqual(['2', '1', '3']);
    });
  });

  it('keeps max 4 items: drops the oldest when adding a new one', async () => {
    localStorage.setItem(KEY, JSON.stringify(['4', '3', '2', '1']));

    renderHook(() => useSaveContact('5'));

    await waitFor(() => {
      expect(readIds()).toEqual(['5', '4', '3', '2']);
    });
  });

  it('when list is full and id already exists, it just moves to front', async () => {
    localStorage.setItem(KEY, JSON.stringify(['4', '3', '2', '1']));

    renderHook(() => useSaveContact('2'));

    await waitFor(() => {
      expect(readIds()).toEqual(['2', '4', '3', '1']);
    });
  });
});
