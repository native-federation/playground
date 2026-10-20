import type { NavLink } from '../shared/nav-intent.directive';

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
