import type { ReactNode } from 'react';
import { Component } from 'react';

import styles from './ErrorComponent.module.scss';
import type { ErrorComponentProps } from './types';

export class ErrorComponent extends Component<ErrorComponentProps> {
   render(): ReactNode {
      const defaultMessage = 'Unknown error!';

      document.title = `Error!`;

      return (
         <div className={styles.error}>
            <span className={styles.errorMessage}>{this.props.error ? this.props.error.message : defaultMessage}</span>
         </div>
      );
   }
}
