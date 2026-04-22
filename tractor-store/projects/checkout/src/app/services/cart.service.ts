import { computed, Injectable, signal } from '@angular/core';

export interface CartLineItem {
  sku: string;
  quantity: number;
}

export const CART_STORAGE_KEY = 'c_cart';
export const CART_UPDATED_EVENT = 'c_cart:updated';
const ITEM_SEP = '|';
const QTY_SEP = '_';

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

function parse(raw: string | null): CartLineItem[] {
  if (!raw) return [];
  return raw
    .split(ITEM_SEP)
    .filter((entry) => entry.length > 0)
    .map((entry) => {
      const [sku, quantity] = entry.split(QTY_SEP);
      return { sku, quantity: parseInt(quantity, 10) || 0 };
    })
    .filter((item) => item.sku && item.quantity > 0);
}

function serialize(items: CartLineItem[]): string {
  return items
    .map((item) => `${item.sku}${QTY_SEP}${item.quantity}`)
    .join(ITEM_SEP);
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _lineItems = signal<CartLineItem[]>(this.readFromStorage());

  readonly lineItems = this._lineItems.asReadonly();

  readonly totalQuantity = computed(() =>
    this._lineItems().reduce((sum, item) => sum + item.quantity, 0),
  );

  constructor() {
    if (hasWindow()) {
      window.addEventListener('storage', this.onStorage);
      window.addEventListener(CART_UPDATED_EVENT, this.onLocalUpdate);
    }
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

  private persist(items: CartLineItem[]): void {
    this._lineItems.set(items);
    if (!hasWindow()) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, serialize(items));
    } catch {
      /* storage full or unavailable – ignore */
    }
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  }

  private readFromStorage(): CartLineItem[] {
    if (!hasWindow()) return [];
    try {
      return parse(window.localStorage.getItem(CART_STORAGE_KEY));
    } catch {
      return [];
    }
  }

  private readonly onStorage = (event: StorageEvent): void => {
    if (event.key !== CART_STORAGE_KEY) return;
    this._lineItems.set(parse(event.newValue));
  };

  private readonly onLocalUpdate = (): void => {
    const next = this.readFromStorage();
    this._lineItems.set(next);
  };
}
