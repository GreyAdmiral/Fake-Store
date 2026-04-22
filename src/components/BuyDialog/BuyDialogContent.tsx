import closeIcon from '@assets/icons/close.svg?url';
import { useSVGLoad } from '@hooks/useSVGLoad';
import { BUY_MESSAGE } from '@tools/constants';
import DOMPurify from 'dompurify';

import styles from './BuyDialog.module.scss';
import type { Props } from './types';

export function BuyDialogContent({ onClose }: Props) {
   const closeIconSVG = useSVGLoad(closeIcon);

   return (
      <article className={styles.buy}>
         <div className={styles.buyHeader}>
            <h3 className={styles.buyTitle}>How to order</h3>

            {onClose && closeIconSVG && (
               <button
                  type="button"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(closeIconSVG) }}
                  className={styles.buyClose}
                  onClick={onClose}
                  aria-label="Close dialog"
               ></button>
            )}
         </div>

         {BUY_MESSAGE.map((item, index) => (
            <p key={index} className={styles.buyText}>
               {item}
            </p>
         ))}
      </article>
   );
}
