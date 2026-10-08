import type { NavTarget } from '@tractor-store/shared';

export interface RecommendationModel {
  sku: string;
  name: string;
  image: string;
  link: NavTarget;
  rgb: readonly [number, number, number];
}
