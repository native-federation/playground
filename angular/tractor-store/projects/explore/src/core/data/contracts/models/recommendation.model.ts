import type { NavTarget } from '@internal/navigation';

export interface RecommendationModel {
  sku: string;
  name: string;
  image: string;
  link: NavTarget;
  rgb: readonly [number, number, number];
}
