import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

import { type SearchFormDto } from '@/app/home/components/search-form/search-form.schema';

export function Phone() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SearchFormDto>();

  return (
    <TextField
      {...register('phone')}
      label='Phone'
      placeholder='Enter phone number'
      fullWidth
      size='small'
      error={!!errors.phone}
      helperText={errors.phone?.message}
    />
  );
}
