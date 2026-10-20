import type { NavLink } from './nav-link';

export interface Category {
  key: string;
  name: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  image: string;
  startPrice: number;
  link: NavLink;
}
