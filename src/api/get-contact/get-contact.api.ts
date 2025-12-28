import { AxiosError } from 'axios';

import { mapContact } from '@/api/get-contact/get-contact.mappers';
import { ContactDto, ContactSchema } from '@/api/get-contact/get-contact.schemas';
import { http } from '@/lib/axios/http';
import { errorAdapter, responseAdapter } from '@/lib/axios/utils/adapters';
import { ApiResponse } from '@/lib/axios/utils/api-types';
import { parseSchema } from '@/lib/axios/utils/parse-schema';

import type { Contact } from '@/api/get-contact/get-contact.types';

const getContactEndpoint = '/passenger';

export async function getContact(
  id: number,
  options?: { signal?: AbortSignal }
): Promise<ApiResponse<Contact>> {
  try {
    const response = await http.get<Contact>(`${getContactEndpoint}/${id}`, {
      signal: options?.signal,
    });
    const api = responseAdapter(response) as ApiResponse<ContactDto>;
    try {
      const dto = await parseSchema(ContactSchema, { ...api.data });
      const mapped = mapContact(dto);
      return <ApiResponse<Contact>>{
        status: api.status,
        message: api.message,
        data: mapped,
      };
    } catch (error: unknown) {
      return Promise.reject(error);
    }
  } catch (error: unknown) {
    return Promise.reject(await errorAdapter(error as AxiosError));
  }
}
