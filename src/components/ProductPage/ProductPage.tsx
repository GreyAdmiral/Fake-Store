import { useParams } from 'react-router';

import { Container } from '@components/Container/Container';
import { ErrorComponent } from '@components/ErrorBoundary/ErrorComponent';
import { Loader } from '@components/Loader/Loader';
import { NotFound } from '@components/NotFound/NotFound';
import { useFetch } from '@hooks/useFetch';
import { API_URL } from '@tools/constants';
import clsx from 'clsx';

import { ProductInfo } from '@/components/ProductInfo/ProductInfo';
import type { Product } from '@/types/types';

import styles from './ProductPage.module.scss';

export function ProductPage() {
   const { id } = useParams();
   const [product, isLoading, error] = useFetch<Product>(`${API_URL}/${id}`);
   const isEmptyProducts = !isLoading && product && Object.keys(product).length === 0;
   const defNotFoundMessage = 'No data';

   return (
      <div className={styles.product}>
         <Container>
            <div className={clsx(styles.productBody, { [styles.productCentered]: isLoading })}>
               {isLoading && <Loader />}
               {error && <ErrorComponent error={error} />}
               {isEmptyProducts && <NotFound message={defNotFoundMessage} />}
               {product && <ProductInfo product={product} />}
            </div>
         </Container>
      </div>
   );
}
