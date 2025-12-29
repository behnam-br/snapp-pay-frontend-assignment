import { Grid } from '@mui/material';

import { Contact } from '@/api/get-contact/get-contact.types';
import { ContactCard } from '@/app/home/components/contact-card';
import { ListOverlay } from '@/components/ui/list-overlay';

export type ContactListProps = {
  items: Contact[];
  isFetching: boolean;
};

export function ContactList({ items, isFetching }: ContactListProps) {
  return (
    <Grid container spacing={2} padding={2} width='100%' position='relative'>
      <ListOverlay isFetching={isFetching} />
      {items.map((p) => {
        return (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={p.id}>
            <ContactCard {...p} />
          </Grid>
        );
      })}
    </Grid>
  );
}
