import type { NavTarget } from '@react-internal/navigation';
import { categoryCatalog } from './categories-fixtures';

export interface Product {
  id: string;
  name: string;
  image: string;
  startPrice: number;
  link: NavTarget;
}

export interface Category {
  key: string;
  name: string;
  products: Product[];
}

export const getCategories = (): Promise<Category[]> =>
  Promise.resolve(categoryCatalog);
