import type { FC, PropsWithChildren } from 'react';

import styles from './Container.module.scss';
import type { ContainerProps } from './types';

export const Container: FC<PropsWithChildren & ContainerProps> = ({ children, className }) => {
   return <div className={className ? `${styles.container} ${className}` : styles.container}>{children}</div>;
};
