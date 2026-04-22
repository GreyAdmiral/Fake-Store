import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router';

import imgPlaceholder from '@assets/images/cup-img-paceholder.svg';
import clsx from 'clsx';

import styles from './ProductCard.module.scss';
import type { Props } from './types';

export function ProductCard({ product }: Props) {
   if (!product) return null;

   const imageWidth = 320;
   const imageHeight = 240;
   const defCategory = 'No category';
   const defTitle = 'Unknown product';
   const { title = defTitle, image, description = '', category = defCategory, price, rating } = product;
   const customDescription = description.length < 130 ? description : `${description.slice(0, 126)}...`;
   const productAriaLabel = `Go to product ${title} page`;

   return (
      <article className={styles.product}>
         <Link to={String(product.id)} className={styles.productLink} aria-label={productAriaLabel}></Link>

         <div className={styles.productImage}>
            <LazyLoadImage
               src={image}
               placeholderSrc={imgPlaceholder}
               wrapperClassName={styles.productImageWrapper}
               alt={title}
               width={imageWidth}
               height={imageHeight}
            />
         </div>

         <h2 className={styles.productTitle}>{title}</h2>

         <div className={styles.productCategory}>
            <span className={styles.productSubtitle}>category</span>
            <span>{category}</span>
         </div>

         {price && (
            <div className={styles.productCategory}>
               <span className={styles.productSubtitle}>price</span>
               <span className={clsx(styles.productPrice, styles.productNumber)}>{price}</span>
            </div>
         )}

         {rating.rate && (
            <div className={styles.productCategory}>
               <span className={styles.productSubtitle}>rating</span>
               <span>{rating.rate}</span>
            </div>
         )}

         {description && <p>{customDescription}</p>}
      </article>
   );
}
