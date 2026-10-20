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
  getBySku(
    sku: Signal<string | undefined | null>,
  ): ResourceRef<Variant | undefined> {
    return resource<Variant | undefined, string | undefined>({
      params: () => sku() ?? undefined,
      loader: ({ params }) =>
        Promise.resolve(variantCatalog.find((v) => v.sku === params)),
    });
  }

  getBySkus(
    skus: Signal<readonly string[]>,
  ): ResourceRef<Variant[] | undefined> {
    return resource<Variant[], readonly string[]>({
      params: () => skus(),
      loader: ({ params }) => {
        const wanted = new Set(params);
        return Promise.resolve(variantCatalog.filter((v) => wanted.has(v.sku)));
      },
    });
  }
}
