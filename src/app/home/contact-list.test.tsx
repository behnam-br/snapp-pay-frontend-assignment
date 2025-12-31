import { mockContacts } from '@/api/get-contact.mock';
import { mapContact } from '@/api/get-contact/get-contact.mappers';
import { ContactList } from '@/app/home/contact-list';
import { renderWithProviders, screen, within } from '@/test/test-utils';

describe('ContactList', () => {
  const contacts = mockContacts.map(mapContact);
  it('should render contact list', async () => {
    renderWithProviders(
      <ContactList items={contacts} isFetching={false} ariaLabel='contact list' />
    );

    const contactList = screen.queryByRole('region', { name: /contact list/i });
    expect(contactList).toBeInTheDocument();
    if (contactList) {
      expect(contactList.tagName).toBe('SECTION');
      const listContainer = within(contactList).queryByRole('list');
      expect(listContainer).toBeInTheDocument();
      if (listContainer) {
        expect(listContainer.tagName).toBe('UL');
        const listItems = within(listContainer).getAllByRole('listitem');
        expect(listItems).toHaveLength(contacts.length);
      }
    }
  });

  it('should render contact list overlay when fetching', async () => {
    renderWithProviders(
      <ContactList items={contacts} isFetching={true} ariaLabel='contact list' />
    );

    const contactList = screen.queryByRole('region', { name: /contact list/i });
    if (contactList) {
      const listOverlay = within(contactList).queryByRole('presentation', {
        name: /list overlay/i,
      });
      expect(listOverlay).toBeInTheDocument();
    }
  });
});
