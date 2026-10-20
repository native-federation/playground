import type { NavLink } from '../shared/nav-intent.directive';

export interface Recommendation {
  sku: string;
  name: string;
  image: string;
  link: NavLink;
  rgb: readonly [number, number, number];
}
