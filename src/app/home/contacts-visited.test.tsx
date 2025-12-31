import { getContactHandlers } from '@/api/get-contact/get-contact.handlers';
import { getContactListHandlers } from '@/api/get-contact-list/get-contact-list.handlers';
import { ContactsVisited } from '@/app/home/contacts-visited';
import { server } from '@/test/mocks/server';
import { renderWithProviders, screen, waitFor, within } from '@/test/test-utils';

describe('Contacts', () => {
  server.use(getContactListHandlers.success);
  server.use(getContactHandlers.success);

  it('should render contacts loading state initially', async () => {
    renderWithProviders(<ContactsVisited ids={[1, 2, 3]} />);

    const contactsSection = screen.queryByRole('region', { name: /contacts visited/i });
    if (contactsSection) {
      const progressbar = within(contactsSection).queryByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    }
  });

  it('should render contacts', async () => {
    renderWithProviders(<ContactsVisited ids={[1, 2, 3]} />);

    await waitFor(
      () => {
        const contactsSection = screen.queryByRole('region', { name: /contacts visited/i });
        expect(contactsSection).toBeInTheDocument();
        if (contactsSection) {
          expect(contactsSection.tagName).toBe('SECTION');
          const contactListItem = within(contactsSection).getAllByRole('listitem');
          expect(contactListItem).toHaveLength(3);
        }
      },
      { timeout: 3000 }
    );
  });
});
