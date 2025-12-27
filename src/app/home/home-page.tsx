import '@/app/home/home-page.scss';

import { getPassengers } from '@/api/get-passengers/get-passengers.api';
import { Link } from '@/lib/router/link';

export const HomePage = () => {
  getPassengers();
  return (
    <div className='home-page'>
      <h1>Home Page</h1>
      <Link to='/product'>Product</Link>
    </div>
  );
};
