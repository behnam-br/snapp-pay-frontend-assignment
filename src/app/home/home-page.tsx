import '@/app/home/home-page.scss';

import { Link } from '@/lib/router/link';

export const HomePage = () => {
  return (
    <div className='home-page'>
      <h1>Home Page</h1>
      <Link to='/product'>Product</Link>
      <img src='@/assets/image.jpg' alt='Snapppay Logo' />
    </div>
  );
};
