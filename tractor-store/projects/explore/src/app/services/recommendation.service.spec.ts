import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { RecommendationService } from './recommendation.service';

describe('RecommendationService', () => {
  let service: RecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendationService);
  });

  it('colorDistance returns 0 for identical colors', () => {
    expect(service.colorDistance([10, 20, 30], [10, 20, 30])).toBe(0);
  });

  it('colorDistance is symmetric', () => {
    const a = service.colorDistance([10, 20, 30], [40, 50, 60]);
    const b = service.colorDistance([40, 50, 60], [10, 20, 30]);
    expect(a).toBe(b);
  });

  it('averageColor computes the channel-wise mean', () => {
    expect(service.averageColor([[0, 0, 0], [100, 100, 100]])).toEqual([
      50, 50, 50,
    ]);
  });

  it('recosForSkus returns 4 items none of which include the seed SKU', () => {
    const recos = service.recosForSkus(['CL-01-GY']);
    expect(recos).toHaveLength(4);
    expect(recos.every((r) => r.sku !== 'CL-01-GY')).toBe(true);
  });
});
