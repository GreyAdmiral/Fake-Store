import { Container } from '@components/Container/Container';

import styles from './Footer.module.scss';

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
