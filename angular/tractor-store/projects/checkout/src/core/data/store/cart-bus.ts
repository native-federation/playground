import { defineChannel } from '@internal/event-bus';
import type { CartLineItemModel } from '../contracts/models/cart-line-item.model';

export const CART_STORAGE_KEY = 'c_cart';
const ITEM_SEP = '|';
const QTY_SEP = '_';

export type CartUpdatedPayload = {
  readonly items: readonly CartLineItemModel[];
};

/**
 * Broadcast cart mutations to peer CartStore instances loaded into the same
 * tab. The host owns the underlying registry; checkout slices in other MFEs
 * share state via this channel.
 */
export const cartUpdated = defineChannel<CartUpdatedPayload>('cart:updated');

export const parseCart = (raw: string | null): CartLineItemModel[] => {
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

export const serializeCart = (items: readonly CartLineItemModel[]): string =>
  items
    .map((item) => `${item.sku}${QTY_SEP}${item.quantity}`)
    .join(ITEM_SEP);

// Cross-tab bridge: a storage event fires in every tab *except* the one that
// wrote, so re-emitting on the bus is enough to keep peer CartStore instances
// in sync without double-firing in the originating tab.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== CART_STORAGE_KEY) return;
    cartUpdated.emit({ items: parseCart(event.newValue) });
  });
}
