import { defineChannel } from '@tractor-store/shared';
import type { CartLineItemModel } from '../contracts/models/cart-line-item.model';

export const CART_STORAGE_KEY = 'c_cart';
const ITEM_SEP = '|';
const QTY_SEP = '_';

export interface CartUpdatedPayload {
  readonly items: readonly CartLineItemModel[];
}

// Keeps the CartStore instances of different checkout elements in sync.
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
  items.map((item) => `${item.sku}${QTY_SEP}${item.quantity}`).join(ITEM_SEP);
