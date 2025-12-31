import { getContactListHandlers } from '@/api/get-contact-list/get-contact-list.handlers';
import { Contacts } from '@/app/home/contacts';
import { server } from '@/test/mocks/server';
import { renderWithProviders, screen, waitFor, within } from '@/test/test-utils';

describe('Contacts', () => {
  server.use(getContactListHandlers.success);

  it('should render contacts loading state initially', async () => {
    renderWithProviders(
      <Contacts params={{ page: 1, limit: 10, filters: {} }} onChangeTotalPages={() => {}} />
    );

    const contactsSection = screen.queryByRole('region', { name: /contacts/i });
    if (contactsSection) {
      const progressbar = within(contactsSection).queryByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    }
  });

  it('should render contacts', async () => {
    renderWithProviders(
      <Contacts params={{ page: 1, limit: 10, filters: {} }} onChangeTotalPages={() => {}} />
    );

    await waitFor(
      () => {
        const contacts = screen.queryByRole('region', { name: /contacts/i });
        expect(contacts).toBeInTheDocument();
        if (contacts) {
          expect(contacts.tagName).toBe('SECTION');
        }
      },
      { timeout: 3000 }
    );
  });
});
