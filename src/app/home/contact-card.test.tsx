import { describe, expect, it } from 'vitest';

import { mockContacts } from '@/api/get-contact.mock';
import { mapContact } from '@/api/get-contact/get-contact.mappers';
import { ContactCard } from '@/app/home/contact-card';
import { renderWithProviders, screen, userEvent, within } from '@/test/test-utils';

describe('ContactCard', () => {
  const contactWithOptionalData = mapContact(mockContacts[10]);
  const contactWithoutOptionalData = mapContact(mockContacts[11]);

  it('should render contact card', async () => {
    renderWithProviders(<ContactCard contact={contactWithOptionalData} />);

    const contactCard = screen.queryByRole('article', { name: /contact card/i });
    expect(contactCard).toBeInTheDocument();
    if (contactCard) {
      expect(contactCard.tagName).toBe('ARTICLE');
    }
  });

  it('should render contact card avatar when avatar is available', async () => {
    renderWithProviders(<ContactCard contact={contactWithOptionalData} />);

    const contactCard = screen.queryByRole('article', { name: /contact card/i });

    if (contactCard) {
      const contactAvatarLink = within(contactCard).queryByRole('link', {
        name: /contact card avatar link/i,
      });
      expect(contactAvatarLink).toBeInTheDocument();
      if (contactAvatarLink) {
        expect(contactAvatarLink.tagName).toBe('A');
        expect(contactAvatarLink.getAttribute('href')).toBe(
          `/contact/${contactWithOptionalData.id}`
        );

        const contactAvatar = within(contactAvatarLink).queryByRole('img', {
          name: /contact card avatar/i,
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
    }
  });

  it('should not render contact card avatar when avatar is not available', async () => {
    renderWithProviders(<ContactCard contact={contactWithoutOptionalData} />);

    const contactCard = screen.queryByRole('article', { name: /contact card/i });

    if (contactCard) {
      const contactAvatarLink = within(contactCard).queryByRole('link', {
        name: /contact card avatar link/i,
      });
      expect(contactAvatarLink).toBeInTheDocument();
      if (contactAvatarLink) {
        expect(contactAvatarLink.tagName).toBe('A');
        expect(contactAvatarLink.getAttribute('href')).toBe(
          `/contact/${contactWithoutOptionalData.id}`
        );

        const contactAvatar = within(contactAvatarLink).queryByRole('img', {
          name: /contact card avatar/i,
        });
        expect(contactAvatar).toBeInTheDocument();
        expect(contactAvatar).toHaveTextContent(
          `${contactWithoutOptionalData.firstName?.[0]}${contactWithoutOptionalData.lastName?.[0]}`
        );
      }
    }
  });

  it('should render contact card fullName', async () => {
    renderWithProviders(<ContactCard contact={contactWithoutOptionalData} />);

    const contactCard = screen.queryByRole('article', { name: /contact card/i });

    if (contactCard) {
      const contactFullNameLink = within(contactCard).queryByRole('link', {
        name: /contact card full name link/i,
      });
      expect(contactFullNameLink).toBeInTheDocument();
      if (contactFullNameLink) {
        expect(contactFullNameLink.tagName).toBe('A');
        expect(contactFullNameLink.getAttribute('href')).toBe(
          `/contact/${contactWithoutOptionalData.id}`
        );
        expect(contactFullNameLink.textContent).toBe(
          `${contactWithoutOptionalData.firstName} ${contactWithoutOptionalData.lastName}`
        );

        const contactFullNameText = within(contactFullNameLink).queryByRole('heading', {
          name: /contact card full name/i,
        });
        expect(contactFullNameText).toBeInTheDocument();
        if (contactFullNameText) {
          expect(contactFullNameText.tagName).toBe('H6');
          expect(contactFullNameText.textContent).toBe(
            `${contactWithoutOptionalData.firstName} ${contactWithoutOptionalData.lastName}`
          );
        }
      }
    }
  });

  it('should render contact card address when address is available', async () => {
    renderWithProviders(<ContactCard contact={contactWithOptionalData} />);

    const contactCard = screen.queryByRole('article', { name: /contact card/i });

    if (contactCard) {
      const contactAddress = within(contactCard).queryByRole('paragraph', {
        name: /contact card address/i,
      });
      expect(contactAddress).toBeInTheDocument();
      if (contactAddress) {
        expect(contactAddress.tagName).toBe('P');
        expect(contactAddress.textContent).toBe(contactWithOptionalData.address);
      }
    }
  });

  it('should not render contact card address when address is not available', async () => {
    renderWithProviders(<ContactCard contact={contactWithoutOptionalData} />);

    const contactCard = screen.queryByRole('article', { name: /contact card/i });

    if (contactCard) {
      const contactAddress = within(contactCard).queryByRole('paragraph', {
        name: /contact card address/i,
      });
      expect(contactAddress).not.toBeInTheDocument();
    }
  });

  it('should render contact card phone after loading', async () => {
    renderWithProviders(<ContactCard contact={contactWithoutOptionalData} />);

    const contactCard = screen.queryByRole('article', { name: /contact card/i });

    if (contactCard) {
      const contactPhoneLink = within(contactCard).queryByRole('link', {
        name: /contact card phone link/i,
      });
      expect(contactPhoneLink).toBeInTheDocument();
      if (contactPhoneLink) {
        expect(contactPhoneLink.tagName).toBe('A');
        expect(contactPhoneLink.getAttribute('href')).toBe(
          `tel:${contactWithoutOptionalData.phone}`
        );
      }
    }
  });

  it('should render contact card phone bottom after loading', async () => {
    renderWithProviders(<ContactCard contact={contactWithoutOptionalData} />);

    const contactCard = screen.queryByRole('article', { name: /contact card/i });

    if (contactCard) {
      const contactPhoneLink = within(contactCard).queryByRole('button', {
        name: /contact card phone/i,
      });
      expect(contactPhoneLink).toBeInTheDocument();
      if (contactPhoneLink) {
        expect(contactPhoneLink.tagName).toBe('P');
        await userEvent.click(contactPhoneLink);
        expect(contactPhoneLink).toHaveTextContent('Phone copied');
      }
    }
  });
});
