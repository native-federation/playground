import { resource, type Signal } from '@angular/core';
import type { Recommendation } from '../data/recommendation';

// Same shape as RecommendationService; `seeds` records every seed list it was asked for.
export const fakeRecommendationService = (items: Recommendation[]) => {
  const seeds: (readonly string[])[] = [];
  return {
    seeds,
    bySeedSkus: (seedSkus: Signal<readonly string[]>) =>
      resource({
        params: seedSkus,
        loader: async ({ params }) => {
          seeds.push(params);
          return items;
        },
      }),
  };
};
