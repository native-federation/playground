import {
  Injectable,
  resource,
  type ResourceRef,
  type Signal,
} from '@angular/core';
import type { ProductModel } from '../contracts/models/product.model';
import { toProductModel } from '../mappers/product.mapper';
import { productCatalog } from './product-http.fixtures';

@Injectable({ providedIn: 'root' })
export class ProductHttp {
  getById(
    id: Signal<string | undefined | null>,
  ): ResourceRef<ProductModel | undefined> {
    return resource<ProductModel | undefined, string | undefined>({
      params: () => id() ?? undefined,
      loader: ({ params }) => {
        const match = productCatalog.find((p) => p.id === params);
        return Promise.resolve(match ? toProductModel(match) : undefined);
      },
    });
  }
}
