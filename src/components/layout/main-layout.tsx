import styles from '@/components/layout/main-layout.module.scss';

import { Link, Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className={styles['main-layout']}>
      <Link to='/'>HomePage</Link>
      <Outlet />
    </div>
  );
}
