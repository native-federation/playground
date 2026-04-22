import { Injectable, inject } from '@angular/core';
import { ExploreDataService, RecoItem } from './explore-data.service';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private readonly data = inject(ExploreDataService);

  /** Calculates the average color of an array of RGB colors. */
  averageColor(colors: number[][]): [number, number, number] {
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

  /** Calculates the euclidean distance between two RGB colors. */
  colorDistance(
    rgb1: readonly number[],
    rgb2: readonly number[],
  ): number {
    const [r1, g1, b1] = rgb1;
    const [r2, g2, b2] = rgb2;
    return Math.sqrt(
      Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2),
    );
  }

  /** Finds recommendations based on color similarity. */
  recosForSkus(skus: string[], length = 4): RecoItem[] {
    const r = this.data.recommendations();
    const colors = skus
      .filter((sku) => r[sku])
      .map((sku) => r[sku].rgb as number[]);
    const targetRgb = this.averageColor(colors);

    const distances: { sku: string; distance: number }[] = [];
    for (const sku of Object.keys(r)) {
      if (!skus.includes(sku)) {
        distances.push({
          sku,
          distance: this.colorDistance(targetRgb, r[sku].rgb),
        });
      }
    }
    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, length).map((d) => r[d.sku]);
  }
}
