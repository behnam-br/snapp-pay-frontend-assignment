import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, TextField } from '@mui/material';

import { type SearchFormDto, searchFormSchema } from '@/app/home/search-form.schema';
import { SearchIcon } from '@/components/icons/search';

export type SearchFormProps = {
  onSearch: (values: SearchFormDto) => void;
  defaultValues?: Partial<SearchFormDto>;
};

export function SearchForm({ onSearch, defaultValues }: SearchFormProps) {
  const methods = useForm<SearchFormDto>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    onSearch(data);
  });

  const handleReset = () => {
    methods.reset();
    onSearch({
      ...defaultValues,
    });
  };

  return (
    <FormProvider {...methods}>
      <Box component='form' onSubmit={handleSubmit} width='100%' padding={2}>
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={2}
          width='100%'
          alignItems='flex-start'
        >
          <FirstName />
          <LastName />
          <Phone />
          <Stack direction='row' spacing={1} sx={{ minWidth: 'fit-content' }}>
            <Button type='submit' variant='contained' size='small'>
              <SearchIcon sx={{ fontSize: 30 }} />
            </Button>
            <Button
              type='button'
              variant='outlined'
              size='small'
              onClick={handleReset}
              sx={{ textTransform: 'none' }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>
    </FormProvider>
  );
}

function FirstName() {
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

function LastName() {
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

function Phone() {
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
