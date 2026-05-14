import {
  Injectable,
  resource,
  type ResourceRef,
  type Signal,
} from '@angular/core';
import type { RecommendationModel } from '../contracts/models/recommendation.model';
import { toRecommendationListModel } from '../mappers/recommendation.mapper';
import { recommendationCatalog } from './recommendation-http.fixtures';

type Rgb = readonly [number, number, number];

function averageColor(colors: readonly Rgb[]): Rgb {
  if (colors.length === 0) return [0, 0, 0];
  const total = colors.reduce(
    (acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b],
    [0, 0, 0],
  );
  return [
    Math.round(total[0] / colors.length),
    Math.round(total[1] / colors.length),
    Math.round(total[2] / colors.length),
  ];
}

function colorDistance(a: Rgb, b: Rgb): number {
  const [r1, g1, b1] = a;
  const [r2, g2, b2] = b;
  return Math.sqrt(
    Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2),
  );
}

function pickRecommendations(
  seedSkus: readonly string[],
  length: number,
): RecommendationModel[] {
  const all = toRecommendationListModel(recommendationCatalog);
  const seedColors = seedSkus
    .filter((sku) => all[sku])
    .map((sku) => all[sku].rgb);
  const target = averageColor(seedColors);
  const seen = new Set(seedSkus);

  const ranked: { sku: string; distance: number }[] = [];
  for (const sku of Object.keys(all)) {
    if (seen.has(sku)) continue;
    ranked.push({ sku, distance: colorDistance(target, all[sku].rgb) });
  }
  ranked.sort((a, b) => a.distance - b.distance);
  return ranked.slice(0, length).map((r) => all[r.sku]);
}

@Injectable({ providedIn: 'root' })
export class RecommendationHttp {
  bySeedSkus(
    seedSkus: Signal<readonly string[]>,
    length = 4,
  ): ResourceRef<RecommendationModel[] | undefined> {
    return resource<RecommendationModel[], readonly string[]>({
      params: () => seedSkus(),
      loader: ({ params }) =>
        Promise.resolve(pickRecommendations(params, length)),
    });
  }
}
