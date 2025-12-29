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

export function ContactCard(contact: Contact) {
  return (
    <Card variant='outlined'>
      <CardContent>
        <ContactCardTop contact={contact} />
        <ContactCardBottom phone={contact.phone} />
      </CardContent>
    </Card>
  );
}

function ContactCardTop({ contact }: { contact: Contact }) {
  useSetContactData(contact);

  return (
    <Stack direction='row' spacing={2} alignItems='flex-start'>
      <MuiLink to={`/contact/${contact.id}`} component={Link} sx={{ textDecoration: 'none' }}>
        <Avatar
          src={contact.avatar ?? undefined}
          alt={contact.fullName}
          sx={{ width: 56, height: 56 }}
        >
          {contact.firstName?.[0]}
          {contact.lastName?.[0]}
        </Avatar>
      </MuiLink>

      <Stack spacing={0.25} sx={{ minWidth: 0, flex: 1, pt: 1 }}>
        <MuiLink to={`/contact/${contact.id}`} component={Link} sx={{ textDecoration: 'none' }}>
          <Typography variant='h6' fontSize={17} noWrap>
            {contact.fullName}
          </Typography>
        </MuiLink>

        {contact.address && (
          <Typography variant='body2' fontSize={14} color='text.secondary' noWrap>
            {contact.address}
          </Typography>
        )}
      </Stack>

      <IconButton
        aria-label={`Call ${contact.fullName}`}
        component='a'
        href={`tel:${contact.phone}`}
        onClick={(e) => {
          if (contact.phone) e.stopPropagation();
        }}
      >
        <PhoneIcon />
      </IconButton>
    </Stack>
  );
}

function ContactCardBottom({ phone }: Pick<Contact, 'phone'>) {
  const { copied, setCopied } = useCopyFeedback(3000);

  const onCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!phone) return;

      const ok = await copyToClipboard(e, phone);
      if (ok) setCopied(true);
    },
    [phone, setCopied]
  );

  return (
    <>
      <Divider sx={{ my: 2 }} />

      <Stack direction='row' justifyContent='space-between' alignItems='baseline'>
        <Typography variant='caption' color='text.secondary'>
          Phone
        </Typography>
        <Typography
          role='button'
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
          {copied ? 'Phone copied' : phone}
        </Typography>
      </Stack>
    </>
  );
}
