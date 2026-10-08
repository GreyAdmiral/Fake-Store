import { Link } from 'react-router';

import { AppRoutes } from '@router/routes';
import clsx from 'clsx';

import styles from './styles.module.scss';
import type { Props } from './types';

const ALL_CATEGORIES = {
   id: 0,
   name: 'all products',
   ariaLabel: 'All products',
};

export function Filters({ categories, activeCategory }: Props) {
   if (!categories || !categories.length) return null;

   return (
      <ul className={styles.filters}>
         <li key={ALL_CATEGORIES.id} className={styles.filtersItem}>
            <Link
               to={AppRoutes.HOME_ROUTE}
               className={clsx(styles.filtersLink, { [styles.active]: !activeCategory })}
               aria-label={ALL_CATEGORIES.ariaLabel}
            >
               {ALL_CATEGORIES.name}
            </Link>
         </li>

         {categories.map(({ id, name }) => {
            const categoryAriaLabel = `All products in the category «${name}»`;

            return (
               <li key={id} className={styles.filtersItem}>
                  <Link
                     to={{
                        pathname: AppRoutes.HOME_ROUTE,
                        search: `?category=${name}`,
                     }}
                     className={clsx(styles.filtersLink, { [styles.active]: activeCategory === name })}
                     aria-label={categoryAriaLabel}
                  >
                     {name}
                  </Link>
               </li>
            );
         })}
      </ul>
   );
}
