import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getContactList } from '@/api/get-contact-list/get-contact-list.api';

import type { ContactListResponse, GetContactListParams } from '@/api/contact.types';
import type { ApiError, ApiResponse } from '@/lib/axios/api-types';
import type { UseQueryOptions } from '@tanstack/react-query';

export const contactListKeys = {
  all: ['contact-list'] as const,
  list: (params?: GetContactListParams) => [...contactListKeys.all, 'list', params] as const,
};

type UseContactListOptions = Omit<
  UseQueryOptions<
    ApiResponse<ContactListResponse>,
    ApiError<unknown>,
    ApiResponse<ContactListResponse>,
    ReturnType<typeof contactListKeys.list>
  >,
  'queryKey' | 'queryFn'
>;

export function useContactList(params?: GetContactListParams, options?: UseContactListOptions) {
  return useQuery({
    queryKey: contactListKeys.list(params),
    queryFn: ({ signal }) => getContactList(params, { signal }),
    placeholderData: keepPreviousData,
    ...options,
  });
}
