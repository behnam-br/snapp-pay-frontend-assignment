import { screen, waitFor, within } from '@testing-library/dom';
import { describe } from 'vitest';

import { getContactListHandlers } from '@/api/get-contact-list/get-contact-list.handlers';
import { HomePage } from '@/app/home-page';
import { localStorageMock } from '@/test/mocks/local-storage';
import { server } from '@/test/mocks/server';
import { renderWithProviders } from '@/test/test-utils';

describe('HomePage', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue('[]');
  });

  server.use(getContactListHandlers.success);

  it('should render search form initially', async () => {
    renderWithProviders(<HomePage />);

    const searchForm = screen.queryByRole('form', { name: /search form/i });

    expect(searchForm).toBeInTheDocument();
  });

  it('should render contacts section initially', async () => {
    renderWithProviders(<HomePage />);

    const contactsSection = screen.queryByRole('region', { name: /contacts section/i });
    expect(contactsSection).toBeInTheDocument();
    if (contactsSection) {
      expect(contactsSection.tagName).toBe('SECTION');
      const contactsTitle = within(contactsSection).queryByRole('heading', {
        name: /contacts title/i,
      });
      expect(contactsTitle).toBeInTheDocument();
      if (contactsTitle) {
        expect(contactsTitle.tagName).toBe('H6');
      }
    }
  });

  it('should render visited contacts section initially', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([11, 12]));

    renderWithProviders(<HomePage />);

    const contactsSection = screen.queryByRole('region', { name: /contacts section visited/i });
    expect(contactsSection).toBeInTheDocument();
    if (contactsSection) {
      expect(contactsSection.tagName).toBe('SECTION');
      const contactsTitle = within(contactsSection).queryByRole('heading', {
        name: /contacts visited title/i,
      });
      expect(contactsTitle).toBeInTheDocument();
      if (contactsTitle) {
        expect(contactsTitle.tagName).toBe('H6');
      }
    }
  });

  it('should not render visited contacts section when no contacts visited', async () => {
    localStorageMock.getItem.mockReturnValue('[]');

    renderWithProviders(<HomePage />);

    const contactsSection = screen.queryByRole('region', { name: /contacts section visited/i });

    expect(contactsSection).not.toBeInTheDocument();
  });

  it('should render pagination bar initially', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(
      () => {
        const paginationBar = screen.queryByRole('navigation', { name: /pagination bar/i });
        expect(paginationBar).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should render pagination bar with correct page and count', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(
      () => {
        const paginationBar = screen.queryByRole('navigation', { name: /pagination bar/i });
        expect(paginationBar).toBeInTheDocument();
        if (paginationBar) {
          expect(paginationBar.tagName).toBe('NAV');
          const pagination = within(paginationBar).queryAllByRole('listitem');
          expect(pagination.find((el) => el.textContent === '1')?.textContent).toBeTruthy();
          expect(pagination.find((el) => el.textContent === '175')?.textContent).toBeTruthy();
        }
      },
      { timeout: 3000 }
    );
  });
});
