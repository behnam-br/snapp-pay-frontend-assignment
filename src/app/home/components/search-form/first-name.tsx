import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

import { type SearchFormDto } from '@/app/home/components/search-form/search-form.schema';

export function FirstName() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SearchFormDto>();

  return (
    <TextField
      {...register('firstName')}
      label='First Name'
      placeholder='Enter first name'
      fullWidth
      size='small'
      error={!!errors.firstName}
      helperText={errors.firstName?.message}
    />
  );
}
