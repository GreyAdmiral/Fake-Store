import { Outlet } from 'react-router';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';

export function Layout() {
   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   );
}
