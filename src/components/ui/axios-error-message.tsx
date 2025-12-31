import { Box, Button, Typography } from '@mui/material';

import { AxiosErrorCodeKeys } from '@/lib/axios/utils/api-types';

const FRIENDLY_MESSAGES: Record<AxiosErrorCodeKeys, { title: string; body: string; cta?: string }> =
  {
    [AxiosErrorCodeKeys.REQUEST_SETUP_ERROR]: {
      title: 'Something went wrong on our side',
      body: "We couldn't start the request. Please try again in a moment.",
      cta: 'Try again',
    },
    [AxiosErrorCodeKeys.API_ERROR]: {
      title: 'The server returned an error',
      body: "We hit a problem while fetching your data. Let's give it another try.",
      cta: 'Try again',
    },
    [AxiosErrorCodeKeys.INVALID_RESPONSE]: {
      title: 'We got an unexpected response',
      body: "The server sent data we didn't understand. Please try again.",
      cta: 'Reload',
    },
    [AxiosErrorCodeKeys.NO_INTERNET]: {
      title: 'You’re offline',
      body: 'Check your internet connection and try again.',
      cta: 'Retry',
    },
    [AxiosErrorCodeKeys.SERVER_UNREACHABLE]: {
      title: 'Server is taking too long to respond',
      body: 'Looks like the service is unreachable right now. Please try again shortly.',
      cta: 'Retry',
    },
    [AxiosErrorCodeKeys.REQUEST_CANCELED]: {
      title: 'Request canceled',
      body: 'No worries — that request was stopped. You can try again anytime.',
      cta: 'Try again',
    },
    [AxiosErrorCodeKeys.REQUEST_TIMEOUT]: {
      title: 'That took too long',
      body: 'The request timed out. Please try again — it usually works on the next attempt.',
      cta: 'Retry',
    },
  };

export function AxiosErrorMessage({
  code,
  onReload,
}: {
  code: AxiosErrorCodeKeys;
  onReload: () => void;
}) {
  const fallback = {
    title: 'Something went wrong',
    body: 'Please try again.',
    cta: 'Reload',
  };

  const { title, body, cta } = FRIENDLY_MESSAGES[code] ?? fallback;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        px: 3,
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <Typography variant='h5' sx={{ fontWeight: 700 }}>
        {title}
      </Typography>

      <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 420 }}>
        {body}
      </Typography>

      <Button variant='contained' onClick={onReload} sx={{ mt: 1 }}>
        {cta ?? 'Reload'}
      </Button>
    </Box>
  );
}
