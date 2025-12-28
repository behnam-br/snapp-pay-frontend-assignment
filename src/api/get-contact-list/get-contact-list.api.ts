import { AxiosError } from 'axios';

import {
  mapContactList,
  mapContactListParam,
} from '@/api/get-contact-list/get-contact-list.mappers';
import {
  ContactListDto,
  ContactListParamDto,
  ContactListSchema,
} from '@/api/get-contact-list/get-contact-list.schemas';
import { ContactList } from '@/api/get-contact-list/get-contact-list.types';
import { http } from '@/lib/axios/http';
import { errorAdapter, responseAdapter } from '@/lib/axios/utils/adapters';
import { ApiResponse } from '@/lib/axios/utils/api-types';
import { parseSchema } from '@/lib/axios/utils/parse-schema';
import { cleanUndefined } from '@/shared/utils/clean-undefined';

const getContactListEndpoint = '/passenger';

export async function getContactList(
  params?: ContactListParamDto,
  options?: { signal?: AbortSignal }
): Promise<ApiResponse<ContactList>> {
  try {
    const mappedParams = mapContactListParam(params ?? ({} as ContactListParamDto));
    mappedParams.where = { first_name: { contains: 'ab' } };
    const paramsClean = cleanUndefined<ContactListParamDto>(mappedParams);
    const response = await http.get<ContactList>(getContactListEndpoint, {
      params: paramsClean,
      signal: options?.signal,
    });
    const api = responseAdapter(response) as ApiResponse<ContactListDto>;
    try {
      const dto = await parseSchema(ContactListSchema, { ...api.data });
      const mapped = mapContactList(dto);
      console.log('mapped', mapped);
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
