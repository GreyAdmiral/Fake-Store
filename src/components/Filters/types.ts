import type { CategoryFilter } from '@/types/types';

export interface Props {
   categories: CategoryFilter[];
   activeCategory: string | null;
}
