import { z } from 'zod';

export const contactSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z
    .string()
    .refine(
      (val) => !val || /^[0-9+\-\s()]*$/.test(val),
      'Phone can only contain numbers and + - ( )'
    ),
  gender: z.string(),
  email: z.string().nullable(),
  note: z.string().nullable(),
  telegram: z.string().nullable(),
  avatar: z.string().nullable(),
  company: z.string().nullable(),
  address: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type ContactDto = z.infer<typeof contactSchema>;
