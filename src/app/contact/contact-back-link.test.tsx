import { ContactBackLink } from '@/app/contact/contact-back-link';
import { renderWithProviders, screen } from '@/test/test-utils';

describe('ContactBackLink', () => {
  it('should render contact back link', async () => {
    renderWithProviders(<ContactBackLink />);
    const contactBackLink = screen.queryByRole('link', { name: /contact back link/i });
    expect(contactBackLink).toBeInTheDocument();
    if (contactBackLink) {
      expect(contactBackLink.getAttribute('href')).toBe('/');
    }
  });
});
