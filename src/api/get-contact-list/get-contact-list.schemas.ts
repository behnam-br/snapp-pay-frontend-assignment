import { z } from 'zod';

import { ContactDto, ContactSchema } from '@/api/get-contact/get-contact.schemas';
import { Contact } from '@/api/get-contact/get-contact.types';
import {
  createPaginatedParamSchema,
  createPaginatedSchema,
} from '@/lib/axios/utils/paginated.schemas';
import { keysOf } from '@/shared/types/keys-of';

export const contactCriteriaDtoKeys = keysOf<ContactDto>()('first_name', 'last_name', 'phone');

export const ContactListSchema = createPaginatedSchema(ContactSchema, contactCriteriaDtoKeys);

export type ContactListDto = z.infer<typeof ContactListSchema>;

export const contactParamDtoKeys = keysOf<Contact>()('firstName', 'lastName', 'phone');

export const ContactListParamSchema = createPaginatedParamSchema(contactParamDtoKeys);

export type ContactListParamDto = z.infer<typeof ContactListParamSchema>;
