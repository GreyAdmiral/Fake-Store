import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';

import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { Router } from '@router/Router';

import './scss/style.scss';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ErrorBoundary>
         <HashRouter>
            <Router />
         </HashRouter>
      </ErrorBoundary>
   </StrictMode>
);
