import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getContactList } from '@/api/get-contact-list/get-contact-list.api';
import { ContactList, ContactListParams } from '@/api/get-contact-list/get-contact-list.types';

import type { ApiError, ApiResponse } from '@/lib/axios/utils/api-types';
import type { UseQueryOptions } from '@tanstack/react-query';

export const contactListKeys = {
  all: ['contact-list'] as const,
  list: (params?: ContactListParams) => [...contactListKeys.all, 'list', params] as const,
};

type UseContactListOptions = Omit<
  UseQueryOptions<
    ApiResponse<ContactList>,
    ApiError<ContactListParams>,
    ApiResponse<ContactList>,
    ReturnType<typeof contactListKeys.list>
  >,
  'queryKey' | 'queryFn'
>;

export function useContactList(params?: ContactListParams, options?: UseContactListOptions) {
  return useQuery({
    queryKey: contactListKeys.list(params),
    queryFn: ({ signal }) => getContactList(params, { signal }),
    placeholderData: keepPreviousData,
    ...options,
  });
}
