import { computed, signal, type Signal } from '@angular/core';
import type { Variant } from '../data/variant';
import { variantFixture } from './variant.fixture';

interface FakeResource<T> {
  value: Signal<T>;
  isLoading: Signal<boolean>;
  error: Signal<unknown>;
  status: Signal<'idle' | 'loading' | 'resolved' | 'error'>;
  reload: () => void;
}

function fakeResource<T>(value: Signal<T>): FakeResource<T> {
  return {
    value,
    isLoading: signal(false),
    error: signal(undefined),
    status: signal('resolved'),
    reload: () => {},
  };
}

export function fakeVariantService(catalog: Variant[] = variantFixture) {
  return {
    getBySku(sku: Signal<string | undefined | null>) {
      const value = computed(() => catalog.find((v) => v.sku === sku()));
      return fakeResource<Variant | undefined>(value);
    },
    getBySkus(skus: Signal<readonly string[]>) {
      const value = computed(() => {
        const wanted = new Set(skus());
        return wanted.size === 0
          ? []
          : catalog.filter((v) => wanted.has(v.sku));
      });
      return fakeResource<Variant[] | undefined>(value);
    },
  };
}
