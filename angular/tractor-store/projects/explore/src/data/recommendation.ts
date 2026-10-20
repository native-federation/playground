import type { NavLink } from './nav-link';

export interface Recommendation {
  sku: string;
  name: string;
  image: string;
  link: NavLink;
  rgb: readonly [number, number, number];
}
