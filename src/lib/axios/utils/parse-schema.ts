import z from 'zod';

import { invalidResponseError } from '@/lib/axios/utils/adapters';

export function parseSchema<T>(schema: z.ZodSchema<T>, data: unknown): T | Promise<never> {
  try {
    return schema.parse(data);
  } catch (error: unknown) {
    if (__DEV__) {
      console.log('invalid response: ', error);
    }
    throw invalidResponseError;
  }
}
