import { computed, Injectable, signal } from '@angular/core';
import type { CartLineItemModel } from '../contracts/models/cart-line-item.model';
import {
  CART_STORAGE_KEY,
  cartUpdated,
  parseCart,
  serializeCart,
} from './cart-bus';

export { CART_STORAGE_KEY } from './cart-bus';

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly _lineItems = signal<CartLineItemModel[]>(
    this.readFromStorage(),
  );

  readonly lineItems = this._lineItems.asReadonly();

  readonly totalQuantity = computed(() =>
    this._lineItems().reduce((sum, item) => sum + item.quantity, 0),
  );

  constructor() {
    cartUpdated.on(({ items }) => this._lineItems.set([...items]));
  }

  add(sku: string): void {
    const current = [...this._lineItems()];
    const existing = current.find((item) => item.sku === sku);
    if (existing) {
      existing.quantity += 1;
    } else {
      current.push({ sku, quantity: 1 });
    }
    this.persist(current);
  }

  remove(sku: string): void {
    const current = this._lineItems().filter((item) => item.sku !== sku);
    this.persist(current);
  }

  clear(): void {
    this.persist([]);
  }

  private persist(items: CartLineItemModel[]): void {
    this._lineItems.set(items);
    if (hasWindow()) {
      try {
        window.localStorage.setItem(CART_STORAGE_KEY, serializeCart(items));
      } catch {
        /* storage full or unavailable – ignore */
      }
    }
    cartUpdated.emit({ items });
  }

  private readFromStorage(): CartLineItemModel[] {
    if (!hasWindow()) return [];
    try {
      return parseCart(window.localStorage.getItem(CART_STORAGE_KEY));
    } catch {
      return [];
    }
  }
}
