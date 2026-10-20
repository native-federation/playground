import { ApplicationRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { products } from './product.data';
import { ProductService } from './product.service';

// Runs against the real catalog.
async function getById(id: string | undefined) {
  const ref = TestBed.runInInjectionContext(() =>
    TestBed.inject(ProductService).getById(signal(id)),
  );
  await TestBed.inject(ApplicationRef).whenStable();
  return ref;
}

describe('ProductService', () => {
  it('finds a product by id', async () => {
    const [product] = products;
    expect((await getById(product.id)).value()).toBe(product);
  });

  it('resolves to undefined for an unknown id', async () => {
    expect((await getById('NOPE')).value()).toBeUndefined();
  });

  it('stays idle without an id', async () => {
    const ref = await getById(undefined);
    expect(ref.status()).toBe('idle');
    expect(ref.value()).toBeUndefined();
  });
});
