import type { NavTarget } from '@react-internal/navigation';
import { recommendationCatalog } from './recommendations-fixtures';

// Seed SKUs used by the homepage recommendations rail. Lives here because
// it's data shape, not presentation.
export const HOME_SEED_SKUS: readonly string[] = ['CL-01-GY', 'AU-07-MT'];

export interface Recommendation {
  sku: string;
  name: string;
  image: string;
  link: NavTarget;
  rgb: readonly [number, number, number];
}

type Rgb = readonly [number, number, number];

const averageColor = (colors: readonly Rgb[]): Rgb => {
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
};

const colorDistance = (a: Rgb, b: Rgb): number =>
  Math.sqrt(
    Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2),
  );

export function getRecommendationsBySeedSkus(
  seedSkus: readonly string[],
  length = 4,
): Promise<Recommendation[]> {
  const all = recommendationCatalog;
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
  return Promise.resolve(ranked.slice(0, length).map((r) => all[r.sku]));
}
