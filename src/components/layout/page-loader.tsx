import styles from '@/components/layout/page-loader.module.scss';

function PageLoader() {
  return (
    <div className={styles['page-loader']}>
      <div className={styles['spinner']}></div>
      <p>Loading...</p>
    </div>
  );
}

export default PageLoader;
