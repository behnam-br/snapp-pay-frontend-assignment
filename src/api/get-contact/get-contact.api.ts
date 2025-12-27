import { AxiosError } from 'axios';

import { errorAdapter, responseAdapter } from '@/lib/axios/adapters';
import { ApiResponse } from '@/lib/axios/api-types';
import { http } from '@/lib/axios/http';

import type { Contact } from '@/api/contact.types';

const getContactEndpoint = '/passenger';

export async function getContact(
  id: number,
  options?: { signal?: AbortSignal }
): Promise<ApiResponse<Contact>> {
  try {
    const response = await http.get<Contact>(`${getContactEndpoint}/${id}`, {
      signal: options?.signal,
    });
    return <ApiResponse<Contact>>responseAdapter(response);
  } catch (error: unknown) {
    return Promise.reject(await errorAdapter(error as AxiosError));
  }
}
