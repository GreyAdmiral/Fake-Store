import type { CategoryFilter, Product } from '@/types/types';

export function getCategories(products: Product[]): CategoryFilter[] {
   const categories = new Set(products.map(({ category }) => category));
   return Array.from(categories, (category, idx) => {
      return { id: `category ${idx + 1}`, name: category };
   });
}
