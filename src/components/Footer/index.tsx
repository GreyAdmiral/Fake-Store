import { Container } from '@components/Container';

import styles from './styles.module.scss';

export function Footer() {
   const year = new Date().getFullYear();

   return (
      <footer className={styles.footer}>
         <Container>
            <div className={styles.footerBody}>
               <span className={styles.footerText}>Copyright © {year}</span>
            </div>
         </Container>
      </footer>
   );
}
