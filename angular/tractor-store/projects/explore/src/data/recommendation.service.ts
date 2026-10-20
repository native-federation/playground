import {
  Injectable,
  resource,
  type ResourceRef,
  type Signal,
} from '@angular/core';
import type { Recommendation } from './recommendation';
import { recommendations } from './recommendation.data';

type Rgb = Recommendation['rgb'];

const averageColor = (colors: readonly Rgb[]): Rgb => {
  if (colors.length === 0) return [0, 0, 0];
  const avg = (i: number) =>
    Math.round(colors.reduce((sum, c) => sum + c[i], 0) / colors.length);
  return [avg(0), avg(1), avg(2)];
};

const colorDistance = ([r1, g1, b1]: Rgb, [r2, g2, b2]: Rgb): number =>
  Math.hypot(r1 - r2, g1 - g2, b1 - b2);

// The variants closest in color to the average of the seeds, excluding the seeds themselves.
const pickRecommendations = (
  seedSkus: readonly string[],
  length: number,
): Recommendation[] => {
  const target = averageColor(
    recommendations.filter((r) => seedSkus.includes(r.sku)).map((r) => r.rgb),
  );
  return recommendations
    .filter((r) => !seedSkus.includes(r.sku))
    .sort((a, b) => colorDistance(target, a.rgb) - colorDistance(target, b.rgb))
    .slice(0, length);
};

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  bySeedSkus(
    seedSkus: Signal<readonly string[]>,
    length = 4,
  ): ResourceRef<Recommendation[] | undefined> {
    return resource({
      params: seedSkus,
      loader: async ({ params }) => pickRecommendations(params, length),
    });
  }
}
