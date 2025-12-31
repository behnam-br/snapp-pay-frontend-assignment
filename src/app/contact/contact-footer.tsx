import { Divider, Typography } from '@mui/material';

import { Contact } from '@/api/get-contact/get-contact.types';

export function ContactFooter({ contact }: { contact: Contact }) {
  if (!contact.note) return <></>;
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Typography variant='caption' color='text.secondary'>
        Note
      </Typography>
      <Typography
        variant='body2'
        sx={{ whiteSpace: 'pre-line', mt: 0.5 }}
        aria-label='contact note'
      >
        {contact?.note}
      </Typography>
    </>
  );
}
