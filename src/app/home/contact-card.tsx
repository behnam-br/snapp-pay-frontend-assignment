import { useCallback } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';

import { useSetContactData } from '@/api/get-contact/get-contact.hook';
import { Contact } from '@/api/get-contact/get-contact.types';
import { PhoneIcon } from '@/components/icons/phone';
import { Link } from '@/lib/router/link';
import { useCopyFeedback } from '@/shared/hooks/use-copy-feedback';
import { copyToClipboard } from '@/shared/utils/copy-to-clipboard';

export function ContactCard({ contact }: { contact: Contact }) {
  useSetContactData(contact);
  const { copied, setCopied } = useCopyFeedback(3000);

  const onCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!contact.phone) return;

      const ok = await copyToClipboard(e, contact.phone);
      if (ok) setCopied(true);
    },
    [contact.phone, setCopied]
  );

  const avatar = (
    <MuiLink
      to={`/contact/${contact.id}`}
      component={Link}
      sx={{ textDecoration: 'none' }}
      aria-label='contact card avatar link'
    >
      <Avatar
        src={contact.avatar ?? undefined}
        alt={contact.fullName}
        sx={{ width: 56, height: 56 }}
        aria-label='contact card avatar'
        role='img'
      >
        {contact.firstName?.[0]}
        {contact.lastName?.[0]}
      </Avatar>
    </MuiLink>
  );

  const fullName = (
    <MuiLink
      to={`/contact/${contact.id}`}
      component={Link}
      sx={{ textDecoration: 'none' }}
      aria-label='contact card full name link'
    >
      <Typography variant='h6' fontSize={17} noWrap aria-label='contact card full name'>
        {contact.fullName}
      </Typography>
    </MuiLink>
  );

  const address = (
    <>
      {contact.address && (
        <Typography
          variant='body2'
          fontSize={14}
          color='text.secondary'
          noWrap
          aria-label='contact card address'
        >
          {contact.address}
        </Typography>
      )}
    </>
  );

  const phoneLink = (
    <IconButton
      component='a'
      href={`tel:${contact.phone}`}
      onClick={(e) => {
        if (contact.phone) e.stopPropagation();
      }}
      aria-label='contact card phone link'
    >
      <PhoneIcon />
    </IconButton>
  );

  return (
    <Card variant='outlined' component='article' aria-label='contact card'>
      <CardContent>
        <Stack direction='row' spacing={2} alignItems='flex-start'>
          {avatar}

          <Stack spacing={0.25} sx={{ minWidth: 0, flex: 1, pt: 1 }}>
            {fullName}
            {address}
          </Stack>

          {phoneLink}
        </Stack>
        <Divider sx={{ my: 2 }} />

        <Stack direction='row' justifyContent='space-between' alignItems='baseline'>
          <Typography variant='caption' color='text.secondary'>
            Phone
          </Typography>
          <Typography
            role='button'
            aria-label='contact card phone'
            tabIndex={0}
            variant='body2'
            onClick={onCopy}
            color={copied ? 'success.main' : 'text.secondary'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
              }
            }}
            sx={{ cursor: 'pointer', userSelect: 'text' }}
          >
            {copied ? 'Phone copied' : contact.phone}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
