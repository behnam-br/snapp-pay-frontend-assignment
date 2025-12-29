import { AxiosError } from 'axios';

import {
  mapContactList,
  mapContactListParams,
} from '@/api/get-contact-list/get-contact-list.mappers';
import { ContactListDto, contactListSchema } from '@/api/get-contact-list/get-contact-list.schemas';
import { ContactList, ContactListParams } from '@/api/get-contact-list/get-contact-list.types';
import { http } from '@/lib/axios/http';
import { errorAdapter, responseAdapter } from '@/lib/axios/utils/adapters';
import { ApiResponse } from '@/lib/axios/utils/api-types';
import { parseSchema } from '@/lib/axios/utils/parse-schema';

const getContactListEndpoint = '/passenger/';

export async function getContactList(
  params?: ContactListParams,
  options?: { signal?: AbortSignal }
): Promise<ApiResponse<ContactList>> {
  try {
    const mappedParams = mapContactListParams(params ?? ({} as ContactListParams));
    const response = await http.get<ContactList>(getContactListEndpoint, {
      params: {
        ...mappedParams,
        where: mappedParams.where ? JSON.stringify(mappedParams.where) : undefined,
      },
      signal: options?.signal,
    });
    const api = responseAdapter(response) as ApiResponse<ContactListDto>;
    try {
      const dto = await parseSchema(contactListSchema, { ...api.data });
      const mapped = mapContactList(dto);
      return <ApiResponse<ContactList>>{
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
