import { Button, Link as MuiLink } from '@mui/material';

import { Link } from '@/lib/router/link';

export function ContactBackLink() {
  return (
    <MuiLink to='/' component={Link} sx={{ textDecoration: 'none', width: 'fit-content' }}>
      <Button variant='outlined' size='small'>
        Back to contacts
      </Button>
    </MuiLink>
  );
}
