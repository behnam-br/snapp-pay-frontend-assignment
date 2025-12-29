import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';

import { FirstName } from '@/app/home/components/search-form/first-name';
import { LastName } from '@/app/home/components/search-form/last-name';
import { Phone } from '@/app/home/components/search-form/phone';
import {
  type SearchFormDto,
  searchFormSchema,
} from '@/app/home/components/search-form/search-form.schema';
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

  // const values = methods.watch();

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
