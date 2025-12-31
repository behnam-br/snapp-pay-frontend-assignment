import { useEffect, useMemo } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import { getContact } from '@/api/get-contact/get-contact.api';
import { ApiError, ApiResponse } from '@/lib/axios/utils/api-types';

import type { Contact } from '@/api/get-contact/get-contact.types';

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

export function useSetContactData(contact: Contact) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const contactResponse: ApiResponse<Contact> = {
      data: contact,
      message: 'Ok',
      status: 200,
    };
    queryClient.setQueryData(contactKeys.detail(contact.id), contactResponse);
  }, [contact, queryClient]);
}

export function useGetContactData(ids: number[]) {
  const queryClient = useQueryClient();
  return useMemo(() => {
    return ids.map((id) => queryClient.getQueryData<ApiResponse<Contact>>(contactKeys.detail(id)));
  }, [ids, queryClient]);
}

export function useGetContactDataByIds(ids: number[], existingIds: number[]) {
  const queryClient = useQueryClient();
  return useMemo(() => {
    return ids.map((id) =>
      queryClient.ensureQueryData({
        queryKey: contactKeys.detail(id),
        queryFn: ({ signal }) => getContact(id, { signal }),
      })
    );
  }, [ids, queryClient]);
}
