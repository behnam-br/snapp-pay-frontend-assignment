import z from 'zod';

export const searchFormSchema = z.object({
  firstName: z
    .string()
    .max(40, 'First name must be less than 40 characters')
    .transform((val) => val.trim())
    .optional(),
  lastName: z
    .string()
    .max(40, 'Last name must be less than 40 characters')
    .transform((val) => val.trim())
    .optional(),
  phone: z
    .string()
    // validate user typed only allowed chars
    .refine((val) => /^[0-9+\-\s()]*$/.test(val), 'Phone can only contain numbers and + - ( )')
    // normalize: keep digits only, drop a single leading 0
    .transform((val) => {
      const digits = val.replace(/\D/g, ''); // remove spaces, -, (), +
      return digits.startsWith('0') ? digits.slice(1) : digits;
    })
    // validate length AFTER normalization
    .refine((digits) => digits.length <= 10, 'Phone must be 10 digits (without leading 0)')
    .optional(),
});

export type SearchFormDto = z.infer<typeof searchFormSchema>;
