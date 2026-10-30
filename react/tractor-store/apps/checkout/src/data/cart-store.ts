import {
  type CartLineItem,
  emitCartUpdated,
  onCartUpdated,
} from '@react-internal/event-bus';

export type { CartLineItem };

export const CART_STORAGE_KEY = 'c_cart';
const ITEM_SEP = '|';
const QTY_SEP = '_';

const hasWindow = (): boolean => typeof window !== 'undefined';

const parse = (raw: string | null): CartLineItem[] => {
  if (!raw) return [];
  return raw
    .split(ITEM_SEP)
    .filter((entry) => entry.length > 0)
    .map((entry) => {
      const [sku, quantity] = entry.split(QTY_SEP);
      return { sku, quantity: parseInt(quantity, 10) || 0 };
    })
    .filter((item) => item.sku && item.quantity > 0);
};

const serialize = (items: readonly CartLineItem[]): string =>
  items.map((item) => `${item.sku}${QTY_SEP}${item.quantity}`).join(ITEM_SEP);

const sameItems = (
  a: readonly CartLineItem[],
  b: readonly CartLineItem[],
): boolean => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i].sku !== b[i].sku || a[i].quantity !== b[i].quantity) return false;
  }
  return true;
};

const readFromStorage = (): CartLineItem[] => {
  if (!hasWindow()) return [];
  try {
    return parse(window.localStorage.getItem(CART_STORAGE_KEY));
  } catch {
    return [];
  }
};

let items: readonly CartLineItem[] = readFromStorage();
const listeners = new Set<() => void>();

const setItems = (
  next: readonly CartLineItem[],
  { broadcast }: { broadcast: boolean },
): void => {
  if (sameItems(next, items)) return;
  items = next;
  for (const l of listeners) l();
  if (broadcast) emitCartUpdated({ items });
};

const persist = (next: readonly CartLineItem[]): void => {
  setItems(next, { broadcast: true });
  if (hasWindow()) {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, serialize(next));
    } catch {
      /* storage full / unavailable */
    }
  }
};

if (hasWindow()) {
  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.key !== CART_STORAGE_KEY) return;
    setItems(parse(event.newValue), { broadcast: false });
  });
}

// Peer MFE updated the cart — adopt their state without re-emitting.
onCartUpdated(({ items: next }) => setItems([...next], { broadcast: false }));

export const cartStore = {
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: (): readonly CartLineItem[] => items,
  add(sku: string): void {
    const exists = items.some((i) => i.sku === sku);
    persist(
      exists
        ? items.map((i) => (i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i))
        : [...items, { sku, quantity: 1 }],
    );
  },
  remove(sku: string): void {
    persist(items.filter((i) => i.sku !== sku));
  },
  clear(): void {
    persist([]);
  },
};
