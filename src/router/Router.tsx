import { Route, Routes } from 'react-router';

import { HomePage } from '@components/HomePage';
import { Layout } from '@components/Layout';
import { NotFound } from '@components/NotFound';
import { ProductPage } from '@components/ProductPage';
import { AppRoutes } from '@router/routes';

export function Router() {
   return (
      <Routes>
         <Route path={AppRoutes.HOME_ROUTE} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={AppRoutes.PRODUCT_ROUTE} element={<ProductPage />} />
            <Route path="*" element={<NotFound />} />
         </Route>
      </Routes>
   );
}
