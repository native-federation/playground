import type { NavTarget } from '@tractor-store/shared';

export interface ProductModel {
  id: string;
  name: string;
  image: string;
  startPrice: number;
  link: NavTarget;
}
