import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getPassengers } from '@/api/get-passengers/get-passengers.api';

import type { GetPassengersParams, PassengerListResponse } from '@/api/passenger.types';
import type { ApiError, ApiResponse } from '@/lib/axios/api-types';
import type { UseQueryOptions } from '@tanstack/react-query';

export const passengersKeys = {
  all: ['passengers'] as const,
  list: (params?: GetPassengersParams) => [...passengersKeys.all, 'list', params] as const,
};

type UsePassengersOptions = Omit<
  UseQueryOptions<
    ApiResponse<PassengerListResponse>,
    ApiError<unknown>,
    ApiResponse<PassengerListResponse>,
    ReturnType<typeof passengersKeys.list>
  >,
  'queryKey' | 'queryFn'
>;

export function usePassengers(params?: GetPassengersParams, options?: UsePassengersOptions) {
  return useQuery({
    queryKey: passengersKeys.list(params),
    queryFn: ({ signal }) => getPassengers(params, { signal }),
    placeholderData: keepPreviousData,
    ...options,
  });
}
