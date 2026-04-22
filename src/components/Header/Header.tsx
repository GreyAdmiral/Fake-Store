import { Link } from 'react-router';

import { Container } from '@components/Container/Container';
import { AppRoutes } from '@router/routes';
import { APP_TITLE } from '@tools/constants';

import styles from './Header.module.scss';

export function Header() {
   return (
      <header className={styles.header}>
         <Container>
            <div className={styles.headerBody}>
               <h1 className={styles.headerTitle}>
                  <Link to={AppRoutes.HOME_ROUTE} className={styles.headerLink}>
                     {APP_TITLE}
                  </Link>
               </h1>
            </div>
         </Container>
      </header>
   );
}
