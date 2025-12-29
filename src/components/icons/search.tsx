import { SvgIcon, type SvgIconProps } from '@mui/material';

export function SearchIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path d='M10 4a6 6 0 104.472 10.03l4.249 4.25 1.414-1.415-4.25-4.249A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z' />
    </SvgIcon>
  );
}
