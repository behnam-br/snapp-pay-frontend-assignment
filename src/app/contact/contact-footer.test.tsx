import { mockContacts } from '@/api/get-contact.mock';
import { mapContact } from '@/api/get-contact/get-contact.mappers';
import { ContactFooter } from '@/app/contact/contact-footer';
import { renderWithProviders, screen } from '@/test/test-utils';

describe('ContactFooter', () => {
  const contactWithOptionalData = mapContact(mockContacts[10]);
  const contactWithoutOptionalData = mapContact(mockContacts[11]);

  it('should render contact footer when note is available', async () => {
    renderWithProviders(<ContactFooter contact={contactWithOptionalData} />);

    const contactFooterNote = screen.queryByRole('paragraph', { name: /contact note/i });
    expect(contactFooterNote).toBeInTheDocument();
    if (contactFooterNote) {
      expect(contactFooterNote.tagName).toBe('P');
    }
  });

  it('should not render contact footer when note is not available', async () => {
    renderWithProviders(<ContactFooter contact={contactWithoutOptionalData} />);

    const contactFooterNote = screen.queryByRole('paragraph', { name: /contact note/i });
    expect(contactFooterNote).not.toBeInTheDocument();
  });
});
