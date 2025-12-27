import { setupServer } from 'msw/node';

import { getPassengerHandler } from '@/api/get-passenger/get-passenger.msw';
import { getPassengersHandler } from '@/api/get-passengers/get-passengers.msw';

export const handlers = [getPassengersHandler, getPassengerHandler];
export const server = setupServer(...handlers);
