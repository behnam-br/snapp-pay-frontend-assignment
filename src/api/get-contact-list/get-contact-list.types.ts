import { Contact } from '@/api/get-contact/get-contact.types';

export type ContactList = {
  items: Contact[];
  meta: {
    totalCount: number;
    totalPages: number;
    page: number;
  };
};

export type ContactListFilters = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  phone?: string | undefined;
};

export type ContactListParams = {
  page: number;
  limit: number;
  filters: ContactListFilters;
};

export type ContactListWhere = {
  first_name?: { contains: string | undefined };
  last_name?: { contains: string | undefined };
  phone?: { contains: string | undefined };
};

export type ContactListParamsDto = {
  skip: number;
  limit: number;
  where: ContactListWhere;
};
