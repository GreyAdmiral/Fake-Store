import { Route, Routes } from 'react-router';

import { Layout } from '@components/Layout/Layout';
import { NotFound } from '@components/NotFound/NotFound';
import { AppRoutes } from '@router/routes';

import { HomePage } from '@/components/HomePage/HomePage';
import { ProductPage } from '@/components/ProductPage/ProductPage';

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
