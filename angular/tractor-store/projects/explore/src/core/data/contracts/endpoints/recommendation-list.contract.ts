import type { NavTarget } from '@internal/navigation';

export interface RecommendationDto {
  sku: string;
  name: string;
  image: string;
  link: NavTarget;
  rgb: [number, number, number];
}

export type ListRecommendationsResponse = Record<string, RecommendationDto>;
