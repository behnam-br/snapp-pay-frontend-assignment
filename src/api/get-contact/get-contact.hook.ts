import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getContact } from '@/api/get-contact/get-contact.api';
import { ApiError, ApiResponse } from '@/lib/axios/api-types';

import type { Contact } from '@/api/contact.types';

export const contactKeys = {
  all: ['contact'] as const,
  detail: (id: number) => [...contactKeys.all, id] as const,
};

type UseContactOptions = Omit<
  UseQueryOptions<
    ApiResponse<Contact>,
    ApiError<unknown>,
    ApiResponse<Contact>,
    ReturnType<typeof contactKeys.detail>
  >,
  'queryKey' | 'queryFn'
>;

export function useContact(id: number, options?: UseContactOptions) {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn: ({ signal }) => getContact(id, { signal }),
    enabled: id > 0,
    ...options,
  });
}
