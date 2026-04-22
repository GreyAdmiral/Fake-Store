import { ProductCard } from '@components/ProductCard/ProductCard';
import { APP_TITLE } from '@tools/constants';

import styles from './Products.module.scss';
import type { Props } from './types';

export function Products({ products }: Props) {
   if (!products || !products.length) return null;

   document.title = APP_TITLE;

   return (
      <ul className={styles.products}>
         {products.map((item) => (
            <li key={item.id}>
               <ProductCard product={item} />
            </li>
         ))}
      </ul>
   );
}
