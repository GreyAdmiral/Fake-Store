import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router';

import imgPlaceholder from '@assets/images/cup-img-paceholder.svg';
import { BuyDialog } from '@components/BuyDialog/BuyDialog';
import { AppRoutes } from '@router/routes';
import { APP_TITLE } from '@tools/constants';
import clsx from 'clsx';

import styles from './ProductInfo.module.scss';
import type { Props } from './types';

export function ProductInfo({ product }: Props) {
   if (!product) return null;

   const imageWidth = 480;
   const imageHeight = 540;
   const defCategory = 'No category';
   const defTitle = 'Unknown product';
   const backTitle = 'back to products';
   const { title = defTitle, image, description = '', category = defCategory, price, rating } = product;
   const categoryAriaLabel = `All products in the category «${category}»`;

   document.title = `${title} | ${APP_TITLE}`;

   return (
      <section className={styles.productBlock}>
         <div className={styles.productBlockImage}>
            <LazyLoadImage
               src={image}
               placeholderSrc={imgPlaceholder}
               wrapperClassName={styles.productBlockImageWrapper}
               alt={title}
               width={imageWidth}
               height={imageHeight}
            />
         </div>

         <div className={styles.productBlockInfo}>
            <h2 className={styles.productBlockTitle}>{title}</h2>

            <div className={styles.productBlockCategory}>
               <span className={styles.productBlockSubtitle}>category</span>

               <Link
                  to={{
                     pathname: AppRoutes.HOME_ROUTE,
                     search: `?category=${category}`,
                  }}
                  className={styles.productBlockLink}
                  aria-label={categoryAriaLabel}
               >
                  {category}
               </Link>
            </div>

            {price && (
               <div className={styles.productBlockCategory}>
                  <span className={styles.productBlockSubtitle}>price</span>
                  <span className={clsx(styles.productBlockPrice, styles.productBlockNumber)}>{price}</span>
               </div>
            )}

            {rating.rate && (
               <div className={styles.productBlockCategory}>
                  <span className={styles.productBlockSubtitle}>rating</span>
                  <span className={styles.productBlockNumber}>{rating.rate}</span>

                  <span className={styles.productBlockStarRaiting}>
                     <span className={styles.productBlockStarsWrp} style={{ width: `${rating.rate * 20}%` }}>
                        <span className={styles.productBlockStars}></span>
                     </span>
                  </span>
               </div>
            )}

            {description && <p>{description}</p>}

            <Link to={AppRoutes.HOME_ROUTE} className={clsx(styles.productBlockLink, styles.productBlockLinkBack)}>
               {backTitle}
            </Link>

            <BuyDialog />
         </div>
      </section>
   );
}
