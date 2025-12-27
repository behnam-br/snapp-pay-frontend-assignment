import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getPassenger } from '@/api/get-passenger/get-passenger.api';
import { ApiError, ApiResponse } from '@/lib/axios/api-types';

import type { Passenger } from '@/api/passenger.types';

export const passengerKeys = {
  all: ['passenger'] as const,
  detail: (id: number) => [...passengerKeys.all, id] as const,
};

type UsePassengerOptions = Omit<
  UseQueryOptions<
    ApiResponse<Passenger>,
    ApiError<unknown>,
    ApiResponse<Passenger>,
    ReturnType<typeof passengerKeys.detail>
  >,
  'queryKey' | 'queryFn'
>;

export function usePassenger(id: number, options?: UsePassengerOptions) {
  return useQuery({
    queryKey: passengerKeys.detail(id),
    queryFn: ({ signal }) => getPassenger(id, { signal }),
    enabled: id > 0,
    ...options,
  });
}
