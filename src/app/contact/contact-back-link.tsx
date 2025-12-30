import { Button, Link as MuiLink } from '@mui/material';

import { LeftArrowIcon } from '@/components/icons/left-arrow';
import { Link } from '@/lib/router/link';

export function ContactBackLink() {
  return (
    <MuiLink to='/' component={Link} sx={{ textDecoration: 'none', width: 'fit-content' }}>
      <Button variant='outlined' size='small'>
        <LeftArrowIcon />
        Back to contacts
      </Button>
    </MuiLink>
  );
}
