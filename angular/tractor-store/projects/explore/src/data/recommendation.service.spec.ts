import { ApplicationRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import type { Recommendation } from './recommendation';
import { recommendations } from './recommendation.data';
import { RecommendationService } from './recommendation.service';

// Runs against the real catalog: the ranking is the whole point of this service.
async function recommend(
  seedSkus: string[],
  length?: number,
): Promise<Recommendation[]> {
  const ref = TestBed.runInInjectionContext(() =>
    TestBed.inject(RecommendationService).bySeedSkus(signal(seedSkus), length),
  );
  await TestBed.inject(ApplicationRef).whenStable();
  return ref.value()!;
}

const rgbOf = (sku: string) => recommendations.find((r) => r.sku === sku)!.rgb;
const distance = (a: Recommendation['rgb'], b: Recommendation['rgb']) =>
  Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

describe('RecommendationService', () => {
  it('recommends four variants by default, never the seeds themselves', async () => {
    const result = await recommend(['AU-04-RD', 'CL-01-GY']);
    expect(result).toHaveLength(4);
    expect(result.map((r) => r.sku)).not.toContain('AU-04-RD');
    expect(result.map((r) => r.sku)).not.toContain('CL-01-GY');
  });

  it('ranks variants by how close their color is to the seed', async () => {
    const seed = rgbOf('AU-04-RD');
    const distances = (await recommend(['AU-04-RD'], 10)).map((r) =>
      distance(seed, r.rgb),
    );
    expect(distances).toEqual([...distances].sort((a, b) => a - b));
    const closest = Math.min(
      ...recommendations
        .filter((r) => r.sku !== 'AU-04-RD')
        .map((r) => distance(seed, r.rgb)),
    );
    expect(distances[0]).toBe(closest);
  });

  it('honours the requested length', async () => {
    expect(await recommend(['AU-01-SI'], 2)).toHaveLength(2);
  });

  it('still recommends something without seeds', async () => {
    expect(await recommend([], 3)).toHaveLength(3);
  });
});
