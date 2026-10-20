import {
  Injectable,
  resource,
  type ResourceRef,
  type Signal,
} from '@angular/core';
import type { Variant } from './variant';
import { variantCatalog } from './variant.data';

@Injectable({ providedIn: 'root' })
export class VariantService {
  getBySku(sku: Signal<string | undefined>): ResourceRef<Variant | undefined> {
    return resource({
      params: sku,
      loader: async ({ params }) =>
        variantCatalog.find((v) => v.sku === params),
    });
  }

  getBySkus(
    skus: Signal<readonly string[]>,
  ): ResourceRef<Variant[] | undefined> {
    return resource({
      params: skus,
      loader: async ({ params }) => {
        const wanted = new Set(params);
        return variantCatalog.filter((v) => wanted.has(v.sku));
      },
    });
  }
}
