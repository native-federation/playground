import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { VariantService } from './variant.service';

describe('VariantService', () => {
  let service: VariantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantService);
  });

  async function settle<T>(ref: {
    status: () => string;
    value: () => T;
  }): Promise<T> {
    while (ref.status() === 'loading' || ref.status() === 'idle') {
      await new Promise((r) => setTimeout(r, 20));
    }
    return ref.value();
  }

  describe('getBySku', () => {
    it('resolves the matching variant', async () => {
      const sku = signal<string | undefined>('AU-03-RD');
      const ref = TestBed.runInInjectionContext(() => service.getBySku(sku));
      const value = await settle(ref);
      expect(value?.sku).toBe('AU-03-RD');
      expect(value?.name).toBe('FutureHarvest Navigator Scarlet Dynamo');
    });

    it('resolves to undefined for an unknown sku', async () => {
      const sku = signal<string | undefined>('NOPE');
      const ref = TestBed.runInInjectionContext(() => service.getBySku(sku));
      const value = await settle(ref);
      expect(value).toBeUndefined();
    });

    it('does not fire a request when sku is undefined', async () => {
      const sku = signal<string | undefined>(undefined);
      const ref = TestBed.runInInjectionContext(() => service.getBySku(sku));
      // resource stays idle and value remains undefined; never reaches 'resolved'
      expect(ref.status()).toBe('idle');
      expect(ref.value()).toBeUndefined();
    });

    it('refires when the sku signal changes', async () => {
      const sku = signal<string | undefined>('AU-03-RD');
      const ref = TestBed.runInInjectionContext(() => service.getBySku(sku));
      await settle(ref);
      sku.set('CL-01-GR');
      const next = await settle(ref);
      expect(next?.sku).toBe('CL-01-GR');
    });
  });

  describe('getBySkus', () => {
    it('resolves only the requested skus', async () => {
      const skus = signal<readonly string[]>(['AU-03-RD', 'CL-01-GR']);
      const ref = TestBed.runInInjectionContext(() => service.getBySkus(skus));
      const value = (await settle(ref)) ?? [];
      expect(value.map((v) => v.sku).sort()).toEqual(['AU-03-RD', 'CL-01-GR']);
    });

    it('drops unknown skus silently', async () => {
      const skus = signal<readonly string[]>(['AU-03-RD', 'NOPE']);
      const ref = TestBed.runInInjectionContext(() => service.getBySkus(skus));
      const value = (await settle(ref)) ?? [];
      expect(value.map((v) => v.sku)).toEqual(['AU-03-RD']);
    });

    it('resolves to an empty array for an empty input', async () => {
      const skus = signal<readonly string[]>([]);
      const ref = TestBed.runInInjectionContext(() => service.getBySkus(skus));
      const value = await settle(ref);
      expect(value).toEqual([]);
    });

    it('refires when the sku set changes', async () => {
      const skus = signal<readonly string[]>(['AU-03-RD']);
      const ref = TestBed.runInInjectionContext(() => service.getBySkus(skus));
      const first = (await settle(ref)) ?? [];
      expect(first.map((v) => v.sku)).toEqual(['AU-03-RD']);
      skus.set(['CL-01-GR', 'CL-04-TQ']);
      const next = (await settle(ref)) ?? [];
      expect(next.map((v) => v.sku).sort()).toEqual(['CL-01-GR', 'CL-04-TQ']);
    });
  });
});
