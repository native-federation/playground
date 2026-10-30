export interface CartLineItem {
  readonly sku: string;
  readonly quantity: number;
}

export const CART_STORAGE_KEY = 'c_cart';
const ITEM_SEP = '|';
const QTY_SEP = '_';

export const parseCart = (raw: string | null): CartLineItem[] => {
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

export const serializeCart = (items: readonly CartLineItem[]): string =>
  items.map((item) => `${item.sku}${QTY_SEP}${item.quantity}`).join(ITEM_SEP);
