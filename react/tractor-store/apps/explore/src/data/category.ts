import type { NavLink } from './nav-link';
import { categoryCatalog } from './category.data';

export interface Product {
  id: string;
  name: string;
  image: string;
  startPrice: number;
  link: NavLink;
}

export interface Category {
  key: string;
  name: string;
  products: Product[];
}

export const getCategories = (): Promise<Category[]> =>
  Promise.resolve(categoryCatalog);
