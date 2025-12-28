import { ContactDto } from '@/api/get-contact/get-contact.schemas';
import { Contact } from '@/api/get-contact/get-contact.types';
import { Paginated, PaginatedParam } from '@/lib/axios/utils/paginated.schemas';

export type ContactListCriteriaKeys = Array<
  keyof Pick<Contact, 'firstName' | 'lastName' | 'phone'>
>;
export type ContactList = Paginated<ContactListCriteriaKeys, Contact>;

export type ContactListParamKeys = Array<
  keyof Pick<ContactDto, 'first_name' | 'last_name' | 'phone'>
>;

export type ContactListParam = PaginatedParam<ContactListParamKeys>;
