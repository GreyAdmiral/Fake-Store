import type { FC, HTMLAttributes } from 'react';

import styles from './Container.module.scss';

export const Container: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {
   const classNameString = className ? `${styles.container} ${className}` : styles.container;
   return <div className={classNameString}>{children}</div>;
};
