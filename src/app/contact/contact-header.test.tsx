import { mockContacts } from '@/api/get-contact.mock';
import { mapContact } from '@/api/get-contact/get-contact.mappers';
import { ContactHeader } from '@/app/contact/contact-header';
import { renderWithProviders, screen, within } from '@/test/test-utils';

describe('ContactHeader', () => {
  const contactWithOptionalData = mapContact(mockContacts[10]);
  const contactWithoutOptionalData = mapContact(mockContacts[11]);

  it('should render contact header', async () => {
    renderWithProviders(<ContactHeader contact={contactWithOptionalData} />);

    const contactHeader = screen.queryByRole('region', { name: /contact header/i });
    expect(contactHeader).toBeInTheDocument();
    if (contactHeader) {
      expect(contactHeader.tagName).toBe('SECTION');
    }
  });

  it('should render contact header avatar when avatar is available', async () => {
    renderWithProviders(<ContactHeader contact={contactWithOptionalData} />);

    const contactHeader = screen.queryByRole('region', { name: /contact header/i });

    if (contactHeader) {
      const contactAvatar = within(contactHeader).queryByRole('img', {
        name: /contact header avatar/i,
      });
      expect(contactAvatar).toBeInTheDocument();
      if (contactAvatar) {
        const contactAvatarImg = contactAvatar.querySelector('img');
        expect(contactAvatarImg?.getAttribute('src')).toBe(contactWithOptionalData.avatar);
        expect(contactAvatarImg?.getAttribute('alt')).toBe(
          `${contactWithOptionalData.firstName} ${contactWithOptionalData.lastName}`
        );
      }
    }
  });

  it('should not render contact header avatar when avatar is not available', async () => {
    renderWithProviders(<ContactHeader contact={contactWithoutOptionalData} />);

    const contactHeader = screen.queryByRole('region', { name: /contact header/i });

    if (contactHeader) {
      const contactAvatar = within(contactHeader).queryByRole('img', {
        name: /contact header avatar/i,
      });
      expect(contactAvatar).toBeInTheDocument();
      if (contactAvatar) {
        expect(contactAvatar).toHaveTextContent(
          `${contactWithoutOptionalData.firstName?.[0]}${contactWithoutOptionalData.lastName?.[0]}`
        );
      }
    }
  });

  it('should render contact header full name', async () => {
    renderWithProviders(<ContactHeader contact={contactWithOptionalData} />);

    const contactHeader = screen.queryByRole('region', { name: /contact header/i });

    if (contactHeader) {
      const contactFullName = within(contactHeader).queryByRole('heading', {
        name: /contact header full name/i,
      });
      expect(contactFullName).toBeInTheDocument();
      if (contactFullName) {
        expect(contactFullName.tagName).toBe('H5');
        expect(contactFullName.textContent).toBe(contactWithOptionalData.fullName);
      }
    }
  });

  it('should render contact header company when company is available', async () => {
    renderWithProviders(<ContactHeader contact={contactWithOptionalData} />);

    const contactHeader = screen.queryByRole('region', { name: /contact header/i });

    if (contactHeader) {
      const contactCompany = within(contactHeader).queryByRole('chip', {
        name: /contact header company/i,
      });
      expect(contactCompany).toBeInTheDocument();
      if (contactCompany) {
        expect(contactCompany.querySelector('span')?.textContent).toBe(
          'Company: ' + contactWithOptionalData.company
        );
      }
    }
  });

  it('should not render contact header company when company is not available', async () => {
    renderWithProviders(<ContactHeader contact={contactWithoutOptionalData} />);

    const contactHeader = screen.queryByRole('region', { name: /contact header/i });

    if (contactHeader) {
      const contactCompany = within(contactHeader).queryByRole('chip', {
        name: /contact header company/i,
      });
      expect(contactCompany).not.toBeInTheDocument();
    }
  });

  it('should render contact header gender when gender is available', async () => {
    renderWithProviders(<ContactHeader contact={contactWithOptionalData} />);

    const contactHeader = screen.queryByRole('region', { name: /contact header/i });

    if (contactHeader) {
      const contactGender = within(contactHeader).queryByRole('chip', {
        name: /contact header gender/i,
      });
      expect(contactGender).toBeInTheDocument();
      if (contactGender) {
        expect(contactGender.querySelector('span')?.textContent).toBe(
          'Gender: ' + contactWithOptionalData.gender
        );
      }
    }
  });

  it('should render contact header phone', async () => {
    renderWithProviders(<ContactHeader contact={contactWithOptionalData} />);

    const contactHeader = screen.queryByRole('region', { name: /contact header/i });

    if (contactHeader) {
      const contactPhone = within(contactHeader).queryByRole('link', {
        name: /contact header phone/i,
      });
      expect(contactPhone).toBeInTheDocument();
      if (contactPhone) {
        expect(contactPhone.tagName).toBe('A');
        expect(contactPhone.getAttribute('href')).toBe(`tel:${contactWithOptionalData.phone}`);
      }
    }
  });
});
