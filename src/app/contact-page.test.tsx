import { describe, expect, it } from 'vitest';

import { mockContacts } from '@/api/get-contact.mock';
import { getContactHandlers } from '@/api/get-contact/get-contact.handlers';
import { ContactPage } from '@/app/contact-page';
import { localStorageMock } from '@/test/mocks/local-storage';
import { server } from '@/test/mocks/server';
import { renderWithProviders, screen, waitFor } from '@/test/test-utils';

describe('ContactPage', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue('[]');
  });
  server.use(getContactHandlers.success);
  const testContact = mockContacts[0]; // id: 1

  it('should show loading state initially', async () => {
    renderWithProviders(<ContactPage />, {
      initialEntries: [`/contact/${testContact.id}`],
      route: '/contact/:id',
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show contact details', async () => {
    renderWithProviders(<ContactPage />, {
      initialEntries: [`/contact/${testContact.id}`],
      route: '/contact/:id',
    });

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /contact detail/i })).toBeInTheDocument();
    });
  });
});
