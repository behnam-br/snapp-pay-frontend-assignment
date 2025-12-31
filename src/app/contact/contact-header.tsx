import { Avatar, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import { Contact } from '@/api/get-contact/get-contact.types';
import { PhoneIcon } from '@/components/icons/phone';

export function ContactHeader({ contact }: { contact: Contact }) {
  const avatar = (
    <Avatar
      src={contact?.avatar ?? undefined}
      alt={contact?.fullName ?? ''}
      sx={{ width: 72, height: 72 }}
      aria-label='contact header avatar'
      role='img'
    >
      {contact?.firstName?.[0]}
      {contact?.lastName?.[0]}
    </Avatar>
  );

  const info = (
    <Stack spacing={0.5} sx={{ minWidth: 0, flex: 1 }}>
      <Typography variant='h5' noWrap aria-label='contact header full name'>
        {contact?.fullName}
      </Typography>

      <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
        {contact?.company && (
          <Chip
            size='small'
            label={'Company: ' + contact.company}
            aria-label='contact header company'
            role='chip'
          />
        )}
        <Chip
          size='small'
          label={'Gender: ' + contact.gender}
          variant='outlined'
          aria-label='contact header gender'
          role='chip'
        />
      </Stack>

      {contact?.address && (
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }} noWrap>
          {contact?.address}
        </Typography>
      )}
    </Stack>
  );

  const call = (
    <Stack direction='row' spacing={1}>
      <Tooltip title='Call'>
        <span>
          <IconButton
            aria-label='contact header phone'
            component='a'
            href={contact?.phone ? `tel:${contact?.phone}` : undefined}
            disabled={!contact?.phone}
          >
            <PhoneIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );

  return (
    <Stack
      component={'section'}
      aria-label='contact header'
      direction='row'
      spacing={2}
      alignItems='flex-start'
    >
      {avatar}
      {info}
      {call}
    </Stack>
  );
}
