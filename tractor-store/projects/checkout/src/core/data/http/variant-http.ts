import {
  Injectable,
  resource,
  type ResourceRef,
  type Signal,
} from '@angular/core';
import type { VariantModel } from '../contracts/models/variant.model';
import { toVariantListModel, toVariantModel } from '../mappers/variant.mapper';
import { variantCatalog } from './variant-http.fixtures';

@Injectable({ providedIn: 'root' })
export class VariantHttp {
  getBySku(
    sku: Signal<string | undefined | null>,
  ): ResourceRef<VariantModel | undefined> {
    return resource<VariantModel | undefined, string | undefined>({
      params: () => sku() ?? undefined,
      loader: ({ params }) => {
        const match = variantCatalog.find((v) => v.sku === params);
        return Promise.resolve(match ? toVariantModel(match) : undefined);
      },
    });
  }

  getBySkus(
    skus: Signal<readonly string[]>,
  ): ResourceRef<VariantModel[] | undefined> {
    return resource<VariantModel[], readonly string[]>({
      params: () => skus(),
      loader: ({ params }) => {
        if (params.length === 0) return Promise.resolve([]);
        const wanted = new Set(params);
        const matches = variantCatalog.filter((v) => wanted.has(v.sku));
        return Promise.resolve(toVariantListModel(matches));
      },
    });
  }
}
