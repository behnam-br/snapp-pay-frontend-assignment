import { describe, expect, it } from 'vitest';

import { SearchForm } from '@/app/home/search-form';
import { renderWithProviders, screen } from '@/test/test-utils';

describe('SearchForm', () => {
  it('should render search form', async () => {
    renderWithProviders(
      <SearchForm onSearch={() => {}} defaultValues={{ firstName: '', lastName: '', phone: '' }} />
    );

    const searchForm = screen.queryByRole('form', { name: /search form/i });
    expect(searchForm).toBeInTheDocument();
    if (searchForm) {
      expect(searchForm.tagName).toBe('FORM');
    }
  });

  it('should render search form first name input', async () => {
    renderWithProviders(
      <SearchForm onSearch={() => {}} defaultValues={{ firstName: '', lastName: '', phone: '' }} />
    );

    const firstNameInput = screen.queryByRole('textbox', { name: /first name/i });
    expect(firstNameInput).toBeInTheDocument();
    if (firstNameInput) {
      expect(firstNameInput.tagName).toBe('INPUT');
    }
  });

  it('should render search form last name input', async () => {
    renderWithProviders(
      <SearchForm onSearch={() => {}} defaultValues={{ firstName: '', lastName: '', phone: '' }} />
    );

    const lastNameInput = screen.queryByRole('textbox', { name: /last name/i });
    expect(lastNameInput).toBeInTheDocument();
    if (lastNameInput) {
      expect(lastNameInput.tagName).toBe('INPUT');
    }
  });

  it('should render search form phone input', async () => {
    renderWithProviders(
      <SearchForm onSearch={() => {}} defaultValues={{ firstName: '', lastName: '', phone: '' }} />
    );

    const phoneInput = screen.queryByRole('textbox', { name: /phone/i });
    expect(phoneInput).toBeInTheDocument();
    if (phoneInput) {
      expect(phoneInput.tagName).toBe('INPUT');
    }
  });

  it('should render search form search button', async () => {
    renderWithProviders(
      <SearchForm onSearch={() => {}} defaultValues={{ firstName: '', lastName: '', phone: '' }} />
    );

    const searchButton = screen.queryByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    if (searchButton) {
      expect(searchButton.tagName).toBe('BUTTON');
    }
  });

  it('should render search form reset button', async () => {
    renderWithProviders(
      <SearchForm onSearch={() => {}} defaultValues={{ firstName: '', lastName: '', phone: '' }} />
    );

    const resetButton = screen.queryByRole('button', { name: /reset/i });
    expect(resetButton).toBeInTheDocument();
    if (resetButton) {
      expect(resetButton.tagName).toBe('BUTTON');
    }
  });
});
