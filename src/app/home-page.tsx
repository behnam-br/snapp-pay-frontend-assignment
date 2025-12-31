import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { ContactListParams } from '@/api/get-contact-list/get-contact-list.types';
import { Contacts } from '@/app/home/contacts';
import { ContactsVisited } from '@/app/home/contacts-visited';
import { SearchForm } from '@/app/home/search-form';
import { SearchFormDto } from '@/app/home/search-form.schema';
import { MainContainer } from '@/components/layout/main-container';
import { PaginationBar } from '@/components/ui/pagination-bar';
import envs from '@/envs';

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
      JSON.parse(localStorage.getItem(envs.VISITED_CONTACT_IDS_KEY) ?? '[]').map((id: string) =>
        Number(id)
      ),
    []
  );

  const searchForm = (
    <SearchForm defaultValues={{ firstName: '', lastName: '', phone: '' }} onSearch={onSearch} />
  );

  const contactsVisited = (
    <>
      {!!visitedContactIds.length && (
        <Box component={'section'} aria-label='contacts section visited' width='100%'>
          <Typography variant='h6' aria-label='contacts visited title'>
            Contacts Visited
          </Typography>
          <ContactsVisited ids={visitedContactIds} />
        </Box>
      )}
    </>
  );

  const contacts = (
    <Box component={'section'} aria-label='contacts section' width='100%'>
      <Typography variant='h6' aria-label='contacts title'>
        Contacts
      </Typography>
      <Contacts params={deferredParams} onChangeTotalPages={onChangeTotalPages} />
    </Box>
  );

  const paginationBar = (
    <PaginationBar
      incomingPage={params.page}
      incomingCount={totalPages}
      onPageChange={onPageChange}
    />
  );

  return (
    <MainContainer>
      <Grid container spacing={2}>
        {searchForm}
        {contactsVisited}
        {contacts}
        {paginationBar}
      </Grid>
    </MainContainer>
  );
};
