import { z } from 'zod';

export const ContactSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  gender: z.string(),
  email: z.string().nullable(),
  note: z.string().nullable(),
  telegram: z.string().nullable(),
  avatar: z.string().nullable(),
  company: z.string().nullable(),
  address: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ContactDto = z.infer<typeof ContactSchema>;
