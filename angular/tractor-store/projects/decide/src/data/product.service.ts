import {
  Injectable,
  resource,
  type ResourceRef,
  type Signal,
} from '@angular/core';
import type { Product } from './product';
import { products } from './product.data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getById(id: Signal<string | undefined>): ResourceRef<Product | undefined> {
    return resource({
      params: id,
      loader: async ({ params }) => products.find((p) => p.id === params),
    });
  }
}
