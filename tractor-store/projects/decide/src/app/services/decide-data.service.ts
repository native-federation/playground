import { Injectable } from '@angular/core';
import { DATABASE, Product } from '../data/products';

@Injectable({ providedIn: 'root' })
export class DecideDataService {
  getProducts(): Product[] {
    return DATABASE.products;
  }

  getProduct(id: string): Product | undefined {
    return DATABASE.products.find((p) => p.id === id);
  }
}
