import { Box, Grid } from '@mui/material';

import { Contact } from '@/api/get-contact/get-contact.types';
import { ContactCard } from '@/app/home/contact-card';
import { ListOverlay } from '@/components/ui/list-overlay';

export type ContactListProps = {
  items: Contact[];
  isFetching: boolean;
  ariaLabel: string;
};

export function ContactList({ items, isFetching, ariaLabel }: ContactListProps) {
  return (
    <Box component='section' aria-label={ariaLabel} width='100%' position='relative'>
      <ListOverlay isFetching={isFetching} />
      <Grid
        component='ul'
        container
        spacing={2}
        padding={2}
        width='100%'
        sx={{ listStyle: 'none' }}
      >
        {items.map((p) => {
          return (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} component={'li'} key={p.id}>
              <ContactCard contact={p} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
