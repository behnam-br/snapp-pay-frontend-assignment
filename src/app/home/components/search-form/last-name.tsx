import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

import { type SearchFormDto } from '@/app/home/components/search-form/search-form.schema';

export function LastName() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SearchFormDto>();

  return (
    <TextField
      {...register('lastName')}
      label='Last Name'
      placeholder='Enter last name'
      fullWidth
      size='small'
      error={!!errors.lastName}
      helperText={errors.lastName?.message}
    />
  );
}
