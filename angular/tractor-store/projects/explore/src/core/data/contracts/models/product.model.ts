import type { NavTarget } from '@internal/navigation';

export interface ProductModel {
  id: string;
  name: string;
  image: string;
  startPrice: number;
  link: NavTarget;
}
