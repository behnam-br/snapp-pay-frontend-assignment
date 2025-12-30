import { Card, CardContent, Divider, Stack } from '@mui/material';

import { Contact } from '@/api/get-contact/get-contact.types';
import { ContactBackLink } from '@/app/contact/contact-back-link';
import { ContactFooter } from '@/app/contact/contact-footer';
import { ContactHeader } from '@/app/contact/contact-header';
import { ContactMain } from '@/app/contact/contact-main';
import { MainContainer } from '@/components/layout/main-container';

export function ContactDetail({ contact }: { contact: Contact }) {
  return (
    <MainContainer>
      <Stack spacing={2} sx={{ mx: 'auto', maxWidth: 900, width: '100%', padding: 2 }}>
        <ContactBackLink />
        <Card variant='outlined'>
          <CardContent>
            <ContactHeader contact={contact} />
            <Divider sx={{ my: 2 }} />
            <ContactMain contact={contact} />
            <ContactFooter contact={contact} />
          </CardContent>
        </Card>
      </Stack>
    </MainContainer>
  );
}
