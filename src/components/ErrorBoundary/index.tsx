import { Component, type PropsWithChildren } from 'react';

import { ErrorComponent } from './ErrorComponent';
import type { ErrorBoundaryState, ErrorInfo } from './types';

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
   constructor(props: PropsWithChildren) {
      super(props);
      this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error: Error) {
      return { hasError: true, error: error };
   }

   componentDidCatch(_error: Error, info: ErrorInfo) {
      if (info.componentStack) {
         console.error(`Component Stack: ${info.componentStack}.`);
      }

      if (info.digest) {
         console.error(`Digest: ${info.digest}.`);
      }
   }

   render() {
      if (this.state.hasError) {
         return <ErrorComponent error={this.state.error} />;
      }

      return this.props.children;
   }
}
