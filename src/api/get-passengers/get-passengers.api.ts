import { AxiosError } from 'axios';

import { errorAdapter, responseAdapter } from '@/lib/axios/adapters';
import { ApiResponse } from '@/lib/axios/api-types';
import { http } from '@/lib/axios/http';

import type { GetPassengersParams, PassengerListResponse } from '@/api/passenger.types';

const getPassengersEndpoint = '/passenger';

export async function getPassengers(
  params?: GetPassengersParams,
  options?: { signal?: AbortSignal }
): Promise<ApiResponse<PassengerListResponse>> {
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
    const response = await http.get<PassengerListResponse>(getPassengersEndpoint, {
      params: queryParams,
      signal: options?.signal,
    });
    return <ApiResponse<PassengerListResponse>>responseAdapter(response);
  } catch (error: unknown) {
    return Promise.reject(await errorAdapter(error as AxiosError));
  }
}
