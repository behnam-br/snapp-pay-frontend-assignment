import { AxiosError } from 'axios';

import { errorAdapter, responseAdapter } from '@/lib/axios/adapters';
import { ApiResponse } from '@/lib/axios/api-types';
import { http } from '@/lib/axios/http';

import type { Passenger } from '@/api/passenger.types';

const getPassengerEndpoint = '/passenger';

export async function getPassenger(
  id: number,
  options?: { signal?: AbortSignal }
): Promise<ApiResponse<Passenger>> {
  try {
    const response = await http.get<Passenger>(`${getPassengerEndpoint}/${id}`, {
      signal: options?.signal,
    });
    return <ApiResponse<Passenger>>responseAdapter(response);
  } catch (error: unknown) {
    return Promise.reject(await errorAdapter(error as AxiosError));
  }
}
