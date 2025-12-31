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
    <Stack spacing={1.25} component='section' aria-label='contact main'>
      <FieldRow
        label='Phone'
        value={
          <MuiLink
            href={`tel:${contact?.phone}`}
            sx={{ textDecoration: 'none' }}
            onClick={(e) => e.stopPropagation()}
            aria-label='contact main phone'
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
              aria-label='contact main email'
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
              aria-label='contact main telegram'
            >
              {contact?.telegram}
            </MuiLink>
          ) : undefined
        }
      />

      <FieldRow
        label='Company'
        value={contact?.company ?? undefined}
        ariaLabel='contact main company'
      />
      <FieldRow
        label='Address'
        value={contact?.address ?? undefined}
        ariaLabel='contact main address'
      />

      <Divider sx={{ my: 1 }} />

      <FieldRow
        label='Created'
        value={formatDate(contact?.createdAt ?? 0)}
        ariaLabel='contact main created'
      />
      <FieldRow
        label='Updated'
        value={formatDate(contact?.updatedAt ?? 0)}
        ariaLabel='contact main updated'
      />
    </Stack>
  );
}

function FieldRow({
  label,
  value,
  ariaLabel,
}: {
  label: string;
  value?: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='baseline' spacing={2}>
      <Typography variant='caption' color='text.secondary'>
        {label}
      </Typography>

      <Stack direction='row' spacing={1} alignItems='center' sx={{ minWidth: 0 }}>
        <Typography
          variant='body2'
          sx={{ wordBreak: 'break-word', textAlign: 'right' }}
          aria-label={ariaLabel}
        >
          {value ?? <span style={{ opacity: 0.6 }}>—</span>}
        </Typography>
      </Stack>
    </Stack>
  );
}
