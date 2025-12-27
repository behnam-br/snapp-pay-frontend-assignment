import { AxiosError } from 'axios';

import { errorAdapter, responseAdapter } from '@/lib/axios/adapters';
import { ApiResponse } from '@/lib/axios/api-types';
import { http } from '@/lib/axios/http';

import type { ContactListResponse, GetContactListParams } from '@/api/contact.types';

const getContactListEndpoint = '/passenger';

export async function getContactList(
  params?: GetContactListParams,
  options?: { signal?: AbortSignal }
): Promise<ApiResponse<ContactListResponse>> {
  try {
    const queryParams: Record<string, string> = {};
    if (params?.limit !== undefined) {
      queryParams.limit = String(params.limit);
    }
    if (params?.skip !== undefined) {
      queryParams.skip = String(params.skip);
    }
    if (params?.sort) {
      queryParams.sort = params.sort;
    }
    if (params?.where) {
      queryParams.where = JSON.stringify(params.where);
    }
    const response = await http.get<ContactListResponse>(getContactListEndpoint, {
      params: queryParams,
      signal: options?.signal,
    });
    return <ApiResponse<ContactListResponse>>responseAdapter(response);
  } catch (error: unknown) {
    return Promise.reject(await errorAdapter(error as AxiosError));
  }
}
