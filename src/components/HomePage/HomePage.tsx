import { useSearchParams } from 'react-router';

import { Container } from '@components/Container/Container';
import { ErrorComponent } from '@components/ErrorBoundary/ErrorComponent';
import { Filters } from '@components/Filters/Filters';
import { Loader } from '@components/Loader/Loader';
import { NotFound } from '@components/NotFound/NotFound';
import { Products } from '@components/Products/Products';
import { useFetch } from '@hooks/useFetch';
import { API_URL } from '@tools/constants';
import { getCategories } from '@tools/getCategories';
import clsx from 'clsx';

import type { Product } from '@/types/types';

import styles from './HomePage.module.scss';

export function HomePage() {
   const defNotFoundMessage = 'Nothing found';
   const [data, isLoading, error] = useFetch<Product[]>(API_URL);
   const [searchParams] = useSearchParams();
   const category = searchParams.get('category');
   const products = category && data ? data.filter((product) => product.category === category) : data;
   const isEmptyProducts = !isLoading && products && products.length === 0;
   const filters = data ? getCategories(data) : null;
   const isFilters = filters && products && Boolean(products.length);

   return (
      <div className={styles.products}>
         <Container>
            <div className={clsx(styles.productsBody, { [styles.productsCentered]: isLoading })}>
               {isLoading && <Loader />}
               {error && <ErrorComponent error={error} />}
               {isEmptyProducts && <NotFound message={defNotFoundMessage} />}
               {isFilters && <Filters categories={filters} activeCategory={category} />}
               {products && <Products products={products} />}
            </div>
         </Container>
      </div>
   );
}
