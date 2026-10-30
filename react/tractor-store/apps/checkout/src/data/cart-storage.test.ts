import { describe, expect, it } from 'vitest';
import { parseCart, serializeCart } from './cart-storage';

describe('cart-storage', () => {
  it('round-trips line items', () => {
    const items = [
      { sku: 'CL-01-GR', quantity: 2 },
      { sku: 'AU-02-OG', quantity: 1 },
    ];
    expect(serializeCart(items)).toBe('CL-01-GR_2|AU-02-OG_1');
    expect(parseCart(serializeCart(items))).toEqual(items);
  });

  it('treats a missing value as an empty cart', () => {
    expect(parseCart(null)).toEqual([]);
  });

  it('drops corrupt entries', () => {
    expect(parseCart('CL-01-GR_2||_3|AU-02-OG_x|AU-03-TQ_0')).toEqual([
      { sku: 'CL-01-GR', quantity: 2 },
    ]);
  });
});
