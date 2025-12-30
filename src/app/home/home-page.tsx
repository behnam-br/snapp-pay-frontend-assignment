import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { ContactListParams } from '@/api/get-contact-list/get-contact-list.types';
import { Contacts } from '@/app/home/components/contacts';
import { ContactsVisited } from '@/app/home/components/contacts-visited';
import { SearchForm } from '@/app/home/components/search-form/search-form';
import { SearchFormDto } from '@/app/home/components/search-form/search-form.schema';
import { MainContainer } from '@/components/layout/main-container';
import { PaginationBar } from '@/components/ui/pagination-bar';

export const HomePage = () => {
  const [params, setParams] = useState<ContactListParams>({
    page: 1,
    limit: 12,
    filters: {},
  });
  const [totalPages, setTotalPages] = useState(0);

  const deferredParams = useDeferredValue(params);

  const onChangeTotalPages = useCallback((totalPages: number) => {
    setTotalPages(totalPages);
  }, []);

  const onPageChange = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const onSearch = useCallback((search: SearchFormDto) => {
    setParams((prev) => ({ ...prev, page: 1, filters: { ...prev.filters, ...search } }));
  }, []);

  const visitedContactIds = useMemo(
    () =>
      JSON.parse(localStorage.getItem('visitedContactIds') ?? '[]').map((id: string) => Number(id)),
    []
  );

  return (
    <MainContainer>
      <Grid container spacing={2}>
        <SearchForm
          defaultValues={{ firstName: '', lastName: '', phone: '' }}
          onSearch={onSearch}
        />
        {!!visitedContactIds.length && (
          <>
            <Typography variant='h6'>Contacts Visited</Typography>
            <ContactsVisited ids={visitedContactIds} />
          </>
        )}
        <Typography variant='h6'>Contacts</Typography>
        <Contacts params={deferredParams} onChangeTotalPages={onChangeTotalPages} />
        <PaginationBar
          incomingPage={params.page}
          incomingCount={totalPages}
          onPageChange={onPageChange}
        />
      </Grid>
    </MainContainer>
  );
};
