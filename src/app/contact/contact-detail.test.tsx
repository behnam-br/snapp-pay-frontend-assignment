import { mockContacts } from '@/api/get-contact.mock';
import { mapContact } from '@/api/get-contact/get-contact.mappers';
import { ContactDetail } from '@/app/contact/contact-detail';
import { renderWithProviders, screen } from '@/test/test-utils';

describe('ContactDetail', () => {
  const contactWithOptionalData = mapContact(mockContacts[10]);

  it('should render contact detail', async () => {
    renderWithProviders(<ContactDetail contact={contactWithOptionalData} />);

    const contactDetail = screen.queryByRole('region', { name: /contact detail/i });
    expect(contactDetail).toBeInTheDocument();
    if (contactDetail) {
      expect(contactDetail.tagName).toBe('SECTION');
    }
  });
});
