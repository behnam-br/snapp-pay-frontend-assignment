import { useMemo } from 'react';
import { Divider, Link as MuiLink, Stack, Typography } from '@mui/material';

import { Contact } from '@/api/get-contact/get-contact.types';
import { formatDate } from '@/shared/utils/format-date';
import { telegramToUrl } from '@/shared/utils/telegram-to-url';

export function ContactMain({ contact }: { contact: Contact }) {
  const telegramUrl = useMemo(
    () => (contact?.telegram ? telegramToUrl(contact.telegram) : null),
    [contact?.telegram]
  );

  return (
    <Stack spacing={1.25}>
      <FieldRow
        label='Phone'
        value={
          <MuiLink
            href={`tel:${contact?.phone}`}
            sx={{ textDecoration: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            {contact?.phone}
          </MuiLink>
        }
      />

      <FieldRow
        label='Email'
        value={
          contact?.email ? (
            <MuiLink
              href={`mailto:${contact?.email}`}
              sx={{ textDecoration: 'none' }}
              onClick={(e) => e.stopPropagation()}
            >
              {contact?.email}
            </MuiLink>
          ) : undefined
        }
      />

      <FieldRow
        label='Telegram'
        value={
          telegramUrl ? (
            <MuiLink
              href={telegramUrl}
              target='_blank'
              rel='noreferrer'
              sx={{ textDecoration: 'none' }}
              onClick={(e) => e.stopPropagation()}
            >
              {contact?.telegram}
            </MuiLink>
          ) : undefined
        }
      />

      <FieldRow label='Company' value={contact?.company ?? undefined} />
      <FieldRow label='Address' value={contact?.address ?? undefined} />

      <Divider sx={{ my: 1 }} />

      <FieldRow label='Created' value={formatDate(contact?.createdAt ?? 0)} />
      <FieldRow label='Updated' value={formatDate(contact?.updatedAt ?? 0)} />
    </Stack>
  );
}

function FieldRow({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='baseline' spacing={2}>
      <Typography variant='caption' color='text.secondary'>
        {label}
      </Typography>

      <Stack direction='row' spacing={1} alignItems='center' sx={{ minWidth: 0 }}>
        <Typography variant='body2' sx={{ wordBreak: 'break-word', textAlign: 'right' }}>
          {value ?? <span style={{ opacity: 0.6 }}>—</span>}
        </Typography>
      </Stack>
    </Stack>
  );
}
