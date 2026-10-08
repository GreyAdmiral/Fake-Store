import styles from './styles.module.scss';

export const Loader = () => {
   return (
      <div className={styles.loader}>
         <span className={styles.spinner}></span>
      </div>
   );
};
