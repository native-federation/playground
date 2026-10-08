import type { NavTarget } from '@tractor-store/shared';

export interface RecommendationDto {
  sku: string;
  name: string;
  image: string;
  link: NavTarget;
  rgb: [number, number, number];
}

export type ListRecommendationsResponse = Record<string, RecommendationDto>;
