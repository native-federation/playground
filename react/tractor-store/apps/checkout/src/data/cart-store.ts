import { useSyncExternalStore } from 'react';
import {
  CART_STORAGE_KEY,
  parseCart,
  serializeCart,
  type CartLineItem,
} from './cart-storage';

// Module state: every checkout element shares this one cart, because they all
// run from the same checkout bundle.
const readFromStorage = (): CartLineItem[] => {
  try {
    return parseCart(localStorage.getItem(CART_STORAGE_KEY));
  } catch {
    return [];
  }
};

let lineItems: readonly CartLineItem[] = readFromStorage();
const listeners = new Set<() => void>();

const set = (items: readonly CartLineItem[]): void => {
  lineItems = items;
  for (const listener of listeners) listener();
};

const persist = (items: readonly CartLineItem[]): void => {
  set(items);
  try {
    localStorage.setItem(CART_STORAGE_KEY, serializeCart(items));
  } catch {
    // Storage full or unavailable: the in-memory cart still works.
  }
};

// A storage event only fires in the *other* tabs, so this never echoes our own writes.
window.addEventListener('storage', (event) => {
  if (event.key === CART_STORAGE_KEY) set(parseCart(event.newValue));
});

export const cartStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getLineItems: (): readonly CartLineItem[] => lineItems,
  add(sku: string): void {
    persist(
      lineItems.some((item) => item.sku === sku)
        ? lineItems.map((item) =>
            item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...lineItems, { sku, quantity: 1 }],
    );
  },
  remove(sku: string): void {
    persist(lineItems.filter((item) => item.sku !== sku));
  },
  clear(): void {
    persist([]);
  },
};

export const useCart = () => {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getLineItems);
  return {
    lineItems: items,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    add: cartStore.add,
    remove: cartStore.remove,
    clear: cartStore.clear,
  };
};
