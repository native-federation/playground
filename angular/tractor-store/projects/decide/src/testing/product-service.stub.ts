import { resource, type Signal } from '@angular/core';
import type { Product } from '../data/product';
import { productFixture } from './product.fixture';

// Same shape as ProductService, backed by the test fixture instead of the real catalog.
export const fakeProductService = (catalog: Product[] = productFixture) => ({
  getById: (id: Signal<string | undefined>) =>
    resource({
      params: id,
      loader: async ({ params }) => catalog.find((p) => p.id === params),
    }),
});
