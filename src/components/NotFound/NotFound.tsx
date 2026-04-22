import styles from './NotFound.module.scss';
import type { Props } from './types';

export function NotFound({ message }: Props) {
   const defaultMessage = 'No load found';

   document.title = '404';

   return (
      <div className={styles.notFound}>
         <span className={styles.notFoundMessage}>{message || defaultMessage}</span>
      </div>
   );
}
