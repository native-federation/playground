import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { DecideDataService } from './decide-data.service';

describe('DecideDataService', () => {
  let service: DecideDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecideDataService);
  });

  it('returns all products', () => {
    const products = service.getProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it('returns the CL-01 product with highlights', () => {
    const product = service.getProduct('CL-01');
    expect(product).toBeTruthy();
    expect(product?.name).toBe('Heritage Workhorse');
    expect(product?.highlights?.length).toBeGreaterThan(0);
    expect(product?.variants.length).toBe(2);
  });

  it('returns the AU-01 product with fixed highlights key', () => {
    const product = service.getProduct('AU-01');
    expect(product).toBeTruthy();
    expect(product?.highlights?.length).toBe(3);
  });

  it('returns undefined for unknown id', () => {
    expect(service.getProduct('nope')).toBeUndefined();
  });
});
