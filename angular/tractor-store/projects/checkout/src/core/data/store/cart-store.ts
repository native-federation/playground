import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { listenTo } from '@tractor-store/shared';
import { filter, fromEvent } from 'rxjs';
import type { CartLineItemModel } from '../contracts/models/cart-line-item.model';
import {
  CART_STORAGE_KEY,
  cartUpdated,
  parseCart,
  serializeCart,
} from './cart-bus';

export { CART_STORAGE_KEY } from './cart-bus';

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
    listenTo(cartUpdated, ({ items }) => this._lineItems.set([...items]));

    // A storage event only fires in the *other* tabs, so this never echoes our own writes.
    fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter((event) => event.key === CART_STORAGE_KEY),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this._lineItems.set(parseCart(event.newValue)));
  }

  add(sku: string): void {
    const items = this._lineItems();
    const next = items.some((item) => item.sku === sku)
      ? items.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...items, { sku, quantity: 1 }];
    this.persist(next);
  }

  remove(sku: string): void {
    this.persist(this._lineItems().filter((item) => item.sku !== sku));
  }

  clear(): void {
    this.persist([]);
  }

  private persist(items: CartLineItemModel[]): void {
    this._lineItems.set(items);
    try {
      localStorage.setItem(CART_STORAGE_KEY, serializeCart(items));
    } catch {
      // Storage full or unavailable: the in-memory cart still works.
    }
    cartUpdated.emit({ items });
  }

  private readFromStorage(): CartLineItemModel[] {
    try {
      return parseCart(localStorage.getItem(CART_STORAGE_KEY));
    } catch {
      return [];
    }
  }
}
