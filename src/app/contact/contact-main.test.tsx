import { mockContacts } from '@/api/get-contact.mock';
import { mapContact } from '@/api/get-contact/get-contact.mappers';
import { ContactMain } from '@/app/contact/contact-main';
import { formatDate } from '@/shared/utils/format-date';
import { telegramToUrl } from '@/shared/utils/telegram-to-url';
import { renderWithProviders, screen, within } from '@/test/test-utils';

describe('ContactMain', () => {
  const contactWithOptionalData = mapContact(mockContacts[10]);
  const contactWithoutOptionalData = mapContact(mockContacts[11]);

  it('should render contact main', async () => {
    renderWithProviders(<ContactMain contact={contactWithOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    expect(contactMain).toBeInTheDocument();
    if (contactMain) {
      expect(contactMain.tagName).toBe('SECTION');
    }
  });

  it('should render contact main phone', async () => {
    renderWithProviders(<ContactMain contact={contactWithOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainPhone = within(contactMain).queryByRole('link', {
        name: /contact main phone/i,
      });
      expect(contactMainPhone).toBeInTheDocument();
      if (contactMainPhone) {
        expect(contactMainPhone.tagName).toBe('A');
        expect(contactMainPhone.getAttribute('href')).toBe(`tel:${contactWithOptionalData.phone}`);
      }
    }
  });

  it('should render contact main email when email is available', async () => {
    renderWithProviders(<ContactMain contact={contactWithOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainEmail = within(contactMain).queryByRole('link', {
        name: /contact main email/i,
      });
      expect(contactMainEmail).toBeInTheDocument();
      if (contactMainEmail) {
        expect(contactMainEmail.tagName).toBe('A');
        expect(contactMainEmail.getAttribute('href')).toBe(
          `mailto:${contactWithOptionalData.email}`
        );
      }
    }
  });

  it('should not render contact main email when email is not available', async () => {
    renderWithProviders(<ContactMain contact={contactWithoutOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainEmail = within(contactMain).queryByRole('link', {
        name: /contact main email/i,
      });
      expect(contactMainEmail).not.toBeInTheDocument();
    }
  });

  it('should render contact main telegram when telegram is available', async () => {
    renderWithProviders(<ContactMain contact={contactWithOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainTelegram = within(contactMain).queryByRole('link', {
        name: /contact main telegram/i,
      });
      expect(contactMainTelegram).toBeInTheDocument();
      if (contactMainTelegram) {
        expect(contactMainTelegram.tagName).toBe('A');
        expect(contactMainTelegram.getAttribute('href')).toBe(
          telegramToUrl(contactWithOptionalData.telegram ?? '')
        );
      }
    }
  });

  it('should not render contact main telegram when telegram is not available', async () => {
    renderWithProviders(<ContactMain contact={contactWithoutOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainTelegram = within(contactMain).queryByRole('link', {
        name: /contact main telegram/i,
      });
      expect(contactMainTelegram).not.toBeInTheDocument();
      if (contactMainTelegram) {
        expect(contactMainTelegram.tagName).toBe('A');
        expect(contactMainTelegram.getAttribute('href')).toBe(
          telegramToUrl(contactWithOptionalData.telegram ?? '')
        );
      }
    }
  });

  it('should render contact main company when company is available', async () => {
    renderWithProviders(<ContactMain contact={contactWithOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainCompany = within(contactMain).queryByRole('paragraph', {
        name: /contact main company/i,
      });
      expect(contactMainCompany).toBeInTheDocument();
      if (contactMainCompany) {
        expect(contactMainCompany.tagName).toBe('P');
        expect(contactMainCompany.textContent).toBe(contactWithOptionalData.company ?? '');
      }
    }
  });

  it('should not render contact main company when company is not available', async () => {
    renderWithProviders(<ContactMain contact={contactWithoutOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainCompany = within(contactMain).queryByRole('paragraph', {
        name: /contact main company/i,
      });
      expect(contactMainCompany).toBeInTheDocument();
      if (contactMainCompany) {
        expect(contactMainCompany.tagName).toBe('P');
        expect(contactMainCompany.textContent).toBe('—');
      }
    }
  });

  it('should render contact main address when address is available', async () => {
    renderWithProviders(<ContactMain contact={contactWithOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainAddress = within(contactMain).queryByRole('paragraph', {
        name: /contact main address/i,
      });
      expect(contactMainAddress).toBeInTheDocument();
      if (contactMainAddress) {
        expect(contactMainAddress.tagName).toBe('P');
        expect(contactMainAddress.textContent).toBe(contactWithOptionalData.address ?? '');
      }
    }
  });

  it('should not render contact main address when address is not available', async () => {
    renderWithProviders(<ContactMain contact={contactWithoutOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainAddress = within(contactMain).queryByRole('paragraph', {
        name: /contact main address/i,
      });
      expect(contactMainAddress).toBeInTheDocument();
      if (contactMainAddress) {
        expect(contactMainAddress.tagName).toBe('P');
        expect(contactMainAddress.textContent).toBe('—');
      }
    }
  });

  it('should render contact main created', async () => {
    renderWithProviders(<ContactMain contact={contactWithOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainCreated = within(contactMain).queryByRole('paragraph', {
        name: /contact main created/i,
      });
      expect(contactMainCreated).toBeInTheDocument();
      if (contactMainCreated) {
        expect(contactMainCreated.tagName).toBe('P');
        expect(contactMainCreated.textContent).toBe(formatDate(contactWithOptionalData.createdAt));
      }
    }
  });

  it('should render contact main updated', async () => {
    renderWithProviders(<ContactMain contact={contactWithOptionalData} />);

    const contactMain = screen.queryByRole('region', { name: /contact main/i });
    if (contactMain) {
      const contactMainUpdated = within(contactMain).queryByRole('paragraph', {
        name: /contact main updated/i,
      });
      expect(contactMainUpdated).toBeInTheDocument();
      if (contactMainUpdated) {
        expect(contactMainUpdated.tagName).toBe('P');
        expect(contactMainUpdated.textContent).toBe(formatDate(contactWithOptionalData.updatedAt));
      }
    }
  });
});
