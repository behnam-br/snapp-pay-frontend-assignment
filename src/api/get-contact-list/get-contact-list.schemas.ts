import { z } from 'zod';

import { contactSchema } from '@/api/get-contact/get-contact.schemas';

export const contactListSchema = z.object({
  meta: z.object({
    skipped: z.number(),
    limit: z.number(),
    total: z.number(),
    criteria: z.object({
      first_name: z.object({ contains: z.string().optional() }).optional(),
      last_name: z.object({ contains: z.string().optional() }).optional(),
      phone: z.object({ contains: z.string().optional() }).optional(),
    }),
  }),
  items: z.array(contactSchema),
});

export type ContactListDto = z.infer<typeof contactListSchema>;
